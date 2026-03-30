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
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
lastUpdated: "2026-03-30"
difficulty: beginner
owner: builder
---

# REST API Endpoint Example

An Express/Node REST endpoint following nodebestpractices: layered architecture, Zod validation, centralized error handling, and operational error distinction.

```typescript
// routes/user.routes.ts (entry-point layer)
import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { UserService } from "../services/user.service";
import { AppError } from "../lib/errors";

const router = Router();

// Validate input with a dedicated library (nodebestpractices: "fail fast")
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
      // Validate at the entry-point layer before passing to domain
      const parsed = CreateUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        });
      }

      // Delegate business logic to the domain/service layer
      const user = await UserService.createUser(parsed.data);

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      next(err); // Forward to centralized error middleware
    }
  },
);

export default router;
```

```typescript
// lib/errors.ts (centralized error handling)
// nodebestpractices: extend built-in Error, distinguish operational vs catastrophic
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true,
  ) {
    super(message);
    this.name = "AppError";
  }
}

// middleware/error-handler.ts
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  // Catastrophic errors: log and return generic message
  console.error("Unexpected error:", err);
  return res.status(500).json({ error: "Internal server error" });
}
```

## Key Points

- **Layered architecture** (nodebestpractices): entry-point (routes) -> domain (services) -> data-access
- **Zod validation** with `safeParse` returns structured errors instead of throwing
- **Specific HTTP status codes:** 400 for bad input, 409 for conflict, 201 for created
- **Centralized error handling** via middleware, not scattered try/catch
- **Operational vs catastrophic** errors: operational errors get user-facing messages, catastrophic errors get generic responses
- **Only return safe fields** in the response (no internal timestamps or sensitive data)
