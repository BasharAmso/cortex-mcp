---
id: SKL-0018
name: Deployment
category: skills
tags: [deployment, ci-cd, release, ship, infrastructure, mobile]
capabilities: [ship-workflow, ci-cd-setup, changelog-generation, version-bumping, mobile-submission]
useWhen:
  - shipping code from a feature branch to production
  - setting up CI/CD pipelines for the first time
  - submitting a mobile app to TestFlight or Google Play
  - creating a release with changelog and version bump
estimatedTokens: 800
relatedFragments: [SKL-0031, SKL-0002, AGT-0001]
dependencies: []
---

# Deployment

Ship code safely with three modes: Ship (land a feature branch), Setup (first-time CI/CD), and Mobile Ship (app store submission).

## Ship Mode (Default)

Run straight through. Only stop for blockers.

1. **Pre-flight** — Confirm you are on a feature branch (never ship from main). Check status and diff.
2. **Merge main** — Fetch and merge origin/main so tests run against merged state.
3. **Run tests** — Detect test runner and execute. Stop on any failure.
4. **Pre-landing review** — Apply code review checklist in two passes: critical (security, data safety) then informational (quality, consistency).
5. **Version bump** — If a VERSION file exists, bump it (default PATCH, ask for MINOR/MAJOR).
6. **Auto-generate changelog** — Infer changes from diff and commits. Categorize as Added/Changed/Fixed/Removed.
7. **Cross-reference TODOs** — Mark completed items in TODOS.md if evidence supports it.
8. **Commit in bisectable chunks** — Group logically. Infrastructure first, core logic next, UI last, metadata final.
9. **Push and create PR** — Push with `-u` flag. Create PR with summary, review findings, and test plan.

## Setup Mode

For projects without CI/CD:

1. Confirm deployment target (Vercel for frontend, Railway for backend, GitHub Actions for CI)
2. Audit environment variables and .env.example
3. Configure CI/CD pipeline (install, test, build, deploy)
4. Run pre-deployment checklist (no debug mode, no hardcoded credentials, SSL confirmed)
5. Document in deployment docs

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
