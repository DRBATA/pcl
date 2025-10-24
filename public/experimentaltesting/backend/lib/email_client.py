"""
Resend email client for Water Bar avatar agent.
Direct email sending for personalized hydration plans - following the "secret sauce" pattern.
"""
import os
import aiohttp
from pathlib import Path
from dotenv import load_dotenv
from typing import Dict, Any, Optional
import logging
import json
from .hydration_advice_email import generate_hydration_advice_email

# Load environment variables first
load_dotenv(dotenv_path=Path(__file__).parent.parent / '.env')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WaterBarEmail:
    def __init__(self):
        self.resend_key = os.getenv("RESEND_API_KEY")
        
        if not self.resend_key:
            raise ValueError("Missing RESEND_API_KEY in environment variables")
        
        self.base_url = "https://api.resend.com"
        logger.info("📧 Email client initialized with secret sauce pattern")
    
    async def send_hydration_advice(self, 
                                   to_email: str, 
                                   weather_data: Dict[str, Any] = None, 
                                   cart_items: list = None,
                                   user_name: str = "Hydration Enthusiast",
                                   recommendations: str = "") -> bool:
        """
        Send a personalized hydration advice email.
        
        Args:
            to_email: Recipient email address
            weather_data: Weather data from weather_client (optional)
            cart_items: List of cart items (optional)
            user_name: User's name for personalization
            recommendations: Custom recommendations from agent
            
        Returns:
            True if sent successfully, False if failed
        """
        try:
            logger.info(f"📧 EMAIL: Sending hydration advice to {to_email}")
            
            # Generate personalized email content using the new template
            email_content = generate_hydration_advice_email(
                user_name=user_name,
                weather_data=weather_data,
                cart_items=cart_items,
                recommendations=recommendations
            )
            
            url = f"{self.base_url}/emails"
            headers = {
                "Authorization": f"Bearer {self.resend_key}",
                "Content-Type": "application/json"
            }
            
            email_data = {
                "from": "noreply@www.thewater.bar",
                "to": [to_email],
                "subject": f"Your Personalized Hydration Advice - {weather_data.get('city', 'Today') if weather_data else 'AI Coach'}",
                "html": email_content
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=email_data) as response:
                    if response.status == 200:
                        result = await response.json()
                        logger.info(f"📧 EMAIL: SUCCESS! Sent email ID: {result.get('id')}")
                        return True
                    else:
                        error_text = await response.text()
                        logger.error(f"📧 EMAIL: API error {response.status}: {error_text}")
                        return False
                        
        except Exception as e:
            logger.error(f"📧 EMAIL: Error sending email: {e}")
            return False
    


# Global instance following the secret sauce pattern
email_client = WaterBarEmail()
