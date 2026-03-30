---
id: SKL-0044
name: React Component Patterns
category: skills
tags: [react, components, hooks, composition, patterns, frontend, architecture, error-boundaries, suspense, server-components]
capabilities: [component-design, hook-authoring, pattern-selection, code-organization, error-handling]
useWhen:
  - choosing between different React component patterns for a feature
  - building reusable components that other developers will consume
  - refactoring a component that has grown too complex
  - creating custom hooks to share logic between components
  - wrapping third-party components with error boundaries
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0049, SKL-0020, PAT-0002]
dependencies: []
synonyms: ["what React pattern should I use", "how do I split up a big React component", "when should I use a custom hook", "my component is getting too complex", "best way to structure React components"]
sourceUrl: "https://github.com/enaqx/awesome-react"
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# React Component Patterns

Choose the right component pattern for the job. Each pattern solves a specific problem. Using the wrong one creates unnecessary complexity.

## Pattern Selection Guide

| Pattern | Use When | Avoid When | Ecosystem Example |
|---------|----------|------------|-------------------|
| Custom Hook | Sharing stateful logic between components | Logic is only used once | `react-hook-form`, SWR |
| Compound Components | Multi-part UI with shared state (Tabs, Accordion) | Simple single-element components | Radix UI, Headless UI |
| Render Props | Consumer needs full control over rendering | A hook would be simpler | Downshift |
| Composition (`children`) | Flexible wrappers and layouts | Need to pass data down to children | Every layout component |
| Error Boundary | Catching render errors in a subtree | Handling async/event handler errors | `react-error-boundary` |
| Higher-Order Component | Cross-cutting concerns (auth, logging) | Almost always prefer hooks instead | Legacy codebases only |

## Custom Hook Pattern

Extract reusable logic into a `use`-prefixed function. This is the dominant React pattern.

```tsx
function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}
```

**Rules:** Always start with `use`. Follow Rules of Hooks (no conditionals). Return the minimal API the consumer needs.

## Compound Component Pattern

Components that share implicit state via Context. Libraries like Radix UI and Headless UI popularized this approach for accessible, unstyled primitives.

```tsx
<Select onChange={handleChange}>
  <Select.Trigger>Pick a fruit</Select.Trigger>
  <Select.Options>
    <Select.Option value="apple">Apple</Select.Option>
  </Select.Options>
</Select>
```

**When it shines:** Consumer can rearrange, omit, or wrap sub-components without breaking functionality.

## Error Boundary Pattern

Use `react-error-boundary` (the recommended library from the awesome-react ecosystem) instead of writing class components manually:

```tsx
<ErrorBoundary fallback={<p>Something went wrong.</p>}>
  <RiskyComponent />
</ErrorBoundary>
```

**Placement strategy:** Wrap route-level components and anything rendering API-driven or user-generated content. Never wrap the entire app in a single boundary.

## Decision Checklist

1. **Is the logic reusable?** Extract a custom hook.
2. **Is the component a multi-part UI?** Use compound components.
3. **Does the consumer need to control rendering?** Use render props or children.
4. **Could this component crash from bad data?** Wrap in an error boundary.
5. **Is it just layout flexibility?** Use composition with `children`.

## Anti-Patterns to Avoid

- **Prop drilling past 2 levels.** Use Context or composition instead.
- **God components** (300+ lines). Split into smaller focused components.
- **Premature abstraction.** Wait until you see duplication before extracting.
- **useEffect for derived state.** Use `useMemo` or compute during render.
- **Ignoring Suspense.** Use `React.lazy` + `<Suspense>` for code splitting with `loadable-components` for SSR support.
