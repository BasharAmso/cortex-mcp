---
id: SKL-0412
name: Browser Automation
category: skills
tags: [playwright, puppeteer, browser-automation, testing, screenshots, form-filling]
capabilities: [browser-control, automated-testing, screenshot-capture, form-interaction]
useWhen:
  - automating browser interactions for testing
  - filling forms and clicking buttons programmatically
  - capturing screenshots or PDFs of web pages
  - testing JavaScript-heavy web applications end-to-end
  - automating repetitive browser-based workflows
estimatedTokens: 650
relatedFragments: [SKL-0410, SKL-0414, PAT-0210, PAT-0211]
dependencies: []
synonyms: ["how to automate a browser", "Playwright tutorial", "Puppeteer guide", "automated form filling", "take screenshots programmatically", "end to end browser testing"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "automation"
---

# Skill: Browser Automation

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0412 |
| **Name** | Browser Automation |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Browser automation controls a real browser programmatically. It is used for end-to-end testing, web scraping of dynamic content, generating screenshots/PDFs, and automating repetitive web-based tasks.

### Tool Comparison

| Feature | Playwright | Puppeteer | Selenium |
|---------|-----------|-----------|----------|
| **Languages** | JS, Python, C#, Java | JS, Python | Many |
| **Browsers** | Chromium, Firefox, WebKit | Chromium, Firefox | All major |
| **Auto-wait** | Built-in | Manual | Manual |
| **Speed** | Fast | Fast | Slower |
| **Best for** | Testing + automation | Chrome-focused tasks | Legacy/cross-browser |

Playwright is the modern standard. It auto-waits for elements, supports multiple browser engines, and provides a test runner with built-in assertions.

### Core Operations

```javascript
const { chromium } = require('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();

// Navigate and interact
await page.goto('https://example.com/login');
await page.fill('#email', 'user@example.com');
await page.fill('#password', 'secret');
await page.click('button[type="submit"]');

// Wait for navigation and verify
await page.waitForURL('**/dashboard');
await page.screenshot({ path: 'dashboard.png', fullPage: true });

await browser.close();
```

### Selectors and Waiting

Use Playwright's auto-waiting: `page.click()` waits for the element to be visible and actionable. Prefer role-based selectors (`page.getByRole('button', { name: 'Submit' })`) over CSS selectors for resilient tests. Use `page.waitForResponse()` to wait for specific API calls to complete.

### Screenshots and PDFs

Capture full-page screenshots with `page.screenshot({ fullPage: true })`. Generate PDFs with `page.pdf()` (Chromium only). Set viewport size before capture for consistent results. Use `page.emulateMedia({ media: 'print' })` for print-styled PDFs.

### Testing Patterns

Run tests in parallel across browsers. Use `test.describe` for grouping. Isolate tests with fresh browser contexts (not just new pages). Use `page.route()` to mock API responses. Record traces with `trace.start()` for debugging failed tests.

## Key Takeaways

- Playwright is the modern standard with auto-waiting and multi-browser support
- Use role-based selectors over CSS selectors for resilient automation
- Set viewport dimensions for consistent screenshots and PDFs
- Mock API responses with `page.route()` for reliable testing
- Run tests in parallel with isolated browser contexts
