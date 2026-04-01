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
relatedFragments: [SKL-0005, SKL-0008, SKL-0010, EX-0004]
dependencies: []
synonyms: ["build an API", "create a server endpoint", "write backend logic", "I need a REST API", "handle requests on the server"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: intermediate
owner: builder
pillar: "software-dev"
---

# Skill: Backend Development

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0006 |
| **Version** | 1.0 |
| **Owner** | builder |
| **Inputs** | Task description, DECISIONS.md, existing backend files |
| **Outputs** | Backend files, STATE.md updated |
| **Triggers** | `BACKEND_TASK_READY` |

---

## Purpose

Build server-side logic — APIs, database models, business logic, and integrations.

---

## Procedure

1. **Read DECISIONS.md** — identify backend framework, database, ORM, auth approach.
2. **Design before building** — inputs, outputs, failure modes, database changes.
3. **Build with non-negotiables:**
   - Validate all inputs before processing
   - Never trust client-supplied data
   - Use parameterized queries — never string-concatenate SQL
   - Consistent error responses with appropriate HTTP status codes
   - Log errors with context, never log sensitive data
4. **Database operations:**
   - Use migrations for all schema changes
   - Every migration must be reversible
   - Index foreign keys and frequently queried fields
5. **Environment and secrets:**
   - Never hardcode credentials — all via environment variables
   - Document new env vars in .env.example
6. **Update STATE.md** with files created.

---

## Constraints

- Never modifies frontend files
- Never hardcodes secrets or credentials
- Never writes raw SQL string concatenation
- Always logs new stack/database decisions to DECISIONS.md

---

## Deployment Reference

| Target | Tool | Notes |
|--------|------|-------|
| API server (beginner) | Railway | Auto-deploys, free tier |
| API server (beginner) | Render | Good free tier |
| API server (control) | Fly.io | Docker-based, scales to zero |
| Serverless | Vercel/Netlify Functions | Lightweight APIs |

---

## Primary Agent

builder

---

## Definition of Done

- [ ] Stack and database confirmed from DECISIONS.md
- [ ] All inputs validated
- [ ] Parameterized queries used
- [ ] Consistent error handling and HTTP status codes
- [ ] No hardcoded credentials
- [ ] Migrations created for schema changes
- [ ] STATE.md updated