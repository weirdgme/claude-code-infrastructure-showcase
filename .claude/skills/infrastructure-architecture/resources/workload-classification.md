# Workload Classification

Data classification, workload categorization, and separation patterns for Unclassified, CUI, Secret, Top Secret/SCI, and ITAR-controlled workloads.

## Table of Contents

- [Overview](#overview)
- [Classification Levels](#classification-levels)
- [Classification Criteria](#classification-criteria)
- [Architectural Patterns](#architectural-patterns)
- [Data Flow Controls](#data-flow-controls)
- [Implementation Guide](#implementation-guide)
- [Best Practices](#best-practices)

---

## Overview

**Workload Classification** determines security controls, infrastructure separation, personnel requirements, and compliance obligations for systems and data.

**Classification Hierarchy:**

```
Security Classification Levels:
┌─────────────────────────────────────────────────────┐
│ TOP SECRET / SCI                                    │
│ - Highest classification                            │
│ - Compartmented information                         │
│ - Clearance + need-to-know                          │
│ - Air-gapped or classified networks                 │
├─────────────────────────────────────────────────────┤
│ SECRET                                              │
│ - Serious damage to national security               │
│ - Secret clearance required                         │
│ - Dedicated infrastructure                          │
│ - Enhanced monitoring                               │
├─────────────────────────────────────────────────────┤
│ CONTROLLED UNCLASSIFIED INFORMATION (CUI)           │
│ - Requires safeguarding                             │
│ - NIST 800-171 compliance                           │
│ - Government cloud regions                          │
│ - U.S. persons access                               │
├─────────────────────────────────────────────────────┤
│ ITAR (Export-Controlled)                            │
│ - Defense articles/services                         │
│ - U.S. persons only                                 │
│ - U.S. geographic restrictions                      │
│ - Export license required                           │
├─────────────────────────────────────────────────────┤
│ UNCLASSIFIED                                        │
│ - No special handling required                      │
│ - Standard security controls                        │
│ - Public or commercial cloud                        │
└─────────────────────────────────────────────────────┘
```

---

## Classification Levels

### Level 1: Unclassified

**Definition:** Information that does not require special protection.

**Characteristics:**
- Public or internal business information
- No national security implications
- Standard IT security controls
- Commercial cloud suitable

**Infrastructure Requirements:**

```yaml
unclassified:
  environment: "Commercial cloud (AWS, Azure, GCP)"
  encryption:
    at_rest: "AES-256 (recommended)"
    in_transit: "TLS 1.2+"
  access_control:
    authentication: "SSO, MFA recommended"
    authorization: "Role-based access control"
  monitoring:
    logging: "Standard application logs"
    retention: "90 days minimum"
  personnel:
    clearance: "None required"
    citizenship: "No restrictions"
  compliance:
    frameworks: ["SOC 2", "ISO 27001"]
```

**Example Workloads:**
- Public-facing websites
- Marketing materials
- General business applications
- Non-sensitive customer data

---

### Level 2: CUI (Controlled Unclassified Information)

**Definition:** Information that requires safeguarding or dissemination controls per law, regulation, or government policy (NIST SP 800-171).

**Characteristics:**
- Federal contract information
- Privacy-sensitive data
- Law enforcement sensitive
- Requires NIST 800-171 compliance

**Infrastructure Requirements:**

```yaml
cui:
  environment: "GovCloud, Azure Government, or FedRAMP High"
  encryption:
    at_rest: "FIPS 140-2 validated (AES-256)"
    in_transit: "TLS 1.3 with approved cipher suites"
  access_control:
    authentication: "MFA required (all users)"
    authorization: "Least privilege, separation of duties"
    session: "15-minute inactivity timeout"
  monitoring:
    logging: "Comprehensive audit logs"
    retention: "1 year minimum"
    siem: "Security information and event management"
  personnel:
    clearance: "Not required (but background check recommended)"
    citizenship: "U.S. citizens or lawful permanent residents"
  compliance:
    frameworks: ["NIST 800-171", "CMMC Level 2", "FedRAMP"]
  network:
    segmentation: "Isolated from public networks"
    boundaries: "Controlled ingress/egress"
```

**CUI Categories (Examples):**
```
CUI Categories:
┌─────────────────────────────────────────────────────┐
│ CONTROLLED TECHNICAL INFORMATION (CTI)              │
│ - Technical data with military/space application    │
│ - Not classified but export-controlled              │
├─────────────────────────────────────────────────────┤
│ LAW ENFORCEMENT SENSITIVE (LES)                     │
│ - Criminal investigations                           │
│ - Witness protection information                    │
├─────────────────────────────────────────────────────┤
│ PRIVACY INFORMATION                                 │
│ - PII (Personally Identifiable Information)         │
│ - Medical records                                   │
│ - Financial data                                    │
├─────────────────────────────────────────────────────┤
│ PROPRIETARY BUSINESS INFORMATION (PROPIN)           │
│ - Trade secrets                                     │
│ - Commercial financial information                  │
└─────────────────────────────────────────────────────┘
```

---

### Level 3: Secret

**Definition:** Information that, if disclosed, could cause serious damage to national security.

**Characteristics:**
- Military operations
- Intelligence sources/methods
- Cryptographic systems
- Weapons systems data

**Infrastructure Requirements:**

```yaml
secret:
  environment: "Azure Government DoD, AWS Secret Region, or on-premises classified"
  encryption:
    at_rest: "FIPS 140-2 Level 3+ (Suite B cryptography)"
    in_transit: "IPsec with Suite B, TLS 1.3"
  access_control:
    authentication: "CAC/PIV card + PIN"
    authorization: "Need-to-know basis, mandatory access control"
    session: "10-minute inactivity timeout"
  monitoring:
    logging: "All actions logged and reviewed"
    retention: "7 years minimum"
    siem: "Real-time security monitoring"
    ids_ips: "Intrusion detection/prevention required"
  personnel:
    clearance: "Secret clearance required"
    citizenship: "U.S. citizens only"
    training: "Annual security awareness, role-based training"
  compliance:
    frameworks: ["DoD SRG IL6", "NIST 800-53 High", "ICD 503"]
  network:
    segmentation: "Air-gapped or dedicated classified network"
    boundaries: "Cross-domain solutions for data transfer"
  physical:
    location: "SCIF or secure facility"
    access: "Two-person integrity, visitor escorts"
```

---

### Level 4: Top Secret / SCI

**Definition:** Information that, if disclosed, could cause exceptionally grave damage to national security. SCI (Sensitive Compartmented Information) requires special handling.

**Characteristics:**
- Highest classification level
- Compartmented (need-to-know + access approval)
- Intelligence operations
- Special access programs

**Infrastructure Requirements:**

```yaml
top_secret_sci:
  environment: "Air-gapped JWICS, on-premises SCIF"
  encryption:
    at_rest: "NSA-approved Type 1 encryption"
    in_transit: "Type 1 encryption, Suite B crypto"
  access_control:
    authentication: "CAC/PIV + biometric"
    authorization: "Compartmented access, polygraph may be required"
    session: "5-minute inactivity timeout, auto-logoff"
  monitoring:
    logging: "All actions logged, real-time monitoring"
    retention: "25 years"
    siem: "24/7 security operations center"
    anomaly_detection: "AI/ML-based threat detection"
  personnel:
    clearance: "TS/SCI clearance required"
    citizenship: "U.S. citizens only (born or naturalized)"
    training: "Initial indoctrination, annual refresher, CI awareness"
    investigation: "SSBI (Single Scope Background Investigation)"
  compliance:
    frameworks: ["ICD 503", "ICD 705", "NIST 800-53 High"]
  network:
    segmentation: "Completely air-gapped"
    boundaries: "One-way data diode or trusted guard"
    wireless: "Prohibited"
  physical:
    location: "Accredited SCIF"
    access: "Continuous monitoring, no personal devices"
    tempest: "Required for certain systems"
```

---

### Special Category: ITAR (International Traffic in Arms Regulations)

**Definition:** Export-controlled defense articles, services, and technical data on the U.S. Munitions List.

**Characteristics:**
- Defense-related technology
- Strictly U.S. persons access
- Geographic data restrictions
- Export license required

**Infrastructure Requirements:**

```yaml
itar:
  environment: "U.S. GovCloud only (no international regions)"
  encryption:
    at_rest: "FIPS 140-2 validated (AES-256)"
    in_transit: "TLS 1.3, no international transit"
  access_control:
    authentication: "MFA required"
    authorization: "U.S. persons only (citizenship verified)"
    foreign_national_access: "Requires DSP-5 or TAA authorization"
  monitoring:
    logging: "All access logged with citizenship tracking"
    retention: "5 years minimum"
    audit: "Quarterly access reviews"
  personnel:
    clearance: "Not required (but common in defense)"
    citizenship: "U.S. persons only (citizens + permanent residents + protected persons)"
    verification: "I-9 verification, citizenship proof"
  compliance:
    frameworks: ["ITAR 22 CFR 120-130", "EAR"]
  network:
    segmentation: "Isolated from non-ITAR systems"
    geography: "U.S. data centers only"
  data:
    storage: "No replication outside U.S."
    transfer: "No international transfers"
    destruction: "Certificate of destruction required"
```

---

## Classification Criteria

### Data Classification Matrix

| Data Type | Unclassified | CUI | Secret | TS/SCI | ITAR |
|-----------|--------------|-----|--------|--------|------|
| **Public information** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Internal business** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Personal data (PII)** | ⚠️ | ✅ | ❌ | ❌ | ❌ |
| **Federal contract info** | ❌ | ✅ | ❌ | ❌ | ⚠️ |
| **Defense technical data** | ❌ | ⚠️ | ⚠️ | ⚠️ | ✅ |
| **Military operations** | ❌ | ❌ | ✅ | ⚠️ | ❌ |
| **Intelligence sources** | ❌ | ❌ | ⚠️ | ✅ | ❌ |
| **Nuclear weapons data** | ❌ | ❌ | ❌ | ✅ | ❌ |

**Legend:** ✅ Appropriate | ⚠️ May apply | ❌ Not applicable

---

## Architectural Patterns

### Pattern 1: Classification-Based Network Segmentation

```
Multi-Level Security Architecture:
┌─────────────────────────────────────────────────────┐
│ INTERNET (Unclassified)                             │
│  ↓                                                  │
│ ┌─────────────────────────────────────────────────┐ │
│ │ DMZ (Public-Facing Services)                    │ │
│ │ - Web servers                                   │ │
│ │ - Load balancers                                │ │
│ │ - WAF                                           │ │
│ └─────────────────────────────────────────────────┘ │
│  ↓ Firewall                                        │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────┐
│ INTERNAL NETWORK (Unclassified)                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Application Tier                            │   │
│  │ - Business logic                            │   │
│  │ - APIs                                      │   │
│  └─────────────────────────────────────────────┘   │
│  ↓ Firewall                                        │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────┐
│ CUI NETWORK (NIST 800-171 Zone)                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ CUI Processing Systems                      │   │
│  │ - Federal contract data                     │   │
│  │ - Encrypted storage                         │   │
│  │ - Access logging                            │   │
│  └─────────────────────────────────────────────┘   │
│  ↓ CDS (Cross-Domain Solution)                     │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────┐
│ SECRET NETWORK (Classified)                         │
│  ┌─────────────────────────────────────────────┐   │
│  │ Secret Workloads                            │   │
│  │ - Military systems                          │   │
│  │ - Intelligence data                         │   │
│  │ - Type 1 encryption                         │   │
│  └─────────────────────────────────────────────┘   │
│  ↓ Trusted Guard                                   │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────┐
│ TS/SCI NETWORK (Air-Gapped)                         │
│  ┌─────────────────────────────────────────────┐   │
│  │ TS/SCI Workloads                            │   │
│  │ - JWICS connectivity                        │   │
│  │ - SCIF environment                          │   │
│  │ - Physical isolation                        │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Pattern 2: Cloud Account Separation

```hcl
# Multi-account strategy for classification levels

# Organization structure
resource "aws_organizations_organization" "main" {
  feature_set = "ALL"
}

# Unclassified OU (Commercial AWS)
resource "aws_organizations_organizational_unit" "unclassified" {
  name      = "Unclassified"
  parent_id = aws_organizations_organization.main.roots[0].id
}

resource "aws_organizations_account" "unclassified_prod" {
  name      = "Production-Unclassified"
  email     = "aws-unclass-prod@company.com"
  parent_id = aws_organizations_organizational_unit.unclassified.id

  tags = {
    Classification = "Unclassified"
    Environment    = "Production"
  }
}

# CUI OU (GovCloud)
resource "aws_organizations_organizational_unit" "cui" {
  name      = "CUI-GovCloud"
  parent_id = aws_organizations_organization.main.roots[0].id
}

resource "aws_organizations_account" "cui_prod" {
  name      = "Production-CUI"
  email     = "aws-cui-prod@company.com"
  parent_id = aws_organizations_organizational_unit.cui.id

  tags = {
    Classification = "CUI"
    Environment    = "Production"
    Compliance     = "NIST-800-171"
  }
}

# ITAR OU (GovCloud, isolated)
resource "aws_organizations_organizational_unit" "itar" {
  name      = "ITAR"
  parent_id = aws_organizations_organization.main.roots[0].id
}

resource "aws_organizations_account" "itar_prod" {
  name      = "Production-ITAR"
  email     = "aws-itar-prod@company.com"
  parent_id = aws_organizations_organizational_unit.itar.id

  tags = {
    Classification   = "ITAR"
    Environment      = "Production"
    AccessRestriction = "US-Persons-Only"
  }
}

# Service Control Policies
resource "aws_organizations_policy" "cui_scp" {
  name        = "CUI-Restrictions"
  description = "Enforce CUI compliance requirements"

  content = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Deny"
        Action = ["*"]
        Resource = "*"
        Condition = {
          StringNotEquals = {
            "aws:RequestedRegion" = ["us-gov-west-1", "us-gov-east-1"]
          }
        }
      },
      {
        Effect = "Deny"
        Action = ["s3:PutObject"]
        Resource = "*"
        Condition = {
          StringNotEquals = {
            "s3:x-amz-server-side-encryption" = "aws:kms"
          }
        }
      }
    ]
  })
}

resource "aws_organizations_policy_attachment" "cui_attach" {
  policy_id = aws_organizations_policy.cui_scp.id
  target_id = aws_organizations_organizational_unit.cui.id
}
```

### Pattern 3: Kubernetes Namespace Isolation

```yaml
# Workload classification using Kubernetes namespaces

# Unclassified namespace
apiVersion: v1
kind: Namespace
metadata:
  name: unclassified
  labels:
    classification: unclassified
    pod-security.kubernetes.io/enforce: baseline

---
# CUI namespace with strict controls
apiVersion: v1
kind: Namespace
metadata:
  name: cui
  labels:
    classification: cui
    compliance: nist-800-171
    pod-security.kubernetes.io/enforce: restricted
  annotations:
    scheduler.alpha.kubernetes.io/node-selector: "classification=cui"

---
# Network policy: Default deny for CUI
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: cui-default-deny
  namespace: cui
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress

---
# Network policy: Allow CUI-to-CUI only
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: cui-isolation
  namespace: cui
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          classification: cui
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          classification: cui
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
    ports:
    - protocol: UDP
      port: 53

---
# ITAR namespace
apiVersion: v1
kind: Namespace
metadata:
  name: itar
  labels:
    classification: itar
    export-control: "true"
    pod-security.kubernetes.io/enforce: restricted
  annotations:
    scheduler.alpha.kubernetes.io/node-selector: "classification=itar,citizenship=us-persons"

---
# Resource quota for ITAR workloads
apiVersion: v1
kind: ResourceQuota
metadata:
  name: itar-quota
  namespace: itar
spec:
  hard:
    requests.cpu: "100"
    requests.memory: 200Gi
    persistentvolumeclaims: "50"
```

---

## Data Flow Controls

### Cross-Classification Data Flow

```
Controlled Data Transfer:
┌─────────────────────────────────────────────────────┐
│ SOURCE: TS/SCI Environment                          │
│  ┌──────────────────┐                              │
│  │ Classified Data  │                              │
│  └────────┬─────────┘                              │
└───────────┼─────────────────────────────────────────┘
            │
            ↓ Data Preparation
┌───────────┴─────────────────────────────────────────┐
│ REVIEW PROCESS                                      │
│  1. Classification review                           │
│  2. Sanitization/redaction                          │
│  3. Approval by Original Classification Authority   │
│  4. Document declassification decision              │
└───────────┬─────────────────────────────────────────┘
            │
            ↓ Cross-Domain Solution (CDS)
┌───────────┴─────────────────────────────────────────┐
│ TRUSTED GUARD / DATA DIODE                          │
│  - Content inspection                               │
│  - Malware scanning                                 │
│  - Policy enforcement                               │
│  - One-way transfer only                            │
└───────────┬─────────────────────────────────────────┘
            │
            ↓
┌───────────┴─────────────────────────────────────────┐
│ DESTINATION: Lower Classification or Unclassified   │
│  ┌──────────────────┐                              │
│  │ Sanitized Data   │                              │
│  └──────────────────┘                              │
└─────────────────────────────────────────────────────┘
```

### Data Labeling

```python
# data_classification.py
"""Data classification tagging system"""

class DataClassification:
    LEVELS = {
        'UNCLASSIFIED': {
            'numeric': 0,
            'marking': 'UNCLASSIFIED',
            'color': 'green'
        },
        'CUI': {
            'numeric': 1,
            'marking': 'CUI',
            'color': 'purple',
            'handling': 'CUI Basic'
        },
        'SECRET': {
            'numeric': 2,
            'marking': 'SECRET',
            'color': 'red',
            'handling': 'DoD 5200.1-R'
        },
        'TOP_SECRET': {
            'numeric': 3,
            'marking': 'TOP SECRET',
            'color': 'orange',
            'handling': 'EO 13526'
        },
        'TS_SCI': {
            'numeric': 4,
            'marking': 'TOP SECRET//SCI',
            'color': 'yellow',
            'handling': 'ICD 705',
            'compartment': 'REQUIRED'
        },
        'ITAR': {
            'numeric': 1,
            'marking': 'ITAR CONTROLLED',
            'color': 'blue',
            'handling': '22 CFR 120-130',
            'export_control': True
        }
    }

    @staticmethod
    def tag_data(data, classification, metadata=None):
        """Tag data with classification"""
        if classification not in DataClassification.LEVELS:
            raise ValueError(f"Invalid classification: {classification}")

        level = DataClassification.LEVELS[classification]

        tagged_data = {
            'data': data,
            'classification': {
                'level': classification,
                'marking': level['marking'],
                'numeric_level': level['numeric'],
                'timestamp': datetime.now().isoformat(),
                'classifier': metadata.get('classifier') if metadata else 'SYSTEM'
            }
        }

        if 'handling' in level:
            tagged_data['classification']['handling_caveat'] = level['handling']

        if metadata:
            tagged_data['classification']['metadata'] = metadata

        return tagged_data

    @staticmethod
    def can_access(user_clearance, data_classification):
        """Check if user can access data"""
        user_level = DataClassification.LEVELS[user_clearance]['numeric']
        data_level = DataClassification.LEVELS[data_classification]['numeric']

        # Simple clearance level check
        if user_level < data_level:
            return False

        # Additional checks for special categories
        if data_classification == 'TS_SCI':
            # Would check compartment access here
            pass

        if data_classification == 'ITAR':
            # Would check U.S. person status here
            pass

        return True

# Usage example
classifier = DataClassification()

# Tag CUI data
cui_data = classifier.tag_data(
    data={'contract': 'DoD-12345', 'specifications': '...'},
    classification='CUI',
    metadata={
        'classifier': 'john.doe@contractor.com',
        'cui_category': 'CTI',
        'distribution': 'FED ONLY'
    }
)

# Check access
can_access = classifier.can_access(
    user_clearance='CUI',
    data_classification='CUI'
)
```

---

## Implementation Guide

### Step 1: Data Discovery and Classification

```bash
#!/bin/bash
# classify-data.sh - Discover and classify data

echo "🔍 Starting data classification scan..."

# Scan for potential CUI
echo "Scanning for CUI indicators..."
rg -i "controlled unclassified|export control|fouo|for official use" . --type-not binary

# Scan for potential ITAR
echo "Scanning for ITAR indicators..."
rg -i "itar|munitions list|defense article|technical data.*export" . --type-not binary

# Scan for PII
echo "Scanning for PII..."
rg -i "ssn|social security|passport|driver.*license" . --type-not binary

echo "✅ Classification scan complete. Review findings and apply appropriate labels."
```

### Step 2: Infrastructure Tagging

```hcl
# Apply classification tags to all resources

locals {
  classification_tags = {
    # Data classification
    DataClassification = var.data_classification  # "Unclassified", "CUI", "Secret", "ITAR"

    # Compliance requirements
    ComplianceFramework = lookup({
      "Unclassified" = "SOC2"
      "CUI"          = "NIST-800-171,CMMC-L2"
      "Secret"       = "DoD-SRG-IL6"
      "ITAR"         = "ITAR-22-CFR-120"
    }, var.data_classification, "None")

    # Access restrictions
    AccessRestriction = lookup({
      "Unclassified" = "Standard"
      "CUI"          = "U.S.-Persons"
      "Secret"       = "Secret-Clearance"
      "ITAR"         = "U.S.-Persons-Only"
    }, var.data_classification, "Standard")

    # Environment designation
    Environment = var.environment

    # Encryption requirements
    EncryptionRequired = var.data_classification != "Unclassified" ? "FIPS-140-2" : "Standard"
  }
}

# Apply to all resources
resource "aws_s3_bucket" "classified_data" {
  bucket = "data-${var.data_classification}-${var.environment}"

  tags = merge(
    local.classification_tags,
    {
      Purpose = "Classified data storage"
    }
  )
}
```

### Step 3: Access Control Implementation

```yaml
# RBAC for classified workloads

apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: cui
  name: cui-developer
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: itar
  name: itar-developer
rules:
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs: ["get", "list", "watch", "create", "update", "patch"]

---
# RoleBinding with citizenship verification
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: itar-developers
  namespace: itar
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: itar-developer
subjects:
# Only bind to verified U.S. persons
- kind: User
  name: john.doe@company.com  # Verified U.S. citizen
  apiGroup: rbac.authorization.k8s.io
```

---

## Best Practices

### 1. Classification Decision Tree

```
Data Classification Decision Tree:
┌─────────────────────────────────────────────────────┐
│ START: What type of data?                           │
└───────────────┬─────────────────────────────────────┘
                │
                ↓
         Does it contain:
         - Military operations?
         - Intelligence sources?
                │
        ┌───────┴───────┐
        YES             NO
         ↓               ↓
    Extremely      Very serious
    grave damage?  damage?
         │              │
    YES  │  NO     YES  │  NO
         ↓   ↓       ↓   ↓
      TS/SCI SECRET  SECRET CUI?
                            │
                    ┌───────┴───────┐
                   YES              NO
                    ↓                ↓
              CUI Category:     UNCLASSIFIED
              - CTI (ITAR?)
              - PII
              - FOUO
              - etc.
```

### 2. Separation Enforcement

```yaml
# Gatekeeper policy: Enforce namespace classification
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredLabels
metadata:
  name: namespace-must-have-classification
spec:
  match:
    kinds:
    - apiGroups: [""]
      kinds: ["Namespace"]
  parameters:
    labels:
    - key: "classification"
      allowedRegex: "^(unclassified|cui|secret|itar)$"

---
# Deny cross-classification communication
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: denyunclas sifiedtocuiflow
spec:
  crd:
    spec:
      names:
        kind: DenyUnclassifiedToCUIFlow
  targets:
  - target: admission.k8s.gatekeeper.sh
    rego: |
      package denycrossclassflow

      violation[{"msg": msg}] {
        input.review.kind.kind == "NetworkPolicy"
        input.review.object.spec.ingress[_].from[_].namespaceSelector
        ns_label := input.review.object.spec.ingress[_].from[_].namespaceSelector.matchLabels.classification
        ns_label == "unclassified"
        input.review.namespace == "cui"

        msg := "Cannot allow traffic from unclassified namespace to CUI namespace"
      }
```

### 3. Audit and Monitoring

```python
# classification_audit.py
"""Audit workload classification compliance"""

def audit_classification_compliance():
    """Audit all resources for proper classification"""
    findings = []

    # Check tagging compliance
    untagged_resources = find_untagged_resources()
    if untagged_resources:
        findings.append({
            'severity': 'HIGH',
            'finding': f'{len(untagged_resources)} resources without classification tags',
            'resources': untagged_resources
        })

    # Check data flow violations
    flow_violations = check_data_flow_rules()
    if flow_violations:
        findings.append({
            'severity': 'CRITICAL',
            'finding': 'Cross-classification data flow detected',
            'violations': flow_violations
        })

    # Check access violations
    access_violations = check_access_compliance()
    if access_violations:
        findings.append({
            'severity': 'CRITICAL',
            'finding': 'Unauthorized access to classified data',
            'violations': access_violations
        })

    return findings

def generate_classification_report():
    """Generate classification compliance report"""
    report = {
        'timestamp': datetime.now().isoformat(),
        'summary': {
            'total_workloads': count_workloads(),
            'by_classification': {
                'unclassified': count_by_classification('unclassified'),
                'cui': count_by_classification('cui'),
                'secret': count_by_classification('secret'),
                'itar': count_by_classification('itar')
            }
        },
        'compliance_status': audit_classification_compliance(),
        'recommendations': generate_recommendations()
    }

    return report
```

---

**Related Resources:**
- [cleared-environment-architecture.md](cleared-environment-architecture.md) - Architectural patterns
- [cleared-cloud-environments.md](../../cloud-engineering/resources/cleared-cloud-environments.md) - Cloud implementations
- [compliance-frameworks.md](../../devsecops/resources/compliance-frameworks.md) - Compliance requirements
- [security-architecture.md](security-architecture.md) - Security patterns
