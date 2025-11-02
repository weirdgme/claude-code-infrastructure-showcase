# Resource Planning and Capacity Management

**Practical guide to team sizing, capacity planning, and resource allocation for engineering managers.**

---

## Team Capacity Model

### Realistic Capacity Per Engineer

```
Nominal Hours per Week: 40 hours
├── Meetings: -5 hours (stand-ups, 1-on-1s, planning, retros)
├── Code reviews: -2 hours
├── Context switching: -3 hours (interruptions, Slack, email)
├── Operational work: -3 hours (on-call, incidents, support)
├── Administrative: -2 hours (timesheets, reports, training)
└── Productive work: ~25-28 hours

Adjust for:
├── Junior engineers (L3): 20-25 hours (more learning/mentorship time)
├── Mid engineers (L4): 25-30 hours
├── Senior engineers (L5): 25-30 hours (more meetings/reviews)
└── Staff+ engineers (L6+): 20-25 hours (more strategic work, less coding)

On-call impact:
├── Primary on-call week: -5 to -10 hours (interruptions + fatigue)
└── Post-incident week: -3 to -5 hours (postmortem, fixes)
```

**Key insight:** Plan for **25-30 productive hours per engineer per week**, not 40.

---

## Capacity Planning Formula

### Basic Formula

```
Team Capacity = Engineers × Productive Hours × Utilization Target

Example:
├── Team size: 8 engineers
├── Productive hours: 28 hours/week per engineer
├── Utilization target: 80% (leave buffer for unknowns)
└── Weekly capacity: 8 × 28 × 0.80 = 179 hours/week

Story points alternative:
├── Average velocity: 40 points/sprint (2 weeks)
├── 80% utilization: 32 points available for planned work
└── Buffer: 8 points for unplanned work, bugs, tech debt
```

### Capacity Allocation

```
Recommended allocation:
├── Feature work (planned): 60-70%
├── Tech debt & refactoring: 15-20%
├── Bug fixes & support: 10-15%
├── Learning & innovation: 5-10%
└── Operational work: Always running (included in hours above)

Adjust by team type:
├── Product teams: 70% features, 15% tech debt, 15% bugs/support
├── Platform teams: 50% new features, 30% tech debt, 20% support
└── SRE teams: 40% projects, 30% reliability, 30% on-call/incidents
```

**Why this matters:** Over-allocating capacity leads to burnout, missed deadlines, and quality issues.

---

## When to Hire

### Capacity Indicators

**You likely need to hire when:**
1. **Sustained overload:** Team at >90% capacity for 3+ months
2. **Chronic delays:** Consistently missing commitments
3. **Burnout signals:** Engineers working nights/weekends regularly
4. **No slack time:** Zero buffer for innovation or learning
5. **Key person risk:** Single points of failure across critical systems
6. **Strategic initiatives blocked:** Can't invest in important projects due to capacity

**Calculate hiring need:**
```
Current capacity: 8 engineers × 28 hours × 80% = 179 hours/week
Current demand: 220 hours/week of work
Gap: 41 hours/week

Hiring need: 41 / (28 × 0.80) = ~1.8 engineers
Decision: Hire 2 engineers

Timeline:
├── Start hiring: Now
├── First hire start: +3 months (hiring lag)
├── Second hire start: +4 months
└── Full productivity: +6-9 months (ramp time)
```

### When NOT to Hire

**Don't hire if:**
1. **Temporary spike:** Capacity crunch is project-specific and time-bound
2. **Process problems:** Inefficiencies that adding people won't fix
   - Too many meetings
   - Unclear requirements or changing priorities
   - Poor tooling or developer experience
3. **Unclear scope:** Don't know what new hire would work on
4. **Budget constraints:** Can't support sustained headcount
5. **Can optimize instead:** Can address capacity through automation or tooling

**Alternative solutions:**
- **Descope:** Cut low-priority work
- **Delegate:** Push work to appropriate teams
- **Automate:** Invest in tooling to reduce toil
- **Contractors:** Temporary capacity for time-bound projects

---

## Team Sizing Guidelines

### Optimal Team Sizes

**General principles:**
- **Small teams (5-8):** Optimal for communication and autonomy
- **Medium teams (8-12):** Need more structure and coordination
- **Large teams (12+):** Should split into multiple teams

**Amazon "two-pizza rule":** If you can't feed the team with two pizzas, it's too large.

### Sizing by Team Type

**Product Engineering Teams:**
```
Team composition (6-8 engineers):
├── 1 Senior/Staff engineer (tech lead)
├── 3-4 Mid-level engineers
├── 1-2 Junior engineers
└── 1 Engineering Manager (if >5 people)

Ratio: ~1 senior : 2-3 mid : 1 junior
```

**Platform Engineering Teams:**
```
Team composition (8-10 engineers):
├── 1 Staff engineer (platform architect)
├── 4-5 Senior engineers (specialists)
├── 2-3 Mid-level engineers
├── 1 Junior engineer (optional)
└── 1 Engineering Manager

Ratio: Higher senior weighting for platform complexity
```

**SRE Teams:**
```
Team composition (6-8 SREs):
├── 1 Senior SRE (team lead)
├── 3-4 SREs
├── 1-2 Junior SREs
└── 1 SRE Manager

Support ratio: 1 SRE per 50-100 engineers (mature org)
On-call rotation: Need 6-8 people for sustainable rotation
```

**Security Teams:**
```
Team composition (6-8 engineers):
├── 1 Security architect
├── 2-3 AppSec engineers
├── 2-3 Infrastructure security engineers
├── 1 Compliance specialist
└── 1 Security manager

Support ratio: 1 security engineer per 50-75 engineers
```

### Manager Span of Control

**Individual contributor managers:**
- **Optimal:** 6-8 direct reports
- **Acceptable:** 5-10 direct reports
- **Too few:** <4 (unless special circumstances)
- **Too many:** >10 (quality of management suffers)

**Manager of managers:**
- **Optimal:** 4-6 direct reports (other managers)
- **Acceptable:** 3-7 direct reports
- **Too many:** >7 (can't support managers effectively)

---

## Org Scaling Patterns

### 1-25 Engineers: Single Team

```
Structure:
├── VP Engineering / CTO
└── 1-3 teams (product + infra combined)

Characteristics:
├── Generalists, everyone does everything
├── Informal processes
└── Fast but chaotic

Challenges:
├── No specialization
├── Scaling technical decisions
└── Knowledge silos emerging
```

### 25-100 Engineers: Functional Teams

```
Structure:
├── VP Engineering
    ├── Product Engineering (3-4 teams)
    ├── Platform/Infrastructure (1-2 teams)
    └── Mobile/Frontend (1-2 teams)

Characteristics:
├── Functional specialization emerging
├── More formal processes
└── Coordination challenges

Challenges:
├── Cross-team dependencies
├── Resource allocation conflicts
└── Need for technical program management
```

### 100-300 Engineers: Product + Platform Org

```
Structure:
├── CTO
    ├── VP Product Engineering
    │   └── Multiple product teams
    ├── VP Platform Engineering
    │   ├── Developer experience team
    │   ├── SRE team
    │   └── Data platform team
    └── VP/Director Security
        └── Security team

Characteristics:
├── Clear separation: product vs platform
├── Platform as internal product
└── Enabling teams model

Challenges:
├── Platform adoption (not mandated)
├── Balancing product vs platform investment
└── Avoiding ivory tower platforms
```

### 300+ Engineers: Scaled Org

```
Structure:
├── CTO
    ├── VP Product Engineering (multiple VPs by domain)
    │   ├── Payments org (50 engineers)
    │   ├── Growth org (40 engineers)
    │   └── Core product org (60 engineers)
    ├── VP Platform Engineering
    │   ├── Developer experience (20 engineers)
    │   ├── Data platform (15 engineers)
    │   └── ML platform (10 engineers)
    ├── VP SRE & Operations
    │   ├── Production SRE (15 engineers)
    │   ├── Observability (8 engineers)
    │   └── Incident management (5 engineers)
    └── VP Security / CISO
        ├── AppSec (10 engineers)
        ├── Infrastructure security (8 engineers)
        └── Compliance (5 engineers)

Characteristics:
├── Multiple layers of management
├── Specialized organizations
└── Formal processes and governance

Challenges:
├── Communication and alignment
├── Avoiding silos and bureaucracy
└── Maintaining engineering culture
```

---

## Headcount Planning

### Annual Planning Process

**Timeline (for calendar year planning):**
```
Sept-Oct: Strategic planning
├── Product roadmap for next year
├── Technical initiatives and investments
├── Org growth targets

Oct-Nov: Headcount requests
├── Each org submits headcount needs
├── Justification with capacity models
└── Prioritization across company

Nov-Dec: Budget approval
├── Finance reviews and approves budget
├── Headcount allocated to orgs
└── Hiring plan created

Jan-Dec: Execution
├── Hire according to plan
├── Quarterly check-ins and adjustments
└── Handle attrition and changes
```

### Headcount Request Template

```
Team: Platform Engineering
Manager: [Your Name]
Current headcount: 8 engineers
Requested headcount: +3 engineers (total 11)

Justification:
1. Capacity Gap
   - Current capacity: 179 hours/week
   - Current demand: 240 hours/week
   - Gap: 61 hours/week (2.7 FTE equivalent)

2. Strategic Initiatives
   - Multi-region platform expansion (1 engineer, 6 months)
   - Developer experience improvements (1 engineer, ongoing)
   - Observability platform rebuild (1 engineer, 9 months)

3. Risk Mitigation
   - Key person risk on K8s (single expert)
   - On-call rotation understaffed (need 8 for sustainable rotation)

Proposed hires:
├── Q1: Senior Platform Engineer (Kubernetes focus)
├── Q2: Mid-level Platform Engineer (CI/CD focus)
└── Q3: Mid-level Platform Engineer (Observability focus)

Impact if not approved:
├── Can't invest in developer experience (productivity loss)
├── Multi-region delayed by 6-9 months (revenue impact)
└── Burnout risk on team (retention issue)

Cost:
├── Senior engineer: $200K total comp
├── Mid-level (2): $150K × 2 = $300K total comp
└── Total: $500K annual cost

ROI:
├── Developer productivity: Save 50 engineers × 2 hours/week = 5,000 hours/year
├── Value: 5,000 hours × $100/hour = $500K savings
└── Break-even: Year 1
```

---

## Resource Allocation Frameworks

### 70-20-10 Model

```
70% Core Business (Sustaining)
├── Feature development for current products
├── Bug fixes and maintenance
└── Customer support and requests

20% Adjacent Opportunities (Growing)
├── New features in existing products
├── Platform improvements
└── Developer experience investments

10% New Bets (Exploring)
├── R&D and prototypes
├── New technologies
└── Innovation time

Adjust by company stage:
├── Early stage: 80% core, 15% adjacent, 5% new
├── Growth stage: 70% core, 20% adjacent, 10% new
└── Mature stage: 60% core, 25% adjacent, 15% new
```

### Priority-Based Allocation

```
P0: Must-Have (40-50% capacity)
├── Critical customer commitments
├── Security and compliance requirements
└── Production reliability

P1: Should-Have (30-40% capacity)
├── Planned features and roadmap
├── Technical debt reduction
└── Developer productivity improvements

P2: Nice-to-Have (10-20% capacity)
├── Experimental projects
├── Learning and innovation
└── Process improvements

P3: Backlog (not planned)
├── Everything else
└── Revisit quarterly
```

---

## Contractor vs. Full-Time Employee

### When to Use Contractors

**Good use cases:**
- **Time-bound projects:** Clear scope with definite end date
- **Specialized skills:** Need expertise your team lacks temporarily
- **Capacity spikes:** Temporary increase in workload
- **Prototyping:** Experiment before committing to full hire
- **Cost constraints:** Budget for contractors but not headcount

**Bad use cases:**
- **Core product work:** Critical to business, long-term ownership needed
- **Tribal knowledge:** Work requiring deep context of your systems
- **Team culture:** Building team cohesion and culture
- **Mentorship:** Growing junior engineers

### Cost Comparison

```
Full-Time Engineer (L4):
├── Base salary: $150K
├── Benefits (30%): $45K
├── Equity: $30K/year (vesting)
├── Overhead: $25K (office, equipment, etc.)
└── Total: $250K/year

Contractor (equivalent level):
├── Hourly rate: $100-150/hour
├── Annual (40 hours × 50 weeks): $200K-300K
├── No benefits or equity
└── Total: $200K-300K/year

Break-even: ~1 year of full-time work
Decision: If need >1 year, hire full-time
```

---

## Productivity Metrics

### Team Health Metrics

**Leading indicators (predict problems):**
- **Capacity utilization:** Target 70-80% (not 100%)
- **Cycle time:** Time from commit to production (target <1 day)
- **PR review time:** Time to first review (target <4 hours)
- **Deploy frequency:** How often deploy to production (target daily+)
- **Change failure rate:** % of deploys causing incidents (target <15%)

**Lagging indicators (measure outcomes):**
- **Velocity:** Story points completed per sprint (track trend)
- **Throughput:** Features shipped per quarter
- **Quality:** Bugs per feature, incident rate
- **Availability:** Uptime and reliability (SLO compliance)

**People metrics:**
- **Attrition:** <10% annual (healthy)
- **eNPS:** Employee net promoter score (>30 is good)
- **1-on-1 frequency:** Weekly 30-min minimum
- **Growth:** Promotion rate, skill development

### What NOT to Measure

**Anti-patterns:**
- ❌ Lines of code written
- ❌ Number of commits
- ❌ Hours worked
- ❌ Number of tickets closed
- ❌ Individual velocity/output

**Why:** These metrics incentivize wrong behaviors and don't correlate with value delivered.

---

## Resource Planning Tools

### Capacity Planning Spreadsheet

```
Team Capacity Model (weekly):

Engineer | Level | Productive Hours | Utilization | Available Capacity
---------|-------|------------------|-------------|-------------------
Alice    | L5    | 25               | 80%         | 20 hours
Bob      | L4    | 28               | 80%         | 22.4 hours
Carol    | L4    | 28               | 80%         | 22.4 hours
Dave     | L3    | 23               | 80%         | 18.4 hours
...      | ...   | ...              | ...         | ...
TOTAL    | -     | -                | -           | 167 hours/week

Committed work:
├── Feature A: 40 hours
├── Feature B: 60 hours
├── Tech debt: 30 hours
├── Support/ops: 25 hours
└── Total: 155 hours

Buffer: 167 - 155 = 12 hours (7% slack) ✅ Healthy
```

### Project Estimation

```
Feature estimation:
├── Break down into tasks
├── Estimate each task (hours or points)
├── Add buffer (30-50% for unknowns)
├── Account for dependencies and blockers
└── Reality check: Does timeline make sense?

Example:
├── API implementation: 20 hours
├── Frontend work: 30 hours
├── Testing: 15 hours
├── Documentation: 5 hours
├── Subtotal: 70 hours
├── Buffer (40%): 28 hours
└── Total estimate: 98 hours (~3-4 weeks with interruptions)
```

---

## Key Takeaways for Managers

1. **Plan for 25-30 productive hours** per engineer per week, not 40
2. **Target 70-80% utilization** - leave buffer for unknowns
3. **Hire when sustained overload** (>90% capacity for 3+ months)
4. **Optimize before hiring** - fix process issues first
5. **Keep teams small** (5-8 people) for effectiveness
6. **Balance allocation:** 70% features, 20% tech debt, 10% innovation
7. **Track leading indicators** - capacity, cycle time, deploy frequency
8. **Don't measure individuals** - focus on team outcomes
9. **Plan annually, adjust quarterly** - be flexible
10. **Justify with data** - use capacity models for headcount requests

Resource planning is about enabling sustainable delivery, not maximizing utilization.
