---
id: SKL-0114
name: Vue 3 Composition API
category: skills
tags: [vue, vue3, composition-api, ref, reactive, composables, pinia, vue-router, typescript]
capabilities: [composition-api, vue-reactivity, composable-patterns, pinia-stores, vue-routing]
useWhen:
  - building Vue 3 components with the Composition API
  - creating reusable composables for shared logic
  - managing state with Pinia stores
  - implementing Vue Router with navigation guards
  - migrating from Options API to Composition API
estimatedTokens: 700
relatedFragments: [SKL-0005, PAT-0046, SKL-0006]
dependencies: []
synonyms: ["how to use Vue Composition API", "Vue 3 state management", "Pinia store setup", "Vue composables tutorial", "ref vs reactive in Vue", "Vue Router setup"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/vuejs/core"
difficulty: intermediate
owner: builder
pillar: "platform"
---

# Vue 3 Composition API

Build Vue applications with the Composition API using `<script setup>` for concise, type-safe components. Composition API replaces the Options API for better code organization, reuse, and TypeScript support.

## Reactivity Primitives

| API | Use For | Returns |
|-----|---------|---------|
| `ref()` | Primitive values, DOM refs | `Ref<T>` (access via `.value`) |
| `reactive()` | Objects/arrays (keeps structure) | Proxy (no `.value` needed) |
| `computed()` | Derived values | Read-only `Ref<T>` |
| `watch()` | Side effects on change | Stop handle |
| `watchEffect()` | Auto-tracked side effects | Stop handle |

Prefer `ref()` over `reactive()` as the default. It works with primitives and objects, avoids destructuring pitfalls, and makes reactivity explicit through `.value`.

## Component Pattern (`<script setup>`)

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ userId: string }>()
const emit = defineEmits<{ update: [name: string] }>()

const name = ref('')
const isValid = computed(() => name.value.length > 0)

function handleSubmit() {
  if (isValid.value) emit('update', name.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="name" />
    <button :disabled="!isValid">Save</button>
  </form>
</template>
```

## Composables (Reusable Logic)

Extract shared logic into composable functions. Name them `useXxx`. Return reactive refs and methods.

```typescript
// composables/useFetch.ts
export function useFetch<T>(url: MaybeRef<string>) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(true)

  watchEffect(async () => {
    loading.value = true
    try {
      const res = await fetch(toValue(url))
      data.value = await res.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}
```

## Pinia (State Management)

Pinia is the official Vue state manager. Define stores with the Composition API style:

```typescript
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => user.value !== null)

  async function login(credentials: Credentials) {
    user.value = await authApi.login(credentials)
  }

  return { user, isLoggedIn, login }
})
```

Access stores in components with `const auth = useAuthStore()`. Stores are reactive: template bindings auto-update.

## Vue Router

Use `createRouter` with `createWebHistory`. Define routes with lazy-loaded components. Use navigation guards for auth protection.

```typescript
const routes = [
  { path: '/', component: () => import('./pages/Home.vue') },
  { path: '/dashboard', component: () => import('./pages/Dashboard.vue'),
    meta: { requiresAuth: true } },
]
```

Apply `beforeEach` guards for route-level auth checks. Use `useRoute()` and `useRouter()` composables inside components.
