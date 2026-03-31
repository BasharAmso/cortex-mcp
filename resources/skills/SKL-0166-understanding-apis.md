---
id: SKL-0166
name: Understanding APIs
category: skills
tags: [api, rest, graphql, http, endpoints, api-documentation]
capabilities: [api-comprehension, endpoint-testing, auth-understanding, request-construction]
useWhen:
  - reading API documentation for the first time
  - trying to understand how a frontend talks to a backend
  - deciding which API to use for a project
  - testing an API endpoint with curl or Postman
  - understanding authentication types like API keys and OAuth
estimatedTokens: 650
relatedFragments: [SKL-0168, PAT-0089]
dependencies: []
synonyms: ["what is an API", "how do APIs work", "how to read API documentation", "what is REST vs GraphQL", "how to call an API endpoint"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/public-apis/public-apis"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Understanding APIs

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0166 |
| **Name** | Understanding APIs |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

An API (Application Programming Interface) is a structured way for two programs to talk to each other. When you use a weather app, it calls a weather API to get forecast data. When you log in with Google, the app uses Google's authentication API. APIs are the glue between services.

### The HTTP Request Model

Most web APIs use HTTP. Every API call has four parts:

| Part | Purpose | Example |
|------|---------|---------|
| **Method** | What action to take | `GET` (read), `POST` (create), `PUT` (update), `DELETE` (remove) |
| **URL** | Which resource to access | `https://api.example.com/users/42` |
| **Headers** | Metadata and authentication | `Authorization: Bearer abc123` |
| **Body** | Data you are sending | `{ "name": "Alice", "email": "a@b.com" }` |

The server responds with a **status code** (200 = success, 404 = not found, 500 = server error) and a **body** (usually JSON data).

### REST vs GraphQL

**REST** organizes data around URLs. Each URL represents a resource: `/users`, `/users/42`, `/users/42/posts`. You use HTTP methods to interact with them. REST is the most common API style.

**GraphQL** uses a single endpoint where you specify exactly which fields you want. Instead of getting a fixed response shape, you write a query describing the data you need. This reduces over-fetching but adds complexity.

### Authentication Types

The public-apis project categorizes APIs by their authentication requirements, which maps to real-world patterns:

- **No auth** — Open access, no credentials needed. Good for public data like weather.
- **API Key** — A secret string you include in headers or query params. Most common for developer APIs.
- **OAuth** — A multi-step flow where users grant your app permission. Used for "Log in with Google" and accessing user-specific data.

### Reading API Documentation

When evaluating any API, check these four things (as standardized by the public-apis project):

1. **Auth type** — What credentials do you need? API key, OAuth, or none?
2. **HTTPS support** — Is the connection encrypted? Never send credentials over plain HTTP.
3. **CORS support** — Can you call this API from a browser, or only from a server?
4. **Rate limits** — How many requests can you make per minute/hour before being throttled?

### Testing an API

Before writing code, test the API manually:

```bash
# Simple GET request
curl https://api.example.com/users

# With an API key header
curl -H "Authorization: Bearer YOUR_KEY" https://api.example.com/data

# POST with JSON body
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"test"}' https://api.example.com/users
```

Tools like Postman or Insomnia provide a visual interface for the same operations.

## Key Takeaways

- APIs are structured contracts between programs: request in, response out
- HTTP methods map to actions: GET reads, POST creates, PUT updates, DELETE removes
- Always check auth type, HTTPS, and CORS support before choosing an API
- Test endpoints manually with curl or Postman before writing integration code
- Status codes tell you what happened: 2xx success, 4xx your mistake, 5xx server problem
