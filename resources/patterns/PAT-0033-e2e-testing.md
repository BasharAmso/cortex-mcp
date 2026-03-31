---
id: PAT-0033
name: E2E Testing with Playwright
category: patterns
tags: [e2e, playwright, testing, browser-testing, page-objects, ci, visual-testing, flaky-tests, user-flows, accessibility]
capabilities: [e2e-test-design, playwright-setup, test-stability]
useWhen:
  - setting up end-to-end tests for a web application
  - deciding between E2E and unit tests for a feature
  - dealing with flaky browser tests in CI
  - testing critical user flows like signup, checkout, and onboarding
  - adding visual comparison to your test suite
estimatedTokens: 650
relatedFragments: [PAT-0005, SKL-0017, PAT-0034, PAT-0037]
dependencies: []
synonyms: ["how to test my app in a browser", "playwright setup guide", "my e2e tests keep failing randomly", "should I write e2e or unit tests", "how to test user flows end to end"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
pillar: "software-dev"
sourceUrl: "https://github.com/goldbergyoni/javascript-testing-best-practices"
---

# E2E Testing with Playwright

Browser-based testing that validates real user flows without being a maintenance nightmare. Following JavaScript testing best practices, design tests for system 1 thinking -- they should be dead-simple to read.

## When E2E vs Unit

| Use E2E | Use Unit |
|---------|----------|
| Critical user paths (signup, checkout) | Pure logic and transformations |
| Multi-page flows with state | Individual component behavior |
| Third-party integration verification | Edge cases and error paths |
| Visual layout correctness | Fast feedback during development |

**Rule of thumb:** If a bug here loses money or users, it deserves an E2E test.

## Page Object Pattern

```typescript
export class LoginPage {
  constructor(private page: Page) {}

  async goto() { await this.page.goto('/login'); }

  async login(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  async expectError(message: string) {
    await expect(this.page.getByRole('alert')).toContainText(message);
  }
}
```

## Test Structure (AAA Pattern)

```typescript
test.describe('Checkout flow', () => {
  test.beforeEach(async ({ page }) => {
    await seedTestUser();              // Arrange: deterministic state
    await page.goto('/products');
  });

  test('completes purchase with valid card', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.addItem('Widget');       // Act
    await cart.checkout();
    await expect(page).toHaveURL('/confirmation');  // Assert
  });
});
```

## Handling Flaky Tests

1. **Use web-first assertions** -- `await expect(locator).toBeVisible()` not `waitForTimeout`
2. **Avoid hard-coded waits** -- Playwright auto-waits; trust it
3. **Isolate test data** -- each test seeds its own state
4. **Retry in CI only** -- `retries: process.env.CI ? 2 : 0`
5. **Tag and fix flaky tests** -- `test.fixme()` annotation, fix within a sprint

## CI Integration

```yaml
- name: Run E2E tests
  run: npx playwright test
- name: Upload report on failure
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/
```

## Anti-Patterns

- Testing every page instead of critical paths only
- Sharing state between tests (login once, run all)
- Using CSS selectors instead of accessible roles and labels
- No test data cleanup between runs
- Running E2E on every commit instead of on PR and nightly
