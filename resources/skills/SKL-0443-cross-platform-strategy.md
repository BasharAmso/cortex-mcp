---
id: SKL-0443
name: Cross-Platform Strategy
category: skills
tags: [cross-platform, native, react-native, flutter, pwa, shared-code, platform-strategy, architecture]
capabilities: [platform-selection-criteria, shared-code-architecture, native-vs-crossplatform-analysis, incremental-adoption]
useWhen:
  - deciding between native and cross-platform development
  - evaluating React Native vs Flutter vs PWA vs native
  - designing a shared code strategy across platforms
  - planning a mobile app that also needs a web presence
  - assessing trade-offs for team skills and timeline constraints
estimatedTokens: 680
relatedFragments: [SKL-0437, SKL-0438, SKL-0111, PAT-0222]
dependencies: []
synonyms: ["native vs cross platform", "react native vs flutter comparison", "cross platform mobile strategy", "shared code between platforms", "when to go native mobile", "cross platform architecture decision"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: cortex
pillar: "platform"
---

# Cross-Platform Strategy

When to go native vs cross-platform, framework selection criteria, and shared code architecture.

## Decision Framework

Choose your approach based on four factors:

| Factor | Native (Swift/Kotlin) | Cross-Platform (RN/Flutter) | PWA |
|--------|----------------------|---------------------------|-----|
| **Performance** | Best | Good (near-native) | Limited |
| **Platform UX fidelity** | Perfect | Good with effort | Generic |
| **Code sharing** | None | 70-90% | 95%+ |
| **Team requirement** | iOS + Android devs | One team | Web devs only |
| **App Store required** | Yes | Yes | Optional |
| **Development speed** | Slower (2x codebases) | Faster (1 codebase) | Fastest |

**Go native when:** Performance-critical UIs (games, video editors, AR), deep OS integration (HealthKit, Widgets), or your team already has native expertise.

**Go cross-platform when:** Content-driven apps, CRUD apps, startup speed matters, or your team is JavaScript/Dart-oriented.

**Go PWA when:** The app is primarily content consumption, offline support is basic, and app store distribution isn't required.

## Framework Comparison

**React Native + Expo:** Largest ecosystem, JavaScript/TypeScript, strong for teams with React experience. OTA updates via EAS. Bridge-based architecture (New Architecture uses JSI for direct native calls).

**Flutter:** Dart language, custom rendering engine (Skia), pixel-perfect consistency across platforms. Best for custom UI designs that shouldn't look platform-native. Strong for startups building their own design system.

**Kotlin Multiplatform (KMP):** Share business logic in Kotlin, write native UI per platform. Best when you need truly native UI but want shared networking, data, and business logic layers.

## Shared Code Architecture

Structure your codebase to maximize sharing while allowing platform-specific divergence:

```
shared/
  api/          ← API clients, data models, validation (100% shared)
  state/        ← State management, business logic (100% shared)
  utils/        ← Helpers, formatters, constants (100% shared)
platform/
  ios/          ← Platform-specific UI and native modules
  android/      ← Platform-specific UI and native modules
  web/          ← Web-specific components
components/
  shared/       ← Cross-platform UI components (80% shared)
  platform/     ← Platform-adaptive components
```

**Rule of thumb:** Share everything below the UI layer. Share UI components where platforms converge. Use platform-specific implementations only for interactions that feel wrong when generalized.

## Incremental Strategy

Don't commit to full cross-platform upfront. A staged approach reduces risk:

1. **Start with web** — Validate the product with a responsive web app or PWA
2. **Add mobile wrapper** — Use Capacitor or a WebView to get into app stores quickly
3. **Go native where it matters** — Replace performance-critical screens with native implementations
4. **Evaluate full native** — Only rebuild natively if the WebView approach hits hard limits

This approach lets you validate product-market fit before investing in native development.

## Key Takeaways

- Choose based on performance needs, team skills, timeline, and UX fidelity requirements
- Cross-platform works well for content apps and CRUD — native for performance-critical UIs
- Share API clients, business logic, and state management; diverge at the UI layer
- Start with the fastest path to market, then optimize platform-specific experiences
- KMP is the best option when you need native UI but want shared business logic
