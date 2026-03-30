---
id: PAT-0055
name: Hexagonal Architecture (Ports & Adapters)
category: patterns
tags: [hexagonal-architecture, ports-and-adapters, clean-architecture, dependency-inversion, testability, separation-of-concerns]
capabilities: [architecture-design, dependency-management, testable-architecture, adapter-pattern]
useWhen:
  - designing the architecture of a new application or service
  - making business logic independent of frameworks and databases
  - improving testability by decoupling infrastructure from domain
  - migrating from a tightly coupled codebase to a layered architecture
  - choosing a folder structure for a domain-driven project
estimatedTokens: 700
relatedFragments: [SKL-0125, PAT-0054, SKL-0127]
dependencies: []
synonyms: ["ports and adapters pattern", "clean architecture explained", "how to structure my app layers", "hexagonal architecture for beginners", "dependency inversion in practice", "how to make code testable"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/Sairyss/domain-driven-hexagon"
difficulty: advanced
owner: "cortex"
---

# Hexagonal Architecture (Ports & Adapters)

Hexagonal architecture isolates business logic from infrastructure by defining strict dependency rules. The core domain never depends on databases, frameworks, or external services.

## The Core Idea

Dependencies flow inward. Outer layers (infrastructure) depend on inner layers (domain). The domain defines interfaces (ports) that infrastructure implements (adapters). This inverts the typical dependency: your database adapter implements a repository interface defined by the domain, not the other way around.

## Layers

| Layer | Contains | Depends On |
|-------|---------|------------|
| **Domain** | Entities, value objects, domain services, domain events | Nothing external |
| **Application** | Use case orchestration, commands, queries, application services | Domain layer |
| **Infrastructure** | Database adapters, HTTP controllers, message brokers, external APIs | Application and domain layers |

## Ports (Interfaces)

Ports define what the application needs without specifying how. There are two types:

**Primary (Driving) Ports** define how the outside world interacts with the application. These are the use cases: `CreateOrderUseCase`, `GetUserQuery`. Controllers and CLI handlers call these.

**Secondary (Driven) Ports** define what the application needs from infrastructure. These are the dependencies: `OrderRepository`, `PaymentGateway`, `EmailSender`. The domain defines them; infrastructure implements them.

## Adapters (Implementations)

Adapters are concrete implementations of ports. A `PostgresOrderRepository` implements the `OrderRepository` port. A `StripePaymentGateway` implements `PaymentGateway`. Swapping adapters (Postgres to MongoDB, Stripe to PayPal) requires no changes to domain or application code.

## Folder Structure

Organize by domain module, then by layer within each module:

```
src/
  modules/
    order/
      domain/         # Entities, value objects, domain services, events
      application/    # Use cases, commands, queries, ports
      infrastructure/ # Adapters (repos, controllers, mappers)
    user/
      domain/
      application/
      infrastructure/
  shared/             # Cross-cutting: base classes, common value objects
```

Group files that change together. Vertical slicing (by feature) is preferred over horizontal slicing (by technical layer) because a feature change touches one directory, not three.

## DTOs and Mappers

Use Data Transfer Objects at the boundary between layers. Request DTOs validate API input. Response DTOs whitelist returned fields (preventing data leaks). Mappers convert between domain entities and persistence models. This separation allows the API contract and database schema to evolve independently of the domain model.

## Testability

The primary benefit: test business logic without databases or HTTP servers. Mock the secondary ports (repository, gateway) and test application services in isolation. Integration tests then verify that adapters work correctly with real infrastructure.

## Anti-Corruption Layer

When integrating with external systems or legacy code, create an adapter that translates the external model into your domain model. This prevents external complexity from leaking into your domain. The ACL handles format conversion, error translation, and protocol differences.

## When to Simplify

Full hexagonal architecture shines in complex domains with long lifetimes. For CRUD apps, simple scripts, or prototypes, the overhead of ports, adapters, and mappers is not justified. Start with a clean separation of concerns and introduce ports/adapters as complexity grows.
