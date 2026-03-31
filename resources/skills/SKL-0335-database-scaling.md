---
id: SKL-0335
name: Database Scaling
category: skills
tags: [database-scaling, sharding, replication, read-replicas, partitioning, horizontal-scaling]
capabilities: [sharding-strategy, replication-design, read-write-splitting, partition-planning]
useWhen:
  - a single database cannot handle the read or write load
  - designing horizontal scaling for a relational database
  - choosing between sharding, replication, and partitioning
  - implementing read replicas to offload read-heavy workloads
  - planning data distribution across multiple database nodes
estimatedTokens: 680
relatedFragments: [SKL-0334, SKL-0343, SKL-0126, PAT-0056]
dependencies: []
synonyms: ["how to scale a database", "database sharding explained", "read replicas vs sharding", "horizontal vs vertical database scaling", "when to shard a database", "database partitioning strategies"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: advanced
owner: "cortex"
pillar: "architecture"
---

# Database Scaling

When a single database becomes a bottleneck, you scale vertically (bigger machine) or horizontally (more machines). Vertical scaling has a ceiling. Horizontal scaling is harder to implement but has no practical limit.

## Scaling Techniques

### Read Replicas

Create copies of the primary database that serve read queries. The primary handles all writes and replicates changes to replicas asynchronously.

- **Use when:** Read-to-write ratio is high (10:1 or more)
- **Trade-off:** Replication lag means replicas may serve slightly stale data
- **Design rule:** Route reads that tolerate staleness to replicas; route reads that need freshness to the primary

Most managed databases (RDS, Cloud SQL) make replica setup straightforward. Add replicas incrementally as read load grows.

### Partitioning

Split a large table into smaller pieces stored on the same database instance.

**Horizontal partitioning (range):** Split rows by a range key (e.g., orders from 2024 in one partition, 2025 in another). Good for time-series data. Risk of hot partitions if recent data gets disproportionate traffic.

**List partitioning:** Split rows by a discrete value (e.g., region = US, EU, APAC). Good when queries naturally filter by that value.

**Hash partitioning:** Apply a hash function to distribute rows evenly. Best for uniform distribution but makes range queries across partitions expensive.

### Sharding

Distribute data across multiple independent database instances. Each shard holds a subset of the data. Sharding is partitioning across machines.

**Shard key selection** is the most critical decision. A good shard key:
- Distributes data evenly (no hot shards)
- Keeps related data together (queries hit one shard, not all)
- Is immutable or rarely changes (resharding is painful)

Common shard keys: tenant ID (multi-tenant apps), user ID (social platforms), geographic region (location-based apps).

## Sharding Challenges

| Challenge | Description | Mitigation |
|-----------|------------|------------|
| **Cross-shard queries** | Queries that need data from multiple shards are slow and complex | Design schema so common queries hit a single shard |
| **Cross-shard joins** | Joins across shards require application-level assembly | Denormalize data or use materialized views |
| **Rebalancing** | Adding shards requires redistributing data | Use consistent hashing to minimize data movement |
| **Auto-increment IDs** | Each shard generates its own IDs, causing collisions | Use UUIDs, Snowflake IDs, or a central ID service |
| **Transactions** | ACID transactions across shards require distributed coordination | Avoid cross-shard transactions; use Saga pattern instead |

## Scaling Decision Ladder

Follow this order. Each step is simpler and less risky than the next:

1. **Optimize queries** — Add indexes, rewrite slow queries, fix N+1 problems
2. **Vertical scaling** — Upgrade CPU, RAM, storage
3. **Connection pooling** — Reduce connection overhead (PgBouncer, ProxySQL)
4. **Read replicas** — Offload reads to replicas
5. **Caching** — Cache hot data in Redis or Memcached
6. **Partitioning** — Split large tables within one instance
7. **Sharding** — Distribute data across multiple instances

Most applications never need to reach step 7. Exhaust simpler options first. Premature sharding adds enormous complexity for problems that caching and replicas can solve.

## Monitoring

Track these metrics to know when to scale: query latency (p50, p95, p99), connections in use vs max, replication lag, disk I/O utilization, and cache hit rate. Set alerts before you hit capacity, not after.
