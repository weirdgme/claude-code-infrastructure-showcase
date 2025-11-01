#!/bin/bash
#
# Security Policy Check Hook
# Checks for hardcoded secrets, insecure configurations, and security violations
# Hook: Stop (runs before tool execution)
#

set -e

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Exit codes
EXIT_SUCCESS=0
EXIT_WARNING=1
EXIT_ERROR=2

# Counters
CRITICAL_ISSUES=0
WARNING_ISSUES=0

echo "🔒 Running security policy checks..."

# Function to check for secrets in files
check_secrets() {
    local file="$1"
    local issues=0

    # Skip binary files and known safe files
    if file "$file" | grep -q "text"; then
        # Check for AWS keys
        if grep -qE "AKIA[0-9A-Z]{16}" "$file"; then
            echo -e "${RED}❌ CRITICAL: AWS Access Key found in $file${NC}"
            ((CRITICAL_ISSUES++))
            ((issues++))
        fi

        # Check for private keys
        if grep -qE "BEGIN.*PRIVATE KEY" "$file"; then
            echo -e "${RED}❌ CRITICAL: Private key found in $file${NC}"
            ((CRITICAL_ISSUES++))
            ((issues++))
        fi

        # Check for password patterns
        if grep -qiE "(password|passwd|pwd)\s*=\s*['\"][^'\"]{3,}" "$file"; then
            echo -e "${RED}❌ CRITICAL: Hardcoded password found in $file${NC}"
            ((CRITICAL_ISSUES++))
            ((issues++))
        fi

        # Check for API keys/tokens
        if grep -qiE "(api[_-]?key|api[_-]?token|auth[_-]?token)\s*=\s*['\"][^'\"]{10,}" "$file"; then
            echo -e "${YELLOW}⚠️  WARNING: Possible API key/token in $file${NC}"
            ((WARNING_ISSUES++))
            ((issues++))
        fi

        # Check for database connection strings
        if grep -qiE "(mysql|postgresql|mongodb)://[^@]+:[^@]+@" "$file"; then
            echo -e "${RED}❌ CRITICAL: Database connection string with credentials in $file${NC}"
            ((CRITICAL_ISSUES++))
            ((issues++))
        fi

        # Check for JWT tokens
        if grep -qE "eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9._-]{10,}" "$file"; then
            echo -e "${YELLOW}⚠️  WARNING: Possible JWT token in $file${NC}"
            ((WARNING_ISSUES++))
            ((issues++))
        fi
    fi

    return $issues
}

# Function to check infrastructure files for insecure configurations
check_infrastructure() {
    local file="$1"
    local issues=0

    # Terraform files
    if [[ "$file" == *.tf ]]; then
        # Check for public S3 buckets
        if grep -q "acl.*=.*\"public" "$file"; then
            echo -e "${YELLOW}⚠️  WARNING: Public S3 bucket ACL in $file${NC}"
            ((WARNING_ISSUES++))
            ((issues++))
        fi

        # Check for open security groups (0.0.0.0/0)
        if grep -q "0.0.0.0/0" "$file" && grep -q "ingress" "$file"; then
            echo -e "${YELLOW}⚠️  WARNING: Security group allows ingress from 0.0.0.0/0 in $file${NC}"
            ((WARNING_ISSUES++))
            ((issues++))
        fi

        # Check for disabled encryption
        if grep -qiE "encrypt.*=.*false" "$file"; then
            echo -e "${YELLOW}⚠️  WARNING: Encryption disabled in $file${NC}"
            ((WARNING_ISSUES++))
            ((issues++))
        fi
    fi

    # Kubernetes manifests
    if [[ "$file" == *.yaml ]] || [[ "$file" == *.yml ]]; then
        # Check for privileged containers
        if grep -q "privileged: true" "$file"; then
            echo -e "${RED}❌ CRITICAL: Privileged container in $file${NC}"
            ((CRITICAL_ISSUES++))
            ((issues++))
        fi

        # Check for hostPath volumes
        if grep -q "hostPath:" "$file"; then
            echo -e "${YELLOW}⚠️  WARNING: hostPath volume in $file${NC}"
            ((WARNING_ISSUES++))
            ((issues++))
        fi

        # Check for containers running as root
        if grep -q "runAsUser: 0" "$file"; then
            echo -e "${YELLOW}⚠️  WARNING: Container running as root (UID 0) in $file${NC}"
            ((WARNING_ISSUES++))
            ((issues++))
        fi

        # Check for missing resource limits
        if grep -q "kind: Deployment" "$file" && ! grep -q "resources:" "$file"; then
            echo -e "${YELLOW}⚠️  WARNING: Missing resource limits in $file${NC}"
            ((WARNING_ISSUES++))
            ((issues++))
        fi
    fi

    # Docker files
    if [[ "$file" == *Dockerfile* ]]; then
        # Check for running as root
        if ! grep -q "USER" "$file"; then
            echo -e "${YELLOW}⚠️  WARNING: Dockerfile doesn't specify USER (will run as root) in $file${NC}"
            ((WARNING_ISSUES++))
            ((issues++))
        fi

        # Check for latest tag
        if grep -qE "FROM.*:latest" "$file"; then
            echo -e "${YELLOW}⚠️  WARNING: Using :latest tag in $file${NC}"
            ((WARNING_ISSUES++))
            ((issues++))
        fi
    fi

    return $issues
}

# Function to check environment files
check_env_files() {
    local file="$1"

    if [[ "$file" == *.env* ]] || [[ "$file" == *credentials* ]]; then
        echo -e "${RED}❌ CRITICAL: Environment/credentials file should not be committed: $file${NC}"
        ((CRITICAL_ISSUES++))
        return 1
    fi

    return 0
}

# Get list of changed files (if in git repo)
if git rev-parse --git-dir > /dev/null 2>&1; then
    # Check staged files
    CHANGED_FILES=$(git diff --cached --name-only --diff-filter=ACM 2>/dev/null || echo "")

    if [ -z "$CHANGED_FILES" ]; then
        # If no staged files, check modified files
        CHANGED_FILES=$(git diff --name-only --diff-filter=ACM 2>/dev/null || echo "")
    fi

    # Check files
    while IFS= read -r file; do
        if [ -f "$file" ]; then
            # Skip certain directories
            if [[ "$file" == *node_modules* ]] || [[ "$file" == *vendor* ]] || [[ "$file" == *.git* ]]; then
                continue
            fi

            # Run checks
            check_env_files "$file" || true
            check_secrets "$file" || true
            check_infrastructure "$file" || true
        fi
    done <<< "$CHANGED_FILES"
else
    echo "⚠️  Not a git repository, skipping file checks"
fi

# Report results
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Security Policy Check Results:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Critical Issues: ${RED}$CRITICAL_ISSUES${NC}"
echo -e "Warnings: ${YELLOW}$WARNING_ISSUES${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Exit with appropriate code
if [ $CRITICAL_ISSUES -gt 0 ]; then
    echo ""
    echo -e "${RED}❌ BLOCKED: Critical security issues found!${NC}"
    echo ""
    echo "Please fix the critical issues before proceeding:"
    echo "  • Remove hardcoded secrets (use environment variables or secret managers)"
    echo "  • Do not commit .env or credentials files"
    echo "  • Do not commit private keys or certificates"
    echo "  • Use secure configurations for infrastructure"
    echo ""
    echo "If you believe this is a false positive, you can:"
    echo "  1. Add '# security: ignore' comment on the line"
    echo "  2. Add file to .securityignore"
    echo "  3. Disable this hook temporarily (not recommended)"
    echo ""
    exit $EXIT_ERROR
elif [ $WARNING_ISSUES -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}⚠️  Security warnings found. Please review.${NC}"
    echo ""
    echo "Consider fixing warnings:"
    echo "  • Avoid overly permissive security groups"
    echo "  • Enable encryption where applicable"
    echo "  • Avoid privileged containers"
    echo "  • Run containers as non-root user"
    echo "  • Specify resource limits"
    echo ""
    # Allow to proceed with warnings
    exit $EXIT_SUCCESS
else
    echo -e "${GREEN}✅ No security issues found!${NC}"
    exit $EXIT_SUCCESS
fi
