# Change Management

Change Advisory Board (CAB) processes, approval workflows, change types, risk assessment, and rollback procedures for managing IT changes safely.

## Table of Contents

- [Change Management Overview](#change-management-overview)
- [Change Types](#change-types)
- [Change Process](#change-process)
- [Change Advisory Board](#change-advisory-board)
- [Risk Assessment](#risk-assessment)
- [Rollback Procedures](#rollback-procedures)
- [Best Practices](#best-practices)

## Change Management Overview

### Purpose

Change management (or "Change Enablement" in ITIL 4) ensures:
- Maximum successful changes
- Minimum service disruption
- Proper assessment of risks
- Stakeholder communication
- Learning from changes

### Key Principles

```
Balance:     Speed vs Stability
Assessment:  Risk vs Reward
Planning:    Preparation vs Action
Review:      Learn from every change
```

### Change Management Benefits

**Risk Mitigation:**
- Structured assessment process
- Impact analysis before implementation
- Rollback plans for failures
- Testing requirements

**Communication:**
- Stakeholders informed
- Scheduled maintenance windows
- Change calendars
- Status updates

**Compliance:**
- Audit trail
- Approval documentation
- Regulatory requirements
- Change records

## Change Types

### Standard Change

**Characteristics:**
```yaml
Definition: Pre-approved, low risk, well-understood change

Examples:
  - Password reset
  - Standard software installation
  - User account creation/deletion
  - Adding users to security groups
  - Certificate renewal (routine)

Approval: Pre-authorized (no CAB needed)
Risk: Low
Documentation: Standardized procedure
Automation: Often automated
Timeline: Immediate or scheduled
```

**Standard Change Example:**
```yaml
Standard Change: New Employee Laptop Setup

Pre-Approved By: IT Management
Valid Until: 2025-12-31
Review Frequency: Annually

Procedure:
  1. Receive new hire request
  2. Verify manager approval
  3. Select laptop from standard models
  4. Install corporate image
  5. Configure per role template
  6. Test functionality
  7. Ship to employee
  8. Send setup instructions

Average Duration: 2 hours
Failure Rate: <1%
Rollback: Return to IT for rebuild
```

### Normal Change

**Characteristics:**
```yaml
Definition: Requires assessment and authorization

Examples:
  - Server upgrades
  - Network configuration changes
  - Application deployments (non-standard)
  - Database schema changes
  - Firewall rule changes

Approval: CAB or Change Manager
Risk: Medium to High
Documentation: Detailed change proposal (RFC)
Testing: Required
Timeline: Scheduled in change window
```

**Normal Change Request Template:**
```yaml
Request for Change (RFC): CHG-12345

Requestor: John Smith (Application Team)
Date Submitted: 2024-11-01
Service: Customer Portal
Priority: Medium

Change Description:
  Deploy Customer Portal v2.5.0 to production
  - New payment processing feature
  - Bug fixes for login issues
  - Performance improvements

Business Justification:
  - Support new payment providers (business requirement)
  - Fix customer-reported login issues
  - Improve page load times by 30%

Implementation Plan:
  1. Backup current production database
  2. Deploy new application version (Blue-Green deployment)
  3. Run smoke tests
  4. Switch traffic to new version
  5. Monitor for 30 minutes
  6. Decommission old version

Scheduled Time:
  Start: 2024-11-10 02:00 AM
  End: 2024-11-10 04:00 AM
  Duration: 2 hours
  Window: Sunday early morning (low traffic)

Impact:
  Service Affected: Customer Portal
  Downtime: 5 minutes (during traffic switch)
  Users Affected: All customers (~50,000)
  Blackout Period: Avoid

Risk Assessment:
  Overall Risk: Medium

  Risks:
    - New payment feature may have bugs
      Mitigation: Extensive testing in staging
      Likelihood: Low
      Impact: Medium

    - Database migration may fail
      Mitigation: Test migration in staging, have backup
      Likelihood: Very Low
      Impact: High

Testing:
  - Unit tests: Passed (100% coverage)
  - Integration tests: Passed
  - UAT: Completed by business team
  - Performance testing: Passed (meets targets)
  - Security scan: Passed (no critical issues)

Rollback Plan:
  1. Switch traffic back to old version (30 seconds)
  2. Restore database from backup if needed (15 minutes)
  3. Communicate to stakeholders
  4. Investigate and reschedule

Communication Plan:
  - T-7 days: Email to customers (maintenance notice)
  - T-1 day: Status page update
  - T-0: Status page (maintenance in progress)
  - T+0: Status page (maintenance complete)
  - T+incident: Incident communication if rollback needed

CAB Review: 2024-11-05
Approved By: Change Manager
Implementation Team: Application Team (3 engineers on call)
```

### Emergency Change

**Characteristics:**
```yaml
Definition: Must be implemented ASAP to resolve incident

Examples:
  - Critical security patch
  - Service restoration after outage
  - Data corruption fix
  - Security breach response

Approval: Expedited (Emergency CAB or authorized manager)
Risk: Variable (often high due to urgency)
Documentation: Can be completed retrospectively
Testing: Minimal (risk accepted)
Timeline: Immediate
```

**Emergency Change Process:**
```
Incident Occurs
     ↓
Emergency Change Request Created
     ↓
Emergency CAB Convened (or authorized approver)
     ↓
Quick Risk Assessment
     ↓
Approval/Rejection
     ↓
Immediate Implementation
     ↓
Post-Implementation Review (within 24 hours)
```

**Emergency Change Example:**
```yaml
Emergency Change: EMCHG-789

Trigger: Critical security vulnerability (CVE-2024-XXXXX)
Severity: Critical (CVSS 9.8)
Impact: Remote code execution possible

Description:
  Apply emergency security patch to all web servers

Approval: Emergency CAB (CTO, CISO, Ops Manager)
Approved At: 2024-11-01 14:30
Implementation: Immediate

Implementation:
  1. Patch staging servers (verify functionality)
  2. Patch production servers (rolling update)
  3. Verify patch applied
  4. Monitor for issues

Risk Accepted:
  - Minimal testing (patch from vendor)
  - Potential service disruption
  - Urgency outweighs standard testing

Post-Implementation Review:
  Date: 2024-11-02 10:00
  Outcome: Successful, no issues
  Lessons: Need faster patch deployment process
```

## Change Process

### RFC Lifecycle

```
Draft → Submitted → Assessment → CAB Review → Approved/Rejected
                                                      ↓
                                              Scheduled → Implemented → Review → Closed
```

### Detailed Process Steps

**1. Submit RFC:**
```
Change Requestor:
  - Complete RFC form
  - Provide all required information
  - Attach supporting documents
  - Submit for assessment
```

**2. Assessment:**
```
Change Manager:
  - Review completeness
  - Validate technical details
  - Assess impact and risk
  - Check change calendar
  - Add to CAB agenda
```

**3. CAB Review:**
```
CAB Members:
  - Review RFC details
  - Ask clarifying questions
  - Assess risks vs benefits
  - Check resource availability
  - Approve, reject, or request changes
```

**4. Schedule:**
```
Change Scheduler:
  - Coordinate with change calendar
  - Avoid conflicts
  - Reserve change window
  - Notify stakeholders
```

**5. Implement:**
```
Implementation Team:
  - Follow implementation plan
  - Update change status
  - Document actual changes
  - Report any deviations
```

**6. Review:**
```
Change Manager:
  - Verify successful implementation
  - Review any issues
  - Update documentation
  - Close change record
```

**7. PIR (Post-Implementation Review):**
```
For major changes:
  - What went well?
  - What could be improved?
  - Lessons learned
  - Process improvements
```

## Change Advisory Board

### CAB Purpose

The CAB:
- Reviews and authorizes changes
- Assesses risks and impacts
- Prioritizes changes
- Resolves scheduling conflicts

### CAB Membership

**Core Members:**
- Change Manager (chair)
- Service Owner representatives
- Technical experts (infrastructure, application, security)
- Business representatives

**Extended Members (as needed):**
- Vendors
- Compliance/audit
- External consultants

### CAB Meeting Cadence

```yaml
Weekly CAB:
  Schedule: Every Wednesday 2pm
  Duration: 1 hour
  Agenda:
    - Review upcoming changes (next 2 weeks)
    - Assess new RFC submissions
    - Review previous week's changes
    - Update change calendar

Emergency CAB:
  Schedule: As needed (emergency changes)
  Duration: 15-30 minutes
  Convened: Via email/chat
  Decision: Expedited approval process
```

### CAB Meeting Agenda Template

```
Change Advisory Board Meeting
Date: 2024-11-06 2:00 PM

1. Review of Previous Week's Changes (15 min)
   - CHG-12340: Success
   - CHG-12341: Rollback (database timeout)
   - CHG-12342: Success
   - Action: PIR scheduled for CHG-12341

2. New RFC Reviews (30 min)
   - CHG-12345: Customer Portal v2.5.0 deployment
     Status: Recommend approval
     Schedule: 2024-11-10 2am

   - CHG-12346: Firewall rule change
     Status: Request more testing

   - CHG-12347: Email server upgrade
     Status: Approved
     Schedule: 2024-11-12 6pm

3. Change Calendar Review (10 min)
   - Week of Nov 11: 5 changes scheduled
   - Thanksgiving freeze: Nov 25-29
   - Year-end freeze: Dec 20 - Jan 5

4. Metrics Review (5 min)
   - Success rate: 94% (target >90%)
   - Emergency changes: 2 (target <5/month)
   - Rolled back: 3 of 50 changes
```

## Risk Assessment

### Risk Factors

**Technical Risk:**
- Complexity of change
- Technology maturity
- Team experience
- Testing coverage

**Business Risk:**
- Number of users affected
- Business criticality
- Timing (busy period)
- Regulatory impact

**Implementation Risk:**
- Change window duration
- Rollback complexity
- Dependencies on other changes
- Resource availability

### Risk Matrix

```
┌───────────────────────────────────────────┐
│     Likelihood vs Impact                  │
├───────────────────────────────────────────┤
│         │ Low │ Med │ High │ Critical    │
│─────────┼─────┼─────┼──────┼────────────│
│ Likely  │ Med │ High│ High │ Critical   │
│ Poss    │ Low │ Med │ High │ High       │
│ Unlikely│ Low │ Low │ Med  │ High       │
│ Rare    │ Low │ Low │ Low  │ Med        │
└───────────────────────────────────────────┘

Risk Levels:
  Critical: Requires executive approval
  High: CAB escalation, extensive mitigation
  Medium: Standard CAB review
  Low: Change manager approval
```

### Risk Mitigation Strategies

```yaml
Risk: Database migration may corrupt data

Mitigation:
  Before:
    - Full database backup
    - Test migration in staging
    - Validate data integrity checks
    - Document rollback procedure

  During:
    - Run in maintenance window
    - Monitor migration progress
    - Validate each step
    - Ready rollback scripts

  After:
    - Verify data integrity
    - Compare record counts
    - Spot-check critical records
    - Monitor application logs
```

## Rollback Procedures

### Rollback Planning

Every change must have a rollback plan:
- How to undo the change
- How long rollback takes
- Who can authorize rollback
- Data recovery procedures

### Rollback Decision Criteria

```yaml
Rollback Triggers:
  - Critical functionality broken
  - Data corruption detected
  - Security vulnerability introduced
  - Performance degradation >50%
  - Error rate >10% above baseline
  - Customer-facing service down

Decision Authority:
  - Implementation team: Can initiate rollback
  - Change Manager: Must approve rollback
  - Incident Manager: Can require rollback
```

### Rollback Examples

**Application Deployment Rollback:**
```bash
# Blue-Green Deployment Rollback

# 1. Switch load balancer back to blue (old version)
kubectl patch service customer-portal -p '{"spec":{"selector":{"version":"blue"}}}'

# 2. Verify traffic routing to old version
curl https://portal.company.com/health

# 3. Keep green (new version) running for investigation
# Scale down after issue identified

# 4. Notify stakeholders
./notify-rollback.sh CHG-12345

# Rollback Time: 30 seconds
```

**Database Change Rollback:**
```sql
-- Rollback procedure for schema change

-- 1. Restore from backup (if data changed)
pg_restore -d production backup_pre_chg12345.dump

-- 2. OR run rollback script (if reversible)
BEGIN TRANSACTION;

  -- Undo schema changes
  DROP INDEX idx_customer_email;
  ALTER TABLE customers DROP COLUMN loyalty_points;

  -- Verify
  SELECT COUNT(*) FROM customers;

COMMIT;

-- Rollback Time: 15 minutes (backup restore)
--              : 2 minutes (SQL rollback)
```

**Infrastructure Rollback:**
```hcl
# Terraform infrastructure rollback

# 1. Revert to previous Terraform state
terraform state pull > current.tfstate
cp backup_chg12345.tfstate terraform.tfstate

# 2. Apply previous configuration
terraform apply -auto-approve

# 3. Verify infrastructure
terraform plan  # Should show no changes

# Rollback Time: 10 minutes
```

## Best Practices

### 1. Change Windows

**Establish standard change windows:**
```yaml
Production Changes:
  - Sunday 2am-6am (Preferred)
  - Saturday 2am-6am (Alternative)
  - Weekday 2am-4am (Emergency only)

Non-Production:
  - Anytime during business hours

Blackout Periods:
  - Black Friday (retail)
  - Tax season (finance)
  - Quarter-end close (all)
  - Major holidays
```

### 2. Change Calendar

**Maintain visible change calendar:**
- Shows all scheduled changes
- Identifies conflicts
- Tracks change freezes
- Public to stakeholders

### 3. Automation

**Automate standard changes:**
```yaml
Automated Changes:
  - Password resets
  - User provisioning
  - Certificate renewals
  - Security patching (tested)
  - Backup scheduling
  - Report generation

Benefits:
  - Faster execution
  - Fewer errors
  - Consistent process
  - Reduced CAB burden
```

### 4. Testing Requirements

```yaml
Change Testing Levels:

Low Risk (Standard):
  - Basic functionality test
  - Automated tests pass

Medium Risk:
  - Full regression testing
  - UAT by business
  - Performance testing
  - Security scan

High Risk:
  - All medium risk tests
  - Load testing
  - Disaster recovery test
  - Pilot deployment
```

### 5. Change Metrics

**Track and improve:**
```yaml
Change Management KPIs:

Success Metrics:
  - Change success rate: >90%
  - Rollback rate: <10%
  - Emergency changes: <10% of total
  - Changes completed on time: >95%

Efficiency:
  - RFC to approval time: <5 days
  - Standard change duration: <1 hour
  - CAB meeting duration: <1 hour

Quality:
  - Changes causing incidents: <5%
  - Unauthorized changes: 0
  - Documentation complete: 100%
```

### 6. Communication

**Stakeholder communication:**
```yaml
Before Change:
  - T-7 days: Initial notification
  - T-1 day: Reminder
  - T-1 hour: Maintenance starting soon

During Change:
  - Status page updates
  - Progress notifications
  - Issue escalation if needed

After Change:
  - Completion notification
  - Service restored
  - Summary of changes
```

### 7. Continuous Improvement

**Learn from every change:**
- Post-implementation reviews for major changes
- Root cause analysis for failures
- Update standard procedures
- Refine risk assessments
- Share lessons learned

## Common Pitfalls

❌ **Skipping change management** - "Too urgent for process"
❌ **Incomplete RFC** - Missing critical information
❌ **No rollback plan** - Hope it works
❌ **Insufficient testing** - Test in production
❌ **Poor communication** - Surprise downtime
❌ **Conflicting changes** - Multiple changes same window
❌ **No approval** - Implement without authorization
❌ **Inadequate documentation** - Can't repeat or troubleshoot

---

**Related Resources:**
- [itil-framework.md](itil-framework.md) - ITIL change enablement practice
- [release-engineering](../../release-engineering/) - CI/CD and deployment strategies
- [incident-service-management.md](incident-service-management.md) - Handling change-related incidents
