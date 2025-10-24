import asyncio
import json
import logging
import os
from typing import Dict, Any, List, Optional
from livekit.agents import JobContext, WorkerOptions, cli
from openai import OpenAI
from lib.supabase_client import supabase_client
from lib.mcp_client import WaterBarMCP

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WaterBarAgent:
    def __init__(self):
        self.openai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
        
    async def get_cart_and_drinks(self, customer_email: str) -> Dict[str, Any]:
        """Get cart, booking, and paired drinks - same as minchat-v4"""
        try:
            if not supabase_client:
                return {"experience": None, "drinks": []}
            
            # Get latest cart
            cart_response = supabase_client.table('cart_headers').select('*').eq('customer_email', customer_email).order('created_at', desc=True).limit(1).single().execute()
            
            if not cart_response.data or not cart_response.data.get('booking_id'):
                return {"experience": None, "drinks": []}
            
            cart = cart_response.data
            
            # Get booking with experience
            booking_response = supabase_client.table('bookings').select('''
                experiences!inner(name, description, tags, category)
            ''').eq('id', cart['booking_id']).single().execute()
            
            if not booking_response.data:
                return {"experience": None, "drinks": []}
            
            experience_name = booking_response.data['experiences']['name']
            
            # Get drinks that pair with this experience using RPC
            drinks_response = supabase_client.rpc('search_products_by_trigger', {
                'pattern': experience_name,
                'lim': 8
            }).execute()
            
            drinks = drinks_response.data or []
            
            return {
                "experience": experience_name,
                "drinks": drinks
            }
            
        except Exception as e:
            logger.error(f"Error in get_cart_and_drinks: {e}")
            return {"experience": None, "drinks": []}
    
    async def suggest_drinks(self, customer_email: str) -> Dict[str, Any]:
        """Main v4 logic: get data, ask AI for 2 chips - COMPLETIONS API ONLY"""
        try:
            # Get all data upfront
            data = await self.get_cart_and_drinks(customer_email)
            
            if not data["experience"]:
                return {"title": "No booking found", "choices": []}
            
            if not data["drinks"]:
                return {"title": "No drink pairings found", "choices": []}
            
            experience = data["experience"]
            drinks = data["drinks"]
            
            # Ask AI to make 2 JSON chips directly - COMPLETIONS API
            response = await self.openai_client.chat.completions.create(
                model="gpt-4o-mini",
                response_format={"type": "json_object"},
                max_tokens=400,
                messages=[
                    {
                        "role": "system",
                        "content": 'You are AOI\'s drink pairing expert. Return STRICT JSON: {"title":string,"choices":[{"kind":"drink","id":string,"label":string,"qty":number,"reason":string}]}. Pick exactly 2 drinks from the provided list.'
                    },
                    {
                        "role": "user", 
                        "content": f"Experience: {experience}\n\nAvailable drinks:\n{json.dumps(drinks, indent=2)}\n\nCreate 2 personalized drink recommendations with scientific reasons why they pair well with this experience."
                    }
                ]
            )
            
            content = response.choices[0].message.content
            if not content:
                return {"title": "No suggestions", "choices": []}
            
            # Validate JSON
            try:
                parsed = json.loads(content)
                if parsed.get("title") and isinstance(parsed.get("choices"), list):
                    return parsed
            except json.JSONDecodeError as e:
                logger.error(f"JSON parse error: {e}")
            
            # Fallback: create simple chips from first 2 drinks
            fallback = {
                "title": f"Drinks for {experience}",
                "choices": [
                    {
                        "kind": "drink",
                        "id": drink["id"],
                        "label": drink["name"],
                        "qty": 1,
                        "reason": "Pairs well with your session"
                    }
                    for drink in drinks[:2]
                ]
            }
            
            return fallback
            
        except Exception as e:
            logger.error(f"Error in suggest_drinks: {e}")
            return {"title": "Error", "choices": []}

    async def chat(self, message: str, customer_email: str = None) -> str:
        """Handle text chat - COMPLETIONS API"""
        try:
            context = ""
            if customer_email:
                data = await self.get_cart_and_drinks(customer_email)
                if data["experience"]:
                    context = f"Customer has booked: {data['experience']}. "
            
            response = await self.openai_client.chat.completions.create(
                model="gpt-4o-mini",
                max_tokens=200,
                messages=[
                    {
                        "role": "system",
                        "content": f"You are AOI's Water Bar concierge. Help with drink pairings and scheduling. {context}Keep responses brief and friendly."
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                ]
            )
            
            return response.choices[0].message.content or "I'm here to help with your Water Bar experience!"
            
        except Exception as e:
            logger.error(f"Error in chat: {e}")
            return "Sorry, I'm having trouble right now. Please try again."


class EmailFollowUpAgent:
    """Autonomous agent for sending follow-up emails based on drink consumption"""
    
    def __init__(self):
        self.mcp = WaterBarMCP()
        self.openai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
        
    async def start(self):
        """Start the MCP client and Supabase listener"""
        await self.mcp.start()
        logger.info("✅ Email Follow-Up Agent started")
        
        # Start listening to Supabase Realtime
        asyncio.create_task(self.listen_to_consumption_updates())
        
    async def listen_to_consumption_updates(self):
        """Listen to order_items.consumed updates via Supabase Realtime"""
        try:
            if not supabase_client:
                logger.error("❌ Supabase client not available")
                return
            
            logger.info("👂 Listening for drink consumption updates...")
            
            # Subscribe to order_items changes
            channel = supabase_client.client.channel('consumption-updates')
            
            async def handle_update(payload):
                """Handle consumption update"""
                try:
                    logger.info(f"📊 Consumption update: {payload}")
                    
                    # Get the updated item
                    new_data = payload.get('new', {})
                    if not new_data.get('consumed'):
                        return  # Only process when marked as consumed
                    
                    order_id = new_data.get('order_id')
                    if not order_id:
                        return
                    
                    # Process the consumption update
                    await self.process_consumption_update(order_id)
                    
                except Exception as e:
                    logger.error(f"❌ Error handling consumption update: {e}")
            
            # Subscribe to UPDATE events
            channel.on_postgres_changes(
                event='UPDATE',
                schema='public',
                table='order_items',
                filter='consumed=eq.true',
                callback=lambda payload: asyncio.create_task(handle_update(payload))
            ).subscribe()
            
            # Keep the listener running
            while True:
                await asyncio.sleep(1)
                
        except Exception as e:
            logger.error(f"❌ Realtime listener error: {e}")
    
    async def process_consumption_update(self, order_id: str):
        """Process a consumption update and send follow-up email"""
        try:
            logger.info(f"🔄 Processing consumption update for order: {order_id}")
            
            # 1. Fetch order details
            order = await self.get_order_details(order_id)
            if not order:
                logger.error(f"❌ Order not found: {order_id}")
                return
            
            # 2. Calculate consumed vs remaining
            total_items = len(order['items'])
            consumed_items = [item for item in order['items'] if item.get('consumed')]
            remaining_items = [item for item in order['items'] if not item.get('consumed')]
            
            consumed_count = len(consumed_items)
            remaining_count = len(remaining_items)
            
            logger.info(f"📊 Order {order_id}: {consumed_count}/{total_items} consumed")
            
            # 3. Get booking context (if exists)
            booking_context = await self.get_booking_context(order)
            
            # 4. Generate AI personalized message
            personalized_context = await self.generate_follow_up_context(
                consumed_items=consumed_items,
                remaining_items=remaining_items,
                booking_context=booking_context
            )
            
            # 5. Send appropriate email
            if remaining_count > 0:
                # Still drinks left - send encouragement
                await self.mcp.send_follow_up_email(
                    customer_name=order['customer_name'],
                    customer_email=order['customer_email'],
                    consumed_drinks=[item['product_name'] for item in consumed_items],
                    remaining_drinks=[
                        {
                            "name": item['product_name'],
                            "quantity": item['quantity']
                        }
                        for item in remaining_items
                    ],
                    booking_context=personalized_context
                )
                logger.info(f"✅ Follow-up email sent to {order['customer_email']}")
            else:
                # All consumed - send completion email
                await self.mcp.send_completion_email(
                    customer_name=order['customer_name'],
                    customer_email=order['customer_email'],
                    order_id=order_id,
                    total_drinks=total_items
                )
                logger.info(f"🎉 Completion email sent to {order['customer_email']}")
                
        except Exception as e:
            logger.error(f"❌ Error processing consumption: {e}")
    
    async def get_order_details(self, order_id: str) -> Optional[Dict]:
        """Fetch full order with items"""
        try:
            # Get order
            order_response = supabase_client.client.table('orders').select('*').eq('id', order_id).single().execute()
            
            if not order_response.data:
                return None
            
            order = order_response.data
            
            # Get order items with product names
            items_response = supabase_client.client.table('order_items').select('''
                *,
                products (
                    name
                )
            ''').eq('order_id', order_id).execute()
            
            items = []
            for item in items_response.data or []:
                items.append({
                    'id': item['id'],
                    'product_id': item['product_id'],
                    'product_name': item['products']['name'] if item.get('products') else 'Unknown',
                    'quantity': item['quantity'],
                    'consumed': item.get('consumed', False)
                })
            
            return {
                'id': order['id'],
                'customer_name': order.get('customer_name', 'Valued Customer'),
                'customer_email': order.get('email', order.get('customer_email')),
                'items': items,
                'booking_id': order.get('booking_id')
            }
            
        except Exception as e:
            logger.error(f"❌ Error fetching order: {e}")
            return None
    
    async def get_booking_context(self, order: Dict) -> Optional[Dict]:
        """Get booking/experience context if available"""
        try:
            booking_id = order.get('booking_id')
            if not booking_id:
                return None
            
            booking_response = supabase_client.client.table('bookings').select('''
                *,
                experiences (
                    name,
                    description,
                    tags
                )
            ''').eq('id', booking_id).single().execute()
            
            if not booking_response.data:
                return None
            
            booking = booking_response.data
            experience = booking.get('experiences', {})
            
            return {
                'experience_name': experience.get('name'),
                'experience_tags': experience.get('tags', []),
                'slot_time': booking.get('slot_time')
            }
            
        except Exception as e:
            logger.error(f"❌ Error fetching booking context: {e}")
            return None
    
    async def generate_follow_up_context(
        self,
        consumed_items: list,
        remaining_items: list,
        booking_context: Optional[Dict]
    ) -> Dict:
        """Use AI to generate personalized follow-up context"""
        try:
            context_prompt = f"""
You are a hydration coach. Based on this data, create a brief, encouraging message:

Consumed drinks: {', '.join([item['product_name'] for item in consumed_items])}
Remaining drinks: {', '.join([item['product_name'] for item in remaining_items])}
"""
            
            if booking_context:
                context_prompt += f"\nExperience: {booking_context.get('experience_name')}"
                context_prompt += f"\nTags: {', '.join(booking_context.get('experience_tags', []))}"
            
            context_prompt += "\n\nProvide: 1) A brief encouraging message, 2) Hydration advice based on their experience"
            
            response = await self.openai_client.chat.completions.create(
                model="gpt-4o-mini",
                max_tokens=150,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a Water Bar hydration coach. Be encouraging and scientific."
                    },
                    {
                        "role": "user",
                        "content": context_prompt
                    }
                ]
            )
            
            advice = response.choices[0].message.content or "Keep up the great hydration!"
            
            return {
                "experience_name": booking_context.get('experience_name') if booking_context else None,
                "advice": advice
            }
            
        except Exception as e:
            logger.error(f"❌ Error generating AI context: {e}")
            return {
                "advice": "Great job staying hydrated! Don't forget your remaining drinks."
            }
    
    async def close(self):
        """Close the MCP client"""
        await self.mcp.close()


async def entrypoint(ctx: JobContext):
    """
    Dual-mode agent entrypoint:
    1. LiveKit agent for real-time chat/suggestions
    2. Email follow-up agent for autonomous consumption tracking
    """
    await ctx.connect()
    
    # Start LiveKit agent
    agent = WaterBarAgent()
    room = ctx.room
    
    # Start Email Follow-Up Agent (runs independently)
    email_agent = EmailFollowUpAgent()
    await email_agent.start()
    
    logger.info(f"✅ Both agents started - LiveKit room: {room.name}")
    
    async def handle_data_received(data: bytes, participant):
        """Handle incoming data messages from frontend"""
        try:
            message = json.loads(data.decode())
            logger.info(f"Received message: {message}")
            
            if message.get("type") == "suggest":
                customer_email = message.get("email")
                if not customer_email:
                    await room.local_participant.publish_data(
                        json.dumps({"type": "error", "message": "Email required"}).encode(),
                        reliable=True
                    )
                    return
                
                # Send status updates
                await room.local_participant.publish_data(
                    json.dumps({"type": "status", "message": "Getting your cart..."}).encode(),
                    reliable=True
                )
                
                await room.local_participant.publish_data(
                    json.dumps({"type": "status", "message": "Finding drink pairings..."}).encode(),
                    reliable=True
                )
                
                await room.local_participant.publish_data(
                    json.dumps({"type": "status", "message": "AI is choosing your drinks..."}).encode(),
                    reliable=True
                )
                
                # Get suggestions using v4 logic
                result = await agent.suggest_drinks(customer_email)
                
                # Send final result
                await room.local_participant.publish_data(
                    json.dumps({"type": "chips", "payload": result}).encode(),
                    reliable=True
                )
            
            elif message.get("type") == "chat":
                # Handle text chat
                text = message.get("text", "")
                customer_email = message.get("email")
                
                response = await agent.chat(text, customer_email)
                
                await room.local_participant.publish_data(
                    json.dumps({"type": "chat_response", "message": response}).encode(),
                    reliable=True
                )
                
        except Exception as e:
            logger.error(f"Error handling data: {e}")
            await room.local_participant.publish_data(
                json.dumps({"type": "error", "message": str(e)}).encode(),
                reliable=True
            )
    
    # Listen for data messages
    room.on("data_received", handle_data_received)
    
    # Keep the agent running
    while True:
        await asyncio.sleep(1)

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
