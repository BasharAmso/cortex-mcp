---
id: PAT-0023
name: Database Migrations Strategy
category: patterns
tags: [migrations, zero-downtime, rollback, schema-evolution, database-ops, deploy-safety]
capabilities: [migration-planning, zero-downtime-deploys, rollback-strategy, schema-evolution]
useWhen:
  - planning a schema change for a production database
  - need to add or remove a column without downtime
  - writing a data backfill migration
  - designing a rollback strategy for risky schema changes
estimatedTokens: 650
relatedFragments: [PAT-0004, PAT-0022, SKL-0008, SKL-0006]
dependencies: []
synonyms: ["how to change database without breaking production", "zero downtime database migration", "how to rollback a bad migration", "safe way to rename a column in production", "database migration best practices"]
lastUpdated: "2026-03-29"
difficulty: advanced
---

# Database Migrations Strategy

Safe schema evolution for production databases with zero downtime.

## Core Rules

1. **Migrations are immutable once deployed.** Never edit a migration that has run in production. Create a new one.
2. **One concern per migration.** Don't mix schema changes with data backfills.
3. **Every migration must be reversible** unless explicitly documented why not.
4. **Test against production-volume data** before deploying. A migration that takes 2ms on 100 rows can lock a table for minutes on 10M rows.

## Zero-Downtime Migration Pattern

Dangerous operations rewritten as safe multi-step deploys:

### Renaming a Column

```
-- Step 1 (migration): Add new column
ALTER TABLE users ADD COLUMN display_name text;

-- Step 2 (migration): Backfill data
UPDATE users SET display_name = username WHERE display_name IS NULL;

-- Step 3 (deploy): Application writes to BOTH columns

-- Step 4 (migration): Drop old column
ALTER TABLE users DROP COLUMN username;
```

### Adding a NOT NULL Column

```
-- WRONG: Locks table, fails if rows exist
ALTER TABLE orders ADD COLUMN region text NOT NULL;

-- RIGHT: Three-step approach
ALTER TABLE orders ADD COLUMN region text;           -- 1. Add nullable
UPDATE orders SET region = 'us-east' WHERE region IS NULL;  -- 2. Backfill
ALTER TABLE orders ALTER COLUMN region SET NOT NULL;  -- 3. Add constraint
```

## Safe vs Dangerous Operations

| Safe (no lock / fast) | Dangerous (table lock / slow) |
|----------------------|------------------------------|
| Add nullable column | Add column with default (PG < 11) |
| Add index CONCURRENTLY | Add index without CONCURRENTLY |
| Create new table | Drop column with dependent views |
| Add CHECK constraint NOT VALID | Rename column |
| Drop constraint | Change column type |

## Rollback Strategy

**Every migration should have a documented rollback plan:**

1. **Additive changes** (add column, add table): Rollback = drop in next migration. Low risk.
2. **Destructive changes** (drop column, change type): Rollback = restore from backup. Create a backup snapshot before deploying.
3. **Data migrations**: Rollback = reverse backfill script tested before deploy.

## Data Backfill Patterns

```sql
-- Batch backfill to avoid locking (process 1000 rows at a time)
WITH batch AS (
  SELECT id FROM orders
  WHERE region IS NULL
  LIMIT 1000
  FOR UPDATE SKIP LOCKED
)
UPDATE orders SET region = 'us-east'
WHERE id IN (SELECT id FROM batch);
-- Repeat until 0 rows affected
```

**Key rules for backfills:**
- Always process in batches (1,000-10,000 rows)
- Use `SKIP LOCKED` to avoid blocking other transactions
- Run during low-traffic periods
- Monitor lock wait times and table bloat

## Migration Testing Checklist

- [ ] Migration runs forward successfully on a production-sized dataset
- [ ] Migration rolls back cleanly
- [ ] Application works with both old and new schema during transition
- [ ] No exclusive locks held longer than 1 second
- [ ] Backfill completes within the maintenance window
