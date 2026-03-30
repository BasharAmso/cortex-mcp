---
id: SKL-0110
name: Flutter Patterns
category: skills
tags: [flutter, dart, widgets, cross-platform, material, cupertino, navigation, platform-channels]
capabilities: [widget-composition, flutter-navigation, platform-channels, adaptive-ui, flutter-testing]
useWhen:
  - building Flutter screens and widgets
  - implementing navigation with GoRouter or Navigator 2.0
  - bridging native platform code with platform channels
  - creating adaptive Material/Cupertino UIs
  - structuring a Flutter project with clean architecture
estimatedTokens: 650
relatedFragments: [SKL-0007, SKL-0111, SKL-0005]
dependencies: []
synonyms: ["how to build Flutter widgets", "Flutter app architecture", "make a Flutter screen", "Flutter navigation setup", "platform channels in Flutter", "Flutter best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/flutter/samples"
difficulty: intermediate
owner: builder
---

# Flutter Patterns

Build cross-platform apps with Dart using Flutter's widget composition model. Everything is a widget. Compose small, focused widgets into screens. The framework rebuilds the widget tree when state changes.

## Widget Composition

1. **StatelessWidget for pure UI.** Use when the widget depends only on its constructor parameters. No internal mutable state.
2. **StatefulWidget for local state.** Use when the widget manages ephemeral UI state (animation controllers, text editing controllers, toggles).
3. **Keep build methods lean.** Extract sub-widgets into separate classes or methods. A `build()` longer than 50 lines is a signal to decompose.
4. **Use `const` constructors.** Mark widgets as `const` when all fields are compile-time constants. This lets Flutter skip rebuilding unchanged subtrees.

## Project Structure

```
lib/
  core/          # shared utilities, theme, constants
  features/
    auth/
      data/      # repositories, data sources
      domain/    # models, use cases
      presentation/  # widgets, screens, controllers
  routing/       # GoRouter configuration
```

## Navigation (GoRouter)

GoRouter is the recommended declarative routing solution. Define routes as a tree, use path parameters and query parameters, support deep linking and redirects.

```dart
GoRouter(
  routes: [
    GoRoute(path: '/', builder: (_, __) => const HomeScreen()),
    GoRoute(path: '/user/:id', builder: (_, state) =>
      UserScreen(id: state.pathParameters['id']!)),
  ],
  redirect: (context, state) => authGuard(context, state),
)
```

## Platform Channels

Bridge Dart and native code (Swift/Kotlin) through `MethodChannel`. Define a channel name, send messages from Dart, handle on the native side. Use `EventChannel` for continuous streams (sensors, location).

Keep channel interfaces thin: serialize to JSON or primitives, handle errors on both sides, and define a clear contract.

## Adaptive UI

Use `Platform.isIOS` / `Platform.isAndroid` or `Theme.of(context).platform` to switch between Material and Cupertino widgets. Build a single widget tree with platform-adaptive leaf components rather than maintaining two separate widget trees.

## Testing Pyramid

| Level | Tool | Tests |
|-------|------|-------|
| Unit | `test` package | Business logic, models, utilities |
| Widget | `flutter_test` | Individual widget rendering and interaction |
| Integration | `integration_test` | Full app flows on device/emulator |

Use `pumpWidget` in widget tests, `find.byType` and `find.text` for assertions. Mock dependencies with `Mockito` or `Mocktail`.
