---
description: Infrastructure cost analysis, optimization recommendations, action plan
argument-hint: Optional - specific service or time period (e.g., "last month AWS costs", "Kubernetes cluster", "production environment")
---

Perform infrastructure cost analysis and provide optimization recommendations for: $ARGUMENTS

## Instructions

Analyze infrastructure costs and provide actionable optimization recommendations.

### 1. Cost Discovery

**Request Information:**

Ask the user to provide:
- [ ] Cloud bill (AWS Cost Explorer, Azure Cost Management, GCP Billing)
- [ ] Time period for analysis (last month, quarter, year)
- [ ] Current infrastructure details
- [ ] Monitoring metrics (CPU/memory utilization)

If not provided, guide them on how to export:

**AWS Cost Explorer Export:**
```bash
aws ce get-cost-and-usage \
  --time-period Start=2024-10-01,End=2024-11-01 \
  --granularity MONTHLY \
  --metrics UnblendedCost \
  --group-by Type=SERVICE
```

**Azure:**
```bash
az consumption usage list \
  --start-date 2024-10-01 \
  --end-date 2024-11-01 \
  --output table
```

**GCP:**
```bash
gcloud billing accounts list
gcloud billing accounts get-billing-info
```

### 2. Cost Analysis

**Categorize Spending:**

Compute:
  - EC2/Compute Engine/VMs
  - Container services (ECS, EKS, GKE)
  - Serverless (Lambda, Cloud Functions)
  - Auto-scaling patterns

Storage:
  - Object storage (S3, Blob, Cloud Storage)
  - Block storage (EBS, Persistent Disk)
  - Databases
  - Backups

Network:
  - Data transfer
  - Load balancers
  - NAT gateways
  - VPN/Direct Connect

Other:
  - Monitoring
  - Logging
  - Support
  - Licensing

**Identify Top Cost Drivers:**
- List top 10 services by cost
- Calculate % of total spend
- Identify trends (increasing, stable, decreasing)

### 3. Utilization Analysis

**Resource Efficiency:**

Compute:
- [ ] Average CPU utilization (<30% = over-provisioned)
- [ ] Average memory utilization (<40% = over-provisioned)
- [ ] Idle instances (running 24/7 but low usage)
- [ ] Non-production environments running off-hours

Storage:
- [ ] Unused EBS volumes
- [ ] Old snapshots
- [ ] S3 lifecycle policies
- [ ] Storage class optimization

Database:
- [ ] Database utilization
- [ ] Read replica usage
- [ ] Reserved capacity opportunities

### 4. Optimization Recommendations

**Quick Wins (Immediate Impact):**

1. Delete Unused Resources:
   ```
   Resources to find and delete:
   - Unattached EBS volumes
   - Old snapshots (>90 days)
   - Unused elastic IPs
   - Orphaned load balancers
   - Test/dev resources left running

   Expected Savings: $X,XXX/month
   Effort: Low (2-4 hours)
   Risk: Low (verify before deleting)
   ```

2. Right-Size Instances:
   ```
   Analyze resource utilization:
   - Instances with <30% CPU for 30 days
   - Instances with <40% memory

   Action: Downsize instance types
   Example: m5.xlarge → m5.large (50% savings)

   Expected Savings: $X,XXX/month
   Effort: Medium (testing required)
   Risk: Medium (performance impact)
   ```

3. Stop Non-Production Off-Hours:
   ```
   Dev/staging environments:
   - Run Monday-Friday 8am-8pm only
   - Save 65% of compute costs

   Expected Savings: $X,XXX/month
   Effort: Low (automation script)
   Risk: Low
   ```

**Medium-Term Optimizations:**

4. Reserved Instances / Savings Plans:
   ```
   Analyze steady-state workloads:
   - Identify always-on instances
   - Calculate 1-year or 3-year commitment
   - Compare Savings Plans vs Reserved Instances

   Expected Savings: 30-70% on committed spend
   Effort: Medium (capacity planning)
   Risk: Medium (commitment)
   ```

5. Spot Instances:
   ```
   Candidates for Spot:
   - Batch processing
   - CI/CD workers
   - Data processing
   - Non-critical workloads

   Expected Savings: 60-90% on compute
   Effort: Medium (fault-tolerance required)
   Risk: Medium (interruptions possible)
   ```

6. Storage Optimization:
   ```
   S3 Lifecycle Policies:
   - Move to S3-IA after 30 days
   - Move to Glacier after 90 days
   - Delete after retention period

   Expected Savings: 50-90% on storage
   Effort: Low (lifecycle rules)
   Risk: Low
   ```

**Long-Term Strategies:**

7. Architecture Optimization:
   ```
   Serverless Migration:
   - Identify low-traffic APIs
   - Migrate to Lambda/Cloud Functions
   - Pay per use vs always-on

   Auto-Scaling:
   - Implement HPA/VPA in Kubernetes
   - Auto-scaling groups for EC2
   - Right-size for peak, scale down for trough

   Multi-Region Cost Optimization:
   - Reduce cross-region data transfer
   - Use CloudFront/CDN
   - Regional data locality
   ```

### 5. FinOps Best Practices

**Implement Cost Governance:**

Tagging Strategy:
```yaml
Required Tags:
  - Environment (prod/staging/dev)
  - CostCenter
  - Team
  - Project
  - Owner

Enforcement:
  - Tag policies
  - Budget alerts per tag
  - Chargeback reporting
```

Budget Alerts:
```yaml
Set up alerts:
  - Overall monthly budget
  - Per-team budgets
  - Per-environment budgets
  - Alert at 50%, 80%, 100%
```

Cost Allocation:
```yaml
Enable:
  - Cost allocation tags
  - Chargeback reports
  - Team cost visibility
  - Cost anomaly detection
```

### 6. Implementation Roadmap

**Phase 1 (Week 1): Quick Wins**
- [ ] Delete unused resources
- [ ] Stop non-prod off-hours
- [ ] Implement S3 lifecycle policies
- Expected Savings: $X,XXX/month

**Phase 2 (Weeks 2-4): Right-Sizing**
- [ ] Analyze utilization
- [ ] Right-size instances
- [ ] Implement auto-scaling
- Expected Savings: $X,XXX/month

**Phase 3 (Month 2): Reserved Capacity**
- [ ] Analyze commitment opportunities
- [ ] Purchase Reserved Instances/Savings Plans
- [ ] Implement Spot instances
- Expected Savings: $X,XXX/month

**Phase 4 (Month 3+): Continuous Optimization**
- [ ] Monthly cost reviews
- [ ] FinOps culture
- [ ] Cost awareness in development
- [ ] Automated optimization

### 7. Tracking and Reporting

**Cost Dashboard:**
```
Metrics to track:
- Monthly total spend
- Spend by service
- Spend by team
- Trend vs budget
- Optimization savings realized

Review Cadence:
- Weekly: Anomaly detection
- Monthly: Cost review meeting
- Quarterly: Strategic planning
```

### 8. Output Format

Provide detailed report with:

**Executive Summary:**
- Current monthly spend: $XXX,XXX
- Potential savings: $XX,XXX (XX%)
- Top 3 recommendations
- Implementation timeline

**Detailed Analysis:**
- Cost breakdown by service
- Utilization metrics
- Waste identification

**Optimization Opportunities:**
Ranked by ROI:
1. [Recommendation] - $X,XXX/month, low effort
2. [Recommendation] - $X,XXX/month, medium effort
3. [Recommendation] - $X,XXX/month, high effort

**Implementation Plan:**
- Phase-by-phase roadmap
- Effort estimates
- Risk assessment
- Expected savings timeline

**Tracking:**
- KPIs to monitor
- Dashboard setup
- Review schedule

Be specific with actual dollar amounts and percentages where possible.
