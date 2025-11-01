# Business Continuity and Disaster Recovery

BCP/DR planning, RTO/RPO targets, disaster recovery testing, backup strategies, and failover procedures for ensuring business resilience.

## Table of Contents

- [Business Continuity Overview](#business-continuity-overview)
- [RTO and RPO](#rto-and-rpo)
- [Backup Strategies](#backup-strategies)
- [Disaster Recovery Planning](#disaster-recovery-planning)
- [DR Testing](#dr-testing)
- [Failover Procedures](#failover-procedures)
- [Best Practices](#best-practices)

## Business Continuity Overview

### Purpose

Business Continuity Planning (BCP) ensures:
- Critical business functions continue during disasters
- Rapid recovery from disruptions
- Minimized financial impact
- Protection of reputation
- Regulatory compliance

### BCP vs DR

```yaml
Business Continuity Planning (BCP):
  Scope: Entire business operations
  Focus: Keeping business running
  Includes: People, processes, facilities, IT, communications
  Timeline: Before, during, and after incident

Disaster Recovery (DR):
  Scope: IT systems and data
  Focus: Restoring IT services
  Includes: Infrastructure, applications, data
  Timeline: After incident occurs
```

### Business Impact Analysis (BIA)

```yaml
BIA Process:

1. Identify Critical Business Processes:
   - Order processing
   - Payment processing
   - Customer support
   - Manufacturing
   - Supply chain

2. Assess Impact of Disruption:
   Financial:
     - Revenue loss per hour
     - Penalty costs
     - Recovery costs

   Operational:
     - Productivity loss
     - Customer service impact
     - Supply chain disruption

   Reputational:
     - Customer satisfaction
     - Brand damage
     - Market share loss

   Regulatory:
     - Compliance violations
     - Legal penalties
     - Audit findings

3. Determine Recovery Requirements:
   - Maximum Tolerable Downtime (MTD)
   - Recovery Time Objective (RTO)
   - Recovery Point Objective (RPO)
   - Minimum service level

Example BIA Results:

Service: E-commerce Website
  Revenue: $50,000/hour
  MTD: 4 hours
  RTO: 1 hour
  RPO: 15 minutes
  Priority: Critical (Tier 1)

Service: Internal Wiki
  Revenue Impact: Minimal
  MTD: 5 days
  RTO: 24 hours
  RPO: 24 hours
  Priority: Low (Tier 3)
```

## RTO and RPO

### Recovery Time Objective (RTO)

```yaml
RTO: Maximum acceptable time to restore service after disruption

Examples:

Critical Services (Tier 1):
  E-commerce platform: RTO 1 hour
  Payment processing: RTO 30 minutes
  Customer database: RTO 1 hour

Important Services (Tier 2):
  Email system: RTO 4 hours
  Internal applications: RTO 8 hours
  File shares: RTO 4 hours

Standard Services (Tier 3):
  Development environments: RTO 24 hours
  Archive systems: RTO 48 hours
  Test environments: RTO 3 days
```

### Recovery Point Objective (RPO)

```yaml
RPO: Maximum acceptable data loss measured in time

Examples:

Critical Data (Tier 1):
  Financial transactions: RPO 0 (zero data loss)
  Customer orders: RPO 5 minutes
  Inventory data: RPO 15 minutes

Important Data (Tier 2):
  CRM data: RPO 1 hour
  Email: RPO 4 hours
  Documents: RPO 8 hours

Standard Data (Tier 3):
  Development code: RPO 24 hours (daily backup)
  Logs: RPO 24 hours
  Archives: RPO 7 days
```

### RTO/RPO Impact on Solutions

```
┌───────────────────────────────────────────────────┐
│  RTO/RPO Requirements → Infrastructure Solutions  │
├───────────────────────────────────────────────────┤
│                                                    │
│  RTO: Minutes, RPO: 0                             │
│  → Active-Active Multi-Region                     │
│  → Synchronous replication                        │
│  → Automatic failover                             │
│  Cost: $$$$$                                      │
│                                                    │
│  RTO: 1-4 hours, RPO: Minutes                     │
│  → Active-Passive with Hot Standby                │
│  → Asynchronous replication                       │
│  → Manual failover                                │
│  Cost: $$$$                                       │
│                                                    │
│  RTO: 8-24 hours, RPO: Hours                      │
│  → Warm Standby                                   │
│  → Periodic snapshots                             │
│  → Restore from backup                            │
│  Cost: $$$                                        │
│                                                    │
│  RTO: Days, RPO: 24 hours                         │
│  → Cold Standby                                   │
│  → Daily backups                                  │
│  → Manual rebuild                                 │
│  Cost: $$                                         │
│                                                    │
└───────────────────────────────────────────────────┘
```

## Backup Strategies

### 3-2-1 Backup Rule

```
3 - Keep three copies of data
2 - Store on two different media types
1 - Keep one copy offsite

Example:
  1. Production data (primary)
  2. Daily backup to NAS (secondary, different media)
  3. Weekly backup to cloud (tertiary, offsite)
```

### Backup Types

**Full Backup:**
```yaml
Description: Complete copy of all data
Frequency: Weekly
Pros:
  - Complete restore from single backup
  - Fastest restore time
Cons:
  - Longest backup time
  - Most storage space
  - Network intensive

Example Schedule:
  Sunday 2am: Full backup
```

**Incremental Backup:**
```yaml
Description: Only changes since last backup (any type)
Frequency: Daily
Pros:
  - Fast backup
  - Minimal storage
  - Efficient
Cons:
  - Slower restore (need full + all incrementals)
  - More complex

Example Schedule:
  Sunday 2am: Full
  Mon-Sat 2am: Incremental
```

**Differential Backup:**
```yaml
Description: Changes since last full backup
Frequency: Daily
Pros:
  - Faster restore than incremental (full + last differential)
  - Moderate backup time
Cons:
  - More storage than incremental
  - Backup size grows through week

Example Schedule:
  Sunday 2am: Full
  Mon-Sat 2am: Differential
```

### Backup Strategy Example

```yaml
Production Database Backups:

Full Backup:
  Schedule: Sunday 2am
  Retention: 4 weeks
  Storage: AWS S3 Standard
  Encryption: AES-256
  Duration: 3 hours
  Size: 500GB

Differential Backup:
  Schedule: Daily 2am (Mon-Sat)
  Retention: 7 days
  Storage: AWS S3 Standard
  Duration: 45 minutes
  Size: 50-150GB (cumulative)

Transaction Log Backup:
  Schedule: Every 15 minutes
  Retention: 7 days
  Storage: AWS S3 Standard
  Duration: <1 minute
  Size: 5-10GB per day

RPO Achievement:
  - Transaction logs every 15 min → RPO 15 minutes ✅

Restore Scenarios:
  1. Restore to current:
     - Latest full (Sunday)
     - Latest differential (yesterday)
     - All transaction logs since differential
     Time: ~1 hour

  2. Point-in-time restore (Tuesday 3pm):
     - Latest full (Sunday)
     - Differential up to Tuesday
     - Transaction logs up to 3pm Tuesday
     Time: ~1 hour

Backup Testing:
  - Automated restore test: Weekly
  - Full DR drill: Quarterly
  - Verification: Every backup
```

### Backup Retention

```yaml
Retention Policy:

Daily Backups:
  Retention: 7 days
  Purpose: Operational recovery

Weekly Backups:
  Retention: 4 weeks
  Purpose: Month-end recovery

Monthly Backups:
  Retention: 12 months
  Purpose: Regulatory compliance, year-end

Yearly Backups:
  Retention: 7 years
  Purpose: Legal/audit requirements

Example:
  Jan 1 - Jan 7: Daily backups (7)
  Jan 8: Delete Jan 1 daily, keep Jan 7 weekly
  Feb 1: Keep Jan 31 as monthly backup
  Mar 1: Delete Jan weekly backups except Jan 31 (monthly)
  Jan 2025: Keep Dec 31 2024 as yearly backup
  Jan 2032: Delete Dec 31 2024 yearly (7 years old)
```

## Disaster Recovery Planning

### DR Tiers

```yaml
Tier 0 - No DR:
  RTO: Undefined
  RPO: Undefined
  Solution: No backup, rebuild from scratch
  Cost: $
  Risk: Complete data loss

Tier 1 - Data Backup:
  RTO: Days to weeks
  RPO: 24 hours
  Solution: Daily backups, manual restore
  Cost: $$
  Risk: Extended downtime

Tier 2 - Warm Standby:
  RTO: 8-24 hours
  RPO: 1-4 hours
  Solution: Regular backups, recovery site ready
  Cost: $$$
  Risk: Moderate downtime

Tier 3 - Hot Standby:
  RTO: 1-4 hours
  RPO: 5-60 minutes
  Solution: Replicated data, standby systems
  Cost: $$$$
  Risk: Brief downtime

Tier 4 - Active-Active:
  RTO: Minutes
  RPO: Zero to minutes
  Solution: Multi-region active, auto-failover
  Cost: $$$$$
  Risk: Minimal downtime
```

### DR Site Types

**Cold Site:**
```yaml
Description: Empty data center with power/cooling

Characteristics:
  - No equipment pre-installed
  - Basic infrastructure only
  - Equipment shipped during disaster

Recovery Time: 1-4 weeks
Cost: Low
Best For: Non-critical systems, budget constraints
```

**Warm Site:**
```yaml
Description: Partially equipped data center

Characteristics:
  - Equipment installed
  - Data synchronized periodically
  - Requires configuration to activate

Recovery Time: 12 hours - 3 days
Cost: Medium
Best For: Important but not critical systems
```

**Hot Site:**
```yaml
Description: Fully operational replica site

Characteristics:
  - Equipment installed and running
  - Data replicated in near real-time
  - Ready to take over immediately

Recovery Time: Minutes to hours
Cost: High
Best For: Critical systems, zero tolerance for downtime
```

**Active-Active (Multi-Site):**
```yaml
Description: Multiple sites serving traffic simultaneously

Characteristics:
  - All sites processing requests
  - Real-time data synchronization
  - Automatic failover
  - Load balancing across sites

Recovery Time: Seconds to minutes (automatic)
Cost: Very High
Best For: Mission-critical systems, global services
```

### DR Runbooks

```yaml
DR Runbook: Production Database Failover

Trigger Conditions:
  - Primary database unresponsive >5 minutes
  - Data center outage declared
  - Planned maintenance requiring failover

Prerequisites:
  - DR database in sync (replication lag <5 min)
  - DR infrastructure validated (last test <30 days)
  - Key personnel available

Failover Steps:

1. Assess Situation (5 min)
   [x] Verify primary database down
   [x] Check replication status
   [x] Estimate recovery time
   [x] Decide: Failover or Wait

2. Declare Disaster (2 min)
   [x] Notify incident manager
   [x] Activate war room
   [x] Update status page
   [x] Notify stakeholders

3. Prepare DR Site (10 min)
   [x] Verify DR database healthy
   [x] Check replication lag
   [x] Review last backup
   [x] Prepare application configs

4. Execute Failover (15 min)
   [x] Stop replication from primary
   [x] Promote DR database to primary
   [x] Update DNS records (TTL 60 sec)
   [x] Update load balancer (point to DR)
   [x] Update application configs
   [x] Restart application servers

5. Verify Service (10 min)
   [x] Test database connectivity
   [x] Run smoke tests
   [x] Verify application functionality
   [x] Check monitoring dashboards
   [x] Validate with sample transactions

6. Monitor (30 min)
   [x] Watch error rates
   [x] Monitor performance
   [x] Check user reports
   [x] Verify backups running

7. Communicate (Ongoing)
   [x] Update status page (service restored)
   [x] Notify stakeholders
   [x] Document timeline
   [x] Schedule post-mortem

Total RTO: 60-75 minutes

Rollback Procedure:
  If DR site fails:
    1. Attempt to restore primary
    2. If primary unrecoverable, rebuild from backup
    3. Estimated time: 4 hours

Post-Failover:
  - Continue operations on DR site
  - Plan primary site rebuild
  - Schedule failback when primary ready
```

## DR Testing

### Testing Frequency

```yaml
Test Schedule:

Component Tests (Monthly):
  - Backup restore verification
  - Replication health checks
  - Failover script validation
  - Monitoring alert tests

Tabletop Exercises (Quarterly):
  - Walk through DR scenarios
  - Review runbooks
  - Identify gaps
  - No actual systems affected

Partial DR Tests (Semi-Annually):
  - Test non-production systems
  - Verify specific components
  - Limited scope
  - Minimal business impact

Full DR Tests (Annually):
  - Complete failover of production systems
  - All teams participate
  - Measure actual RTO/RPO
  - Scheduled maintenance window
```

### DR Test Plan

```yaml
Annual DR Test Plan

Objective: Validate ability to recover critical systems within RTO/RPO

Scope:
  In Scope:
    - Production database
    - E-commerce application
    - Payment processing
    - Customer portal

  Out of Scope:
    - Development environments
    - Internal tools
    - Reporting systems

Schedule:
  Date: 2024-12-15
  Start: 6:00 AM
  End: 12:00 PM (target)
  Window: 6 hours

Participants:
  - DR Coordinator (lead)
  - Database team (2 engineers)
  - Application team (3 engineers)
  - Infrastructure team (2 engineers)
  - Network team (1 engineer)
  - Management (observers)

Test Scenarios:

Scenario 1: Database Failover
  Trigger: Simulate primary database failure
  Expected RTO: 1 hour
  Expected RPO: 15 minutes
  Success Criteria:
    - DR database promoted
    - Applications connected
    - Data loss <15 minutes
    - All smoke tests pass

Scenario 2: Application Failover
  Trigger: Primary region unavailable
  Expected RTO: 30 minutes
  Expected RPO: 5 minutes
  Success Criteria:
    - Traffic routed to DR region
    - All services operational
    - User sessions preserved
    - Performance within SLA

Communication Plan:
  - T-14 days: Announce test to stakeholders
  - T-7 days: Reminder notification
  - T-1 day: Final confirmation
  - T-0: Status page update
  - During test: Hourly updates
  - T+completion: Results summary

Success Metrics:
  - RTO achieved: Yes/No
  - RPO achieved: Yes/No
  - No data loss: Yes/No
  - All systems functional: Yes/No
  - Runbooks accurate: Yes/No

Post-Test Activities:
  - Lessons learned document
  - Runbook updates
  - Gap remediation
  - Executive summary
```

## Failover Procedures

### Automatic Failover

```yaml
Automatic Failover Architecture:

Components:
  - Health checks (every 30 seconds)
  - Monitoring (detect failures)
  - Orchestration (execute failover)
  - DNS/Load balancer (route traffic)

Example: AWS Multi-AZ RDS

Primary DB (us-east-1a):
  - Actively serving requests
  - Synchronous replication to standby

Standby DB (us-east-1b):
  - Receives replicated data
  - Ready to take over

Failure Detection:
  - RDS monitors primary health
  - Detects failure (30-60 seconds)

Automatic Failover:
  1. Promote standby to primary (60-120 seconds)
  2. Update DNS to point to new primary (TTL 60s)
  3. Applications reconnect automatically
  4. Total downtime: 2-4 minutes

No Manual Intervention Required ✅
```

### Manual Failover

```yaml
Manual Failover Process:

When to Use:
  - Planned maintenance
  - Testing
  - Automatic failover failed
  - Requires human judgment

Decision Authority:
  - Operations Manager
  - Database Administrator
  - Incident Manager

Checklist:

Pre-Failover:
  [ ] Verify DR site ready
  [ ] Check replication lag
  [ ] Notify stakeholders
  [ ] Prepare rollback plan
  [ ] Schedule maintenance window

Execute Failover:
  [ ] Stop writes to primary
  [ ] Verify replication caught up
  [ ] Promote DR to primary
  [ ] Update DNS/LB
  [ ] Redirect traffic
  [ ] Verify functionality

Post-Failover:
  [ ] Monitor for issues
  [ ] Verify data consistency
  [ ] Update documentation
  [ ] Communicate completion
```

## Best Practices

### 1. Regular Testing

Test DR plans regularly - untested plans don't work.

### 2. Document Everything

```yaml
Essential Documentation:
  - DR runbooks (step-by-step procedures)
  - Network diagrams (primary and DR)
  - Contact lists (with alternates)
  - Vendor contacts (support numbers)
  - Access credentials (secured)
  - Recovery procedures (detailed)
  - Test results (lessons learned)
```

### 3. Automate Where Possible

```
Automate:
  - Failover detection
  - Backup verification
  - Health checks
  - Alert notifications
  - Status updates
```

### 4. Geographic Distribution

```yaml
Best Practice: Multi-Region Deployment

Disaster Scenarios Protected:
  - Data center fire
  - Natural disaster
  - Regional power outage
  - Network partition
  - Provider outage

Example:
  Primary: US East (Virginia)
  DR: US West (Oregon)
  Distance: 2,500 miles
  Separate: Power grids, networks, facilities
```

### 5. Backup Verification

```bash
# Automated backup verification

#!/bin/bash
# verify-backup.sh

BACKUP_FILE="prod-db-2024-11-01.sql.gz"

# 1. Verify file exists and is not empty
if [ ! -s "$BACKUP_FILE" ]; then
    echo "ERROR: Backup file missing or empty"
    exit 1
fi

# 2. Verify file integrity (checksum)
EXPECTED_MD5="abc123..."
ACTUAL_MD5=$(md5sum "$BACKUP_FILE" | awk '{print $1}')
if [ "$EXPECTED_MD5" != "$ACTUAL_MD5" ]; then
    echo "ERROR: Backup file corrupted"
    exit 1
fi

# 3. Test restore to staging
gunzip -c "$BACKUP_FILE" | mysql staging_db

# 4. Verify data
ROW_COUNT=$(mysql staging_db -e "SELECT COUNT(*) FROM customers" -sN)
if [ "$ROW_COUNT" -lt 1000 ]; then
    echo "ERROR: Restored data incomplete"
    exit 1
fi

echo "SUCCESS: Backup verified"
exit 0
```

### 6. Communication Plan

Ensure stakeholders know what's happening during disasters.

### 7. Continuous Improvement

Update plans based on tests, incidents, and changes.

---

**Related Resources:**
- [itil-framework.md](itil-framework.md) - Service continuity management
- [incident-service-management.md](incident-service-management.md) - Major incident management
- [enterprise-monitoring.md](enterprise-monitoring.md) - Monitoring and alerting
