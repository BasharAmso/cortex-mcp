---
id: PAT-0002
name: REST API Design Pattern
category: patterns
tags: [api, rest, endpoints, http, json, crud, versioning, pagination, scalability]
capabilities: [api-design, endpoint-structure, http-methods, response-formats]
useWhen:
  - designing REST API endpoints for a new service
  - structuring API responses for consistency
  - choosing HTTP methods and status codes
  - planning API versioning and pagination
  - scaling an API to handle growing traffic
estimatedTokens: 650
relatedFragments: [PAT-0001, PAT-0009, SKL-0016]
dependencies: []
synonyms: ["how to design an api", "what url structure should my api use", "how do I build a rest api", "which http methods should I use", "how to structure api responses"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: intermediate
owner: builder
---

# REST API Design Pattern

Consistent, predictable API structure that scales. Every design choice is a trade-off between simplicity, performance, and flexibility.

## URL Structure

```
GET    /api/v1/resources          # List (with pagination)
GET    /api/v1/resources/:id      # Get one
POST   /api/v1/resources          # Create
PUT    /api/v1/resources/:id      # Full replace
PATCH  /api/v1/resources/:id      # Partial update
DELETE /api/v1/resources/:id      # Delete
```

**Rules:** Use plural nouns (`/users` not `/user`). Nest for relationships (`/users/:id/orders`). Maximum two levels of nesting; deeper hierarchies signal a design problem.

## Envelope Response Format

```json
{
  "data": { "id": "abc", "name": "Widget" },
  "meta": { "page": 1, "limit": 20, "total": 142, "hasNext": true },
  "error": null
}
```

Error response uses the same envelope:
```json
{
  "data": null,
  "error": { "code": "VALIDATION_ERROR", "message": "Email is required",
             "details": [{ "field": "email", "message": "Required" }] }
}
```

## Status Code Reference

| Code | When | Notes |
|------|------|-------|
| 200 | Success (GET, PUT, PATCH) | Return updated resource |
| 201 | Created (POST) | Return new resource + Location header |
| 204 | No content (DELETE) | Empty body |
| 400 | Validation errors | Include field-level details |
| 401 | No or invalid auth token | Do not reveal which is wrong |
| 403 | Authenticated but forbidden | Different from 401 |
| 404 | Resource not found | |
| 409 | Conflict (duplicate, version) | Useful for optimistic locking |
| 429 | Rate limited | Include Retry-After header |
| 500 | Server error | Never expose internal details |

## Scalability Considerations

1. **Stateless design.** Each request carries all needed context (token, query params). No server-side session state enables horizontal scaling behind a load balancer.
2. **Pagination by default.** Never return unbounded lists. Cursor-based pagination performs better than offset-based at scale.
3. **Rate limiting.** Protect your API with per-client limits. Return 429 with Retry-After header.
4. **Idempotency.** PUT and DELETE are idempotent by design. For POST, accept an idempotency key header to safely retry.

## Anti-Patterns

- Verbs in URLs (`/getUsers`, `/createOrder`)
- Returning 200 for errors with an error payload
- Unbounded list endpoints without pagination
- Breaking changes without version bump
- Exposing internal IDs or database structure in responses
