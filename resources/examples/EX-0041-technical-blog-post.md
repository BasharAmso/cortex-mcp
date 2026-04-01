---
id: EX-0041
name: Technical Blog Post Generator
category: examples
tags: [blog, technical-writing, seo, markdown, content, outline, developer, reading-time]
capabilities: [outline-generation, reading-time-calculation, seo-metadata, structured-content]
useWhen:
  - generating structured technical blog posts with code samples
  - building a developer blog with SEO metadata
  - calculating reading time and generating outlines from content
estimatedTokens: 620
relatedFragments: [SKL-0138, PAT-0204, PAT-0205]
dependencies: []
synonyms: ["dev blog generator", "technical article builder", "blog post scaffolder", "developer content tool", "markdown blog engine"]
sourceUrl: "https://github.com/hashicorp/next-mdx-remote"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "developer-growth"
---

# Technical Blog Post Generator

Structured technical writing engine with outline generation, code samples, reading time, and SEO metadata.

## Implementation

```typescript
// --- Types ---
interface BlogPost {
  title: string;
  slug: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  outline: OutlineSection[];
  content: string;
  seo: SEOMetadata;
  readingTime: ReadingTime;
}

interface OutlineSection {
  heading: string;
  level: number;
  subsections: OutlineSection[];
  hasCode: boolean;
}

interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  keywords: string[];
  structuredData: Record<string, unknown>;
}

interface ReadingTime {
  minutes: number;
  words: number;
  codeBlocks: number;
}

// --- Slug Generator ---
function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// --- Reading Time Calculator ---
function calculateReadingTime(content: string): ReadingTime {
  const codeBlockRegex = /```[\s\S]*?```/g;
  const codeBlocks = content.match(codeBlockRegex) ?? [];
  const textOnly = content.replace(codeBlockRegex, '');
  const words = textOnly.split(/\s+/).filter(Boolean).length;
  const codeWords = codeBlocks.join(' ').split(/\s+/).filter(Boolean).length;

  // 238 wpm for prose, 100 wpm for code (slower reading)
  const minutes = Math.ceil(words / 238 + codeWords / 100);
  return { minutes, words: words + codeWords, codeBlocks: codeBlocks.length };
}

// --- Outline Extractor ---
function extractOutline(markdown: string): OutlineSection[] {
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const sections: OutlineSection[] = [];
  const stack: OutlineSection[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const heading = match[2];
    const nextHeading = markdown.indexOf('\n#', match.index + 1);
    const sectionContent = markdown.slice(match.index, nextHeading === -1 ? undefined : nextHeading);
    const hasCode = sectionContent.includes('```');

    const section: OutlineSection = { heading, level, subsections: [], hasCode };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      sections.push(section);
    } else {
      stack[stack.length - 1].subsections.push(section);
    }
    stack.push(section);
  }
  return sections;
}

// --- SEO Metadata Builder ---
function buildSEO(post: { title: string; slug: string; tags: string[]; content: string }, baseUrl: string): SEOMetadata {
  const description = post.content
    .replace(/^#.*$/gm, '').replace(/```[\s\S]*?```/g, '')
    .replace(/\s+/g, ' ').trim().slice(0, 155) + '...';

  return {
    title: `${post.title} | Dev Blog`,
    description,
    canonical: `${baseUrl}/blog/${post.slug}`,
    ogImage: `${baseUrl}/og/${post.slug}.png`,
    keywords: post.tags,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: post.title,
      url: `${baseUrl}/blog/${post.slug}`,
      keywords: post.tags.join(', '),
    },
  };
}

// --- Compose Blog Post ---
function createBlogPost(title: string, author: string, content: string, tags: string[], baseUrl: string): BlogPost {
  const slug = toSlug(title);
  return {
    title, slug, author,
    publishedAt: new Date(),
    tags,
    outline: extractOutline(content),
    content,
    seo: buildSEO({ title, slug, tags, content }, baseUrl),
    readingTime: calculateReadingTime(content),
  };
}
```

## Key Patterns

- **Reading time**: prose at 238 wpm, code at 100 wpm for realistic estimates
- **Outline extraction**: parses markdown headings into a nested tree with code-block detection
- **SEO metadata**: auto-generates description, canonical URL, Open Graph image, and JSON-LD structured data
- **Slug generation**: deterministic URL-safe slugs from titles
