---
id: SKL-0043
name: Visual QA
category: skills
tags: [visual-qa, ui-testing, screenshot-comparison, visual-regression, pixel-perfect, design-review, cross-browser, responsive]
capabilities: [visual-regression-testing, ui-review, design-fidelity-checking]
useWhen:
  - comparing a built UI against a design mockup
  - checking for visual regressions after code changes
  - reviewing responsive layout across screen sizes
  - validating cross-browser rendering consistency
  - performing a final visual check before release
estimatedTokens: 600
relatedFragments: [PAT-0005, SKL-0044, PAT-0010]
dependencies: []
synonyms: ["how to check if my UI matches the design", "visual regression testing", "how to compare screenshots of my app", "pixel perfect design review", "how to test UI across different browsers"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/nicklockwood/iVersion"
difficulty: intermediate
owner: reviewer
pillar: "framework-core"
---

# Visual QA

A systematic process for verifying that a built UI matches the intended design and does not regress between releases. Combines manual review techniques with automated visual regression tooling.

## When to Use

Use Visual QA after any UI change (feature, fix, or refactor) and before every release. The goal is to catch layout shifts, color changes, missing elements, and responsive breakage that functional tests miss.

## Visual QA Checklist

### 1. Design Fidelity Check

Compare the implemented UI against the design source (Figma, sketch, or mockup):

| Check | What to Look For |
|-------|-----------------|
| **Spacing** | Margins, padding, and gaps match the design system (8px grid, 4px grid) |
| **Typography** | Font family, size, weight, line-height, and letter-spacing |
| **Colors** | Exact hex/HSL values, not "close enough". Check in both light and dark mode |
| **Alignment** | Elements aligned to grid. Check vertical and horizontal alignment |
| **Icons/Images** | Correct icons, proper sizing, alt text present |
| **States** | Hover, focus, active, disabled, loading, empty, error states all implemented |

### 2. Responsive Layout Review

Test at these breakpoints as a minimum:

| Viewport | Width | Device Category |
|----------|-------|----------------|
| Mobile | 375px | iPhone SE / small phone |
| Mobile Large | 428px | iPhone Pro Max / large phone |
| Tablet | 768px | iPad Mini |
| Desktop | 1280px | Standard laptop |
| Wide | 1920px | External monitor |

Check for: text overflow, horizontal scroll, overlapping elements, touch target sizes (minimum 44x44px), and image scaling.

### 3. Cross-Browser Checks

| Browser | Engine | Why |
|---------|--------|-----|
| Chrome | Blink | Majority market share |
| Firefox | Gecko | Different rendering engine catches unique bugs |
| Safari | WebKit | iOS default, flexbox/grid differences |

### 4. Automated Visual Regression

Set up automated screenshot comparison in CI:

1. **Capture baseline screenshots** at defined breakpoints and states
2. **On each PR**, capture new screenshots and diff against baseline
3. **Flag differences** above a pixel threshold (typically 0.1-0.5%)
4. **Human review** flagged diffs. Approve intentional changes, reject regressions.

**Tools:** Playwright visual comparisons, Chromatic (Storybook), Percy, BackstopJS.

### 5. Accessibility Visual Checks

| Check | Standard |
|-------|----------|
| Color contrast ratio >= 4.5:1 (normal text), 3:1 (large text) | WCAG 2.1 AA |
| Focus indicator visible on all interactive elements | WCAG 2.4.7 |
| Text readable at 200% zoom | WCAG 1.4.4 |
| No information conveyed by color alone | WCAG 1.4.1 |

## Version Awareness

Track which version of the app each screenshot corresponds to. Include the git SHA or version number in visual regression baselines. When updating baselines, reference the PR or ticket that justifies the visual change.

## Anti-Patterns

- Testing only the happy path at one screen size
- Approving visual diffs without comparing to the design
- Skipping dark mode or high-contrast mode testing
- No automated visual regression (relying purely on manual review)
- Updating screenshot baselines without understanding why they changed
