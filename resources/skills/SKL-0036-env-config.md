---
id: SKL-0036
name: Environment Variables & Config Management
category: skills
tags: [environment-variables, config, env, dotenv, secrets, configuration, settings, twelve-factor]
capabilities: [env-management, config-patterns, secrets-handling, environment-separation]
useWhen:
  - setting up environment variables for a new project
  - managing config across dev, staging, and production environments
  - handling secrets safely without committing them to git
  - separating configuration from code following twelve-factor principles
estimatedTokens: 600
relatedFragments: [SKL-0018, SKL-0004, PAT-0003, PAT-0006]
dependencies: []
synonyms: ["how do I set up env variables", "where do I put my API keys", "manage different settings for dev and production", ".env file setup", "how to handle secrets in my app"]
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: beginner
---

# Environment Variables & Config Management

Store configuration in the environment, not in code. This is Principle III of the Twelve-Factor App and the foundation of secure, portable deployments.

## The Core Rule

If a value changes between environments (dev/staging/prod) or is secret, it belongs in environment configuration, never in source code.

## Config Hierarchy (Highest Priority Wins)

1. **Process environment variables** (set by platform/orchestrator)
2. **`.env.local`** (machine-specific overrides, never committed)
3. **`.env.production` / `.env.staging`** (environment-specific defaults)
4. **`.env`** (shared defaults for development)
5. **Hardcoded fallbacks in code** (only for non-sensitive defaults)

## Approach Comparison

| Approach | Best For | Secrets Safe? | Complexity |
|----------|----------|---------------|------------|
| `.env` + dotenv | Local dev, small projects | Only if gitignored | Low |
| Platform env vars (Vercel, Railway) | Hosted apps | Yes (encrypted at rest) | Low |
| AWS SSM / Parameter Store | AWS deployments | Yes (IAM-controlled) | Medium |
| HashiCorp Vault | Enterprise, rotation needed | Yes (audit trail) | High |
| Doppler / Infisical | Team config management | Yes (versioned, synced) | Medium |

## Implementation Checklist

### 1. Set Up .env Files

```
.env                 # Shared defaults (committed)
.env.local           # Local overrides (gitignored)
.env.production      # Prod defaults (committed, no secrets)
```

### 2. Gitignore Secrets

```gitignore
.env.local
.env*.local
```

### 3. Validate on Startup

Never let the app boot with missing config. Validate required variables at startup and fail fast with a clear error message naming the missing variable.

### 4. Type and Parse

Environment variables are always strings. Parse them explicitly: `parseInt(process.env.PORT, 10)`, `process.env.DEBUG === 'true'`. Use a validation library (zod, envalid, joi) for complex configs.

### 5. Document Every Variable

Maintain a `.env.example` file committed to the repo with every variable, placeholder values, and comments. This is the contract for new developers.

## Common Mistakes

- **Committing `.env` with real secrets.** Use `.env.example` for documentation, `.env.local` for real values.
- **Accessing `process.env` everywhere.** Centralize config in a single module that validates and exports typed values.
- **Different variable names across environments.** Use the same names everywhere; only values change.
- **No fallback for optional config.** Distinguish between required (fail if missing) and optional (use default) variables explicitly.

## Secret Rotation Strategy

For production secrets (API keys, database passwords): use a secret manager that supports rotation. Never share secrets over Slack or email. Use the secret manager's CLI or UI to grant access per-person or per-service.
