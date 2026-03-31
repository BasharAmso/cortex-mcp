---
id: PAT-0207
name: Language Migration Pattern
category: patterns
tags: [migration, interop, ffi, coexistence, gradual-adoption, polyglot]
capabilities: [gradual-migration-planning, interop-bridge-design, ffi-integration, coexistence-strategy]
useWhen:
  - migrating a codebase from one language to another
  - running two languages side by side during a transition
  - using FFI to call native code from a higher-level language
  - planning a gradual adoption strategy for a new language
  - integrating legacy code with modern services
estimatedTokens: 650
relatedFragments: [PAT-0208, PAT-0209, SKL-0404, SKL-0405]
dependencies: []
synonyms: ["how to migrate from one language to another", "gradual language adoption", "running two languages together", "FFI integration guide", "interop between languages", "how to phase out a legacy language"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "language"
---

# Language Migration Pattern

Strategies for safely transitioning a codebase from one programming language to another without a risky big-bang rewrite.

## Migration Strategies

| Strategy | Risk | Timeline | Best For |
|----------|------|----------|----------|
| **Strangler Fig** | Low | Long | Monoliths, gradual replacement |
| **Service Extraction** | Medium | Medium | Extracting bounded contexts |
| **FFI Bridge** | Medium | Short | Performance-critical native code |
| **Parallel Run** | Low | Long | Mission-critical systems |

## Strangler Fig Approach

The safest migration pattern. New features are written in the target language. Existing features are migrated one module at a time. A routing layer (API gateway, reverse proxy) directs traffic to old or new implementations. The legacy system shrinks over time until it can be decommissioned.

```
Request → Router → [New Service (Go)] or [Legacy (PHP)]
                    ↑ migrate module by module
```

## FFI and Interop

When two languages must coexist in the same process, use Foreign Function Interface (FFI). Common patterns: Python calling C/Rust via ctypes or PyO3, Node.js calling Rust via napi-rs, JVM languages calling native code via JNI. Define a clean C-compatible interface as the boundary. Keep the FFI surface area small and well-tested.

## Coexistence Guidelines

1. **Shared data contracts.** Use protocol buffers, JSON schema, or OpenAPI to define the interface between old and new systems. Both sides generate code from the same spec.
2. **Feature flags.** Route traffic between implementations per-feature, not per-service. Roll back instantly if the new implementation has issues.
3. **Shared tests.** Run the same integration test suite against both implementations. The migration is complete when the new system passes all tests and the old one can be removed.
4. **Database sharing.** During migration, both systems may share a database. Avoid schema changes that break the old system. Use database views or an abstraction layer.

## Anti-Patterns

- Big-bang rewrites that attempt to replace everything at once
- Running two systems indefinitely without a decommission plan
- Migrating without measuring performance baselines first
- Skipping integration tests between old and new systems
- Changing business logic during the migration (migrate first, improve later)
