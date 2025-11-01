# Asset Management

IT asset tracking, software licensing, hardware lifecycle management, and Configuration Management Database (CMDB) for managing IT assets effectively.

## Table of Contents

- [Asset Management Overview](#asset-management-overview)
- [Hardware Asset Management](#hardware-asset-management)
- [Software Asset Management](#software-asset-management)
- [CMDB (Configuration Management Database)](#cmdb-configuration-management-database)
- [Asset Lifecycle](#asset-lifecycle)
- [License Management](#license-management)
- [Best Practices](#best-practices)

## Asset Management Overview

### Purpose

IT Asset Management (ITAM) provides:
- Complete inventory of IT assets
- Cost tracking and optimization
- License compliance
- Security and risk management
- Lifecycle planning
- Financial planning

### Asset Categories

```
IT Assets
├── Hardware
│   ├── End-User Devices (laptops, desktops, phones)
│   ├── Servers (physical, virtual)
│   ├── Network Devices (routers, switches, firewalls)
│   ├── Storage (SAN, NAS, backup)
│   └── Peripherals (printers, monitors, accessories)
│
├── Software
│   ├── Operating Systems
│   ├── Applications (licensed, SaaS)
│   ├── Development Tools
│   └── Utilities
│
├── Cloud Services
│   ├── IaaS (EC2, VMs)
│   ├── PaaS (databases, platforms)
│   └── SaaS (applications)
│
└── Digital Assets
    ├── Certificates
    ├── Domains
    ├── IP Addresses
    └── Data
```

## Hardware Asset Management

### Hardware Asset Tracking

```yaml
Asset Record: LAPTOP-12345

Basic Information:
  Asset Tag: LAPTOP-12345
  Serial Number: ABC123XYZ789
  Manufacturer: Dell
  Model: Latitude 5520
  Type: Laptop

Financial:
  Purchase Date: 2024-01-15
  Purchase Cost: $1,200
  Supplier: Dell Direct
  PO Number: PO-2024-001
  Depreciation: 3 years (straight-line)
  Current Value: $800 (8 months old)
  Warranty Expiry: 2027-01-15

Technical:
  CPU: Intel i7-11th Gen
  RAM: 16GB DDR4
  Storage: 512GB NVMe SSD
  OS: Windows 11 Pro
  Hostname: LAPTOP-JDOE

Assignment:
  Status: Deployed
  Assigned To: John Doe (john.doe@company.com)
  Department: Sales
  Location: Building A, Floor 3
  Assignment Date: 2024-01-20

Lifecycle:
  Stage: In Use
  Next Review: 2026-01-15 (2 year mark)
  Expected Refresh: 2027-01-15 (3 years)
  Disposal Date: TBD

Maintenance History:
  - 2024-06-10: Battery replaced
  - 2024-08-15: RAM upgraded from 8GB to 16GB

Compliance:
  - Security encryption: Enabled (BitLocker)
  - Antivirus: Installed and current
  - Patch level: Up to date
  - MDM enrolled: Yes
```

### Hardware Inventory Methods

**1. Manual Tracking:**
```yaml
Pros:
  - Low cost
  - Simple to start
  - Works for small organizations

Cons:
  - Time-consuming
  - Error-prone
  - Difficult to scale
  - Stale data

Best for: <50 assets
```

**2. Barcode/RFID Scanning:**
```yaml
Pros:
  - Quick data capture
  - Reduces errors
  - Supports physical audits

Cons:
  - Requires scanning hardware
  - Manual process
  - Doesn't capture software

Best for: 50-500 assets
```

**3. Automated Discovery:**
```yaml
Tools:
  - Microsoft SCCM/Intune
  - ServiceNow Discovery
  - Lansweeper
  - Snipe-IT

Pros:
  - Automatic updates
  - Software inventory included
  - Real-time data
  - Minimal manual work

Cons:
  - Requires network access
  - Initial setup complexity
  - May miss offline devices

Best for: 500+ assets, distributed environments
```

### Hardware Procurement Process

```
Need Identified
     ↓
Request Submitted (ServiceNow/Portal)
     ↓
Manager Approval
     ↓
Budget Verification
     ↓
Vendor Selection
     ↓
Purchase Order Created
     ↓
Asset Received
     ↓
Asset Tagged and Recorded in CMDB
     ↓
Configuration/Setup
     ↓
Deployed to User
     ↓
Asset Record Updated (assignment, location)
```

## Software Asset Management

### Software Inventory

```yaml
Software Asset: Microsoft Office 365 E3

Product Information:
  Vendor: Microsoft
  Product: Office 365 E3
  Version: Current (cloud-based)
  Category: Productivity Suite

Licensing:
  License Type: Subscription (per user/month)
  Agreement: Enterprise Agreement
  Agreement Number: EA-123456
  Purchased Licenses: 1,000
  Deployed Licenses: 850
  Available: 150
  Cost per License: $20/user/month
  Annual Cost: $240,000

Contract:
  Start Date: 2024-01-01
  End Date: 2026-12-31
  Term: 3 years
  Renewal Date: 2026-10-01 (notify 90 days prior)
  Auto-Renewal: No

Usage Tracking:
  Assigned Users: 850
  Active Users (last 30 days): 780
  Inactive Users: 70 (candidates for license reclaim)
  Peak Usage: 810

Compliance:
  Status: Compliant ✅
  Last Audit: 2024-10-01
  Next Audit: 2025-04-01
  License Shortfall: 0
  License Waste: 70 (inactive users)
```

### Software License Types

**1. Per-User/Per-Device:**
```
Examples: Microsoft Office, Adobe Creative Cloud
Pricing: Fixed per user or device
Compliance: Track assignments vs licenses purchased
```

**2. Concurrent/Floating:**
```
Examples: Engineering software, CAD tools
Pricing: Based on simultaneous users
Compliance: Monitor license server for peak usage
```

**3. Subscription (SaaS):**
```
Examples: Salesforce, Slack, Google Workspace
Pricing: Per user/month
Compliance: Track active users, remove inactive
```

**4. Enterprise Agreement:**
```
Examples: Microsoft EA, Oracle ULA
Pricing: Negotiated bulk pricing
Compliance: Regular true-ups, usage reporting
```

**5. Open Source:**
```
Examples: Linux, Apache, PostgreSQL
Pricing: Free (may have support costs)
Compliance: License terms vary (GPL, MIT, Apache)
```

### Software Compliance

**License Compliance Checks:**
```yaml
Quarterly Compliance Review:

1. Inventory Installed Software:
   Tool: SCCM/Lansweeper scan
   Compare: Installed vs purchased licenses

2. Identify Gaps:
   - Unlicensed software (remove or purchase)
   - Over-licensed software (reclaim or reduce)
   - Expired licenses (renew or remove)

3. Vendor Audits:
   - Microsoft SAM engagement
   - Oracle LMS audit
   - Adobe compliance check

4. Corrective Actions:
   - Purchase additional licenses
   - Uninstall unauthorized software
   - Reclaim unused licenses
   - Update contracts

5. Documentation:
   - Compliance report
   - Purchase orders
   - License certificates
   - Audit responses
```

## CMDB (Configuration Management Database)

### CMDB Purpose

The CMDB provides:
- Single source of truth for IT configuration
- Relationships between configuration items (CIs)
- Impact analysis for changes
- Service dependencies
- Asset inventory

### Configuration Items (CIs)

```yaml
CI Types:

Hardware:
  - Servers
  - Network devices
  - End-user devices
  - Storage arrays

Software:
  - Applications
  - Databases
  - Middleware
  - Operating systems

Services:
  - Business services
  - Technical services
  - Cloud services

People:
  - IT staff
  - Vendors
  - Service providers

Documentation:
  - Runbooks
  - Architecture diagrams
  - Contracts
```

### CI Relationships

```
Business Service: Customer Portal
    │
    ├─── Uses ───> Application: Web Application
    │                  │
    │                  ├─── Runs On ───> Server: WEB-01
    │                  │                    │
    │                  │                    └─── Hosted In ───> Data Center: DC1
    │                  │
    │                  └─── Depends On ───> Application: API Service
    │                                          │
    │                                          └─── Uses ───> Database: PROD-DB
    │
    ├─── Uses ───> Service: CDN
    │
    └─── Supports ───> Business Process: Online Sales
```

### CMDB Example Record

```yaml
CI: WEB-01

Type: Physical Server
Class: Production
Environment: Production

Identification:
  CI ID: CI-12345
  Asset Tag: SRV-WEB-01
  Serial: VMW-ABC-123
  Hostname: web01.company.com

Technical:
  OS: Ubuntu 22.04 LTS
  CPU: 8 cores
  RAM: 32 GB
  Storage: 500 GB SSD

Network:
  IP Address: 10.0.1.10
  MAC: 00:50:56:9A:12:34
  VLAN: VLAN-100-Web
  Subnet: 10.0.1.0/24

Relationships:
  Runs Applications:
    - Customer Portal (app-portal-01)
    - Admin Dashboard (app-admin-01)

  Depends On:
    - Load Balancer (lb-01)
    - Database Server (db-01)
    - Active Directory (ad-01)

  Hosted In:
    - Data Center: DC1
    - Rack: R-15
    - U Position: U20-U22

Ownership:
  Technical Owner: Infrastructure Team
  Business Owner: E-commerce Manager
  Cost Center: 12345

Lifecycle:
  Status: In Production
  Deployed: 2023-01-15
  Next Review: 2025-01-15
  Retirement Date: 2026-01-15

Compliance:
  - PCI DSS: Yes
  - Encryption: Disk encrypted
  - Patching: Current
  - Backup: Daily
```

### CMDB Maintenance

**Keep CMDB Accurate:**
```yaml
Automated Updates:
  - Discovery tools (daily scans)
  - Integration with provisioning systems
  - Change management updates
  - Monitoring tool integration

Manual Updates:
  - Quarterly reviews
  - Annual audits
  - Change implementation updates
  - Decommissioning records

Reconciliation:
  - Compare discovery vs CMDB
  - Identify discrepancies
  - Update or create CIs
  - Archive decommissioned CIs
```

## Asset Lifecycle

### Hardware Lifecycle Stages

```
┌────────────────────────────────────────┐
│ 1. Planning                            │
│    - Identify need                     │
│    - Budget approval                   │
│    - Vendor selection                  │
└─────────┬──────────────────────────────┘
          ↓
┌────────────────────────────────────────┐
│ 2. Procurement                         │
│    - Purchase order                    │
│    - Delivery                          │
│    - Asset tag assignment              │
└─────────┬──────────────────────────────┘
          ↓
┌────────────────────────────────────────┐
│ 3. Deployment                          │
│    - Configuration                     │
│    - Installation                      │
│    - User assignment                   │
│    - CMDB update                       │
└─────────┬──────────────────────────────┘
          ↓
┌────────────────────────────────────────┐
│ 4. Operations & Maintenance            │
│    - Monitoring                        │
│    - Support                           │
│    - Updates                           │
│    - Repairs                           │
│    Duration: 2-5 years typically       │
└─────────┬──────────────────────────────┘
          ↓
┌────────────────────────────────────────┐
│ 5. Refresh/Upgrade Decision            │
│    - Performance review                │
│    - Cost analysis                     │
│    - Technology assessment             │
└─────────┬──────────────────────────────┘
          ↓
┌────────────────────────────────────────┐
│ 6. Retirement                          │
│    - Data sanitization                 │
│    - Decommissioning                   │
│    - Asset disposal                    │
│    - CMDB update (retired)             │
└────────────────────────────────────────┘
```

### Refresh Cycles

```yaml
Typical Refresh Schedules:

End-User Devices:
  Laptops: 3 years
  Desktops: 4 years
  Phones: 2 years
  Monitors: 5 years

Servers:
  Physical servers: 5 years
  Storage arrays: 5 years
  Network switches: 7 years

Reasons:
  - Warranty expiration
  - Performance degradation
  - Technology obsolescence
  - Lease end
  - Security requirements
```

### Asset Disposal

**Secure Disposal Process:**
```yaml
1. Data Sanitization:
   Laptops/Desktops:
     - Boot to DBAN (Darik's Boot and Nuke)
     - DoD 5220.22-M wipe (7-pass)
     - Certificate of destruction

   Servers:
     - Remove all drives
     - Dedicated drive shredding
     - Physical destruction

   Mobile Devices:
     - Factory reset
     - MDM wipe
     - Remove SIM/SD cards

2. Physical Disposal:
   Options:
     - Trade-in (refurbished resale)
     - E-waste recycling (certified vendor)
     - Donation (after sanitization)
     - Physical destruction (high-security)

3. Documentation:
   - Certificate of data destruction
   - Disposal receipt
   - CMDB update (status: Disposed)
   - Asset record retention (7 years for audit)

4. Environmental Compliance:
   - WEEE Directive (EU)
   - EPA regulations (US)
   - R2 Certified recycler
```

## License Management

### License Optimization

**Reduce License Costs:**
```yaml
Strategies:

1. Identify Inactive Users:
   Query:
     SELECT user, last_login
     FROM software_usage
     WHERE product = 'Adobe Creative Cloud'
     AND last_login < DATE_SUB(NOW(), INTERVAL 90 DAY)

   Action: Reclaim 70 unused licenses
   Savings: 70 × $55/month = $3,850/month

2. Right-Size License Types:
   Example:
     - 50 users have Office E5 ($35/month)
     - Only use features in E3 ($20/month)
   Action: Downgrade to E3
   Savings: 50 × $15/month = $750/month

3. Consolidate Vendors:
   Example:
     - 3 different communication tools
     - Standardize on one platform
   Action: Eliminate redundant tools
   Savings: $10,000/year

4. Negotiate Enterprise Agreements:
   - Volume discounts
   - Multi-year commitments
   - Bundle purchasing
```

### Software Audit Preparation

```yaml
Vendor Audit Process:

1. Notification:
   - Vendor requests audit (30-90 days notice)
   - Identify audit scope

2. Preparation:
   - Run discovery tools
   - Compile license agreements
   - Document deployments
   - Calculate license position

3. Gap Analysis:
   - Compare deployed vs licensed
   - Identify shortfalls
   - Calculate potential costs

4. Remediation (if needed):
   - Purchase additional licenses
   - Uninstall excess software
   - Negotiate settlement

5. Audit Response:
   - Submit documentation
   - Provide deployment data
   - Answer vendor questions

6. Post-Audit:
   - Implement SAM process
   - Regular compliance checks
   - Improve tracking
```

## Best Practices

### 1. Automate Discovery

Use automated tools to maintain accurate inventory.

### 2. Standardize Asset Tagging

```yaml
Asset Tag Format: [TYPE]-[LOCATION]-[SEQUENCE]

Examples:
  LAPTOP-NYC-00123
  SRV-DC1-00045
  NET-LON-00067

Benefits:
  - Easy to identify asset type
  - Know location at a glance
  - Unique identifier
```

### 3. Regular Audits

```yaml
Audit Schedule:
  - Physical inventory: Annually
  - Software compliance: Quarterly
  - CMDB reconciliation: Monthly
  - High-value assets: Semi-annually
```

### 4. Lifecycle Planning

Budget for refresh cycles to avoid surprise costs.

### 5. Integration

Integrate ITAM with:
- Service desk (for requests and incidents)
- Procurement (for new assets)
- Financial systems (for depreciation)
- CMDB (for relationships)
- Change management (for updates)

### 6. Metrics and Reporting

```yaml
Key Metrics:

Financial:
  - Total asset value
  - Depreciation expense
  - License compliance cost avoidance

Operational:
  - Asset utilization rate
  - Average asset age
  - Refresh cycle adherence

Compliance:
  - Software compliance %
  - Audit findings (count)
  - Unlicensed software instances
```

---

**Related Resources:**
- [itil-framework.md](itil-framework.md) - IT asset management practice
- [service-management.md](service-management.md) - Service catalog integration
- [it-governance.md](it-governance.md) - Asset management policies
