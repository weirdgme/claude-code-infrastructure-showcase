# Cloud Security Tools

Cloud Security Posture Management (CSPM), Cloud Workload Protection Platforms (CWPP), container security, and native cloud security services.

## Table of Contents

- [Overview](#overview)
- [Trend Micro Cloud One](#trend-micro-cloud-one)
- [Prisma Cloud (Palo Alto)](#prisma-cloud-palo-alto)
- [Wiz](#wiz)
- [Aqua Security](#aqua-security)
- [AWS Security Hub](#aws-security-hub)
- [Microsoft Defender for Cloud](#microsoft-defender-for-cloud)
- [Google Cloud Security Command Center](#google-cloud-security-command-center)
- [Tool Comparison](#tool-comparison)
- [Integration Patterns](#integration-patterns)
- [Best Practices](#best-practices)

---

## Overview

**Cloud Security Tools** provide comprehensive security across cloud environments, including posture management, threat detection, compliance monitoring, and workload protection.

**Tool Categories:**

```
Security Tool Landscape:
┌─────────────────────────────────────────────────────┐
│ CSPM (Cloud Security Posture Management)            │
│ - Configuration scanning                            │
│ - Compliance monitoring (FedRAMP, CMMC, PCI-DSS)    │
│ - Misconfiguration detection                        │
│ - Policy enforcement                                │
├─────────────────────────────────────────────────────┤
│ CWPP (Cloud Workload Protection Platform)           │
│ - Runtime protection                                │
│ - Vulnerability scanning                            │
│ - Malware detection                                 │
│ - File integrity monitoring                         │
├─────────────────────────────────────────────────────┤
│ Container Security                                  │
│ - Image scanning                                    │
│ - Runtime security                                  │
│ - Kubernetes security                               │
│ - Registry scanning                                 │
├─────────────────────────────────────────────────────┤
│ Code Security (SAST/SCA)                            │
│ - Static analysis                                   │
│ - Dependency scanning                               │
│ - IaC security scanning                             │
│ - Secret detection                                  │
└─────────────────────────────────────────────────────┘
```

---

## Trend Micro Cloud One

**Trend Micro Cloud One** is a comprehensive cloud security platform with modular services for workload, container, network, file storage, and conformity (CSPM).

### Components

| Component | Purpose | Use Case |
|-----------|---------|----------|
| Workload Security | Server/VM protection | Runtime protection, anti-malware |
| Container Security | Container image scanning | CI/CD integration, registry scanning |
| Network Security | Virtual patching | IPS/IDS for cloud workloads |
| File Storage Security | Object storage scanning | S3/Blob malware scanning |
| Conformity | CSPM, compliance | FedRAMP, CMMC, CIS benchmarks |
| Application Security | Runtime RASP | Application-level protection |

### Conformity (CSPM) Setup

**1. AWS Integration:**

```bash
# Install Conformity CloudFormation template
aws cloudformation create-stack \
  --stack-name TrendMicroConformity \
  --template-url https://conformity-templates.s3.amazonaws.com/cloudformation/conformity-role.template \
  --parameters \
    ParameterKey=ExternalId,ParameterValue=YOUR_EXTERNAL_ID \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1

# Get Role ARN for Conformity console
aws cloudformation describe-stacks \
  --stack-name TrendMicroConformity \
  --query 'Stacks[0].Outputs[?OutputKey==`ConformityRoleArn`].OutputValue' \
  --output text
```

**2. Terraform Integration:**

```hcl
# Conformity IAM role
resource "aws_iam_role" "conformity_role" {
  name = "TrendMicroConformityRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::717210094962:root"
        }
        Action = "sts:AssumeRole"
        Condition = {
          StringEquals = {
            "sts:ExternalId" = var.conformity_external_id
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "conformity_readonly" {
  role       = aws_iam_role.conformity_role.name
  policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
}

# Additional permissions for deeper scanning
resource "aws_iam_role_policy" "conformity_additional" {
  name = "ConformityAdditionalPermissions"
  role = aws_iam_role.conformity_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "sns:Publish",
          "s3:GetBucketPublicAccessBlock",
          "s3:GetAccountPublicAccessBlock"
        ]
        Resource = "*"
      }
    ]
  })
}
```

**3. Conformity Rule Configuration:**

```yaml
# conformity-rules.yaml
# Custom rule profiles for compliance
---
rules:
  - id: S3-001
    name: "S3 bucket encryption enabled"
    severity: VERY_HIGH
    enabled: true
    compliance:
      - FedRAMP
      - CMMC-L2
      - NIST-800-171

  - id: IAM-045
    name: "IAM password policy meets requirements"
    severity: HIGH
    enabled: true
    settings:
      minimumPasswordLength: 14
      requireUppercase: true
      requireLowercase: true
      requireNumbers: true
      requireSymbols: true
      maxPasswordAge: 90

  - id: VPC-007
    name: "VPC flow logs enabled"
    severity: MEDIUM
    enabled: true
    compliance:
      - FedRAMP
      - PCI-DSS
```

**4. Container Security Integration:**

```yaml
# .gitlab-ci.yml integration
stages:
  - build
  - scan
  - deploy

container_scan:
  stage: scan
  image: trendmicro/smartcheck-scan-action:latest
  script:
    - |
      docker run --rm \
        -v /var/run/docker.sock:/var/run/docker.sock \
        trendmicro/tmas-scan:latest \
        --image-name ${CI_REGISTRY_IMAGE}:${CI_COMMIT_SHA} \
        --smartcheck-host ${SMARTCHECK_HOST} \
        --smartcheck-user ${SMARTCHECK_USER} \
        --smartcheck-password ${SMARTCHECK_PASSWORD} \
        --severity-threshold medium
```

---

## Prisma Cloud (Palo Alto)

**Prisma Cloud** is a comprehensive Cloud Native Application Protection Platform (CNAPP) providing CSPM, CWPP, and code security.

### Capabilities

```
Prisma Cloud Platform:
┌─────────────────────────────────────────────────────┐
│ Code Security (Bridgecrew)                          │
│ - IaC scanning (Terraform, CloudFormation, K8s)     │
│ - Secret detection in repos                         │
│ - VCS integration (GitHub, GitLab, Bitbucket)       │
├─────────────────────────────────────────────────────┤
│ CSPM (Posture Management)                           │
│ - Multi-cloud visibility (AWS, Azure, GCP, OCI)     │
│ - Compliance frameworks (40+)                       │
│ - Asset inventory                                   │
├─────────────────────────────────────────────────────┤
│ CWPP (Workload Protection)                          │
│ - Runtime defense                                   │
│ - Vulnerability management                          │
│ - Compliance scanning                               │
├─────────────────────────────────────────────────────┤
│ Container Security (Twistlock)                      │
│ - Image scanning                                    │
│ - Registry scanning                                 │
│ - Runtime protection                                │
│ - Kubernetes security                               │
└─────────────────────────────────────────────────────┘
```

### AWS Integration

**1. Onboarding AWS Account:**

```bash
# Create IAM role for Prisma Cloud
# Download CloudFormation template from Prisma Cloud console
aws cloudformation create-stack \
  --stack-name PrismaCloudRole \
  --template-url https://prisma-cloud-templates.s3.amazonaws.com/prisma-cloud-aws-iam-role.template \
  --parameters \
    ParameterKey=PrismaCloudRoleArn,ParameterValue=arn:aws:iam::188619942792:root \
    ParameterKey=ExternalId,ParameterValue=YOUR_EXTERNAL_ID \
  --capabilities CAPABILITY_NAMED_IAM
```

**2. Terraform for Prisma Cloud Integration:**

```hcl
# Prisma Cloud provider configuration
terraform {
  required_providers {
    prismacloud = {
      source  = "PaloAltoNetworks/prismacloud"
      version = "~> 1.4"
    }
  }
}

provider "prismacloud" {
  url      = var.prisma_api_url
  username = var.prisma_access_key
  password = var.prisma_secret_key
}

# Add cloud account to Prisma Cloud
resource "prismacloud_cloud_account" "aws_account" {
  aws {
    account_id    = "123456789012"
    enabled       = true
    group_ids     = [prismacloud_account_group.production.group_id]
    name          = "Production AWS Account"
    role_arn      = "arn:aws:iam::123456789012:role/PrismaCloudRole"
    account_type  = "account"
  }
}

# Create account group
resource "prismacloud_account_group" "production" {
  name        = "Production Accounts"
  description = "All production cloud accounts"
}

# Create alert rule
resource "prismacloud_alert_rule" "high_severity" {
  name        = "High Severity Violations"
  description = "Alert on high severity policy violations"
  enabled     = true

  policies = [
    prismacloud_policy.s3_encryption.policy_id,
    prismacloud_policy.public_s3.policy_id
  ]

  target {
    account_groups = [prismacloud_account_group.production.group_id]
  }

  notification_config {
    config_type = "email"
    recipients  = ["security@company.com"]
  }
}

# Custom policy
resource "prismacloud_policy" "s3_encryption" {
  name        = "S3 Bucket Encryption Mandatory"
  policy_type = "config"
  cloud_type  = "aws"
  severity    = "high"
  enabled     = true

  rule {
    name = "S3 encryption check"
    rule_type = "Config"

    criteria = "$.resource.aws_s3_bucket[*].server_side_encryption_configuration does not exist"

    parameters = {
      savedSearch = "false"
      withIac     = "true"
    }
  }

  compliance_metadata {
    compliance_id    = "fedramp-high"
    requirement_id   = "SC-28"
    requirement_name = "Protection of Information at Rest"
  }
}
```

**3. Kubernetes Runtime Protection:**

```yaml
# Deploy Prisma Cloud Defender as DaemonSet
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: twistlock-defender-ds
  namespace: twistlock
spec:
  selector:
    matchLabels:
      app: twistlock-defender
  template:
    metadata:
      labels:
        app: twistlock-defender
    spec:
      serviceAccountName: twistlock-service
      hostPID: true
      hostNetwork: true
      containers:
      - name: twistlock-defender
        image: registry.twistlock.com/twistlock/defender:defender_22_12_694
        env:
        - name: DEFENDER_TYPE
          value: "daemonset"
        - name: DEFENDER_LISTENER_TYPE
          value: "none"
        - name: CONSOLE_ADDR
          value: "https://console.prismacloud.io"
        - name: DEFENDER_CLUSTER_ID
          value: "production-cluster"
        securityContext:
          privileged: true
        volumeMounts:
        - name: docker-sock
          mountPath: /var/run/docker.sock
        - name: host-root
          mountPath: /host
      volumes:
      - name: docker-sock
        hostPath:
          path: /var/run/docker.sock
      - name: host-root
        hostPath:
          path: /
```

**4. CI/CD Integration:**

```yaml
# GitHub Actions integration
name: Prisma Cloud IaC Scan

on:
  pull_request:
    branches: [main]

jobs:
  prisma_cloud_iac_scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Prisma Cloud IaC Scan
        uses: bridgecrewio/checkov-action@master
        with:
          api-key: ${{ secrets.PRISMA_ACCESS_KEY }}::${{ secrets.PRISMA_SECRET_KEY }}
          directory: terraform/
          framework: terraform
          soft_fail: false
          output_format: cli,sarif
          output_file_path: console,results.sarif

      - name: Upload SARIF file
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: results.sarif
```

---

## Wiz

**Wiz** is a cloud security platform providing comprehensive visibility, risk prioritization, and threat detection across multi-cloud environments.

### Core Capabilities

```
Wiz Security Platform:
┌─────────────────────────────────────────────────────┐
│ Security Graph                                      │
│ - Full cloud environment mapping                    │
│ - Relationship visualization                        │
│ - Attack path analysis                              │
├─────────────────────────────────────────────────────┤
│ Risk Prioritization                                 │
│ - Critical path detection                           │
│ - Toxic combinations                                │
│ - Exploitability scoring                            │
├─────────────────────────────────────────────────────┤
│ Vulnerability Management                            │
│ - VM/container scanning                             │
│ - Serverless scanning                               │
│ - Prioritized remediation                           │
├─────────────────────────────────────────────────────┤
│ Data Security                                       │
│ - Sensitive data discovery                          │
│ - Data classification                               │
│ - Exposure analysis                                 │
└─────────────────────────────────────────────────────┘
```

### AWS Integration

**1. Connector Setup:**

```bash
# Deploy Wiz CloudFormation stack
# This creates a read-only role for Wiz scanner
aws cloudformation create-stack \
  --stack-name WizConnector \
  --template-url https://wiz-security-templates.s3.amazonaws.com/connector.yaml \
  --parameters \
    ParameterKey=WizExternalId,ParameterValue=YOUR_EXTERNAL_ID \
    ParameterKey=EnableCloudTrail,ParameterValue=true \
    ParameterKey=EnableVulnerabilityScanning,ParameterValue=true \
  --capabilities CAPABILITY_NAMED_IAM
```

**2. Terraform Wiz Connector:**

```hcl
# Wiz connector IAM role
resource "aws_iam_role" "wiz_connector" {
  name = "WizSecurityConnector"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::197171649850:root"
        }
        Action = "sts:AssumeRole"
        Condition = {
          StringEquals = {
            "sts:ExternalId" = var.wiz_external_id
          }
        }
      }
    ]
  })
}

# Wiz requires SecurityAudit + additional permissions
resource "aws_iam_role_policy_attachment" "wiz_security_audit" {
  role       = aws_iam_role.wiz_connector.name
  policy_arn = "arn:aws:iam::aws:policy/SecurityAudit"
}

resource "aws_iam_role_policy" "wiz_additional" {
  name = "WizAdditionalPermissions"
  role = aws_iam_role.wiz_connector.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "WizVulnerabilityScanning"
        Effect = "Allow"
        Action = [
          "ec2:DescribeImages",
          "ec2:DescribeSnapshots",
          "ec2:CreateSnapshots",
          "ec2:DeleteSnapshot",
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage"
        ]
        Resource = "*"
      },
      {
        Sid    = "WizDataScanning"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:ListBucket"
        ]
        Resource = [
          "arn:aws:s3:::*/*",
          "arn:aws:s3:::*"
        ]
      }
    ]
  })
}
```

**3. Wiz CLI Integration:**

```bash
# Install Wiz CLI
curl -o wizcli https://wizcli.app.wiz.io/wizcli
chmod +x wizcli

# Authenticate
export WIZ_CLIENT_ID="your-client-id"
export WIZ_CLIENT_SECRET="your-client-secret"

# Scan Docker image
./wizcli docker scan \
  --image myapp:latest \
  --policy "Production Policy" \
  --output-format json

# Scan IaC directory
./wizcli iac scan \
  --path ./terraform \
  --policy-id abcd1234 \
  --fail-on high
```

**4. API Integration for Automation:**

```python
# wiz_integration.py
import requests
import json

class WizAPI:
    def __init__(self, client_id, client_secret):
        self.api_url = "https://api.us1.app.wiz.io/graphql"
        self.token = self._authenticate(client_id, client_secret)

    def _authenticate(self, client_id, client_secret):
        auth_url = "https://auth.app.wiz.io/oauth/token"
        payload = {
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
            "audience": "wiz-api"
        }
        response = requests.post(auth_url, json=payload)
        return response.json()["access_token"]

    def query_issues(self, severity="CRITICAL"):
        query = """
        query IssuesTable($filterBy: IssueFilters) {
          issues(filterBy: $filterBy, first: 100) {
            nodes {
              id
              type
              severity
              status
              entitySnapshot {
                name
                type
              }
            }
          }
        }
        """
        variables = {
            "filterBy": {
                "severity": [severity],
                "status": ["OPEN"]
            }
        }

        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.post(
            self.api_url,
            json={"query": query, "variables": variables},
            headers=headers
        )
        return response.json()

# Usage
wiz = WizAPI(
    client_id="your-client-id",
    client_secret="your-client-secret"
)
critical_issues = wiz.query_issues(severity="CRITICAL")
print(json.dumps(critical_issues, indent=2))
```

---

## Aqua Security

**Aqua Security** provides comprehensive container and cloud-native security from development to runtime.

### Platform Components

| Component | Purpose |
|-----------|---------|
| Aqua Console | Central management, policy engine |
| Aqua Scanner | Image and registry scanning |
| Aqua Enforcer | Runtime protection for containers |
| Aqua Gateway | Communication hub |
| MicroEnforcer | Lightweight runtime protection |
| KubeEnforcer | Kubernetes admission controller |

### Kubernetes Deployment

**1. Deploy Aqua Platform:**

```yaml
# aqua-namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: aqua

---
# aqua-db.yaml (PostgreSQL for Aqua)
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: aqua-db
  namespace: aqua
spec:
  serviceName: aqua-db
  replicas: 1
  selector:
    matchLabels:
      app: aqua-db
  template:
    metadata:
      labels:
        app: aqua-db
    spec:
      containers:
      - name: postgres
        image: postgres:13
        env:
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: aqua-db
              key: password
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: postgres-data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 50Gi

---
# aqua-console.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aqua-console
  namespace: aqua
spec:
  replicas: 1
  selector:
    matchLabels:
      app: aqua-console
  template:
    metadata:
      labels:
        app: aqua-console
    spec:
      containers:
      - name: aqua-console
        image: registry.aquasec.com/console:2022.4
        env:
        - name: SCALOCK_DBUSER
          value: "postgres"
        - name: SCALOCK_DBPASSWORD
          valueFrom:
            secretKeyRef:
              name: aqua-db
              key: password
        - name: SCALOCK_DBNAME
          value: "scalock"
        - name: SCALOCK_DBHOST
          value: "aqua-db"
        - name: SCALOCK_AUDIT_DBUSER
          value: "postgres"
        - name: SCALOCK_AUDIT_DBPASSWORD
          valueFrom:
            secretKeyRef:
              name: aqua-db
              key: password
        - name: SCALOCK_AUDIT_DBNAME
          value: "slk_audit"
        - name: SCALOCK_AUDIT_DBHOST
          value: "aqua-db"
        ports:
        - containerPort: 8080
        - containerPort: 8443
```

**2. Aqua Enforcer DaemonSet:**

```yaml
# aqua-enforcer.yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: aqua-enforcer
  namespace: aqua
spec:
  selector:
    matchLabels:
      app: aqua-enforcer
  template:
    metadata:
      labels:
        app: aqua-enforcer
    spec:
      serviceAccountName: aqua-sa
      hostPID: true
      containers:
      - name: enforcer
        image: registry.aquasec.com/enforcer:2022.4
        env:
        - name: AQUA_TOKEN
          valueFrom:
            secretKeyRef:
              name: aqua-enforcer-token
              key: token
        - name: AQUA_SERVER
          value: "aqua-gateway:8443"
        - name: AQUA_LOGICAL_NAME
          value: "production-cluster"
        securityContext:
          privileged: true
        volumeMounts:
        - name: docker-sock
          mountPath: /var/run/docker.sock
        - name: containerd-sock
          mountPath: /run/containerd/containerd.sock
      volumes:
      - name: docker-sock
        hostPath:
          path: /var/run/docker.sock
      - name: containerd-sock
        hostPath:
          path: /run/containerd/containerd.sock
```

**3. KubeEnforcer (Admission Controller):**

```yaml
# aqua-kube-enforcer.yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: kube-enforcer-admission-hook
webhooks:
- name: imageassurance.aquasec.com
  clientConfig:
    service:
      namespace: aqua
      name: aqua-kube-enforcer
      path: /v1/imagechecks
    caBundle: LS0tLS1CRUdJTi... # Base64 encoded CA cert
  rules:
  - operations: ["CREATE", "UPDATE"]
    apiGroups: ["*"]
    apiVersions: ["*"]
    resources: ["pods"]
  failurePolicy: Fail
  sideEffects: None
  admissionReviewVersions: ["v1", "v1beta1"]

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aqua-kube-enforcer
  namespace: aqua
spec:
  replicas: 1
  selector:
    matchLabels:
      app: aqua-kube-enforcer
  template:
    metadata:
      labels:
        app: aqua-kube-enforcer
    spec:
      serviceAccountName: aqua-kube-enforcer-sa
      containers:
      - name: kube-enforcer
        image: registry.aquasec.com/kube-enforcer:2022.4
        env:
        - name: AQUA_TOKEN
          valueFrom:
            secretKeyRef:
              name: aqua-kube-enforcer-token
              key: token
        - name: AQUA_GATEWAY_URL
          value: "aqua-gateway:8443"
        ports:
        - containerPort: 8443
```

**4. CI/CD Scanner Integration:**

```yaml
# .gitlab-ci.yml
stages:
  - build
  - scan
  - deploy

aqua_scan:
  stage: scan
  image: registry.aquasec.com/scanner:2022.4
  script:
    - |
      docker run --rm \
        -v /var/run/docker.sock:/var/run/docker.sock \
        registry.aquasec.com/scanner:2022.4 \
        scan \
        --host $AQUA_SERVER \
        --user $AQUA_USERNAME \
        --password $AQUA_PASSWORD \
        --register \
        --local ${CI_REGISTRY_IMAGE}:${CI_COMMIT_SHA}
  only:
    - branches
```

---

## AWS Security Hub

**AWS Security Hub** provides a comprehensive view of security alerts and compliance status across AWS accounts.

### Setup and Configuration

**1. Enable Security Hub:**

```bash
# Enable Security Hub in all regions
for region in us-east-1 us-west-2 eu-west-1; do
  aws securityhub enable-security-hub \
    --region $region \
    --enable-default-standards
done

# Enable specific standards
aws securityhub batch-enable-standards \
  --standards-subscription-requests \
    '[{"StandardsArn":"arn:aws:securityhub:us-east-1::standards/aws-foundational-security-best-practices/v/1.0.0"}]' \
  --region us-east-1
```

**2. Terraform Configuration:**

```hcl
# Enable Security Hub
resource "aws_securityhub_account" "main" {}

# Enable CIS AWS Foundations Benchmark
resource "aws_securityhub_standards_subscription" "cis" {
  depends_on    = [aws_securityhub_account.main]
  standards_arn = "arn:aws:securityhub:::ruleset/cis-aws-foundations-benchmark/v/1.2.0"
}

# Enable AWS Foundational Security Best Practices
resource "aws_securityhub_standards_subscription" "aws_foundational" {
  depends_on    = [aws_securityhub_account.main]
  standards_arn = "arn:aws:securityhub:${data.aws_region.current.name}::standards/aws-foundational-security-best-practices/v/1.0.0"
}

# Enable PCI DSS
resource "aws_securityhub_standards_subscription" "pci_dss" {
  depends_on    = [aws_securityhub_account.main]
  standards_arn = "arn:aws:securityhub:${data.aws_region.current.name}::standards/pci-dss/v/3.2.1"
}

# Custom insights
resource "aws_securityhub_insight" "critical_findings" {
  filters {
    severity_label {
      comparison = "EQUALS"
      value      = "CRITICAL"
    }
    workflow_status {
      comparison = "EQUALS"
      value      = "NEW"
    }
  }

  group_by_attribute = "ResourceType"
  name               = "Critical Unresolved Findings by Resource Type"
}

# EventBridge rule for critical findings
resource "aws_cloudwatch_event_rule" "security_hub_findings" {
  name        = "security-hub-critical-findings"
  description = "Capture critical Security Hub findings"

  event_pattern = jsonencode({
    source      = ["aws.securityhub"]
    detail-type = ["Security Hub Findings - Imported"]
    detail = {
      findings = {
        Severity = {
          Label = ["CRITICAL", "HIGH"]
        }
        Workflow = {
          Status = ["NEW"]
        }
      }
    }
  })
}

resource "aws_cloudwatch_event_target" "sns" {
  rule      = aws_cloudwatch_event_rule.security_hub_findings.name
  target_id = "SendToSNS"
  arn       = aws_sns_topic.security_alerts.arn
}
```

**3. Custom Actions:**

```python
# security_hub_automation.py
import boto3
import json

securityhub = boto3.client('securityhub')

def remediate_public_s3_bucket(finding):
    """Auto-remediate public S3 buckets"""
    s3 = boto3.client('s3')
    bucket_name = finding['Resources'][0]['Id'].split(':')[-1]

    # Block public access
    s3.put_public_access_block(
        Bucket=bucket_name,
        PublicAccessBlockConfiguration={
            'BlockPublicAcls': True,
            'IgnorePublicAcls': True,
            'BlockPublicPolicy': True,
            'RestrictPublicBuckets': True
        }
    )

    # Update finding status
    securityhub.batch_update_findings(
        FindingIdentifiers=[{
            'Id': finding['Id'],
            'ProductArn': finding['ProductArn']
        }],
        Workflow={'Status': 'RESOLVED'},
        Note={
            'Text': 'Auto-remediated: Blocked public access',
            'UpdatedBy': 'AutoRemediation'
        }
    )

# Lambda handler
def lambda_handler(event, context):
    finding = event['detail']['findings'][0]

    if 'S3.1' in finding['Title']:  # S3 bucket public read
        remediate_public_s3_bucket(finding)

    return {'statusCode': 200}
```

---

## Microsoft Defender for Cloud

**Microsoft Defender for Cloud** (formerly Azure Security Center + Azure Defender) provides unified security management and threat protection.

### Components

| Component | Purpose |
|-----------|---------|
| Defender for Servers | VM protection, JIT access |
| Defender for Containers | AKS, ACR security |
| Defender for Storage | Blob/File protection |
| Defender for SQL | Database security |
| Defender for Key Vault | Secret protection |
| Defender CSPM | Posture management |

### Setup

**1. Enable Defender for Cloud:**

```bash
# Enable Defender for Cloud (Standard tier)
az security pricing create \
  --name VirtualMachines \
  --tier Standard

az security pricing create \
  --name Containers \
  --tier Standard

az security pricing create \
  --name StorageAccounts \
  --tier Standard

# Enable auto-provisioning
az security auto-provisioning-setting update \
  --auto-provision On \
  --name default
```

**2. Terraform Configuration:**

```hcl
# Enable Defender for Cloud plans
resource "azurerm_security_center_subscription_pricing" "vm" {
  tier          = "Standard"
  resource_type = "VirtualMachines"
}

resource "azurerm_security_center_subscription_pricing" "containers" {
  tier          = "Standard"
  resource_type = "Containers"
}

resource "azurerm_security_center_subscription_pricing" "storage" {
  tier          = "Standard"
  resource_type = "StorageAccounts"
}

# Enable auto-provisioning of Log Analytics agent
resource "azurerm_security_center_auto_provisioning" "auto_provisioning" {
  auto_provision = "On"
}

# Configure Log Analytics workspace
resource "azurerm_security_center_workspace" "workspace" {
  scope        = "/subscriptions/${data.azurerm_subscription.current.subscription_id}"
  workspace_id = azurerm_log_analytics_workspace.security.id
}

# Security contacts
resource "azurerm_security_center_contact" "contact" {
  email               = "security@company.com"
  phone               = "+1-555-0100"
  alert_notifications = true
  alerts_to_admins    = true
}

# Regulatory compliance assessments
resource "azurerm_security_center_assessment" "fedramp_high" {
  assessment_policy_id = "/providers/Microsoft.Authorization/policyDefinitions/fedramp-high"
  target_resource_id   = data.azurerm_subscription.current.id
}

# Just-In-Time VM Access
resource "azurerm_security_center_jit_network_access_policy" "jit_policy" {
  name                = "jit-policy-vm"
  kind                = "Basic"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  virtual_machine {
    virtual_machine_id = azurerm_linux_virtual_machine.vm.id

    port {
      number                     = 22
      protocol                   = "TCP"
      allowed_source_address_prefix = ["10.0.0.0/8"]
      max_request_access_duration = "PT3H"
    }

    port {
      number                     = 3389
      protocol                   = "TCP"
      allowed_source_address_prefix = ["10.0.0.0/8"]
      max_request_access_duration = "PT3H"
    }
  }
}
```

**3. Azure Policy Integration:**

```bash
# Assign built-in initiatives for compliance
az policy assignment create \
  --name 'fedramp-high' \
  --display-name 'FedRAMP High Compliance' \
  --policy-set-definition '/providers/Microsoft.Authorization/policySetDefinitions/fedramp-high' \
  --scope "/subscriptions/${SUBSCRIPTION_ID}"

# Custom policy for tagging enforcement
az policy definition create \
  --name 'require-classification-tag' \
  --display-name 'Require Classification Tag' \
  --mode Indexed \
  --rules '{
    "if": {
      "field": "tags[Classification]",
      "exists": "false"
    },
    "then": {
      "effect": "deny"
    }
  }'
```

---

## Google Cloud Security Command Center

**Google Cloud Security Command Center (SCC)** provides centralized visibility and control over GCP security.

### Tiers

| Tier | Features |
|------|----------|
| Standard (Free) | Asset discovery, vulnerability scanning, basic findings |
| Premium | Advanced threat detection, compliance monitoring, Event Threat Detection, Container Threat Detection |

### Setup

**1. Enable SCC:**

```bash
# Enable SCC API
gcloud services enable securitycenter.googleapis.com

# Enable SCC Premium
gcloud scc settings update \
  --organization=123456789 \
  --tier=PREMIUM

# Enable built-in services
gcloud scc settings services enable \
  --organization=123456789 \
  --service=CONTAINER_THREAT_DETECTION

gcloud scc settings services enable \
  --organization=123456789 \
  --service=EVENT_THREAT_DETECTION

gcloud scc settings services enable \
  --organization=123456789 \
  --service=SECURITY_HEALTH_ANALYTICS
```

**2. Terraform Configuration:**

```hcl
# Enable SCC
resource "google_scc_organization_settings" "scc_settings" {
  organization = "123456789"

  asset_discovery_config {
    project_ids = ["project-1", "project-2"]
    inclusion_mode = "INCLUDE_ONLY"
  }
}

# Create notification config
resource "google_scc_notification_config" "scc_notification" {
  config_id    = "critical-findings"
  organization = "123456789"
  description  = "Notify on critical findings"
  pubsub_topic = google_pubsub_topic.scc_notifications.id

  streaming_config {
    filter = "severity=\"CRITICAL\" AND state=\"ACTIVE\""
  }
}

resource "google_pubsub_topic" "scc_notifications" {
  name = "scc-critical-findings"
}

# Custom security marks
resource "google_scc_source" "custom_source" {
  display_name = "Custom Security Scanner"
  organization = "123456789"
  description  = "Custom vulnerability scanner"
}
```

**3. Findings API Integration:**

```python
# scc_findings.py
from google.cloud import securitycenter

def list_all_findings(organization_id):
    """List all active findings"""
    client = securitycenter.SecurityCenterClient()
    org_name = f"organizations/{organization_id}/sources/-"

    # List findings
    findings = client.list_findings(
        request={
            "parent": org_name,
            "filter": 'state="ACTIVE" AND severity="CRITICAL"'
        }
    )

    for finding in findings:
        print(f"Finding: {finding.finding.name}")
        print(f"  Category: {finding.finding.category}")
        print(f"  Resource: {finding.finding.resource_name}")
        print(f"  Severity: {finding.finding.severity}")
        print(f"  State: {finding.finding.state}")

def create_finding(organization_id, source_id, finding_id):
    """Create a custom finding"""
    client = securitycenter.SecurityCenterClient()
    source_name = f"organizations/{organization_id}/sources/{source_id}"

    finding = {
        "state": securitycenter.Finding.State.ACTIVE,
        "resource_name": f"//cloudresourcemanager.googleapis.com/organizations/{organization_id}",
        "category": "CUSTOM_VULNERABILITY",
        "severity": securitycenter.Finding.Severity.HIGH,
        "event_time": {"seconds": int(time.time())},
        "finding_class": securitycenter.Finding.FindingClass.VULNERABILITY,
    }

    created_finding = client.create_finding(
        request={
            "parent": source_name,
            "finding_id": finding_id,
            "finding": finding
        }
    )

    return created_finding

# Usage
list_all_findings("123456789")
```

---

## Tool Comparison

### Feature Matrix

| Feature | Trend Micro | Prisma Cloud | Wiz | Aqua | AWS Hub | Azure Defender | GCP SCC |
|---------|-------------|--------------|-----|------|---------|----------------|---------|
| **Multi-Cloud** | ✅ | ✅ | ✅ | ✅ | AWS only | Azure only | GCP only |
| **CSPM** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Container Security** | ✅ | ✅ | ✅ | ✅ | Limited | ✅ | ✅ |
| **Runtime Protection** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | Limited |
| **IaC Scanning** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| **Kubernetes** | ✅ | ✅ | ✅ | ✅ | Limited | ✅ | ✅ |
| **Compliance** | 40+ | 40+ | 35+ | 30+ | 3 | 25+ | 15+ |
| **Agentless** | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| **On-Prem** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |

### Cost Comparison (Approximate)

| Tool | Pricing Model | Est. Cost (100 workloads) |
|------|--------------|---------------------------|
| Trend Micro Cloud One | Per workload | $5-10/workload/month |
| Prisma Cloud | Per credit/resource | $15K-30K/year |
| Wiz | Per workload | $8-15/workload/month |
| Aqua Security | Per node | $10-20/node/month |
| AWS Security Hub | Per check | $0.0010/check (~$100-500/month) |
| Microsoft Defender | Per resource | $15/server/month, $7/storage/month |
| GCP SCC Premium | Flat + usage | $2,500/month + usage |

---

## Integration Patterns

### 1. Multi-Tool Strategy

```
Layered Security Approach:
┌─────────────────────────────────────────────────────┐
│ Development Phase                                   │
│ - Prisma Cloud (IaC scanning)                       │
│ - Aqua (Container scanning in CI/CD)                │
└───────────────┬─────────────────────────────────────┘
                ↓
┌───────────────┴─────────────────────────────────────┐
│ Deployment Phase                                    │
│ - Wiz (Pre-deployment validation)                   │
│ - Native cloud tools (Security Hub/Defender/SCC)    │
└───────────────┬─────────────────────────────────────┘
                ↓
┌───────────────┴─────────────────────────────────────┐
│ Runtime Phase                                       │
│ - Trend Micro (Workload protection)                 │
│ - Aqua (Container runtime security)                 │
│ - Wiz (Continuous threat detection)                 │
└─────────────────────────────────────────────────────┘
```

### 2. Centralized Findings Aggregation

```python
# aggregate_findings.py
"""Aggregate findings from multiple security tools"""
import boto3
import requests
from google.cloud import securitycenter

class SecurityAggregator:
    def __init__(self):
        self.findings = []

    def get_aws_findings(self):
        """Get findings from AWS Security Hub"""
        securityhub = boto3.client('securityhub')
        response = securityhub.get_findings(
            Filters={
                'SeverityLabel': [{'Value': 'CRITICAL', 'Comparison': 'EQUALS'}],
                'WorkflowStatus': [{'Value': 'NEW', 'Comparison': 'EQUALS'}]
            }
        )
        return response['Findings']

    def get_prisma_findings(self, api_url, token):
        """Get findings from Prisma Cloud"""
        headers = {'Authorization': f'Bearer {token}'}
        response = requests.get(
            f"{api_url}/api/v1/alerts",
            headers=headers,
            params={'severity': 'high', 'status': 'open'}
        )
        return response.json()

    def get_wiz_findings(self, client_id, secret):
        """Get findings from Wiz"""
        # Implementation similar to earlier Wiz API example
        pass

    def normalize_findings(self, findings, source):
        """Normalize findings to common format"""
        normalized = []
        for finding in findings:
            normalized.append({
                'source': source,
                'severity': self._normalize_severity(finding, source),
                'resource': self._extract_resource(finding, source),
                'description': self._extract_description(finding, source),
                'compliance': self._extract_compliance(finding, source)
            })
        return normalized

    def aggregate_all(self):
        """Aggregate from all sources"""
        self.findings.extend(
            self.normalize_findings(self.get_aws_findings(), 'AWS Security Hub')
        )
        # Add other sources...
        return self.findings

# Usage
aggregator = SecurityAggregator()
all_findings = aggregator.aggregate_all()
```

---

## Best Practices

### 1. Tool Selection

**Decision Matrix:**

| Requirement | Recommended Tool(s) |
|-------------|---------------------|
| AWS-only environment | AWS Security Hub + Prisma Cloud |
| Azure-only | Microsoft Defender for Cloud |
| GCP-only | GCP SCC Premium + Wiz |
| Multi-cloud | Prisma Cloud or Wiz |
| Container-heavy | Aqua Security or Prisma Cloud |
| Air-gapped | Trend Micro (on-prem) or Aqua |
| Budget-conscious | Native tools (Security Hub, Defender, SCC) |
| Comprehensive | Prisma Cloud or Wiz |

### 2. Alert Fatigue Reduction

```yaml
# Prioritization strategy
alert_tiers:
  tier_1_critical:
    - Public exposure of sensitive data
    - Active exploitation detected
    - Privilege escalation
    - Crypto mining
    action: Immediate notification + auto-remediation

  tier_2_high:
    - Critical vulnerabilities
    - Compliance violations
    - Misconfigured security groups
    action: Next-business-day review

  tier_3_medium:
    - Best practice violations
    - Outdated software
    action: Weekly review

  tier_4_low:
    - Informational findings
    action: Monthly review + reports
```

### 3. Compliance Mapping

```bash
# Tag resources for compliance tracking
# All CSPM tools can filter by tags

# Terraform example
resource "aws_instance" "web" {
  ami           = "ami-12345"
  instance_type = "t3.medium"

  tags = {
    Classification = "CUI"
    Compliance     = "FedRAMP-High,CMMC-L2,NIST-800-171"
    DataOwner      = "security@agency.gov"
    Environment    = "Production"
    CostCenter     = "12345"
  }
}
```

### 4. Continuous Monitoring

```python
# monitoring_automation.py
"""Continuous compliance monitoring"""
import schedule
import time

def daily_compliance_check():
    """Run daily compliance scans"""
    # Check all tools
    check_prisma_compliance()
    check_wiz_compliance()
    check_native_tools()

    # Generate report
    generate_compliance_report()

def weekly_vulnerability_scan():
    """Weekly vulnerability assessment"""
    scan_with_aqua()
    scan_with_trend_micro()
    correlate_findings()

def monthly_compliance_report():
    """Monthly executive report"""
    aggregate_findings()
    calculate_risk_score()
    send_executive_summary()

# Schedule jobs
schedule.every().day.at("02:00").do(daily_compliance_check)
schedule.every().monday.at("03:00").do(weekly_vulnerability_scan)
schedule.every().month.at("05:00").do(monthly_compliance_report)

while True:
    schedule.run_pending()
    time.sleep(3600)  # Check every hour
```

---

**Related Resources:**
- [cloud-security.md](cloud-security.md) - IAM, encryption, compliance
- [cleared-cloud-environments.md](cleared-cloud-environments.md) - Government cloud security
- [devsecops/cspm-integration.md](../devsecops/resources/cspm-integration.md) - CI/CD integration
- [devsecops/compliance-frameworks.md](../devsecops/resources/compliance-frameworks.md) - Compliance requirements
