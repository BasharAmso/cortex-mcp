---
id: PAT-0036
name: Test Data Factories
category: patterns
tags: [test-data, factories, fixtures, faker, seeding, state-builder, test-setup]
capabilities: [test-data-design, factory-pattern, database-seeding]
useWhen:
  - creating reusable test data for your test suite
  - choosing between factories and static fixtures
  - building complex object graphs for integration tests
  - seeding a database for development or demos
estimatedTokens: 550
relatedFragments: [PAT-0005, SKL-0003, PAT-0035, PAT-0033]
dependencies: []
synonyms: ["how to create test data", "factory pattern for tests", "faker.js setup", "test fixtures vs factories", "how to seed my database for tests"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Test Data Factories

Create test data that is readable, flexible, and does not break when your schema changes.

## Factories vs Fixtures

| Factories | Static Fixtures |
|-----------|----------------|
| Generate data dynamically | Hardcoded JSON/SQL files |
| Override only what matters per test | Every test uses the same data |
| Adapt when schema changes (one place to update) | Break across many files on schema change |
| Better for relationship-heavy data | Fine for simple config or reference data |

**Use factories by default.** Use fixtures only for static reference data (countries, categories, permissions).

## Basic Factory Pattern

```typescript
import { faker } from '@faker-js/faker';

type UserOverrides = Partial<User>;

export function buildUser(overrides: UserOverrides = {}): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    role: 'member',
    createdAt: new Date(),
    ...overrides,    // caller overrides only what matters
  };
}

// Usage -- the test reads clearly
const admin = buildUser({ role: 'admin' });
const banned = buildUser({ role: 'member', bannedAt: new Date() });
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
    total: 0,  // computed in beforeInsert hook
    ...overrides,
  };
}

// Deep override
const bigOrder = buildOrder({
  items: Array.from({ length: 10 }, () => buildOrderItem({ quantity: 5 })),
});
```

## State Builder (Fluent API)

For complex test scenarios, a fluent builder improves readability:

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

// Usage
const { users, orders } = await new TestScenario()
  .withUser({ role: 'admin' })
  .withOrder({ status: 'completed' })
  .withOrder({ status: 'refunded' })
  .seed(db);
```

## Database Seeding for Scenarios

```typescript
// seeds/demo.ts -- for local dev and demos
export async function seedDemo(db: Database) {
  const owner = buildUser({ email: 'demo@example.com', role: 'owner' });
  const team = Array.from({ length: 5 }, () => buildUser({ role: 'member' }));
  const projects = team.map(u => buildProject({ ownerId: u.id }));

  await db.insert(usersTable).values([owner, ...team]);
  await db.insert(projectsTable).values(projects);
}
```

## Faker.js Tips

| Need | Faker Method |
|------|-------------|
| Reproducible data | `faker.seed(12345)` at suite level |
| Unique emails | `faker.internet.email()` (auto-unique) |
| Realistic dates | `faker.date.recent({ days: 30 })` |
| Constrained numbers | `faker.number.int({ min: 1, max: 100 })` |
| Deterministic per test | `faker.seed(testIndex)` in beforeEach |

## Anti-Patterns

- Sharing mutable test data between tests (each test builds its own)
- Factories that require 10+ arguments (use sensible defaults with overrides)
- Random data without seed (non-reproducible failures)
- Building test data in the test body instead of extracting to factories
- Factories that hit the database by default (separate `build` from `create`)
