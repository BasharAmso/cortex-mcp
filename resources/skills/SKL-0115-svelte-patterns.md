---
id: SKL-0115
name: SvelteKit Patterns
category: skills
tags: [svelte, sveltekit, runes, stores, reactivity, server-routes, form-actions, load-functions, ssr]
capabilities: [svelte-reactivity, sveltekit-routing, server-side-rendering, form-handling, store-patterns]
useWhen:
  - building SvelteKit pages and components
  - implementing reactivity with runes ($state, $derived, $effect)
  - creating server routes and form actions
  - managing shared state with Svelte stores
  - setting up SSR and data loading with load functions
estimatedTokens: 700
relatedFragments: [SKL-0005, PAT-0047, SKL-0006]
dependencies: []
synonyms: ["how to build with Svelte", "SvelteKit routing", "Svelte runes tutorial", "Svelte state management", "SvelteKit form actions", "Svelte reactivity"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/sveltejs/kit"
difficulty: intermediate
owner: builder
---

# SvelteKit Patterns

Build full-stack web apps with SvelteKit. Svelte compiles components at build time with no virtual DOM. SvelteKit adds routing, SSR, data loading, and form handling on top.

## Runes (Svelte 5)

Runes replace the `$:` reactive declaration and `let` exports with explicit reactivity primitives.

| Rune | Purpose | Replaces |
|------|---------|----------|
| `$state()` | Declare reactive state | `let x = 0` |
| `$derived()` | Computed values | `$: doubled = x * 2` |
| `$effect()` | Side effects on change | `$: { console.log(x) }` |
| `$props()` | Component props | `export let name` |
| `$bindable()` | Two-way bindable prop | `export let value` |

```svelte
<script>
  let count = $state(0)
  let doubled = $derived(count * 2)

  $effect(() => {
    console.log(`Count is now ${count}`)
  })
</script>

<button onclick={() => count++}>
  {count} (doubled: {doubled})
</button>
```

## SvelteKit Routing

File-based routing in `src/routes/`. Each directory is a route segment. Special files:

| File | Purpose |
|------|---------|
| `+page.svelte` | Page component |
| `+page.ts` | Client/universal load function |
| `+page.server.ts` | Server-only load function |
| `+layout.svelte` | Shared layout wrapper |
| `+server.ts` | API endpoint (GET, POST, etc.) |
| `+error.svelte` | Error boundary |

Dynamic routes use `[param]` syntax: `src/routes/user/[id]/+page.svelte`.

## Load Functions

Load functions fetch data before rendering. Return data as plain objects; SvelteKit makes them available as `$page.data` or the `data` prop.

```typescript
// +page.server.ts
export async function load({ params, locals }) {
  const user = await db.users.findById(params.id)
  if (!user) throw error(404, 'User not found')
  return { user }
}
```

Use `+page.server.ts` for server-only data (DB queries, secrets). Use `+page.ts` for universal data that can run client-side on navigation.

## Form Actions

Handle form submissions server-side without client JavaScript. Define actions in `+page.server.ts`:

```typescript
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const email = data.get('email')
    // validate, save to DB
    return { success: true }
  }
}
```

Use `enhance` from `$app/forms` for progressive enhancement: the form works without JS but upgrades to AJAX when JS is available.

## Stores (Shared State)

Use Svelte stores for state shared across components:

```typescript
import { writable, derived } from 'svelte/store'

export const cart = writable<CartItem[]>([])
export const total = derived(cart, $cart =>
  $cart.reduce((sum, item) => sum + item.price, 0)
)
```

In Svelte 5, prefer `$state` in `.svelte.ts` files for module-level shared state. Stores remain useful for library compatibility and complex pub-sub patterns.

## Anti-Patterns

- Overusing `$effect` for derived values (use `$derived` instead).
- Putting business logic in `+page.svelte` instead of load functions or server routes.
- Skipping form actions in favor of client-only fetch calls (loses progressive enhancement).
