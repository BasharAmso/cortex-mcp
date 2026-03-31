---
id: SKL-0333
name: Service Discovery
category: skills
tags: [service-discovery, consul, health-checks, dns, load-balancing, service-registry]
capabilities: [service-registration, health-monitoring, dns-based-discovery, dynamic-routing]
useWhen:
  - services need to find each other without hardcoded addresses
  - implementing health checks for automatic failover
  - setting up DNS-based service resolution
  - designing dynamic load balancing across service instances
  - migrating from static configuration to dynamic discovery
estimatedTokens: 650
relatedFragments: [SKL-0126, SKL-0338, SKL-0331, PAT-0175]
dependencies: []
synonyms: ["how does service discovery work", "Consul vs Eureka vs DNS", "how services find each other", "service registry explained", "health check patterns", "dynamic service routing"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/hashicorp/consul"
difficulty: advanced
owner: "cortex"
pillar: "architecture"
---

# Service Discovery

Service discovery automates how services locate each other in dynamic environments where instances start, stop, and move across hosts. Without it, you hard-code IP addresses and manually update configuration on every deployment.

## Discovery Models

**Client-Side Discovery:** The client queries a service registry, gets a list of healthy instances, and selects one using a load-balancing algorithm. The client owns the routing decision. Used by Netflix Eureka and Consul with client libraries.

**Server-Side Discovery:** The client sends requests to a load balancer or router, which queries the registry and forwards the request. The client does not know about individual instances. Used by Kubernetes Services and AWS ELB.

Server-side discovery is simpler for clients but adds a network hop. Client-side discovery gives more control but requires each client to embed discovery logic.

## Service Registry

The registry is the central database of service instances and their locations. Every instance registers on startup and deregisters on shutdown.

| Component | Role |
|-----------|------|
| **Registration** | Instance announces its address, port, and metadata to the registry |
| **Heartbeat** | Instance periodically confirms it is still alive |
| **Deregistration** | Instance removes itself on graceful shutdown |
| **Expiry** | Registry removes instances that miss heartbeats |

**Self-registration** means the service registers itself (simple, but couples services to the registry). **Third-party registration** means a separate process (deployer, sidecar, orchestrator) handles registration, keeping services registry-agnostic.

## Health Checks

Health checks verify that a registered instance can actually serve traffic. Types:

- **HTTP** — registry calls a health endpoint (e.g., `/health`), expects 200
- **TCP** — registry opens a TCP connection to the service port
- **Script** — registry runs a custom script that exits 0 for healthy
- **TTL** — the service must actively report health within a time window

Use multiple check types. An HTTP check confirms the application is responding. A script check can verify database connectivity or disk space. Mark instances as critical (remove from routing) or warning (flag but keep routing) based on severity.

## DNS-Based Discovery

Consul and similar tools expose the service registry as DNS. Services query `orders.service.consul` and receive A records for healthy instances. This works with any language or framework since DNS is universal.

**Limitations:** DNS TTLs mean stale results during rapid scaling. DNS does not support advanced load balancing (weighted, least-connections). For fine-grained control, use the HTTP API instead of DNS.

## Integration with Load Balancing

Service discovery feeds into load balancing. The registry provides the list of healthy instances; the load balancer (client-side or server-side) distributes requests across them.

In Kubernetes, the built-in Service abstraction combines discovery and load balancing. Pods register automatically via labels, and kube-proxy routes traffic. For advanced routing (canary, weighted), add a service mesh like Istio.

## Key Design Decisions

- **Consistency model:** Consul uses Raft consensus (CP). Eureka uses eventual consistency (AP). Choose based on whether you prefer accuracy or availability during network partitions.
- **Multi-datacenter:** Consul supports cross-datacenter discovery natively. Plan for this early if you run in multiple regions.
- **Failure mode:** If the registry goes down, clients should cache the last known good state and continue operating with stale data rather than failing entirely.
