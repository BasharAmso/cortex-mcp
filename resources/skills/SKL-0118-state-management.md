---
id: SKL-0118
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
relatedFragments: [SKL-0005, SKL-0019, PAT-0001]
dependencies: []
synonyms: ["how to manage state in my app", "should I use Redux or Context", "my components keep re-rendering", "where should I store this data", "global state vs local state"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/alan2207/bulletproof-react"
difficulty: intermediate
owner: builder
pillar: "software-dev"
---

# State Management

Choosing the right state management approach prevents the two most common React problems: prop drilling hell and unnecessary re-renders. Bulletproof React identifies five distinct state categories, each with its own recommended solution. Most apps that reach for Redux on day one actually need a server cache library plus `useState`.

## Five State Categories

Per bulletproof-react's state management architecture, treat each category independently:

1. **Component State** -- Isolated to one component. Use `useState` for simple values, `useReducer` for complex multi-field updates. This is the default; start here.
2. **Application State** -- Global UI concerns: theme, sidebar open, notifications, modals. Localize as closely as possible to the components that need it. Only elevate when truly shared.
3. **Server Cache State** -- Remote data stored locally for reuse. This is NOT application state. Use a dedicated data-fetching library, not a general store.
4. **Form State** -- Input values, validation, dirty tracking, submission. Use a dedicated form library.
5. **URL State** -- Filters, pagination, selected tabs encoded in the URL. Use router params and search params.

## Recommended Libraries by Category

| Category | Libraries | Notes |
|----------|-----------|-------|
| Component State | `useState`, `useReducer` | Built-in, no dependency needed |
| Application State | Zustand, Jotai, Redux Toolkit, Context+Hooks | Zustand for most apps (tiny, selector-based) |
| Server Cache | TanStack Query, SWR, RTK Query, Apollo Client | Handles caching, refetch, background updates |
| Form State | React Hook Form, Formik + Zod/Yup | Validation colocated with form logic |
| URL State | React Router DOM, nuqs | Source of truth is the URL |

## Decision Framework

Ask these questions in order:

1. **Does only one component use it?** `useState`. Stop here.
2. **Do a parent and a few children share it?** Lift state up. Stop here.
3. **Is it server data (API responses)?** Use TanStack Query or SWR. Stop here.
4. **Is it URL state (filters, pagination)?** Use URL search params. Stop here.
5. **Is it form state?** Use React Hook Form. Stop here.
6. **Is it truly global UI state?** Now pick a state manager.

## Anti-Patterns

### Globalizing Everything

Per bulletproof-react: "unnecessarily globalizing all state variables from the outset" defeats structured architecture. Begin with component-level state; elevate only when needed elsewhere.

### Putting Server State in a Store

API responses belong in a data-fetching library, not Redux or Zustand. TanStack Query handles caching, refetching, background updates, and loading/error states. Duplicating this in a store creates staleness bugs.

### Using Context for Frequently-Changing State

Context re-renders every consumer on any change. Use it only for values that change rarely (theme, locale, authenticated user).

### Giant Monolithic Stores

Split stores by domain. One store for auth, one for UI preferences, one for cart. This improves code splitting and prevents unrelated re-renders.

## Key Patterns

- **Selectors:** Always select the smallest slice of state a component needs. `useStore((s) => s.count)` re-renders only when count changes.
- **Derived State:** Compute values from state rather than storing redundant data. Never store both `items` and `totalPrice`.
- **Colocated Actions:** Keep state mutations next to the state definition, not scattered across components.
- **Optimistic Updates:** Update the store immediately for perceived speed, reconcile with server response.
