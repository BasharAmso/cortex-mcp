---
id: SKL-0066
name: Background Jobs
category: skills
tags: [background-jobs, cron, scheduling, workers, retry, idempotency, monitoring]
capabilities: [cron-scheduling, worker-pattern-design, retry-strategy, idempotent-job-design]
useWhen:
  - scheduling recurring tasks like daily reports or cleanup
  - running work outside the request/response cycle
  - designing retry strategies for unreliable operations
  - ensuring jobs run exactly once even when retried
estimatedTokens: 550
relatedFragments: [SKL-0006, SKL-0063, PAT-0008]
dependencies: []
synonyms: ["how do I run something every night at midnight", "my app needs to do stuff on a schedule", "how to make sure a job doesn't run twice", "background task keeps failing and I don't know why", "how to retry failed jobs without duplicating work"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Background Jobs

Schedule and run tasks outside request handlers -- reliably, on time, and without duplicating work.

## Job Types

| Type | Example | Trigger |
|------|---------|---------|
| Cron / scheduled | Daily digest email, nightly data cleanup | Time-based schedule |
| Event-driven | Send receipt after payment, resize after upload | Queue message |
| One-off delayed | Reminder 24h after signup, trial expiry notice | Delayed queue job |

## Procedure

### 1. Choose a Scheduling Approach

| Approach | Pros | Cons |
|----------|------|------|
| BullMQ repeatable jobs | Code-defined, retry built in | Requires Redis |
| node-cron (in-process) | Zero dependencies | No persistence, skips if server restarts |
| OS cron + script | Battle-tested, no runtime dependency | Hard to monitor, no retry |
| Managed (Railway cron, AWS EventBridge) | Zero infra management | Vendor lock-in |

**Recommendation:** BullMQ repeatable jobs for apps already using Redis. Managed cron for simpler stacks.

### 2. Define Jobs Clearly

Every background job needs:
- **Name:** descriptive, unique (`daily-usage-report`, `expire-trials`)
- **Schedule:** cron expression or trigger event
- **Timeout:** maximum run time before the job is considered stuck
- **Retry policy:** attempts, backoff type, max delay

### 3. Make Every Job Idempotent

A job is idempotent if running it twice with the same input produces the same result. This is critical because jobs WILL be retried.

```typescript
// BAD: sends duplicate email on retry
async function handleJob(job) {
  await sendEmail(job.data.userId, 'Welcome!');
}

// GOOD: check before acting
async function handleJob(job) {
  const already = await db.emailLog.findUnique({
    where: { userId_type: { userId: job.data.userId, type: 'welcome' } }
  });
  if (already) return; // idempotent exit
  await sendEmail(job.data.userId, 'Welcome!');
  await db.emailLog.create({ data: { userId: job.data.userId, type: 'welcome' } });
}
```

### 4. Retry Strategy

| Failure Type | Strategy |
|-------------|----------|
| Transient (network timeout, 503) | Exponential backoff: 1s, 4s, 16s, 64s |
| Permanent (400, validation error) | Fail immediately, do not retry |
| Unknown | Retry 3 times with exponential backoff, then dead-letter |

```typescript
await queue.add('task', data, {
  attempts: 5,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnComplete: 1000,  // keep last 1000 completed for debugging
  removeOnFail: 5000,      // keep last 5000 failed
});
```

### 5. Monitor Failed Jobs

- Dashboard: Bull Board, Grafana, or custom admin page
- Alerts: notify on Slack/email when failure rate exceeds threshold
- Log every job start, completion, and failure with duration and job ID
- Review failed jobs weekly -- recurring failures indicate a code bug, not bad luck

## Key Constraints

- Never run cron jobs inside the API process in production
- Every job must be idempotent -- assume it will run more than once
- Set timeouts on all jobs to prevent stuck workers
- Store job results/status in the database, not just in the queue
- Never put large data in job payloads -- pass IDs and look up data in the handler
