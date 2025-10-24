# 🚀 Deploy TypeScript Email Agent to Fly.io

## **What This Is**

Autonomous email follow-up agent that:
- ✅ **Listens to Supabase Realtime** (WebSocket, instant notifications)
- ✅ **Claude AI personalization** (contextual hydration advice)
- ✅ **Beautiful React Email templates** (professional design)
- ✅ **Smart email selection** (follow-up vs completion)
- ✅ **Scales infinitely** (no polling overhead)

---

## **Prerequisites**

1. **Fly.io account** - Sign up at fly.io
2. **Fly CLI installed** - `powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"`
3. **Supabase project** - Already configured
4. **Resend API key** - For sending emails
5. **Anthropic API key** - For Claude AI

---

## **Local Testing**

### **1. Install Dependencies**

```powershell
cd backend
npm install
```

### **2. Set Environment Variables**

Create `.env` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://dpaciwcnzwyymjmkftrc.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-api03-el5KR7_ux6ec_MVMaeR...

# Resend
RESEND_API_KEY=re_8DmeHQg9_4GPRy8mTMBK75aQpkcbAaKqB
```

### **3. Run Locally**

```powershell
npm run dev
```

**Expected output:**
```
✅ Email Follow-Up Agent initialized
🚀 Starting Email Follow-Up Agent with Realtime...
✅ Subscribed to order_items Realtime updates
👂 Listening for drink consumption...
```

### **4. Test Consumption**

In Supabase SQL Editor:

```sql
UPDATE order_items 
SET consumed = true 
WHERE id = 'some-item-id';
```

**You should see:**
```
📊 Consumption detected: Celery Juice in order abc-123
🔄 Processing consumption update for order: abc-123
📊 Order abc-123: 1/3 consumed, 2 remaining
📧 Sending follow-up email to customer@email.com
✅ Email sent to customer@email.com
```

---

## **Deploy to Fly.io**

### **1. Login to Fly**

```powershell
fly auth login
```

### **2. Create Fly App**

```powershell
fly apps create waterbar-email-agent --org personal
```

### **3. Set Secrets**

```powershell
fly secrets set \
  NEXT_PUBLIC_SUPABASE_URL="https://dpaciwcnzwyymjmkftrc.supabase.co" \
  SUPABASE_SERVICE_ROLE_KEY="your-service-role-key" \
  ANTHROPIC_API_KEY="sk-ant-api03-el5KR7..." \
  RESEND_API_KEY="re_8DmeHQg9_4GPRy..." \
  --app waterbar-email-agent
```

### **4. Deploy**

```powershell
fly deploy --config fly.email-agent.toml --dockerfile Dockerfile.email-agent --app waterbar-email-agent
```

### **5. Check Logs**

```powershell
fly logs --app waterbar-email-agent
```

---

## **Architecture**

```
┌────────────────────────────────────────────┐
│  Fly.io (London region)                    │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  TypeScript Email Agent              │ │
│  │  ├─ Supabase Realtime (WebSocket)    │ │
│  │  ├─ Claude AI (Anthropic SDK)        │ │
│  │  ├─ React Email Rendering            │ │
│  │  └─ Resend API (Email Sending)       │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
         ↓                        ↑
    (Realtime)              (Email Sent)
         ↓                        ↑
┌────────────────────────────────────────────┐
│  Supabase                                  │
│  └─ order_items table changes             │
└────────────────────────────────────────────┘
```

---

## **Email Flow**

### **1. Consumption Detected (Realtime)**
```
User marks drink as consumed
→ Supabase UPDATE trigger
→ Realtime WebSocket event
→ Agent receives notification (0-100ms)
```

### **2. AI Analysis**
```
Agent fetches:
├─ Order details
├─ All order items (consumed vs remaining)
└─ Booking context (experience, venue)

Claude AI generates:
└─ Personalized hydration advice
```

### **3. Email Decision**
```
IF remaining drinks > 0:
  ✉️ Follow-up email ("Keep going! 2 drinks left")
ELSE:
  ✉️ Completion email ("🎉 All drinks consumed!")
```

### **4. Beautiful Email Sent**
```
React Email template renders:
├─ Customer name
├─ Consumed drinks list
├─ Remaining drinks (if any)
├─ AI-generated advice
├─ Pro hydration tips
└─ WhatsApp feedback CTA

Resend API sends → Customer receives
```

---

## **Monitoring**

### **View Logs**
```powershell
fly logs --app waterbar-email-agent
```

### **Check Status**
```powershell
fly status --app waterbar-email-agent
```

### **SSH into Instance**
```powershell
fly ssh console --app waterbar-email-agent
```

---

## **Scaling**

### **Auto-scale**
```powershell
fly scale count 2 --app waterbar-email-agent
```

### **Upgrade Memory**
```powershell
fly scale memory 1024 --app waterbar-email-agent
```

---

## **Troubleshooting**

### **Agent Not Receiving Events**

Check Realtime subscription:
```typescript
// Logs should show:
✅ Subscribed to order_items Realtime updates
```

If not, check Supabase Realtime settings:
- Dashboard → Settings → API → Realtime enabled
- Table `order_items` has Realtime enabled

### **Emails Not Sending**

Check Resend domain verification:
```powershell
# Test locally first
npm run dev
```

Verify in Resend dashboard:
- Domain `thewater.bar` is verified
- DNS records are correct

### **Claude AI Errors**

Check API key:
```powershell
fly secrets list --app waterbar-email-agent
```

Verify credits:
- Go to console.anthropic.com
- Check billing and usage

---

## **Cost Estimate**

**Fly.io:**
- 512MB VM: ~$5/month
- Egress: ~$1/month
- **Total: ~$6/month**

**Supabase:**
- Realtime: Included in free tier
- Database queries: Minimal (only on consumption)
- **Total: $0 (on free tier)**

**Anthropic (Claude):**
- Haiku model: $0.25 per 1M input tokens
- ~150 tokens per email = $0.0000375 per email
- 10,000 emails = $3.75
- **Total: ~$4/month** for moderate volume

**Resend:**
- 3,000 emails/month free
- $20/month for 50,000 emails
- **Total: $0-$20/month**

**Grand Total: ~$10-$30/month** for full autonomous operation

---

## **Next Steps**

1. ✅ Test locally
2. ✅ Deploy to Fly.io
3. ✅ Monitor logs
4. ⏳ Add more email templates (completion, missed drinks, etc.)
5. ⏳ Add analytics (track open rates, click rates)
6. ⏳ Add A/B testing for email content

---

**Questions? Check the code comments or Fly.io logs!**
