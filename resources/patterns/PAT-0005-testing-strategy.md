---
id: PAT-0005
name: Testing Strategy
category: patterns
tags: [testing, unit-test, integration-test, e2e, test-pyramid, tdd, aaa-pattern, property-testing, black-box]
capabilities: [test-planning, test-pyramid-design, coverage-strategy]
useWhen:
  - planning a testing strategy for a new project
  - deciding what to test and at what level
  - improving test coverage or fixing flaky tests
  - setting up a test suite from scratch
  - reviewing test quality and effectiveness
estimatedTokens: 650
relatedFragments: [EX-0006, PAT-0010, SKL-0042]
dependencies: []
synonyms: ["how to test my code", "what tests should I write first", "how to set up a test suite", "my tests keep breaking randomly", "do I need unit tests or integration tests"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/goldbergyoni/javascript-testing-best-practices"
difficulty: intermediate
owner: builder
---

# Testing Strategy

Design tests for lean, high-value coverage. The golden rule: test code should be dead-simple to read. If you need to think hard to understand a test, the test is too complex.

## The Test Pyramid

| Level | Share | Speed | What It Validates |
|-------|-------|-------|-------------------|
| **Unit** | ~70% | Milliseconds | Individual functions, business logic, edge cases |
| **Integration** | ~20% | Seconds | Components working together (API + DB, service + queue) |
| **E2E** | ~10% | Minutes | Critical user flows through the real system |

## The AAA Pattern (Every Test)

1. **Arrange** -- Set up the scenario: create data, configure mocks
2. **Act** -- Execute exactly one behavior
3. **Assert** -- Verify the outcome matches expectations

Keep each section visually separated. One concept per test.

## Test Naming Convention

Include three parts in every test name:

```
[Unit under test] [Scenario] [Expected result]

"ProductService / when price is zero / should reject with validation error"
```

## What to Test (Priority Order)

1. **Business logic and data transformations** -- highest value, lowest cost
2. **Error paths and edge cases** -- bugs hide here, not in happy paths
3. **API endpoints with realistic data** -- use libraries like Faker, not "foo" and "bar"
4. **Critical user flows (E2E)** -- signup, purchase, core workflow only

## Key Principles from JS Testing Best Practices

- **Test behavior, not implementation.** Tests that break on refactoring are liabilities. Use black-box testing: test public methods only.
- **Favor stubs and spies over mocks.** Mocks test internal calls. Stubs simulate external dependencies. Spies verify side effects (email sent, event emitted).
- **Use realistic input data.** Production bugs come from surprising input, not "test123". Use Faker or property-based testing (fast-check) to generate realistic data.
- **Keep snapshots small and inline.** If a snapshot exceeds 7 lines, it couples your test to details no one will review.
- **Tag and isolate slow tests.** Run unit tests on every save, integration on every push, E2E nightly or pre-deploy.

## Anti-Patterns

- Testing framework internals or trivial getters/setters
- Excessive mocking that makes tests pass but misses real bugs
- Flaky tests left in the suite (fix immediately or delete)
- Chasing 100% coverage (diminishing returns past ~80%)
- Tests that depend on execution order or shared mutable state
- Slow test suites that developers stop running locally
