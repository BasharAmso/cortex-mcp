---
id: PAT-0070
name: Event-Driven Integration
category: patterns
tags: [event-driven, integration, fan-out, dead-letter-queue, schema-registry, eventual-consistency, pub-sub, decoupling]
capabilities: [service-decoupling, event-fan-out, dead-letter-handling, schema-evolution, eventual-consistency-patterns]
useWhen:
  - connecting services that should not call each other directly
  - implementing fan-out delivery to multiple consumers
  - designing systems that tolerate temporary service outages
  - managing event schema evolution across teams
  - handling failed event processing with dead letter queues
estimatedTokens: 650
relatedFragments: [PAT-0059, SKL-0144, SKL-0145, PAT-0067, PAT-0068]
dependencies: []
synonyms: ["how to connect services without tight coupling", "send events to multiple services at once", "what happens when a service is down", "how to handle failed messages", "keep services in sync without direct calls", "decouple my microservices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/n8n-io/n8n"
difficulty: intermediate
owner: cortex
pillar: "automation"
---

# Event-Driven Integration

Event-driven integration connects services through events instead of direct API calls. Service A publishes an event; services B, C, and D consume it independently. No service knows about the others. This decoupling makes systems resilient, scalable, and independently deployable.

## Core Concepts

| Concept | Definition | Why It Matters |
|---------|-----------|----------------|
| **Event** | An immutable record of something that happened | Services react to facts, not commands |
| **Publisher** | Service that emits events | Publishes without knowing who listens |
| **Consumer** | Service that processes events | Subscribes to events it cares about |
| **Broker** | Infrastructure that routes events (Kafka, RabbitMQ, SNS/SQS) | Decouples publishers from consumers |
| **Topic/Channel** | Logical grouping of related events | Consumers subscribe to topics, not publishers |

## Integration Patterns

### 1. Fan-Out

One event, many consumers. The order service publishes `order.placed`; inventory, shipping, and analytics each process it independently.

```
order.placed  ──▶  broker  ──▶  inventory-service
                          ──▶  shipping-service
                          ──▶  analytics-service
```

**Key rule:** Each consumer has its own subscription/queue. One consumer's failure does not affect the others.

### 2. Event Choreography

Services coordinate through events without a central orchestrator. Each service reacts to events and publishes its own:

```
order.placed → inventory.reserved → payment.charged → order.confirmed
```

**Trade-off:** Simple to start, but hard to debug when flows span many services. Add correlation IDs to trace event chains end-to-end.

### 3. Dead Letter Queues (DLQ)

When a consumer fails to process an event after all retries, the event goes to a dead letter queue instead of being lost.

**DLQ handling rules:**
- Monitor DLQ depth. A growing DLQ signals a systemic problem.
- Include the original event, error message, retry count, and timestamp.
- Build tooling to inspect, replay, or discard DLQ events.
- Set a retention period (7-30 days). Auto-archive or delete after that.

### 4. Schema Registry

As events evolve, producers and consumers must agree on the payload structure. A schema registry enforces compatibility:

- **Backward compatible:** New schema can read old events (add optional fields, never remove or rename)
- **Forward compatible:** Old schema can read new events (ignore unknown fields)
- **Full compatible:** Both directions work

**Rules:**
- Register every event schema before publishing
- Require compatibility checks in CI/CD (reject breaking changes)
- Version schemas explicitly: `order.placed.v1`, `order.placed.v2`

## Eventual Consistency

In event-driven systems, services are not immediately in sync. After `order.placed`, the inventory service may take seconds to update. This is eventual consistency.

**Managing it:**
1. **Accept it in the UI.** Show "processing" states instead of pretending the operation is instant.
2. **Use read-your-writes where needed.** After a user action, read from the service that performed the write, not a replica.
3. **Idempotent consumers.** Events may arrive out of order or be delivered twice. Consumers must handle both safely.
4. **Compensating events.** When something goes wrong, publish a corrective event (`order.cancelled`) rather than trying to "undo" in another service's database.

## Choosing a Broker

| Broker | Best For | Trade-off |
|--------|----------|-----------|
| **Kafka** | High throughput, event replay, stream processing | Operational complexity, steep learning curve |
| **RabbitMQ** | Task queues, request-reply, routing flexibility | No built-in replay, lower throughput at scale |
| **SNS/SQS** | AWS-native fan-out, serverless consumers | Vendor lock-in, limited replay |
| **Redis Streams** | Lightweight, already in your stack | Not durable at scale, limited consumer group features |

## Design Checklist

- [ ] Every event has a unique ID and correlation ID
- [ ] Publishers do not depend on consumer availability
- [ ] Each consumer has its own subscription (no shared queues across services)
- [ ] Dead letter queues are configured with monitoring and alerting
- [ ] Event schemas are versioned and backward-compatible
- [ ] Consumers are idempotent (safe to process the same event twice)
- [ ] Correlation IDs trace event chains across services
- [ ] Eventual consistency is communicated in the UI where applicable
