---
id: SKL-0049
name: Component Composition
category: skills
tags: [composition, components, slots, headless, patterns, react, inversion-of-control, radix, ariakit, compound]
capabilities: [slot-patterns, compound-components, headless-ui, children-composition, render-delegation]
useWhen:
  - building flexible components that work in many contexts
  - creating headless UI components with no built-in styles
  - designing a component API that gives consumers control
  - refactoring rigid components into composable pieces
  - wrapping Radix or Headless UI primitives
estimatedTokens: 600
relatedFragments: [SKL-0044, SKL-0005, SKL-0048, SKL-0020]
dependencies: []
synonyms: ["how do I make my component more flexible", "what is a headless component", "my component has too many props", "how to let users customize what renders inside", "building a reusable component that works everywhere"]
sourceUrl: "https://github.com/enaqx/awesome-react"
lastUpdated: "2026-03-29"
difficulty: advanced
---

# Component Composition

Build components that are flexible without being complex. The key principle: give consumers control over what renders, while the component manages behavior.

## Composition Strategies

| Strategy | Flexibility | Complexity | Ecosystem Example |
|----------|------------|------------|-------------------|
| `children` | Medium | Low | Every layout component |
| Named slots (props) | Medium | Low | Page headers, card layouts |
| Compound components | High | Medium | Radix UI, Headless UI |
| Headless (hook-based) | Maximum | Medium | Downshift, Ariakit, TanStack Table |
| Render props | High | Medium | React Router (legacy), Formik |

## Children Pattern

The simplest composition. The component is a container, the consumer provides content.

```tsx
<Card>
  <h2>Title</h2>
  <p>Any content works here.</p>
</Card>
```

**When to use:** Layout wrappers, modals, sidebars, any "box that holds stuff."

## Named Slots

When you need content in specific locations:

```tsx
<PageHeader
  title="Dashboard"
  action={<Button>Export</Button>}
  breadcrumbs={<Breadcrumbs items={crumbs} />}
/>
```

**Rule:** Keep slots to 3 or fewer. More than 3 means the component is doing too much.

## Compound Components

The pattern behind Radix UI and Headless UI. Components share implicit state through Context, and consumers compose them freely:

```tsx
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">Overview content</Tabs.Content>
  <Tabs.Content value="settings">Settings content</Tabs.Content>
</Tabs>
```

### Implementation Pattern

```tsx
const TabsContext = createContext<TabsState | null>(null);

function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.Trigger = function Trigger({ value, children }) {
  const { active, setActive } = useContext(TabsContext);
  return (
    <button role="tab" aria-selected={active === value}
      onClick={() => setActive(value)}>{children}</button>
  );
};
```

## Headless Pattern

Provide behavior via a hook. The consumer renders everything. Libraries like Downshift, Ariakit, and TanStack Table use this for maximum flexibility:

```tsx
const { isOpen, toggle, triggerProps, contentProps } = useDisclosure();

return (
  <>
    <button {...triggerProps}>Toggle FAQ</button>
    {isOpen && <div {...contentProps}>Answer content here.</div>}
  </>
);
```

## Inversion of Control Ladder

When a component becomes too rigid, climb one step at a time:

1. **Hardcoded.** Component renders fixed markup. (Least flexible)
2. **Configurable.** Props control which predefined options render.
3. **Composable.** `children` / slots let consumers provide content.
4. **Compound.** Sub-components share state through Context.
5. **Headless.** Hook provides behavior, consumer renders everything. (Most flexible)

**Do not jump to step 5.** Start at the lowest level that meets the requirement. Premature flexibility is as costly as premature optimization.

## Decision Guide

- **Under 3 variants?** Use props (`variant="primary"`).
- **Consumer needs to place things?** Use children or slots.
- **Multi-part UI with shared state?** Use compound components.
- **Completely different UIs need same behavior?** Go headless.
