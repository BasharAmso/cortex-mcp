---
id: SKL-0051
name: State Management
category: skills
tags: [state, react, zustand, context, react-query, url-state, global-state]
capabilities: [state-architecture, context-design, store-setup, server-state-caching, url-state-sync]
useWhen:
  - deciding where to put state in a React application
  - choosing between React Context, Zustand, or other state libraries
  - managing server state with caching and revalidation
  - syncing UI state with URL parameters
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0044, SKL-0052, PAT-0002]
dependencies: []
synonyms: ["where should I put my state in React", "should I use Redux or something simpler", "how to share state between components", "my app is re-rendering too much", "how to cache API data in React"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# State Management

Put state in the right place. Most apps need less global state than you think.

## State Location Decision Tree

Ask these questions in order:

1. **Can it be derived from other state?** Do not store it. Compute it.
2. **Is it only used by one component?** Use `useState` in that component.
3. **Is it shared by a parent and its children?** Lift state to the nearest common parent.
4. **Is it server data (API responses)?** Use React Query or SWR, not global state.
5. **Should it survive page refresh?** Use URL params or localStorage.
6. **Is it truly app-wide (auth, theme, locale)?** Use Context or Zustand.

## State Categories

| Category | Examples | Solution |
|----------|----------|----------|
| **UI State** | Modal open, sidebar collapsed, active tab | `useState`, lift if shared |
| **Server State** | User profile, product list, notifications | React Query / SWR |
| **URL State** | Search query, filters, pagination, selected tab | `useSearchParams` / URL |
| **Form State** | Input values, validation errors, dirty fields | React Hook Form |
| **Global App State** | Auth user, theme, feature flags | Context or Zustand |

## React Context (Built-in)

Good for: values that change infrequently (theme, auth, locale).

```tsx
const ThemeContext = createContext<"light" | "dark">("light");

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

**Limitation:** Every consumer re-renders when the context value changes. Do not put frequently-changing state (mouse position, scroll offset) in Context.

## Zustand (Recommended for Global State)

Lightweight (1kb), no boilerplate, works outside React components.

```tsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));

// In any component:
const count = useStore((s) => s.count);
```

**Key advantage:** Selectors prevent unnecessary re-renders. Only components that read the changed slice re-render.

## Server State (React Query)

API data is not your state to manage. Let React Query handle caching, revalidation, and loading states.

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ["users", userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

**Rule:** If you are storing API responses in `useState` or Zustand and manually refetching, use React Query instead.

## URL State

State that should be shareable via link or survive page refresh.

```tsx
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get("q") ?? "";
const page = Number(searchParams.get("page") ?? "1");
```

**Good candidates:** search terms, filters, sort order, pagination, selected tab.

## Anti-Patterns

| Anti-Pattern | Fix |
|-------------|-----|
| All state in one global store | Colocate state with the component that uses it |
| Duplicating server data into local state | Use React Query |
| Context for frequently-changing values | Use Zustand with selectors |
| Prop drilling 5+ levels | Lift to Context or use composition |
| Syncing state between two sources | Pick one source of truth |
