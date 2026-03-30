---
id: SKL-0061
name: Visual Hierarchy
category: skills
tags: [hierarchy, layout, design, attention, whitespace, cta, visual, ux]
capabilities: [hierarchy-design, layout-patterns, cta-prominence, information-density, attention-direction]
useWhen:
  - a page has too much information and nothing stands out
  - designing layouts that guide the user's eye to what matters
  - making CTAs and key actions more prominent
  - balancing information density with readability
  - reviewing a page to understand why it feels overwhelming or flat
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0020, SKL-0048, SKL-0054, SKL-0055, SKL-0056]
dependencies: []
synonyms: ["everything on my page looks the same importance", "how to make the important stuff stand out", "my page feels overwhelming and cluttered", "users dont notice the main button on my page", "how to organize information so it makes sense visually"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Visual Hierarchy

Visual hierarchy is how you tell users what to look at first, second, and third without saying a word. If everything is emphasized, nothing is.

## The Four Tools of Hierarchy

You have four levers. Use them together:

| Tool | How It Creates Hierarchy | Example |
|------|------------------------|---------|
| **Size** | Bigger = more important | H1 at 2.5rem vs body at 1rem |
| **Color/Contrast** | High contrast = attention | Dark heading on light bg vs gray secondary text |
| **Weight** | Bolder = more dominant | 700 weight heading vs 400 weight body |
| **Space** | More whitespace = more importance | Hero with 96px padding vs dense card grid |

### Priority Encoding

For any screen, identify three levels:

| Level | Visual Treatment | What Goes Here |
|-------|-----------------|----------------|
| **Primary** | Largest, boldest, highest contrast, most space | Page title, main CTA, hero message |
| **Secondary** | Medium size, standard weight, moderate contrast | Section headings, supporting content, secondary actions |
| **Tertiary** | Smallest, lightest, lowest contrast, least space | Metadata, timestamps, helper text, footer links |

**Test:** Squint at your page. Can you still identify the three levels? If not, the hierarchy is too flat.

## Scanning Patterns

Users do not read pages top to bottom. They scan in predictable patterns:

### F-Pattern (Text-Heavy Pages)
- Users scan horizontally across the top
- Then scan a shorter horizontal line below
- Then scan vertically down the left side
- **Use for:** Articles, docs, search results, dashboards
- **Implication:** Put the most important content in the first two lines and the left column

### Z-Pattern (Marketing/Landing Pages)
- Eye moves: top-left to top-right to bottom-left to bottom-right
- Following the natural reading direction across visual blocks
- **Use for:** Landing pages, hero sections, pricing pages
- **Implication:** Logo top-left, nav top-right, headline bottom-left, CTA bottom-right

### Gutenberg Diagram (Simple Pages)
- Four quadrants: Primary Optical (top-left), Strong Fallow (top-right), Weak Fallow (bottom-left), Terminal (bottom-right)
- Attention flows from Primary Optical to Terminal along the "reading gravity" diagonal
- **Use for:** Simple landing pages, forms, cards
- **Implication:** Place the CTA in the Terminal area (bottom-right)

## CTA Prominence

The primary call-to-action should be the most visually dominant interactive element:

| Technique | Implementation |
|-----------|---------------|
| **Color contrast** | Primary CTA uses the brand color; secondary uses outline or gray |
| **Size** | Primary CTA is larger (more padding, larger text) than secondary |
| **Isolation** | Surround the CTA with whitespace so nothing competes |
| **Position** | Place in the Terminal area (bottom-right of a section) or center below hero text |
| **Limit quantity** | One primary CTA per viewport. More than one = no hierarchy. |

**The button test:** Cover everything on the page except the buttons. Can you tell which is the primary action from the buttons alone?

## Information Density

| Page Type | Density Level | Spacing Strategy |
|-----------|--------------|-----------------|
| Marketing/landing | Low density | Generous whitespace (96px sections), large type, few elements per screen |
| Product pages | Medium density | Balanced spacing (48-64px sections), clear grouping |
| Dashboards/tools | High density | Compact spacing (16-24px), cards and tables, rely on grouping and borders |
| Data tables | Very high density | Tight (8-12px cell padding), use alignment and subtle row shading |

**Rules for high-density UIs:**
- Group related items with borders or background color (not just proximity)
- Use consistent alignment as an organizing force
- Bold or color-code the single most important data point per row
- Add whitespace between groups, not between every item

## Hierarchy Audit Checklist

- [ ] Page has exactly ONE primary focal point (what do you see first?)
- [ ] Three clear levels of visual importance are distinguishable
- [ ] Primary CTA is the most prominent interactive element
- [ ] No two elements compete for the same level of attention
- [ ] Squint test: hierarchy survives at 25% zoom or squinted eyes
- [ ] Important content falls on F-pattern or Z-pattern hotspots
- [ ] Whitespace is used to isolate important elements, not just fill space
- [ ] Secondary and tertiary elements are clearly subordinate (smaller, lighter, less space)
- [ ] Page works without color (hierarchy holds in grayscale)
- [ ] Dense sections use grouping (borders, backgrounds) to prevent overwhelm
