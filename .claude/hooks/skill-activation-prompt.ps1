# PowerShell wrapper for skill-activation-prompt hook
# Windows users: Use this instead of skill-activation-prompt.sh

$ErrorActionPreference = "Stop"

# Change to hooks directory
Set-Location "$env:CLAUDE_PROJECT_DIR\.claude\hooks"

# Pipe stdin to npx tsx
$input | npx tsx skill-activation-prompt.ts
