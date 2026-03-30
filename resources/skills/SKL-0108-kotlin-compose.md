---
id: SKL-0108
name: Jetpack Compose Patterns
category: skills
tags: [jetpack-compose, android, kotlin, composables, material3, state-hoisting, navigation, lazy-lists]
capabilities: [compose-ui, state-hoisting, material3-theming, compose-navigation, lazy-layouts]
useWhen:
  - building Android UI screens with Jetpack Compose
  - implementing state hoisting and unidirectional data flow
  - creating Material 3 themed components
  - building scrollable lists with LazyColumn or LazyGrid
  - setting up Compose navigation with type-safe routes
estimatedTokens: 700
relatedFragments: [SKL-0007, PAT-0045, SKL-0005]
dependencies: []
synonyms: ["how to build Compose UI", "Jetpack Compose basics", "Android Compose state management", "make an Android screen", "Compose navigation", "Material 3 in Compose"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/android/compose-samples"
difficulty: intermediate
---

# Jetpack Compose Patterns

Build Android UI with Kotlin-first declarative composables. Compose replaces XML layouts with functions that describe UI as a function of state. Recomposition handles updates automatically.

## Core Composable Rules

1. **Composables are functions, not classes.** Annotate with `@Composable`. They run during composition and can be called again (recomposed) when state changes.
2. **Hoist state to the caller.** Stateless composables receive state as parameters and emit events via callbacks. This makes them testable and reusable.
3. **Use `remember` to survive recomposition.** Wrap expensive computations or mutable state in `remember { }`. Use `rememberSaveable` to survive configuration changes.
4. **Side effects belong in effect handlers.** Use `LaunchedEffect` for coroutines, `DisposableEffect` for cleanup, `SideEffect` for non-suspend callbacks.

## State Management

| Approach | Scope | Use Case |
|----------|-------|----------|
| `remember + mutableStateOf` | Composable-local | Simple UI state (toggle, input) |
| `ViewModel + StateFlow` | Screen-scoped | Business logic, survives config changes |
| `rememberSaveable` | Process death | State that must survive system kills |
| `derivedStateOf` | Computed | Values derived from other state objects |

## Material 3 Theming

Define your theme with `MaterialTheme` providing `colorScheme`, `typography`, and `shapes`. Support dynamic color on Android 12+ with `dynamicDarkColorScheme`/`dynamicLightColorScheme`. Always reference theme tokens (`MaterialTheme.colorScheme.primary`) instead of hardcoded colors.

## Lazy Layouts

Use `LazyColumn`, `LazyRow`, and `LazyVerticalGrid` for scrollable content. Always provide stable `key` parameters to items for efficient recomposition. Avoid nesting lazy layouts in the same scroll direction. Use `item` and `items` DSL for heterogeneous lists.

```kotlin
LazyColumn {
    items(items = users, key = { it.id }) { user ->
        UserCard(user = user, onClick = { onUserClick(user.id) })
    }
}
```

## Navigation (Compose 2.8+)

Use type-safe routes with serializable data classes. Define a `NavHost` with composable destinations. Pass arguments through route parameters, not bundles.

```kotlin
@Serializable data class UserDetail(val userId: String)

NavHost(navController, startDestination = Home) {
    composable<Home> { HomeScreen(onUserClick = { navController.navigate(UserDetail(it)) }) }
    composable<UserDetail> { backStackEntry ->
        val route = backStackEntry.toRoute<UserDetail>()
        UserDetailScreen(userId = route.userId)
    }
}
```

## Performance

- Use `Modifier` parameter as first optional parameter in every composable.
- Prefer `ImmutableList` or `@Stable`/`@Immutable` annotations to help the compiler skip recomposition.
- Use Layout Inspector to detect unnecessary recompositions.
- Extract lambdas that reference `ViewModel` methods to prevent recomposition cascades.
