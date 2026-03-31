---
id: PAT-0046
name: Vue Patterns
category: patterns
tags: [vue, vue3, composables, provide-inject, render-functions, slots, teleport, suspense]
capabilities: [vue-composables, provide-inject, advanced-slots, render-functions, async-components]
useWhen:
  - building reusable Vue composable libraries
  - implementing dependency injection with provide/inject
  - creating advanced slot patterns for flexible components
  - using render functions for dynamic component generation
  - handling async components with Suspense
estimatedTokens: 650
relatedFragments: [SKL-0114, SKL-0005, PAT-0006]
dependencies: []
synonyms: ["Vue advanced patterns", "provide inject Vue", "Vue slots tutorial", "Vue render functions", "Suspense in Vue", "Vue composable patterns"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/vuejs/core"
difficulty: advanced
owner: builder
pillar: "platform"
---

# Vue Patterns

Advanced composition and component patterns for Vue 3 applications. These patterns enable flexible, reusable component architectures beyond basic Composition API usage.

## Composable Design Rules

1. **Accept refs, return refs.** Input parameters should accept both raw values and refs (use `toValue()` internally). Return reactive refs so consumers can watch them.
2. **Handle cleanup.** Use `onUnmounted` or return a cleanup function for event listeners, timers, and subscriptions.
3. **Namespace with `use` prefix.** Every composable function starts with `use`: `useAuth`, `usePagination`, `useDebounce`.
4. **Keep composables focused.** One concern per composable. Compose multiple small composables rather than building large ones.

```typescript
// Composable that composes other composables
export function useUserDashboard(userId: MaybeRef<string>) {
  const { data: user, loading } = useFetch<User>(() => `/api/users/${toValue(userId)}`)
  const { items: activities } = usePagination<Activity>(() => `/api/users/${toValue(userId)}/activity`)
  return { user, loading, activities }
}
```

## Provide / Inject (Dependency Injection)

Share state and services across deeply nested components without prop drilling.

```typescript
// Parent provides
const theme = ref<Theme>({ mode: 'light', accent: 'blue' })
provide('theme', theme)

// Any descendant injects
const theme = inject<Ref<Theme>>('theme')
```

Use `InjectionKey<T>` for type-safe injection. Always provide a default value or throw a meaningful error when inject returns undefined. Provide at the app level for global services, at the layout level for scoped contexts.

## Slot Patterns

| Pattern | Use Case |
|---------|----------|
| Default slot | Single content area |
| Named slots | Multiple content areas (header, body, footer) |
| Scoped slots | Parent needs data from child to render content |
| Render-less components | Logic-only components that delegate all rendering to slots |

Scoped slots enable the "headless component" pattern: the component manages state and behavior, the parent controls rendering.

```vue
<!-- Renderless toggle component -->
<Toggle v-slot="{ isOn, toggle }">
  <button @click="toggle">{{ isOn ? 'ON' : 'OFF' }}</button>
</Toggle>
```

## Teleport

Render content in a different DOM location (modals, tooltips, toasts). The component stays in the Vue component tree for state and events, but the DOM output moves.

```vue
<Teleport to="body">
  <div v-if="showModal" class="modal-overlay">
    <ModalContent @close="showModal = false" />
  </div>
</Teleport>
```

## Suspense (Async Components)

Wrap async components or components with async `setup()` to show loading/fallback content.

```vue
<Suspense>
  <template #default>
    <AsyncDashboard />
  </template>
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
```

Pair with `defineAsyncComponent` for code-split routes. Handle errors with `onErrorCaptured` in the parent.

## Render Functions

Use when template syntax is too limiting: highly dynamic components, component wrappers, or library code.

```typescript
import { h } from 'vue'

export default {
  setup(props) {
    return () => h('div', { class: 'wrapper' }, [
      h(props.tag, { ...props.attrs }, props.children)
    ])
  }
}
```

Prefer templates for most components. Render functions trade readability for flexibility.
