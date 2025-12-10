# How It Works Page Redesign - MERGED Fibonacci Plan

## Persona: Theatre Managers / Hospital Directors
**Hook:** "Every list. Close to clockwork."
**Hero Image:** `section3_updated.png` (Sonablate in theatre)

---

## ORIGINAL Fibonacci Iterations (PRESERVED)

### 1: Basic Hero Image
FOR: Matches carousel | AGAINST: No emotional hook | **4/10**

### 2: Parallax + Process Focus
FOR: Theatre managers love process | AGAINST: Too operational | **5/10**

### 3: Parallax + "No Burden" Promise
FOR: Key pain point - they don't want ownership headaches | AGAINST: Negative framing | **6/10**

### 5: Parallax + "We Arrive, We Run, We Leave"
FOR: Concrete, memorable, action-oriented | AGAINST: Sounds transactional | **7/10**

### 8: Parallax + Reliability Stat (1,000+ cases/year)
FOR: Proves scale, reduces risk perception | AGAINST: Stat alone isn't emotional | **7/10**

### 13: Parallax + "Your Theatre. Our Specialist. Every Time."
FOR: Possessive language creates ownership feeling + consistency promise | AGAINST: Slight variation from hook | **8/10**

### 21 (Synthesis): Parallax + Clockwork Promise + Zero Disruption + Scale Proof
FOR: Combines reliability (clockwork) + ease (no disruption) + proof (1,000+ cases)
Theatre managers want: predictability, no surprises, smooth operations
**RATING: 9/10**

---

## ADDITIONAL ANALYSIS (Dec 2025)

### Gold Standard Reference: `/about/targeting-accuracy-report`
Key patterns: Parallax hero, alternating dark/light, scroll arrows

### Source Material Audit (from `page_old.tsx`)

**Consider restoring:**
1. **Surgeon quote** - "One of the major advantages..." (social proof) ← USER APPROVED
2. **Scrolling images strip** (`ss1-11.jpg`) - visual richness
3. **"What We Provide / Post-Procedure" checklists** - clarity

**DO NOT restore:**
- Report preview carousel - has its own dedicated page now (`/about/targeting-accuracy-report`)

### Currently have (keep):
- Process steps 01-06 ✓
- Equipment cards (Sonablate, Nanoknife, MIM, BK) ✓
- "We Arrive. We Run. We Leave." section ✓
- Zero cards ✓

---

## Research: Theatre Manager Psychology

### What They Value:
1. **Predictability** - Lists must run on time
2. **No Surprises** - Equipment works, staff know what to do
3. **Clean Handoff** - We come, we go, no mess
4. **Risk Mitigation** - Their reputation is on the line
5. **Operational Excellence** - They're judged on efficiency

### B2B Healthcare Research Applied:
- "Workflow impact" matters most to operational staff
- "Case studies > feature lists" - the surgeon quote is gold
- "Multi-stakeholder" - this page serves both managers AND surgeons

---

## Fibonacci Iterations (RIGOROUS)

### 1: Basic parallax hero only
**FOR:** Matches carousel, visual continuity
**AGAINST:** 
- Source: Old page had surgeon quote, report preview, images - all lost
- Research: Theatre managers want "proof of reliability" - hero alone claims
- Links: No link to /about/pcl or /services/biopsy-plan
**RATING: 3/10**

### 2: Hero + Process Steps (01-06)
**FOR:** Process steps show structured approach - managers love this
**AGAINST:**
- Source: Missing surgeon quote ("One of the major advantages...")
- Research: "Case studies > feature lists" - we're listing, not proving
- Visual: Missing scrolling images strip
**RATING: 5/10**

### 3: Hero + Process + Surgeon Quote Section
**FOR:** Quote adds social proof ("I know they will be there on time")
**AGAINST:**
- Source: Targeting Accuracy Report preview still missing
- Research: Missing "evidence box" format
- Links: No cross-navigation to related pages
**RATING: 6/10**

### 5: Above + Report Preview Carousel
**FOR:** 
- Shows the OUTPUT surgeons receive
- Differentiates from competitors
- Visual richness
**AGAINST:**
- Source: "What We Provide / Post-Procedure" checklists lost
- Structure: Not matching gold standard alternating sections
**RATING: 7/10**

### 8: Above + Checklists + Dark/Light Alternation
**FOR:**
- Checklists provide clarity for procurement
- Alternating sections improve readability
- Scroll arrows guide flow
**AGAINST:**
- Source: Scrolling images strip still missing
- Links: Internal links not yet added
**RATING: 8/10**

### 13 (SYNTHESIS): Full Implementation
**FOR:**
- **Source material:** All restored (quote, report preview, checklists, images)
- **Research:** Evidence boxes, social proof, multi-stakeholder
- **Links:** To /services/biopsy-plan, /about/pcl, /contact
- **Visual:** Scrolling images, report carousel
**RATING: 9/10**

---

## Final Design Specification

### HERO (Parallax Vanishing Card)
- **Image:** `section3_updated.png` (real Sonablate equipment)
- **Hook:** "Every list. Close to clockwork."
- **Stat:** "1,000+ procedures supported annually"
- **CTA:** Scroll to "How It Works"
- **Secondary link:** "Book our service →" to /contact

### SECTION 1 (LIGHT): Process Steps 01-06
- Grid layout with numbered steps
- Icons for each step
- Evidence box: "Supporting ~100 surgeons across 95 hospitals"

### SECTION 2 (DARK): On the Day Support
- LEFT: Surgeon quote + "What We Provide" checklist
- RIGHT: Scrolling images strip (ss1-11.jpg)
- Link: "See biopsy planning →" to /services/biopsy-plan

### SECTION 3 (LIGHT/warm): Post-Procedure Report
- LEFT: Text about targeting accuracy report
- RIGHT: Report view carousel (5 biopsy images)
- Link: "See full report details →" to /about/targeting-accuracy-report

### SECTION 4 (DARK): Equipment We Bring
- Equipment cards (Sonablate, Nanoknife, MIM, BK)
- "No capital investment, no storage"

### SECTION 5: CTA
- "Ready to Simplify Your Theatre Operations?"
- Book Our Service → /contact

---

## Primary Link from This Page
**→ /contact** (Book our service) ← USER APPROVED

This is the natural endpoint - theatre managers who understand the process want to book.

---

## Contact Page Enhancement Note
Consider dropdown on contact form for service type selection:
- MR/US Fusion Biopsy
- HIFU Treatment
- IRE Nanoknife
- General Enquiry

(Previously proposed when footer CTAs all led to same contact page)
