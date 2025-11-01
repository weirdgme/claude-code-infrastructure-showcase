# Cleared Environment Architecture

Architectural patterns, design principles, and reference architectures for classified and controlled environments supporting Secret, Top Secret/SCI, CUI, and ITAR workloads.

## Table of Contents

- [Overview](#overview)
- [Reference Architectures](#reference-architectures)
- [Security Zones](#security-zones)
- [Cross-Domain Solutions](#cross-domain-solutions)
- [High Availability Patterns](#high-availability-patterns)
- [Disaster Recovery](#disaster-recovery)
- [Best Practices](#best-practices)

---

## Overview

**Cleared Environment Architecture** addresses unique challenges of classified systems: physical separation, strict access controls, limited connectivity, and compliance with security directives.

**Key Design Principles:**

```
Cleared Environment Principles:
┌─────────────────────────────────────────────────────┐
│ 1. Defense in Depth                                 │
│    - Multiple security layers                       │
│    - No single point of failure                     │
│    - Redundant controls                             │
├─────────────────────────────────────────────────────┤
│ 2. Least Privilege                                  │
│    - Minimal access rights                          │
│    - Need-to-know enforcement                       │
│    - Compartmentalization                           │
├─────────────────────────────────────────────────────┤
│ 3. Air-Gap Isolation                                │
│    - Physical network separation                    │
│    - Controlled data transfer                       │
│    - One-way data flows                             │
├─────────────────────────────────────────────────────┤
│ 4. Audit Everything                                 │
│    - Comprehensive logging                          │
│    - Immutable audit trails                         │
│    - Real-time monitoring                           │
├─────────────────────────────────────────────────────┤
│ 5. Assume Breach                                    │
│    - Continuous validation                          │
│    - Threat detection                               │
│    - Rapid response capability                      │
└─────────────────────────────────────────────────────┘
```

---

## Reference Architectures

### Architecture 1: CUI Cloud Architecture (NIST 800-171)

```
CUI Cloud Reference Architecture (AWS GovCloud):
┌──────────────────────────────────────────────────────────────────┐
│ AWS GOVCLOUD (US)                                                │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ VPC (10.0.0.0/16) - CUI Network                            │ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ Public Subnet (10.0.1.0/24) - DMZ                    │ │ │
│  │  │  ┌──────────┐  ┌──────────┐                          │ │ │
│  │  │  │ ALB      │  │ NAT GW   │                          │ │ │
│  │  │  └──────────┘  └──────────┘                          │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ Private Subnet (10.0.10.0/24) - Application Tier     │ │ │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │ │ │
│  │  │  │ EKS Node │  │ EKS Node │  │ EKS Node │           │ │ │
│  │  │  └──────────┘  └──────────┘  └──────────┘           │ │ │
│  │  │  - Encrypted EBS volumes (FIPS 140-2)                │ │ │
│  │  │  - MFA-protected access                              │ │ │
│  │  │  - Audit logging to CloudWatch                       │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ Data Subnet (10.0.20.0/24) - Data Tier              │ │ │
│  │  │  ┌──────────┐  ┌──────────┐                          │ │ │
│  │  │  │ RDS      │  │ S3 VPC   │                          │ │ │
│  │  │  │ (KMS)    │  │ Endpoint │                          │ │ │
│  │  │  └──────────┘  └──────────┘                          │ │ │
│  │  │  - Encryption at rest (FIPS validated KMS)           │ │ │
│  │  │  - No internet access                                │ │ │
│  │  │  - Backup to separate account                        │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Security Services:                                              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌─────────────┐ │
│  │ CloudTrail │ │ Config     │ │ GuardDuty  │ │ Security Hub│ │
│  │ (all API)  │ │ (compliance│ │ (threats)  │ │ (findings)  │ │
│  └────────────┘ └────────────┘ └────────────┘ └─────────────┘ │
│                                                                  │
│  Direct Connect (FIPS 140-2 encrypted):                          │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ On-Premises Cleared Facility ←→ AWS Direct Connect         │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘

Compliance Controls:
- NIST 800-171: 110 controls
- Access: MFA required, U.S. persons only
- Encryption: FIPS 140-2 validated
- Monitoring: Real-time SIEM integration
- Backup: Daily encrypted backups, 7-year retention
```

### Architecture 2: Secret / DoD IL6 Architecture

```
Secret Workload Architecture (Azure Government DoD):
┌──────────────────────────────────────────────────────────────────┐
│ AZURE GOVERNMENT DOD EAST (SECRET - IL6)                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Virtual Network (10.100.0.0/16)                            │ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ Management Subnet (10.100.0.0/24)                    │ │ │
│  │  │  ┌──────────┐  ┌──────────┐                          │ │ │
│  │  │  │ Bastion  │  │ Jump Box │                          │ │ │
│  │  │  │ (CAC)    │  │ (Secret  │                          │ │ │
│  │  │  │          │  │ cleared) │                          │ │ │
│  │  │  └──────────┘  └──────────┘                          │ │ │
│  │  │  - CAC/PIV authentication required                   │ │ │
│  │  │  - All sessions logged                               │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ Application Subnet (10.100.10.0/24)                  │ │ │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │ │ │
│  │  │  │ AKS Node │  │ AKS Node │  │ AKS Node │           │ │ │
│  │  │  │ (IL6)    │  │ (IL6)    │  │ (IL6)    │           │ │ │
│  │  │  └──────────┘  └──────────┘  └──────────┘           │ │ │
│  │  │  - Kubernetes RBAC with CAC integration              │ │ │
│  │  │  - Encrypted persistent volumes (FIPS 140-2 L3+)     │ │ │
│  │  │  - Pod Security Standards: Restricted                │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ Data Subnet (10.100.20.0/24)                         │ │ │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │ │ │
│  │  │  │ SQL MI   │  │ Cosmos DB│  │ Key Vault│           │ │ │
│  │  │  │ (TDE)    │  │ (CMK)    │  │ (HSM)    │           │ │ │
│  │  │  └──────────┘  └──────────┘  └──────────┘           │ │ │
│  │  │  - Transparent Data Encryption                       │ │ │
│  │  │  - Customer-managed keys (CMK)                       │ │ │
│  │  │  - FIPS 140-2 Level 3 HSM                            │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Security:                                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Microsoft Defender for Cloud (IL6)                         │ │
│  │ - Just-In-Time VM Access                                   │ │
│  │ - File Integrity Monitoring                                │ │
│  │ - Adaptive Application Controls                            │ │
│  │ - Network Security Groups (default deny)                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Connectivity:                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ExpressRoute (IL6-approved) ←→ SIPRNET                    │ │
│  │ - Dedicated connection                                     │ │
│  │ - Suite B cryptography                                     │ │
│  │ - No internet breakout                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘

Personnel Requirements:
- Secret clearance: All operators and developers
- Two-person integrity: Database access
- Continuous monitoring: SIEM + SOC
```

### Architecture 3: Air-Gapped TS/SCI Architecture

```
Top Secret/SCI Air-Gapped Architecture:
┌──────────────────────────────────────────────────────────────────┐
│ SCIF FACILITY - TS/SCI PROCESSING                                │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ PHYSICAL SECURITY PERIMETER                                │ │
│  │  - Cipher locks on all entry points                        │ │
│  │  - Continuous CCTV monitoring                              │ │
│  │  - Two-person integrity zones                              │ │
│  │  - No personal devices allowed                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ AIR-GAPPED KUBERNETES CLUSTER                              │ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ Control Plane (10.200.0.0/24)                        │ │ │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │ │ │
│  │  │  │ Master 1 │  │ Master 2 │  │ Master 3 │           │ │ │
│  │  │  └──────────┘  └──────────┘  └──────────┘           │ │ │
│  │  │  - etcd encryption with Type 1 crypto                │ │ │
│  │  │  - RBAC with CAC + biometric                         │ │ │
│  │  │  - Audit logs to WORM storage                        │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ Worker Nodes (10.200.10.0/24)                        │ │ │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │ │ │
│  │  │  │ Worker 1 │  │ Worker 2 │  │ Worker N │           │ │ │
│  │  │  └──────────┘  └──────────┘  └──────────┘           │ │ │
│  │  │  - TPM 2.0 for secrets                               │ │ │
│  │  │  - Encrypted volumes (Type 1)                        │ │ │
│  │  │  - IDS/IPS on each node                              │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ Storage Layer                                        │ │ │
│  │  │  ┌──────────┐  ┌──────────┐                          │ │ │
│  │  │  │ Ceph     │  │ Backup   │                          │ │ │
│  │  │  │ Cluster  │  │ System   │                          │ │ │
│  │  │  └──────────┘  └──────────┘                          │ │ │
│  │  │  - Triple replication                                │ │ │
│  │  │  - Encryption at rest (NSA-approved)                 │ │ │
│  │  │  - Offline backups (tape)                            │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ DATA DIODE (One-Way Transfer)                              │ │
│  │                                                            │ │
│  │  [Secret Network] ──────ONE-WAY─────→ [TS/SCI Network]    │ │
│  │                                                            │ │
│  │  - Hardware-enforced                                      │ │
│  │  - Content inspection                                     │
│  │  - Malware scanning                                       │
│  │  - Data sanitization                                      │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ MONITORING & SECURITY                                      │ │
│  │  - 24/7 Security Operations Center                        │ │
│  │  - Real-time anomaly detection (AI/ML)                    │ │
│  │  - Insider threat detection                               │ │
│  │  - All actions logged to WORM                             │ │
│  │  - 25-year retention                                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ PHYSICAL CONNECTIVITY                                      │ │
│  │  ✅ JWICS (TS/SCI network) - Approved terminal            │ │
│  │  ❌ NO internet connectivity                              │ │
│  │  ❌ NO wireless networks                                  │ │
│  │  ❌ NO external USB devices                               │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘

Access Requirements:
- TS/SCI clearance with polygraph
- Compartment access approval
- Continuous monitoring
- Biometric + CAC authentication
```

---

## Security Zones

### Zone Model

```
Security Zone Architecture:
┌─────────────────────────────────────────────────────┐
│ ZONE 0: Public/Internet                             │
│ - No sensitive data                                 │
│ - WAF protection                                    │
│ - DDoS mitigation                                   │
└───────────┬─────────────────────────────────────────┘
            │ Firewall + IDS/IPS
┌───────────▼─────────────────────────────────────────┐
│ ZONE 1: DMZ (Unclassified)                          │
│ - Public-facing services                            │
│ - Reverse proxies                                   │
│ - Certificate termination                           │
└───────────┬─────────────────────────────────────────┘
            │ Firewall + Deep Packet Inspection
┌───────────▼─────────────────────────────────────────┐
│ ZONE 2: Internal Applications (Unclassified)        │
│ - Business applications                             │
│ - Internal APIs                                     │
│ - Standard security controls                        │
└───────────┬─────────────────────────────────────────┘
            │ CDS (Cross-Domain Solution)
┌───────────▼─────────────────────────────────────────┐
│ ZONE 3: CUI Processing                              │
│ - NIST 800-171 controls                             │
│ - MFA required                                      │
│ - Enhanced logging                                  │
└───────────┬─────────────────────────────────────────┘
            │ Trusted Guard
┌───────────▼─────────────────────────────────────────┐
│ ZONE 4: Secret Processing                           │
│ - Secret clearance required                         │
│ - CAC/PIV authentication                            │
│ - Real-time monitoring                              │
└───────────┬─────────────────────────────────────────┘
            │ Data Diode (One-Way)
┌───────────▼─────────────────────────────────────────┐
│ ZONE 5: TS/SCI Processing (Air-Gapped)              │
│ - TS/SCI clearance required                         │
│ - SCIF environment                                  │
│ - Biometric authentication                          │
│ - 24/7 monitoring                                   │
└─────────────────────────────────────────────────────┘
```

---

## Cross-Domain Solutions

### CDS Architecture

```yaml
# Cross-Domain Solution configuration

cross_domain_solution:
  type: "Trusted Guard"
  model: "Owl Computing DualDiode"

  source_network:
    classification: "UNCLASSIFIED"
    ip_range: "10.0.0.0/16"
    allowed_protocols: ["HTTPS", "SFTP"]

  destination_network:
    classification: "SECRET"
    ip_range: "10.100.0.0/16"
    allowed_protocols: ["HTTPS"]

  security_features:
    content_inspection:
      - malware_scanning: "Enabled"
      - data_loss_prevention: "Enabled"
      - file_type_validation: "Whitelist only"
      - size_limits: "100MB per transfer"

    data_sanitization:
      - metadata_stripping: "Enabled"
      - embedded_object_extraction: "Enabled"
      - macro_removal: "Enabled"

    approval_workflow:
      - automatic_transfer: ["System logs", "Performance metrics"]
      - manual_approval_required: ["User data", "Reports", "Documents"]
      - two_person_approval: ["Bulk transfers > 1GB", "Database exports"]

    audit_logging:
      - log_all_transfers: true
      - log_approval_decisions: true
      - log_retention_years: 7
      - immutable_logs: true

  transfer_rules:
    - name: "System Logs"
      direction: "low_to_high"  # Unclass → Secret
      automatic: true
      file_types: [".log", ".json"]
      max_size: "10MB"

    - name: "Reports"
      direction: "high_to_low"  # Secret → Unclass
      automatic: false
      requires_approval: true
      requires_declassification: true
      file_types: [".pdf", ".docx"]

  monitoring:
    alerts:
      - failed_transfers
      - policy_violations
      - anomalous_patterns
    notification_recipients:
      - "security-team@agency.gov"
      - "isso@agency.gov"
```

---

## High Availability Patterns

### Multi-Region HA (CUI)

```
High Availability CUI Architecture:
┌──────────────────────────────────────────────────────────────────┐
│ AWS GOVCLOUD WEST-1 (Primary)                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ VPC-West (10.0.0.0/16)                                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │ │
│  │  │ EKS AZ-A │  │ EKS AZ-B │  │ EKS AZ-C │                 │ │
│  │  └──────────┘  └──────────┘  └──────────┘                 │ │
│  │  ┌──────────┐  ┌──────────┐                               │ │
│  │  │ RDS      │  │ RDS      │                               │ │
│  │  │ Primary  │──│ Standby  │                               │ │
│  │  └──────────┘  └──────────┘                               │ │
│  └────────────────────────────────────────────────────────────┘ │
│       │                                                          │
│       │ Cross-Region Replication (encrypted)                    │
│       ↓                                                          │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ AWS GOVCLOUD EAST-1 (Disaster Recovery)                         │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ VPC-East (10.1.0.0/16)                                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │ │
│  │  │ EKS AZ-A │  │ EKS AZ-B │  │ EKS AZ-C │                 │ │
│  │  │ (standby)│  │ (standby)│  │ (standby)│                 │ │
│  │  └──────────┘  └──────────┘  └──────────┘                 │ │
│  │  ┌──────────┐                                              │ │
│  │  │ RDS      │                                              │ │
│  │  │ Read     │                                              │ │
│  │  │ Replica  │                                              │ │
│  │  └──────────┘                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘

Failover:
- Automatic: RDS replica promotion (< 2 minutes)
- Manual: DNS switch to DR region
- RPO: < 5 minutes
- RTO: < 15 minutes
```

---

## Disaster Recovery

### DR Strategy for Classified Environments

```yaml
disaster_recovery:
  tier_1_critical:  # TS/SCI systems
    rpo: "0 minutes (synchronous replication)"
    rto: "< 5 minutes (hot standby)"
    strategy: "Active-Active with data diode"
    backup:
      frequency: "Continuous"
      retention: "25 years"
      media: "Tape in geographically separated SCIF"
      encryption: "Type 1"

  tier_2_essential:  # Secret systems
    rpo: "< 5 minutes"
    rto: "< 15 minutes"
    strategy: "Active-Passive with warm standby"
    backup:
      frequency: "Hourly incremental, daily full"
      retention: "7 years"
      media: "Encrypted disk + offsite tape"
      encryption: "FIPS 140-2 Level 3"

  tier_3_important:  # CUI systems
    rpo: "< 1 hour"
    rto: "< 4 hours"
    strategy: "Pilot light in DR region"
    backup:
      frequency: "Daily"
      retention: "1 year"
      media: "Cross-region replication"
      encryption: "FIPS 140-2 validated KMS"

  testing:
    frequency: "Quarterly"
    scope: "Full failover test"
    documentation: "Test report required"
    compliance: "ICD 503 Annex A"
```

### Backup Architecture

```
Backup Strategy for Cleared Environments:
┌─────────────────────────────────────────────────────┐
│ PRODUCTION ENVIRONMENT                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Databases│  │ Files    │  │ Configs  │          │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘          │
└───────┼─────────────┼─────────────┼────────────────┘
        │             │             │
        ↓             ↓             ↓
┌───────┴─────────────┴─────────────┴────────────────┐
│ BACKUP TIER 1: Online (WORM Storage)                │
│ - Continuous backup                                 │
│ - Immutable for audit compliance                    │
│ - 90-day retention online                           │
│ - Same classification zone                          │
└───────┬─────────────────────────────────────────────┘
        │ Daily full backup
        ↓
┌───────┴─────────────────────────────────────────────┐
│ BACKUP TIER 2: Near-line (Tape Library)             │
│ - Daily encrypted full backups                      │
│ - Separate physical location (same facility)        │
│ - 1-year retention                                  │
│ - Robotic tape library                              │
└───────┬─────────────────────────────────────────────┘
        │ Weekly archival
        ↓
┌───────┴─────────────────────────────────────────────┐
│ BACKUP TIER 3: Offline (Iron Mountain)              │
│ - Weekly encrypted full backups                     │
│ - Geographically separated facility                 │
│ - 7-year retention (compliance)                     │
│ - Certificate of destruction after retention        │
│ - Two-person integrity for access                   │
└─────────────────────────────────────────────────────┘
```

---

## Best Practices

### 1. Defense in Depth Implementation

```yaml
defense_in_depth_layers:
  layer_1_perimeter:
    - "Physical security (guards, gates, guns)"
    - "SCIF accreditation"
    - "Visitor escort requirements"

  layer_2_network:
    - "Network segmentation (VLANs, subnets)"
    - "Firewalls between zones"
    - "IDS/IPS on all boundaries"
    - "Zero trust network access"

  layer_3_host:
    - "Hardened OS (DISA STIGs)"
    - "Host-based firewall"
    - "Endpoint detection and response (EDR)"
    - "Application whitelisting"

  layer_4_application:
    - "Secure coding practices"
    - "Input validation"
    - "Output encoding"
    - "OWASP Top 10 mitigation"

  layer_5_data:
    - "Encryption at rest (FIPS 140-2)"
    - "Encryption in transit (TLS 1.3)"
    - "Data loss prevention (DLP)"
    - "Rights management"

  layer_6_identity:
    - "CAC/PIV authentication"
    - "MFA enforcement"
    - "Privilege access management (PAM)"
    - "Just-in-time access"

  layer_7_monitoring:
    - "SIEM correlation"
    - "24/7 SOC monitoring"
    - "Threat hunting"
    - "Incident response"
```

### 2. Operational Security (OPSEC)

```python
# opsec_checks.py
"""Operational security validation"""

class OPSECValidator:
    def __init__(self):
        self.findings = []

    def validate_configuration(self, environment):
        """Validate OPSEC configuration"""

        # Check 1: No classified data in logs
        self.check_log_sanitization()

        # Check 2: No PII in hostnames
        self.check_hostname_opsec()

        # Check 3: Error messages don't leak information
        self.check_error_messages()

        # Check 4: No version disclosure
        self.check_version_disclosure()

        # Check 5: Metadata stripped from documents
        self.check_metadata_leakage()

        return self.findings

    def check_log_sanitization(self):
        """Ensure logs don't contain classified markings"""
        # Search for classification markings in logs
        classified_markers = [
            'TOP SECRET', 'SECRET', 'CONFIDENTIAL',
            '(U)', '(S)', '(TS)', '//SCI', '//NOFORN'
        ]

        # Implementation would scan log files
        pass

    def check_hostname_opsec(self):
        """Validate hostnames don't reveal sensitive info"""
        opsec_violations = [
            'secret', 'classified', 'scif', 'cia', 'nsa',
            'weapon', 'missile', 'nuclear'
        ]

        # Check against hostname patterns
        pass

    def check_error_messages(self):
        """Ensure error messages don't leak information"""
        # Check for overly descriptive errors
        # Verify stack traces disabled in production
        pass
```

### 3. Continuous Compliance Monitoring

```bash
#!/bin/bash
# compliance-check.sh - Daily compliance validation

echo "Running compliance checks for cleared environment..."

# Check 1: Verify encryption
check_encryption() {
    echo "Checking encryption status..."

    # Check all EBS volumes encrypted
    aws ec2 describe-volumes \
        --region us-gov-west-1 \
        --query 'Volumes[?Encrypted==`false`]' \
        --output table

    # Check RDS encryption
    aws rds describe-db-instances \
        --region us-gov-west-1 \
        --query 'DBInstances[?StorageEncrypted==`false`]' \
        --output table
}

# Check 2: Verify logging enabled
check_logging() {
    echo "Checking audit logging..."

    # Verify CloudTrail enabled
    aws cloudtrail describe-trails \
        --region us-gov-west-1

    # Check VPC Flow Logs
    aws ec2 describe-flow-logs \
        --region us-gov-west-1
}

# Check 3: Verify MFA compliance
check_mfa() {
    echo "Checking MFA compliance..."

    # List users without MFA
    aws iam get-credential-report \
        | jq -r '.Content' \
        | base64 -d \
        | awk -F',' '$4=="false" {print $1}'
}

# Check 4: Verify geographic restrictions
check_geography() {
    echo "Checking geographic compliance..."

    # Verify no resources in non-compliant regions
    for region in $(aws ec2 describe-regions --query 'Regions[].RegionName' --output text); do
        if [[ ! "$region" =~ ^us-gov- ]]; then
            instances=$(aws ec2 describe-instances --region $region --query 'Reservations[].Instances[].InstanceId' --output text)
            if [ -n "$instances" ]; then
                echo "WARNING: Instances found in non-GovCloud region: $region"
            fi
        fi
    done
}

# Run all checks
check_encryption
check_logging
check_mfa
check_geography

echo "Compliance check complete."
```

### 4. Incident Response for Classified Environments

```yaml
incident_response_plan:
  phase_1_detection:
    - "SIEM alert triggers"
    - "EDR detection"
    - "User report"
    - "Audit finding"

  phase_2_containment:
    immediate_actions:
      - "Isolate affected system (network disconnect)"
      - "Preserve evidence (disk image, memory dump)"
      - "Notify ISSO within 1 hour"
      - "Activate incident response team"

    short_term:
      - "Identify scope of compromise"
      - "Block malicious indicators (IPs, domains, hashes)"
      - "Reset compromised credentials"
      - "Increase monitoring"

  phase_3_eradication:
    - "Remove malware/backdoors"
    - "Patch vulnerabilities"
    - "Rebuild compromised systems"
    - "Verify clean state"

  phase_4_recovery:
    - "Restore from clean backups"
    - "Validate system integrity"
    - "Return to operation"
    - "Enhanced monitoring period"

  phase_5_lessons_learned:
    - "Root cause analysis"
    - "Update security controls"
    - "Revise procedures"
    - "Training for personnel"

  special_considerations_classified:
    - "Classified spillage procedures (ICD 503)"
    - "Counterintelligence notification"
    - "Damage assessment"
    - "Potential compromise reporting"
    - "Security clearance implications"

  reporting_requirements:
    immediate:
      - "ISSO/ISSM"
      - "Authorizing Official"
      - "Security Manager"

    within_1_hour:
      - "US-CERT"
      - "DoD Cyber Crime Center (if DoD)"

    within_24_hours:
      - "Written incident report"
      - "Preliminary damage assessment"

    final_report:
      - "Within 30 days"
      - "Root cause analysis"
      - "Corrective actions"
```

---

**Related Resources:**
- [workload-classification.md](workload-classification.md) - Classification levels and criteria
- [cleared-cloud-environments.md](../../cloud-engineering/resources/cleared-cloud-environments.md) - Cloud implementations
- [disaster-recovery.md](disaster-recovery.md) - DR patterns
- [security-architecture.md](security-architecture.md) - Security design patterns
