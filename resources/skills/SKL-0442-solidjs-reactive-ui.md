---
id: SKL-0442
name: SolidJS Reactive UI
category: skills
tags: [solidjs, signals, fine-grained-reactivity, no-virtual-dom, performance, jsx, reactive]
capabilities: [signal-based-state, fine-grained-dom-updates, derived-computation, effect-management]
useWhen:
  - building high-performance UIs without virtual DOM overhead
  - wanting React-like JSX syntax with fine-grained reactivity
  - needing predictable reactive state management
  - optimizing for minimal re-renders in complex interfaces
  - evaluating SolidJS vs React for a new project
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0115, SKL-0114]
dependencies: []
synonyms: ["solidjs signals tutorial", "solidjs vs react", "fine grained reactivity framework", "solidjs state management", "no virtual dom framework", "how to use solidjs"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: cortex
pillar: "platform"
---

# SolidJS Reactive UI

Fine-grained reactive UI framework with signals, no virtual DOM, and JSX syntax familiar to React developers.

## Signals: Reactive Primitives

Signals are the core building block. Unlike React's `useState`, signals update only the specific DOM nodes that read them — no component re-renders:

```tsx
import { createSignal } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(0);

  // This console.log runs ONCE (component setup), not on every update
  console.log("Component created");

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count()}  {/* Only this text node updates */}
    </button>
  );
}
```

**Key difference from React:** Call signals as functions (`count()`) to read their value. The function call creates a reactive subscription at the point of use.

## Derived State and Effects

```tsx
import { createSignal, createMemo, createEffect } from "solid-js";

function PriceCalculator() {
  const [price, setPrice] = createSignal(100);
  const [quantity, setQuantity] = createSignal(1);

  // Memos cache derived values — recompute only when dependencies change
  const total = createMemo(() => price() * quantity());
  const tax = createMemo(() => total() * 0.08);

  // Effects run side effects when dependencies change
  createEffect(() => {
    console.log(`Total with tax: $${(total() + tax()).toFixed(2)}`);
  });

  return <span>Total: ${total()} + ${tax().toFixed(2)} tax</span>;
}
```

`createMemo` is for derived values (like computed properties). `createEffect` is for side effects (API calls, logging). Both automatically track their signal dependencies.

## Control Flow Components

Solid uses components for control flow instead of mapping arrays or ternary expressions. This enables fine-grained list updates:

```tsx
import { Show, For, Switch, Match } from "solid-js";

function UserList(props) {
  return (
    <Show when={props.users.length > 0} fallback={<p>No users</p>}>
      <ul>
        <For each={props.users}>
          {(user) => <li>{user.name}</li>}
        </For>
      </ul>
    </Show>
  );
}
```

`<For>` tracks items by reference and only updates changed items — no key prop needed. `<Show>` conditionally renders without re-creating DOM nodes when the condition toggles.

## Stores for Complex State

For nested reactive objects, use stores:

```tsx
import { createStore } from "solid-js/store";

const [state, setState] = createStore({
  user: { name: "Alice", preferences: { theme: "dark" } },
  items: [],
});

// Surgical update — only components reading theme re-render
setState("user", "preferences", "theme", "light");

// Array operations
setState("items", items => [...items, { id: 1, text: "New item" }]);
```

Stores provide path-based setters that update nested properties without replacing parent objects.

## Key Takeaways

- Signals update only the exact DOM nodes that read them — no virtual DOM diffing
- Component functions run once (setup), not on every state change like React
- Call signals as functions (`count()`) to read values and create subscriptions
- Use `<For>` and `<Show>` control flow components for efficient DOM updates
- Stores with path-based setters handle complex nested state efficiently
