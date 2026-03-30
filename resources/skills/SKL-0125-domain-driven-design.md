---
id: SKL-0125
name: Domain-Driven Design
category: skills
tags: [ddd, domain-modeling, entities, value-objects, aggregates, repositories, ubiquitous-language, domain-services]
capabilities: [domain-modeling, business-logic-encapsulation, aggregate-design, repository-pattern]
useWhen:
  - modeling complex business domains with many rules and invariants
  - deciding how to organize domain logic vs application logic
  - designing entities, value objects, and aggregate boundaries
  - building a shared vocabulary between developers and domain experts
  - choosing between domain services and application services
estimatedTokens: 700
relatedFragments: [PAT-0054, PAT-0055, SKL-0127]
dependencies: []
synonyms: ["how to model my business domain", "what are entities and value objects", "DDD for beginners", "how to organize business logic", "domain modeling patterns", "ubiquitous language explained"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/Sairyss/domain-driven-hexagon"
difficulty: intermediate
owner: "cortex"
---

# Domain-Driven Design

DDD structures code around business concepts rather than technical layers. The goal is code that reads like the business domain itself.

## Ubiquitous Language

Establish shared terminology between developers and domain experts. Code names (classes, methods, variables) must match the language the business uses. If the business says "Order," the code says `Order`, not `PurchaseRequest`.

## Building Blocks

| Concept | Purpose | Key Rule |
|---------|---------|----------|
| **Entity** | Object with unique identity that persists over time | Encapsulate business rules in methods, not public setters |
| **Value Object** | Immutable object defined by its properties, not identity | Cannot exist in an invalid state; validate on creation |
| **Aggregate** | Cluster of entities/value objects with a consistency boundary | External code references only the Aggregate Root |
| **Repository** | Collection-like interface for retrieving/persisting aggregates | One repository per aggregate; accessed through ports |
| **Domain Service** | Business logic that does not belong to a single entity | Use when an operation spans multiple aggregates |
| **Application Service** | Orchestrates use cases without containing business logic | Fetches aggregates, calls domain methods, persists results |

## Entity Design

Entities protect their invariants through methods. Validation follows "fail fast": an entity must be valid at creation and after every state change. Use guard clauses to reject illegal operations immediately.

## Value Objects

Replace primitive obsession. Instead of passing `string` for email, create an `Email` value object that validates format on construction. Value objects are compared by their properties, not by reference. They are always immutable.

## Aggregates

An aggregate defines a transactional consistency boundary. Changes either persist completely or not at all. Keep aggregates small. Reference other aggregates by ID, not by direct object reference. This prevents cascading loads and tight coupling.

## Domain vs Application Services

Application services orchestrate: fetch data, call domain logic, save results. They contain no business rules. Domain services handle logic that spans multiple entities within the same bounded context. If the logic belongs to one entity, put it on the entity.

## Domain Events

When something important happens in the domain, publish an event (`OrderPlaced`, `PaymentReceived`). Events enable loose coupling between aggregates and trigger side effects (notifications, projections) without the originating aggregate knowing about subscribers.

## When to Apply Full DDD

Use DDD for complex domains with many business rules. For simple CRUD apps, it adds unnecessary ceremony. Start simple and introduce DDD patterns as complexity grows. It is easier to refactor over-design than to refactor no design.
