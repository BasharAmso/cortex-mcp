---
id: SKL-0062
name: API Versioning
category: skills
tags: [api, versioning, backward-compatibility, deprecation, migration, rest, lifecycle, semver, sunset-header]
capabilities: [version-strategy-selection, deprecation-planning, migration-guide-creation]
useWhen:
  - adding a new API version without breaking existing clients
  - planning a deprecation strategy for an old API endpoint
  - choosing between URL-based and header-based versioning
  - migrating consumers from one API version to the next
estimatedTokens: 600
relatedFragments: [SKL-0006, PAT-0002, PAT-0004]
dependencies: []
synonyms: ["how do I version my API without breaking stuff", "my API changed and now old clients break", "when should I deprecate an endpoint", "how to support multiple API versions at once", "adding v2 to my API"]
sourceUrl: "https://github.com/donnemartin/system-design-primer"
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# API Versioning

Manage API evolution so existing clients keep working while new features ship. Breaking changes without versioning cause cascading failures across every consumer.

## Strategy Comparison

| Strategy | Example | Pros | Cons |
|----------|---------|------|------|
| URL path | `/api/v2/users` | Visible, easy to route, cacheable | URL pollution, hard to share logic |
| Header | `Accept: application/vnd.myapp.v2+json` | Clean URLs, flexible content negotiation | Harder to test in browser, less discoverable |
| Query param | `/api/users?version=2` | Simple to add | Pollutes caching, easy to forget |

**Recommendation:** URL path versioning for most projects. It is the simplest to implement, test, and document.

## When to Create a New Version

Create a new version only for **breaking changes**:
- Removing or renaming a field
- Changing a field type (string to number)
- Changing response structure or status codes
- Removing an endpoint

Non-breaking changes (adding optional fields, new endpoints) do NOT need a new version.

## Code Structure

```
src/
  routes/
    v1/
      users.ts      # original
    v2/
      users.ts      # new version
  services/
    users.service.ts  # shared business logic
```

Keep business logic in shared services. Version only the route/controller layer. This prevents logic drift between versions.

## Deprecation Lifecycle

1. **Announce** -- Add deprecation headers and update docs (minimum 90 days before removal)
2. **Monitor** -- Track v1 usage per consumer; notify heavy users directly
3. **Sunset** -- Return `410 Gone` with a migration link after the sunset date
4. **Remove** -- Delete v1 code only after traffic reaches zero

Required deprecation headers on every response from a deprecated version:

```
Deprecation: true
Sunset: Sat, 01 Nov 2026 00:00:00 GMT
Link: <https://docs.example.com/migration/v2>; rel="successor-version"
```

## Migration Guide Checklist

For each version bump, publish a guide covering:
- Every breaking change with before/after request/response examples
- New required fields or parameters
- Changed authentication or authorization rules
- SDK/client library upgrade steps
- Timeline with hard sunset date

## Key Constraints

- Never remove a live version without a sunset period
- Never change the behavior of an existing version -- changes go in the next version
- Always version the full route prefix, not individual endpoints
- Log which version each API consumer uses for deprecation planning
- Return HTTP 503 with back pressure when a deprecated version is overloaded, letting clients retry with exponential backoff
