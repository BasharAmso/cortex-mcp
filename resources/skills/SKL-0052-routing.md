---
id: SKL-0052
name: Client-Side Routing
category: skills
tags: [routing, nextjs, app-router, navigation, layouts, loading-states, dynamic-routes]
capabilities: [route-structure, dynamic-routing, layout-design, loading-states, parallel-routes, route-interception]
useWhen:
  - setting up page structure in a Next.js App Router project
  - implementing dynamic routes for content pages or dashboards
  - adding loading states and error boundaries to routes
  - building modal routes or parallel content panels
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0051, SKL-0047, PAT-0006]
dependencies: []
synonyms: ["how do I set up pages in Next.js", "my routing is getting complicated", "how to add a loading spinner between pages", "build a modal that has its own URL", "dynamic routes for blog posts or products"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Client-Side Routing

Structure your app's pages, layouts, and navigation using Next.js App Router conventions.

## File-Based Route Structure

Every folder inside `app/` becomes a URL segment. Special files control behavior:

| File | Purpose |
|------|---------|
| `page.tsx` | The UI for that route (required to make route accessible) |
| `layout.tsx` | Shared wrapper that persists across child navigations |
| `loading.tsx` | Loading UI shown while the page is fetching data |
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
    settings/
      page.tsx            # /dashboard/settings
    [projectId]/
      page.tsx            # /dashboard/abc123
      loading.tsx         # Spinner while project loads
      error.tsx           # Error boundary for project page
```

## Dynamic Routes

Use brackets for URL parameters:

| Pattern | Example URL | Access |
|---------|-------------|--------|
| `[slug]` | `/blog/my-post` | `params.slug` |
| `[...slug]` | `/docs/a/b/c` | `params.slug = ["a","b","c"]` |
| `[[...slug]]` | `/docs` or `/docs/a/b` | Optional catch-all |

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}
```

## Layouts

Layouts wrap child pages and persist across navigations. State and scroll position are preserved.

**Rules:**
1. Root layout is required and must render `<html>` and `<body>`.
2. Layouts do not re-render when navigating between child pages.
3. Put shared UI (nav, sidebar, footer) in the nearest common layout.
4. Do not fetch data in layouts that only some children need.

## Loading and Error States

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <Skeleton className="h-64 w-full" />;
}

// app/dashboard/error.tsx
"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

**Loading placement:** Put `loading.tsx` at the route level where the data fetch happens, not at the root. This keeps the rest of the page interactive while the slow part loads.

## Parallel Routes

Render multiple pages in the same layout simultaneously using `@folder` slots.

```
app/
  dashboard/
    layout.tsx           # Renders {children} and {analytics}
    page.tsx             # Main dashboard content
    @analytics/
      page.tsx           # Analytics panel rendered alongside
```

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

Show a route as a modal overlay while preserving the background page. The `(.)` convention intercepts same-level routes.

```
app/
  feed/
    page.tsx             # Photo feed
    (.)photo/[id]/       # Intercepts /photo/[id] as modal overlay
      page.tsx
  photo/[id]/
    page.tsx             # Full photo page (direct navigation)
```

**Use case:** Clicking a photo in a feed opens a modal. Sharing the URL loads the full page.

## Navigation Checklist

1. Use `<Link>` for all internal navigation (enables prefetching).
2. Active link styling via `usePathname()`.
3. Programmatic navigation via `useRouter().push()` for post-action redirects.
4. Scroll restoration works automatically with `<Link>`.
5. Prefetch critical routes with `<Link prefetch={true}>`.
