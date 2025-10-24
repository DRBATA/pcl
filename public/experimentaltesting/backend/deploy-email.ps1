# Email Agent Deployment Script for Fly.io
# Copies MCP server and deploys

Write-Host "🚀 Deploying Email Follow-Up Agent..." -ForegroundColor Cyan

# 1. Copy MCP server into backend directory
Write-Host "`n📦 Copying MCP server..." -ForegroundColor Yellow
$mcpSource = "C:\Users\azamb\OneDrive\Desktop\THE.WATER.BAR\mcp-waterbar-emails"
$mcpDest = ".\mcp-waterbar-emails"

if (Test-Path $mcpDest) {
    Remove-Item $mcpDest -Recurse -Force
}

Copy-Item -Path $mcpSource -Destination $mcpDest -Recurse
Write-Host "✅ MCP server copied" -ForegroundColor Green

# 2. Deploy to Fly.io
Write-Host "`n🚀 Deploying to Fly.io..." -ForegroundColor Yellow
fly deploy --config fly.email.toml

# 3. Clean up MCP directory (optional)
Write-Host "`n🧹 Cleaning up..." -ForegroundColor Yellow
Remove-Item $mcpDest -Recurse -Force
Write-Host "✅ Cleanup complete" -ForegroundColor Green

Write-Host "`n🎉 Deployment complete!" -ForegroundColor Cyan
Write-Host "Watch logs with: fly logs --app waterbar-email-agent" -ForegroundColor Gray
