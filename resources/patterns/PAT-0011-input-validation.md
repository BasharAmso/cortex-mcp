---
id: PAT-0011
name: Input Validation
category: patterns
tags: [validation, input, sanitization, zod, schema, forms, server-side, client-side, fail-fast, type-safety]
capabilities: [input-validation, schema-validation, sanitization, form-validation]
useWhen:
  - validating user input on forms or API endpoints
  - choosing a validation library for a new project
  - implementing form validation with real-time feedback
  - preventing injection attacks through input sanitization
  - validating API request bodies before business logic
estimatedTokens: 600
relatedFragments: [PAT-0001, PAT-0002, PAT-0003, SKL-0006]
dependencies: []
synonyms: ["how to validate user input", "which validation library should I use", "form validation best practices", "prevent SQL injection", "validate API requests"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
pillar: "software-dev"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
---

# Input Validation

Never trust user input. Validate early, validate on the server, and fail fast with dedicated libraries.

## The Two-Layer Rule

| Layer | Purpose | Runs |
|-------|---------|------|
| **Client-side** | UX feedback (instant errors, field hints) | Browser, before submit |
| **Server-side** | Security and data integrity | Server, every request |

Client validation is a convenience. Server validation is a requirement. Never skip server-side validation because the client "already checks." Per Node.js best practices, always fail fast by validating arguments using a dedicated library before any business logic runs.

## Validation Strategy

1. **Fail fast at the boundary.** Validate all incoming data at the API route level before it reaches services or database layers. Return 400 with structured error details immediately.
2. **Use schema-based validation.** Define the expected shape once. Derive TypeScript types, API docs, and runtime checks from a single source of truth.
3. **Validate incoming JSON schemas.** Never trust payload structure. Libraries like Zod, Joi, or Ajv enforce schema validation at runtime and catch malformed data before it causes downstream errors.
4. **Separate format from business rules.** Schema validation checks shape and types. Business validation (e.g., "does this user have permission?") belongs in the service layer.
5. **Return structured errors.** Always include which field failed and why. Clients need machine-readable error details, not just "Bad Request."

## Library Comparison

| Library | Language | Strengths |
|---------|----------|-----------|
| **Zod** | TypeScript | Type inference, composable, great DX |
| **Yup** | JavaScript | Mature, works well with Formik |
| **Joi** | Node.js | Battle-tested, rich API |
| **Ajv** | JSON Schema | Standard-based, fastest pure validation |
| **class-validator** | TypeScript | Decorator-based, NestJS integration |

## Zod Schema Validation (API)

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
  createUser(result.data); // result.data is fully typed and safe
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
