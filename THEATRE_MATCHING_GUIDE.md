# Theatre Matching & Cost Optimization Guide

## 🎯 **The Business Problem**

**Equipment transport is expensive** - sending a stepper system, ultrasound, and fusion software to a hospital costs £500+ in transport alone, plus tech time.

**Solution:** Group multiple procedures at the same hospital on the same day to **justify the equipment setup cost**.

---

## 💰 **Cost Breakdown**

### **Single Procedure (Unprofitable)**
```
Revenue:     £1,200 (fusion biopsy fee)
Costs:
  - Transport:      £500
  - Equipment:      £400
  - Tech time:      £300
  ─────────────────────────
Total Cost:         £1,200
PROFIT:             £0 ❌ (Break-even at best)
```

### **3 Procedures Same Hospital (Profitable)**
```
Revenue:     £3,600 (3 x £1,200)
Costs:
  - Transport:      £500 (shared!)
  - Equipment:      £600 (shared setup)
  - Tech time:      £900 (3 procedures)
  ─────────────────────────
Total Cost:         £2,000
PROFIT:             £1,600 ✅ (44% margin)
```

---

## 📊 **How Theatre Matching Works**

### **Step 1: Surgeon Has Patient List**
```
Case #123456 - Gleason 7, Fusion Biopsy
Case #234567 - Gleason 8, HIFU
Case #345678 - Gleason 6, Fusion Biopsy
```

### **Step 2: Secretary Provides Theatre List (CSV)**
```csv
hospital_name, date, time, duration
London Bridge Hospital, 2025-11-01, 09:00, 240
St Mary's Hospital, 2025-11-03, 14:00, 180
London Bridge Hospital, 2025-11-05, 08:00, 300
```

### **Step 3: AI Analyzes Grouping Options**

The AI looks at:
1. **Hospital matching** - Which cases can go to the same hospital?
2. **Time fitting** - Do the cases fit in available slots?
3. **Equipment overlap** - What equipment is shared?
4. **Profitability** - What's the profit margin?

### **Step 4: AI Suggests Optimal Grouping**

```
🎯 RECOMMENDED GROUPING #1
──────────────────────────────────────────
Hospital:    London Bridge Hospital
Date:        2025-11-01 (Friday)
Cases:       3 procedures
  - Case #123456: Fusion Biopsy (45min)
  - Case #345678: Fusion Biopsy (45min)
  - Case #234567: HIFU (90min)

Equipment:
  ✓ BK Ultrasound (shared)
  ✓ 6-DOF Stepper (shared)
  ✓ MIM Fusion Software (shared)
  ✓ HIFU Device (for 1 case)

Financial:
  Revenue:  £4,700
  Cost:     £2,200
  Profit:   £2,500
  Margin:   53% ✅ EXCELLENT

AI Reasoning:
"Grouping 3 procedures at London Bridge allows
shared equipment setup. Transport cost fully
justified. Tech can handle all 3 in sequence.
Optimal batch!"
```

---

## 🧮 **Profit Calculation Logic**

### **Revenue Per Procedure**
- Fusion Biopsy: £1,200
- HIFU: £2,500
- IRE/NanoKnife: £3,000

### **Fixed Costs (Shared Across Batch)**
- Transport: £500 (one trip)
- Equipment Setup: £200 per device type
- Initial Calibration: £200

### **Variable Costs (Per Procedure)**
- Tech Time: £300 per procedure
- Consumables: £100 per procedure

### **Formula**
```typescript
const fixedCost = 500 + (equipmentTypes.length * 200) + 200
const variableCost = procedures.length * 400
const totalCost = fixedCost + variableCost

const totalRevenue = procedures.reduce((sum, p) => sum + p.fee, 0)
const profit = totalRevenue - totalCost
const profitMargin = (profit / totalRevenue) * 100
```

---

## 🚨 **Minimum Grouping Rules**

### **Single Case: Avoid Unless Urgent**
- Profit margin: ~0%
- Only book if:
  - Emergency case
  - High-value procedure (IRE £3K+)
  - Hospital already has equipment on-site

### **2 Cases: Acceptable**
- Profit margin: ~25-30%
- Criteria:
  - Same hospital
  - Same or adjacent time slots
  - Shared equipment needs

### **3+ Cases: Optimal (TARGET)**
- Profit margin: 40-50%+
- Criteria:
  - Same hospital
  - Same day
  - Equipment fully utilized
  - **THIS IS THE SWEET SPOT**

---

## 📅 **Secretary Workflow Integration**

### **What Secretary Provides:**
1. **Theatre availability list** (CSV or Excel)
   - Hospital names
   - Available dates
   - Time slots
   - Duration available

2. **Hospital contact info**
   - Theatre coordinator email
   - Booking reference format

### **What Surgeon Sees:**
- AI-matched groupings
- Profitability for each option
- Equipment requirements
- One-click booking

---

## 🤖 **AI Analysis Features**

### **Current Implementation:**
```typescript
// Group by hospital
const casesByHospital = groupByHospital(cases)

// Match to available slots
const matchedSlots = matchToAvailability(casesByHospital, theatreSlots)

// Calculate profitability
const suggestions = matchedSlots.map(slot => ({
  cases: slot.cases,
  equipment: getRequiredEquipment(slot.cases),
  cost: calculateCost(slot.cases, slot.equipment),
  revenue: calculateRevenue(slot.cases),
  profit: revenue - cost,
  profitMargin: (profit / revenue) * 100
}))

// Sort by profitability
suggestions.sort((a, b) => b.profit - a.profit)
```

### **Future Enhancements:**
- **Surgeon trend learning**: Track which groupings surgeon prefers
- **Historical profit tracking**: Learn from past procedures
- **Equipment availability**: Check PCL equipment calendar
- **Travel time optimization**: Factor in hospital locations
- **Procedure complexity weighting**: Adjust time estimates based on Gleason score

---

## 📊 **Example Scenarios**

### **Scenario A: Perfect Batch**
```
3 cases at London Bridge Hospital
2 x Fusion Biopsy + 1 x HIFU
Same day, sequential slots
Profit: £2,500 (53% margin) ✅
```

### **Scenario B: Split Decision**
```
Option 1: 2 cases at St Mary's
  Profit: £800 (30% margin)

Option 2: Wait 2 days, group 3 at London Bridge
  Profit: £2,500 (53% margin) ✅

AI Recommendation: Wait for better grouping
```

### **Scenario C: Urgent Case Override**
```
Single IRE case - emergency
Revenue: £3,000
Cost: £1,800
Profit: £1,200 (40% margin)
AI Note: "Acceptable for high-value urgent case"
```

---

## 🎨 **UI Components**

### **TheatreMatchingDashboard.tsx**
- Upload theatre list
- View unscheduled cases
- See AI suggestions
- Book optimal groupings

### **Key Features:**
1. **Side-by-side comparison**: Cases vs Slots
2. **Profitability highlighting**: Green (50%+), Yellow (30-50%), Orange (<30%)
3. **AI reasoning**: Explains why grouping is optimal
4. **One-click booking**: Creates theatre slot + updates cases
5. **Equipment breakdown**: Shows shared vs unique equipment

---

## 🔄 **Integration with Email Workflow**

Once surgeon books a grouping:

1. **Dexie updates:**
   - Theatre slot created
   - Cases marked as "scheduled"
   - Equipment requirements logged

2. **Trigger email workflow:**
   ```typescript
   // Send to secretary
   sendEmail({
     to: surgeon.secretaryEmail,
     subject: `Theatre Booking: 3 cases at ${hospital}`,
     body: `Please contact PCL to arrange...`
   })
   ```

3. **Status tracking:**
   - Email sent → Supabase
   - Secretary clicks "Notify" → Status updated
   - Round robin continues...

---

## 📈 **Success Metrics**

Track these to prove ROI:

- **Average cases per batch**: Target 3+
- **Average profit margin**: Target 45%+
- **Equipment utilization**: % of trips with 3+ cases
- **Surgeon satisfaction**: Time saved on scheduling

---

## 🚀 **Quick Start**

```bash
# 1. Visit surgeon dashboard
/surgeon/dashboard

# 2. Add patient cases
Click "Patient List" → Add cases

# 3. Upload theatre availability
Switch to "Theatre Matching" tab
Upload CSV from secretary

# 4. Run AI analysis
Click "Run AI Analysis"

# 5. Book optimal grouping
Review suggestions → Click "Book This Grouping"
```

---

**Built for:** Prostate Care Limited (PCL)
**Purpose:** Maximize equipment efficiency & profitability through intelligent case grouping
