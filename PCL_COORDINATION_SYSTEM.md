# PCL Patient Coordination System

**A multi-stakeholder workflow orchestration system with AI-driven coordination, following patterns from Water Bar / AOI experimental testing.**

---

## 🏗️ **Architecture Overview**

### **Data Layer: Dexie (Local) + Supabase (Shared)**

```
┌─────────────────────────────────────────────────────────────────┐
│                    SURGEON'S DEVICE (Dexie)                     │
├─────────────────────────────────────────────────────────────────┤
│ patientIdentifiers    → NEVER leaves device (PII protection)    │
│ clinicalCases         → Anonymized, AI-accessible              │
│ theatreSlots          → Local scheduling cache                  │
│ emailEvents           → Status tracking                         │
│ aiConversations       → Chat history with stakeholders          │
└─────────────────────────────────────────────────────────────────┘
                              ↕️ (Sync workflow state)
┌─────────────────────────────────────────────────────────────────┐
│                      SUPABASE (Shared Cloud)                    │
├─────────────────────────────────────────────────────────────────┤
│ case_workflow         → Overall coordination status             │
│ email_events          → Email delivery tracking                 │
│ equipment_bookings    → Equipment & transport coordination      │
│ mri_transfers         → Radiology workflow                      │
│ theatre_slots         → Hospital booking status                 │
│ user_profiles         → Multi-role user data                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 **Files Created**

### **1. Core Database Layer**
- **`lib/dexie-db.ts`** - Dexie schema with role-based data isolation
  - `PatientIdentifier` - Local only (PII)
  - `ClinicalCase` - Anonymized clinical data
  - `TheatreSlot` - Scheduling
  - `EmailEvent` - Email tracking
  - `AIConversation` - Chat history
  - Helper functions: `patientHelpers`, `caseHelpers`, `slotHelpers`, etc.

### **2. React Hooks (Following useDrinksPanel Pattern)**
- **`hooks/usePatientCases.ts`** - Patient case management hook
  - `refreshFromDexie()` - Manual refresh trigger
  - `loadCases()` - Auto-loads on mount & filter changes
  - `createCase()` - New patient case creation
  - `updateCaseStatus()` - Status transitions
  - `stats` - Summary statistics

### **3. UI Components (Following cart-summary Pattern)**
- **`components/surgeon/patient-list-summary.tsx`**
  - Sheet-based sidebar (like cart-summary)
  - Case filtering by status & date
  - Multi-select for group scheduling
  - Email pending alerts
  - Quick actions: View Details, Chat
  - Event-driven refresh: `window.addEventListener('case-updated')`

### **4. Database Migration**
- **`supabase/migrations/001_pcl_coordination.sql`**
  - 6 tables with RLS policies
  - Auto-update timestamps
  - Indexes for performance
  - Sample policies for role-based access

---

## 🔄 **Subscription Pattern (Following StaffBookingsDashboard)**

### **Pattern from Existing Code**
```typescript
// 1. Fetch callback with dependencies
const fetchBookingsCallback = useCallback(async () => {
  const { data } = await supabase.from('bookings').select(...)
  setBookings(data)
}, [selectedDate, supabase])

// 2. Auto-refresh on dependency change
useEffect(() => {
  fetchBookingsCallback()
}, [fetchBookingsCallback, selectedDate])

// 3. Event-driven updates
useEffect(() => {
  const handleUpdate = () => refreshFromDexie()
  window.addEventListener('case-updated', handleUpdate)
  return () => window.removeEventListener('case-updated', handleUpdate)
}, [refreshFromDexie])
```

### **Applied to Patient Cases**
```typescript
const { cases, refreshFromDexie } = usePatientCases()

// Trigger refresh externally:
window.dispatchEvent(new Event('case-updated'))

// Or manually:
refreshFromDexie()
```

---

## 🎯 **Workflow Example: Surgeon Books 3 Cases**

### **Step 1: Surgeon Uploads Patient Data**
```typescript
// Create anonymized cases
const case1 = await createCase(
  { patientName: 'John Doe', patientDOB: '1960-05-15', nhsNumber: '123-456-7890' },
  { lesionType: 'Gleason_7', targetCount: 3, prostateVolume: 45, ... }
)
// Result: localId = "123456" (6-digit code on device only)
```

### **Step 2: AI Groups Cases by Hospital**
```typescript
// AI agent analyzes:
// - Case 1, 2, 3 → All at "London Bridge Hospital"
// - Procedures: 2x fusion_biopsy, 1x HIFU
// - Recommendation: Group for equipment efficiency
```

### **Step 3: Email Orchestration**
```typescript
// Email #1: Hospital Theatre Coordinator
{
  recipient: 'hospital',
  subject: 'Theatre Request: 3 Procedures (Dr Smith)',
  body: '...' // Generated by AI with case details
}

// Email #2: PCL Transport Team
{
  recipient: 'transport',
  subject: 'Equipment Delivery: London Bridge - [Date]',
  body: '...' // Equipment list: Stepper, BK Ultrasound, MIM
}

// Email #3: PCL Application Technician
{
  recipient: 'pclTech',
  subject: 'Procedure Support Requested',
  body: '...' // Case details (anonymized)
}

// Email #4: Radiology (via Secretary)
{
  recipient: 'secretary',
  subject: 'MRI Transfer Required for 3 Cases',
  body: '...'
}
```

### **Step 4: Status Tracking via Supabase**
```sql
-- Email agent polls Supabase
SELECT * FROM email_events WHERE status = 'delivered'

-- Updates Dexie local status
UPDATE emailEvents SET status = 'delivered', deliveredAt = NOW()
```

---

## 🤖 **AI Agent Integration (LiveKit + MCP)**

### **Multi-Stakeholder Chat**
```typescript
// User clicks unified chat avatar
// Radial menu appears:
// ┌─────────────────────────────────┐
// │    [Select Stakeholder]         │
// │  🏥 Hospital Coordinator        │
// │  🚛 Transport Team              │
// │  👨‍🔧 PCL Application Tech         │
// │  📧 PCL Secretary                │
// │  🔬 Radiologist (Dr Allen)       │
// └─────────────────────────────────┘

// On selection → LiveKit connects to role-specific agent
```

### **Agent Access to Dexie via RPC**
```typescript
// In UnifiedChatAvatar.tsx (pattern from experimental testing)
room.registerRpcMethod("client.dexie_request", async (data) => {
  const { action, table, query } = JSON.parse(data)
  
  if (action === 'get_case_details') {
    const caseDetails = await db.clinicalCases.get(query.caseId)
    return JSON.stringify(caseDetails) // NO PII - only clinical data
  }
})
```

### **Email MCP Integration**
```python
# backend/agent_worker.py
from lib.mcp_client import WaterBarMCP

# Use existing waterbar-emails MCP for sending
mcp = WaterBarMCP()
await mcp.send_email(
  to="hospital@example.com",
  subject="Theatre Request",
  template="hospital-theatre-request",
  data={...}
)
```

---

## 📊 **Next Steps to Complete**

### **✅ Phase 1: Foundation (DONE)**
- ✅ Dexie schema with types
- ✅ Supabase migration
- ✅ usePatientCases hook
- ✅ PatientListSummary component

### **🚧 Phase 2: LiveKit Agent Routing (NEXT)**
- [ ] Create `agent_router.py` for stakeholder-specific agents
- [ ] Add RPC methods to UnifiedChatAvatar for Dexie access
- [ ] Create stakeholder selection radial menu UI
- [ ] Connect LiveKit to role-based agents

### **🚧 Phase 3: Email Automation**
- [ ] Email templates for each stakeholder
- [ ] Email agent with Supabase polling (pattern from email_agent.py)
- [ ] Status sync: Supabase → Dexie
- [ ] Dashboard for email tracking

### **🚧 Phase 4: MRI Visualization (amazing_page.tsx)**
- [ ] Adapt `amazing_page.tsx` for biopsy plan visualization
- [ ] Show target hitting vs lesion type
- [ ] Learning dashboard for procedure accuracy

### **🚧 Phase 5: Group Scheduling Logic**
- [ ] AI grouping algorithm (same hospital, same week)
- [ ] Theatre slot batching for equipment efficiency
- [ ] Cost/profit calculation per group

---

## 🔐 **Security & Privacy**

### **Data Isolation**
- **LOCAL ONLY (Dexie):** Patient names, DOB, NHS numbers
- **CLOUD (Supabase):** 6-digit anonymized codes + clinical data
- **RLS Policies:** Surgeons see only their cases, coordinators see workflow state

### **Communication Security**
- LiveKit: Encrypted WebRTC for voice/video
- Supabase: Row-Level Security for database access
- MCP: Secure email sending via Resend API

---

## 🧪 **Testing the System**

### **1. Test Patient Creation**
```typescript
import { db, patientHelpers, caseHelpers } from '@/lib/dexie-db'

// Create patient
const patient = await patientHelpers.create({
  patientName: 'Test Patient',
  patientDOB: '1970-01-01',
  nhsNumber: '999-999-9999'
})

// Create case
const clinicalCase = await caseHelpers.create({
  localId: patient.localId,
  lesionType: 'Gleason_7',
  targetCount: 4,
  prostateVolume: 50,
  priorBiopsyCount: 0,
  mriQuality: 'excellent'
})

console.log('Created case:', clinicalCase.caseId)
```

### **2. Test UI Component**
```tsx
import { PatientListSummary } from '@/components/surgeon/patient-list-summary'

export default function SurgeonDashboard() {
  return (
    <div>
      <PatientListSummary
        onCaseSelect={(caseId) => console.log('Selected:', caseId)}
        onGroupSchedule={(caseIds) => console.log('Schedule:', caseIds)}
      />
    </div>
  )
}
```

### **3. Test Supabase Migration**
```bash
# Run migration
supabase db reset
supabase migration up

# Verify tables
supabase db diff
```

---

## 📚 **Code Patterns Reference**

### **From Water Bar / AOI Testing:**
1. **useDrinksPanel.ts** → Dexie refresh pattern
2. **StaffBookingsDashboard.tsx** → Supabase fetch callback
3. **cart-summary.tsx** → Sheet UI with event-driven updates
4. **UnifiedChatAvatar.tsx** → LiveKit + Dexie RPC
5. **email_agent.py** → Supabase polling for email status

---

## 🎨 **UI/UX Notes**

- **Color Coding:**
  - Draft/Planning: Blue
  - Scheduled: Yellow
  - Confirmed: Green
  - Completed: Purple
  - Email Pending: Orange

- **Icons:**
  - 🎯 Fusion Biopsy
  - 🔊 HIFU
  - ⚡ IRE/NanoKnife
  - 📧 Email status
  - 💬 Chat/LiveKit

---

## 🤝 **Contributing**

When extending this system:
1. Follow existing patterns from experimental testing
2. Use TypeScript types from `lib/dexie-db.ts`
3. Add RLS policies for new Supabase tables
4. Document new workflows in this README

---

## 📞 **Support**

For questions about this system, refer to:
- `public/experimentaltesting/` - Original Water Bar patterns
- `backend/email_agent.py` - Email automation reference
- `UnifiedChatAvatar.tsx` - LiveKit integration

---

**Built with:** Next.js, TypeScript, Dexie.js, Supabase, LiveKit, Anthropic Claude (via MCP)
