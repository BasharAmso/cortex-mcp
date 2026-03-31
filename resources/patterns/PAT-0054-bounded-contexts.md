---
id: PAT-0054
name: Bounded Contexts & Aggregates
category: patterns
tags: [ddd, bounded-context, aggregates, context-mapping, domain-events, consistency-boundaries]
capabilities: [context-boundary-design, aggregate-modeling, cross-context-communication, domain-event-design]
useWhen:
  - defining service or module boundaries in a complex domain
  - deciding what belongs in the same aggregate vs separate aggregates
  - designing communication between bounded contexts
  - resolving conflicting terminology across teams or domains
  - choosing consistency boundaries for transactions
estimatedTokens: 700
relatedFragments: [SKL-0125, PAT-0055, SKL-0126, PAT-0059]
dependencies: []
synonyms: ["how to define service boundaries", "what is a bounded context", "aggregate design rules", "how big should my aggregates be", "domain boundaries explained", "context mapping for beginners"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/Sairyss/domain-driven-hexagon"
difficulty: advanced
owner: "cortex"
pillar: "architecture"
---

# Bounded Contexts & Aggregates

Bounded contexts and aggregates define where one model ends and another begins. Getting these boundaries right is the most impactful design decision in a complex system.

## Bounded Contexts

A bounded context is a boundary within which a domain model is consistent and a term has exactly one meaning. "Customer" in the Billing context (payment methods, invoices) is a different model than "Customer" in the Support context (tickets, satisfaction scores).

**Key rules:**
- Each bounded context owns its data and logic completely
- The same real-world concept can have different models in different contexts
- Communication between contexts happens through well-defined interfaces, not shared databases
- Teams should align to bounded contexts (one team per context ideally)

## Context Mapping

| Relationship | Description | When to Use |
|-------------|------------|-------------|
| **Shared Kernel** | Two contexts share a small common model | Tightly coupled teams that co-evolve |
| **Customer/Supplier** | Upstream context provides what downstream needs | Clear producer/consumer relationship |
| **Conformist** | Downstream adopts upstream's model as-is | No leverage to influence upstream |
| **Anti-Corruption Layer** | Downstream translates upstream's model into its own | Protecting your model from external complexity |
| **Open Host Service** | Upstream provides a public API for all consumers | Multiple downstream consumers |
| **Published Language** | Shared interchange format (JSON schema, protobuf) | Cross-team or cross-organization integration |

## Aggregate Design Rules

1. **Protect invariants within a single aggregate.** If two entities must be consistent in the same transaction, they belong in the same aggregate.
2. **Keep aggregates small.** Prefer smaller aggregates with eventual consistency between them over large aggregates with full transactional consistency.
3. **Reference other aggregates by ID only.** Never hold direct object references to entities in another aggregate. This prevents cascading loads and tight coupling.
4. **One aggregate root per aggregate.** External code interacts only with the root. Child entities have local identity within the aggregate.
5. **Update one aggregate per transaction.** If a business operation spans multiple aggregates, use domain events and eventual consistency.

## Consistency Boundaries

Within an aggregate: strong consistency (immediate, transactional). Across aggregates: eventual consistency (via domain events). This trade-off is fundamental. Fighting it by making aggregates larger creates performance and concurrency problems.

## Domain Events Between Contexts

When something happens in one context that another context cares about, publish a domain event. The Order context publishes `OrderPlaced`; the Shipping context subscribes and creates a shipment. Events carry data needed by consumers, not the full internal model.

**Event design rules:**
- Events are immutable facts about something that happened
- Name events in past tense: `OrderPlaced`, `PaymentReceived`
- Include only the data consumers need (avoid leaking internal model)
- Events define the contract between contexts; version them carefully

## Common Mistakes

- Making aggregates too large to avoid eventual consistency
- Sharing a database between bounded contexts (hidden coupling)
- Using the same model across contexts (leads to a "god object")
- Ignoring linguistic boundaries (when two teams use the same word differently, that is a context boundary)
