---
id: SKL-0348
name: Favicon & Meta Tags
category: skills
tags: [favicon, meta-tags, open-graph, twitter-card, seo, manifest, social-sharing, head]
capabilities: [favicon-setup, open-graph-tags, twitter-cards, web-manifest, social-preview]
useWhen:
  - setting up favicons for a new web app
  - configuring Open Graph tags for social media sharing
  - creating Twitter/X card metadata
  - building a web app manifest for PWA support
  - ensuring link previews look correct on all platforms
estimatedTokens: 600
relatedFragments: [SKL-0013, SKL-0312, PAT-0048]
dependencies: []
synonyms: ["how to add a favicon", "social media preview image", "Open Graph tags setup", "Twitter card meta tags", "link preview not showing", "web app manifest"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# Favicon & Meta Tags

Favicons and meta tags are the first impression your app makes outside your app. They control how your site appears in browser tabs, bookmarks, search results, and social media shares.

## Favicon Setup (Complete Set)

```html
<head>
  <!-- Standard favicon -->
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

  <!-- Apple touch icon (180x180) -->
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <!-- Web app manifest -->
  <link rel="manifest" href="/site.webmanifest" />

  <!-- Theme color (browser chrome) -->
  <meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)" />
  <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
</head>
```

Favicon file checklist:
- `favicon.ico` (32x32) for legacy browsers
- `favicon.svg` for modern browsers (supports dark mode via CSS in SVG)
- `apple-touch-icon.png` (180x180) for iOS home screen
- `android-chrome-192.png` and `android-chrome-512.png` for Android

## Open Graph Tags (Facebook, LinkedIn, Slack)

```html
<meta property="og:title" content="Your App Name" />
<meta property="og:description" content="One-sentence value proposition" />
<meta property="og:image" content="https://yourapp.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://yourapp.com/page" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Your App" />
```

OG image rules:
- Dimensions: 1200x630px (1.91:1 ratio)
- Keep text large (readable at thumbnail size)
- Include your logo and a clear headline
- Use a solid or branded background, not a screenshot

## Twitter/X Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your App Name" />
<meta name="twitter:description" content="One-sentence value proposition" />
<meta name="twitter:image" content="https://yourapp.com/twitter-card.png" />
<meta name="twitter:site" content="@yourhandle" />
```

- Use `summary_large_image` for most pages (large preview)
- Use `summary` for profile pages or articles (small square image)

## Web App Manifest

```json
{
  "name": "Your App Name",
  "short_name": "App",
  "description": "One sentence",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1a1a2e",
  "icons": [
    { "src": "/android-chrome-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

## Essential SEO Meta Tags

```html
<title>Page Title — App Name</title>
<meta name="description" content="150-160 character description with primary keyword" />
<link rel="canonical" href="https://yourapp.com/page" />
<meta name="robots" content="index, follow" />
```

- Title format: `Page Title — App Name` (under 60 characters)
- Description: 150-160 characters, include primary keyword naturally
- Canonical URL prevents duplicate content issues

## Validation Tools

| Tool | Tests |
|------|-------|
| [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) | OG tags and image preview |
| [Twitter Card Validator](https://cards-dev.twitter.com/validator) | Twitter card rendering |
| [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) | LinkedIn preview |
| Browser DevTools | Favicon loading and meta tag presence |

## Key Takeaways

- SVG favicons are the modern standard; they support dark mode and scale perfectly
- OG images at 1200x630 work across all platforms
- Always validate social previews with platform debugging tools before launch
- The web manifest is required for "Add to Home Screen" on mobile
- Set `theme-color` with media queries to match both light and dark system themes
