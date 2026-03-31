---
id: PAT-0059
name: Event-Driven Architecture
category: patterns
tags: [event-driven, pub-sub, event-bus, message-broker, idempotency, dead-letter-queue, event-schemas, eventual-consistency]
capabilities: [event-driven-design, async-communication, event-schema-design, message-reliability]
useWhen:
  - designing asynchronous communication between services or modules
  - building systems that react to state changes in real time
  - decoupling producers from consumers for independent scaling
  - implementing notification, audit, or analytics pipelines
  - choosing between event-driven and request-driven communication
estimatedTokens: 700
relatedFragments: [PAT-0056, PAT-0057, SKL-0126, PAT-0054]
dependencies: []
synonyms: ["event-driven design for beginners", "pub/sub pattern explained", "how to use message queues", "event bus architecture", "async messaging patterns", "when to use events vs API calls"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/microservices-patterns/ftgo-application"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Event-Driven Architecture

Event-driven architecture (EDA) structures systems around the production, detection, and reaction to events. Components communicate by emitting and subscribing to events rather than calling each other directly.

## Core Concepts

**Event:** An immutable record of something that happened. Named in past tense: `OrderPlaced`, `UserRegistered`, `PaymentFailed`. Events carry relevant data but do not command the receiver to do anything.

**Producer:** Emits events when state changes. Does not know or care who consumes them.

**Consumer:** Subscribes to events and reacts. Multiple consumers can independently process the same event.

**Event Bus / Message Broker:** Routes events from producers to consumers. Examples: Kafka, RabbitMQ, Amazon SNS/SQS, Redis Streams.

## Messaging Patterns

| Pattern | Description | Use Case |
|---------|------------|----------|
| **Pub/Sub** | Producer publishes to a topic; all subscribers receive the event | Notifications, audit logs, analytics |
| **Point-to-Point** | Message goes to exactly one consumer from a queue | Task distribution, work queues |
| **Event Streaming** | Ordered, replayable log of events (Kafka) | Event sourcing, change data capture, real-time pipelines |
| **Request/Reply** | Async request with a correlation ID and reply topic | When you need a response but want async decoupling |

## Event Schema Design

Define explicit schemas for events. Include:
- **Event type** and **version** for routing and compatibility
- **Timestamp** and **correlation ID** for tracing
- **Payload** with only the data consumers need (avoid leaking internal models)
- Use a schema registry to enforce compatibility and track evolution

**Schema evolution:** Add new fields with defaults (backward compatible). Never remove or rename fields without a version bump. Support both old and new consumers during migration.

## Idempotency

Messages can be delivered more than once (at-least-once delivery). Every consumer must handle duplicates safely.

**Strategies:**
- Store processed event IDs and skip duplicates
- Use natural idempotency (setting a value is naturally idempotent; incrementing is not)
- Design operations to produce the same result regardless of how many times they execute

## Ordering

Most brokers guarantee ordering within a partition or queue but not across them. Route related events to the same partition using a consistent key (e.g., order ID). Accept that events from different entities may arrive out of order.

## Dead Letter Queues

When a consumer fails to process an event after retries, route the event to a dead letter queue (DLQ). Monitor the DLQ, fix the consumer bug, and replay the failed events. Never silently drop events.

## Replay

Event streaming platforms (Kafka) retain events for a configurable period. Consumers can replay from any offset to rebuild state, backfill a new service, or recover from bugs. This is one of the most powerful capabilities of event-driven systems.

## Trade-Offs

| Benefit | Cost |
|---------|------|
| Loose coupling between services | Harder to trace request flows |
| Independent scaling of producers and consumers | Eventual consistency (reads may be stale) |
| Natural audit trail and replay capability | Schema management and versioning overhead |
| Resilience (consumers process when ready) | Debugging requires distributed tracing tooling |

## When to Use EDA

Use event-driven architecture when services need to react asynchronously, when you need to decouple teams and deployment schedules, or when workloads benefit from independent scaling. Avoid it for simple synchronous workflows where a direct API call is clearer and the added complexity is not justified.
