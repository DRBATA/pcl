# 📧 Email Agent - Final Testing Plan

## 🔄 Complete Flow Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         CUSTOMER JOURNEY                        │
└─────────────────────────────────────────────────────────────────┘

1. PURCHASE
   ├─ Customer buys drinks at thewater.bar
   ├─ Order created in Supabase (orders + order_items)
   └─ Initial receipt email sent (water-bar-receipt.tsx)
       └─ Includes "📱 Update My Tracker" button

2. TRACKING INITIATION
   ├─ Customer clicks "Update My Tracker" button
   ├─ Opens: https://thewater.bar/?tracking_order_id=ORDER_ID
   └─ Hydration Assessment Modal opens on "Drinks" tab

3. CONSUMPTION TRACKING
   ├─ DrinksPanel loads order items from /api/orders/{orderId}/items
   ├─ Customer checks boxes for consumed drinks
   ├─ Customer clicks "Add" button
   └─ POST to /api/orders/update-consumption
       └─ Updates order_items.consumed = true in Supabase

4. EMAIL AGENT TRIGGERS
   ├─ Realtime/Polling detects consumed = true
   ├─ Agent filters out category = 'drink' (mocktails)
   ├─ Agent fetches product details (description, bio_mechanisms, tags)
   ├─ Claude generates personalized advice
   └─ Follow-up email sent (water-bar-followup.tsx)
       ├─ Shows consumed vs remaining drinks
       ├─ AI advice about specific product benefits
       └─ "📱 Update My Tracker" button (if drinks remaining)

5. LOOP CONTINUES
   └─ Customer tracks more drinks → Step 3 repeats
```

---

## 🧪 Test Scenarios

### **Scenario 1: Electrolyte-Deficient User** ⚡
**Profile:** Post-workout, needs sodium/potassium replenishment

**Test Order:**
```sql
-- Order ID: test-order-001
-- Email: test-electrolytes@example.com
-- Items:
1. Humantra Electrolytes (product, not mocktail)
2. Prana Spring Water (product)
3. Golden Kayan Elixir (product)
```

**Test Steps:**
1. ✅ Create order in Supabase
2. ✅ Click tracker button in receipt email
3. ✅ Mark "Humantra Electrolytes" as consumed
4. ✅ Verify email sent with:
   - Product benefits (electrolyte balance, hydration)
   - Remaining: Prana Spring Water, Golden Kayan Elixir
   - Tracker button present
5. ✅ Mark "Prana Spring Water" as consumed
6. ✅ Verify second email sent
7. ✅ Mark final drink as consumed
8. ✅ Verify completion email (no tracker button)

**Expected Claude Response Example:**
> "Excellent choice with Humantra Electrolytes! The balanced sodium and potassium will help restore your mineral levels after physical activity. The electrolyte blend supports optimal cellular hydration. Don't forget your Prana Spring Water and Golden Kayan Elixir!"

---

### **Scenario 2: Immune Support User** 🛡️
**Profile:** Feeling run-down, needs immune-boosting nutrients

**Test Order:**
```sql
-- Order ID: test-order-002
-- Email: test-immunity@example.com
-- Items:
1. Golden Kayan Elixir (turmeric, adaptogens)
2. The Alchemist (if available)
```

**Test Steps:**
1. ✅ Create order
2. ✅ Mark "Golden Kayan Elixir" as consumed
3. ✅ Verify email mentions:
   - Anti-inflammatory benefits
   - Adaptogen support
   - Immune system enhancement
4. ✅ Mark remaining drink
5. ✅ Verify completion email

**Expected Claude Response Example:**
> "Great choice with the Golden Kayan Elixir! The turmeric and adaptogens provide powerful anti-inflammatory support and help strengthen your immune system. The blend is designed to support your body's natural defenses. Keep up the hydration!"

---

### **Scenario 3: Mixed Order (Mocktails + Products)** 🍹
**Profile:** Pop-up event attendee with mocktails + fridge products

**Test Order:**
```sql
-- Order ID: test-order-003
-- Email: test-mixed@example.com
-- Items:
1. "Sunset Mocktail" (category = 'drink' - SHOULD BE FILTERED OUT)
2. Gaia Experience (product)
3. "Tropical Breeze" (category = 'drink' - SHOULD BE FILTERED OUT)
4. Humantra Electrolytes (product)
```

**Test Steps:**
1. ✅ Create order with mix of mocktails and products
2. ✅ Mark "Sunset Mocktail" as consumed
3. ✅ Verify NO email sent (mocktail filtered out)
4. ✅ Mark "Gaia Experience" as consumed
5. ✅ Verify email sent ONLY about Gaia Experience
6. ✅ Email should NOT mention mocktails
7. ✅ Remaining drinks shown: Humantra Electrolytes only (mocktails excluded)

**Expected Behavior:**
- Agent logs: `⏭️  No trackable items (all mocktails/pop-up products)` for mocktails
- Email only references fridge products
- Tracker button works correctly

---

## 🧰 Testing Tools & Commands

### **1. Start Email Agent Locally**
```bash
cd c:\Users\azamb\OneDrive\Desktop\THE.WATER.BAR\website\hedra-avatar-starter\waterbar-avatar\backend
npm run dev
```

### **2. Create Test Order (Supabase SQL)**
```sql
-- Insert test order
INSERT INTO orders (id, email, customer_name, total, created_at)
VALUES (
  'test-order-001',
  'test-electrolytes@example.com',
  'Test User Electrolytes',
  45.00,
  NOW()
);

-- Insert order items
INSERT INTO order_items (order_id, item_id, name, qty, price, consumed)
VALUES 
  ('test-order-001', '44d55f80-5174-4938-90b8-02d46987e1f3', 'Humantra Electrolytes', 1, 15.00, false),
  ('test-order-001', '87081f28-9b07-4a3c-a64f-086a711a9f32', 'Prana Spring Water', 1, 12.00, false),
  ('test-order-001', 'product-id-3', 'Golden Kayan Elixir', 1, 18.00, false);
```

### **3. Simulate Consumption (Supabase SQL)**
```sql
-- Mark item as consumed
UPDATE order_items 
SET consumed = true, updated_at = NOW()
WHERE order_id = 'test-order-001' 
AND item_id = '44d55f80-5174-4938-90b8-02d46987e1f3';
```

### **4. Check Agent Logs**
```bash
# Watch for:
✅ "📊 Consumption detected: Humantra Electrolytes"
✅ "🔄 Processing consumption update for order: test-order-001"
✅ "📧 Sending follow-up email to test-electrolytes@example.com"
❌ "⏭️  No trackable items (all mocktails)" (for mocktails)
```

### **5. Check Sent Email (Resend Dashboard)**
- Login: https://resend.com/emails
- Verify:
  - ✅ Subject: "Keep up the hydration! 💧"
  - ✅ Consumed drinks listed
  - ✅ Remaining drinks listed
  - ✅ AI advice mentions specific product benefits
  - ✅ Tracker button present (if drinks remaining)

---

## 🚨 Edge Cases to Test

### **Edge Case 1: All Mocktails**
```sql
-- Order with ONLY category = 'drink' items
INSERT INTO order_items (order_id, item_id, name, consumed)
VALUES ('test-order-004', 'mocktail-id', 'Test Mocktail', true);

-- Expected: NO email sent, agent logs skip message
```

### **Edge Case 2: Rapid Consumption**
```sql
-- Mark multiple items consumed within seconds
UPDATE order_items SET consumed = true WHERE order_id = 'test-order-001';

-- Expected: Single email sent (not duplicates)
```

### **Edge Case 3: Product Without Details**
```sql
-- Item with item_id that doesn't exist in products table
INSERT INTO order_items (order_id, item_id, name, consumed)
VALUES ('test-order-005', 'non-existent-id', 'Mystery Product', true);

-- Expected: Generic advice fallback
```

### **Edge Case 4: Invalid Email**
```sql
-- Order with bad email format
INSERT INTO orders (id, email) VALUES ('test-order-006', 'bad-email');

-- Expected: Resend API error, agent handles gracefully
```

---

## ✅ Success Criteria

### **Email Content Quality**
- [ ] Claude mentions specific product benefits (not generic)
- [ ] Advice is scientifically accurate
- [ ] Tone is encouraging and friendly
- [ ] Product descriptions accurate

### **Filtering Works**
- [ ] Mocktails (category = 'drink') never trigger emails
- [ ] Mixed orders only email about products
- [ ] Logs show skipped mocktails

### **Tracker Integration**
- [ ] Button opens hydration panel on Drinks tab
- [ ] Order ID passed correctly in URL
- [ ] Panel loads correct order items
- [ ] Consumption update triggers email

### **No Duplicates**
- [ ] Each consumed item triggers email once
- [ ] Rapid consumption handled
- [ ] `processedItems` set prevents duplicates

### **Production Ready**
- [ ] Agent runs 24/7 without crashing
- [ ] Errors logged, not fatal
- [ ] Graceful degradation (Resend down, etc.)
- [ ] Memory usage stable

---

## 🚀 Deployment Checklist

Once all tests pass:

```bash
# 1. Push to Fly.io
fly deploy --config fly.email-agent.toml --app waterbar-email-agent

# 2. Check logs
fly logs --app waterbar-email-agent

# 3. Verify agent started
# Look for: "✅ Email Follow-Up Agent initialized"

# 4. Test in production with real order
# (Use your own email first!)
```

---

## 📊 Test Results Log

| Scenario | Status | Notes |
|----------|--------|-------|
| Electrolyte User | ⏳ Pending | |
| Immune Support User | ⏳ Pending | |
| Mixed Order (Mocktails) | ⏳ Pending | |
| Edge Case: All Mocktails | ⏳ Pending | |
| Edge Case: Rapid Consumption | ⏳ Pending | |
| Edge Case: Missing Product | ⏳ Pending | |
| Edge Case: Invalid Email | ⏳ Pending | |

---

**Today's Goal:** ✅ All scenarios passing, agent deployed, ready for real users!
