---
id: SKL-0063
name: Queue Systems
category: skills
tags: [queues, bullmq, redis, async, jobs, workers, messaging]
capabilities: [queue-setup, job-pattern-design, dead-letter-handling, queue-monitoring]
useWhen:
  - processing tasks asynchronously outside the request cycle
  - setting up delayed or recurring jobs
  - handling high-throughput work that would overwhelm synchronous processing
  - building reliable job processing with retry and failure handling
estimatedTokens: 600
relatedFragments: [SKL-0006, SKL-0066, PAT-0002]
dependencies: []
synonyms: ["how do I process things in the background", "my API is too slow because it does too much work", "how to set up a job queue in node", "I need to run tasks after the request finishes", "what is a dead letter queue"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Queue Systems

Offload slow or unreliable work from request handlers into background queues for reliability and speed.

## When to Use a Queue

| Situation | Without Queue | With Queue |
|-----------|--------------|------------|
| Send welcome email on signup | Request blocks 2-3s | Response instant, email sent async |
| Generate PDF report | Request times out | Job queued, user notified on completion |
| Process webhook payload | Retry logic in handler | Auto-retry with backoff |
| Resize uploaded images | Memory spikes in API | Worker processes at controlled rate |

**Rule of thumb:** If it takes more than 200ms or can fail independently, queue it.

## Procedure

### 1. Choose a Queue Library

| Library | Best For | Notes |
|---------|----------|-------|
| BullMQ | Node.js production apps | Redis-backed, rich features, active maintenance |
| pg-boss | PostgreSQL-only stacks | No Redis needed, uses Postgres for storage |
| SQS | AWS-native apps | Managed, scales infinitely, higher latency |

**Recommendation:** BullMQ for most Node.js projects. It handles delayed, recurring, and priority jobs out of the box.

### 2. Set Up BullMQ

```typescript
// queue.ts -- define the queue
import { Queue } from 'bullmq';
const emailQueue = new Queue('emails', { connection: { host: 'localhost', port: 6379 } });

// producer -- add jobs from your API handler
await emailQueue.add('welcome', { userId: '123' }, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
});

// worker.ts -- process jobs in a separate process
import { Worker } from 'bullmq';
new Worker('emails', async (job) => {
  await sendWelcomeEmail(job.data.userId);
}, { connection: { host: 'localhost', port: 6379 } });
```

### 3. Job Patterns

- **Delayed jobs:** `delay: 60000` sends 1 minute after creation (drip emails, reminders)
- **Recurring jobs:** `repeat: { cron: '0 9 * * *' }` runs daily at 9 AM
- **Priority jobs:** `priority: 1` (lower number = higher priority)
- **Rate-limited jobs:** `limiter: { max: 10, duration: 1000 }` on the worker

### 4. Handle Failures

- Set `attempts` and `backoff` on every job -- never rely on single-attempt processing
- After max retries, jobs move to the **failed** state
- Set up a dead letter queue or event listener for failed jobs:

```typescript
worker.on('failed', (job, err) => {
  logger.error(`Job ${job.id} failed: ${err.message}`);
  // Alert, move to DLQ, or create incident
});
```

### 5. Monitor

- Use [Bull Board](https://github.com/felixmosh/bull-board) for a web dashboard
- Track metrics: queue depth, processing time, failure rate
- Alert when queue depth grows faster than processing rate

## Key Constraints

- Run workers in a separate process from your API server
- Never store large payloads in the job data -- store a reference (S3 key, database ID)
- Make every job handler idempotent -- jobs can be retried
- Always set a maximum number of attempts
