# Install Required Dependencies

## Missing Packages for PCL System

Run this command to install all required packages:

```bash
npm install --legacy-peer-deps dexie @supabase/supabase-js @supabase/ssr react-markdown
```

### Package Breakdown:

1. **`dexie`** (v4.0.0+)
   - Local IndexedDB wrapper
   - Used for patient PII storage (device-only)
   - Powers all `lib/dexie-db.ts` functionality

2. **`@supabase/supabase-js`** (v2.0.0+)
   - Supabase client library
   - Cloud workflow state management
   - Email tracking, case status, theatre slots

3. **`@supabase/ssr`** (v0.5.0+)
   - Supabase SSR helpers for Next.js
   - Used in `lib/supabase/client.ts`

### Alternative: Install one at a time

```bash
# Core database (REQUIRED)
npm install dexie

# Supabase client (REQUIRED for cloud sync)
npm install @supabase/supabase-js

# Supabase SSR (REQUIRED for Next.js)
npm install @supabase/ssr
```

### Already Installed ✅

These are already in your package.json:
- ✅ `framer-motion` - Animations
- ✅ `lucide-react` - Icons
- ✅ All shadcn/ui components
- ✅ `react-hook-form` - Forms
- ✅ `tailwind` - Styling

### After Installing

1. **Create .env.local file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Add your Supabase credentials to `.env.local`:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```
   
   Get these from: https://app.supabase.com/project/_/settings/api

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

4. No TypeScript errors should appear in:
   - `lib/dexie-db.ts`
   - `hooks/usePatientCases.ts`
   - `components/surgeon/bubble-orchestration-hub.tsx`

### Verification

Check if installed correctly:
```bash
npm list dexie
npm list @supabase/supabase-js
npm list @supabase/ssr
```

Should show versions for each package.

### Why No @use-gesture/react?

We use **framer-motion's built-in `drag` prop** instead! It's simpler and already in your package.json:
- ✅ Less dependencies
- ✅ Better Next.js compatibility
- ✅ Same functionality
