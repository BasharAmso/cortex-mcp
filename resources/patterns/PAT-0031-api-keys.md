---
id: PAT-0031
name: API Key Management
category: patterns
tags: [api-keys, hashing, rate-limiting, security, authentication, key-rotation, scoping]
capabilities: [api-key-generation, key-hashing, rate-limiting-per-key, key-rotation, key-dashboard]
useWhen:
  - building a public API that needs key-based authentication
  - implementing API key generation and management for users
  - adding rate limiting scoped to individual API keys
  - designing a developer dashboard for key management
estimatedTokens: 600
relatedFragments: [PAT-0003, PAT-0030, PAT-0002, SKL-0004, SKL-0034]
dependencies: []
synonyms: ["how to create api keys for my users", "should I hash api keys in the database", "how to add rate limiting per api key", "how to let developers manage their api keys", "how to rotate api keys without downtime"]
lastUpdated: "2026-03-29"
difficulty: advanced
---

# API Key Management

How to generate, store, scope, and manage API keys securely.

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

**Critical rule:** Never store plaintext API keys. Store the SHA-256 hash. The raw key is shown exactly once at creation time, like a password.

## Data Model

```
api_keys: {
  id,
  user_id,
  prefix,          // "sk_a1b2c3d4" — for identification in logs/UI
  hash,            // SHA-256 of full key — for authentication
  name,            // user-assigned label ("Production", "Staging")
  scopes,          // ["posts:read", "posts:write"] or ["*"]
  last_used_at,
  expires_at,      // nullable, for auto-expiring keys
  created_at,
  revoked_at       // nullable, soft delete
}
```

## Authentication Flow

```
Client -> Authorization: Bearer sk_a1b2c3d4...full_key
Server:
  1. Hash the incoming key: SHA-256(full_key)
  2. Look up hash in api_keys table
  3. Check: not revoked, not expired
  4. Check: requested action is within key's scopes
  5. Update last_used_at
  6. Proceed or reject
```

## Scoping

Restrict what each key can do:

| Scope | Access |
|-------|--------|
| `*` | Full access (dangerous, discourage) |
| `read` | All read operations |
| `posts:read` | Read posts only |
| `posts:write` | Create/update posts |
| `billing:manage` | Manage billing (separate from data access) |

Let users select scopes at key creation. Default to minimal (read-only).

## Key Rotation Without Downtime

```
1. User generates new key (old key still active)
2. User updates their integration with the new key
3. User verifies new key works (check last_used_at)
4. User revokes old key
```

Support overlapping keys (multiple active keys per user) to enable this workflow. Set a grace period reminder for old keys not used in 7+ days.

## Rate Limiting Per Key

```typescript
// Redis-based sliding window
async function checkRateLimit(keyId: string): Promise<boolean> {
  const window = 60; // seconds
  const limit = 100; // requests per window
  const key = `ratelimit:${keyId}`;
  const current = await redis.incr(key);
  if (current === 1) await redis.expire(key, window);
  return current <= limit;
}
```

Return rate limit headers on every response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 73
X-RateLimit-Reset: 1711670400
```

## Dashboard Features

Minimum viable key management UI:
- List keys with prefix, name, scopes, last used, created date
- Create key with name and scope selection (show raw key once)
- Revoke key with confirmation
- Usage stats per key (requests, errors, last 30 days)

## Security Checklist

- [ ] Store only SHA-256 hashes, never plaintext keys
- [ ] Show the raw key exactly once at creation
- [ ] Enforce scopes on every API request
- [ ] Rate limit per key, not just per IP
- [ ] Log all key usage with key prefix (not full key) for auditing
- [ ] Support key expiration and auto-revocation
- [ ] Require re-authentication before creating or revoking keys

## Common Mistakes

- Storing API keys in plaintext in the database
- Logging full API keys in server logs
- Not supporting multiple active keys (makes rotation require downtime)
- Rate limiting by IP only (one key can exhaust shared limits)
- No expiration option, leading to keys that live forever
