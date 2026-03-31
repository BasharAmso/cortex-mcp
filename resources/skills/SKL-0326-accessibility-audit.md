---
id: SKL-0326
name: Accessibility Audit
category: skills
tags: [accessibility, wcag, a11y, screen-reader, automated-testing, manual-testing]
capabilities: [wcag-testing, automated-a11y-checks, manual-a11y-testing, remediation-planning, audit-reporting]
useWhen:
  - auditing a website or app for WCAG 2.1 AA compliance
  - setting up automated accessibility testing in CI/CD
  - performing manual accessibility checks with screen readers
  - prioritizing and planning accessibility remediation work
  - writing an accessibility audit report for stakeholders
estimatedTokens: 650
relatedFragments: [SKL-0320, SKL-0005, SKL-0017, PAT-0166]
dependencies: []
synonyms: ["how to audit my site for accessibility", "how to test with a screen reader", "what is WCAG compliance", "how to automate accessibility checks", "how to fix accessibility issues", "what does WCAG 2.1 AA mean"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/pa11y/pa11y"
difficulty: intermediate
owner: "cortex"
pillar: "ux-design"
---

# Skill: Accessibility Audit

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0326 |
| **Name** | Accessibility Audit |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

An accessibility audit evaluates your product against the Web Content Accessibility Guidelines (WCAG). WCAG 2.1 Level AA is the standard legal and ethical baseline. Automated tools catch about 30-40% of issues; the rest require manual testing. Both are necessary.

### WCAG 2.1 AA Quick Reference

WCAG is organized around four principles (POUR):

| Principle | Meaning | Key Checks |
|-----------|---------|-----------|
| **Perceivable** | Users can perceive the content | Alt text, captions, color contrast, text resize |
| **Operable** | Users can operate the interface | Keyboard access, focus order, no time traps, skip links |
| **Understandable** | Users can understand content and UI | Clear labels, error identification, consistent navigation |
| **Robust** | Content works with assistive technology | Valid HTML, ARIA roles, name/role/value exposed |

### Automated Testing

Automated tools scan for programmatically detectable issues. Run them early and often:

**Pa11y** (CLI and CI integration):
```bash
# Test a single URL
npx pa11y https://your-site.com

# Test with WCAG 2.1 AA standard
npx pa11y --standard WCAG2AA https://your-site.com

# CI integration: test multiple URLs
npx pa11y-ci --config .pa11yci.json
```

**Other automated tools**: axe-core (browser extension and library), Lighthouse accessibility audit, WAVE (web evaluator). Use at least two tools as each catches different issues.

**What automated tools catch**: missing alt text, insufficient color contrast, missing form labels, invalid ARIA attributes, heading hierarchy violations, missing document language.

**What they miss**: meaningful alt text quality, logical reading order, keyboard trap behavior, screen reader announcement quality, cognitive load issues.

### Manual Testing Checklist

These checks require a human evaluator:

1. **Keyboard navigation**: Tab through the entire page. Can you reach and operate every interactive element? Is the focus order logical? Are there any keyboard traps?
2. **Screen reader**: Navigate with VoiceOver (Mac), NVDA (Windows), or TalkBack (Android). Are all elements announced correctly? Do dynamic updates (toasts, modals) announce to screen readers?
3. **Zoom testing**: Zoom to 200% in the browser. Does content remain readable and usable without horizontal scrolling?
4. **Color only**: View the page in grayscale. Is any information conveyed solely through color?
5. **Reduced motion**: Enable `prefers-reduced-motion` in OS settings. Do animations respect this preference?
6. **Form testing**: Submit forms with errors. Are errors announced, specific, and linked to their fields?

### Severity Classification

| Severity | Definition | WCAG Level | Example |
|----------|-----------|------------|---------|
| **Critical** | Blocks access entirely | A | No keyboard access to primary navigation |
| **Major** | Significant barrier, workaround possible | A/AA | Images without alt text, form without labels |
| **Moderate** | Inconvenient but usable | AA | Low contrast on secondary text, missing skip link |
| **Minor** | Best practice, not a barrier | AAA | Decorative image with non-empty alt text |

### Remediation Priority

Fix issues in this order:
1. Critical and Major issues on primary user flows (login, signup, checkout)
2. Critical and Major issues on secondary flows
3. Moderate issues across all flows
4. Minor issues and AAA enhancements

### Audit Report Structure

- **Scope**: Pages and flows tested, tools used, assistive technology versions
- **Summary**: Total issues by severity, overall compliance level
- **Issue list**: Each issue with screenshot, WCAG criterion violated, impact description, and remediation guidance
- **Positive findings**: What is already working well

## Key Takeaways

- Automated tools catch 30-40% of issues; manual testing with keyboard and screen reader is essential
- WCAG 2.1 Level AA is the baseline standard; focus on the POUR principles
- Test primary user flows first: login, signup, checkout, and core tasks
- Fix critical and major issues on primary flows before addressing minor issues elsewhere
- Run automated checks in CI to prevent regressions after remediation
