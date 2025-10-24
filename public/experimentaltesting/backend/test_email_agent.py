"""
Test script for Email Follow-Up Agent
Simulates consumption updates without real orders
"""
import asyncio
import os
from lib.supabase_client import supabase_client

async def test_consumption_trigger():
    """Test by manually updating an order item"""
    
    print("🧪 Testing Email Follow-Up Agent...")
    print("=" * 60)
    
    # First, let's see if we have any orders to test with
    print("\n1️⃣  Checking for existing orders...")
    
    orders_response = supabase_client.client.table('orders').select('*').limit(5).execute()
    
    if not orders_response.data:
        print("❌ No orders found. Create an order first on thewater.bar")
        return
    
    print(f"✅ Found {len(orders_response.data)} orders")
    
    for order in orders_response.data:
        print(f"\n📦 Order: {order['id'][:8]}...")
        print(f"   Customer: {order.get('customer_name', 'Unknown')}")
        print(f"   Email: {order.get('email', order.get('customer_email'))}")
        
        # Get items
        items_response = supabase_client.client.table('order_items').select('*').eq('order_id', order['id']).execute()
        
        if items_response.data:
            print(f"   Items: {len(items_response.data)}")
            for item in items_response.data:
                consumed_status = "✅" if item.get('consumed') else "⏳"
                print(f"     {consumed_status} Item {item['id'][:8]}... (consumed: {item.get('consumed', False)})")
    
    # Ask user which item to test
    print("\n" + "=" * 60)
    print("2️⃣  To test the email agent:")
    print("   1. Copy an order_item ID from above")
    print("   2. Make sure the email agent is running:")
    print("      python email_agent.py")
    print("   3. Run this SQL to trigger:")
    print("\n      UPDATE order_items")
    print("      SET consumed = true")
    print("      WHERE id = 'YOUR-ITEM-ID';")
    print("\n   4. Watch the email_agent.py logs for:")
    print("      📊 Consumption update received")
    print("      🔄 Processing consumption update")
    print("      📧 Sending follow-up email")
    print("      ✅ Email sent")
    print("\n" + "=" * 60)


if __name__ == "__main__":
    asyncio.run(test_consumption_trigger())
