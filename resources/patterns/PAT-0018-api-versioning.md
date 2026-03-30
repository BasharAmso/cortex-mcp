---
id: PAT-0018
name: API Versioning
category: patterns
tags: [api-versioning, backward-compatibility, deprecation, migration, breaking-changes, semver]
capabilities: [version-strategy, deprecation-planning, migration-paths, backward-compatibility]
useWhen:
  - versioning an API
  - handling breaking changes
  - deprecating old endpoints
  - maintaining backward compatibility
  - planning API migrations
estimatedTokens: 500
relatedFragments: [PAT-0002, PAT-0012, SKL-0006]
dependencies: []
synonyms: ["how to version my API", "handle breaking API changes", "deprecate old endpoints", "v1 vs v2 API", "backward compatible API changes"]
lastUpdated: "2026-03-29"
difficulty: intermediate
sourceUrl: ""
---

# API Versioning

Evolve your API without breaking existing clients.

## Strategy Comparison

| Strategy | Example | Pros | Cons |
|----------|---------|------|------|
| **URL path** | `/api/v1/users` | Obvious, easy to route | URL pollution, hard to share code |
| **Header** | `Accept: application/vnd.api.v2+json` | Clean URLs | Hidden, harder to test in browser |
| **Query param** | `/api/users?version=2` | Easy to add | Easy to forget, clutters params |
| **No versioning** | Evolve in place | Simple | Requires strict backward compatibility |

**Recommendation:** URL path versioning for public APIs (clear, discoverable). Header versioning for internal APIs with controlled clients.

## What Counts as a Breaking Change

| Breaking | Non-Breaking |
|----------|-------------|
| Removing a field from response | Adding a new optional field |
| Renaming a field | Adding a new endpoint |
| Changing a field's type | Adding optional query parameters |
| Removing an endpoint | Expanding an enum with new values |
| Making an optional param required | Loosening validation (wider accepted values) |

## Deprecation Process

```
1. Announce deprecation (changelog, Deprecation header, docs)
2. Set a sunset date (minimum 6 months for public APIs)
3. Add `Sunset: Sat, 01 Nov 2025 00:00:00 GMT` header
4. Add `Deprecation: true` header to deprecated endpoints
5. Log usage of deprecated endpoints to track migration
6. Remove after sunset date + grace period
```

## Backward-Compatible Evolution

```typescript
// Adding a field: safe (clients ignore unknown fields)
// v1 response
{ "name": "Alice" }
// v1.1 response (backward compatible)
{ "name": "Alice", "displayName": "Alice Smith" }

// Renaming a field: provide both during migration
{ "name": "Alice", "displayName": "Alice Smith", "full_name": "Alice Smith" }
// Mark old field as deprecated in docs, remove in next major version
```

## Router Pattern (Express)

```typescript
import v1Routes from "./routes/v1";
import v2Routes from "./routes/v2";

app.use("/api/v1", v1Routes);
app.use("/api/v2", v2Routes);

// Share logic between versions, only differ where needed
// v2/users.ts imports from v1/users.ts and overrides specific handlers
```

## Anti-Patterns

- Shipping breaking changes without a new version
- Maintaining more than 2 active versions simultaneously
- No deprecation warnings before removal
- Versioning every minor change instead of batching into major releases
- Copying entire route files per version instead of sharing common logic
