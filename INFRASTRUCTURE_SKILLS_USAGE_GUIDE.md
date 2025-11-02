# Infrastructure Skills - Complete Usage Guide

**Quick Reference:** How to use all 15 infrastructure skills in the Claude Code Infrastructure Showcase.

---

## 🎯 How Skills Auto-Activate

Skills activate automatically based on:
1. **Files you edit** (*.tf, *.yaml, *.sh, etc.)
2. **Keywords in your prompts** ("kubernetes", "terraform", "SLO", etc.)
3. **File content patterns** (terraform resources, kind: Deployment, etc.)

When a skill activates, Claude will mention it and provide relevant guidance from that domain.

---

## 📚 Skill-by-Skill Usage Guide

### 1. Platform Engineering (`platform-engineering`)

**What it covers:**
- Infrastructure as Code (Terraform, Pulumi, CloudFormation)
- Kubernetes and container orchestration
- GitOps (ArgoCD, Flux)
- Service mesh (Istio, Linkerd)
- Multi-tenancy and resource management
- Developer platforms (Backstage)

**Activates when you:**
- Edit Terraform files: `infrastructure/main.tf`
- Edit Kubernetes manifests: `k8s/deployment.yaml`
- Mention: terraform, kubernetes, IaC, helm, gitops, argocd

**Example usage:**
```bash
# Scenario 1: Creating infrastructure
"Help me create a Terraform module for an EKS cluster"

# Scenario 2: Kubernetes deployment
"Review my Kubernetes deployment for best practices"

# Scenario 3: GitOps setup
"How do I implement GitOps with ArgoCD?"
```

**Key resource files:**
- `infrastructure-as-code.md` - Terraform/Pulumi patterns
- `container-orchestration.md` - Kubernetes deep dive
- `gitops-automation.md` - ArgoCD/Flux implementation

---

### 2. DevSecOps (`devsecops`)

**What it covers:**
- Security scanning (SAST, DAST, SCA)
- Container security and image scanning
- Secrets management (Vault, Sealed Secrets)
- Policy enforcement (OPA, Kyverno)
- Supply chain security
- Zero-trust architecture

**Activates when you:**
- Edit security files: `.trivyignore`, `security/policies/*.rego`
- Mention: security, vulnerability, trivy, vault, OPA, secrets

**Example usage:**
```bash
# Scenario 1: Image scanning
"Set up Trivy scanning in my CI/CD pipeline"

# Scenario 2: Secrets management
"Implement Vault for managing database credentials"

# Scenario 3: Policy enforcement
"Create OPA policies to enforce security standards"
```

**Key resource files:**
- `security-scanning.md` - SAST/DAST/SCA tools
- `secrets-management.md` - Vault, Sealed Secrets patterns
- `policy-enforcement.md` - OPA/Kyverno implementation

---

### 3. Site Reliability Engineering (`sre`)

**What it covers:**
- SLO/SLI/SLA definitions
- Error budgets and reliability tracking
- Incident management and on-call
- Observability stack (Prometheus, Grafana, Jaeger)
- Chaos engineering
- Capacity planning and disaster recovery

**Activates when you:**
- Edit monitoring files: `monitoring/prometheus/*.yaml`
- Mention: SLO, SLI, incident, prometheus, grafana, observability

**Example usage:**
```bash
# Scenario 1: Define SLOs
"Help me define SLOs for my API service (99.9% availability)"

# Scenario 2: Set up alerting
"Create Prometheus alert rules for high error rates"

# Scenario 3: Incident response
"Guide me through debugging a production incident"
```

**Key resource files:**
- `slo-sli-sla.md` - Service level objectives
- `incident-management.md` - Incident response procedures
- `observability-stack.md` - Prometheus + Grafana setup

---

### 4. Release Engineering (`release-engineering`)

**What it covers:**
- CI/CD pipeline design
- Deployment strategies (blue-green, canary, rolling)
- Artifact management and versioning
- Progressive delivery and feature flags
- Release automation
- Rollback strategies

**Activates when you:**
- Edit CI/CD files: `.github/workflows/*.yml`, `Jenkinsfile`
- Mention: CI/CD, pipeline, deployment, canary, blue-green

**Example usage:**
```bash
# Scenario 1: Pipeline setup
"Set up a GitHub Actions pipeline with automated testing"

# Scenario 2: Canary deployment
"Implement a canary deployment strategy"

# Scenario 3: Rollback procedure
"Create an automated rollback procedure for failed deployments"
```

**Key resource files:**
- `ci-cd-pipelines.md` - Pipeline design patterns
- `deployment-strategies.md` - Blue-green, canary, rolling
- `progressive-delivery.md` - Feature flags, gradual rollouts

---

### 5. Cloud Engineering (`cloud-engineering`)

**What it covers:**
- AWS/Azure/GCP services and patterns
- Multi-cloud strategies
- Serverless architecture
- Cloud cost optimization (FinOps)
- Cloud networking and security
- Migration strategies

**Activates when you:**
- Edit cloud files: `serverless.yml`, CloudFormation templates
- Mention: AWS, Azure, GCP, lambda, serverless, cloud migration

**Example usage:**
```bash
# Scenario 1: Serverless deployment
"Deploy a Lambda function triggered by SQS"

# Scenario 2: Cloud migration
"Plan migration of on-prem apps to AWS"

# Scenario 3: Cost optimization
"Optimize our AWS costs using reserved instances"
```

**Key resource files:**
- `aws-patterns.md` - Comprehensive AWS services
- `azure-patterns.md` - Azure services and patterns
- `cloud-cost-optimization.md` - FinOps practices

---

### 6. Systems Engineering (`systems-engineering`)

**What it covers:**
- Linux and Windows Server administration
- Networking fundamentals
- Performance tuning (both platforms)
- Configuration management (Ansible, Chef, Puppet, DSC)
- System monitoring
- Shell scripting and automation (bash, PowerShell)
- Active Directory and Group Policy
- Windows services and IIS

**Activates when you:**
- Edit system files: `playbooks/*.yml`, `*.sh`, `*.ps1` scripts
- Mention: linux, windows, ansible, bash, powershell, systemd, active directory, performance tuning

**Example usage:**
```bash
# Scenario 1: Ansible automation
"Write an Ansible playbook to configure web servers"

# Scenario 2: Linux performance tuning
"Tune Linux kernel parameters for database workload"

# Scenario 3: Shell scripting
"Create a bash script with proper error handling"

# Scenario 4: Windows administration
"Configure Active Directory users and groups with PowerShell"

# Scenario 5: PowerShell automation
"Create a PowerShell script to monitor Windows services"

# Scenario 6: Cross-platform
"Set up configuration management for both Linux and Windows servers"
```

**Key resource files:**
- `linux-administration.md` - systemd, packages, users
- `windows-administration.md` - Active Directory, GPO, IIS, services
- `powershell-scripting.md` - PowerShell automation and DSC
- `configuration-management.md` - Ansible/Chef/Puppet/DSC
- `performance-tuning.md` - CPU, memory, disk I/O optimization

---

### 7. Network Engineering (`network-engineering`)

**What it covers:**
- Network architecture and design
- TCP/IP protocols and routing
- Load balancing (HAProxy, nginx)
- Network security and firewalls
- DNS management
- Software-defined networking (SDN)

**Activates when you:**
- Edit network configs: `haproxy.cfg`, firewall rules
- Mention: network, load balancing, DNS, firewall, routing

**Example usage:**
```bash
# Scenario 1: Load balancer setup
"Configure HAProxy for high-availability load balancing"

# Scenario 2: Network troubleshooting
"Debug network connectivity issues between services"

# Scenario 3: DNS configuration
"Set up DNS with Route 53 for multi-region deployment"
```

**Key resource files:**
- `load-balancing.md` - L4/L7 load balancing
- `network-security.md` - Firewalls, security groups
- `network-troubleshooting.md` - Debugging tools

---

### 8. Build Engineering (`build-engineering`)

**What it covers:**
- Build systems (Make, Gradle, Maven, Bazel)
- Compilation optimization
- Dependency management
- Artifact repositories
- Reproducible builds
- Monorepo build strategies

**Activates when you:**
- Edit build files: `Makefile`, `build.gradle`, `pom.xml`
- Mention: build, gradle, maven, compilation, monorepo

**Example usage:**
```bash
# Scenario 1: Build optimization
"Optimize Gradle build performance with caching"

# Scenario 2: Reproducible builds
"Implement hermetic builds for our project"

# Scenario 3: Monorepo setup
"Configure Nx for our TypeScript monorepo"
```

**Key resource files:**
- `build-systems.md` - Make, Gradle, Maven, Bazel
- `build-caching.md` - Optimization strategies
- `monorepo-builds.md` - Nx, Turborepo patterns

---

### 9. General IT Engineering (`general-it-engineering`)

**What it covers:**
- ITIL framework and ITSM
- Service management and incident management
- Change management processes
- Asset management and CMDB
- Business continuity and disaster recovery
- IT governance and compliance

**Activates when you:**
- Mention: ITIL, ITSM, service desk, change management, incident management

**Example usage:**
```bash
# Scenario 1: ITIL implementation
"Help me implement ITIL change management process"

# Scenario 2: Service desk
"Design a service desk ticketing workflow"

# Scenario 3: IT governance
"Create IT governance policies for compliance"
```

**Key resource files:**
- `itil-framework.md` - ITIL v4 processes
- `service-management.md` - ITSM best practices
- `change-management.md` - Change control procedures

---

### 10. Infrastructure Architecture (`infrastructure-architecture`)

**What it covers:**
- Architecture Decision Records (ADRs)
- Multi-region design patterns
- Disaster recovery planning
- Capacity planning and forecasting
- System design principles
- Security architecture patterns
- Workload classification (CUI, Secret, TS/SCI, ITAR)
- Cleared environment architectures

**Activates when you:**
- Mention: ADR, architecture, multi-region, DR, capacity planning, cleared environments, workload classification

**Example usage:**
```bash
# Scenario 1: ADR creation
"Help me create an ADR for switching from REST to GraphQL"

# Scenario 2: Multi-region design
"Design a multi-region architecture with active-active failover"

# Scenario 3: Cleared environments
"Design architecture for TS/SCI classified workloads in AWS GovCloud"
```

**Key resource files:**
- `architecture-decision-records.md` - ADR templates and examples
- `multi-region-patterns.md` - Geographic distribution patterns
- `cleared-environment-architecture.md` - Classified workload patterns
- `workload-classification.md` - CUI, Secret, TS/SCI, ITAR guidance

---

### 11. Documentation as Code (`documentation-as-code`)

**What it covers:**
- Technical writing best practices
- Markdown standards and conventions
- API documentation (OpenAPI/Swagger)
- Diagram generation (PlantUML, Mermaid)
- Documentation sites (Docusaurus, MkDocs)
- Documentation automation and CI/CD
- README engineering and templates

**Activates when you:**
- Edit: `README.md`, `*.md` files, OpenAPI specs
- Mention: documentation, OpenAPI, Swagger, diagrams, technical writing

**Example usage:**
```bash
# Scenario 1: API documentation
"Generate OpenAPI spec from my REST API"

# Scenario 2: Documentation site
"Set up Docusaurus for our project documentation"

# Scenario 3: Diagrams
"Create architecture diagrams with PlantUML"
```

**Key resource files:**
- `api-documentation.md` - OpenAPI/Swagger patterns
- `diagram-generation.md` - PlantUML, Mermaid, C4 models
- `documentation-automation.md` - CI/CD for docs

---

### 12. Observability Engineering (`observability-engineering`)

**What it covers:**
- Distributed tracing patterns
- OpenTelemetry implementation
- APM tools (DataDog, New Relic, Dynatrace)
- Log aggregation strategies
- Correlation and context propagation
- Observability cost optimization
- Service mesh observability

**Activates when you:**
- Mention: tracing, OpenTelemetry, APM, distributed tracing, observability

**Example usage:**
```bash
# Scenario 1: Distributed tracing
"Implement OpenTelemetry distributed tracing"

# Scenario 2: APM setup
"Set up DataDog APM for microservices"

# Scenario 3: Log correlation
"Implement trace ID correlation across services"
```

**Key resource files:**
- `distributed-tracing.md` - OpenTelemetry patterns
- `apm-tools.md` - DataDog, New Relic, Dynatrace
- `log-aggregation.md` - ELK, Loki, CloudWatch Logs

---

### 13. Database Engineering (`database-engineering`)

**What it covers:**
- PostgreSQL and MySQL administration
- Query optimization and indexing
- Database replication strategies
- Backup and recovery procedures
- Connection pooling and scaling
- Database performance tuning

**Activates when you:**
- Edit: SQL files, database migrations
- Mention: PostgreSQL, MySQL, database, query optimization, replication

**Example usage:**
```bash
# Scenario 1: Query optimization
"Optimize this slow PostgreSQL query"

# Scenario 2: Replication setup
"Set up PostgreSQL streaming replication"

# Scenario 3: Backup strategy
"Design a backup and recovery strategy for production databases"
```

**Key resource files:**
- `postgresql-fundamentals.md` - PostgreSQL best practices
- `query-optimization.md` - Index strategies, EXPLAIN plans
- `database-replication.md` - Streaming replication, failover

---

### 14. API Engineering (`api-engineering`)

**What it covers:**
- REST API design patterns
- GraphQL schema design
- API versioning strategies
- Rate limiting and throttling
- API gateways (Kong, Tyk, AWS API Gateway)
- API security and authentication

**Activates when you:**
- Mention: REST API, GraphQL, API gateway, rate limiting, API versioning

**Example usage:**
```bash
# Scenario 1: REST API design
"Design a RESTful API for user management"

# Scenario 2: API gateway
"Set up Kong API gateway with rate limiting"

# Scenario 3: GraphQL schema
"Create a GraphQL schema for our data model"
```

**Key resource files:**
- `rest-api-design.md` - REST best practices
- `graphql-patterns.md` - Schema design, resolvers
- `api-versioning.md` - Versioning strategies
- `rate-limiting.md` - Rate limiting patterns

---

### 15. Cybersecurity (`cybersecurity`)

**What it covers:**
- Threat modeling (STRIDE, PASTA, DREAD)
- Security operations (SOC, SIEM, SOAR, EDR/XDR)
- Incident response and forensics
- Application security (OWASP, SAST, DAST)
- Penetration testing methodologies
- Network security and Zero Trust
- IAM and cryptography

**Activates when you:**
- Mention: threat modeling, SIEM, SOC, incident response, pen testing, OWASP, Zero Trust

**Example usage:**
```bash
# Scenario 1: Threat modeling
"Perform STRIDE threat modeling for our API"

# Scenario 2: Incident response
"Guide me through investigating a security breach"

# Scenario 3: Application security
"Review application for OWASP Top 10 vulnerabilities"
```

**Key resource files:**
- `security-architecture.md` - Comprehensive cybersecurity coverage

---

## 🎭 Multi-Skill Scenarios

Some tasks activate **multiple skills** simultaneously. Here's how they work together:

### Scenario 1: Kubernetes on AWS
```
Task: "Deploy Kubernetes cluster on AWS with Terraform"

Activates:
✅ platform-engineering (Kubernetes + Terraform)
✅ cloud-engineering (AWS resources)

You get: Combined expertise from both perspectives
```

### Scenario 2: Secure CI/CD Pipeline
```
Task: "Add security scanning to GitHub Actions"

Activates:
✅ devsecops (security scanning)
✅ release-engineering (CI/CD pipeline)

You get: Security best practices + pipeline design
```

### Scenario 3: SRE-Driven Infrastructure
```
Task: "Create infrastructure with SLO-based autoscaling"

Activates:
✅ platform-engineering (infrastructure)
✅ sre (SLO/monitoring)

You get: Infrastructure patterns + reliability metrics
```

---

## 🚀 Quick Start Examples

### Example 1: Platform Engineering

```bash
# Create a new Terraform file
vim infrastructure/vpc.tf

# Ask Claude
"Help me create a VPC with public and private subnets"

# Result: platform-engineering skill activates automatically
# Claude provides Terraform best practices and VPC patterns
```

### Example 2: DevSecOps

```bash
# Create security policy
vim security/policies/pod-security.rego

# Ask Claude
"Write an OPA policy to enforce non-root containers"

# Result: devsecops skill activates
# Claude provides OPA policy patterns and security best practices
```

### Example 3: SRE

```bash
# Edit Prometheus alerts
vim monitoring/alerts.yaml

# Ask Claude
"Create alert rules for API latency > 500ms"

# Result: sre skill activates
# Claude provides Prometheus alerting patterns and SLO guidance
```

---

## 📖 How to Read Resource Files

Each skill has a main `SKILL.md` file (overview + navigation) and 10-11 detailed resource files.

**Navigation Pattern:**

1. **Start with SKILL.md**
   - Overview of the domain
   - Quick start checklist
   - Common patterns
   - Links to resource files

2. **Dive into specific resources**
   - Each resource file covers one topic deeply
   - Real-world code examples
   - Best practices and anti-patterns
   - Cross-references to related topics

**Example: Learning Kubernetes**

```
1. Read: platform-engineering/SKILL.md (overview)
2. Check: Quick Start Checklist
3. Review: Common Patterns section
4. Deep dive: container-orchestration.md (full Kubernetes guide)
5. Related: gitops-automation.md, service-mesh.md
```

---

## 🎯 Using Agents

The infrastructure showcase includes specialized agents for complex tasks:

### infrastructure-architect
```bash
# Use for: Architecture design and review
"@infrastructure-architect Review my multi-region AWS architecture"
```

### kubernetes-specialist
```bash
# Use for: Kubernetes troubleshooting
"@kubernetes-specialist My pod is in CrashLoopBackOff, help debug"
```

### iac-code-generator
```bash
# Use for: Generate infrastructure code
"@iac-code-generator Create Terraform for RDS with read replicas"
```

### incident-responder
```bash
# Use for: Production incidents
"@incident-responder API is returning 500 errors, guide me through debugging"
```

---

## ⚡ Using Slash Commands

Quick actions for common infrastructure tasks:

### /infra-plan
```bash
# Create comprehensive infrastructure implementation plan
/infra-plan multi-region Kubernetes cluster with disaster recovery
```

### /security-review
```bash
# Run security review of infrastructure code
/security-review
```

---

## 🔧 Using Validation Hooks

Automatic validation before commits:

### terraform-validator.sh
- Runs `terraform fmt`, `terraform validate`, `tflint`
- Catches errors before commit

### k8s-manifest-validator.sh
- Validates Kubernetes YAML with `kubectl dry-run`
- Catches configuration errors

---

## 💡 Pro Tips

### Tip 1: Be Specific
```
❌ "Help with Kubernetes"
✅ "Create a Kubernetes Deployment with 3 replicas, health checks, and resource limits"
```

### Tip 2: Mention the Context
```
❌ "Set up monitoring"
✅ "Set up Prometheus monitoring for Node.js API with latency and error rate metrics"
```

### Tip 3: Combine Skills
```
"Deploy a serverless function on AWS with security scanning in the CI/CD pipeline"
→ Activates: cloud-engineering + devsecops + release-engineering
```

### Tip 4: Ask for Patterns
```
"Show me the best practice pattern for..."
- Blue-green deployment
- Multi-region failover
- Secrets rotation
```

### Tip 5: Request Reviews
```
"Review my [infrastructure/code] for:"
- Security issues
- Performance problems
- Best practices compliance
- Cost optimization opportunities
```

---

## 📚 Complete Skill Coverage

| Domain | Skill | Resources | Status |
|--------|-------|-----------|--------|
| Platform & IaC | platform-engineering | 11 | ✅ |
| Security | devsecops | 13 | ✅ |
| Cybersecurity | cybersecurity | 1 | ✅ |
| Reliability | sre | 11 | ✅ |
| Deployment | release-engineering | 10 | ✅ |
| Cloud | cloud-engineering | 13 | ✅ |
| Systems | systems-engineering | 12 | ✅ |
| Network | network-engineering | 10 | ✅ |
| Build | build-engineering | 10 | ✅ |
| IT Operations | general-it-engineering | 10 | ✅ |
| Architecture | infrastructure-architecture | 13 | ✅ |
| Documentation | documentation-as-code | 10 | ✅ |
| Observability | observability-engineering | 6 | ✅ |
| Database | database-engineering | 4 | ✅ |
| API Engineering | api-engineering | 4 | ✅ |

**Total: 15 complete skills, 130+ resource files, ~75,000+ lines of production-tested guidance**

---

## 🎓 Learning Paths

### Path 1: Platform Engineer
1. platform-engineering → Container orchestration
2. cloud-engineering → AWS/Azure/GCP patterns
3. devsecops → Security integration
4. sre → Reliability practices

### Path 2: DevSecOps Engineer
1. devsecops → Security scanning & policies
2. release-engineering → Secure CI/CD
3. platform-engineering → Infrastructure security
4. cloud-engineering → Cloud security

### Path 3: SRE
1. sre → SLO/SLI/monitoring
2. platform-engineering → Infrastructure reliability
3. cloud-engineering → Cloud reliability
4. network-engineering → Network reliability

### Path 4: Full-Stack Infrastructure
1. systems-engineering → Linux fundamentals
2. network-engineering → Networking basics
3. platform-engineering → Modern infrastructure
4. cloud-engineering → Cloud platforms
5. devsecops → Security
6. sre → Reliability
7. release-engineering → Deployment
8. build-engineering → Build systems

---

## 🆘 Troubleshooting

**Skill not activating?**
1. Check file pattern matches (*.tf, *.yaml, etc.)
2. Use relevant keywords in your prompt
3. Verify `skill-rules.json` has the skill configured

**Need more detail?**
1. Ask for specific resource file: "Show me the container-orchestration.md resource"
2. Request examples: "Give me a complete example of..."
3. Ask for patterns: "What's the recommended pattern for..."

**Multiple skills activating?**
- This is intentional! Some tasks span multiple domains
- You get comprehensive guidance from all relevant perspectives
- Example: Deploying to Kubernetes on AWS activates platform + cloud skills

---

## 📞 Getting Help

Each skill includes:
- ✅ Comprehensive resource files
- ✅ Real-world code examples
- ✅ Best practices and anti-patterns
- ✅ Troubleshooting guides
- ✅ Cross-references to related topics

**Structure:**
```
.claude/skills/
  skill-name/
    SKILL.md              # Start here
    resources/
      topic-1.md         # Deep dive
      topic-2.md
      ...
```

---

**Ready to use?** Just start working on infrastructure tasks and the relevant skills will activate automatically! 🚀
