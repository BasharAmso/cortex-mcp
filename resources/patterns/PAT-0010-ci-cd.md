---
id: PAT-0010
name: CI/CD Pipeline Patterns
category: patterns
tags: [ci-cd, continuous-integration, continuous-deployment, pipeline, automation]
capabilities: [pipeline-design, build-automation, deployment-strategy]
useWhen:
  - setting up a CI/CD pipeline for a new project
  - improving an existing build-test-deploy flow
  - choosing a deployment strategy (blue-green, canary, rolling)
  - automating testing and releases
estimatedTokens: 600
relatedFragments: [PAT-0007, EX-0007, AGT-0008]
dependencies: []
---

# CI/CD Pipeline Patterns

Build, test, and deploy automation.

## Standard Pipeline Stages

```
Push -> Lint -> Test -> Build -> Deploy (staging) -> Deploy (production)
```

| Stage | Purpose | Fail Behavior |
|-------|---------|---------------|
| **Lint** | Code style and static analysis | Block merge |
| **Test** | Unit + integration tests | Block merge |
| **Build** | Compile, bundle, create artifacts | Block deploy |
| **Deploy (staging)** | Deploy to preview environment | Block production |
| **Deploy (production)** | Ship to users | Rollback on failure |

## Deployment Strategies

| Strategy | How It Works | Best For |
|----------|-------------|----------|
| **Direct** | Replace old version with new | Simple apps, dev environments |
| **Blue-Green** | Run two environments, switch traffic | Zero-downtime deploys |
| **Canary** | Route small % of traffic to new version | High-traffic apps, risk reduction |
| **Rolling** | Update instances one at a time | Container orchestration (K8s) |

## Guidelines

1. **Every push triggers the pipeline.** No manual builds.
2. **Tests must pass before merge.** No exceptions, no "skip CI" in commit messages.
3. **Keep the pipeline under 10 minutes.** Slow pipelines get bypassed.
4. **Pin dependency versions.** Non-deterministic builds are debugging nightmares.
5. **Secrets in environment variables**, never in config files or code.
6. **Rollback plan for every deploy.** Know how to revert before you ship.

## Pipeline Anti-Patterns

- Manual deployment steps that someone forgets
- Tests that pass locally but fail in CI (environment differences)
- Deploying without running tests
- No staging environment (shipping untested to production)
- Build artifacts that differ between environments
