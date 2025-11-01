# Compliance Frameworks

Comprehensive guide to compliance frameworks including FedRAMP, CMMC, NIST 800-53/800-171, ITAR, CJIS, PCI-DSS, HIPAA, and SOC 2.

## Table of Contents

- [Overview](#overview)
- [FedRAMP (Federal Risk and Authorization Management Program)](#fedramp-federal-risk-and-authorization-management-program)
- [CMMC (Cybersecurity Maturity Model Certification)](#cmmc-cybersecurity-maturity-model-certification)
- [NIST 800-53](#nist-800-53)
- [NIST 800-171](#nist-800-171)
- [ITAR (International Traffic in Arms Regulations)](#itar-international-traffic-in-arms-regulations)
- [CJIS (Criminal Justice Information Services)](#cjis-criminal-justice-information-services)
- [PCI-DSS (Payment Card Industry Data Security Standard)](#pci-dss-payment-card-industry-data-security-standard)
- [HIPAA (Health Insurance Portability and Accountability Act)](#hipaa-health-insurance-portability-and-accountability-act)
- [SOC 2 (Service Organization Control 2)](#soc-2-service-organization-control-2)
- [Compliance Mapping](#compliance-mapping)
- [Implementation Checklists](#implementation-checklists)
- [Audit Preparation](#audit-preparation)
- [Best Practices](#best-practices)

---

## Overview

**Compliance frameworks** provide structured approaches to implementing security controls, managing risk, and demonstrating compliance with regulatory requirements.

**Framework Hierarchy:**

```
Compliance Framework Landscape:
┌─────────────────────────────────────────────────────┐
│ GOVERNMENT & DEFENSE                                │
│ - FedRAMP (Low, Moderate, High)                     │
│ - CMMC (Levels 1-3)                                 │
│ - NIST 800-53 (DoD, Federal)                        │
│ - NIST 800-171 (CUI)                                │
│ - ITAR (Export control)                             │
│ - CJIS (Law enforcement)                            │
├─────────────────────────────────────────────────────┤
│ COMMERCIAL & INDUSTRY                               │
│ - PCI-DSS (Payment cards)                           │
│ - HIPAA (Healthcare)                                │
│ - SOC 2 (Service providers)                         │
│ - ISO 27001 (International)                         │
│ - GDPR (EU data protection)                         │
└─────────────────────────────────────────────────────┘
```

**Applicability Matrix:**

| Framework | Industry | Scope | Mandatory |
|-----------|----------|-------|-----------|
| FedRAMP | Government cloud services | Federal agencies | Yes (for cloud) |
| CMMC | Defense contractors | DoD supply chain | Yes (upcoming) |
| NIST 800-53 | Federal agencies | Government systems | Yes |
| NIST 800-171 | Defense contractors | CUI handling | Yes |
| ITAR | Defense/aerospace | Export-controlled data | Yes |
| CJIS | Law enforcement | Criminal justice data | Yes |
| PCI-DSS | Payment processors | Card data | Yes |
| HIPAA | Healthcare | PHI/ePHI | Yes |
| SOC 2 | Service providers | Customer data | Voluntary |

---

## FedRAMP (Federal Risk and Authorization Management Program)

**FedRAMP** is a government-wide program providing a standardized approach to security assessment, authorization, and continuous monitoring for cloud products and services.

### Impact Levels

| Level | Controls | Data Classification | Use Case |
|-------|----------|---------------------|----------|
| **Low** | 125+ controls | Public information | Low-impact systems |
| **Moderate** | 325+ controls | Moderate sensitivity | Most federal systems |
| **High** | 421+ controls | High sensitivity | Law enforcement, financial |

### Control Families (NIST 800-53)

```
FedRAMP Control Structure (800-53):
┌─────────────────────────────────────────────────────┐
│ AC - Access Control (22 controls)                   │
│ AT - Awareness and Training (5 controls)            │
│ AU - Audit and Accountability (16 controls)         │
│ CA - Security Assessment and Authorization (9)      │
│ CM - Configuration Management (11 controls)         │
│ CP - Contingency Planning (13 controls)             │
│ IA - Identification and Authentication (11)         │
│ IR - Incident Response (10 controls)                │
│ MA - Maintenance (6 controls)                       │
│ MP - Media Protection (8 controls)                  │
│ PE - Physical and Environmental Protection (20)     │
│ PL - Planning (9 controls)                          │
│ PS - Personnel Security (8 controls)                │
│ RA - Risk Assessment (6 controls)                   │
│ SA - System and Services Acquisition (23)           │
│ SC - System and Communications Protection (46)      │
│ SI - System and Information Integrity (23)          │
│ PM - Program Management (16 controls)               │
└─────────────────────────────────────────────────────┘
```

### Key Requirements

**1. Continuous Monitoring:**

```yaml
# continuous-monitoring-requirements.yaml
monitoring:
  operating_system_scans:
    frequency: monthly
    tool: "Tenable, Qualys, or equivalent"
    scope: "All VMs, containers, serverless"

  database_scans:
    frequency: monthly
    tool: "AppDetectivePro, DbProtect, or equivalent"
    scope: "All databases (RDS, Aurora, etc.)"

  web_application_scans:
    frequency: monthly
    tool: "WebInspect, AppScan, Burp Suite"
    scope: "All public-facing applications"

  incident_response:
    initial_notification: "1 hour"
    full_report: "within SLA"
    documentation: "required in POA&M"

  inventory:
    update_frequency: "monthly"
    required_fields:
      - asset_type
      - ip_address
      - software_versions
      - patch_status
      - data_classification
```

**2. FedRAMP Authorization Process:**

```
Authorization Process (6-12 months):
┌─────────────────────────────────────────────────────┐
│ 1. Package Development (2-4 months)                 │
│    - System Security Plan (SSP)                     │
│    - 13+ required attachments                       │
│    - Control implementation evidence                │
├─────────────────────────────────────────────────────┤
│ 2. 3PAO Assessment (2-3 months)                     │
│    - Security Assessment Plan (SAP)                 │
│    - On-site assessment                             │
│    - Security Assessment Report (SAR)               │
├─────────────────────────────────────────────────────┤
│ 3. Remediation (1-2 months)                         │
│    - Fix identified vulnerabilities                 │
│    - Document in POA&M                              │
│    - 3PAO validation                                │
├─────────────────────────────────────────────────────┤
│ 4. Authorization (1-3 months)                       │
│    - FedRAMP PMO review                             │
│    - JAB review (for JAB P-ATO)                     │
│    - Agency review (for Agency ATO)                 │
│    - Authorization to Operate (ATO) issued          │
├─────────────────────────────────────────────────────┤
│ 5. Continuous Monitoring (ongoing)                  │
│    - Monthly deliverables                           │
│    - Annual assessment                              │
│    - POA&M updates                                  │
└─────────────────────────────────────────────────────┘
```

**3. Terraform Implementation Example:**

```hcl
# fedramp-compliant-infrastructure.tf
# Example: FedRAMP Moderate baseline

# Encryption at rest (SC-28)
resource "aws_ebs_encryption_by_default" "fedramp" {
  enabled = true
}

# Logging and monitoring (AU-2, AU-3, AU-12)
resource "aws_cloudtrail" "fedramp_trail" {
  name                          = "fedramp-cloudtrail"
  s3_bucket_name                = aws_s3_bucket.cloudtrail_bucket.id
  include_global_service_events = true
  is_multi_region_trail         = true
  enable_log_file_validation    = true

  event_selector {
    read_write_type           = "All"
    include_management_events = true
  }

  tags = {
    Compliance = "FedRAMP-Moderate"
    Control    = "AU-2,AU-3,AU-12"
  }
}

# VPC Flow Logs (SI-4)
resource "aws_flow_log" "fedramp_vpc_flow" {
  vpc_id          = aws_vpc.main.id
  traffic_type    = "ALL"
  iam_role_arn    = aws_iam_role.flow_log_role.arn
  log_destination = aws_cloudwatch_log_group.flow_log.arn

  tags = {
    Control = "SI-4"
  }
}

# Config for compliance monitoring (CM-2, CM-3, CM-6)
resource "aws_config_configuration_recorder" "fedramp" {
  name     = "fedramp-config-recorder"
  role_arn = aws_iam_role.config_role.arn

  recording_group {
    all_supported = true
    include_global_resource_types = true
  }
}

resource "aws_config_configuration_recorder_status" "fedramp" {
  name       = aws_config_configuration_recorder.fedramp.name
  is_enabled = true
}

# GuardDuty for threat detection (SI-4)
resource "aws_guardduty_detector" "fedramp" {
  enable = true

  datasources {
    s3_logs {
      enable = true
    }
    kubernetes {
      audit_logs {
        enable = true
      }
    }
  }

  tags = {
    Control = "SI-4"
  }
}

# Security Hub for centralized findings (CA-7, RA-5, SI-2)
resource "aws_securityhub_account" "fedramp" {}

resource "aws_securityhub_standards_subscription" "cis" {
  depends_on    = [aws_securityhub_account.fedramp]
  standards_arn = "arn:aws:securityhub:::ruleset/cis-aws-foundations-benchmark/v/1.2.0"
}

# KMS for encryption (SC-12, SC-13)
resource "aws_kms_key" "fedramp" {
  description             = "FedRAMP encryption key"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Control = "SC-12,SC-13"
  }
}

# WAF for application protection (SC-7)
resource "aws_wafv2_web_acl" "fedramp" {
  name  = "fedramp-waf"
  scope = "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name     = "RateLimitRule"
    priority = 1

    statement {
      rate_based_statement {
        limit              = 2000
        aggregate_key_type = "IP"
      }
    }

    action {
      block {}
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimitRule"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "FedRAMPWAF"
    sampled_requests_enabled   = true
  }

  tags = {
    Control = "SC-7"
  }
}
```

---

## CMMC (Cybersecurity Maturity Model Certification)

**CMMC 2.0** is a cybersecurity framework for the Defense Industrial Base (DIB) to protect Controlled Unclassified Information (CUI) and Federal Contract Information (FCI).

### CMMC Levels

```
CMMC 2.0 Structure:
┌─────────────────────────────────────────────────────┐
│ Level 1: Foundational                               │
│ - 17 practices (subset of FAR 52.204-21)            │
│ - Protects FCI (Federal Contract Information)       │
│ - Annual self-assessment                            │
│ - Required for all DoD contractors                  │
├─────────────────────────────────────────────────────┤
│ Level 2: Advanced                                   │
│ - 110 practices (NIST SP 800-171 Rev 2)             │
│ - Protects CUI (Controlled Unclassified Info)       │
│ - Self-assessment OR C3PAO assessment               │
│ - Required for CUI contractors                      │
├─────────────────────────────────────────────────────┤
│ Level 3: Expert                                     │
│ - 110+ practices (subset of NIST SP 800-172)        │
│ - Advanced/persistent threats (APT)                 │
│ - C3PAO assessment required                         │
│ - Government validation required                    │
│ - Critical national security programs               │
└─────────────────────────────────────────────────────┘
```

### CMMC Level 1 (17 Practices)

**Control Domains:**

```yaml
# CMMC Level 1 Requirements
access_control:
  - AC.L1-3.1.1: "Limit system access to authorized users"
  - AC.L1-3.1.2: "Limit system access to transaction types"
  - AC.L1-3.1.20: "External connections controlled"
  - AC.L1-3.1.22: "Control public information on systems"

identification_authentication:
  - IA.L1-3.5.1: "Identify users, processes, devices"
  - IA.L1-3.5.2: "Authenticate users, processes, devices"

media_protection:
  - MP.L1-3.8.3: "Sanitize/dispose of media with CUI"

physical_protection:
  - PE.L1-3.10.1: "Limit physical access to systems"
  - PE.L1-3.10.3: "Escort visitors"
  - PE.L1-3.10.4: "Physical access logs"
  - PE.L1-3.10.5: "Manage physical access devices"

system_communications_protection:
  - SC.L1-3.13.1: "Boundary protection"
  - SC.L1-3.13.5: "Public-access system separation"

system_information_integrity:
  - SI.L1-3.14.1: "Identify/report/correct flaws"
  - SI.L1-3.14.2: "Malicious code protection"
  - SI.L1-3.14.4: "Update malicious code protection"
  - SI.L1-3.14.5: "System/file scans"
```

### CMMC Level 2 (NIST 800-171)

**14 Control Families:**

```
NIST 800-171 Control Families (110 controls):
┌─────────────────────────────────────────────────────┐
│ 3.1  Access Control (AC) - 22 requirements          │
│ 3.2  Awareness and Training (AT) - 3 requirements   │
│ 3.3  Audit and Accountability (AU) - 9 requirements │
│ 3.4  Configuration Management (CM) - 9 requirements │
│ 3.5  Identification & Authentication (IA) - 11 req  │
│ 3.6  Incident Response (IR) - 5 requirements        │
│ 3.7  Maintenance (MA) - 6 requirements              │
│ 3.8  Media Protection (MP) - 9 requirements         │
│ 3.9  Personnel Security (PS) - 2 requirements       │
│ 3.10 Physical Protection (PE) - 6 requirements      │
│ 3.11 Risk Assessment (RA) - 5 requirements          │
│ 3.12 Security Assessment (CA) - 5 requirements      │
│ 3.13 System/Comms Protection (SC) - 13 requirements │
│ 3.14 System/Info Integrity (SI) - 5 requirements    │
└─────────────────────────────────────────────────────┘
```

**Implementation Example:**

```hcl
# cmmc-level2-controls.tf
# Example: NIST 800-171 controls

# 3.1.1 - Limit system access to authorized users
resource "aws_iam_account_password_policy" "cmmc" {
  minimum_password_length        = 14
  require_lowercase_characters   = true
  require_numbers                = true
  require_uppercase_characters   = true
  require_symbols                = true
  allow_users_to_change_password = true
  max_password_age               = 90
  password_reuse_prevention      = 24
}

# 3.1.3 - Control flow of CUI
resource "aws_security_group" "cmmc_app" {
  name        = "cmmc-application-sg"
  description = "CMMC Level 2 security group"
  vpc_id      = aws_vpc.main.id

  # Only allow traffic from known sources
  ingress {
    description = "HTTPS from approved networks"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]  # Internal only
  }

  # Deny all by default
  egress {
    description = "Allow HTTPS to approved destinations"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }

  tags = {
    CMMC_Control = "3.1.3"
    CUI          = "true"
  }
}

# 3.3.1 - Create audit records
resource "aws_cloudwatch_log_group" "cmmc_audit" {
  name              = "/cmmc/audit-logs"
  retention_in_days = 365  # CMMC requires 1 year minimum

  tags = {
    CMMC_Control = "3.3.1"
    DataType     = "AuditLogs"
  }
}

# 3.8.3 - Sanitize/destroy media containing CUI
resource "aws_s3_bucket" "cmmc_cui" {
  bucket = "cmmc-cui-data"

  tags = {
    DataClassification = "CUI"
    CMMC_Control       = "3.8.3"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "cmmc_cui_lifecycle" {
  bucket = aws_s3_bucket.cmmc_cui.id

  rule {
    id     = "cui-retention-deletion"
    status = "Enabled"

    expiration {
      days = 2555  # 7 years
    }

    noncurrent_version_expiration {
      noncurrent_days = 30
    }
  }
}

# 3.13.8 - Cryptographic protection
resource "aws_s3_bucket_server_side_encryption_configuration" "cmmc_cui" {
  bucket = aws_s3_bucket.cmmc_cui.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.cmmc.arn
    }
    bucket_key_enabled = true
  }
}

# 3.13.11 - Cryptographic mechanisms (FIPS 140-2)
resource "aws_kms_key" "cmmc" {
  description             = "CMMC CUI encryption key"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    CMMC_Control = "3.13.11"
    FIPS_140_2   = "true"
  }
}

# 3.14.1 - Timely flaw identification
resource "aws_inspector2_enabler" "cmmc" {
  account_ids    = [data.aws_caller_identity.current.account_id]
  resource_types = ["EC2", "ECR", "LAMBDA"]
}
```

### Score Interpretation

```
CMMC Scoring System:
┌─────────────────────────────────────────────────────┐
│ Met (3 points)                                      │
│ - Fully implemented                                 │
│ - Evidence provided                                 │
│ - Sustainable/documented                            │
├─────────────────────────────────────────────────────┤
│ Not Met (0 points)                                  │
│ - Not implemented                                   │
│ - Partially implemented                             │
│ - No evidence                                       │
├─────────────────────────────────────────────────────┤
│ Not Applicable (N/A)                                │
│ - Control doesn't apply to system                   │
│ - Must justify why                                  │
└─────────────────────────────────────────────────────┘

Scoring Threshold:
- Level 1: Must meet all 17 practices (100%)
- Level 2: Must meet all 110 practices (100%)
- Level 3: Must meet all enhanced practices (100%)
```

---

## NIST 800-53

**NIST SP 800-53** provides a catalog of security and privacy controls for federal information systems and organizations.

### Revisions

| Revision | Published | Controls | Focus |
|----------|-----------|----------|-------|
| Rev 4 | 2013 | 1000+ | Legacy federal systems |
| Rev 5 | 2020 | 1000+ | Modern threats, supply chain, privacy |

### Control Baselines

```
NIST 800-53 Baselines:
┌─────────────────────────────────────────────────────┐
│ LOW Impact (125 controls)                           │
│ - Confidentiality: Low                              │
│ - Integrity: Low                                    │
│ - Availability: Low                                 │
│ - Example: Public website                           │
├─────────────────────────────────────────────────────┤
│ MODERATE Impact (325 controls)                      │
│ - Confidentiality: Moderate                         │
│ - Integrity: Moderate                               │
│ - Availability: Moderate                            │
│ - Example: Most federal systems                     │
├─────────────────────────────────────────────────────┤
│ HIGH Impact (421 controls)                          │
│ - Confidentiality: High                             │
│ - Integrity: High                                   │
│ - Availability: High                                │
│ - Example: National security systems                │
└─────────────────────────────────────────────────────┘
```

### Key Control Families

**Access Control (AC):**
```yaml
# Example: AC-2 Account Management
AC-2:
  control: "Account Management"
  requirement: |
    a. Define and document account types
    b. Assign account managers
    c. Require approvals for account creation
    d. Create, enable, modify, disable, remove accounts per procedures
    e. Monitor account use
    f. Notify account managers when accounts no longer needed
    g. Authorize access based on valid authorization
    h. Notify account managers when system usage or need-to-know changes
    i. Review accounts for compliance
    j. Establish process for reissuing credentials

  implementation:
    - name: "Automated account management"
      tool: "AWS IAM, Azure AD"
      automation: |
        - Terraform/IaC for account provisioning
        - Lambda/Azure Functions for lifecycle management
        - CloudWatch/Azure Monitor for usage monitoring
```

---

## NIST 800-171

**NIST SP 800-171** protects Controlled Unclassified Information (CUI) in non-federal systems and organizations.

### Scope

```
800-171 Applicability:
┌─────────────────────────────────────────────────────┐
│ WHO: Defense contractors, subcontractors            │
│ WHAT: Systems processing/storing/transmitting CUI   │
│ WHEN: Required in DoD contracts (DFARS clause)      │
│ WHERE: Contractor-owned systems                     │
└─────────────────────────────────────────────────────┘
```

### Control Requirements (110 Total)

**Key Requirements:**

```yaml
# High-priority 800-171 controls
critical_controls:
  access_control:
    - "3.1.1: Limit access to authorized users/processes"
    - "3.1.2: Limit access to authorized functions"
    - "3.1.5: Multi-factor authentication"
    - "3.1.12: Monitor/control remote sessions"

  identification_authentication:
    - "3.5.3: MFA for privileged and non-privileged accounts"
    - "3.5.7: Prevent password reuse (24 generations)"
    - "3.5.8: Prohibit password reuse"
    - "3.5.10: Store/transmit encrypted credentials"

  media_protection:
    - "3.8.3: Sanitize/destroy media with CUI"
    - "3.8.9: Protect backups in separate facility"

  system_communications_protection:
    - "3.13.8: Implement cryptographic mechanisms"
    - "3.13.11: FIPS-validated cryptography for CUI"

  audit_accountability:
    - "3.3.1: Create audit records"
    - "3.3.2: Ensure actions traced to users"
    - "3.3.8: Protect audit information"
    - "3.3.9: Limit audit information management"
```

### Assessment Methodology

```python
# nist-800-171-assessment.py
"""NIST 800-171 self-assessment tool"""

class NIST_800_171_Assessment:
    def __init__(self):
        self.controls = self.load_controls()
        self.scores = {}

    def assess_control(self, control_id, implementation_status):
        """
        Assess a single control

        Args:
            control_id: e.g., "3.1.1"
            implementation_status: "implemented", "partially", "planned", "not_implemented"

        Returns:
            Score: 5 (implemented), 3 (partially), 1 (planned), 0 (not implemented)
        """
        score_map = {
            "implemented": 5,
            "partially": 3,
            "planned": 1,
            "not_implemented": 0
        }

        self.scores[control_id] = score_map.get(implementation_status, 0)
        return self.scores[control_id]

    def calculate_score(self):
        """Calculate overall assessment score"""
        total_possible = len(self.controls) * 5
        total_achieved = sum(self.scores.values())
        percentage = (total_achieved / total_possible) * 100

        return {
            "total_controls": len(self.controls),
            "total_possible_points": total_possible,
            "points_achieved": total_achieved,
            "percentage": percentage,
            "recommendation": self.get_recommendation(percentage)
        }

    def get_recommendation(self, percentage):
        """Provide recommendation based on score"""
        if percentage >= 95:
            return "Ready for C3PAO assessment"
        elif percentage >= 80:
            return "Close to ready, address remaining gaps"
        elif percentage >= 60:
            return "Significant work needed, prioritize high-impact controls"
        else:
            return "Early stage, develop comprehensive implementation plan"

    def generate_poam(self):
        """Generate Plan of Action and Milestones"""
        poam = []
        for control_id, score in self.scores.items():
            if score < 5:  # Not fully implemented
                poam.append({
                    "control": control_id,
                    "current_score": score,
                    "weakness": self.controls[control_id]["description"],
                    "resources": "TBD",
                    "scheduled_completion": "TBD",
                    "milestones": []
                })
        return poam

# Usage
assessment = NIST_800_171_Assessment()
assessment.assess_control("3.1.1", "implemented")
assessment.assess_control("3.1.5", "partially")
results = assessment.calculate_score()
poam = assessment.generate_poam()
```

---

## ITAR (International Traffic in Arms Regulations)

**ITAR** controls the export and import of defense-related articles and services on the United States Munitions List (USML).

### Key Requirements

```
ITAR Compliance Requirements:
┌─────────────────────────────────────────────────────┐
│ DATA PROTECTION                                     │
│ - Export-controlled data segregation                │
│ - Access limited to U.S. persons                    │
│ - No foreign national access without authorization  │
│ - Encrypted storage and transmission                │
├─────────────────────────────────────────────────────┤
│ PERSONNEL                                           │
│ - U.S. citizenship verification                     │
│ - Foreign person access requires DSP-5/TAA          │
│ - Background checks                                 │
│ - Security awareness training                       │
├─────────────────────────────────────────────────────┤
│ TECHNICAL                                           │
│ - Geographic restrictions (U.S. data centers)       │
│ - No international data transfers                   │
│ - Segregated from non-ITAR data                     │
│ - Audit trails for all access                       │
└─────────────────────────────────────────────────────┘
```

### Cloud Implementation

```hcl
# itar-compliant-infrastructure.tf

# Restrict to U.S. regions only
provider "aws" {
  region = "us-gov-west-1"  # GovCloud only

  # Prevent accidental deployment to non-US regions
  allowed_account_ids = [var.govcloud_account_id]
}

# ITAR data bucket
resource "aws_s3_bucket" "itar_data" {
  bucket = "itar-technical-data"

  tags = {
    DataClassification = "ITAR"
    ExportControl      = "USML-Category-VIII"
    AccessRestriction  = "US-Persons-Only"
  }
}

# Restrict access to U.S. persons only
resource "aws_s3_bucket_policy" "itar_access" {
  bucket = aws_s3_bucket.itar_data.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "RestrictToUSPersons"
        Effect = "Deny"
        Principal = "*"
        Action = "s3:*"
        Resource = [
          "${aws_s3_bucket.itar_data.arn}",
          "${aws_s3_bucket.itar_data.arn}/*"
        ]
        Condition = {
          StringNotEquals = {
            "aws:PrincipalTag/Citizenship" = "US"
          }
        }
      },
      {
        Sid    = "EnforceEncryption"
        Effect = "Deny"
        Principal = "*"
        Action = "s3:PutObject"
        Resource = "${aws_s3_bucket.itar_data.arn}/*"
        Condition = {
          StringNotEquals = {
            "s3:x-amz-server-side-encryption" = "aws:kms"
          }
        }
      }
    ]
  })
}

# VPC with no internet access
resource "aws_vpc" "itar_vpc" {
  cidr_block = "10.100.0.0/16"

  tags = {
    Name               = "itar-vpc"
    DataClassification = "ITAR"
  }
}

# NO internet gateway - completely isolated
# Access only via Direct Connect from U.S. facilities

resource "aws_subnet" "itar_private" {
  vpc_id            = aws_vpc.itar_vpc.id
  cidr_block        = "10.100.1.0/24"
  availability_zone = "us-gov-west-1a"

  tags = {
    Name = "itar-private-subnet"
    ITAR = "true"
  }
}

# Audit all access
resource "aws_cloudtrail" "itar_audit" {
  name                          = "itar-audit-trail"
  s3_bucket_name                = aws_s3_bucket.itar_audit_logs.id
  include_global_service_events = true
  is_multi_region_trail         = false  # Stay in US region only
  enable_log_file_validation    = true

  event_selector {
    read_write_type           = "All"
    include_management_events = true

    data_resource {
      type   = "AWS::S3::Object"
      values = ["${aws_s3_bucket.itar_data.arn}/*"]
    }
  }

  tags = {
    Purpose = "ITAR-Compliance-Audit"
  }
}
```

### Access Control Matrix

```yaml
# ITAR access control matrix
access_control:
  us_persons:
    definition: "U.S. citizens, permanent residents, protected persons"
    access: "Full access to ITAR data"
    verification: "I-9 verification required"
    documentation: "Citizenship proof on file"

  foreign_nationals:
    definition: "Non-U.S. persons"
    access: "DENIED unless authorized"
    authorization_required:
      - "DSP-5 (manufacturing license agreement)"
      - "TAA (Technical Assistance Agreement)"
      - "Approved by DDTC"
    documentation: "Export license on file"

  automated_systems:
    access: "Only if operated by U.S. persons"
    location: "Must reside in United States"
    support: "Support staff must be U.S. persons"
```

---

## CJIS (Criminal Justice Information Services)

**CJIS Security Policy** governs access to Criminal Justice Information (CJI), including FBI databases, fingerprints, and criminal history records.

### Key Requirements

```
CJIS Security Policy Areas:
┌─────────────────────────────────────────────────────┐
│ 1. Information Exchange Agreements                  │
│ 2. Security Awareness Training (mandatory)          │
│ 3. Incident Response                                │
│ 4. Auditing and Accountability                      │
│ 5. Access Control (MFA required)                    │
│ 6. Identification and Authentication                │
│ 7. Configuration Management                         │
│ 8. Media Protection                                 │
│ 9. Physical Protection                              │
│ 10. System and Communications Protection            │
│ 11. Information Integrity                           │
│ 12. Maintenance                                     │
│ 13. Personnel Security (background checks)          │
└─────────────────────────────────────────────────────┘
```

### Advanced Authentication (5.11.1)

```yaml
# CJIS MFA requirements
authentication_requirements:
  mfa_required_for:
    - "All users accessing CJI"
    - "Remote access (mandatory)"
    - "Local access (recommended)"

  acceptable_factors:
    - "Something you know (password/PIN)"
    - "Something you have (token, smart card, phone)"
    - "Something you are (biometric)"

  password_requirements:
    minimum_length: 8
    complexity: "Mix of upper, lower, numbers, special"
    max_age_days: 90
    history: 10  # Previous passwords
    account_lockout: 5  # Failed attempts

  implementation:
    aws:
      - "IAM with MFA enforcement"
      - "Cognito with TOTP/SMS"
      - "Directory Service with smart cards"
    azure:
      - "Azure AD with Conditional Access"
      - "MFA with authenticator app"
    gcp:
      - "Identity Platform with 2FA"
      - "Security keys"
```

### Encryption Requirements (5.10)

```hcl
# CJIS encryption requirements
# Data at rest: FIPS 140-2 validated encryption
# Data in transit: TLS 1.2+ or IPsec

# S3 bucket with CJIS-compliant encryption
resource "aws_s3_bucket" "cji_data" {
  bucket = "cjis-criminal-data"

  tags = {
    DataType    = "CJI"
    Compliance  = "CJIS"
    Sensitivity = "Criminal-Justice-Information"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "cji_encryption" {
  bucket = aws_s3_bucket.cji_data.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.cjis_key.arn
    }
  }
}

# FIPS 140-2 validated KMS key
resource "aws_kms_key" "cjis_key" {
  description             = "CJIS CJI encryption key"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Compliance   = "CJIS"
    FIPS_140_2   = "Validated"
    KeyPurpose   = "CJI-Encryption"
  }
}

# Application Load Balancer with TLS 1.2+
resource "aws_lb_listener" "cjis_https" {
  load_balancer_arn = aws_lb.cjis_lb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"  # CJIS compliant
  certificate_arn   = aws_acm_certificate.cjis_cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.cjis_tg.arn
  }
}

# VPN with IPsec for site-to-site
resource "aws_vpn_connection" "cjis_vpn" {
  customer_gateway_id = aws_customer_gateway.agency_gateway.id
  vpn_gateway_id      = aws_vpn_gateway.cjis_vgw.id
  type                = "ipsec.1"

  # CJIS-approved cryptography
  tunnel1_ike_versions                  = ["ikev2"]
  tunnel1_phase1_encryption_algorithms  = ["AES256"]
  tunnel1_phase1_integrity_algorithms   = ["SHA2-256"]
  tunnel1_phase1_dh_group_numbers       = [14]
  tunnel1_phase2_encryption_algorithms  = ["AES256"]
  tunnel1_phase2_integrity_algorithms   = ["SHA2-256"]
  tunnel1_phase2_dh_group_numbers       = [14]

  tags = {
    Compliance = "CJIS-5.10"
  }
}
```

### Personnel Security (5.13)

```yaml
# CJIS personnel requirements
personnel_requirements:
  background_checks:
    federal_contractors:
      - "FBI fingerprint check"
      - "National criminal history check"
      - "State criminal history check"

    noncriminal_justice_agencies:
      - "State-based fingerprint and background check"
      - "Covers felony and misdemeanor convictions"

  training:
    frequency: "Annual"
    topics:
      - "CJIS Security Policy overview"
      - "Appropriate use of CJI"
      - "Sanctions for misuse"
      - "Reporting procedures"
    documentation: "Certificate of completion required"

  termination:
    procedures:
      - "Immediate access revocation"
      - "Account deactivation within 2 hours"
      - "Credential collection"
      - "Exit interview"
```

---

## PCI-DSS (Payment Card Industry Data Security Standard)

**PCI-DSS** protects cardholder data and applies to any organization that stores, processes, or transmits credit card information.

### Requirements (12 Total)

```
PCI-DSS 4.0 Requirements:
┌─────────────────────────────────────────────────────┐
│ Build and Maintain a Secure Network                 │
│ 1. Install and maintain network security controls   │
│ 2. Apply secure configurations                      │
├─────────────────────────────────────────────────────┤
│ Protect Account Data                                │
│ 3. Protect stored account data                      │
│ 4. Protect cardholder data with cryptography        │
├─────────────────────────────────────────────────────┤
│ Maintain a Vulnerability Management Program         │
│ 5. Protect systems from malware                     │
│ 6. Develop and maintain secure systems              │
├─────────────────────────────────────────────────────┤
│ Implement Strong Access Control                     │
│ 7. Restrict access to system components and data    │
│ 8. Identify users and authenticate access           │
│ 9. Restrict physical access to cardholder data      │
├─────────────────────────────────────────────────────┤
│ Monitor and Test Networks                           │
│ 10. Log and monitor all access                      │
│ 11. Test security systems and processes regularly   │
├─────────────────────────────────────────────────────┤
│ Maintain an Information Security Policy             │
│ 12. Support information security with policies      │
└─────────────────────────────────────────────────────┘
```

### Cardholder Data Environment (CDE)

```
CDE Architecture:
┌─────────────────────────────────────────────────────┐
│ OUT-OF-SCOPE SYSTEMS                                │
│ - Marketing website                                 │
│ - Corporate email                                   │
│ - Internal apps (no CHD)                            │
└───────────┬─────────────────────────────────────────┘
            │
            ↓ Firewall (Req 1.2)
┌───────────┴─────────────────────────────────────────┐
│ CONNECTED-TO SYSTEMS (in scope)                     │
│ - Systems that connect to CDE                       │
│ - Must meet all PCI requirements                    │
│ - Can impact CDE security                           │
├─────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐       │
│  │ CARDHOLDER DATA ENVIRONMENT (CDE)        │       │
│  │ - Payment processing app                 │       │
│  │ - Database with CHD                      │       │
│  │ - Payment gateway                        │       │
│  │ - Tokenization service                   │       │
│  └──────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────┘
```

### Implementation Example

```hcl
# pci-dss-infrastructure.tf

# Requirement 1: Network segmentation
resource "aws_security_group" "pci_database" {
  name        = "pci-database-sg"
  description = "PCI-DSS database security group"
  vpc_id      = aws_vpc.pci_vpc.id

  # Only allow access from application tier
  ingress {
    description     = "PostgreSQL from app tier"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.pci_app.id]
  }

  # No outbound internet access
  egress {
    description = "Allow internal VPC only"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [aws_vpc.pci_vpc.cidr_block]
  }

  tags = {
    PCI_Requirement = "1.2.1"
    Environment     = "CDE"
  }
}

# Requirement 3: Protect stored CHD
resource "aws_db_instance" "pci_database" {
  identifier     = "pci-cardholder-db"
  engine         = "postgres"
  engine_version = "14.7"
  instance_class = "db.t3.medium"

  # Encryption at rest (Req 3.5)
  storage_encrypted = true
  kms_key_id        = aws_kms_key.pci_key.arn

  # Automated backups (Req 3.4)
  backup_retention_period = 35  # PCI requires ability to restore
  backup_window           = "03:00-04:00"

  # No public access (Req 1.3)
  publicly_accessible = false

  # Enable logging (Req 10.2)
  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]

  tags = {
    PCI_Requirement = "3.4,3.5"
    DataType        = "CHD"
  }
}

# Requirement 4: Encrypt transmission
resource "aws_lb" "pci_alb" {
  name               = "pci-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.pci_alb.id]
  subnets            = aws_subnet.pci_public[*].id

  tags = {
    PCI_Requirement = "4.1"
  }
}

resource "aws_lb_listener" "pci_https" {
  load_balancer_arn = aws_lb.pci_alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-Ext-2018-06"  # PCI compliant
  certificate_arn   = aws_acm_certificate.pci_cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.pci_app.arn
  }
}

# Requirement 8: Identify and authenticate
resource "aws_iam_account_password_policy" "pci" {
  minimum_password_length        = 12  # PCI requires 12+ characters
  require_lowercase_characters   = true
  require_numbers                = true
  require_uppercase_characters   = true
  require_symbols                = true
  allow_users_to_change_password = true
  max_password_age               = 90
  password_reuse_prevention      = 4
}

# Requirement 10: Log and monitor
resource "aws_cloudtrail" "pci_trail" {
  name                          = "pci-audit-trail"
  s3_bucket_name                = aws_s3_bucket.pci_logs.id
  include_global_service_events = true
  is_multi_region_trail         = true
  enable_log_file_validation    = true

  event_selector {
    read_write_type           = "All"
    include_management_events = true
  }

  tags = {
    PCI_Requirement = "10.2,10.3"
  }
}

# Requirement 11: Vulnerability scanning
resource "aws_inspector2_enabler" "pci" {
  account_ids    = [data.aws_caller_identity.current.account_id]
  resource_types = ["EC2", "ECR"]
}

# ASV scan required quarterly - use approved vendor
```

### SAQ (Self-Assessment Questionnaire) Types

| SAQ Type | Description | Merchant Level |
|----------|-------------|----------------|
| A | Card-not-present, outsourced | Eligible merchants |
| A-EP | E-commerce, outsourced payment | Eligible merchants |
| B | Imprint machines, standalone terminals | Eligible merchants |
| B-IP | Standalone IP-connected terminals | Eligible merchants |
| C | Payment app systems, no electronic storage | Eligible merchants |
| C-VT | Virtual terminals, no electronic storage | Eligible merchants |
| D | All others, or SAQ D Merchant | All merchants |
| D (Service Provider) | Service providers | All service providers |

---

## HIPAA (Health Insurance Portability and Accountability Act)

**HIPAA** protects Protected Health Information (PHI) and electronic PHI (ePHI) in healthcare.

### Key Rules

```
HIPAA Rules:
┌─────────────────────────────────────────────────────┐
│ Privacy Rule (45 CFR Part 160, Part 164 Subparts A, E) │
│ - Patient rights to PHI                             │
│ - Permitted uses and disclosures                    │
│ - Minimum necessary standard                        │
├─────────────────────────────────────────────────────┤
│ Security Rule (45 CFR Part 164 Subpart C)           │
│ - Administrative safeguards                         │
│ - Physical safeguards                               │
│ - Technical safeguards                              │
├─────────────────────────────────────────────────────┤
│ Breach Notification Rule                            │
│ - Notify individuals (60 days)                      │
│ - Notify HHS                                        │
│ - Notify media (>500 affected)                      │
└─────────────────────────────────────────────────────┘
```

### Security Rule Safeguards

**Administrative Safeguards:**
```yaml
administrative_safeguards:
  security_management_process:
    - "Risk analysis (required)"
    - "Risk management (required)"
    - "Sanction policy (required)"
    - "Information system activity review (required)"

  assigned_security_responsibility:
    - "Designate security official (required)"

  workforce_security:
    - "Authorization/supervision (addressable)"
    - "Workforce clearance (addressable)"
    - "Termination procedures (addressable)"

  information_access_management:
    - "Isolating health care clearinghouse (required)"
    - "Access authorization (addressable)"
    - "Access establishment/modification (addressable)"

  security_awareness_training:
    - "Security reminders (addressable)"
    - "Protection from malware (addressable)"
    - "Log-in monitoring (addressable)"
    - "Password management (addressable)"

  security_incident_procedures:
    - "Response and reporting (required)"

  contingency_plan:
    - "Data backup plan (required)"
    - "Disaster recovery plan (required)"
    - "Emergency mode operation plan (required)"
    - "Testing/revision procedures (addressable)"
    - "Applications and data criticality analysis (addressable)"

  evaluation:
    - "Periodic technical/nontechnical evaluation (required)"

  business_associate_contracts:
    - "Written contract/arrangement (required)"
```

**Technical Safeguards:**
```hcl
# HIPAA technical safeguards implementation

# Access Control (164.312(a)(1))
resource "aws_iam_role" "hipaa_app_role" {
  name = "hipaa-application-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })

  tags = {
    HIPAA_Control = "164.312(a)(1)"
    Purpose       = "Access-Control"
  }
}

# Unique user identification (164.312(a)(2)(i))
resource "aws_cognito_user_pool" "hipaa_users" {
  name = "hipaa-user-pool"

  password_policy {
    minimum_length                   = 12
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = true
    require_uppercase                = true
    temporary_password_validity_days = 1
  }

  mfa_configuration = "ON"  # HIPAA best practice

  account_recovery_setting {
    recovery_mechanism {
      name     = "admin_only"
      priority = 1
    }
  }

  tags = {
    HIPAA_Control = "164.312(a)(2)(i)"
  }
}

# Encryption and decryption (164.312(a)(2)(iv))
resource "aws_kms_key" "hipaa_key" {
  description             = "HIPAA ePHI encryption key"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    HIPAA_Control = "164.312(a)(2)(iv),164.312(e)(2)(ii)"
    DataType      = "ePHI"
  }
}

# RDS with encryption
resource "aws_db_instance" "hipaa_db" {
  identifier     = "hipaa-patient-db"
  engine         = "postgres"
  instance_class = "db.t3.medium"

  # Encryption at rest
  storage_encrypted = true
  kms_key_id        = aws_kms_key.hipaa_key.arn

  # Audit logging (164.312(b))
  enabled_cloudwatch_logs_exports = ["postgresql"]

  # Backup/recovery (164.308(a)(7)(i))
  backup_retention_period = 35
  backup_window           = "03:00-04:00"

  tags = {
    HIPAA_Control = "164.312(a)(2)(iv),164.308(a)(7)(i)"
    DataType      = "ePHI"
  }
}

# Integrity controls (164.312(c)(1))
resource "aws_cloudtrail" "hipaa_audit" {
  name                          = "hipaa-audit-trail"
  s3_bucket_name                = aws_s3_bucket.hipaa_logs.id
  include_global_service_events = true
  is_multi_region_trail         = true
  enable_log_file_validation    = true  # Integrity protection

  tags = {
    HIPAA_Control = "164.312(c)(1),164.312(b)"
  }
}

# Transmission security (164.312(e)(1))
resource "aws_lb_listener" "hipaa_https" {
  load_balancer_arn = aws_lb.hipaa_alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = aws_acm_certificate.hipaa_cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.hipaa_app.arn
  }
}

# Automatic logoff (164.312(a)(2)(iii))
resource "aws_cognito_user_pool_client" "hipaa_app" {
  name         = "hipaa-application"
  user_pool_id = aws_cognito_user_pool.hipaa_users.id

  # Session timeout (30 minutes recommended)
  refresh_token_validity = 30
  access_token_validity  = 30
  id_token_validity      = 30

  token_validity_units {
    refresh_token = "minutes"
    access_token  = "minutes"
    id_token      = "minutes"
  }
}
```

### BAA (Business Associate Agreement)

```yaml
# AWS BAA requirements
baa_requirements:
  aws_services_hipaa_eligible:
    compute:
      - "EC2"
      - "ECS"
      - "EKS"
      - "Lambda"
    storage:
      - "S3"
      - "EBS"
      - "EFS"
      - "Glacier"
    database:
      - "RDS (all engines)"
      - "DynamoDB"
      - "Aurora"
      - "Redshift"
    other:
      - "CloudTrail"
      - "CloudWatch Logs"
      - "AWS Backup"

  aws_services_not_hipaa_eligible:
    - "CloudFront (with restrictions)"
    - "Route 53 (DNS queries not covered)"
    - "API Gateway (logging may expose PHI)"

  configuration_requirements:
    - "Enable encryption at rest"
    - "Enable encryption in transit"
    - "Enable logging and monitoring"
    - "Restrict access to authorized users"
    - "Sign AWS BAA"
```

---

## SOC 2 (Service Organization Control 2)

**SOC 2** is an auditing procedure ensuring service providers securely manage data to protect customer interests.

### Trust Services Criteria

```
SOC 2 Trust Service Criteria:
┌─────────────────────────────────────────────────────┐
│ SECURITY (Common Criteria - Required)               │
│ CC1: Control Environment                            │
│ CC2: Communication and Information                  │
│ CC3: Risk Assessment                                │
│ CC4: Monitoring Activities                          │
│ CC5: Control Activities                             │
│ CC6: Logical and Physical Access Controls           │
│ CC7: System Operations                              │
│ CC8: Change Management                              │
│ CC9: Risk Mitigation                                │
├─────────────────────────────────────────────────────┤
│ ADDITIONAL CRITERIA (Optional)                      │
│ AVAILABILITY: System uptime and operational         │
│ CONFIDENTIALITY: Designated confidential info       │
│ PROCESSING INTEGRITY: Complete, valid, authorized   │
│ PRIVACY: Personal information collection/use        │
└─────────────────────────────────────────────────────┘
```

### SOC 2 Type I vs Type II

| Aspect | Type I | Type II |
|--------|--------|---------|
| **Focus** | Design of controls | Design AND operating effectiveness |
| **Duration** | Point in time | 3-12 months |
| **Testing** | Control description | Control testing over period |
| **Effort** | 4-8 weeks | 3-6 months |
| **Cost** | Lower | Higher |
| **Value** | Initial compliance | Ongoing assurance |

### Implementation Example

```yaml
# soc2-control-mapping.yaml
# Map infrastructure controls to SOC 2 criteria

security_controls:
  CC6.1_logical_access:
    description: "Controls provide reasonable assurance that access is restricted to authorized users"
    implementation:
      - name: "IAM with MFA"
        terraform: "aws_iam_user with MFA enforcement"
        evidence:
          - "IAM credential report"
          - "MFA device list"
          - "Access review logs"

      - name: "Least privilege"
        terraform: "aws_iam_role with minimal permissions"
        evidence:
          - "IAM policy documents"
          - "Permission boundaries"
          - "Access review documentation"

  CC6.6_encryption:
    description: "Entity implements logical access security measures to protect against threats from sources outside its system boundaries"
    implementation:
      - name: "Data encryption at rest"
        terraform: "aws_s3_bucket_server_side_encryption_configuration"
        evidence:
          - "S3 encryption status reports"
          - "RDS encryption status"
          - "KMS key rotation logs"

      - name: "Data encryption in transit"
        terraform: "aws_lb_listener with TLS 1.2+"
        evidence:
          - "TLS policy configurations"
          - "Certificate validity reports"
          - "Cipher suite configurations"

  CC7.2_monitoring:
    description: "Entity monitors system components and the operation of those components for anomalies"
    implementation:
      - name: "CloudWatch alarms"
        terraform: "aws_cloudwatch_metric_alarm"
        evidence:
          - "Alarm configurations"
          - "Alarm history"
          - "Incident response logs"

      - name: "Security Hub findings"
        terraform: "aws_securityhub_account"
        evidence:
          - "Finding summaries"
          - "Remediation records"
          - "Monthly security reports"

  CC8.1_change_management:
    description: "Entity authorizes, designs, develops or acquires, implements, operates, approves, maintains, and monitors environmental protections, software, data backup processes, and recovery infrastructure"
    implementation:
      - name: "Infrastructure as Code"
        terraform: "All resources defined in Terraform"
        evidence:
          - "Git commit history"
          - "Pull request approvals"
          - "Terraform state files"
          - "CI/CD pipeline logs"

      - name: "Change approval process"
        terraform: "GitHub branch protection"
        evidence:
          - "Branch protection rules"
          - "Code review history"
          - "Deployment approvals"

availability_controls:
  A1.2_monitoring:
    description: "Entity monitors the system to ensure ongoing performance"
    implementation:
      - name: "Application monitoring"
        tools:
          - "CloudWatch Metrics"
          - "X-Ray tracing"
          - "Application Insights"
        evidence:
          - "Uptime reports (99.9%+)"
          - "Incident reports"
          - "RCA documentation"

  A1.3_recovery:
    description: "Entity implements controls to restore systems"
    implementation:
      - name: "Automated backups"
        terraform: "aws_db_instance with backup_retention_period"
        evidence:
          - "Backup schedules"
          - "Restore test results"
          - "DR runbooks"
```

### Audit Preparation Checklist

```markdown
# SOC 2 Audit Preparation Checklist

## Pre-Audit (3 months before)
- [ ] Engage SOC 2 auditor
- [ ] Define scope (Security only or +APCPP)
- [ ] Define observation period (3, 6, or 12 months)
- [ ] Map controls to trust services criteria
- [ ] Implement missing controls
- [ ] Begin evidence collection

## During Observation Period
- [ ] Collect evidence continuously
  - [ ] Access reviews (monthly)
  - [ ] Security awareness training records
  - [ ] Vulnerability scan reports (monthly)
  - [ ] Penetration test results (annual)
  - [ ] Incident response documentation
  - [ ] Change management records
  - [ ] Backup and recovery logs

- [ ] Conduct internal audits
- [ ] Address any control gaps
- [ ] Document policies and procedures

## Audit Phase (4-8 weeks)
- [ ] Provide system description
- [ ] Provide control documentation
- [ ] Provide evidence samples
- [ ] Respond to auditor questions
- [ ] Facilitate auditor testing
- [ ] Address findings

## Post-Audit
- [ ] Review draft report
- [ ] Address management responses
- [ ] Receive final SOC 2 report
- [ ] Share report with customers
- [ ] Implement remediation for any exceptions
```

---

## Compliance Mapping

### Multi-Framework Control Mapping

```yaml
# control-mapping.yaml
# Map single control implementation to multiple frameworks

encryption_at_rest:
  implementation: "AWS KMS + S3 encryption"
  terraform_resource: "aws_s3_bucket_server_side_encryption_configuration"

  mapped_controls:
    fedramp:
      - "SC-28: Protection of Information at Rest"
      - "SC-28(1): Cryptographic Protection"

    cmmc:
      - "3.13.8: Implement cryptographic mechanisms"
      - "3.13.11: Employ FIPS-validated cryptography"

    nist_800_171:
      - "3.13.8: Implement cryptographic mechanisms"
      - "3.13.11: Employ FIPS-validated cryptography when used to protect CUI"

    pci_dss:
      - "3.4: Render PAN unreadable (encryption)"
      - "3.5: Document key-management procedures"

    hipaa:
      - "164.312(a)(2)(iv): Encryption and decryption"
      - "164.312(e)(2)(ii): Encryption"

    soc2:
      - "CC6.6: Logical access security measures"
      - "CC6.7: Transmission of sensitive data"

multi_factor_authentication:
  implementation: "AWS IAM with MFA enforcement"
  terraform_resource: "aws_iam_user + aws_iam_user_mfa_device"

  mapped_controls:
    fedramp:
      - "IA-2(1): Multi-factor Authentication to Privileged Accounts"
      - "IA-2(2): Multi-factor Authentication to Non-Privileged Accounts"

    cmmc:
      - "3.5.3: Use multi-factor authentication for local and network access"

    nist_800_171:
      - "3.5.3: Use multi-factor authentication"

    cjis:
      - "5.11.1.2: Advanced Authentication"

    pci_dss:
      - "8.3: Secure all individual non-console admin access and remote access to CDE using MFA"

    hipaa:
      - "164.312(d): Person or entity authentication"

    soc2:
      - "CC6.1: Logical access controls"

audit_logging:
  implementation: "CloudTrail + CloudWatch Logs"
  terraform_resource: "aws_cloudtrail + aws_cloudwatch_log_group"

  mapped_controls:
    fedramp:
      - "AU-2: Event Logging"
      - "AU-3: Content of Audit Records"
      - "AU-12: Audit Record Generation"

    cmmc:
      - "3.3.1: Create audit records"
      - "3.3.2: Ensure actions can be traced to users"

    nist_800_171:
      - "3.3.1: Create, protect, and retain audit records"
      - "3.3.2: Ensure actions traced to individual users"

    pci_dss:
      - "10.2: Implement automated audit trails"
      - "10.3: Record audit trail entries"

    hipaa:
      - "164.312(b): Audit controls"
      - "164.308(a)(1)(ii)(D): Information system activity review"

    cjis:
      - "5.4: Auditing and Accountability"

    soc2:
      - "CC7.2: Monitor system components"
```

---

## Implementation Checklists

### FedRAMP Moderate Readiness Checklist

```markdown
# FedRAMP Moderate Implementation Checklist

## Access Control (AC)
- [ ] AC-2: Account management procedures documented
- [ ] AC-3: Access enforcement via IAM/RBAC
- [ ] AC-4: Information flow enforcement (security groups, NACLs)
- [ ] AC-5: Separation of duties implemented
- [ ] AC-6: Least privilege access enforced
- [ ] AC-7: Unsuccessful logon attempts locked (5 attempts)
- [ ] AC-17: Remote access via VPN with MFA
- [ ] AC-18: Wireless access controlled (if applicable)
- [ ] AC-20: Use of external systems controlled

## Audit and Accountability (AU)
- [ ] AU-2: Auditable events defined and documented
- [ ] AU-3: Audit record content meets requirements
- [ ] AU-4: Audit storage capacity planned
- [ ] AU-5: Response to audit processing failures
- [ ] AU-6: Audit review, analysis, and reporting
- [ ] AU-8: Time stamps (NTP configured)
- [ ] AU-9: Protection of audit information
- [ ] AU-11: Audit record retention (90 days online, 1 year total)
- [ ] AU-12: Audit record generation (CloudTrail, VPC Flow Logs)

## Configuration Management (CM)
- [ ] CM-2: Baseline configuration established
- [ ] CM-3: Configuration change control
- [ ] CM-6: Configuration settings documented
- [ ] CM-7: Least functionality (disable unnecessary services)
- [ ] CM-8: Information system component inventory
- [ ] CM-10: Software usage restrictions

## Contingency Planning (CP)
- [ ] CP-1: Contingency planning policy
- [ ] CP-2: Contingency plan documented
- [ ] CP-3: Contingency training
- [ ] CP-4: Contingency plan testing (annual)
- [ ] CP-9: Information system backup (automated daily)
- [ ] CP-10: Information system recovery and reconstitution

## Identification and Authentication (IA)
- [ ] IA-2: Unique identification and authentication
- [ ] IA-2(1): MFA for privileged accounts
- [ ] IA-2(2): MFA for non-privileged accounts (FedRAMP High)
- [ ] IA-2(12): PIV credential acceptance
- [ ] IA-4: Identifier management
- [ ] IA-5: Authenticator management
- [ ] IA-5(1): Password-based authentication (14 chars, 90 days)
- [ ] IA-5(11): Hardware token-based authentication
- [ ] IA-8: Identification and authentication (non-org users)

## Incident Response (IR)
- [ ] IR-1: Incident response policy
- [ ] IR-2: Incident response training
- [ ] IR-4: Incident handling
- [ ] IR-5: Incident monitoring
- [ ] IR-6: Incident reporting (1 hour to agency)
- [ ] IR-7: Incident response assistance
- [ ] IR-8: Incident response plan

## System and Communications Protection (SC)
- [ ] SC-5: Denial of service protection (WAF, Shield)
- [ ] SC-7: Boundary protection (firewalls, security groups)
- [ ] SC-8: Transmission confidentiality (TLS 1.2+)
- [ ] SC-12: Cryptographic key management (KMS)
- [ ] SC-13: Cryptographic protection (FIPS 140-2)
- [ ] SC-28: Protection of information at rest (encryption)

## System and Information Integrity (SI)
- [ ] SI-2: Flaw remediation (30 days for high, 90 for moderate)
- [ ] SI-3: Malicious code protection
- [ ] SI-4: Information system monitoring (GuardDuty, CloudWatch)
- [ ] SI-5: Security alerts and advisories
- [ ] SI-12: Information handling and retention

## Monthly Continuous Monitoring Deliverables
- [ ] POA&M (Plan of Action & Milestones) update
- [ ] Vulnerability scan results
- [ ] Executive summary of security posture
- [ ] Incident reports (if any)
- [ ] Significant change requests
```

### CMMC Level 2 Readiness Checklist

```markdown
# CMMC Level 2 (NIST 800-171) Implementation Checklist

## Access Control (3.1.x)
- [ ] 3.1.1: Limit system access to authorized users
- [ ] 3.1.2: Limit system access to authorized transactions
- [ ] 3.1.3: Control CUI flow
- [ ] 3.1.4: Separate duties of individuals
- [ ] 3.1.5: Employ least privilege
- [ ] 3.1.6: Use non-privileged accounts
- [ ] 3.1.7: Prevent non-privileged users from executing privileged functions
- [ ] 3.1.8: Limit unsuccessful logon attempts
- [ ] 3.1.9: Provide privacy and security notices
- [ ] 3.1.10: Use session lock
- [ ] 3.1.11: Terminate session after inactivity
- [ ] 3.1.12: Monitor and control remote access sessions
- [ ] 3.1.13: Employ cryptographic mechanisms (remote access)
- [ ] 3.1.14: Route remote access via managed access control points
- [ ] 3.1.15: Authorize remote execution/access processing
- [ ] 3.1.16: Authorize wireless access
- [ ] 3.1.17: Protect wireless access using authentication and encryption
- [ ] 3.1.18: Control connection of mobile devices
- [ ] 3.1.19: Encrypt CUI on mobile devices
- [ ] 3.1.20: Control external system connections
- [ ] 3.1.21: Limit use of portable storage devices
- [ ] 3.1.22: Control CUI posted on publicly accessible systems

## Identification and Authentication (3.5.x)
- [ ] 3.5.1: Identify system users, processes
- [ ] 3.5.2: Authenticate users, processes, devices
- [ ] 3.5.3: Use MFA for local and network access to privileged and non-privileged accounts
- [ ] 3.5.4: Employ replay-resistant authentication
- [ ] 3.5.5: Prevent reuse of identifiers
- [ ] 3.5.6: Disable identifiers after period of inactivity
- [ ] 3.5.7: Enforce minimum password complexity
- [ ] 3.5.8: Prohibit password reuse (24 generations)
- [ ] 3.5.9: Allow temporary password use for system logons (one time only)
- [ ] 3.5.10: Store and transmit only cryptographically-protected passwords
- [ ] 3.5.11: Obscure feedback of authentication information

## System and Communications Protection (3.13.x)
- [ ] 3.13.1: Monitor, control, and protect communications at external boundaries
- [ ] 3.13.2: Employ architectural designs, software development techniques
- [ ] 3.13.3: Separate user functionality from system management
- [ ] 3.13.4: Prevent unauthorized transfer via shared resources
- [ ] 3.13.5: Implement subnetworks for publicly accessible components
- [ ] 3.13.6: Deny network communications traffic by default
- [ ] 3.13.7: Prevent remote devices from simultaneously establishing connections
- [ ] 3.13.8: Implement cryptographic mechanisms to prevent unauthorized disclosure
- [ ] 3.13.9: Terminate network connections at end of session
- [ ] 3.13.10: Establish and manage cryptographic keys
- [ ] 3.13.11: Employ FIPS-validated cryptography when used to protect CUI
- [ ] 3.13.12: Prohibit remote activation of collaborative computing devices
- [ ] 3.13.13: Control and monitor use of mobile code
- [ ] 3.13.14: Control and monitor use of VoIP
- [ ] 3.13.15: Protect authenticity of communications sessions
- [ ] 3.13.16: Protect confidentiality of CUI at rest

## Evidence Collection
- [ ] System Security Plan (SSP)
- [ ] Network diagrams
- [ ] Data flow diagrams
- [ ] Policies and procedures
- [ ] Configuration standards
- [ ] Access control matrix
- [ ] Incident response plan
- [ ] Asset inventory
- [ ] Risk assessment
- [ ] Penetration test results
- [ ] Vulnerability scan results
```

---

## Audit Preparation

### Evidence Repository Structure

```
compliance-evidence/
├── policies/
│   ├── information-security-policy.pdf
│   ├── acceptable-use-policy.pdf
│   ├── incident-response-policy.pdf
│   ├── change-management-policy.pdf
│   └── data-classification-policy.pdf
│
├── procedures/
│   ├── access-control-procedures.pdf
│   ├── backup-recovery-procedures.pdf
│   ├── patch-management-procedures.pdf
│   └── password-management-procedures.pdf
│
├── technical-documentation/
│   ├── system-security-plan.pdf
│   ├── network-diagrams.pdf
│   ├── data-flow-diagrams.pdf
│   ├── architecture-diagrams.pdf
│   └── encryption-documentation.pdf
│
├── assessments/
│   ├── risk-assessments/
│   │   ├── 2024-Q1-risk-assessment.pdf
│   │   ├── 2024-Q2-risk-assessment.pdf
│   │   └── risk-register.xlsx
│   │
│   ├── vulnerability-scans/
│   │   ├── 2024-01-scan-results.pdf
│   │   ├── 2024-02-scan-results.pdf
│   │   └── remediation-tracking.xlsx
│   │
│   └── penetration-tests/
│       ├── 2024-annual-pentest-report.pdf
│       └── remediation-evidence/
│
├── training/
│   ├── security-awareness-training/
│   │   ├── training-materials.pdf
│   │   ├── attendance-records.xlsx
│   │   └── completion-certificates/
│   │
│   └── role-based-training/
│       ├── developer-security-training.pdf
│       └── admin-training-records.xlsx
│
├── operational-evidence/
│   ├── access-reviews/
│   │   ├── 2024-Q1-access-review.xlsx
│   │   ├── 2024-Q2-access-review.xlsx
│   │   └── revocation-evidence/
│   │
│   ├── backup-logs/
│   │   └── backup-success-reports.pdf
│   │
│   ├── patch-management/
│   │   ├── patch-schedules.xlsx
│   │   └── patch-completion-reports/
│   │
│   ├── change-management/
│   │   ├── change-requests/
│   │   ├── change-approvals/
│   │   └── rollback-plans/
│   │
│   └── incident-response/
│       ├── incident-reports/
│       ├── root-cause-analyses/
│       └── lessons-learned/
│
├── monitoring/
│   ├── cloudtrail-logs/
│   ├── vpc-flow-logs/
│   ├── application-logs/
│   ├── security-hub-findings/
│   └── alert-response-logs/
│
└── compliance-reports/
    ├── monthly-compliance-status.pdf
    ├── quarterly-executive-summary.pdf
    ├── annual-assessment-report.pdf
    └── poam-tracking.xlsx
```

### Audit Response Template

```markdown
# Audit Finding Response Template

## Finding Details
**Finding ID:** [Auditor-assigned ID]
**Control Reference:** [Framework control number]
**Severity:** [Critical / High / Medium / Low]
**Finding Description:** [Auditor's description]

## Management Response

### Current State
[Describe the current implementation status]

### Root Cause Analysis
[Explain why the gap exists]
- Technical limitations: [if applicable]
- Process gaps: [if applicable]
- Resource constraints: [if applicable]

### Remediation Plan

**Option 1: Immediate Remediation**
- **Action:** [Specific remediation steps]
- **Owner:** [Responsible person/team]
- **Timeline:** [Completion date]
- **Resources Required:** [Budget, personnel, tools]
- **Evidence:** [How compliance will be demonstrated]

**Option 2: Compensating Controls** (if immediate remediation not feasible)
- **Compensating Control:** [Alternative control]
- **Justification:** [Why this provides equivalent protection]
- **Implementation Date:** [When compensating control implemented]

### Verification
- **Testing Method:** [How control effectiveness will be validated]
- **Test Frequency:** [Ongoing monitoring approach]
- **Success Criteria:** [What constitutes successful implementation]

### Sign-off
**Prepared by:** [Name, Title, Date]
**Reviewed by:** [Security Officer, Date]
**Approved by:** [Executive Sponsor, Date]
```

---

## Best Practices

### 1. Compliance Automation

```python
# compliance_automation.py
"""Automate compliance checking and evidence collection"""

import boto3
from datetime import datetime, timedelta

class ComplianceAutomation:
    def __init__(self):
        self.s3 = boto3.client('s3')
        self.config = boto3.client('config')
        self.securityhub = boto3.client('securityhub')
        self.cloudtrail = boto3.client('cloudtrail')

    def check_encryption_compliance(self):
        """Check if all S3 buckets have encryption enabled"""
        results = []
        buckets = self.s3.list_buckets()['Buckets']

        for bucket in buckets:
            bucket_name = bucket['Name']
            try:
                encryption = self.s3.get_bucket_encryption(Bucket=bucket_name)
                results.append({
                    'bucket': bucket_name,
                    'compliant': True,
                    'encryption': encryption['ServerSideEncryptionConfiguration']
                })
            except:
                results.append({
                    'bucket': bucket_name,
                    'compliant': False,
                    'encryption': None
                })

        return results

    def generate_evidence_package(self, control_id):
        """Generate evidence package for specific control"""
        evidence = {
            'control_id': control_id,
            'generated_date': datetime.now().isoformat(),
            'evidence_items': []
        }

        if control_id == 'AC-2':  # Account Management
            # Collect IAM user list
            iam = boto3.client('iam')
            users = iam.list_users()
            evidence['evidence_items'].append({
                'type': 'IAM User List',
                'data': users
            })

            # Collect access reviews
            # Collect MFA status
            # etc.

        elif control_id == 'AU-2':  # Audit Logging
            # Collect CloudTrail configuration
            trails = self.cloudtrail.describe_trails()
            evidence['evidence_items'].append({
                'type': 'CloudTrail Configuration',
                'data': trails
            })

        return evidence

    def continuous_compliance_monitoring(self):
        """Run continuous compliance checks"""
        compliance_status = {
            'timestamp': datetime.now().isoformat(),
            'checks': []
        }

        # Check 1: Encryption at rest
        encryption_results = self.check_encryption_compliance()
        compliance_status['checks'].append({
            'control': 'SC-28',
            'description': 'Protection of Information at Rest',
            'results': encryption_results,
            'compliant': all(r['compliant'] for r in encryption_results)
        })

        # Check 2: MFA enabled
        # Check 3: Logging enabled
        # etc.

        return compliance_status

# Usage
automation = ComplianceAutomation()
status = automation.continuous_compliance_monitoring()
evidence = automation.generate_evidence_package('AC-2')
```

### 2. Multi-Framework Tagging Strategy

```hcl
# tagging-strategy.tf
# Standard tagging for compliance tracking

locals {
  common_tags = {
    # Business tags
    CostCenter   = "IT-Security"
    Owner        = "security-team@company.com"
    Environment  = "Production"

    # Data classification tags
    DataClassification = "CUI"  # or "PHI", "PCI", "Public"

    # Compliance tags
    ComplianceFrameworks = "FedRAMP-Moderate,CMMC-L2,NIST-800-171"
    ComplianceControls   = "AC-2,AU-2,SC-28"

    # Technical tags
    BackupRequired    = "true"
    EncryptionRequired = "true"
    MonitoringLevel   = "enhanced"

    # Operational tags
    MaintenanceWindow = "Sun-03:00-05:00"
    PatchGroup        = "critical-systems"
  }
}

resource "aws_s3_bucket" "compliant_bucket" {
  bucket = "compliant-data-bucket"

  tags = merge(local.common_tags, {
    # Resource-specific tags
    DataRetentionYears = "7"
    ContainsCUI        = "true"
    ITARControlled     = "false"
  })
}
```

### 3. Compliance Dashboard

```python
# compliance_dashboard.py
"""Generate compliance dashboard metrics"""

def generate_compliance_dashboard():
    """Generate executive dashboard for compliance status"""
    dashboard = {
        'overall_compliance': {},
        'by_framework': {},
        'trends': {},
        'risk_areas': []
    }

    # FedRAMP
    dashboard['by_framework']['FedRAMP'] = {
        'status': 'Authorized',
        'controls_total': 325,
        'controls_implemented': 320,
        'controls_in_progress': 5,
        'poam_items': 5,
        'last_assessment': '2024-01-15',
        'next_assessment': '2025-01-15'
    }

    # CMMC
    dashboard['by_framework']['CMMC'] = {
        'status': 'Level 2 Certified',
        'practices_total': 110,
        'practices_met': 110,
        'certification_date': '2024-03-20',
        'expiration_date': '2027-03-20'
    }

    # Calculate overall compliance percentage
    total_controls = sum(f['controls_total'] for f in dashboard['by_framework'].values())
    implemented = sum(f['controls_implemented'] for f in dashboard['by_framework'].values())
    dashboard['overall_compliance']['percentage'] = (implemented / total_controls) * 100

    # Identify risk areas
    dashboard['risk_areas'] = [
        {'control': 'AC-2(3)', 'issue': 'Automated account disablement not fully implemented'},
        {'control': 'SI-4', 'issue': 'Container monitoring gaps in dev environment'},
    ]

    return dashboard
```

---

**Related Resources:**
- [cloud-security.md](../cloud-engineering/resources/cloud-security.md) - Security controls
- [cleared-cloud-environments.md](../cloud-engineering/resources/cleared-cloud-environments.md) - Government clouds
- [cspm-integration.md](cspm-integration.md) - CSPM tool integration
- [workload-classification.md](../infrastructure-architecture/resources/workload-classification.md) - Data classification
