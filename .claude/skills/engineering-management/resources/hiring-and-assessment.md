# Hiring and Skill Assessment

**Comprehensive guide to hiring infrastructure engineers and assessing technical skills.**

---

## The Hiring Funnel

```
Typical Conversion Rates:

100 Applicants
  ↓ (Resume Screen: 10-15% pass)
15 Phone Screens
  ↓ (Phone Screen: 50-60% pass)
8 On-Site Interviews
  ↓ (On-Site: 30-40% pass)
3 Offers Extended
  ↓ (Offer Acceptance: 60-70%)
2 Hires

Time to Hire: 4-8 weeks from first contact
```

**Key metrics:**
- Time to hire: 30-60 days (target)
- Offer acceptance rate: >60% (healthy)
- 90-day retention: >90% (good hiring)
- First-year retention: >85% (great hiring)

---

## Job Descriptions That Work

### Formula for Effective JDs

```
1. Hook (2-3 sentences)
   ├── What makes this role exciting?
   ├── What problem are you solving?
   └── Why should they care?

2. Role Overview (1 paragraph)
   ├── Team and context
   ├── Core responsibilities
   └── Impact and scope

3. What You'll Do (5-7 bullets)
   ├── Concrete day-to-day tasks
   ├── Projects they'll work on
   └── Technologies they'll use

4. What You Bring (Must-haves vs Nice-to-haves)
   ├── 3-5 must-have skills/experiences
   ├── 3-5 nice-to-have skills
   └── Avoid laundry list requirements

5. What We Offer
   ├── Compensation range (transparency wins)
   ├── Benefits and perks
   ├── Growth opportunities
   └── Team culture

6. How to Apply
   └── Clear next steps
```

### Example: Senior Platform Engineer JD

```markdown
## Senior Platform Engineer

**We're building the developer experience platform that will power the next generation of our products.** You'll work on Kubernetes, Terraform, and CI/CD automation that enables 50+ engineers to ship faster and safer.

### The Role
Join our 8-person Platform Engineering team to design and build our internal developer platform. You'll own critical infrastructure components, mentor mid-level engineers, and shape our technical direction as we scale from 50 to 150 engineers.

### What You'll Do
- Design and implement self-service infrastructure provisioning using Terraform and K8s operators
- Build CI/CD pipeline templates that balance speed, security, and developer experience
- Lead incident response for platform services and drive reliability improvements
- Mentor platform engineers and contribute to team growth
- Partner with product teams to understand needs and prioritize platform roadmap

### What You Bring
**Must Have:**
- 5+ years in infrastructure/platform engineering roles
- Deep experience with Kubernetes in production (operators, networking, security)
- Strong IaC skills (Terraform, Pulumi, or CloudFormation)
- Track record of building self-service developer tools
- Excellent communication and collaboration skills

**Nice to Have:**
- Experience with GitOps (ArgoCD, Flux)
- Contributions to open-source infrastructure projects
- Multi-cloud experience (AWS + Azure or GCP)
- SRE background or production on-call experience

### What We Offer
- Compensation: $160K-$200K base + equity
- Remote-first with quarterly team offsites
- Generous learning budget ($3K/year)
- Modern tech stack and greenfield projects
- Collaborative culture with high-trust autonomy

**To Apply:** Send resume + GitHub/LinkedIn to platform-hiring@company.com
```

**Why this works:**
- Clear scope and impact
- Specific technologies and projects
- Realistic requirements (not a wish list)
- Transparent compensation
- Authentic voice

---

## Resume Screening

### What to Look For

**Positive Signals:**
- **Relevant experience:** 3-5 years for senior roles in similar domains
- **Depth over breadth:** Deep expertise in core technologies (K8s, Terraform, AWS)
- **Impact statements:** "Reduced deploy time by 60%" vs "Worked on CI/CD"
- **Open source:** Contributions show passion and collaboration
- **Clear progression:** Growing scope and responsibility over time

**Red Flags:**
- **Job hopping:** <1 year at multiple companies (unless early career)
- **Vague descriptions:** "Worked on various projects" (no specifics)
- **Technology spam:** Lists 50 technologies (no depth)
- **No recent relevant experience:** Last platform role was 5 years ago
- **Over-qualification disconnect:** Principal engineer applying for mid-level role (flight risk)

### Screening Checklist

```
Technical Fit:
□ Core skills match (K8s, IaC, CI/CD, cloud)
□ Experience level appropriate (years + scope)
□ Relevant industry/domain experience

Culture Fit:
□ Collaboration signals (team projects, cross-functional work)
□ Communication skills (clear writing, presentations)
□ Growth mindset (learning, adapting, teaching)

Logistics:
□ Location/remote alignment
□ Compensation expectations reasonable
□ Available timeline matches
□ Authorization to work (if applicable)

Decision: Pass to phone screen? Yes / No
If yes, key areas to probe: _______________
```

---

## Phone Screen (30 minutes)

### Structure

```
1. Introduction (5 min)
   ├── Your background and team context
   ├── Role overview and what you're looking for
   └── Set agenda for conversation

2. Their Background (10 min)
   ├── "Walk me through your career, focusing on platform/infra work"
   ├── "Tell me about your most recent project in depth"
   ├── "What technologies are you most comfortable with?"
   └── Listen for: depth, passion, communication clarity

3. Technical Basics (10 min)
   ├── 2-3 screening questions (see below)
   ├── Not deep technical, just filter for basics
   └── Assess problem-solving approach

4. Logistics & Close (5 min)
   ├── Compensation expectations
   ├── Timeline and availability
   ├── Answer their questions
   └── Next steps
```

### Phone Screen Questions (Pick 2-3)

**For Platform Engineers:**
1. "Explain how you would design a CI/CD pipeline for a microservices application"
2. "You need to deploy a new service to Kubernetes - walk me through your approach"
3. "A developer reports their build is taking 20 minutes - how do you debug this?"

**For SREs:**
1. "Walk me through how you would respond to a high-latency alert"
2. "Explain the difference between SLI, SLO, and SLA with examples"
3. "How do you approach capacity planning for a growing service?"

**For Security Engineers:**
1. "How would you secure a Kubernetes cluster in a multi-tenant environment?"
2. "Walk me through how you'd implement secrets management for applications"
3. "Explain your approach to vulnerability management in CI/CD pipelines"

**For Cloud Engineers:**
1. "Design a multi-region active-active architecture on AWS"
2. "How do you approach cloud cost optimization without impacting performance?"
3. "Explain your strategy for managing infrastructure as code across multiple environments"

### Evaluation Rubric

```
Technical Depth: 1-5
├── 1: Surface-level knowledge only
├── 3: Solid fundamentals, can discuss trade-offs
└── 5: Deep expertise, insightful answers

Communication: 1-5
├── 1: Unclear, rambling, hard to follow
├── 3: Clear explanation, organized thoughts
└── 5: Exceptionally clear, adapts to audience

Problem-Solving: 1-5
├── 1: Jumps to solution without analysis
├── 3: Asks clarifying questions, systematic approach
└── 5: Thoughtful analysis, considers multiple approaches

Culture Fit: 1-5
├── 1: Red flags in collaboration/attitude
├── 3: Positive signals, team-oriented
└── 5: Strong alignment with values, passion evident

Minimum to pass: 12/20 (average of 3/5 on each dimension)
```

---

## Technical Interview (60-90 minutes)

### Deep Dive Interview Structure

**For Platform Engineering Roles:**

```
Part 1: System Design (40 min)
Problem: "Design a CI/CD system for 50 microservices with these requirements..."

Evaluation:
├── Clarifying questions (Does candidate understand the problem?)
├── High-level architecture (Can they design systems?)
├── Component deep-dive (Do they understand the details?)
├── Trade-offs (Can they justify decisions?)
└── Scalability (Do they think about growth?)

Part 2: Technical Deep Dive (30 min)
Pick one area to go deep:
- Kubernetes networking and service mesh
- Terraform modules and state management
- GitOps workflows and tooling
- Observability and distributed tracing

Part 3: Real Scenario (15 min)
Present actual problem your team faced:
"Our deployments take 45 minutes. How would you investigate and fix this?"

Evaluation:
├── Debugging approach (systematic vs random)
├── Knowledge of relevant tools
├── Communication of reasoning
└── Practical solutions
```

**For SRE Roles:**

```
Part 1: Incident Response (30 min)
Present real incident:
"At 3 AM, you get paged: API latency p99 jumped from 200ms to 5s. Walk me through your response."

Evaluation:
├── Triage and prioritization
├── Debugging methodology
├── Tool knowledge (metrics, logs, traces)
├── Communication and escalation
└── Follow-up and prevention

Part 2: SLO Design (20 min)
"Design SLOs for a payment processing service"

Evaluation:
├── Understanding of SLI/SLO/SLA
├── Business alignment
├── Measurability
└── Realistic targets

Part 3: Reliability Architecture (30 min)
"Design a highly available system for [specific scenario]"

Evaluation:
├── Failure modes analysis
├── Redundancy and resilience
├── Monitoring and alerting
└── Trade-offs and cost considerations
```

### Interview Question Bank

**Kubernetes Questions (Platform/SRE):**
- "Explain the lifecycle of a pod from kubectl apply to running"
- "How does Kubernetes networking work? Explain pod-to-pod communication"
- "What's the difference between Deployment, StatefulSet, and DaemonSet?"
- "How would you debug a crashlooping pod?"
- "Design a multi-tenant Kubernetes architecture with isolation"

**IaC Questions (Platform/Cloud):**
- "Explain Terraform state management and common pitfalls"
- "How do you structure Terraform code for multiple environments?"
- "Compare Terraform vs Pulumi vs CloudFormation - trade-offs?"
- "How do you handle secrets in infrastructure code?"
- "Design a Git workflow for infrastructure changes"

**CI/CD Questions (Platform/Release):**
- "Design a deployment pipeline with staging, testing, and production"
- "How do you implement blue-green vs canary deployments?"
- "Explain your approach to pipeline security"
- "How do you handle database migrations in CI/CD?"
- "Design a pipeline for monorepo with 20 services"

**Observability Questions (SRE/Platform):**
- "Explain the three pillars of observability"
- "How do you implement distributed tracing?"
- "Design an alerting strategy that minimizes false positives"
- "Explain cardinality and its impact on metrics systems"
- "How do you monitor a Kubernetes cluster?"

**Security Questions (Security/Platform):**
- "Design a secrets management strategy for applications"
- "Explain your approach to container image scanning"
- "How do you implement policy-as-code?"
- "Design a Zero Trust network architecture"
- "How do you handle vulnerability management?"

---

## Behavioral Interview (45-60 minutes)

### STAR Method Questions

**Collaboration:**
- "Tell me about a time you had to work with a difficult teammate"
- "Describe a project where you had to coordinate across multiple teams"
- "Give an example of when you had to convince someone of your technical approach"

**Problem-Solving:**
- "Tell me about the most complex technical problem you've solved"
- "Describe a time when you had to debug a production issue under pressure"
- "Give an example of when you had to pivot your approach mid-project"

**Leadership:**
- "Tell me about a time you mentored a junior engineer"
- "Describe a situation where you had to make a difficult technical decision"
- "Give an example of when you improved team processes or culture"

**Growth:**
- "Tell me about a time you failed and what you learned"
- "Describe how you stay current with technology"
- "Give an example of when you had to learn something completely new"

### Red Flags in Behavioral

- **Blames others:** "My team was terrible, management didn't support me"
- **No ownership:** "I was told to do this" vs "I decided to..."
- **Arrogance:** "I'm the only one who knew how to do it"
- **No growth:** Can't name recent learnings or mistakes
- **Poor communication:** Rambling stories, can't get to the point

---

## Skill Assessment Frameworks

### Platform Engineering Skills Matrix

```
Level | IaC | Kubernetes | CI/CD | Cloud | Observability
------|-----|------------|-------|-------|---------------
L3    | Basic Terraform | Can deploy pods | Use existing pipelines | Use EC2/S3 | Read dashboards
L4    | Terraform modules | Deploy services | Build simple pipelines | Design VPC | Create alerts
L5    | Advanced patterns | Operators/CRDs | Complex pipelines | Multi-region | Distributed tracing
L6    | Framework design | Cluster management | Pipeline platform | Multi-cloud | Observability strategy
```

### SRE Skills Matrix

```
Level | Monitoring | Incident Response | Capacity | Automation | On-Call
------|------------|-------------------|----------|------------|--------
L3    | Read metrics | Follow runbook | Basic math | Shell scripts | Shadowing
L4    | Create alerts | Lead incidents | Model growth | Ansible/Chef | Primary rotation
L5    | SLO design | Complex incidents | Multi-service | Advanced automation | Lead on-call
L6    | Observability strategy | Org-wide process | Long-term planning | Platform automation | On-call architect
```

### Security Engineering Skills Matrix

```
Level | AppSec | Infrastructure | Compliance | Incident Response
------|--------|----------------|------------|-------------------
L3    | Run SAST scans | Basic hardening | Follow checklists | Log analysis
L4    | SAST/DAST/SCA | Container security | Implement controls | Investigate threats
L5    | AppSec program | Zero Trust arch | Lead audits | Lead response
L6    | Security strategy | Enterprise security | Compliance strategy | IR program design
```

---

## Making the Hire/No-Hire Decision

### Decision Framework

```
Scoring:
Each interview: Strong Yes / Yes / Maybe / No / Strong No

Hiring Bar:
├── Must have: At least one "Strong Yes"
├── Required: Majority "Yes" or better
├── Red flag: Any "Strong No" = automatic reject
└── "Maybe" = More data needed (additional interview)

Calibration:
├── Compare to recent hires at same level
├── "Would this person raise the bar?"
├── "Would I want them on my team?"
└── "Can they succeed and grow here?"
```

### Common Decision Scenarios

**Strong Yes:**
- Exceeds expectations across all interviews
- Clear evidence of impact and growth
- Strong technical depth and communication
- **Action:** Extend offer quickly

**Mixed Signals:**
- Strong technical but weak communication
- Great culture fit but light on experience
- Excellent on paper but underwhelming in interview
- **Action:** Additional interview or pass (don't settle)

**Close Call:**
- Meets bar but doesn't exceed it
- Safe hire but won't raise the bar
- Good for today but limited growth potential
- **Action:** Usually pass - hire for potential, not just competence

**Clear No:**
- Technical gaps too large for level
- Communication issues
- Culture red flags
- **Action:** Polite rejection, move on

---

## Offer Strategy

### Compensation Philosophy

```
Market Competitive:
├── Research: Levels.fyi, industry surveys, peers
├── Positioning: 50th-75th percentile (competitive)
└── Components: Base + Equity + Bonus

Comp Bands by Level:
├── L3 (Junior): $100K-$130K
├── L4 (Mid): $130K-$160K
├── L5 (Senior): $160K-$200K
├── L6 (Staff): $200K-$250K
└── L7+ (Principal): $250K-$350K+

Regional Adjustments:
├── SF/NYC: +20-30%
├── Seattle/Austin: +10-15%
├── Remote: Market rate for location
└── Transparency: State range in JD
```

### Closing Candidates

**Offer call structure:**
1. Express enthusiasm for candidate
2. Present offer details (verbal first)
3. Explain equity, benefits, growth opportunity
4. Answer questions
5. Set timeline for decision (3-7 days)
6. Follow up with written offer same day

**Common objections:**
- **"Compensation is lower than expected"** → Can you meet somewhere in middle? What's the gap?
- **"I have another offer"** → How do they compare? What's important to you?
- **"I'm concerned about [X]"** → Valid concern, here's how we address it...
- **"I need more time"** → Reasonable, what else do you need to decide?

**Red flags in candidate:**
- Playing companies against each other aggressively
- Unrealistic compensation expectations
- Can't articulate why they want this role
- Focusing only on perks/compensation

---

## Onboarding (First 90 Days)

### 30-60-90 Day Plan

**First 30 Days:**
- Onboard to tools and systems
- Shadow team members
- Ship first small project
- Build relationships across team

**60 Days:**
- Own medium-sized project end-to-end
- Participate in on-call (if applicable)
- Start mentoring if senior

**90 Days:**
- Fully productive contributor
- Comfortable with team processes
- Clear on growth areas and next steps

**Success metrics:**
- New hire satisfaction survey
- Manager assessment of productivity
- Peer feedback on collaboration
- Retention at 90 days (>95%)

---

## Key Takeaways

1. **Clear JDs attract right candidates** - Be specific, transparent, authentic
2. **Structured interviews reduce bias** - Use rubrics, ask same questions
3. **Assess for potential, not just experience** - Hire people who will grow
4. **Move fast** - Top candidates have options, decide quickly
5. **Compensation matters** - Be competitive and transparent
6. **Onboarding is critical** - First 90 days set the tone
7. **Calibrate your bar** - Compare to recent hires, raise the bar over time
8. **Diversity improves outcomes** - Actively seek diverse perspectives
9. **Culture fit ≠ culture clone** - Hire for values, not sameness
10. **Trust your gut** - If something feels off, probe deeper

Great hiring is a skill that improves with practice and reflection.
