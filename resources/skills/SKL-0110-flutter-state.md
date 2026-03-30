---
id: SKL-0110
name: Flutter State Management
category: skills
tags: [flutter, state-management, riverpod, bloc, provider, dart, inherited-widget, reactive]
capabilities: [state-architecture, riverpod-patterns, bloc-patterns, provider-setup, state-selection]
useWhen:
  - choosing a state management approach for a Flutter app
  - implementing Riverpod, BLoC, or Provider in a feature
  - managing global app state vs local widget state
  - optimizing rebuilds with selectors or listeners
  - migrating between state management solutions
estimatedTokens: 650
relatedFragments: [SKL-0109, SKL-0007, PAT-0001]
dependencies: []
synonyms: ["Flutter state management", "should I use BLoC or Riverpod", "Flutter Provider setup", "how to manage state in Flutter", "Riverpod tutorial", "BLoC pattern Flutter"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/flutter/samples"
difficulty: advanced
---

# Flutter State Management

Choose the right state management approach based on app complexity. Each solution trades simplicity for power.

## Decision Matrix

| Solution | Complexity | Best For | Learning Curve |
|----------|-----------|----------|----------------|
| `setState` | Minimal | Single-widget ephemeral state | Low |
| `InheritedWidget` | Low | Theme/locale propagation | Medium |
| Provider | Medium | Small-to-medium apps, DI | Low |
| Riverpod | Medium-High | Medium-to-large apps, testability | Medium |
| BLoC | High | Large apps, strict separation, team conventions | High |

## setState

Use for ephemeral, single-widget state only: form field focus, animation toggles, local counters. Never use for shared state or anything that persists beyond the widget lifecycle.

## Provider

Wraps `InheritedWidget` with a developer-friendly API. Use `ChangeNotifierProvider` for mutable models, `FutureProvider` for async loading, `ProxyProvider` for derived state.

Limitation: providers are scoped to the widget tree, making testing and overriding harder than Riverpod.

## Riverpod (Recommended Default)

Compile-safe, tree-independent providers. No `BuildContext` required for reading state.

```dart
// Define a provider
final userProvider = FutureProvider<User>((ref) async {
  return ref.read(userRepositoryProvider).fetchCurrentUser();
});

// Consume in a widget
class ProfileScreen extends ConsumerWidget {
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(userProvider);
    return userAsync.when(
      data: (user) => UserProfile(user: user),
      loading: () => const CircularProgressIndicator(),
      error: (e, _) => ErrorDisplay(message: e.toString()),
    );
  }
}
```

Key patterns: `ref.watch` for reactive rebuilds, `ref.read` for one-shot reads, `ref.listen` for side effects. Use `StateNotifierProvider` or `NotifierProvider` for mutable business logic.

## BLoC (Business Logic Component)

Enforces strict unidirectional data flow: Events go in, States come out. Use `flutter_bloc` package.

```dart
// Event
sealed class AuthEvent {}
class LoginRequested extends AuthEvent { final String email, password; }

// State
sealed class AuthState {}
class AuthInitial extends AuthState {}
class AuthSuccess extends AuthState { final User user; }

// Bloc
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc(this._repo) : super(AuthInitial()) {
    on<LoginRequested>(_onLogin);
  }
}
```

Use `BlocBuilder` for UI rebuilds, `BlocListener` for one-shot side effects (navigation, snackbars), `BlocConsumer` for both. Apply `buildWhen` / `listenWhen` to limit unnecessary rebuilds.

## Migration Path

Start with `setState` for prototypes. Graduate to Riverpod when you need shared state across screens or dependency injection. Consider BLoC only when the team prefers strict event-driven architecture or the app has complex state machines.
