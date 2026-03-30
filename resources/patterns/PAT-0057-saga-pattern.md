---
id: PAT-0057
name: Saga Pattern
category: patterns
tags: [saga, distributed-transactions, choreography, orchestration, compensating-transactions, microservices, failure-handling]
capabilities: [distributed-transaction-design, saga-orchestration, compensation-logic, failure-recovery]
useWhen:
  - a business operation spans multiple microservices that each own their data
  - you need distributed transactions without two-phase commit
  - designing failure handling and rollback across services
  - choosing between choreography and orchestration for multi-step workflows
  - implementing order creation, payment, and fulfillment across services
estimatedTokens: 700
relatedFragments: [SKL-0126, PAT-0056, PAT-0059, PAT-0054]
dependencies: []
synonyms: ["how to handle distributed transactions", "saga pattern for beginners", "choreography vs orchestration", "compensating transactions explained", "rollback across microservices", "multi-service transaction management"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/microservices-patterns/ftgo-application"
difficulty: advanced
owner: "cortex"
---

# Saga Pattern

A saga manages a business transaction that spans multiple services by breaking it into a sequence of local transactions, each with a compensating action for rollback.

## Why Sagas Exist

In a monolith, a single database transaction guarantees consistency. In microservices with database-per-service, there is no distributed transaction coordinator. Sagas replace ACID transactions with a sequence of local transactions coordinated through messaging.

## Two Coordination Styles

### Choreography (Event-Based)

Each service publishes events after completing its local transaction. Other services listen and react. No central coordinator.

```
Order Service → publishes OrderCreated
  → Payment Service listens, charges card, publishes PaymentCompleted
    → Inventory Service listens, reserves stock, publishes StockReserved
      → Shipping Service listens, creates shipment
```

**Pros:** Simple, decoupled, no single point of failure.
**Cons:** Hard to trace the full flow, implicit ordering, risk of cyclic dependencies.
**Best for:** Simple workflows with few steps (3-4 services).

### Orchestration (Command-Based)

A central orchestrator tells each service what to do and tracks the saga's state. The orchestrator sends commands and waits for replies.

```
CreateOrderSaga orchestrator:
  1. Send CreateOrder to Order Service → receive OrderCreated
  2. Send AuthorizePayment to Payment Service → receive PaymentAuthorized
  3. Send ReserveStock to Inventory Service → receive StockReserved
  4. Send CreateShipment to Shipping Service → receive ShipmentCreated
```

**Pros:** Clear flow, easy to trace and debug, centralized failure handling.
**Cons:** Orchestrator can become a bottleneck or single point of failure.
**Best for:** Complex workflows with many steps, conditional logic, or retry requirements.

## Compensating Transactions

When a step fails, the saga must undo previous steps. Each forward step has a matching compensating action:

| Forward Step | Compensating Action |
|-------------|-------------------|
| Create Order | Cancel Order |
| Authorize Payment | Refund Payment |
| Reserve Stock | Release Stock |
| Create Shipment | Cancel Shipment |

Compensating actions are not rollbacks. They are new transactions that semantically undo the effect. A refund is not the same as "payment never happened."

## Failure Handling

**Retriable steps** can be safely retried on transient failures (network timeout). Make them idempotent.

**Pivot transaction** is the go/no-go decision point. Before it: compensate on failure. After it: only retriable steps remain.

**Non-compensatable steps** (sending an email, charging a card) should be placed after the pivot transaction when possible.

## Saga State Machine

Model each saga as a state machine:

- **States:** `OrderPending`, `PaymentAuthorizing`, `StockReserving`, `Completed`, `Compensating`, `Failed`
- **Transitions:** triggered by success/failure responses from services
- **Persist state:** store the saga's current state so it survives crashes and restarts

## Design Guidelines

1. **Keep sagas short.** Fewer steps mean fewer failure scenarios and simpler compensation.
2. **Make every step idempotent.** Messages can be delivered more than once.
3. **Use correlation IDs.** Track which messages belong to which saga instance.
4. **Set timeouts.** If a service does not respond, trigger compensation after a reasonable wait.
5. **Limit retries.** After N failures, compensate rather than retrying indefinitely.
6. **Log everything.** Saga debugging requires visibility into every step and state transition.
