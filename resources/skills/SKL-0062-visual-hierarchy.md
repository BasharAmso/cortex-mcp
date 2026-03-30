---
id: SKL-0062
name: Visual Hierarchy
category: skills
tags: [hierarchy, layout, design, attention, whitespace, cta, visual, ux, scanning-patterns, gestalt]
capabilities: [hierarchy-design, layout-patterns, cta-prominence, information-density, attention-direction]
useWhen:
  - a page has too much information and nothing stands out
  - designing layouts that guide the user's eye to what matters
  - making CTAs and key actions more prominent
  - balancing information density with readability
  - reviewing a page to understand why it feels overwhelming or flat
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0023, SKL-0049, SKL-0055, SKL-0056, SKL-0057]
dependencies: []
synonyms: ["everything on my page looks the same importance", "how to make the important stuff stand out", "my page feels overwhelming and cluttered", "users dont notice the main button on my page", "how to organize information so it makes sense visually"]
sourceUrl: "https://github.com/gztchan/awesome-design"
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: designer
---

# Visual Hierarchy

Visual hierarchy is how you tell users what to look at first, second, and third without saying a word. If everything is emphasized, nothing is. Design inspiration sites like Dribbble, Behance, Site Inspire, and Land Book consistently demonstrate these principles in practice.

## The Four Tools of Hierarchy

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
| **Secondary** | Medium size, standard weight, moderate contrast | Section headings, supporting content |
| **Tertiary** | Smallest, lightest, lowest contrast, least space | Metadata, timestamps, helper text, footer links |

**Test:** Squint at your page. Can you still identify the three levels? If not, the hierarchy is too flat.

## Scanning Patterns

Users do not read pages top to bottom. They scan in predictable patterns:

### F-Pattern (Text-Heavy Pages)
- Scan horizontally across the top, shorter line below, then vertically down the left
- **Use for:** Articles, docs, search results, dashboards
- **Implication:** Most important content in first two lines and left column

### Z-Pattern (Marketing/Landing Pages)
- Eye moves: top-left to top-right to bottom-left to bottom-right
- **Use for:** Landing pages, hero sections, pricing pages
- **Implication:** Logo top-left, nav top-right, headline bottom-left, CTA bottom-right

### Gutenberg Diagram (Simple Pages)
- Attention flows from top-left (Primary Optical) to bottom-right (Terminal) along a diagonal
- **Use for:** Simple landing pages, forms, cards
- **Implication:** Place the CTA in the Terminal area (bottom-right)

## CTA Prominence

The primary call-to-action should be the most visually dominant interactive element:

| Technique | Implementation |
|-----------|---------------|
| **Color contrast** | Primary CTA uses brand color; secondary uses outline or gray |
| **Size** | Primary CTA is larger than secondary |
| **Isolation** | Surround with whitespace so nothing competes |
| **Position** | Terminal area (bottom-right) or center below hero text |
| **Limit quantity** | One primary CTA per viewport |

**The button test:** Cover everything except the buttons. Can you tell which is the primary action?

## Information Density

| Page Type | Density Level | Spacing Strategy |
|-----------|--------------|-----------------|
| Marketing/landing | Low | Generous whitespace (96px sections), large type |
| Product pages | Medium | Balanced spacing (48-64px), clear grouping |
| Dashboards/tools | High | Compact (16-24px), cards and tables, borders for grouping |
| Data tables | Very high | Tight (8-12px cell padding), alignment and row shading |

## Hierarchy Audit Checklist

- Page has exactly ONE primary focal point
- Three clear levels of visual importance are distinguishable
- Primary CTA is the most prominent interactive element
- No two elements compete for the same attention level
- Squint test: hierarchy survives at 25% zoom
- Important content falls on F-pattern or Z-pattern hotspots
- Whitespace isolates important elements
- Page works without color (hierarchy holds in grayscale)
- Dense sections use grouping (borders, backgrounds) to prevent overwhelm
