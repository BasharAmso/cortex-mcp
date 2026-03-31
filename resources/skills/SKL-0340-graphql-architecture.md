---
id: SKL-0340
name: GraphQL Architecture
category: skills
tags: [graphql, schema-design, resolvers, n-plus-one, federation, api-design]
capabilities: [graphql-schema-design, resolver-optimization, federation-setup, query-performance]
useWhen:
  - designing a GraphQL API from scratch
  - solving N+1 query problems in GraphQL resolvers
  - choosing between GraphQL and REST for an API
  - implementing schema federation across multiple services
  - optimizing GraphQL query performance and complexity
estimatedTokens: 670
relatedFragments: [SKL-0331, SKL-0126, SKL-0334]
dependencies: []
synonyms: ["how to design a GraphQL schema", "GraphQL vs REST", "N+1 problem in GraphQL", "GraphQL federation explained", "when to use GraphQL", "GraphQL resolver best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/graphql/graphql-spec"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# GraphQL Architecture

GraphQL is a query language for APIs that lets clients request exactly the data they need. Instead of multiple REST endpoints returning fixed shapes, a single GraphQL endpoint returns flexible responses defined by the client's query.

## Schema Design

The schema is the contract between client and server. It defines types, fields, and relationships.

**Design principles:**
- **Think in graphs, not endpoints.** Model entities and their relationships. Users have orders; orders have items; items have products.
- **Name types after domain concepts.** `Order`, `Product`, `Customer` — not `OrderResponse` or `GetProductResult`.
- **Use non-nullable fields intentionally.** Mark fields non-nullable (`String!`) only when the server can always provide them. Nullable fields are more resilient to partial failures.
- **Paginate collections.** Use cursor-based pagination (Relay connection spec) for lists. Never return unbounded arrays.

```graphql
type Query {
  order(id: ID!): Order
  orders(first: Int!, after: String): OrderConnection!
}

type Order {
  id: ID!
  status: OrderStatus!
  items: [OrderItem!]!
  customer: Customer!
}
```

## The N+1 Problem

The most common GraphQL performance issue. When resolving a list of orders, each order's `customer` field triggers a separate database query.

**Solution: DataLoader.** Batch and deduplicate database calls. Instead of N individual `getCustomer(id)` calls, DataLoader collects all IDs and makes one `getCustomersByIds([...])` call.

DataLoader must be created per-request (not shared across requests) to avoid cache leaks. Every resolver that fetches related data should use a DataLoader.

## Resolvers

Resolvers are functions that fetch data for each field. The resolver chain walks the query tree, calling a resolver for each field.

**Keep resolvers thin.** Resolvers should call a service or data layer, not contain business logic directly. This makes resolvers testable and keeps GraphQL as a transport layer.

**Default resolvers** handle simple property access. Only write custom resolvers for computed fields, relationships, or data from external sources.

## Query Complexity and Security

Clients can write expensive queries (deeply nested, wide selections). Protect the server:

- **Depth limiting:** Reject queries nested beyond a threshold (e.g., 10 levels)
- **Complexity scoring:** Assign a cost to each field; reject queries exceeding a total cost budget
- **Rate limiting:** Limit queries per client per time window
- **Persisted queries:** In production, allow only pre-registered queries. Eliminates arbitrary query risk entirely.

## Federation

GraphQL Federation splits a monolithic schema across multiple services. Each service owns a portion of the graph and extends types from other services.

```graphql
# Orders service extends User from the Users service
extend type User @key(fields: "id") {
  id: ID! @external
  orders: [Order!]!
}
```

A gateway (Apollo Router) composes subgraph schemas and routes query fragments to the appropriate service. Each team owns their subgraph independently.

**When to federate:** When multiple teams need to contribute to a single API and independent deployment matters. Do not federate prematurely — a single GraphQL server is simpler until team boundaries demand it.

## GraphQL vs REST

| Factor | GraphQL | REST |
|--------|---------|------|
| **Data fetching** | Client specifies exact fields | Server defines response shape |
| **Over/under-fetching** | Eliminated by design | Common, requires multiple endpoints or query params |
| **Caching** | Harder (POST requests, varied responses) | Easy (HTTP caching on GET endpoints) |
| **Tooling** | Schema-driven, self-documenting | OpenAPI/Swagger for documentation |
| **Learning curve** | Higher for teams new to GraphQL | Lower, widely understood |

Use GraphQL when clients have diverse data needs (mobile vs web vs internal tools). Use REST when caching is critical, the API is simple, or the team is small and prefers convention over flexibility.
