# Bubble Orchestration Interface

## 🎨 **Visual Workflow with Draggable Patient Bubbles**

### **The Concept**

Instead of traditional lists and tables, patient cases are represented as **draggable bubbles** that can be moved around the screen. This creates an intuitive, visual workflow for case coordination.

---

## 🔒 **Privacy-First Design**

### **What AI Sees vs What Surgeon Sees**

```
┌─────────────────────────────────────────────────────────────┐
│              PATIENT BUBBLE (Center Display)                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  AI ALWAYS SEES:                                            │
│  ┌─────────────┐                                            │
│  │   #123456   │  ← 6-digit anonymized code               │
│  └─────────────┘                                            │
│                                                             │
│  SURGEON DOUBLE-TAPS:                                       │
│  ┌─────────────┐                                            │
│  │  John Doe   │  ← PII revealed for 3 seconds            │
│  │ 15/05/1960  │  ← NEVER leaves device                   │
│  └─────────────┘  ← Then hides again                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### **Security Flow:**
1. **Case ID (#123456)** - Always visible, AI uses for emails
2. **Double-tap bubble** - Shows PII from Dexie (local)
3. **Auto-hide after 3s** - Returns to case ID display
4. **Never synced** - PII never sent to cloud/AI

---

## 🎯 **Interface Layout**

```
┌────────────────────────────────────────────────────────────────┐
│                     MAIN CANVAS (Center)                       │
│                                                                │
│  🤖 AI Suggestions appear here                                 │
│                                                                │
│       💧 Patient bubbles can be dragged here                   │
│                                                                │
│  When AI finds optimal grouping, bubbles move to center        │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│            RIGHT SLIDING PANEL                                 │
├────────────────────────────────────────────────────────────────┤
│  📅 THEATRE AVAILABILITY (Top)                                 │
│  ┌──────────────────────────────────────┐                      │
│  │ London Bridge Hospital               │                      │
│  │ Nov 1, 2025 @ 09:00 | 240 min       │                      │
│  │ [Available]                          │                      │
│  └──────────────────────────────────────┘                      │
│  ┌──────────────────────────────────────┐                      │
│  │ St Mary's Hospital                   │                      │
│  │ Nov 3, 2025 @ 14:00 | 180 min       │                      │
│  │ [Available]                          │                      │
│  └──────────────────────────────────────┘                      │
│                                                                │
│  ─────────────────────────────────────────                     │
│                                                                │
│  💧 PATIENT POOL (Bottom)                                      │
│  ┌───┐  ┌───┐  ┌───┐                                          │
│  │#12│  │#34│  │#56│  ← Draggable bubbles                    │
│  │345│  │567│  │789│                                          │
│  └───┘  └───┘  └───┘                                          │
│                                                                │
│  ┌───┐  ┌───┐  ┌───┐                                          │
│  │#98│  │#11│  │#22│                                          │
│  │765│  │111│  │222│                                          │
│  └───┘  └───┘  └───┘                                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 🎮 **Interactions**

### **Patient Bubble Actions:**

1. **Grab & Drag**
   ```
   - Click and hold bubble
   - Drag to center canvas
   - Release to position
   - Move freely around workspace
   ```

2. **Single Tap**
   ```
   → Opens journey status panel
   → Shows email tracking
   → Displays procedure details
   → Equipment requirements
   ```

3. **Double Tap** (Center ID Bubble)
   ```
   → Reveals PII for 3 seconds
   → Name, DOB, NHS number
   → LOCAL ONLY (never transmitted)
   → Auto-hides after timeout
   ```

### **Theatre Slot Actions:**

1. **Click slot**
   ```
   → Highlights matching patients
   → Shows compatible procedures
   → Calculates profitability
   ```

---

## 🤖 **AI Orchestration**

### **Automatic Matching:**

```typescript
// AI continuously analyzes:
1. Unscheduled patients (pool bubbles)
2. Available theatre slots (panel top)
3. Equipment requirements
4. Profitability calculations

// When optimal match found:
AI moves bubbles from right panel → center canvas
Shows suggestion banner: "🤖 3 cases matched for London Bridge"
```

### **Visual Workflow:**

```
BEFORE AI MATCH:
┌─────────────────┐
│ Right Panel     │
│ [Pool]          │
│  💧💧💧          │
│  💧💧💧          │
└─────────────────┘

AFTER AI MATCH:
┌─────────────────┐       ┌─────────────────┐
│ Right Panel     │       │ Center Canvas   │
│ [Pool]          │  →    │                 │
│  💧💧            │       │   💧💧💧 ✨      │
│  💧              │       │                 │
└─────────────────┘       └─────────────────┘
                          ↑ Matched group
```

---

## 🎨 **Bubble Colors & States**

```
Status Colors:
┌──────────────────────────────────────────┐
│ 🔵 Blue    → Planning                    │
│ 🟡 Yellow  → Scheduled                   │
│ 🟢 Green   → Confirmed                   │
│ 🟣 Purple  → Completed                   │
│ ⚪ Gray    → Draft                       │
└──────────────────────────────────────────┘

Indicators:
┌──────────────────────────────────────────┐
│ 🔴 Red badge  → Pending emails (count)   │
│ ✨ Sparkle    → AI suggestion            │
│ 📍 Pin        → Fixed position           │
└──────────────────────────────────────────┘
```

---

## 📝 **Name Search Feature**

### **"People write patient names in Excel, right?"**

Yes! You can search by name to find the case code:

```typescript
// Surgeon types in search:
"John Doe" → 

// System finds:
Patient: John Doe
DOB: 15/05/1960
NHS: 123-456-7890
─────────────────
Case ID: #123456 ✅

// Highlights bubble in pool
// Surgeon can then grab and move it
```

### **Search Box (Top Left):**
```
┌────────────────────────────────┐
│ 🔍 Search patient name...      │
└────────────────────────────────┘
      ↓ (Enter)
┌────────────────────────────────┐
│ Found: John Doe → Case #123456 │
│ [Show in Pool]                 │
└────────────────────────────────┘
```

---

## 🔄 **Complete User Journey**

### **Scenario: Surgeon books 3 cases**

```
1️⃣ PATIENT INTAKE
   - Surgeon adds 3 patients via form
   - Each gets 6-digit code (Dexie local)
   - Bubbles appear in right panel pool

2️⃣ SECRETARY UPLOADS THEATRE LIST
   - CSV uploaded
   - Slots appear in panel top section
   - Shows: Hospital, Date, Time, Duration

3️⃣ AI AUTO-MATCHING
   - AI analyzes pool vs slots
   - Finds: 3 fusion biopsies → London Bridge
   - Moves bubbles to center canvas
   - Shows: "🤖 £1,600 profit (44% margin)"

4️⃣ SURGEON REVIEWS
   - Taps bubble → See patient details
   - Double-taps center → Verify name (local)
   - Drags to rearrange if needed

5️⃣ ONE-CLICK BOOKING
   - Clicks "Book Group"
   - Theatre slot created
   - Email workflow triggered
   - Bubbles turn yellow (scheduled)

6️⃣ EMAIL TRACKING
   - Tap bubble → See email status
   - Red badge shows pending count
   - Journey updates in real-time
```

---

## 🖼️ **Image Assets in Bubbles**

### **Your Diagram Images:**

You mentioned putting each image in individual files. Map them like this:

```typescript
const STAKEHOLDER_IMAGES = {
  document: '/images/stakeholders/document.png',      // 📋 Secretary
  mri_scanner: '/images/stakeholders/mri.png',        // 🔬 Radiology
  biopsy_needle: '/images/stakeholders/biopsy.png',   // 💉 Procedure
  hospital: '/images/stakeholders/hospital.png',      // 🏥 Theatre
  uk_map: '/images/stakeholders/transport.png'        // 🗺️ Logistics
}

// Render in bubble:
<div className="w-20 h-20 rounded-full overflow-hidden">
  <img src={STAKEHOLDER_IMAGES.hospital} alt="Hospital" />
</div>
```

---

## 🚀 **Quick Start**

```bash
# 1. Visit bubble interface
http://localhost:3000/surgeon/bubble

# 2. Add test cases (in console)
async function addTestCase() {
  const { patientHelpers, caseHelpers } = await import('/lib/dexie-db')
  
  const patient = await patientHelpers.create({
    patientName: 'Test Patient',
    patientDOB: '1970-01-01',
    nhsNumber: '999-999-9999'
  })
  
  await caseHelpers.create({
    localId: patient.localId,
    lesionType: 'Gleason_7',
    targetCount: 4,
    prostateVolume: 45,
    priorBiopsyCount: 0,
    mriQuality: 'excellent',
    suggestedProcedure: 'fusion_biopsy',
    status: 'planning'
  })
  
  window.dispatchEvent(new Event('case-updated'))
}

addTestCase()

# 3. Bubbles appear in right panel pool

# 4. Try interactions:
- Single tap bubble → Journey status
- Double tap center → PII reveal (3s)
- Drag bubble → Move to canvas
- Open right panel → See theatre slots
```

---

## 🎯 **Benefits of Bubble Interface**

### **vs Traditional List View:**

| Feature | Traditional List | Bubble Interface |
|---------|-----------------|------------------|
| **Visual Grouping** | Static rows | Dynamic spatial arrangement |
| **AI Suggestions** | Text-based | Visual movement |
| **Drag & Drop** | ❌ | ✅ Natural gesture |
| **PII Protection** | Always visible | Hidden by default |
| **Multi-select** | Checkboxes | Grab multiple bubbles |
| **Cost Optimization** | Separate screen | Visual proximity = grouping |

---

## 🔐 **Privacy Compliance**

- ✅ **GDPR Compliant** - PII never leaves device
- ✅ **Anonymization** - AI only sees 6-digit codes
- ✅ **Local Storage** - Dexie.js for sensitive data
- ✅ **Cloud Workflow** - Only case status in Supabase
- ✅ **Audit Trail** - Email events tracked
- ✅ **Right to Erasure** - Delete from Dexie removes all PII

---

## 📊 **Performance**

- **Smooth 60fps animations** (Framer Motion)
- **Lazy loading** - Bubbles render on-demand
- **Gesture optimization** - Drag detection throttled
- **Memory efficient** - Virtual scrolling for large pools
- **Offline capable** - Works without internet (Dexie)

---

**Built with:** 
- React + Framer Motion (animations)
- @use-gesture/react (drag & gestures)
- Dexie.js (local storage)
- Supabase (cloud workflow)

**Pattern inspired by:** Water Bar bubble-hub.tsx
