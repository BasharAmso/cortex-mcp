---
id: SKL-0440
name: Remix Full-Stack
category: skills
tags: [remix, react, full-stack, loaders, actions, nested-routes, progressive-enhancement, web-standards]
capabilities: [server-data-loading, form-mutations, nested-routing, progressive-enhancement]
useWhen:
  - building a full-stack React application with Remix
  - implementing server-side data loading and form mutations
  - designing nested route layouts with parallel data fetching
  - wanting progressive enhancement where forms work without JavaScript
  - choosing between Remix and Next.js for a React project
estimatedTokens: 670
relatedFragments: [SKL-0134, SKL-0005, SKL-0006]
dependencies: []
synonyms: ["remix loaders and actions", "remix full stack react", "remix nested routes", "remix progressive enhancement", "remix vs next.js", "how to build with remix"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/remix-run/remix"
difficulty: intermediate
owner: cortex
pillar: "platform"
---

# Remix Full-Stack

Full-stack React with loaders, actions, and nested routes — built on web standards with progressive enhancement.

## Loaders: Server-Side Data

Every route can export a `loader` that runs on the server before rendering. The component accesses the data via `useLoaderData`:

```tsx
// app/routes/dashboard.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }) {
  const user = await getUser(request);
  const projects = await db.project.findMany({ where: { userId: user.id } });
  return json({ user, projects });
}

export default function Dashboard() {
  const { user, projects } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {projects.map(p => <ProjectCard key={p.id} project={p} />)}
    </div>
  );
}
```

Loaders run in parallel for nested routes — parent and child loaders fetch simultaneously, eliminating request waterfalls.

## Actions: Form Mutations

Handle form submissions server-side with `action` exports. Remix revalidates all loaders after a successful action:

```tsx
export async function action({ request }) {
  const form = await request.formData();
  const title = form.get("title");

  if (!title) return json({ error: "Title required" }, { status: 400 });

  await db.project.create({ data: { title } });
  return redirect("/dashboard");
}

export default function NewProject() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <input name="title" />
      {actionData?.error && <p className="error">{actionData.error}</p>}
      <button type="submit">Create</button>
    </Form>
  );
}
```

Use Remix's `<Form>` component instead of `<form>`. It works identically without JavaScript but progressively enhances with client-side navigation when JS is available.

## Nested Routes

File-based routing with layout nesting. Parent routes wrap children via `<Outlet>`:

```
app/routes/
  _index.tsx           → /
  dashboard.tsx        → /dashboard (layout)
  dashboard._index.tsx → /dashboard (index content)
  dashboard.$id.tsx    → /dashboard/:id
  dashboard.new.tsx    → /dashboard/new
```

```tsx
// app/routes/dashboard.tsx — Layout route
export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main><Outlet /></main>
    </div>
  );
}
```

Each nested route has its own loader, action, and error boundary. Errors in a child route don't break the parent layout.

## Error Boundaries

Export `ErrorBoundary` from any route for granular error handling:

```tsx
export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div>{error.status}: {error.data}</div>;
  }
  return <div>Something went wrong</div>;
}
```

## Key Takeaways

- Loaders fetch data server-side; actions handle mutations — both per-route
- Nested route loaders run in parallel, eliminating client-side fetch waterfalls
- `<Form>` works without JavaScript and progressively enhances with it
- Each route has independent error boundaries — child errors don't crash the layout
- Remix revalidates all active loaders after any action completes
