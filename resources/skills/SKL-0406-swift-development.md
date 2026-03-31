---
id: SKL-0406
name: Swift Development
category: skills
tags: [swift, swiftui, ios, optionals, protocols, combine]
capabilities: [swift-application-design, swiftui-interfaces, protocol-oriented-design, reactive-programming]
useWhen:
  - building iOS or macOS applications with Swift
  - designing UIs with SwiftUI
  - working with optionals and type safety in Swift
  - implementing protocol-oriented design
  - using Combine for reactive data flows
estimatedTokens: 650
relatedFragments: [SKL-0407, SKL-0007, PAT-0207]
dependencies: []
synonyms: ["how to write Swift code", "SwiftUI tutorial", "Swift optionals explained", "protocol oriented programming", "iOS development basics", "how to use Combine framework"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/apple/swift"
difficulty: beginner
owner: "cortex"
pillar: "language"
---

# Skill: Swift Development

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0406 |
| **Name** | Swift Development |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Swift is Apple's modern language for iOS, macOS, watchOS, and server-side development. Its strong type system, value semantics, and safety features (optionals, memory safety) make it both expressive and reliable.

### Optionals and Safety

Optionals are Swift's approach to null safety. A variable of type `String?` may or may not hold a value. Use `if let` or `guard let` for safe unwrapping. Never force-unwrap (`!`) unless you have a provable guarantee. Optional chaining (`user?.address?.city`) safely traverses nested optionals. The nil-coalescing operator (`??`) provides defaults.

```swift
guard let user = fetchUser(id: userId) else {
    return .notFound
}
// user is safely unwrapped here
```

### Protocol-Oriented Design

Swift favors protocols over class inheritance. Define capabilities as protocols, then conform structs and classes to them. Protocol extensions provide default implementations. Use `associatedtype` for generic protocols. This approach enables composition without the fragility of deep inheritance trees.

```swift
protocol Cacheable {
    var cacheKey: String { get }
    var ttl: TimeInterval { get }
}
extension Cacheable {
    var ttl: TimeInterval { 300 } // 5-minute default
}
```

### SwiftUI

SwiftUI is a declarative UI framework. Views are structs conforming to `View`. State management uses `@State` for local state, `@Binding` for child-to-parent communication, `@ObservedObject` and `@StateObject` for reference-type models, and `@EnvironmentObject` for dependency injection. Keep views small and extract subviews aggressively.

### Combine

Combine is Apple's reactive framework. Publishers emit values over time, subscribers receive them. Chain operators like `map`, `filter`, `debounce`, and `combineLatest`. Use `@Published` properties in ObservableObject classes to bridge Combine with SwiftUI. For simple async work, prefer `async/await` (Swift 5.5+) over Combine.

## Key Takeaways

- Never force-unwrap optionals; use `guard let` and `if let` for safety
- Prefer protocols and composition over class inheritance
- SwiftUI state management: pick the right property wrapper for the scope
- Use Combine for complex reactive flows, async/await for simple async tasks
- Extract small reusable views to keep SwiftUI code maintainable
