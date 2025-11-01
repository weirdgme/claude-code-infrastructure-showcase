# Cleared Cloud Environments

Government cloud regions, classified environments, air-gapped deployments, and compliance requirements for sensitive workloads.

## Table of Contents

- [Overview](#overview)
- [AWS GovCloud (US)](#aws-govcloud-us)
- [Azure Government](#azure-government)
- [Google Cloud for Government](#google-cloud-for-government)
- [Oracle Cloud Government](#oracle-cloud-government)
- [Air-Gapped Environments](#air-gapped-environments)
- [On-Premises Classified Networks](#on-premises-classified-networks)
- [Compliance Requirements](#compliance-requirements)
- [Best Practices](#best-practices)
- [Anti-Patterns](#anti-patterns)

---

## Overview

**Cleared Cloud Environments** are specialized cloud regions designed to host sensitive workloads requiring enhanced security, compliance, and isolation. These environments support various classification levels from Controlled Unclassified Information (CUI) to Top Secret (TS/SCI).

**Environment Types:**

```
┌─────────────────────────────────────────────────────────────┐
│ CLEARED ENVIRONMENT HIERARCHY                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Unclassified          → Public cloud (commercial regions)  │
│     ↓                                                       │
│  CUI / FOUO            → GovCloud / Government Cloud        │
│     ↓                                                       │
│  Secret                → Dedicated Government Regions       │
│     ↓                                                       │
│  Top Secret (TS/SCI)   → Air-gapped / Classified Networks   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Characteristics:**
- **Physical Separation**: Isolated data centers with restricted access
- **Personnel Clearances**: Operators hold security clearances
- **Compliance**: Pre-authorized for FedRAMP High, DoD IL4-IL6, CMMC
- **Network Isolation**: Dedicated networks, no direct internet connectivity
- **Data Sovereignty**: Data remains within specific geographic boundaries

---

## AWS GovCloud (US)

**AWS GovCloud (US)** is an isolated AWS region designed for U.S. government agencies, contractors, and regulated industries.

### Regions

| Region | Location | Impact Level |
|--------|----------|--------------|
| us-gov-west-1 | Oregon | IL2-IL5 (DoD) |
| us-gov-east-1 | Ohio | IL2-IL5 (DoD) |

### Key Features

**1. Compliance Authorizations:**
- FedRAMP High Authorization
- DoD SRG Impact Levels 2, 4, 5, 6
- ITAR (International Traffic in Arms Regulations)
- CJIS (Criminal Justice Information Services)
- FIPS 140-2 validated endpoints

**2. Access Requirements:**
```bash
# GovCloud requires separate AWS account
# Root account user must be a U.S. person
# Access from commercial AWS not allowed

# Create GovCloud account
aws organizations create-gov-cloud-account \
  --email govcloud-admin@agency.gov \
  --account-name "Agency GovCloud Account"

# Configure AWS CLI for GovCloud
aws configure --profile govcloud
# AWS Access Key ID: [GovCloud credentials]
# AWS Secret Access Key: [GovCloud credentials]
# Default region: us-gov-west-1
# Default output format: json
```

**3. Service Availability:**

```
✅ Available in GovCloud:
- EC2, S3, RDS, Lambda, ECS, EKS
- IAM, KMS, CloudTrail, CloudWatch
- VPC, Direct Connect, VPN
- Security Hub, GuardDuty, WAF

❌ NOT Available in GovCloud:
- Some newer services (delayed releases)
- Consumer services (Alexa, etc.)
- Services requiring internet connectivity
```

**4. Terraform Example:**

```hcl
# Configure GovCloud provider
provider "aws" {
  region  = "us-gov-west-1"
  profile = "govcloud"
}

# GovCloud VPC with FIPS endpoints
resource "aws_vpc" "govcloud_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name         = "govcloud-vpc"
    Classification = "CUI"
    Compliance   = "FedRAMP-High"
  }
}

# S3 bucket with encryption (FIPS 140-2)
resource "aws_s3_bucket" "govcloud_bucket" {
  bucket = "agency-govcloud-data"

  tags = {
    Classification = "CUI"
    DataRetention  = "7-years"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "govcloud_encryption" {
  bucket = aws_s3_bucket.govcloud_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.govcloud_key.arn
    }
  }
}

# KMS key for encryption
resource "aws_kms_key" "govcloud_key" {
  description             = "GovCloud KMS key"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Compliance = "FIPS-140-2"
  }
}
```

**5. Networking Considerations:**

```
GovCloud Network Architecture:
┌─────────────────────────────────────────────────────┐
│ On-Premises Data Center                            │
│  ┌──────────────────┐                              │
│  │ Cleared Network  │                              │
│  └────────┬─────────┘                              │
│           │                                         │
│           │ AWS Direct Connect (Dedicated)         │
│           │ (FIPS 140-2 encrypted tunnel)          │
└───────────┼─────────────────────────────────────────┘
            │
            ↓
┌───────────┴─────────────────────────────────────────┐
│ AWS GovCloud (US)                                   │
│  ┌─────────────────────────────────────────────┐   │
│  │ Virtual Private Gateway                      │   │
│  └─────────┬───────────────────────────────────┘   │
│            │                                         │
│  ┌─────────▼──────────┐  ┌────────────────────┐    │
│  │ Private Subnet     │  │ Isolated Subnet    │    │
│  │ (Application tier) │  │ (Data tier)        │    │
│  │ - EC2 instances    │  │ - RDS databases    │    │
│  │ - EKS cluster      │  │ - S3 VPC endpoints │    │
│  └────────────────────┘  └────────────────────┘    │
│                                                     │
│  ❌ NO Internet Gateway (air-gapped)               │
│  ✅ VPC Endpoints for AWS services                 │
└─────────────────────────────────────────────────────┘
```

---

## Azure Government

**Azure Government** is a physically isolated instance of Microsoft Azure for U.S. government agencies and partners.

### Regions

| Region | Location | Impact Level |
|--------|----------|--------------|
| USGov Virginia | Virginia | IL2-IL5 |
| USGov Arizona | Arizona | IL2-IL5 |
| USGov Texas | Texas | IL2-IL5 |
| USGov DoD East | Confidential | IL6 (Secret) |
| USGov DoD Central | Confidential | IL6 (Secret) |

### Key Features

**1. Compliance Authorizations:**
- FedRAMP High
- DoD SRG Impact Levels 2, 4, 5
- DoD IL6 (Secret) in DoD regions
- CJIS, ITAR, IRS 1075

**2. Access Configuration:**

```bash
# Install Azure Government CLI
az cloud set --name AzureUSGovernment

# Login to Azure Government
az login

# Set subscription
az account set --subscription "Government Subscription ID"

# Verify endpoint
az cloud show --query endpoints.resourceManager
# Output: https://management.usgovcloudapi.net/
```

**3. Terraform Example:**

```hcl
# Configure Azure Government provider
provider "azurerm" {
  features {}
  environment = "usgovernment"
}

# Resource group in Azure Government
resource "azurerm_resource_group" "govcloud_rg" {
  name     = "rg-government-eastus"
  location = "usgovvirginia"

  tags = {
    Classification = "CUI"
    Compliance     = "FedRAMP-High"
    Environment    = "Production"
  }
}

# Virtual Network with NSGs
resource "azurerm_virtual_network" "govcloud_vnet" {
  name                = "vnet-government"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.govcloud_rg.location
  resource_group_name = azurerm_resource_group.govcloud_rg.name

  tags = {
    Classification = "CUI"
  }
}

# Subnet for workloads
resource "azurerm_subnet" "govcloud_subnet" {
  name                 = "snet-workloads"
  resource_group_name  = azurerm_resource_group.govcloud_rg.name
  virtual_network_name = azurerm_virtual_network.govcloud_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Storage account with encryption
resource "azurerm_storage_account" "govcloud_storage" {
  name                     = "stgovclouddata001"
  resource_group_name      = azurerm_resource_group.govcloud_rg.name
  location                 = azurerm_resource_group.govcloud_rg.location
  account_tier             = "Standard"
  account_replication_type = "GRS"

  # Enable encryption with customer-managed keys
  identity {
    type = "SystemAssigned"
  }

  tags = {
    Classification = "CUI"
    DataRetention  = "7-years"
  }
}

# Key Vault for secrets (FIPS 140-2)
resource "azurerm_key_vault" "govcloud_kv" {
  name                       = "kv-govcloud-001"
  location                   = azurerm_resource_group.govcloud_rg.location
  resource_group_name        = azurerm_resource_group.govcloud_rg.name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "premium"

  # Enable FIPS 140-2 Level 2 HSM
  enabled_for_disk_encryption = true
  purge_protection_enabled    = true

  network_acls {
    default_action = "Deny"
    bypass         = "AzureServices"
  }
}
```

**4. DoD Regions (Secret/IL6):**

```
Azure Government DoD Architecture:
┌─────────────────────────────────────────────────────┐
│ DoD Network (NIPRNET/SIPRNET)                       │
│  ┌──────────────────┐                              │
│  │ Classified Data  │                              │
│  └────────┬─────────┘                              │
│           │                                         │
│           │ ExpressRoute (Dedicated, IL6-approved) │
│           │                                         │
└───────────┼─────────────────────────────────────────┘
            │
            ↓
┌───────────┴─────────────────────────────────────────┐
│ Azure Government DoD East/Central                   │
│  ┌─────────────────────────────────────────────┐   │
│  │ Virtual Network Gateway                      │   │
│  └─────────┬───────────────────────────────────┘   │
│            │                                         │
│  ┌─────────▼──────────┐  ┌────────────────────┐    │
│  │ App Subnet         │  │ Data Subnet        │    │
│  │ - VMs (Secret)     │  │ - SQL MI (Secret)  │    │
│  │ - AKS (IL6)        │  │ - Cosmos DB        │    │
│  └────────────────────┘  └────────────────────┘    │
│                                                     │
│  Requirements:                                      │
│  ✅ All personnel cleared to Secret level          │
│  ✅ Physical isolation from commercial Azure       │
│  ✅ FIPS 140-2 Level 3+ encryption                 │
└─────────────────────────────────────────────────────┘
```

---

## Google Cloud for Government

**Google Cloud for Government** provides isolated regions and compliance for government workloads.

### Offering Types

| Offering | Description | Impact Level |
|----------|-------------|--------------|
| Assured Workloads | Compliance controls in commercial regions | IL2-IL4 |
| Government Regions | Dedicated regions (coming) | IL4-IL5 |

### Key Features

**1. Assured Workloads Configuration:**

```bash
# Create Assured Workload
gcloud assured workloads create \
  --organization=123456789 \
  --location=us-central1 \
  --display-name="FedRAMP High Workload" \
  --compliance-regime=FEDRAMP_HIGH \
  --billing-account=ABCDEF-123456

# List assured workloads
gcloud assured workloads list \
  --organization=123456789 \
  --location=us-central1
```

**2. Terraform Example:**

```hcl
# Assured Workloads for FedRAMP compliance
resource "google_assured_workloads_workload" "fedramp_workload" {
  organization = "123456789"
  location     = "us-central1"
  display_name = "FedRAMP High Environment"

  compliance_regime = "FEDRAMP_HIGH"
  billing_account   = "billingAccounts/ABCDEF-123456"

  resource_settings {
    resource_type = "CONSUMER_PROJECT"
  }

  kms_settings {
    next_rotation_time = "2024-12-31T23:59:59Z"
    rotation_period    = "7776000s"  # 90 days
  }
}

# VPC in Assured Workload
resource "google_compute_network" "assured_vpc" {
  project                 = google_assured_workloads_workload.fedramp_workload.resources[0].resource_id
  name                    = "vpc-fedramp-high"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "assured_subnet" {
  project       = google_assured_workloads_workload.fedramp_workload.resources[0].resource_id
  name          = "subnet-workloads"
  ip_cidr_range = "10.0.0.0/24"
  region        = "us-central1"
  network       = google_compute_network.assured_vpc.id

  log_config {
    aggregation_interval = "INTERVAL_5_SEC"
    flow_sampling        = 1.0
    metadata             = "INCLUDE_ALL_METADATA"
  }
}

# GKE cluster with FedRAMP compliance
resource "google_container_cluster" "assured_gke" {
  project  = google_assured_workloads_workload.fedramp_workload.resources[0].resource_id
  name     = "gke-fedramp-high"
  location = "us-central1"

  # Enable Workload Identity
  workload_identity_config {
    workload_pool = "${google_assured_workloads_workload.fedramp_workload.resources[0].resource_id}.svc.id.goog"
  }

  # Enable Shielded Nodes
  enable_shielded_nodes = true

  # Database encryption with CMEK
  database_encryption {
    state    = "ENCRYPTED"
    key_name = google_kms_crypto_key.gke_key.id
  }
}
```

**3. Compliance Controls:**

```
Assured Workloads Compliance Boundaries:
┌─────────────────────────────────────────────────────┐
│ Assured Workload Folder                             │
│  ┌─────────────────────────────────────────────┐   │
│  │ Compliance Controls (enforced)               │   │
│  │ - Data residency (US only)                   │   │
│  │ - Personnel access (US Persons only)         │   │
│  │ - Encryption (FIPS 140-2)                    │   │
│  │ - Audit logging (immutable)                  │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌────────────────┐  ┌────────────────┐            │
│  │ Project 1      │  │ Project 2      │            │
│  │ (FedRAMP High) │  │ (FedRAMP High) │            │
│  │                │  │                │            │
│  │ - Compute VMs  │  │ - GKE cluster  │            │
│  │ - Cloud SQL    │  │ - Cloud Run    │            │
│  │ - GCS buckets  │  │ - Firestore    │            │
│  └────────────────┘  └────────────────┘            │
│                                                     │
│  ❌ Cannot move resources outside workload         │
│  ✅ Automatic compliance monitoring                │
└─────────────────────────────────────────────────────┘
```

---

## Oracle Cloud Government

**Oracle Cloud Government** provides isolated regions for U.S. government workloads.

### Regions

| Region | Location | Impact Level |
|--------|----------|--------------|
| us-langley-1 | Ashburn, VA | IL5 (DoD) |
| us-luke-1 | Phoenix, AZ | IL5 (DoD) |

### Key Features

**1. Compliance Authorizations:**
- FedRAMP High
- DoD SRG Impact Level 5
- DISA IL5 Authorization

**2. Terraform Example:**

```hcl
# Configure OCI Government provider
provider "oci" {
  region = "us-langley-1"
}

# VCN (Virtual Cloud Network)
resource "oci_core_vcn" "gov_vcn" {
  compartment_id = var.compartment_id
  cidr_block     = "10.0.0.0/16"
  display_name   = "govcloud-vcn"
  dns_label      = "govvcn"

  freeform_tags = {
    "Classification" = "CUI"
    "Compliance"     = "FedRAMP-High"
  }
}

# Subnet for application tier
resource "oci_core_subnet" "app_subnet" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.gov_vcn.id
  cidr_block     = "10.0.1.0/24"
  display_name   = "app-subnet"

  security_list_ids = [oci_core_security_list.app_security_list.id]
}

# Object Storage bucket (encrypted)
resource "oci_objectstorage_bucket" "gov_bucket" {
  compartment_id = var.compartment_id
  namespace      = data.oci_objectstorage_namespace.ns.namespace
  name           = "govcloud-data"
  access_type    = "NoPublicAccess"

  # Server-side encryption
  kms_key_id = oci_kms_key.gov_key.id

  freeform_tags = {
    "Classification" = "CUI"
  }
}

# Vault for key management
resource "oci_kms_vault" "gov_vault" {
  compartment_id = var.compartment_id
  display_name   = "govcloud-vault"
  vault_type     = "DEFAULT"
}

# Encryption key (FIPS 140-2 Level 3)
resource "oci_kms_key" "gov_key" {
  compartment_id = var.compartment_id
  display_name   = "govcloud-encryption-key"

  key_shape {
    algorithm = "AES"
    length    = 256
  }

  management_endpoint = oci_kms_vault.gov_vault.management_endpoint
}
```

---

## Air-Gapped Environments

**Air-gapped environments** are completely isolated networks with no connection to the internet or external networks.

### Architecture Patterns

**1. Complete Air-Gap:**

```
Air-Gapped Data Center:
┌─────────────────────────────────────────────────────┐
│ Physical Security Perimeter                         │
│  ┌─────────────────────────────────────────────┐   │
│  │ Air-Gapped Network (TS/SCI)                 │   │
│  │                                              │   │
│  │  ┌──────────────┐  ┌──────────────┐         │   │
│  │  │ Kubernetes   │  │ Storage      │         │   │
│  │  │ Cluster      │  │ - Ceph       │         │   │
│  │  │ - Rancher    │  │ - MinIO      │         │   │
│  │  │ - RKE2       │  │              │         │   │
│  │  └──────────────┘  └──────────────┘         │   │
│  │                                              │   │
│  │  ┌──────────────────────────────┐           │   │
│  │  │ Data Diode (one-way transfer) │           │   │
│  │  │ - Inbound ONLY                │           │   │
│  │  └─────────┬────────────────────┘           │   │
│  └────────────┼─────────────────────────────────┘   │
└───────────────┼─────────────────────────────────────┘
                │ (One-way data flow)
                ↓
┌───────────────┴─────────────────────────────────────┐
│ Lower Classification Network (Secret)               │
│  ┌──────────────────┐                              │
│  │ Staging Area     │                              │
│  │ - Data validation│                              │
│  │ - Malware scan   │                              │
│  └──────────────────┘                              │
└─────────────────────────────────────────────────────┘
```

**2. Kubernetes in Air-Gapped Environment:**

```yaml
# RKE2 configuration for air-gapped deployment
# /etc/rancher/rke2/config.yaml
---
write-kubeconfig-mode: "0644"
tls-san:
  - "kubernetes.classified.local"

# Use local registry for images
system-default-registry: "registry.classified.local:5000"

# Disable automatic updates
disable:
  - rke2-ingress-nginx

# Configure CNI
cni:
  - calico

# etcd configuration
etcd-snapshot-schedule-cron: "0 */12 * * *"
etcd-snapshot-retention: 14
```

**3. Private Container Registry:**

```bash
# Deploy Harbor registry in air-gapped environment
cat <<EOF > harbor-values.yaml
expose:
  type: nodePort
  tls:
    enabled: true
    certSource: secret
    secret:
      secretName: harbor-tls
      notarySecretName: notary-tls

externalURL: https://registry.classified.local

persistence:
  enabled: true
  persistentVolumeClaim:
    registry:
      storageClass: "local-storage"
      size: 500Gi
    database:
      storageClass: "local-storage"
      size: 10Gi

# Disable internet connectivity
portal:
  replicas: 2
core:
  replicas: 2
registry:
  replicas: 2
EOF

# Install Harbor
helm install harbor harbor/harbor \
  -n harbor \
  --create-namespace \
  -f harbor-values.yaml
```

**4. Software Updates (Sneakernet):**

```bash
#!/bin/bash
# update-airgap.sh - Process for updating air-gapped environment

# Step 1: On internet-connected system, download images
docker pull docker.io/library/nginx:1.25
docker pull quay.io/prometheus/prometheus:v2.45.0

# Step 2: Save images to tarball
docker save -o airgap-images.tar \
  docker.io/library/nginx:1.25 \
  quay.io/prometheus/prometheus:v2.45.0

# Step 3: Virus scan and validation
clamscan airgap-images.tar
sha256sum airgap-images.tar > airgap-images.tar.sha256

# Step 4: Transfer via physical media (USB, DVD)
# Requires two-person integrity for classified transfers

# Step 5: On air-gapped system, verify and load
sha256sum -c airgap-images.tar.sha256
docker load -i airgap-images.tar

# Step 6: Tag and push to internal registry
docker tag docker.io/library/nginx:1.25 registry.classified.local:5000/nginx:1.25
docker push registry.classified.local:5000/nginx:1.25
```

---

## On-Premises Classified Networks

**On-premises classified networks** include NIPRNET, SIPRNET, and JWICS for different classification levels.

### Network Types

| Network | Classification | Access |
|---------|----------------|--------|
| NIPRNET | Unclassified | DoD users |
| SIPRNET | Secret | Secret clearance required |
| JWICS | Top Secret/SCI | TS/SCI clearance required |

### Architecture Example

```
Cross-Domain Solution (CDS):
┌─────────────────────────────────────────────────────┐
│ JWICS (Top Secret/SCI)                              │
│  ┌──────────────────┐                              │
│  │ TS/SCI Workloads │                              │
│  └────────┬─────────┘                              │
└───────────┼─────────────────────────────────────────┘
            │
            ↓ Trusted Guard (CDS)
┌───────────┴─────────────────────────────────────────┐
│ SIPRNET (Secret)                                    │
│  ┌──────────────────┐                              │
│  │ Secret Workloads │                              │
│  └────────┬─────────┘                              │
└───────────┼─────────────────────────────────────────┘
            │
            ↓ CDS with Content Filtering
┌───────────┴─────────────────────────────────────────┐
│ NIPRNET (Unclassified)                              │
│  ┌──────────────────┐                              │
│  │ Unclass Workloads│                              │
│  └──────────────────┘                              │
└─────────────────────────────────────────────────────┘
```

---

## Compliance Requirements

### FedRAMP Requirements by Impact Level

| Requirement | FedRAMP Low | FedRAMP Moderate | FedRAMP High |
|-------------|-------------|------------------|--------------|
| NIST 800-53 Controls | 125+ | 325+ | 421+ |
| Data Location | U.S. | U.S. | U.S. |
| Personnel Screening | Basic | Moderate | High |
| Incident Response | 1 hour | 1 hour | 1 hour |
| Continuous Monitoring | Required | Required | Required |

### DoD Impact Levels

| Impact Level | Classification | Environment | Personnel |
|--------------|----------------|-------------|-----------|
| IL2 | Unclassified | Commercial cloud | U.S. persons |
| IL4 | CUI | GovCloud/Gov regions | U.S. citizens |
| IL5 | CUI | Dedicated Gov regions | Cleared personnel |
| IL6 | Secret | DoD regions | Secret clearance |

### CMMC Levels

```
CMMC 2.0 Levels:
┌─────────────────────────────────────────────────────┐
│ Level 1: Foundational (17 practices)                │
│ - Basic cyber hygiene                               │
│ - Self-assessment                                   │
│ - For unclassified, non-CUI                         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Level 2: Advanced (110 practices - NIST 800-171)    │
│ - Protection of CUI                                 │
│ - Self or C3PAO assessment                          │
│ - Required for CUI contracts                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Level 3: Expert (110+ practices - subset 800-172)   │
│ - Advanced persistent threats (APT)                 │
│ - C3PAO assessment required                         │
│ - Critical national security programs               │
└─────────────────────────────────────────────────────┘
```

---

## Best Practices

### 1. Environment Selection

**Decision Matrix:**

| Workload Type | Recommended Environment |
|---------------|------------------------|
| Unclassified public data | Commercial cloud (AWS, Azure, GCP) |
| CUI (NIST 800-171) | GovCloud, Azure Gov, Assured Workloads |
| Secret (DoD IL6) | Azure Gov DoD, AWS Secret Region |
| Top Secret/SCI | Air-gapped or on-premises classified |

### 2. Data Classification

```bash
# Tag all resources with classification
# Terraform example:
locals {
  required_tags = {
    Classification = "CUI"
    DataOwner     = "security@agency.gov"
    Compliance    = "NIST-800-171"
    RetentionYears = "7"
  }
}
```

### 3. Network Isolation

```yaml
# Kubernetes NetworkPolicy for classified workloads
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: classified-isolation
  namespace: secret-workloads
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          classification: secret
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          classification: secret
  # NO internet egress allowed
```

### 4. Encryption Requirements

```
Encryption Standards by Classification:
┌─────────────────────────────────────────────────────┐
│ Unclassified: AES-256, TLS 1.2+                     │
│ CUI: FIPS 140-2 validated, AES-256, TLS 1.3         │
│ Secret: FIPS 140-2 Level 3+, Suite B cryptography   │
│ Top Secret: NSA-approved, Type 1 encryption         │
└─────────────────────────────────────────────────────┘
```

### 5. Access Control

```bash
# Enforce CAC/PIV authentication
# Azure Government example
az ad sp create-for-rbac \
  --name "GovCloudApp" \
  --role Contributor \
  --scopes /subscriptions/{subscription-id}

# Require MFA for all accounts
az ad user update \
  --id user@agency.gov \
  --force-change-password-next-login true
```

---

## Anti-Patterns

### ❌ Anti-Pattern: Using Commercial Regions for CUI

**Problem:**
```hcl
# WRONG: Storing CUI in commercial AWS region
provider "aws" {
  region = "us-east-1"  # Commercial region
}

resource "aws_s3_bucket" "cui_data" {
  bucket = "cui-data-bucket"
  # This violates FedRAMP requirements!
}
```

**✅ Correct Approach:**
```hcl
# CORRECT: Use GovCloud for CUI
provider "aws" {
  region  = "us-gov-west-1"
  profile = "govcloud"
}

resource "aws_s3_bucket" "cui_data" {
  bucket = "cui-data-govcloud-bucket"

  tags = {
    Classification = "CUI"
    Compliance     = "NIST-800-171"
  }
}
```

### ❌ Anti-Pattern: Internet Connectivity in Air-Gapped

**Problem:**
```yaml
# WRONG: Allowing internet egress in air-gapped cluster
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all
spec:
  podSelector: {}
  policyTypes:
  - Egress
  egress:
  - {}  # Allows all egress traffic!
```

**✅ Correct Approach:**
```yaml
# CORRECT: Strict network isolation
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-default
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  # Explicitly NO ingress or egress rules = deny all
```

### ❌ Anti-Pattern: Mixing Classification Levels

**Problem:**
```
WRONG: Hosting Secret and Unclassified in same cluster
┌─────────────────────────────────────┐
│ Kubernetes Cluster                  │
│  ┌────────────┐  ┌────────────┐     │
│  │ Namespace  │  │ Namespace  │     │
│  │ (Secret)   │  │ (Unclass)  │     │
│  └────────────┘  └────────────┘     │
│         ↑              ↑             │
│         └──────┬───────┘             │
│                │ Same network!       │
└────────────────┼─────────────────────┘
```

**✅ Correct Approach:**
```
CORRECT: Separate clusters by classification
┌─────────────────────────────────────┐
│ Secret Cluster (GovCloud DoD)       │
│  ┌────────────┐                     │
│  │ Secret     │                     │
│  │ Workloads  │                     │
│  └────────────┘                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Unclass Cluster (GovCloud)          │
│  ┌────────────┐                     │
│  │ Unclass    │                     │
│  │ Workloads  │                     │
│  └────────────┘                     │
└─────────────────────────────────────┘
```

---

**Related Resources:**
- [cloud-security.md](cloud-security.md) - Encryption, IAM, compliance controls
- [cloud-networking.md](cloud-networking.md) - VPC design, isolation patterns
- [migration-strategies.md](migration-strategies.md) - Migrating to government clouds
