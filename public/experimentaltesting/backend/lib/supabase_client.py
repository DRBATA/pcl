"""
Supabase client for Water Bar avatar agent.
Fetches product data for hydration coaching.
"""
import os
import asyncio
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client
from typing import List, Dict, Any, Optional
import logging
import uuid
from datetime import datetime

# Load environment variables first
load_dotenv(dotenv_path=Path(__file__).parent.parent / '.env')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WaterBarSupabase:
    def __init__(self):
        self.url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        self.key = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
        self.service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        
        if not self.url or not self.key or not self.service_role_key:
            raise ValueError("Missing Supabase credentials in environment variables")
        
        self.client: Client = create_client(self.url, self.key)
        self.service_client: Client = create_client(self.url, self.service_role_key)
    
    def get_products(self) -> List[Dict[str, Any]]:
        """Fetch all available products."""
        try:
            response = self.client.table("products").select("*").execute()
            
            return response.data
        except Exception as e:
            print(f"Error fetching products: {e}")
            return []
    
    def get_experiences(self) -> List[Dict[str, Any]]:
        """Fetch all available wellness experiences."""
        try:
            response = self.client.table("experiences").select("*").execute()
            return response.data
        except Exception as e:
            print(f"Error fetching experiences: {e}")
            return []
    
    def get_hydration_options(self) -> List[Dict[str, Any]]:
        """Fetch hydration options nutritional data for physiology calculations."""
        try:
            response = self.client.table("hydration_options").select("*").execute()
            return response.data
        except Exception as e:
            print(f"Error fetching hydration options: {e}")
            return []
    
    
    def sync_cart_to_supabase(self, session_id: str, cart_items: List[Dict[str, Any]], user_id: Optional[str] = None) -> Optional[str]:
        """Sync agent cart to Supabase cart_headers/cart_items tables.
        
        Args:
            session_id: Session identifier
            cart_items: List of cart items with product_id and quantity
            user_id: Optional user ID (nullable for anonymous carts)
            
        Returns:
            cart_id if successful, None if failed
        """
        try:
            logger.info(f"Syncing cart to Supabase for session: {session_id}")
            
            if not cart_items:
                logger.warning("No cart items to sync")
                return None
            
            # 1. Create cart_header using service role client for write access
            cart_header_data = {
                "session_id": session_id,
                "user_id": user_id,  # Will be null for anonymous users
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            }
            
            cart_header_response = self.service_client.table("cart_headers").insert(cart_header_data).execute()
            
            if not cart_header_response.data:
                logger.error("Failed to create cart header")
                return None
            
            cart_id = cart_header_response.data[0]['id']
            logger.info(f"Created cart header with ID: {cart_id}")
            
            # 2. Add cart_items
            cart_items_data = []
            for item in cart_items:
                cart_item = {
                    "cart_id": cart_id,
                    "item_id": item['product_id'],
                    "qty": item['quantity'],
                    "created_at": datetime.utcnow().isoformat()
                }
                
                # Add bundle_components if present (for bundles)
                if 'bundle_components' in item:
                    cart_item['bundle_components'] = item['bundle_components']
                
                cart_items_data.append(cart_item)
            
            cart_items_response = self.service_client.table("cart_items").insert(cart_items_data).execute()
            
            if not cart_items_response.data:
                logger.error("Failed to create cart items")
                return None
            
            logger.info(f"Successfully synced {len(cart_items_data)} items to cart {cart_id}")
            return cart_id
            
        except Exception as e:
            logger.error(f"Error syncing cart to Supabase: {e}")
            return None
    
    def get_cart_total(self, cart_id: str) -> float:
        """Calculate total for a cart by fetching item prices."""
        try:
            # Get cart items with product prices
            response = self.client.table("cart_items").select("""
                qty,
                item:item_id(
                    price
                )
            """).eq("cart_id", cart_id).execute()
            
            total = 0.0
            for item in response.data:
                if item.get('item') and item['item'].get('price'):
                    total += float(item['item']['price']) * item['qty']
            
            return total
            
        except Exception as e:
            logger.error(f"Error calculating cart total: {e}")
            return 0.0
    
    async def get_cart(self, session_id: str) -> Optional[Dict[str, Any]]:
        """Get cart data for a session ID."""
        try:
            # Get cart items with product details
            response = self.client.table("cart_items").select("""
                qty,
                product:item_id(
                    id,
                    name,
                    price
                )
            """).eq("session_id", session_id).execute()
            
            if not response.data:
                return {"items": [], "total": 0}
            
            items = []
            total = 0
            
            for item in response.data:
                if item.get('product'):
                    product = item['product']
                    quantity = item['qty']
                    price = float(product.get('price', 0))
                    
                    items.append({
                        "id": product['id'],
                        "name": product['name'],
                        "price": price,
                        "quantity": quantity
                    })
                    
                    total += price * quantity
            
            return {
                "items": items,
                "total": total
            }
            
        except Exception as e:
            logger.error(f"Error getting cart: {e}")
            return {"items": [], "total": 0}
    
    def table(self, table_name: str):
        """Delegate table access to the underlying Supabase client."""
        return self.client.table(table_name)

# Global instance - only initialize if credentials are available
try:
    supabase_client = WaterBarSupabase()
except ValueError:
    # During Docker build, credentials aren't available yet
    supabase_client = None
