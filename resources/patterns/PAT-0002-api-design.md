---
id: PAT-0002
name: REST API Design Pattern
category: patterns
tags: [api, rest, endpoints, http, json, crud, versioning]
capabilities: [api-design, endpoint-structure, http-methods, response-formats]
useWhen:
  - designing REST API endpoints
  - structuring API responses
  - choosing HTTP methods and status codes
  - planning API versioning
estimatedTokens: 550
relatedFragments: [PAT-0001, SKL-0002]
dependencies: []
---

# REST API Design Pattern

Consistent, predictable REST API structure.

## URL Structure

```
GET    /api/v1/resources          # List
GET    /api/v1/resources/:id      # Get one
POST   /api/v1/resources          # Create
PUT    /api/v1/resources/:id      # Replace
PATCH  /api/v1/resources/:id      # Partial update
DELETE /api/v1/resources/:id      # Delete
```

## Response Format

```json
{
  "data": { ... },
  "meta": { "page": 1, "total": 42 },
  "error": null
}
```

Error response:
```json
{
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [{ "field": "email", "message": "Required" }]
  }
}
```

## Status Codes

| Code | When |
|------|------|
| 200 | Success (GET, PUT, PATCH) |
| 201 | Created (POST) |
| 204 | No content (DELETE) |
| 400 | Bad request (validation errors) |
| 401 | Unauthorized (no/invalid auth) |
| 403 | Forbidden (authenticated but not allowed) |
| 404 | Not found |
| 409 | Conflict (duplicate, version mismatch) |
| 500 | Server error (never expose details) |

## Pagination

```
GET /api/v1/resources?page=2&limit=20
```

Response includes: `meta.page`, `meta.limit`, `meta.total`, `meta.hasNext`.
