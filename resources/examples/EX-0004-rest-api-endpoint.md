---
id: EX-0004
name: REST API Endpoint Example
category: examples
tags: [rest, api, express, node, validation, error-handling, typescript]
capabilities: [api-endpoint-creation, request-validation, error-responses]
useWhen:
  - creating a new REST API endpoint with Express
  - adding input validation to an endpoint
  - implementing proper error handling in an API route
estimatedTokens: 550
relatedFragments: [EX-0003, PAT-0001, PAT-0002]
dependencies: []
synonyms: ["how to create an api endpoint in express", "rest api route example with validation", "how to build a post endpoint in node", "express api with error handling example", "how to validate request body in express"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# REST API Endpoint Example

An Express/Node REST endpoint with Zod validation and error handling.

```typescript
import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";

const router = Router();

// Validation schema
const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  role: z.enum(["user", "admin"]).default("user"),
});

// POST /api/users
router.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate input
      const parsed = CreateUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        });
      }

      const { name, email, role } = parsed.data;

      // Check for duplicates
      const existing = await db.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: "Email already registered" });
      }

      // Create user
      const user = await db.user.create({
        data: { name, email, role },
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      next(err); // Forward to error middleware
    }
  },
);

export default router;
```

## Key Points

- **Zod validation** with `safeParse` returns structured errors instead of throwing
- **Specific HTTP status codes:** 400 for bad input, 409 for conflict, 201 for created
- **Error forwarding** with `next(err)` lets centralized error middleware handle unexpected errors
- **Only return safe fields** in the response (no internal IDs, timestamps unless needed)
- **Async/await** with try/catch for clean error handling
