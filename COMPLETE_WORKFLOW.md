# Complete PCL Coordination Workflow

## 🎯 **The Full Journey: From Patient to Procedure**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    SURGEON'S WORKFLOW                                   │
└─────────────────────────────────────────────────────────────────────────┘

1️⃣ PATIENT INTAKE (Dexie - Local Only)
   ┌──────────────────────────────────────┐
   │ Surgeon adds patient:                │
   │ • Name: John Doe                     │
   │ • DOB: 1960-05-15                    │
   │ • NHS: 123-456-7890                  │
   │ ──────────────────────────────────   │
   │ Anonymized to:                       │
   │ • Local ID: #123456 (6 digits)       │
   └──────────────────────────────────────┘
                    ↓
   ┌──────────────────────────────────────┐
   │ Clinical data stored:                │
   │ • Lesion: Gleason 7                  │
   │ • Targets: 4                         │
   │ • Volume: 45cc                       │
   │ • MRI Quality: Excellent             │
   │ • AI suggests: Fusion Biopsy         │
   └──────────────────────────────────────┘

2️⃣ THEATRE MATCHING (AI Optimization)
   ┌──────────────────────────────────────┐
   │ Surgeon has 5 unscheduled cases:     │
   │ • Case #123456 - Fusion Biopsy       │
   │ • Case #234567 - HIFU                │
   │ • Case #345678 - Fusion Biopsy       │
   │ • Case #456789 - IRE                 │
   │ • Case #567890 - Fusion Biopsy       │
   └──────────────────────────────────────┘
                    ↓
   ┌──────────────────────────────────────┐
   │ Secretary sends theatre list:        │
   │ (CSV upload)                         │
   │                                      │
   │ London Bridge - Nov 1 - 240min      │
   │ St Mary's - Nov 3 - 180min          │
   │ Royal Free - Nov 4 - 120min         │
   └──────────────────────────────────────┘
                    ↓
   ┌──────────────────────────────────────────────────────────┐
   │ 🤖 AI ANALYSIS                                           │
   │                                                          │
   │ ✅ OPTIMAL GROUPING FOUND:                               │
   │ ────────────────────────────────────────────────────     │
   │ Hospital: London Bridge                                  │
   │ Date: November 1st                                       │
   │ Cases: 3 procedures                                      │
   │   • #123456: Fusion Biopsy (45min)                      │
   │   • #345678: Fusion Biopsy (45min)                      │
   │   • #567890: Fusion Biopsy (45min)                      │
   │                                                          │
   │ Equipment (SHARED):                                      │
   │   • BK Ultrasound                                        │
   │   • 6-DOF Stepper                                        │
   │   • MIM Fusion Software                                  │
   │                                                          │
   │ 💰 FINANCIAL:                                            │
   │   Revenue:  £3,600                                       │
   │   Cost:     £2,000                                       │
   │   Profit:   £1,600  (44% margin) ✅                     │
   │                                                          │
   │ Reasoning: Perfect batch - equipment fully justified!    │
   └──────────────────────────────────────────────────────────┘

3️⃣ BOOKING (One-Click)
   ┌──────────────────────────────────────┐
   │ Surgeon clicks "Book This Grouping"  │
   │                                      │
   │ Dexie Updates:                       │
   │ • Theatre slot created               │
   │ • 3 cases → status "scheduled"       │
   │ • Equipment list saved               │
   │                                      │
   │ Supabase Updates:                    │
   │ • case_workflow table updated        │
   │ • theatre_slots table created        │
   │ • Ready for email workflow           │
   └──────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                    EMAIL ROUND ROBIN WORKFLOW                           │
└─────────────────────────────────────────────────────────────────────────┘

📧 EMAIL #1: Surgeon → Secretary
   ┌────────────────────────────────────────────────────────────┐
   │ From: surgeon@hospital.nhs.uk                              │
   │ To: secretary@hospital.nhs.uk                              │
   │ Subject: Theatre Booking - 3 Cases for Nov 1st            │
   │                                                            │
   │ Dear Secretary,                                            │
   │                                                            │
   │ Please contact Prostate Care Limited to arrange:          │
   │ • 3 fusion biopsies at London Bridge Hospital             │
   │ • Date: November 1st, 2025                                │
   │ • Cases: #123456, #345678, #567890                        │
   │                                                            │
   │ Also notify radiology for MRI transfers.                  │
   │                                                            │
   │ [View Details] [Forward to PCL]                           │
   └────────────────────────────────────────────────────────────┘
                          ↓
         (Secretary clicks "Forward to PCL")
                          ↓
         Supabase: email_events → status = "sent"
         Dexie: Local cache updated
                          ↓

📧 EMAIL #2: Secretary → PCL Coordinator
   ┌────────────────────────────────────────────────────────────┐
   │ From: secretary@hospital.nhs.uk                            │
   │ To: coordinator@pclcare.co.uk                              │
   │ Subject: Case Coordination Request - 3 Procedures          │
   │                                                            │
   │ Dear PCL Team,                                             │
   │                                                            │
   │ Dr Smith has 3 fusion biopsies scheduled:                 │
   │ • Hospital: London Bridge                                  │
   │ • Date: Nov 1st, 09:00                                    │
   │ • Equipment: Stepper + Ultrasound + MIM                   │
   │                                                            │
   │ Case details (anonymized):                                │
   │ • Case #123456: Gleason 7, 4 targets                      │
   │ • Case #345678: Gleason 6, 3 targets                      │
   │ • Case #567890: Gleason 7, 5 targets                      │
   │                                                            │
   │ [Acknowledge] [Request MRI Fusion]                        │
   └────────────────────────────────────────────────────────────┘
                          ↓
         (PCL clicks "Acknowledge")
                          ↓
         Supabase: case_workflow.radiology_requested = TRUE
                          ↓

📧 EMAIL #3: PCL → Radiologist (Dr Clare Allen)
   ┌────────────────────────────────────────────────────────────┐
   │ From: coordinator@pclcare.co.uk                            │
   │ To: clare.allen@pclcare.co.uk                              │
   │ Subject: MRI Fusion Planning - 3 Cases                     │
   │                                                            │
   │ Dr Allen,                                                  │
   │                                                            │
   │ Please complete fusion planning for:                       │
   │ • Case #123456 (Gleason 7)                                │
   │ • Case #345678 (Gleason 6)                                │
   │ • Case #567890 (Gleason 7)                                │
   │                                                            │
   │ MRI scans attached in DICOM format.                       │
   │ Procedure date: Nov 1st                                    │
   │                                                            │
   │ [Mark Completed] [Upload Fusion Plan]                    │
   └────────────────────────────────────────────────────────────┘
                          ↓
         (Dr Allen clicks "Mark Completed")
                          ↓
         Supabase: mri_transfers.fusion_completed_at = NOW()
         Supabase: case_workflow.radiology_fused = TRUE
                          ↓

📧 EMAIL #4: PCL → Transport Team
   ┌────────────────────────────────────────────────────────────┐
   │ From: coordinator@pclcare.co.uk                            │
   │ To: logistics@pclcare.co.uk                                │
   │ Subject: Equipment Delivery - London Bridge Nov 1st        │
   │                                                            │
   │ Transport Team,                                            │
   │                                                            │
   │ Please deliver equipment to:                               │
   │ • Hospital: London Bridge Hospital                         │
   │ • Address: 27 Tooley St, London SE1 2PR                   │
   │ • Delivery: Oct 31st (day before procedure)               │
   │ • Collection: Nov 1st (after procedures)                   │
   │                                                            │
   │ Equipment manifest:                                        │
   │ ✓ BK 3000 Ultrasound System                               │
   │ ✓ 6-DOF Stepper Platform                                  │
   │ ✓ MIM Fusion Software Laptop                              │
   │                                                            │
   │ [Confirm Dispatch] [Update Status]                        │
   └────────────────────────────────────────────────────────────┘
                          ↓
         (Transport clicks "Confirm Dispatch")
                          ↓
         Supabase: equipment_bookings.transport_status = "dispatched"
                          ↓

📧 EMAIL #5: PCL → Application Technician
   ┌────────────────────────────────────────────────────────────┐
   │ From: coordinator@pclcare.co.uk                            │
   │ To: tech@pclcare.co.uk                                     │
   │ Subject: Procedure Support - London Bridge Nov 1st         │
   │                                                            │
   │ Tech Team,                                                 │
   │                                                            │
   │ You're assigned to support:                                │
   │ • Surgeon: Dr Smith                                        │
   │ • Hospital: London Bridge                                  │
   │ • Date: Nov 1st, 08:00 arrival                            │
   │                                                            │
   │ Procedures (3 total):                                      │
   │ 1. 09:00 - Fusion Biopsy (Case #123456)                  │
   │ 2. 10:00 - Fusion Biopsy (Case #345678)                  │
   │ 3. 11:00 - Fusion Biopsy (Case #567890)                  │
   │                                                            │
   │ Pre-loaded fusion plans attached.                         │
   │                                                            │
   │ [Acknowledge] [View Procedure Details]                    │
   └────────────────────────────────────────────────────────────┘
                          ↓
         (Tech clicks "Acknowledge")
                          ↓
         Supabase: case_workflow.workflow_status = "confirmed"
         Supabase: case_workflow.tech_ready = TRUE
                          ↓

┌─────────────────────────────────────────────────────────────────────────┐
│                 🎯 PROCEDURE DAY - Nov 1st                              │
└─────────────────────────────────────────────────────────────────────────┘

08:00 - Tech arrives, sets up equipment
08:30 - Calibration complete, MRI fusion loaded
09:00 - Case #123456 procedure starts
09:45 - Case #123456 complete ✅
10:00 - Case #345678 procedure starts
10:45 - Case #345678 complete ✅
11:00 - Case #567890 procedure starts
11:45 - Case #567890 complete ✅
12:00 - Equipment packed for collection

┌─────────────────────────────────────────────────────────────────────────┐
│                 💰 FINANCIAL OUTCOME                                    │
└─────────────────────────────────────────────────────────────────────────┘

Revenue (3 procedures):     £3,600
Costs:
  - Transport:              £500  (shared!)
  - Equipment setup:        £600  (shared!)
  - Tech time (3 hrs):      £900
  ──────────────────────────────
Total Cost:                 £2,000
PROFIT:                     £1,600 ✅
Margin:                     44%

vs Single Procedure:
  Revenue:                  £1,200
  Cost:                     £1,200
  Profit:                   £0 ❌

Savings from grouping:      £1,600
```

---

## 🔄 **Status Tracking Loop**

### **How "Notify" Buttons Work:**

```typescript
// In email recipient's view:
<Button onClick={async () => {
  // Update Supabase
  await supabase
    .from('email_events')
    .update({ status: 'delivered', deliveredAt: new Date() })
    .eq('id', emailId)
  
  // Trigger next email in chain
  window.dispatchEvent(new CustomEvent('email-updated', { 
    detail: { nextRecipient: 'transport' }
  }))
  
  // Local Dexie sync
  await db.emailEvents.update(emailId, { 
    status: 'delivered',
    deliveredAt: Date.now()
  })
}}>
  ✅ Acknowledge & Notify Next
</Button>
```

### **Polling Pattern (from email_agent.py):**

```python
# Backend email agent polls Supabase every 30s
while True:
    # Check for status updates
    response = supabase.table('email_events') \
        .select('*') \
        .eq('status', 'delivered') \
        .execute()
    
    for event in response.data:
        # Trigger next email in workflow
        send_next_email(event.recipient_role)
    
    await asyncio.sleep(30)
```

---

## 📊 **Data Flow Architecture**

```
┌─────────────────────────────────────────────────────────────────┐
│                    SURGEON'S DEVICE (Dexie)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  patientIdentifiers (LOCAL ONLY - NEVER SYNCED)                │
│  ┌──────────────────────────────────┐                          │
│  │ localId: "123456"                │                          │
│  │ name: "John Doe"        ← PII    │                          │
│  │ dob: "1960-05-15"       ← PII    │                          │
│  │ nhs: "123-456-7890"     ← PII    │                          │
│  └──────────────────────────────────┘                          │
│                                                                 │
│  clinicalCases (ANONYMIZED - SYNC TO CLOUD)                    │
│  ┌──────────────────────────────────┐                          │
│  │ caseId: "uuid-abc-123"           │                          │
│  │ localId: "123456"  ← Link only   │                          │
│  │ lesionType: "Gleason_7"          │                          │
│  │ targets: 4                       │                          │
│  │ status: "scheduled"              │                          │
│  └──────────────────────────────────┘                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↕️
                    (Sync workflow state)
                              ↕️
┌─────────────────────────────────────────────────────────────────┐
│                   SUPABASE (Shared Cloud)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  case_workflow (Overall status)                                │
│  email_events (Email tracking)                                 │
│  theatre_slots (Scheduling)                                    │
│  equipment_bookings (Logistics)                                │
│  mri_transfers (Radiology)                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 **Key Success Metrics**

1. **Equipment Utilization**: 3+ cases per transport trip
2. **Profit Margin**: 40%+ average
3. **Email Round Trip Time**: <48 hours surgeon → confirmed
4. **Scheduler Efficiency**: Minutes (not hours) to match cases
5. **Error Rate**: <5% in case coordination

---

**Result:** Profitable, efficient, GDPR-compliant case coordination system! 🎉
