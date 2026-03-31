---
id: SKL-0254
name: Book Writing
category: skills
tags: [book-writing, non-fiction, manuscript, publishing, self-publishing, book-marketing]
capabilities: [manuscript-structuring, publishing-path-selection, book-marketing-planning, writing-workflow-design]
useWhen:
  - planning and outlining a non-fiction book
  - choosing between traditional publishing and self-publishing
  - setting up a writing workflow and manuscript toolchain
  - marketing a book before and after launch
  - converting existing content (blog posts, talks) into a book
estimatedTokens: 650
relatedFragments: [SKL-0253, SKL-0251, PAT-0130]
dependencies: []
synonyms: ["how do I write a book", "how to outline a non-fiction book", "self-publishing vs traditional publishing", "how to structure a book manuscript", "how to market a book", "how to turn blog posts into a book"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/jgm/pandoc"
difficulty: advanced
owner: "cortex"
pillar: "personal-brand"
---

# Skill: Book Writing

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0254 |
| **Name** | Book Writing |
| **Category** | Skills |
| **Complexity** | Advanced |

## Core Concepts

Pandoc's design philosophy maps directly to book writing: write in one format, output to many. Pandoc converts Markdown into EPUB, PDF, DOCX, and HTML through an abstract syntax tree. Your book should work the same way. Write the content once in a clean, structured format, then let tools handle the conversion to different publishing outputs.

### Non-Fiction Book Structure

The standard non-fiction structure that works across business, self-help, and technical books:

1. **Hook** (Introduction) — State the problem your reader has. Prove you understand their pain. Promise a specific transformation by the end.
2. **Foundation** (Chapters 1-3) — Define key concepts, share your origin story, and establish credibility. The reader needs to trust you before they will follow your advice.
3. **Framework** (Chapters 4-8) — Your core methodology in sequential steps. Each chapter teaches one step with examples, case studies, and exercises. This is the meat.
4. **Application** (Chapters 9-10) — How to apply the framework in different contexts. Common pitfalls and how to avoid them.
5. **Launch** (Conclusion) — Summarize the transformation, give a clear next step, point to additional resources (your course, community, coaching).

Target 40,000-60,000 words for a standard non-fiction book. Each chapter should be 3,000-5,000 words.

### Publishing Path Comparison

| Factor | Traditional Publisher | Self-Publishing | Hybrid Press |
|--------|----------------------|-----------------|--------------|
| **Advance** | $5K-50K typical | None | You pay $3K-15K |
| **Royalty** | 10-15% of net | 35-70% of list price | Varies widely |
| **Timeline** | 18-24 months | 3-6 months | 6-12 months |
| **Control** | Low (title, cover, price) | Full | Medium |
| **Credibility** | Highest | Growing | Mixed reputation |
| **Distribution** | Bookstores + online | Primarily online | Online + some stores |

For personal brand building, self-publishing wins on speed and control. Traditional publishing wins on credibility and reach. Write the proposal either way; the discipline of a book proposal clarifies your thinking.

### Writing Workflow

Pandoc enables a powerful manuscript workflow: write chapters as individual Markdown files, then compile into any format.

```
book/
  chapters/
    01-introduction.md
    02-foundation.md
    ...
  images/
  metadata.yaml
  Makefile          # pandoc commands for epub, pdf, docx
```

Write in Markdown or plain text. Avoid Word until the final formatting stage. Pandoc handles the conversion: `pandoc chapters/*.md -o book.epub --metadata-file=metadata.yaml`.

### Book Marketing Timeline

- **6 months before** — Build your email list. Share chapter excerpts. Get early readers.
- **3 months before** — Collect endorsements. Set up pre-order. Create a landing page.
- **Launch week** — Email list push, social media campaign, podcast guesting blitz.
- **Ongoing** — Speak at events using book content. Update annually. The book is a business card, not a one-time product.

## Key Takeaways

- Structure non-fiction as Hook, Foundation, Framework, Application, Launch
- Write in Markdown and use Pandoc to compile into EPUB, PDF, and DOCX
- Self-publishing gives speed and control; traditional publishing gives credibility
- Start marketing 6 months before launch by building an email list and sharing excerpts
- Treat the book as a long-term brand asset, not a one-time launch
