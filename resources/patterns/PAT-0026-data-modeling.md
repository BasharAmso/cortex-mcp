---
id: PAT-0026
name: Data Modeling Patterns
category: patterns
tags: [data-modeling, normalization, denormalization, json-columns, audit-trails, polymorphic-associations]
capabilities: [schema-design-decisions, json-column-strategy, audit-trail-design, polymorphic-modeling]
useWhen:
  - designing a new database schema and unsure about normalization level
  - deciding whether to use a JSON column or a separate table
  - need to track who changed what and when (audit trail)
  - modeling relationships where a record can belong to different types
estimatedTokens: 650
relatedFragments: [PAT-0004, PAT-0027, SKL-0008, SKL-0006]
dependencies: []
synonyms: ["should i normalize or denormalize my database", "when to use json column in postgres", "how to track changes in database audit log", "how to model something that belongs to different tables", "soft delete vs hard delete which is better"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Data Modeling Patterns

Practical decisions for structuring your data in PostgreSQL.

## Normalization vs Denormalization

| Normalize (separate tables) When | Denormalize (flatten) When |
|----------------------------------|---------------------------|
| Data changes independently | Read performance is critical |
| Data integrity matters most | Data rarely changes after creation |
| Storage efficiency matters | Queries require many JOINs (5+) |
| You are unsure (safe default) | You have measured a JOIN bottleneck |

**Rule of thumb:** Start normalized (3NF). Denormalize only specific queries you have profiled and proven slow.

## JSON Columns: When They Work

PostgreSQL `jsonb` is powerful but not a replacement for proper schema.

```sql
-- GOOD use: flexible metadata that varies per record
ALTER TABLE products ADD COLUMN attributes jsonb DEFAULT '{}';
-- {"color": "red", "size": "XL", "material": "cotton"}

-- BAD use: data you query, filter, or join on frequently
-- If you write WHERE metadata->>'status' = 'active' often, it belongs in a column
```

| Use JSON When | Use Columns When |
|---------------|-----------------|
| Schema varies per record | Schema is consistent across records |
| Data is read as a blob | Data appears in WHERE, JOIN, ORDER BY |
| Third-party payloads (webhooks) | Data needs foreign key constraints |
| User preferences, settings | Data needs NOT NULL or CHECK constraints |

**Always index JSON fields you query:**
```sql
CREATE INDEX idx_products_color ON products USING GIN((attributes->'color'));
```

## Polymorphic Associations

When a record (like a comment) can belong to different parent types (post, photo, video).

**Approach 1: Separate foreign keys (recommended)**
```sql
CREATE TABLE comments (
  id serial PRIMARY KEY,
  body text NOT NULL,
  post_id integer REFERENCES posts(id),
  photo_id integer REFERENCES photos(id),
  -- Add a CHECK: exactly one parent must be set
  CHECK (num_nonnulls(post_id, photo_id) = 1)
);
```

**Approach 2: Type + ID (flexible but no FK constraint)**
```sql
CREATE TABLE comments (
  id serial PRIMARY KEY,
  body text NOT NULL,
  commentable_type text NOT NULL,  -- 'post', 'photo'
  commentable_id integer NOT NULL
);
-- No foreign key possible. Integrity enforced at application level.
```

**Prefer Approach 1** when you have a known set of parent types. Use Approach 2 only when the set of parent types is open-ended.

## Audit Trails

Track who changed what and when.

```sql
CREATE TABLE audit_log (
  id bigserial PRIMARY KEY,
  table_name text NOT NULL,
  record_id integer NOT NULL,
  action text NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data jsonb,
  new_data jsonb,
  changed_by integer REFERENCES users(id),
  changed_at timestamptz DEFAULT now()
);
```

**Implementation options:**
1. **Database triggers** - catch all changes, even direct SQL. Most reliable.
2. **Application middleware** - easier to include user context (who). More flexible.
3. **Event sourcing** - store events, derive state. Most powerful, most complex.

**Start with option 1 or 2.** Event sourcing is warranted only when you need full state reconstruction.

## Soft Deletes vs Hard Deletes

See [PAT-0027 Soft Deletes](PAT-0027-soft-deletes.md) for the full pattern. Quick decision guide:

| Hard Delete | Soft Delete |
|-------------|-------------|
| No legal retention requirement | Regulatory or audit requirements |
| Data has no recovery value | Users expect an "undo" or "trash" |
| Simpler queries and constraints | Need to preserve referential history |
