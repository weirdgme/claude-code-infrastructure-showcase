# ITIL Framework

ITIL 4 framework, service value system, guiding principles, and continual improvement for IT service management.

## Table of Contents

- [ITIL 4 Overview](#itil-4-overview)
- [Service Value System](#service-value-system)
- [Guiding Principles](#guiding-principles)
- [Service Value Chain](#service-value-chain)
- [Practices](#practices)
- [Continual Improvement](#continual-improvement)
- [Best Practices](#best-practices)

## ITIL 4 Overview

### What is ITIL 4?

ITIL 4 is the latest evolution of ITIL, designed for the digital age with:
- Focus on value co-creation
- Emphasis on collaboration
- Flexibility and agility
- Integration with modern practices (DevOps, Agile, Lean)

### Key Changes from ITIL v3

```
ITIL v3                    →    ITIL 4
─────────────────────────────────────────────
Service Lifecycle          →    Service Value System
5 Lifecycle Stages         →    Service Value Chain
26 Processes               →    34 Practices
Process-focused            →    Value-focused
Waterfall approach         →    Agile-compatible
```

## Service Value System (SVS)

### SVS Components

```
┌────────────────────────────────────────────────────┐
│              Guiding Principles                    │
├────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────┐                                   │
│  │ Opportunity │                                   │
│  │   Demand    │                                   │
│  └──────┬──────┘                                   │
│         │                                          │
│         ▼                                          │
│  ┌─────────────────────────────────────┐          │
│  │     Service Value Chain             │          │
│  │  Plan → Improve → Engage → Design   │          │
│  │  Obtain → Build → Deliver           │          │
│  └─────────────────────────────────────┘          │
│         │                                          │
│         ▼                                          │
│  ┌──────────────┐                                 │
│  │    Value     │                                 │
│  └──────────────┘                                 │
│                                                     │
│  Supported by:                                     │
│  • 34 Management Practices                        │
│  • Governance                                      │
│  • Continual Improvement                           │
│                                                     │
└────────────────────────────────────────────────────┘
```

### Value Co-Creation

**Value is realized through:**
1. Service provider activities
2. Service consumer activities
3. Collaboration between provider and consumer

**Value Components:**
- Outputs (what is delivered)
- Outcomes (results achieved)
- Costs (what is sacrificed)
- Risks (what might go wrong)

## Guiding Principles

### The 7 Guiding Principles

**1. Focus on Value**
```
Always understand and deliver value from the customer perspective.

Questions to ask:
• Who is the service consumer?
• What value do they expect?
• How do they measure value?
• What are their outcomes?
```

**2. Start Where You Are**
```
Don't start from scratch - assess current state.

Actions:
• Analyze existing services and processes
• Identify what works
• Leverage current capabilities
• Make incremental improvements
```

**3. Progress Iteratively with Feedback**
```
Work in small, manageable chunks with feedback loops.

Approach:
• Break work into iterations
• Gather feedback early and often
• Adapt based on learnings
• Reduce risk through smaller changes
```

**4. Collaborate and Promote Visibility**
```
Work across boundaries with transparency.

Practices:
• Cross-functional teams
• Shared goals and metrics
• Open communication
• Visible work (Kanban boards)
```

**5. Think and Work Holistically**
```
Consider the entire service end-to-end.

Considerations:
• All four dimensions (see below)
• End-to-end service delivery
• Customer journey
• Integration points
```

**6. Keep It Simple and Practical**
```
Use minimum number of steps to achieve objectives.

Guidelines:
• Eliminate waste
• Automate where valuable
• Reduce complexity
• Focus on outcomes, not activities
```

**7. Optimize and Automate**
```
Maximize value of human work through technology.

Strategy:
• Automate repetitive tasks
• Standardize before automating
• Measure before optimizing
• Preserve human judgment for complex decisions
```

## Service Value Chain

### Six Activities

**1. Plan**
- Strategic planning
- Portfolio management
- Architecture design
- Policy definition

**2. Improve**
- Continual improvement
- Feedback loops
- Performance analysis
- Change enablement

**3. Engage**
- Customer relationship management
- User engagement
- Requirement gathering
- Demand management

**4. Design and Transition**
- Service design
- Development
- Testing
- Deployment planning

**5. Obtain/Build**
- Resource acquisition
- Component development
- Integration
- Configuration

**6. Deliver and Support**
- Service delivery
- Incident management
- Request fulfillment
- Support operations

### Value Stream Example

```
Request for New Employee Laptop
─────────────────────────────────────────────────

Engage:
  ↓ Employee submits request via self-service portal

Plan:
  ↓ Verify approval and budget

Obtain/Build:
  ↓ Procure laptop from supplier
  ↓ Install standard image and software

Design/Transition:
  ↓ Configure for user's role
  ↓ Test functionality

Deliver/Support:
  ↓ Ship to employee
  ↓ Provide setup instructions
  ↓ Ongoing support via service desk

Improve:
  ↓ Gather feedback
  ↓ Optimize process
```

## Practices

### 34 ITIL Practices Categorized

**General Management Practices (14):**
- Architecture management
- Continual improvement
- Information security management
- Knowledge management
- Measurement and reporting
- Organizational change management
- Portfolio management
- Project management
- Relationship management
- Risk management
- Service financial management
- Strategy management
- Supplier management
- Workforce and talent management

**Service Management Practices (17):**
- Availability management
- Business analysis
- Capacity and performance management
- Change enablement
- Incident management
- IT asset management
- Monitoring and event management
- Problem management
- Release management
- Service catalog management
- Service configuration management
- Service continuity management
- Service design
- Service desk
- Service level management
- Service request management
- Service validation and testing

**Technical Management Practices (3):**
- Deployment management
- Infrastructure and platform management
- Software development and management

### Key Practice Details

**Service Desk:**
```
Purpose: Single point of contact between service provider and users

Activities:
• Incident logging and management
• Service request fulfillment
• Communication with users
• Escalation management

Channels:
• Phone
• Email
• Self-service portal
• Chat/messaging
• Walk-up (physical location)
```

**Incident Management:**
```
Purpose: Minimize negative impact of incidents

Key Metrics:
• Mean Time to Resolve (MTTR)
• First Call Resolution Rate
• Incident volume by priority
• SLA compliance

Incident Priorities:
P1 - Critical:   Business stopped
P2 - High:       Major degradation
P3 - Medium:     Moderate impact
P4 - Low:        Minor inconvenience
```

**Problem Management:**
```
Purpose: Reduce likelihood and impact of incidents

Activities:
• Problem identification
• Root cause analysis
• Known error database
• Workaround documentation
• Permanent fixes

Proactive vs Reactive:
Reactive:  Analyze incidents to find patterns
Proactive: Identify potential problems before incidents occur
```

**Change Enablement:**
```
Purpose: Maximize successful service changes

Change Types:
• Standard change:   Pre-approved, low risk
• Normal change:     Requires assessment and authorization
• Emergency change:  Must be implemented ASAP

Change Advisory Board (CAB):
• Assesses change impact
• Authorizes changes
• Reviews change success
```

## Continual Improvement

### Continual Improvement Model

```
┌──────────────────────────────────────┐
│         What is the vision?          │  ← Strategic
│              (Goals)                  │
└──────────┬───────────────────────────┘
           │
┌──────────▼───────────────────────────┐
│      Where are we now?               │  ← Assessment
│      (Current state)                  │
└──────────┬───────────────────────────┘
           │
┌──────────▼───────────────────────────┐
│     Where do we want to be?          │  ← Objectives
│      (Target state)                   │
└──────────┬───────────────────────────┘
           │
┌──────────▼───────────────────────────┐
│     How do we get there?             │  ← Planning
│         (Action plan)                 │
└──────────┬───────────────────────────┘
           │
┌──────────▼───────────────────────────┐
│     Take action                       │  ← Execution
│     (Implement changes)               │
└──────────┬───────────────────────────┘
           │
┌──────────▼───────────────────────────┐
│     Did we get there?                │  ← Measurement
│     (Measure results)                 │
└──────────┬───────────────────────────┘
           │
           └──────► Repeat ◄────────────┘
```

### Improvement Register

Track all improvement initiatives:

```yaml
Improvement Register:
  - ID: IMP-001
    Title: Reduce incident resolution time
    Priority: High
    Status: In Progress
    Owner: Service Desk Manager
    Target: Reduce MTTR by 25%
    Metrics:
      - Current MTTR: 4 hours
      - Target MTTR: 3 hours
    Actions:
      - Implement knowledge base
      - Train first-line support
      - Automate common fixes
```

## Best Practices

### 1. Adopt a Value Mindset

Focus all activities on delivering value to customers.

### 2. Use the Guiding Principles

Apply principles to all decisions and activities.

### 3. Tailor ITIL to Your Context

Adapt practices to fit your organization's size, culture, and needs.

### 4. Integration with Other Frameworks

**ITIL + DevOps:**
```
ITIL Provides:          DevOps Provides:
• Governance            • Speed
• Stability             • Automation
• Risk management       • Collaboration
• Service focus         • Continuous delivery
```

**ITIL + Agile:**
```
ITIL:                   Agile:
• Service management    • Product development
• Long-term stability   • Iterative delivery
• Governance            • Customer feedback
```

### 5. Start Small, Scale Gradually

Begin with most critical practices, expand over time.

### 6. Measure and Improve

```
Key Performance Indicators (KPIs):
• Service availability (uptime %)
• Incident resolution time
• Change success rate
• Customer satisfaction score (CSAT)
• First contact resolution rate
• Mean time between failures (MTBF)
• Service cost per user
```

### 7. Foster a Service Culture

Embed service mindset across the organization.

## Four Dimensions

Every aspect of service management must consider:

**1. Organizations and People**
- Organizational structure
- Roles and responsibilities
- Culture and behavior
- Staffing and competencies

**2. Information and Technology**
- Information management
- Knowledge sharing
- Technology and tools
- Relationships between components

**3. Partners and Suppliers**
- Service integration
- Supplier contracts
- Partner relationships
- External dependencies

**4. Value Streams and Processes**
- Service value streams
- Process flows
- Workflows
- Procedures

## Common Pitfalls

❌ **Treating ITIL as rigid rules** - It's guidance, not law
❌ **Implementing everything at once** - Start small, iterate
❌ **Focusing on processes, not value** - Remember the outcome
❌ **Copying others blindly** - Tailor to your context
❌ **Ignoring organizational culture** - Culture beats process
❌ **No executive support** - Leadership buy-in is critical
❌ **Insufficient training** - Invest in people development

---

**Related Resources:**
- [service-management.md](service-management.md) - Service catalog and SLA management
- [change-management.md](change-management.md) - Change enablement practices
- [incident-service-management.md](incident-service-management.md) - Incident and problem management
