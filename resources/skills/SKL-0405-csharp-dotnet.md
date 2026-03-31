---
id: SKL-0405
name: C# and .NET
category: skills
tags: [csharp, dotnet, linq, async-await, entity-framework, blazor]
capabilities: [dotnet-application-design, linq-queries, async-programming, entity-framework-usage]
useWhen:
  - building applications with C# and .NET
  - querying data with LINQ
  - writing async code with async/await in C#
  - using Entity Framework for database access
  - building web UIs with Blazor
estimatedTokens: 650
relatedFragments: [SKL-0404, PAT-0208, PAT-0207]
dependencies: []
synonyms: ["how to write C# code", "LINQ tutorial", "async await in C#", "Entity Framework guide", "Blazor basics", "how to build a .NET app"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/dotnet/runtime"
difficulty: beginner
owner: "cortex"
pillar: "language"
---

# Skill: C# and .NET

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0405 |
| **Name** | C# and .NET |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

C# and .NET power a wide range of applications from web APIs to desktop apps to game development (Unity). The modern .NET platform (6+) is cross-platform, high-performance, and open source.

### LINQ (Language Integrated Query)

LINQ unifies data querying across collections, databases, and XML. Use method syntax for complex queries and query syntax for readability. Deferred execution means queries run when enumerated, not when defined. Materialize with `ToList()` or `ToArray()` when you need results immediately.

```csharp
var activeUsers = users
    .Where(u => u.IsActive)
    .OrderBy(u => u.Name)
    .Select(u => new { u.Name, u.Email })
    .ToList();
```

### Async/Await

C# async/await is built into the language and runtime. Mark methods `async` and return `Task<T>`. Always await async calls rather than using `.Result` or `.Wait()` (which can deadlock). Use `ValueTask<T>` for hot paths where the result is often synchronous. `ConfigureAwait(false)` in library code avoids capturing the synchronization context.

### Entity Framework Core

EF Core is the standard ORM for .NET. Define models as C# classes, configure with Fluent API or data annotations. Use migrations to version your schema. Always use `AsNoTracking()` for read-only queries. Avoid lazy loading in web applications as it causes N+1 query problems. Use `Include()` for eager loading and project with `Select()` to fetch only needed columns.

### Blazor

Blazor enables building interactive web UIs with C# instead of JavaScript. Blazor Server runs on the server with SignalR for real-time updates. Blazor WebAssembly runs entirely in the browser. Use Blazor Server for internal tools (lower latency requirement), WebAssembly for public-facing apps that need offline capability.

## Key Takeaways

- LINQ provides a consistent query language across all data sources
- Always use async/await properly to avoid deadlocks and improve scalability
- EF Core migrations keep your database schema in version control
- Use `AsNoTracking()` and `Select()` projections for read-heavy queries
- Choose Blazor Server vs WebAssembly based on latency and offline needs
