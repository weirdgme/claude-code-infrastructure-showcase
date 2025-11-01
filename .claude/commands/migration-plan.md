---
description: Cloud migration or modernization plan with phases, risks, timeline
argument-hint: Describe what to migrate (e.g., "on-prem apps to AWS", "monolith to microservices", "VMs to Kubernetes")
---

Create a comprehensive migration plan for: $ARGUMENTS

## Instructions

Design a detailed migration strategy with phases, timeline, risks, and actionable steps.

### 1. Discovery & Assessment

**Gather Information:**

Ask user to provide:
- [ ] Current environment details (on-prem, cloud, hybrid)
- [ ] Applications to migrate (list, criticality)
- [ ] Infrastructure (servers, databases, storage)
- [ ] Dependencies and integrations
- [ ] Performance requirements
- [ ] Compliance/security requirements
- [ ] Timeline constraints
- [ ] Budget constraints

**Assessment Questions:**
- What is the business driver for migration?
- What are success criteria?
- What is risk tolerance?
- What are non-functional requirements (performance, availability)?
- Are there regulatory constraints?

### 2. Current State Analysis

**Document Current Architecture:**

Application Inventory:
```
For each application:
- Name and purpose
- Business criticality (critical, important, standard)
- Technology stack
- Dependencies (other apps, databases, services)
- Data volume
- Users/transactions
- Current performance baseline
```

Infrastructure Inventory:
```
- Servers (physical, virtual)
- Databases
- Storage (capacity, type)
- Network (bandwidth, connectivity)
- Monitoring and logging
```

**Pain Points:**
- Performance issues
- Scalability limitations
- Maintenance burden
- Cost inefficiencies
- Technical debt

### 3. Migration Strategy Selection

**The 6 R's Framework:**

For each application, recommend strategy:

**1. Rehost (Lift-and-Shift):**
```
When to use:
  - Quick migration needed
  - Minimal changes desired
  - Optimize later approach

Pros: Fast, low risk, minimal testing
Cons: No cloud optimization, limited benefits
Timeline: 2-4 weeks per application
```

**2. Replatform (Lift-Tinker-Shift):**
```
When to use:
  - Some cloud optimization desired
  - Managed services available
  - Balance speed vs optimization

Example: Move to RDS instead of EC2 with MySQL

Pros: Some cloud benefits, moderate effort
Cons: Still not fully cloud-native
Timeline: 4-8 weeks per application
```

**3. Repurchase (Replace):**
```
When to use:
  - SaaS alternative available
  - Legacy application
  - Maintenance burden high

Example: Replace custom CRM with Salesforce

Pros: No maintenance, modern features
Cons: Data migration, user training, subscription cost
Timeline: 8-16 weeks
```

**4. Refactor/Re-architect:**
```
When to use:
  - Maximum cloud benefits needed
  - Scalability critical
  - Willing to invest

Example: Monolith → Microservices, Containers, Serverless

Pros: Cloud-native, scalable, modern
Cons: High effort, significant testing
Timeline: 3-6 months per application
```

**5. Retire:**
```
When to use:
  - Application no longer needed
  - Redundant functionality
  - Better alternatives exist

Pros: Cost savings, reduced complexity
Cons: Ensure no dependencies
Timeline: 2-4 weeks (data archival)
```

**6. Retain:**
```
When to use:
  - Not ready for migration
  - Compliance reasons
  - End-of-life soon

Pros: No immediate effort
Cons: No cloud benefits
Timeline: N/A (revisit in 6-12 months)
```

### 4. Target Architecture Design

**Design Cloud Architecture:**

Compute:
- EC2, Containers (ECS/EKS), Serverless
- Auto-scaling strategies
- Instance types and sizing

Network:
- VPC design (subnets, routing)
- Connectivity (VPN, Direct Connect)
- Security groups and NACLs
- Load balancers

Storage:
- S3 for objects
- EBS for block storage
- EFS for shared file systems
- Database services (RDS, DynamoDB)

Security:
- IAM roles and policies
- Encryption (at rest, in transit)
- Secrets management
- Monitoring and logging

**Architecture Principles:**
- High availability (multi-AZ)
- Scalability (auto-scaling)
- Security (defense in depth)
- Cost optimization
- Operational excellence

### 5. Wave Planning

**Organize Migration into Waves:**

**Wave 1: Pilot (Weeks 1-4)**
```
Applications:
  - Non-critical applications
  - Simple architecture
  - Few dependencies

Goals:
  - Validate migration approach
  - Train team
  - Establish processes
  - Build confidence

Success Criteria:
  - Application functional in cloud
  - Performance acceptable
  - Team comfortable with process
```

**Wave 2: Low Risk (Weeks 5-10)**
```
Applications:
  - Important but not critical
  - Moderate complexity
  - Some dependencies managed

Goals:
  - Refine processes
  - Expand team skills
  - Increase migration velocity
```

**Wave 3: Medium Risk (Weeks 11-18)**
```
Applications:
  - Business-critical
  - Complex architecture
  - Multiple dependencies

Goals:
  - Leverage proven processes
  - Minimize business impact
  - High confidence in execution
```

**Wave 4: High Risk (Weeks 19-26)**
```
Applications:
  - Mission-critical
  - Most complex
  - Highest business impact

Goals:
  - Zero-downtime migration
  - Comprehensive testing
  - Rollback plan ready
```

### 6. Detailed Migration Steps

**Per Application Migration:**

**Week 1-2: Preparation**
- [ ] Architecture design
- [ ] Security review
- [ ] Performance baseline
- [ ] Create cloud resources (IaC)
- [ ] Setup monitoring
- [ ] Prepare data migration

**Week 3: Data Migration**
- [ ] Initial data sync
- [ ] Verify data integrity
- [ ] Test data access
- [ ] Plan incremental syncs

**Week 4: Application Migration**
- [ ] Deploy application
- [ ] Configure integrations
- [ ] Run smoke tests
- [ ] Performance testing
- [ ] Security testing

**Week 5: Cutover**
- [ ] Final data sync
- [ ] DNS/traffic cutover
- [ ] Monitor closely
- [ ] Verify functionality
- [ ] Decommission old (after validation period)

### 7. Risk Management

**Identify Risks and Mitigations:**

**Data Loss:**
```
Risk: Data corruption or loss during migration
Likelihood: Medium
Impact: High

Mitigation:
  - Multiple backups before migration
  - Data validation checksums
  - Test restore procedures
  - Incremental sync with validation
  - Rollback plan
```

**Downtime:**
```
Risk: Extended downtime during cutover
Likelihood: Medium
Impact: High

Mitigation:
  - Blue-green deployment
  - DNS cutover (quick rollback)
  - Maintenance window during low traffic
  - Comprehensive testing
```

**Performance Degradation:**
```
Risk: Application slower in cloud
Likelihood: Medium
Impact: Medium

Mitigation:
  - Performance testing before cutover
  - Right-sized instances
  - Monitoring and alerting
  - Optimization plan ready
```

**Budget Overrun:**
```
Risk: Migration costs exceed budget
Likelihood: Medium
Impact: Medium

Mitigation:
  - Detailed cost estimates
  - Track costs throughout
  - Cost alerts configured
  - Contingency budget (20%)
```

**Skills Gap:**
```
Risk: Team lacks cloud expertise
Likelihood: High
Impact: Medium

Mitigation:
  - Training program
  - Hire cloud experts
  - Partner with cloud consultants
  - Knowledge transfer
```

### 8. Testing Strategy

**Testing Phases:**

Functional Testing:
- [ ] All features working
- [ ] Integrations functional
- [ ] User acceptance testing

Performance Testing:
- [ ] Load testing
- [ ] Stress testing
- [ ] Compare to baseline
- [ ] Latency acceptable

Security Testing:
- [ ] Penetration testing
- [ ] Vulnerability scanning
- [ ] Access control verification
- [ ] Compliance validation

Disaster Recovery Testing:
- [ ] Backup and restore
- [ ] Failover testing
- [ ] Data recovery
- [ ] RTO/RPO validation

### 9. Rollback Plan

**For Each Migration:**

Rollback Triggers:
- Critical functionality broken
- Performance >50% degradation
- Data integrity issues
- Security vulnerabilities

Rollback Procedure:
1. Stop new traffic to cloud
2. Route traffic back to on-prem
3. Sync any new data back
4. Investigate and fix issues
5. Re-plan cutover

Maximum Rollback Time: X hours

### 10. Communication Plan

**Stakeholder Updates:**

Pre-Migration:
- T-30 days: Migration announcement
- T-14 days: Detailed timeline
- T-7 days: Final preparation notice
- T-1 day: Maintenance window reminder

During Migration:
- Hourly updates during cutover
- Status page updates
- Issue escalation procedures

Post-Migration:
- Completion notification
- Performance summary
- Next wave preview

### 11. Success Criteria

**Migration Success Metrics:**

Functional:
- [ ] All features working
- [ ] All integrations functional
- [ ] User acceptance passed

Performance:
- [ ] Response time within 10% of baseline
- [ ] Error rate <1%
- [ ] Availability >99.9%

Business:
- [ ] Zero data loss
- [ ] Downtime within SLA
- [ ] Budget within 10%
- [ ] Timeline met

### 12. Output Format

Provide comprehensive migration plan:

**Executive Summary:**
- Migration scope
- Timeline (X weeks)
- Budget estimate
- Business benefits
- Success criteria

**Current State:**
- Application inventory
- Infrastructure summary
- Dependencies
- Pain points

**Migration Strategy:**
- Strategy per application (6 R's)
- Wave planning
- Timeline

**Target Architecture:**
- Cloud design
- Network diagram
- Security architecture
- Cost estimate

**Detailed Roadmap:**
- Wave 1: Pilot (Weeks 1-4)
- Wave 2: Low Risk (Weeks 5-10)
- Wave 3: Medium Risk (Weeks 11-18)
- Wave 4: High Risk (Weeks 19-26)

**Risk Management:**
- Risk register
- Mitigation strategies
- Rollback procedures

**Resource Plan:**
- Team structure
- Skills required
- Training needs
- External support

Provide realistic timelines and be comprehensive in risk assessment.
