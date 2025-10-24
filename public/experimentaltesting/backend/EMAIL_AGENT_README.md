# 📧 Email Follow-Up Agent Integration

## **Architecture Overview**

The Water Bar agent now runs in **dual-mode**:

1. **LiveKit Agent** - Real-time chat and drink suggestions via WebRTC data channel
2. **Email Follow-Up Agent** - Autonomous email system triggered by Supabase Realtime

---

## **Complete Flow**

```
📱 Customer updates hydration tracking
  ↓
💾 order_items.consumed = true in Supabase
  ↓
🔔 Supabase Realtime trigger fires
  ↓
📊 Email Agent processes consumption update
  ↓
🤖 OpenAI generates personalized message
  ↓
📧 Resend sends follow-up email (via MCP)
  ↓
✅ Email logged to Supabase
```

---

## **Key Components**

### 1. **MCP Client Bridge** (`lib/mcp_client.py`)
- Communicates with Node.js MCP server via stdio
- Provides Python interface to existing Resend/Supabase MCP
- Handles JSON-RPC protocol

### 2. **Email Follow-Up Agent** (`agent_worker.py`)
- Listens to Supabase Realtime (`order_items` table)
- Fetches order + booking context
- Generates AI personalized messages
- Sends emails via MCP bridge
- Tracks completion (all drinks consumed)

### 3. **Existing MCP Server** (`mcp-waterbar-emails`)
- Already has Resend integration
- Already has Supabase integration
- Already has Stripe integration
- Email templates built-in
- Email logging

---

## **Data Flow**

### **Consumption Update Payload:**
```python
{
  "event": "UPDATE",
  "schema": "public",
  "table": "order_items",
  "new": {
    "id": "uuid",
    "order_id": "uuid",
    "product_id": "uuid",
    "quantity": 1,
    "consumed": true  # ← Trigger
  }
}
```

### **Email Agent Response:**
```python
{
  "order_id": "uuid",
  "consumed_count": 2,
  "remaining_count": 1,
  "booking_context": {
    "experience_name": "Ice Bath",
    "experience_tags": ["cold", "recovery"],
    "ai_advice": "After cold exposure..."
  }
}
```

---

## **Environment Variables Required**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx

# OpenAI
OPENAI_API_KEY=sk-xxx

# Resend (for MCP)
RESEND_API_KEY=re_xxx

# MCP Server Path
WATERBAR_MCP_PATH=/app/mcp-waterbar-emails/build/index.js
```

---

## **Deployment on Fly.io**

### **File Structure:**
```
/app/
├── agent_worker.py              # Main agent
├── lib/
│   ├── supabase_client.py       # Supabase client
│   └── mcp_client.py            # MCP bridge
└── mcp-waterbar-emails/         # MCP server
    └── build/
        └── index.js             # Compiled MCP
```

### **Dockerfile Updates:**
```dockerfile
# Install Node.js for MCP server
RUN apt-get update && apt-get install -y nodejs npm

# Copy MCP server
COPY mcp-waterbar-emails /app/mcp-waterbar-emails

# Build MCP server
WORKDIR /app/mcp-waterbar-emails
RUN npm install && npm run build

# Back to main app
WORKDIR /app
```

---

## **Testing Locally**

1. Start the MCP server:
```bash
cd mcp-waterbar-emails
npm run build
node build/index.js
```

2. Start the agent:
```bash
cd backend
python agent_worker.py
```

3. Trigger a consumption update in Supabase:
```sql
UPDATE order_items 
SET consumed = true 
WHERE id = 'your-item-id';
```

4. Check logs for email sending

---

## **Features**

### ✅ **Implemented:**
- Supabase Realtime listener
- Order/booking context fetching
- AI personalized messages (OpenAI)
- Follow-up emails (remaining drinks)
- Completion emails (all consumed)
- MCP bridge for Resend/Supabase/Stripe

### 🚀 **Future Enhancements:**
- Shop recommendations in completion email
- Weekly hydration summaries
- Pattern detection (favorite drinks)
- Stripe payment reminders
- Multi-language support

---

## **MCP Tools Available**

Via the `mcp_client.py` bridge, you can call:

1. `send_waterbar_email` - Send branded emails
2. `list_emails` - List recent emails
3. `get_email` - Get email details
4. `cancel_email` - Cancel scheduled email
5. `list_domains` - List verified domains
6. `get_domain` - Get domain status
7. `create_payment_link` - Create Stripe payment link

---

## **Next Steps**

1. ✅ Add `consumed` column to `order_items` in Supabase
2. ✅ Enable Realtime on `order_items` table
3. ✅ Deploy MCP server + agent to Fly.io
4. ✅ Test with real consumption updates
5. 🎤 Hear the TWO MIND-BLOWING versions!

---

**Built with:** LiveKit + Supabase Realtime + OpenAI + MCP + Resend 🔥
