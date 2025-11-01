---
description: Structured incident debugging guide, checklist format, runbook approach
argument-hint: Describe the incident (e.g., "API responding slowly", "database connection failures", "high error rate")
---

Create a structured incident debugging guide for: $ARGUMENTS

## Instructions

You are an SRE assisting with incident response. Provide a systematic, checklist-based debugging guide.

### 1. Incident Summary

**Quick Assessment:**
- Symptom: [What users are experiencing]
- Impact: [How many users, which services]
- Severity: [P1/P2/P3 based on impact]
- Started: [When did this begin]

### 2. Initial Response Checklist

**Immediate Actions:**
- [ ] Create incident ticket
- [ ] Notify on-call team
- [ ] Start incident timeline document
- [ ] Check status page for planned maintenance
- [ ] Verify monitoring alerts

**Communication:**
- [ ] Update status page (if customer-facing)
- [ ] Notify stakeholders
- [ ] Start incident Slack channel or bridge call
- [ ] Assign incident commander

### 3. Systematic Debugging

**Layer 1: Application Health**
```
Checks:
- [ ] Check application logs (errors, warnings)
- [ ] Review recent deployments (last 24 hours)
- [ ] Verify application process running
- [ ] Check error rates (APM dashboard)
- [ ] Review recent code changes

Commands:
# Check application logs
kubectl logs -f deployment/api-service --tail=100

# Check pod status
kubectl get pods -n production

# Check recent deployments
kubectl rollout history deployment/api-service
```

**Layer 2: Infrastructure Health**
```
Checks:
- [ ] CPU utilization
- [ ] Memory utilization
- [ ] Disk space
- [ ] Network connectivity
- [ ] Resource saturation

Commands:
# Check resource usage
kubectl top pods -n production
kubectl top nodes

# Check node health
kubectl get nodes
kubectl describe node <node-name>
```

**Layer 3: Dependencies**
```
Checks:
- [ ] Database connectivity
- [ ] Database query performance
- [ ] External API health
- [ ] Cache service (Redis/Memcached)
- [ ] Message queue health

Commands:
# Test database connection
kubectl exec -it pod/api-service -- psql -h db-host -U user -c "SELECT 1"

# Check Redis
kubectl exec -it pod/redis -- redis-cli ping
```

**Layer 4: Network**
```
Checks:
- [ ] DNS resolution
- [ ] Load balancer health
- [ ] Network latency
- [ ] Firewall/security groups
- [ ] SSL certificate validity

Commands:
# Test DNS
nslookup api.company.com

# Check connectivity
curl -I https://api.company.com/health

# Test latency
ping api.company.com
```

### 4. Data Gathering

**Logs:**
- [ ] Application logs (errors, stack traces)
- [ ] System logs (syslog, kernel logs)
- [ ] Web server logs (nginx, Apache)
- [ ] Database logs (slow queries, errors)

**Metrics:**
- [ ] Response time (p50, p95, p99)
- [ ] Error rate (%)
- [ ] Request rate (qps)
- [ ] Resource utilization

**Traces:**
- [ ] Distributed traces (find slow transactions)
- [ ] Database query traces
- [ ] External API call traces

### 5. Common Scenarios

**High CPU/Memory:**
```
Likely Causes:
- Memory leak
- Infinite loop
- Resource-intensive operation
- Too many concurrent requests

Investigation:
- [ ] Check for memory leaks (heap dump)
- [ ] Review recent code changes
- [ ] Check request volume
- [ ] Profile application

Quick Fix:
- Scale up pods/instances
- Restart service (if leak)
- Enable auto-scaling
```

**Database Issues:**
```
Likely Causes:
- Slow queries
- Missing indexes
- Connection pool exhaustion
- Disk I/O saturation
- Deadlocks

Investigation:
- [ ] Check slow query log
- [ ] Review query plans (EXPLAIN)
- [ ] Check connection count
- [ ] Monitor disk I/O
- [ ] Check for locks

Quick Fix:
- Kill long-running queries
- Increase connection pool
- Add missing indexes
- Scale database
```

**External Dependency Failure:**
```
Likely Causes:
- Third-party API down
- Network issues
- Authentication failure
- Rate limiting

Investigation:
- [ ] Check service status page
- [ ] Test connectivity
- [ ] Review error messages
- [ ] Check rate limits

Quick Fix:
- Enable circuit breaker
- Use cached data
- Switch to backup provider
- Graceful degradation
```

### 6. Mitigation Actions

**Short-Term (Restore Service):**
- [ ] Rollback recent deployment
- [ ] Scale up resources
- [ ] Restart services
- [ ] Failover to backup
- [ ] Enable cached responses

**Medium-Term (Stabilize):**
- [ ] Apply hotfix
- [ ] Tune performance
- [ ] Increase capacity
- [ ] Update configuration

### 7. Resolution Verification

**Validation Checks:**
- [ ] Error rate returned to normal
- [ ] Response times acceptable
- [ ] User reports resolved
- [ ] Monitoring dashboards green
- [ ] Smoke tests passing

**Post-Resolution:**
- [ ] Update status page (resolved)
- [ ] Close incident ticket
- [ ] Notify stakeholders
- [ ] Document timeline
- [ ] Schedule post-mortem

### 8. Post-Mortem Items

**For Later Analysis:**
- Root cause determination
- Prevention measures
- Monitoring improvements
- Runbook updates
- Process improvements

## Output Format

Provide:
1. Incident-specific debugging checklist
2. Relevant commands and queries
3. Quick mitigation steps
4. Validation procedures
5. Follow-up actions

Be specific to the incident described and prioritize speed of resolution.
