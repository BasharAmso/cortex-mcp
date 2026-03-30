---
id: PAT-0014
name: Background Jobs & Queues
category: patterns
tags: [background-jobs, queues, workers, bullmq, redis, async-processing, cron, scheduled-tasks]
capabilities: [job-queue-design, worker-patterns, scheduled-tasks, retry-strategies]
useWhen:
  - processing tasks in the background
  - setting up job queues
  - scheduling recurring tasks
  - handling long-running operations
estimatedTokens: 600
relatedFragments: [PAT-0009, PAT-0001, SKL-0006]
dependencies: []
synonyms: ["run tasks in the background", "set up a job queue", "process things asynchronously", "schedule a recurring task", "my API is too slow because of heavy processing"]
lastUpdated: "2026-03-29"
difficulty: advanced
sourceUrl: ""
---

# Background Jobs & Queues

Move expensive work out of the request cycle. If it takes more than 500ms or can fail independently, it belongs in a queue.

## When to Use a Job Queue

| Scenario | Why Background |
|----------|---------------|
| Sending emails | External service, can retry independently |
| Image/video processing | CPU-heavy, unpredictable duration |
| PDF generation | Slow, user can be notified when ready |
| Data imports/exports | Large datasets, may take minutes |
| Webhook delivery | External, needs retry with backoff |
| Analytics aggregation | Not time-sensitive, can batch |

## Architecture

```
API Server ──enqueue──> Queue (Redis) ──dequeue──> Worker Process
                           │                          │
                           └── Dashboard (Bull Board)  └── Result Store / Callback
```

## BullMQ Example (Node.js + Redis)

```typescript
import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL);

// Producer: enqueue from your API
const emailQueue = new Queue("emails", { connection });

await emailQueue.add("welcome", { userId: "u_123", template: "welcome" }, {
  attempts: 3,
  backoff: { type: "exponential", delay: 1000 },
  removeOnComplete: 1000,
  removeOnFail: 5000,
});

// Consumer: separate process
const worker = new Worker("emails", async (job) => {
  const { userId, template } = job.data;
  await sendEmail(userId, template);
}, {
  connection,
  concurrency: 5,
  limiter: { max: 10, duration: 1000 }, // 10 jobs/sec
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed: ${err.message}`);
});
```

## Retry Strategy

| Attempt | Delay | Total Wait |
|---------|-------|------------|
| 1st retry | 1s | 1s |
| 2nd retry | 4s | 5s |
| 3rd retry | 16s | 21s |
| 4th retry | 64s | ~1.5min |

Use exponential backoff. Cap at 5 retries for most jobs. Dead-letter failed jobs for manual review.

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
- Storing job payloads larger than 1MB in Redis
