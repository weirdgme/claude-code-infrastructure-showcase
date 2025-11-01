# Oracle Cloud Infrastructure (OCI) Patterns

Comprehensive guide to Oracle Cloud Infrastructure covering core services, architectural patterns, and best practices for building scalable, reliable, and secure cloud infrastructure on OCI.

## Table of Contents

- [OCI Service Overview](#oci-service-overview)
- [Compute Services](#compute-services)
- [Storage Services](#storage-services)
- [Database Services](#database-services)
- [Networking Services](#networking-services)
- [Container and Kubernetes Services](#container-and-kubernetes-services)
- [Serverless Services](#serverless-services)
- [Identity and Security](#identity-and-security)
- [Monitoring and Management](#monitoring-and-management)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)
- [Anti-Patterns](#anti-patterns)

## OCI Service Overview

### Service Categories

```
Compute:         Compute Instances, Bare Metal, Container Engine (OKE), Functions
Storage:         Object Storage, Block Volumes, File Storage, Archive Storage
Database:        Autonomous Database, Base Database, MySQL, PostgreSQL, NoSQL
Networking:      VCN, Load Balancer, FastConnect, DNS, VPN, Service Gateway
Security:        IAM, Vault, Bastion, WAF, Cloud Guard
Monitoring:      Monitoring, Logging, Events, Notifications, APM
DevOps:          DevOps Service, Resource Manager (Terraform), API Gateway
Analytics:       Data Integration, Data Flow, Analytics Cloud
```

### OCI Regions and Availability Domains

```
Region:              Geographic area (e.g., us-ashburn-1, uk-london-1)
Availability Domain: Isolated data centers within region (AD-1, AD-2, AD-3)
Fault Domain:        Logical grouping within AD for high availability
```

## Compute Services

### Compute Instances

**VM Shapes:**
```
Standard (VM.Standard):      General purpose workloads
DenseIO (VM.DenseIO):        High local NVMe storage
GPU (VM.GPU):                ML training, graphics rendering
HPC (BM.HPC):                High-performance computing
Bare Metal (BM.Standard):    No virtualization overhead
Flexible (VM.Standard.E4.Flex): Custom CPU/memory ratio
```

**Example: Compute Instance with Terraform:**
```hcl
# compute_instance.tf
resource "oci_core_instance" "app_server" {
  availability_domain = data.oci_identity_availability_domain.ad1.name
  compartment_id      = var.compartment_id
  display_name        = "app-server-${var.environment}"
  shape               = "VM.Standard.E4.Flex"

  # Flexible shape configuration
  shape_config {
    ocpus         = 2
    memory_in_gbs = 16
  }

  # Boot volume
  create_vnic_details {
    subnet_id        = oci_core_subnet.private.id
    assign_public_ip = false
    hostname_label   = "app-server"
  }

  source_details {
    source_type = "image"
    source_id   = data.oci_core_images.oracle_linux.images[0].id
    boot_volume_size_in_gbs = 100
  }

  # Cloud-init configuration
  metadata = {
    ssh_authorized_keys = file("~/.ssh/id_rsa.pub")
    user_data           = base64encode(file("${path.module}/cloud-init.yaml"))
  }

  # High availability
  fault_domain = "FAULT-DOMAIN-1"

  # Tags
  freeform_tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
    Application = "web-app"
  }
}

# Instance pool for auto-scaling
resource "oci_core_instance_pool" "app_pool" {
  compartment_id = var.compartment_id
  display_name   = "app-instance-pool"

  instance_configuration_id = oci_core_instance_configuration.app.id

  placement_configurations {
    availability_domain = data.oci_identity_availability_domain.ad1.name
    primary_subnet_id   = oci_core_subnet.private.id

    fault_domains = [
      "FAULT-DOMAIN-1",
      "FAULT-DOMAIN-2",
      "FAULT-DOMAIN-3"
    ]
  }

  size = 3

  load_balancers {
    backend_set_name = oci_load_balancer_backend_set.app.name
    load_balancer_id = oci_load_balancer_load_balancer.public.id
    port             = 8080
    vnic_selection   = "PrimaryVnic"
  }
}

# Auto-scaling configuration
resource "oci_autoscaling_auto_scaling_configuration" "app" {
  compartment_id       = var.compartment_id
  display_name         = "app-autoscaling"
  auto_scaling_resources {
    id   = oci_core_instance_pool.app_pool.id
    type = "instancePool"
  }

  policies {
    display_name = "cpu-based-autoscaling"
    policy_type  = "threshold"
    capacity {
      initial = 3
      max     = 10
      min     = 2
    }

    rules {
      display_name = "scale-out-rule"
      action {
        type  = "CHANGE_COUNT_BY"
        value = 1
      }
      metric {
        metric_type = "CPU_UTILIZATION"
        threshold {
          operator = "GT"
          value    = 75
        }
      }
    }

    rules {
      display_name = "scale-in-rule"
      action {
        type  = "CHANGE_COUNT_BY"
        value = -1
      }
      metric {
        metric_type = "CPU_UTILIZATION"
        threshold {
          operator = "LT"
          value    = 25
        }
      }
    }
  }
}
```

### Bare Metal Instances

**When to Use:**
- No virtualization overhead for maximum performance
- Oracle Database workloads
- Compliance requirements
- Large memory requirements (up to 2TB)

```hcl
resource "oci_core_instance" "bare_metal_db" {
  availability_domain = data.oci_identity_availability_domain.ad1.name
  compartment_id      = var.compartment_id
  display_name        = "oracle-db-server"
  shape               = "BM.Standard2.52"  # 52 OCPUs, 768 GB memory

  create_vnic_details {
    subnet_id = oci_core_subnet.database.id
  }

  source_details {
    source_type = "image"
    source_id   = data.oci_database_db_system_shapes.db_shapes.db_system_shapes[0].id
  }

  # Local NVMe storage
  launch_options {
    boot_volume_type = "ISCSI"
  }
}
```

## Storage Services

### Object Storage

**Storage Tiers:**
```
Standard:    Frequent access, immediate availability
Infrequent:  Accessed less than once per month, 90-day retention
Archive:     Long-term retention, restore time required
```

**Example: Object Storage Bucket:**
```hcl
# object_storage.tf
resource "oci_objectstorage_bucket" "application_data" {
  compartment_id = var.compartment_id
  namespace      = data.oci_objectstorage_namespace.ns.namespace
  name           = "application-data-${var.environment}"
  access_type    = "NoPublicAccess"

  # Versioning for data protection
  versioning = "Enabled"

  # Storage tier
  storage_tier = "Standard"

  # Object lifecycle policy
  retention_rules {
    display_name = "retention-policy"
    duration {
      time_amount = 90
      time_unit   = "DAYS"
    }
  }

  # Automatic tiering
  auto_tiering = "InfrequentAccess"

  freeform_tags = {
    Environment = var.environment
    DataClass   = "sensitive"
  }
}

# Pre-authenticated request for temporary access
resource "oci_objectstorage_preauthrequest" "temporary_upload" {
  namespace    = data.oci_objectstorage_namespace.ns.namespace
  bucket       = oci_objectstorage_bucket.application_data.name
  name         = "temp-upload-link"
  access_type  = "ObjectWrite"
  time_expires = timeadd(timestamp(), "24h")
  object_name  = "uploads/"
}
```

### Block Volumes

**Volume Types:**
```
Balanced:           Baseline performance, cost-effective
Higher Performance: Increased IOPS and throughput
Ultra High:         Maximum performance for critical workloads
```

**Example: Block Volume with Backup:**
```hcl
# block_volume.tf
resource "oci_core_volume" "application_data" {
  availability_domain = data.oci_identity_availability_domain.ad1.name
  compartment_id      = var.compartment_id
  display_name        = "app-data-volume"
  size_in_gbs         = 500

  # Performance tier
  vpus_per_gb = 20  # Higher performance

  # Encryption
  is_auto_tune_enabled = true

  # Volume groups for consistent backups
  volume_group_id = oci_core_volume_group.app.id
}

# Attach to instance
resource "oci_core_volume_attachment" "app_data_attachment" {
  attachment_type = "paravirtualized"
  instance_id     = oci_core_instance.app_server.id
  volume_id       = oci_core_volume.application_data.id
  device          = "/dev/oracleoci/oraclevdb"
}

# Backup policy
resource "oci_core_volume_backup_policy_assignment" "app_backup" {
  asset_id  = oci_core_volume.application_data.id
  policy_id = data.oci_core_volume_backup_policies.default_policies.volume_backup_policies[0].id
}
```

### File Storage Service (FSS)

**Example: NFS File System:**
```hcl
# file_storage.tf
resource "oci_file_storage_file_system" "shared_storage" {
  availability_domain = data.oci_identity_availability_domain.ad1.name
  compartment_id      = var.compartment_id
  display_name        = "shared-application-storage"
}

resource "oci_file_storage_mount_target" "mount_target" {
  availability_domain = data.oci_identity_availability_domain.ad1.name
  compartment_id      = var.compartment_id
  subnet_id           = oci_core_subnet.private.id
  display_name        = "mount-target-ad1"

  hostname_label = "fss-mt"
}

resource "oci_file_storage_export" "export" {
  export_set_id  = oci_file_storage_mount_target.mount_target.export_set_id
  file_system_id = oci_file_storage_file_system.shared_storage.id
  path           = "/shared"

  export_options {
    source                         = "10.0.0.0/16"
    access                         = "READ_WRITE"
    identity_squash                = "NONE"
    require_privileged_source_port = false
  }
}
```

## Database Services

### Autonomous Database

**Database Workload Types:**
```
ATP (Transaction Processing):  OLTP workloads
ADW (Data Warehouse):          Analytics and reporting
APEX:                          Low-code application development
AJD (JSON):                    JSON document store
```

**Example: Autonomous Database:**
```hcl
# autonomous_database.tf
resource "oci_database_autonomous_database" "app_db" {
  compartment_id           = var.compartment_id
  db_name                  = "APPDB"
  display_name             = "application-database-${var.environment}"
  admin_password           = var.db_admin_password
  db_workload              = "OLTP"  # ATP
  cpu_core_count           = 2
  data_storage_size_in_tbs = 1

  # Auto-scaling
  is_auto_scaling_enabled = true
  is_auto_scaling_for_storage_enabled = true

  # High availability
  is_dedicated = false
  is_free_tier = false

  # Network access
  subnet_id                    = oci_core_subnet.database.id
  nsg_ids                      = [oci_core_network_security_group.db.id]
  is_mtls_connection_required  = true

  # Backup configuration
  is_data_guard_enabled = true
  db_version            = "19c"

  # License
  license_model = "LICENSE_INCLUDED"

  freeform_tags = {
    Environment = var.environment
    DatabaseType = "autonomous"
  }
}

# Autonomous Database backup
resource "oci_database_autonomous_database_backup" "manual_backup" {
  autonomous_database_id = oci_database_autonomous_database.app_db.id
  display_name           = "manual-backup-${formatdate("YYYY-MM-DD", timestamp())}"
}
```

### MySQL Database Service

**Example: MySQL HeatWave:**
```hcl
# mysql_database.tf
resource "oci_mysql_mysql_db_system" "app_mysql" {
  compartment_id      = var.compartment_id
  shape_name          = "MySQL.VM.Standard.E4.4.64GB"
  subnet_id           = oci_core_subnet.database.id
  availability_domain = data.oci_identity_availability_domain.ad1.name

  admin_password = var.mysql_admin_password
  admin_username = "admin"

  # High availability
  is_highly_available = true

  # Data storage
  data_storage_size_in_gb = 100

  # Backup
  backup_policy {
    is_enabled        = true
    retention_in_days = 7
    window_start_time = "02:00"
  }

  # HeatWave cluster for analytics
  is_heat_wave_cluster_attached = true
  heat_wave_cluster {
    shape_name = "MySQL.HeatWave.VM.Standard.E3"
    cluster_size = 2
  }

  display_name = "mysql-db-${var.environment}"

  freeform_tags = {
    Environment = var.environment
  }
}
```

## Networking Services

### Virtual Cloud Network (VCN)

**Example: Production VCN with Multiple Tiers:**
```hcl
# vcn.tf
resource "oci_core_vcn" "production" {
  compartment_id = var.compartment_id
  cidr_blocks    = ["10.0.0.0/16"]
  display_name   = "production-vcn"
  dns_label      = "prodvcn"

  is_ipv6enabled = false

  freeform_tags = {
    Environment = "production"
  }
}

# Internet Gateway for public subnets
resource "oci_core_internet_gateway" "public" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.production.id
  display_name   = "internet-gateway"
  enabled        = true
}

# NAT Gateway for private subnets
resource "oci_core_nat_gateway" "private" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.production.id
  display_name   = "nat-gateway"
  block_traffic  = false
}

# Service Gateway for OCI services
resource "oci_core_service_gateway" "oci_services" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.production.id
  display_name   = "service-gateway"

  services {
    service_id = data.oci_core_services.all_services.services[0].id
  }
}

# Public subnet
resource "oci_core_subnet" "public" {
  compartment_id      = var.compartment_id
  vcn_id              = oci_core_vcn.production.id
  cidr_block          = "10.0.1.0/24"
  display_name        = "public-subnet"
  dns_label           = "public"
  route_table_id      = oci_core_route_table.public.id
  security_list_ids   = [oci_core_security_list.public.id]
  prohibit_public_ip_on_vnic = false
}

# Private subnet (application tier)
resource "oci_core_subnet" "private_app" {
  compartment_id      = var.compartment_id
  vcn_id              = oci_core_vcn.production.id
  cidr_block          = "10.0.10.0/24"
  display_name        = "private-app-subnet"
  dns_label           = "app"
  route_table_id      = oci_core_route_table.private.id
  security_list_ids   = [oci_core_security_list.private_app.id]
  prohibit_public_ip_on_vnic = true
}

# Private subnet (database tier)
resource "oci_core_subnet" "private_db" {
  compartment_id      = var.compartment_id
  vcn_id              = oci_core_vcn.production.id
  cidr_block          = "10.0.20.0/24"
  display_name        = "private-db-subnet"
  dns_label           = "db"
  route_table_id      = oci_core_route_table.private.id
  security_list_ids   = [oci_core_security_list.private_db.id]
  prohibit_public_ip_on_vnic = true
}

# Route tables
resource "oci_core_route_table" "public" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.production.id
  display_name   = "public-route-table"

  route_rules {
    network_entity_id = oci_core_internet_gateway.public.id
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
  }
}

resource "oci_core_route_table" "private" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.production.id
  display_name   = "private-route-table"

  route_rules {
    network_entity_id = oci_core_nat_gateway.private.id
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
  }

  route_rules {
    network_entity_id = oci_core_service_gateway.oci_services.id
    destination       = data.oci_core_services.all_services.services[0].cidr_block
    destination_type  = "SERVICE_CIDR_BLOCK"
  }
}
```

### Load Balancer

**Example: Public Load Balancer with Health Checks:**
```hcl
# load_balancer.tf
resource "oci_load_balancer_load_balancer" "public" {
  compartment_id = var.compartment_id
  display_name   = "public-load-balancer"
  shape          = "flexible"

  shape_details {
    minimum_bandwidth_in_mbps = 10
    maximum_bandwidth_in_mbps = 100
  }

  subnet_ids = [
    oci_core_subnet.public.id
  ]

  is_private = false

  freeform_tags = {
    Environment = var.environment
  }
}

# Backend set
resource "oci_load_balancer_backend_set" "app" {
  load_balancer_id = oci_load_balancer_load_balancer.public.id
  name             = "app-backend-set"
  policy           = "ROUND_ROBIN"

  health_checker {
    protocol          = "HTTP"
    port              = 8080
    url_path          = "/health"
    return_code       = 200
    interval_ms       = 10000
    timeout_in_millis = 3000
    retries           = 3
  }

  session_persistence_configuration {
    cookie_name = "APP_SESSION"
  }
}

# SSL certificate
resource "oci_load_balancer_certificate" "ssl_cert" {
  load_balancer_id = oci_load_balancer_load_balancer.public.id
  certificate_name = "ssl-certificate"

  ca_certificate     = file("${path.module}/certs/ca.crt")
  private_key        = file("${path.module}/certs/server.key")
  public_certificate = file("${path.module}/certs/server.crt")
}

# HTTPS listener
resource "oci_load_balancer_listener" "https" {
  load_balancer_id         = oci_load_balancer_load_balancer.public.id
  name                     = "https-listener"
  default_backend_set_name = oci_load_balancer_backend_set.app.name
  port                     = 443
  protocol                 = "HTTP"

  ssl_configuration {
    certificate_name        = oci_load_balancer_certificate.ssl_cert.certificate_name
    verify_peer_certificate = false
    protocols               = ["TLSv1.2", "TLSv1.3"]
  }

  connection_configuration {
    idle_timeout_in_seconds = 300
  }
}
```

## Container and Kubernetes Services

### Container Engine for Kubernetes (OKE)

**Example: Production OKE Cluster:**
```hcl
# oke_cluster.tf
resource "oci_containerengine_cluster" "app_cluster" {
  compartment_id     = var.compartment_id
  kubernetes_version = "v1.27.2"
  name               = "app-cluster-${var.environment}"
  vcn_id             = oci_core_vcn.production.id

  # Cluster endpoint configuration
  endpoint_config {
    is_public_ip_enabled = false
    subnet_id            = oci_core_subnet.kubernetes_api.id
    nsg_ids              = [oci_core_network_security_group.k8s_api.id]
  }

  # Options
  options {
    service_lb_subnet_ids = [oci_core_subnet.public.id]

    # Add-ons
    add_ons {
      is_kubernetes_dashboard_enabled = false
      is_tiller_enabled               = false
    }

    # Admission controllers
    admission_controller_options {
      is_pod_security_policy_enabled = true
    }

    # Kubernetes network config
    kubernetes_network_config {
      pods_cidr     = "10.244.0.0/16"
      services_cidr = "10.96.0.0/16"
    }

    # Persistent volume config
    persistent_volume_config {
      freeform_tags = {
        Environment = var.environment
      }
    }
  }

  freeform_tags = {
    Environment = var.environment
  }
}

# Node pool
resource "oci_containerengine_node_pool" "app_node_pool" {
  cluster_id         = oci_containerengine_cluster.app_cluster.id
  compartment_id     = var.compartment_id
  kubernetes_version = "v1.27.2"
  name               = "app-node-pool"
  node_shape         = "VM.Standard.E4.Flex"

  node_shape_config {
    ocpus         = 2
    memory_in_gbs = 16
  }

  # Multi-AD placement
  node_config_details {
    placement_configs {
      availability_domain = data.oci_identity_availability_domain.ad1.name
      subnet_id           = oci_core_subnet.kubernetes_workers.id

      fault_domains = [
        "FAULT-DOMAIN-1",
        "FAULT-DOMAIN-2",
        "FAULT-DOMAIN-3"
      ]
    }

    size = 3

    # Node pool options
    is_pv_encryption_in_transit_enabled = true

    # Freeform tags for nodes
    freeform_tags = {
      Environment = var.environment
      NodePool    = "app"
    }

    node_pool_pod_network_option_details {
      cni_type = "FLANNEL_OVERLAY"
    }
  }

  # Image
  node_source_details {
    image_id    = data.oci_containerengine_node_pool_option.oke_node_pool_option.sources[0].image_id
    source_type = "IMAGE"
  }

  # SSH access
  ssh_public_key = file("~/.ssh/id_rsa.pub")

  # Initial node labels
  initial_node_labels {
    key   = "environment"
    value = var.environment
  }
}
```

## Serverless Services

### Functions

**Example: OCI Function:**
```yaml
# func.yaml
schema_version: 20180708
name: process-image
version: 0.0.1
runtime: python
entrypoint: /python/bin/fdk /function/func.py handler
memory: 256
timeout: 120
```

```python
# func.py
import io
import json
import oci
from fdk import response

def handler(ctx, data: io.BytesIO = None):
    signer = oci.auth.signers.get_resource_principals_signer()
    object_storage = oci.object_storage.ObjectStorageClient(config={}, signer=signer)

    try:
        body = json.loads(data.getvalue())
        bucket_name = body.get("bucketName")
        object_name = body.get("objectName")

        # Process object
        namespace = object_storage.get_namespace().data
        obj = object_storage.get_object(namespace, bucket_name, object_name)

        # Your processing logic here
        result = process_data(obj.data.content)

        return response.Response(
            ctx,
            response_data=json.dumps({"status": "success", "result": result}),
            headers={"Content-Type": "application/json"}
        )
    except Exception as e:
        return response.Response(
            ctx,
            response_data=json.dumps({"status": "error", "message": str(e)}),
            headers={"Content-Type": "application/json"},
            status_code=500
        )

def process_data(content):
    # Your data processing logic
    return {"processed": True}
```

**Terraform Configuration:**
```hcl
# functions.tf
resource "oci_functions_application" "app" {
  compartment_id = var.compartment_id
  display_name   = "image-processing-app"
  subnet_ids     = [oci_core_subnet.private_app.id]

  config = {
    STORAGE_NAMESPACE = data.oci_objectstorage_namespace.ns.namespace
  }

  freeform_tags = {
    Environment = var.environment
  }
}

resource "oci_functions_function" "process_image" {
  application_id = oci_functions_application.app.id
  display_name   = "process-image"
  image          = "${var.ocir_region}.ocir.io/${data.oci_objectstorage_namespace.ns.namespace}/process-image:0.0.1"
  memory_in_mbs  = 256
  timeout_in_seconds = 120

  config = {
    BUCKET_NAME = oci_objectstorage_bucket.images.name
  }
}
```

## Identity and Security

### Identity and Access Management (IAM)

**Example: Compartment Structure and Policies:**
```hcl
# iam.tf
# Root compartment structure
resource "oci_identity_compartment" "production" {
  compartment_id = var.tenancy_ocid
  description    = "Production environment"
  name           = "production"
}

resource "oci_identity_compartment" "network" {
  compartment_id = oci_identity_compartment.production.id
  description    = "Network resources"
  name           = "network"
}

resource "oci_identity_compartment" "compute" {
  compartment_id = oci_identity_compartment.production.id
  description    = "Compute resources"
  name           = "compute"
}

# Dynamic group for instance principals
resource "oci_identity_dynamic_group" "app_instances" {
  compartment_id = var.tenancy_ocid
  description    = "Application instances"
  name           = "app-instances"
  matching_rule  = "ALL {instance.compartment.id = '${oci_identity_compartment.compute.id}'}"
}

# Policy for instance principals
resource "oci_identity_policy" "app_instances_policy" {
  compartment_id = oci_identity_compartment.production.id
  description    = "Policy for application instances"
  name           = "app-instances-policy"

  statements = [
    "Allow dynamic-group app-instances to manage objects in compartment production",
    "Allow dynamic-group app-instances to read secret-bundles in compartment production",
    "Allow dynamic-group app-instances to use metrics in compartment production"
  ]
}

# User group
resource "oci_identity_group" "developers" {
  compartment_id = var.tenancy_ocid
  description    = "Developer group"
  name           = "developers"
}

# Policy for developers
resource "oci_identity_policy" "developers_policy" {
  compartment_id = oci_identity_compartment.production.id
  description    = "Developer permissions"
  name           = "developers-policy"

  statements = [
    "Allow group developers to manage all-resources in compartment production where request.permission != 'COMPARTMENT_DELETE'",
    "Allow group developers to read audit-events in compartment production",
    "Allow group developers to use cloud-shell in tenancy"
  ]
}
```

### Vault and Key Management

**Example: Vault with Encryption Keys:**
```hcl
# vault.tf
resource "oci_kms_vault" "production_vault" {
  compartment_id = var.compartment_id
  display_name   = "production-vault"
  vault_type     = "DEFAULT"

  freeform_tags = {
    Environment = "production"
  }
}

# Master encryption key
resource "oci_kms_key" "database_encryption_key" {
  compartment_id = var.compartment_id
  display_name   = "database-encryption-key"

  key_shape {
    algorithm = "AES"
    length    = 32
  }

  management_endpoint = oci_kms_vault.production_vault.management_endpoint

  protection_mode = "HSM"  # Hardware Security Module
}

# Secret for database password
resource "oci_vault_secret" "db_password" {
  compartment_id = var.compartment_id
  secret_name    = "database-admin-password"
  vault_id       = oci_kms_vault.production_vault.id
  key_id         = oci_kms_key.database_encryption_key.id

  secret_content {
    content_type = "BASE64"
    content      = base64encode(var.db_admin_password)
  }
}
```

## Monitoring and Management

### Monitoring and Alarms

**Example: Monitoring and Alerting:**
```hcl
# monitoring.tf
# Alarm for high CPU
resource "oci_monitoring_alarm" "high_cpu" {
  compartment_id        = var.compartment_id
  display_name          = "high-cpu-alarm"
  is_enabled            = true
  metric_compartment_id = var.compartment_id
  namespace             = "oci_computeagent"
  query                 = "CpuUtilization[1m].mean() > 80"
  severity              = "CRITICAL"

  destinations = [oci_ons_notification_topic.alerts.id]

  repeat_notification_duration = "PT2H"

  body = "CPU utilization is above 80% for instances in production"

  freeform_tags = {
    Environment = "production"
  }
}

# Notification topic
resource "oci_ons_notification_topic" "alerts" {
  compartment_id = var.compartment_id
  name           = "production-alerts"
}

# Email subscription
resource "oci_ons_subscription" "email_alerts" {
  compartment_id = var.compartment_id
  endpoint       = "ops-team@example.com"
  protocol       = "EMAIL"
  topic_id       = oci_ons_notification_topic.alerts.id
}

# Slack webhook subscription
resource "oci_ons_subscription" "slack_alerts" {
  compartment_id = var.compartment_id
  endpoint       = var.slack_webhook_url
  protocol       = "HTTPS_CUSTOM"
  topic_id       = oci_ons_notification_topic.alerts.id
}
```

### Logging

**Example: Log Groups and Logs:**
```hcl
# logging.tf
resource "oci_logging_log_group" "application_logs" {
  compartment_id = var.compartment_id
  display_name   = "application-log-group"
}

# VCN flow logs
resource "oci_logging_log" "vcn_flow_logs" {
  display_name = "vcn-flow-logs"
  log_group_id = oci_logging_log_group.application_logs.id
  log_type     = "SERVICE"

  configuration {
    source {
      category    = "all"
      resource    = oci_core_vcn.production.id
      service     = "flowlogs"
      source_type = "OCISERVICE"
    }

    compartment_id = var.compartment_id
  }

  is_enabled         = true
  retention_duration = 30
}

# Load balancer access logs
resource "oci_logging_log" "lb_access_logs" {
  display_name = "lb-access-logs"
  log_group_id = oci_logging_log_group.application_logs.id
  log_type     = "SERVICE"

  configuration {
    source {
      category    = "access"
      resource    = oci_load_balancer_load_balancer.public.id
      service     = "loadbalancer"
      source_type = "OCISERVICE"
    }

    compartment_id = var.compartment_id
  }

  is_enabled         = true
  retention_duration = 30
}
```

## Common Patterns

### Pattern 1: Multi-Tier Web Application

```
┌─────────────────────────────────────────────────┐
│              Internet Gateway                    │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│         Public Subnet (Load Balancer)           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │   LB-1   │  │   LB-2   │  │  Bastion │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│      Private Subnet (Application Tier)          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  App-1   │  │  App-2   │  │  App-3   │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│       Private Subnet (Database Tier)            │
│         ┌───────────────────┐                   │
│         │ Autonomous DB     │                   │
│         │ (Multi-AD)        │                   │
│         └───────────────────┘                   │
└─────────────────────────────────────────────────┘
```

### Pattern 2: Disaster Recovery with Cross-Region Replication

```hcl
# Primary region (Phoenix)
provider "oci" {
  alias  = "phoenix"
  region = "us-phoenix-1"
}

# DR region (Ashburn)
provider "oci" {
  alias  = "ashburn"
  region = "us-ashburn-1"
}

# Primary Autonomous Database
resource "oci_database_autonomous_database" "primary" {
  provider = oci.phoenix
  # ... configuration

  is_data_guard_enabled = true
}

# Object Storage replication
resource "oci_objectstorage_replication_policy" "cross_region" {
  bucket            = oci_objectstorage_bucket.primary.name
  namespace         = data.oci_objectstorage_namespace.ns.namespace
  name              = "cross-region-replication"
  destination_bucket_name = oci_objectstorage_bucket.dr.name
  destination_region_name = "us-ashburn-1"
}
```

## Best Practices

### Compartment Design

1. **Hierarchical Structure:**
   - Root: Tenancy
   - Level 1: Environment (prod, staging, dev)
   - Level 2: Workload type (network, compute, database)
   - Level 3: Application or service

2. **Least Privilege:**
   - Use dynamic groups for instance principals
   - Separate compartments for different security zones
   - Regular policy reviews and audits

### High Availability

1. **Multi-AD Deployment:**
   - Distribute resources across all availability domains
   - Use fault domains within ADs
   - Regional subnets for automatic failover

2. **Backup and Recovery:**
   - Enable automatic backups for databases
   - Use volume groups for consistent snapshots
   - Test recovery procedures regularly

### Cost Optimization

1. **Right-Sizing:**
   - Use flexible shapes for variable workloads
   - Leverage auto-scaling
   - Monitor resource utilization

2. **Reserved Capacity:**
   - Purchase capacity reservations for steady workloads
   - Use burstable instances for development

3. **Storage Tiering:**
   - Move infrequently accessed data to lower tiers
   - Enable auto-tiering for Object Storage
   - Archive old backups

### Security

1. **Network Security:**
   - Use Network Security Groups (NSGs) instead of Security Lists
   - Implement micro-segmentation
   - Enable VCN flow logs

2. **Encryption:**
   - Enable encryption at rest for all data
   - Use customer-managed keys in Vault
   - Encrypt data in transit with TLS

3. **Identity Management:**
   - Enable MFA for all users
   - Use federation for SSO
   - Regular access reviews

## Anti-Patterns

❌ **Single AD deployment** - No fault tolerance
❌ **Overprovisioning** - Wasting capacity and cost
❌ **Using Security Lists only** - Less granular than NSGs
❌ **No tagging strategy** - Can't track costs or resources
❌ **Manual infrastructure** - Use Resource Manager (Terraform)
❌ **Ignoring backup policies** - Risk of data loss
❌ **Exposing databases publicly** - Security risk
❌ **No monitoring** - Can't detect issues proactively
❌ **Weak IAM policies** - Too permissive access
❌ **Ignoring service limits** - Plan for growth

## Related Resources

- [OCI Documentation](https://docs.oracle.com/en-us/iaas/Content/home.htm)
- [OCI Terraform Provider](https://registry.terraform.io/providers/oracle/oci/latest/docs)
- [OCI Architecture Center](https://docs.oracle.com/solutions/)
- [OCI CLI Reference](https://docs.oracle.com/en-us/iaas/tools/oci-cli/latest/oci_cli_docs/)

---

**Note:** This guide covers Oracle Cloud Infrastructure patterns and best practices. For multi-cloud strategies including OCI, see [multi-cloud-strategies.md](multi-cloud-strategies.md).
