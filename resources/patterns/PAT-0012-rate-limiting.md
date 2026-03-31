---
id: PAT-0012
name: Rate Limiting
category: patterns
tags: [rate-limiting, throttling, api-protection, ddos, abuse-prevention, token-bucket, sliding-window, middleware, security]
capabilities: [rate-limit-design, throttle-implementation, abuse-prevention]
useWhen:
  - protecting APIs from abuse or DDoS attacks
  - implementing rate limiting middleware for Express or Fastify
  - preventing brute-force attacks on authentication endpoints
  - throttling requests per user, API key, or IP
  - choosing between rate limiting algorithms
estimatedTokens: 550
relatedFragments: [PAT-0002, PAT-0003, PAT-0031, SKL-0006]
dependencies: []
synonyms: ["protect my API from abuse", "add rate limiting to my API", "too many requests error", "prevent spam on my API", "how to throttle API calls"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
pillar: "software-dev"
sourceUrl: "https://github.com/elsewhencode/project-guidelines"
---

# Rate Limiting

Protect your APIs from abuse, ensure fair usage, and keep infrastructure costs predictable. Rate limiting is a security and reliability requirement, not an optimization.

## Algorithm Comparison

| Algorithm | How It Works | Best For |
|-----------|-------------|----------|
| **Fixed Window** | Count requests per time window (e.g., 100/min) | Simple APIs, low precision OK |
| **Sliding Window** | Rolling window avoids burst at boundary | Most production APIs |
| **Token Bucket** | Tokens refill at steady rate, requests consume tokens | Allowing controlled bursts |
| **Leaky Bucket** | Requests queue and process at fixed rate | Smoothing traffic spikes |

## Implementation Steps

1. **Choose your key generator.** Rate limit by authenticated user ID when available, fall back to IP. IP-only limiting breaks for shared networks and VPNs.
2. **Pick limits per endpoint type.** Auth endpoints need tight limits. Read-heavy endpoints can be more generous. Apply different tiers.
3. **Use a shared store.** Redis or a distributed cache ensures limits hold across multiple server instances. In-memory stores reset on each deploy.
4. **Return standard headers.** Always include `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, and `Retry-After` on 429 responses so clients can self-throttle.
5. **Log and alert.** Track which users or IPs hit limits frequently. Sudden spikes indicate abuse or a misbehaving client.

## Recommended Limits by Endpoint Type

| Endpoint | Limit | Why |
|----------|-------|-----|
| Login / signup | 5-10/min per IP | Prevent brute force |
| Password reset | 3/hour per email | Prevent email spam |
| General API | 100-1000/min per user | Fair usage |
| Webhooks (incoming) | 1000/min per source | Allow bursts |
| File upload | 10/min per user | Prevent storage abuse |

## Express + Redis Example

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

## Anti-Patterns

- Rate limiting by IP only (breaks for shared IPs / VPNs)
- No rate limiting on auth endpoints (brute force vulnerability)
- Returning 500 instead of 429 when limit is hit
- Applying the same limit to all endpoints regardless of cost
- Using in-memory store in a multi-instance deployment
