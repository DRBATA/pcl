# Quick Supabase Setup Script
Write-Host "🚀 Setting up Supabase for PCL..." -ForegroundColor Cyan

# Step 1: Link project
Write-Host "`n📡 Linking to Supabase project..." -ForegroundColor Yellow
npx supabase link --project-ref iyxzwafmadqyqmzkuais

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to link project. Check your credentials." -ForegroundColor Red
    exit 1
}

# Step 2: Push migrations
Write-Host "`n📤 Pushing database migrations..." -ForegroundColor Yellow
npx supabase db push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push migrations." -ForegroundColor Red
    exit 1
}

# Step 3: Generate types
Write-Host "`n🔧 Generating TypeScript types..." -ForegroundColor Yellow
npx supabase gen types typescript --project-id iyxzwafmadqyqmzkuais > types/supabase.ts

# Success
Write-Host "`n✅ Supabase setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Enable Realtime in Supabase dashboard"
Write-Host "2. Run: npm run dev"
Write-Host "3. Visit: http://localhost:3000/dashboard/patient/join"
