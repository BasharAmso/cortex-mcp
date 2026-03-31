---
id: SKL-0127
name: Clean TypeScript
category: skills
tags: [typescript, clean-code, solid, type-safety, generics, error-handling, naming-conventions, testing]
capabilities: [clean-code-practices, type-safe-design, solid-principles, readable-typescript]
useWhen:
  - writing new TypeScript code and want clean patterns
  - refactoring messy TypeScript for readability
  - applying SOLID principles in a TypeScript project
  - choosing between enums, unions, and const objects
  - improving error handling in TypeScript applications
estimatedTokens: 750
relatedFragments: [SKL-0125, PAT-0055, SKL-0005]
dependencies: []
synonyms: ["how to write clean TypeScript", "TypeScript best practices", "SOLID in TypeScript", "TypeScript naming conventions", "clean code for TS", "readable TypeScript tips"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/labs42io/clean-code-typescript"
difficulty: intermediate
owner: "cortex"
pillar: "language"
---

# Clean TypeScript

Clean code reads like well-written prose. These principles apply universally but are expressed here through TypeScript-specific patterns.

## SOLID Principles

| Principle | Rule | TypeScript Application |
|-----------|------|----------------------|
| **Single Responsibility** | One reason to change per class | Split `UserService` into `UserAuth` and `UserSettings` |
| **Open/Closed** | Extend behavior without modifying existing code | Use abstract classes or interfaces, not `instanceof` checks |
| **Liskov Substitution** | Subtypes must honor parent contracts | If `Square` breaks `Rectangle` width/height independence, the hierarchy is wrong |
| **Interface Segregation** | No client depends on methods it does not use | Separate `Printer`, `Scanner`, `Fax` instead of one `SmartPrinter` |
| **Dependency Inversion** | Depend on abstractions, not concretions | Inject a `Formatter` interface, not a concrete `XmlFormatter` |

## Type Safety

- Let the compiler do the work. Avoid `any`; use `unknown` when the type is genuinely unknown.
- Use `readonly` properties and `ReadonlyArray<T>` to enforce immutability.
- Prefer `const` assertions (`as const`) for literal values that should never change.
- Use discriminated unions for state modeling: `type Result<T> = { ok: true; value: T } | { ok: false; error: Error }`.

## Naming and Variables

- **Meaningful and pronounceable**: `generationTimestamp` not `genymdhms`.
- **No mental mapping**: spell out `user`, `subscription`, not `u`, `s`.
- **No redundant context**: inside a `Car` type, use `make` not `carMake`.
- **Searchable constants**: `const MILLISECONDS_PER_DAY = 86_400_000`.

## Functions

- Limit parameters to two. Use an options object with destructuring for more.
- Each function does one thing. If you need an `and` in the name, split it.
- Avoid boolean flag parameters. They signal multiple responsibilities. Write two functions instead.
- Use default parameters: `function load(count = 10)` over ternary checks.

## Error Handling

- Always throw `Error` objects, never strings. Strings lose stack traces.
- Handle caught errors meaningfully. Silent `catch {}` blocks hide bugs.
- Use the Result pattern (`{ ok, value/error }`) for operations that regularly fail (validation, parsing).
- With async/await, always use try/catch or `.catch()`. Unhandled rejections crash Node processes.

## Classes and Composition

- Prefer composition over inheritance unless the relationship is truly "is-a."
- Keep classes focused. Large classes signal multiple responsibilities.
- Use method chaining (return `this`) for builder/fluent APIs.
- Use getters/setters for validation and encapsulation over public properties.

## Testing (FIRST Rules)

Tests must be **F**ast, **I**ndependent, **R**epeatable, **S**elf-validating, and **T**imely. Write one assertion per test. Name tests to describe the expected behavior, not the method being called.

## Code Organization

- Group imports: polyfills, node modules, external packages, internal modules, relative paths.
- Use path aliases (`@services/UserService`) to avoid deep relative imports.
- Place caller and callee functions close together. Readers expect top-to-bottom flow.
- Let self-documenting code replace comments. Extract complex conditions into named variables or functions.
