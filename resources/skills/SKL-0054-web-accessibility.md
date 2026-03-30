---
id: SKL-0054
name: Web Accessibility
category: skills
tags: [accessibility, a11y, aria, keyboard, screen-reader, focus, wcag, inclusive, radix, headless-ui]
capabilities: [aria-patterns, keyboard-navigation, screen-reader-support, focus-management, live-regions]
useWhen:
  - building interactive components that need keyboard and screen reader support
  - auditing an existing page for accessibility issues
  - implementing focus management for modals, drawers, or dynamic content
  - adding ARIA patterns to custom widgets
  - choosing accessible component primitives
estimatedTokens: 700
relatedFragments: [SKL-0005, SKL-0051, SKL-0023, SKL-0013]
dependencies: []
synonyms: ["how do I make my website accessible", "my site needs to work with screen readers", "how to add keyboard navigation", "what ARIA attributes do I need", "make sure my app is usable by everyone"]
sourceUrl: "https://github.com/enaqx/awesome-react"
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
---

# Web Accessibility

Build interfaces that work for everyone: keyboard users, screen reader users, low-vision users, and motor-impaired users. Accessibility is not a feature. It is a quality bar.

## Start with Accessible Primitives

Before building custom accessible components, use battle-tested libraries from the React ecosystem:

| Library | Approach | Best For |
|---------|----------|----------|
| **Radix UI** | Unstyled, accessible compound components | Full control over styling |
| **Headless UI** | Tailwind-team, unstyled accessible components | Tailwind projects |
| **Ariakit** | Hook-based accessible toolkit | Maximum flexibility |
| **React Aria** (Adobe) | Hooks for accessible behavior | Enterprise-grade a11y |
| **Downshift** | Accessible combobox/autocomplete | Search and select patterns |

**Rule:** Use these instead of building custom ARIA from scratch. They handle edge cases you will miss.

## Core Principles

1. **Semantic HTML first.** A `<button>` is accessible by default. A `<div onClick>` is not.
2. **Keyboard everything.** If you cannot reach it and activate it with a keyboard, it is broken.
3. **Announce changes.** Screen readers cannot see visual changes. Use ARIA live regions.
4. **Do not rely on color alone.** Use icons, text, or patterns alongside color.

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

Radix and Headless UI handle this automatically. For manual implementation, use the `focus-trap-react` package.

### Skip Link

```tsx
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4">
  Skip to main content
</a>
```

## Live Regions

| Attribute | Behavior | Use For |
|-----------|----------|---------|
| `aria-live="polite"` | Announces after current speech | Status updates, confirmations |
| `aria-live="assertive"` | Interrupts immediately | Errors, urgent alerts |
| `role="alert"` | Implicitly assertive | Form errors, system warnings |
| `role="status"` | Implicitly polite | Loading states, success messages |

**Rule:** The live region element must exist in the DOM before content is added.

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
3. Can you operate every control with keyboard alone?
4. Run axe DevTools. Fix all critical and serious issues.
5. Test one screen reader flow (open page, complete primary action).
6. Check color contrast with a contrast checker tool.
7. Zoom to 200%. Is everything still usable?
