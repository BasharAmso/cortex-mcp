---
id: PAT-0009
name: Caching Strategy
category: patterns
tags: [caching, redis, cdn, performance, invalidation, in-memory, cache-aside, write-through, cache-stampede, ttl]
capabilities: [cache-design, invalidation-strategy, performance-optimization]
useWhen:
  - adding caching to improve application performance
  - choosing between CDN, Redis, and in-memory caching
  - designing a cache invalidation strategy
  - diagnosing stale data or cache stampede issues
  - scaling a read-heavy service
estimatedTokens: 650
relatedFragments: [PAT-0004, PAT-0002]
dependencies: []
synonyms: ["how to make my app faster with caching", "should I use redis or memcached", "my app is slow how to speed it up", "how to cache api responses", "data is stale after I update it"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: advanced
owner: builder
pillar: "software-dev"
---

# Caching Strategy

When to cache, where to cache, and how to invalidate. "There are only two hard things in computer science: cache invalidation and naming things."

## Cache Hierarchy

Per the System Design Primer, caching occurs at every layer. Choose the right level:

| Layer | Tool | Latency | Scope | Best For |
|-------|------|---------|-------|----------|
| **Client/Browser** | HTTP cache headers | Instant | Single user | Static assets, GET responses |
| **CDN** | Cloudflare, CloudFront | ~10ms | Global edge | Public content, images, API responses |
| **Application (in-memory)** | LRU Map, node-cache | <1ms | Single process | Config, computed values, hot data |
| **Distributed cache** | Redis, Memcached | 1-5ms | Shared across processes | Sessions, API responses, rate limits |
| **Database cache** | Query cache, materialized views | 10-50ms | Database | Expensive aggregations, reports |

## Cache Update Strategies

| Strategy | Mechanism | Trade-off |
|----------|-----------|-----------|
| **Cache-aside (lazy)** | App checks cache, misses fall through to DB, result stored in cache | Most common; risk of thundering herd on cold start |
| **Write-through** | Every write updates DB and cache simultaneously | Always fresh; slower writes |
| **Write-behind (write-back)** | Write to cache immediately, async flush to DB | Fastest writes; risk of data loss on cache failure |
| **Refresh-ahead** | Proactively refresh cache before TTL expires | Reduces latency spikes; complex to implement |

**Default choice:** Cache-aside with TTL. Simple, effective, and easy to reason about.

## When to Cache vs. When Not To

| Cache | Do Not Cache |
|-------|-------------|
| Read-heavy data (10:1+ read:write ratio) | Data requiring real-time accuracy (balance, inventory) |
| Expensive computations or slow API calls | Write-heavy data where invalidation cost > cache benefit |
| Data tolerant of brief staleness | Small datasets that are already fast to query |
| Static or rarely-changing content | Security-sensitive per-user data without proper isolation |

## Cache Key Design

```
// Include all parameters that affect the result
"users:list:page=2:sort=name:filter=active"

// Version the key format for safe deployments
"v2:products:123:en-US"
```

## Preventing Cache Stampede

When a popular cache key expires, hundreds of concurrent requests can hit the database simultaneously. Mitigations:

1. **Locking:** First requester acquires a lock, others wait for the cache to be refilled
2. **Stale-while-revalidate:** Serve stale data while one request refreshes the cache in the background
3. **Jittered TTL:** Add random variance to TTL values to prevent synchronized expiration

## Anti-Patterns

- Caching without a TTL (stale data forever)
- Caching error responses or empty results
- No monitoring on cache hit/miss ratio
- Using cache as primary data store without persistence fallback
- Cache keys that don't include all relevant parameters (serving wrong data)
