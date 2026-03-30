---
id: PAT-0035
name: Integration Testing
category: patterns
tags: [integration-testing, api-testing, database-testing, testcontainers, mocking, test-isolation, supertest, msw, vitest]
capabilities: [api-test-design, database-test-setup, external-service-mocking]
useWhen:
  - writing tests for API endpoints with database interaction
  - setting up database test fixtures with proper cleanup
  - deciding what to mock vs test against real services
  - configuring test containers for local development and CI
  - testing service-to-service communication
estimatedTokens: 650
relatedFragments: [PAT-0005, SKL-0003, PAT-0036, PAT-0033]
dependencies: []
synonyms: ["how to test my API endpoints", "database test setup and teardown", "should I mock external services in tests", "testcontainers setup guide", "how to test with a real database"]
lastUpdated: "2026-03-29"
difficulty: intermediate
sourceUrl: "https://github.com/goldbergyoni/javascript-testing-best-practices"
---

# Integration Testing

Test components working together -- API routes, databases, and external services. Following JavaScript testing best practices, write API (component) testing at minimum. It is the most cost-effective test layer.

## What to Integration Test

| Test | Skip |
|------|------|
| API endpoint request/response contracts | Individual utility functions (unit test those) |
| Database queries return correct data | ORM library internals |
| Auth middleware blocks unauthorized requests | Third-party API internal behavior |
| Service A calls Service B correctly | UI rendering (E2E test that) |

## API Endpoint Testing

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';

describe('POST /api/users', () => {
  beforeAll(() => setupTestDb());
  afterAll(() => teardownTestDb());

  it('creates a user and returns 201', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test User' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ email: 'test@example.com', id: expect.any(String) });
  });

  it('returns 400 for invalid email', async () => {
    const res = await request(app).post('/api/users').send({ email: 'not-an-email' });
    expect(res.status).toBe(400);
  });
});
```

## Database Isolation: Transaction Rollback

```typescript
export async function setupTestDb() {
  db = drizzle(process.env.TEST_DATABASE_URL!);
  await db.execute('BEGIN');
}
export async function teardownTestDb() {
  await db.execute('ROLLBACK');  // undo all changes, fast and clean
}
```

**Transaction rollback** is the fastest isolation strategy. No data cleanup needed.

## Mocking External Services

| Strategy | When to Use |
|----------|-------------|
| **HTTP interceptor** (msw, nock) | Third-party APIs (Stripe, SendGrid) |
| **Dependency injection** | Internal service boundaries |
| **Test containers** | Databases, Redis, message queues |
| **Real service** | Only in staging/pre-prod environments |

```typescript
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.post('https://api.stripe.com/v1/charges', () => {
    return HttpResponse.json({ id: 'ch_test', status: 'succeeded' });
  }),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Test Isolation Checklist

1. Each test creates its own data (no shared fixtures across tests)
2. Database state resets between tests (transaction rollback or truncate)
3. External HTTP calls are intercepted (no real network in CI)
4. Environment variables use test-specific values
5. File system operations use temp directories

## Anti-Patterns

- Testing against a shared development database
- Relying on test execution order
- Mocking the thing you are testing (mock boundaries, not internals)
- No timeout on container startup in CI
- Skipping error path tests (test 400s and 500s, not just 200s)
