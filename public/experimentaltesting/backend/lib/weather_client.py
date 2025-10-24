"""
OpenWeatherMap client for Water Bar avatar agent.
Direct weather access for hydration recommendations - following the "secret sauce" pattern.
"""
import os
import aiohttp
from pathlib import Path
from dotenv import load_dotenv
from typing import Dict, Any, Optional
import logging

# Load environment variables first
load_dotenv(dotenv_path=Path(__file__).parent.parent / '.env')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WaterBarWeather:
    def __init__(self):
        self.owm_key = os.getenv("OWM_KEY")
        
        if not self.owm_key:
            raise ValueError("Missing OWM_KEY in environment variables")
        
        self.base_url = "https://api.openweathermap.org/data/2.5"
        logger.info("🌤️ Weather client initialized with secret sauce pattern")
    
    async def get_current_weather(self, city: str = None, lat: float = None, lon: float = None) -> Optional[Dict[str, Any]]:
        """
        Get current weather for hydration recommendations.
        
        Args:
            city: City name (optional if lat/lon provided)
            lat: Latitude (optional if city provided)
            lon: Longitude (optional if city provided)
            
        Returns:
            Weather data dict if successful, None if failed
        """
        try:
            if lat is not None and lon is not None:
                logger.info(f"🌤️ WEATHER: Getting weather for GPS coordinates {lat}, {lon}")
                url = f"{self.base_url}/weather"
                params = {
                    "lat": lat,
                    "lon": lon,
                    "appid": self.owm_key,
                    "units": "metric"  # Celsius
                }
            elif city:
                logger.info(f"🌤️ WEATHER: Getting current weather for {city}")
                url = f"{self.base_url}/weather"
                params = {
                    "q": city,
                    "appid": self.owm_key,
                    "units": "metric"  # Celsius
                }
            else:
                logger.error("🌤️ WEATHER: No city or coordinates provided")
                return None
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url, params=params) as response:
                    if response.status == 200:
                        data = await response.json()
                        
                        weather_info = {
                            "temperature": data["main"]["temp"],
                            "feels_like": data["main"]["feels_like"],
                            "humidity": data["main"]["humidity"],
                            "description": data["weather"][0]["description"],
                            "city": data["name"]
                        }
                        
                        location_name = city if city else f"coordinates {lat}, {lon}"
                        logger.info(f"🌤️ WEATHER: SUCCESS! {location_name} is {weather_info['temperature']}°C, {weather_info['description']}")
                        return weather_info
                    else:
                        logger.error(f"🌤️ WEATHER: API error {response.status}")
                        return None
                        
        except Exception as e:
            logger.error(f"🌤️ WEATHER: Error getting weather: {e}")
            return None
    
    def get_hydration_recommendation(self, weather_data: Dict[str, Any]) -> str:
        """
        Generate hydration recommendation based on weather.
        
        Args:
            weather_data: Weather data from get_current_weather()
            
        Returns:
            Hydration recommendation string
        """
        if not weather_data:
            return "Stay hydrated! Aim for 2-3 liters of water today."
        
        temp = weather_data["temperature"]
        humidity = weather_data["humidity"]
        
        if temp > 25:  # Hot day
            if humidity > 70:  # High humidity
                return f"It's {temp}°C with {humidity}% humidity - you'll sweat more! Increase hydration by 50% and add electrolytes."
            else:
                return f"It's a hot {temp}°C day! Increase your water intake and consider alkaline water for better absorption."
        elif temp < 10:  # Cold day
            return f"It's cold at {temp}°C, but you still need hydration! Warm herbal teas count toward your daily intake."
        else:  # Moderate day
            return f"Perfect {temp}°C weather! Maintain regular hydration with 2-3 liters throughout the day."

# Global instance following the secret sauce pattern
weather_client = WaterBarWeather()
