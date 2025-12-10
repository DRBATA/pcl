# About PCL Page Redesign - MERGED Fibonacci Plan

## Persona: Hospital Directors / Elite Decision Makers
**Hook:** "What the great centres already do."
**Hero Image:** `harley.png` (Harley Street - prestige signifier)

---

## USER GUIDANCE (Dec 2025)
- **DON'T force interactivity** just because gold standard has it
- **DO restore full team** and their different contributions  
- **DO show how they work together** as a cohesive service
- Consider in context of the oscillations and research

---

## Gold Standard Reference: `/about/targeting-accuracy-report`
**Patterns to consider (NOT force):**
- Parallax hero with vanishing card ✓
- Alternating dark/light sections
- TEXT LEFT + VISUAL RIGHT layouts
- Evidence boxes with citations
- Scroll arrows (optional)

---

## Source Material Audit (from `page_old.tsx`)

### MUST RESTORE (lost in new version):
1. **Dr Francesco Giganti** - 2nd radiologist, PI-QUAL/PRECISE research
2. **Application Specialists section** - "meticulous training spans Sonablate, Nanoknife, MIM..."
3. **Coordination & Admin** - "All your secretary needs to do is call us"
4. **Team carousel** - 5 portrait/landscape images (`/team/portrait/`)
5. **Parker Transport logistics** - Shows operational depth
6. **Detailed stats breakdown** - MRI/US, HIFU, IRE by year
7. **Scrolling images strip** (`ss1-11.jpg`) - Visual richness

### Currently have (keep):
- Hook reiteration ✓
- Mission statement ✓
- "Why Choose PCL" cards ✓
- Basic stats ✓

---

## B2B Healthcare Research (Growfusely, DAP, AccretiveEdge)

### Hospital Director Decision Patterns:
1. **"Lead with evidence and workflow impact"** - Not just claims
2. **Case studies > feature lists** - "Demonstrating expertise rather than claiming it"
3. **Multi-stakeholder messaging** - Directors, clinicians, procurement all read same page
4. **Risk mitigation language** - "Already overloaded with tools that don't talk to each other"
5. **Peer validation critical** - "What are other hospitals doing?"

### Content that works for healthcare B2B:
- Case studies
- White papers / evidence boxes
- Video testimonials
- Visual workflow demonstrations

---

## Fibonacci Iterations (RIGOROUS)

### 1: Basic parallax hero only
**FOR:** Matches carousel, visual continuity
**AGAINST:** 
- Source: Old page had TWO radiologists, detailed team sections - all lost
- Research: "Lead with evidence" - hero alone is claim without proof
- Links: No cross-links to services pages
**RATING: 3/10**

### 2: Hero + Restored Dr Giganti section
**FOR:** Adds credibility depth, research credentials (PI-QUAL, PRECISE)
**AGAINST:**
- Source: Still missing Application Specialists (the operational backbone)
- Research: Directors care about "workflow impact" not just clinical expertise
- Links: Still no service page connections
**RATING: 4/10**

### 3: Hero + Both Radiologists + Application Specialists
**FOR:** Shows full clinical AND operational team
**AGAINST:**
- Source: Missing coordination team ("All your secretary needs to do")
- Research: Healthcare B2B needs "multi-stakeholder messaging" - where's the admin ease?
- Structure: Gold standard has alternating dark/light - we're just stacking sections
**RATING: 5/10**

### 5: Above + Coordination Team + Dark/Light Alternation
**FOR:** Now covers clinical + operational + administrative
**AGAINST:**
- Source: Missing Parker Transport (shows logistical depth)
- Research: "Case studies > feature lists" - we're still listing, not showing
- Visual: Gold standard has interactive elements (lesion cards) - we have static text
**RATING: 6/10**

### 8: Above + Animated Stats + Scrolling Images
**FOR:** 
- Visual richness
- Animated stats (rolling numbers) - already have this ✓
- ss1-11.jpg strip shows real procedures
**AGAINST:**
- Don't NEED interactive dashboard like gold standard - this is ABOUT page, not REPORT page
- Focus should be on TEAM and how they work TOGETHER
**RATING: 7/10**

### 13: Above + Evidence Box + Internal Links + Scroll Arrows
**FOR:**
- Evidence box: "20+ years, PROMISE Trial" - citable claims
- Links to services pages create journey
- Scroll arrows guide progressive disclosure
**AGAINST:**
- Source: Team carousel with actual team photos underused
- Research: Video > text for healthcare B2B - do we have video?
- Persona: Hospital director wants "board-ready" numbers - are stats formatted for that?
**RATING: 8/10**

### 21 (SYNTHESIS): Full Team Story + Service Cohesion
**FOR:**
- **Source material:** All restored (2 radiologists, app specialists, coordination, logistics)
- **Research alignment:** Evidence boxes, multi-stakeholder, peer validation (logos)
- **Team narrative:** Shows HOW they work together, not just WHO they are
- **Visual:** Team carousel, scrolling images, animated stats

**KEY INSIGHT (per user):**
This is an ABOUT page - the goal is to show the TEAM and their CONTRIBUTIONS, 
not to replicate the interactive dashboard from the report page.

**AGAINST:**
- Page length - might be too long for mobile
- Need to tell STORY of how team works together, not just list roles

**MITIGATION:**
- Progressive disclosure handles length
- Each section should answer: "How does this team member/function contribute to the service?"

**RATING: 9/10**

---

## Final Design Specification

### HERO (Parallax Vanishing Card)
- **Image:** `harley.png` 
- **Hook:** "What the great centres already do."
- **Stat:** "20+ years | 4,000+ procedures | 95 hospitals"
- **CTA:** Scroll to "Our Track Record"
- **Secondary link:** "Partner with us →" to /contact

### SECTION 1 (DARK): Our Track Record
- LEFT: Text + animated counter stats (surgeons, hospitals, procedures)
- RIGHT: Hospital logos (HCA, Spire, Circle, etc.)
- Evidence box: "Trusted by 6+ major hospital groups"
- Scroll arrow to Section 2

### SECTION 2 (LIGHT/warm): Clinical Excellence - WHO PLANS
- **Dr Clare Allen** - Lead contouring, PROMISE Trial, Oxford/UCL credentials
- **Dr Francesco Giganti** - PI-QUAL/PRECISE score research ← RESTORE
- Show: How their expertise feeds into the fusion plan
- Link: "See the biopsy planning process →" to /services/biopsy-plan

### SECTION 3 (DARK): Operational Excellence - WHO DELIVERS
- **Application Specialists** - 1,000+ cases, equipment expertise
- Show: How they work WITH the radiologist's plan in theatre
- Team carousel (portrait images)

### SECTION 4 (LIGHT): Coordination - WHO MAKES IT SEAMLESS
- **Coordination & Admin** - "All your secretary needs to do is call us"
- **Parker Transport** - logistics partner
- Show: How admin/logistics ENABLE the clinical work

### SECTION 5: CTA
- "Join the UK's Leading Centres"
- Partner With Us button → /contact

---

## Links Verified ✓
- [x] /services/biopsy-plan - EXISTS ✓
- [x] /services/how-it-works - EXISTS ✓
- [x] /contact - EXISTS ✓
- [x] /about/targeting-accuracy-report - EXISTS ✓

---

## Vertical Images Available
- `/team/portrait/team_portrait_1-5.png` - for team carousel
- `/professional-female-radiologist-portrait.jpg` - potential use
- `/bigpics/mri/material1portrait.png` - MRI context
