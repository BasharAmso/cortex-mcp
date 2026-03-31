---
id: PAT-0099
name: Queue Management Pattern
category: patterns
tags: [queues, waitlist, priority-handling, job-processing, estimated-wait, rate-limiting]
capabilities: [queue-design, priority-scheduling, wait-time-estimation, retry-handling]
useWhen:
  - building a customer waitlist or service queue
  - managing background job processing with priorities
  - estimating wait times for queued customers or tasks
  - implementing retry logic for failed operations
  - rate-limiting requests to prevent system overload
estimatedTokens: 650
relatedFragments: [PAT-0097, PAT-0098, SKL-0184]
dependencies: []
synonyms: ["how to build a waitlist for my business", "estimated wait time for customers", "how to handle background jobs", "priority queue for service requests", "how to manage a customer queue"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/taskforcesh/bullmq"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Pattern: Queue Management

Queues solve the mismatch between arrival rate and service rate. Whether it is customers waiting for a table, jobs waiting to be processed, or orders waiting to be fulfilled, the pattern is the same. BullMQ, a Redis-based queue for Node.js, demonstrates the core primitives.

## Queue Fundamentals

A queue has three components: **producers** (add items), **consumers** (process items), and the **queue itself** (stores items in order). BullMQ stores jobs in Redis with guaranteed persistence: if your server restarts, queued items survive. For customer-facing queues, the same principle applies: the waitlist must survive system restarts and staff shift changes.

## Priority Handling

Not all queue items are equal. BullMQ supports priority levels so higher-priority jobs process first. For a service business, map this to: **emergency/VIP** (priority 1, process immediately), **appointment** (priority 2, process at scheduled time), **walk-in** (priority 3, process in arrival order). The implementation is a sorted set: items with lower priority numbers get dequeued first. Within the same priority, maintain FIFO (first-in, first-out) order.

```
Priority 1: VIP / Emergency → processed first
Priority 2: Scheduled / Appointment → processed at designated time
Priority 3: Walk-in / Standard → processed in arrival order
```

## Estimated Wait Time

Customers tolerate waiting better when they know how long. Calculate estimated wait time as: `(position_in_queue * average_service_time) / number_of_active_servers`. Track rolling average service time over the last 20 completions (not all-time average, which masks trends). Update the estimate every time someone is served. Display it to customers via SMS or a status page. BullMQ's event system (`queueEvents.on('completed')`) provides the hooks to recalculate on each completion.

## Delayed and Scheduled Processing

BullMQ supports delayed jobs that enter the queue at a future time. For business queues: accept reservations that automatically join the active queue at the reservation time. For background tasks: schedule report generation for overnight, retry failed payments after 4 hours, or send follow-up emails 2 hours after service. The delayed job pattern separates "when to do it" from "what to do."

## Retry and Dead Letter Queues

Failed processing needs a strategy. BullMQ provides configurable retry with backoff (fixed delay, exponential, or custom). For a small business: if an order notification fails to send, retry 3 times with exponential backoff (1 min, 5 min, 25 min). After all retries fail, move the job to a **dead letter queue** for manual review. Monitor dead letter queue length: a growing DLQ indicates a systemic problem, not random failures.

## Rate Limiting

BullMQ includes built-in rate limiting to control throughput. Apply this to prevent overwhelming downstream systems: limit API calls to a payment processor (100/minute), limit email sends to stay within provider quotas, or limit order processing to match kitchen capacity. Rate limiting is the difference between "system slows gracefully under load" and "system crashes at peak hours."

## Parent-Child Job Flows

BullMQ's FlowProducer creates hierarchical jobs where a parent job spawns child jobs and waits for all children to complete. Map this to business workflows: "fulfill order" is the parent, with children "charge payment," "update inventory," "send confirmation," and "notify kitchen." The parent completes only when all children succeed. If a child fails, the parent can decide whether to retry, compensate, or escalate.

## Key Takeaways

- Use priority levels (VIP, appointment, walk-in) to ensure the right items process first within FIFO order
- Calculate estimated wait time from position, rolling average service time, and active server count
- Implement retry with exponential backoff and dead letter queues for failed operations
- Use rate limiting to match processing speed to downstream capacity
- Model complex workflows as parent-child job flows where the parent tracks overall completion
