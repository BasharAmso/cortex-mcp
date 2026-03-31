---
id: SKL-0126
name: Microservices Patterns
category: skills
tags: [microservices, distributed-systems, api-gateway, service-mesh, database-per-service, decomposition, inter-service-communication]
capabilities: [microservice-decomposition, service-communication-design, api-gateway-setup, distributed-data-management]
useWhen:
  - breaking a monolith into microservices
  - designing communication between services (sync vs async)
  - choosing a database strategy for distributed services
  - implementing an API gateway or service mesh
  - deciding on service boundaries and decomposition strategy
estimatedTokens: 700
relatedFragments: [PAT-0057, PAT-0056, PAT-0059, SKL-0125]
dependencies: []
synonyms: ["how to split my app into microservices", "microservices for beginners", "when to use microservices", "how services talk to each other", "API gateway explained", "database per service pattern"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/microservices-patterns/ftgo-application"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Microservices Patterns

Microservices decompose a system into independently deployable services, each owning its own data and business capability.

## Decomposition Strategies

| Strategy | How It Works | Best For |
|----------|-------------|----------|
| **By Business Capability** | One service per business function (Orders, Payments, Inventory) | Clear domain boundaries |
| **By Subdomain** | Align services with DDD bounded contexts | Complex domains with shared concepts |
| **Strangler Fig** | Incrementally replace monolith functionality with services | Legacy migration |

Keep services small enough to be owned by one team but large enough to represent a meaningful business capability. Avoid nano-services that create excessive network overhead.

## Inter-Service Communication

**Synchronous (Request/Response)**
- REST or gRPC calls between services
- Simple but creates temporal coupling (caller waits for response)
- Use for queries and operations needing immediate confirmation

**Asynchronous (Messaging)**
- Services communicate through a message broker (Kafka, RabbitMQ)
- Decouples sender from receiver in time and availability
- Use for commands that do not need an immediate response
- Enables event-driven patterns and better fault tolerance

## API Gateway

A single entry point that routes client requests to the appropriate service. Handles cross-cutting concerns: authentication, rate limiting, request aggregation, and protocol translation. Avoid putting business logic in the gateway.

**API Composition** queries multiple services and joins results for the client, avoiding chatty client-to-service calls.

## Database Per Service

Each service owns its data store. No service directly accesses another service's database. This enables independent deployment, technology choices per service, and fault isolation.

Trade-off: cross-service queries become harder. Solve with API Composition for reads and Sagas for distributed writes.

## Service Mesh

A dedicated infrastructure layer (Istio, Linkerd) that handles service-to-service communication transparently. Provides load balancing, mutual TLS, retries, circuit breaking, and observability without changing application code.

## Key Anti-Patterns

- **Distributed Monolith**: Services that must deploy together defeat the purpose
- **Shared Database**: Two services writing to the same tables creates hidden coupling
- **Synchronous Chains**: Service A calls B calls C calls D, and any failure cascades
- **No API Versioning**: Breaking changes in one service break all consumers

## When to Use Microservices

Start with a well-structured monolith. Migrate to microservices when you need independent deployment, team autonomy, or technology diversity. Microservices add complexity in operations, debugging, and data consistency. The organizational benefit (team independence) usually matters more than the technical benefit.
