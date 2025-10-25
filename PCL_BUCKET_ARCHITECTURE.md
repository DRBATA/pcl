# PCL Bucket-Based Agent Architecture

## 🚨 **CRITICAL: Agent NEVER Sees PII**

The agent operates on **bucket state**, not Dexie data:

### ✅ **What Agent SEES:**
- Anonymous case IDs: `#123456`
- Bucket positions: `unsorted`, `thinking_about_it`, `wants_to_proceed`, `booked`
- Case metadata: Gleason score, procedure type, target count
- Email log: Communication history

### ❌ **What Agent NEVER SEES:**
- Patient names
- Date of birth
- NHS numbers
- Addresses
- Any PII from Dexie

---

## 🪣 **The Bucket State Machine**

```
┌─────────────────────────────────────────────────────────────┐
│ 1. UNSORTED                                                 │
│ ════════════════════════════════════════════════════════════│
│ • Surgeon just loaded cases                                 │
│ • Subagent analyzes: "Fits MRI fusion criteria?"          │
│ • Main agent offers suggestions in chat                     │
│ • Surgeon reviews and decides                               │
└─────────────────────────────────────────────────────────────┘
          ↓ Surgeon drags case to next bucket
┌─────────────────────────────────────────────────────────────┐
│ 2. THINKING_ABOUT_IT                                        │
│ ═══════════════════════════════════════════════════════════ │
│ • Subagent suggested this case                              │
│ • Surgeon considering options                               │
│ • Agent waits for surgeon command                           │
│ • No automated actions                                      │
└─────────────────────────────────────────────────────────────┘
          ↓ Surgeon: "Check with patient"
┌─────────────────────────────────────────────────────────────┐
│ 3. WANTS_TO_PROCEED                                         │
│ ═══════════════════════════════════════════════════════════ │
│ • Surgeon approved this case                                │
│ • Agent drafts email: "Secretary, chase patient"           │
│ • Subagent checks groupability (3+ cases = profitable)     │
│ • Orchestration begins (slots, equipment, hospitals)        │
└─────────────────────────────────────────────────────────────┘
          ↓ Patient confirms + Slot found + Hospital approves
┌─────────────────────────────────────────────────────────────┐
│ 4. BOOKED                                                   │
│ ═══════════════════════════════════════════════════════════ │
│ • Theatre slot confirmed                                    │
│ • All emails sent and confirmed                             │
│ • Bubble fully lit: 🟢🟢🟢🟢🟢                                │
│ • Workflow complete                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📧 **Real-World Example: Cancellation → Booking**

### **Week 1: Cancellation Happens**

```
Day 1:
Surgeon: "I have a cancellation next Thursday"
    ↓
Main Agent: [Checks email log, knows surgeon schedule]
Main Agent → Secretary: "Do we have cases for Thursday slot?"
    ↓
Secretary → Surgeon: "3 potential patients attached"
    ↓
Surgeon reviews, selects case #123456
Surgeon loads into system (Dexie PII stored locally)
    ↓
React UI: Case #123456 appears in "UNSORTED" bucket
```

### **Week 1: Agent Analyzes (NO PII Access)**

```
Day 2:
React → FastAPI: {
  bucket_state: {
    unsorted: ["#123456"],
    case_metadata: {
      "#123456": {
        gleason_score: "3+4=7",
        target_count: 4,
        mri_quality: "excellent"
        // NO patient name, NO DOB
      }
    }
  }
}
    ↓
Subagent: analyze_unsorted("#123456")
Result: "✅ Fits MRI fusion criteria (Gleason 3+4, 4 targets, excellent MRI)"
    ↓
Main Agent → Surgeon (chat):
"Case #123456 matches fusion biopsy criteria. Want to proceed?"
```

### **Week 1: Surgeon Decides**

```
Day 3:
Surgeon drags #123456 → "THINKING_ABOUT_IT" bucket
    ↓
React detects bucket change
Agent sees: thinking_about_it: ["#123456"]
Agent: [Waits for surgeon command, no auto-actions]
    ↓
Surgeon (in chat): "Check with patient about availability"
    ↓
Agent drafts email:
  To: surgeon_secretary@hospital.com
  Subject: "Patient Availability Check - Case #123456"
  Body: "Please confirm patient availability for fusion biopsy..."
  [Requires surgeon approval]
    ↓
Surgeon reviews email, clicks "Send"
Agent sends email
```

### **Week 2: Patient Confirms**

```
Day 5:
Email arrives → Agent's LiveKit room:
  From: secretary@hospital.com
  Subject: "Case #123456 - Patient Confirmed"
  Body: "Patient available next 2 weeks..."
    ↓
Agent processes email
Agent → Surgeon: "Patient #123456 confirmed. Move to orchestration?"
    ↓
Surgeon drags #123456 → "WANTS_TO_PROCEED" bucket
    ↓
NOW orchestration begins
```

### **Week 2: Orchestration (Hospital Refuses <3 Cases)**

```
Day 6:
Agent checks wants_to_proceed bucket: ["#123456"]
Only 1 case!
    ↓
Subagent: calculate_profitability(1 case)
Result: £1,200 revenue - £1,200 equipment = £0 profit (break even)
    ↓
Agent → Surgeon:
"⚠️ Only 1 case ready. Break-even, not profitable.
Hospital may refuse equipment cost for single case.
Recommendation: Wait for 2 more fusion biopsies."
    ↓
Surgeon: "Contact hospital anyway"
    ↓
Agent drafts email to hospital:
  "Theatre slot request for 1 fusion biopsy..."
    ↓
Hospital replies:
  "Declined. Equipment cost requires minimum 3 cases for viability."
    ↓
Agent → Surgeon:
"Hospital refused. Strategy: Chase more patients to build demand."
```

### **Week 3: Second Case Added**

```
Day 10:
Another case #234567 → wants_to_proceed bucket
Now: ["#123456", "#234567"]
    ↓
Subagent: calculate_profitability(2 cases)
Result: £2,400 revenue - £1,200 equipment = £1,200 profit (50% margin)
    ↓
Agent → Surgeon:
"2 cases ready. £1,200 profit (50% margin).
Still not optimal. Hospital may accept but encourage waiting for 3rd case.
Need 1 more for 66% margin."
```

### **Week 3: Third Case = Profitable!**

```
Day 12:
Third case #345678 → wants_to_proceed bucket
Now: ["#123456", "#234567", "#345678"]
    ↓
Subagent: calculate_profitability(3 cases)
Result: £3,600 revenue - £1,200 equipment = £2,400 profit (66% margin) ✅
    ↓
Subagent: check_equipment_parallel([dates])
Subagent: match_theatre_slots_parallel([hospitals])
    ↓
Both subagents run in parallel:
  Equipment: BK Ultrasound + Stepper available Nov 1st ✅
  Theatre: London Bridge has 300min slot Nov 1st 09:00 ✅
    ↓
Main Agent → Surgeon:
"🎉 READY TO BOOK!
• 3 fusion biopsies
• £2,400 profit (66% margin)
• Equipment available Nov 1st
• Theatre slot available: London Bridge, Nov 1st 09:00
Approve booking?"
```

### **Week 3: Surgeon Approves → Emails Sent**

```
Day 13:
Surgeon: "Yes, book it"
    ↓
Agent sends parallel emails:
  1. Secretary: "Confirm MRI fusion prep for 3 cases"
  2. Hospital: "Book 300min slot Nov 1st for 3 fusion biopsies"
  3. Equipment: "Transport BK Ultrasound + Stepper to London Bridge Nov 1st"
  4. Application Tech: "On-site support needed Nov 1st"
    ↓
Email log updated (agent's memory)
```

### **Week 4: Confirmations Arrive**

```
Day 15:
Email 1: "Secretary: MRI ready for all 3 cases"
    → Agent: update_case_status(["#123456", "#234567", "#345678"], "radiology_status", "confirmed")
    → Supabase updated
    → Bubbles: 🟢 Radiology icon lights up

Day 16:
Email 2: "Hospital: Slot confirmed Nov 1st 09:00"
    → Agent: update_case_status(..., "hospital_status", "confirmed")
    → Bubbles: 🟢 Hospital icon lights up

Day 17:
Email 3: "Equipment: Dispatched, arrives Nov 1st 08:00"
    → Agent: update_case_status(..., "equipment_status", "confirmed")
    → Bubbles: 🟢 Equipment icon lights up

Day 18:
Email 4: "Tech: On-site confirmed"
    → Agent: update_case_status(..., "tech_status", "confirmed")
    → Bubbles: 🟢 Tech icon lights up
```

### **Week 4: All Confirmed → Move to BOOKED**

```
Day 19:
All 5 stakeholders confirmed: 🟢🟢🟢🟢🟢
    ↓
Agent → Surgeon:
"✅ All confirmations received!
• MRI fusion ready
• Theatre slot: Nov 1st 09:00
• Equipment: Dispatched
• Tech support: Confirmed
• Transport: Arranged

Procedure ready. Cases moved to BOOKED."
    ↓
React UI: All 3 cases → BOOKED bucket
Surgeon sees fully lit bubbles in app
```

---

## 🔄 **Data Flow (PII Protection)**

```
┌────────────────────────────────────────────────────────────┐
│ BROWSER (Dexie)                                            │
│ ═══════════════════════════════════════════════════════════│
│ PII STORED LOCALLY:                                        │
│ • patientName: "John Smith"                                │
│ • patientDOB: "1965-03-15"                                 │
│ • nhsNumber: "123-456-7890"                                │
│                                                            │
│ + Clinical data:                                           │
│ • localId: "550e8400-e29b-41d4-a716-446655440000"         │
│ • lesionType: "Gleason_7"                                  │
│ • targetCount: 4                                           │
└────────────────────────────────────────────────────────────┘
         ↓ React strips PII
┌────────────────────────────────────────────────────────────┐
│ REACT HOOK (useBucketAgent)                                │
│ ═══════════════════════════════════════════════════════════│
│ createBucketState() removes PII:                           │
│                                                            │
│ {                                                          │
│   unsorted: ["#550e8400"],  ← Anonymized                  │
│   case_metadata: {                                         │
│     "#550e8400": {                                         │
│       gleason_score: "3+4=7",                              │
│       target_count: 4,                                     │
│       procedure_type: "fusion_biopsy"                      │
│       // ❌ NO patientName                                 │
│       // ❌ NO patientDOB                                  │
│       // ❌ NO nhsNumber                                   │
│     }                                                      │
│   }                                                        │
│ }                                                          │
└────────────────────────────────────────────────────────────┘
         ↓ HTTP POST
┌────────────────────────────────────────────────────────────┐
│ FASTAPI (pcl_api.py)                                       │
│ ═══════════════════════════════════════════════════════════│
│ POST /api/agent/analyze-buckets                            │
│ Receives anonymous bucket state only                       │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ PYTHON AGENT (pcl_bucket_agent.py)                         │
│ ═══════════════════════════════════════════════════════════│
│ Main Orchestrator deploys parallel subagents:              │
│   ├─ BucketAnalyzerSubagent                                │
│   ├─ GroupingOrchestratorSubagent                          │
│   ├─ EmailDrafterSubagent                                  │
│   └─ (All work with anonymous IDs only)                    │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ SUPABASE (Workflow State)                                  │
│ ═══════════════════════════════════════════════════════════│
│ Stores workflow progress (NO PII):                         │
│ case_workflow table:                                       │
│   • case_id: "#550e8400"  ← Anonymous                      │
│   • mri_status: "confirmed"                                │
│   • hospital_status: "confirmed"                           │
│   • equipment_status: "confirmed"                          │
│   // ❌ NO patient names                                   │
└────────────────────────────────────────────────────────────┘
```

---

## 🚀 **Running the System**

### **1. Start Python Agent API**

```bash
cd site/public/experimentaltesting/backend

# Install dependencies
pip install fastapi uvicorn anthropic python-dotenv pydantic

# Set API key
export ANTHROPIC_API_KEY="your_key_here"

# Run server
python pcl_api.py
```

Server starts on `http://localhost:8000`

### **2. Start Next.js Frontend**

```bash
cd site

# Install dependencies (if needed)
npm install --legacy-peer-deps

# Run dev server
npm run dev
```

Frontend runs on `http://localhost:3000`

### **3. Use in React Component**

```typescript
import { useBucketAgent } from '@/hooks/useBucketAgent'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/dexie-db'

function SurgeonWorkflowPage() {
  const { analyzeBuckets, lastResponse, loading } = useBucketAgent()
  const cases = useLiveQuery(() => db.cases.toArray(), [])
  
  // Analyze buckets when cases change
  useEffect(() => {
    if (cases && cases.length > 0) {
      analyzeBuckets(cases)
    }
  }, [cases, analyzeBuckets])
  
  // Display recommendations
  return (
    <div>
      {loading && <Spinner>Analyzing cases...</Spinner>}
      
      {lastResponse?.recommendations.map(rec => (
        <Card key={rec.action}>
          <CardTitle>{rec.message}</CardTitle>
          <CardContent>
            <p>{rec.next_step}</p>
            {rec.profit && <Badge>Profit: {rec.profit}</Badge>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

---

## 🎯 **Key Principles**

### **1. Privacy First**
- Agent NEVER sees PII
- Dexie PII stays in browser
- Only anonymous IDs sent to backend
- Supabase stores workflow state (no PII)

### **2. Surgeon Control**
- Agent suggests, surgeon decides
- All emails require approval
- No automated bookings
- Bucket positions = surgeon's decisions

### **3. Profitability Enforced**
- 1 case = break even (£0 profit) → Agent discourages
- 2 cases = okay (£1,200 profit, 50% margin)
- 3+ cases = optimal (£2,400+ profit, 66%+ margin) → Agent encourages

### **4. Hospital Strategy**
- Hospitals refuse <3 cases (equipment cost)
- Build demand before requesting slots
- Agent tracks email log to know refusal history
- Strategic patience pays off

### **5. Parallel Subagents**
- Equipment checker runs parallel across dates
- Theatre matcher runs parallel across hospitals
- Grouping optimizer analyzes scenarios simultaneously
- 10x faster than sequential processing

---

## 📊 **Bucket Metrics Dashboard**

```typescript
{
  "bucket_summary": {
    "unsorted": 5,           // New cases to review
    "thinking": 3,           // Surgeon considering
    "wants_to_proceed": 7,   // Ready for orchestration
    "booked": 12            // Completed workflows
  },
  "profitability": {
    "viable_groups": 2,     // Groups of 3+ cases
    "potential_profit": "£4,800",
    "margin_avg": "66.7%"
  },
  "recommendations": [
    {
      "action": "ready_to_book",
      "cases": ["#123456", "#234567", "#345678"],
      "profit": "£2,400",
      "next_step": "Request theatre slot"
    }
  ]
}
```

---

**The system is ready. Agent never touches PII. Buckets drive workflow. Surgeon stays in control.** 🏛️
