---
id: SKL-0176
name: Understanding Architecture Basics
category: skills
tags: [architecture, system-design, client-server, microservices, monolith, mvc]
capabilities: [architecture-recognition, pattern-identification, system-reasoning, trade-off-evaluation]
useWhen:
  - learning fundamental architecture patterns like client-server and MVC
  - deciding between a monolith and microservices for a new project
  - understanding architectural diagrams and documentation
  - participating in architecture discussions without a systems background
  - evaluating trade-offs between different system design approaches
estimatedTokens: 650
relatedFragments: [SKL-0175, PAT-0093, SKL-0172]
dependencies: []
synonyms: ["what is client-server architecture", "monolith vs microservices explained simply", "what is MVC pattern", "basic system design concepts for non-architects", "how to understand architecture diagrams"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: intermediate
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Understanding Architecture Basics

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0176 |
| **Name** | Understanding Architecture Basics |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Software architecture is how a system's components are organized, how they communicate, and what trade-offs those choices create. As the System Design Primer emphasizes, everything in architecture is a trade-off. There is no universally correct answer, only answers that fit specific constraints.

### Client-Server

The most fundamental pattern in web development. The **client** (browser, mobile app) sends requests. The **server** processes them and sends responses. Nearly every web application follows this model. When someone says "frontend and backend," they are describing the client and server sides of this pattern.

### MVC (Model-View-Controller)

A pattern for organizing code within an application:

- **Model**: The data and business logic. A `User` model knows how to validate an email and save to the database.
- **View**: What the user sees. HTML templates, React components, or mobile screens.
- **Controller**: The glue between Model and View. It receives user input, calls the appropriate model logic, and returns the right view.

MVC helps separate concerns so that changing the UI does not require rewriting business logic. Most web frameworks (Rails, Django, Express with templates, Laravel) are built around this pattern.

### Monolith vs Microservices

**Monolith**: One codebase, one deployment, one database. All features live together. This is the right starting point for most projects. It is simpler to develop, test, debug, and deploy. A well-structured monolith can serve millions of users.

**Microservices**: Each feature or domain is a separate service with its own codebase and database, communicating over the network (HTTP, message queues). This adds complexity but enables independent deployment and scaling of individual components.

**The practical guidance**: Start with a monolith. Only split into microservices when you have a specific scaling or organizational problem that a monolith cannot solve. Premature microservices are one of the most common and expensive architectural mistakes.

### Key Infrastructure Concepts

**Load Balancer**: Distributes incoming traffic across multiple servers. If one server goes down, traffic routes to the others. This provides both scalability (handle more traffic) and reliability (survive server failures).

**Caching**: Storing frequently accessed data in a fast layer (Redis, Memcached, CDN) so the application does not hit the database for every request. Caching is the most impactful performance optimization in most systems.

**Database Replication**: Running multiple copies of a database. A primary database handles writes, and replica databases handle reads. This improves read performance and provides a backup if the primary fails.

**CDN (Content Delivery Network)**: A network of servers distributed geographically that cache static assets (images, CSS, JavaScript) close to users. A user in Tokyo gets assets from an Asian server instead of waiting for a round trip to a US data center.

### The Architecture Decision Framework

When evaluating architecture choices, consider these trade-offs:

- **Performance vs complexity**: Caching is fast but adds cache invalidation complexity
- **Consistency vs availability**: In distributed systems, you often must choose which to prioritize
- **Flexibility vs simplicity**: More abstractions enable future changes but add current complexity

## Key Takeaways

- Client-server is the foundation of web architecture; MVC organizes code within that model
- Start with a monolith and only move to microservices when you have a concrete reason
- Load balancers, caching, and CDNs are the three most common scaling tools
- Every architecture decision is a trade-off; there are no universally correct answers
