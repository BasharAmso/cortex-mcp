---
id: PAT-0027
name: Soft Deletes
category: patterns
tags: [soft-deletes, data-retention, gdpr, filtered-indexes, cascade-behavior, deletion-patterns]
capabilities: [soft-delete-implementation, data-retention-policy, gdpr-compliance, filtered-query-design]
useWhen:
  - implementing a trash or recycle bin feature
  - need to preserve deleted data for audit or legal compliance
  - designing deletion behavior with GDPR or data retention requirements
  - existing hard deletes are causing problems with referential integrity
estimatedTokens: 600
relatedFragments: [PAT-0004, PAT-0026, SKL-0008, SKL-0006]
dependencies: []
synonyms: ["how to undo deleting a record from database", "soft delete vs hard delete how to implement", "how to handle gdpr delete requests in database", "how to filter out deleted records in queries", "trash feature for database records"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Soft Deletes

Implementation patterns for marking records as deleted without removing them from the database.

## Basic Implementation

```sql
-- Add to any table that needs soft deletes
ALTER TABLE posts ADD COLUMN deleted_at timestamptz DEFAULT NULL;

-- "Delete" a record
UPDATE posts SET deleted_at = now() WHERE id = 42;

-- Query active records
SELECT * FROM posts WHERE deleted_at IS NULL;

-- Query including deleted
SELECT * FROM posts;

-- Restore a record
UPDATE posts SET deleted_at = NULL WHERE id = 42;
```

**Why `deleted_at` over `is_deleted boolean`:** The timestamp tells you when it was deleted, which matters for retention policies and debugging.

## Filtered Indexes

Every query on a soft-delete table filters `WHERE deleted_at IS NULL`. Without a partial index, the database scans deleted rows too.

```sql
-- Index only active records (what 99% of queries need)
CREATE INDEX idx_posts_active ON posts(created_at)
  WHERE deleted_at IS NULL;

-- Unique constraint that only applies to active records
CREATE UNIQUE INDEX idx_users_email_active ON users(email)
  WHERE deleted_at IS NULL;
-- This allows a new user to register with an email that a deleted user had
```

## Cascade Behavior

When a parent record is soft-deleted, what happens to children?

| Strategy | Behavior | Use When |
|----------|----------|----------|
| **Cascade soft delete** | Soft-delete children too | Children are meaningless without parent |
| **Orphan** | Children remain active | Children have independent value |
| **Block** | Prevent parent deletion if active children exist | Children must be handled first |

```sql
-- Cascade soft delete via application logic
CREATE FUNCTION soft_delete_post(post_id integer) RETURNS void AS $$
BEGIN
  UPDATE comments SET deleted_at = now()
    WHERE post_id = soft_delete_post.post_id AND deleted_at IS NULL;
  UPDATE posts SET deleted_at = now()
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;
```

## Data Retention Policies

Soft-deleted records should not live forever. Define a retention window and purge regularly.

```sql
-- Hard delete records soft-deleted more than 90 days ago
DELETE FROM posts
WHERE deleted_at IS NOT NULL
  AND deleted_at < now() - interval '90 days';
```

**Schedule this as a recurring job** (pg_cron, application scheduler, or CI/CD pipeline).

| Data Type | Suggested Retention | Reason |
|-----------|-------------------|--------|
| User-generated content | 30-90 days | Undo window + support requests |
| User accounts | Per GDPR request timeline | Legal obligation |
| Financial records | 7 years | Tax and compliance |
| Audit logs | 1-3 years | Regulatory minimum |

## GDPR Considerations

Soft delete alone does NOT satisfy GDPR "right to erasure." GDPR requires actual data removal, not just hiding.

**Compliant approach:**
1. **Soft delete immediately** (hides from UI, stops processing)
2. **Anonymize personal data** within 30 days (replace PII with nulls or hashed values)
3. **Hard delete** after retention period expires

```sql
-- Anonymize instead of just soft-deleting
UPDATE users SET
  email = 'deleted-' || id || '@removed.local',
  name = 'Deleted User',
  phone = NULL,
  deleted_at = now()
WHERE id = 42;
```

## Anti-Patterns

- Forgetting `WHERE deleted_at IS NULL` in queries (leaks deleted data to users)
- No filtered indexes (performance degrades as deleted rows accumulate)
- Soft-deleting everything including ephemeral data (sessions, tokens, logs)
- No retention policy (table grows forever with dead rows)
- Assuming soft delete satisfies GDPR without anonymization
