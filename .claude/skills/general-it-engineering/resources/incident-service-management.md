# Incident and Problem Management

Incident classification, escalation procedures, problem management, root cause analysis, and known error database for resolving and preventing IT issues.

## Table of Contents

- [Incident Management](#incident-management)
- [Incident Classification](#incident-classification)
- [Escalation Procedures](#escalation-procedures)
- [Problem Management](#problem-management)
- [Root Cause Analysis](#root-cause-analysis)
- [Known Error Database](#known-error-database)
- [Best Practices](#best-practices)

## Incident Management

### Purpose

**Incident:** Unplanned interruption or reduction in quality of service.

**Goals:**
- Restore normal service as quickly as possible
- Minimize business impact
- Maintain quality of service levels
- Meet SLA targets

### Incident vs Problem vs Request

```yaml
Incident:
  Definition: Service disruption or degradation
  Example: Email server down, application error
  Goal: Restore service quickly
  Owner: Service desk / Incident Manager

Problem:
  Definition: Unknown root cause of one or more incidents
  Example: Why do email servers crash every week?
  Goal: Find and fix root cause
  Owner: Problem Manager

Service Request:
  Definition: Request for service or information
  Example: New laptop, password reset, access request
  Goal: Fulfill request
  Owner: Service desk / Fulfillment team
```

### Incident Lifecycle

```
Detection
    ↓
Logging
    ↓
Categorization & Prioritization
    ↓
Diagnosis
    ↓
Escalation (if needed)
    ↓
Investigation & Diagnosis
    ↓
Resolution & Recovery
    ↓
Closure
    ↓
Post-Incident Review (for major incidents)
```

## Incident Classification

### Priority Matrix

```
┌────────────────────────────────────────────┐
│         Impact vs Urgency                  │
├────────────────────────────────────────────┤
│            │ Low │ Med │ High │ Critical  │
│────────────┼─────┼─────┼──────┼───────────│
│ Urgent     │ P3  │ P2  │ P1   │ P1        │
│ High       │ P3  │ P2  │ P2   │ P1        │
│ Medium     │ P4  │ P3  │ P2   │ P2        │
│ Low        │ P4  │ P4  │ P3   │ P3        │
└────────────────────────────────────────────┘
```

### Priority Definitions

**P1 - Critical:**
```yaml
Criteria:
  - Complete service outage
  - Critical business process stopped
  - Security breach in progress
  - Data loss imminent
  - Affects >1000 users

Examples:
  - Production database down
  - Website completely unavailable
  - Email service down globally
  - Ransomware attack

SLA Targets:
  Response Time: 15 minutes
  Resolution Time: 4 hours
  Communication: Every 30 minutes
  Support: 24/7/365

Process:
  - Immediate notification to Incident Manager
  - War room/bridge call initiated
  - All hands on deck
  - Executive notification
  - Status page updated
```

**P2 - High:**
```yaml
Criteria:
  - Major service degradation
  - Critical users affected
  - Workaround not available
  - Affects 100-1000 users

Examples:
  - Application slow (80% degradation)
  - VPN intermittent failures
  - Key functionality broken
  - Regional service outage

SLA Targets:
  Response Time: 1 hour
  Resolution Time: 8 hours
  Communication: Every 2 hours
  Support: 24/7

Process:
  - Incident Manager assigned
  - Bridge call if needed
  - Regular updates
  - Management notification
```

**P3 - Medium:**
```yaml
Criteria:
  - Moderate service impact
  - Workaround available
  - Affects 10-100 users
  - Non-critical business impact

Examples:
  - Minor application bug
  - Single user unable to access file share
  - Printer offline
  - Report not generating

SLA Targets:
  Response Time: 4 hours
  Resolution Time: 24 hours
  Communication: Daily
  Support: Business hours

Process:
  - Standard troubleshooting
  - Escalate if unresolved
  - User updates as needed
```

**P4 - Low:**
```yaml
Criteria:
  - Minimal impact
  - Single user affected
  - Enhancement request
  - Cosmetic issues

Examples:
  - Typo in application
  - Feature request
  - Question about functionality
  - UI improvement suggestion

SLA Targets:
  Response Time: 8 hours
  Resolution Time: 48 hours
  Communication: On close
  Support: Business hours

Process:
  - Queue for resolution
  - May convert to service request
  - May defer to next release
```

### Incident Categories

```yaml
Category Hierarchy:

Hardware:
  - Desktop/Laptop
  - Server
  - Network
  - Printer
  - Phone

Software:
  - Application
  - Operating System
  - Database
  - Middleware

Service:
  - Email
  - Network Connectivity
  - Authentication
  - File Storage
  - VPN

Security:
  - Account Compromise
  - Malware
  - Phishing
  - Unauthorized Access
```

## Escalation Procedures

### Escalation Types

**Functional Escalation:**
```
Escalate to higher expertise level

L1 Service Desk
    ↓ (if unresolved in 15 minutes)
L2 Technical Support
    ↓ (if unresolved in 1 hour)
L3 Subject Matter Expert
    ↓ (if vendor issue)
Vendor Support
```

**Hierarchical Escalation:**
```
Escalate to higher management level

Service Desk Analyst
    ↓ (if P1 or SLA breach)
Service Desk Manager
    ↓ (if not resolving)
IT Manager
    ↓ (if business critical)
CIO
```

### Escalation Triggers

```yaml
Automatic Escalation Triggers:

1. Priority-based:
   - P1 incident created → Immediate
   - P2 approaching SLA breach → 1 hour before
   - P3/P4 SLA breached → Immediately

2. Time-based:
   - L1 unable to resolve in 15 minutes → L2
   - L2 unable to resolve in 1 hour → L3
   - Any tier stuck for 2x expected time → Manager

3. Impact-based:
   - Executive affected → Immediate
   - Revenue-impacting → Immediate
   - Compliance issue → Immediate
   - Security incident → Immediate

4. Pattern-based:
   - 3rd occurrence of same issue → Problem Management
   - Affecting multiple users → Escalate priority
   - Scope expanding → Re-prioritize
```

### Major Incident Management

```yaml
Major Incident: High impact, urgent situation requiring immediate attention

Criteria:
  - Multiple critical services down
  - Widespread user impact (>1000 users)
  - Executive visibility
  - Revenue impact
  - Regulatory implications

Process:

1. Declaration:
   - Incident Manager declares major incident
   - Initiate major incident process
   - Notify stakeholders

2. War Room:
   - Virtual bridge call
   - Dedicated Slack channel
   - Screen sharing for collaboration

3. Roles:
   - Incident Manager: Leads response
   - Technical Lead: Coordinates fixes
   - Communications Lead: User updates
   - Scribe: Documents timeline

4. Communication:
   - Status page updated immediately
   - Updates every 15-30 minutes
   - Executive briefings
   - Customer notifications

5. Resolution:
   - Focus on service restoration (not root cause)
   - Implement workaround if faster than fix
   - Verify resolution
   - Monitoring period

6. Post-Incident Review:
   - Mandatory for major incidents
   - Timeline analysis
   - Root cause
   - Action items
   - Process improvements
```

### War Room Example

```yaml
Major Incident: Customer Portal Down

Bridge Call Details:
  Conference: +1-555-1234, Code: 9876
  Slack Channel: #incident-portal-down
  Start Time: 2024-11-01 14:30

Participants:
  Incident Manager: Sarah Johnson
  Technical Lead: Mike Chen
  App Team: Dev Team Lead + 2 engineers
  Infrastructure: Ops Manager + SRE
  Database: DBA on call
  Communications: Customer Success Manager
  Executive: VP Engineering (observer)

Timeline:
  14:30 - Incident declared, war room started
  14:35 - Investigation started (all hands)
  14:40 - Root cause identified (database connection pool exhausted)
  14:50 - Fix applied (increased connection pool size)
  15:00 - Service restored
  15:15 - Monitoring period complete, war room closed
  15:30 - PIR scheduled for tomorrow 10am

Actions:
  - [DONE] Restart application servers
  - [DONE] Increase DB connection pool
  - [DONE] Verify functionality
  - [PENDING] PIR tomorrow
  - [PENDING] Permanent fix in sprint
```

## Problem Management

### Purpose

**Problem:** Unknown root cause of one or more incidents.

**Goals:**
- Identify root causes
- Prevent incident recurrence
- Minimize impact of incidents that can't be prevented
- Improve service quality

### Reactive vs Proactive

**Reactive Problem Management:**
```
Triggered by:
  - Multiple related incidents
  - Recurring incidents
  - Major incident root cause analysis

Process:
  - Analyze incident patterns
  - Identify common root cause
  - Document as problem
  - Assign for investigation
```

**Proactive Problem Management:**
```
Triggered by:
  - Trend analysis
  - Performance monitoring
  - Technology assessments
  - Known vulnerabilities

Process:
  - Identify potential problems before incidents occur
  - Analyze risks
  - Implement preventive measures
  - Continuous improvement
```

### Problem Lifecycle

```
Problem Detection
    ↓
Problem Logging
    ↓
Categorization & Prioritization
    ↓
Investigation & Diagnosis
    ↓
Workaround (interim solution)
    ↓
Known Error (if workaround found)
    ↓
Root Cause Identified
    ↓
Change Request (for permanent fix)
    ↓
Problem Resolution
    ↓
Problem Closure
```

### Problem Record Example

```yaml
Problem: PRB-456

Status: Known Error (workaround available)
Category: Application
Subcategory: Performance
Priority: P2

Description:
  Customer Portal experiences slow response times (>5 seconds)
  during business hours, especially between 9am-11am.

Related Incidents:
  - INC-12340: 2024-10-15 - Slow portal
  - INC-12398: 2024-10-22 - Portal timeout
  - INC-12445: 2024-10-29 - Cannot load customer data
  - INC-12467: 2024-11-01 - Slow search results
  Total: 15 incidents in 30 days

Investigation Timeline:
  2024-10-16: Problem created (after 2nd occurrence)
  2024-10-17: Assigned to App Team
  2024-10-20: Performance testing conducted
  2024-10-22: Root cause identified
  2024-10-23: Workaround implemented
  2024-10-25: Marked as Known Error

Root Cause:
  Database query inefficiency due to missing index on
  customer_orders.created_date column. Query scans full table
  (5M rows) instead of using index, causing 8+ second queries.

Workaround:
  Add database read replica for reporting queries to reduce
  load on primary database.

  Implementation:
    - Created read replica
    - Routed search queries to replica
    - Reduced primary DB load by 40%

  Result:
    - Response times improved to <2 seconds
    - Incidents reduced by 90%

Permanent Solution:
  Change Request: CHG-12890
  Description: Add index on customer_orders.created_date
  Status: Approved
  Scheduled: 2024-11-10 02:00 AM
  Expected Result: Eliminate slow queries completely

Owner: Database Team
Next Review: 2024-11-15 (verify fix effectiveness)
```

## Root Cause Analysis

### 5 Whys Technique

```yaml
Incident: Production website down for 2 hours

Why? The web server crashed.
  ↓
Why did the web server crash? It ran out of memory.
  ↓
Why did it run out of memory? Memory leak in application code.
  ↓
Why was there a memory leak? Database connections not closed properly.
  ↓
Why weren't connections closed? Missing finally blocks in error handling.
  ↓
Root Cause: Code review process didn't catch missing resource cleanup

Actions:
  1. Fix immediate issue: Add connection cleanup code
  2. Prevent recurrence: Update code review checklist
  3. Detect earlier: Add memory monitoring alerts
  4. Improve process: Automated code analysis for resource leaks
```

### Fishbone Diagram (Ishikawa)

```
Problem: Database Performance Degradation

        People              Process              Technology
           │                   │                     │
           │                   │                     │
    No DBA training      No capacity planning    Old hardware
           │                   │                     │
           └───────────────────┴──────────────────────┘
                                 │
                          ┌──────▼──────┐
                          │  Database   │
                          │ Performance │
                          │   Issues    │
                          └──────▲──────┘
           ┌───────────────────┬┴──────────────────────┐
           │                   │                        │
    No monitoring        No query tuning        Unoptimized queries
           │                   │                        │
      Environment           Methods              Management
```

### RCA Report Template

```yaml
Root Cause Analysis Report

Incident: INC-12500 - Email Service Outage
Date: 2024-11-01
Duration: 14:30 - 17:15 (2 hours 45 minutes)
Impact: 5,000 users unable to send/receive email
Business Impact: $45,000 revenue (estimated)

Timeline:
  14:30 - Users report cannot send email
  14:35 - Service desk escalates to L2
  14:40 - Email team investigates
  15:00 - Identified mail server queue full
  15:15 - Identified spam causing queue backup
  15:30 - Spam filtering updated
  16:00 - Queue processing resumed
  17:00 - All queued emails delivered
  17:15 - Service fully restored

Root Cause:
  Spam filtering rules outdated (last update 6 months ago).
  New spam campaign bypassed filters, overwhelming mail queue
  with 500,000 spam messages in 2 hours.

Contributing Factors:
  1. No automated spam filter updates
  2. No queue monitoring alerts
  3. No rate limiting on inbound email

Immediate Actions (Completed):
  - Updated spam filters
  - Cleared spam from queue
  - Implemented rate limiting

Preventive Actions:
  1. Automate spam filter updates (daily) - Due: Nov 5
  2. Implement queue monitoring - Due: Nov 10
  3. Review email security architecture - Due: Nov 20
  4. Add rate limiting for all services - Due: Nov 30

Lessons Learned:
  - Automated updates critical for security controls
  - Monitoring should cover queue depths, not just service status
  - Need faster incident detection (took 30 min to detect)

Owner: Email Team Lead
PIR Completed: 2024-11-02
Follow-up Review: 2024-12-01
```

## Known Error Database

### Purpose

**Known Error Database (KEDB):** Repository of Known Errors and workarounds.

**Benefits:**
- Faster incident resolution
- Consistent solutions
- Knowledge sharing
- Reduced dependency on specific individuals

### Known Error Record

```yaml
Known Error: KE-123

Problem: PRB-456
Status: Active (workaround available)
Category: Application
Subcategory: Performance

Description:
  Customer search returns results slowly (>5 seconds)
  during peak hours (9am-11am, 1pm-3pm).

Root Cause:
  Missing database index on frequently queried column.
  Query performs table scan instead of index lookup.

Workaround:
  Title: Use Advanced Search with Date Filter

  Steps:
    1. Click "Advanced Search"
    2. Add date range filter (last 90 days)
    3. Perform search

  Result:
    - Reduces query scope
    - Returns results in <1 second
    - 95% of searches within 90 days

  Limitations:
    - Doesn't help for searches >90 days
    - Extra step for users

Permanent Fix:
  Status: In Progress
  Change: CHG-12890 (database index creation)
  ETA: 2024-11-10

  Once deployed:
    - Workaround no longer needed
    - All searches will be fast
    - KE will be closed

Communication:
  - Service desk trained on workaround
  - Knowledge base article published: KB-789
  - User notification sent
  - Status page updated

Related Documents:
  - Problem Record: PRB-456
  - Knowledge Article: KB-789
  - Change Request: CHG-12890
  - Incidents: INC-12340, INC-12398, INC-12445

Owner: Database Team
Created: 2024-10-23
Last Updated: 2024-11-01
Next Review: 2024-11-15
```

### KEDB Integration

```yaml
Integration Points:

Service Desk:
  - Search KEDB before escalating
  - Apply workaround if available
  - Link incident to known error
  - Faster resolution

Incident Management:
  - Check for known errors during diagnosis
  - Apply documented workarounds
  - Track effectiveness

Problem Management:
  - Create KE when workaround identified
  - Update KE when permanent fix deployed
  - Close KE when problem resolved

Knowledge Management:
  - Convert KE to KB articles
  - Self-service access
  - User education
```

## Best Practices

### 1. Clear Communication

**User Updates:**
```
During Incident:
  - Initial acknowledgment (within SLA)
  - Progress updates (regular intervals)
  - Workaround instructions (if available)
  - Resolution notification
  - Follow-up (verify fix)

Status Page:
  - Real-time incident status
  - Affected services
  - ETR (Estimated Time to Repair)
  - Updates as situation evolves
```

### 2. Incident Metrics

```yaml
Key Performance Indicators:

Response Metrics:
  - Mean Time to Respond (MTTR)
    Target: <15 min (P1), <1 hr (P2)
  - First Response SLA Compliance
    Target: >95%

Resolution Metrics:
  - Mean Time to Resolve (MTTR)
    Target: <4 hr (P1), <8 hr (P2)
  - Resolution SLA Compliance
    Target: >90%
  - First Contact Resolution
    Target: >70%

Quality Metrics:
  - Incident Reopen Rate
    Target: <5%
  - Escalation Rate
    Target: <30%
  - User Satisfaction (CSAT)
    Target: >4.0/5.0

Volume Metrics:
  - Incidents by category
  - Incidents by priority
  - Trend analysis (increasing/decreasing)
```

### 3. Post-Incident Reviews

**For major incidents, conduct PIR:**
```yaml
PIR Agenda:

1. Timeline Review (20 min)
   - What happened and when?
   - Who was involved?
   - What actions were taken?

2. Root Cause Analysis (20 min)
   - Why did it happen?
   - What were contributing factors?
   - Could it have been prevented?

3. Impact Assessment (10 min)
   - Users affected
   - Business impact
   - Financial impact
   - Reputation impact

4. Response Evaluation (15 min)
   - What went well?
   - What could be improved?
   - Was communication effective?
   - Were tools adequate?

5. Action Items (15 min)
   - Immediate fixes
   - Preventive measures
   - Process improvements
   - Training needs
   - Tool enhancements

6. Follow-up (5 min)
   - Assign owners
   - Set deadlines
   - Schedule review
```

### 4. Knowledge Management

Build comprehensive knowledge base from incidents and problems.

### 5. Automation

```yaml
Automate Common Resolutions:

Self-Healing:
  - Service restart on failure
  - Disk space cleanup
  - Cache clearing
  - Certificate renewal

Automated Diagnostics:
  - Health check scripts
  - Log analysis
  - Performance baselines
  - Connectivity tests

Chatbots:
  - Password reset
  - Account unlock
  - Common questions
  - Ticket creation
```

### 6. Continuous Improvement

Learn from every incident to prevent future occurrences.

---

**Related Resources:**
- [itil-framework.md](itil-framework.md) - ITIL incident and problem management
- [service-management.md](service-management.md) - SLA management
- [help-desk-operations.md](help-desk-operations.md) - Service desk operations
