---
id: SKL-0404
name: Java Fundamentals
category: skills
tags: [java, oop, collections, streams, concurrency, jvm]
capabilities: [java-application-design, collection-manipulation, stream-processing, concurrent-programming]
useWhen:
  - building enterprise applications with Java
  - working with Java collections and data structures
  - processing data with Java streams
  - writing concurrent or multithreaded Java code
  - understanding object-oriented design in Java
estimatedTokens: 650
relatedFragments: [SKL-0407, PAT-0208, PAT-0207]
dependencies: []
synonyms: ["how to write Java code", "Java collections tutorial", "Java streams guide", "Java concurrency basics", "object oriented programming in Java", "how to use Java generics"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/iluwatar/java-design-patterns"
difficulty: beginner
owner: "cortex"
pillar: "language"
---

# Skill: Java Fundamentals

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0404 |
| **Name** | Java Fundamentals |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Java remains the backbone of enterprise software. Its type system, garbage collection, and platform independence (write once, run anywhere via the JVM) make it a reliable choice for large-scale systems.

### Object-Oriented Principles

Java enforces OOP through classes, interfaces, and access modifiers. Design patterns from the Gang of Four are natural fits. Prefer composition over inheritance: use interfaces with default methods (Java 8+) instead of deep class hierarchies. Sealed classes (Java 17) restrict which classes can extend a type, improving domain modeling.

### Collections Framework

The `java.util` collections form the foundation of data handling. Choose the right structure: `ArrayList` for indexed access, `LinkedList` for frequent insertions, `HashMap` for key-value lookups, `TreeMap` for sorted keys. Use `Collections.unmodifiableList()` or `List.of()` (Java 9+) for immutable collections. Never modify a collection while iterating without using an `Iterator`.

### Streams API

Streams (Java 8+) enable declarative data processing pipelines. Chain `filter()`, `map()`, `reduce()`, and `collect()` for clean transformations. Use `parallelStream()` cautiously, only for CPU-bound operations on large datasets. Terminal operations like `collect(Collectors.toList())` trigger execution. Avoid side effects in stream operations.

```java
List<String> active = users.stream()
    .filter(User::isActive)
    .map(User::getName)
    .sorted()
    .collect(Collectors.toList());
```

### Concurrency Basics

Java offers `Thread`, `ExecutorService`, and `CompletableFuture` for async work. Use `ExecutorService` over raw threads for managed thread pools. `CompletableFuture` (Java 8+) chains async operations cleanly. Virtual threads (Java 21) dramatically reduce the cost of concurrent tasks, allowing millions of lightweight threads. Synchronize shared mutable state with `synchronized`, `ReentrantLock`, or concurrent collections like `ConcurrentHashMap`.

## Key Takeaways

- Use interfaces and composition over deep inheritance hierarchies
- Pick the right collection type for your access pattern
- Streams are powerful but avoid side effects and unnecessary parallel streams
- Prefer `ExecutorService` and `CompletableFuture` over raw threads
- Virtual threads (Java 21) simplify high-concurrency applications
