# Technical Leadership for Managers

**For engineering managers who need to make sound technical decisions without being hands-on.**

> You don't need to be the best coder on your team. You need to ask the right questions, evaluate proposals effectively, and make decisions that balance technical excellence with business needs.

---

## When to Use This Skill

**You're a manager who needs help with:**
- Reviewing architecture proposals from your team
- Evaluating technical decisions (build vs buy, technology choices)
- Assessing technical risk without deep expertise
- Prioritizing technical debt vs features
- Knowing when to push back on engineering decisions
- Asking insightful questions in technical discussions

**This skill does NOT cover:**
- Hands-on technical implementation (see technical skills)
- People management (see engineering-management skill)
- Budget/cost decisions (see budget-and-cost-management skill)

---

## Core Principle

**Your job is to:**
1. **Ask good questions** - Probe assumptions and alternatives
2. **Evaluate trade-offs** - Understand pros/cons of technical choices
3. **Assess risk** - Identify what could go wrong
4. **Make decisions** - Choose direction when team is split
5. **Provide context** - Connect technical work to business goals

**You are NOT expected to:**
- Write the code or design the system yourself
- Be the most technical person in the room
- Know every technology in depth
- Make all technical decisions (empower your team)

---

## 1. Architecture Review Framework

### Questions to Ask in Architecture Reviews

**Problem Understanding:**
- "What problem are we solving? For whom?"
- "What happens if we don't solve this?"
- "Have we validated this is a real problem?"
- "What's the simplest solution that could work?"

**Requirements & Constraints:**
- "What are the non-functional requirements?" (scale, latency, availability)
- "What constraints do we have?" (time, budget, team skills, existing systems)
- "What's our SLO/SLA commitment?"
- "What's the expected growth over next 1-2 years?"

**Proposed Solution:**
- "Why this approach vs alternatives?"
- "What did you consider and reject? Why?"
- "What are the trade-offs of this design?"
- "What could go wrong? How do we mitigate?"
- "How does this align with our existing architecture?"

**Implementation & Operations:**
- "What's the rollout plan? Can we do this incrementally?"
- "How do we test this?"
- "What's the operational burden?" (monitoring, on-call, maintenance)
- "How do we roll back if something goes wrong?"
- "What documentation will we create?"

**Decision Criteria:**
- "Does this solve the problem effectively?"
- "Is the complexity justified?"
- "Can our team build and maintain this?"
- "Does this align with our technical strategy?"
- "What's the risk if we're wrong?"

### Red Flags in Proposals

**🚩 Over-engineering:**
- Solution is much more complex than the problem
- "We might need this someday" without clear requirement
- Adopting bleeding-edge technology for no clear reason

**🚩 Under-engineering:**
- Doesn't consider scale or growth
- No error handling or failure modes
- Ignores operational concerns

**🚩 Resume-driven development:**
- Engineer wants to use cool new tech
- No clear business justification
- Team lacks skills to maintain it

**🚩 Not invented here syndrome:**
- Rebuilding something that exists
- "Our use case is special" without evidence
- Ignoring proven solutions

**🚩 Analysis paralysis:**
- Perfect is the enemy of good
- Endless debate without decision
- Fear of making wrong choice

### Decision-Making Framework

```
Step 1: Clarify the Problem
├── Is this a real problem worth solving?
├── What's the impact of not solving it?
└── Have we validated with users/data?

Step 2: Evaluate Options (usually 2-3 viable options)
├── What are pros/cons of each?
├── What's the risk of each?
├── What's the cost (time, complexity, maintenance)?
└── Which aligns best with our strategy?

Step 3: Make Decision
├── Choose based on trade-offs
├── Document rationale (ADR - Architecture Decision Record)
├── Communicate decision clearly
└── Set review point to validate

Step 4: Support the Decision
├── Allocate resources
├── Remove blockers
├── Monitor progress
└── Adjust if assumptions prove wrong
```

**When to defer to the team:**
- Technical details within established patterns
- Team has more context than you
- Decision is reversible
- Team consensus exists

**When to make the call:**
- Team is deadlocked
- Strategic direction is unclear
- Cross-team coordination needed
- Business context that team doesn't have

---

## 2. Evaluating Technical Proposals

### Template: One-Page Technical Proposal

**Your team should submit proposals in this format:**

```markdown
# Proposal: [Title]

## Problem
[2-3 sentences: What problem are we solving? Why does it matter?]

## Proposed Solution
[1 paragraph: High-level approach]

## Alternatives Considered
1. Option A: [Brief description] - Rejected because [reason]
2. Option B: [Brief description] - Rejected because [reason]

## Trade-offs
Pros:
- [Benefit 1]
- [Benefit 2]

Cons:
- [Cost/Risk 1]
- [Cost/Risk 2]

## Implementation Plan
- Phase 1: [Milestone, timeline]
- Phase 2: [Milestone, timeline]
- Rollback plan: [How we revert if needed]

## Success Metrics
- [How we measure success]
- [What "done" looks like]

## Open Questions
- [Thing we're still figuring out]
```

### Evaluation Rubric

| Criterion | Questions | Weight |
|-----------|-----------|--------|
| **Problem Clarity** | Is the problem well-defined? Is it worth solving? | High |
| **Solution Quality** | Is the approach sound? Are alternatives considered? | High |
| **Risk Assessment** | What could go wrong? Are mitigations identified? | High |
| **Feasibility** | Can our team actually build this? In the proposed timeline? | High |
| **Alignment** | Does this fit our architecture and strategy? | Medium |
| **Operational Impact** | Can we operate/maintain this? What's the burden? | Medium |
| **Cost** | Time, complexity, ongoing maintenance costs? | Medium |

**Decision matrix:**
- All High criteria met → Approve
- 1-2 High criteria concerns → Request revision
- 3+ High criteria concerns → Reject or significantly scope down

---

## 3. Risk Assessment for Managers

### Types of Technical Risk

**1. Technology Risk**
- **New technology:** Team lacks experience
- **Bleeding edge:** Immature ecosystem, breaking changes
- **Deprecated tech:** End-of-life, security vulnerabilities

**Assessment:**
- "Have we used this before? If not, what's our learning plan?"
- "How mature is this technology? Is it production-ready?"
- "What's our exit strategy if this doesn't work out?"

**2. Complexity Risk**
- **High complexity:** Hard to understand, debug, maintain
- **Many moving parts:** Increased failure modes
- **Tight coupling:** Changes cascade across system

**Assessment:**
- "Can a new engineer understand this in a week?"
- "What breaks if component X fails?"
- "How do we test this?"

**3. Scale Risk**
- **Performance:** Won't handle expected load
- **Cost:** Expenses grow faster than value
- **Data:** Volume overwhelms system

**Assessment:**
- "Have we load tested this?"
- "What happens at 10x current traffic?"
- "What's the cost curve as we scale?"

**4. Operational Risk**
- **Operational burden:** Requires constant babysitting
- **Hard to debug:** No observability or logs
- **Fragile:** Frequent incidents and outages

**Assessment:**
- "Who gets paged when this breaks?"
- "How do we debug issues in production?"
- "What's the MTTR (mean time to recovery)?"

**5. People Risk**
- **Key person dependency:** Only one person understands it
- **Skill gap:** Team can't maintain it
- **Burnout risk:** Unsustainable workload

**Assessment:**
- "What happens if [engineer] leaves?"
- "Does the team have skills to maintain this?"
- "Is this creating unsustainable on-call burden?"

### Risk Matrix

| Risk Level | Likelihood | Impact | Action |
|------------|------------|--------|--------|
| **Critical** | High | High | Must mitigate before proceeding |
| **High** | High | Medium | Mitigate or accept with plan |
| **Medium** | Medium | Medium | Monitor and manage |
| **Low** | Low | Low | Accept and document |

**Risk Mitigation Strategies:**
- **Prototype first:** Build small version to validate
- **Incremental rollout:** Phase deployment, easier to roll back
- **Fallback plan:** Have plan B ready
- **Monitoring:** Detect problems early
- **Documentation:** Reduce key person risk

---

## 4. Technical Debt Prioritization

### What is Technical Debt?

**Technical debt is the cost of choosing a faster/easier solution now instead of a better approach that would take longer.**

Not all technical debt is bad:
- ✅ **Good debt:** Intentional shortcuts to ship faster, with plan to pay back
- ❌ **Bad debt:** Accidental complexity, lack of understanding, rushing without thinking

### Categorizing Technical Debt

**Type 1: Critical Debt (Fix Now)**
- Security vulnerabilities
- Data corruption risks
- System instability causing frequent outages
- Blocking new development

**Type 2: Important Debt (Plan to Fix)**
- Slowing down development (takes 2x longer to ship)
- Increasing bug rate
- Making on-call painful
- Approaching technical limits (database size, API rate limits)

**Type 3: Nice-to-Have Debt (Opportunistic)**
- Code quality improvements
- Better test coverage
- Refactoring for cleaner code
- Upgrading dependencies

**Type 4: Not Actually Debt**
- Engineer preference ("I like X better than Y")
- Premature optimization
- Hypothetical future needs

### Prioritization Framework

**Formula: Priority = (Impact × Frequency) / Effort**

- **Impact:** How much does this slow us down or cause problems? (1-10)
- **Frequency:** How often do we hit this problem? (1-10)
- **Effort:** How hard is it to fix? (1-10)

**Example:**
- Flaky CI tests: Impact=7, Frequency=10, Effort=3 → Priority = 23 (High!)
- Old dependency: Impact=2, Frequency=1, Effort=8 → Priority = 0.25 (Low)

### Allocation Strategy

**Recommended allocation:**
- 70-80% new features and product work
- 15-20% technical debt and refactoring
- 5-10% learning and innovation

**How to allocate tech debt time:**
- Dedicate time each sprint (e.g., 20% of capacity)
- OR: Full sprint every quarter focused on tech debt
- OR: "You break it, you fix it" - engineers fix debt they create

**Red flags you're neglecting debt:**
- Slowing velocity (takes longer to ship each sprint)
- Increasing bug rate
- Engineers frustrated or burned out
- Frequent production incidents
- Hard to hire/onboard (codebase is a mess)

---

## 5. When to Push Back

### Situations Where You Should Push Back

**1. Scope Creep**
- **Signal:** "While we're at it, let's also..."
- **Push back:** "Let's ship the core feature first, then decide if we need that"
- **Why:** Prevents projects from ballooning, keeps focus

**2. Gold Plating**
- **Signal:** Over-engineering beyond requirements
- **Push back:** "What's the simplest solution that meets the requirement?"
- **Why:** Complexity has ongoing cost

**3. Resume-Driven Development**
- **Signal:** "I want to try this new framework"
- **Push back:** "What problem does this solve that our current approach doesn't?"
- **Why:** Stability and team knowledge matter

**4. Analysis Paralysis**
- **Signal:** Weeks of design docs, no code
- **Push back:** "Let's build a prototype this week and learn from it"
- **Why:** Bias toward action, learn by doing

**5. Ignoring Operations**
- **Signal:** "We'll figure out monitoring after we ship"
- **Push back:** "How will we know if this is working? Who gets paged?"
- **Why:** Operational burden falls on team

**6. No Rollback Plan**
- **Signal:** "We'll just push to production and see"
- **Push back:** "What's our rollback plan if this breaks?"
- **Why:** Reduces risk, enables faster recovery

**7. Skipping Testing**
- **Signal:** "We'll test in production"
- **Push back:** "What's our testing strategy? How do we gain confidence?"
- **Why:** Quality and stability matter

### How to Push Back Effectively

**Bad push back:**
- ❌ "No, that's a terrible idea"
- ❌ "We've always done it this way"
- ❌ "I don't like that approach"

**Good push back:**
- ✅ "Help me understand the trade-offs of this approach"
- ✅ "What problem does this solve that we can't solve simpler?"
- ✅ "What's the operational burden? Can we support this long-term?"
- ✅ "Let's prototype both approaches and compare"

**Framework:**
1. **Ask questions** to understand the reasoning
2. **State your concern** clearly and specifically
3. **Propose alternative** or request modification
4. **Explain why** in terms of business impact, not personal preference
5. **Listen** to their response - you might be wrong!
6. **Decide** - either accept their approach or make the call

---

## 6. Questions to Ask Your Team

### Weekly Team Check-ins

**Project Progress:**
- "What's at risk this week?"
- "What blockers can I help remove?"
- "Are we on track to hit our milestone?"
- "What changed since last week?"

**Technical Health:**
- "Any incidents or outages this week?"
- "How's our on-call been?"
- "Are there any technical concerns I should know about?"
- "What technical debt is bothering you most?"

**Team Health:**
- "How's the team feeling about the work?"
- "Anyone struggling or overloaded?"
- "What's morale like?"

### Architecture Discussions

**Exploring Options:**
- "What alternatives did you consider?"
- "What are the trade-offs of each option?"
- "Which option do you recommend and why?"

**Understanding Complexity:**
- "Can you explain this to me like I'm a new engineer?"
- "What's the simplest version of this that could work?"
- "What makes this complex? Can we reduce that?"

**Risk Assessment:**
- "What worries you about this approach?"
- "What could go wrong?"
- "How do we mitigate those risks?"

**Future Thinking:**
- "How does this scale?"
- "What happens when we have 10x traffic?"
- "How do we test this?"
- "How do we monitor and debug this in production?"

### Code Review (if you still review code)

**Don't ask:**
- ❌ Nitpicky style questions
- ❌ "Why didn't you do it my way?"

**Do ask:**
- ✅ "Can you walk me through the high-level approach?"
- ✅ "How does this handle errors?"
- ✅ "How did you test this?"
- ✅ "What happens if X fails?"

### Incident Reviews

**During incident:**
- "What do you need from me right now?"
- "Should we escalate or pull in more people?"
- "Do we need to communicate to customers?"

**Post-incident:**
- "What happened? (blameless)"
- "What did we learn?"
- "What action items prevent this in the future?"
- "Are those action items being prioritized?"

### One-on-Ones

**Growth:**
- "What do you want to get better at?"
- "What kind of problems excite you?"
- "What's something you learned recently?"

**Feedback:**
- "How can I better support you?"
- "What's one thing I should stop/start/continue doing?"

---

## Key Takeaways for Managers

1. **You don't need to be the most technical person** - Ask good questions instead
2. **Focus on trade-offs** - Every decision has pros and cons
3. **Assess risk** - What could go wrong? How do we mitigate?
4. **Prioritize ruthlessly** - Not all tech debt is worth fixing
5. **Push back thoughtfully** - Question assumptions, don't dictate solutions
6. **Empower your team** - Make decisions, don't make all decisions
7. **Connect technical to business** - Engineers need context
8. **Document decisions** - Future you will thank you (ADRs)
9. **Monitor and adjust** - Technical strategy evolves
10. **Build trust** - Admit when you don't know, learn together

---

## Templates and Tools

### Architecture Decision Record (ADR) Template

```markdown
# ADR-001: [Title]

## Context
[What's the situation? What problem are we solving?]

## Decision
[What did we decide to do?]

## Consequences
Positive:
- [Benefit 1]
- [Benefit 2]

Negative:
- [Cost/Trade-off 1]
- [Cost/Trade-off 2]

## Alternatives Considered
1. [Alternative A] - Rejected because [reason]
2. [Alternative B] - Rejected because [reason]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Date
[YYYY-MM-DD]
```

### Technical Proposal Review Checklist

```
□ Problem is clearly defined
□ Business impact is articulated
□ Alternatives are considered
□ Trade-offs are documented
□ Risk assessment is included
□ Implementation plan is realistic
□ Rollback plan exists
□ Success metrics are defined
□ Operational impact is assessed
□ Team has skills to implement
□ Aligns with technical strategy
□ Documentation plan exists
```

### Risk Register Template

| Risk | Likelihood | Impact | Mitigation | Owner | Status |
|------|------------|--------|------------|-------|--------|
| Database outage | Medium | High | Multi-AZ setup, backups | Alice | In Progress |
| Key engineer leaves | Low | High | Documentation, knowledge sharing | Bob | Complete |

---

## Integration with Other Skills

**This skill works with:**
- **engineering-management** - Team organization, hiring, career development
- **infrastructure-strategy** - Technology choices, build vs buy, roadmapping
- **engineering-operations-management** - SRE operations, incident management

**Technical skills for context:**
- **platform-engineering** - Understand what your platform team does
- **sre** - Understand reliability and operations
- **infrastructure-architecture** - Understand system design patterns

---

**Remember:** Your value as a technical leader is asking the right questions and making sound decisions based on trade-offs, not being the best coder. Trust your team's technical expertise while providing strategic direction and business context.
