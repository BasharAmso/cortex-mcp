---
id: PAT-0047
name: Svelte Patterns
category: patterns
tags: [svelte, sveltekit, stores, context, actions, transitions, derived-stores, routing]
capabilities: [store-patterns, context-api, svelte-actions, transition-system, sveltekit-routing]
useWhen:
  - designing shared state architecture for a Svelte app
  - implementing custom store patterns or derived stores
  - creating reusable DOM actions for Svelte components
  - adding transitions and animations to Svelte elements
  - structuring SvelteKit routes with layouts and groups
estimatedTokens: 650
relatedFragments: [SKL-0115, SKL-0005, PAT-0006]
dependencies: []
synonyms: ["Svelte store patterns", "Svelte context API", "Svelte actions tutorial", "SvelteKit routing patterns", "Svelte transitions", "derived stores Svelte"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/sveltejs/kit"
difficulty: advanced
owner: builder
pillar: "platform"
---

# Svelte Patterns

Advanced patterns for Svelte and SvelteKit applications covering state management, DOM manipulation, animations, and routing architecture.

## Store Patterns

### Custom Stores

Wrap `writable` to create domain-specific stores with controlled mutations.

```typescript
function createCartStore() {
  const { subscribe, update } = writable<CartItem[]>([])

  return {
    subscribe,
    addItem: (item: CartItem) => update(items => [...items, item]),
    removeItem: (id: string) => update(items => items.filter(i => i.id !== id)),
    clear: () => update(() => []),
  }
}

export const cart = createCartStore()
```

This pattern hides the `set` method, exposing only intentional mutations.

### Derived Stores

Compute values from one or more stores. Re-evaluate automatically when source stores change.

```typescript
export const cartTotal = derived(cart, $cart =>
  $cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

// Derive from multiple stores
export const orderSummary = derived([cart, shipping], ([$cart, $shipping]) => ({
  items: $cart.length,
  subtotal: $cart.reduce((s, i) => s + i.price, 0),
  shipping: $shipping.cost,
}))
```

## Context API

Share data within a component subtree without stores. Context is set during component initialization and available to all descendants.

```svelte
<!-- Parent.svelte -->
<script>
  import { setContext } from 'svelte'
  setContext('theme', { mode: 'dark', accent: '#3b82f6' })
</script>

<!-- DeepChild.svelte -->
<script>
  import { getContext } from 'svelte'
  const theme = getContext('theme')
</script>
```

Use context for component library configuration, form group state, or layout-scoped settings. Unlike stores, context is not reactive by default. Pass a store or `$state` rune as context value for reactivity.

## Actions (DOM Directives)

Actions attach behavior to DOM elements. They run when the element mounts and clean up when it unmounts.

```typescript
export function clickOutside(node: HTMLElement, callback: () => void) {
  function handleClick(event: MouseEvent) {
    if (!node.contains(event.target as Node)) callback()
  }
  document.addEventListener('click', handleClick, true)
  return {
    destroy() { document.removeEventListener('click', handleClick, true) }
  }
}
```

```svelte
<div use:clickOutside={() => showMenu = false}>
  <DropdownMenu />
</div>
```

Common action use cases: tooltips, focus traps, intersection observers, drag-and-drop, copy-to-clipboard.

## Transitions

Built-in transition directives animate elements entering and leaving the DOM.

| Directive | Behavior |
|-----------|----------|
| `transition:fade` | Fade in/out |
| `in:fly={{ y: 20 }}` | Fly in from offset |
| `out:slide` | Slide out |
| `animate:flip` | Animate layout changes in keyed each blocks |

Create custom transitions by returning a function with `duration`, `css`, or `tick` properties. Respect `prefers-reduced-motion` by checking the media query.

## SvelteKit Routing Architecture

### Route Groups

Group routes without adding URL segments using `(group)` syntax:

```
src/routes/
  (auth)/
    login/+page.svelte
    register/+page.svelte
    +layout.svelte        # shared auth layout
  (app)/
    dashboard/+page.svelte
    settings/+page.svelte
    +layout.svelte        # shared app layout (with nav)
```

### Layout Hierarchy

Layouts nest automatically. Use `+layout.server.ts` to load shared data (auth state, user profile) for all child routes. Use `@` to break out of layout inheritance: `+page@.svelte` resets to the root layout.

### Hooks

Use `hooks.server.ts` for middleware-like behavior: authentication, logging, rate limiting. The `handle` function runs on every server request.

```typescript
export async function handle({ event, resolve }) {
  event.locals.user = await getUserFromSession(event.cookies)
  return resolve(event)
}
```
