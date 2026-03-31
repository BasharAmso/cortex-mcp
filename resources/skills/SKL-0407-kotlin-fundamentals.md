---
id: SKL-0407
name: Kotlin Fundamentals
category: skills
tags: [kotlin, coroutines, null-safety, data-classes, jetpack-compose, android]
capabilities: [kotlin-application-design, coroutine-management, null-safe-programming, compose-ui-development]
useWhen:
  - building Android applications with Kotlin
  - writing server-side Kotlin applications
  - using coroutines for asynchronous programming
  - designing UIs with Jetpack Compose
  - leveraging Kotlin null safety and data classes
estimatedTokens: 650
relatedFragments: [SKL-0404, SKL-0406, SKL-0007, PAT-0208]
dependencies: []
synonyms: ["how to write Kotlin code", "Kotlin coroutines tutorial", "Kotlin null safety guide", "Jetpack Compose basics", "Android development with Kotlin", "Kotlin data classes explained"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/JetBrains/kotlin"
difficulty: beginner
owner: "cortex"
pillar: "language"
---

# Skill: Kotlin Fundamentals

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0407 |
| **Name** | Kotlin Fundamentals |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Kotlin is a modern JVM language that brings conciseness, null safety, and coroutines to Android and server-side development. It is fully interoperable with Java while eliminating much of Java's boilerplate.

### Null Safety

Kotlin distinguishes nullable (`String?`) from non-nullable (`String`) types at the compiler level. The safe call operator (`?.`), Elvis operator (`?:`), and smart casts eliminate most null-related crashes. Use `let` for scoped null-safe operations. Avoid `!!` (the not-null assertion) except in tests.

```kotlin
val city = user?.address?.city ?: "Unknown"
user?.email?.let { sendWelcome(it) }
```

### Data Classes and Sealed Classes

Data classes auto-generate `equals()`, `hashCode()`, `toString()`, and `copy()`. Use them for DTOs, API responses, and domain models. Sealed classes (and sealed interfaces) restrict type hierarchies to a known set of subtypes, enabling exhaustive `when` expressions. This is powerful for modeling states and events.

```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}
```

### Coroutines

Coroutines provide lightweight concurrency without callback hell. Launch coroutines with `launch` (fire-and-forget) or `async` (returns a result). Use `Dispatchers.IO` for blocking I/O, `Dispatchers.Main` for UI updates. Structured concurrency via `CoroutineScope` ensures child coroutines are cancelled when the parent scope is cancelled. `Flow` is Kotlin's cold asynchronous stream, similar to RxJava but coroutine-native.

### Jetpack Compose

Compose is Android's declarative UI toolkit. Composable functions describe UI based on state. Use `remember` and `mutableStateOf` for local state. `LaunchedEffect` handles side effects tied to composition lifecycle. Lift state up to the nearest common ancestor. Keep composables small and preview-friendly with `@Preview`.

## Key Takeaways

- Kotlin null safety eliminates most NullPointerExceptions at compile time
- Data classes and sealed classes reduce boilerplate and improve type safety
- Coroutines with structured concurrency simplify async code
- Use `Flow` for reactive streams and `StateFlow` for observable state
- Jetpack Compose favors small composable functions with state hoisting
