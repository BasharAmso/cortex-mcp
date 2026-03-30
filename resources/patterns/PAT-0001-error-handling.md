---
id: PAT-0001
name: Error Handling Pattern
category: patterns
tags: [error-handling, operational-errors, programmer-errors, async-errors, resilience, graceful-degradation, process-management]
capabilities: [error-handling-design, resilience-patterns, user-facing-errors]
useWhen:
  - designing error handling for a new Node.js or backend service
  - improving error messages for end users
  - adding resilience to API calls or database operations
  - deciding between throwing, returning, or emitting errors
  - setting up process-level uncaught exception handling
estimatedTokens: 650
relatedFragments: [PAT-0002, PAT-0008, SKL-0002]
dependencies: []
synonyms: ["how to handle errors in my app", "my app crashes when something goes wrong", "how do I show error messages to users", "try catch best practices", "what to do when api call fails"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: intermediate
---

# Error Handling Pattern

Operational errors vs programmer errors require fundamentally different handling. Treat them separately.

## Error Classification

| Type | Definition | Example | Response |
|------|-----------|---------|----------|
| **Operational** | Expected failures from external systems | DB timeout, invalid user input, file not found | Handle gracefully, retry or inform user |
| **Programmer** | Bugs in your code | TypeError, undefined reference, wrong argument | Crash and restart, fix the bug |

## Step-by-Step Error Strategy

1. **Distinguish error types.** Create custom error classes that extend `Error` with an `isOperational` flag. Only operational errors should be caught and handled; programmer errors should crash the process.
2. **Centralize handling.** Use a single error-handling middleware (Express) or error boundary (React) instead of scattering try-catch blocks. Each catch should add context, then delegate to the central handler.
3. **Use the Result pattern for expected failures.** Return `{ ok, value/error }` instead of throwing for operations that regularly fail (parsing, validation).
4. **Fail fast on programmer errors.** Let the process crash on uncaught exceptions. Use a process manager (PM2, systemd) to restart automatically. Swallowing unknown errors leads to undefined state.
5. **Always await promises.** Unhandled promise rejections are the number-one source of silent failures. Use `process.on('unhandledRejection', ...)` as a safety net, not as a strategy.

## Result Type (TypeScript)

```typescript
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseConfig(raw: string): Result<Config> {
  try {
    return { ok: true, value: JSON.parse(raw) as Config };
  } catch (err) {
    return { ok: false, error: new Error(`Invalid config: ${err}`) };
  }
}
```

## Centralized Error Middleware (Express)

```typescript
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error({ err, path: req.path, method: req.method });

  if (err.isOperational) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  // Programmer error: respond generically, then exit
  res.status(500).json({ error: "Internal server error" });
  process.exit(1);
});
```

## Anti-Patterns

- Catching errors and doing nothing (`catch (e) {}`)
- Showing stack traces to end users
- Returning error codes without human-readable messages
- Retrying without exponential backoff or maximum attempt limits
- Using `throw` inside async code without `await` or `.catch()`
