---
id: PAT-0087
name: Testing Patterns for Beginners
category: patterns
tags: [testing, aaa-pattern, test-naming, test-structure, beginner-testing, test-mistakes]
capabilities: [test-structuring, test-naming, test-prioritization, anti-pattern-avoidance]
useWhen:
  - writing your first tests for a project
  - structuring tests using the AAA pattern
  - naming tests so they describe behavior clearly
  - deciding which parts of the code to test first
  - reviewing tests for common beginner mistakes
estimatedTokens: 650
relatedFragments: [SKL-0167, PAT-0089]
dependencies: []
synonyms: ["how to structure a test", "what is Arrange Act Assert", "how to name tests", "what should I test first", "common testing mistakes"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/goldbergyoni/javascript-testing-best-practices"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Pattern: Testing Patterns for Beginners

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0087 |
| **Name** | Testing Patterns for Beginners |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

The JavaScript Testing Best Practices guide emphasizes one golden rule: tests should be "dead-simple, flat, and delightful to work with." These patterns make that possible.

### Pattern 1: AAA (Arrange-Act-Assert)

Every test should have three clearly separated sections:

```javascript
test('discount — when order exceeds $100 — applies 10% off', () => {
  // Arrange: set up the scenario
  const order = { items: [{ price: 60 }, { price: 50 }] };

  // Act: execute the function under test
  const total = applyDiscount(order);

  // Assert: verify the result
  expect(total).toBe(99); // 110 * 0.9
});
```

**Why it works:** Each section has one job. Arrange prepares data. Act runs one operation. Assert checks one expectation. When a test fails, you immediately know which part went wrong.

### Pattern 2: Three-Part Test Names

Name tests with: **[what] — [scenario] — [expected outcome]**

Good names:
- `loginForm — when email is missing — shows required field error`
- `calculateShipping — when weight is zero — returns free shipping`
- `userSignup — when email already exists — returns conflict error`

Bad names:
- `test1`
- `should work correctly`
- `handles edge case`

Three-part names serve as living documentation. You can read the test names alone and understand what the system does.

### Pattern 3: Test Public Behavior, Not Implementation

Test **what** code produces, not **how** it produces it.

```javascript
// Good — tests the output
test('search — when query matches — returns matching items', () => {
  const results = search(catalog, 'widget');
  expect(results).toHaveLength(3);
  expect(results[0].name).toContain('widget');
});

// Bad — tests internal implementation
test('search — calls filterArray internally', () => {
  const spy = jest.spyOn(utils, 'filterArray');
  search(catalog, 'widget');
  expect(spy).toHaveBeenCalled(); // breaks if you refactor
});
```

Testing implementation makes tests brittle. Every refactor breaks them even when behavior is unchanged.

### Pattern 4: What to Test First

Prioritize tests by value:

1. **Pure business logic** — calculations, validations, data transformations (highest value, easiest to test)
2. **Error paths** — what happens with bad input, network failures, empty data
3. **Edge cases** — zero, null, empty string, very large numbers, boundary values
4. **Happy path integrations** — does the API return the right data for a normal request

Skip testing: framework boilerplate, simple getters/setters, third-party library behavior.

### Common Mistakes to Avoid

| Mistake | Problem | Fix |
|---------|---------|-----|
| Testing implementation details | Tests break on every refactor | Test inputs and outputs only |
| No assertion in the test | Test always passes, catches nothing | Every test needs at least one `expect()` |
| Shared mutable state between tests | Tests pass alone but fail together | Reset state in `beforeEach` |
| Asserting too many things | Hard to diagnose which check failed | One concept per test |
| Copy-pasting test data | Tests become walls of duplicated setup | Use helper functions for test data |

## Key Takeaways

- Structure every test as Arrange-Act-Assert with clear visual separation
- Name tests with three parts: what, scenario, expected outcome
- Test public behavior and outputs, never internal implementation
- Start with pure business logic and error paths for highest value
- Each test should verify one concept with one assertion focus
