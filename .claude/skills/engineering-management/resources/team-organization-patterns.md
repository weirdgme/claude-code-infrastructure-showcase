# Team Organization Patterns

**Modern infrastructure and platform engineering team structures for managers.**

---

## The Platform Engineering Model

**Core concept:** Treat infrastructure as a product, with internal developers as customers.

```
Organization Structure:

Product Teams (Stream-Aligned)
├── Build customer-facing features
├── Own end-to-end delivery
├── Self-service via platform
└── Fast, autonomous delivery

Platform Team (Enabling)
├── Build internal developer platform
├── IaC, K8s, CI/CD, observability
├── Enable product teams
└── Focus: Developer experience

SRE Team (Enabling)
├── Reliability, monitoring, incidents
├── SLO definition and tracking
├── Production support and on-call
└── Focus: System reliability

Security Team (Enabling)
├── Security automation and tooling
├── Compliance and auditing
├── Threat modeling and response
└── Focus: Security guardrails

Shared Services
├── Data Platform
├── ML Platform
├── Internal Tools
└── Focus: Specialized capabilities
```

---

## Team Types (Team Topologies Framework)

### 1. Stream-Aligned Teams
**Purpose:** Build and deliver features to customers

**Characteristics:**
- End-to-end ownership of services/features
- Autonomous decision-making
- Cross-functional (engineering, product, design)
- Long-lived (stable teams)

**Examples:**
- Product feature teams
- Service teams (payments, notifications, etc.)
- Customer-facing application teams

**Manager considerations:**
- Keep teams small (5-8 people)
- Minimize dependencies on other teams
- Provide clear product goals and metrics

### 2. Platform Teams
**Purpose:** Build internal products that enable stream-aligned teams

**Characteristics:**
- Treat internal developers as customers
- Build self-service capabilities
- Focus on developer experience
- Maintain platform services

**Examples:**
- Developer platform team (CI/CD, IaC, K8s)
- Data platform team (pipelines, warehouses, analytics)
- ML platform team (training, deployment, serving)

**Manager considerations:**
- Hire for product thinking + technical depth
- Measure success by adoption and developer satisfaction
- Balance new features vs. reliability
- Avoid "build everything" - curate, don't dictate

### 3. Enabling Teams
**Purpose:** Provide expertise and help other teams overcome obstacles

**Characteristics:**
- Temporary engagement with teams
- Transfer knowledge and skills
- Don't own long-term delivery
- Specialists in specific areas

**Examples:**
- SRE team (reliability engineering)
- Security team (security best practices)
- Data engineering team (data architecture)
- Cloud engineering team (cloud migration)

**Manager considerations:**
- Hire specialists with teaching ability
- Time-box engagements (3-6 months)
- Measure success by team capability improvement
- Avoid becoming a bottleneck

### 4. Complicated Subsystem Teams
**Purpose:** Build and maintain complex subsystems requiring specialized knowledge

**Characteristics:**
- Deep technical expertise
- Narrow focus area
- Long-lived teams
- Provide capability to other teams

**Examples:**
- Database engineering (complex query optimization)
- Video encoding team (specialized codecs)
- Security cryptography team (PKI, encryption)
- Payment processing team (PCI compliance)

**Manager considerations:**
- Hire deep specialists
- Keep team small (3-5 people)
- Provide clear interfaces for other teams
- Balance specialization vs. organizational knowledge silos

---

## Common Team Structures

### Small Company (< 50 engineers)

```
Flat Structure:
├── Engineering Manager
    ├── Full-stack product engineers (6-8)
    ├── 1-2 platform/infra engineers
    └── Shared on-call rotation

Pros: Simple, fast, everyone does everything
Cons: No specialists, scaling challenges
```

### Mid-Size Company (50-200 engineers)

```
Functional Teams:
├── VP Engineering
    ├── Product Engineering (3-4 teams)
    ├── Platform Engineering (1 team)
    ├── SRE (1 team)
    └── Security (1-2 engineers embedded)

Pros: Specialization emerging, clear ownership
Cons: Potential silos, coordination overhead
```

### Large Company (200+ engineers)

```
Hybrid Platform Model:
├── VP Engineering
    ├── Product Org (multiple VPs)
    │   ├── Payments teams
    │   ├── User experience teams
    │   └── Growth teams
    ├── Platform Org (VP Platform)
    │   ├── Developer Experience team
    │   ├── Cloud Infrastructure team
    │   ├── Data Platform team
    │   └── ML Platform team
    ├── SRE Org (Director SRE)
    │   ├── Production SRE team
    │   ├── Observability team
    │   └── Incident Management team
    └── Security Org (CISO)
        ├── AppSec team
        ├── Infrastructure Security team
        └── Compliance team

Pros: Clear specialization, scalable
Cons: Coordination complexity, potential ivory towers
```

---

## Platform Team Structure

**Typical platform team composition:**

```
Platform Engineering Team (8-12 people):
├── Team Lead / Staff Engineer (1)
│   └── Technical direction, architecture
├── Senior Engineers (3-4)
│   ├── IaC and cloud infrastructure
│   ├── Kubernetes and container orchestration
│   ├── CI/CD pipelines and automation
│   └── Observability and monitoring
├── Mid-level Engineers (3-4)
│   └── Feature development, maintenance
└── Product Manager (1, optional)
    └── Roadmap, prioritization, developer experience

Responsibilities:
├── Internal developer platform (IDP)
├── Self-service infrastructure provisioning
├── CI/CD pipeline templates and tools
├── Kubernetes clusters and management
├── Observability stack (logs, metrics, traces)
├── Infrastructure as Code (Terraform, Pulumi)
└── Developer documentation and onboarding
```

---

## SRE Team Structure

**Typical SRE team composition:**

```
SRE Team (6-10 people):
├── SRE Manager (1)
│   └── On-call management, incident process
├── Senior SREs (2-3)
│   ├── SLO definition and tracking
│   ├── Incident response and postmortems
│   ├── Capacity planning
│   └── Reliability architecture
├── SREs (3-4)
│   ├── Monitoring and alerting
│   ├── Automation and toil reduction
│   ├── Production support
│   └── On-call rotation
└── Observability Engineer (1, optional)
    └── Tracing, metrics, logs infrastructure

Responsibilities:
├── Define and track SLOs
├── Incident response and management
├── Production on-call rotation
├── Capacity planning and scaling
├── Reliability improvements
├── Monitoring, alerting, observability
└── Postmortems and learning
```

---

## Security Team Structure

**Typical security team composition:**

```
Security Engineering Team (6-8 people):
├── Security Manager / CISO (1)
│   └── Strategy, compliance, risk management
├── AppSec Engineers (2-3)
│   ├── SAST/DAST scanning
│   ├── Vulnerability management
│   ├── Secure code review
│   └── Security testing
├── Infrastructure Security Engineers (2-3)
│   ├── Cloud security posture (CSPM)
│   ├── Container security
│   ├── Secrets management
│   └── Network security
└── Compliance Engineer (1)
    └── FedRAMP, SOC2, ISO 27001, HIPAA

Responsibilities:
├── Security scanning and testing
├── Vulnerability management
├── Compliance automation
├── Security architecture review
├── Incident response (security)
├── Threat modeling
└── Security awareness training
```

---

## Reporting Structures

### Option 1: Centralized Platform Org

```
CTO
├── VP Product Engineering
│   └── Product teams
└── VP Platform Engineering
    ├── Platform team
    ├── SRE team
    ├── Security team
    └── Data team

Pros: Clear platform ownership, shared roadmap
Cons: Potential disconnect from product needs
```

### Option 2: Embedded Model

```
CTO
├── VP Engineering (Product A)
│   ├── Product teams
│   └── Embedded platform engineers (2-3)
├── VP Engineering (Product B)
│   ├── Product teams
│   └── Embedded platform engineers (2-3)
└── Platform CoE (Center of Excellence)
    └── Platform standards, tooling, best practices

Pros: Platform engineers close to product needs
Cons: Fragmentation, inconsistent standards
```

### Option 3: Hybrid (Recommended)

```
CTO
├── VP Product Engineering
│   └── Product teams (consume platform)
├── VP Platform Engineering
│   ├── Platform team (builds platform)
│   └── SRE team (reliability)
└── CISO
    └── Security team (enables secure development)

+ Embedded Platform Liaisons in product orgs

Pros: Balance of centralization and embedded support
Cons: Requires strong communication and coordination
```

---

## Anti-Patterns to Avoid

### 1. The Ivory Tower Platform Team
**Problem:** Platform team builds what they think is cool, not what product teams need

**Symptoms:**
- Low adoption of platform tools
- Product teams build workarounds
- Platform team frustrated by "resistance"

**Fix:**
- Treat platform as a product
- Regular user research with product teams
- Measure adoption and satisfaction

### 2. The Ops Ticket Queue
**Problem:** Platform/SRE team becomes a ticket queue for product teams

**Symptoms:**
- Long wait times for infrastructure changes
- Platform team constantly reacting
- No time for strategic work

**Fix:**
- Build self-service capabilities
- Automate common requests
- Set clear boundaries on support

### 3. The "You Build It, You Run It" Extreme
**Problem:** Every team owns their infrastructure with no centralization

**Symptoms:**
- Inconsistent tooling and practices
- Duplicated effort across teams
- Security and compliance issues

**Fix:**
- Provide platform as a paved path
- Make it easy to do the right thing
- Balance autonomy with guardrails

### 4. The Matrix Organization
**Problem:** Engineers report to multiple managers (functional + product)

**Symptoms:**
- Conflicting priorities
- Unclear accountability
- Engineer confusion and stress

**Fix:**
- Clear single reporting line
- Dotted-line relationships documented
- Explicit priority-setting process

---

## Team Sizing Guidelines

**General rules:**
- **Small teams:** 5-8 people (optimal)
- **Manager span:** 6-10 direct reports (IC managers)
- **Manager of managers:** 4-7 managers (senior managers)
- **Cross-functional teams:** Include product, design, engineering

**Platform team sizing:**
- 1 platform engineer per 20-30 product engineers (rough ratio)
- Adjust based on complexity and maturity

**SRE team sizing:**
- 1 SRE per 50-100 engineers (mature organizations)
- 1 SRE per 20-40 engineers (growing organizations)
- Higher ratio for complex distributed systems

**Security team sizing:**
- 1 security engineer per 50-75 engineers
- Scale up for regulated industries (finance, healthcare)

---

## Organizational Maturity Levels

### Level 1: Ad Hoc (< 20 engineers)
- Everyone does everything
- No formal platform team
- Manual processes

**Focus:** Hire generalists, establish basic practices

### Level 2: Emerging (20-50 engineers)
- First platform engineers hired
- Basic automation in place
- Some team specialization

**Focus:** Build foundational platform capabilities

### Level 3: Structured (50-200 engineers)
- Dedicated platform team
- SRE function established
- Clear team boundaries

**Focus:** Scale platform, improve developer experience

### Level 4: Optimizing (200+ engineers)
- Multiple specialized teams
- Platform treated as product
- Self-service infrastructure

**Focus:** Continuous improvement, innovation

---

## Communication and Collaboration

**Cross-team coordination mechanisms:**

1. **Platform Council** (weekly/bi-weekly)
   - Platform team + representatives from product teams
   - Discuss priorities, blockers, feedback
   - Make decisions on platform roadmap

2. **Architecture Review** (as needed)
   - Proposed design presented
   - Cross-team feedback
   - Identify dependencies and risks

3. **Incident Reviews** (after major incidents)
   - Blameless postmortem
   - Cross-team participation
   - Action items for improvement

4. **All-hands** (monthly)
   - Share progress and wins
   - Celebrate team achievements
   - Build cross-team awareness

---

## Key Takeaways for Managers

1. **Choose the right team structure** for your org size and maturity
2. **Treat platform as a product** with internal customers
3. **Enable, don't control** - provide guardrails, not gates
4. **Keep teams small** (5-8 people) for maximum effectiveness
5. **Minimize dependencies** between teams
6. **Measure adoption and satisfaction**, not just output
7. **Avoid ivory towers** - stay close to customer needs
8. **Balance centralization and autonomy**
9. **Clear reporting lines** - no matrix management
10. **Invest in communication** across teams

Your team structure should enable fast, autonomous delivery while maintaining quality, security, and reliability.
