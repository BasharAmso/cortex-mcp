---
id: PAT-0010
name: CI/CD Pipeline Patterns
category: patterns
tags: [ci-cd, continuous-integration, continuous-deployment, pipeline, automation, docker, containerization, blue-green, canary, rollback]
capabilities: [pipeline-design, build-automation, deployment-strategy]
useWhen:
  - setting up a CI/CD pipeline for a new project
  - improving an existing build-test-deploy flow
  - choosing a deployment strategy (blue-green, canary, rolling)
  - containerizing an application with Docker
  - automating testing and releases
estimatedTokens: 650
relatedFragments: [PAT-0007, EX-0007, AGT-0008, SKL-0043]
dependencies: []
synonyms: ["how to set up automatic deploys", "how to run tests automatically on every push", "how to build a ci cd pipeline", "how to automate my deployments", "what is continuous integration and how to set it up"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/veggiemonk/awesome-docker"
difficulty: intermediate
---

# CI/CD Pipeline Patterns

Build, test, and deploy automation with container-first practices.

## Standard Pipeline Stages

```
Push -> Lint -> Test -> Build -> Deploy (staging) -> Deploy (production)
```

| Stage | Purpose | Fail Behavior |
|-------|---------|---------------|
| **Lint** | Code style + static analysis | Block merge |
| **Test** | Unit + integration tests | Block merge |
| **Build** | Compile, bundle, create Docker image | Block deploy |
| **Deploy (staging)** | Deploy to preview environment | Block production |
| **Deploy (production)** | Ship to users | Auto-rollback on failure |

## Docker Best Practices

Containerization is the foundation of modern CI/CD. Key practices from the Docker ecosystem:

1. **Use multi-stage builds** to keep production images small. Build dependencies stay in the build stage; only runtime artifacts reach the final image.
2. **Pin base image versions** (`node:20.11-alpine`, not `node:latest`). Reproducible builds prevent "works on my machine."
3. **One process per container.** Don't run your app + database + nginx in the same container.
4. **Use `.dockerignore`** to exclude `node_modules`, `.git`, `.env`, and test files from the build context.
5. **Scan images for vulnerabilities** (Trivy, Snyk Container) as a CI pipeline step.

```dockerfile
# Multi-stage build example
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## Deployment Strategies

| Strategy | How It Works | Best For |
|----------|-------------|----------|
| **Direct** | Replace old version with new | Dev/staging environments |
| **Blue-Green** | Two environments, switch traffic atomically | Zero-downtime deploys |
| **Canary** | Route small % of traffic to new version first | High-traffic apps, risk reduction |
| **Rolling** | Update instances one at a time | Kubernetes, container orchestration |

## Pipeline Guidelines

1. **Every push triggers the pipeline.** No manual builds, no "skip CI" in commits.
2. **Tests must pass before merge.** No exceptions.
3. **Keep the pipeline under 10 minutes.** Parallelize lint, test, and build stages. Cache dependencies aggressively.
4. **Pin all dependency versions.** Use lockfiles (`package-lock.json`, `pnpm-lock.yaml`). Non-deterministic builds are debugging nightmares.
5. **Secrets in CI environment variables**, never in Dockerfiles, config files, or code.
6. **Every deploy has a rollback plan.** Know how to revert before you ship. Blue-green makes this a traffic switch.
7. **Tag images with git SHA**, not just `latest`. Makes rollback to a specific commit trivial.

## Anti-Patterns

- Manual deployment steps that someone forgets
- Tests that pass locally but fail in CI (environment differences)
- Deploying without running the full test suite
- No staging environment (shipping untested code to production)
- Using `latest` tag in production (non-reproducible deployments)
- Build artifacts that differ between environments
