#!/bin/bash
set -e

# Set default CLAUDE_PROJECT_DIR if not set
if [ -z "$CLAUDE_PROJECT_DIR" ]; then
    export CLAUDE_PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
fi

cd "$CLAUDE_PROJECT_DIR/.claude/hooks"
cat | npx tsx skill-activation-prompt.ts
