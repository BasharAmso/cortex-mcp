---
id: SKL-0107
name: SwiftUI Patterns
category: skills
tags: [swiftui, ios, declarative-ui, state-management, observable, navigation, previews, modifiers, apple]
capabilities: [declarative-views, swiftui-state, navigation-patterns, preview-driven-development, modifier-composition]
useWhen:
  - building SwiftUI views and screens
  - managing state with @State, @Binding, or @Observable
  - implementing NavigationStack or TabView navigation
  - composing view modifiers and custom layouts
  - setting up Xcode previews for rapid iteration
estimatedTokens: 700
relatedFragments: [SKL-0007, PAT-0044, SKL-0005]
dependencies: []
synonyms: ["how to build SwiftUI views", "SwiftUI state management", "make an iOS screen with SwiftUI", "SwiftUI navigation", "how do I use @State and @Binding", "SwiftUI best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nalexn/clean-architecture-swiftui"
difficulty: intermediate
---

# SwiftUI Patterns

Build declarative iOS/macOS interfaces using SwiftUI's view composition model. Views are value types that describe UI as a function of state. The framework diffs and re-renders automatically.

## State Property Wrappers

| Wrapper | Scope | Use Case |
|---------|-------|----------|
| `@State` | View-local | Simple value types owned by one view |
| `@Binding` | Parent-to-child | Pass mutable state down the view tree |
| `@Observable` (iOS 17+) | Shared reference | Replace ObservableObject for reference-type models |
| `@Environment` | Ancestor injection | System values or custom dependencies |
| `@AppStorage` | UserDefaults-backed | Persistent user preferences |

## View Composition Rules

1. **Keep views small.** Extract subviews when a body exceeds 30 lines. Each view should have one clear responsibility.
2. **Prefer composition over inheritance.** Combine small views rather than building monolithic ones. Use `ViewModifier` for reusable styling.
3. **Push state up, push actions down.** Parent views own state; child views receive bindings and fire callbacks.
4. **Use custom modifiers for reusable styling.** Create `ViewModifier` structs and expose them via `.modifier()` or extension methods on `View`.

## Navigation (iOS 16+)

Use `NavigationStack` with `NavigationPath` for programmatic, type-safe navigation. Define navigation destinations with `.navigationDestination(for:)`. Avoid `NavigationLink` with destination closures in complex apps since they eagerly instantiate destination views.

```swift
NavigationStack(path: $router.path) {
    ContentView()
        .navigationDestination(for: Route.self) { route in
            route.destinationView
        }
}
```

## Previews

Treat Xcode previews as your primary iteration loop. Create previews for each meaningful state: populated, empty, loading, error. Use `#Preview` macro (iOS 17+) for concise preview declarations. Inject mock data through environment or initializer parameters.

## Performance Guidelines

- Mark view models with `@Observable` instead of `ObservableObject` to get automatic fine-grained tracking.
- Use `EquatableView` or manual `Equatable` conformance for views that re-render too often.
- Prefer `LazyVStack`/`LazyHStack` inside `ScrollView` for long lists.
- Profile with Instruments to find unnecessary re-renders before optimizing.

## Anti-Patterns to Avoid

- Putting networking or business logic inside views.
- Using `@StateObject` in iOS 17+ apps (prefer `@State` with `@Observable`).
- Deep nesting of `NavigationLink` without centralized routing.
- Ignoring the `body` computation cost by doing heavy work inline.
