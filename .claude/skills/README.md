# Skills

Production-tested skills for Claude Code that auto-activate based on context.

---

## What Are Skills?

Skills are modular knowledge bases that Claude loads when needed. They provide:
- Domain-specific guidelines
- Best practices
- Code examples
- Anti-patterns to avoid

**Problem:** Skills don't activate automatically by default.

**Solution:** This showcase includes the hooks + configuration to make them activate.

---

## Available Skills

### Development Skills (5)

Development-focused skills for application code, testing, and error tracking.

---

### skill-developer (Meta-Skill)
**Purpose:** Creating and managing Claude Code skills

**Files:** 7 resource files (426 lines total)

**Use when:**
- Creating new skills
- Understanding skill structure
- Working with skill-rules.json
- Debugging skill activation

**Customization:** ✅ None - copy as-is

**[View Skill →](skill-developer/)**

---

### backend-dev-guidelines
**Purpose:** Node.js/Express/TypeScript development patterns

**Files:** 12 resource files (304 lines main + resources)

**Covers:**
- Layered architecture (Routes → Controllers → Services → Repositories)
- BaseController pattern
- Prisma database access
- Sentry error tracking
- Zod validation
- UnifiedConfig pattern
- Dependency injection
- Testing strategies

**Use when:**
- Creating/modifying API routes
- Building controllers or services
- Database operations with Prisma
- Setting up error tracking

**Customization:** ⚠️ Update `pathPatterns` in skill-rules.json to match your backend directories

**Example pathPatterns:**
```json
{
  "pathPatterns": [
    "src/api/**/*.ts",       // Single app with src/api
    "backend/**/*.ts",       // Backend directory
    "services/*/src/**/*.ts" // Multi-service monorepo
  ]
}
```

**[View Skill →](backend-dev-guidelines/)**

---

### frontend-dev-guidelines
**Purpose:** React/TypeScript/MUI v7 development patterns

**Files:** 11 resource files (398 lines main + resources)

**Covers:**
- Modern React patterns (Suspense, lazy loading)
- useSuspenseQuery for data fetching
- MUI v7 styling (Grid with `size={{}}` prop)
- TanStack Router
- File organization (features/ pattern)
- Performance optimization
- TypeScript best practices

**Use when:**
- Creating React components
- Fetching data with TanStack Query
- Styling with MUI v7
- Setting up routing

**Customization:** ⚠️ Update `pathPatterns` + verify you use React/MUI

**Example pathPatterns:**
```json
{
  "pathPatterns": [
    "src/**/*.tsx",          // Single React app
    "frontend/src/**/*.tsx", // Frontend directory
    "apps/web/**/*.tsx"      // Monorepo web app
  ]
}
```

**Note:** This skill is configured as a **guardrail** (enforcement: "block") to prevent MUI v6→v7 incompatibilities.

**[View Skill →](frontend-dev-guidelines/)**

---

### route-tester
**Purpose:** Testing authenticated API routes with JWT cookie auth

**Files:** 1 main file (389 lines)

**Covers:**
- JWT cookie-based authentication testing
- test-auth-route.js script patterns
- cURL with cookie authentication
- Debugging auth issues
- Testing POST/PUT/DELETE operations

**Use when:**
- Testing API endpoints
- Debugging authentication
- Validating route functionality

**Customization:** ⚠️ Requires JWT cookie auth setup

**Ask first:** "Do you use JWT cookie-based authentication?"
- If YES: Copy and customize service URLs
- If NO: Skip or adapt for your auth method

**[View Skill →](route-tester/)**

---

### error-tracking
**Purpose:** Sentry error tracking and monitoring patterns

**Files:** 1 main file (~250 lines)

**Covers:**
- Sentry v8 initialization
- Error capture patterns
- Breadcrumbs and user context
- Performance monitoring
- Integration with Express and React

**Use when:**
- Setting up error tracking
- Capturing exceptions
- Adding error context
- Debugging production issues

**Customization:** ⚠️ Update `pathPatterns` for your backend

**[View Skill →](error-tracking/)**

---

### Infrastructure Skills (14)

Production-ready infrastructure engineering skills covering platform, security, SRE, cloud, systems, network, build, and more.

---

### cloud-engineering
**Purpose:** Cloud architecture and multi-cloud infrastructure patterns

**Files:** 13 resource files

**Covers:**
- AWS, Azure, GCP, Oracle Cloud (OCI) services
- Multi-cloud and hybrid cloud strategies
- **Government cloud regions (AWS GovCloud, Azure Government, GCP Gov, OCI Gov)**
- **Air-gapped deployments and classified environments**
- **CSPM tools (Trend Micro Cloud One, Prisma Cloud, Wiz, Aqua Security)**
- Cloud networking, security, and cost optimization
- Serverless architectures

**New Resources:**
- **cleared-cloud-environments.md** - Government clouds, FedRAMP, DoD IL5/IL6, air-gapped patterns, on-premises classified networks
- **cloud-security-tools.md** - Complete CSPM tool coverage, native cloud security, tool comparison matrix

**Use when:**
- Designing cloud infrastructure
- Implementing FedRAMP or CMMC compliance
- Deploying to government cloud regions
- Setting up CSPM scanning
- Migrating to cloud or between cloud providers

**Customization:** ⚠️ Update `pathPatterns` for infrastructure code

**[View Skill →](cloud-engineering/)**

---

### devsecops
**Purpose:** Security automation, compliance frameworks, and DevSecOps practices

**Files:** 13 resource files

**Covers:**
- Security scanning (SAST, DAST, SCA)
- Container security and vulnerability scanning
- Secrets management and policy as code
- **Compliance frameworks (FedRAMP, CMMC, NIST 800-53/800-171, ITAR, CJIS, PCI-DSS, HIPAA, SOC 2)**
- **Implementation checklists and audit preparation**
- **CSPM integration in CI/CD pipelines**
- Shift-left security patterns
- Automated compliance monitoring

**New Resources:**
- **compliance-frameworks.md** - Complete compliance framework guide (FedRAMP Low/Moderate/High, CMMC Levels 1-3, NIST controls, ITAR, healthcare, financial services)
- **cspm-integration.md** - CSPM tool integration (GitHub Actions, GitLab CI, Jenkins), policy as code, automated remediation

**Use when:**
- Implementing compliance requirements
- Setting up security scanning pipelines
- Preparing for FedRAMP/CMMC audits
- Integrating CSPM tools (Prisma Cloud, Wiz, Aqua)
- Policy as code implementation

**Customization:** ⚠️ Update for your compliance requirements

**[View Skill →](devsecops/)**

---

### infrastructure-architecture
**Purpose:** System design patterns, architecture decisions, and design documentation

**Files:** 13 resource files

**Covers:**
- System design patterns and anti-patterns
- Architecture Decision Records (ADRs)
- Multi-region and disaster recovery architectures
- Capacity planning and performance modeling
- **Workload classification (Unclassified, CUI, Secret, TS/SCI, ITAR)**
- **Cleared environment architectures**
- **Security zones and cross-domain solutions**
- High availability and fault tolerance patterns

**New Resources:**
- **workload-classification.md** - Data classification levels, separation patterns, access control, Kubernetes namespace isolation
- **cleared-environment-architecture.md** - Reference architectures for Secret, TS/SCI, CUI environments, air-gapped patterns, SCIF requirements

**Use when:**
- Designing system architectures
- Making architectural decisions
- Planning classified/cleared environments
- Implementing data classification
- Designing for compliance and security zones

**Customization:** ⚠️ Adapt classification levels to your requirements

**[View Skill →](infrastructure-architecture/)**

---

### Other Infrastructure Skills

Additional infrastructure skills available (11 more):

- **platform-engineering** - IaC, Kubernetes, GitOps, service mesh (11 resources)
- **sre** - SLO/SLI, observability, incident response (11 resources)
- **release-engineering** - CI/CD, deployment strategies, versioning (10 resources)
- **systems-engineering** - Linux/Windows, Ansible/PowerShell (12 resources)
- **network-engineering** - Network design, load balancing, security (10 resources)
- **build-engineering** - Build systems, Gradle, Maven, Bazel (10 resources)
- **general-it-engineering** - ITIL, ITSM, change management (10 resources)
- **documentation-as-code** - Technical writing, API docs, diagrams (10 resources)
- **observability-engineering** - Distributed tracing, OpenTelemetry (6 resources)
- **database-engineering** - PostgreSQL/MySQL, query optimization (4 resources)
- **api-engineering** - REST, GraphQL, API gateways (4 resources)

See main [README.md](../../README.md) for detailed infrastructure skill descriptions.

---

## How to Add a Skill to Your Project

### Quick Integration

**For Claude Code:**
```
User: "Add the backend-dev-guidelines skill to my project"

Claude should:
1. Ask about project structure
2. Copy skill directory
3. Update skill-rules.json with their paths
4. Verify integration
```

See [CLAUDE_INTEGRATION_GUIDE.md](../../CLAUDE_INTEGRATION_GUIDE.md) for complete instructions.

### Manual Integration

**Step 1: Copy the skill directory**
```bash
cp -r claude-code-infrastructure-showcase/.claude/skills/backend-dev-guidelines \\
      your-project/.claude/skills/
```

**Step 2: Update skill-rules.json**

If you don't have one, create it:
```bash
cp claude-code-infrastructure-showcase/.claude/skills/skill-rules.json \\
   your-project/.claude/skills/
```

Then customize the `pathPatterns` for your project:
```json
{
  "skills": {
    "backend-dev-guidelines": {
      "fileTriggers": {
        "pathPatterns": [
          "YOUR_BACKEND_PATH/**/*.ts"  // ← Update this!
        ]
      }
    }
  }
}
```

**Step 3: Test**
- Edit a file in your backend directory
- The skill should activate automatically

---

## skill-rules.json Configuration

### What It Does

Defines when skills should activate based on:
- **Keywords** in user prompts ("backend", "API", "route")
- **Intent patterns** (regex matching user intent)
- **File path patterns** (editing backend files)
- **Content patterns** (code contains Prisma queries)

### Configuration Format

```json
{
  "skill-name": {
    "type": "domain" | "guardrail",
    "enforcement": "suggest" | "block",
    "priority": "high" | "medium" | "low",
    "promptTriggers": {
      "keywords": ["list", "of", "keywords"],
      "intentPatterns": ["regex patterns"]
    },
    "fileTriggers": {
      "pathPatterns": ["path/to/files/**/*.ts"],
      "contentPatterns": ["import.*Prisma"]
    }
  }
}
```

### Enforcement Levels

- **suggest**: Skill appears as suggestion, doesn't block
- **block**: Must use skill before proceeding (guardrail)

**Use "block" for:**
- Preventing breaking changes (MUI v6→v7)
- Critical database operations
- Security-sensitive code

**Use "suggest" for:**
- General best practices
- Domain guidance
- Code organization

---

## Creating Your Own Skills

See the **skill-developer** skill for complete guide on:
- Skill YAML frontmatter structure
- Resource file organization
- Trigger pattern design
- Testing skill activation

**Quick template:**
```markdown
---
name: my-skill
description: What this skill does
---

# My Skill Title

## Purpose
[Why this skill exists]

## When to Use This Skill
[Auto-activation scenarios]

## Quick Reference
[Key patterns and examples]

## Resource Files
- [topic-1.md](resources/topic-1.md)
- [topic-2.md](resources/topic-2.md)
```

---

## Troubleshooting

### Skill isn't activating

**Check:**
1. Is skill directory in `.claude/skills/`?
2. Is skill listed in `skill-rules.json`?
3. Do `pathPatterns` match your files?
4. Are hooks installed and working?
5. Is settings.json configured correctly?

**Debug:**
```bash
# Check skill exists
ls -la .claude/skills/

# Validate skill-rules.json
cat .claude/skills/skill-rules.json | jq .

# Check hooks are executable
ls -la .claude/hooks/*.sh

# Test hook manually
./.claude/hooks/skill-activation-prompt.sh
```

### Skill activates too often

Update skill-rules.json:
- Make keywords more specific
- Narrow `pathPatterns`
- Increase specificity of `intentPatterns`

### Skill never activates

Update skill-rules.json:
- Add more keywords
- Broaden `pathPatterns`
- Add more `intentPatterns`

---

## For Claude Code

**When integrating a skill for a user:**

1. **Read [CLAUDE_INTEGRATION_GUIDE.md](../../CLAUDE_INTEGRATION_GUIDE.md)** first
2. Ask about their project structure
3. Customize `pathPatterns` in skill-rules.json
4. Verify the skill file has no hardcoded paths
5. Test activation after integration

**Common mistakes:**
- Keeping example paths (blog-api/, frontend/)
- Not asking about monorepo vs single-app
- Copying skill-rules.json without customization

---

## Next Steps

1. **Start simple:** Add one skill that matches your work
2. **Verify activation:** Edit a relevant file, skill should suggest
3. **Add more:** Once first skill works, add others
4. **Customize:** Adjust triggers based on your workflow

**Questions?** See [CLAUDE_INTEGRATION_GUIDE.md](../../CLAUDE_INTEGRATION_GUIDE.md) for comprehensive integration instructions.
