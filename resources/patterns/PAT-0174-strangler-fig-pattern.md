---
id: PAT-0174
name: Strangler Fig Pattern
category: patterns
tags: [strangler-fig, migration, legacy, incremental, routing, coexistence]
capabilities: [incremental-migration, traffic-routing, legacy-coexistence, migration-planning]
useWhen:
  - migrating from a legacy monolith to a new system incrementally
  - replacing functionality piece by piece without a big-bang rewrite
  - routing traffic between old and new implementations during migration
  - reducing risk of a full system rewrite by making changes gradually
  - designing coexistence between legacy and modern systems
estimatedTokens: 640
relatedFragments: [SKL-0126, SKL-0331, PAT-0175, SKL-0337]
dependencies: []
synonyms: ["how to migrate a legacy system", "incremental rewrite strategy", "strangler fig pattern explained", "how to replace a monolith gradually", "legacy migration without downtime", "big bang rewrite alternative"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Strangler Fig Pattern

Named after fig vines that gradually envelop and replace a host tree, this pattern incrementally replaces a legacy system by building new functionality alongside it and progressively routing traffic from old to new. No big-bang rewrite required.

## How It Works

1. **Identify** a piece of functionality in the legacy system to replace
2. **Build** the replacement in the new system
3. **Route** traffic for that functionality to the new implementation
4. **Verify** the new implementation works correctly in production
5. **Remove** the old code for that functionality
6. **Repeat** for the next piece

Over time, the new system handles more and more traffic until the legacy system can be decommissioned entirely.

## The Routing Layer

A routing layer (API gateway, reverse proxy, load balancer) sits in front of both systems and decides which one handles each request.

```
Client → Routing Layer → /api/orders → New System
                       → /api/users  → New System
                       → /api/reports → Legacy System (not migrated yet)
                       → /api/legacy  → Legacy System
```

The routing layer is the critical component. It must support:
- **Path-based routing** to send different endpoints to different backends
- **Percentage-based routing** for gradual traffic shifting (canary migration)
- **Feature flags** to toggle individual users or cohorts between old and new
- **Fallback** to the legacy system if the new system fails

## Migration Strategies

**Feature-by-feature:** Migrate one feature (e.g., user registration) completely before starting the next. Easiest to reason about. Each migration is a self-contained project.

**Layer-by-layer:** Replace the UI first (keeping the legacy backend), then replace backend services one at a time. Useful when the UI is the most painful part of the legacy system.

**Data-first:** Migrate the database to a new schema, keep both systems writing to it, then migrate application logic. Useful when the data model is the biggest constraint.

## Data Synchronization

During migration, both systems may need access to the same data. Options:

- **Shared database:** Both systems read from and write to the same database. Simple but couples systems at the data layer.
- **Change data capture (CDC):** Replicate changes from the legacy database to the new system's database in near-real-time. More complex but allows independent data models.
- **API integration:** The new system calls the legacy system's API for data it does not yet own. Simple for reads but adds latency.

Avoid dual-writes (writing to both databases from application code). They are fragile and lead to inconsistencies. Use CDC or a single source of truth.

## Measuring Progress

Track migration progress with concrete metrics:
- Percentage of traffic handled by the new system
- Number of endpoints/features migrated vs remaining
- Error rates in the new system vs legacy for equivalent functionality
- Legacy system dependencies remaining (databases, queues, shared libraries)

Set a target date for full decommission and track toward it. Without a deadline, migrations stall with both systems running indefinitely (the worst outcome).

## Common Pitfalls

- **Never finishing.** The last 20% of migration is the hardest. Commit to full decommission.
- **Migrating too much at once.** Small, frequent migrations are safer than large batches.
- **Ignoring the legacy system during migration.** It still needs maintenance, security patches, and bug fixes while it is running.
- **No rollback plan.** Every migration step should be reversible. If the new implementation has problems, route traffic back to legacy.
- **Data divergence.** If both systems modify data, synchronization bugs create subtle inconsistencies that are painful to debug.
