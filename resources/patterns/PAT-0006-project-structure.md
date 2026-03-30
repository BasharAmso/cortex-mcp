---
id: PAT-0006
name: Project Structure
category: patterns
tags: [project-structure, feature-folders, monorepo, architecture, organization, naming-conventions, environment-config, co-location]
capabilities: [project-organization, folder-structure, module-design]
useWhen:
  - setting up a new project from scratch
  - reorganizing a messy codebase
  - choosing between monorepo and multi-repo
  - deciding on folder structure conventions
  - onboarding new developers to the codebase
estimatedTokens: 650
relatedFragments: [PAT-0002, PAT-0010, PAT-0007]
dependencies: []
synonyms: ["how to organize my project files", "what folder structure should I use", "my codebase is a mess how to fix it", "monorepo vs separate repos", "where should I put my code files"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/elsewhencode/project-guidelines"
difficulty: beginner
owner: builder
---

# Project Structure

Organize around product features, not technical roles. A well-structured project lets a new developer find any file within 30 seconds.

## Feature Folders (Recommended Default)

```
src/
  features/
    auth/
      components/
      hooks/
      api.ts
      types.ts
      auth.test.ts
    dashboard/
      components/
      hooks/
      api.ts
  shared/
    components/
    utils/
    hooks/
```

**Key rule:** Co-locate related code. A feature's tests, styles, types, and API calls live together. Shared code goes in `shared/`. Reference: Elsewhen Project Guidelines.

## Layered Architecture (Backend APIs)

```
src/
  routes/          # HTTP layer (request/response only)
  services/        # Business logic
  repositories/    # Data access
  models/          # Types and validation
  middleware/      # Cross-cutting concerns (auth, logging)
```

Each layer calls only the layer below it. Never import routes from services or services from routes.

## Monorepo (Multiple Packages)

```
packages/
  web/             # Frontend app
  api/             # Backend service
  shared/          # Shared types and utilities
```

Use when you have multiple deployables sharing code. Tools: Turborepo, Nx, or npm/pnpm workspaces.

## Guidelines from Project Guidelines

1. **Work in feature branches.** Never push directly to `main` or `develop`. Isolate work in short-lived branches.
2. **Flat over nested.** Three levels deep is a warning. Five levels is a problem.
3. **Index files as public API.** Each feature exports through `index.ts`. Internals stay private.
4. **Environment config via env vars.** Use `.env` files locally (gitignored), commit a `.env.example` as documentation. Validate env vars at startup with a schema (zod, joi).
5. **Consistent naming enforced by tooling.** Pick conventions (kebab-case files, PascalCase components) and enforce with ESLint rules, not code review comments.
6. **Place test files next to implementation.** `user.ts` and `user.test.ts` side by side, not in a separate `__tests__/` tree.
7. **Scripts in `./scripts/`.** Build, seed, deploy scripts in one place.

## Anti-Patterns

- Role-based folders at root level (`controllers/`, `models/`, `views/`) that scatter features across the tree
- Folders with one file each (over-organization)
- Circular dependencies between feature folders
- Dumping everything in `utils/` or `helpers/`
- Mixing concerns (API calls in components, business logic in routes)
- Different config files per environment instead of env vars
