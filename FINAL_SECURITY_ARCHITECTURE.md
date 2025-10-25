# PCL Security Architecture - NO PII ANYWHERE

## 🔒 **Core Principle: Zero Patient Data Exposure**

```
Real Patient Data → NEVER enters system
        ↓
PCL Allocated Number → Password-protected Dexie (encrypted)
        ↓
UUID → UI shows only this
        ↓
"#UUID" → Agent sees only this (shortened)
```

---

## 📊 **Data Layers**

### **Layer 1: Real World (Outside System)**
```
❌ Patient Name: "John Smith"
❌ Date of Birth: "1965-03-15"
❌ Real NHS Number: "123-456-7890"
❌ Address, phone, email

→ NEVER stored anywhere in PCL system
→ Surgeon keeps separate records (paper/hospital system)
```

### **Layer 2: PCL Allocated Number (Encrypted Dexie)**
```
🔐 Password-Protected Dexie Table: patientIdentifiers
   • localId: "550e8400-e29b-41d4-a716-446655440000"
   • pclAllocatedNumber: "PCL-2024-001234" (ENCRYPTED)
   • createdAt: 1698765432000

→ Unlocked ONLY by surgeon's password
→ Password stored in memory only (cleared on logout/15min inactivity)
→ UI/Agent NEVER access this table
```

### **Layer 3: UI State (Anonymous UUID)**
```
✅ React shows:
   • Case ID: "550e8400..." (UUID)
   • Clinical data: Gleason 3+4, 4 targets
   • Bucket position: "wants_to_proceed"

❌ UI NEVER shows:
   • PCL allocated number
   • Any link to patient identity
```

### **Layer 4: Agent (Shortened Anonymous ID)**
```
✅ Agent sees:
   • "#550e8400" (first 8 chars of UUID)
   • Bucket state machine
   • Clinical metadata

❌ Agent NEVER sees:
   • PCL allocated number
   • UUID → PCL number mapping
   • Any patient identifiers
```

---

## 🔑 **Password Protection Flow**

### **Surgeon Logs In:**
```typescript
// 1. Surgeon enters password
const password = await promptPassword()

// 2. Unlock Dexie
const unlocked = await unlockDexie(password)

if (unlocked) {
  // 3. Password stored in memory ONLY
  // NO persistence to disk/localStorage
  
  // 4. Auto-lock after 15min inactivity
  resetInactivityTimer()
  
  // 5. Surgeon can now add cases
  const localId = await addPatientIdentifier("PCL-2024-001234")
  // Returns UUID: "550e8400..."
}
```

### **UI Shows Case:**
```typescript
// UI NEVER calls getPCLNumber()
// Only shows UUID
<BubbleCase id="#550e8400" />

// Clinical data loaded from cases table (NO PII)
const clinicalCase = await db.cases.get("550e8400...")
// { gleason: "3+4", targets: 4, procedure: "fusion_biopsy" }
```

### **Agent Analyzes:**
```typescript
// React strips even UUID down to short form
const bucketState = {
  unsorted: ["#550e8400"],  // First 8 chars only
  case_metadata: {
    "#550e8400": {
      gleason_score: "3+4=7",
      target_count: 4
      // NO PCL number
      // NO UUID → PCL mapping
    }
  }
}

// Send to agent API
await analyzeBuckets(bucketState)
```

---

## 🚫 **What Agent NEVER Gets**

```python
# Agent API endpoint receives:
{
  "bucket_state": {
    "unsorted": ["#550e8400"],
    "case_metadata": {
      "#550e8400": {
        "gleason_score": "3+4=7",
        "target_count": 4,
        "procedure_type": "fusion_biopsy"
      }
    }
  }
}

# ❌ Agent NEVER receives:
# - PCL allocated number
# - Full UUID (only first 8 chars)
# - Patient name/DOB/NHS number
# - Any PII whatsoever
```

---

## 📧 **Email Communication (Anonymous)**

### **Agent Drafts Email to Secretary:**
```
From: PCL System
To: surgeon_secretary@hospital.com
Subject: Patient Availability Check - Case #550e8400

Hi Secretary,

Could you please check patient availability for:
- Case #550e8400: Fusion biopsy procedure

[Secretary has separate mapping: #550e8400 → Real patient in hospital system]

Please confirm availability over next 2 weeks.

Thanks,
PCL System
```

**Secretary's side:**
- Secretary has own secure mapping: `#550e8400` → `John Smith`
- Secretary uses hospital system to contact patient
- Secretary replies: "Case #550e8400 confirmed available"
- Agent updates workflow status

**CRITICAL:** Agent never learns patient identity

---

## 🏥 **Hospital/Equipment Communication**

### **Agent to Hospital:**
```
Theatre Booking Request

Cases: #550e8400, #234abc56, #345def78
Number of procedures: 3
Type: MRI Fusion Biopsy
Duration: 240 minutes

Equipment: BK Ultrasound + 6-DOF Stepper
Profitability: 3 cases = £2,400 profit (66% margin)

[Hospital doesn't need patient names for slot booking]
```

**Hospital's side:**
- Hospital books anonymous slot: "PCL - 3 fusion biopsies - 240min"
- Equipment allocated based on procedure type
- Patient names added closer to procedure date (via secretary)

---

## 🔐 **Security Features**

### **1. Encryption at Rest**
```typescript
// PCL numbers encrypted with surgeon's password
const encrypted = await encryptPCLNumber("PCL-2024-001234", surgeonPassword)

// Stored as base64-encoded AES-GCM encrypted blob
pclAllocatedNumber: "fG9kM3R5NmU3aW9wYXNkZm..." // Encrypted
```

### **2. Password Never Persisted**
```typescript
// ❌ WRONG - DON'T DO THIS:
localStorage.setItem('password', password)  // NEVER!

// ✅ CORRECT - Memory only:
let surgeonPassword: string | null = null  // In-memory only
```

### **3. Auto-Lock on Inactivity**
```typescript
// After 15 minutes of no activity
setTimeout(() => {
  lockDexie()  // Clear password from memory
  window.dispatchEvent(new Event('dexie-locked'))
}, 15 * 60 * 1000)
```

### **4. No API Keys in Dexie**
```typescript
// Supabase credentials stored in .env.local ONLY
// NEVER in Dexie
// NEVER sent to agent
```

---

## 📱 **User Experience**

### **Surgeon Workflow:**

**Step 1: Login**
```
1. Surgeon opens app
2. Password prompt appears
3. Surgeon enters password
4. Dexie unlocks
5. Cases appear (showing only UUIDs)
```

**Step 2: Add New Case**
```
1. Surgeon receives referral (outside system)
2. Surgeon assigns PCL number: "PCL-2024-001234"
3. Surgeon enters PCL number in secure form
4. System encrypts and stores
5. Returns UUID: "550e8400..."
6. UI shows: "#550e8400" in UNSORTED bucket
```

**Step 3: Agent Analyzes**
```
1. Agent sees: "#550e8400" in unsorted
2. Subagent analyzes clinical metadata
3. Agent suggests: "Fits fusion biopsy criteria"
4. Surgeon reviews
5. Surgeon drags to THINKING_ABOUT_IT
```

**Step 4: Inactivity Lock**
```
1. Surgeon walks away for 15 minutes
2. Auto-lock triggers
3. Password cleared from memory
4. UI shows lock screen
5. Surgeon must re-enter password to continue
```

---

## 🎯 **Why This Architecture?**

### **Problem 1: GDPR/HIPAA Compliance**
```
Traditional system:
Patient data → Cloud database → AI → Major compliance burden

PCL system:
NO patient data → NO cloud PII → AI sees anonymous IDs → Minimal compliance risk
```

### **Problem 2: Data Breach Risk**
```
Traditional system:
Database breach → Thousands of patient records exposed

PCL system:
Breach → Only anonymous IDs exposed
         → Encrypted PCL numbers require surgeon's password
         → No way to map back to patients without separate system
```

### **Problem 3: AI Safety**
```
Traditional system:
AI sees patient names → Potential for bias/discrimination

PCL system:
AI sees "#550e8400" → No demographic info
                     → Pure clinical decision-making
                     → No bias possible
```

---

## 🔄 **Complete Data Flow Example**

```
┌────────────────────────────────────────────────────────────┐
│ OUTSIDE SYSTEM (Surgeon's Mind/Paper)                      │
│ ═══════════════════════════════════════════════════════════│
│ Real patient: John Smith, DOB 1965-03-15, NHS 123-456-7890│
│ Gleason 3+4=7, 4 targets, MRI excellent                   │
└────────────────────────────────────────────────────────────┘
         ↓ Surgeon assigns PCL number
┌────────────────────────────────────────────────────────────┐
│ PASSWORD-PROTECTED DEXIE (Encrypted)                       │
│ ═══════════════════════════════════════════════════════════│
│ patientIdentifiers table:                                  │
│   localId: "550e8400-e29b-41d4-a716-446655440000"         │
│   pclAllocatedNumber: "[ENCRYPTED]" ← "PCL-2024-001234"   │
│                                                            │
│ Unlocked by: surgeon password (in memory only)             │
└────────────────────────────────────────────────────────────┘
         ↓ UI loads clinical data only
┌────────────────────────────────────────────────────────────┐
│ REACT UI STATE (Anonymous UUID)                            │
│ ═══════════════════════════════════════════════════════════│
│ Display: "#550e8400"                                       │
│ Bucket: "unsorted"                                         │
│ Clinical: {gleason: "3+4", targets: 4, mri: "excellent"}  │
│                                                            │
│ ❌ NO PCL number shown                                     │
│ ❌ NO patient name                                         │
└────────────────────────────────────────────────────────────┘
         ↓ React strips to minimal
┌────────────────────────────────────────────────────────────┐
│ AGENT API (Python)                                         │
│ ═══════════════════════════════════════════════════════════│
│ Receives:                                                  │
│ {                                                          │
│   "unsorted": ["#550e8400"],  ← First 8 chars only        │
│   "case_metadata": {                                       │
│     "#550e8400": {                                         │
│       "gleason_score": "3+4=7",                            │
│       "target_count": 4                                    │
│     }                                                      │
│   }                                                        │
│ }                                                          │
│                                                            │
│ ❌ NO full UUID                                            │
│ ❌ NO PCL number                                           │
│ ❌ NO patient identity                                     │
└────────────────────────────────────────────────────────────┘
         ↓ Agent analyzes
┌────────────────────────────────────────────────────────────┐
│ SUBAGENT RESULTS                                           │
│ ═══════════════════════════════════════════════════════════│
│ "Case #550e8400 fits MRI fusion criteria"                 │
│ "Gleason 3+4, 4 targets, excellent MRI"                   │
│ "Recommend: Move to THINKING_ABOUT_IT"                    │
└────────────────────────────────────────────────────────────┘
         ↓ Surgeon decides
┌────────────────────────────────────────────────────────────┐
│ SURGEON ACTION                                             │
│ ═══════════════════════════════════════════════════════════│
│ Drags #550e8400 → "WANTS_TO_PROCEED" bucket               │
└────────────────────────────────────────────────────────────┘
         ↓ Agent drafts email (anonymous)
┌────────────────────────────────────────────────────────────┐
│ EMAIL (Anonymous Communication)                            │
│ ═══════════════════════════════════════════════════════════│
│ To: secretary@hospital.com                                 │
│ Subject: "Patient Availability Check - Case #550e8400"     │
│                                                            │
│ Secretary's separate system:                               │
│ #550e8400 → John Smith (mapping lives elsewhere)          │
└────────────────────────────────────────────────────────────┘
```

---

## ✅ **Security Checklist**

- [x] NO patient names stored in system
- [x] NO dates of birth stored in system
- [x] NO real NHS numbers stored in system
- [x] PCL allocated numbers encrypted with AES-GCM
- [x] Password stored in memory only (never persisted)
- [x] Auto-lock after 15 minutes inactivity
- [x] UI shows only anonymous UUIDs
- [x] Agent sees only shortened IDs (#550e8400)
- [x] Emails use anonymous case numbers
- [x] No API keys in Dexie
- [x] Separate mapping system for secretary/hospital

---

**The Cathedral is secure. No PII anywhere. Agent blind to patient identity. Surgeon controls all access.** 🔒🏛️
