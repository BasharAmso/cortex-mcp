---
id: PAT-0021
name: Secrets Management
category: patterns
tags: [secrets, vault, key-management, rotation, encryption, kms, environment-secrets]
capabilities: [secret-storage, key-rotation, encryption-at-rest, access-control]
useWhen:
  - managing secrets in production
  - rotating API keys
  - choosing a secrets manager
  - encrypting sensitive data
  - auditing secret access
estimatedTokens: 500
relatedFragments: [PAT-0003, PAT-0001, SKL-0004]
dependencies: []
synonyms: ["where do I store production secrets", "rotate API keys safely", "secrets manager setup", "encrypt sensitive data", "stop hardcoding passwords"]
lastUpdated: "2026-03-29"
difficulty: advanced
sourceUrl: ""
---

# Secrets Management

Keep credentials out of code, limit access, and rotate regularly.

## The Hierarchy of Secret Storage

| Method | Security | When to Use |
|--------|----------|-------------|
| **Hardcoded in source** | None | Never |
| **`.env` file** | Minimal | Local development only |
| **CI/CD secret variables** | Medium | Build-time secrets (GitHub Actions, Vercel) |
| **Cloud secret manager** | High | Production runtime secrets |
| **Hardware security module** | Highest | Signing keys, compliance-critical |

## Provider Comparison

| Service | Pricing | Best For |
|---------|---------|----------|
| **AWS Secrets Manager** | $0.40/secret/month | AWS-native apps, auto-rotation |
| **GCP Secret Manager** | Free tier + $0.06/10K access | GCP apps, simple API |
| **Azure Key Vault** | $0.03/10K operations | Azure ecosystem |
| **HashiCorp Vault** | Free (self-hosted) | Multi-cloud, advanced policies |
| **Doppler** | Free tier | Developer-friendly, syncs to platforms |
| **Infisical** | Free (open-source) | Self-hostable, team-friendly |

## Key Rotation Pattern

```
1. Generate new key/credential
2. Add new key to secret manager (both old and new active)
3. Deploy app update that reads new key
4. Verify new key works in production
5. Remove old key from secret manager
6. Revoke old key at the provider
```

Never rotate by updating a single value in place. The brief window where the old key is invalid but still deployed will cause outages.

## Environment Variable Safety

```bash
# .env (local only, in .gitignore)
DATABASE_URL=postgres://localhost/myapp
STRIPE_SECRET_KEY=sk_test_...

# .env.example (committed, no real values)
DATABASE_URL=postgres://localhost/myapp
STRIPE_SECRET_KEY=sk_test_replace_me
```

```typescript
// Validate all required env vars at startup
const required = ["DATABASE_URL", "STRIPE_SECRET_KEY", "JWT_SECRET"];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
```

## Access Control Rules

1. **Least privilege** -- each service gets only the secrets it needs
2. **Separate by environment** -- dev, staging, and prod secrets are different values and different access policies
3. **Audit access** -- log who/what accessed each secret and when
4. **No shared secrets** -- each service and developer gets their own credentials
5. **Expire and rotate** -- set rotation schedules (90 days for API keys, 365 for certificates)

## Anti-Patterns

- Committing `.env` files to version control
- Sharing production secrets in Slack, email, or docs
- Using the same secret across all environments
- No rotation schedule (keys never expire)
- Logging secrets in application output or error messages
- Storing secrets in database rows without encryption
