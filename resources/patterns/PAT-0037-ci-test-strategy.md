---
id: PAT-0037
name: CI Test Strategy
category: patterns
tags: [ci, continuous-integration, test-pipeline, parallel-testing, test-splitting, caching, fail-fast, github-actions]
capabilities: [ci-test-pipeline-design, parallel-execution, test-reporting]
useWhen:
  - setting up a CI pipeline for running tests
  - speeding up slow test suites in CI
  - configuring test splitting and parallelism
  - choosing a fail-fast strategy for pull requests
estimatedTokens: 600
relatedFragments: [PAT-0005, PAT-0010, SKL-0003, PAT-0033, PAT-0035]
dependencies: []
synonyms: ["how to run tests faster in CI", "github actions test setup", "parallel test execution", "my CI tests take too long", "how to split tests across machines", "test pyramid in CI"]
lastUpdated: "2026-03-29"
difficulty: advanced
---

# CI Test Strategy

Fast, reliable test pipelines that give developers confidence without slowing them down.

## Test Pyramid in CI

Run cheaper tests first. Fail fast on the cheapest layer.

```
Stage 1 (seconds)    ─── Lint + Type Check ──────── fail-fast gate
Stage 2 (seconds)    ─── Unit Tests ─────────────── fail-fast gate
Stage 3 (minutes)    ─── Integration Tests ──────── parallel
Stage 4 (minutes)    ─── E2E Tests ──────────────── parallel, PR + nightly
```

| Stage | Trigger | Parallelism | Failure Action |
|-------|---------|-------------|---------------|
| Lint + Types | Every push | 1 runner | Cancel pipeline |
| Unit | Every push | 1-2 runners | Cancel pipeline |
| Integration | Every push | 2-4 runners | Report, continue E2E |
| E2E | PR + nightly | 3-6 runners | Report, block merge |

## Fail-Fast Configuration

```yaml
# .github/workflows/test.yml
jobs:
  lint-and-types:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint && npm run typecheck

  unit:
    needs: lint-and-types
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test -- --reporter=junit --outputFile=results.xml
      - uses: dorny/test-reporter@v1
        if: always()
        with:
          name: Unit Tests
          path: results.xml
          reporter: jest-junit
```

## Parallel Test Execution

Split tests across runners using sharding:

```yaml
  integration:
    needs: unit
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx vitest --shard=${{ matrix.shard }}/4
```

For Playwright:

```yaml
      - run: npx playwright test --shard=${{ matrix.shard }}/${{ strategy.job-total }}
```

## Dependency Caching

```yaml
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'          # caches ~/.npm
      - run: npm ci             # skips download if cache hit
```

For Playwright browsers:

```yaml
      - uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ hashFiles('package-lock.json') }}
      - run: npx playwright install --with-deps
```

## Test Splitting Strategies

| Strategy | How | Best For |
|----------|-----|----------|
| **File-based sharding** | `--shard=N/M` | Even file sizes |
| **Timing-based splitting** | Split by last-run duration | Uneven test files |
| **Tag-based splitting** | `@smoke`, `@slow`, `@nightly` | Mixed priority suites |
| **Changed-file scoping** | Run tests related to changed files | Monorepos, fast PRs |

## Test Reporting

```yaml
      - uses: dorny/test-reporter@v1
        if: always()            # report even on failure
        with:
          name: Integration Tests
          path: '**/results.xml'
          reporter: jest-junit

      # Slack notification on failure (optional)
      - uses: slackapi/slack-github-action@v2
        if: failure()
        with:
          payload: |
            {"text": "Tests failed on ${{ github.ref_name }}"}
```

## Speed Optimization Checklist

1. Cache `node_modules` and browser binaries
2. Run lint and types before any test stage
3. Shard integration and E2E tests across 2-6 runners
4. Use `--bail` or `--fail-fast` to stop on first failure in unit tests
5. Run E2E only on PRs and nightly, not every push
6. Use timing-based splitting for uneven test suites
7. Keep test database in-memory or use transaction rollback
8. Skip unchanged test scopes in monorepos (`--changed` flag)

## Anti-Patterns

- Running all test levels sequentially on one runner
- No caching (full npm install on every run)
- E2E tests blocking every push (run on PR only)
- No test reporting (developers read raw logs instead of summaries)
- Retry-only strategy for flaky tests (fix the root cause)
- No timeout per job (hung tests block the pipeline indefinitely)
