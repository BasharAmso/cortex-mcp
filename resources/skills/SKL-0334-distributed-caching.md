---
id: SKL-0334
name: Distributed Caching
category: skills
tags: [caching, redis, cache-invalidation, eviction, consistency, cache-aside]
capabilities: [cache-strategy-design, invalidation-patterns, eviction-policy, cache-consistency]
useWhen:
  - reducing database load with a caching layer
  - choosing between cache-aside, write-through, and write-behind strategies
  - designing cache invalidation for data consistency
  - selecting eviction policies for memory-constrained caches
  - implementing distributed caching across multiple application instances
estimatedTokens: 670
relatedFragments: [SKL-0335, PAT-0172, SKL-0126]
dependencies: []
synonyms: ["how to use Redis as a cache", "cache invalidation strategies", "cache-aside vs write-through", "when to cache data", "cache eviction explained", "distributed cache design patterns"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/redis/redis"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Distributed Caching

A distributed cache stores frequently accessed data in memory across multiple nodes, reducing latency and database load. The hard part is not caching data — it is keeping cached data consistent with the source of truth.

## Caching Strategies

| Strategy | How It Works | Best For |
|----------|-------------|----------|
| **Cache-Aside** | App checks cache first. On miss, reads from DB and populates cache. | Read-heavy workloads, simple implementation |
| **Write-Through** | App writes to cache and DB simultaneously. Cache always has latest data. | Consistency-critical data, predictable reads |
| **Write-Behind** | App writes to cache; cache asynchronously flushes to DB. | Write-heavy workloads, acceptable eventual consistency |
| **Read-Through** | Cache itself fetches from DB on a miss (cache acts as a proxy). | Simplifies application code, consistent read path |

Cache-aside is the most common starting point. The application controls when data enters and leaves the cache. Write-through adds consistency at the cost of higher write latency.

## Invalidation Patterns

Cache invalidation is famously one of the two hard problems in computer science.

**TTL-based:** Every cached entry has a time-to-live. Simple but data can be stale until the TTL expires. Set TTLs based on how stale the data can be (seconds for prices, hours for product descriptions).

**Event-based:** When the source data changes, publish an invalidation event. Consumers delete or update the cached entry. More complex but keeps cache fresher.

**Version-based:** Tag cached entries with a version number. When data changes, increment the version. Reads with an old version fetch fresh data. Works well with cache-aside.

## Eviction Policies

When the cache is full, something must be removed:

- **LRU (Least Recently Used):** Evicts the entry not accessed for the longest time. Best general-purpose policy.
- **LFU (Least Frequently Used):** Evicts the entry accessed least often. Better for skewed access patterns.
- **TTL-based:** Entries expire after a set duration regardless of access.
- **Random:** Simple, surprisingly effective for uniform access patterns.

Redis supports all of these via `maxmemory-policy`. Default to `allkeys-lru` unless you have specific requirements.

## Consistency Challenges

**Cache stampede:** When a popular key expires, many concurrent requests hit the database simultaneously. Mitigate with lock-based loading (only one request fetches, others wait) or pre-warming the cache before expiry.

**Stale reads:** Between a database write and cache invalidation, reads return old data. Accept this as an inherent trade-off or use write-through to minimize the window.

**Dual-write inconsistency:** Writing to the database and cache as two separate operations can leave them out of sync if one fails. Prefer cache-aside (invalidate cache on write, let the next read repopulate) over trying to keep both in sync.

## Topology

**Single node:** Simple, no replication overhead. Acceptable for caching because losing the cache means slower reads, not data loss.

**Replicated (Redis Sentinel):** Primary handles writes, replicas handle reads. Provides high availability but adds replication lag.

**Clustered (Redis Cluster):** Data is sharded across multiple nodes. Scales horizontally for large datasets. More operational complexity.

## Key Design Rules

- Cache only what is expensive to recompute or fetch. Not everything needs caching.
- Set TTLs on every key. An unbounded cache eventually becomes a memory leak.
- Monitor hit rate. Below 80% hit rate means your caching strategy needs adjustment.
- Design the system to work without the cache (graceful degradation). The cache is an optimization, not a dependency.
