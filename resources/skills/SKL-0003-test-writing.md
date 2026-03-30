---
id: SKL-0003
name: Test Writing
category: skills
tags: [testing, unit-tests, integration-tests, e2e, vitest, jest, aaa-pattern, test-design, coverage]
capabilities: [test-creation, test-design, coverage-analysis, assertion-patterns, golden-rule-testing]
useWhen:
  - writing tests for new or existing code
  - adding test coverage for a feature
  - setting up a test framework
  - designing test cases from requirements
  - following the AAA pattern for clean test structure
estimatedTokens: 750
relatedFragments: [SKL-0002, AGT-0002]
dependencies: []
synonyms: ["how do I write tests", "add tests to my code", "I need unit tests", "set up testing for my project", "make sure my code works"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/goldbergyoni/javascript-testing-best-practices"
difficulty: intermediate
---

# Test Writing

Write automated tests for code correctness and regression prevention. Follows the Golden Rule from the JavaScript Testing Best Practices guide (50+ practices): design tests to be short, dead-simple, flat, and delightful to work with.

## Procedure

### 1. Identify What to Test

From the code or requirements, identify:

- **Happy path** -- the main success scenario
- **Edge cases** -- empty inputs, boundaries, nulls, max values
- **Error cases** -- invalid input, network failures, missing data
- **Integration points** -- API calls, database queries, external services

### 2. Choose Test Type

| Type | When | Speed | Confidence |
|------|------|-------|------------|
| Unit | Pure functions, utilities, transformations | Fast | Medium |
| Integration | API endpoints, database queries, service interactions | Medium | High |
| E2E | Critical user flows, checkout, signup | Slow | Highest |

Rule of thumb: 70% unit, 20% integration, 10% E2E.

### 3. Name Tests With 3 Parts

Every test name must include: (1) what is being tested, (2) under what scenario, (3) what is the expected result.

```
"ProductService -- when no price is specified -- status is pending approval"
```

### 4. Structure With AAA Pattern

Every test follows Arrange, Act, Assert:

```typescript
describe("CustomerClassifier", () => {
  it("should classify as premium when customer spent over $500", () => {
    // Arrange -- set up inputs and dependencies
    const customer = { spent: 505, joined: new Date(), id: 1 };

    // Act -- execute the unit under test
    const result = classifyCustomer(customer);

    // Assert -- verify the output
    expect(result).toBe("premium");
  });
});
```

### 5. Key Practices From the Guide

| Practice | Rule |
|----------|------|
| Black-box testing | Test only public methods; never test internals |
| Realistic data | Use faker/chance libraries, not "foo" and "bar" |
| Stubs over mocks | Prefer stubs and spies; mocks couple to internals |
| Inline snapshots | If using snapshots, keep them under 7 lines and inline |
| Property-based | For functions with many input combos, use fast-check |
| No shared state | Each test is independent; no execution order dependency |

### 6. Review Checklist

- [ ] Happy path covered
- [ ] At least 2 edge cases per function
- [ ] Error cases have expected error types
- [ ] No tests that depend on execution order
- [ ] No hardcoded dates, ports, or paths
- [ ] Cleanup after each test (no shared mutable state)
- [ ] Test names follow the 3-part convention

## Output

Test files in the project's test directory, all passing.
