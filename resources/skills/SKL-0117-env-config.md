---
id: SKL-0117
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
relatedFragments: [SKL-0021, SKL-0015, PAT-0003, PAT-0006]
dependencies: []
synonyms: ["how do I set up env variables", "where do I put my API keys", "manage different settings for dev and production", ".env file setup", "how to handle secrets in my app"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: beginner
owner: builder
---

# Environment Variables & Config Management

Store configuration in the environment, not in code. This is Principle III of the Twelve-Factor App and Practice 1.4 of Node.js Best Practices: use environment-aware, secure, hierarchical config.

## The Core Rule

If a value changes between environments (dev/staging/prod) or is secret, it belongs in environment configuration, never in source code. Applications should fail fast at startup if required environment variables are missing, not at runtime when a request hits the missing value.

## Config Hierarchy (Highest Priority Wins)

1. **Process environment variables** (set by platform/orchestrator)
2. **`.env.local`** (machine-specific overrides, never committed)
3. **`.env.production` / `.env.staging`** (environment-specific defaults)
4. **`.env`** (shared defaults for development)
5. **Hardcoded fallbacks in code** (only for non-sensitive defaults)

## Recommended Libraries

Per nodebestpractices, use structured config libraries over raw `process.env` access:

| Library | Strength | Best For |
|---------|----------|----------|
| **convict** | Schema validation, fail-fast on missing vars | Production apps needing strict validation |
| **env-var** | Typed accessors with defaults | Simple typed config |
| **zod** (with dotenv) | Full schema validation, TypeScript inference | Type-safe config objects |
| **config** | Hierarchical multi-file config | Apps with many environment tiers |
| **nconf** | Multi-source merging (files, env, argv) | Complex config pipelines |

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

Never let the app boot with missing config. Use convict or zod to validate all required variables at startup and fail fast with a clear error naming the missing variable. This prevents runtime surprises in production.

### 4. Centralize and Type Config

Environment variables are always strings. Parse them explicitly and centralize access in a single config module that validates and exports typed values. Never scatter `process.env` reads across the codebase.

### 5. Document Every Variable

Maintain a `.env.example` file committed to the repo with every variable, placeholder values, and comments. This is the contract for new developers joining the project.

## Secrets Management

Per nodebestpractices, secrets should never be stored in committed config files. Three approaches by scale:

| Approach | Best For | Secrets Safe? |
|----------|----------|---------------|
| `.env.local` + dotenv | Local dev, small projects | Only if gitignored |
| Platform env vars (Vercel, Railway) | Hosted apps | Yes (encrypted at rest) |
| AWS SSM / Vault / Doppler | Production, team rotation | Yes (audit trail, rotation) |

## Common Mistakes

- **Committing `.env` with real secrets.** Use `.env.example` for documentation, `.env.local` for real values.
- **Accessing `process.env` everywhere.** Centralize in a single module that validates and exports typed values.
- **No startup validation.** The app should crash immediately on missing required config, not fail silently at runtime.
- **Flat config structure.** Group related values hierarchically (db.host, db.port) for maintainability at scale.
