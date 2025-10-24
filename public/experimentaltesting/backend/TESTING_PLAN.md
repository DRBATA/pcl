# 🧪 Email Agent Testing Plan

## **What We Built Today:**

### ✅ **Complete Hydration Tracking System**
1. **Frontend** (thewater.bar)
   - Email receipt with "Update My Hydration Tracking" button
   - Auto-open modal when clicking from email
   - Multi-select UI for consumed drinks
   - Batch update to Dexie + Supabase

2. **Backend** (Supabase)
   - `consumed` column on `order_items` table
   - Realtime enabled with trigger function
   - API endpoints for fetching order items
   - Indexes for performance

3. **Email Agent** (Fly.io)
   - Autonomous Supabase Realtime listener
   - Order + booking context fetcher
   - AI-powered personalization
   - MCP bridge for sending emails
   - **No LiveKit dependency** (clean, lightweight)

---

## **Testing Instructions:**

### **Step 1: Start the Email Agent**

```bash
cd backend
python email_agent.py
```

**Expected output:**
```
🚀 Email Follow-Up Agent initialized
✅ Email Follow-Up Agent started
👂 Listening for drink consumption updates...
✅ Subscribed to order_items changes
```

---

### **Step 2: Check Available Orders**

```bash
python test_email_agent.py
```

This will show:
- Available orders
- Order items with consumed status
- Instructions for triggering

---

### **Step 3: Trigger Consumption Update**

#### **Option A: Via Supabase Dashboard**
1. Go to Supabase → Table Editor → `order_items`
2. Find an unconsumed item
3. Edit the row, set `consumed = true`
4. Save

#### **Option B: Via SQL**
```sql
-- Get an unconsumed item
SELECT id, order_id, product_id, consumed 
FROM order_items 
WHERE consumed = false 
LIMIT 1;

-- Mark it consumed
UPDATE order_items 
SET consumed = true 
WHERE id = 'YOUR-ITEM-ID-HERE';
```

---

### **Step 4: Watch the Logs**

The email agent should immediately log:

```
📊 Consumption update received: {...}
🔄 Processing consumption update for order: abc-123
📊 Order abc-123: 1/3 consumed, 2 remaining
📧 Sending follow-up email (remaining drinks) to customer@email.com
✅ Follow-up email sent to customer@email.com
```

---

### **Step 5: Check Email**

Look for email in the customer's inbox with:
- Subject: "Great job! 2 drinks left 🥤" (or similar)
- List of consumed drinks
- List of remaining drinks
- Personalized AI message
- Booking context (if applicable)

---

## **What to Verify:**

### ✅ **Realtime Trigger**
- [ ] Agent logs show "Consumption update received"
- [ ] Happens within ~1 second of database update

### ✅ **Order Context**
- [ ] Agent fetches order details correctly
- [ ] Shows consumed vs remaining count
- [ ] Fetches product names

### ✅ **Booking Context (if applicable)**
- [ ] Fetches experience name
- [ ] Includes tags/advice
- [ ] AI personalizes message based on experience

### ✅ **Email Sending**
- [ ] MCP bridge calls Resend API
- [ ] Email delivered to customer
- [ ] Email logged to Supabase `email_log` table

### ✅ **Completion Flow**
- [ ] When ALL drinks consumed → sends completion email
- [ ] Different message/subject
- [ ] Congratulatory tone

---

## **Troubleshooting:**

### **No logs appearing:**
- Check Supabase Realtime is enabled on `order_items`
- Verify trigger function exists
- Check agent has correct `SUPABASE_SERVICE_ROLE_KEY`

### **Email not sending:**
- Check `RESEND_API_KEY` is set
- Verify MCP server path is correct
- Check Resend domain is verified

### **Wrong email content:**
- Check order items have product names
- Verify booking context query
- Review AI prompt in `generate_follow_up_context`

---

## **Deploy to Fly.io (When Ready):**

```bash
# Navigate to backend
cd backend

# Deploy
fly deploy

# Check logs
fly logs
```

---

## **Next Steps After Testing:**

1. ✅ Verify email agent works end-to-end
2. ✅ Test with real order (place order → consume drinks → check email)
3. ✅ Fine-tune AI messages
4. 🎉 **REST AND CELEBRATE!** 🎂

---

## **What's Next (Future):**

- Morning Party V1 (state check-ins + autonomic orchestrator)
- Party booking website (group experiences)
- Seed→Feed→Signal choreography (V2)
- QR room joining (LiveKit)
- Staff escalation system

---

**Built with love over a year. Happy almost birthday! 🎉**
