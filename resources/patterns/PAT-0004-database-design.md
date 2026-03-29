---
id: PAT-0004
name: Database Design Patterns
category: patterns
tags: [database, schema, normalization, indexing, migrations, sql, orm]
capabilities: [schema-design, migration-strategy, indexing-decisions, data-modeling]
useWhen:
  - designing a database schema for a new feature or project
  - deciding on normalization level or indexing strategy
  - planning database migrations
  - choosing between SQL and NoSQL
estimatedTokens: 650
relatedFragments: [PAT-0002, EX-0005]
dependencies: []
---

# Database Design Patterns

Practical guidelines for designing schemas, writing migrations, and indexing.

## Schema Design Principles

1. **Start normalized, denormalize for performance.** Third normal form (3NF) is the default. Only denormalize when you have measured a query bottleneck.
2. **Every table needs a primary key.** Prefer UUIDs for distributed systems, auto-increment integers for simplicity.
3. **Add created_at and updated_at to every table.** You will need them for debugging.
4. **Use foreign keys.** They prevent orphaned data and document relationships.
5. **Name things consistently.** `user_id` not `userId`, `created_at` not `createdDate`. Pick a convention and stick to it.

## Indexing Guidelines

| Index When | Skip When |
|-----------|-----------|
| Column appears in WHERE clauses frequently | Table has fewer than 1,000 rows |
| Column is used in JOIN conditions | Column has very low cardinality (boolean) |
| Column is used in ORDER BY | Write-heavy table where index overhead matters |
| Unique constraint needed | You are guessing -- measure first |

**Composite indexes:** Column order matters. Put the most selective column first. An index on `(status, created_at)` helps queries filtering by status, but not queries filtering only by created_at.

## Migration Rules

1. **Migrations are forward-only in production.** Never edit a migration that has been applied.
2. **One concern per migration.** Don't mix schema changes with data migrations.
3. **Make migrations reversible** when possible (add column is reversible, drop column is not).
4. **Test migrations against a copy of production data** before applying.

## SQL vs NoSQL Decision

| Choose SQL When | Choose NoSQL When |
|----------------|-------------------|
| Data has clear relationships | Schema changes frequently |
| ACID transactions are required | Read-heavy with simple lookups |
| Complex queries and reporting needed | Horizontal scaling is primary concern |
| Data integrity is critical | Document-shaped data (JSON blobs) |

## Anti-Patterns

- Storing comma-separated values in a single column
- Using EAV (Entity-Attribute-Value) instead of proper schema
- Missing indexes on foreign key columns
- Running schema changes without a migration tool
