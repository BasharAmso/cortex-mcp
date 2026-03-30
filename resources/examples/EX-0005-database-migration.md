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
sourceUrl: "https://github.com/prisma/prisma"
lastUpdated: "2026-03-30"
difficulty: beginner
owner: builder
---

# Database Migration Example

Schema migration using Prisma ORM, following the official Prisma patterns for model definitions, relations, and type-safe client usage.

## Prisma Schema

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client"
}

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

## Type-Safe Client Usage

```typescript
// Prisma generates fully typed client from the schema
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

// Create with relation
const user = await prisma.user.create({
  data: { name: "Ada", email: "ada@example.com", role: "ADMIN" },
});

// Query with included relations (type-safe)
const usersWithPosts = await prisma.user.findMany({
  include: { posts: true },
});

// Filtered query using generated types
const published = await prisma.post.findMany({
  where: { published: true },
  orderBy: { createdAt: "desc" },
});
```

## Migration Workflow

```bash
# Generate migration SQL from schema changes
npx prisma migrate dev --name add_posts_table

# Apply migrations in production
npx prisma migrate deploy

# Regenerate client after schema changes
npx prisma generate
```

## Key Points

- **UUID primary keys** for distributed-safe IDs
- **`@map` directives** keep Prisma camelCase while database uses snake_case
- **`@relation` with `fields/references`** defines foreign keys explicitly
- **Composite index** on `(published, createdAt)` optimizes common query patterns
- **`prisma migrate dev`** creates a migration file and applies it in one step
- **Type-safe queries** are generated from the schema, catching errors at compile time
