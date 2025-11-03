---
description: Network engineering and architecture covering network design, TCP/IP protocols, routing and switching, load balancing, network security, SDN, service mesh networking, DNS management, VPN, and network troubleshooting. Use when designing networks, implementing network infrastructure, debugging connectivity, or securing network traffic. (project)
---
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 SKILL ACTIVATED: network-engineering
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


# Network Engineering

Comprehensive guide for network engineering covering network architecture, protocols, routing, load balancing, security, and modern networking technologies for building reliable and scalable network infrastructure.

## When to Use This Skill

Automatically activates when working on:
- Network architecture design and topology planning
- TCP/IP protocol configuration and troubleshooting
- Routing and switching configuration
- Load balancing strategies and implementation
- Network security and firewall configuration
- DNS management and resolution
- VPN setup and connectivity
- SDN (Software-Defined Networking) implementation
- Service mesh networking (Istio, Linkerd)
- Network performance optimization and troubleshooting

## Overview

**Purpose:** Enable teams to design, implement, and maintain robust network infrastructure from traditional networking to modern cloud-native and service mesh architectures.

**Scope:**
- Network architecture and design patterns
- TCP/IP protocols and fundamentals
- Routing and switching (BGP, OSPF, VLANs)
- Load balancing strategies
- Network security and firewalls
- DNS management and architecture
- Software-defined networking (SDN)
- Service mesh networking (Istio, Linkerd)
- VPN and secure connectivity
- Network troubleshooting and debugging

**This skill is for:**
- Network engineers designing and managing network infrastructure
- DevOps engineers implementing cloud networking
- Platform engineers building internal network platforms
- SREs optimizing network performance and reliability
- Security engineers securing network traffic

## Quick Start Checklist

When starting a network engineering task:

- [ ] Understand network requirements (bandwidth, latency, redundancy)
- [ ] Design network topology (hub-and-spoke, mesh, hybrid)
- [ ] Plan IP addressing and subnetting (CIDR blocks)
- [ ] Implement routing protocols (BGP for external, OSPF for internal)
- [ ] Configure load balancing and health checks
- [ ] Set up network security (firewalls, security groups, NACLs)
- [ ] Implement DNS architecture (public and private zones)
- [ ] Plan for high availability and disaster recovery
- [ ] Monitor network performance and latency
- [ ] Document network diagrams and configurations

## Core Concepts

### 1. OSI and TCP/IP Models

```
OSI Model                    TCP/IP Model
┌──────────────────┐        ┌──────────────────┐
│ 7. Application   │        │                   │
│ 6. Presentation  │        │  Application      │
│ 5. Session       │        │                   │
├──────────────────┤        ├──────────────────┤
│ 4. Transport     │        │  Transport        │
├──────────────────┤        ├──────────────────┤
│ 3. Network       │        │  Internet         │
├──────────────────┤        ├──────────────────┤
│ 2. Data Link     │        │                   │
│ 1. Physical      │        │  Network Access   │
└──────────────────┘        └──────────────────┘
```

### 2. Network Topologies

**Hub-and-Spoke:**
```
        ┌─────────┐
        │  Hub    │
        │ Router  │
        └────┬────┘
         ┌───┴───┬────────┐
         │       │        │
     ┌───▼──┐ ┌──▼───┐ ┌─▼────┐
     │Spoke1│ │Spoke2│ │Spoke3│
     └──────┘ └──────┘ └──────┘
```

**Mesh Topology:**
```
     ┌────┐──────┌────┐
     │ A  │      │ B  │
     └─┬──┘      └──┬─┘
       │  \    /   │
       │   \  /    │
       │    \/     │
       │    /\     │
       │   /  \    │
     ┌─▼──┐      ┌▼───┐
     │ C  │──────│ D  │
     └────┘      └────┘
```

### 3. Load Balancing Algorithms

```
Round Robin:       Request 1→Server 1
                   Request 2→Server 2
                   Request 3→Server 3
                   Request 4→Server 1 (repeat)

Least Connections: Route to server with fewest connections

IP Hash:          Hash(Client IP) → Consistent server

Weighted:         Server 1 (weight 3) gets 3x traffic
                  Server 2 (weight 1) gets 1x traffic
```

### 4. Network Security Zones

```
┌─────────────────────────────────────────────────────┐
│                   Internet                           │
└────────────────────┬────────────────────────────────┘
                     │
              ┌──────▼──────┐
              │   Firewall  │
              │   DMZ Zone  │
              └──────┬──────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼─────┐          ┌─────▼────┐
    │  Public  │          │ Private  │
    │  Subnet  │          │  Subnet  │
    │  (Web)   │          │  (DB)    │
    └──────────┘          └──────────┘
```

## Common Patterns

### Pattern 1: Multi-Tier Network Architecture

**Three-Tier Architecture:**
```
┌────────────────────────────────────────────┐
│         Internet Gateway/Load Balancer      │
│              (Public Subnet)                │
└─────────────────┬──────────────────────────┘
                  │
┌─────────────────▼──────────────────────────┐
│         Application Tier                    │
│        (Private Subnet - AZ-A, AZ-B)       │
└─────────────────┬──────────────────────────┘
                  │
┌─────────────────▼──────────────────────────┐
│         Database Tier                       │
│      (Isolated Private Subnet)              │
└────────────────────────────────────────────┘
```

**Implementation:**
- Public subnet: Internet-facing load balancers
- Application subnet: No direct internet access, NAT gateway for outbound
- Database subnet: No internet access, VPC endpoints only

### Pattern 2: Service Mesh Traffic Management

**Istio Traffic Routing:**
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews-route
spec:
  hosts:
    - reviews
  http:
    - match:
        - headers:
            user:
              exact: "qa-tester"
      route:
        - destination:
            host: reviews
            subset: v2
    - route:
        - destination:
            host: reviews
            subset: v1
          weight: 90
        - destination:
            host: reviews
            subset: v2
          weight: 10
```

### Pattern 3: DNS Failover and Routing

**Route 53 Failover Configuration:**
```
Primary:    app.example.com → us-east-1 (health checked)
Secondary:  app.example.com → us-west-2 (failover)
Geolocation: app.example.com → Nearest region
Weighted:    api.example.com → 70% to new, 30% to old
```

## Resource Files

For detailed guidance on specific topics, see:

### Network Fundamentals
- **[network-architecture.md](resources/network-architecture.md)** - Topologies, design patterns, segmentation, capacity planning
- **[tcp-ip-protocols.md](resources/tcp-ip-protocols.md)** - OSI model, TCP/UDP, IP addressing, subnetting, CIDR, packet flow

### Routing and Switching
- **[routing-switching.md](resources/routing-switching.md)** - BGP, OSPF, EIGRP, VLANs, trunking, spanning tree, route tables

### Load Balancing and DNS
- **[load-balancing.md](resources/load-balancing.md)** - Layer 4 vs Layer 7, algorithms, health checks, HAProxy, nginx, cloud LBs
- **[dns-management.md](resources/dns-management.md)** - DNS architecture, zone files, Route 53, Cloud DNS, DNSSEC, DNS security

### Network Security
- **[network-security.md](resources/network-security.md)** - Firewalls, security groups, NACLs, DDoS protection, WAF, IDS/IPS, zero trust

### Modern Networking
- **[sdn-networking.md](resources/sdn-networking.md)** - Software-defined networking, overlays, Calico, Cilium, network policies
- **[service-mesh-networking.md](resources/service-mesh-networking.md)** - Istio/Linkerd internals, traffic management, mTLS, circuit breaking

### Connectivity and Troubleshooting
- **[vpn-connectivity.md](resources/vpn-connectivity.md)** - Site-to-site VPN, client VPN, WireGuard, OpenVPN, cloud VPN services
- **[network-troubleshooting.md](resources/network-troubleshooting.md)** - Debugging tools, packet analysis, latency issues, connectivity problems

## Best Practices

### Network Design

1. **High Availability:**
   - Multiple availability zones
   - Redundant network paths
   - No single points of failure
   - Automatic failover mechanisms
   - Regular DR testing

2. **Security:**
   - Defense in depth (multiple security layers)
   - Principle of least privilege
   - Network segmentation
   - Encrypted traffic (TLS/mTLS)
   - Regular security audits

3. **Scalability:**
   - Plan for growth (IP space, bandwidth)
   - Horizontal scaling capability
   - Load balancer auto-scaling
   - CDN for static content
   - Regional distribution

### Network Operations

1. **Monitoring:**
   - Network latency metrics
   - Bandwidth utilization
   - Packet loss rates
   - Connection counts
   - Error rates and retries

2. **Documentation:**
   - Network diagrams (physical and logical)
   - IP address management (IPAM)
   - Routing table documentation
   - Firewall rule documentation
   - Change management process

3. **Testing:**
   - Load testing
   - Failover testing
   - Security testing
   - Performance benchmarking
   - Disaster recovery drills

## Anti-Patterns to Avoid

❌ **Flat network** - No segmentation, everything in one subnet
❌ **No redundancy** - Single point of failure
❌ **Overly complex routing** - Difficult to troubleshoot
❌ **Hard-coded IPs** - Use DNS instead
❌ **No monitoring** - Can't detect issues
❌ **Insufficient bandwidth** - Underprovisioned for peak load
❌ **No documentation** - Network changes undocumented
❌ **Open security groups** - 0.0.0.0/0 everywhere
❌ **Single region** - No geographic redundancy
❌ **No capacity planning** - Running out of IP addresses

## Common Tasks

### Task: Design VPC Network Architecture

1. Plan CIDR blocks (avoid overlap with on-prem)
2. Create multiple availability zones
3. Design subnet layout (public, private, isolated)
4. Configure routing tables
5. Set up NAT gateways for private subnets
6. Implement network ACLs and security groups
7. Set up VPC peering or transit gateway
8. Configure VPN or Direct Connect
9. Implement VPC endpoints for AWS services
10. Document network architecture

### Task: Implement Load Balancing

1. Choose load balancer type (ALB, NLB, GLB)
2. Configure target groups and health checks
3. Set up SSL/TLS termination
4. Configure routing rules
5. Implement sticky sessions if needed
6. Set up auto-scaling for targets
7. Configure logging and monitoring
8. Test failover behavior
9. Implement DDoS protection
10. Document configuration

### Task: Troubleshoot Network Connectivity

1. Verify source and destination reachability
2. Check security groups and firewall rules
3. Trace route to identify hop failures
4. Analyze packet captures
5. Check DNS resolution
6. Verify routing tables
7. Test from different locations
8. Check for asymmetric routing
9. Analyze latency and packet loss
10. Document root cause and resolution

## Integration Points

This skill integrates with:
- **platform-engineering**: Kubernetes networking, service mesh, ingress controllers
- **cloud-engineering**: VPC design, cloud networking services, hybrid cloud connectivity
- **devsecops**: Network security policies, encryption, zero trust architecture
- **sre**: Network monitoring, performance optimization, incident response
- **systems-engineering**: Firewall configuration, VPN setup, network debugging

## Triggers and Activation

This skill activates when you:
- Design network architecture or topology
- Configure routing protocols or switching
- Implement load balancers
- Troubleshoot connectivity issues
- Set up DNS or DHCP
- Configure VPNs or network security
- Work with SDN or service mesh
- Optimize network performance
- Plan IP addressing or subnetting

## Next Steps

For your specific network engineering task:
1. Identify requirements (bandwidth, latency, security)
2. Review relevant patterns and reference architectures
3. Design network topology and IP addressing
4. Implement with infrastructure as code
5. Test connectivity and failover
6. Monitor performance and optimize
7. Document architecture and procedures

---

**Total Resources:** 10 detailed guides covering all aspects of network engineering
**Pattern Library:** 100+ production-tested patterns for network architecture and operations
**Maintained by:** Network Engineering team based on real-world production experience
