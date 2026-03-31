---
id: PAT-0089
name: Error Handling Basics
category: patterns
tags: [error-handling, try-catch, error-types, async-errors, error-boundaries, beginner]
capabilities: [error-strategy, try-catch-usage, error-classification, graceful-failure]
useWhen:
  - adding error handling to code for the first time
  - deciding whether to throw an error or return an error value
  - handling errors in async/await code
  - understanding the difference between operational and programmer errors
  - setting up centralized error handling in a Node.js app
estimatedTokens: 650
relatedFragments: [SKL-0164, PAT-0087]
dependencies: []
synonyms: ["how to use try catch", "when should I throw an error", "how to handle async errors", "what is an error boundary", "my app crashes on errors"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Pattern: Error Handling Basics

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0089 |
| **Name** | Error Handling Basics |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

The Node.js Best Practices guide establishes a foundational principle: not all errors are the same, and handling them requires different strategies. The guide recommends async-await over callbacks, calling callback-style error handling "the fastest way to hell (a.k.a the pyramid of doom)."

### Two Types of Errors

| Type | Definition | Example | What to Do |
|------|-----------|---------|------------|
| **Operational** | Expected failures from the environment | Network timeout, invalid user input, file not found | Handle gracefully, inform the user |
| **Programmer** | Bugs in your code | Calling `.map()` on undefined, wrong function arguments | Fix the bug, let the process crash |

This distinction is critical. Operational errors should be caught and handled. Programmer errors should crash the process because swallowing them leads to undefined state.

### Pattern 1: Basic Try/Catch

```javascript
async function getUser(id) {
  try {
    const user = await database.findUser(id);
    return user;
  } catch (error) {
    // Add context, then handle or re-throw
    console.error(`Failed to fetch user ${id}:`, error.message);
    throw new AppError(`User not found`, 404, true); // isOperational = true
  }
}
```

**Rules for try/catch:**
- Wrap the smallest possible block of code, not entire functions
- Always add context to the error (what were you trying to do?)
- Never write an empty catch block (`catch (e) {}`) because this silently swallows errors

### Pattern 2: Extend the Error Object

Instead of throwing strings, create custom error classes that preserve stack traces and add useful metadata:

```javascript
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;
  }
}

// Usage
throw new AppError('Email already registered', 409);
```

This enables centralized error handling to route errors based on type and severity.

### Pattern 3: Centralize Error Handling

Handle errors in one place instead of scattering try/catch blocks everywhere:

```javascript
// Express error middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  logger.error({ err, path: req.path });

  if (err.isOperational) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Unknown error: respond generically
  res.status(500).json({ error: 'Something went wrong' });
});
```

### Pattern 4: Always Handle Async Errors

Unhandled promise rejections are the most common source of silent failures. Every async function call needs error handling:

```javascript
// Good — errors are caught
try {
  await sendEmail(user.email);
} catch (error) {
  logger.error('Email send failed:', error);
}

// Safety net — catches anything missed
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection:', reason);
  process.exit(1);
});
```

### When to Throw vs Return

| Situation | Strategy |
|-----------|----------|
| Unexpected failure that the caller must handle | `throw` an error |
| Expected failure in a function that often fails (parsing, validation) | Return a result: `{ ok: false, error }` |
| Fatal system-level failure | Log and exit the process |

## Key Takeaways

- Separate operational errors (handle gracefully) from programmer errors (fix the bug)
- Wrap the smallest necessary code in try/catch, never leave catch blocks empty
- Use custom error classes that extend Error to preserve stack traces and add context
- Centralize error handling in middleware instead of scattering it across the codebase
- Always handle async errors explicitly; unhandled promise rejections cause silent failures
