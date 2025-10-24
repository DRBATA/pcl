"""
Stripe client for Water Bar avatar agent.
Direct Stripe access for checkout - following the "secret sauce" pattern.
"""
import os
import stripe
from pathlib import Path
from dotenv import load_dotenv
from typing import Dict, Any, Optional
import logging

# Load environment variables first
load_dotenv(dotenv_path=Path(__file__).parent.parent / '.env')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WaterBarStripe:
    def __init__(self):
        self.stripe_secret_key = os.getenv("STRIPE_SECRET_KEY")
        
        if not self.stripe_secret_key:
            raise ValueError("Missing STRIPE_SECRET_KEY in environment variables")
        
        # Initialize Stripe
        stripe.api_key = self.stripe_secret_key
        logger.info("🔥 Stripe client initialized with secret sauce pattern")
    
    async def create_checkout_session(self, session_id: str, utm_campaign: str = "agent") -> Optional[str]:
        """
        Create a Stripe checkout session for the agent cart.
        Following the same pattern as the main site's checkout flow.
        
        Args:
            session_id: The agent session ID with cart items
            utm_campaign: Campaign tracking (default: "agent")
            
        Returns:
            Stripe checkout URL if successful, None if failed
        """
        try:
            logger.info(f"🔥 STRIPE: Creating checkout session for session_id={session_id}")
            
            # TODO: We need to get cart items and calculate total
            # For now, let's create a basic session to test the pattern
            
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'gbp',  # Assuming UK based on your timezone
                        'product_data': {
                            'name': 'Water Bar Cart Items',
                        },
                        'unit_amount': 1000,  # £10.00 in pence - placeholder
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url='https://www.thewater.bar/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url='https://www.thewater.bar/cart',
                metadata={
                    'session_id': session_id,
                    'utm_campaign': utm_campaign,
                }
            )
            
            logger.info(f"🔥 STRIPE: SUCCESS! Created checkout session: {checkout_session.id}")
            logger.info(f"🔥 STRIPE: Checkout URL: {checkout_session.url}")
            
            return checkout_session.url
            
        except Exception as e:
            logger.error(f"🔥 STRIPE: Error creating checkout session: {e}")
            return None

# Global instance following the Supabase pattern
stripe_client = WaterBarStripe()
