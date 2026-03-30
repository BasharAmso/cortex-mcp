---
id: SKL-0044
name: React Component Patterns
category: skills
tags: [react, components, hooks, composition, patterns, frontend, architecture]
capabilities: [component-design, hook-authoring, pattern-selection, code-organization, error-handling]
useWhen:
  - choosing between different React component patterns for a feature
  - building reusable components that other developers will consume
  - refactoring a component that has grown too complex
  - creating custom hooks to share logic between components
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0049, SKL-0020, PAT-0002]
dependencies: []
synonyms: ["what React pattern should I use", "how do I split up a big React component", "when should I use a custom hook", "my component is getting too complex", "best way to structure React components"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# React Component Patterns

Choose the right component pattern for the job. Each pattern solves a specific problem. Using the wrong one creates unnecessary complexity.

## Pattern Selection Guide

| Pattern | Use When | Avoid When |
|---------|----------|------------|
| Custom Hook | Sharing stateful logic between components | Logic is only used once |
| Compound Components | Building a multi-part UI with shared state (Tabs, Accordion) | Simple single-element components |
| Render Props | Consumer needs full control over what renders | A hook would be simpler |
| Composition (children) | Building flexible wrappers and layouts | You need to pass data down to children |
| Error Boundary | Catching render errors without crashing the whole app | Handling async/event errors |
| Higher-Order Component | Adding cross-cutting concerns (auth, logging) | Almost always prefer hooks instead |

## Custom Hook Pattern

Extract reusable logic into a `use`-prefixed function. This is the most common pattern.

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

**Rules:** Always start with `use`. Always follow the Rules of Hooks (no conditionals). Return the minimal API the consumer needs.

## Compound Component Pattern

Components that work together sharing implicit state via Context.

```tsx
<Select onChange={handleChange}>
  <Select.Trigger>Pick a fruit</Select.Trigger>
  <Select.Options>
    <Select.Option value="apple">Apple</Select.Option>
    <Select.Option value="banana">Banana</Select.Option>
  </Select.Options>
</Select>
```

**When it shines:** The consumer can rearrange, omit, or wrap sub-components without breaking functionality.

## Error Boundary Pattern

Class component that catches render errors in its subtree.

```tsx
<ErrorBoundary fallback={<p>Something went wrong.</p>}>
  <RiskyComponent />
</ErrorBoundary>
```

**Placement strategy:** Wrap route-level components and any component that renders user-generated or API-driven content. Do not wrap the entire app in one boundary.

## Decision Checklist

1. **Is the logic reusable?** Extract a custom hook.
2. **Is the component a multi-part UI?** Use compound components.
3. **Does the consumer need to control rendering?** Use render props or children.
4. **Could this component crash from bad data?** Wrap in an error boundary.
5. **Is it just layout flexibility?** Use composition with `children`.

## Anti-Patterns to Avoid

- **Prop drilling past 2 levels** -- use Context or composition instead.
- **God components** (300+ lines) -- split into smaller focused components.
- **Premature abstraction** -- wait until you see duplication before extracting.
- **useEffect for derived state** -- use `useMemo` or compute during render.
