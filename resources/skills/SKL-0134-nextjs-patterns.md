---
id: SKL-0134
name: Next.js App Router Patterns
category: skills
tags: [nextjs, react, app-router, server-components, client-components, layouts, route-handlers, middleware, data-fetching, caching, metadata]
capabilities: [server-rendering, client-interactivity, data-fetching, route-design, seo-metadata]
useWhen:
  - building a Next.js application with the App Router
  - deciding between server and client components
  - implementing layouts, loading states, or error boundaries
  - setting up data fetching with caching and revalidation
  - adding SEO metadata or Open Graph images
estimatedTokens: 700
relatedFragments: [SKL-0005, SKL-0006, PAT-0002]
dependencies: []
synonyms: ["nextjs app router", "next.js server components", "how to fetch data in next.js", "next.js layouts and pages", "react server components", "next.js best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/vercel/next.js"
difficulty: intermediate
owner: cortex
pillar: "platform"
---

# Next.js App Router Patterns

Server-first rendering with the App Router, covering components, data fetching, and file conventions.

## Server vs Client Components

Components are **server components by default**. They run on the server, can access databases directly, and send zero JavaScript to the client.

```tsx
// app/dashboard/page.tsx — Server Component (default)
export default async function Dashboard() {
  const data = await db.query("SELECT ...");
  return <DashboardView data={data} />;
}
```

Add `"use client"` only when you need browser APIs, event handlers, or state:

```tsx
"use client";
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Rule:** Push `"use client"` as far down the component tree as possible. Keep pages and layouts as server components.

## File Conventions

```
app/
  layout.tsx          # Root layout (wraps all pages, persists across navigation)
  page.tsx            # Home page (/)
  loading.tsx         # Instant loading UI (Suspense boundary)
  error.tsx           # Error boundary for the segment
  not-found.tsx       # 404 UI
  dashboard/
    layout.tsx        # Nested layout for /dashboard/*
    page.tsx          # /dashboard
    [id]/
      page.tsx        # /dashboard/:id (dynamic route)
  api/
    users/
      route.ts        # Route handler: GET/POST /api/users
```

Layouts persist state across navigation. Loading and error files create automatic Suspense and error boundaries.

## Data Fetching

Fetch data in server components using `async/await`. Next.js extends `fetch` with caching:

```tsx
// Cached by default — revalidate every 60 seconds
const data = await fetch("https://api.example.com/data", {
  next: { revalidate: 60 },
});
```

For on-demand revalidation, call `revalidatePath("/dashboard")` or `revalidateTag("posts")` from a Server Action.

## Route Handlers

```ts
// app/api/users/route.ts
export async function GET() {
  const users = await db.getUsers();
  return Response.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.createUser(body);
  return Response.json(user, { status: 201 });
}
```

## Middleware

```ts
// middleware.ts (project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.get("session")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = { matcher: ["/dashboard/:path*"] };
```

## Metadata API

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.coverImage] },
  };
}
```

Static metadata uses `export const metadata = { ... }`. Dynamic metadata uses `generateMetadata()`. Both are server-only and produce proper `<head>` tags.
