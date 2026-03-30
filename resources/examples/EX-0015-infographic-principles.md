---
id: EX-0015
name: Infographic Design Principles
category: examples
tags: [infographic, data-visualization, visual-hierarchy, design, icons, color-coding, content-creation]
capabilities: [infographic-design, data-visualization, visual-information-architecture]
useWhen:
  - designing an infographic to explain data or a process
  - choosing visual hierarchy and flow direction for information
  - selecting colors, icons, and layout for data-heavy content
  - sizing infographics for different social platforms
estimatedTokens: 750
relatedFragments: [SKL-0091, EX-0014, EX-0016]
dependencies: []
synonyms: ["how to make an infographic", "infographic layout tips", "data visualization for social media", "how to visualize information", "infographic sizing guide"]
sourceUrl: ""
lastUpdated: "2026-03-30"
difficulty: intermediate
---

# Infographic Design Principles

How to turn data and processes into clear, shareable visual content, using data visualization best practices and accessible color systems.

## Chart Type Selection

| Message | Best Chart Type |
|---------|----------------|
| Comparison between items | Horizontal bar chart |
| Change over time | Line chart |
| Part of a whole | Pie or donut chart (max 5 slices) |
| Distribution | Histogram or box plot |
| Relationship | Scatter plot |
| Process or flow | Flowchart or timeline |

Rules: never use 3D effects, always label axes, and start numerical axes at zero unless you explicitly call out the truncation.

## Infographic Layout (HTML/CSS)

```html
<!-- Semantic infographic structure with accessible data visualization -->
<article class="infographic" role="img" aria-label="Remote Work Statistics 2026">
  <header class="info-header">
    <h1 class="info-title">Remote Work in 2026</h1>
    <p class="info-hero-stat"><span class="stat-number">68%</span> of workers are hybrid or remote</p>
  </header>
  <section class="info-section" aria-label="Work location breakdown">
    <h2>Work Location</h2>
    <div class="info-chart" role="figure" aria-label="Donut chart showing remote 38%, hybrid 30%, office 32%">
      <!-- Chart rendered by library -->
    </div>
  </section>
  <footer class="info-source">
    <p>Source: Buffer State of Remote Work 2026</p>
  </footer>
</article>
```

```css
/* Infographic design tokens following data viz best practices */
:root {
  --info-primary: #2563eb;
  --info-accent: #f59e0b;
  --info-positive: #10b981;
  --info-negative: #ef4444;
  --info-neutral: #64748b;
  --info-bg: #f8fafc;
  --info-text: #1e293b;
}

.infographic {
  max-width: 1200px;
  background: var(--info-bg);
  color: var(--info-text);
  font-family: "Inter", system-ui, sans-serif;
  padding: 3rem 2rem;
}

.info-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

/* Hero stat: 3-4x body text size anchors the story */
.info-hero-stat {
  font-size: 1.25rem;
  color: var(--info-neutral);
}

.stat-number {
  font-size: 4rem;
  font-weight: 900;
  color: var(--info-primary);
  display: block;
}

.info-section {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

/* Accessible color encoding: pair color with labels */
.info-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.info-source {
  margin-top: 3rem;
  font-size: 0.75rem;
  color: var(--info-neutral);
}
```

## Color Coding Rules

- **Limit to 3-5 colors.** One primary, one accent, and 1-3 supporting shades.
- **Sequential palettes** (light-to-dark of one hue) for ordered data.
- **Categorical palettes** (distinct hues) for unrelated groups.
- **Accessibility:** 3:1 minimum contrast between adjacent colors. Never rely on color alone; pair with labels or patterns.

## Platform Sizing

| Platform | Recommended Size (px) | Orientation |
|----------|----------------------|-------------|
| LinkedIn / Twitter | 1200 x 1500 | Vertical |
| Instagram feed | 1080 x 1350 | Vertical (4:5) |
| Pinterest | 1000 x 2100 | Tall vertical |
| Blog embed | 800 x 2000+ | Vertical scroll |
| Presentation slide | 1920 x 1080 | Horizontal |

## Key Points

- **One story per infographic** -- if it needs two headlines, make two infographics
- **Visual hierarchy** flows: title -> hero stat -> sections -> supporting data -> source
- **White space is structure** -- generous padding between sections improves readability
- **Cite sources** -- unlabeled data destroys credibility
- **Mobile test** -- preview at 400px wide; text below 14px becomes unreadable
- **Accessible:** use `role="img"` with `aria-label`, and `role="figure"` for charts
