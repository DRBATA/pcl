# Architecture Vision - The Cathedral

## 🏛️ **Why Each Component Matters**

This isn't minimalism - it's **purposeful architecture**. Every piece serves the whole.

---

## 📦 **Component Purpose Map**

### **1. Cards** (`@/components/ui/card`)
**Use for:** Structured data containers in the drawer

```tsx
<Card>
  <CardHeader>
    <CardTitle>Radiology Report</CardTitle>
  </CardHeader>
  <CardContent>
    PI-RADS: 4
    Gleason: 3+4=7
  </CardContent>
</Card>
```

**Why:** 
- Visual hierarchy
- Consistent spacing
- Shadow/border patterns
- Professional medical data presentation

**Where we use them:**
- ✅ Report vs Biopsy Plan tabs (bottom chat)
- ✅ Theatre slot cards (right panel - planned)
- ✅ Patient case summaries (right panel - planned)
- ✅ Equipment status cards (right panel - planned)

---

### **2. ReactMarkdown** (`react-markdown`)
**Use for:** Rich AI responses in chat

```typescript
AI Response:
"The procedure requires:
- **BK Ultrasound**
- **6-DOF Stepper**
- `MIM Fusion Software`"
```

**Renders as:**
The procedure requires:
- **BK Ultrasound** (bold)
- **6-DOF Stepper** (bold)
- `MIM Fusion Software` (code)

**Why:**
- Makes AI responses clearer
- Highlights key info (bold, lists)
- Code blocks for technical terms
- Better than plain text

**Where we use it:**
- ✅ Chat messages from AI
- Future: Email preview formatting
- Future: Procedure instructions

---

### **3. Tabs** (`@/components/ui/tabs`)
**Use for:** Switching between related views

```tsx
<Tabs defaultValue="chat">
  <TabsList>
    <TabsTrigger value="chat">Chat</TabsTrigger>
    <TabsTrigger value="report">Report</TabsTrigger>
    <TabsTrigger value="plan">Biopsy Plan</TabsTrigger>
  </TabsList>
</Tabs>
```

**Why:**
- Saves screen space
- Related content grouped
- One-click switching
- Modern UI pattern

**Where we use it:**
- ✅ Chat vs Report vs Biopsy Plan (bottom panel)
- Future: Email status tabs (Sent/Pending/Delivered)
- Future: Theatre view tabs (Calendar/List/Timeline)

---

### **4. Collapsible Sections** (`@radix-ui/collapsible` - planned)
**Use for:** Right panel organization

```
📅 Theatre Availability ▼
   [London Bridge - Nov 1st]
   [St Mary's - Nov 3rd]

💧 Patient Pool ▼
   [#123456] [#234567] [#345678]

📊 Equipment Status ▶ (collapsed)
```

**Why:**
- Surgeon controls information density
- Focus on what matters now
- Clean, organized interface
- Mobile-friendly

**Where we'll use them:**
- Right panel sections
- Email round-robin status
- Workflow step details

---

## 🎨 **Design Patterns**

### **Pattern 1: Information Hierarchy**
```
Card (Container)
  ├─ CardHeader (Title area)
  │   └─ CardTitle (Bold heading)
  └─ CardContent (Data area)
      ├─ Badge (Status indicators)
      ├─ Icons (Visual cues)
      └─ Text (Details)
```

### **Pattern 2: State Visualization**
```
🔴 Red Badge    = Urgent/Error
🟡 Yellow Badge = Pending/In Progress
🟢 Green Badge  = Complete/Ready
⚫ Gray Badge   = Draft/Inactive
```

### **Pattern 3: Progressive Disclosure**
```
1. Closed: Just the title
2. Hover: Shows preview
3. Click: Expands full content
4. Double-tap: Reveals PII (local only)
```

---

## 💡 **How Components Work Together**

### **Scenario: Surgeon Reviews Case**

```
1. TAP patient bubble → selectedCase set
2. CHAT PANEL opens with:
   ├─ Header: Shows case #123456
   ├─ Tabs: Chat | Report | Plan
   │   ├─ Report tab: Card with PI-RADS data
   │   ├─ Plan tab: Card with targets
   │   └─ Chat tab: ReactMarkdown messages
   └─ Input: Ask AI anything

3. AI responds with formatted answer:
   "Based on the **Gleason 7** score:
   - Recommend fusion biopsy
   - 4 targets identified
   - Equipment: `BK Ultrasound + Stepper`"

4. SWITCH to Report tab → Card shows structured data
5. SWITCH to Plan tab → Card shows biopsy details
```

---

## 🔮 **Future Enhancements**

### **Right Panel (Collapsible Sections)**
```tsx
<Collapsible>
  <CollapsibleTrigger>
    📅 Theatre Availability (3 slots)
  </CollapsibleTrigger>
  <CollapsibleContent>
    <Card>London Bridge - Nov 1st</Card>
    <Card>St Mary's - Nov 3rd</Card>
    <Card>Royal Free - Nov 4th</Card>
  </CollapsibleContent>
</Collapsible>

<Collapsible>
  <CollapsibleTrigger>
    💧 Patient Pool (5 unsorted)
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* Draggable bubbles */}
  </CollapsibleContent>
</Collapsible>
```

### **Email Status Cards**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Email Round Robin</CardTitle>
  </CardHeader>
  <CardContent>
    <Tabs>
      <TabsList>
        <TabsTrigger value="sent">Sent (3)</TabsTrigger>
        <TabsTrigger value="pending">Pending (2)</TabsTrigger>
      </TabsList>
    </Tabs>
  </CardContent>
</Card>
```

### **Workflow State Indicators**
```tsx
// 5 stakeholder icons with progress
<div className="flex gap-2">
  <WorkflowIcon 
    icon={<FileText />} 
    state="complete" 
    label="Secretary"
  />
  <WorkflowIcon 
    icon={<Microscope />} 
    state="in-progress" 
    label="Radiology"
  />
  <WorkflowIcon 
    icon={<MapPin />} 
    state="pending" 
    label="Transport"
  />
</div>
```

---

## 🎯 **Key Principles**

### **1. Information Density Without Clutter**
- Use Cards to create visual boundaries
- Collapse sections when not needed
- Show status at a glance (badges, colors)

### **2. Rich Content Where It Matters**
- ReactMarkdown for AI responses (clear, formatted)
- Plain text for simple labels
- Cards for structured data

### **3. Modern UX Patterns**
- Tabs for related views
- Collapsible for optional detail
- Motion for state changes
- Drag for direct manipulation

### **4. Mobile-First Thinking**
- Bottom sheet for chat (thumb-friendly)
- Large tap targets
- Swipe gestures
- Responsive layouts

---

## 📊 **Component Usage Matrix**

| Component | Chat | Right Panel | Center | When |
|-----------|------|-------------|--------|------|
| **Card** | ✅ (Report/Plan) | ✅ (Theatre/Cases) | ❌ | Structured data |
| **ReactMarkdown** | ✅ (AI messages) | ❌ | ❌ | Rich text formatting |
| **Tabs** | ✅ (Chat/Report/Plan) | Future (Views) | ❌ | Multiple related views |
| **Collapsible** | ❌ | Future (Sections) | ❌ | Optional details |
| **Badge** | ✅ (Status) | ✅ (Counts) | ✅ (Patient state) | Quick status |
| **Motion** | ✅ (Slide up) | ✅ (Slide in) | ✅ (Carousel) | Smooth transitions |

---

## 🚀 **Install Command**

```bash
npm install --legacy-peer-deps react-markdown @tailwindcss/typography
```

*Note: `@tailwindcss/typography` gives us the `prose` classes for ReactMarkdown styling*

---

## 🎨 **The Cathedral vs The Shed**

**The Shed:** Plain text, no structure, minimal UI
**The Cathedral:** Cards, markdown, tabs, badges - purposeful architecture

We're building the Cathedral. Every component serves the greater whole.

---

**Result:** Professional, modern, information-rich interface that surgeons will love to use.
