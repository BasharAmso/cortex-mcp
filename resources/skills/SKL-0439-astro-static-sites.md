---
id: SKL-0439
name: Astro Static Sites
category: skills
tags: [astro, static-site, islands-architecture, zero-js, content-collections, ssg, performance]
capabilities: [islands-architecture, zero-js-default, content-collection-management, multi-framework-support]
useWhen:
  - building a content-heavy static website
  - wanting zero JavaScript by default with selective interactivity
  - creating a blog or documentation site with content collections
  - mixing components from React, Vue, Svelte in one project
  - optimizing for maximum page performance
estimatedTokens: 650
relatedFragments: [SKL-0134, SKL-0440, SKL-0441]
dependencies: []
synonyms: ["astro static site generator", "astro islands architecture", "astro content collections", "zero javascript website", "astro blog setup", "how to build with astro"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/withastro/astro"
difficulty: beginner
owner: cortex
pillar: "platform"
---

# Astro Static Sites

Content-focused static sites with islands architecture — zero JavaScript by default, interactive only where needed.

## Islands Architecture

Astro renders everything to static HTML at build time. Interactive components are "islands" — isolated regions that hydrate independently. The rest of the page ships zero JavaScript.

```astro
---
// src/pages/index.astro — Server-side (runs at build time)
import Header from "../components/Header.astro";
import SearchWidget from "../components/SearchWidget.tsx";
---

<Header />
<main>
  <h1>Welcome</h1>
  <p>This is static HTML. No JavaScript shipped.</p>

  <!-- This React component hydrates on the client -->
  <SearchWidget client:visible />
</main>
```

Hydration directives control when islands load:
- `client:load` — hydrate immediately on page load
- `client:visible` — hydrate when the component scrolls into view
- `client:idle` — hydrate when the browser is idle
- `client:media="(max-width: 768px)"` — hydrate on media query match

## Astro Components

`.astro` files use a frontmatter fence for server logic and HTML-like template syntax:

```astro
---
const { title, items } = Astro.props;
const formatted = items.map(i => i.toUpperCase());
---

<section>
  <h2>{title}</h2>
  <ul>
    {formatted.map(item => <li>{item}</li>)}
  </ul>
</section>

<style>
  h2 { color: var(--accent); }
</style>
```

Styles are scoped by default. The frontmatter runs only at build time — no runtime cost.

## Content Collections

Type-safe content management for markdown, MDX, or JSON:

```ts
// src/content.config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map(post => ({ params: { slug: post.id }, props: { post } }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<Content />
```

## Multi-Framework Support

Use React, Vue, Svelte, Solid, or Preact components in the same project. Add integrations:

```bash
npx astro add react vue svelte
```

Each framework's components work as islands. Mix and match based on team expertise or library availability.

## Key Takeaways

- Astro ships zero JavaScript by default — add interactivity only where needed
- Use hydration directives (`client:visible`, `client:idle`) to control when islands load
- Content collections provide type-safe schema validation for markdown content
- Mix React, Vue, Svelte, and other framework components in one project
- Ideal for content-heavy sites: blogs, docs, marketing pages, portfolios
