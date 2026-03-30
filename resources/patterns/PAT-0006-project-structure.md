---
id: PAT-0006
name: Project Structure
category: patterns
tags: [project-structure, monorepo, feature-folders, architecture, organization]
capabilities: [project-organization, folder-structure, module-design]
useWhen:
  - setting up a new project from scratch
  - reorganizing a messy codebase
  - choosing between monorepo and multi-repo
  - deciding on folder structure conventions
estimatedTokens: 600
relatedFragments: [PAT-0002, PAT-0010]
dependencies: []
synonyms: ["how to organize my project files", "what folder structure should I use", "my codebase is a mess how to fix it", "monorepo vs separate repos", "where should I put my code files"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Project Structure

How to organize a project so it stays maintainable as it grows.

## Common Structures

### Feature Folders (Recommended for most projects)

```
src/
  features/
    auth/
      components/
      hooks/
      api.ts
      types.ts
    dashboard/
      components/
      hooks/
      api.ts
  shared/
    components/
    utils/
    hooks/
```

Group by feature, not by type. Everything related to "auth" lives together. Shared code goes in a `shared/` folder.

### Layered Architecture (Backend APIs)

```
src/
  routes/          # HTTP layer -- request/response
  services/        # Business logic
  repositories/    # Data access
  models/          # Types and validation
  middleware/       # Cross-cutting concerns
```

Each layer only calls the layer below it. Routes call services, services call repositories.

### Monorepo (Multiple packages)

```
packages/
  web/             # Frontend app
  api/             # Backend service
  shared/          # Shared types and utilities
```

Use when you have multiple deployable units that share code. Tools: Turborepo, Nx, or npm workspaces.

## Guidelines

1. **Co-locate related code.** A component's test, styles, and types should live next to it.
2. **Flat over nested.** Three levels deep is a warning sign. Five is a problem.
3. **Index files for public API.** Each feature folder exports through an index.ts -- internals stay private.
4. **Separate config from code.** Environment configs, build configs, and app code live apart.
5. **Consistent naming.** Pick a convention (kebab-case files, PascalCase components) and enforce it.

## Anti-Patterns

- Folders with one file each (over-organization)
- Circular dependencies between feature folders
- Dumping everything in `utils/` or `helpers/`
- Mixing concerns (API calls inside components, business logic in routes)
