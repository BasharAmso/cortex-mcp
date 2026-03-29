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
---

# Unit Test Example

Unit tests using Vitest with arrange-act-assert pattern.

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { calculateDiscount, applyPromoCode } from "./pricing";

describe("calculateDiscount", () => {
  it("should apply percentage discount to the subtotal", () => {
    // Arrange
    const subtotal = 100;
    const discountPercent = 15;

    // Act
    const result = calculateDiscount(subtotal, discountPercent);

    // Assert
    expect(result).toBe(85);
  });

  it("should never return a negative total", () => {
    const result = calculateDiscount(50, 100);
    expect(result).toBe(0);
  });

  it("should handle zero subtotal", () => {
    const result = calculateDiscount(0, 20);
    expect(result).toBe(0);
  });

  it("should round to two decimal places", () => {
    const result = calculateDiscount(99.99, 33);
    expect(result).toBe(66.99);
  });
});

describe("applyPromoCode", () => {
  // Mock the promo code lookup
  const mockLookup = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should apply a valid promo code discount", async () => {
    // Arrange
    mockLookup.mockResolvedValue({ discount: 20, active: true });

    // Act
    const result = await applyPromoCode("SAVE20", 100, mockLookup);

    // Assert
    expect(result).toEqual({ total: 80, applied: true, code: "SAVE20" });
    expect(mockLookup).toHaveBeenCalledWith("SAVE20");
  });

  it("should reject an expired promo code", async () => {
    mockLookup.mockResolvedValue({ discount: 20, active: false });

    const result = await applyPromoCode("EXPIRED", 100, mockLookup);

    expect(result).toEqual({ total: 100, applied: false, code: "EXPIRED" });
  });
});
```

## Key Points

- **Arrange-Act-Assert** structure makes each test's intent clear
- **Descriptive names** explain the expected behavior, not the implementation
- **Edge cases tested:** zero input, max discount, rounding
- **vi.fn() mocks** isolate the function from external dependencies
- **beforeEach cleanup** prevents test pollution
- **Group related tests** with `describe` blocks
