---
id: SKL-0331
name: API Gateway Design
category: skills
tags: [api-gateway, rate-limiting, routing, authentication, load-balancing, reverse-proxy]
capabilities: [gateway-architecture, traffic-management, api-routing, request-transformation]
useWhen:
  - designing a single entry point for multiple backend services
  - implementing rate limiting and throttling for APIs
  - adding authentication and authorization at the edge
  - configuring load balancing across service instances
  - transforming or aggregating API requests before routing
estimatedTokens: 650
relatedFragments: [SKL-0126, SKL-0333, PAT-0175, EX-0021]
dependencies: []
synonyms: ["how to design an API gateway", "what does an API gateway do", "rate limiting at the gateway", "API routing best practices", "reverse proxy vs API gateway", "when do I need an API gateway"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/apache/apisix"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# API Gateway Design

An API gateway is a single entry point that sits between clients and backend services, handling cross-cutting concerns so individual services do not have to.

## Core Responsibilities

| Concern | What the Gateway Does |
|---------|----------------------|
| **Routing** | Maps incoming requests to the correct backend service based on path, headers, or method |
| **Authentication** | Validates tokens (JWT, API keys, OAuth) before requests reach services |
| **Rate Limiting** | Caps requests per client, per endpoint, or globally to protect backends |
| **Load Balancing** | Distributes traffic across service instances (round-robin, least-connections, weighted) |
| **Request Transformation** | Rewrites headers, paths, or payloads; aggregates responses from multiple services |
| **TLS Termination** | Handles HTTPS at the edge so internal traffic can use plain HTTP |

## Rate Limiting Strategies

**Fixed Window** counts requests in fixed time intervals (e.g., 100 per minute). Simple but allows bursts at window boundaries.

**Sliding Window** smooths traffic by tracking requests over a rolling interval. More even distribution but slightly more complex to implement.

**Token Bucket** allows controlled bursts by filling tokens at a steady rate. Clients spend tokens per request. Best balance of burst tolerance and steady-state control.

Store rate limit counters in a shared store (Redis) when running multiple gateway instances to ensure consistent enforcement.

## Routing Patterns

**Path-based routing** sends `/api/orders/*` to the orders service and `/api/users/*` to the users service. The most common and simplest approach.

**Header-based routing** directs traffic based on headers like `X-Version` or `Accept` for API versioning or A/B testing.

**Canary routing** sends a small percentage of traffic to a new service version. Increase the percentage as confidence grows. The gateway is the natural place for this logic.

## API Composition

For client requests that need data from multiple services, the gateway can fan out requests and merge responses. This avoids chatty client-to-service calls but keep composition logic simple. Move complex aggregation to a dedicated Backend-for-Frontend (BFF) service.

## What to Avoid

- **Business logic in the gateway** — the gateway is infrastructure, not a service. Keep domain logic in services.
- **Single point of failure** — deploy multiple gateway instances behind a load balancer. Use health checks.
- **Overly broad rate limits** — differentiate limits by client tier, endpoint sensitivity, and HTTP method.
- **Skipping observability** — log every request at the gateway with correlation IDs. This is your best vantage point for traffic analysis.

## Choosing a Gateway

Use managed gateways (AWS API Gateway, GCP Apigee) when you want zero infrastructure management. Use self-hosted gateways (APISIX, Kong, Envoy) when you need full control, custom plugins, or must run on-premise. Start simple and add plugins incrementally.
