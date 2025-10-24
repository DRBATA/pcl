# 🚀 Email Agent Deployment Guide

## **Deployment Files Created:**

```
✅ Dockerfile.email         # Lightweight Docker image (NO LiveKit)
✅ requirements.email.txt   # Clean dependencies
✅ fly.email.toml           # Fly.io configuration
```

---

## **Option 1: Test Locally First** (Recommended)

### **Why Test Locally:**
- ✅ Faster iteration
- ✅ See logs immediately
- ✅ No deployment wait
- ✅ Easy to debug

### **Setup:**

```bash
# 1. Install dependencies
cd backend
pip install -r requirements.email.txt

# 2. Set environment variables (create .env file)
SUPABASE_URL=https://dpaciwcnzwyymjmkftrc.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=sk-your-openai-key
RESEND_API_KEY=re_your-resend-key
WATERBAR_MCP_PATH=../mcp-waterbar-emails/build/index.js

# 3. Start MCP server (separate terminal)
cd ../mcp-waterbar-emails
npm run build
node build/index.js

# 4. Start email agent (main terminal)
cd ../backend
python email_agent.py
```

### **Test Flow:**

```bash
# Terminal 1: Email agent running
python email_agent.py
# Output:
# 🚀 Email Follow-Up Agent initialized
# ✅ Email Follow-Up Agent started
# 👂 Listening for drink consumption updates...
# ✅ Subscribed to order_items changes

# Terminal 2: Trigger test
python test_email_agent.py
# Shows available orders

# Supabase Dashboard: Mark item consumed
UPDATE order_items SET consumed = true WHERE id = 'xxx';

# Terminal 1: See agent respond
# 📊 Consumption update received
# 🔄 Processing consumption update
# 📧 Sending follow-up email
# ✅ Email sent
```

---

## **Option 2: Deploy to Fly.io** (Production)

### **Why Deploy to Fly.io:**
- ✅ Runs 24/7 automatically
- ✅ Production-grade
- ✅ Real Realtime triggers (not local Supabase)
- ✅ MCP server bundled in same container

### **Setup:**

```bash
# 1. Login to Fly.io
fly auth login

# 2. Create app (first time only)
fly apps create waterbar-email-agent --org personal

# 3. Set secrets
fly secrets set \
  SUPABASE_URL=https://dpaciwcnzwyymjmkftrc.supabase.co \
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key \
  OPENAI_API_KEY=sk-xxx \
  RESEND_API_KEY=re_xxx \
  WATERBAR_MCP_PATH=/app/mcp-waterbar-emails/build/index.js \
  --app waterbar-email-agent

# 4. Deploy
fly deploy --config fly.email.toml --app waterbar-email-agent

# 5. Watch logs (live)
fly logs --app waterbar-email-agent
```

### **Test Flow (Production):**

```bash
# 1. Watch Fly logs in terminal
fly logs --app waterbar-email-agent

# 2. Trigger consumption via your website
# User clicks "Add Selected to Intake" on thewater.bar
# or manually update in Supabase:
UPDATE order_items SET consumed = true WHERE id = 'xxx';

# 3. See logs in real-time
# [app] 📊 Consumption update received
# [app] 🔄 Processing consumption update
# [app] 📧 Sending follow-up email
# [app] ✅ Email sent
```

---

## **MCP Differences: Local vs Fly.io**

### **Local Testing:**

```python
# lib/mcp_client.py
WATERBAR_MCP_PATH = os.getenv(
    "WATERBAR_MCP_PATH",
    "../mcp-waterbar-emails/build/index.js"  # ✅ Relative path
)

# You need TWO terminals:
# Terminal 1: node build/index.js (MCP server)
# Terminal 2: python email_agent.py (agent)
```

### **Fly.io Production:**

```dockerfile
# Dockerfile.email includes MCP server
COPY ../mcp-waterbar-emails /app/mcp-waterbar-emails
RUN cd /app/mcp-waterbar-emails && npm install && npm run build

# Agent starts MCP as subprocess automatically
WATERBAR_MCP_PATH=/app/mcp-waterbar-emails/build/index.js  # ✅ Absolute path
```

**Key Difference:**
- **Local:** MCP runs separately (manual start)
- **Fly.io:** MCP started by agent automatically via subprocess

---

## **Which to Choose?**

### **Test Locally First:**
```
1. ✅ Run python email_agent.py
2. ✅ Trigger test consumption
3. ✅ Verify email sends
4. ✅ Fix any bugs
```

### **Then Deploy to Fly.io:**
```
1. ✅ fly deploy
2. ✅ fly logs (watch)
3. ✅ Test with real order
4. ✅ Celebrate! 🎉
```

---

## **Quick Commands:**

### **Local Testing:**
```bash
# Start agent
python email_agent.py

# In another terminal, trigger test
python test_email_agent.py
```

### **Fly.io Deployment:**
```bash
# Deploy
fly deploy --config fly.email.toml

# Watch logs
fly logs

# SSH into container (debug)
fly ssh console

# Restart
fly apps restart waterbar-email-agent
```

---

## **Troubleshooting:**

### **Local: "Supabase Realtime not firing"**
- Check Realtime is enabled on `order_items` table
- Verify trigger function exists
- Check `SUPABASE_SERVICE_ROLE_KEY` is correct

### **Fly.io: "Agent not responding"**
- Check logs: `fly logs`
- Verify secrets: `fly secrets list`
- Check machine status: `fly status`
- Restart: `fly apps restart waterbar-email-agent`

### **MCP: "Email not sending"**
- Check `RESEND_API_KEY` is set
- Verify MCP server path is correct
- Check MCP logs in agent output

---

## **Next Steps:**

1. ✅ **Test locally** (recommended first step)
2. ✅ Verify email sending works
3. ✅ Deploy to Fly.io
4. ✅ Monitor production logs
5. 🎉 **Ship it!**
