# PCL Website Changelog

## December 10, 2025 - Parallax Hero Pages (Whirling Dervish Sprint)

### All 3 Target Pages Now Match Gold Standard Pattern

**Pattern Applied:**
- ✅ Parallax vanishing card hero (fades on scroll = progressive disclosure)
- ✅ Hero IMAGE same as homepage carousel (visual continuity)
- ✅ Hook reiteration from carousel
- ✅ Key stat for persona (surgeons/theatre managers/directors)
- ✅ Scroll CTA to reveal content below

**Files Changed:**

1. `/services/biopsy-plan/page.tsx` (NEW)
   - Hero: `radiologist.png` + "Confidence in every contour."
   - Stat: "24-48hrs - Plans delivered before procedure day"
   - Old version archived to `page_old.tsx`

2. `/services/how-it-works/page.tsx` (NEW)  
   - Hero: `section3_updated.png` + "Every list. Close to clockwork."
   - Stat: "1,000+ procedures supported annually"
   - Old version archived to `page_old.tsx`

3. `/about/pcl/page.tsx` (NEW)
   - Hero: `harley.png` + "What the great centres already do."
   - Stat: "20+ years enabling precision diagnostics"
   - Old version archived to `page_old.tsx`

**Plan Files Created:**
- `app/services/biopsy-plan/plan_biopsy_plan.md`
- `app/services/how-it-works/plan_how_it_works.md`
- `app/about/pcl/plan_pcl.md`

---

## December 10, 2025 - Snagging Implementation

### Phase 1: Quick Wins
- [x] **1.1** Removed Maggie Weir from contact page (`app/contact/page.tsx` line 66)

### Phase 2: John's Content Requests  
- [x] **2.1** Added mission statement + hook reiteration to About PCL page (`app/about/pcl/page.tsx`)
  - "What the great centres already do." hook
  - 20+ years mission statement block
  - "Precision Diagnostics and Nuanced Care" motto
- [x] **2.2** Made hero text boxes more translucent (70% → 50%) on homepage (`app/page.tsx`)

### Phase 3: Paul's UX Hook → Reiteration
- [x] **3.1** Services page hook: "Your theatre. Our specialist. Every time." (`app/services/page.tsx`)
- [x] **3.2** Biopsy Plan page hook: "Confidence in every contour." (`app/services/biopsy-plan/page.tsx`)
- [x] **3.3** About PCL page hook: Included in Phase 2.1

### Phase 4: SEO & Metadata
- [x] **4.1** Base metadata already existed in `app/layout.tsx`
- [x] **4.2** Added Schema.org JSON-LD structured data (`app/layout.tsx`)
  - MedicalBusiness schema
  - WebSite schema
  - MedicalProcedure schemas for services

### Still Pending
- [ ] 3D image overlay on targeting report image (user handling via Photoshop)
- [ ] Full form integration with Resend (needs DNS access from client)
- [ ] Git commit and deploy to Vercel

### Files Modified
| File | Change |
|------|--------|
| `app/contact/page.tsx` | Removed Maggie Weir |
| `app/about/pcl/page.tsx` | Added hook + mission statement |
| `app/page.tsx` | Translucent text boxes |
| `app/services/page.tsx` | Added hook reiteration hero |
| `app/services/biopsy-plan/page.tsx` | Added hook reiteration |
| `app/layout.tsx` | Added Schema.org JSON-LD |
