---
id: EX-0006
name: Unit Test Example
category: examples
tags: [testing, unit-test, vitest, jest, arrange-act-assert, mocking]
capabilities: [unit-test-writing, test-structure, mocking-patterns]
useWhen:
  - writing unit tests for a function or module
  - learning the arrange-act-assert test pattern
  - mocking dependencies in tests
estimatedTokens: 550
relatedFragments: [PAT-0005, EX-0004]
dependencies: []
synonyms: ["how to write a unit test", "vitest or jest test example", "how to mock a function in tests", "arrange act assert pattern example", "how to test my functions"]
sourceUrl: "https://github.com/goldbergyoni/javascript-testing-best-practices"
lastUpdated: "2026-03-30"
difficulty: beginner
owner: builder
pillar: "software-dev"
---

# Unit Test Example

Unit tests using Vitest following javascript-testing-best-practices: AAA pattern, three-part naming, realistic data, and behavioral assertions over implementation details.

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { calculateDiscount, applyPromoCode } from "./pricing";

// Test name convention: what | conditions | expected outcome
describe("calculateDiscount", () => {
  it("should apply percentage discount to the subtotal", () => {
    // Arrange: set up test data (use realistic values, not "foo")
    const subtotal = 100;
    const discountPercent = 15;

    // Act: execute the unit under test (typically one line)
    const result = calculateDiscount(subtotal, discountPercent);

    // Assert: verify outcome with declarative syntax
    expect(result).toBe(85);
  });

  it("should never return a negative total when discount exceeds subtotal", () => {
    const result = calculateDiscount(50, 100);
    expect(result).toBe(0);
  });

  it("should handle zero subtotal gracefully", () => {
    const result = calculateDiscount(0, 20);
    expect(result).toBe(0);
  });

  it("should round to two decimal places for currency precision", () => {
    const result = calculateDiscount(99.99, 33);
    expect(result).toBe(66.99);
  });
});

describe("applyPromoCode", () => {
  // Prefer stubs and spies over mocks (testing-best-practices:
  // mocks couple tests to implementation, breaking on refactor)
  const mockLookup = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks(); // Prevent test pollution between cases
  });

  it("should apply valid promo code and return discounted total", async () => {
    // Arrange: stub resolves with realistic promo data
    mockLookup.mockResolvedValue({ discount: 20, active: true });

    // Act
    const result = await applyPromoCode("SAVE20", 100, mockLookup);

    // Assert: verify behavior the user experiences, not internal calls
    expect(result).toEqual({ total: 80, applied: true, code: "SAVE20" });
    expect(mockLookup).toHaveBeenCalledWith("SAVE20");
  });

  it("should reject expired promo code without applying discount", async () => {
    mockLookup.mockResolvedValue({ discount: 20, active: false });

    const result = await applyPromoCode("EXPIRED", 100, mockLookup);

    expect(result).toEqual({ total: 100, applied: false, code: "EXPIRED" });
  });
});
```

## Key Points

- **Arrange-Act-Assert** separates setup, execution, and verification for clarity
- **Three-part test names** (what, conditions, expected) make failures self-explanatory
- **Realistic test data** catches edge cases that placeholder values miss
- **Stubs over mocks** (testing-best-practices): verify behavioral outcomes, not implementation calls
- **`beforeEach` cleanup** prevents test pollution across cases
- **Black-box testing**: test public API behavior, never private methods or internal state
