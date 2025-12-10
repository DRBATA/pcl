# PCL Website Snagging Audit & Phased Implementation Plan

**Date:** December 10, 2025  
**Auditor:** Cascade AI  
**Method:** Puppeteer visual inspection + local code review  

---

## Executive Summary

### Current State
- **Vercel (Production):** `https://pcl-nine.vercel.app/` - Outdated version
- **Local (Development):** Has significant updates NOT YET DEPLOYED
- **Git Branch:** `main` (up to date with origin but uncommitted local changes)

### Key Finding
Your **local code has major improvements** (targeting-accuracy-report page, homepage updates) that are **not deployed to Vercel**. The deployed site is behind your local development.

---

## Audit Against Requirements

### JOHN'S REQUESTS (Functional)

| # | Request | Status | File | Action Required |
|---|---------|--------|------|-----------------|
| 1 | Translucent text boxes for Dr Allen & Mr Laniado | ❌ NOT DONE | `app/page.tsx` | Reduce opacity to ~70% |
| 2 | Add Dr Francesco Giganti to "Expert eyes on every scan" | ✅ DONE | `app/about/pcl/page.tsx` | Already visible on About page |
| 3 | Track record tab - show table first | ❓ NEEDS CHECK | `app/page.tsx` | Verify tab order on homepage |
| 4 | Mission statement in About PCL | ❌ NOT DONE | `app/about/pcl/page.tsx` | Add mission block at top |
| 5 | Scrolling clinician list | ✅ DONE | `app/about/clinician-experience/page.tsx` | Carousel already implemented |
| 6 | 3D model overlay on clinician's report | ❌ NOT DONE | Image editing task | Requires Photoshop/design work |
| 7 | Remove Maggie Weir from contact page | ❌ NOT DONE | `app/contact/page.tsx` line 66 | Delete her name |
| 8 | Form/email integration details | ❌ PENDING | Form handler setup | Needs Resend/Vercel config |

### PAUL'S UX RULES (Hook → Reiteration)

| Homepage Hook | Target Page | First Thing Visible | Compliant? | Fix Required |
|--------------|-------------|---------------------|------------|--------------|
| "See a patient-ready report" | `/about/targeting-accuracy-report` | "Targeting Accuracy Report" (generic) | ❌ NO | Add hook reiteration hero |
| "Meet our radiologists" | `/services/biopsy-plan` | "MRI Fusion Planning & Contouring" | ❌ NO | Add "Confidence in every contour" |
| "See how a list runs" | `/services` | "How It Works" | ❌ NO | Add "Your theatre. Our specialist. Every time." |
| "See our track record" | `/about/pcl` | "Why Choose Prostate Care Limited" | ❌ NO | Add "What the great centres already do" |

---

## Local vs Deployed Comparison

### Files Changed Locally (Not Deployed)
```
app/about/targeting-accuracy-report/page.tsx | 461 changes
app/page.tsx                                 | 147 changes  
app/globals.css                              | 15 changes
public/hero/trainee_radiologist_MDT.png      | Updated image
```

### Your Local Targeting Report Page
Your local version of `targeting-accuracy-report/page.tsx` **already has Paul's hook reiteration**:
- Hero: "The moment they see what you see."
- Glassmorphic card with parallax scrolling
- Proper journey flow with bounce arrows

**This is GOOD but NOT DEPLOYED.**

---

## Phased Implementation Plan

### PHASE 1: Critical Quick Wins (30 mins)
**Priority: Deploy what you have + John's quick fixes**

#### 1.1 Remove Maggie Weir
```tsx
// File: app/contact/page.tsx
// Line 66: Delete this line
<p className="font-semibold">Maggie Weir</p>
```

#### 1.2 Git commit and deploy local changes
```bash
git add .
git commit -m "[snagging] Deploy targeting report update + remove Maggie Weir"
git push origin main
```

---

### PHASE 2: John's Content Requests (1-2 hours)

#### 2.1 Mission Statement Block
**File:** `app/about/pcl/page.tsx`  
**Location:** After line 53, before "Why Choose" section

**Corrected Text (spelling fixed):**
```
For over 20 years, Prostate Care Limited has enabled precision diagnostics 
and nuanced care for prostate cancer patients. We support urological surgeons 
with state-of-the-art equipment and top-level clinical planning to achieve 
the most reliable diagnostics and treatments.

Our motto is "Precision Diagnostics and Nuanced Care" — a guiding principle 
for how we serve surgeons and their patients.
```

#### 2.2 Translucent Clinician Boxes
**File:** `app/page.tsx`  
**Current:** `bg-white/70` (lines ~101-105)  
**Change to:** `bg-white/50` or add custom opacity per-slide for Dr Allen/Laniado images

---

### PHASE 3: Paul's Hook → Reiteration (2-3 hours)

#### 3.1 Services Page Hook
**File:** `app/services/page.tsx`  
**Add before existing content:**
```tsx
<section className="py-12 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
  <h1 className="text-4xl font-bold mb-4">Your theatre. Our specialist. Every time.</h1>
  <p className="text-slate-300 max-w-2xl mx-auto">
    A dedicated applications specialist manages the fusion and software—so your team can focus on the patient.
  </p>
</section>
```

#### 3.2 Biopsy Plan Page Hook
**File:** `app/services/biopsy-plan/page.tsx`  
**Add hook section at top:**
```tsx
<section className="py-12 text-center bg-gradient-to-br from-orange-50 to-amber-50">
  <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
    Confidence in every contour.
  </h1>
  <p className="text-gray-700 max-w-2xl mx-auto">
    Expert radiologist-led targeting plans delivered before your procedure day.
  </p>
</section>
```

#### 3.3 About PCL Page Hook  
**File:** `app/about/pcl/page.tsx`  
**Add hook section at top:**
```tsx
<section className="py-16 text-center mb-8">
  <p className="text-emerald-600 font-semibold mb-2 uppercase tracking-wide text-sm">Our Track Record</p>
  <h1 className="text-5xl font-bold mb-4" style={{ color: "var(--color-medical-green)" }}>
    What the great centres already do.
  </h1>
</section>
```

---

### PHASE 4: Technical Setup (1-2 hours)

#### 4.1 Form Integration (Resend)
**Files needed:**
- `app/api/contact/route.ts` - API endpoint
- Environment variables in Vercel

**Email to send to client for DNS/domain info:**
```
Subject: Website Go-Live - Technical Information Needed

Hi John,

To complete the website setup and make forms work, we need:

1. **Domain access** - Login to your domain registrar (GoDaddy, Namecheap, etc.)
2. **DNS records** - We'll add Vercel nameservers and email verification
3. **Email sending domain** - Verify prostatecare.co.uk for transactional emails

Can you ask your previous web developer for:
- Domain registrar credentials OR
- DNS management access
- Any existing email service (Mailchimp, etc.) API keys

Once we have this, forms will send to info@prostatecare.co.uk.
```

#### 4.2 Vercel Environment Variables
```
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL=info@prostatecare.co.uk
```

---

## Graded Options Analysis

### Option A: Minimal (Quick Deploy)
**Effort:** 1 hour  
**Coverage:** 40%  
**Actions:**
1. Remove Maggie Weir
2. Deploy existing local changes
3. Done

**Grade: C** - Gets updates live but doesn't address John's full list or Paul's UX rules.

---

### Option B: Balanced (Recommended)
**Effort:** 4-5 hours  
**Coverage:** 85%  
**Actions:**
1. All Phase 1 + Phase 2 tasks
2. Hook reiterations on top 3 pages
3. Mission statement added
4. Form handler stubbed (shows success message, emails later)

**Grade: A-** - Addresses most visible issues, meets client expectations, defers complex technical work.

---

### Option C: Complete
**Effort:** 8-10 hours  
**Coverage:** 100%  
**Actions:**
1. All phases
2. Full Resend integration
3. 3D model image overlay (design work)
4. All hook reiterations
5. Accessibility audit pass

**Grade: A+** - Production-ready, fully compliant with all requirements.

---

## Recommended Final Option: B+

**Combine the best of B with selective C items:**

1. ✅ Deploy local changes immediately
2. ✅ Remove Maggie Weir (5 mins)
3. ✅ Add mission statement (15 mins)
4. ✅ Add hook reiterations to top 3 pages (1.5 hours)
5. ✅ Translucent clinician boxes (15 mins)
6. ⏳ Stub contact form with mailto fallback (already done)
7. ⏳ Defer 3D image overlay to Phase 2 post-launch
8. ⏳ Defer full Resend integration until DNS access received

**Total Estimated Time:** 3-4 hours  
**Client Satisfaction:** High  
**Technical Debt:** Low  

---

## Files to Modify (Surgical List)

| File | Changes | Priority |
|------|---------|----------|
| `app/contact/page.tsx` | Remove Maggie Weir (line 66) | P1 |
| `app/about/pcl/page.tsx` | Add mission statement block | P1 |
| `app/page.tsx` | Adjust text box opacity | P2 |
| `app/services/page.tsx` | Add hook reiteration hero | P2 |
| `app/services/biopsy-plan/page.tsx` | Add hook reiteration hero | P2 |
| `app/about/targeting-accuracy-report/page.tsx` | Already updated locally - DEPLOY | P1 |

---

## Next Steps

1. **You:** Restart local dev server (`npm run dev`) and localtunnel
2. **Me:** Verify local changes visually via tunnel
3. **You:** Approve specific changes
4. **Me:** Implement Phase 1 + Phase 2 changes
5. **You:** Review and commit
6. **Deploy:** Push to Vercel

---

*Report generated by Cascade AI - December 10, 2025*
