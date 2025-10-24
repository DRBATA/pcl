# 🧪 TEST SESSION 1: NO ASSESSMENT FLOWS

**Duration:** 1-2 hours  
**Goal:** Verify basic purchase flows without assessments work correctly across venues

---

## 🎯 **WHAT WE'RE TESTING:**

1. **Flow 1:** Customer direct purchase (own device)
2. **Flow 2B:** Staff QR purchase (no assessment)
3. **Stock updates** at correct venues
4. **Tracker button** in emails (even without assessment)
5. **Venue selection** impacts stock correctly

---

## 📋 **PRE-TEST SETUP**

### **Check Current Stock Levels:**

```sql
-- Run in Supabase SQL Editor
SELECT 
  v.name as venue_name,
  p.name as product_name,
  vs.qty_on_hand
FROM venue_stock vs
JOIN venue v ON vs.venue_id = v.id
JOIN products p ON vs.product_id = p.id
WHERE p.name IN ('Humantra Electrolytes', 'Prana Spring Water', 'Ginger Shot')
ORDER BY v.name, p.name;
```

**Record the numbers** - we'll verify they decrease correctly!

---

## 🧪 **TEST 1.1: Flow 1 - Customer Direct Purchase (AOI Venue)**

### **Setup:**
- Open thewater.bar in incognito window
- Open browser DevTools → Network tab (to see API calls)

### **Steps:**
1. Browse product catalog
2. Add 2x Humantra Electrolytes to cart
3. Add 1x Prana Spring Water to cart
4. Click cart → Select **"Art of Implosion"** venue from dropdown
5. Click **"💳 Pay on This Device"**
6. Complete Stripe checkout (use test card: `4242 4242 4242 4242`)

### **Expected Results:**

✅ **Webhook Processing:**
```
- migrate_cart_to_order RPC called
- Order created in orders table
- Order items created (no PINs, claimed_at = NOW())
```

✅ **Stock Decrease at AOI:**
```sql
-- Check stock decreased at AOI venue
SELECT 
  v.name,
  p.name,
  vs.qty_on_hand,
  sa.quantity_added,
  sa.notes
FROM venue_stock vs
JOIN venue v ON vs.venue_id = v.id
JOIN products p ON vs.product_id = p.id
LEFT JOIN stock_additions sa ON sa.venue_id = vs.venue_id 
  AND sa.product_id = vs.product_id
WHERE v.name = 'Art of Implosion x Johny Dar Experience'
  AND p.name IN ('Humantra Electrolytes', 'Prana Spring Water')
ORDER BY sa.created_at DESC
LIMIT 5;
```

Expected:
- Humantra: qty_on_hand decreased by 2
- Prana: qty_on_hand decreased by 1
- stock_additions entries with negative quantities

✅ **Email Received:**
- Subject: "Your Water Bar Receipt #[ORDER_ID]"
- Contains: Order items, total, venue name
- **HAS TRACKER BUTTON:** "Start Your Hydration Journey"
- NO assessment data (no micronutrients, no meals)

✅ **Tracker Button Works:**
- Click tracker button in email
- Opens: `https://thewater.bar/?track_order=[ORDER_ID]`
- Can start new assessment from there

### **Verify in Supabase:**
```sql
-- Get the order details
SELECT 
  o.id,
  o.email,
  o.total,
  o.created_at,
  oi.name,
  oi.qty,
  oi.venue_id,
  oi.claimed_at,
  v.name as venue_name
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
LEFT JOIN venue v ON oi.venue_id = v.id
WHERE o.email = 'YOUR_TEST_EMAIL@example.com'
ORDER BY o.created_at DESC
LIMIT 1;
```

---

## 🧪 **TEST 1.2: Flow 1 - Different Venue (F45)**

### **Setup:**
- Clear browser storage (new session)
- Open thewater.bar in incognito

### **Steps:**
1. Add 1x Ginger Shot to cart
2. Add 1x Humantra Electrolytes to cart
3. Click cart → Select **"F45 Training – Dubai DIFC"** venue
4. Click **"💳 Pay on This Device"**
5. Complete Stripe checkout

### **Expected Results:**

✅ **Stock Decrease at F45 (NOT AOI):**
```sql
-- Verify stock decreased at F45
SELECT 
  v.name,
  p.name,
  vs.qty_on_hand
FROM venue_stock vs
JOIN venue v ON vs.venue_id = v.id
JOIN products p ON vs.product_id = p.id
WHERE v.name = 'F45 Training – Dubai DIFC'
  AND p.name IN ('Ginger Shot', 'Humantra Electrolytes')
ORDER BY p.name;
```

✅ **Stock at AOI Unchanged** (from Test 1.1)

✅ **Email with Tracker Button**

---

## 🧪 **TEST 1.3: Flow 2B - Staff QR Purchase (No Assessment)**

### **Setup:**
- **Staff Device:** Open thewater.bar in Chrome
- **Customer Device:** Open in Safari/another browser

### **Steps (Staff Device):**
1. Browse products
2. Add 2x Prana Spring Water to cart
3. Add 1x Ginger Shot to cart
4. Click cart → Select **"The Ice House – Index Mall"** venue
5. Click **"📱 Generate QR for Customer"**
6. **QR Code appears** with Stripe payment URL

### **Steps (Customer Device):**
1. Scan QR code (or copy payment URL manually)
2. Opens Stripe checkout
3. Enter email: `customer@test.com`
4. Complete payment with test card

### **Steps (Staff Device - After Payment):**
1. QR modal shows "✅ Payment Received!"
2. Click "Start New Order"
3. Cart clears, sessionStorage clears

### **Expected Results:**

✅ **Stock Decrease at Ice House:**
```sql
SELECT 
  v.name,
  p.name,
  vs.qty_on_hand
FROM venue_stock vs
JOIN venue v ON vs.venue_id = v.id
JOIN products p ON vs.product_id = p.id
WHERE v.name = 'The Ice House – Index Mall'
  AND p.name IN ('Prana Spring Water', 'Ginger Shot');
```

✅ **Email to Customer:**
- Sent to: `customer@test.com`
- Subject: Basic receipt
- **HAS TRACKER BUTTON**
- NO assessment data

✅ **Staff Device Cleaned:**
- Cart empty
- sessionStorage cleared
- Dexie cleared
- Ready for next customer

---

## 🧪 **TEST 1.4: Tracker Button Creates New Assessment**

### **Steps:**
1. Open email from Test 1.1 or 1.2
2. Click **"Start Your Hydration Journey"** button
3. Opens: `https://thewater.bar/?track_order=[ORDER_ID]`

### **Expected Results:**

✅ **Assessment Page Opens:**
- Shows "Track Your Order" or starts assessment flow
- Can enter body metrics
- Can start new hydration assessment
- Encourages user to complete assessment

✅ **Order Context Available:**
- Can see what drinks were purchased
- Can mark them as consumed
- Can update Dexie with consumption

---

## ✅ **SESSION 1 CHECKLIST**

- [ ] **Test 1.1:** AOI venue stock decreased correctly
- [ ] **Test 1.1:** Email received with tracker button
- [ ] **Test 1.1:** Tracker button links to correct URL
- [ ] **Test 1.2:** F45 venue stock decreased (AOI unchanged)
- [ ] **Test 1.2:** Venue selection impacts correct location
- [ ] **Test 1.3:** QR flow completes successfully
- [ ] **Test 1.3:** Ice House stock decreased
- [ ] **Test 1.3:** Staff device cleaned after payment
- [ ] **Test 1.4:** Tracker button encourages new assessment
- [ ] **All:** No PINs created (order_items.claimed_at = NOW())
- [ ] **All:** Stock audit trail in stock_additions table

---

## 🐛 **COMMON ISSUES & FIXES**

### **Issue: Stock not decreasing**
- Check: Is venue_id set in cart_headers?
- Check: Does migrate_cart_to_order RPC have venue access?
- SQL: `SELECT * FROM cart_headers WHERE session_id = 'YOUR_SESSION' ORDER BY created_at DESC LIMIT 1;`

### **Issue: Email not sent**
- Check: Webhook received by checking Stripe dashboard
- Check: Email log: `SELECT * FROM email_log ORDER BY created_at DESC LIMIT 5;`
- Check: Resend dashboard for delivery status

### **Issue: Tracker button missing**
- Check: Is updateTrackerUrl being passed to email template?
- Check: Email template has tracker button outside assessment conditional

### **Issue: Wrong venue stock decreased**
- Check: venue_id in order_items
- SQL: `SELECT oi.*, v.name FROM order_items oi LEFT JOIN venue v ON oi.venue_id = v.id WHERE order_id = 'ORDER_ID';`

---

## 📊 **SUCCESS CRITERIA**

✅ All 4 tests pass  
✅ Stock decreases at correct venues only  
✅ Emails always include tracker button  
✅ Tracker encourages new assessments  
✅ No PINs created (claimed_at set immediately)  
✅ Staff device clears after QR payment  

**If all pass → Move to Session 2!** 🚀
