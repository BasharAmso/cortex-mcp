---
id: SKL-0006
name: Backend Development
category: skills
tags: [backend, api, server, rest, graphql, middleware, database, node, express, fastify, error-handling]
capabilities: [api-design, server-logic, input-validation, error-handling, database-operations, project-structure]
useWhen:
  - building API endpoints or server-side logic
  - implementing REST or GraphQL services
  - adding middleware, authentication, or business logic
  - writing database queries or creating migrations
  - structuring a Node.js project for maintainability
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0008, SKL-0010]
dependencies: []
synonyms: ["build an API", "create a server endpoint", "write backend logic", "I need a REST API", "handle requests on the server"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: intermediate
---

# Backend Development

Build API endpoints, server logic, and backend services. Grounded in the Node.js Best Practices checklist (102 items) covering project structure, error handling, code style, testing, security, and performance.

## Core Principles (From Node.js Best Practices)

| Principle | Rule |
|-----------|------|
| Structure by components | Organize by feature (users/, orders/), not by technical layer |
| Separate Express from business | Route handlers call services; services hold logic |
| Config validation at startup | Use convict, envalid, or joi to validate env vars on boot |
| Error handling | Use async-aware error handler; never swallow errors silently |
| Operational vs programmer errors | Distinguish crashes (restart) from expected failures (handle gracefully) |

## Procedure

### 1. Confirm Stack

Read project decisions for backend framework, database, ORM, and auth approach. Common defaults: Node.js + Express/Fastify, PostgreSQL + Prisma.

### 2. Design Before Building

For each endpoint or service, define:
- Inputs and outputs (request/response shape)
- Failure modes and error responses
- Database changes required (if any)

### 3. Build With Non-Negotiables

- **Validate all inputs** at the API boundary using a schema library (Zod, Joi, typebox)
- **Parameterized queries** -- never string-concatenate SQL
- **Consistent error responses** with appropriate HTTP status codes and a standard error shape
- **Log errors with context** (request ID, user ID) -- never log sensitive data
- **Use middleware** for cross-cutting concerns (auth, logging, rate limiting)
- **Handle async errors** -- unhandled rejections must crash the process (fail fast)

### 4. Database Operations

- Use migrations for all schema changes -- never edit schema directly
- Every migration must be reversible (UP and DOWN)
- Index foreign keys and frequently queried columns
- Never add NOT NULL without DEFAULT to existing tables

### 5. Environment and Secrets

- All credentials via environment variables -- never hardcoded
- Validate all required env vars at startup (fail fast if missing)
- Document new env vars in `.env.example`
- Never commit `.env` files

## Deployment Options

| Target | Tool | Notes |
|--------|------|-------|
| Beginner | Railway, Render | Auto-deploy, free tier |
| Control | Fly.io | Docker-based, scales to zero |
| Serverless | Vercel/Netlify Functions | Lightweight APIs |

## Key Constraints

- Never modify frontend files
- Never hardcode secrets or credentials
- Never write raw SQL string concatenation
- Always structure by feature, not by technical layer
- Always validate config at startup
