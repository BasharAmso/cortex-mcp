---
id: PAT-0085
name: Code Organization
category: patterns
tags: [organization, structure, modules, folders, architecture, separation-of-concerns]
capabilities: [project-structuring, module-separation, concern-isolation, folder-design]
useWhen:
  - starting a new project and deciding on folder structure
  - refactoring a messy codebase into a clearer structure
  - understanding why a project is organized a certain way
  - deciding whether to split code into separate modules
  - evaluating project structure during a code review
estimatedTokens: 650
relatedFragments: [SKL-0160, SKL-0162, PAT-0084]
dependencies: []
synonyms: ["how to organize code in a project", "best folder structure for a project", "how to structure files and folders", "separation of concerns in practice", "how to split code into modules", "project structure best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Pattern: Code Organization

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0085 |
| **Name** | Code Organization |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

The Node.js Best Practices guide, with over 100k GitHub stars, recommends organizing code by business domain rather than by technical role. This principle applies across all languages and frameworks.

### Component-Based Structure

Organize code around features, not file types:

```
# Bad - organized by technical role
src/
  controllers/
    userController.js
    orderController.js
  models/
    userModel.js
    orderModel.js
  services/
    userService.js
    orderService.js

# Good - organized by business domain
src/
  users/
    user.controller.js
    user.model.js
    user.service.js
    user.test.js
  orders/
    order.controller.js
    order.model.js
    order.service.js
    order.test.js
```

In the domain-based structure, everything related to users lives together. You do not need to jump between three folders to understand one feature.

### Three-Layer Separation

Within each component, separate code into layers:

1. **Entry point (Controller/Route)** - Handles HTTP, CLI, or event input. Validates requests and calls the service layer. Contains no business logic.
2. **Service (Business Logic)** - Pure domain logic. Does not know about HTTP or databases directly. Testable in isolation.
3. **Data Access (Repository)** - Database queries, API calls, file I/O. Returns data to the service layer.

This separation means you can test business logic without spinning up a database or HTTP server.

### Shared Code as Libraries

Place reusable utilities in a dedicated `libs/` or `packages/` folder:

```
src/
  users/
  orders/
  libs/
    logger/
      index.js
      package.json
    auth/
      index.js
      package.json
```

Each shared module gets its own `package.json` or entry point (`index.js`). This creates an explicit public API and prevents other code from importing internal implementation details.

### Module Entry Points

Every folder that acts as a module should have an `index` file that exports the public API:

```javascript
// src/users/index.js
export { createUser } from './user.service';
export { UserSchema } from './user.model';
// Internal helpers are NOT exported
```

This controls what other modules can access and makes refactoring safe.

### Practical Rules

- **Require modules at the top of the file.** This makes dependencies visible at a glance and surfaces import errors early.
- **Keep related files together.** A component's tests, types, and utilities should live alongside the code they relate to.
- **Avoid side effects at module load.** Do not make API calls or database connections when a file is imported. Wrap them in functions.
- **Configuration in one place.** Environment-specific settings should live in a config module, not scattered across files.

## Key Takeaways

- Organize by business domain (users, orders, payments), not by file type (controllers, models, services)
- Use three layers within each component: entry point, business logic, data access
- Export a public API through index files; keep internal details private
- Place reusable utilities in a shared libs folder with explicit entry points
- Co-locate tests, types, and helpers with the code they belong to
