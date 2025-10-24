# Deploy TypeScript Email Agent to Fly.io
# Usage: .\deploy-email-agent.ps1

Write-Host "🚀 Deploying TypeScript Email Agent to Fly.io..." -ForegroundColor Cyan

# Check if fly CLI is installed
if (-not (Get-Command fly -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Fly CLI not found. Installing..." -ForegroundColor Red
    powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
    Write-Host "✅ Fly CLI installed. Please restart your terminal and run this script again." -ForegroundColor Green
    exit
}

# Check if logged in
fly auth whoami 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "🔐 Please login to Fly.io..." -ForegroundColor Yellow
    fly auth login
}

# App name
$APP_NAME = "waterbar-email-agent"

# Check if app exists
$appExists = fly apps list | Select-String $APP_NAME

if (-not $appExists) {
    Write-Host "📦 Creating Fly app: $APP_NAME..." -ForegroundColor Yellow
    fly apps create $APP_NAME --org personal
    
    Write-Host ""
    Write-Host "🔑 Setting secrets..." -ForegroundColor Yellow
    Write-Host "You'll need to provide the following values:" -ForegroundColor Cyan
    Write-Host ""
    
    # Prompt for secrets
    $SUPABASE_URL = Read-Host "Supabase URL (https://...supabase.co)"
    $SUPABASE_KEY = Read-Host "Supabase Service Role Key" -AsSecureString
    $SUPABASE_KEY_Plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($SUPABASE_KEY))
    
    $ANTHROPIC_KEY = Read-Host "Anthropic API Key (sk-ant-...)" -AsSecureString
    $ANTHROPIC_KEY_Plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($ANTHROPIC_KEY))
    
    $RESEND_KEY = Read-Host "Resend API Key (re_...)" -AsSecureString
    $RESEND_KEY_Plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($RESEND_KEY))
    
    Write-Host ""
    Write-Host "📝 Applying secrets..." -ForegroundColor Yellow
    
    fly secrets set `
        "NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL" `
        "SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_KEY_Plain" `
        "ANTHROPIC_API_KEY=$ANTHROPIC_KEY_Plain" `
        "RESEND_API_KEY=$RESEND_KEY_Plain" `
        --app $APP_NAME
    
    Write-Host "✅ Secrets set!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🏗️  Building and deploying..." -ForegroundColor Yellow

# Deploy
fly deploy `
    --config fly.email-agent.toml `
    --dockerfile Dockerfile.email-agent `
    --app $APP_NAME

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 View logs:" -ForegroundColor Cyan
    Write-Host "   fly logs --app $APP_NAME" -ForegroundColor White
    Write-Host ""
    Write-Host "🔍 Check status:" -ForegroundColor Cyan
    Write-Host "   fly status --app $APP_NAME" -ForegroundColor White
    Write-Host ""
    Write-Host "🖥️  SSH into instance:" -ForegroundColor Cyan
    Write-Host "   fly ssh console --app $APP_NAME" -ForegroundColor White
    Write-Host ""
    
    # Auto-open logs
    $openLogs = Read-Host "Open logs now? (y/n)"
    if ($openLogs -eq "y") {
        fly logs --app $APP_NAME
    }
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed. Check the errors above." -ForegroundColor Red
    exit 1
}
