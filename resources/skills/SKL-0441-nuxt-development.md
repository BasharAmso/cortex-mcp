---
id: SKL-0441
name: Nuxt.js Development
category: skills
tags: [nuxt, vue, full-stack, auto-imports, server-routes, hybrid-rendering, modules, ssr]
capabilities: [auto-import-system, server-route-creation, hybrid-rendering-modes, module-integration]
useWhen:
  - building a full-stack Vue application with Nuxt
  - setting up server routes and API endpoints in Nuxt
  - choosing between SSR, SSG, and hybrid rendering
  - leveraging auto-imports for composables and components
  - extending Nuxt functionality with modules
estimatedTokens: 660
relatedFragments: [SKL-0114, SKL-0134, SKL-0440]
dependencies: []
synonyms: ["nuxt 3 development guide", "nuxt server routes api", "nuxt auto imports", "nuxt hybrid rendering", "vue full stack framework", "how to build with nuxt"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/nuxt/nuxt"
difficulty: intermediate
owner: cortex
pillar: "platform"
---

# Nuxt.js Development

Full-stack Vue framework with auto-imports, server routes, hybrid rendering, and a rich module ecosystem.

## Auto-Imports

Nuxt automatically imports Vue APIs, composables, and components. No manual import statements needed:

```vue
<!-- pages/index.vue — ref, computed, useFetch are auto-imported -->
<script setup>
const count = ref(0);
const doubled = computed(() => count.value * 2);
const { data: posts } = await useFetch("/api/posts");
</script>
```

Custom composables in `composables/` and components in `components/` are also auto-imported. The auto-import system is tree-shaken — unused imports don't increase bundle size.

## File-Based Routing

Pages in `pages/` become routes automatically:

```
pages/
  index.vue          → /
  about.vue          → /about
  blog/
    index.vue        → /blog
    [slug].vue       → /blog/:slug
  users/
    [[id]].vue       → /users/:id? (optional param)
```

Use `<NuxtLink>` for client-side navigation and `definePageMeta()` for route-level middleware, layout assignment, or transitions.

## Server Routes

Create API endpoints in `server/api/` and `server/routes/`:

```ts
// server/api/posts.get.ts
export default defineEventHandler(async (event) => {
  const posts = await db.post.findMany();
  return posts;
});

// server/api/posts.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const post = await db.post.create({ data: body });
  return post;
});
```

File naming convention: `name.method.ts` maps HTTP methods. Server routes run on Nitro, which deploys to Node, Deno, Cloudflare Workers, Vercel, or any serverless platform.

## Hybrid Rendering

Configure rendering per route in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  routeRules: {
    "/":          { prerender: true },         // Static at build time
    "/blog/**":   { swr: 3600 },               // Stale-while-revalidate (1hr)
    "/dashboard": { ssr: false },               // Client-side only (SPA)
    "/api/**":    { cors: true, cache: false }, // API routes
  },
});
```

This lets you mix static, server-rendered, and client-only pages in one application. Each route gets the optimal rendering strategy for its content type.

## Modules

Extend Nuxt with pre-built modules:

```ts
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/content",
    "@nuxt/image",
  ],
});
```

`@nuxt/content` adds a file-based CMS (Markdown, YAML, JSON). `@nuxt/image` provides automatic image optimization. The module ecosystem covers auth, SEO, i18n, and most common needs.

## Key Takeaways

- Auto-imports eliminate boilerplate for Vue APIs, composables, and components
- Server routes in `server/api/` deploy to any serverless platform via Nitro
- Hybrid rendering lets you mix SSR, SSG, SWR, and SPA modes per route
- File naming convention (`name.method.ts`) maps HTTP methods to server handlers
- The module ecosystem covers most common needs without custom configuration
