---
id: PAT-0177
name: Bulkhead Pattern
category: patterns
tags: [bulkhead, resource-isolation, thread-pools, rate-limiting, fault-isolation, resilience]
capabilities: [resource-partitioning, failure-isolation, per-service-limits, resilience-design]
useWhen:
  - preventing one failing dependency from consuming all system resources
  - isolating resources (threads, connections, memory) per downstream service
  - implementing per-service rate limiting and resource budgets
  - designing systems where a failure in one area does not affect others
  - complementing circuit breakers with resource-level isolation
estimatedTokens: 640
relatedFragments: [PAT-0172, SKL-0126, SKL-0334, PAT-0175]
dependencies: []
synonyms: ["what is the bulkhead pattern", "resource isolation in microservices", "thread pool isolation explained", "how to prevent cascading resource exhaustion", "bulkhead vs circuit breaker", "fault isolation patterns"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Bulkhead Pattern

Named after watertight compartments in ship hulls that prevent a single breach from sinking the entire vessel, the bulkhead pattern isolates resources so that a failure in one part of the system does not exhaust resources needed by other parts.

## The Problem

Without isolation, all outbound calls share the same resource pool (thread pool, connection pool, memory). When one downstream service becomes slow, its calls consume more and more shared resources (threads wait, connections hang). Eventually, no resources remain for calls to healthy services, and the entire system degrades.

```
Shared thread pool (100 threads)
├── Payment Service (slow) → 95 threads waiting
├── Inventory Service (healthy) → 3 threads
├── Notification Service (healthy) → 2 threads
└── No threads left for new requests
```

## How Bulkheads Work

Assign dedicated resource pools to each downstream dependency. A slow or failing service can only consume its allocated resources.

```
Payment pool (30 threads)     → Payment Service (slow) → 30 threads waiting
Inventory pool (40 threads)   → Inventory Service → operating normally
Notification pool (30 threads) → Notification Service → operating normally
```

The payment service's problems are contained. Inventory and notification continue serving requests normally.

## Isolation Dimensions

| Resource | How to Isolate |
|----------|---------------|
| **Thread pools** | Separate thread pool per dependency. When the pool is full, reject new calls immediately instead of queuing. |
| **Connection pools** | Separate database or HTTP connection pools per dependency or tenant. Prevents one service from monopolizing connections. |
| **Semaphores** | Limit concurrent calls to a dependency without dedicating threads. Lighter weight than thread pools. |
| **Process/container isolation** | Run critical workloads in separate containers or processes. Strongest isolation but highest overhead. |
| **Queue isolation** | Separate message queues per priority or tenant. Prevents a flood of low-priority work from starving high-priority processing. |

## Sizing Pools

Right-sizing resource pools requires understanding each dependency's throughput and latency characteristics.

**Formula:** Pool size = Target throughput * Average latency. If you need 100 requests/second to the payment service and each call takes 200ms, you need at least 20 threads (100 * 0.2).

Add headroom for latency spikes (1.5x to 2x the calculated minimum). Monitor actual usage and adjust.

**When pools are full:** Reject excess calls immediately (fail-fast) or queue them with a short timeout. Do not let callers wait indefinitely — that defeats the purpose of isolation.

## Bulkhead + Circuit Breaker

Bulkheads and circuit breakers are complementary:

- **Bulkhead** limits how many resources a failing dependency can consume (resource isolation)
- **Circuit breaker** stops calling a dependency that is known to be failing (call prevention)

Use both together. The bulkhead contains damage while the circuit breaker is still in the Closed state (detecting the failure). Once the breaker trips to Open, it stops calls entirely and the bulkhead pool recovers.

## Implementation Approaches

**Library-level (Resilience4j, Hystrix):** Configure bulkheads in application code. Each outbound client gets its own thread pool or semaphore. Simple and portable.

**Infrastructure-level (service mesh):** The sidecar proxy enforces connection limits and concurrent request limits per upstream service. No application code changes needed.

**Kubernetes resource limits:** Set CPU and memory limits per container to prevent one workload from starving others on the same node.

## Key Design Rules

- **Size conservatively.** It is better for one dependency to reject excess calls than for it to consume resources needed by others.
- **Monitor pool utilization.** High utilization on a pool signals the dependency is slow and may need attention.
- **Fail fast when pools are full.** Return an error immediately rather than queuing indefinitely.
- **Apply at every integration point.** Every external call (database, API, cache, message broker) is a potential resource drain.
- **Combine with timeouts.** A bulkhead limits concurrency; a timeout limits how long each call can occupy a resource. Both are needed.
