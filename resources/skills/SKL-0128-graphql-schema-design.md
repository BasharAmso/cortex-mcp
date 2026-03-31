---
id: SKL-0128
name: GraphQL Schema Design
category: skills
tags: [graphql, schema-design, api, federation, resolvers, mutations, subscriptions, type-system]
capabilities: [graphql-schema-design, api-layer-architecture, federated-graph, query-optimization]
useWhen:
  - designing a GraphQL API from scratch
  - deciding between REST and GraphQL
  - implementing schema federation across teams
  - optimizing GraphQL query performance
  - structuring mutations and error handling in GraphQL
estimatedTokens: 700
relatedFragments: [PAT-0002, SKL-0126, SKL-0006]
dependencies: []
synonyms: ["how to design a GraphQL schema", "GraphQL best practices", "GraphQL for beginners", "schema first design", "GraphQL vs REST", "how to structure GraphQL API"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/apollographql/principled-graphql"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# GraphQL Schema Design

GraphQL provides a strongly-typed, self-documenting API layer. These principles guide schema design from single-service projects to federated enterprise graphs.

## Integrity Principles

**One Graph.** Your organization should have one unified graph, not multiple graphs per team. Consolidation prevents duplication, conflicting types, and fragmented client experiences.

**Federated Implementation.** One graph does not mean one codebase. Each team owns and extends the portion of the schema that corresponds to their domain. Use schema federation to compose a unified graph from independent subgraphs.

**Schema Registry.** Maintain a single source of truth for the schema. Track changes, validate compatibility, and prevent breaking changes before they reach production.

## Schema Design

**Demand-Driven.** Design the schema for client needs, not backend structure. The schema is an abstraction layer. Clients should not need to know which microservice owns which data.

**Incremental Evolution.** Build the schema iteratively based on actual requirements. Avoid designing the "perfect" schema upfront. Add fields as clients need them, deprecate what is no longer used.

**Abstract Types.** Use interfaces and unions to model polymorphism. An interface defines shared fields; a union groups types with no shared fields. Both enable flexible, future-proof queries.

## Queries and Resolvers

- Organize queries by domain concept, not by backend service
- Use DataLoader to batch and deduplicate database calls within a single request
- Implement cursor-based pagination (`first`, `after`, `last`, `before`) for lists
- Return connection types (`edges`, `nodes`, `pageInfo`) for paginated results

## Mutations

- Name mutations as verbs: `createUser`, `cancelOrder`, not `user` or `order`
- Accept a single input object: `mutation createUser(input: CreateUserInput!)`
- Return a payload type with the mutated object and potential errors
- Use union return types for expected error cases: `type CreateUserResult = User | ValidationError`

## Error Handling

- Use GraphQL errors for unexpected failures (server errors, auth failures)
- Model expected errors as part of the schema using union types or error fields in payloads
- Never expose internal implementation details in error messages
- Include error codes for programmatic handling alongside human-readable messages

## Operations Principles

**Access Control.** Grant graph access per-client. Use persisted queries in production to control exactly which operations each client can execute. Apply rate limiting per client and per query complexity.

**Structured Logging.** Log every operation with its name, variables, duration, and resolver-level timing. Use this data to identify slow fields, popular queries, and optimization opportunities.

**Separate the GraphQL Layer.** Keep the GraphQL gateway as a thin routing and composition layer. Business logic belongs in backend services, not in resolvers.

## Performance

- Monitor query performance continuously with field-level tracing
- Set query complexity limits to prevent abusive deep or wide queries
- Use persisted queries to reduce parsing overhead and control the query surface
- Cache at the response level (CDN) and field level (DataLoader) depending on data freshness requirements
