---
id: PAT-0026
name: Data Modeling Patterns
category: patterns
tags: [data-modeling, normalization, denormalization, json-columns, audit-trails, polymorphic-associations, postgres, schema-design]
capabilities: [schema-design-decisions, json-column-strategy, audit-trail-design, polymorphic-modeling]
useWhen:
  - designing a new database schema and unsure about normalization level
  - deciding whether to use a JSON column or a separate table
  - need to track who changed what and when (audit trail)
  - modeling relationships where a record can belong to different types
  - choosing between event sourcing and simple audit logging
estimatedTokens: 700
relatedFragments: [PAT-0004, PAT-0027, SKL-0008, SKL-0006]
dependencies: []
synonyms: ["should I normalize or denormalize my database", "when to use json column in postgres", "how to track changes in database audit log", "how to model something that belongs to different tables", "database schema design best practices"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
pillar: "software-dev"
sourceUrl: "https://github.com/dhamaniasad/awesome-postgres"
---

# Data Modeling Patterns

Practical decisions for structuring your data in PostgreSQL. Leverage PostgreSQL's rich type system including jsonb, arrays, enums, and composite types.

## Normalization vs Denormalization

| Normalize (separate tables) When | Denormalize (flatten) When |
|----------------------------------|---------------------------|
| Data changes independently | Read performance is critical |
| Data integrity matters most | Data rarely changes after creation |
| Storage efficiency matters | Queries require many JOINs (5+) |
| You are unsure (safe default) | You have measured a JOIN bottleneck |

**Rule of thumb:** Start normalized (3NF). Denormalize only specific queries you have profiled and proven slow.

## JSON Columns: When They Work

```sql
-- GOOD use: flexible metadata that varies per record
ALTER TABLE products ADD COLUMN attributes jsonb DEFAULT '{}';

-- BAD use: data you query, filter, or join on frequently
-- If you write WHERE metadata->>'status' = 'active' often, it belongs in a column
```

| Use JSON When | Use Columns When |
|---------------|-----------------|
| Schema varies per record | Schema is consistent across records |
| Data is read as a blob | Data appears in WHERE, JOIN, ORDER BY |
| Third-party payloads (webhooks) | Data needs foreign key constraints |
| User preferences, settings | Data needs NOT NULL or CHECK constraints |

**Always index JSON fields you query:** `CREATE INDEX idx_products_color ON products USING GIN((attributes->'color'));`

## Polymorphic Associations

When a record (like a comment) can belong to different parent types (post, photo, video).

**Approach 1: Separate foreign keys (recommended)**
```sql
CREATE TABLE comments (
  id serial PRIMARY KEY,
  body text NOT NULL,
  post_id integer REFERENCES posts(id),
  photo_id integer REFERENCES photos(id),
  CHECK (num_nonnulls(post_id, photo_id) = 1)
);
```

**Approach 2: Type + ID (flexible but no FK constraint)**
```sql
CREATE TABLE comments (
  id serial PRIMARY KEY,
  body text NOT NULL,
  commentable_type text NOT NULL,
  commentable_id integer NOT NULL
);
```

**Prefer Approach 1** when you have a known set of parent types. Use Approach 2 only when the set is open-ended.

## Audit Trails

| Implementation | Pros | Cons |
|---------------|------|------|
| **Database triggers** | Catches all changes, even direct SQL | Hard to include user context |
| **Application middleware** | Easy to include who/why | Can be bypassed by direct queries |
| **Event sourcing** | Full state reconstruction | Most complex |

**Start with triggers or middleware.** Event sourcing is warranted only when you need full state history replay.

## Anti-Patterns

- Using JSON for data that is frequently filtered or joined
- No audit trail on tables with financial or PII data
- Polymorphic type+ID columns when parent types are fixed and few
- Denormalizing before measuring a performance problem
