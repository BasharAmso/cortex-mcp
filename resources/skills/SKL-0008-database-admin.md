---
id: SKL-0008
name: Database Administration
category: skills
tags: [database, schema, migrations, indexing, postgresql, optimization]
capabilities: [schema-design, migration-writing, query-optimization, indexing-strategy, data-modeling]
useWhen:
  - designing a database schema or data model
  - writing or reviewing database migrations
  - optimizing slow queries or adding indexes
  - planning data architecture for a new feature
estimatedTokens: 550
relatedFragments: [SKL-0006, SKL-0009, SKL-0010]
dependencies: []
synonyms: ["set up my database", "design database tables", "my queries are slow", "write a migration", "how should I store this data"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Database Administration

Design schemas, write migrations, optimize queries, and ensure data integrity. Every schema change is a migration. Every migration is reversible.

## Procedure

### 1. Confirm Database Stack

Read project decisions for database engine, ORM, and migration tool. Default: PostgreSQL + Prisma for Node.js projects.

### 2. Design Schema Before Writing Migrations

- List entities and relationships (1:N, M:N, self-referential)
- Design indexes against read/query patterns
- Use soft-delete for critical records
- Plan archiving for unbounded data growth

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

- Every migration has UP and DOWN sections — no exceptions
- Never rename columns directly — add new, migrate data, drop old
- Never add NOT NULL without DEFAULT to existing tables
- Large tables (1M+ rows): use `CREATE INDEX CONCURRENTLY`

### 5. Indexing Strategy

- Always index: foreign keys, WHERE clause columns, ORDER BY columns, UNIQUE constraints
- Composite indexes for multi-column filter queries
- Partial indexes for subset queries (e.g., `WHERE is_active = true`)

### 6. Query Optimization

- Use `EXPLAIN ANALYZE` to diagnose slow queries
- Fix N+1 problems with eager loading or JOINs
- Consider materialized views for expensive aggregations

### 7. Seed and Backup

- Create seed files for dev/test environments — never seed production
- Document backup config: provider, frequency, retention, restore procedure

## Key Constraints

- Never modify schema directly — always through migrations
- Never write a migration without a DOWN section
- Never run blocking index creation on large tables
- Always design schema against query patterns before writing migrations
