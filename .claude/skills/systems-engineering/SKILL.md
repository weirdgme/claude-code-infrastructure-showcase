---
description: Systems engineering and administration covering Linux and Windows administration, networking fundamentals, performance tuning, configuration management (Ansible/Chef/Puppet), system monitoring, shell scripting (bash/PowerShell), and troubleshooting. Use when managing Linux or Windows systems, optimizing performance, automating operations, or debugging system issues. (project)
---
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 SKILL ACTIVATED: systems-engineering
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


# Systems Engineering & Administration

Comprehensive guide for Linux and Windows system administration, networking, performance optimization, configuration management, and operational automation. This skill provides production-tested patterns for managing infrastructure at scale across both platforms.

## When to Use This Skill

Automatically activates when working on:
- Linux or Windows Server administration and configuration
- System performance tuning and optimization
- Configuration management (Ansible, Chef, Puppet, DSC)
- Shell scripting automation (bash, PowerShell)
- System monitoring and observability setup
- Security hardening and compliance
- Storage management and backup strategies
- Active Directory and Group Policy (Windows)
- System troubleshooting and debugging

## Overview

**Purpose:** Enable teams to build, configure, and maintain robust infrastructure with automation, monitoring, and performance optimization on both Linux and Windows platforms.

**Scope:**
- Linux and Windows Server administration
- Networking fundamentals (TCP/IP, DNS, load balancing, firewalls)
- Performance tuning and optimization (both platforms)
- Configuration management (Ansible, Chef, Puppet, DSC)
- System monitoring and observability
- Shell scripting and automation (bash, PowerShell)
- Troubleshooting and debugging
- Security hardening (Linux and Windows)
- Storage management (LVM, Windows Storage Spaces)
- Operational excellence

**This skill is for:**
- Systems engineers managing Linux and Windows infrastructure
- DevOps engineers automating operations across platforms
- SREs optimizing system performance
- IT administrators maintaining servers (Linux/Windows)
- Platform engineers building foundational services

## Quick Start Checklist

When starting a systems engineering task:

- [ ] Identify system requirements (OS, resources, networking)
- [ ] Plan infrastructure topology and dependencies
- [ ] Implement configuration management for reproducibility
- [ ] Set up monitoring and alerting
- [ ] Configure logging and log aggregation
- [ ] Implement security hardening (firewall, SELinux, patches)
- [ ] Document runbooks and procedures
- [ ] Test disaster recovery procedures
- [ ] Implement backup strategy
- [ ] Plan capacity and performance optimization

## Core Concepts

### 1. Linux System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   User Space                                 │
│  ┌────────────┬─────────────┬──────────────┬──────────────┐ │
│  │ Applications│ Libraries   │ System Utils │ Shells       │ │
│  └────────────┴─────────────┴──────────────┴──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                   Kernel Space                               │
│  ┌────────────┬─────────────┬──────────────┬──────────────┐ │
│  │ Process    │ Memory      │ File System  │ Network      │ │
│  │ Management │ Management  │ Management   │ Stack        │ │
│  └────────────┴─────────────┴──────────────┴──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                   Hardware Layer                             │
│  ┌────────────┬─────────────┬──────────────┬──────────────┐ │
│  │ CPU        │ RAM         │ Storage      │ Network      │ │
│  │            │             │              │ Interfaces   │ │
│  └────────────┴─────────────┴──────────────┴──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 2. systemd Service Management

**Service Lifecycle:**
```
┌──────────┐    systemctl start    ┌──────────┐
│          │ ──────────────────→   │          │
│ Inactive │                       │  Active  │
│          │ ←──────────────────   │          │
└──────────┘    systemctl stop     └──────────┘
     ↓                                  ↓
     └─────→ systemctl enable ──────→  (starts on boot)
```

**Key Commands:**
```bash
# Service management
systemctl start nginx
systemctl stop nginx
systemctl restart nginx
systemctl reload nginx
systemctl status nginx

# Enable/disable at boot
systemctl enable nginx
systemctl disable nginx

# View logs
journalctl -u nginx
journalctl -u nginx -f  # Follow
journalctl -u nginx --since "1 hour ago"

# List all services
systemctl list-units --type=service
systemctl list-unit-files --type=service
```

### 3. Networking Stack

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 7: Application (HTTP, DNS, SSH, FTP)                  │
├─────────────────────────────────────────────────────────────┤
│ Layer 4: Transport (TCP, UDP)                               │
├─────────────────────────────────────────────────────────────┤
│ Layer 3: Network (IP, ICMP, Routing)                        │
├─────────────────────────────────────────────────────────────┤
│ Layer 2: Data Link (Ethernet, MAC addresses)               │
├─────────────────────────────────────────────────────────────┤
│ Layer 1: Physical (Cables, NICs)                            │
└─────────────────────────────────────────────────────────────┘
```

**Common Network Operations:**
```bash
# Interface management
ip addr show
ip link show
ip route show

# Network connectivity
ping -c 4 google.com
traceroute google.com
mtr google.com  # Continuous traceroute

# DNS lookup
dig example.com
nslookup example.com
host example.com

# Port scanning
nmap -sT localhost
ss -tuln  # Show listening ports
netstat -tuln  # Legacy alternative

# Network statistics
ss -s
netstat -i
iftop  # Real-time bandwidth
```

### 4. Performance Monitoring

**System Resource Overview:**
```bash
# CPU
top
htop
mpstat 1  # CPU stats per second
pidstat 1  # Per-process CPU

# Memory
free -h
vmstat 1
cat /proc/meminfo

# Disk I/O
iostat -x 1
iotop
df -h  # Disk usage
du -sh /var/*  # Directory sizes

# Network
iftop
nethogs
sar -n DEV 1  # Network stats
```

## Common Patterns

### Pattern 1: Ansible Automation

**Directory Structure:**
```
ansible/
├── ansible.cfg
├── inventory/
│   ├── production/
│   │   ├── hosts
│   │   └── group_vars/
│   │       ├── all.yml
│   │       ├── webservers.yml
│   │       └── databases.yml
│   └── staging/
│       └── hosts
├── roles/
│   ├── common/
│   │   ├── tasks/
│   │   │   └── main.yml
│   │   ├── handlers/
│   │   │   └── main.yml
│   │   ├── templates/
│   │   ├── files/
│   │   └── vars/
│   │       └── main.yml
│   ├── nginx/
│   └── postgres/
├── playbooks/
│   ├── site.yml
│   ├── webservers.yml
│   └── database.yml
└── group_vars/
    └── all.yml
```

**Example Playbook:**
```yaml
# playbooks/webservers.yml
---
- name: Configure web servers
  hosts: webservers
  become: yes
  vars:
    nginx_port: 80
    app_user: webapp

  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes
        cache_valid_time: 3600

    - name: Install nginx
      apt:
        name: nginx
        state: present

    - name: Configure nginx
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
        owner: root
        group: root
        mode: '0644'
      notify: Reload nginx

    - name: Ensure nginx is running
      systemd:
        name: nginx
        state: started
        enabled: yes

    - name: Configure firewall
      ufw:
        rule: allow
        port: '{{ nginx_port }}'
        proto: tcp

  handlers:
    - name: Reload nginx
      systemd:
        name: nginx
        state: reloaded
```

### Pattern 2: System Hardening

**Security Baseline Script:**
```bash
#!/bin/bash
# system-hardening.sh
# Implements CIS benchmark controls

set -euo pipefail

echo "=== System Hardening Script ==="

# 1. Update system
echo "[1/10] Updating system packages..."
apt-get update && apt-get upgrade -y

# 2. Configure firewall
echo "[2/10] Configuring firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp  # SSH
ufw allow 80/tcp  # HTTP
ufw allow 443/tcp # HTTPS
ufw --force enable

# 3. Disable unnecessary services
echo "[3/10] Disabling unnecessary services..."
systemctl disable avahi-daemon 2>/dev/null || true
systemctl disable cups 2>/dev/null || true
systemctl stop avahi-daemon 2>/dev/null || true
systemctl stop cups 2>/dev/null || true

# 4. Configure SSH hardening
echo "[4/10] Hardening SSH configuration..."
cat > /etc/ssh/sshd_config.d/99-hardening.conf <<EOF
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
X11Forwarding no
MaxAuthTries 3
MaxSessions 2
ClientAliveInterval 300
ClientAliveCountMax 2
Protocol 2
EOF
systemctl restart sshd

# 5. Set password policy
echo "[5/10] Configuring password policy..."
cat > /etc/security/pwquality.conf <<EOF
minlen = 14
dcredit = -1
ucredit = -1
ocredit = -1
lcredit = -1
EOF

# 6. Configure auditd
echo "[6/10] Setting up audit logging..."
apt-get install -y auditd audispd-plugins
systemctl enable auditd
systemctl start auditd

# 7. Kernel hardening
echo "[7/10] Applying kernel hardening..."
cat > /etc/sysctl.d/99-hardening.conf <<EOF
# IP forwarding
net.ipv4.ip_forward = 0

# SYN flood protection
net.ipv4.tcp_syncookies = 1

# ICMP redirects
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0

# Source routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0

# Log martians
net.ipv4.conf.all.log_martians = 1

# Ignore ICMP ping
net.ipv4.icmp_echo_ignore_all = 0

# IPv6
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
EOF
sysctl -p /etc/sysctl.d/99-hardening.conf

# 8. File permissions
echo "[8/10] Setting secure file permissions..."
chmod 600 /etc/ssh/sshd_config
chmod 644 /etc/passwd
chmod 640 /etc/shadow
chmod 640 /etc/gshadow

# 9. Install security tools
echo "[9/10] Installing security tools..."
apt-get install -y \
    fail2ban \
    rkhunter \
    aide

# Configure fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# 10. Set up automatic updates
echo "[10/10] Configuring automatic security updates..."
apt-get install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

echo "=== System Hardening Complete ==="
echo "Please review /var/log/system-hardening.log for details"
```

### Pattern 3: Performance Tuning

**Performance Analysis Script:**
```bash
#!/bin/bash
# performance-check.sh
# Analyzes system performance and provides recommendations

echo "=== System Performance Analysis ==="
echo ""

# CPU Analysis
echo "--- CPU Information ---"
echo "CPU Model: $(grep 'model name' /proc/cpuinfo | head -1 | cut -d: -f2 | xargs)"
echo "CPU Cores: $(nproc)"
echo "Load Average (1m, 5m, 15m): $(uptime | awk -F'load average:' '{print $2}')"

CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')
echo "CPU Usage: ${CPU_USAGE}%"

if (( $(echo "$CPU_USAGE > 80" | bc -l) )); then
    echo "⚠ WARNING: High CPU usage detected"
    echo "Top CPU consumers:"
    ps aux --sort=-%cpu | head -6
fi

echo ""

# Memory Analysis
echo "--- Memory Information ---"
free -h
MEMORY_USAGE=$(free | grep Mem | awk '{print ($3/$2) * 100.0}')
echo "Memory Usage: ${MEMORY_USAGE}%"

if (( $(echo "$MEMORY_USAGE > 90" | bc -l) )); then
    echo "⚠ WARNING: High memory usage detected"
    echo "Top memory consumers:"
    ps aux --sort=-%mem | head -6
fi

echo ""

# Disk I/O Analysis
echo "--- Disk I/O Information ---"
iostat -x 1 2 | tail -n +4

echo ""

# Network Analysis
echo "--- Network Information ---"
echo "Network Interfaces:"
ip -brief addr show

echo ""
echo "Network Connections:"
ss -s

echo ""
echo "Top Bandwidth Consumers:"
netstat -tunap 2>/dev/null | grep ESTABLISHED | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn | head -5

echo ""
echo "=== Performance Analysis Complete ==="
```

## Resource Files

For detailed guidance on specific topics, see:

### Linux Administration
- **[linux-administration.md](resources/linux-administration.md)** - systemd, user management, package managers, LVM, file systems, boot process
- **[storage-management.md](resources/storage-management.md)** - LVM operations, RAID, file systems, backups, snapshots, capacity planning
- **[shell-scripting.md](resources/shell-scripting.md)** - Bash scripting patterns, error handling, testing, best practices

### Windows Administration
- **[windows-administration.md](resources/windows-administration.md)** - Windows Server, Active Directory, GPO, IIS, services, registry, security hardening
- **[powershell-scripting.md](resources/powershell-scripting.md)** - PowerShell fundamentals, scripting, DSC, remote management, best practices

### Networking
- **[networking-fundamentals.md](resources/networking-fundamentals.md)** - TCP/IP, DNS, load balancers, firewalls, routing, network debugging
- **[security-hardening.md](resources/security-hardening.md)** - OS hardening, CIS benchmarks, firewall, SELinux/AppArmor, SSH, audit logging

### Performance & Troubleshooting
- **[performance-tuning.md](resources/performance-tuning.md)** - CPU optimization, memory tuning, disk I/O, network performance, profiling tools
- **[troubleshooting-guide.md](resources/troubleshooting-guide.md)** - Debugging methodology, diagnostic tools, common issues, log analysis

### Automation & Configuration
- **[configuration-management.md](resources/configuration-management.md)** - Ansible playbooks, Chef cookbooks, Puppet manifests, DSC, best practices
- **[automation-patterns.md](resources/automation-patterns.md)** - Cron jobs, systemd timers, Task Scheduler, idempotency, error handling

### Monitoring
- **[system-monitoring.md](resources/system-monitoring.md)** - Log aggregation, metrics collection, dashboards, alerting, monitoring best practices

## Best Practices

### System Administration

1. **Automation First:**
   - Use configuration management tools
   - Version control all configurations
   - Implement Infrastructure as Code
   - Automate repetitive tasks
   - Document automation procedures

2. **Security:**
   - Principle of least privilege
   - Regular security updates
   - Implement firewall rules
   - Enable audit logging
   - Use SSH keys, disable password auth

3. **Monitoring:**
   - Comprehensive system monitoring
   - Centralized logging
   - Proactive alerting
   - Regular performance reviews
   - Capacity planning

### Configuration Management

1. **Idempotency:**
   - Ensure scripts can run multiple times safely
   - Check state before making changes
   - Use declarative configurations
   - Test thoroughly before production

2. **Version Control:**
   - Store all configs in Git
   - Use branches for testing
   - Tag releases
   - Document changes in commit messages

3. **Testing:**
   - Test in staging environment
   - Use linters (ansible-lint, shellcheck)
   - Implement smoke tests
   - Rollback procedures ready

### Performance Optimization

1. **Measure First:**
   - Baseline performance metrics
   - Identify bottlenecks before optimizing
   - Use profiling tools
   - Monitor after changes

2. **Incremental Changes:**
   - One change at a time
   - Measure impact
   - Document tuning parameters
   - Rollback if degraded

3. **Right-Sizing:**
   - Match resources to workload
   - Monitor utilization
   - Scale when needed
   - Avoid over-provisioning

## Anti-Patterns to Avoid

❌ **Manual configuration** - Not repeatable, error-prone
❌ **Root login enabled** - Security vulnerability
❌ **No monitoring** - Can't detect issues
❌ **No backups** - Risk of data loss
❌ **Outdated packages** - Security vulnerabilities
❌ **Single point of failure** - No redundancy
❌ **No documentation** - Knowledge silos
❌ **Direct production changes** - Should use config management
❌ **Ignoring logs** - Miss critical information
❌ **No testing** - Changes break production

## Common Tasks

### Task: Configure New Linux Server

1. Initial setup and security hardening
2. Configure firewall rules
3. Set up SSH key authentication
4. Install and configure monitoring agent
5. Configure log forwarding
6. Apply configuration management
7. Install required packages
8. Configure backups
9. Document server in inventory
10. Test and validate

### Task: Troubleshoot Performance Issue

1. Identify symptoms (slow response, high CPU)
2. Check system metrics (CPU, memory, disk, network)
3. Review logs for errors
4. Identify resource bottleneck
5. Analyze top processes
6. Check for configuration issues
7. Implement fix or optimization
8. Monitor after changes
9. Document root cause and solution

### Task: Automate with Ansible

1. Design automation workflow
2. Create inventory file
3. Write playbook and roles
4. Test in development environment
5. Use ansible-lint for validation
6. Test in staging environment
7. Document playbook purpose and variables
8. Deploy to production
9. Monitor execution
10. Update runbooks

## Integration Points

This skill integrates with:
- **platform-engineering**: Container hosts, Kubernetes nodes, infrastructure automation
- **devsecops**: Security scanning, hardening, compliance checks
- **sre**: System reliability, performance optimization, incident response
- **cloud-engineering**: Cloud VM management, networking, hybrid cloud
- **release-engineering**: Deployment automation, server provisioning

## Triggers and Activation

This skill activates when you:
- Work with Linux systems or servers
- Configure networking or firewalls
- Write shell scripts or automation
- Troubleshoot system issues
- Tune performance or optimize resources
- Implement configuration management (Ansible, Chef, Puppet)
- Set up monitoring or logging
- Manage storage or file systems

## Next Steps

For your specific task:
1. Identify the systems engineering requirements
2. Review relevant patterns and best practices
3. Choose appropriate tools and automation approach
4. Implement with configuration management
5. Test thoroughly in non-production
6. Monitor and iterate based on feedback

---

**Total Resources:** 10 detailed guides covering all aspects of systems engineering
**Pattern Library:** 100+ production-tested patterns for Linux administration and automation
**Maintained by:** Systems Engineering team based on real-world production experience
