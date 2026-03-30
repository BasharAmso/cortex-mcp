---
id: SKL-0039
name: Accessibility Implementation
category: skills
tags: [accessibility, a11y, wcag, aria, screen-reader, keyboard-navigation, contrast, semantic-html]
capabilities: [accessibility-audit, aria-implementation, keyboard-navigation, screen-reader-support]
useWhen:
  - making a web application accessible to users with disabilities
  - adding ARIA labels and roles to interactive components
  - fixing accessibility issues flagged by audits or users
  - ensuring WCAG 2.1 AA compliance for a project
  - testing with screen readers and keyboard-only navigation
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0020, SKL-0015, PAT-0002]
dependencies: []
synonyms: ["make my app accessible", "how to add ARIA labels", "keyboard navigation not working", "screen reader support", "WCAG compliance checklist"]
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: intermediate
---

# Accessibility Implementation

Accessibility is not a feature you add later. It is a quality of correct HTML. Most accessibility problems come from using `<div>` and `<span>` where semantic elements already exist.

## Rule Zero: Use Semantic HTML First

Before reaching for ARIA, check if a native HTML element already does the job.

| Instead of... | Use... |
|---------------|--------|
| `<div onclick>` | `<button>` |
| `<div role="navigation">` | `<nav>` |
| `<div role="heading">` | `<h1>` through `<h6>` |
| `<span role="link">` | `<a href>` |
| `<div role="list">` | `<ul>` or `<ol>` |
| `<div role="textbox">` | `<input>` or `<textarea>` |

Native elements provide keyboard handling, focus management, and screen reader announcements for free.

## WCAG 2.1 AA Checklist

### Perceivable
- [ ] All images have descriptive `alt` text (or `alt=""` for decorative images)
- [ ] Color contrast is 4.5:1 minimum for normal text, 3:1 for large text (18px+ bold or 24px+)
- [ ] Color is never the only means of conveying information (add icons, text, or patterns)
- [ ] Video has captions; audio has transcripts
- [ ] Text can be resized to 200% without loss of functionality

### Operable
- [ ] All interactive elements are reachable and usable via keyboard alone
- [ ] Focus order follows a logical reading sequence
- [ ] Focus indicators are clearly visible (never `outline: none` without a replacement)
- [ ] No keyboard traps (user can always Tab away from a component)
- [ ] Skip-to-content link is present for keyboard users
- [ ] Animations respect `prefers-reduced-motion`

### Understandable
- [ ] `<html lang="en">` (or appropriate language) is set
- [ ] Form inputs have associated `<label>` elements (not just placeholder text)
- [ ] Error messages identify the field and describe the fix
- [ ] Navigation is consistent across pages

### Robust
- [ ] Valid HTML (no duplicate IDs, proper nesting)
- [ ] ARIA attributes are used correctly (valid roles, states, properties)
- [ ] Custom components expose correct roles and states to assistive technology

## ARIA Role Quick Reference

| Pattern | Role | Key Attributes |
|---------|------|---------------|
| Modal dialog | `role="dialog"` | `aria-modal="true"`, `aria-labelledby` |
| Tabs | `role="tablist"`, `role="tab"`, `role="tabpanel"` | `aria-selected`, `aria-controls` |
| Accordion | `<button aria-expanded>` | `aria-controls` pointing to content panel |
| Toast/alert | `role="alert"` or `role="status"` | Live region, auto-announced |
| Menu | `role="menu"`, `role="menuitem"` | `aria-haspopup`, arrow key navigation |
| Combobox | `role="combobox"` | `aria-expanded`, `aria-activedescendant` |

## Keyboard Navigation Patterns

- **Tab/Shift+Tab:** Move between interactive elements
- **Enter/Space:** Activate buttons and links
- **Arrow keys:** Navigate within composite widgets (tabs, menus, radio groups)
- **Escape:** Close modals, menus, and popups
- **Home/End:** Jump to first/last item in a list

## Focus Management

When content changes dynamically (modal opens, route changes, item deleted), manage focus explicitly:

1. **Modal opens:** Move focus to the first focusable element inside. Trap focus within the modal.
2. **Modal closes:** Return focus to the element that triggered it.
3. **Route changes (SPA):** Move focus to the main content heading or announce the new page.
4. **Item deleted from list:** Move focus to the nearest remaining item.

## Testing Tools

| Tool | Type | Catches |
|------|------|---------|
| axe DevTools (browser extension) | Automated | ~30-40% of WCAG issues |
| Lighthouse Accessibility | Automated | Common violations, contrast |
| NVDA (Windows) / VoiceOver (Mac) | Manual | Screen reader experience |
| Keyboard-only testing | Manual | Focus order, traps, missing handlers |
| WAVE (web tool) | Automated | Structure, ARIA, contrast |

Automated tools catch less than half of real accessibility issues. Manual testing with keyboard and screen reader is essential.
