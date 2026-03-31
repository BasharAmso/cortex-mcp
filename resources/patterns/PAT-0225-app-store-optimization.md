---
id: PAT-0225
name: App Store Optimization
category: patterns
tags: [aso, app-store, google-play, keywords, screenshots, ratings, mobile-marketing, discoverability]
capabilities: [keyword-optimization, screenshot-strategy, rating-management, listing-optimization]
useWhen:
  - preparing an app for App Store or Google Play submission
  - improving app discoverability and download conversion
  - optimizing app store listing screenshots and descriptions
  - planning a strategy for app ratings and reviews
  - A/B testing app store listing elements
estimatedTokens: 650
relatedFragments: [SKL-0438, SKL-0013, PAT-0222, SKL-0443]
dependencies: []
synonyms: ["app store optimization guide", "aso best practices", "improve app store ranking", "app store screenshots tips", "increase app downloads", "google play optimization"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: cortex
pillar: "platform"
---

# Pattern: App Store Optimization

Improving app discoverability, conversion rates, and ratings on the App Store and Google Play.

## The Problem

Building a great app is half the battle. If users can't find it or the listing doesn't convince them to download, the app fails regardless of quality. ASO (App Store Optimization) is the process of optimizing your store listing to rank higher in search and convert more visitors into downloads.

## Keyword Strategy

**App Store (iOS):** 100-character keyword field (comma-separated, no spaces after commas). Title (30 chars) and subtitle (30 chars) carry the most weight.

**Google Play:** No keyword field. Google indexes the title (30 chars), short description (80 chars), and full description (4000 chars). Repeat important keywords 3-5 times naturally in the description.

```
Title:      "Budgetly — Expense Tracker"
Subtitle:   "Budget Planner & Bill Reminder"   (iOS)
Keywords:   "budget,expense,tracker,spending,money,finance,bills,savings"  (iOS)
```

**Research approach:**
1. List 20-30 terms users would search for your app's core function
2. Check search volume and competition using App Annie, Sensor Tower, or AppFollow
3. Target medium-volume, low-competition keywords for new apps
4. Include common misspellings and synonyms in the keyword field
5. Avoid trademarked terms and competitor brand names

## Screenshot Strategy

Screenshots are the highest-impact conversion element. Most users decide within 3 seconds.

| Best Practice | Why |
|---------------|-----|
| Lead with the core value prop | First 2 screenshots visible without scrolling |
| Use device frames + captions | Explains the feature, not just shows it |
| Show real content, not placeholder data | Builds trust and sets expectations |
| Use 5-8 screenshots per platform | Covers key features without overwhelming |
| Create portrait AND landscape for iPad | Apple promotes apps that support both |

**Structure:** Each screenshot should answer "What can I do with this app?" — not "What does this app look like?"

Caption formula: **[Action verb] + [benefit]** — "Track spending in seconds", "Split bills with friends", "See where your money goes."

## App Description

**First 3 lines matter most** — they show before the "Read More" fold.

```
Structure:
Line 1: What the app does (one clear sentence)
Line 2: Key differentiator (why this over alternatives)
Line 3: Social proof or award (if available)

--- fold ---

Feature bullets (5-7 key features)
How it works (brief)
Pricing transparency (if freemium)
```

Avoid jargon. Write for the user, not for developers.

## Ratings and Reviews

Apps below 4.0 stars see significant conversion drops. Strategies:

- **In-app review prompt:** Use Apple's `SKStoreReviewController` or Google's In-App Review API. Trigger after a positive moment (completed a task, reached a milestone), not on first launch.
- **Timing:** Wait until the user has had 3-5 sessions or completed a key action.
- **Respond to reviews:** Both stores let you reply. Address negative reviews constructively — this shows up publicly and influences other users.
- **Fix bugs fast:** Negative reviews from bugs compound. A quick fix + response turns critics into advocates.

## A/B Testing

**Google Play:** Built-in store listing experiments for icon, screenshots, descriptions, and short description. Run tests for 7+ days with 50/50 splits.

**App Store:** Product page optimization supports up to 3 treatment variants for icon, screenshots, and preview videos. Requires iOS 15+.

Test one element at a time. Start with screenshots (highest impact), then icon, then description.

## Key Takeaways

- Screenshots are the highest-impact conversion element — lead with your core value prop
- Research keywords by search volume and competition, not assumptions
- Write the first 3 description lines for the fold — most users won't tap "Read More"
- Prompt for ratings after positive moments, never on first launch
- A/B test one listing element at a time starting with screenshots
