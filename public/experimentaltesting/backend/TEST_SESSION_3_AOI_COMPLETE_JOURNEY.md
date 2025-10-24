# 🧪 TEST SESSION 3: AOI COMPLETE JOURNEY

**Duration:** 2-3 hours  
**Goal:** Test the complete Art of Implosion booking + hydration + payment flow

---

## 🎯 **WHAT WE'RE TESTING:**

1. **Flow 6a:** AOI booking with paired hydration
2. **Flow 5:** QR cart share (staff dashboard redistribution)
3. **Complete experience journey** with tracker
4. **AI drink pairing** based on experience (not assessment)
5. **Final payment** with tracker email

---

## 📋 **PRE-TEST SETUP**

### **Reduce Prices for Testing:**

```sql
-- Use Stripe MCP to create test prices (or update existing)
-- Temporarily reduce AOI experience prices for testing

UPDATE experiences
SET price = 10  -- AED 10 for testing
WHERE name LIKE '%Sauna%' OR name LIKE '%Ice Bath%' OR name LIKE '%Massage%';

UPDATE products
SET price_aed = 5  -- AED 5 for testing drinks
WHERE name IN ('Humantra Electrolytes', 'Prana Spring Water', 'Ginger Shot');
```

**Remember to revert after testing!**

### **Test User:**
- **Email:** `aoi-journey@example.com`
- **Name:** Test Customer

---

## 🧪 **TEST 3.1: Create AOI Booking with Experience Pairing**

### **Setup:**
- Open AOI site: (wherever the booking form is)
- Or use API directly

### **Steps:**

#### **1. Create Booking:**
- **Experience:** Air Implosion Dome (528Hz)
- **Date:** Tomorrow
- **Time:** 10:00 AM
- **Duration:** 60 minutes
- **Email:** `aoi-journey@example.com`

#### **2. AI Generates Paired Drinks:**
```
Expected AI pairing for 528Hz/parasympathetic experience:
- Pre: Humantra Electrolytes (prep nervous system)
- During: Prana Spring Water (maintain hydration)
- After: Golden Kayan (recovery)
```

#### **3. Verify Booking Created:**
```sql
SELECT 
  b.id,
  b.customer_email,
  b.experience_id,
  b.date,
  b.time,
  b.pre_drinks,
  b.during_drinks,
  b.after_drinks,
  b.payment_status,
  e.name as experience_name
FROM bookings b
JOIN experiences e ON b.experience_id = e.id
WHERE b.customer_email = 'aoi-journey@example.com'
ORDER BY b.created_at DESC
LIMIT 1;
```

**Expected:**
- `pre_drinks`: `[{"product_id": "...", "name": "Humantra Electrolytes", "quantity": 1, "reason": "..."}]`
- `during_drinks`: Similar array
- `after_drinks`: Similar array
- `payment_status`: 'unpaid'

---

## 🧪 **TEST 3.2: Staff Dashboard - QR Cart Share (Flow 5)**

### **Setup:**
- Open AOI staff dashboard
- Search for booking: `aoi-journey@example.com`

### **Steps:**

#### **1. View Booking Details:**
- Booking shows with status "Confirmed"
- Shows paired drinks (Pre/During/After)
- Each drink has **"Add to Cart"** button

#### **2. Add Drinks to Cart (Manual):**
- Click "Add to Cart" for Pre drink (Humantra)
- Click "Add to Cart" for During drink (Prana)
- Click "Add to Cart" for After drink (Golden Kayan)
- Cart icon shows: 3 items

#### **3. Click QR Button (Flow 5):**
- Click **"🔗 Share Plan Only"** button (not payment!)
- QR code appears
- **NO PAYMENT** happens yet

#### **4. Verify Cart Transfer:**
```sql
-- Check cart_items created with recommendations
SELECT 
  ci.id,
  ci.cart_id,
  ci.item_id,
  ci.qty,
  ci.plan,  -- Should have AI recommendation data
  p.name
FROM cart_items ci
JOIN products p ON ci.item_id = p.id
JOIN cart_headers ch ON ci.cart_id = ch.id
WHERE ch.customer_email = 'aoi-journey@example.com'
ORDER BY ci.created_at DESC;
```

**Expected:**
- 3 cart items created
- Each has `plan` field with JSONB:
  ```json
  {
    "reason": "Prep nervous system for 528Hz experience",
    "timing": "pre",
    "ai_recommendation": true
  }
  ```

### **Expected Results:**

✅ **QR Share (No Payment):**
- QR generated successfully
- Cart items created with recommendations
- sessionStorage stays on customer device
- NO email sent (this is cart transfer only)

✅ **Cart Items Have Recommendations:**
```sql
SELECT 
  ci.plan->>'reason' as reason,
  ci.plan->>'timing' as timing,
  p.name
FROM cart_items ci
JOIN products p ON ci.item_id = p.id
WHERE ci.cart_id IN (
  SELECT id FROM cart_headers 
  WHERE customer_email = 'aoi-journey@example.com'
);
```

---

## 🧪 **TEST 3.3: Customer Completes Experience & Checks Out**

### **Scenario:**
Customer arrives at AOI, completes their Air Implosion Dome session, drinks are consumed.

### **Steps:**

#### **1. Mark Experience as Complete:**
```sql
-- Staff marks booking as completed
UPDATE bookings
SET status = 'completed'
WHERE customer_email = 'aoi-journey@example.com'
  AND date = CURRENT_DATE;
```

#### **2. Customer Opens Cart:**
- Customer scans QR from earlier (or opens cart link)
- Cart shows 3 drinks ready for payment
- Each drink shows timing (Pre/During/After) and reasoning

#### **3. Add Experience to Cart:**
```sql
-- Add the experience itself to cart for payment
INSERT INTO cart_items (cart_id, item_id, qty, booking_id)
SELECT 
  ch.id,
  b.experience_id,
  1,
  b.id
FROM cart_headers ch
JOIN bookings b ON b.customer_email = ch.customer_email
WHERE ch.customer_email = 'aoi-journey@example.com'
  AND b.status = 'completed'
LIMIT 1;
```

Or via API:
```typescript
POST /api/cart/add-booking
{
  "bookingId": "booking-uuid",
  "experienceId": "experience-uuid",
  "customerEmail": "aoi-journey@example.com"
}
```

#### **4. Checkout:**
- Cart shows:
  - Air Implosion Dome (60min) - AED 10
  - Humantra Electrolytes - AED 5
  - Prana Spring Water - AED 5
  - Golden Kayan - AED 5
  - **Total: AED 25**
- Click **"💳 Pay on This Device"**
- Complete Stripe payment

### **Expected Results:**

✅ **Order Created:**
```sql
SELECT 
  o.id,
  o.email,
  o.total,
  o.venue_id,
  v.name as venue_name,
  oi.name as item_name,
  oi.qty,
  oi.claimed_at
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
LEFT JOIN venue v ON o.venue_id = v.id
WHERE o.email = 'aoi-journey@example.com'
ORDER BY o.created_at DESC
LIMIT 1;
```

**Expected:**
- 4 order items (1 experience + 3 drinks)
- `venue_id`: AOI venue
- All items `claimed_at`: NOW() (no PINs)

✅ **Booking Payment Status Updated:**
```sql
SELECT 
  id,
  payment_status,
  status
FROM bookings
WHERE customer_email = 'aoi-journey@example.com'
ORDER BY created_at DESC
LIMIT 1;
```

**Expected:**
- `payment_status`: 'paid'
- `status`: 'completed'

✅ **Email Sent (AOI Booking Email):**
- Template: `aoi-booking-confirmation.tsx`
- **Subject:** "Your AOI Experience Confirmation + Receipt"
- **Contains:**
  - Experience details (Air Implosion Dome, 528Hz)
  - Duration, date, time
  - Paired drinks consumed (Pre/During/After)
  - **Tracker button** to mark drinks consumed
  - Total paid
- **NOT assessment-based** - this is experience-based

✅ **Stock Decreased at AOI:**
```sql
SELECT 
  p.name,
  vs.qty_on_hand,
  sa.quantity_added,
  sa.notes
FROM venue_stock vs
JOIN products p ON vs.product_id = p.id
LEFT JOIN stock_additions sa ON sa.venue_id = vs.venue_id AND sa.product_id = vs.product_id
WHERE vs.venue_id = '20c2f440-9133-42ec-a8d6-6336e649ec4b'  -- AOI venue ID
  AND p.name IN ('Humantra Electrolytes', 'Prana Spring Water', 'Golden Kayan')
ORDER BY sa.created_at DESC
LIMIT 5;
```

---

## 🧪 **TEST 3.4: Tracker Updates After AOI Experience**

### **Steps:**

#### **1. Open Email:**
- Check inbox: `aoi-journey@example.com`
- Open AOI booking confirmation email

#### **2. Click Tracker Button:**
- Click **"📱 Track My Hydration"**
- Opens: `https://thewater.bar/?track_order=[ORDER_ID]`

### **Expected Results:**

✅ **Tracker Page Shows:**
- "You completed: Air Implosion Dome (528Hz)"
- Shows drinks consumed:
  - Pre: Humantra Electrolytes
  - During: Prana Spring Water  
  - After: Golden Kayan
- Option to mark each as consumed with timestamp

✅ **Mark Drinks Consumed:**
- Click "Mark as Consumed" for each drink
- Updates Dexie (if assessment exists) or creates new log

✅ **Suggests Next Steps:**
- "Based on this experience, we recommend..."
- Option to book another session
- Option to start full hydration assessment

---

## 🧪 **TEST 3.5: Combined Flow - Assessment + AOI Experience**

### **Advanced Test: What if customer does assessment BEFORE booking?**

### **Steps:**

#### **1. Customer Does Self-Assessment:**
- Go to `/hydration-assessment`
- Complete full assessment
- Assessment stored in Dexie

#### **2. Book AOI Experience:**
- Create booking for tomorrow
- AI pairs drinks based on experience type

#### **3. Complete Experience:**
- Experience completed
- Drinks consumed

#### **4. Final Payment:**
- Pay for experience + drinks

#### **5. Check Email:**
- Should receive **AOI booking email** (experience-based)
- NOT hydration assessment email
- Tracker button can update existing Dexie assessment

### **Expected Results:**

✅ **Correct Email Template:**
- Uses `aoi-booking-confirmation.tsx` (not `water-bar-receipt.tsx`)
- Shows experience details
- Shows paired drinks

✅ **Tracker Integrates:**
- Tracker page knows about existing assessment
- Can add consumption to assessment timeline
- Updates deficits based on drinks consumed

---

## ✅ **SESSION 3 CHECKLIST**

- [ ] **Test 3.1:** AOI booking created with AI-paired drinks
- [ ] **Test 3.1:** Drinks stored as JSONB in booking table
- [ ] **Test 3.2:** Staff dashboard shows bookings correctly
- [ ] **Test 3.2:** QR cart share creates cart with recommendations
- [ ] **Test 3.2:** NO payment, NO email (cart transfer only)
- [ ] **Test 3.3:** Customer can add experience + drinks to cart
- [ ] **Test 3.3:** Payment processes correctly
- [ ] **Test 3.3:** AOI booking email sent (NOT assessment email)
- [ ] **Test 3.3:** Stock decreased at AOI venue
- [ ] **Test 3.3:** Booking payment_status updated to 'paid'
- [ ] **Test 3.4:** Tracker shows experience details
- [ ] **Test 3.4:** Can mark drinks as consumed
- [ ] **Test 3.5:** Assessment + experience integration works
- [ ] **All:** No PINs created

---

## 🐛 **COMMON ISSUES & FIXES**

### **Issue: Wrong email template sent**
- Check: Order type detection in webhook
- Check: Is booking_id present in order_items?
- If booking exists → `aoi-booking-confirmation.tsx`
- If assessment exists → `water-bar-receipt.tsx`

### **Issue: Drinks not paired with experience**
- Check: AI pairing logic in booking creation
- Check: `pre_drinks`, `during_drinks`, `after_drinks` in bookings table
- SQL: `SELECT pre_drinks, during_drinks, after_drinks FROM bookings WHERE id = 'BOOKING_ID';`

### **Issue: Stock not decreasing**
- Check: venue_id in cart_items
- Check: AOI venue ID matches: `20c2f440-9133-42ec-a8d6-6336e649ec4b`
- Check: migrate_cart_to_order RPC runs successfully

### **Issue: Booking payment_status not updating**
- Check: Webhook updates bookings table
- SQL: `SELECT * FROM bookings WHERE customer_email = 'EMAIL' ORDER BY created_at DESC;`
- Check: RPC includes booking update logic

---

## 📊 **SUCCESS CRITERIA**

✅ Complete AOI journey from booking to payment  
✅ AI pairs drinks correctly with experience  
✅ QR cart share works without payment  
✅ AOI booking email sent (not assessment email)  
✅ Tracker integrates with experience timeline  
✅ Stock updates at AOI venue  
✅ Booking payment status updated  
✅ Combined assessment + experience flow works  

**If all pass → SHIP IT!** 🚀🎉

---

## 🎁 **BONUS: Use Stripe MCP for Testing**

### **Get Test Card:**
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

### **Refund Test Payments:**
```typescript
// Use Stripe MCP to refund
await mcp4_create_refund({
  payment_intent: "pi_xxxxx",
  amount: 2500, // Amount in cents (AED 25)
  reason: "requested_by_customer"
});
```

### **Check Orders:**
```sql
-- View all test orders
SELECT 
  o.id,
  o.email,
  o.total,
  o.created_at,
  COUNT(oi.id) as item_count
FROM orders o
LEFT JOIN order_items oi ON oi.order_id = o.id
WHERE o.email LIKE '%test%' OR o.email LIKE '%example%'
GROUP BY o.id
ORDER BY o.created_at DESC;
```

**Happy Testing!** 🧪✨
