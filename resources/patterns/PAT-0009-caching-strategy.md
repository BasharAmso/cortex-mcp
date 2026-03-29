---
id: PAT-0009
name: Caching Strategy
category: patterns
tags: [caching, redis, cdn, performance, invalidation, in-memory]
capabilities: [cache-design, invalidation-strategy, performance-optimization]
useWhen:
  - adding caching to improve performance
  - choosing between CDN, Redis, and in-memory caching
  - designing a cache invalidation strategy
  - diagnosing stale data issues
estimatedTokens: 600
relatedFragments: [PAT-0004, PAT-0002]
dependencies: []
---

# Caching Strategy

When to cache, what to cache, and how to invalidate.

## Cache Types

| Type | Speed | Scope | Best For |
|------|-------|-------|----------|
| **In-memory** (Map, LRU) | Fastest | Single process | Config, computed values, hot data |
| **Redis / Memcached** | Fast | Shared across processes | Sessions, API responses, rate limits |
| **CDN** (Cloudflare, Vercel) | Fast for users | Global edge | Static assets, public API responses |
| **Browser cache** | Instant | Single user | Assets, GET responses |

## When to Cache

- Data that is read far more often than written
- Expensive computations or slow external API calls
- Data that can tolerate being slightly stale
- Static or rarely-changing content (assets, config)

## When NOT to Cache

- Data that must always be fresh (account balance, inventory count)
- Write-heavy data where invalidation cost exceeds cache benefit
- Small datasets that are fast to fetch anyway

## Invalidation Strategies

| Strategy | How It Works | Trade-off |
|----------|-------------|-----------|
| **TTL (Time-to-Live)** | Cache expires after N seconds | Simple but data can be stale until expiry |
| **Write-through** | Update cache on every write | Always fresh but slower writes |
| **Cache-aside** | App checks cache, falls back to DB, fills cache | Most common; risk of stale reads |
| **Event-driven** | Invalidate on specific events | Fresh data; requires event infrastructure |

## Cache Key Design

```
// Include all parameters that affect the result
cache_key = "users:list:page=2:sort=name:filter=active"

// Version the key format for safe deployments
cache_key = "v2:products:123"
```

## Anti-Patterns

- Caching without a TTL (stale data forever)
- Cache stampede: many requests miss cache simultaneously (use locking or stale-while-revalidate)
- Caching errors or empty results
- No monitoring on cache hit/miss ratio
