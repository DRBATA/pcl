# 🏥 Prostate Care List - Frontend Dashboard System

## 🎯 Overview

A **three-role dashboard system** for coordinating prostate procedures through patient pooling and optimal theatre scheduling.

### The Innovation: Patient Pooling for Cost Optimization

Instead of surgeons booking individual procedures (expensive), we:
1. **Patients join anonymously** with their clinical stats
2. **System matches similar cases** at the same hospital
3. **Groups 3+ cases together** to share equipment costs
4. **Everyone benefits** from economies of scale

---

## 👥 Three Dashboard Views

### 1. **Surgeon Dashboard** 
**Role**: Manage theatre lists and see groupable cases

**Pages**:
- `/dashboard/surgeon/cases` - View all my cases with status bubbles
- `/dashboard/surgeon/theatre` - Theatre list optimization
- `/dashboard/surgeon/pool` - Patients waiting for my hospital
- `/dashboard/surgeon/profitability` - Economics analysis

**Key Features**:
- Status bubbles show workflow progress (MRI ✓, Equipment ✓, Hospital ✓)
- Real-time updates via Supabase subscriptions
- Filter by status (planning, scheduled, completed)
- Case creation with automatic probability calculation

---

### 2. **Patient Dashboard**
**Role**: Join waiting pool and get matched to surgeons

**Pages**:
- `/dashboard/patient/status` - My current status in the pool
- `/dashboard/patient/surgeons` - Browse available surgeons
- `/dashboard/patient/join` - Submit clinical data anonymously
- `/dashboard/patient/timeline` - Track my journey

**Key Features**:
- **Anonymous registration** (no name/NHS number stored)
- **FTE_PS probability calculator** shows HIFU suitability (0-100%)
- **Smart matching** to similar cases
- Email notifications when grouped
- Privacy-first (GDPR compliant)

**Patient Flow**:
```
1. Enter Stats → PSA 7.8, Gleason 3+4, PIRADS 4, Age 65
2. Calculate   → System shows 78% HIFU probability
3. Join Pool   → Enter preferred hospital (UCLH)
4. Wait        → System finds 2 other similar cases
5. Notify      → Email: "3 cases grouped, £27,000 profit, book now?"
6. Schedule    → Surgeon confirms, procedure scheduled
```

---

### 3. **Admin Dashboard**
**Role**: Oversee system and optimize matching

**Pages**:
- `/dashboard/admin/overview` - System-wide statistics
- `/dashboard/admin/cases` - All cases across all surgeons
- `/dashboard/admin/matching` - **The matching engine**
- `/dashboard/admin/analytics` - Revenue and profitability trends

**Key Features**:
- **Matching Engine**: Suggests profitable groupings
- **Economics Dashboard**: Revenue, costs, profit for each group
- **One-click session creation**: Create theatre slot for grouped patients
- **Real-time pool monitoring**: See all waiting patients

**Admin Matching View**:
```
┌─────────────────────────────────────────────┐
│ UCLH - HIFU                                 │
│ 4 patients waiting                          │
│ ✓ RECOMMENDED                               │
├─────────────────────────────────────────────┤
│ Revenue: £32,000                            │
│ Costs:   £5,000                             │
│ Profit:  £27,000 (84.4% margin)             │
├─────────────────────────────────────────────┤
│ Patients:                                   │
│ • PSA 7.8 | 3+4 | PIRADS 4 | 82% prob      │
│ • PSA 6.5 | 3+4 | PIRADS 3 | 75% prob      │
│ • PSA 9.1 | 3+4 | PIRADS 5 | 88% prob      │
│ • PSA 8.3 | 4+3 | PIRADS 4 | 68% prob      │
├─────────────────────────────────────────────┤
│ [Create Theatre Session]                    │
└─────────────────────────────────────────────┘
```

---

## 💰 Economics Model

### HIFU Procedure
- **Revenue per case**: £8,000
- **Setup cost**: £3,000 (fixed)
- **Cost per case**: £500

**Break-even**: 2 cases
**Optimal**: 3-4 cases per session

**Example**:
- 3 HIFU cases = £24,000 revenue - £4,500 costs = **£19,500 profit** (81% margin)
- 1 HIFU case = £8,000 revenue - £3,500 costs = **£4,500 profit** (56% margin)

### Fusion Biopsy
- **Revenue per case**: £2,500
- **Setup cost**: £0
- **Cost per case**: £200

**Break-even**: 1 case
**Optimal**: 5-6 cases per session

---

## 🗄️ Database Schema

### `waiting_pool` Table
```sql
CREATE TABLE waiting_pool (
  id UUID PRIMARY KEY,
  
  -- Clinical (anonymous)
  psa DECIMAL,
  gleason_score TEXT,
  pirads_score INTEGER,
  lesion_location TEXT,
  age INTEGER,
  
  -- Preferences
  preferred_hospital TEXT,
  preferred_procedure TEXT,
  contact_email TEXT,
  
  -- Calculated
  hifu_probability DECIMAL,
  fte_ps_score INTEGER,
  
  -- Matching
  status TEXT DEFAULT 'waiting',
  matched_slot_id TEXT,
  matched_at TIMESTAMPTZ
);
```

### `case_workflow` Table (from previous migration)
```sql
CREATE TABLE case_workflow (
  case_id TEXT PRIMARY KEY,
  surgeon_id TEXT,
  hospital_name TEXT,
  procedure_type TEXT,
  workflow_status TEXT,
  
  -- Checkpoints
  radiology_fused BOOLEAN,
  equipment_confirmed BOOLEAN,
  hospital_confirmed BOOLEAN,
  theatre_confirmed BOOLEAN,
  
  -- Link to pool
  slot_id TEXT,
  waiting_pool_id UUID
);
```

### `theatre_slots` Table
```sql
CREATE TABLE theatre_slots (
  id UUID PRIMARY KEY,
  slot_id TEXT UNIQUE,
  hospital_name TEXT,
  procedure_type TEXT,
  scheduled_date DATE,
  
  -- Economics
  total_revenue DECIMAL,
  total_costs DECIMAL,
  profit_margin DECIMAL,
  
  -- Capacity
  max_cases INTEGER,
  current_cases INTEGER,
  
  status TEXT
);
```

### `user_profiles` Table
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  role TEXT CHECK (role IN ('surgeon', 'patient', 'admin')),
  full_name TEXT,
  email TEXT,
  hospital_affiliation TEXT
);
```

---

## 🚀 Setup Instructions

### 1. Run Database Migrations

```bash
cd site
npx supabase db push
```

This creates:
- `user_profiles` table
- `waiting_pool` table
- `theatre_slots` table
- Profitability calculation functions

### 2. Create Test Users

```sql
-- In Supabase SQL editor
INSERT INTO user_profiles (user_id, role, full_name, email) VALUES
  (auth.uid(), 'surgeon', 'Mr. Smith', 'surgeon@hospital.nhs.uk'),
  (auth.uid(), 'patient', 'Test Patient', 'patient@email.com'),
  (auth.uid(), 'admin', 'Admin User', 'admin@pcl.io');
```

### 3. Test the Flow

**As Patient**:
1. Go to `/dashboard/patient/join`
2. Enter clinical data (PSA 7.8, Gleason 3+4, etc.)
3. See probability calculation
4. Submit to waiting pool

**As Admin**:
1. Go to `/dashboard/admin/matching`
2. See suggested groupings
3. Click "Create Theatre Session"

**As Surgeon**:
1. Go to `/dashboard/surgeon/cases`
2. See newly created cases
3. Update status bubbles as workflow progresses

---

## 🎨 UI Components

### Status Bubbles
```tsx
<StatusBubbles caseItem={case}>
  {/* Shows 4 bubbles: MRI, Equipment, Hospital, Theatre */}
  {/* Green ✓ if complete, Gray ○ if pending */}
</StatusBubbles>
```

### Profitability Card
```tsx
<ProfitabilityCard grouping={grouping}>
  <div>Revenue: £{revenue}</div>
  <div>Costs: £{costs}</div>
  <div>Profit: £{profit} ({margin}%)</div>
</ProfitabilityCard>
```

### Patient Form
```tsx
<PatientJoinForm>
  <ClinicalDataInput />
  <ProbabilityCalculator />
  <PreferenceSelector />
  <SubmitButton />
</PatientJoinForm>
```

---

## 📡 Real-Time Updates

Using **Supabase Realtime**:

```typescript
const channel = supabase
  .channel('case_updates')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'case_workflow' },
    (payload) => {
      // Update UI when case status changes
      fetchCases();
    }
  )
  .subscribe();
```

**What triggers updates**:
- Patient joins waiting pool → Admin sees new entry
- Admin creates session → Surgeon sees new cases
- Surgeon updates status → Patient gets notification
- Equipment confirmed → Bubble turns green

---

## 🔐 Privacy & Security

**Patient Anonymity**:
- ✅ No name stored
- ✅ No NHS number
- ✅ Only clinical stats + email
- ✅ Aggregated for matching only
- ✅ GDPR compliant

**Access Control**:
- Row-level security (RLS) on all tables
- Role-based access (surgeon/patient/admin)
- Email-verified accounts only
- Audit trail for all actions

---

## 🎯 Next Steps

### Phase 1: Testing ✅
- [x] Create three dashboard layouts
- [x] Build patient join flow
- [x] Build matching engine
- [x] Add status bubbles
- [ ] Test complete flow end-to-end

### Phase 2: Polish
- [ ] Add charts (profitability trends)
- [ ] Email notifications
- [ ] Mobile responsive design
- [ ] Loading states & error handling

### Phase 3: Integration
- [ ] Connect Python email agent (polls `waiting_pool`)
- [ ] Add LiveKit voice agent (optional)
- [ ] Supabase Edge Functions for automation
- [ ] Stripe integration for billing

### Phase 4: Production
- [ ] Deploy to Vercel
- [ ] Security audit
- [ ] NHS compliance review
- [ ] Load testing

---

## 📞 Key URLs

- **Surgeon Dashboard**: `/dashboard/surgeon/cases`
- **Patient Join**: `/dashboard/patient/join`
- **Admin Matching**: `/dashboard/admin/matching`

---

**Built**: January 2025
**Stack**: Next.js 14, TypeScript, Supabase, Tailwind CSS
**Status**: Frontend complete, backend integration pending
