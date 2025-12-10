# Biopsy Plan Page Redesign - Fibonacci Iteration Plan

## Persona: Surgeons Who Demand Precision
**Hook:** "Confidence in every contour."
**Hero Image:** `radiologist.png` (same as homepage carousel)

---

## Fibonacci Iterations (For/Against Analysis)

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

## Files to Create:
- `page_new.tsx` - New version with parallax hero
- Archive `page.tsx` → `page_old.tsx`
