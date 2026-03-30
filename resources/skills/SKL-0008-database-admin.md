---
id: SKL-0008
name: Database Administration
category: skills
tags: [database, schema, migrations, indexing, postgresql, optimization, postgres, extensions, monitoring, backup]
capabilities: [schema-design, migration-writing, query-optimization, indexing-strategy, data-modeling, postgres-extensions]
useWhen:
  - designing a database schema or data model
  - writing or reviewing database migrations
  - optimizing slow queries or adding indexes
  - planning data architecture for a new feature
  - selecting PostgreSQL extensions or monitoring tools
estimatedTokens: 650
relatedFragments: [SKL-0006, SKL-0009, SKL-0010]
dependencies: []
synonyms: ["set up my database", "design database tables", "my queries are slow", "write a migration", "how should I store this data"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/dhamaniasad/awesome-postgres"
difficulty: intermediate
---

# Database Administration

Design schemas, write migrations, optimize queries, and ensure data integrity. Grounded in the awesome-postgres ecosystem covering high-availability (Patroni, Citus), monitoring (pganalyze, pg_stat_statements), extensions (PostGIS, pgvector, pg_cron), and optimization tools.

## PostgreSQL Ecosystem Defaults

| Concern | Tool | Notes |
|---------|------|-------|
| ORM (Node.js) | Prisma | Type-safe, auto-migration |
| GUI | pgAdmin, DBeaver | Free, cross-platform |
| Monitoring | pg_stat_statements + pganalyze | Query performance tracking |
| Full-text search | Built-in tsvector or pg_search | No external service needed |
| Vector/embeddings | pgvector | AI/RAG use cases |
| Job scheduling | pg_cron | In-database cron |
| Connection pooling | PgBouncer | Required at scale |

## Procedure

### 1. Confirm Database Stack

Read project decisions for database engine, ORM, and migration tool. Default: PostgreSQL + Prisma for Node.js projects.

### 2. Design Schema Before Writing Migrations

- List entities and relationships (1:N, M:N, self-referential)
- Design indexes against read/query patterns
- Use soft-delete for critical records
- Plan archiving for unbounded data growth
- Consider PostgreSQL-specific types (JSONB, arrays, enums, UUID)

### 3. Naming Conventions (PostgreSQL)

| Element | Convention | Example |
|---------|-----------|---------|
| Tables | snake_case, plural | `users`, `subscription_events` |
| Columns | snake_case | `created_at`, `stripe_customer_id` |
| Primary keys | `id` (UUID preferred) | `id UUID DEFAULT gen_random_uuid()` |
| Foreign keys | `[table_singular]_id` | `user_id`, `order_id` |
| Booleans | `is_` or `has_` prefix | `is_active`, `has_trial` |
| Timestamps | Always include | `created_at`, `updated_at` |

### 4. Write Migrations

- Every migration has UP and DOWN sections -- no exceptions
- Never rename columns directly -- add new, migrate data, drop old
- Never add NOT NULL without DEFAULT to existing tables
- Large tables (1M+ rows): use `CREATE INDEX CONCURRENTLY`

### 5. Indexing Strategy

| Index Type | When to use |
|-----------|-------------|
| B-tree (default) | Equality, range queries, sorting |
| GIN | JSONB fields, arrays, full-text search |
| GiST | Geometric data, PostGIS, range types |
| BRIN | Large append-only tables (time-series) |
| Partial | Subset queries (`WHERE is_active = true`) |
| Composite | Multi-column filter queries |

Always index: foreign keys, WHERE clause columns, ORDER BY columns, UNIQUE constraints.

### 6. Query Optimization

- Use `EXPLAIN ANALYZE` to diagnose slow queries
- Enable `pg_stat_statements` for production query monitoring
- Fix N+1 problems with eager loading or JOINs
- Consider materialized views for expensive aggregations
- Use connection pooling (PgBouncer) for high-concurrency apps

### 7. Backup and Recovery

- Automate backups with pg_dump (small DBs) or pg_basebackup (large DBs)
- Document: provider, frequency, retention period, restore procedure
- Test restore procedure at least once before going to production

## Key Constraints

- Never modify schema directly -- always through migrations
- Never write a migration without a DOWN section
- Never run blocking index creation on large tables
- Always design schema against query patterns before writing migrations
