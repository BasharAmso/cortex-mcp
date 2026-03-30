---
id: PAT-0001
name: Error Handling Pattern
category: patterns
tags: [error-handling, try-catch, errors, resilience, graceful-degradation]
capabilities: [error-handling-design, resilience-patterns, user-facing-errors]
useWhen:
  - designing error handling for a new feature
  - improving error messages for users
  - adding resilience to API calls or database operations
  - deciding between throwing and returning errors
estimatedTokens: 600
relatedFragments: [PAT-0002, SKL-0002]
dependencies: []
synonyms: ["how to handle errors in my app", "my app crashes when something goes wrong", "how do I show error messages to users", "try catch best practices", "what to do when api call fails"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Error Handling Pattern

Consistent error handling that is safe, informative, and user-friendly.

## Principles

1. **Fail fast, fail clearly** — catch errors close to the source, with context
2. **Never swallow errors** — always log, report, or re-throw
3. **User-facing errors are different from developer errors** — sanitize before showing
4. **Use typed errors** — custom error classes over generic Error

## Pattern: Result Type (TypeScript)

```typescript
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseConfig(raw: string): Result<Config> {
  try {
    const parsed = JSON.parse(raw);
    return { ok: true, value: parsed as Config };
  } catch (err) {
    return { ok: false, error: new Error(`Invalid config: ${err}`) };
  }
}
```

## Pattern: Error Boundary (API)

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[${req.method} ${req.path}]`, err);

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: "Not found" });
  }

  // Never expose internal errors to users
  res.status(500).json({ error: "Something went wrong" });
});
```

## Anti-Patterns

- Catching errors and doing nothing (`catch (e) {}`)
- Showing stack traces to users
- Using error codes without human-readable messages
- Retrying without backoff or limits
