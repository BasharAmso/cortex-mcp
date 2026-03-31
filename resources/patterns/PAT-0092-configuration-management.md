---
id: PAT-0092
name: Configuration Management
category: patterns
tags: [configuration, environment-variables, dotenv, env-files, twelve-factor, secrets]
capabilities: [env-var-management, config-separation, secrets-handling, environment-setup]
useWhen:
  - setting up environment variables for a new project
  - learning how .env files work and how to use them safely
  - separating configuration from code following 12-factor principles
  - managing different configurations for development, staging, and production
  - understanding how to handle secrets and API keys in a project
estimatedTokens: 650
relatedFragments: [SKL-0171, PAT-0090, PAT-0093]
dependencies: []
synonyms: ["how do .env files work", "how to manage environment variables", "how to store API keys safely in my project", "what is 12-factor app configuration", "how to set up different configs for dev and production"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/motdotla/dotenv"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Pattern: Configuration Management

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0092 |
| **Name** | Configuration Management |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Configuration is anything that varies between environments: API keys, database URLs, feature flags, and service endpoints. The dotenv library popularized the pattern of loading configuration from `.env` files into environment variables, following the Twelve-Factor App methodology that mandates strict separation of config from code.

### The Core Principle

**Never hardcode configuration values in your source code.** Database passwords, API keys, and service URLs should come from the environment, not from your codebase. This separation means the same code runs in development, staging, and production with different configurations.

### How .env Files Work

A `.env` file is a simple text file with key-value pairs:

```
DATABASE_URL="postgresql://localhost:5432/myapp"
API_KEY="sk-abc123"
PORT=3000
NODE_ENV="development"
```

A library like dotenv reads this file at application startup and makes the values available through `process.env` (Node.js), `os.environ` (Python), or the language's equivalent. The application code accesses values like `process.env.DATABASE_URL` without knowing whether the value came from a file, a container environment, or a cloud secret manager.

### The Golden Rules

1. **Never commit `.env` files to version control.** Add `.env` to your `.gitignore` immediately when creating a project. Committed secrets are exposed to everyone with repository access and remain in git history even after deletion.

2. **Commit a `.env.example` file.** This template lists all required variables with placeholder values so new developers know what to configure:
   ```
   DATABASE_URL="your-database-url-here"
   API_KEY="your-api-key-here"
   PORT=3000
   ```

3. **Do not share values between environment files.** Each environment (`.env`, `.env.production`, `.env.test`) should be self-contained. Inheriting values between files creates hidden dependencies.

4. **Validate configuration at startup.** Check that all required environment variables are present when the application starts. Fail immediately with a clear error message rather than crashing later with a cryptic `undefined` error.

### The Twelve-Factor Config Principle

The Twelve-Factor App methodology states: "Store config in the environment." This means:

- Config that changes between deploys (credentials, resource handles, per-deploy values) belongs in environment variables
- Config that does not change between deploys (code structure, internal routing) belongs in the codebase
- If you can open-source your code without exposing any secrets, your config separation is correct

### Beyond .env Files

As applications grow, `.env` files may not be sufficient:

- **Cloud secret managers** (AWS Secrets Manager, Google Secret Manager, Azure Key Vault) provide encrypted storage, access control, and rotation for sensitive values
- **Config services** (Consul, etcd) centralize configuration for distributed systems
- **CI/CD environment variables** inject secrets at build or deploy time without storing them in files

The pattern stays the same regardless of the source: application code reads from environment variables, and the infrastructure decides how those variables get set.

## Key Takeaways

- Never hardcode secrets or environment-specific values in source code
- Add `.env` to `.gitignore` and commit a `.env.example` with placeholder values instead
- Validate all required environment variables at application startup
- The same code should run in every environment; only the configuration changes
- As projects grow, graduate from `.env` files to cloud secret managers
