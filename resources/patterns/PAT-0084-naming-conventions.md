---
id: PAT-0084
name: Naming Conventions
category: patterns
tags: [naming, readability, conventions, style, clarity, communication]
capabilities: [name-evaluation, convention-application, readability-improvement, intent-communication]
useWhen:
  - naming variables, functions, classes, or files in a project
  - reviewing code and assessing whether names communicate intent
  - establishing coding standards for a team
  - refactoring code to improve readability
  - understanding why certain naming patterns are used in a codebase
estimatedTokens: 640
relatedFragments: [SKL-0157, SKL-0158, PAT-0085]
dependencies: []
synonyms: ["how to name variables", "camelCase vs PascalCase vs snake_case", "how to write readable code", "what makes a good function name", "naming best practices for code", "how to name files and folders"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/airbnb/javascript"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Pattern: Naming Conventions

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0084 |
| **Name** | Naming Conventions |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

The Airbnb JavaScript Style Guide is one of the most widely adopted coding standards. Its naming rules are not arbitrary; they encode meaning. When you see a PascalCase name, you know it is a class. When you see camelCase, you know it is a variable or function. Naming conventions are a communication protocol between developers.

### The Three Casing Standards

| Convention | Used For | Example |
|------------|----------|---------|
| `camelCase` | Variables, functions, object instances | `userName`, `getUserById()` |
| `PascalCase` | Classes, components, constructors, type names | `UserService`, `CheckBox` |
| `SCREAMING_SNAKE_CASE` | Constants, environment variables | `MAX_RETRIES`, `API_BASE_URL` |

### Naming Rules from Airbnb

- **Be descriptive.** Avoid single-letter names. `userCount` is better than `n`. The only exception is loop counters (`i`, `j`).
- **No underscores as prefixes or suffixes.** Avoid `_private` or `name_`. JavaScript does not have true private properties, and underscores create false signals.
- **Match file names to default exports.** If a file exports a class called `CheckBox`, name the file `CheckBox.js`. If it exports a function called `fortyTwo`, name the file `fortyTwo.js`.
- **Use descriptive function names.** A function name should describe what it does: `validateEmail()`, not `check()`. The reader should understand the purpose without reading the body.

### Boolean Naming

Booleans should read as true/false questions:

```javascript
// Good - reads as a question
const isActive = true;
const hasPermission = false;
const canEdit = user.role === 'admin';

// Bad - ambiguous
const active = true;
const permission = false;
```

### What Names Communicate

Good names eliminate the need for comments:

```javascript
// Bad - requires a comment to explain
const d = 86400; // seconds in a day

// Good - self-documenting
const SECONDS_PER_DAY = 86400;
```

### When Reading Unfamiliar Code

Names are the first thing you should read. Before understanding logic, scan the function and variable names. A well-named codebase tells you its story through names alone:

```javascript
async function fetchUserOrders(userId) {
  const user = await findUserById(userId);
  const orders = await getOrdersByUser(user);
  return formatOrderSummary(orders);
}
```

You understand this function without reading any implementation.

## Key Takeaways

- Use camelCase for variables/functions, PascalCase for classes/components, SCREAMING_SNAKE_CASE for constants
- Names should be descriptive enough to eliminate the need for comments
- Prefix booleans with `is`, `has`, `can`, or `should` so they read as questions
- Match file names to their default exports
- When reading code, scan names first; they reveal intent faster than logic
