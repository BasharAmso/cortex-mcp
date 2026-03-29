---
id: PAT-0005
name: Testing Strategy
category: patterns
tags: [testing, unit-test, integration-test, e2e, test-pyramid, tdd]
capabilities: [test-planning, test-pyramid-design, coverage-strategy]
useWhen:
  - planning a testing strategy for a new project
  - deciding what to test and at what level
  - improving test coverage or fixing flaky tests
  - setting up a test suite from scratch
estimatedTokens: 600
relatedFragments: [EX-0006, PAT-0010]
dependencies: []
---

# Testing Strategy

The test pyramid, what to test, and common anti-patterns.

## The Test Pyramid

```
        /  E2E  \        Few, slow, expensive
       /----------\
      / Integration \    Moderate count, moderate speed
     /----------------\
    /    Unit Tests     \  Many, fast, cheap
```

| Level | Tests | Speed | What It Validates |
|-------|-------|-------|-------------------|
| **Unit** | 70% of tests | Milliseconds | Individual functions and logic |
| **Integration** | 20% of tests | Seconds | Components working together, API + DB |
| **E2E** | 10% of tests | Minutes | Full user flows through the real system |

## What to Test

- **Always test:** Business logic, data transformations, edge cases, error paths
- **Integration test:** API endpoints, database queries, auth flows
- **E2E test:** Critical user paths (signup, purchase, core workflow)
- **Skip testing:** Framework internals, trivial getters/setters, third-party library behavior

## Writing Good Tests

1. **Arrange-Act-Assert** structure for every test
2. **One assertion per concept** (not necessarily one assertion per test)
3. **Test behavior, not implementation** -- tests should survive refactoring
4. **Use descriptive names:** `should_return_error_when_email_is_invalid` not `test1`
5. **Isolate tests** -- no test should depend on another test's output

## Anti-Patterns

- Testing implementation details instead of behavior
- Excessive mocking that makes tests pass but misses real bugs
- Flaky tests that sometimes pass (fix or delete them)
- 100% coverage as a goal (diminishing returns past 80%)
- No tests on error paths (the happy path is rarely where bugs hide)
- Slow test suites that developers stop running
