---
id: SKL-0053
name: Client-Side Routing
category: skills
tags: [routing, nextjs, app-router, navigation, layouts, loading-states, dynamic-routes, react-router, tanstack-router]
capabilities: [route-structure, dynamic-routing, layout-design, loading-states, parallel-routes, route-interception]
useWhen:
  - setting up page structure in a Next.js App Router project
  - implementing dynamic routes for content pages or dashboards
  - adding loading states and error boundaries to routes
  - building modal routes or parallel content panels
  - choosing between routing solutions for a React project
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0052, SKL-0048, PAT-0006]
dependencies: []
synonyms: ["how do I set up pages in Next.js", "my routing is getting complicated", "how to add a loading spinner between pages", "build a modal that has its own URL", "dynamic routes for blog posts or products"]
sourceUrl: "https://github.com/enaqx/awesome-react"
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
pillar: "frontend"
---

# Client-Side Routing

Structure your app's pages, layouts, and navigation. The React ecosystem offers three major routing solutions.

## Router Selection

| Router | Best For | Key Feature |
|--------|----------|-------------|
| **Next.js App Router** | Full-stack React apps, SSR/SSG | File-based routing, server components, streaming |
| **React Router** | SPAs, Remix apps | Declarative routing, loaders, actions |
| **TanStack Router** | Type-safe SPAs | Full type safety, built-in search params, caching |

**Default for new projects:** Next.js App Router for full-stack, TanStack Router for pure SPAs.

## Next.js File-Based Route Structure

Every folder inside `app/` becomes a URL segment. Special files control behavior:

| File | Purpose |
|------|---------|
| `page.tsx` | The UI for that route (required) |
| `layout.tsx` | Shared wrapper that persists across child navigations |
| `loading.tsx` | Loading UI shown while the page fetches data |
| `error.tsx` | Error boundary for that route segment |
| `not-found.tsx` | 404 UI for that segment |
| `template.tsx` | Like layout but remounts on navigation (for animations) |

### Example Structure

```
app/
  layout.tsx              # Root layout (html, body, nav)
  page.tsx                # Home page (/)
  dashboard/
    layout.tsx            # Dashboard shell (sidebar, header)
    page.tsx              # /dashboard
    [projectId]/
      page.tsx            # /dashboard/abc123
      loading.tsx         # Spinner while project loads
      error.tsx           # Error boundary for project page
```

## Dynamic Routes

| Pattern | Example URL | Access |
|---------|-------------|--------|
| `[slug]` | `/blog/my-post` | `params.slug` |
| `[...slug]` | `/docs/a/b/c` | `params.slug = ["a","b","c"]` |
| `[[...slug]]` | `/docs` or `/docs/a/b` | Optional catch-all |

## Layouts

Layouts wrap child pages and persist across navigations. State and scroll position are preserved.

1. Root layout is required and must render `<html>` and `<body>`.
2. Layouts do not re-render when navigating between child pages.
3. Put shared UI (nav, sidebar, footer) in the nearest common layout.
4. Do not fetch data in layouts that only some children need.

## Parallel Routes

Render multiple pages in the same layout using `@folder` slots:

```tsx
// dashboard/layout.tsx
export default function Layout({ children, analytics }) {
  return (
    <div className="grid grid-cols-3">
      <main className="col-span-2">{children}</main>
      <aside>{analytics}</aside>
    </div>
  );
}
```

## Intercepting Routes

Show a route as a modal overlay while preserving the background page. The `(.)` convention intercepts same-level routes. Use case: clicking a photo in a feed opens a modal; sharing the URL loads the full page.

## Navigation Checklist

1. Use `<Link>` for all internal navigation (enables prefetching).
2. Active link styling via `usePathname()`.
3. Programmatic navigation via `useRouter().push()` for post-action redirects.
4. Scroll restoration works automatically with `<Link>`.
5. Prefetch critical routes with `<Link prefetch={true}>`.
