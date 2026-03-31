---
id: PAT-0175
name: Sidecar Pattern
category: patterns
tags: [sidecar, service-mesh, logging, proxy, auth-delegation, infrastructure-concerns]
capabilities: [sidecar-design, cross-cutting-concern-delegation, service-mesh-architecture, transparent-proxying]
useWhen:
  - offloading cross-cutting concerns from application code
  - implementing a service mesh for inter-service communication
  - adding logging, tracing, or metrics collection without modifying application code
  - delegating authentication and authorization to an infrastructure component
  - providing consistent infrastructure behavior across polyglot services
estimatedTokens: 650
relatedFragments: [SKL-0338, SKL-0333, SKL-0341, PAT-0172]
dependencies: []
synonyms: ["what is the sidecar pattern", "service mesh sidecar explained", "how to add logging without changing code", "sidecar proxy pattern", "Envoy sidecar explained", "cross-cutting concerns in microservices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/kubernetes/kubernetes"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Sidecar Pattern

The sidecar pattern deploys a helper process alongside each application instance. The sidecar handles infrastructure concerns (networking, observability, security) so the application focuses on business logic. Named after motorcycle sidecars, they share the lifecycle and network of the main container.

## How It Works

In Kubernetes, the sidecar runs as a second container in the same pod as the application. They share the same network namespace (communicate over localhost) and can share volumes.

```
Pod
├── Application Container (business logic)
└── Sidecar Container (infrastructure concerns)
    ├── Proxy (mTLS, routing, retries)
    ├── Log collector (structured log shipping)
    └── Config agent (dynamic configuration)
```

The application talks to localhost. The sidecar intercepts, enriches, or routes the traffic. The application does not know the sidecar exists.

## Common Use Cases

| Use Case | What the Sidecar Does |
|----------|----------------------|
| **Service mesh proxy** | Handles mTLS, load balancing, retries, circuit breaking, and traffic shaping (Envoy, Linkerd proxy) |
| **Log collection** | Reads log files from a shared volume and ships them to a log aggregator (Fluentd, Filebeat) |
| **Metrics collection** | Scrapes or receives metrics from the app and exposes them in a standard format (Prometheus exporter) |
| **Auth delegation** | Validates tokens, enforces policies, and attaches identity headers before requests reach the app |
| **Configuration** | Watches a config source and updates local files or environment when configuration changes |
| **Data sync** | Keeps a local cache or file in sync with a remote source |

## Service Mesh

A service mesh is the most prominent application of the sidecar pattern. Every service in the mesh gets a sidecar proxy (typically Envoy) that handles all inbound and outbound network traffic.

**Data plane:** The sidecars themselves, processing traffic between services.

**Control plane (Istio, Linkerd):** Configures all sidecars centrally. Define routing rules, security policies, and observability settings once; the control plane pushes them to every sidecar.

Benefits: mTLS everywhere without application changes, consistent retry and timeout policies, detailed traffic metrics and traces, canary deployments with traffic splitting.

## Design Principles

**Lifecycle coupling:** The sidecar starts and stops with the application. In Kubernetes, both containers are in the same pod. If the sidecar crashes, the pod restarts. Use init containers for setup that must complete before the application starts.

**Transparent proxying:** The application should not need to know the sidecar exists. Use iptables rules or Kubernetes network policies to redirect traffic through the sidecar automatically.

**Resource isolation:** Set separate CPU and memory limits for the sidecar. A misbehaving sidecar should not starve the application of resources.

**Minimal footprint:** Keep sidecars lightweight. Envoy is designed for low latency and small memory footprint. Avoid putting heavyweight processing in the sidecar.

## When to Use Sidecars

**Use when:**
- You have polyglot services (different languages) and want consistent infrastructure behavior
- Cross-cutting concerns would otherwise be duplicated across every service
- You want to update infrastructure behavior (retry policies, TLS versions) without redeploying applications
- The team maintaining infrastructure concerns is different from application teams

**Avoid when:**
- You have a single service or a simple monolith (the overhead is not justified)
- Latency from the extra network hop is unacceptable for your use case
- The operational complexity of managing sidecars exceeds the benefit

## Operational Considerations

- **Version management:** All sidecars in the mesh should run compatible versions. Use rolling updates to upgrade sidecars.
- **Debugging:** Requests pass through the sidecar, adding a layer to debug. Ensure sidecars emit logs and traces for their own operations.
- **Resource overhead:** Each sidecar consumes CPU and memory. At scale (thousands of pods), this adds up. Budget for it in capacity planning.
