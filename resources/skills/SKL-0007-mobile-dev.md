---
id: SKL-0007
name: Mobile Development
category: skills
tags: [mobile, react-native, expo, swift, swiftui, kotlin, compose, ios, android, versioning, app-store]
capabilities: [cross-platform-apps, native-ios, native-android, mobile-navigation, platform-conventions, version-management]
useWhen:
  - building mobile app screens or navigation
  - implementing React Native, Swift/SwiftUI, or Kotlin/Compose features
  - handling mobile-specific concerns like permissions, safe areas, or app store requirements
  - creating cross-platform or native mobile experiences
  - managing app versioning and update notifications
estimatedTokens: 750
relatedFragments: [SKL-0005, SKL-0011, SKL-0014]
dependencies: []
synonyms: ["build a phone app", "make an iOS app", "create an Android app", "I want a mobile app", "build with React Native"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/nicklockwood/iVersion"
difficulty: advanced
---

# Mobile Development

Build mobile apps for iOS, Android, or both. Supports React Native + Expo (cross-platform default), Swift/SwiftUI (native iOS), and Kotlin/Jetpack Compose (native Android). Includes version management patterns inspired by iVersion (automatic update detection and user notification).

## Platform Defaults

**React Native + Expo:** React Navigation, useState/Zustand for state, StyleSheet API for styling.

**Swift/SwiftUI (iOS 17+):** MVVM with @Observable, NavigationStack, Swift Package Manager, SwiftData for persistence, async/await for concurrency.

**Kotlin/Compose (API 26+):** MVVM with StateFlow, Navigation Compose 2.8+ with type-safe routes, Hilt for DI, Room for persistence, Coroutines + Flow.

## Procedure

### 1. Determine Platform

Check project decisions for platform choice. If none exists, ask: React Native (cross-platform), Swift (iOS only), or Kotlin (Android only)? Log the choice.

### 2. Build the Screen/Feature

- Follow platform UI conventions and project folder structure
- Handle all states: loading, error, empty, populated
- Use platform-appropriate state management patterns

### 3. Device Considerations

| Concern | React Native | Swift/SwiftUI | Kotlin/Compose |
|---------|-------------|---------------|----------------|
| Safe areas | SafeAreaView | `.ignoresSafeArea()` deliberately | `systemBarsPadding()` |
| Keyboard | KeyboardAvoidingView | `@FocusState` | Handle config changes |
| Permissions | Request on feature trigger | Request on feature trigger | Runtime permissions |
| Lists (20+ items) | FlatList | LazyVStack | LazyColumn |

### 4. Version Management

Implement update awareness (inspired by iVersion patterns):
- Check for new versions on app launch (non-blocking)
- Show informative alert with release notes for new versions
- Link directly to the App Store / Play Store download page
- For enterprise/non-store apps, use a remote config or plist for version checking
- Never force-update unless a critical security fix requires it

### 5. Performance

- Use lazy lists for 20+ items
- Avoid expensive computations in render/body
- Use platform memoization (remember, useMemo, derivedStateOf)

### 6. Anti-Patterns to Avoid

**Swift:** No ObservableObject/@Published (use @Observable), no NavigationView (use NavigationStack), no DispatchQueue (use async/await), no Combine for UI binding.

**Kotlin:** No XML layouts (use Compose), no LiveData (use StateFlow), no kapt (use KSP), no GlobalScope (use viewModelScope), no SharedPreferences (use DataStore).

## App Store Readiness

- **iOS:** Privacy usage descriptions, App Transport Security, export compliance, Mac required for build/submit
- **Android:** Runtime permissions in manifest, targetSdk 35 for new submissions, data safety form
- **Both:** Version bump before every store submission, meaningful release notes, screenshot updates for major UI changes

## Key Constraints

- Never modify web frontend or backend files
- Never hardcode API keys or credentials
- Never generate deprecated APIs listed in anti-patterns
- Always include accessibility labels on interactive elements
