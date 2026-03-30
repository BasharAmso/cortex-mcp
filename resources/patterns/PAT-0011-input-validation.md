---
id: PAT-0011
name: Input Validation
category: patterns
tags: [validation, input, sanitization, zod, schema, forms, server-side, client-side]
capabilities: [input-validation, schema-validation, sanitization, form-validation]
useWhen:
  - validating user input
  - choosing a validation library
  - implementing form validation
  - preventing injection attacks
  - validating API request bodies
estimatedTokens: 550
relatedFragments: [PAT-0001, PAT-0002, PAT-0003, SKL-0006]
dependencies: []
synonyms: ["how to validate user input", "which validation library should I use", "form validation best practices", "prevent SQL injection", "validate API requests"]
lastUpdated: "2026-03-29"
difficulty: intermediate
sourceUrl: ""
---

# Input Validation

Never trust user input. Validate on the server, validate on the client, and sanitize before storage.

## The Two-Layer Rule

| Layer | Purpose | Runs |
|-------|---------|------|
| **Client-side** | UX feedback (instant errors, field hints) | Browser, before submit |
| **Server-side** | Security and data integrity | Server, every request |

Client validation is a convenience. Server validation is a requirement. Never skip server-side validation because the client "already checks."

## Library Comparison

| Library | Language | Strengths |
|---------|----------|-----------|
| **Zod** | TypeScript | Type inference, composable, great DX |
| **Yup** | JavaScript | Mature, works well with Formik |
| **Joi** | Node.js | Battle-tested, rich API |
| **class-validator** | TypeScript | Decorator-based, NestJS integration |

## Pattern: Zod Schema Validation (API)

```typescript
import { z } from "zod";

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(13).max(120).optional(),
});

// In your route handler
app.post("/users", (req, res) => {
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }
  // result.data is fully typed and safe
  createUser(result.data);
});
```

## Sanitization Checklist

1. **Trim whitespace** on string inputs
2. **Escape HTML** before rendering user content (prevents XSS)
3. **Parameterize SQL** queries (never interpolate user input into SQL)
4. **Normalize emails** to lowercase
5. **Strip or encode** special characters in filenames

## Anti-Patterns

- Validating only on the client
- Using regex for email validation instead of a proven library
- Trusting hidden form fields or query params
- Returning raw validation errors with internal field names to users
- Validating input shape but not business rules (e.g., checking type but not permission)
