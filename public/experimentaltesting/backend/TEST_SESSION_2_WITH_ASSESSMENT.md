# 🧪 TEST SESSION 2: WITH ASSESSMENT FLOWS

**Duration:** 1-2 hours  
**Goal:** Verify assessment flows work correctly with proper email generation

---

## 🎯 **WHAT WE'RE TESTING:**

1. **Flow 3:** Self-assessment + self-payment (own device)
2. **Flow 4:** Staff assessment + QR payment + download link
3. **Email with assessment data** (micronutrients, meals, drinks)
4. **Download link** in Flow 4 only
5. **Tracker button** updates existing assessment

---

## 📋 **PRE-TEST SETUP**

### **Test User Profile:**
- **Weight:** 75kg
- **Body Fat:** 20%
- **Activity Level:** Moderate
- **Sweat Rate:** Moderate
- **Test Email:** `assessment-test@example.com`

---

## 🧪 **TEST 2.1: Flow 3 - Self-Assessment + Self-Payment (F45 Venue)**

### **Setup:**
- Open thewater.bar in incognito
- Clear Dexie: DevTools → Application → IndexedDB → Delete

### **Steps:**

#### **1. Complete Assessment:**
- Go to assessment page (e.g., `/hydration-assessment`)
- Enter profile:
  - Weight: 75kg
  - Body Fat: 20%
  - Activity: Moderate
  - Sweat: Moderate
- Click "Generate Recommendations"

#### **2. Verify Assessment Stored:**
```javascript
// Check in DevTools Console
const db = await import('./lib/dexie-db').then(m => m.db);
const assessment = await db.hydration_assessments.toArray();
console.log('Dexie Assessment:', assessment);

// Check sessionStorage
console.log('Session Assessment:', 
  sessionStorage.getItem('hydrationInputContext'),
  sessionStorage.getItem('hydrationOutputRecommendations')
);
```

#### **3. Add Drinks:**
- Click "Add All" or manually add AI-recommended drinks
- Should add 2-3 drinks based on deficits

#### **4. Checkout:**
- Click cart → Select **"F45 Training – Dubai DIFC"** venue
- Click **"💳 Pay on This Device"**
- Enter email: `assessment-test@example.com`
- Complete payment

### **Expected Results:**

✅ **Email Received:**
- **Subject:** "Your Personalized Hydration Plan + Receipt #[ORDER_ID]"
- **Contains:**
  - ✅ Order items with prices
  - ✅ Micronutrient breakdown (water, sodium, potassium, etc.)
  - ✅ Recommended drinks with reasoning
  - ✅ Recommended meals with images
  - ✅ **"Update My Tracker"** button
  - ❌ NO download link (user already has assessment in Dexie)

✅ **Dexie Still Has Assessment:**
```javascript
// Verify in DevTools
const db = await import('./lib/dexie-db').then(m => m.db);
const assessment = await db.hydration_assessments.toArray();
console.log('Assessment preserved:', assessment.length > 0);
```

✅ **Tracker Button Updates Dexie:**
- Click tracker in email
- Opens tracker page with order context
- Can mark drinks as consumed
- Updates existing Dexie assessment

✅ **Stock Decreased at F45:**
```sql
SELECT 
  v.name,
  p.name,
  vs.qty_on_hand,
  sa.notes
FROM venue_stock vs
JOIN venue v ON vs.venue_id = v.id
JOIN products p ON vs.product_id = p.id
JOIN stock_additions sa ON sa.venue_id = vs.venue_id AND sa.product_id = vs.product_id
WHERE v.name = 'F45 Training – Dubai DIFC'
ORDER BY sa.created_at DESC
LIMIT 5;
```

### **Verify in Supabase:**
```sql
-- Check order and assessment
SELECT 
  o.id,
  o.email,
  o.total,
  ch.assessment_data,
  ch.customer_email
FROM orders o
LEFT JOIN cart_headers ch ON ch.id = o.cart_id
WHERE o.email = 'assessment-test@example.com'
ORDER BY o.created_at DESC
LIMIT 1;
```

**Expected:** `assessment_data` is NULL (not needed for Flow 3)

---

## 🧪 **TEST 2.2: Flow 4 - Staff Assessment + QR + Download (AOI Venue)**

### **Setup:**
- **Staff Device:** Chrome
- **Customer Device:** Safari

### **Steps (Staff Device):**

#### **1. Complete Assessment for Customer:**
- Go to assessment page
- Enter customer profile:
  - Weight: 80kg
  - Body Fat: 25%
  - Activity: Active
  - Sweat: High
- Click "Generate Recommendations"

#### **2. Verify Assessment in Staff SessionStorage:**
```javascript
console.log('INPUT Context:', sessionStorage.getItem('hydrationInputContext'));
console.log('OUTPUT Recommendations:', sessionStorage.getItem('hydrationOutputRecommendations'));
```

#### **3. Add Recommended Drinks:**
- Click "Add All" from recommendations
- Should add 3-4 drinks for high-activity user

#### **4. Generate QR:**
- Click cart → Select **"Art of Implosion x Johny Dar Experience"**
- Click **"📱 Generate QR for Customer"**
- QR appears with payment URL

#### **5. Verify Staff Cleanup:**
```javascript
// After QR generated, check:
console.log('INPUT cleared?', sessionStorage.getItem('hydrationInputContext')); // Should be null
console.log('OUTPUT kept?', sessionStorage.getItem('hydrationOutputRecommendations')); // Should still exist

// Check Dexie cleared
const db = await import('./lib/dexie-db').then(m => m.db);
const assessments = await db.hydration_assessments.toArray();
console.log('Dexie cleared?', assessments.length === 0); // Should be true
```

### **Steps (Customer Device):**

#### **1. Scan QR & Pay:**
- Scan QR (or copy URL)
- Opens Stripe checkout
- Enter email: `customer-download@example.com`
- Complete payment

### **Expected Results:**

✅ **Email to Customer:**
- **Subject:** "Your Personalized Hydration Plan + Receipt #[ORDER_ID]"
- **Contains:**
  - ✅ Order items
  - ✅ Micronutrient breakdown
  - ✅ Recommended drinks with reasoning
  - ✅ Recommended meals with images
  - ✅ **"Download My Assessment"** button (Flow 4 special!)
  - ✅ **"Update My Tracker"** button

✅ **Download Button Works:**
- Click "Download My Assessment" in email
- Opens: `https://thewater.bar/?track_order=[ORDER_ID]&download=true`
- Assessment loads from cart_headers into customer's Dexie
- Customer now has full assessment on their device!

✅ **Verify Download:**
```javascript
// On customer device after clicking download
const db = await import('./lib/dexie-db').then(m => m.db);
const assessment = await db.hydration_assessments.toArray();
console.log('Downloaded assessment:', assessment);
// Should have profile, targets, deficits, etc.
```

✅ **Staff Device Ready:**
- Cart cleared
- SessionStorage cleared
- Dexie cleared
- QR modal closed
- Ready for next customer

✅ **Stock Decreased at AOI:**
```sql
SELECT 
  v.name,
  p.name,
  vs.qty_on_hand
FROM venue_stock vs
JOIN venue v ON vs.venue_id = v.id
JOIN products p ON vs.product_id = p.id
WHERE v.name LIKE '%Art of Implosion%'
ORDER BY p.name;
```

### **Verify in Supabase:**
```sql
-- Check assessment stored in cart_headers
SELECT 
  o.id,
  o.email,
  ch.assessment_data->>'profile' as profile,
  ch.assessment_data->>'dailyTargets' as targets
FROM orders o
JOIN cart_headers ch ON ch.id = o.cart_id
WHERE o.email = 'customer-download@example.com'
ORDER BY o.created_at DESC
LIMIT 1;
```

**Expected:** `assessment_data` is NOT NULL (has full INPUT context)

---

## 🧪 **TEST 2.3: Email Template Verification**

### **Compare Both Emails:**

| Feature | Flow 3 (Self) | Flow 4 (Staff→Customer) |
|---------|---------------|-------------------------|
| **Micronutrients** | ✅ Yes | ✅ Yes |
| **Recommended Drinks** | ✅ Yes | ✅ Yes |
| **Recommended Meals** | ✅ Yes | ✅ Yes |
| **Meal Images** | ✅ Yes (from Supabase) | ✅ Yes (from Supabase) |
| **Tracker Button** | ✅ "Update My Tracker" | ✅ "Update My Tracker" |
| **Download Button** | ❌ No | ✅ YES |
| **Button Text** | "Log to timeline" | "Save context to device" |

### **Check Email Rendering:**
- **Colors:** Should use product color palette (blended from cart items)
- **Images:** Meal pictures load from Supabase storage
- **Links:** All buttons link to correct URLs
- **Mobile:** Test on actual phone (Gmail, Apple Mail)

---

## 🧪 **TEST 2.4: Tracker Updates with Assessment**

### **Steps:**
1. Open email from Test 2.1 (self-assessment)
2. Click "Update My Tracker"
3. Opens tracker page

### **Expected Results:**

✅ **Assessment Context Available:**
- Page shows "You have an existing assessment"
- Shows current deficits
- Shows drinks purchased
- Can mark drinks as consumed

✅ **Dexie Updates:**
```javascript
// After marking drinks consumed
const db = await import('./lib/dexie-db').then(m => m.db);
const drinkLogs = await db.drink_logs.toArray();
console.log('Consumed drinks:', drinkLogs);
// Should show logged drinks with timestamps
```

✅ **Recalculation:**
- Deficits recalculated after consumption
- Shows updated hydration status
- Suggests next steps

---

## ✅ **SESSION 2 CHECKLIST**

- [ ] **Test 2.1:** Self-assessment email has micronutrients, meals, drinks
- [ ] **Test 2.1:** NO download button (user has assessment in Dexie)
- [ ] **Test 2.1:** Tracker button updates existing assessment
- [ ] **Test 2.1:** Dexie preserved after payment
- [ ] **Test 2.2:** Staff assessment → QR works
- [ ] **Test 2.2:** Customer receives email WITH download button
- [ ] **Test 2.2:** Download button loads assessment into customer Dexie
- [ ] **Test 2.2:** Staff device cleaned completely
- [ ] **Test 2.2:** Assessment stored in cart_headers
- [ ] **Test 2.3:** Both emails render correctly
- [ ] **Test 2.3:** Meal images load from Supabase
- [ ] **Test 2.3:** Colors use product palette
- [ ] **Test 2.4:** Tracker updates with existing assessment
- [ ] **All:** Stock updates at correct venues

---

## 🐛 **COMMON ISSUES & FIXES**

### **Issue: No assessment in email**
- Check: sessionStorage before payment
- Check: assessmentData passed to /api/send-receipt-email
- SQL: `SELECT ch.assessment_data FROM cart_headers ch WHERE session_id = 'SESSION_ID';`

### **Issue: Download button missing**
- Check: downloadAssessmentUrl prop passed to email template
- Check: cart_headers has assessment_data
- Only appears in Flow 4 (staff → customer)

### **Issue: Meal images broken**
- Check: Supabase storage bucket "meal-images" is public
- Check: Image URLs in assessment_data
- SQL: `SELECT * FROM storage.objects WHERE bucket_id = 'meal-images' LIMIT 5;`

### **Issue: Dexie not updating**
- Check: Tracker page has Dexie import
- Check: Browser allows IndexedDB
- Check: No errors in console

---

## 📊 **SUCCESS CRITERIA**

✅ Flow 3 (self-assessment) email complete  
✅ Flow 4 (staff→customer) email with download link  
✅ Download button loads assessment to customer device  
✅ Tracker integrates with existing assessments  
✅ Meal images render correctly  
✅ Colors use product palette  
✅ Stock updates at correct venues  

**If all pass → Move to Session 3!** 🚀
