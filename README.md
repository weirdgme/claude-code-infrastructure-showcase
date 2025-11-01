# Claude Code Infrastructure Showcase

**A curated reference library of production-tested Claude Code infrastructure.**

Born from 6 months of real-world use managing a complex TypeScript microservices project, this showcase provides the patterns and systems that solved the "skills don't activate automatically" problem and scaled Claude Code for enterprise development.

> **This is NOT a working application** - it's a reference library. Copy what you need into your own projects.

---

## 🙏 Acknowledgements

**This repository is built upon the foundational work of [diet103's Claude Code Infrastructure Showcase](https://github.com/diet103/claude-code-infrastructure-showcase).**

The original project by **diet103** provided the breakthrough patterns and core infrastructure that made this expansion possible:
- ✨ **Auto-activation system** - The hook-based skill activation mechanism
- ✨ **Modular skill pattern** - The 500-line rule and progressive disclosure approach
- ✨ **Development skills** - Backend and frontend development guidelines
- ✨ **Agent patterns** - Specialized agent architecture
- ✨ **Real-world validation** - 6 months of production use

**This fork extends the original with:**
- 🎯 **14 infrastructure engineering skills** (vs. original 5 development skills)
- 🎯 **151 total resource files** covering platform, security, SRE, cloud, systems, network, build, architecture, observability, and more
- 🎯 **Infrastructure focus** while maintaining all original development patterns

**Massive thanks to diet103** for creating the foundation, documenting the patterns, and sharing this invaluable work with the community. This showcase builds directly on their innovation and production-tested insights.

**Original repository:** https://github.com/diet103/claude-code-infrastructure-showcase

---

## What's Inside

**Production-tested infrastructure for:**
- ✅ **Auto-activating skills** via hooks
- ✅ **Modular skill pattern** (500-line rule with progressive disclosure)
- ✅ **Specialized agents** for complex tasks
- ✅ **Dev docs system** that survives context resets
- ✅ **Comprehensive examples** using generic blog domain

**Time investment to build:** 6 months of iteration
**Time to integrate into your project:** 15-30 minutes

---

## Quick Start - Pick Your Path

### 🤖 Using Claude Code to Integrate?

**Claude:** Read [`CLAUDE_INTEGRATION_GUIDE.md`](CLAUDE_INTEGRATION_GUIDE.md) for step-by-step integration instructions tailored for AI-assisted setup.

### 🎯 I want skill auto-activation

**The breakthrough feature:** Skills that actually activate when you need them.

**What you need:**
1. The skill-activation hooks (2 files)
2. A skill or two relevant to your work
3. 15 minutes

**👉 [Setup Guide: .claude/hooks/README.md](.claude/hooks/README.md)**

### 📚 I want to add ONE skill

Browse the [skills catalog](.claude/skills/) and copy what you need.

**Available:**
- **backend-dev-guidelines** - Node.js/Express/TypeScript patterns
- **frontend-dev-guidelines** - React/TypeScript/MUI v7 patterns
- **skill-developer** - Meta-skill for creating skills
- **route-tester** - Test authenticated API routes
- **error-tracking** - Sentry integration patterns

**👉 [Skills Guide: .claude/skills/README.md](.claude/skills/README.md)**

### 🤖 I want specialized agents

10 production-tested agents for complex tasks:
- Code architecture review
- Refactoring assistance
- Documentation generation
- Error debugging
- And more...

**👉 [Agents Guide: .claude/agents/README.md](.claude/agents/README.md)**

---

## Platform Compatibility

### ✅ Fully Supported

**Linux & macOS:**
- All hooks work natively
- All skills, agents, and commands function perfectly
- No additional setup required

**Windows Subsystem for Linux (WSL):**
- ⭐ **Recommended for Windows users**
- All hooks work through bash
- Full functionality available
- [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

### ⚠️ Partial Support

**Windows (Native PowerShell/CMD):**
- ❌ Bash hooks will not work natively (`.sh` files)
- ✅ Skills, agents, and commands work fine
- ✅ systems-engineering skill includes Windows Server & PowerShell coverage
- 💡 **Workaround:** Use WSL or create PowerShell hook equivalents

**Infrastructure Skills Windows Coverage:**
The `systems-engineering` skill provides comprehensive Windows administration guidance:
- Windows Server administration
- PowerShell scripting & DSC
- Active Directory & Group Policy
- IIS, Registry, WSUS configuration
- See [systems-engineering resources](.claude/skills/systems-engineering/resources/)

---

## What Makes This Different?

### The Auto-Activation Breakthrough

**Problem:** Claude Code skills just sit there. You have to remember to use them.

**Solution:** UserPromptSubmit hook that:
- Analyzes your prompts
- Checks file context
- Automatically suggests relevant skills
- Works via `skill-rules.json` configuration

**Result:** Skills activate when you need them, not when you remember them.

### Production-Tested Patterns

These aren't theoretical examples - they're extracted from:
- ✅ 6 microservices in production
- ✅ 50,000+ lines of TypeScript
- ✅ React frontend with complex data grids
- ✅ Sophisticated workflow engine
- ✅ 6 months of daily Claude Code use

The patterns work because they solved real problems.

### Modular Skills (500-Line Rule)

Large skills hit context limits. The solution:

```
skill-name/
  SKILL.md                  # <500 lines, high-level guide
  resources/
    topic-1.md              # <500 lines each
    topic-2.md
    topic-3.md
```

**Progressive disclosure:** Claude loads main skill first, loads resources only when needed.

---

## Repository Structure

```
.claude/
├── skills/                 # 19 production skills
│   ├── Development (5):
│   │   ├── backend-dev-guidelines/  (11 resource files)
│   │   ├── frontend-dev-guidelines/ (10 resource files)
│   │   ├── skill-developer/         (7 resource files)
│   │   ├── route-tester/
│   │   └── error-tracking/
│   ├── Infrastructure (14):
│   │   ├── platform-engineering/          (11 resource files)
│   │   ├── devsecops/                    (11 resource files)
│   │   ├── sre/                          (11 resource files)
│   │   ├── release-engineering/          (10 resource files)
│   │   ├── cloud-engineering/            (10 resource files)
│   │   ├── systems-engineering/          (12 resource files)
│   │   ├── network-engineering/          (10 resource files)
│   │   ├── build-engineering/            (10 resource files)
│   │   ├── general-it-engineering/       (10 resource files)
│   │   ├── infrastructure-architecture/  (11 resource files)
│   │   ├── documentation-as-code/        (10 resource files)
│   │   ├── observability-engineering/    (6 resource files)
│   │   ├── database-engineering/         (4 resource files)
│   │   └── api-engineering/              (4 resource files)
│   └── skill-rules.json    # Skill activation configuration
├── hooks/                  # 16 hooks for automation
│   ├── skill-activation-prompt.*  (ESSENTIAL)
│   ├── post-tool-use-tracker.sh   (ESSENTIAL)
│   ├── security-policy-check.sh   (infrastructure)
│   ├── terraform-validator.sh     (infrastructure)
│   ├── k8s-manifest-validator.sh  (infrastructure)
│   └── ... 11 more
├── agents/                 # 21 specialized agents
│   ├── Development (10):
│   │   ├── code-architecture-reviewer.md
│   │   ├── refactor-planner.md
│   │   └── ... 8 more
│   └── Infrastructure (11):
│       ├── infrastructure-architect.md
│       ├── kubernetes-specialist.md
│       ├── security-scanner.md
│       ├── cost-optimizer.md
│       └── ... 7 more
└── commands/               # 8 slash commands
    ├── Development (3):
    │   ├── dev-docs.md
    │   └── ... 2 more
    └── Infrastructure (5):
        ├── infra-plan.md
        ├── security-review.md
        └── ... 3 more

dev/
└── active/                 # Dev docs pattern examples
    └── public-infrastructure-repo/
```

---

## Component Catalog

### 🎨 Skills (19 Total)

**Development Skills (5):**

| Skill | Lines | Purpose | Best For |
|-------|-------|---------|----------|
| [**skill-developer**](.claude/skills/skill-developer/) | 426 | Creating and managing skills | Meta-development |
| [**backend-dev-guidelines**](.claude/skills/backend-dev-guidelines/) | 304 | Express/Prisma/Sentry patterns | Backend APIs |
| [**frontend-dev-guidelines**](.claude/skills/frontend-dev-guidelines/) | 398 | React/MUI v7/TypeScript | React frontends |
| [**route-tester**](.claude/skills/route-tester/) | 389 | Testing authenticated routes | API testing |
| [**error-tracking**](.claude/skills/error-tracking/) | ~250 | Sentry integration | Error monitoring |

**Infrastructure Skills (14):**

| Skill | Resources | Purpose | Best For |
|-------|-----------|---------|----------|
| [**platform-engineering**](.claude/skills/platform-engineering/) | 11 | IaC, Kubernetes, GitOps | Platform architecture |
| [**devsecops**](.claude/skills/devsecops/) | 11 | Security, compliance | Security automation |
| [**sre**](.claude/skills/sre/) | 11 | SLO/SLI, observability | Site reliability |
| [**release-engineering**](.claude/skills/release-engineering/) | 10 | CI/CD, deployments | Release pipelines |
| [**cloud-engineering**](.claude/skills/cloud-engineering/) | 10 | AWS, Azure, GCP | Cloud architecture |
| [**systems-engineering**](.claude/skills/systems-engineering/) | 12 | Linux/Windows, Ansible/PowerShell, performance tuning | Systems administration, automation |
| [**network-engineering**](.claude/skills/network-engineering/) | 10 | Network design | Network architecture |
| [**build-engineering**](.claude/skills/build-engineering/) | 10 | Build systems | Build optimization |
| [**general-it-engineering**](.claude/skills/general-it-engineering/) | 10 | ITIL, ITSM | IT operations |
| [**infrastructure-architecture**](.claude/skills/infrastructure-architecture/) | 11 | System design, ADRs, multi-region, DR | Architecture patterns, capacity planning |
| [**documentation-as-code**](.claude/skills/documentation-as-code/) | 10 | Technical writing, API docs, diagrams | Documentation automation |
| [**observability-engineering**](.claude/skills/observability-engineering/) | 6 | Distributed tracing, OpenTelemetry, APM | Observability, monitoring |
| [**database-engineering**](.claude/skills/database-engineering/) | 4 | PostgreSQL, query optimization | Database administration |
| [**api-engineering**](.claude/skills/api-engineering/) | 4 | REST, GraphQL, API gateways | API design, rate limiting |

**All skills follow the modular pattern** - main file + resource files for progressive disclosure.

**👉 [How to integrate skills →](.claude/skills/README.md)**

### 🪝 Hooks (6)

| Hook | Type | Essential? | Customization |
|------|------|-----------|---------------|
| skill-activation-prompt | UserPromptSubmit | ✅ YES | ✅ None needed |
| post-tool-use-tracker | PostToolUse | ✅ YES | ✅ None needed |
| tsc-check | Stop | ⚠️ Optional | ⚠️ Heavy - monorepo only |
| trigger-build-resolver | Stop | ⚠️ Optional | ⚠️ Heavy - monorepo only |
| error-handling-reminder | Stop | ⚠️ Optional | ⚠️ Moderate |
| stop-build-check-enhanced | Stop | ⚠️ Optional | ⚠️ Moderate |

**Start with the two essential hooks** - they enable skill auto-activation and work out of the box.

**👉 [Hook setup guide →](.claude/hooks/README.md)**

### 🤖 Agents (21 Total)

**Development Agents (10):**

| Agent | Purpose |
|-------|---------|
| code-architecture-reviewer | Review code for architectural consistency |
| code-refactor-master | Plan and execute refactoring |
| documentation-architect | Generate comprehensive documentation |
| frontend-error-fixer | Debug frontend errors |
| plan-reviewer | Review development plans |
| refactor-planner | Create refactoring strategies |
| web-research-specialist | Research technical issues online |
| auth-route-tester | Test authenticated endpoints |
| auth-route-debugger | Debug auth issues |
| auto-error-resolver | Auto-fix TypeScript errors |

**Infrastructure Agents (11):**

| Agent | Purpose |
|-------|---------|
| infrastructure-architect | Design cloud-native architectures |
| kubernetes-specialist | Kubernetes deployment and troubleshooting |
| iac-code-generator | Generate Infrastructure as Code |
| incident-responder | Incident response and debugging |
| security-scanner | Security vulnerability analysis |
| deployment-orchestrator | Design deployment pipelines |
| cost-optimizer | Cloud cost analysis and optimization |
| migration-planner | Migration and modernization planning |
| network-architect | Network design and architecture |
| build-optimizer | Build performance optimization |

**All agents are standalone** - just copy and use!

**👉 [How agents work →](.claude/agents/README.md)**

### 🏗️ Infrastructure Skills (14)

**Production-ready infrastructure engineering skills:**

| Skill | Resources | Coverage | Best For |
|-------|-----------|----------|----------|
| [**platform-engineering**](.claude/skills/platform-engineering/) | 11 | IaC, Kubernetes, GitOps, Service Mesh | Platform architecture, container orchestration |
| [**devsecops**](.claude/skills/devsecops/) | 11 | Security scanning, secrets, compliance | Security automation, policy enforcement |
| [**sre**](.claude/skills/sre/) | 11 | SLO/SLI, observability, incident response | Site reliability, monitoring, on-call |
| [**release-engineering**](.claude/skills/release-engineering/) | 10 | CI/CD, deployment strategies, versioning | Release pipelines, progressive delivery |
| [**cloud-engineering**](.claude/skills/cloud-engineering/) | 10 | AWS, Azure, GCP, multi-cloud | Cloud architecture, migration, optimization |
| [**systems-engineering**](.claude/skills/systems-engineering/) | 12 | Linux/Windows, Ansible/PowerShell, performance tuning | Systems administration, automation |
| [**network-engineering**](.claude/skills/network-engineering/) | 10 | Network design, load balancing, security | Network architecture, troubleshooting |
| [**build-engineering**](.claude/skills/build-engineering/) | 10 | Build systems, Gradle, Maven, Bazel | Build optimization, monorepos |
| [**general-it-engineering**](.claude/skills/general-it-engineering/) | 10 | ITIL, ITSM, change management, governance | IT operations, service management |
| [**infrastructure-architecture**](.claude/skills/infrastructure-architecture/) | 11 | System design, ADRs, multi-region, DR, capacity planning | Architecture patterns, design decisions |
| [**documentation-as-code**](.claude/skills/documentation-as-code/) | 10 | Technical writing, API docs, OpenAPI, diagrams, automation | Documentation workflows, standards |
| [**observability-engineering**](.claude/skills/observability-engineering/) | 6 | Distributed tracing, OpenTelemetry, APM, logs | Observability, performance monitoring |
| [**database-engineering**](.claude/skills/database-engineering/) | 4 | PostgreSQL/MySQL, query optimization, replication | Database administration, performance |
| [**api-engineering**](.claude/skills/api-engineering/) | 4 | REST, GraphQL, API gateways, rate limiting | API design, versioning |

**All infrastructure skills include:**
- Comprehensive resource files (<500 lines each)
- Production patterns and examples
- Best practices and anti-patterns
- Integration with other skills
- Auto-activation via skill-rules.json

**👉 [Infrastructure skills guide →](.claude/skills/README.md)**

### 💬 Slash Commands (8)

**Development Commands:**

| Command | Purpose |
|---------|---------|
| /dev-docs | Create structured dev documentation |
| /dev-docs-update | Update docs before context reset |
| /route-research-for-testing | Research route patterns for testing |

**Infrastructure Commands:**

| Command | Purpose |
|---------|---------|
| /infra-plan | Create infrastructure implementation plan |
| /security-review | Security review of infrastructure code |
| /incident-debug | Structured incident debugging guide |
| /cost-analysis | Infrastructure cost analysis and optimization |
| /migration-plan | Cloud migration or modernization plan |

---

## How Infrastructure Topics Are Organized

### DevOps Coverage Distribution

**You might be wondering:** "Where's the DevOps skill?"

**Answer:** DevOps practices are distributed across specialized disciplines, matching how modern engineering teams are structured:

| DevOps Practice | Covered In | What You'll Find |
|----------------|------------|------------------|
| **CI/CD Pipelines** | release-engineering | GitHub Actions, Jenkins, deployment strategies, versioning, artifact management |
| **Infrastructure as Code** | platform-engineering | Terraform, Pulumi, CloudFormation, GitOps (ArgoCD, Flux) |
| **Container Orchestration** | platform-engineering | Kubernetes, Docker, service mesh, helm charts |
| **Monitoring & Observability** | sre | Prometheus, Grafana, distributed tracing, SLO/SLI, alerting |
| **Security Automation** | devsecops | SAST/DAST/SCA, secrets management, policy as code, vulnerability scanning |
| **Cloud Infrastructure** | cloud-engineering | AWS, Azure, GCP services, multi-cloud, serverless, cloud networking |
| **System Administration** | systems-engineering | Linux/Windows, Ansible, PowerShell, configuration management |
| **Build Systems** | build-engineering | Gradle, Maven, Bazel, build optimization, caching strategies |
| **Network Design** | network-engineering | Load balancing, SDN, VPN, network security, service mesh networking |
| **IT Operations** | general-it-engineering | ITIL/ITSM, change management, incident management, service desk |
| **Architecture Patterns** | infrastructure-architecture | System design, ADRs, multi-region, DR, capacity planning |
| **Documentation** | documentation-as-code | Technical writing, API docs, OpenAPI, diagrams, automation |
| **Observability** | observability-engineering | Distributed tracing, OpenTelemetry, APM, log aggregation |
| **Database Administration** | database-engineering | PostgreSQL/MySQL, query optimization, replication, backups |
| **API Design** | api-engineering | REST, GraphQL, API gateways, rate limiting, versioning |

**Why this approach?**
- ✅ Aligns with modern engineering org structures (Platform team, SRE team, Security team, etc.)
- ✅ Each skill goes deep on its domain (11 resource files each)
- ✅ Skills integrate and reference each other
- ✅ Easier to maintain and update
- ✅ Pick only what you need

**"DevSecOps" is security-focused**, not general DevOps - it covers SAST/DAST, container scanning, secrets management, and compliance automation.

### Complete Infrastructure Coverage

**All 14 infrastructure disciplines are now covered:**
- ✅ Platform operations (IaC, Kubernetes, GitOps)
- ✅ CI/CD and release management
- ✅ Cloud infrastructure (AWS, Azure, GCP)
- ✅ Security automation and compliance
- ✅ Site reliability and monitoring
- ✅ Systems administration (Linux & Windows)
- ✅ Network engineering and architecture
- ✅ Build systems and optimization
- ✅ IT operations management
- ✅ Infrastructure architecture patterns
- ✅ Documentation as code workflows
- ✅ Observability and distributed tracing
- ✅ Database engineering
- ✅ API design and engineering

**This provides comprehensive coverage** for modern infrastructure engineering teams - from platform engineering to database administration, from security to observability.

**Want to contribute?** Open an issue or PR to expand existing skills with additional resources and patterns!

---

## Key Concepts

### Hooks + skill-rules.json = Auto-Activation

**The system:**
1. **skill-activation-prompt hook** runs on every user prompt
2. Checks **skill-rules.json** for trigger patterns
3. Suggests relevant skills automatically
4. Skills load only when needed

**This solves the #1 problem** with Claude Code skills: they don't activate on their own.

### Progressive Disclosure (500-Line Rule)

**Problem:** Large skills hit context limits

**Solution:** Modular structure
- Main SKILL.md <500 lines (overview + navigation)
- Resource files <500 lines each (deep dives)
- Claude loads incrementally as needed

**Example:** backend-dev-guidelines has 12 resource files covering routing, controllers, services, repositories, testing, etc.

### Dev Docs Pattern

**Problem:** Context resets lose project context

**Solution:** Three-file structure
- `[task]-plan.md` - Strategic plan
- `[task]-context.md` - Key decisions and files
- `[task]-tasks.md` - Checklist format

**Works with:** `/dev-docs` slash command to generate these automatically

---

## ⚠️ Important: What Won't Work As-Is

### settings.json
The included `settings.json` is an **example only**:
- Stop hooks reference specific monorepo structure
- Service names (blog-api, etc.) are examples
- MCP servers may not exist in your setup

**To use it:**
1. Extract ONLY UserPromptSubmit and PostToolUse hooks
2. Customize or skip Stop hooks
3. Update MCP server list for your setup

### Blog Domain Examples
Skills use generic blog examples (Post/Comment/User):
- These are **teaching examples**, not requirements
- Patterns work for any domain (e-commerce, SaaS, etc.)
- Adapt the patterns to your business logic

### Hook Directory Structures
Some hooks expect specific structures:
- `tsc-check.sh` expects service directories
- Customize based on YOUR project layout

---

## Integration Workflow

**Recommended approach:**

### Phase 1: Skill Activation (15 min)
1. Copy skill-activation-prompt hook
2. Copy post-tool-use-tracker hook
3. Update settings.json
4. Install hook dependencies

### Phase 2: Add First Skill (10 min)
1. Pick ONE relevant skill
2. Copy skill directory
3. Create/update skill-rules.json
4. Customize path patterns

### Phase 3: Test & Iterate (5 min)
1. Edit a file - skill should activate
2. Ask a question - skill should be suggested
3. Add more skills as needed

### Phase 4: Optional Enhancements
- Add agents you find useful
- Add slash commands
- Customize Stop hooks (advanced)

---

## Getting Help

### For Users
**Issues with integration?**
1. Check [CLAUDE_INTEGRATION_GUIDE.md](CLAUDE_INTEGRATION_GUIDE.md)
2. Ask Claude: "Why isn't [skill] activating?"
3. Open an issue with your project structure

### For Claude Code
When helping users integrate:
1. **Read CLAUDE_INTEGRATION_GUIDE.md FIRST**
2. Ask about their project structure
3. Customize, don't blindly copy
4. Verify after integration

---

## What This Solves

### Before This Infrastructure

❌ Skills don't activate automatically
❌ Have to remember which skill to use
❌ Large skills hit context limits
❌ Context resets lose project knowledge
❌ No consistency across development
❌ Manual agent invocation every time

### After This Infrastructure

✅ Skills suggest themselves based on context
✅ Hooks trigger skills at the right time
✅ Modular skills stay under context limits
✅ Dev docs preserve knowledge across resets
✅ Consistent patterns via guardrails
✅ Agents streamline complex tasks

---

## Community

**Found this useful?**

- ⭐ Star this repo (and the [original by diet103](https://github.com/diet103/claude-code-infrastructure-showcase))
- 🐛 Report issues or suggest improvements
- 💬 Share your own skills/hooks/agents
- 📝 Contribute examples from your domain

**Background:**
The foundational infrastructure patterns were created by **[diet103](https://github.com/diet103)** and detailed in their Reddit post ["Claude Code is a Beast – Tips from 6 Months of Hardcore Use"](https://www.reddit.com/r/ClaudeAI/comments/1oivjvm/claude_code_is_a_beast_tips_from_6_months_of/). After hundreds of requests from the community, diet103 created the [original showcase](https://github.com/diet103/claude-code-infrastructure-showcase) to share these production-tested patterns.

**This fork** extends the original foundation with comprehensive infrastructure engineering coverage (14 additional skills covering platform, security, SRE, cloud, systems, network, build, architecture, observability, database, and API engineering) while preserving all of diet103's breakthrough innovations.


---

## License

MIT License - Use freely in your projects, commercial or personal.

---

## Quick Links

- 📖 [Claude Integration Guide](CLAUDE_INTEGRATION_GUIDE.md) - For AI-assisted setup
- 🎨 [Skills Documentation](.claude/skills/README.md)
- 🪝 [Hooks Setup](.claude/hooks/README.md)
- 🤖 [Agents Guide](.claude/agents/README.md)
- 📝 [Dev Docs Pattern](dev/README.md)

**Start here:** Copy the two essential hooks, add one skill, and see the auto-activation magic happen.
