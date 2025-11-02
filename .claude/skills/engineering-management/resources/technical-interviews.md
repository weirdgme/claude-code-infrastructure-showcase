# Technical Interview Question Banks

**Comprehensive question banks for interviewing infrastructure engineers across domains.**

---

## Interview Philosophy

**What we're assessing:**
1. **Technical depth:** Do they know their domain?
2. **Problem-solving:** How do they approach problems?
3. **Communication:** Can they explain complex topics clearly?
4. **Trade-offs:** Do they understand the "why" behind decisions?
5. **Growth:** Do they learn and adapt?

**What we're NOT doing:**
- Gotcha questions or trivia
- Whiteboard coding (unless role-specific)
- Memorization tests
- Puzzle questions with no real-world relevance

---

## Platform Engineering Questions

### Kubernetes

**Junior/Mid-level (L3-L4):**

1. **"Explain what happens when you run `kubectl apply -f deployment.yaml`"**
   - Looking for: Understanding of K8s API, controllers, reconciliation loop
   - Follow-up: "What if the deployment already exists?"

2. **"How does service discovery work in Kubernetes?"**
   - Looking for: Services, DNS, kube-proxy, networking basics
   - Follow-up: "What's the difference between ClusterIP, NodePort, and LoadBalancer?"

3. **"You deploy a new version of your app and it's crashlooping. How do you debug?"**
   - Looking for: kubectl logs, describe, events; systematic approach
   - Follow-up: "What if logs don't show anything useful?"

4. **"What's the difference between a Deployment, StatefulSet, and DaemonSet?"**
   - Looking for: Use cases, stateful vs stateless, scheduling
   - Follow-up: "When would you use each one?"

**Senior (L5):**

5. **"Design a multi-tenant Kubernetes architecture where tenants are isolated"**
   - Looking for: Namespaces, RBAC, network policies, resource quotas
   - Follow-up: "How do you handle shared resources like storage?"

6. **"Explain Kubernetes networking in depth"**
   - Looking for: CNI, pod-to-pod, pod-to-service, ingress/egress
   - Follow-up: "How does service mesh fit into this?"

7. **"Your K8s cluster is running out of capacity. Walk me through scaling options"**
   - Looking for: Horizontal pod autoscaling, cluster autoscaling, node sizing
   - Follow-up: "What metrics would you use for autoscaling?"

8. **"Design a GitOps workflow for managing 100+ K8s clusters"**
   - Looking for: ArgoCD/Flux, Git as source of truth, promotion strategies
   - Follow-up: "How do you handle secrets and environment-specific config?"

**Staff+ (L6+):**

9. **"Design a Kubernetes platform for 200 engineers across 50 teams"**
   - Looking for: Multi-tenancy, self-service, guardrails, cost management
   - Follow-up: "How do you prevent one tenant from impacting others?"

10. **"Explain your approach to Kubernetes upgrades across 20+ clusters"**
    - Looking for: Upgrade strategy, testing, rollback, minimal downtime
    - Follow-up: "What's your process for testing breaking changes?"

### Infrastructure as Code

**Junior/Mid-level (L3-L4):**

11. **"What is Terraform state and why does it matter?"**
    - Looking for: State management, locking, backends, collaboration
    - Follow-up: "What problems arise with state management?"

12. **"How do you structure Terraform code for multiple environments?"**
    - Looking for: Workspaces, modules, separate state files, variables
    - Follow-up: "What are the trade-offs of each approach?"

13. **"Walk me through how you would provision a VPC with Terraform"**
    - Looking for: Resources, dependencies, variables, outputs
    - Follow-up: "How do you handle CIDR ranges across environments?"

**Senior (L5):**

14. **"Design a Terraform module structure for a large organization"**
    - Looking for: Module composition, versioning, testing, documentation
    - Follow-up: "How do you prevent breaking changes?"

15. **"Compare Terraform vs Pulumi vs CloudFormation - when would you use each?"**
    - Looking for: Trade-offs, use cases, team skills, cloud provider lock-in
    - Follow-up: "How do you migrate between tools?"

16. **"How do you handle secrets and sensitive data in IaC?"**
    - Looking for: Separate secret management, encryption, vaults, never commit
    - Follow-up: "What about API keys needed during provisioning?"

**Staff+ (L6+):**

17. **"Design an IaC strategy for multi-cloud (AWS + Azure + GCP)"**
    - Looking for: Abstraction levels, provider selection, common patterns
    - Follow-up: "How do you prevent vendor lock-in while staying pragmatic?"

18. **"Explain your approach to infrastructure drift detection and remediation"**
    - Looking for: Drift detection tools, CI/CD integration, enforcement strategies
    - Follow-up: "How do you balance manual changes vs strict enforcement?"

### CI/CD

**Junior/Mid-level (L3-L4):**

19. **"Design a CI/CD pipeline for a web application"**
    - Looking for: Build, test, deploy stages, artifact storage, environments
    - Follow-up: "How do you handle database migrations?"

20. **"Explain the difference between continuous delivery and continuous deployment"**
    - Looking for: Manual approval gate vs fully automated
    - Follow-up: "When would you choose one over the other?"

21. **"How do you implement blue-green deployment?"**
    - Looking for: Two environments, traffic switching, rollback capability
    - Follow-up: "What are the challenges and trade-offs?"

**Senior (L5):**

22. **"Design a deployment pipeline with staging, canary, and production"**
    - Looking for: Progressive rollout, metrics-based promotion, automated rollback
    - Follow-up: "What metrics would trigger rollback?"

23. **"How do you secure a CI/CD pipeline?"**
    - Looking for: Secrets management, access control, image scanning, SBOM
    - Follow-up: "Where are the most common security vulnerabilities?"

24. **"Design a pipeline for a monorepo with 20 services"**
    - Looking for: Selective builds, dependency graph, parallel execution
    - Follow-up: "How do you optimize build time?"

**Staff+ (L6+):**

25. **"Design a deployment system for 100+ microservices"**
    - Looking for: Self-service, templates, safety rails, observability
    - Follow-up: "How do you enforce standards without blocking teams?"

26. **"Explain your strategy for handling breaking changes in shared services"**
    - Looking for: API versioning, gradual migration, consumer coordination
    - Follow-up: "How do you deprecate old versions?"

---

## SRE Questions

### Incident Response

**All levels:**

27. **"It's 3 AM. You get paged: API p99 latency jumped from 100ms to 5s. Walk me through your response."**
    - Looking for: Systematic approach, triage, mitigation vs resolution
    - L3-L4: Follow runbook, escalate appropriately
    - L5: Lead investigation, coordinate response
    - L6+: Design systems to prevent this class of incident

28. **"After resolving an incident, what do you do?"**
    - Looking for: Postmortem, action items, learning, prevention
    - Follow-up: "How do you ensure action items get completed?"

29. **"Describe a time you debugged a complex production issue"**
    - Looking for: Problem-solving approach, tools used, collaboration
    - Follow-up: "What did you learn? How did you prevent recurrence?"

### SLO/SLI/SLA

**Junior/Mid-level (L3-L4):**

30. **"Explain the difference between SLI, SLO, and SLA"**
    - Looking for: Clear definitions, examples
    - SLI: Metric (e.g., p99 latency)
    - SLO: Target (e.g., p99 < 200ms, 99.9% of time)
    - SLA: Contract with customer (external)

31. **"How would you choose SLIs for a web API?"**
    - Looking for: Availability, latency, throughput, error rate
    - Follow-up: "Which percentiles matter? Why?"

**Senior (L5):**

32. **"Design SLOs for a payment processing service"**
    - Looking for: Business alignment, measurable, realistic, four golden signals
    - Follow-up: "How do you set targets? What's the error budget?"

33. **"Your SLO is being breached. What do you do?"**
    - Looking for: Incident response, communication, prioritization
    - Follow-up: "How do you use error budgets to make decisions?"

**Staff+ (L6+):**

34. **"Design an org-wide SLO framework for 50+ services"**
    - Looking for: Standardization, tooling, measurement, reporting
    - Follow-up: "How do you handle services with different criticality?"

### Monitoring & Observability

**Junior/Mid-level (L3-L4):**

35. **"What's the difference between metrics, logs, and traces?"**
    - Looking for: Three pillars of observability, use cases for each
    - Follow-up: "When would you use each one?"

36. **"How do you design an alert that doesn't cause alert fatigue?"**
    - Looking for: Actionable, paged only for real issues, clear runbook
    - Follow-up: "What makes a bad alert?"

**Senior (L5):**

37. **"Explain distributed tracing and why it's useful"**
    - Looking for: Trace context, spans, service dependencies, latency debugging
    - Follow-up: "How do you implement tracing in microservices?"

38. **"Design a monitoring strategy for a microservices architecture"**
    - Looking for: Service-level metrics, inter-service traces, log aggregation
    - Follow-up: "How do you handle cardinality explosion?"

**Staff+ (L6+):**

39. **"Design an observability platform for the entire organization"**
    - Looking for: Tool selection, cost management, adoption strategy
    - Follow-up: "How do you balance cost vs. visibility?"

---

## Security Engineering Questions

### Application Security

**Junior/Mid-level (L3-L4):**

40. **"What's the OWASP Top 10? Pick one and explain it."**
    - Looking for: Awareness of common vulnerabilities, SQL injection, XSS, etc.
    - Follow-up: "How do you prevent this vulnerability?"

41. **"Explain how you'd implement secrets management for applications"**
    - Looking for: Don't hardcode, use vault/secrets manager, rotation
    - Follow-up: "What about local development?"

42. **"What's SAST vs DAST vs SCA?"**
    - Looking for: Static vs dynamic vs supply chain analysis
    - Follow-up: "When in the pipeline should each run?"

**Senior (L5):**

43. **"Design a secure CI/CD pipeline"**
    - Looking for: Image scanning, secrets scanning, SBOM, signed artifacts
    - Follow-up: "How do you handle vulnerabilities found in production?"

44. **"Explain Zero Trust architecture"**
    - Looking for: Never trust, always verify, micro-segmentation, identity-based
    - Follow-up: "How do you implement this in practice?"

45. **"How would you secure a Kubernetes cluster?"**
    - Looking for: RBAC, network policies, pod security policies, image scanning
    - Follow-up: "What about secrets management?"

**Staff+ (L6+):**

46. **"Design a security program for a 200-engineer organization"**
    - Looking for: AppSec, infrastructure security, compliance, training
    - Follow-up: "How do you balance security vs developer velocity?"

47. **"Explain your approach to compliance automation (SOC2, ISO 27001)"**
    - Looking for: Policy as code, evidence collection, continuous compliance
    - Follow-up: "How do you handle exceptions and special cases?"

### Threat Modeling & Incident Response

**All levels:**

48. **"Walk me through how you'd threat model this system: [present architecture]"**
    - Looking for: STRIDE or similar framework, systematic approach
    - Follow-up: "What mitigations would you recommend?"

49. **"You discover a critical vulnerability in production. What do you do?"**
    - Looking for: Assess risk, patch quickly, communicate, postmortem
    - Follow-up: "How do you balance speed vs thoroughness?"

---

## Cloud Engineering Questions

### AWS

**Junior/Mid-level (L3-L4):**

50. **"Explain the difference between EC2, ECS, and Lambda"**
    - Looking for: VMs vs containers vs serverless, use cases
    - Follow-up: "When would you use each?"

51. **"How do you design a VPC?"**
    - Looking for: Public/private subnets, NAT gateway, security groups, CIDR
    - Follow-up: "How do you handle multi-AZ?"

52. **"What's the difference between S3 storage classes?"**
    - Looking for: Standard, IA, Glacier - cost vs access frequency
    - Follow-up: "How do you optimize storage costs?"

**Senior (L5):**

53. **"Design a highly available, multi-region architecture on AWS"**
    - Looking for: Route53, ALB, RDS multi-AZ, data replication
    - Follow-up: "How do you handle failover?"

54. **"Explain your approach to AWS cost optimization"**
    - Looking for: Right-sizing, reserved instances, spot, S3 lifecycle
    - Follow-up: "How do you track and allocate costs?"

55. **"Design a zero-trust network on AWS"**
    - Looking for: Private subnets, VPC endpoints, IAM, encryption
    - Follow-up: "How do you handle third-party integrations?"

**Staff+ (L6+):**

56. **"Design a multi-account AWS strategy for an enterprise"**
    - Looking for: AWS Organizations, account structure, IAM federation
    - Follow-up: "How do you handle centralized logging and security?"

### Multi-Cloud

**Senior+ (L5+):**

57. **"Compare AWS, Azure, and GCP - strengths and weaknesses"**
    - Looking for: Realistic trade-offs, not just "AWS is best"
    - Follow-up: "When would you choose Azure over AWS?"

58. **"Design a multi-cloud strategy to avoid vendor lock-in"**
    - Looking for: Abstraction layers, Terraform, Kubernetes as common platform
    - Follow-up: "What are the costs and trade-offs of multi-cloud?"

---

## Behavioral/Situational Questions

### For All Roles

**Collaboration:**
59. **"Tell me about a time you disagreed with a technical decision. How did you handle it?"**
    - Looking for: Respectful disagreement, data-driven argument, willingness to disagree and commit

60. **"Describe a time you had to work with a difficult teammate"**
    - Looking for: Empathy, communication, conflict resolution

**Problem-Solving:**
61. **"Tell me about the most complex technical problem you've solved"**
    - Looking for: Analytical thinking, systematic approach, persistence

62. **"Describe a time you made a technical decision that turned out to be wrong. What did you learn?"**
    - Looking for: Ownership, learning, adaptation

**Leadership:**
63. **"Tell me about a time you mentored someone"**
    - Looking for: Teaching ability, patience, investment in others

64. **"Describe a situation where you improved a process or system"**
    - Looking for: Initiative, impact, follow-through

**Growth:**
65. **"How do you stay current with technology?"**
    - Looking for: Continuous learning, experimentation, community engagement

66. **"Tell me about a time you had to learn something completely new under tight deadline"**
    - Looking for: Learning agility, resourcefulness, grit

---

## System Design Questions

### Platform Engineering

67. **"Design a deployment system for 100 microservices"**
    - Looking for: GitOps, progressive rollout, self-service, observability
    - 30-40 min discussion, whiteboard/diagram

68. **"Design a developer platform that enables teams to deploy to K8s"**
    - Looking for: Abstractions, templates, guardrails, documentation
    - Assess: Architecture thinking, trade-offs, user empathy

### SRE

69. **"Design a monitoring and alerting system for a microservices application"**
    - Looking for: Service mesh observability, distributed tracing, SLO-based alerting
    - Assess: Observability best practices, scalability

70. **"Design a disaster recovery strategy for this system: [present architecture]"**
    - Looking for: RTO/RPO, backup strategy, runbooks, testing
    - Assess: Risk assessment, operational thinking

### Security

71. **"Design a secrets management system for 50+ services"**
    - Looking for: Vault/secrets manager, rotation, access control, audit
    - Assess: Security depth, operational considerations

72. **"Design a security scanning pipeline for containers"**
    - Looking for: Image scanning, CVE management, policy enforcement
    - Assess: Security + developer experience balance

---

## Red Flags in Answers

Watch for:
- **Blaming others:** "My team didn't understand Kubernetes"
- **No trade-offs:** Everything is "the best" without nuance
- **No depth:** Surface-level answers, can't go deeper when probed
- **Arrogance:** "I'm the only one who could do it"
- **No learning:** Can't cite recent learning or mistakes
- **Buzz

word bingo:** Using terms without understanding
- **No questions:** Doesn't ask clarifying questions in design problems

---

## Evaluation Rubrics

### Technical Depth

| Score | Description |
|-------|-------------|
| 1 | Surface-level knowledge, significant gaps |
| 2 | Basic understanding, struggles with follow-ups |
| 3 | Solid fundamentals, can discuss trade-offs |
| 4 | Deep expertise, insightful answers |
| 5 | Expert level, teaches interviewer something new |

### Problem-Solving

| Score | Description |
|-------|-------------|
| 1 | Jumps to solution without analysis |
| 2 | Some structure, but misses key considerations |
| 3 | Systematic approach, asks clarifying questions |
| 4 | Thoughtful analysis, considers alternatives |
| 5 | Exceptional problem-solving, innovative solutions |

### Communication

| Score | Description |
|-------|-------------|
| 1 | Unclear, rambling, hard to follow |
| 2 | Somewhat clear but disorganized |
| 3 | Clear explanation, organized thoughts |
| 4 | Very clear, adapts to audience |
| 5 | Exceptional communication, visual aids, examples |

---

## Key Takeaways for Interviewers

1. **Ask open-ended questions** that reveal thinking process
2. **Probe deeper** - don't accept surface-level answers
3. **Assess trade-offs** - "What are the pros/cons of your approach?"
4. **Look for learning** - Can they admit mistakes and learn?
5. **Evaluate collaboration** - How do they work with others?
6. **Be consistent** - Ask same questions to compare candidates
7. **Take notes** - Record specific examples for calibration
8. **Focus on potential** - Hire for growth, not just current skills
9. **Avoid gotchas** - Real-world problems, not trivia
10. **Sell the role** - Interviewing is two-way, make them want to join

Great interviews reveal how candidates think, not just what they know.
