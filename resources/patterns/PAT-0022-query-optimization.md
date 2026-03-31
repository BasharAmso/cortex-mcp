---
id: PAT-0022
name: Query Optimization
category: patterns
tags: [query-optimization, n-plus-one, indexing, explain-analyze, pagination, sql-performance, postgres, database-tuning]
capabilities: [query-performance-tuning, index-strategy, pagination-design, query-plan-reading]
useWhen:
  - page load or API response is slow due to database queries
  - you see N+1 query patterns in your ORM logs
  - deciding between cursor-based and offset pagination
  - need to read and interpret EXPLAIN ANALYZE output
  - adding indexes to speed up slow queries
estimatedTokens: 700
relatedFragments: [PAT-0004, SKL-0008, SKL-0006]
dependencies: []
synonyms: ["my database queries are slow how to fix", "what is the n plus one problem", "how to use explain analyze in postgres", "cursor vs offset pagination which is better", "how to add indexes to speed up queries"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
pillar: "software-dev"
sourceUrl: "https://github.com/dhamaniasad/awesome-postgres"
---

# Query Optimization

Practical techniques for finding and fixing slow queries in PostgreSQL. The awesome-postgres ecosystem offers tools like pgHero, pg_stat_statements, and pgBadger for identifying bottlenecks.

## The N+1 Problem

The most common performance killer. You fetch a list, then query each item individually.

```sql
-- BAD: 1 query for posts + N queries for authors
SELECT * FROM posts;
SELECT * FROM users WHERE id = 1;
SELECT * FROM users WHERE id = 2;

-- GOOD: 2 queries total
SELECT * FROM posts;
SELECT * FROM users WHERE id IN (1, 2, 3, ...);

-- BEST: 1 query with JOIN
SELECT p.*, u.name as author_name
FROM posts p JOIN users u ON u.id = p.author_id;
```

**ORM fix:** Use eager loading (`include` in Prisma, `joinedload` in SQLAlchemy, `includes` in ActiveRecord).

## Reading EXPLAIN ANALYZE

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42 AND status = 'active';
```

| Look For | Meaning | Action |
|----------|---------|--------|
| Seq Scan | Full table scan | Add an index on the filtered column |
| Nested Loop (high rows) | Joining without index | Add index on join column |
| Sort (external merge) | Sorting spills to disk | Add index matching ORDER BY |
| Rows (estimated vs actual) far apart | Stale statistics | Run `ANALYZE table_name` |
| High `actual time` on one node | Bottleneck found | Focus optimization here |

## Indexing Strategy

1. **Index columns in WHERE, JOIN, and ORDER BY clauses** that appear in frequent queries.
2. **Composite index column order matters.** Most selective column first. `(status, created_at)` helps `WHERE status = 'active' ORDER BY created_at`, but not `WHERE created_at > ...` alone.
3. **Partial indexes save space.** `CREATE INDEX idx_active_orders ON orders(user_id) WHERE status = 'active'` only indexes rows you actually query.
4. **Don't over-index.** Each index slows writes. Measure before adding. Use pg_stat_user_indexes to find unused indexes.

## Common Performance Killers

- `SELECT *` when you need 3 columns (fetches unnecessary data)
- `LIKE '%search%'` (cannot use B-tree indexes; use full-text search instead)
- Missing indexes on foreign key columns
- `DISTINCT` or `GROUP BY` on unindexed columns
- Implicit type casting in WHERE clauses (`WHERE id = '42'` when id is integer)

## Pagination: Cursor vs Offset

| Aspect | Offset (`LIMIT 20 OFFSET 100`) | Cursor (`WHERE id > last_seen_id LIMIT 20`) |
|--------|------|--------|
| Implementation | Simple | Slightly more complex |
| Page 1,000 performance | Slow (scans 20,000 rows) | Fast (seeks directly) |
| Consistent with inserts | Rows can shift between pages | Stable results |
| Random page access | Yes | No (forward/backward only) |

**Rule of thumb:** Offset for admin dashboards with <10K rows. Cursor for feeds, infinite scroll, and anything user-facing with large datasets.
