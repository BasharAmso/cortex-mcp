---
id: SKL-0064
name: Rate Limiting
category: skills
tags: [rate-limiting, redis, throttling, api-tiers, security, abuse-prevention, headers, token-bucket, sliding-window]
capabilities: [rate-limit-implementation, tier-design, redis-rate-limiting, abuse-protection]
useWhen:
  - protecting an API from abuse or accidental overload
  - implementing per-user or per-tier rate limits
  - adding rate limit headers to API responses
  - designing API pricing tiers with different usage limits
estimatedTokens: 550
relatedFragments: [SKL-0006, SKL-0062, PAT-0002]
dependencies: []
synonyms: ["how do I stop people from spamming my API", "my server keeps getting overloaded by one user", "how to add rate limiting to express", "what are those X-RateLimit headers", "how to throttle API requests per user"]
sourceUrl: "https://github.com/donnemartin/system-design-primer"
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Rate Limiting

Protect your API from abuse and overload by limiting how many requests each client can make. Without rate limiting, a single misbehaving client can take down your entire service.

## Algorithm Comparison

| Algorithm | How It Works | Best For |
|-----------|-------------|----------|
| Fixed window | Count resets every N seconds | Simple, low memory |
| Sliding window | Rolling time window tracks requests | Smoother limits, prevents boundary burst |
| Token bucket | Tokens refill at fixed rate, requests consume tokens | Burst-friendly, most flexible |
| Leaky bucket | Requests queue and drain at fixed rate | Strict constant-rate output |

**Recommendation:** Sliding window for most APIs. Token bucket when you want to allow short bursts.

## Procedure

### 1. Choose a Scope

| Scope | Key | Use Case |
|-------|-----|----------|
| IP-based | `req.ip` | Public APIs, unauthenticated routes |
| User-based | `req.user.id` | Authenticated APIs |
| API key | `req.headers['x-api-key']` | Developer platform / B2B |

### 2. Implement with Redis

```typescript
import { RateLimiterRedis } from 'rate-limiter-flexible';

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rl',
  points: 100,       // requests allowed
  duration: 60,      // per 60 seconds
  blockDuration: 0,  // don't block, just reject
});

app.use(async (req, res, next) => {
  try {
    const result = await limiter.consume(req.user?.id || req.ip);
    res.set('X-RateLimit-Limit', '100');
    res.set('X-RateLimit-Remaining', String(result.remainingPoints));
    res.set('X-RateLimit-Reset', String(Math.ceil(result.msBeforeNext / 1000)));
    next();
  } catch (rej) {
    res.set('Retry-After', String(Math.ceil(rej.msBeforeNext / 1000)));
    res.status(429).json({ error: 'Too many requests', retryAfter: Math.ceil(rej.msBeforeNext / 1000) });
  }
});
```

### 3. Design API Tiers

| Tier | Requests/min | Burst | Use Case |
|------|-------------|-------|----------|
| Free | 30 | 5 extra | Hobbyist / evaluation |
| Pro | 300 | 50 extra | Production apps |
| Enterprise | 3000 | 500 extra | High-volume integrations |

Store tier configuration in the database, not in code. Look up the user's tier on each request (cache it).

### 4. Required Response Headers

Always include on every response:
- `X-RateLimit-Limit` -- max requests in the window
- `X-RateLimit-Remaining` -- requests left in current window
- `X-RateLimit-Reset` -- seconds until the window resets
- `Retry-After` -- only on 429 responses

### 5. Client-Side Handling

Clients should implement exponential backoff:
1. Wait `Retry-After` seconds (or 1s if missing)
2. Retry with exponential backoff: 1s, 2s, 4s, 8s
3. Give up after 3-5 retries

## Key Constraints

- Never rate-limit health check endpoints
- Always return rate limit headers so clients can self-throttle
- Use Redis (not in-memory) for rate limiting in multi-instance deployments
- Log when users consistently hit limits -- it may indicate a UX or integration problem
- Under sustained overload, return HTTP 503 to shed load and allow client backoff
