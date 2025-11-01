# PowerShell Hooks for Windows Users

This directory contains PowerShell (.ps1) equivalents of the bash (.sh) hooks for native Windows users who cannot use WSL.

## Prerequisites

- PowerShell 5.1 or later (PowerShell 7+ recommended)
- Node.js (for hooks that use TypeScript/npm)
- Optional: terraform, kubectl, or other infrastructure tools

## Available PowerShell Hooks

### Essential Hooks (Skill Activation System)

#### skill-activation-prompt.ps1
**Purpose:** Auto-suggests skills based on user prompts
**Replaces:** skill-activation-prompt.sh

**Configuration in settings.json:**
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "pwsh.exe -File $CLAUDE_PROJECT_DIR\\.claude\\hooks\\skill-activation-prompt.ps1"
          }
        ]
      }
    ]
  }
}
```

#### post-tool-use-tracker.ps1
**Purpose:** Tracks file changes for context management
**Replaces:** post-tool-use-tracker.sh

**Configuration in settings.json:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|MultiEdit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "pwsh.exe -File $CLAUDE_PROJECT_DIR\\.claude\\hooks\\post-tool-use-tracker.ps1"
          }
        ]
      }
    ]
  }
}
```

### Infrastructure Validation Hooks (Optional)

The following hooks are provided as templates. You may need to customize them for your environment:

- `terraform-validator.ps1` - Validates Terraform files
- `k8s-manifest-validator.ps1` - Validates Kubernetes manifests
- `security-policy-check.ps1` - Checks for security issues

## Installation

### Option 1: Use WSL (Recommended)

The easiest approach for Windows users is to use Windows Subsystem for Linux (WSL):

1. Install WSL: `wsl --install`
2. Use the original .sh hooks (they work in WSL)
3. All infrastructure tools work natively in WSL

**Advantages:**
- All hooks work without modification
- Better compatibility with Unix-based tools
- Easier to use infrastructure tools (terraform, kubectl, etc.)

### Option 2: Native PowerShell

If you must use native Windows PowerShell:

1. Copy the appropriate .ps1 files to your project
2. Update your `.claude/settings.json` with PowerShell commands
3. Ensure PowerShell execution policy allows scripts:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

## Path Handling Notes

PowerShell hooks use Windows-style paths (`\`) internally but can accept both:
- Windows paths: `C:\Users\name\project\.claude\hooks`
- Unix paths: `C:/Users/name/project/.claude/hooks`

The hooks automatically handle path conversion where needed.

## Troubleshooting

### "Cannot run script" errors

If you get execution policy errors:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Command not found" errors

Ensure the tools are in your PATH:
- Node.js: Required for TypeScript hooks
- terraform, kubectl: Optional, for validation hooks

### Path issues

If hooks can't find files, ensure `$env:CLAUDE_PROJECT_DIR` is set correctly in your Claude Code environment.

## Creating Custom PowerShell Hooks

When creating custom hooks:

1. Start with `$ErrorActionPreference = "Stop"` for proper error handling
2. Use `exit 0` for success, `exit 1` for failure
3. Handle both Windows and Unix path styles
4. Test with: `pwsh.exe -File your-hook.ps1`

## Limitations

Some bash-specific features may not translate perfectly to PowerShell:
- Complex piping operations may need adjustment
- Some Unix tools may not be available on Windows
- Path separators differ (handled in provided hooks)

## Support

For issues with PowerShell hooks:
1. Try WSL first (recommended approach)
2. Check PowerShell execution policy
3. Verify tool availability (node, terraform, kubectl)
4. Report issues at: https://github.com/anthropics/claude-code/issues

## Contribution

If you create improved PowerShell hooks, consider contributing:
1. Test thoroughly on Windows
2. Handle both path styles
3. Include error handling
4. Document any tool requirements
