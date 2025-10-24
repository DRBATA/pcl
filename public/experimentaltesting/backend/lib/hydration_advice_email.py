"""
Hydration Advice Email Template for Water Bar avatar agent.
Simplified email template for sending personalized hydration advice.
"""

def generate_hydration_advice_email(
    user_name: str = "Hydration Enthusiast",
    weather_data: dict = None,
    cart_items: list = None,
    recommendations: str = ""
) -> str:
    """
    Generate a clean, simple hydration advice email.
    
    Args:
        user_name: User's name for personalization
        weather_data: Weather data from weather_client
        cart_items: List of cart items (optional)
        recommendations: Custom recommendations from the agent
        
    Returns:
        HTML email content
    """
    
    # Weather info
    weather_html = ""
    if weather_data:
        temp = weather_data.get('temperature', 20)
        city = weather_data.get('city', 'your location')
        description = weather_data.get('description', 'pleasant weather')
        humidity = weather_data.get('humidity', 'N/A')
        
        weather_html = f"""
        <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">🌤️ Current Weather in {city}</h3>
            <p style="font-size: 18px; margin: 10px 0;"><strong>{temp}°C</strong> - {description}</p>
            <p style="color: #075985;">Humidity: {humidity}%</p>
        </div>
        """
    
    # Cart/recommendations
    recommendations_html = ""
    if cart_items:
        recommendations_html = "<h3 style='color: #0369a1;'>🛒 Your Hydration Selection:</h3><ul style='padding-left: 20px;'>"
        for item in cart_items:
            recommendations_html += f"<li style='margin: 8px 0;'><strong>{item.get('name', 'Product')}</strong> x{item.get('quantity', 1)}</li>"
        recommendations_html += "</ul>"
    
    if recommendations:
        recommendations_html += f"""
        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534; margin-top: 0;">💡 Your Personalized Advice</h3>
            <p style="color: #15803d; line-height: 1.6;">{recommendations}</p>
        </div>
        """
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Hydration Advice - The Water Bar</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif; background-color: #f6f9fc;">
        
        <!-- Logo Section -->
        <div style="padding: 30px 20px; text-align: center;">
            <a href="https://www.thewater.bar" style="text-decoration: none;">
                <img src="https://www.thewater.bar/logo.png" width="150" alt="The Water Bar Logo" />
            </a>
        </div>
        
        <!-- Main Content -->
        <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; font-weight: bold;">💧 Your Hydration Advice</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Personalized by AI, just for you {user_name}!</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 20px;">
                
                <p style="font-size: 16px; line-height: 1.6; color: #525f7f; margin-top: 0;">
                    Hi {user_name},
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; color: #525f7f;">
                    Thank you for chatting with our AI Hydration Coach! Based on our conversation, here's your personalized hydration advice.
                </p>
                
                {weather_html}
                
                {recommendations_html}
                
                <!-- General Tips -->
                <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #92400e; margin-top: 0;">🎯 Pro Hydration Tips</h3>
                    <ul style="color: #a16207; padding-left: 20px; line-height: 1.6;">
                        <li>Start your day with 500ml of water</li>
                        <li>Drink before you feel thirsty</li>
                        <li>Monitor urine color - aim for pale yellow</li>
                        <li>Herbal teas and water-rich foods count too!</li>
                    </ul>
                </div>
                
                <!-- CTA -->
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://api.whatsapp.com/send?phone=442081336235&text=Hi%20Water%20Bar!%20I%27d%20love%20to%20share%20some%20feedback%20about%20my%20AI%20hydration%20advice." 
                       style="background-color: #25D366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                        💬 Share Feedback on WhatsApp
                    </a>
                </div>
                
                <p style="font-size: 14px; color: #6b7280; text-align: center; font-style: italic;">
                    This advice was generated by The Water Bar's AI Hydration Coach based on real-time data and your personal conversation.
                </p>
                
            </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding: 30px 20px;">
            <p style="font-size: 12px; color: #6b7280; margin: 0;">
                🌊 The Water Bar - Personalized Hydration Solutions
            </p>
            <p style="font-size: 12px; color: #6b7280; margin: 5px 0;">
                <a href="https://www.instagram.com/thewaterbarglobal/" style="color: #007ee6; text-decoration: none;">
                    Follow us on Instagram
                </a>
            </p>
            <p style="font-size: 12px; color: #6b7280; margin: 0;">
                &copy; 2024 | The Water Bar | Dubai, UAE
            </p>
        </div>
        
    </body>
    </html>
    """
    
    return html_content
