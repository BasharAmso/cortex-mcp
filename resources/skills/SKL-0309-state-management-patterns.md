---
id: SKL-0309
name: State Management Patterns
category: skills
tags: [state-management, zustand, redux, context-api, selectors, derived-state]
capabilities: [global-state-design, store-architecture, selector-optimization, state-synchronization]
useWhen:
  - choosing a state management approach for a React app
  - managing global state shared across multiple components
  - optimizing re-renders caused by state changes
  - implementing derived or computed state
  - migrating from one state management library to another
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0318, PAT-0161]
dependencies: []
synonyms: ["how to manage global state in React", "zustand vs redux vs context", "when to use global state", "how to avoid prop drilling", "how to structure a state store", "what is the best state management library"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/pmndrs/zustand"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Skill: State Management Patterns

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0309 |
| **Name** | State Management Patterns |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

State management is the most over-engineered part of most frontend apps. The goal is to pick the simplest approach that handles your actual complexity, not the complexity you imagine you might have.

### The State Placement Decision Tree

1. **Used by one component only?** — `useState` or `useReducer`. No library needed.
2. **Shared by parent and a few children?** — Lift state up or use composition (pass components as children).
3. **Shared across distant components?** — React Context for low-frequency updates (theme, auth, locale).
4. **Frequently updated global state?** — Use a dedicated store (Zustand, Jotai, Redux Toolkit).
5. **Server data (API responses)?** — Not state management. Use TanStack Query, SWR, or a data-fetching library.

### Zustand: The Modern Default

Zustand provides a minimal API with excellent TypeScript support and no boilerplate:

```typescript
import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  total: () => number;
}

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id)
  })),
  total: () => get().items.reduce((sum, i) => sum + i.price, 0),
}));
```

### Selector Pattern for Performance

Components should subscribe to the smallest slice of state they need. This prevents unnecessary re-renders:

```typescript
// Good: component only re-renders when item count changes
const count = useCartStore((state) => state.items.length);

// Bad: component re-renders on ANY store change
const store = useCartStore();
```

For derived values that are expensive to compute, use `useMemo` or a selector with shallow equality:

```typescript
import { shallow } from 'zustand/shallow';
const { items, total } = useCartStore(
  (state) => ({ items: state.items, total: state.total() }),
  shallow
);
```

### When Context API Is Enough

React Context works well for state that changes infrequently:

- **Theme** (light/dark) — changes once per session
- **Auth state** (logged in user) — changes on login/logout
- **Locale** — changes when user switches language
- **Feature flags** — set once on app load

Context triggers re-renders for ALL consumers when value changes. For frequently updating state (form inputs, animations, real-time data), use a dedicated store.

### Store Design Principles

1. **One store per domain**, not one mega-store. `useCartStore`, `useUserStore`, `useUIStore`.
2. **Colocate actions with state.** Actions live inside the store, not in separate files.
3. **Derive, don't duplicate.** Compute values from existing state instead of storing computed results.
4. **Keep stores flat.** Deeply nested state is harder to update and harder to select from.

## Anti-Patterns

- Using Redux for a todo app (massive overhead for simple state)
- Putting server cache (API responses) in global state instead of using a data-fetching library
- Storing derived values when they can be computed from existing state
- Creating a single monolithic store for the entire application
- Using Context for high-frequency updates like form inputs or animations

## Key Takeaways

- Start with `useState`; only reach for a library when you hit actual pain
- Zustand is the modern default for global state: minimal API, great TypeScript, no boilerplate
- Always use selectors to subscribe to the smallest slice of state needed
- Server data belongs in a data-fetching library, not your state store
- One store per domain keeps state organized and re-renders contained
