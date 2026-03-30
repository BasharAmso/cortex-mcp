---
id: EX-0005
name: Database Migration Example
category: examples
tags: [database, migration, prisma, sql, schema, orm]
capabilities: [schema-migration, database-setup, model-definition]
useWhen:
  - creating a database migration for a new table
  - adding columns or indexes to an existing table
  - setting up Prisma or a similar ORM
estimatedTokens: 550
relatedFragments: [PAT-0004, EX-0004]
dependencies: []
synonyms: ["how to create a database migration", "how to add a new table to my database", "prisma migration example", "how to change my database schema", "how to add a column to an existing table"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Database Migration Example

Schema migration using Prisma (ORM) and equivalent raw SQL.

## Prisma Schema

```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(uuid())
  name      String   @db.VarChar(100)
  email     String   @unique
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
}

model Post {
  id        String   @id @default(uuid())
  title     String   @db.VarChar(200)
  content   String
  published Boolean  @default(false)
  authorId  String   @map("author_id")
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now()) @map("created_at")

  @@index([authorId])
  @@index([published, createdAt])
  @@map("posts")
}

enum Role {
  USER
  ADMIN
}
```

## Equivalent SQL Migration

```sql
CREATE TABLE users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  role       VARCHAR(20) NOT NULL DEFAULT 'USER',
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE posts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      VARCHAR(200) NOT NULL,
  content    TEXT NOT NULL,
  published  BOOLEAN NOT NULL DEFAULT false,
  author_id  UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_published ON posts(published, created_at);
```

## Key Points

- **UUID primary keys** for distributed-safe IDs
- **created_at / updated_at** on every table for auditability
- **Foreign key with index** on author_id for fast joins
- **Composite index** on (published, created_at) for common query pattern
- **@map directives** keep Prisma camelCase while DB uses snake_case
