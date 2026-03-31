---
id: PAT-0068
name: Durable Execution
category: patterns
tags: [durable-execution, workflows, replay, retries, saga, compensation, versioning, temporal, long-running, resilience]
capabilities: [long-running-workflow-design, activity-retry-configuration, saga-compensation, deterministic-replay, workflow-versioning]
useWhen:
  - building workflows that must survive process crashes or restarts
  - implementing long-running business processes (minutes to months)
  - designing compensation logic for multi-step transactions
  - needing automatic retries with state preservation
  - versioning workflows that are already running in production
estimatedTokens: 700
relatedFragments: [PAT-0067, PAT-0069, PAT-0059, PAT-0070, SKL-0144]
dependencies: []
synonyms: ["how to make workflows survive crashes", "long running process that won't lose progress", "retry failed steps without starting over", "undo steps when something fails", "how to update workflows already running", "keep workflow state after restart"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/temporalio/temporal"
difficulty: intermediate
owner: cortex
pillar: "automation"
---

# Durable Execution

Durable execution guarantees that a workflow runs to completion even if servers crash, networks fail, or deployments happen mid-execution. The runtime persists every state transition, so a workflow can be replayed from its last checkpoint after any failure.

## How It Works

A durable execution runtime (like Temporal) separates **workflow logic** from **side effects**:

- **Workflow code** is deterministic. It makes decisions, branches, loops, and waits. It never calls external services directly.
- **Activities** perform side effects: API calls, database writes, file operations. Activities can fail and be retried independently.

The runtime records every completed activity result in an **event history**. On replay after a crash, the workflow code re-executes, but instead of re-running activities, it replays their recorded results. The workflow arrives at the same state without repeating work.

## Core Patterns

### 1. Activity Retries

Activities fail. Networks time out, services go down, rate limits hit. Configure retry policies per activity:

| Setting | Default | Guidance |
|---------|---------|----------|
| Max attempts | 3 | Increase for transient failures (API timeouts), decrease for permanent failures (invalid input) |
| Initial interval | 1s | Match the downstream service's expected recovery time |
| Backoff coefficient | 2.0 | Standard exponential backoff; reduce for time-sensitive operations |
| Max interval | 60s | Cap to prevent hour-long waits between retries |
| Non-retryable errors | [] | List error types that should fail immediately (validation errors, auth failures) |

### 2. Saga Compensation

When a multi-step process fails partway through, you need to undo completed steps. A saga tracks each completed action and its compensating action:

```
Step 1: Reserve inventory    → Compensate: Release inventory
Step 2: Charge payment       → Compensate: Refund payment
Step 3: Ship order           → Compensate: Cancel shipment

If Step 3 fails → run compensations in reverse: Refund → Release
```

**Rules for compensation:**
- Every action with a side effect needs a compensating action
- Compensations run in reverse order (last completed step first)
- Compensations must be idempotent (running twice is safe)
- Log every compensation for audit and debugging

### 3. Deterministic Replay

Workflow code must be deterministic. The same inputs must produce the same sequence of decisions every time. This means:

**Forbidden in workflow code:**
- Current time (`Date.now()`, `time.time()`) — use the workflow clock instead
- Random numbers — use a seeded generator from the runtime
- External calls — route through activities
- Global mutable state — use workflow-local variables
- Non-deterministic language features (unordered maps in iteration)

### 4. Workflow Versioning

Production workflows can run for months. When you need to change workflow logic while executions are in-flight:

1. **Patching** (preferred for small changes): Add a version check at the branch point. Old executions take the old path; new executions take the new path.
2. **Versioned task queues**: Route new executions to a new task queue running the updated worker code. Old executions finish on the old queue.
3. **Continue-as-new**: Complete the current execution and start a fresh one with updated logic. Use when history grows too large or a clean break is needed.

## When to Use Durable Execution

| Scenario | Use Durable Execution? | Why |
|----------|----------------------|-----|
| Multi-service transaction | Yes | Saga compensation handles partial failures |
| User signup (3 steps) | Maybe | Simple enough for retries; sagas if payment involved |
| Send a single email | No | A simple retry loop or queue is sufficient |
| Month-long approval process | Yes | Survives deployments and restarts over weeks |
| ETL pipeline | Depends | Use if steps are expensive; DAG orchestration may fit better |

## Design Checklist

- [ ] Workflow code contains zero side effects
- [ ] Every activity has a retry policy and timeout
- [ ] Multi-step mutations have compensating actions
- [ ] Workflow code passes determinism checks
- [ ] Versioning strategy is documented before first deployment
- [ ] Activity timeouts account for retry budgets
