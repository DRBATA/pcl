# 🚀 Quick Start - Prostate Care List Dashboard

## ✅ What's Been Built

### Frontend Dashboards (Complete)
- ✅ `/app/dashboard/layout.tsx` - Three-role layout with navigation
- ✅ `/app/dashboard/surgeon/cases/page.tsx` - Surgeon case list with status bubbles
- ✅ `/app/dashboard/patient/join/page.tsx` - Patient waiting pool registration
- ✅ `/app/dashboard/admin/matching/page.tsx` - Admin matching engine

### Database
- ✅ `/supabase/migrations/001_pcl_coordination.sql` - Original case workflow
- ✅ `/supabase/migrations/002_waiting_pool.sql` - Waiting pool & matching

### Documentation
- ✅ `FRONTEND_DASHBOARD_GUIDE.md` - Complete architecture guide

---

## 🏃 Run It Now (5 Minutes)

### Step 1: Apply Database Migrations
```bash
cd c:/Users/azamb/OneDrive/Documents/prostatecare/site

# Push migrations to Supabase
npx supabase db push
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Access Dashboards
Open your browser:

**Surgeon View**: http://localhost:3000/dashboard/surgeon/cases
**Patient View**: http://localhost:3000/dashboard/patient/join
**Admin View**: http://localhost:3000/dashboard/admin/matching

---

## 🧪 Test the Complete Flow

### Test 1: Patient Joins Pool
1. Go to: http://localhost:3000/dashboard/patient/join
2. Fill in form:
   - PSA: `7.8`
   - Gleason: `3+4`
   - PIRADS: `4`
   - Lesion: `Unilateral`
   - Age: `65`
   - Hospital: `UCLH`
   - Email: `test@email.com`
3. Click "Join Waiting Pool"
4. See probability: ~78%

### Test 2: Admin Creates Match
1. Go to: http://localhost:3000/dashboard/admin/matching
2. Add 2 more patients (repeat Test 1 with different emails)
3. See "Suggested Groupings" card:
   - 3 patients at UCLH
   - Revenue: £24,000
   - Profit: £19,500
   - Margin: 81.3%
4. Click "Create Theatre Session"

### Test 3: Surgeon Views Cases
1. Go to: http://localhost:3000/dashboard/surgeon/cases
2. See 3 new cases appear
3. Click "View" on one case
4. Update status bubbles

---

## 📊 Architecture Flow

```
Patient (Anonymous)
    ↓
Fills clinical form
    ↓
Calculates HIFU probability (78%)
    ↓
Joins waiting_pool table
    ↓
Admin matching engine runs
    ↓
Finds 3 similar patients at UCLH
    ↓
Calculates profitability (£19,500 profit)
    ↓
Creates theatre_slot
    ↓
Creates 3 case_workflow records
    ↓
Surgeon sees cases in dashboard
    ↓
Updates workflow checkpoints
    ↓
Status bubbles turn green ✓
```

---

## 🎯 Next Integration: Email Agent

Once frontend works, connect the Python email agent:

```python
# In waterbar-avatar/backend/pcl_email_agent.py
class PCLEmailAgent:
    async def poll_waiting_pool(self):
        """Poll waiting_pool table every 30 seconds"""
        while True:
            # Check for new patients
            patients = await supabase.table('waiting_pool').select('*').eq('status', 'waiting').execute()
            
            # Check for groupable cases
            for hospital in ['UCLH', 'Guy's', 'St Mary's']:
                groupable = await supabase.rpc('find_groupable_patients', {
                    'p_hospital': hospital,
                    'p_procedure': 'hifu',
                    'p_min_cases': 3
                }).execute()
                
                if groupable.data and groupable.data[0]['patient_count'] >= 3:
                    # Send email to patients
                    await self.notify_grouping_opportunity(groupable.data)
            
            await asyncio.sleep(30)
```

---

## 🔧 Troubleshooting

### Error: "Cannot find module '@/lib/supabase/client'"
**Fix**: Create the Supabase client:
```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

export function createClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### Error: "Table 'waiting_pool' does not exist"
**Fix**: Run migrations:
```bash
npx supabase db push
```

### Error: "User not authenticated"
**Fix**: Create test user in Supabase:
```sql
INSERT INTO user_profiles (user_id, role, full_name, email) VALUES
  (auth.uid(), 'patient', 'Test Patient', 'test@email.com');
```

---

## 📱 Mobile Responsive
All dashboards are mobile-friendly:
- Surgeon can update cases on phone
- Patients can join pool from mobile
- Admin can match on tablet

---

## 🎨 Customization

### Change Colors
Edit Tailwind classes in components:
- `bg-blue-600` → Your brand color
- Status bubbles: Change `bg-green-500` for completed

### Add Charts
Install Chart.js:
```bash
npm install chart.js react-chartjs-2
```

Then add to admin dashboard:
```tsx
import { Line } from 'react-chartjs-2';

<Line data={profitabilityTrend} />
```

---

## 📈 Metrics to Track

Once live, monitor:
- **Patient Pool Size**: How many waiting?
- **Match Rate**: % of patients matched within 2 weeks
- **Profitability**: Average profit per session
- **Conversion**: Waiting → Scheduled rate
- **Time to Match**: Days from join → matched

---

## 🚀 Deploy to Production

```bash
# Build
npm run build

# Deploy to Vercel
vercel deploy --prod

# Set environment variables in Vercel:
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

**Status**: ✅ Frontend Complete
**Next**: Connect Python email agent to poll waiting_pool
**Timeline**: 5 minutes to test, 1 hour to customize, 1 day to integrate backend
