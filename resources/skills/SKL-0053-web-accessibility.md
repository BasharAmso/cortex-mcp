---
id: SKL-0053
name: Web Accessibility
category: skills
tags: [accessibility, a11y, aria, keyboard, screen-reader, focus, wcag, inclusive]
capabilities: [aria-patterns, keyboard-navigation, screen-reader-support, focus-management, live-regions]
useWhen:
  - building interactive components that need keyboard and screen reader support
  - auditing an existing page for accessibility issues
  - implementing focus management for modals, drawers, or dynamic content
  - adding ARIA patterns to custom widgets
estimatedTokens: 700
relatedFragments: [SKL-0005, SKL-0050, SKL-0020, SKL-0013]
dependencies: []
synonyms: ["how do I make my website accessible", "my site needs to work with screen readers", "how to add keyboard navigation", "what ARIA attributes do I need", "make sure my app is usable by everyone"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Web Accessibility

Build interfaces that work for everyone: keyboard users, screen reader users, low-vision users, and motor-impaired users. Accessibility is not a feature. It is a quality bar.

## Core Principles

1. **Semantic HTML first.** A `<button>` is accessible by default. A `<div onClick>` is not.
2. **Keyboard everything.** If you cannot reach it and activate it with a keyboard, it is broken.
3. **Announce changes.** Screen readers cannot see visual changes. Use ARIA live regions.
4. **Do not rely on color alone.** Use icons, text, or patterns alongside color to convey meaning.

## Semantic HTML Cheat Sheet

| Instead of | Use |
|------------|-----|
| `<div onClick>` | `<button>` |
| `<div class="header">` | `<header>` |
| `<div class="nav">` | `<nav>` |
| `<span class="link">` | `<a href>` |
| `<div class="list">` | `<ul>` / `<ol>` |
| `<div role="heading">` | `<h1>` - `<h6>` |

## ARIA Patterns for Common Widgets

| Widget | Key ARIA | Keyboard |
|--------|----------|----------|
| **Modal/Dialog** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | Escape closes, Tab trapped inside |
| **Tabs** | `role="tablist/tab/tabpanel"`, `aria-selected` | Arrow keys switch, Tab into panel |
| **Dropdown Menu** | `role="menu/menuitem"`, `aria-expanded` | Arrow keys navigate, Escape closes |
| **Toggle** | `role="switch"`, `aria-checked` | Space toggles |
| **Accordion** | `<button aria-expanded>`, `aria-controls` | Enter/Space toggles section |
| **Toast** | `role="status"`, `aria-live="polite"` | Auto-announced, no keyboard needed |

## Focus Management

### Focus Trap (Modals and Drawers)

When a modal opens:
1. Move focus to the first focusable element inside the modal.
2. Trap Tab and Shift+Tab within the modal.
3. On close, return focus to the element that opened the modal.

```tsx
// Using Radix or Headless UI handles this automatically.
// Manual implementation:
const firstFocusable = modalRef.current?.querySelector(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);
firstFocusable?.focus();
```

### Skip Link

Add a "Skip to main content" link as the first focusable element on every page:

```tsx
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4">
  Skip to main content
</a>
// ...
<main id="main">
```

## Live Regions

Announce dynamic content changes to screen readers:

| Attribute | Behavior | Use For |
|-----------|----------|---------|
| `aria-live="polite"` | Announces after current speech finishes | Status updates, saved confirmations |
| `aria-live="assertive"` | Interrupts current speech immediately | Errors, urgent alerts |
| `role="alert"` | Implicitly assertive | Form errors, system warnings |
| `role="status"` | Implicitly polite | Loading states, success messages |

**Rule:** The live region element must exist in the DOM before content is added to it. Adding the `aria-live` attribute and content at the same time does not work.

## Keyboard Navigation Patterns

| Key | Expected Behavior |
|-----|-------------------|
| Tab | Move to next focusable element |
| Shift+Tab | Move to previous focusable element |
| Enter/Space | Activate button or link |
| Escape | Close modal, dropdown, or popover |
| Arrow keys | Navigate within a group (tabs, menu, radio) |
| Home/End | Jump to first/last item in a list |

## Testing Approach

| Method | Catches | Effort |
|--------|---------|--------|
| **axe DevTools extension** | Missing alt text, contrast, ARIA issues | 5 minutes |
| **Keyboard-only navigation** | Unreachable elements, missing focus indicators | 10 minutes |
| **Screen reader (VoiceOver/NVDA)** | Confusing reading order, missing announcements | 20 minutes |
| **Lighthouse accessibility audit** | Common issues with a score | 2 minutes |

### Minimum Testing Checklist

1. Tab through the entire page. Can you reach every interactive element?
2. Is there a visible focus indicator on every focused element?
3. Can you operate every control with keyboard alone (no mouse)?
4. Run axe DevTools. Fix all critical and serious issues.
5. Test one screen reader flow (open page, complete primary action).
6. Check color contrast with a contrast checker tool.
7. Zoom to 200%. Is everything still usable?

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| `<div onClick>` with no keyboard support | Use `<button>` |
| `outline: none` without replacement | Use `outline: none` only with a custom `box-shadow` focus indicator |
| Placeholder as label | Add a real `<label>` element |
| Image without `alt` | Add descriptive `alt` or `alt=""` for decorative images |
| `aria-label` on a `<div>` | ARIA labels only work on interactive or landmark elements |
| Color-only error indication | Add icon and text alongside the red color |
