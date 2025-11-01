# CSPM Integration

Cloud Security Posture Management (CSPM) tool integration into CI/CD pipelines for continuous security validation and compliance enforcement.

## Table of Contents

- [Overview](#overview)
- [Pipeline Integration Patterns](#pipeline-integration-patterns)
- [Tool-Specific Integration](#tool-specific-integration)
- [Policy as Code](#policy-as-code)
- [Shift-Left Security](#shift-left-security)
- [Continuous Compliance](#continuous-compliance)
- [Remediation Workflows](#remediation-workflows)
- [Best Practices](#best-practices)

---

## Overview

**CSPM Integration** enables security and compliance checks throughout the development lifecycle, catching misconfigurations before deployment.

**Integration Points:**

```
CI/CD Pipeline with CSPM:
┌─────────────────────────────────────────────────────┐
│ DEVELOPMENT                                         │
│  ┌──────────────┐                                   │
│  │ IDE Plugins  │ → Pre-commit hooks                │
│  │ - Checkov    │   (local scanning)                │
│  │ - tfsec      │                                   │
│  └──────────────┘                                   │
├─────────────────────────────────────────────────────┤
│ SOURCE CONTROL                                      │
│  ┌──────────────┐                                   │
│  │ Git Push     │ → PR/MR scan                      │
│  │              │   (automated checks)              │
│  └──────────────┘                                   │
├─────────────────────────────────────────────────────┤
│ CI/CD PIPELINE                                      │
│  ┌──────────────┐   ┌──────────────┐               │
│  │ Build        │ → │ CSPM Scan    │               │
│  │              │   │ - IaC scan   │               │
│  │              │   │ - Image scan │               │
│  └──────────────┘   └──────────────┘               │
│                            ↓                        │
│                     ┌──────────────┐                │
│                     │ Gate Check   │                │
│                     │ Pass/Fail    │                │
│                     └──────────────┘                │
├─────────────────────────────────────────────────────┤
│ RUNTIME                                             │
│  ┌──────────────┐                                   │
│  │ Continuous   │ → Runtime scanning                │
│  │ Monitoring   │   (drift detection)               │
│  └──────────────┘                                   │
└─────────────────────────────────────────────────────┘
```

---

## Pipeline Integration Patterns

### GitHub Actions Integration

**1. Prisma Cloud (Checkov)**

```yaml
# .github/workflows/prisma-scan.yml
name: Prisma Cloud IaC Scan

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  prisma_cloud_scan:
    runs-on: ubuntu-latest
    name: Prisma Cloud IaC Scan

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run Prisma Cloud IaC Scan
        uses: bridgecrewio/checkov-action@master
        with:
          # Prisma Cloud API credentials
          api-key: ${{ secrets.PRISMA_ACCESS_KEY }}::${{ secrets.PRISMA_SECRET_KEY }}

          # Scan directories
          directory: terraform/
          framework: terraform,kubernetes,dockerfile

          # Fail pipeline on findings
          soft_fail: false

          # Skip specific checks
          skip_check: CKV_AWS_18,CKV_AWS_19

          # Output formats
          output_format: cli,sarif,junitxml
          output_file_path: console,results.sarif,results.xml

          # Compliance frameworks
          check: CKV_AWS_*,CKV_K8S_*

      - name: Upload SARIF file
        if: always()
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: results.sarif

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: prisma-scan-results
          path: results.xml

      - name: Comment PR with results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const results = fs.readFileSync('results.xml', 'utf8');
            // Parse and format results
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Prisma Cloud Scan Results\n\n${results}`
            });
```

**2. Wiz CLI Integration**

```yaml
# .github/workflows/wiz-scan.yml
name: Wiz IaC Security Scan

on:
  pull_request:
  push:
    branches: [main]

jobs:
  wiz_scan:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Download Wiz CLI
        run: |
          curl -o wizcli https://wizcli.app.wiz.io/wizcli
          chmod +x wizcli

      - name: Authenticate Wiz
        env:
          WIZ_CLIENT_ID: ${{ secrets.WIZ_CLIENT_ID }}
          WIZ_CLIENT_SECRET: ${{ secrets.WIZ_CLIENT_SECRET }}
        run: |
          ./wizcli auth

      - name: Scan IaC
        run: |
          ./wizcli iac scan \
            --path ./terraform \
            --policy-id ${{ secrets.WIZ_POLICY_ID }} \
            --output-format json \
            --output-file wiz-results.json \
            --fail-on high

      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: wiz-scan-results
          path: wiz-results.json

      - name: Scan Docker images
        run: |
          docker build -t myapp:${{ github.sha }} .
          ./wizcli docker scan \
            --image myapp:${{ github.sha }} \
            --policy "Production Policy" \
            --fail-on high
```

**3. Trend Micro Cloud One**

```yaml
# .github/workflows/trend-micro-scan.yml
name: Trend Micro Container Scan

on:
  push:
    branches: [main, develop]

jobs:
  container_scan:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Build Docker image
        run: |
          docker build -t ${{ github.repository }}:${{ github.sha }} .

      - name: Scan with Trend Micro
        uses: deep-security/smartcheck-scan-action@v3
        with:
          dssc-image-name: ${{ github.repository }}:${{ github.sha }}
          dssc-host: ${{ secrets.DSSC_HOST }}
          dssc-username: ${{ secrets.DSSC_USERNAME }}
          dssc-password: ${{ secrets.DSSC_PASSWORD }}
          dssc-insecure-skip-tls-verify: false
          dssc-min-severity: medium
```

### GitLab CI Integration

```yaml
# .gitlab-ci.yml
stages:
  - build
  - security_scan
  - deploy

variables:
  IMAGE_NAME: ${CI_REGISTRY_IMAGE}:${CI_COMMIT_SHA}

build:
  stage: build
  script:
    - docker build -t ${IMAGE_NAME} .
    - docker push ${IMAGE_NAME}

# Prisma Cloud scan
prisma_iac_scan:
  stage: security_scan
  image: bridgecrew/checkov:latest
  script:
    - |
      checkov \
        --directory terraform/ \
        --framework terraform \
        --output cli \
        --output junitxml \
        --output-file-path console,prisma-results.xml \
        --prisma-api-url https://api.prismacloud.io \
        --bc-api-key ${PRISMA_ACCESS_KEY}::${PRISMA_SECRET_KEY} \
        --repo-id ${CI_PROJECT_PATH} \
        --branch ${CI_COMMIT_REF_NAME}
  artifacts:
    reports:
      junit: prisma-results.xml
    paths:
      - prisma-results.xml
    expire_in: 30 days
  allow_failure: false

# Aqua Security scan
aqua_image_scan:
  stage: security_scan
  image: aquasec/aqua-scanner:latest
  script:
    - |
      docker run --rm \
        -v /var/run/docker.sock:/var/run/docker.sock \
        aquasec/aqua-scanner:latest \
        scan \
        --host ${AQUA_SERVER} \
        --user ${AQUA_USERNAME} \
        --password ${AQUA_PASSWORD} \
        --local ${IMAGE_NAME} \
        --register \
        --show-negligible
  allow_failure: false

# Native GitLab SAST
sast:
  stage: security_scan
  include:
    - template: Security/SAST.gitlab-ci.yml
```

### Jenkins Pipeline

```groovy
// Jenkinsfile
pipeline {
    agent any

    environment {
        PRISMA_API_KEY = credentials('prisma-api-key')
        WIZ_CLIENT_ID = credentials('wiz-client-id')
        WIZ_CLIENT_SECRET = credentials('wiz-client-secret')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('IaC Security Scan - Prisma Cloud') {
            steps {
                script {
                    docker.image('bridgecrew/checkov:latest').inside {
                        sh '''
                            checkov \
                                --directory terraform/ \
                                --framework terraform,kubernetes \
                                --output cli \
                                --output junitxml \
                                --output-file-path console,results.xml \
                                --bc-api-key ${PRISMA_API_KEY} \
                                --repo-id ${JOB_NAME} \
                                --branch ${GIT_BRANCH}
                        '''
                    }
                }
            }
            post {
                always {
                    junit 'results.xml'
                }
            }
        }

        stage('Container Security Scan - Aqua') {
            steps {
                script {
                    sh '''
                        docker run --rm \
                            -v /var/run/docker.sock:/var/run/docker.sock \
                            aquasec/aqua-scanner:latest \
                            scan \
                            --host ${AQUA_SERVER} \
                            --user ${AQUA_USERNAME} \
                            --password ${AQUA_PASSWORD} \
                            --local myapp:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Policy Gate Check') {
            steps {
                script {
                    // Parse scan results
                    def scanResults = readJSON file: 'results.json'
                    def criticalCount = scanResults.summary.critical
                    def highCount = scanResults.summary.high

                    // Fail if critical or high severity findings
                    if (criticalCount > 0 || highCount > 5) {
                        error("Security scan failed: ${criticalCount} critical, ${highCount} high severity findings")
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // Deployment steps
            }
        }
    }

    post {
        always {
            // Send notifications
            emailext(
                subject: "Security Scan Results - ${JOB_NAME} #${BUILD_NUMBER}",
                body: "Security scan completed. Check Jenkins for details.",
                to: "security@company.com"
            )
        }
    }
}
```

---

## Tool-Specific Integration

### Prisma Cloud (Checkov) Configuration

**1. Custom Policy Configuration**

```yaml
# .checkov.yml
# Prisma Cloud / Checkov configuration

branch: main
skip-path:
  - tests/
  - .terraform/
  - node_modules/

skip-check:
  # Skip specific checks that don't apply
  - CKV_AWS_18  # EBS encryption (not applicable to public AMIs)
  - CKV_K8S_8   # Liveness probe (not applicable to jobs)

framework:
  - terraform
  - kubernetes
  - dockerfile
  - helm
  - cloudformation

output: cli,junitxml,sarif

# Soft fail mode (for initial rollout)
soft-fail: false

# External checks directory
external-checks-dir:
  - custom-policies/

# Compact output
compact: true

# Prisma Cloud integration
prisma-api-url: https://api.prismacloud.io
repo-id: myorg/myrepo
```

**2. Custom Policies**

```python
# custom-policies/check_mandatory_tags.py
from checkov.common.models.enums import CheckResult, CheckCategories
from checkov.terraform.checks.resource.base_resource_check import BaseResourceCheck

class MandatoryTags(BaseResourceCheck):
    def __init__(self):
        name = "Ensure all resources have mandatory tags"
        id = "CKV_CUSTOM_1"
        supported_resources = ['*']
        categories = [CheckCategories.CONVENTION]
        super().__init__(name=name, id=id, categories=categories, supported_resources=supported_resources)

    def scan_resource_conf(self, conf):
        """
        Looks for mandatory tags on all resources
        :param conf: resource configuration
        :return: CheckResult
        """
        required_tags = ['Environment', 'Owner', 'CostCenter', 'DataClassification']

        if 'tags' in conf:
            tags = conf['tags'][0] if isinstance(conf['tags'], list) else conf['tags']
            missing_tags = [tag for tag in required_tags if tag not in tags]

            if not missing_tags:
                return CheckResult.PASSED
            else:
                self.details.append(f"Missing required tags: {', '.join(missing_tags)}")
                return CheckResult.FAILED

        self.details.append(f"No tags defined. Required tags: {', '.join(required_tags)}")
        return CheckResult.FAILED

check = MandatoryTags()
```

### Wiz Integration

**1. Wiz Policy as Code**

```yaml
# wiz-policies/fedramp-policy.yaml
name: "FedRAMP Moderate Compliance"
description: "Enforces FedRAMP Moderate controls for IaC"
severity: HIGH

rules:
  - id: encryption-at-rest
    description: "All storage must be encrypted at rest"
    resource_types:
      - aws_s3_bucket
      - aws_ebs_volume
      - aws_rds_instance
    check: |
      resource.encryption.enabled == true

  - id: public-access-blocked
    description: "No public access to resources containing sensitive data"
    resource_types:
      - aws_s3_bucket
    check: |
      resource.public_access_block.block_public_acls == true &&
      resource.public_access_block.block_public_policy == true &&
      resource.public_access_block.ignore_public_acls == true &&
      resource.public_access_block.restrict_public_buckets == true

  - id: logging-enabled
    description: "Audit logging must be enabled"
    resource_types:
      - aws_s3_bucket
      - aws_cloudtrail
      - aws_vpc
    check: |
      resource.logging.enabled == true

compliance_mappings:
  - framework: FedRAMP
    controls:
      - SC-28  # encryption-at-rest
      - AC-3   # public-access-blocked
      - AU-2   # logging-enabled
```

**2. Wiz API Integration Script**

```python
# wiz_cicd_integration.py
"""Integrate Wiz scanning into CI/CD pipelines"""

import requests
import sys
import json

class WizCICD:
    def __init__(self, client_id, client_secret, api_url="https://api.us1.app.wiz.io"):
        self.api_url = api_url
        self.token = self._authenticate(client_id, client_secret)

    def _authenticate(self, client_id, client_secret):
        """Authenticate with Wiz"""
        auth_url = f"{self.api_url}/oauth/token"
        payload = {
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
            "audience": "wiz-api"
        }
        response = requests.post(auth_url, json=payload)
        return response.json()["access_token"]

    def scan_iac(self, directory, policy_id):
        """Scan IaC directory"""
        headers = {"Authorization": f"Bearer {self.token}"}

        mutation = """
        mutation ScanIaC($input: IaCScanInput!) {
          scanIaC(input: $input) {
            scanId
            findings {
              id
              severity
              title
              description
              resourceType
              resourceName
            }
          }
        }
        """

        variables = {
            "input": {
                "directory": directory,
                "policyId": policy_id
            }
        }

        response = requests.post(
            f"{self.api_url}/graphql",
            json={"query": mutation, "variables": variables},
            headers=headers
        )

        return response.json()

    def check_scan_results(self, scan_results, fail_on="high"):
        """Check if scan should fail the pipeline"""
        severity_levels = ["critical", "high", "medium", "low"]
        fail_index = severity_levels.index(fail_on.lower())

        findings_by_severity = {}
        for finding in scan_results.get("data", {}).get("scanIaC", {}).get("findings", []):
            severity = finding["severity"].lower()
            findings_by_severity[severity] = findings_by_severity.get(severity, 0) + 1

        # Check if we have findings at or above the fail threshold
        for i, severity in enumerate(severity_levels):
            if i <= fail_index and findings_by_severity.get(severity, 0) > 0:
                print(f"❌ Found {findings_by_severity[severity]} {severity} severity findings")
                return False

        print("✅ No blocking security findings")
        return True

# CI/CD usage
if __name__ == "__main__":
    import os

    wiz = WizCICD(
        client_id=os.environ["WIZ_CLIENT_ID"],
        client_secret=os.environ["WIZ_CLIENT_SECRET"]
    )

    # Scan IaC
    results = wiz.scan_iac(
        directory="./terraform",
        policy_id=os.environ.get("WIZ_POLICY_ID", "default-policy")
    )

    # Check results
    passed = wiz.check_scan_results(results, fail_on="high")

    if not passed:
        print(json.dumps(results, indent=2))
        sys.exit(1)

    sys.exit(0)
```

### Aqua Security Integration

**1. Aqua Scanner Configuration**

```yaml
# aqua-scanner.yaml
# Aqua Security scanner configuration

scanner:
  image_scan:
    enabled: true
    registries:
      - type: docker
        url: docker.io
      - type: ecr
        region: us-east-1

  policy:
    name: "production-policy"
    fail_on:
      - critical
      - high
    ignore_unfixed: false

  compliance:
    frameworks:
      - FedRAMP
      - NIST-800-171
      - PCI-DSS

  vulnerability_severity_threshold: medium

  malware_scanning:
    enabled: true

  secrets_scanning:
    enabled: true

  output:
    format: json
    include_evidence: true
```

**2. Aqua CI/CD Script**

```bash
#!/bin/bash
# aqua-scan.sh - Scan container images with Aqua

set -e

IMAGE_NAME="$1"
AQUA_SERVER="${AQUA_SERVER}"
AQUA_USERNAME="${AQUA_USERNAME}"
AQUA_PASSWORD="${AQUA_PASSWORD}"

if [ -z "$IMAGE_NAME" ]; then
    echo "Usage: $0 <image-name>"
    exit 1
fi

echo "🔍 Scanning image: $IMAGE_NAME"

# Run Aqua scanner
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    registry.aquasec.com/scanner:latest \
    scan \
    --host "$AQUA_SERVER" \
    --user "$AQUA_USERNAME" \
    --password "$AQUA_PASSWORD" \
    --local "$IMAGE_NAME" \
    --register \
    --show-negligible \
    --output json > scan-results.json

# Parse results
CRITICAL=$(jq '.resources[0].vulnerabilities | map(select(.aqua_severity == "critical")) | length' scan-results.json)
HIGH=$(jq '.resources[0].vulnerabilities | map(select(.aqua_severity == "high")) | length' scan-results.json)

echo "📊 Scan Results:"
echo "   Critical: $CRITICAL"
echo "   High: $HIGH"

# Fail if critical or high vulnerabilities found
if [ "$CRITICAL" -gt 0 ] || [ "$HIGH" -gt 5 ]; then
    echo "❌ Security scan failed!"
    jq '.resources[0].vulnerabilities | map(select(.aqua_severity == "critical" or .aqua_severity == "high"))' scan-results.json
    exit 1
fi

echo "✅ Security scan passed!"
exit 0
```

---

## Policy as Code

### OPA (Open Policy Agent) Integration

```rego
# policies/terraform.rego
# OPA policy for Terraform validation

package terraform

import future.keywords

# Deny S3 buckets without encryption
deny[msg] {
    resource := input.resource_changes[_]
    resource.type == "aws_s3_bucket"
    not resource.change.after.server_side_encryption_configuration

    msg := sprintf("S3 bucket '%s' must have encryption enabled", [resource.name])
}

# Deny public S3 buckets
deny[msg] {
    resource := input.resource_changes[_]
    resource.type == "aws_s3_bucket"
    resource.change.after.acl == "public-read"

    msg := sprintf("S3 bucket '%s' cannot have public-read ACL", [resource.name])
}

# Require mandatory tags
mandatory_tags := ["Environment", "Owner", "CostCenter"]

deny[msg] {
    resource := input.resource_changes[_]
    resource.type == "aws_instance"
    tags := object.keys(resource.change.after.tags)

    missing := [tag | tag := mandatory_tags[_]; not tag in tags]
    count(missing) > 0

    msg := sprintf("Resource '%s' missing required tags: %v", [resource.name, missing])
}

# Require MFA for IAM users
deny[msg] {
    resource := input.resource_changes[_]
    resource.type == "aws_iam_user"
    not has_mfa_device(resource.name)

    msg := sprintf("IAM user '%s' must have MFA enabled", [resource.name])
}
```

### Policy Enforcement Pipeline

```yaml
# .github/workflows/policy-enforcement.yml
name: Policy Enforcement

on:
  pull_request:
  push:
    branches: [main]

jobs:
  opa_policy_check:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2

      - name: Terraform Plan
        run: |
          terraform init
          terraform plan -out=tfplan.binary
          terraform show -json tfplan.binary > tfplan.json

      - name: Setup OPA
        uses: open-policy-agent/setup-opa@v2

      - name: Run OPA Tests
        run: |
          opa test policies/ -v

      - name: Evaluate Terraform Plan
        run: |
          opa eval \
            --data policies/terraform.rego \
            --input tfplan.json \
            --format pretty \
            "data.terraform.deny" > violations.txt

          if [ -s violations.txt ]; then
            echo "❌ Policy violations found:"
            cat violations.txt
            exit 1
          else
            echo "✅ No policy violations"
          fi

      - name: Comment PR with violations
        if: failure() && github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const violations = fs.readFileSync('violations.txt', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## ⚠️ Policy Violations Detected\n\n\`\`\`\n${violations}\n\`\`\``
            });
```

---

## Shift-Left Security

### Pre-Commit Hooks

**1. Setup pre-commit framework**

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/antonbabenko/pre-commit-terraform
    rev: v1.83.5
    hooks:
      - id: terraform_fmt
      - id: terraform_validate
      - id: terraform_tflint
      - id: terraform_docs

  - repo: https://github.com/bridgecrewio/checkov
    rev: 2.5.0
    hooks:
      - id: checkov
        args:
          - --quiet
          - --framework=terraform

  - repo: https://github.com/aquasecurity/tfsec
    rev: v1.28.4
    hooks:
      - id: tfsec

  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json
      - id: detect-aws-credentials
        args: ['--allow-missing-credentials']
      - id: detect-private-key
```

**2. Install and use**

```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Run manually
pre-commit run --all-files

# Run on specific files
pre-commit run --files terraform/*.tf
```

### IDE Integration

**1. VSCode Extension Configuration**

```json
// .vscode/settings.json
{
  "terraform.languageServer": {
    "enabled": true,
    "args": []
  },

  "tflint.enabled": true,
  "tflint.configFile": ".tflint.hcl",

  "checkov.token": "${env:PRISMA_API_KEY}",
  "checkov.enabledFrameworks": [
    "terraform",
    "kubernetes",
    "dockerfile"
  ],

  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },

  "files.associations": {
    "*.tf": "terraform",
    "*.hcl": "terraform"
  }
}
```

**2. TFLint Configuration**

```hcl
# .tflint.hcl
plugin "terraform" {
  enabled = true
  preset  = "recommended"
}

plugin "aws" {
  enabled = true
  version = "0.27.0"
  source  = "github.com/terraform-linters/tflint-ruleset-aws"
}

rule "terraform_naming_convention" {
  enabled = true
}

rule "terraform_required_version" {
  enabled = true
}

rule "terraform_required_providers" {
  enabled = true
}

# AWS-specific rules
rule "aws_instance_invalid_type" {
  enabled = true
}

rule "aws_s3_bucket_lifecycle_configuration" {
  enabled = true
}
```

---

## Continuous Compliance

### Automated Compliance Reporting

```python
# compliance_reporter.py
"""Generate compliance reports from CSPM scans"""

import boto3
import json
from datetime import datetime

class ComplianceReporter:
    def __init__(self):
        self.securityhub = boto3.client('securityhub')
        self.config = boto3.client('config')

    def get_compliance_summary(self):
        """Get compliance summary from AWS Security Hub"""
        response = self.securityhub.get_findings(
            Filters={
                'RecordState': [{'Value': 'ACTIVE', 'Comparison': 'EQUALS'}],
                'WorkflowStatus': [{'Value': 'NEW', 'Comparison': 'EQUALS'}]
            },
            MaxResults=100
        )

        summary = {
            'total_findings': len(response['Findings']),
            'by_severity': {},
            'by_standard': {},
            'by_control': {}
        }

        for finding in response['Findings']:
            # Count by severity
            severity = finding['Severity']['Label']
            summary['by_severity'][severity] = summary['by_severity'].get(severity, 0) + 1

            # Count by compliance standard
            if 'Compliance' in finding:
                status = finding['Compliance']['Status']
                summary['by_standard'][status] = summary['by_standard'].get(status, 0) + 1

        return summary

    def generate_report(self, output_file='compliance-report.json'):
        """Generate comprehensive compliance report"""
        report = {
            'generated_at': datetime.now().isoformat(),
            'summary': self.get_compliance_summary(),
            'frameworks': self.get_framework_compliance(),
            'top_violations': self.get_top_violations(),
            'remediation_recommendations': self.get_remediation_recommendations()
        }

        with open(output_file, 'w') as f:
            json.dump(report, f, indent=2)

        return report

    def get_framework_compliance(self):
        """Get compliance status for each framework"""
        standards = [
            'arn:aws:securityhub:::ruleset/cis-aws-foundations-benchmark/v/1.2.0',
            'arn:aws:securityhub:us-east-1::standards/aws-foundational-security-best-practices/v/1.0.0',
            'arn:aws:securityhub:us-east-1::standards/pci-dss/v/3.2.1'
        ]

        framework_compliance = {}

        for standard in standards:
            results = self.securityhub.get_compliance_summary_by_resource_type(
                StandardsSubscriptionArn=standard
            )
            framework_compliance[standard] = results

        return framework_compliance

    def get_top_violations(self, limit=10):
        """Get most common violations"""
        findings = self.securityhub.get_findings(
            Filters={'RecordState': [{'Value': 'ACTIVE', 'Comparison': 'EQUALS'}]},
            MaxResults=100
        )

        violation_counts = {}
        for finding in findings['Findings']:
            title = finding['Title']
            violation_counts[title] = violation_counts.get(title, 0) + 1

        # Sort and get top violations
        sorted_violations = sorted(
            violation_counts.items(),
            key=lambda x: x[1],
            reverse=True
        )[:limit]

        return [{'violation': v[0], 'count': v[1]} for v in sorted_violations]

    def get_remediation_recommendations(self):
        """Get remediation recommendations"""
        return {
            'automated': self.get_automated_remediation(),
            'manual': self.get_manual_remediation()
        }

# Usage in CI/CD
if __name__ == "__main__":
    reporter = ComplianceReporter()
    report = reporter.generate_report()
    print(f"Compliance report generated: {report['summary']['total_findings']} findings")
```

### Drift Detection

```yaml
# .github/workflows/drift-detection.yml
name: Infrastructure Drift Detection

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  detect_drift:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2

      - name: Terraform Init
        run: terraform init

      - name: Terraform Plan (Detect Drift)
        id: plan
        run: |
          terraform plan -detailed-exitcode -no-color -out=tfplan.binary || exit_code=$?
          terraform show -json tfplan.binary > tfplan.json

          if [ $exit_code -eq 2 ]; then
            echo "drift_detected=true" >> $GITHUB_OUTPUT
          else
            echo "drift_detected=false" >> $GITHUB_OUTPUT
          fi

      - name: Analyze Drift
        if: steps.plan.outputs.drift_detected == 'true'
        run: |
          python3 << 'EOF'
          import json
          import sys

          with open('tfplan.json') as f:
              plan = json.load(f)

          drift = {
              'created': [],
              'modified': [],
              'deleted': []
          }

          for change in plan.get('resource_changes', []):
              actions = change['change']['actions']
              resource = f"{change['type']}.{change['name']}"

              if 'create' in actions:
                  drift['created'].append(resource)
              elif 'update' in actions:
                  drift['modified'].append(resource)
              elif 'delete' in actions:
                  drift['deleted'].append(resource)

          print("🔍 Infrastructure Drift Detected:")
          print(f"   Created: {len(drift['created'])}")
          print(f"   Modified: {len(drift['modified'])}")
          print(f"   Deleted: {len(drift['deleted'])}")

          if drift['created']:
              print("\n➕ Created Resources:")
              for resource in drift['created']:
                  print(f"   - {resource}")

          if drift['modified']:
              print("\n✏️  Modified Resources:")
              for resource in drift['modified']:
                  print(f"   - {resource}")

          if drift['deleted']:
              print("\n❌ Deleted Resources:")
              for resource in drift['deleted']:
                  print(f"   - {resource}")

          with open('drift-summary.json', 'w') as f:
              json.dump(drift, f, indent=2)
          EOF

      - name: Create Issue for Drift
        if: steps.plan.outputs.drift_detected == 'true'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const drift = JSON.parse(fs.readFileSync('drift-summary.json', 'utf8'));

            const body = `## ⚠️ Infrastructure Drift Detected

            **Created:** ${drift.created.length} resources
            **Modified:** ${drift.modified.length} resources
            **Deleted:** ${drift.deleted.length} resources

            <details>
            <summary>View Details</summary>

            ### Created Resources
            ${drift.created.map(r => `- ${r}`).join('\n')}

            ### Modified Resources
            ${drift.modified.map(r => `- ${r}`).join('\n')}

            ### Deleted Resources
            ${drift.deleted.map(r => `- ${r}`).join('\n')}

            </details>

            **Action Required:** Review and either:
            1. Update Terraform code to match actual state
            2. Investigate unauthorized changes
            `;

            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `Infrastructure Drift Detected - ${new Date().toISOString().split('T')[0]}`,
              body: body,
              labels: ['security', 'infrastructure', 'drift']
            });
```

---

## Remediation Workflows

### Automated Remediation

```python
# auto_remediation.py
"""Automated remediation for common security findings"""

import boto3
import json

class AutoRemediation:
    def __init__(self):
        self.s3 = boto3.client('s3')
        self.ec2 = boto3.client('ec2')
        self.iam = boto3.client('iam')

    def remediate_s3_public_access(self, bucket_name):
        """Block public access on S3 bucket"""
        try:
            self.s3.put_public_access_block(
                Bucket=bucket_name,
                PublicAccessBlockConfiguration={
                    'BlockPublicAcls': True,
                    'IgnorePublicAcls': True,
                    'BlockPublicPolicy': True,
                    'RestrictPublicBuckets': True
                }
            )
            print(f"✅ Blocked public access on bucket: {bucket_name}")
            return True
        except Exception as e:
            print(f"❌ Failed to remediate {bucket_name}: {str(e)}")
            return False

    def remediate_s3_encryption(self, bucket_name, kms_key_id):
        """Enable encryption on S3 bucket"""
        try:
            self.s3.put_bucket_encryption(
                Bucket=bucket_name,
                ServerSideEncryptionConfiguration={
                    'Rules': [{
                        'ApplyServerSideEncryptionByDefault': {
                            'SSEAlgorithm': 'aws:kms',
                            'KMSMasterKeyID': kms_key_id
                        },
                        'BucketKeyEnabled': True
                    }]
                }
            )
            print(f"✅ Enabled encryption on bucket: {bucket_name}")
            return True
        except Exception as e:
            print(f"❌ Failed to enable encryption on {bucket_name}: {str(e)}")
            return False

    def remediate_sg_unrestricted_access(self, security_group_id, port):
        """Remove unrestricted inbound rules"""
        try:
            self.ec2.revoke_security_group_ingress(
                GroupId=security_group_id,
                IpPermissions=[{
                    'IpProtocol': 'tcp',
                    'FromPort': port,
                    'ToPort': port,
                    'IpRanges': [{'CidrIp': '0.0.0.0/0'}]
                }]
            )
            print(f"✅ Removed unrestricted access on SG: {security_group_id}")
            return True
        except Exception as e:
            print(f"❌ Failed to remediate {security_group_id}: {str(e)}")
            return False

    def remediate_iam_password_policy(self):
        """Update IAM password policy to meet compliance"""
        try:
            self.iam.update_account_password_policy(
                MinimumPasswordLength=14,
                RequireSymbols=True,
                RequireNumbers=True,
                RequireUppercaseCharacters=True,
                RequireLowercaseCharacters=True,
                AllowUsersToChangePassword=True,
                MaxPasswordAge=90,
                PasswordReusePrevention=24,
                HardExpiry=False
            )
            print("✅ Updated IAM password policy")
            return True
        except Exception as e:
            print(f"❌ Failed to update password policy: {str(e)}")
            return False

# Lambda handler for automated remediation
def lambda_handler(event, context):
    """
    AWS Lambda function to auto-remediate Security Hub findings
    Triggered by EventBridge when new findings detected
    """
    remediation = AutoRemediation()

    finding = event['detail']['findings'][0]
    finding_type = finding['Types'][0]

    if 'S3.1' in finding['Title']:  # S3 bucket public read
        bucket_name = finding['Resources'][0]['Id'].split(':')[-1]
        remediation.remediate_s3_public_access(bucket_name)

    elif 'S3.4' in finding['Title']:  # S3 bucket encryption
        bucket_name = finding['Resources'][0]['Id'].split(':')[-1]
        kms_key_id = os.environ.get('KMS_KEY_ID')
        remediation.remediate_s3_encryption(bucket_name, kms_key_id)

    elif 'EC2.19' in finding['Title']:  # Unrestricted security group
        sg_id = finding['Resources'][0]['Id'].split('/')[-1]
        remediation.remediate_sg_unrestricted_access(sg_id, 22)

    elif 'IAM.15' in finding['Title']:  # IAM password policy
        remediation.remediate_iam_password_policy()

    return {'statusCode': 200, 'body': 'Remediation completed'}
```

---

## Best Practices

### 1. Fail Fast, Fail Early

```
Development Pipeline Gates:
┌─────────────────────────────────────────────────────┐
│ Pre-commit: Local checks (fast feedback)            │
│ ↓ PASS                                              │
│ PR Review: Automated scans (block merge)            │
│ ↓ PASS                                              │
│ CI Build: Comprehensive scanning                    │
│ ↓ PASS                                              │
│ Deploy to Dev: Runtime validation                   │
│ ↓ PASS                                              │
│ Deploy to Prod: Final checks + monitoring           │
└─────────────────────────────────────────────────────┘
```

### 2. Progressive Rollout

```markdown
# CSPM Rollout Strategy

## Phase 1: Observation (Week 1-2)
- [ ] Run scans in `soft_fail` mode
- [ ] Collect baseline metrics
- [ ] Identify false positives
- [ ] Tune policies

## Phase 2: Warnings (Week 3-4)
- [ ] Enable warnings in PR comments
- [ ] Don't block merges
- [ ] Track remediation rate
- [ ] Refine policies

## Phase 3: Enforcement (Week 5+)
- [ ] Enable hard failures for critical/high
- [ ] Block deployments on violations
- [ ] Automated remediation where possible
- [ ] Continuous monitoring
```

### 3. Exception Management

```yaml
# cspm-exceptions.yaml
# Documented exceptions to security policies

exceptions:
  - id: EXCEPT-001
    policy: CKV_AWS_18
    resource: "aws_ebs_volume.public_ami_volume"
    justification: "Public AMI requires unencrypted volume"
    approved_by: "security-team@company.com"
    approved_date: "2024-01-15"
    expiration_date: "2024-07-15"
    review_frequency: "quarterly"

  - id: EXCEPT-002
    policy: CKV_K8S_8
    resource: "kubernetes_job.batch_processor"
    justification: "Batch jobs don't require liveness probes"
    approved_by: "platform-team@company.com"
    approved_date: "2024-02-01"
    expiration_date: "2025-02-01"
    compensating_controls:
      - "Job completion monitoring"
      - "Dead letter queue for failures"
```

---

**Related Resources:**
- [cloud-security-tools.md](../cloud-engineering/resources/cloud-security-tools.md) - CSPM tool details
- [compliance-frameworks.md](compliance-frameworks.md) - Compliance requirements
- [security-scanning.md](security-scanning.md) - Security scanning strategies
- [ci-cd-security.md](ci-cd-security.md) - CI/CD security patterns
