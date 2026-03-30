---
id: PAT-0031
name: API Key Management
category: patterns
tags: [api-keys, hashing, rate-limiting, security, authentication, key-rotation, scoping, sha256, developer-dashboard]
capabilities: [api-key-generation, key-hashing, rate-limiting-per-key, key-rotation, key-dashboard]
useWhen:
  - building a public API that needs key-based authentication
  - implementing API key generation and management for developers
  - adding rate limiting scoped to individual API keys
  - designing a developer dashboard for key management
  - planning key rotation without downtime
estimatedTokens: 650
relatedFragments: [PAT-0003, PAT-0030, PAT-0002, SKL-0004, SKL-0034]
dependencies: []
synonyms: ["how to create api keys for my users", "should I hash api keys in the database", "how to add rate limiting per api key", "developer portal for api key management", "how to rotate api keys without downtime"]
lastUpdated: "2026-03-29"
difficulty: advanced
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
---

# API Key Management

How to generate, store, scope, and manage API keys securely. Following OWASP credential management guidance, treat API keys with the same care as passwords.

## Key Generation

```typescript
import crypto from "crypto";

function generateApiKey(): { raw: string; hash: string; prefix: string } {
  const raw = crypto.randomBytes(32).toString("base64url"); // 43 chars
  const prefix = raw.slice(0, 8);  // visible identifier
  const hash = crypto.createHash("sha256").update(raw).digest("hex");
  return { raw, hash, prefix };
}
// Show `raw` to user ONCE at creation. Store only `hash` and `prefix`.
```

**Critical rule:** Never store plaintext API keys. Store the SHA-256 hash. The raw key is shown exactly once, like a password.

## Data Model

```
api_keys: {
  id, user_id, prefix, hash,
  name,            // user label ("Production", "Staging")
  scopes,          // ["posts:read", "posts:write"] or ["*"]
  last_used_at, expires_at, created_at, revoked_at
}
```

## Authentication Flow

1. Hash the incoming key: SHA-256(full_key)
2. Look up hash in api_keys table
3. Check: not revoked, not expired
4. Check: requested action is within key's scopes
5. Update last_used_at
6. Proceed or reject

## Scoping

| Scope | Access |
|-------|--------|
| `*` | Full access (discourage) |
| `read` | All read operations |
| `posts:read` | Read posts only |
| `posts:write` | Create/update posts |
| `billing:manage` | Manage billing |

Default to minimal (read-only) at key creation.

## Key Rotation Without Downtime

1. User generates new key (old key still active)
2. User updates their integration with the new key
3. User verifies new key works (check last_used_at)
4. User revokes old key

Support multiple active keys per user to enable this workflow.

## Dashboard Features

- List keys with prefix, name, scopes, last used, created date
- Create key with name and scope selection (show raw key once)
- Revoke key with confirmation
- Usage stats per key (requests, errors, last 30 days)

## Security Checklist

- [ ] Store only SHA-256 hashes, never plaintext keys
- [ ] Show the raw key exactly once at creation
- [ ] Enforce scopes on every API request
- [ ] Rate limit per key, not just per IP
- [ ] Log usage with key prefix (not full key) for auditing
- [ ] Support key expiration and auto-revocation
- [ ] Require re-authentication before creating or revoking keys
