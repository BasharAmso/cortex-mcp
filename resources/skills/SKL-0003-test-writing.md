---
id: SKL-0003
name: Test Writing
category: skills
tags: [testing, unit-tests, integration-tests, e2e, vitest, jest]
capabilities: [test-creation, test-design, coverage-analysis, assertion-patterns]
useWhen:
  - writing tests for new or existing code
  - adding test coverage for a feature
  - setting up a test framework
  - designing test cases from requirements
estimatedTokens: 750
relatedFragments: [SKL-0002, AGT-0002]
dependencies: []
---

# Test Writing

Write automated tests for code correctness and regression prevention.

## Procedure

### 1. Identify What to Test

From the code or requirements, identify:

- **Happy path** — the main success scenario
- **Edge cases** — empty inputs, boundaries, nulls, max values
- **Error cases** — invalid input, network failures, missing data
- **Integration points** — API calls, database queries, external services

### 2. Choose Test Type

| Type | When | Speed | Confidence |
|------|------|-------|------------|
| Unit | Pure functions, utilities, transformations | Fast | Medium |
| Integration | API endpoints, database queries, service interactions | Medium | High |
| E2E | Critical user flows, checkout, signup | Slow | Highest |

Rule of thumb: 70% unit, 20% integration, 10% e2e.

### 3. Write Tests

Follow this structure for each test:

```typescript
describe("ComponentName", () => {
  it("should [expected behavior] when [condition]", () => {
    // Arrange — set up inputs and dependencies
    // Act — call the function or trigger the behavior
    // Assert — verify the output or side effects
  });
});
```

### 4. Test Naming Convention

- `should return X when given Y` (behavior-focused)
- `should throw when X is missing` (error cases)
- `should not modify X when Y` (side effect prevention)

### 5. Review Checklist

- [ ] Happy path covered
- [ ] At least 2 edge cases per function
- [ ] Error cases have expected error types
- [ ] No tests that depend on execution order
- [ ] No hardcoded dates, ports, or paths
- [ ] Cleanup after each test (no shared mutable state)

## Output

Test files in the project's test directory, all passing.
