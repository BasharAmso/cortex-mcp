---
id: SKL-0313
name: Frontend Testing
category: skills
tags: [testing, react-testing-library, vitest, playwright, unit-test, e2e-test]
capabilities: [unit-testing, integration-testing, e2e-testing, component-testing, mocking]
useWhen:
  - writing tests for React components
  - setting up a frontend testing strategy
  - choosing between unit, integration, and E2E tests
  - mocking API calls or browser APIs in tests
  - testing user interactions and accessibility
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0309, PAT-0160]
dependencies: []
synonyms: ["how to test React components", "how to write frontend unit tests", "how to set up E2E testing", "how to mock API calls in tests", "react testing library vs enzyme", "how to test user interactions"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/testing-library/react-testing-library"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Skill: Frontend Testing

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0313 |
| **Name** | Frontend Testing |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Frontend testing verifies that your UI works correctly from the user's perspective. The key principle from Testing Library: test what users see and do, not implementation details.

### The Testing Trophy

Unlike the traditional pyramid, frontend testing favors integration tests:

| Layer | Tool | What It Tests | Volume |
|-------|------|---------------|--------|
| **Static** | TypeScript, ESLint | Type errors, code smells | Runs on every save |
| **Unit** | Vitest/Jest | Pure functions, utilities, hooks | Many, fast |
| **Integration** | React Testing Library | Components with interactions | Most tests here |
| **E2E** | Playwright/Cypress | Full user flows in a real browser | Few, critical paths |

### React Testing Library Fundamentals

Test components the way users interact with them:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

test('increments count on button click', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  fireEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

**Query priority** (use the highest priority query that works):

1. `getByRole` — accessible role (button, heading, textbox) — preferred
2. `getByLabelText` — form inputs with labels
3. `getByPlaceholderText` — inputs with placeholder
4. `getByText` — visible text content
5. `getByTestId` — last resort, data-testid attribute

### Async Testing

Most real components involve async operations (API calls, timers):

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from './UserProfile';

test('displays user name after loading', async () => {
  render(<UserProfile userId="123" />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
});
```

### Mocking Patterns

```typescript
// Mock an API module
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ name: 'Jane Doe' }),
}));

// Mock a hook
vi.mock('./useAuth', () => ({
  useAuth: () => ({ user: { id: '123' }, isAuthenticated: true }),
}));

// MSW (Mock Service Worker) for network-level mocking
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/user/:id', () => {
    return HttpResponse.json({ name: 'Jane Doe' });
  })
);
```

MSW is preferred over module mocks for API testing because it tests your actual fetch logic.

### E2E Testing with Playwright

```typescript
import { test, expect } from '@playwright/test';

test('user can log in and see dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

E2E tests should cover critical user journeys: signup, login, core feature usage, checkout.

### What to Test

- **Always test:** user interactions, conditional rendering, error states, form validation, accessibility (roles and labels present)
- **Sometimes test:** complex state logic, custom hooks with side effects
- **Rarely test:** static content, styling, third-party library internals

## Anti-Patterns

- Testing implementation details (state values, internal method calls)
- Using `getByTestId` when a more accessible query exists
- Writing E2E tests for things a unit test can cover
- Snapshot tests for complex components (brittle, merge-conflict-prone)
- Not testing error and loading states

## Key Takeaways

- Test from the user's perspective: queries by role and text, not by class names or IDs
- Integration tests (component + interactions) provide the best value per test
- Use MSW for API mocking to test your real fetch logic
- E2E tests for critical paths only; they are slow and expensive to maintain
- Every component test should cover loading, error, empty, and populated states
