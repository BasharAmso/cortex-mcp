---
id: PAT-0069
name: State Machine Patterns
category: patterns
tags: [state-machine, fsm, transitions, guards, actions, hierarchical-states, parallel-states, xstate, statecharts]
capabilities: [state-modeling, transition-design, guard-conditions, hierarchical-state-management, parallel-state-coordination]
useWhen:
  - modeling entities with distinct states and controlled transitions
  - replacing complex if/else chains with explicit state logic
  - designing UI flows with clear navigation rules
  - implementing order lifecycles, approval workflows, or auth flows
  - needing parallel or nested state behavior
estimatedTokens: 650
relatedFragments: [PAT-0068, PAT-0059, PAT-0070, SKL-0144]
dependencies: []
synonyms: ["how to manage different states in my app", "replace if else with state machine", "model order status transitions", "how do statecharts work", "track what state something is in", "prevent invalid state changes"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/statelyai/xstate"
difficulty: intermediate
owner: cortex
pillar: "automation"
---

# State Machine Patterns

A finite state machine (FSM) is a system that is always in exactly one state from a finite set, and transitions between states only through defined events. No impossible states. No forgotten edge cases.

## Why State Machines

The alternative is scattered boolean flags: `isLoading`, `isError`, `hasData`, `isRetrying`. With three flags you have 8 possible combinations, most of which are invalid (`isLoading && isError && hasData`). A state machine makes impossible states unrepresentable.

## Core Concepts

| Concept | Definition | Example |
|---------|-----------|---------|
| **State** | A distinct mode the system can be in | `idle`, `loading`, `success`, `error` |
| **Event** | Something that happens | `FETCH`, `RESOLVE`, `REJECT`, `RETRY` |
| **Transition** | Moving from one state to another in response to an event | `idle` + `FETCH` → `loading` |
| **Guard** | A boolean condition that must be true for a transition to fire | Only allow `SUBMIT` if `form.isValid` |
| **Action** | A side effect executed during a transition | Log analytics, send API request, update context |
| **Context** | Extended state data that travels with the machine | `{ retryCount: 2, errorMessage: "..." }` |

## Patterns

### 1. Flat FSM

The simplest form. A fixed set of states, a fixed set of transitions. No nesting, no parallelism.

```
idle  ──FETCH──▶  loading  ──RESOLVE──▶  success
                     │
                   REJECT
                     ▼
                   error  ──RETRY──▶  loading
```

**Use for:** Simple UI flows, toggle states, basic entity lifecycles.

### 2. Hierarchical (Nested) States

A state contains sub-states. The parent state handles shared behavior; child states handle specifics.

```
active
  ├── editing
  │     ├── draft
  │     └── reviewing
  └── published
```

When in `active.editing.draft`, the machine is simultaneously in `active`, `editing`, and `draft`. An event handled by `active` applies regardless of which child state is current.

**Use for:** Complex entity lifecycles (orders, documents), multi-step forms, game states.

### 3. Parallel States

Multiple state regions operate independently and simultaneously.

```
player
  ├── movement: idle | walking | running
  └── health: alive | injured | dead
```

The player can be `walking` AND `injured` at the same time. Each region transitions independently.

**Use for:** Entities with orthogonal concerns, dashboards with independent panels, multi-track workflows.

### 4. Guarded Transitions

Guards prevent transitions when conditions are not met:

```
checkout + PAY → processing    [guard: cart.total > 0]
checkout + PAY → (no transition) [guard fails: empty cart]
```

**Rules for guards:**
- Guards must be pure functions (no side effects)
- Guards should evaluate quickly (no async)
- When multiple transitions match an event, the first passing guard wins

## Transition Design Guidelines

1. **Enumerate all states first.** Draw the state diagram before writing code. If you cannot draw it, the logic is not clear enough.
2. **Make events descriptive.** Use `PAYMENT_RECEIVED` not `UPDATE`. Events describe what happened, not what to do.
3. **Put side effects in actions, not guards.** Guards decide; actions execute. Mixing them makes the machine unpredictable.
4. **Use context for variable data.** The state name represents the mode (`loading`); context holds the details (`{ attempt: 3 }`).
5. **Handle unexpected events explicitly.** Log or warn on events that have no transition in the current state. Silent drops hide bugs.

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Boolean flags instead of states | Impossible combinations | Replace with explicit state enum |
| Transitions without guards | Invalid state changes | Add guards for business rules |
| Side effects in guards | Non-deterministic behavior | Move side effects to actions |
| God state that handles everything | Unmanageable complexity | Break into hierarchical or parallel states |
| No error states | Failures are invisible | Add explicit error states with recovery transitions |
