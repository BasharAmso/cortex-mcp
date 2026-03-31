---
id: PAT-0062
name: Order Lifecycle & State Machine
category: patterns
tags: [order, ecommerce, state-machine, fulfillment, shipping, returns, cancellation, order-management]
capabilities: [order-state-management, fulfillment-tracking, cancellation-handling, return-processing]
useWhen:
  - designing an order management system
  - implementing order status transitions and state machines
  - handling cancellations, returns, or refunds
  - building fulfillment and shipping tracking
  - modeling split orders or partial fulfillment
estimatedTokens: 650
relatedFragments: [SKL-0141, PAT-0061, PAT-0063, PAT-0066]
dependencies: []
synonyms: ["how to track order status", "order state machine for ecommerce", "how to handle returns and refunds", "order fulfillment workflow", "cancellation and refund flow", "how orders move through stages"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/saleor/saleor"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Order Lifecycle & State Machine

Orders move through well-defined states. A state machine prevents impossible transitions (e.g., shipping a cancelled order) and gives every team member a shared vocabulary for where an order stands.

## Core State Flow

```
Cart ──► Placed ──► Confirmed ──► Fulfilled ──► Shipped ──► Delivered
                       │              │              │
                       ▼              ▼              ▼
                   Cancelled    Partially       Return
                                Fulfilled      Requested
                                                  │
                                                  ▼
                                               Returned
                                                  │
                                                  ▼
                                               Refunded
```

## State Definitions

| State | Meaning | Allowed Transitions |
|-------|---------|-------------------|
| **Placed** | Payment captured, order created from cart | Confirmed, Cancelled |
| **Confirmed** | Warehouse acknowledged, picking started | Fulfilled, Partially Fulfilled, Cancelled |
| **Fulfilled** | All items packed and ready | Shipped |
| **Partially Fulfilled** | Some items shipped, others pending | Fulfilled (when remaining items ready), Shipped |
| **Shipped** | Carrier has the package, tracking active | Delivered, Return Requested |
| **Delivered** | Customer received the order | Return Requested |
| **Cancelled** | Order voided before shipment | Refunded |
| **Return Requested** | Customer initiated a return | Returned |
| **Returned** | Items received back at warehouse | Refunded |
| **Refunded** | Money returned to customer | Terminal state |

## Implementation Pattern

Model the state machine explicitly rather than using boolean flags:

```
// State machine transition table
const transitions = {
  placed:      ["confirmed", "cancelled"],
  confirmed:   ["fulfilled", "partially_fulfilled", "cancelled"],
  fulfilled:   ["shipped"],
  shipped:     ["delivered", "return_requested"],
  delivered:   ["return_requested"],
  cancelled:   ["refunded"],
  return_requested: ["returned"],
  returned:    ["refunded"],
  refunded:    []  // terminal
};

function transition(order, newState) {
  if (!transitions[order.status].includes(newState)) {
    throw new InvalidTransitionError(order.status, newState);
  }
  order.status = newState;
  order.statusHistory.push({ state: newState, at: now() });
  emit(`order.${newState}`, order);
}
```

## Key Design Decisions

**Event-driven side effects:** Each transition emits a domain event. Listeners handle downstream work:
- `order.placed` triggers inventory reservation
- `order.confirmed` triggers warehouse pick list
- `order.shipped` sends tracking email to customer
- `order.refunded` triggers payment reversal

**Status history:** Every transition is logged with timestamp and actor. This creates an audit trail and powers customer-facing order tracking.

**Split fulfillment:** When items ship from different warehouses or at different times, create fulfillment records per shipment rather than tracking at the order level. The order state reflects the aggregate.

## Cancellation Rules

| Condition | Allowed? |
|-----------|----------|
| Before confirmation | Yes, full refund |
| After confirmation, before shipment | Yes, but may incur restocking |
| After shipment | No direct cancel; use return flow |
| Partial cancellation | Cancel unshipped lines, fulfill the rest |

## Return Flow

1. Customer requests return (within policy window).
2. Merchant approves and issues return label.
3. Customer ships items back.
4. Warehouse receives and inspects items.
5. Refund issued (full or partial based on condition).

## Anti-Patterns

- Using boolean flags (`is_shipped`, `is_cancelled`) instead of a state machine
- Allowing direct jumps (e.g., placed to delivered) without intermediate states
- No status history (impossible to debug or audit)
- Coupling side effects directly into the transition instead of using events
- Allowing cancellation after shipment without a return flow
