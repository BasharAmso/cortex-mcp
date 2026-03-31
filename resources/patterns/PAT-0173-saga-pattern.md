---
id: PAT-0173
name: Saga Pattern
category: patterns
tags: [saga, distributed-transactions, compensating-transactions, orchestration, choreography, consistency]
capabilities: [distributed-transaction-design, compensation-logic, saga-orchestration, saga-choreography]
useWhen:
  - implementing a business transaction that spans multiple services
  - replacing distributed two-phase commits with a more resilient pattern
  - designing compensating transactions for rollback across services
  - choosing between orchestration and choreography for multi-step workflows
  - maintaining data consistency without distributed locks
estimatedTokens: 680
relatedFragments: [PAT-0176, PAT-0059, SKL-0126, SKL-0332]
dependencies: []
synonyms: ["how to handle distributed transactions", "saga pattern explained", "orchestration vs choreography", "compensating transactions", "how to roll back across microservices", "eventual consistency in microservices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: advanced
owner: "cortex"
pillar: "architecture"
---

# Saga Pattern

A saga manages a business transaction that spans multiple services by breaking it into a sequence of local transactions. Each service performs its local transaction and publishes an event or message. If any step fails, previously completed steps are undone by compensating transactions.

## Why Not Distributed Transactions?

Traditional two-phase commit (2PC) locks resources across all participating services until the transaction completes. This creates tight coupling, reduces availability, and does not scale. Sagas achieve eventual consistency without distributed locks.

## Two Coordination Styles

### Choreography

Each service listens for events and decides independently what to do next. No central coordinator.

```
Order Service: Create order → emit OrderCreated
Payment Service: Hear OrderCreated → charge payment → emit PaymentCompleted
Inventory Service: Hear PaymentCompleted → reserve stock → emit StockReserved
Shipping Service: Hear StockReserved → schedule shipment → emit ShipmentScheduled
```

**Advantages:** Simple, loosely coupled, no single point of failure.
**Disadvantages:** Hard to understand the full flow (logic is spread across services), difficult to add new steps, risk of cyclic dependencies.

### Orchestration

A central orchestrator tells each service what to do and when. The orchestrator owns the saga's state machine.

```
Saga Orchestrator:
  1. Tell Order Service → create order
  2. Tell Payment Service → charge payment
  3. Tell Inventory Service → reserve stock
  4. Tell Shipping Service → schedule shipment
```

**Advantages:** Easy to understand the full flow (it is in one place), simpler to add steps, clearer error handling.
**Disadvantages:** The orchestrator is a single point of coordination (not failure if built correctly), risk of centralizing too much logic.

**Recommendation:** Use choreography for simple sagas (2-3 steps). Use orchestration for complex sagas (4+ steps) or when the flow has branching and conditional logic.

## Compensating Transactions

When a step fails, every previously completed step must be undone. Compensating transactions are the undo operations.

| Forward Step | Compensating Transaction |
|-------------|------------------------|
| Create order | Cancel order |
| Charge payment | Refund payment |
| Reserve inventory | Release inventory |
| Schedule shipment | Cancel shipment |

**Important:** Compensating transactions do not restore the original state perfectly. They are semantic undos. A refund is not the same as never having charged. Design compensations to leave the system in a consistent, acceptable state.

## Failure Handling

**Backward recovery:** On failure, execute compensating transactions for all completed steps in reverse order. This is the most common approach.

**Forward recovery:** On failure, retry the failed step (possibly with a delay or alternative approach). Use when the step is likely to succeed on retry (transient network issues) and the business logic supports it.

**Pivot transaction:** The point in a saga beyond which you commit to completing. Steps before the pivot can be compensated. Steps after the pivot are retried until they succeed. Example: after payment is captured, you retry shipping indefinitely rather than refunding.

## Design Rules

- **Make each step idempotent.** Steps may be retried due to message redelivery. Charging a payment twice must be prevented.
- **Store saga state persistently.** The orchestrator (or each service in choreography) must track which steps completed so it knows what to compensate on failure.
- **Handle partial failures gracefully.** What if the compensation itself fails? Log it, alert, and have a manual resolution process.
- **Set timeouts.** A saga that hangs indefinitely is worse than one that fails. Timeout and compensate.
- **Test compensation paths.** Teams test the happy path but rarely test rollbacks. Compensating transactions have bugs too.

## Saga vs Event Sourcing

Sagas coordinate transactions across services. Event sourcing records all state changes as events. They complement each other: event sourcing provides the audit trail and replay capability that makes saga debugging tractable. Use together when building complex, distributed business workflows.
