"""
Standalone Email Follow-Up Agent
Autonomous agent for sending follow-up emails based on drink consumption
NO LiveKit dependency - pure Supabase Realtime + MCP
"""
import os
import asyncio
import logging
from datetime import datetime
from typing import Dict, List, Any, Optional
from dotenv import load_dotenv
from openai import AsyncOpenAI
import anthropic
from lib.supabase_client import supabase_client
from lib.mcp_client import WaterBarMCP

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmailFollowUpAgent:
    """Autonomous agent for sending follow-up emails based on drink consumption"""
    
    def __init__(self):
        # Initialize MCP wrapper (handles path internally)
        self.mcp = WaterBarMCP()
        
        # Try Claude first, fallback to OpenAI
        anthropic_key = os.getenv("ANTHROPIC_API_KEY")
        openai_key = os.getenv("OPENAI_API_KEY")
        
        if anthropic_key:
            self.ai_client = anthropic.Anthropic(api_key=anthropic_key)
            self.ai_provider = "claude"
            logger.info("🤖 Using Claude for AI generation")
        elif openai_key:
            self.ai_client = AsyncOpenAI(api_key=openai_key)
            self.ai_provider = "openai"
            logger.info("🤖 Using OpenAI for AI generation")
        else:
            self.ai_client = None
            self.ai_provider = None
            logger.warning("⚠️ No AI provider configured - using static messages")
            
        logger.info("🚀 Email Follow-Up Agent initialized")
        
    async def start(self):
        """Start the MCP client and Supabase listener"""
        await self.mcp.start()
        logger.info("✅ Email Follow-Up Agent started")
        
        # Start listening to Supabase Realtime
        await self.listen_to_consumption_updates()
        
    async def listen_to_consumption_updates(self):
        """Listen to order_items.consumed updates via Supabase Realtime"""
        try:
            if not supabase_client:
                logger.error("❌ Supabase client not available")
                return
            
            logger.info("👂 Listening for drink consumption updates...")
            
            # Use async client for Realtime
            from supabase import create_client
            import os
            
            # Create async client specifically for Realtime
            supabase_url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
            supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
            
            if not supabase_url or not supabase_key:
                logger.error("❌ Missing Supabase credentials for Realtime")
                return
            
            # For now, let's simulate Realtime with polling
            logger.info("🔄 Using polling method (Realtime setup needed)")
            
            # Poll for changes every 30 seconds
            last_check = None
            
            while True:
                try:
                    # Query for recently consumed items
                    if last_check:
                        # Get items consumed since last check
                        response = supabase_client.client.table('order_items').select('*').eq('consumed', True).gte('updated_at', last_check.isoformat()).execute()
                    else:
                        # First run - get items consumed in last 5 minutes
                        from datetime import datetime, timedelta, timezone
                        five_min_ago = datetime.now(timezone.utc) - timedelta(minutes=5)
                        response = supabase_client.client.table('order_items').select('*').eq('consumed', True).gte('updated_at', five_min_ago.isoformat()).execute()
                    
                    # Process any new consumed items
                    for item in response.data or []:
                        order_id = item.get('order_id')
                        if order_id:
                            logger.info(f"📊 Found consumed item in order: {order_id}")
                            await self.process_consumption_update(order_id)
                    
                    # Update last check time
                    from datetime import datetime, timezone
                    last_check = datetime.now(timezone.utc)
                    
                    # Wait 30 seconds before next check
                    await asyncio.sleep(30)
                    
                except Exception as e:
                    logger.error(f"❌ Polling error: {e}")
                    await asyncio.sleep(30)  # Wait before retry
                
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
            
            logger.info(f"📊 Order {order_id}: {consumed_count}/{total_items} consumed, {remaining_count} remaining")
            
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
                logger.info(f"📧 Sending follow-up email (remaining drinks) to {order['customer_email']}")
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
                logger.info(f"🎉 Sending completion email to {order['customer_email']}")
                await self.mcp.send_completion_email(
                    customer_name=order['customer_name'],
                    customer_email=order['customer_email'],
                    order_id=order_id,
                    total_drinks=total_items
                )
                logger.info(f"✅ Completion email sent to {order['customer_email']}")
                
        except Exception as e:
            logger.error(f"❌ Error processing consumption: {e}", exc_info=True)
    
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
                    'product_id': item['item_id'],  # Column is called item_id, not product_id
                    'product_name': item['products']['name'] if item.get('products') else item.get('name', 'Unknown'),
                    'quantity': item.get('qty', 1),  # Column is called qty, not quantity
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
            
            if self.ai_provider == "claude":
                # Use Claude (cheaper and better!)
                message = self.ai_client.messages.create(
                    model="claude-3-haiku-20240307",  # Cheapest model
                    max_tokens=150,
                    messages=[
                        {
                            "role": "user", 
                            "content": f"You are a Water Bar hydration coach. Be encouraging and scientific.\n\n{context_prompt}"
                        }
                    ]
                )
                advice = message.content[0].text if message.content else "Keep up the great hydration!"
                
            else:
                # Fallback to OpenAI
                response = await self.ai_client.chat.completions.create(
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


async def main():
    """Main entry point"""
    logger.info("🚀 Starting Email Follow-Up Agent...")
    
    agent = EmailFollowUpAgent()
    
    try:
        await agent.start()
    except KeyboardInterrupt:
        logger.info("⏹️  Shutting down...")
        await agent.close()
    except Exception as e:
        logger.error(f"❌ Fatal error: {e}", exc_info=True)
        await agent.close()


if __name__ == "__main__":
    asyncio.run(main())
