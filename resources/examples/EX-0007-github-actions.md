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
lastUpdated: "2026-03-29"
difficulty: beginner
---

# GitHub Actions CI Workflow

A CI pipeline that lints, tests, and builds on every push and PR.

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
      - uses: actions/checkout@v4
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
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/
```

## Key Points

- **Concurrency control** cancels in-progress runs when a new push arrives
- **Sequential stages:** lint -> test -> build (fail fast on cheap checks)
- **npm ci** for deterministic installs (uses package-lock.json exactly)
- **Cache npm** to speed up dependency installation
- **Upload artifacts** for coverage reports and build output
- **Runs on push to main and all PRs** -- every change is validated
