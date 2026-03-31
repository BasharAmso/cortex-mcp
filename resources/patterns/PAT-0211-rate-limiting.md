---
id: PAT-0211
name: Rate Limiting Pattern
category: patterns
tags: [rate-limiting, token-bucket, sliding-window, throttling, 429-handling, api-quotas]
capabilities: [rate-limit-design, token-bucket-implementation, sliding-window-tracking, client-side-throttling]
useWhen:
  - protecting an API from abuse or overload
  - implementing client-side rate limiting for API consumption
  - choosing between rate limiting algorithms
  - handling 429 Too Many Requests responses
  - designing per-user or per-key rate limits
estimatedTokens: 650
relatedFragments: [PAT-0210, PAT-0212, SKL-0414, SKL-0410]
dependencies: []
synonyms: ["how to implement rate limiting", "token bucket algorithm", "sliding window rate limiter", "how to handle 429 errors", "API throttling patterns", "per-user rate limits"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/n8n-io/n8n"
difficulty: intermediate
owner: "cortex"
pillar: "automation"
---

# Rate Limiting Pattern

Algorithms and strategies for controlling request rates on both server and client sides.

## Algorithm Comparison

| Algorithm | Accuracy | Memory | Burst Handling | Complexity |
|-----------|----------|--------|----------------|------------|
| **Fixed Window** | Low | Low | Allows 2x burst at boundary | Simple |
| **Sliding Window Log** | High | High | Precise | Medium |
| **Sliding Window Counter** | Good | Low | Good approximation | Medium |
| **Token Bucket** | Good | Low | Allows controlled bursts | Simple |
| **Leaky Bucket** | Good | Low | Smooths traffic evenly | Simple |

## Token Bucket

The most common algorithm. A bucket holds tokens, each request consumes one. Tokens are added at a fixed rate. If the bucket is empty, the request is rejected (or queued). Bucket capacity controls burst size. Refill rate controls sustained throughput.

```
Bucket: capacity=10, refill=5/second
t=0: 10 tokens → 10 requests → 0 tokens
t=1: 5 tokens refilled → 5 requests allowed
t=2: 5 tokens refilled → burst of 5 again
```

## Sliding Window Counter

Combines fixed window simplicity with sliding window accuracy. Track counts for the current and previous window. Weight the previous window count by the overlap fraction. This prevents the boundary-burst problem of fixed windows with minimal memory.

```
Previous window: 80 requests (in last 60s)
Current window: 20 requests (30s into current window)
Overlap: 50% of previous window
Effective count: 80 * 0.5 + 20 = 60
Limit: 100 → 40 requests remaining
```

## Server-Side Implementation

Apply rate limits per key: user ID, API key, IP address, or a combination. Return standard headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`. Return 429 status with `Retry-After` header. Store counters in Redis for distributed systems (single-instance apps can use in-memory stores).

## Client-Side Rate Limiting

When consuming external APIs, respect their rate limits proactively. Parse `Retry-After` and rate limit headers. Implement a request queue with configurable concurrency. Pre-calculate request timing to avoid hitting limits. Use leaky bucket on the client side for smooth request pacing.

```javascript
class RateLimiter {
  constructor(maxPerSecond) {
    this.interval = 1000 / maxPerSecond;
    this.lastRequest = 0;
  }
  async wait() {
    const now = Date.now();
    const delay = Math.max(0, this.lastRequest + this.interval - now);
    this.lastRequest = now + delay;
    if (delay > 0) await new Promise(r => setTimeout(r, delay));
  }
}
```

## Guidelines

1. **Communicate limits clearly.** Document rate limits in API docs and return them in response headers.
2. **Differentiate tiers.** Free users get lower limits than paid users. Internal services may have higher limits.
3. **Use Redis for distributed rate limiting.** In-memory counters do not work across multiple server instances.
4. **Graceful degradation.** Return cached or partial results instead of 429 when possible.
5. **Monitor and alert.** Track 429 rates per client to identify integration issues or abuse.
