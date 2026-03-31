---
id: PAT-0167
name: Search UX Pattern
category: patterns
tags: [search, autocomplete, instant-search, filters, faceted-search, no-results]
capabilities: [search-ux-design, autocomplete-design, filter-design, no-results-handling, search-results-layout]
useWhen:
  - designing a search experience for a content-heavy application
  - implementing autocomplete and instant search results
  - building filter and faceted search interfaces
  - handling empty and no-results states in search
  - optimizing search result layout and ranking display
estimatedTokens: 650
relatedFragments: [SKL-0321, SKL-0329, PAT-0166, SKL-0328]
dependencies: []
synonyms: ["how to design a good search experience", "how to handle no search results", "autocomplete UX best practices", "how to design search filters", "instant search vs submit search", "search results page design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/meilisearch/meilisearch"
difficulty: intermediate
owner: "cortex"
pillar: "ux-design"
---

# Pattern: Search UX Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0167 |
| **Name** | Search UX Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Search is the primary navigation method for content-heavy products. Users expect instant, relevant results with clear ways to refine them. A bad search experience drives users away faster than bad navigation because users who search have high intent.

### Search Input Design

The search bar itself sets expectations:

- **Prominent placement**: Top-center or top-right of the page, always visible on desktop
- **Placeholder text**: Describe what can be searched ("Search docs, APIs, and tutorials")
- **Keyboard shortcut**: Cmd/Ctrl+K is the modern standard for app search
- **Clear button**: Show an X to clear the input once text is entered
- **Search icon**: Magnifying glass on the left side (input adornment, not a submit button)
- **Width**: At least 300px on desktop; a narrow search bar signals limited functionality

### Autocomplete and Instant Search

Instant results as the user types dramatically improve search quality:

```
User types: "des"

┌─────────────────────────────────┐
│ 🔍 des                      ✕  │
├─────────────────────────────────┤
│ Recent searches                 │
│   design tokens                 │
│   design system                 │
├─────────────────────────────────┤
│ Suggestions                     │
│   design handoff                │
│   design system governance      │
│   desktop navigation            │
├─────────────────────────────────┤
│ Quick results                   │
│   📄 Design Tokens Guide        │
│   📄 Getting Started with...    │
└─────────────────────────────────┘
```

Implementation guidelines:
- Debounce input by 150-300ms to avoid excessive API calls
- Show results after 2-3 characters minimum
- Highlight the matching portion of suggestions
- Support keyboard navigation (arrow keys + Enter)
- Show recent searches when the input is focused but empty
- Limit suggestions to 5-8 items to avoid overwhelming the dropdown

### Filters and Faceted Search

Filters let users narrow results by attributes. Faceted search shows available filter values with counts:

| Filter Type | Use When | Example |
|------------|----------|---------|
| **Checkbox facets** | Multiple selections from a category | Category: Docs (42), Tutorials (18), API (7) |
| **Range slider** | Numeric ranges | Price: $10 - $500 |
| **Date range** | Time-based filtering | Published: Last 7 days, Last 30 days, Custom |
| **Toggle** | Binary on/off filter | Show only: In stock, Free shipping |
| **Tag pills** | Quick multi-select with visual feedback | Tags: React, TypeScript, CSS |

Filter placement:
- **Left sidebar** on desktop for 3+ filter groups
- **Top horizontal bar** for 1-2 simple filters
- **Bottom sheet or modal** on mobile (filters behind a "Filter" button)

Always show the count of results that match the current filters. Update counts in real time as filters change.

### No-Results Handling

An empty results page is a dead end unless you design it otherwise:

1. **Confirm the query**: "No results for 'dezign tokns'" (show what was searched)
2. **Suggest corrections**: "Did you mean 'design tokens'?" (typo tolerance)
3. **Broaden the search**: "Try removing some filters" or "Search in all categories"
4. **Offer alternatives**: Show popular items, related categories, or recent content
5. **Provide an escape**: Link to browse by category, or contact support

Never show just "No results found." with a blank page.

### Search Results Layout

| Layout | Best For |
|--------|----------|
| **List** | Text-heavy content (docs, articles, support tickets) |
| **Grid** | Visual content (products, images, templates) |
| **Table** | Structured data with sortable columns |

Each result should show: title (linked), snippet with highlighted matching terms, metadata (date, category, author), and a clear click target. Show 10-20 results per page with pagination or infinite scroll.

## Anti-Patterns

- Search that requires pressing Enter (instant results are expected in modern UIs)
- Filters that return zero results without warning (show counts before applying)
- No-results page with no suggestions or alternatives
- Autocomplete that blocks the input or causes layout shifts
- Search scoped to only one content type without indicating the scope

## Key Takeaways

- Make the search bar prominent and describe what can be searched in placeholder text
- Implement instant results with debounced autocomplete after 2-3 characters
- Show filter counts and update them in real time as users refine their search
- Never show a bare "No results" page; offer corrections, alternatives, and escape routes
- Support keyboard navigation throughout the entire search experience
