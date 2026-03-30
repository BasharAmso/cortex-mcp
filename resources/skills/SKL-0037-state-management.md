---
id: SKL-0037
name: State Management
category: skills
tags: [state-management, redux, zustand, context, store, global-state, react-state, signals]
capabilities: [state-architecture, store-design, state-selection, derived-state]
useWhen:
  - choosing a state management solution for a React application
  - managing global state that multiple components need
  - dealing with complex UI state and frequent re-renders
  - deciding between local component state and global stores
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0016, PAT-0001]
dependencies: []
synonyms: ["how to manage state in my app", "should I use Redux or Context", "my components keep re-rendering", "where should I store this data", "global state vs local state"]
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: intermediate
---

# State Management

Choosing the right state management approach prevents the two most common React problems: prop drilling hell and unnecessary re-renders.

## Decision Framework: Where Does This State Belong?

Ask these questions in order:

1. **Does only one component use it?** Use `useState`. Stop here.
2. **Do a parent and a few children share it?** Lift state up. Stop here.
3. **Is it server data (API responses)?** Use a data-fetching library (TanStack Query, SWR). Stop here.
4. **Is it URL state (filters, pagination)?** Use URL search params. Stop here.
5. **Is it form state?** Use a form library (React Hook Form, Formik). Stop here.
6. **Is it truly global UI state (theme, sidebar open, auth)?** Now pick a state manager.

Most apps that reach for Redux on day one actually need TanStack Query plus `useState`. True global state is rarer than developers think.

## Library Comparison

| Library | Bundle Size | Boilerplate | Re-render Control | Best For |
|---------|------------|-------------|-------------------|----------|
| React Context | 0 KB | Low | Poor (all consumers re-render) | Rarely-changing values (theme, locale) |
| Zustand | ~1 KB | Very low | Good (selector-based) | Most apps. Simple API, minimal boilerplate |
| Jotai | ~2 KB | Low | Excellent (atomic) | Fine-grained reactivity, derived state |
| Redux Toolkit | ~11 KB | Medium | Good (selector-based) | Large teams needing strict patterns, devtools, middleware |
| Valtio | ~3 KB | Very low | Good (proxy-based) | Mutable-style API preference |
| Signals (Preact) | ~1 KB | Very low | Excellent (auto-tracking) | Preact apps, fine-grained updates |

## Common Mistakes

### Using Context for Frequently-Changing State

Context re-renders every consumer on any change. A global counter in Context re-renders every component that reads it, even if they only care about a different field. Use Context for values that change rarely (theme, authenticated user).

### Putting Server State in a Store

API responses belong in a data-fetching library, not Redux or Zustand. TanStack Query handles caching, refetching, background updates, and loading/error states. Duplicating this in a store creates staleness bugs.

### Giant Monolithic Stores

Split stores by domain. One store for auth, one for UI preferences, one for cart. This improves code splitting and prevents unrelated re-renders.

### Not Using Selectors

```typescript
// Bad: re-renders on ANY store change
const state = useStore();

// Good: re-renders only when count changes
const count = useStore((s) => s.count);
```

## Recommended Patterns

### Derived State

Compute values from state rather than storing redundant data. If you have `items` and need `totalPrice`, derive it with a selector or computed function. Never store both.

### Actions Colocated with State

Keep state mutations next to the state definition. Zustand and Redux Toolkit both encourage this. Avoid scattering mutations across components.

### Optimistic Updates

For user-perceived speed, update the store immediately and reconcile with the server response. TanStack Query has built-in optimistic update support for server state. For client state, update the store and roll back on error.
