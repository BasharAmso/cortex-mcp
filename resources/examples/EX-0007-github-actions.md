---
id: EX-0007
name: GitHub Actions CI Workflow
category: examples
tags: [github-actions, ci, workflow, automation, testing, deployment]
capabilities: [ci-pipeline-setup, automated-testing, build-automation]
useWhen:
  - setting up CI/CD with GitHub Actions
  - automating tests on pull requests
  - creating a build-test-deploy pipeline
estimatedTokens: 550
relatedFragments: [PAT-0010, PAT-0007, AGT-0008]
dependencies: []
synonyms: ["how to set up github actions", "github ci workflow example", "how to run tests automatically on pull requests", "how to automate builds with github actions", "github actions yaml example"]
sourceUrl: "https://github.com/sdras/awesome-actions"
lastUpdated: "2026-03-30"
difficulty: beginner
---

# GitHub Actions CI Workflow

A CI pipeline using battle-tested actions from the ecosystem. Lints, tests, builds, and caches on every push and PR.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      # actions/checkout: setup repository on workflow runner
      - uses: actions/checkout@v4
      # actions/setup-node: configure Node.js version with caching
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test -- --coverage
      # actions/upload-artifact: persist test results for later inspection
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: coverage-report
          path: coverage/

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      # actions/upload-artifact: store build output for deployment jobs
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/
```

## Key Points

- **Concurrency control** cancels in-progress runs when a new push arrives (saves runner minutes)
- **Sequential stages:** lint -> test -> build (fail fast on cheap checks first)
- **`npm ci`** for deterministic installs from `package-lock.json` exactly
- **`actions/cache`** is built into `actions/setup-node` via the `cache` option
- **`actions/upload-artifact`** persists coverage and build output across jobs
- **`if: always()`** on coverage upload ensures reports are saved even on test failure
- **Runs on push to main and all PRs** so every change is validated before merge
