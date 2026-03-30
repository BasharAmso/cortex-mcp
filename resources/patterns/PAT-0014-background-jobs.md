---
id: PAT-0014
name: Background Jobs & Queues
category: patterns
tags: [background-jobs, queues, workers, bullmq, redis, async-processing, cron, scheduled-tasks, event-loop, delegation]
capabilities: [job-queue-design, worker-patterns, scheduled-tasks, retry-strategies]
useWhen:
  - processing tasks in the background outside the request cycle
  - setting up job queues with retry and backoff
  - scheduling recurring tasks like reports or cleanup
  - handling long-running operations without blocking the API
  - choosing between job queue technologies
estimatedTokens: 650
relatedFragments: [PAT-0009, PAT-0001, SKL-0006]
dependencies: []
synonyms: ["run tasks in the background", "set up a job queue", "process things asynchronously", "schedule a recurring task", "my API is too slow because of heavy processing"]
lastUpdated: "2026-03-29"
difficulty: advanced
owner: builder
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
---

# Background Jobs & Queues

Move expensive work out of the request cycle. If it takes more than 500ms or can fail independently, it belongs in a queue. This mirrors the prompt engineering principle of breaking complex tasks into discrete, manageable steps.

## When to Use a Job Queue

| Scenario | Why Background |
|----------|---------------|
| Sending emails | External service, can retry independently |
| Image/video processing | CPU-heavy, unpredictable duration |
| PDF generation | Slow, user can be notified when ready |
| Data imports/exports | Large datasets, may take minutes |
| Webhook delivery | External, needs retry with backoff |
| AI/LLM processing | Token generation is slow, results can be polled |

## Architecture

```
API Server --enqueue--> Queue (Redis) --dequeue--> Worker Process
                           |                          |
                           +-- Dashboard (Bull Board)  +-- Result Store / Callback
```

## Implementation Steps

1. **Separate producers from consumers.** The API server enqueues jobs. Worker processes consume them. Never run workers in the same process as the API.
2. **Use exponential backoff for retries.** Start at 1s, double each attempt, cap at 5 retries. Dead-letter permanently failed jobs for manual review.
3. **Set concurrency limits per worker.** Process 5-10 jobs concurrently per worker. Too many saturates CPU or memory. Too few wastes capacity.
4. **Monitor queue depth.** Alert when queue depth exceeds normal thresholds. Growing queues indicate workers are falling behind.
5. **Keep job payloads small.** Store data references (IDs, URLs), not data. Redis payloads over 1MB cause memory pressure.

## BullMQ Example (Node.js + Redis)

```typescript
import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL);

const emailQueue = new Queue("emails", { connection });

await emailQueue.add("welcome", { userId: "u_123", template: "welcome" }, {
  attempts: 3,
  backoff: { type: "exponential", delay: 1000 },
  removeOnComplete: 1000,
  removeOnFail: 5000,
});

const worker = new Worker("emails", async (job) => {
  const { userId, template } = job.data;
  await sendEmail(userId, template);
}, { connection, concurrency: 5 });
```

## Queue Technology Comparison

| Technology | Backed By | Best For |
|------------|-----------|----------|
| **BullMQ** | Redis | Node.js apps, great DX |
| **Celery** | Redis/RabbitMQ | Python apps |
| **SQS** | AWS | Serverless, managed |
| **Cloud Tasks** | GCP | Serverless, managed |
| **Inngest** | Managed | Event-driven, TypeScript |

## Anti-Patterns

- Processing heavy work inside the API request handler
- No retry logic or dead-letter queue for failed jobs
- Running workers in the same process as the API server
- No monitoring or alerting on queue depth
- Storing large payloads (>1MB) directly in Redis
