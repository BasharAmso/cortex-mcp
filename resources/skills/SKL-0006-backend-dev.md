---
id: SKL-0006
name: Backend Development
category: skills
tags: [backend, api, server, rest, graphql, middleware, database]
capabilities: [api-design, server-logic, input-validation, error-handling, database-operations]
useWhen:
  - building API endpoints or server-side logic
  - implementing REST or GraphQL services
  - adding middleware, authentication, or business logic
  - writing database queries or creating migrations
estimatedTokens: 500
relatedFragments: [SKL-0005, SKL-0008, SKL-0010]
dependencies: []
---

# Backend Development

Build API endpoints, server logic, and backend services with secure, validated, and well-structured code.

## Procedure

### 1. Confirm Stack

Read project decisions for backend framework, database, ORM, and auth approach. Common defaults: Node.js + Express/Fastify, PostgreSQL + Prisma.

### 2. Design Before Building

For each endpoint or service, define:
- Inputs and outputs (request/response shape)
- Failure modes and error responses
- Database changes required (if any)

### 3. Build With Non-Negotiables

- **Validate all inputs** before processing — never trust client data
- **Parameterized queries** — never string-concatenate SQL
- **Consistent error responses** with appropriate HTTP status codes
- **Log errors with context** — never log sensitive data (passwords, tokens, PII)
- Use middleware for cross-cutting concerns (auth, logging, rate limiting)

### 4. Database Operations

- Use migrations for all schema changes — never edit schema directly
- Every migration must be reversible (UP and DOWN)
- Index foreign keys and frequently queried columns
- Never add NOT NULL without DEFAULT to existing tables

### 5. Environment and Secrets

- All credentials via environment variables — never hardcoded
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
- Always log new stack or database decisions
