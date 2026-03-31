---
id: PAT-0093
name: API Contract Patterns
category: patterns
tags: [api, openapi, swagger, contracts, versioning, schema, rest]
capabilities: [api-contract-design, schema-definition, versioning-strategy, contract-testing]
useWhen:
  - designing a new REST API and defining its contract
  - learning what OpenAPI and Swagger specifications are
  - understanding how API versioning works
  - setting up contract testing between frontend and backend teams
  - documenting an existing API for external consumers
estimatedTokens: 650
relatedFragments: [PAT-0091, SKL-0176, PAT-0092]
dependencies: []
synonyms: ["what is OpenAPI and Swagger", "how to version my API", "how to define request and response schemas", "what is contract-first API development", "how to document a REST API properly"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/OAI/OpenAPI-Specification"
difficulty: intermediate
owner: "cortex"
pillar: "coding-literacy"
---

# Pattern: API Contract Patterns

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0093 |
| **Name** | API Contract Patterns |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

An API contract is a formal agreement between the provider and consumer of an API. It defines what endpoints exist, what data they accept, what data they return, and what errors they produce. The OpenAPI Specification (formerly Swagger) is the industry standard for describing HTTP APIs in a machine-readable format.

### What OpenAPI Defines

An OpenAPI document (written in YAML or JSON) describes your entire API:

- **Paths**: The available endpoints (`/users`, `/orders/{id}`)
- **Operations**: What HTTP methods each path supports (GET, POST, PUT, DELETE)
- **Parameters**: Path parameters, query parameters, headers, and cookies
- **Request bodies**: The shape and type of data the client sends
- **Responses**: The shape of data returned for each status code (200, 400, 404, 500)
- **Components**: Reusable schema definitions, security schemes, and parameter objects

### Contract-First vs Code-First

**Contract-first**: Write the OpenAPI spec before writing any code. Frontend and backend teams agree on the contract, then build independently against it. This approach prevents integration surprises and enables parallel development.

**Code-first**: Write the code, then generate the OpenAPI spec from annotations or decorators. This is faster to start but risks the contract drifting from what was agreed upon.

Contract-first is recommended for teams where frontend and backend are developed by different people or at different times.

### Request and Response Schemas

Schemas define the structure of data. A well-defined schema catches errors before they reach your business logic:

```yaml
components:
  schemas:
    User:
      type: object
      required: [id, email]
      properties:
        id:
          type: integer
        email:
          type: string
          format: email
        name:
          type: string
        createdAt:
          type: string
          format: date-time
```

This schema tells both the client and server exactly what a `User` object looks like. Code generators can create TypeScript interfaces, validation middleware, and mock servers directly from these definitions.

### API Versioning Strategies

When you need to make breaking changes to an API:

- **URL versioning** (`/v1/users`, `/v2/users`): The most common and most explicit approach. Clients choose which version to call.
- **Header versioning** (`Accept: application/vnd.api+json;version=2`): Keeps URLs clean but is less discoverable.
- **Query parameter versioning** (`/users?version=2`): Simple but mixes versioning with business parameters.

The practical rule: use URL versioning unless you have a specific reason not to. It is the easiest to understand, implement, and debug.

### Contract Testing

Contract tests verify that the API implementation matches its specification:

- **Provider tests** verify that the server returns responses matching the contract
- **Consumer tests** verify that the client correctly handles the responses defined in the contract
- **Breaking change detection** compares two versions of a spec to flag removed fields, changed types, or deleted endpoints

Tools like Prism (mock server from OpenAPI), Dredd (automated contract testing), and Optic (diff detection) automate this process.

### Practical API Design Rules

1. **Use nouns for resources** (`/users`, `/orders`), not verbs (`/getUser`, `/createOrder`). The HTTP method provides the verb.
2. **Return consistent error formats**. Every error response should include a status code, error type, and human-readable message.
3. **Use HTTP status codes correctly**. 200 for success, 201 for created, 400 for client error, 404 for not found, 500 for server error.
4. **Paginate list endpoints**. Never return unbounded lists. Use `limit` and `offset` or cursor-based pagination.

## Key Takeaways

- OpenAPI is the standard for describing REST APIs; it defines paths, operations, schemas, and responses
- Contract-first development prevents integration surprises between frontend and backend teams
- URL versioning is the simplest and most widely used API versioning strategy
- Contract tests verify that implementation matches specification and catch breaking changes
- Use nouns for resources, consistent error formats, correct status codes, and pagination on all list endpoints
