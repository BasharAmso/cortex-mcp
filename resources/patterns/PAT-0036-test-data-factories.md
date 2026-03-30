---
id: PAT-0036
name: Test Data Factories
category: patterns
tags: [test-data, factories, fixtures, faker, seeding, state-builder, test-setup, reproducibility, override-pattern]
capabilities: [test-data-design, factory-pattern, database-seeding]
useWhen:
  - creating reusable test data for your test suite
  - choosing between factories and static fixtures
  - building complex object graphs for integration tests
  - seeding a database for development or demo environments
  - reducing test setup boilerplate
estimatedTokens: 600
relatedFragments: [PAT-0005, SKL-0017, PAT-0035, PAT-0033]
dependencies: []
synonyms: ["how to create test data", "factory pattern for tests", "faker.js setup guide", "test fixtures vs factories which is better", "how to seed my database for tests"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
sourceUrl: "https://github.com/goldbergyoni/javascript-testing-best-practices"
---

# Test Data Factories

Create test data that is readable, flexible, and does not break when your schema changes. Following JavaScript testing best practices, avoid global test fixtures and seeds -- add data per-test using factories.

## Factories vs Fixtures

| Factories | Static Fixtures |
|-----------|----------------|
| Generate data dynamically | Hardcoded JSON/SQL files |
| Override only what matters per test | Every test uses the same data |
| Adapt when schema changes (one place) | Break across many files on change |
| Better for relationship-heavy data | Fine for static reference data |

**Use factories by default.** Use fixtures only for static reference data (countries, categories).

## Basic Factory Pattern

```typescript
import { faker } from '@faker-js/faker';

export function buildUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    role: 'member',
    createdAt: new Date(),
    ...overrides,    // caller overrides only what matters
  };
}

// Tests read clearly
const admin = buildUser({ role: 'admin' });
const banned = buildUser({ bannedAt: new Date() });
```

## Relationship Builder

```typescript
export function buildOrder(overrides: Partial<Order> = {}) {
  const user = overrides.user ?? buildUser();
  return {
    id: faker.string.uuid(),
    userId: user.id,
    user,
    items: [buildOrderItem(), buildOrderItem()],
    status: 'pending',
    ...overrides,
  };
}
```

## State Builder (Fluent API)

```typescript
class TestScenario {
  private users: User[] = [];
  private orders: Order[] = [];

  withUser(overrides?: Partial<User>) {
    this.users.push(buildUser(overrides));
    return this;
  }
  withOrder(overrides?: Partial<Order>) {
    const user = this.users.at(-1) ?? buildUser();
    this.orders.push(buildOrder({ user, ...overrides }));
    return this;
  }
  async seed(db: Database) {
    await db.insert(usersTable).values(this.users);
    await db.insert(ordersTable).values(this.orders);
    return { users: this.users, orders: this.orders };
  }
}

const { users, orders } = await new TestScenario()
  .withUser({ role: 'admin' })
  .withOrder({ status: 'completed' })
  .seed(db);
```

## Faker.js Tips

| Need | Method |
|------|--------|
| Reproducible data | `faker.seed(12345)` at suite level |
| Unique emails | `faker.internet.email()` (auto-unique) |
| Realistic dates | `faker.date.recent({ days: 30 })` |
| Constrained numbers | `faker.number.int({ min: 1, max: 100 })` |
| Deterministic per test | `faker.seed(testIndex)` in beforeEach |

## Anti-Patterns

- Sharing mutable test data between tests
- Factories that require 10+ arguments (use sensible defaults with overrides)
- Random data without seed (non-reproducible failures)
- Building test data in the test body instead of extracting to factories
- Factories that hit the database by default (separate `build` from `create`)
