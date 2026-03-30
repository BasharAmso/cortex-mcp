---
id: SKL-0018
name: Deployment
category: skills
tags: [deployment, ci-cd, release, ship, infrastructure, docker, containerization, mobile]
capabilities: [ship-workflow, ci-cd-setup, changelog-generation, version-bumping, mobile-submission, container-deployment]
useWhen:
  - shipping code from a feature branch to production
  - setting up CI/CD pipelines for the first time
  - submitting a mobile app to TestFlight or Google Play
  - creating a release with changelog and version bump
  - containerizing an application with Docker for deployment
estimatedTokens: 800
relatedFragments: [SKL-0031, SKL-0002, AGT-0001]
dependencies: []
synonyms: ["how do I deploy my app", "push my code to production", "set up CI CD pipeline", "ship this feature", "submit my app to the app store"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/veggiemonk/awesome-docker"
difficulty: advanced
---

# Deployment

Ship code safely with four modes: Ship (land a feature branch), Setup (first-time CI/CD), Container (Docker-based deployment), and Mobile Ship (app store submission).

## Ship Mode (Default)

Run straight through. Only stop for blockers.

1. **Pre-flight** -- Confirm you are on a feature branch (never ship from main). Check status and diff.
2. **Merge main** -- Fetch and merge origin/main so tests run against merged state.
3. **Run tests** -- Detect test runner and execute. Stop on any failure.
4. **Pre-landing review** -- Apply code review checklist in two passes: critical (security, data safety) then informational (quality, consistency).
5. **Version bump** -- If a VERSION file exists, bump it (default PATCH, ask for MINOR/MAJOR).
6. **Auto-generate changelog** -- Infer changes from diff and commits. Categorize as Added/Changed/Fixed/Removed.
7. **Cross-reference TODOs** -- Mark completed items in TODOS.md if evidence supports it.
8. **Commit in bisectable chunks** -- Group logically. Infrastructure first, core logic next, UI last, metadata final.
9. **Push and create PR** -- Push with `-u` flag. Create PR with summary, review findings, and test plan.

## Setup Mode

For projects without CI/CD:

1. Confirm deployment target (Vercel, Railway, Fly.io, or self-hosted)
2. Audit environment variables and .env.example
3. Configure CI/CD pipeline (install, test, build, deploy)
4. Run pre-deployment checklist (no debug mode, no hardcoded credentials, SSL confirmed)
5. Document in deployment docs

## Container Mode

For Docker-based deployments:

| Step | Action | Tool |
|------|--------|------|
| 1. Write Dockerfile | Multi-stage build, minimal base image (Alpine/distroless) | Docker |
| 2. Compose services | Define service dependencies and networking | Docker Compose |
| 3. Optimize image | Layer caching, .dockerignore, no secrets in layers | Docker best practices |
| 4. Health checks | Add HEALTHCHECK instruction and readiness probes | Docker / orchestrator |
| 5. Registry push | Tag with version and SHA, push to registry | Docker Hub / GHCR / ECR |

**Container security checklist:**
- Run as non-root user
- Pin base image versions (no `latest` tag)
- Scan images for vulnerabilities before pushing
- Never copy secrets into image layers
- Use multi-stage builds to exclude build dependencies

## Mobile Ship Mode

For native iOS/Android apps:

1. Detect platform (Xcode project = iOS, Gradle = Android)
2. Run platform tests, increment version and build number
3. Build, sign, and submit to TestFlight/App Store or Firebase/Play Store
4. Check common rejection reasons before submitting

## Key Rules

- Never force push
- Never commit secrets
- Never deploy without running tests
- Never skip the pre-landing review
- Always document rollback procedure
- Container images must be reproducible (pinned versions, lock files copied)
