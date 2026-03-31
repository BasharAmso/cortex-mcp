---
id: PAT-0210
name: Retry & Backoff Pattern
category: patterns
tags: [retry, exponential-backoff, jitter, dead-letter-queue, circuit-breaker, resilience]
capabilities: [retry-strategy-design, backoff-calculation, dead-letter-routing, circuit-breaker-implementation]
useWhen:
  - handling transient failures in API calls or network requests
  - implementing resilient job processing with retries
  - designing dead letter queues for permanently failed messages
  - adding circuit breakers to prevent cascading failures
  - choosing between retry strategies for different failure types
estimatedTokens: 650
relatedFragments: [PAT-0211, PAT-0212, SKL-0414, SKL-0411]
dependencies: []
synonyms: ["how to implement retry logic", "exponential backoff explained", "dead letter queue pattern", "circuit breaker tutorial", "how to handle transient failures", "jitter in retry logic"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/n8n-io/n8n"
difficulty: beginner
owner: "cortex"
pillar: "automation"
---

# Retry & Backoff Pattern

Strategies for handling transient failures gracefully with retries, backoff, and fallback mechanisms.

## Retry Strategy Decision Tree

```
Error occurs → Is it retryable?
  No (4xx except 429) → Fail immediately, log error
  Yes (5xx, timeout, 429) → Retry with backoff
    → Max retries exceeded? → Send to Dead Letter Queue
    → Circuit open? → Fail fast, skip retry
```

## Backoff Strategies

| Strategy | Formula | Use Case |
|----------|---------|----------|
| **Fixed** | `delay = 2s` | Simple cases, known recovery time |
| **Linear** | `delay = attempt * 2s` | Gradually increasing wait |
| **Exponential** | `delay = 2^attempt * base` | Standard for API calls |
| **Exponential + Jitter** | `delay = random(0, 2^attempt * base)` | Distributed systems (prevents thundering herd) |

Always add jitter (randomization) in distributed systems. Without jitter, all clients retry at the same time, overwhelming the recovering service.

```javascript
function backoffWithJitter(attempt, baseMs = 1000, maxMs = 30000) {
  const exponential = Math.min(maxMs, baseMs * Math.pow(2, attempt));
  return Math.random() * exponential;
}
```

## Dead Letter Queue (DLQ)

After max retries, move the failed message to a DLQ rather than dropping it. The DLQ preserves the original payload, error details, and retry count. Monitor DLQ depth as a health metric. Provide tooling to inspect, replay, or discard DLQ messages. Set retention policies to prevent unbounded growth.

## Circuit Breaker

A circuit breaker prevents repeated calls to a failing service. Three states: **Closed** (normal operation), **Open** (all calls fail fast), **Half-Open** (allow one test call). Track failure rate over a sliding window. Open the circuit when failures exceed a threshold (e.g., 50% over 10 requests). After a cooldown period, move to half-open and test.

| State | Behavior | Transition |
|-------|----------|------------|
| **Closed** | Requests pass through | Open when failure rate exceeds threshold |
| **Open** | Requests fail immediately | Half-Open after cooldown timer |
| **Half-Open** | One test request allowed | Closed on success, Open on failure |

## Guidelines

1. **Classify errors.** Only retry transient errors. Client errors (400, 401, 403, 404) will not succeed on retry.
2. **Set max retries.** 3-5 retries is typical. More than that delays processing without improving success rates.
3. **Cap backoff delay.** Use a maximum delay (30-60 seconds) to prevent absurdly long waits.
4. **Log every retry.** Include attempt number, delay, and error for debugging.
5. **Make operations idempotent.** Retries mean the same operation may execute multiple times.
