---
id: PAT-0056
name: Event Sourcing & CQRS
category: patterns
tags: [event-sourcing, cqrs, event-store, projections, eventual-consistency, read-write-separation, snapshots]
capabilities: [event-sourcing-design, cqrs-implementation, projection-building, audit-trail-design]
useWhen:
  - needing a complete audit trail of all state changes
  - read and write workloads have very different scaling requirements
  - building complex domain logic where state transitions matter
  - designing systems that need temporal queries (what was the state at time X)
  - implementing undo/replay functionality
estimatedTokens: 700
relatedFragments: [PAT-0057, PAT-0059, SKL-0126, SKL-0125]
dependencies: []
synonyms: ["what is event sourcing", "CQRS for beginners", "event store explained", "how to separate reads and writes", "audit log with events", "event sourcing vs traditional database"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/microservices-patterns/ftgo-application"
difficulty: advanced
owner: "cortex"
---

# Event Sourcing & CQRS

Event sourcing stores state as a sequence of immutable events rather than as current values. CQRS separates the read model from the write model. They are independent patterns that complement each other.

## Event Sourcing

Instead of storing the current state of an entity (`balance: 500`), store every event that led to that state (`AccountOpened`, `MoneyDeposited(200)`, `MoneyDeposited(300)`). Current state is derived by replaying events.

**Event store rules:**
- Events are immutable. Never update or delete an event.
- Events are appended in order. The sequence defines the aggregate's history.
- Each event captures what happened and any data needed to reconstruct state.
- Event names use past tense: `OrderPlaced`, `ItemAddedToCart`, `PaymentProcessed`.

**Deriving state:** Load all events for an aggregate, replay them in order through the aggregate's event handler, and the result is the current state. This gives you a complete audit trail for free.

## Snapshots

For aggregates with many events, replaying from the beginning is slow. Periodically save a snapshot of the current state. To rebuild: load the latest snapshot, then replay only events after it. Common threshold: snapshot every 100 events.

## CQRS (Command Query Responsibility Segregation)

Separate the write side (commands) from the read side (queries). They use different models optimized for their purpose.

| Side | Purpose | Model | Optimization |
|------|---------|-------|-------------|
| **Write (Command)** | Validate business rules, produce events | Domain model with aggregates | Consistency and correctness |
| **Read (Query)** | Serve queries to clients | Denormalized projections | Query speed and flexibility |

The write model enforces invariants and produces events. The read model consumes those events and builds denormalized views (projections) optimized for specific queries.

## Projections

A projection subscribes to events and builds a read-optimized data structure. One event stream can feed multiple projections:

- `OrderPlaced` + `OrderShipped` events build an **Order History** projection (flat table for customer queries)
- The same events build a **Revenue Dashboard** projection (aggregated by day/product)
- The same events build a **Search Index** (Elasticsearch document)

Projections are disposable. If the schema changes, rebuild from the event store.

## Eventual Consistency

The read model updates asynchronously after the write model produces events. Reads may be slightly stale. This is the fundamental trade-off. Design the UI to tolerate it: after a user submits an order, redirect to a confirmation page rather than immediately querying the read model.

## When to Use Event Sourcing

**Good fit:** Complex domains with audit requirements, systems needing temporal queries, domains where the history of changes matters (finance, healthcare, legal).

**Poor fit:** Simple CRUD applications, systems where storage cost is critical (events accumulate), domains where "current state" is all that matters.

## When to Use CQRS (Without Event Sourcing)

CQRS is valuable even without event sourcing. If your reads and writes have different shapes, use separate models. A write model validates a complex order; a read model returns a flat order summary. You do not need an event store to benefit from this separation.

## Common Pitfalls

- **Not versioning events.** Event schemas evolve. Use upcasters to transform old events to new formats.
- **Too many projections.** Each projection adds complexity. Start with one or two.
- **Ignoring idempotency.** Event handlers must handle duplicate deliveries gracefully.
- **Fighting eventual consistency.** If you need immediate consistency, CQRS may not be the right fit for that part of the system.
