---
id: PAT-0004
name: Database Design Patterns
category: patterns
tags: [database, schema, normalization, indexing, migrations, sql, postgresql, orm, partitioning, constraints]
capabilities: [schema-design, migration-strategy, indexing-decisions, data-modeling]
useWhen:
  - designing a database schema for a new feature or project
  - deciding on normalization level or indexing strategy
  - planning database migrations safely
  - choosing between SQL and NoSQL
  - optimizing PostgreSQL query performance
estimatedTokens: 650
relatedFragments: [PAT-0002, EX-0005]
dependencies: []
synonyms: ["how to set up my database tables", "how should I structure my data", "sql vs nosql which one to pick", "how to add indexes to make queries faster", "how do I plan my database schema"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/dhamaniasad/awesome-postgres"
difficulty: intermediate
owner: builder
pillar: "software-dev"
---

# Database Design Patterns

Practical PostgreSQL-grounded guidelines for schema design, migrations, indexing, and data modeling.

## Schema Design Principles

1. **Start in 3NF, denormalize with evidence.** Normalize by default. Only denormalize when you have query benchmarks proving a bottleneck.
2. **Every table gets a primary key.** Use `uuid` (via `gen_random_uuid()` in Postgres 13+) for distributed systems. Use `bigserial` for simplicity.
3. **Timestamp every row.** Add `created_at TIMESTAMPTZ DEFAULT now()` and `updated_at TIMESTAMPTZ` to every table. Use a trigger for `updated_at`.
4. **Enforce integrity with constraints.** Foreign keys, NOT NULL, CHECK constraints, and unique indexes. The database is your last line of defense.
5. **Use consistent naming.** `snake_case` for all identifiers. `user_id` not `userId`. Singular table names (`user` not `users`) or plural, but pick one and enforce it.

## PostgreSQL Indexing Guide

| Index Type | Use When |
|-----------|----------|
| **B-tree** (default) | Equality and range queries (`=`, `<`, `>`, `BETWEEN`) |
| **GIN** | Full-text search, JSONB containment (`@>`), array overlap |
| **GiST** | Geometric data, range types, nearest-neighbor |
| **Partial index** | Filtering a subset (`WHERE status = 'active'`) to reduce index size |
| **Composite index** | Multi-column filters; put most selective column first |

**Rule of thumb:** Index columns in WHERE, JOIN, and ORDER BY clauses. Skip indexes on tables under 1,000 rows or columns with very low cardinality.

## Migration Rules

1. **Forward-only in production.** Never edit a migration that has run. Create a new one.
2. **One concern per migration.** Separate schema changes from data migrations.
3. **Non-blocking changes first.** In PostgreSQL, `ADD COLUMN` (no default) is instant. `ADD COLUMN ... DEFAULT x` rewrites the table (pre-PG11). Use `CREATE INDEX CONCURRENTLY` to avoid locking.
4. **Test against production-sized data** before applying. A migration that takes 2ms on dev can lock a table for 20 minutes on prod.

## SQL vs NoSQL Decision Matrix

| Choose SQL (PostgreSQL) When | Choose NoSQL When |
|------------------------------|-------------------|
| Data has clear relationships and joins | Schema evolves rapidly per-document |
| ACID transactions are required | Read-heavy with simple key lookups |
| Complex reporting and aggregation needed | Horizontal write scaling is primary need |
| Data integrity is non-negotiable | Document-shaped data (nested JSON) |

**PostgreSQL covers many NoSQL use cases** with JSONB columns, full-text search, and pub/sub (LISTEN/NOTIFY). Evaluate before adding a second database.

## Anti-Patterns

- Storing comma-separated values in a single column (use a join table)
- EAV (Entity-Attribute-Value) when a proper schema would work
- Missing indexes on foreign key columns
- Running DDL changes without a migration tool
- Using ORM-generated queries without reviewing the SQL
