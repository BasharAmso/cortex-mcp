---
id: SKL-0107
name: Accessibility Audit
category: skills
tags: [accessibility, wcag, screen-reader, keyboard-navigation, color-contrast, aria, a11y, inclusive-design]
capabilities: [wcag-compliance-check, screen-reader-testing, keyboard-nav-audit, color-contrast-validation, aria-review]
useWhen:
  - auditing an existing product or feature for WCAG 2.1 AA compliance
  - planning accessible design before building
  - testing screen reader and keyboard navigation support
  - reviewing color contrast and visual accessibility
estimatedTokens: 700
relatedFragments: [SKL-0023, SKL-0104, PAT-0043, SKL-0003]
dependencies: []
synonyms: ["is my app accessible", "WCAG compliance check", "screen reader testing guide", "keyboard navigation audit", "color contrast check", "how to make my site accessible", "a11y review"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/18F/ux-guide"
difficulty: intermediate
owner: reviewer
---

# Accessibility Audit

Accessibility is not a feature you add at the end. It is a design constraint that shapes every decision. Audit early and audit often. Target WCAG 2.1 AA as the minimum standard.

## Audit Checklist by Category

### Perceivable

| Check | Requirement | How to Test |
|-------|-------------|-------------|
| Text alternatives | All images have meaningful `alt` text (decorative images use `alt=""`) | Inspect every `<img>`, `<svg>`, and background image |
| Video captions | All video content has synchronized captions | Review captions for accuracy and timing |
| Color contrast | 4.5:1 minimum for normal text, 3:1 for large text (18px+ bold or 24px+) | Use browser devtools or contrast checker tools |
| Color independence | Color is never the sole means of conveying information | View in grayscale; is the meaning still clear? |
| Responsive zoom | Content remains usable at 200% browser zoom | Zoom to 200% and verify no content is hidden or overlapping |

### Operable

| Check | Requirement | How to Test |
|-------|-------------|-------------|
| Keyboard access | All interactive elements reachable and operable via keyboard alone | Tab through entire page without touching the mouse |
| Focus indicators | Visible focus ring on every focusable element | Tab through and verify focus is always visible |
| Focus order | Tab order follows logical reading sequence | Tab through and verify order matches visual layout |
| No keyboard traps | Users can tab into and out of every component | Test modals, dropdowns, and custom widgets specifically |
| Skip navigation | "Skip to main content" link as first focusable element | Tab once from page load; skip link should appear |
| Motion control | Animations respect `prefers-reduced-motion` | Enable reduced motion in OS settings and verify |

### Understandable

| Check | Requirement | How to Test |
|-------|-------------|-------------|
| Page language | `lang` attribute on `<html>` element | Inspect the HTML tag |
| Form labels | Every input has an associated `<label>` element | Inspect form markup; click the label to verify it focuses the input |
| Error messages | Errors identify the field and describe how to fix the problem | Trigger validation errors and read the messages |
| Consistent navigation | Navigation appears in the same location across pages | Navigate between pages and verify |

### Robust

| Check | Requirement | How to Test |
|-------|-------------|-------------|
| Valid HTML | No duplicate IDs, proper nesting, closed tags | Run HTML validator |
| ARIA usage | ARIA attributes are correct and necessary (prefer semantic HTML) | Audit ARIA roles, states, and properties |
| Name/role/value | Custom widgets expose correct roles and states to assistive tech | Test with screen reader |

## Screen Reader Testing

Test with at least one screen reader:

- **macOS**: VoiceOver (built-in, Cmd+F5 to toggle)
- **Windows**: NVDA (free) or JAWS
- **Mobile**: VoiceOver on iOS, TalkBack on Android

Key things to verify: page title announced on load, headings create navigable outline, form fields announce their labels, dynamic content updates are announced via live regions, images convey their alt text.

## Keyboard Navigation Testing

Complete this walkthrough without using a mouse:

1. Tab from top of page to bottom. Can you reach every interactive element?
2. Activate buttons and links with Enter/Space. Do they all work?
3. Open a modal. Can you tab within it? Can you close it with Escape?
4. Use arrow keys in menus and tab panels. Do they behave as expected?
5. Tab past the modal. Does focus stay trapped inside until dismissed?

## Automated vs Manual Testing

Automated tools (axe, Lighthouse, WAVE) catch roughly 30-40% of accessibility issues. They reliably find: missing alt text, contrast failures, missing form labels, duplicate IDs, and missing landmarks.

Manual testing is required for: logical focus order, meaningful alt text quality, keyboard trap detection, screen reader experience, and cognitive clarity of content.

Run automated checks first to clear the low-hanging fruit, then do manual testing for everything automation misses.
