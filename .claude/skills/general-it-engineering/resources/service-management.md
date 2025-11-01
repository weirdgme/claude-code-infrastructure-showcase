# Service Management

Service catalog management, SLA management, service desk operations, and ticketing systems for delivering IT services effectively.

## Table of Contents

- [Service Catalog](#service-catalog)
- [Service Level Management](#service-level-management)
- [Service Desk Operations](#service-desk-operations)
- [Ticketing Systems](#ticketing-systems)
- [Service Request Management](#service-request-management)
- [Best Practices](#best-practices)

## Service Catalog

### Purpose

A service catalog provides:
- Single source of truth for available services
- Clear service descriptions and pricing
- Standardized request procedures
- Service dependencies and relationships

### Service Catalog Structure

```
Service Catalog
├── Business Service Catalog (Customer-facing)
│   ├── Email Service
│   ├── File Storage
│   ├── Video Conferencing
│   └── Application Hosting
│
└── Technical Service Catalog (Supporting services)
    ├── Active Directory
    ├── DNS
    ├── Database Hosting
    └── Load Balancing
```

### Service Catalog Entry Template

```yaml
Service: Email Service

Description: |
  Enterprise email with calendar, contacts, and 50GB storage.
  Includes mobile access and spam filtering.

Service Owner: Infrastructure Team
Support Team: Service Desk (L1), Email Team (L2/L3)

Service Level: 99.9% uptime
Support Hours: 24/7/365
Response Time:
  - P1: 15 minutes
  - P2: 1 hour
  - P3: 4 hours
  - P4: 8 hours

Cost: $10/user/month

Prerequisites:
  - Active employee account
  - Manager approval
  - Department budget code

Request Process:
  1. Submit request via self-service portal
  2. Automatic manager approval workflow
  3. Provisioning (automated, <1 hour)
  4. Welcome email with setup instructions

Dependencies:
  - Active Directory (authentication)
  - DNS (mail routing)
  - Spam filtering service
  - Backup service

Related Services:
  - Calendar Service
  - Mobile Device Management
  - File Sharing
```

### Service Catalog Categories

**End User Services:**
- Desktop/laptop provisioning
- Software licensing
- Email and collaboration
- Mobile device management

**Application Services:**
- Application hosting
- Database services
- Web hosting
- API management

**Infrastructure Services:**
- Virtual machine provisioning
- Storage services
- Network services
- Backup and recovery

**Support Services:**
- Incident support
- Service requests
- Access management
- Training

## Service Level Management

### SLA Components

**Service Level Agreement (SLA):**
```
Agreement between IT and customer defining:
• Services provided
• Performance targets
• Responsibilities
• Remedies for non-compliance
```

**Operational Level Agreement (OLA):**
```
Agreement between internal teams supporting SLA delivery:
• Network team → Application team
• Database team → Development team
```

**Underpinning Contract (UC):**
```
Contract with external supplier supporting service delivery:
• Cloud provider
• Software vendor
• Hardware supplier
```

### SLA Metrics

**Availability:**
```yaml
Metric: Service Uptime
Target: 99.9%
Measurement: (Total time - Downtime) / Total time
Exclusions:
  - Scheduled maintenance (with 7 days notice)
  - Force majeure events

Calculation:
  Monthly minutes: 43,800
  Allowed downtime: 43.8 minutes
  Actual downtime: 20 minutes
  Availability: 99.95% ✅ (exceeds target)
```

**Performance:**
```yaml
Metric: Application Response Time
Target: 95% of requests < 2 seconds
Measurement: Application Performance Monitoring (APM)
Sample Period: Rolling 30 days

Example:
  Total requests: 1,000,000
  Requests < 2s: 970,000
  Performance: 97% ✅ (exceeds target)
```

**Incident Response:**
```yaml
Metric: Time to Respond
Targets:
  P1 (Critical):  15 minutes
  P2 (High):      1 hour
  P3 (Medium):    4 hours
  P4 (Low):       8 hours

Measurement: Time from ticket creation to first response

Example P1 Incidents (Month):
  Incident 1: Responded in 8 minutes ✅
  Incident 2: Responded in 12 minutes ✅
  Incident 3: Responded in 20 minutes ❌
  SLA Compliance: 66.7% (2 of 3)
```

**Incident Resolution:**
```yaml
Metric: Time to Resolve
Targets:
  P1 (Critical):  4 hours
  P2 (High):      8 hours
  P3 (Medium):    24 hours
  P4 (Low):       48 hours

Measurement: Time from ticket creation to closure
```

### SLA Tiers

```
┌──────────────────────────────────────────────────┐
│ Platinum Tier - Mission Critical                 │
├──────────────────────────────────────────────────┤
│ Availability: 99.99%                             │
│ Support: 24/7/365                                │
│ P1 Response: 15 minutes                          │
│ Dedicated support team                           │
│ Cost: Premium                                    │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Gold Tier - Business Critical                    │
├──────────────────────────────────────────────────┤
│ Availability: 99.9%                              │
│ Support: 24/7/365                                │
│ P1 Response: 30 minutes                          │
│ Priority escalation                              │
│ Cost: Standard                                   │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Silver Tier - Standard                           │
├──────────────────────────────────────────────────┤
│ Availability: 99.5%                              │
│ Support: Business hours (8am-6pm)                │
│ P1 Response: 1 hour                              │
│ Standard escalation                              │
│ Cost: Basic                                      │
└──────────────────────────────────────────────────┘
```

### SLA Monitoring Dashboard

```yaml
SLA Dashboard Metrics:

Availability (Current Month):
  Target: 99.9%
  Actual: 99.95%
  Status: ✅ On Track
  Remaining Downtime Budget: 23.8 minutes

Incident Response (Last 30 Days):
  P1 Compliance: 95% (19/20) ✅
  P2 Compliance: 88% (44/50) ⚠️
  P3 Compliance: 92% (184/200) ✅
  P4 Compliance: 96% (96/100) ✅

Customer Satisfaction:
  CSAT Score: 4.2/5.0 ✅
  NPS: +45 ✅
  Response Rate: 68%

Trend:
  Incidents: ▼ 12% vs last month
  Mean Time to Resolve: ▼ 8% vs last month
  First Contact Resolution: ▲ 5% vs last month
```

## Service Desk Operations

### Service Desk Functions

**Primary Functions:**
1. Single point of contact for users
2. Incident logging and tracking
3. Service request fulfillment
4. User communication
5. First-line problem resolution
6. Escalation management

### Support Tiers

```
┌─────────────────────────────────────────┐
│ Tier 1 (Service Desk)                   │
├─────────────────────────────────────────┤
│ • First point of contact                │
│ • Incident logging                      │
│ • Password resets                       │
│ • Basic troubleshooting                 │
│ • Known error workarounds               │
│ • Target: 70% first contact resolution  │
│ • Escalate if not resolved in 15 min   │
└─────────────────────────────────────────┘
                 ⬇ Escalate
┌─────────────────────────────────────────┐
│ Tier 2 (Technical Support)              │
├─────────────────────────────────────────┤
│ • Application specialists               │
│ • Network specialists                   │
│ • Advanced troubleshooting              │
│ • Configuration changes                 │
│ • Target: 90% resolution at L2          │
│ • Escalate complex issues               │
└─────────────────────────────────────────┘
                 ⬇ Escalate
┌─────────────────────────────────────────┐
│ Tier 3 (Expert/Development)             │
├─────────────────────────────────────────┤
│ • Vendor support                        │
│ • Development teams                     │
│ • Architecture teams                    │
│ • Code changes                          │
│ • Root cause analysis                   │
└─────────────────────────────────────────┘
```

### Service Desk Channels

**Phone:**
- Immediate assistance
- Complex issues requiring discussion
- High-priority incidents

**Email:**
- Non-urgent requests
- Documentation trail
- Bulk communications

**Self-Service Portal:**
- Password resets
- Standard requests
- Knowledge base access
- Ticket status tracking

**Live Chat:**
- Quick questions
- Real-time assistance
- Lower effort than phone

**Walk-Up (Physical):**
- Hardware drop-off/pickup
- Face-to-face for complex issues
- Building-specific support

### Shift Handover Process

```yaml
Handover Template:

Shift: Evening → Night (6pm - 10pm)
Date: 2024-11-01
Outgoing Analyst: John Smith
Incoming Analyst: Jane Doe

Active P1/P2 Incidents:
  - INC-12345: Email outage affecting 500 users
    Status: Vendor engaged, ETA 2 hours
    Action: Monitor vendor ticket #ABC-789

  - INC-12346: VPN connectivity issues
    Status: Network team investigating
    Action: Update users via status page every 30 min

Pending Actions:
  - Follow up with finance team on SAP access request
  - Schedule maintenance window for firewall upgrade
  - Review and close resolved tickets from yesterday

Known Issues:
  - Printer in Building A offline (parts ordered)
  - Slow performance in CRM app (monitoring)

Metrics:
  - Tickets handled: 45
  - P1 incidents: 2
  - First contact resolution: 72%
  - Average handle time: 8 minutes
```

## Ticketing Systems

### Ticket Lifecycle

```
New → Assigned → In Progress → Pending → Resolved → Closed
 │       │            │           │          │         │
 │       │            │           │          │         │
 ▼       ▼            ▼           ▼          ▼         ▼
Created  Analyst   Working on  Waiting   Fix      Verified
         assigned  solution    for input  applied  by user
```

### Ticket Fields

```yaml
Ticket: INC-12345

Basic Information:
  Type: Incident
  Priority: P2 (High)
  Status: In Progress
  Category: Email
  Subcategory: Cannot Send
  Affected Service: Email Service

Reporter:
  Name: John Doe
  Email: john.doe@company.com
  Phone: +1-555-1234
  Department: Sales
  Location: Building A, Floor 3

Assignment:
  Assigned To: Jane Smith (L1 Service Desk)
  Team: Service Desk
  Opened: 2024-11-01 09:15
  First Response: 2024-11-01 09:20 (5 min) ✅
  Target Resolution: 2024-11-01 17:15 (8 hours)

Description: |
  User reports unable to send emails since 9am.
  Receiving emails works fine.
  Error message: "Message sending failed - server timeout"

Work Log:
  - 09:20: Verified user account active, no locks
  - 09:25: Checked email server status - all systems operational
  - 09:30: Tested from webmail - same issue
  - 09:35: Found mailbox over quota (50GB limit reached)
  - 09:40: Increased quota to 60GB
  - 09:45: User confirmed sending now works

Resolution:
  Root Cause: Mailbox quota exceeded
  Solution: Increased mailbox quota, advised user to archive old emails

  Resolution Code: Quota Adjustment
  Closure Code: Resolved - Configuration Change
  Actual Resolution Time: 30 minutes ✅
```

### Ticket Prioritization Matrix

```
┌────────────────────────────────────────────┐
│           Impact vs Urgency                │
├────────────────────────────────────────────┤
│              │ Low  │ Med  │ High │ Crit  │
│──────────────┼──────┼──────┼──────┼───────│
│ Urgent       │  P3  │  P2  │  P1  │  P1   │
│ High         │  P3  │  P2  │  P2  │  P1   │
│ Medium       │  P4  │  P3  │  P2  │  P2   │
│ Low          │  P4  │  P4  │  P3  │  P3   │
└────────────────────────────────────────────┘

Impact:
  Critical: Business stopped, >1000 users
  High: Major degradation, 100-1000 users
  Medium: Moderate impact, 10-100 users
  Low: Minor inconvenience, <10 users

Urgency:
  Urgent: Immediate business need
  High: Important but not immediate
  Medium: Can wait hours
  Low: Can wait days
```

### Ticket Categories

```yaml
Hardware:
  - Desktop/Laptop
  - Printer
  - Phone
  - Monitor
  - Peripherals

Software:
  - Application Access
  - Application Error
  - Installation
  - License

Network:
  - Connectivity
  - VPN
  - WiFi
  - Slow Performance

Email:
  - Cannot Send
  - Cannot Receive
  - Spam/Phishing
  - Quota

Account:
  - Password Reset
  - Account Locked
  - New User Setup
  - Permissions

Service Request:
  - New Hardware
  - Software License
  - Access Request
  - Information Request
```

## Service Request Management

### Standard Request Catalog

```yaml
Request Catalog:

New User Onboarding:
  Approval: Manager
  SLA: 1 business day
  Cost: $50 setup fee
  Fulfillment: Automated workflow
  Includes:
    - Active Directory account
    - Email mailbox
    - Standard software
    - VPN access
    - Laptop (if hardware request included)

Software Installation:
  Approval: Manager (if licensed), None (if free)
  SLA: 2 business days
  Cost: License cost (if applicable)
  Fulfillment: Self-service (approved list) or manual

Access Request:
  Approval: Data owner
  SLA: 4 hours (expedited), 1 day (standard)
  Cost: Free
  Fulfillment: Automated for standard roles

Hardware Request:
  Approval: Manager + Budget holder
  SLA: 5 business days
  Cost: Hardware + shipping + setup fee
  Fulfillment: Procurement → IT setup → Delivery
```

### Request Fulfillment Workflow

```
User Request
     ↓
Self-Service Portal
     ↓
Automated Approval (if standard request)
     ↓
Fulfillment Team Assignment
     ↓
Provisioning (automated or manual)
     ↓
Quality Check
     ↓
User Notification
     ↓
Closure
```

## Best Practices

### 1. Knowledge Management

**Build searchable knowledge base:**
```yaml
Knowledge Article: KB-0123
Title: How to Reset Your Password
Category: Account Management
Tags: password, reset, login, account
Helpful: 245 users
Last Updated: 2024-10-15

Steps:
  1. Go to password.company.com
  2. Enter your username
  3. Click "Forgot Password"
  4. Follow email instructions
  5. Use new password to login

Related Articles:
  - KB-0124: Account Locked After Failed Logins
  - KB-0125: Setting Up Multi-Factor Authentication
```

### 2. Automation

**Automate repetitive tasks:**
- Password resets via self-service
- Standard software installations
- Access provisioning for standard roles
- Ticket routing based on keywords

### 3. Communication Templates

**Standardized responses:**
```
Incident Acknowledgment:
  "Thank you for contacting IT Support. Your incident INC-{number}
   has been logged with priority {priority}. We will respond within
   {response_time} and aim to resolve by {resolution_time}."

Resolution Notification:
  "Your incident INC-{number} has been resolved. Please verify the
   fix and reply to this email if you need further assistance."

Scheduled Maintenance:
  "Scheduled maintenance on {service} will occur on {date} from
   {start_time} to {end_time}. Expected impact: {impact_description}"
```

### 4. Performance Metrics

**Track and improve:**
```yaml
Service Desk KPIs:

Efficiency:
  - First Contact Resolution: >70%
  - Average Handle Time: <10 minutes
  - Tickets Per Analyst Per Day: 40-60

Quality:
  - Customer Satisfaction (CSAT): >4.0/5.0
  - Ticket Reopen Rate: <5%
  - SLA Compliance: >95%

Productivity:
  - Backlog Age: <3 days average
  - Ticket Aging (>7 days): <10%
  - Self-Service Adoption: >30%
```

### 5. Continuous Training

- Regular product training
- Soft skills development
- Knowledge sharing sessions
- Shadowing and mentoring

### 6. User Satisfaction

**Measure and act on feedback:**
```yaml
Post-Resolution Survey:

1. How satisfied were you with the resolution?
   ⭐⭐⭐⭐⭐ (1-5)

2. Was your issue resolved in a timely manner?
   Yes / No

3. How would you rate the analyst's professionalism?
   ⭐⭐⭐⭐⭐ (1-5)

4. Additional comments:
   [Free text]

Results tracked monthly with improvement actions.
```

---

**Related Resources:**
- [itil-framework.md](itil-framework.md) - ITIL 4 service management framework
- [help-desk-operations.md](help-desk-operations.md) - Day-to-day service desk operations
- [automation-orchestration.md](automation-orchestration.md) - Service automation
