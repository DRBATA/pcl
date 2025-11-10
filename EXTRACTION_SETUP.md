# Document Extraction Setup Guide

## Overview
This guide sets up AI-powered document extraction for prostate care reports using Claude Vision API.

## Features
- ✅ Claude Vision API for document analysis
- ✅ Zod schemas for type-safe data validation
- ✅ Request ID tracking in `agent_sessions` table
- ✅ Full Anthropic SDK logging
- ✅ Pre-filled forms with extracted data
- ✅ Session tracking for debugging

---

## Prerequisites

### 1. Install Required Dependencies

```bash
npm install @anthropic-ai/sdk zod sonner
# or
yarn add @anthropic-ai/sdk zod sonner
```

**Note:** The lint error about `@supabase/supabase-js` indicates you may need to install it:
```bash
npm install @supabase/supabase-js
```

### 2. Environment Variables

Add to your `.env.local`:

```env
# Anthropic API Key (required)
ANTHROPIC_API_KEY=sk-ant-...

# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Enable debug logging (optional, development only)
ANTHROPIC_LOG=debug
NODE_ENV=development
```

### 3. Database Schema

Ensure these tables exist in Supabase:

```sql
-- Agent sessions table (for tracking)
CREATE TABLE IF NOT EXISTS agent_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  room_name text,
  status text DEFAULT 'active',
  image_urls text[],
  created_at timestamptz DEFAULT now(),
  ended_at timestamptz
);

-- Biopsies table
CREATE TABLE IF NOT EXISTS biopsies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  biopsy_date date,
  procedure_type text,
  num_cores_planned int,
  num_cores_actual int,
  prostate_volume_cc numeric,
  created_at timestamptz DEFAULT now()
);

-- Biopsy cores table
CREATE TABLE IF NOT EXISTS biopsy_cores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  biopsy_id uuid REFERENCES biopsies(id) ON DELETE CASCADE,
  core_number int,
  sector_code text,
  side text,
  zone text,
  position text,
  gleason_primary int,
  gleason_secondary int,
  gleason_tertiary int,
  cancer_percentage int,
  core_length_mm numeric,
  cancer_length_mm numeric,
  perineural_invasion boolean DEFAULT false,
  extraprostatic_extension boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- MRI studies table
CREATE TABLE IF NOT EXISTS mri_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  study_date date,
  prostate_volume_cc numeric,
  psa_density numeric,
  radiologist_notes text,
  created_at timestamptz DEFAULT now()
);

-- MRI lesions table
CREATE TABLE IF NOT EXISTS mri_lesions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mri_study_id uuid REFERENCES mri_studies(id) ON DELETE CASCADE,
  lesion_number int,
  volume_cc numeric,
  adc_mean numeric,
  pirads_score int,
  likert_score int,
  side text,
  zone text,
  position text,
  sector_code text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_biopsies_user_id ON biopsies(user_id);
CREATE INDEX IF NOT EXISTS idx_biopsy_cores_biopsy_id ON biopsy_cores(biopsy_id);
CREATE INDEX IF NOT EXISTS idx_mri_studies_user_id ON mri_studies(user_id);
CREATE INDEX IF NOT EXISTS idx_mri_lesions_study_id ON mri_lesions(mri_study_id);
CREATE INDEX IF NOT EXISTS idx_agent_sessions_user_id ON agent_sessions(user_id);
```

---

## File Structure

```
app/
├── api/
│   └── extract-prostate-data/
│       └── route.ts           # Main extraction endpoint
├── components/
│   └── DocumentUploader.tsx   # Upload UI component
├── upload/
│   ├── page.tsx              # Upload page with tabs
│   └── biopsy/
│       └── page.tsx          # Pre-filled biopsy form
```

---

## Usage Flow

### 1. User Uploads Document

```tsx
// In your page component
import DocumentUploader from '@/components/DocumentUploader';

export default function UploadPage() {
  return <DocumentUploader />;
}
```

### 2. API Extracts Data

The API endpoint (`/api/extract-prostate-data`) will:
1. Create a session record in `agent_sessions`
2. Call Claude Vision API with the document image
3. Extract structured data using Zod schemas
4. Log the request ID and session ID
5. Return validated data to the frontend

### 3. Form Pre-fills

The frontend:
1. Stores extracted data in `sessionStorage`
2. Redirects to appropriate form (biopsy or MRI)
3. Pre-fills all fields with extracted values
4. Allows user to review/edit before saving

### 4. Data Saved to Supabase

When user submits:
1. Data is saved to appropriate tables
2. Session is marked as completed
3. User redirected to dashboard

---

## Debugging

### Enable Logging

Set environment variable:
```bash
export ANTHROPIC_LOG=debug
```

### Check Session Tracking

Query the `agent_sessions` table:
```sql
SELECT 
  id,
  user_id,
  room_name,
  status,
  image_urls,
  created_at,
  ended_at
FROM agent_sessions
ORDER BY created_at DESC
LIMIT 10;
```

### View Request IDs

Check your API logs for:
```
[Session Created] <session_id>
[Claude Response] {
  requestId: 'req_...',
  duration: '1234ms',
  stopReason: 'end_turn',
  inputTokens: 1500,
  outputTokens: 800
}
```

### Error Handling

The API handles these errors:
- `APIConnectionError` → 503 (service unavailable)
- `RateLimitError` → 429 (rate limit)
- `APIStatusError` → 500 (with request ID)
- `ZodError` → 422 (validation failed)

---

## Testing

### Test with Sample Document

1. Upload a sample biopsy report (JPG, PNG, or PDF)
2. Check browser console for logs
3. Verify data extracted correctly
4. Review pre-filled form
5. Save and check Supabase tables

### Example Test Flow

```typescript
// In browser console after upload
const session = sessionStorage.getItem('extractionSessionId');
const requestId = sessionStorage.getItem('extractionRequestId');
const data = JSON.parse(sessionStorage.getItem('extractedData'));

console.log('Session:', session);
console.log('Request:', requestId);
console.log('Extracted:', data);
```

---

## Performance Optimization

### 1. Image Size
- Recommended: < 2MB
- Maximum: 10MB
- Resize large images before upload for faster processing

### 2. Caching
Consider implementing prompt caching for repeated document types:
```typescript
// Add to API request
const response = await anthropic.messages.create({
  // ... other params
  system: [
    {
      type: "text",
      text: "System instructions...",
      cache_control: { type: "ephemeral" }
    }
  ]
});
```

### 3. Batch Processing
For multiple documents, process in parallel:
```typescript
const results = await Promise.all(
  files.map(file => extractDataWithClaude(file))
);
```

---

## Security Considerations

### 1. API Key Protection
- Never expose `ANTHROPIC_API_KEY` in client code
- Use server-side API routes only
- Rotate keys regularly

### 2. User Authentication
Replace `userId: 'user1'` with actual user ID from auth:
```typescript
import { getServerSession } from 'next-auth';

const session = await getServerSession();
const userId = session?.user?.id || 'anonymous';
```

### 3. Rate Limiting
Implement rate limiting to prevent abuse:
```typescript
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
});

const { success } = await ratelimit.limit(userId);
if (!success) {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
```

---

## Troubleshooting

### Issue: "No image provided"
- Check file upload is complete
- Verify base64 encoding
- Check file type (JPG, PNG, PDF only)

### Issue: "Failed to extract JSON"
- Check Claude's response in logs
- May need to adjust prompt
- Verify document is clear and readable

### Issue: "Validation failed"
- Check Zod schema matches your database
- Review extracted data structure
- Adjust schema or prompt as needed

### Issue: Missing Supabase client
Install the package:
```bash
npm install @supabase/supabase-js
```

---

## Next Steps

1. **Add MRI Form**: Create similar form for MRI reports
2. **Add Vision Examples**: Show example documents in UI
3. **Improve Prompts**: Fine-tune extraction prompts based on real documents
4. **Add Confidence Scores**: Track extraction confidence per field
5. **Implement Review UI**: Flag low-confidence extractions for manual review

---

## Support

For issues or questions:
1. Check browser console for errors
2. Review API logs for request IDs
3. Query `agent_sessions` table for session history
4. Check Anthropic API status: https://status.anthropic.com
