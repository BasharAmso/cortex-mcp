---
id: SKL-0056
name: Spacing & Layout
category: skills
tags: [spacing, layout, grid, whitespace, css, design, responsive]
capabilities: [spacing-scale-design, grid-system-setup, vertical-rhythm, content-width-constraints, section-spacing]
useWhen:
  - setting up consistent spacing in a project
  - things look cramped or unevenly spaced
  - building page layouts with good section rhythm
  - deciding on content width and container constraints
  - establishing a spacing system for a design system
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0020, SKL-0048, SKL-0055, SKL-0057]
dependencies: []
synonyms: ["my layout looks cramped and messy", "how much padding should I use", "everything is spaced differently and it bugs me", "how wide should my content area be", "make my page sections feel more balanced"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Spacing & Layout

Consistent spacing is the difference between "dev project" and "designed product." Use a system, not guesswork.

## The 4px/8px Grid

All spacing values should be multiples of 4px. This creates visual consistency even when you cannot explain why it looks right.

| Token | Value | Use For |
|-------|-------|---------|
| `space-1` | 4px | Icon-to-label gap, tight inline spacing |
| `space-2` | 8px | Input padding, compact list gaps |
| `space-3` | 12px | Small card padding, form field gaps |
| `space-4` | 16px | Standard card padding, paragraph gaps |
| `space-6` | 24px | Section internal padding, card groups |
| `space-8` | 32px | Between content blocks |
| `space-12` | 48px | Between major page sections |
| `space-16` | 64px | Hero/section top-bottom padding |
| `space-24` | 96px | Major section breaks, page-level rhythm |

**Rule of thumb:** When choosing between two values, pick the larger one. Beginners almost always under-space.

## Content Width Constraints

| Content Type | Max Width | Why |
|-------------|-----------|-----|
| Body text | `65ch` (~600px) | Optimal reading line length |
| Content area | 720-800px | Blog, docs, articles |
| App layout | 1200-1440px | Dashboards, tools |
| Marketing page | 1200px content, full-width sections | Hero images bleed, text stays constrained |
| Form | 480-560px | Forms wider than this feel like spreadsheets |

```css
.content { max-width: 800px; margin-inline: auto; padding-inline: 1rem; }
```

Always add horizontal padding (`1rem` minimum) so content does not touch screen edges on mobile.

## Section Rhythm

A well-designed page has a breathing rhythm. Sections alternate between dense and spacious.

| Section Type | Vertical Padding | Background |
|-------------|-----------------|------------|
| Hero | 96-128px top/bottom | Often colored or with image |
| Feature block | 64-96px | Alternate white/light gray |
| Testimonials | 64-80px | Often inverted (dark) |
| CTA | 48-64px | Accent background |
| Footer | 48-64px | Dark, dense is fine |

**Pattern:** Large gap between sections, smaller gaps within sections. This creates visual grouping (Gestalt proximity principle).

## Vertical Rhythm Checklist

- [ ] All spacing values come from the 4px grid (no magic numbers like 13px or 27px)
- [ ] Consistent gap between same-level items (all cards same gap, all list items same gap)
- [ ] Section padding is significantly larger than internal padding (at least 2x)
- [ ] Headings have more space above than below (they belong to the content after them)
- [ ] First and last child in a container do not add extra outer space (use gap, not margin)

## Heading Spacing Rule

Headings should be closer to the content they introduce than to the content above:

```css
h2 { margin-top: 2.5rem; margin-bottom: 0.75rem; }
h3 { margin-top: 2rem; margin-bottom: 0.5rem; }
```

The top margin should be roughly 3x the bottom margin.

## Common Mistakes

- **Inconsistent gaps:** Using 12px here, 15px there, 20px somewhere else. Pick from the scale.
- **Not enough whitespace:** More space almost always looks better. When in doubt, double it.
- **Margin collapsing surprises:** Use `gap` in flex/grid instead of margins on children.
- **Full-width text:** Body text without `max-width` is unreadable on wide screens.
- **Forgetting mobile padding:** Content touching screen edges looks broken. Always add `1rem` inline padding.
