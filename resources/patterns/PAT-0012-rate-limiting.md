---
id: PAT-0012
name: Rate Limiting
category: patterns
tags: [rate-limiting, throttling, api-protection, ddos, abuse-prevention, token-bucket, sliding-window]
capabilities: [rate-limit-design, throttle-implementation, abuse-prevention]
useWhen:
  - protecting APIs from abuse
  - implementing rate limiting
  - preventing DDoS
  - throttling requests per user
estimatedTokens: 500
relatedFragments: [PAT-0002, PAT-0003, SKL-0006]
dependencies: []
synonyms: ["protect my API from abuse", "add rate limiting", "too many requests error", "prevent spam on my API", "how to throttle API calls"]
lastUpdated: "2026-03-29"
difficulty: intermediate
sourceUrl: ""
---

# Rate Limiting

Protect your APIs from abuse, ensure fair usage, and keep infrastructure costs predictable.

## Algorithm Comparison

| Algorithm | How It Works | Best For |
|-----------|-------------|----------|
| **Fixed Window** | Count requests per time window (e.g., 100/min) | Simple APIs, low precision OK |
| **Sliding Window** | Rolling window avoids burst at boundary | Most production APIs |
| **Token Bucket** | Tokens refill at steady rate, requests consume tokens | Allowing controlled bursts |
| **Leaky Bucket** | Requests queue and process at fixed rate | Smoothing traffic spikes |

## Implementation (Express + Redis)

```typescript
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";

const redisClient = createClient({ url: process.env.REDIS_URL });

const limiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redisClient.sendCommand(args) }),
  windowMs: 60 * 1000,    // 1 minute
  max: 100,                // 100 requests per window
  standardHeaders: true,   // Return RateLimit-* headers
  keyGenerator: (req) => req.user?.id || req.ip,
});

app.use("/api/", limiter);
```

## Recommended Limits by Endpoint Type

| Endpoint | Limit | Why |
|----------|-------|-----|
| Login / signup | 5-10/min per IP | Prevent brute force |
| Password reset | 3/hour per email | Prevent email spam |
| General API | 100-1000/min per user | Fair usage |
| Webhooks (incoming) | 1000/min per source | Allow bursts |
| File upload | 10/min per user | Prevent storage abuse |

## Response Headers

Always include these headers so clients can self-throttle:

- `RateLimit-Limit` -- max requests allowed
- `RateLimit-Remaining` -- requests left in current window
- `RateLimit-Reset` -- seconds until window resets
- `Retry-After` -- seconds to wait (on 429 responses)

## Anti-Patterns

- Rate limiting by IP only (breaks for shared IPs / VPNs)
- No rate limiting on auth endpoints
- Returning 500 instead of 429 when limit is hit
- Applying the same limit to all endpoints regardless of cost
