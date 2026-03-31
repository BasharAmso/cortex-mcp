---
id: SKL-0052
name: State Management
category: skills
tags: [state, react, zustand, context, react-query, url-state, global-state, jotai, xstate, swr]
capabilities: [state-architecture, context-design, store-setup, server-state-caching, url-state-sync]
useWhen:
  - deciding where to put state in a React application
  - choosing between React Context, Zustand, or other state libraries
  - managing server state with caching and revalidation
  - syncing UI state with URL parameters
  - diagnosing excessive re-renders from state changes
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0045, SKL-0053, PAT-0002]
dependencies: []
synonyms: ["where should I put my state in React", "should I use Redux or something simpler", "how to share state between components", "my app is re-rendering too much", "how to cache API data in React"]
sourceUrl: "https://github.com/enaqx/awesome-react"
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
pillar: "frontend"
---

# State Management

Put state in the right place. Most apps need less global state than you think.

## State Location Decision Tree

Ask these questions in order:

1. **Can it be derived from other state?** Do not store it. Compute it.
2. **Is it only used by one component?** Use `useState` in that component.
3. **Is it shared by a parent and its children?** Lift state to the nearest common parent.
4. **Is it server data (API responses)?** Use TanStack Query or SWR, not global state.
5. **Should it survive page refresh?** Use URL params or localStorage.
6. **Is it truly app-wide (auth, theme, locale)?** Use Context or Zustand.

## State Categories and Solutions

| Category | Examples | Solution |
|----------|----------|----------|
| **UI State** | Modal open, sidebar collapsed, active tab | `useState`, lift if shared |
| **Server State** | User profile, product list, notifications | TanStack Query / SWR |
| **URL State** | Search query, filters, pagination | `useSearchParams` / URL |
| **Form State** | Input values, validation errors | React Hook Form |
| **Global App State** | Auth user, theme, feature flags | Context or Zustand |
| **Complex Workflows** | Multi-step processes, async flows | XState (state machines) |

## Library Comparison

| Library | Philosophy | Size | Best For |
|---------|-----------|------|----------|
| **Zustand** | Minimal API, selectors | ~1kb | General global state (recommended default) |
| **Jotai** | Atomic model (bottom-up) | ~3kb | Fine-grained reactivity, many independent atoms |
| **XState** | Finite state machines | ~12kb | Complex workflows with explicit transitions |
| **Redux Toolkit** | Flux architecture, middleware | ~11kb | Large teams with existing Redux patterns |
| **MobX** | Observable, mutable style | ~16kb | Teams preferring OOP patterns |

## Zustand (Recommended for Global State)

Lightweight, no boilerplate, works outside React components:

```tsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));

// Selectors prevent unnecessary re-renders
const count = useStore((s) => s.count);
```

## Server State (TanStack Query)

API data is not your state to manage. Let the library handle caching, revalidation, and loading:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ["users", userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000,
});
```

**Rule:** If you are storing API responses in `useState` or Zustand and manually refetching, use TanStack Query instead.

## Anti-Patterns

| Anti-Pattern | Fix |
|-------------|-----|
| All state in one global store | Colocate state with the component that uses it |
| Duplicating server data into local state | Use TanStack Query / SWR |
| Context for frequently-changing values | Use Zustand with selectors |
| Prop drilling 5+ levels | Lift to Context or use composition |
| Syncing state between two sources | Pick one source of truth |
