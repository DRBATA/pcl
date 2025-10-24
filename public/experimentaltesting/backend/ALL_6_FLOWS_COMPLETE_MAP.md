# 🎯 COMPLETE 6 CHECKOUT FLOWS MAP

## 📊 **DATA STORAGE ARCHITECTURE**

### **4 Storage Locations (Different Purposes):**

| Location | Purpose | When Used |
|----------|---------|-----------|
| **1. Dexie (Browser)** | Local hydration tracking on user's device | Always when user completes assessment on own device |
| **2. Cart_Headers (Supabase)** | Hydration context (INPUT) for download | When user needs to download assessment to their device later (Flow 4) |
| **3. Cart_Items (Supabase)** | Recommendations (OUTPUT) with cart items | AI redistribution in QR transfer to AOI booking (Flow 5) |
| **4. SessionStorage (Browser)** | Assessment for immediate email generation | All flows that send assessment emails |

---

## 📧 **2 EMAIL TYPES**

### **Email Type 1: Hydration Assessment Email** (`water-bar-receipt.tsx`)
- **Contains:** Micronutrient breakdown, recommended drinks, recommended meals
- **Meal Pictures:** Stored as blobs in Supabase `hydration_assessment` table
- **Tracker Button:** ✅ (when drinks purchased)
- **Download Link:** ✅ (only when assessment in cart_headers - Flow 4)
- **Triggered By:** Flows 2A, 3, 4

### **Email Type 2: AOI Booking Email** (`aoi-booking-confirmation.tsx`)
- **Contains:** Experience details + paired hydration drinks
- **Based On:** AOI booking experience pairing (NOT assessment)
- **Tracker Button:** ✅ (when drinks purchased)
- **Download Link:** ❌
- **Triggered By:** Flow 6a

---

## 🔄 **THE 6 FLOWS**

### **Flow 1: Direct Purchase (No Assessment)**
```
❌ No Assessment → Browse Catalog → Add to Cart → Select Venue → 💳 Pay on Device
```
**Storage:** None (standard e-commerce)  
**Email:** Basic receipt (no assessment data)  
**Use Case:** Customer browsing without personalization

---

### **Flow 2A: Staff Device QR (With Assessment)**
```
✅ Staff Assessment → AI Recommendations → Add to Cart → 📱 Generate QR → Customer Pays
```
**Storage:**
- SessionStorage ✅ (staff device, for email)
- Cart_Headers ✅ (INPUT context for download)
- Dexie ❌ (staff clears)

**Email:** Hydration Assessment Email with download link  
**Use Case:** Pop-up events, venue staff assists with assessment

---

### **Flow 2B: Staff Device QR (No Assessment)**
```
❌ No Assessment → Staff Browses → Add to Cart → 📱 Generate QR → Customer Pays
```
**Storage:** None  
**Email:** Basic receipt (no assessment data)  
**Use Case:** Staff-mediated purchase without personalization

---

### **Flow 3: Self-Assessment + Self-Payment**
```
✅ User Assessment → Add Drinks → 💳 Pay on Own Device
```
**Storage:**
- Dexie ✅ (own device)
- SessionStorage ✅ (for email)
- Cart_Headers ❌ (not needed, user has it in Dexie)

**Email:** Hydration Assessment Email (NO download link needed)  
**Use Case:** Self-service hydration assessment + purchase

---

### **Flow 4: Staff Assessment + QR Payment + Download**
```
✅ Staff Assessment → Add Drinks → 📱 Generate QR → Customer Pays
```
**Storage:**
- SessionStorage ✅ (staff device, for email)
- Cart_Headers ✅ (INPUT context for customer download)
- Cart_Items ✅ (with recommendations)
- Dexie ❌ (staff clears after transfer)

**Email:** Hydration Assessment Email WITH download link  
**Download Flow:** Customer clicks link → Assessment loads into their Dexie  
**Use Case:** Staff assesses, customer gets full assessment on their device

---

### **Flow 5: QR Cart Share (AOI Staff Dashboard)**
```
🔗 Staff Clicks QR → Cart Transfer with AI Recommendations → NO PAYMENT → NO EMAIL
```
**Storage:**
- Cart_Items ✅ (recommendations in JSONB plan field)
- SessionStorage ✅ (stays on user device, not transferred)
- Cart_Headers ❌
- Dexie ❌

**Email:** NONE (cart transfer only)  
**Use Case:** AI-driven drink redistribution during AOI booking  
**Button:** 🔗 Share Plan Only (No Payment)

---

### **Flow 6a: AOI Booking + Paired Hydration + Tracker**
```
🏛️ Book Experience → AI Pairs Drinks → Complete Experience → Add Drinks → Pay
```
**Storage:**
- Cart_Items ✅ (with booking metadata)
- SessionStorage ❌
- Cart_Headers ❌
- Dexie ❌

**Email:** AOI Booking Email (aoi-booking-confirmation.tsx)  
**Contains:** Experience details + paired drinks + tracker  
**NOT Assessment-Based:** Experience-based pairing only  
**Use Case:** AOI wellness experience with hydration pairing

---

## ✅ **VERIFICATION CHECKLIST**

### **Storage Layer:**
- [ ] Dexie stores assessments locally (Flow 3)
- [ ] Cart_Headers stores INPUT context for download (Flow 4)
- [ ] Cart_Items stores recommendations in plan field (Flow 5)
- [ ] SessionStorage used for email generation (Flows 2A, 3, 4)

### **Email Templates:**
- [ ] water-bar-receipt.tsx handles both assessment and non-assessment cases
- [ ] Download link only shown when cart_headers has assessment_data
- [ ] aoi-booking-confirmation.tsx for experience bookings
- [ ] Meal pictures stored in hydration_assessment table

### **API Endpoints:**
- [ ] /api/stripe/checkout handles assessmentData (can be null)
- [ ] /api/stripe/checkout stores in cart_headers when present
- [ ] /api/send-receipt-email handles assessmentData from sessionStorage
- [ ] /api/stripe/webhook fetches assessment from cart_headers
- [ ] /api/cart/generate-booking-qr handles Flow 5 (no payment)

### **Frontend Components:**
- [ ] cart-summary.tsx has 3 buttons (Pay, Generate QR, Share Plan)
- [ ] Venue selector determines which buttons show
- [ ] handleCheckout for Flow 1 & 3
- [ ] handleGenerateCustomerQR for Flow 2A, 2B, 4
- [ ] handleSharePlanQR for Flow 5

### **AOI Integration:**
- [ ] Staff booking dashboard has QR button (Flow 5)
- [ ] Booking system pairs experiences with drinks (Flow 6a)
- [ ] aoi-booking-confirmation email sent after booking payment

---

## 🎯 **SPLIT INTO 3 TESTING SESSIONS**

### **Session 1: Basic Flows (1, 2A, 2B)**
- Test Flow 1: No assessment, direct payment
- Test Flow 2A: Staff assessment → QR → email with plan
- Test Flow 2B: No assessment → QR → basic email

### **Session 2: Advanced Assessment (3, 4)**
- Test Flow 3: Self-assessment → self-payment → email (no download link)
- Test Flow 4: Staff assessment → QR → email WITH download link → customer downloads to Dexie

### **Session 3: AOI Integration (5, 6a)**
- Test Flow 5: Cart share QR (no email, just cart transfer)
- Test Flow 6a: Booking → paired drinks → tracker email

---

## 📝 **KEY PRINCIPLES**

1. **Assessment storage is redundant by design** - multiple locations serve different purposes
2. **Not all flows populate all storage locations** - depends on use case
3. **Email type depends on data source** - assessment-based vs experience-based
4. **Download link only when needed** - Flow 4 (staff → customer transfer)
5. **Flow 5 is cart transfer only** - no payment, no email
6. **Flow 6a is experience-based** - not assessment-based

---

**Next Steps:** Verify each flow one by one, testing storage and email behavior.
