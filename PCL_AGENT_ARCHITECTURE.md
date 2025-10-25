# PCL Agent Architecture

## 🎯 Core Concept

**Surgeon logs in → Opens LiveKit room → AI continuously works**

The AI is a **carrier**, not a decision-maker. It executes functions, presents options, updates status — but **NEVER books without approval**.

---

## 🏗️ Architecture Pattern (From Your Backend)

```python
# Base Tool (server-side)
class Tool:
    name: str
    description: str
    input_schema: dict  # JSON schema for parameters
    
    async def execute(self, **kwargs) -> str:
        """Execute and return result"""
```

### **Tool Types:**

1. **ThinkTool** - Internal reasoning (no external actions)
2. **MCPTool** - Connects to MCP servers (Supabase, etc.)
3. **Custom Tools** - Domain-specific operations

---

## 🛠️ PCL-Specific Tools

### **1. CheckGroupabilityTool**
```python
@tool
async def check_groupability(procedure_type: str, hospital: str):
    """
    Find similar cases, calculate profitability.
    Returns: Number of cases, profit margin, ready_to_book flag
    
    AI uses this to INFORM surgeon, NOT to book automatically.
    """
```

**Example Output:**
```json
{
  "groupable_cases": 3,
  "profit": "£2,400",
  "margin_pct": "66.7%",
  "ready_to_book": true,
  "recommendation": "Ready to book! 3 cases = £2,400 profit"
}
```

---

### **2. UpdateCaseStatusTool**
```python
@tool
async def update_case_status(case_id: str, status_type: str, new_status: str):
    """
    Update Supabase when email confirmation received.
    
    Status types:
    - mri_status
    - radiology_status
    - equipment_status
    - transport_status
    - tech_status
    - hospital_status
    
    This makes bubble icons light up green in UI.
    """
```

**Trigger:** Email arrives → AI calls this → Bubble updates

---

### **3. CheckEquipmentAvailabilityTool**
```python
@tool
async def check_equipment_availability(
    equipment_list: list[str], 
    date: str,
    hospital: str
):
    """
    Query equipment_inventory in Supabase.
    Check availability BEFORE suggesting booking.
    
    Returns: availability status, transport time
    """
```

**AI Logic:**
```
IF equipment available AND 3+ cases grouped:
    Present booking option to surgeon
ELSE:
    "Equipment unavailable" OR "Need more cases"
```

---

### **4. ProcessRadiologyReportTool**
```python
@tool
async def process_radiology_report(
    case_id: str,
    scan_type: str,
    gleason_score: str,
    target_count: int,
    procedure_recommendation: str
):
    """
    Secretary uploads report → AI processes it.
    
    1. Update case details in Supabase
    2. Move case to "qualified" stage
    3. Check groupability with similar cases
    4. Report back to surgeon
    """
```

**Workflow:**
```
Secretary email → AI extracts details → process_radiology_report() 
→ check_groupability() → Report to surgeon
```

---

### **5. ThinkAboutWorkflowTool**
```python
@tool
async def think_about_workflow(thought: str, context: str):
    """
    Internal reasoning without external actions.
    
    Use for:
    - Strategic planning
    - Profitability calculations
    - Grouping strategies
    - Scheduling priorities
    
    Does NOT change database or send emails.
    """
```

**AI Example:**
```
AI: think_about_workflow(
    "3 fusion biopsies + 1 template biopsy. 
     Can't group template with fusion (different equipment).
     Hold template, book the 3 fusion cases.",
    context="grouping_strategy"
)
```

---

## 📧 Email → AI LiveKit Room

**No polling Supabase!** Emails trigger AI directly.

### **How It Works:**

```
1. Secretary sends email to: ai-room-surgeon-123@livekit.com
2. Email service → LiveKit room
3. AI receives email as message
4. AI parses content
5. AI calls appropriate tool
6. Supabase updated
7. UI reflects change (bubbles light up)
```

### **Email Types & Tool Mapping:**

| Email Content | AI Action |
|---------------|-----------|
| "MRI ready for #123456" | `update_case_status(case_id, "mri_status", "confirmed")` |
| "Equipment available Nov 1st" | `update_case_status(case_id, "equipment_status", "confirmed")` |
| "Theatre slot confirmed" | `update_case_status(case_id, "hospital_status", "confirmed")` |
| "Radiology report attached" | `process_radiology_report(...)` |

---

## 💰 Profitability Guardrails

```python
def calculate_profit(num_cases: int):
    revenue = num_cases * 1200
    equipment_cost = 1200  # Fixed, shared across cases
    profit = revenue - equipment_cost
    margin = (profit / revenue) * 100
    
    return {
        "ready_to_book": num_cases >= 3,  # Minimum for profitability
        "profit": profit,
        "margin": margin
    }
```

**AI Never Rushes:**
```python
# ❌ Bad
if case_upgraded:
    book_immediately()  # Only 1 case = break even!

# ✅ Good
if case_upgraded:
    groupable = check_groupability()
    if groupable["group_size"] >= 3:
        present_booking_option()  # Surgeon decides
    else:
        "Hold for {3 - count} more cases"
```

---

## 🎨 UI Integration

### **Bubble States (Driven by Supabase):**

```tsx
<WorkflowBubble case={case}>
  {/* 5 stakeholder icons */}
  <Icon name="secretary" status={case.mri_status} />
  <Icon name="radiology" status={case.radiology_status} />
  <Icon name="equipment" status={case.equipment_status} />
  <Icon name="transport" status={case.transport_status} />
  <Icon name="hospital" status={case.hospital_status} />
</WorkflowBubble>
```

**Status Colors:**
- ⚫ `pending` = Gray (nothing sent)
- 🟡 `sent` = Yellow (waiting for response)
- 🟢 `confirmed` = Green (confirmed by stakeholder)
- 🔴 `declined` = Red (rejected/unavailable)

### **When AI Calls `update_case_status()`:**

```
AI: update_case_status("#123456", "mri_status", "confirmed")
    ↓
Supabase updated
    ↓
Surgeon opens app
    ↓
Bubble MRI icon: ⚫ → 🟢 (lights up green!)
```

---

## 🔄 Complete Workflow Example

### **Day 1: Report Arrives**
```
1. Secretary emails radiology report
2. AI: process_radiology_report("#123456", ...)
3. AI: check_groupability("fusion_biopsy")
4. AI: "Case upgraded. Need 2 more similar cases for profitability."
```

### **Day 2: More Cases Come In**
```
5. Two more reports processed (#234567, #345678)
6. AI: check_groupability("fusion_biopsy")
7. AI: "3 fusion biopsies available! Profit: £2,400 (66% margin)"
8. AI presents to surgeon: "Ready to book at London Bridge?"
```

### **Day 3: Surgeon Approves**
```
9. Surgeon: "Yes, book them"
10. AI: check_equipment_availability(["BK Ultrasound", "6-DOF Stepper"], "2025-11-01")
11. Equipment available ✅
12. AI sends emails to:
    - Secretary (confirm booking)
    - Radiologist (MRI fusion prep)
    - Equipment team (transport request)
    - Hospital (theatre slot)
```

### **Day 4-7: Confirmations Arrive**
```
13. Email: "Radiologist confirmed MRI ready"
    AI: update_case_status("#123456", "radiology_status", "confirmed")
    Bubble: 🟢 Radiology icon lights up

14. Email: "Equipment dispatched"
    AI: update_case_status("#123456", "equipment_status", "confirmed")
    Bubble: 🟢 Equipment icon lights up

15. Email: "Theatre slot confirmed"
    AI: update_case_status("#123456", "hospital_status", "confirmed")
    Bubble: 🟢 Hospital icon lights up
```

### **Day 8: All Confirmed**
```
16. All 5 icons green ✅
17. AI: "All confirmations received. Procedure ready for Nov 1st."
18. Surgeon sees fully lit bubble in app
```

---

## 🚀 Running the Agent

```bash
cd site/public/experimentaltesting/backend

# Install dependencies
pip install anthropic python-dotenv

# Set API key
export ANTHROPIC_API_KEY="your_key_here"

# Run demo
python pcl_agent_demo.py
```

**Expected Output:**
```
[PCL_Coordinator] Agent initialized

📋 Scenario 1: Secretary uploads radiology report
[PCL_Coordinator] Tool call: process_radiology_report(case_id=#123456, ...)
[PCL_Coordinator] Tool result: ✅ Case upgraded. Found 2 similar cases...

💡 Scenario 2: Check if we can group cases
[PCL_Coordinator] Tool call: check_groupability(procedure_type=fusion_biopsy)
[PCL_Coordinator] Output: "3 cases available. £2,400 profit (66% margin). Ready to book!"
```

---

## 📊 Key Metrics AI Tracks

| Metric | Formula | Target |
|--------|---------|--------|
| **Group Size** | Similar cases | ≥3 |
| **Profit** | Revenue - Equipment Cost | >£2,000 |
| **Margin** | Profit / Revenue | >60% |
| **Confirmation Rate** | Confirmations / Emails Sent | >90% |
| **Time to Book** | Report → Theatre Slot | <7 days |

---

## ✅ AI Guardrails Summary

1. ❌ **Never book** without surgeon approval
2. ❌ **Never rush** if <3 cases (unprofitable)
3. ✅ **Always check** equipment availability first
4. ✅ **Always calculate** profitability before suggesting
5. ✅ **Always update** status when confirmations arrive
6. ✅ **Think strategically** using think_about_workflow()

---

## 🎯 Next Steps

1. **Connect to LiveKit** - Replace demo with actual LiveKit room
2. **Email integration** - Forward emails to AI's room
3. **Supabase MCP** - Connect tools to real database
4. **UI sync** - Real-time bubble updates via Supabase realtime
5. **Multi-surgeon** - Scale to multiple concurrent LiveKit rooms

---

**The Cathedral is built. Now we connect the pipes.** 🏛️
