---
id: PAT-0053
name: Responsive Email
category: patterns
tags: [email, responsive-email, html-email, inline-styles, mjml, dark-mode-email, table-layout, transactional]
capabilities: [email-template-design, responsive-email-layout, email-dark-mode, image-fallback-handling]
useWhen:
  - building transactional or marketing email templates
  - making emails responsive across Outlook, Gmail, and Apple Mail
  - handling dark mode in email clients
  - designing email layouts that work without CSS support
  - optimizing email images and load times
estimatedTokens: 700
relatedFragments: [SKL-0005, SKL-0013, PAT-0052, PAT-0048]
dependencies: []
synonyms: ["how to build HTML emails", "responsive email template", "email that works in Outlook", "dark mode email design", "transactional email layout", "email coding best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/alexpate/awesome-design-systems"
difficulty: advanced
owner: builder
---

# Responsive Email

HTML email is a unique medium with severe constraints: table-based layout, inline styles, inconsistent CSS support, and dozens of rendering engines. Build for the worst client first (Outlook), then enhance.

## Base Template Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <style>
    body, table, td { margin: 0; padding: 0; }
    img { display: block; border: 0; }
    @media only screen and (max-width: 600px) {
      .wrapper { width: 100% !important; }
      .column { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding: 24px 16px;">
      <table role="presentation" class="wrapper" width="600"
             cellpadding="0" cellspacing="0"
             style="background-color:#ffffff; border-radius:8px;">
        <tr><td style="padding: 32px;">
          <!-- Content here -->
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
```

## Key Constraints

| Constraint | Rule |
|-----------|------|
| Layout | Tables only. No flexbox, no grid. |
| Styles | Inline on every element. `<style>` block for progressive enhancement only. |
| Width | 600px max. Use percentage widths inside. |
| Fonts | System fonts + web-safe fallbacks. Web fonts work in Apple Mail and iOS only. |
| Images | Always include width, height, and alt text. Assume images are blocked by default. |
| Links | Use absolute URLs. Relative paths break. |

## Multi-Column Layout

```html
<!-- Two-column (collapses to stacked on mobile) -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td class="column" width="50%" valign="top" style="padding: 0 8px;">
      <!-- Left column -->
    </td>
    <td class="column" width="50%" valign="top" style="padding: 0 8px;">
      <!-- Right column -->
    </td>
  </tr>
</table>
```

The `@media` query in the `<style>` block sets `.column` to `display: block; width: 100%` for stacking.

## Dark Mode in Email

Email dark mode is unpredictable. Clients handle it differently:

| Client | Behavior |
|--------|----------|
| Apple Mail | Respects `prefers-color-scheme` in `<style>` |
| Gmail (web) | Ignores dark mode meta tags entirely |
| Outlook.com | Auto-inverts light backgrounds and dark text |
| iOS Mail | Respects `color-scheme` meta tag |

Defensive strategy:

```css
@media (prefers-color-scheme: dark) {
  .email-body { background-color: #1a1a1a !important; }
  .email-text { color: #e0e0e0 !important; }
}
```

- Add `meta name="color-scheme" content="light dark"` in `<head>`
- Use transparent PNGs for logos (avoid white backgrounds that show as rectangles)
- Test images against both light and dark backgrounds
- Add a thin transparent border around logos to prevent auto-inversion

## Image Best Practices

| Rule | Detail |
|------|--------|
| Format | PNG for logos/icons, JPEG for photos, avoid SVG (poor support) |
| Retina | Serve 2x size, display at 1x with width/height attributes |
| Alt text | Descriptive alt on every image; emails often load with images off |
| Fallback | Design must be readable without any images loading |
| File size | Total email under 100KB (excluding images). Images under 200KB each. |
| Hosting | Absolute URLs on a reliable CDN |

## Button Pattern

```html
<!-- Bulletproof button (works in Outlook) -->
<table role="presentation" cellpadding="0" cellspacing="0">
  <tr>
    <td style="border-radius:6px; background-color:#2563eb;">
      <a href="https://example.com/action"
         style="display:inline-block; padding:12px 24px;
                color:#ffffff; text-decoration:none;
                font-family:Arial,sans-serif; font-size:16px;
                border-radius:6px;">
        Call to Action
      </a>
    </td>
  </tr>
</table>
```

## Testing Checklist

Test in Gmail (web/Android/iOS), Apple Mail, Outlook (desktop + web), dark mode on iOS Mail, with images disabled, and with a spam score checker.

## Anti-Patterns

- Using div-based layout (breaks in Outlook)
- CSS classes without inline style fallbacks
- Missing alt text on images
- Emails wider than 600px
- Background images without VML fallback for Outlook
- No plain-text version (hurts deliverability)
- Testing in only one email client
