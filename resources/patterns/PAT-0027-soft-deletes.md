---
id: PAT-0027
name: Soft Deletes
category: patterns
tags: [soft-deletes, data-retention, gdpr, filtered-indexes, cascade-behavior, deletion-patterns, compliance, postgres]
capabilities: [soft-delete-implementation, data-retention-policy, gdpr-compliance, filtered-query-design]
useWhen:
  - implementing a trash or recycle bin feature
  - need to preserve deleted data for audit or legal compliance
  - designing deletion behavior with GDPR or data retention requirements
  - existing hard deletes are causing problems with referential integrity
  - adding an undo or restore capability for user-facing deletes
estimatedTokens: 650
relatedFragments: [PAT-0004, PAT-0026, SKL-0008, SKL-0006]
dependencies: []
synonyms: ["how to undo deleting a record from database", "soft delete vs hard delete implementation", "how to handle gdpr delete requests", "how to filter out deleted records in queries", "trash or recycle bin for database records"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
sourceUrl: "https://github.com/dhamaniasad/awesome-postgres"
---

# Soft Deletes

Mark records as deleted without removing them from the database. PostgreSQL's partial indexes and RLS make this pattern efficient and safe.

## Basic Implementation

```sql
ALTER TABLE posts ADD COLUMN deleted_at timestamptz DEFAULT NULL;

-- "Delete" a record
UPDATE posts SET deleted_at = now() WHERE id = 42;

-- Query active records
SELECT * FROM posts WHERE deleted_at IS NULL;

-- Restore a record
UPDATE posts SET deleted_at = NULL WHERE id = 42;
```

**Why `deleted_at` over `is_deleted boolean`:** The timestamp tells you when it was deleted, which matters for retention policies and debugging.

## Filtered Indexes

Every query on a soft-delete table filters `WHERE deleted_at IS NULL`. Without a partial index, the database scans deleted rows too.

```sql
-- Index only active records
CREATE INDEX idx_posts_active ON posts(created_at)
  WHERE deleted_at IS NULL;

-- Unique constraint for active records only
CREATE UNIQUE INDEX idx_users_email_active ON users(email)
  WHERE deleted_at IS NULL;
```

## Cascade Behavior

| Strategy | Behavior | Use When |
|----------|----------|----------|
| **Cascade soft delete** | Soft-delete children too | Children are meaningless without parent |
| **Orphan** | Children remain active | Children have independent value |
| **Block** | Prevent parent deletion if active children exist | Children must be handled first |

## Data Retention Policies

Soft-deleted records should not live forever. Define a retention window and purge regularly.

```sql
-- Hard delete records soft-deleted more than 90 days ago
DELETE FROM posts
WHERE deleted_at IS NOT NULL AND deleted_at < now() - interval '90 days';
```

| Data Type | Suggested Retention | Reason |
|-----------|-------------------|--------|
| User-generated content | 30-90 days | Undo window + support requests |
| User accounts | Per GDPR request timeline | Legal obligation |
| Financial records | 7 years | Tax and compliance |
| Audit logs | 1-3 years | Regulatory minimum |

## GDPR Considerations

Soft delete alone does NOT satisfy GDPR "right to erasure." GDPR requires actual data removal.

**Compliant approach:**
1. **Soft delete immediately** (hides from UI, stops processing)
2. **Anonymize personal data** within 30 days (replace PII with nulls or hashed values)
3. **Hard delete** after retention period expires

```sql
UPDATE users SET
  email = 'deleted-' || id || '@removed.local',
  name = 'Deleted User', phone = NULL, deleted_at = now()
WHERE id = 42;
```

## Anti-Patterns

- Forgetting `WHERE deleted_at IS NULL` in queries (leaks deleted data)
- No filtered indexes (performance degrades as deleted rows accumulate)
- Soft-deleting ephemeral data (sessions, tokens, logs)
- No retention policy (table grows forever with dead rows)
- Assuming soft delete satisfies GDPR without anonymization
