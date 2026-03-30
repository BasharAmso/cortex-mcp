---
id: SKL-0041
name: TDD Workflow
category: skills
tags: [tdd, test-driven-development, red-green-refactor, unit-testing, testing, jest, vitest, aaa-pattern, behavior-testing]
capabilities: [tdd-process, test-first-development, iterative-design]
useWhen:
  - building a new feature where the requirements are clear
  - implementing business logic that has well-defined inputs and outputs
  - fixing a bug (write a test that reproduces it first)
  - refactoring code that needs a safety net of tests
  - onboarding a team to test-driven development practices
estimatedTokens: 600
relatedFragments: [PAT-0005, EX-0006, SKL-0039]
dependencies: []
synonyms: ["how to do test driven development", "write tests before code", "red green refactor explained", "how to use TDD in practice", "should I write tests first or code first"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/goldbergyoni/javascript-testing-best-practices"
difficulty: intermediate
---

# TDD Workflow

Test-Driven Development: write the test first, watch it fail, make it pass, then refactor. Grounded in the JavaScript Testing Best Practices golden rule: design tests to be short, dead-simple, and delightful to work with.

## The Red-Green-Refactor Cycle

```
RED    ->  Write a failing test for the next behavior
GREEN  ->  Write the minimum code to make the test pass
REFACTOR -> Clean up the code without changing behavior (tests stay green)
REPEAT ->  Pick the next behavior
```

Each cycle should take 2-10 minutes. If you are stuck in RED for more than 10 minutes, the step is too big. Break it into a smaller behavior.

## Step-by-Step Process

1. **Pick one behavior.** Not a whole feature. One specific input-output pair or one edge case.
2. **Write the test using AAA pattern:**
   ```typescript
   describe("PricingService", () => {
     it("should apply 10% discount when cart total exceeds $100", () => {
       // Arrange
       const cart = createCart([{ price: 120, quantity: 1 }]);
       // Act
       const total = pricingService.calculateTotal(cart);
       // Assert
       expect(total).toBe(108);
     });
   });
   ```
3. **Run the test. Confirm it fails (RED).** If it passes, either the test is wrong or the behavior already exists.
4. **Write the simplest code that passes.** Resist the urge to over-engineer. Hard-code if needed.
5. **Run the test. Confirm it passes (GREEN).**
6. **Refactor.** Extract duplication, improve names, simplify logic. Run tests after every change.
7. **Pick the next behavior.** Repeat.

## Test Design Rules (from JS Testing Best Practices)

| Rule | Why |
|------|-----|
| Include 3 parts in the test name: [unit] / [scenario] / [expected result] | Makes test reports readable without looking at code |
| Structure every test as Arrange-Act-Assert | Reader understands intent instantly |
| Test behavior, not implementation (black-box) | Tests survive refactoring |
| Use realistic input data (Faker, not "foo") | Catches real-world edge cases |
| Prefer stubs over mocks | Mocks couple tests to internals |
| One concept per test | Failing test tells you exactly what broke |

## When TDD Works Best

- Business logic with clear rules (pricing, validation, permissions)
- Pure functions and data transformations
- Bug fixes (the failing test IS the bug report)
- API endpoint behavior (request in, response out)

## When to Skip TDD

- Exploratory prototyping (write tests after the spike)
- UI layout and styling (use visual regression tools instead)
- Third-party integration wiring (test at integration level)
- One-off scripts or migrations

## Common TDD Mistakes

- Writing too many tests before any code (batch mode defeats the feedback loop)
- Making the GREEN step too complex (smallest possible change)
- Skipping REFACTOR (tech debt accumulates fast)
- Testing implementation details that make refactoring painful
- Not running tests after every change during REFACTOR
