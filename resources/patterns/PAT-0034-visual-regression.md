---
id: PAT-0034
name: Visual Regression Testing
category: patterns
tags: [visual-regression, screenshot-testing, chromatic, percy, playwright, ui-testing, design-qa, pixel-diff, baseline]
capabilities: [visual-diff-setup, threshold-tuning, dynamic-content-handling]
useWhen:
  - adding visual regression tests to a UI project
  - choosing between Chromatic, Percy, or Playwright screenshots
  - dealing with false positives in screenshot comparisons
  - setting up visual testing in CI pipelines
  - catching unintended CSS or layout changes before shipping
estimatedTokens: 600
relatedFragments: [PAT-0005, SKL-0017, PAT-0033, SKL-0005]
dependencies: []
synonyms: ["how to catch visual bugs automatically", "screenshot testing setup", "my visual tests keep failing on fonts", "chromatic vs percy comparison", "how to test CSS changes automatically"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
sourceUrl: "https://github.com/goldbergyoni/javascript-testing-best-practices"
---

# Visual Regression Testing

Catch unintended visual changes before they ship to users. Following testing best practices, focus visual tests on critical pages and states, not every component.

## Tool Comparison

| Tool | Best For | Cost | How It Works |
|------|----------|------|-------------|
| **Playwright Screenshots** | Free, built-in | Free | Pixel diff against local baselines |
| **Chromatic** | Storybook projects | Free tier + paid | Cloud rendering, component-level |
| **Percy** | Cross-browser coverage | Paid | Cloud snapshots, DOM-based diff |
| **BackstopJS** | Simple page-level checks | Free | Puppeteer-based pixel diff |

**Start with Playwright screenshots.** Move to Chromatic/Percy when you need cross-browser coverage or team review workflows.

## Handling Dynamic Content

Dynamic content is the top source of false positives:

```typescript
test('dashboard visual check', async ({ page }) => {
  // Mask dynamic regions
  await expect(page).toHaveScreenshot('dashboard.png', {
    mask: [page.locator('.avatar'), page.locator('.timestamp')],
  });
  // Freeze animations
  await page.emulateMedia({ reducedMotion: 'reduce' });
  // Mock time-dependent data
  await page.clock.setFixedTime(new Date('2025-01-15T10:00:00'));
  // Wait for fonts and images
  await page.waitForLoadState('networkidle');
});
```

## Threshold Tuning

| Scenario | `maxDiffPixelRatio` | `threshold` |
|----------|---------------------|-------------|
| Pixel-perfect branding pages | 0.001 | 0.1 |
| General UI pages | 0.01 | 0.2 |
| Data-heavy dashboards | 0.03 | 0.3 |
| Pages with animation | 0.05 | 0.3 |

Start loose, then tighten as you stabilize baselines.

## CI Workflow

```yaml
visual-regression:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npx playwright install --with-deps chromium
    - run: npx playwright test --project=visual
    - name: Upload diff artifacts
      if: failure()
      uses: actions/upload-artifact@v4
      with:
        name: visual-diffs
        path: test-results/
```

## Updating Baselines

```bash
npx playwright test --update-snapshots
git add **/*.png
git commit -m "test: update visual baselines for redesign"
```

**Review screenshot diffs in PRs** -- GitHub renders PNG diffs side-by-side.

## Anti-Patterns

- Running visual tests on every component (test pages and critical states only)
- Committing baselines generated on different OS (Linux CI vs macOS local)
- Threshold set to zero (guarantees false positives)
- No font loading wait (inconsistent rendering each run)
- Skipping visual tests to unblock PRs instead of fixing root cause
