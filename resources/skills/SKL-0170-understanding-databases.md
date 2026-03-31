---
id: SKL-0170
name: Understanding Databases
category: skills
tags: [databases, sql, nosql, orm, schema, migrations]
capabilities: [database-comprehension, schema-reading, sql-basics, orm-understanding]
useWhen:
  - encountering database concepts in a codebase for the first time
  - deciding between SQL and NoSQL for a project
  - reading Prisma schema files or migration files
  - understanding what an ORM does and why projects use one
  - trying to understand how data is stored and retrieved
estimatedTokens: 650
relatedFragments: [SKL-0166, SKL-0168]
dependencies: []
synonyms: ["what is a database", "SQL vs NoSQL explained", "what is an ORM", "how do database migrations work", "what is a database schema"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/prisma/prisma"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Understanding Databases

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0170 |
| **Name** | Understanding Databases |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

A database is where your application stores and retrieves data that persists beyond a single session. When a user creates an account, their information goes into a database. When they log in next week, the database returns it. Understanding how databases work helps you read any codebase that stores data.

### SQL vs NoSQL

| Aspect | SQL (Relational) | NoSQL (Document) |
|--------|------------------|-------------------|
| **Structure** | Tables with rows and columns | Collections of flexible JSON-like documents |
| **Schema** | Fixed structure defined upfront | Flexible, can vary per document |
| **Relationships** | Strong, via foreign keys and joins | Embedded documents or manual references |
| **Examples** | PostgreSQL, MySQL, SQLite | MongoDB, DynamoDB, Firebase |
| **Best for** | Structured data with relationships | Flexible data, rapid prototyping |

Most production applications use SQL databases. If you are starting out, PostgreSQL is the most commonly recommended choice.

### Schemas — The Data Blueprint

A schema defines the shape of your data: what tables exist, what columns they have, and what types of data each column holds. Prisma uses a declarative schema file where you "define application models in an intuitive data modeling language":

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}
```

This defines two tables (`User` and `Post`) with a relationship between them: each Post belongs to a User.

### Migrations — Evolving the Schema

When you change your schema (add a column, rename a table), you create a migration. A migration is a set of instructions that transforms the database from one shape to another. Prisma provides "declarative data modeling and migration system" that generates migration files automatically.

Migrations are versioned and applied in order, like a timeline of your database's evolution.

### ORMs — Code Instead of SQL

An ORM (Object-Relational Mapper) lets you interact with the database using your programming language instead of writing raw SQL. Prisma generates a type-safe client so that "you can't accidentally access a property that doesn't exist."

```typescript
// Instead of: SELECT * FROM User WHERE email = 'alice@example.com'
const user = await prisma.user.findUnique({
  where: { email: 'alice@example.com' },
  include: { posts: true }
});
```

Prisma supports PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB with the same syntax.

### Key Database Concepts

- **Primary key** — unique identifier for each row (usually `id`)
- **Foreign key** — a column that references another table's primary key (creates relationships)
- **Index** — speeds up lookups on frequently queried columns
- **Query** — a request to read or write data (SELECT, INSERT, UPDATE, DELETE)

## Key Takeaways

- Databases store persistent data; SQL databases use fixed tables, NoSQL uses flexible documents
- Schemas define the shape of your data: tables, columns, types, and relationships
- Migrations are versioned changes to the schema, applied in order
- ORMs like Prisma let you query databases with type-safe code instead of raw SQL
- PostgreSQL is the most common recommendation for production applications
