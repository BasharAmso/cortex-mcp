---
id: SKL-0167
name: Understanding Testing
category: skills
tags: [testing, unit-tests, integration-tests, test-driven, assertions, test-runners]
capabilities: [test-comprehension, test-reading, test-writing-basics, test-type-selection]
useWhen:
  - seeing tests in a codebase for the first time and wanting to understand them
  - deciding what kind of tests to write for a feature
  - learning the AAA pattern for structuring tests
  - understanding why tests exist and what value they provide
  - reading test output and understanding pass/fail results
estimatedTokens: 650
relatedFragments: [PAT-0087, SKL-0164]
dependencies: []
synonyms: ["what are unit tests", "how do I write tests", "what is the point of testing", "how to read test files", "what is the difference between unit and integration tests"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/goldbergyoni/javascript-testing-best-practices"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Understanding Testing

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0167 |
| **Name** | Understanding Testing |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Tests are code that checks whether your other code works correctly. They run automatically, catch bugs before users do, and give you confidence to make changes without breaking things. The golden rule from JavaScript Testing Best Practices: tests should be "dead-simple, flat, and delightful to work with."

### Types of Tests

| Type | What It Tests | Speed | Example |
|------|--------------|-------|---------|
| **Unit** | A single function in isolation | Fast (ms) | Does `calculateTotal(items)` return the right sum? |
| **Integration** | Multiple parts working together | Medium (seconds) | Does the API endpoint save to the database correctly? |
| **End-to-End (E2E)** | The whole app from a user's perspective | Slow (seconds-minutes) | Can a user sign up, log in, and create a post? |

Start with unit tests. They are fastest to write, fastest to run, and catch the most bugs per effort invested.

### The AAA Pattern

Every well-structured test follows three steps:

```javascript
test('calculates total for items with quantity', () => {
  // Arrange — set up the scenario
  const items = [
    { name: 'Widget', price: 10, quantity: 2 },
    { name: 'Gadget', price: 25, quantity: 1 }
  ];

  // Act — execute the thing you are testing
  const total = calculateTotal(items);

  // Assert — verify the result
  expect(total).toBe(45);
});
```

Keep each section visually distinct. The Act step is usually one line. The Assert step is usually one line.

### Test Naming Convention

Use a three-part naming structure so anyone can understand the test without reading the code:

```
[Unit being tested] — [scenario] — [expected outcome]
```

Examples:
- "calculateTotal — when items have quantities — returns sum of price times quantity"
- "loginForm — when password is empty — shows validation error"

### What to Test First

Focus on the highest-value tests:

1. **Business logic** — calculations, validations, transformations
2. **Edge cases** — empty inputs, null values, boundary numbers
3. **Error paths** — what happens when things fail
4. **Public behavior** — test outputs, not internal implementation details

### Reading Test Output

When tests run, each test shows a pass or fail status. A failing test shows:
- **Expected value** — what the test wanted
- **Received value** — what the code actually produced
- **Location** — which test file and line number failed

This is essentially a specialized error message, and you read it the same way (see SKL-0164).

## Key Takeaways

- Tests verify that your code does what it is supposed to do, automatically
- Follow the AAA pattern: Arrange the scenario, Act on the code, Assert the result
- Name tests with three parts: what, scenario, expected outcome
- Start with unit tests on business logic and edge cases
- Test public behavior (outputs), not internal implementation details
