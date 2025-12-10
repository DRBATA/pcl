# Biopsy Plan Page Redesign - MERGED Fibonacci Plan

## Persona: Surgeons Who Demand Precision
**Hook:** "Confidence in every contour."
**Hero Image:** `radiologist.png` (same as homepage carousel)

---

## ORIGINAL Fibonacci Iterations (PRESERVED)

### Iteration 1: Basic Hero Image Addition
**FOR:** Simple improvement, matches carousel pattern
**AGAINST:** Doesn't leverage the full parallax reveal effect
**RATING:** 4/10

### Iteration 2: Full Parallax Card (Copy from Targeting Accuracy)
**FOR:** Proven pattern, works beautifully on report page
**AGAINST:** May feel repetitive if identical
**RATING:** 6/10

### Iteration 3: Parallax + Surgeon-Specific Stat
**FOR:** 85% stat on report page is powerful - surgeons respond to data
**AGAINST:** Need to find authentic stat for radiology/contouring
**RATING:** 7/10

### Iteration 5: Parallax + "Before You Arrive" Framing
**FOR:** Surgeons value time - "plan ready before procedure day" is key value prop
**AGAINST:** Might undersell the expertise aspect
**RATING:** 7/10

### Iteration 8: Parallax + Expertise Authority (Dr Clare Allen)
**FOR:** Named expert creates trust, differentiates from generic services
**AGAINST:** Already have Dr Allen section below - might duplicate
**RATING:** 7/10

### Iteration 13: Parallax + "Zero Interpretation Required" Promise
**FOR:** Surgeons don't want to interpret - they want to ACT. This is the core value.
**AGAINST:** Might sound dismissive of their expertise
**RATING:** 8/10

### Iteration 21 (Synthesis): Parallax Hero + Time-to-Confidence Stat + Action Frame
**FOR:** Combines:
- Visual reveal (dopamine)
- Data authority (trust)
- Action-orientation (surgeon mindset)
- Time efficiency (practical value)
**AGAINST:** Complex to execute well
**RATING:** 9/10

---

## ADDITIONAL ANALYSIS (Dec 2025)

### Gold Standard Reference: `/about/targeting-accuracy-report`
Key patterns: Parallax hero, alternating dark/light, evidence boxes, scroll arrows

### Source Material Audit (from `page_old.tsx`)

**Currently have (good):**
- ContouringVideoPlayer ✓
- MultiparametricMRIViewer ✓
- Dr Clare Allen section with quote ✓
- Virtual Grid Alignment Part A/B ✓
- "Why Expert Pre-Procedure Planning Matters" 3-cards ✓

**MISSING - ADD:**
- **Dr Francesco Giganti** - second radiologist ← USER FLAGGED
  - PI-QUAL / PRECISE score research
  - Adds credibility depth
  - Image exists: `/surgeons/fg.png`

---

## Research: Surgeon Psychology

### What Surgeons Value:
1. **Certainty** - They need to know before they cut
2. **Efficiency** - Time in theatre is precious
3. **Authority** - They respect expertise, not sales talk
4. **Outcomes** - Everything is about patient results
5. **Preparation** - The best surgeons prepare meticulously

### Progressive Disclosure for Surgeons:
- Start with the PROMISE (confidence)
- Reveal the METHOD (expert contouring)
- Show the PROOF (millimeter accuracy, 20+ years)
- End with ACTION (get started)

---

## Final Design Decision

### Hero Section:
- **Image:** `radiologist.png` - full bleed, same as carousel
- **Parallax Card:** White card, bottom-left, fades on scroll
- **Hook:** "Confidence in every contour."
- **Stat:** "Plans delivered 24-48 hours before your procedure day"
- **CTA:** "See the process" → scrolls to content below

### Below-Fold Content:
- Keep existing MRI viewer (excellent)
- Keep Dr Clare Allen section (authority)
- Keep video player (proof)
- Add vertical image from `/hero/` folder if available

### Key Insight:
The current page has GREAT content but POOR entry. 
The hero should create ANTICIPATION, then the content delivers.

---

## Fibonacci Iterations (RIGOROUS)

### 1: Basic parallax hero only
**FOR:** Matches carousel, visual continuity
**AGAINST:** 
- Source: Old page had rich components (video, MRI viewer) - not in hero
- Research: Surgeons want "show don't tell" - hero is just telling
- Links: No clear path to /services/how-it-works or /about/pcl
**RATING: 3/10**

### 2: Hero + Contouring Video Section
**FOR:** Video shows real process - "demonstrating expertise"
**AGAINST:**
- Source: MRI viewer component still not prominent enough
- Research: Missing "evidence box" format for Dr Allen credentials
- Structure: Not matching gold standard dark/light alternation
**RATING: 5/10**

### 3: Hero + Video + MRI Viewer (alternating sections)
**FOR:** Both interactive components now featured
**AGAINST:**
- Source: Dr Allen quote ("The fusion software allows me...") not restored
- Research: No evidence box with citable credentials
- Links: Still missing internal cross-links
**RATING: 6/10**

### 5: Above + Dr Allen Quote + Evidence Box
**FOR:** 
- Direct quote adds authenticity
- Evidence box: "Oxford, UCL Lead, PROMISE Trial"
**AGAINST:**
- Source: "Why Multiparametric MRI Matters" explanation box lost
- Visual: Virtual Grid Alignment legends too brief
- Structure: Gold standard has scroll arrows between sections
**RATING: 7/10**

### 8: Above + Full Grid Legends + Scroll Arrows
**FOR:**
- Grid legends restore technical depth surgeons expect
- Scroll arrows guide progressive disclosure
**AGAINST:**
- Links: /services/how-it-works and /about/pcl not linked
- Research: "Peer validation" missing - no track record mention
**RATING: 8/10**

### 13 (SYNTHESIS): Full Implementation
**FOR:**
- Source material: All restored (video, MRI viewer, quote, legends)
- Research: Evidence boxes, show-don't-tell, expert credentials
- Links: To /services/how-it-works, /about/pcl, /contact
**RATING: 9/10**

---

## Primary Link from This Page
**→ /services/mr-us-fusion-biopsy** (the actual procedure) ← USER APPROVED

Natural flow: Surgeon understands the PLANNING → wants to see the PROCEDURE itself
