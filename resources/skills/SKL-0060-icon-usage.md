---
id: SKL-0060
name: Icon Usage
category: skills
tags: [icons, ui, accessibility, design, svg, components, visual]
capabilities: [icon-library-selection, icon-sizing, text-alignment, icon-accessibility, icon-vs-text-decisions]
useWhen:
  - choosing an icon library for a project
  - icons look misaligned with text or buttons
  - making icons accessible for screen readers
  - deciding whether to use an icon, text, or both
  - standardizing icon sizes across an app
estimatedTokens: 500
relatedFragments: [SKL-0005, SKL-0020, SKL-0048, SKL-0061]
dependencies: []
synonyms: ["what icon library should I use", "my icons look off next to the text", "do I need to make icons accessible", "should I use an icon or just text here", "icons are all different sizes in my app"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Icon Usage

Icons guide attention and save space, but only when used consistently and accessibly. Bad icon usage makes an app feel amateur faster than almost anything else.

## Icon Library Comparison

| Library | Style | Count | Best For |
|---------|-------|-------|----------|
| **Lucide** | Clean stroke, 24px grid | 1400+ | General purpose, React/Next.js projects |
| **Heroicons** | Tailwind team, outline + solid | 300+ | Tailwind projects, minimal sets |
| **Phosphor** | Flexible weights (thin to bold) | 1200+ | Apps needing weight variety |
| **Tabler Icons** | Stroke-based, consistent 24px | 4000+ | Large apps needing broad coverage |
| **Material Symbols** | Google, variable font | 2500+ | Material Design or Android-adjacent |

**Recommendation:** Lucide for most projects. It covers common needs, tree-shakes well, and has clean React components.

**Never mix icon libraries.** Inconsistent stroke widths and optical sizes make the UI feel patchwork.

## Sizing Conventions

| Context | Size | CSS |
|---------|------|-----|
| Inline with body text | 16px | `width: 1em; height: 1em` |
| Button icon (with label) | 16-18px | Match text size |
| Button icon (standalone) | 20-24px | Needs larger click target |
| Navigation items | 20-24px | Consistent across nav |
| Section headers | 24-28px | Larger for emphasis |
| Feature/hero icons | 32-48px | Marketing pages, feature lists |
| Empty states | 48-64px | Illustration replacement |

**Consistency rule:** Pick 3-4 sizes and use only those across the entire app.

## Aligning Icons with Text

The number one icon complaint: "it looks off by a pixel." Fix it:

```css
/* For inline icons next to text */
.icon-inline {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}

/* For icon + label buttons */
.btn-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
}

/* If icon still looks misaligned, nudge optically */
.icon-nudge {
  position: relative;
  top: -1px; /* adjust per icon */
}
```

**Why icons look misaligned:** Icons are optically centered in their bounding box, but text has a baseline. Use `vertical-align: middle` or flexbox `align-items: center` to fix this.

## Accessibility for Icons

| Usage | What to Do | Why |
|-------|-----------|-----|
| **Decorative** (next to text label) | `aria-hidden="true"` on the icon | Screen reader already reads the label |
| **Standalone** (no text) | Add `aria-label` to the button | Screen reader needs to announce the action |
| **Informational** (status indicator) | `role="img"` + `aria-label` | Conveys meaning that sighted users get from the icon |

```html
<!-- Decorative: label says it all -->
<button><SearchIcon aria-hidden="true" /> Search</button>

<!-- Standalone: needs label -->
<button aria-label="Close dialog"><XIcon aria-hidden="true" /></button>

<!-- Informational: conveys status -->
<span role="img" aria-label="Completed"><CheckCircle /></span>
```

**Never use an icon as the only way to convey meaning without an accessible label.**

## When to Use Icons vs Text

| Scenario | Use | Why |
|----------|-----|-----|
| Universal actions (search, close, menu, back) | Icon only (with aria-label) | Universally recognized |
| Domain-specific actions (archive, merge, deploy) | Icon + text label | Not universally understood |
| Navigation items | Icon + text | Clarity over compactness |
| Form actions (save, submit, cancel) | Text only or text + icon | Text is clearer for important actions |
| Status indicators (success, error, pending) | Icon + text | Color + icon + text = triple encoding |
| Dense data tables | Icon only (with tooltip) | Space-constrained, but add tooltips |

**Rule of thumb:** If you have to wonder whether the icon is clear enough on its own, add a text label.

## Common Mistakes

- Mixing icon libraries (inconsistent stroke widths)
- Icons at random sizes (16px here, 22px there, 19px somewhere else)
- Missing `aria-hidden` on decorative icons (screen reader announces "image" uselessly)
- Standalone icon buttons without `aria-label` (invisible to assistive technology)
- Using icons where text would be clearer (clever is not usable)
- Icons with different visual weight than surrounding text (too bold or too thin)
