# Site Map & Navigation Audit - Prostate Care Limited

## All Pages in Site

### Home
- **Route:** `/`
- **File:** `app/page.tsx`
- **Components:** Header, HeroSection, FeaturedProducts, CollectionStrip, MaterialsSection, NewsletterSection, Footer

### About Section
1. **About Overview**
   - **Route:** `/about`
   - **File:** `app/about/page.tsx`

2. **About PCL**
   - **Route:** `/about/pcl`
   - **File:** `app/about/pcl/page.tsx`

3. **Clinicians**
   - **Route:** `/about/clinicians`
   - **File:** `app/about/clinicians/page.tsx`

4. **Clinicians & Partners** (Combined)
   - **Route:** `/about/clinicians-partners`
   - **File:** `app/about/clinicians-partners/page.tsx`

5. **Partners**
   - **Route:** `/about/partners`
   - **File:** `app/about/partners/page.tsx`

6. **Equipment & Services**
   - **Route:** `/about/equipment-services`
   - **File:** `app/about/equipment-services/page.tsx`

7. **Privacy Statement**
   - **Route:** `/about/privacy`
   - **File:** `app/about/privacy/page.tsx`

### Services Section
1. **Services Overview**
   - **Route:** `/services`
   - **File:** `app/services/page.tsx`

2. **Biopsy Planning**
   - **Route:** `/services/biopsy-plan`
   - **File:** `app/services/biopsy-plan/page.tsx`

3. **Fusion Biopsy**
   - **Route:** `/services/fusion-biopsy`
   - **File:** `app/services/fusion-biopsy/page.tsx`

4. **Freehand MRI/US Fusion**
   - **Route:** `/services/freehand-fusion`
   - **File:** `app/services/freehand-fusion/page.tsx`

5. **HIFU**
   - **Route:** `/services/hifu`
   - **File:** `app/services/hifu/page.tsx`

6. **IRE/NanoKnife**
   - **Route:** `/services/ire-nanoknife`
   - **File:** `app/services/ire-nanoknife/page.tsx`

7. **Patient Referral**
   - **Route:** `/services/patient-referral`
   - **File:** `app/services/patient-referral/page.tsx`

### Contact
- **Route:** `/contact`
- **File:** `app/contact/page.tsx`

---

## Navigation Mapping

### Header Navigation (Desktop)

**Main Nav Items:**
1. **Home** → `/`
2. **About** (Dropdown)
   - About PCL → `/about/pcl`
   - Clinicians & Partners → `/about/clinicians-partners`
   - Equipment & Services → `/about/equipment-services`
3. **Services** (Dropdown)
   - Biopsy Planning → `/services/biopsy-plan`
   - On-Site Fusion → `/services/fusion-biopsy`
   - Freehand MRI/US Fusion → `/services/freehand-fusion`
   - HIFU → `/services/hifu`
   - IRE/NanoKnife → `/services/ire-nanoknife`
   - Patient Referral-FTC → `/services/patient-referral`
4. **Contact** → `/contact`

**Social:**
- LinkedIn → External: `https://www.linkedin.com/company/the-focal-therapy-clinic/`

### Mobile Navigation
**Same structure as desktop**, expandable sections

---

## Footer Navigation

### Services Column
- MR/US Fusion Biopsy → `/services/fusion-biopsy`
- On-Site HIFU → `/services/hifu`
- Biopsy Planning → `/services/biopsy-plan`
- Equipment Hire → `/services`
- Installation Services → `/services`

### Company Column
- About Us → `/about`
- Clinicians We Work With → `/about/clinicians`
- Technical Partners → `/about/partners`
- Contact → `/contact`
- Privacy Statement → `/about/privacy`

### Resources Column
- Precision Diagnostics → `/services`
- Clinical Support → `/contact`
- Training Programs → `/about/clinicians`
- Technical Documentation → `/about/partners`
- Case Studies → `/services`

### Bottom Links
- Privacy Policy → `/about/privacy`
- Terms of Service → `/contact` ⚠️
- Cookies → `/about/privacy`

**Social:**
- LinkedIn → External: `https://www.linkedin.com/company/the-focal-therapy-clinic/`

---

## Hero Section CTAs (Homepage)

### Slide 1: "Every case, any theatre, consistent excellence"
- **Primary CTA:** Surgeon Feedback → `/about/partners`
- **Secondary CTA:** Theatre Requirements → `/about/pcl`

### Slide 2: "We bring the technology"
- **Primary CTA:** Equipment Details → `/services/hifu`
- **Secondary CTA:** Process Overview → `/services`

### Slide 3: "Live imaging guidance"
- **Primary CTA:** Real-time Radiology → `/services/freehand-fusion`
- **Secondary CTA:** Meet the Team → `/about/pcl`

### Slide 4: "Expert support throughout"
- **Primary CTA:** On the Day Support → `/services`
- **Secondary CTA:** Book a Call → `/contact`

---

## Collection Strip (Services Carousel)

- MRI FUSION BIOPSY → `/services/freehand-fusion`
- ULTRASOUND GUIDANCE → `/services/freehand-fusion`
- HIFU TREATMENT → `/services/hifu`
- BIOPSY PLANNING → `/about/pcl`
- EQUIPMENT HIRE → `/services`
- CLINICAL TRAINING → `/services`
- HISTOPATHOLOGY → `/services/patient-referral`
- ON-SITE SUPPORT → `/services`

---

## Services Page CTAs

### Main Service Cards (3)
1. MR/US Fusion Biopsy → `/services/freehand-fusion`
2. On-Site HIFU → `/services/hifu`
3. IRE (NanoKnife) → `/services/patient-referral`

### Bottom CTA
- Book a Call → `/contact`

---

## Issues & Inconsistencies Found

### 🔴 Critical Issues

1. **Duplicate/Overlapping About Pages:**
   - `/about/clinicians` (standalone)
   - `/about/partners` (standalone)
   - `/about/clinicians-partners` (combined)
   - **Issue:** Unclear which should be used. Header links to combined, Footer links to separate pages.

2. **Inconsistent Service Naming:**
   - Header: "On-Site Fusion" → `/services/fusion-biopsy`
   - Footer: "MR/US Fusion Biopsy" → `/services/fusion-biopsy`
   - Collection Strip: "MRI FUSION BIOPSY" → `/services/freehand-fusion` ⚠️ **Different page!**

3. **Missing or Redirected Links:**
   - "Terms of Service" → `/contact` (should be its own page)
   - Multiple generic `/services` links (should specify which service)

### ⚠️ Inconsistencies to Fix

1. **About Section Navigation:**
   - **Header** uses: `/about/clinicians-partners` (combined)
   - **Footer** uses: `/about/clinicians` and `/about/partners` (separate)
   - **RECOMMEND:** Choose one approach

2. **Service Page Confusion:**
   - `/services/fusion-biopsy` vs `/services/freehand-fusion`
   - These seem to be different services but have similar names
   - **RECOMMEND:** Clarify naming or merge if duplicate

3. **Generic `/services` Links:**
   - Used for: Equipment Hire, Installation Services, Precision Diagnostics, Case Studies, Clinical Training, On-Site Support
   - **RECOMMEND:** Create dedicated pages or remove these links

---

## Recommended Link Structure

### Navigation Should Be:

#### Header - About Dropdown
- About PCL → `/about/pcl`
- **Clinicians & Partners** → `/about/clinicians-partners` (use combined page)
- Equipment & Services → `/about/equipment-services`

#### Header - Services Dropdown
- Biopsy Planning → `/services/biopsy-plan`
- **MRI/US Fusion Biopsy** → `/services/fusion-biopsy`
- **Freehand Fusion** → `/services/freehand-fusion`
- HIFU Treatment → `/services/hifu`
- IRE/NanoKnife → `/services/ire-nanoknife`
- Patient Referral → `/services/patient-referral`

#### Footer - Services
- MRI/US Fusion Biopsy → `/services/fusion-biopsy`
- Freehand Fusion → `/services/freehand-fusion`
- On-Site HIFU → `/services/hifu`
- Biopsy Planning → `/services/biopsy-plan`
- IRE/NanoKnife → `/services/ire-nanoknife`

#### Footer - Company
- About PCL → `/about/pcl`
- Clinicians & Partners → `/about/clinicians-partners`
- Contact → `/contact`
- Privacy Policy → `/about/privacy`

---

## Pages That May Need Creating

1. **Terms of Service** (currently redirects to contact)
2. **Cookie Policy** (currently uses privacy page)
3. **Equipment Hire** (if different from general services)
4. **Case Studies** (if content exists)
5. **About Overview** (`/about`) - may need content or redirect

---

## Next Steps

1. ✅ **Decide on About structure:** Use combined `/about/clinicians-partners` OR separate pages
2. ✅ **Clarify service differences:** Fusion Biopsy vs Freehand Fusion
3. ✅ **Update Footer links** to match Header navigation
4. ✅ **Remove or create** pages for placeholder links
5. ✅ **Create Terms of Service** page
6. ✅ **Audit all CTAs** on individual service pages
7. ✅ **Ensure consistent naming** across all navigation points
