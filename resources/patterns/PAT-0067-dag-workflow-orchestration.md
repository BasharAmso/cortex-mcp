---
id: PAT-0067
name: DAG Workflow Orchestration
category: patterns
tags: [dag, orchestration, scheduling, dependencies, parallel-execution, backfill, sensors, airflow, pipelines]
capabilities: [task-dependency-modeling, schedule-management, backfill-execution, parallel-orchestration, sensor-based-triggering]
useWhen:
  - orchestrating tasks with complex dependency chains
  - scheduling recurring data pipelines or batch jobs
  - implementing backfill for historical data processing
  - running parallel tasks that must converge before continuing
  - building sensor-based triggers that wait for external conditions
estimatedTokens: 650
relatedFragments: [PAT-0068, PAT-0059, PAT-0070, SKL-0144, PAT-0060]
dependencies: []
synonyms: ["how to schedule tasks with dependencies", "run jobs in the right order", "set up a data pipeline", "make tasks wait for each other", "how to backfill old data", "orchestrate batch jobs"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/apache/airflow"
difficulty: intermediate
owner: cortex
pillar: "automation"
---

# DAG Workflow Orchestration

A Directed Acyclic Graph (DAG) models tasks as nodes and dependencies as edges. No cycles allowed: task B depends on task A, but A can never depend back on B. This constraint makes execution order deterministic and debuggable.

## Core Concepts

| Concept | Definition | Example |
|---------|-----------|---------|
| **DAG** | A graph of tasks with directional, non-circular dependencies | Extract → Transform → Load |
| **Task** | A single unit of work within a DAG | Run a SQL query, call an API, move a file |
| **Dependency** | A directed edge from upstream to downstream task | "Transform" depends on "Extract" |
| **Schedule** | When the DAG runs (cron expression or interval) | `0 6 * * *` (daily at 6 AM) |
| **Backfill** | Running a DAG retroactively for past time intervals | Reprocess last 30 days after a bug fix |
| **Sensor** | A task that waits until an external condition is met | Wait for a file to appear in S3 |

## Dependency Patterns

1. **Linear chain.** A → B → C. Simple, sequential. Use when each step needs the previous step's output.

2. **Fan-out / fan-in.** A → [B, C, D] → E. Task A completes, then B, C, D run in parallel. Task E waits for all three. Use for independent processing steps that must converge.

3. **Conditional branching.** A → (if condition) → B else → C. Route execution based on task output or external state. Keep conditions explicit and testable.

4. **Dynamic task generation.** Generate tasks at runtime based on data (a list of files, a set of API endpoints). The DAG structure is determined when the run begins, not when the DAG is defined.

## Scheduling Rules

- **Idempotent tasks.** Every task must produce the same result when run multiple times for the same interval. This enables safe retries and backfills.
- **Execution date awareness.** Tasks should process data for their scheduled interval, not "now." Pass the execution date as a parameter so backfills work correctly.
- **Catchup control.** Decide upfront whether missed runs should be caught up. Enable catchup for data pipelines; disable for notification-type DAGs.
- **SLAs.** Set expected completion times. Alert when a task exceeds its SLA so operators can intervene before downstream consumers are affected.

## Task Design Guidelines

```
Good task:  Reads input → Processes → Writes output → Returns status
Bad task:   Does five things, passes huge data to the next task via internal state
```

- **Keep tasks atomic.** One task, one responsibility. If a task does extract AND transform, split it.
- **Use external storage for data.** Pass references (file paths, S3 keys, database table names) between tasks, not the data itself. Airflow's XCom is for metadata, not megabytes.
- **Set timeouts.** Every task needs an execution timeout. A hung task blocks all downstream work.
- **Retry with backoff.** Default: 3 retries, 5-minute delay. Adjust per task based on the failure mode (API rate limit vs. transient network error).

## Backfill Strategy

1. Mark tasks as idempotent (they overwrite, not append)
2. Define the time window to backfill (start date, end date)
3. Run with concurrency limits to avoid overwhelming downstream systems
4. Validate outputs after backfill completes (row counts, checksums)

## Sensor Best Practices

Sensors poll for a condition (file exists, partition available, API returns 200). They are powerful but dangerous:

- **Always set a timeout.** A sensor without a timeout blocks a worker slot indefinitely.
- **Use reschedule mode** instead of poke mode for long waits. Reschedule frees the worker between checks.
- **Prefer event-driven triggers** over sensors when possible. A webhook that starts a DAG is cheaper than a sensor polling every 60 seconds.
