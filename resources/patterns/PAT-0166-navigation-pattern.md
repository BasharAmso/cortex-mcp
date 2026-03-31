---
id: PAT-0166
name: Navigation Pattern
category: patterns
tags: [navigation, top-nav, side-nav, breadcrumbs, mobile-drawer, tab-bar]
capabilities: [navigation-selection, mobile-navigation, breadcrumb-design, tab-bar-design, navigation-hierarchy]
useWhen:
  - choosing between top navigation, side navigation, or tab bars
  - designing mobile navigation with a drawer or bottom tabs
  - implementing breadcrumbs for deep content hierarchies
  - structuring navigation for apps with 3-12+ top-level sections
  - designing navigation that scales as the product grows
estimatedTokens: 650
relatedFragments: [SKL-0321, SKL-0323, PAT-0169, SKL-0325]
dependencies: []
synonyms: ["which navigation pattern should I use", "top nav vs side nav", "how to design mobile navigation", "when to use breadcrumbs", "how to design a tab bar", "best navigation for my app"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "ux-design"
---

# Pattern: Navigation Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0166 |
| **Name** | Navigation Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Navigation is the skeleton of your product. The right pattern depends on the number of top-level sections, content depth, and primary device. Choosing wrong forces workarounds that compound as the product grows.

### Navigation Pattern Selection

| Pattern | Best For | Items | Device |
|---------|----------|-------|--------|
| **Top horizontal nav** | Marketing sites, simple apps | 3-7 items | Desktop-first |
| **Side navigation** | Complex apps, deep hierarchies | 5-15+ items | Desktop-first |
| **Bottom tab bar** | Mobile apps with core sections | 3-5 items | Mobile-first |
| **Hamburger/drawer** | Mobile web, responsive apps | Any number | Mobile |
| **Breadcrumbs** | Deep hierarchies (e-commerce, docs) | Reflects depth | Any |

### Top Horizontal Navigation

Best for products with 3-7 primary sections. Keep the bar clean:

- Logo on the left, primary links in the center or left-aligned, user actions (profile, notifications) on the right
- Highlight the active section with a visual indicator (underline, background color, bold)
- For responsive collapse: use Priority+ pattern (show top items, collapse rest into "More" dropdown)
- Never put more than 7 items in the top nav; use a "More" menu or rethink your IA

### Side Navigation

Best for complex applications with many sections and nested pages:

- **Collapsible sidebar**: Full labels when expanded, icons only when collapsed (saves screen space)
- **Grouped sections**: Divide items into logical groups with section headers
- **Active state**: Highlight the current page and expand its parent group
- **Persistent**: Side nav stays visible on desktop, collapses to drawer on mobile
- **Width**: 240-280px expanded, 64-72px collapsed (icon only)

Common mistake: putting too many items at the top level. If your side nav has 20+ ungrouped items, the IA needs restructuring, not a longer sidebar.

### Bottom Tab Bar (Mobile)

The standard mobile navigation for apps with 3-5 core destinations:

- **Maximum 5 tabs**: More than 5 creates tiny, hard-to-tap targets
- **Icon + label**: Icons alone are ambiguous; always include text labels
- **Active indicator**: Filled icon + color change + label highlight
- **No tab for actions**: Tabs navigate to sections, not trigger actions (do not put "Add" as a tab unless it goes to a creation page)
- **Persistent across views**: The tab bar should remain visible on most screens; hide only on immersive content (video playback, editor)

### Breadcrumbs

Breadcrumbs show the user's position in a hierarchy and provide quick navigation up:

```
Home > Products > Electronics > Headphones > Sony WH-1000XM5
```

- Each segment is a clickable link except the current page
- Use a separator character (>, /, or chevron icon)
- Truncate long paths: show first level, ellipsis, and last 2-3 levels
- Breadcrumbs supplement primary navigation; they never replace it

### Mobile Drawer (Hamburger Menu)

The fallback for responsive sites when top nav cannot fit on mobile:

- Hamburger icon (three lines) in the top-left or top-right corner
- Drawer slides in from the left (standard) or right
- Full-height overlay with all navigation items, grouped if needed
- Close on outside tap, close button, or swipe
- Drawback: low discoverability. Users must know to tap the hamburger icon. Combine with bottom tab bar for critical sections.

## Anti-Patterns

- Using a hamburger menu as the only navigation on desktop (hides everything behind a click)
- Bottom tab bar with more than 5 items (tabs become too small to tap)
- Breadcrumbs without a link on each segment (useless as navigation)
- Side nav with 20+ ungrouped items (information architecture problem, not a navigation problem)
- Putting actions (Save, Delete) in navigation meant for pages

## Key Takeaways

- Choose navigation pattern based on number of sections and primary device, not aesthetics
- Side navigation scales best for complex apps; top nav works for simple products
- Bottom tab bars are limited to 5 items; always include icon + text label
- Breadcrumbs supplement primary navigation for deep hierarchies; they never replace it
- Hamburger menus have low discoverability; pair with visible tabs or links for critical sections
