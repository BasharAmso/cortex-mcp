---
id: PAT-0044
name: SwiftUI Architecture
category: patterns
tags: [swiftui, architecture, mvvm, clean-architecture, repository-pattern, dependency-injection, ios]
capabilities: [swiftui-architecture, mvvm-pattern, repository-layer, di-container, testable-ios]
useWhen:
  - structuring a SwiftUI app beyond a single screen
  - separating business logic from views
  - implementing the repository pattern for data access
  - setting up dependency injection in a Swift project
  - choosing between MVVM and Clean Architecture for iOS
estimatedTokens: 700
relatedFragments: [SKL-0108, SKL-0007, PAT-0006]
dependencies: []
synonyms: ["SwiftUI app architecture", "MVVM in SwiftUI", "clean architecture iOS", "how to structure a SwiftUI project", "SwiftUI dependency injection", "repository pattern Swift"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nalexn/clean-architecture-swiftui"
difficulty: advanced
owner: builder
pillar: "platform"
---

# SwiftUI Architecture

Structure SwiftUI apps with clear separation between views, business logic, and data access. The architecture should make views dumb, logic testable, and data sources swappable.

## Architecture Options

| Pattern | Complexity | Best For |
|---------|-----------|----------|
| MVVM | Medium | Most apps, Apple's implicit recommendation |
| Clean Architecture | High | Large apps with complex domain logic |
| TCA (Composable) | High | Apps needing strict unidirectional data flow |

## MVVM (Recommended Default)

Three layers: **View** (SwiftUI), **ViewModel** (@Observable class), **Model** (data/domain types).

```
View (SwiftUI)
  ↕ bindings
ViewModel (@Observable)
  ↓ calls
Repository (protocol)
  ↓ implements
DataSource (network / database)
```

The ViewModel owns business logic and exposes state. Views observe the ViewModel through `@State` (iOS 17+ with `@Observable`). Views never call repositories directly.

```swift
@Observable
class UserListViewModel {
    var users: [User] = []
    var isLoading = false
    private let repository: UserRepository

    init(repository: UserRepository) {
        self.repository = repository
    }

    func loadUsers() async {
        isLoading = true
        users = (try? await repository.fetchAll()) ?? []
        isLoading = false
    }
}
```

## Clean Architecture

Adds an explicit **Interactor** (use case) layer between ViewModel and Repository. Interactors contain business rules that don't belong in views or data access. Use when multiple ViewModels share the same business logic, or when domain rules are complex enough to warrant their own test suite.

Layer structure: View > ViewModel > Interactor > Repository > DataSource.

## Repository Pattern

Repositories abstract data access behind a protocol. This enables swapping between network, database, and mock implementations.

```swift
protocol UserRepository {
    func fetchAll() async throws -> [User]
    func save(_ user: User) async throws
}

struct RemoteUserRepository: UserRepository {
    let client: HTTPClient
    func fetchAll() async throws -> [User] { /* network call */ }
    func save(_ user: User) async throws { /* network call */ }
}
```

Create a `MockUserRepository` conforming to the same protocol for previews and tests.

## Dependency Injection

Use Swift's `@Environment` for view-tree injection or a lightweight DI container for app-wide services.

**Environment approach (simple apps):**
```swift
@Observable class AppDependencies {
    let userRepo: UserRepository = RemoteUserRepository(client: .shared)
}

// Inject at app root
ContentView().environment(AppDependencies())
```

**Container approach (larger apps):** Create a `DependencyContainer` that vends protocols. Pass it through the environment or initializers. Avoid service locator anti-patterns where dependencies are pulled from a global.

## Project Structure

```
App/
  App.swift              # Entry point, DI setup
  Core/
    Models/              # Domain types
    Repositories/        # Protocol definitions
  Data/
    Network/             # API clients, DTOs
    Persistence/         # SwiftData / CoreData
    Repositories/        # Protocol implementations
  Features/
    UserList/
      UserListView.swift
      UserListViewModel.swift
  Shared/
    Components/          # Reusable UI components
    Extensions/          # Swift extensions
```

## Testing Strategy

- **ViewModel tests:** Inject mock repositories, assert state changes after method calls.
- **Repository tests:** Test against a local mock server or in-memory database.
- **View tests:** Use ViewInspector or Xcode previews for visual validation. Keep logic out of views so there is little to test at this layer.
