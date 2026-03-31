---
id: SKL-0306
name: Game Publishing
category: skills
tags: [game-dev, publishing, app-store, steam, itch-io, game-distribution]
capabilities: [store-submission, platform-requirements, release-planning, storefront-optimization, version-management]
useWhen:
  - preparing a game for release on a digital storefront
  - submitting a game to the App Store or Google Play
  - publishing a game on Steam or itch.io
  - understanding platform-specific requirements and review processes
  - planning a game launch timeline
estimatedTokens: 650
relatedFragments: [SKL-0307, SKL-0143, PAT-0158]
dependencies: []
synonyms: ["how to publish my game on Steam", "submitting a game to the App Store", "how to release a game on itch.io", "game store submission process", "what do I need to publish a mobile game", "game launch checklist"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicklockwood/iVersion"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Skill: Game Publishing

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0306 |
| **Name** | Game Publishing |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Publishing a game means navigating platform-specific requirements, review processes, and storefront optimization. Each platform has different rules, costs, and timelines. Plan for these early to avoid last-minute surprises.

### Platform Comparison

| Platform | Cost to Publish | Review Time | Revenue Split | Best For |
|----------|----------------|-------------|---------------|----------|
| **itch.io** | Free | None (instant) | You choose (0-100%) | Prototypes, game jams, indie releases |
| **Steam** | $100 per title | 2-5 business days | 70/30 (improves at volume) | PC/Mac/Linux games |
| **App Store (iOS)** | $99/year developer fee | 1-3 days (can be longer) | 70/30 (85/15 for small devs) | Mobile games, Apple platforms |
| **Google Play** | $25 one-time | Hours to 3 days | 70/30 (85/15 under $1M) | Android mobile games |
| **Web (self-hosted)** | Hosting cost only | None | 100% yours | Browser games, HTML5, Discord Activities |

### Submission Checklist by Platform

**itch.io (simplest path):**
1. Create an itch.io account and new project page
2. Upload your build (ZIP for desktop, HTML for web)
3. Write a description, add screenshots (3-5), set pricing
4. Tag your game with genre, tools used, and jam (if applicable)
5. Publish immediately or set a launch date

**Steam:**
1. Register as a Steamworks partner and pay the $100 app fee
2. Create a store page: description, screenshots (5+), trailer, capsule images
3. Configure build depots and upload via SteamPipe CLI
4. Complete the store page review checklist (content survey, pricing)
5. Submit for review. Use the "coming soon" page to build wishlists before launch
6. Schedule release date after review approval

**App Store (iOS):**
1. Enroll in the Apple Developer Program ($99/year)
2. Create an App Store Connect record with metadata, screenshots per device size, and privacy policy
3. Build with Xcode, archive, and upload via Transporter or Xcode
4. Submit for App Review. Common rejection reasons: crashes, broken links, misleading metadata, missing privacy labels
5. Prepare for human review of gameplay (provide a demo account if needed)

**Google Play:**
1. Register a Google Play Developer account ($25)
2. Create an app listing with descriptions, screenshots, and content rating questionnaire
3. Upload an AAB (Android App Bundle) via Play Console
4. Complete the Data Safety form (required since 2022)
5. Submit for review. Start with closed testing track before production release

### Storefront Optimization Tips

1. **Screenshots sell your game.** Show gameplay, not menus. First screenshot should show the core mechanic in action.
2. **Write for scanners.** Lead your description with a one-line hook, then 3-5 bullet features.
3. **Trailer under 60 seconds.** Show gameplay in the first 5 seconds. No slow logo intros.
4. **Tags and categories** drive discoverability. Use all available tag slots.
5. **Build wishlists early** (Steam). A "coming soon" page months before launch is standard practice.

### Version Management

After launch, keep your game updated with patch notes. Use semantic versioning (1.0.0, 1.0.1 for patches, 1.1.0 for features). Notify players of updates through in-game prompts or store update notes. Libraries like iVersion automate update detection and user notification on mobile platforms.

## Anti-Patterns

- Submitting to App Review with crashes or placeholder content (instant rejection)
- Skipping the "coming soon" phase on Steam (missed wishlist building)
- Publishing without screenshots or with menu-only screenshots
- Forgetting platform-specific requirements like privacy policies or data safety forms

## Key Takeaways

- Start with itch.io for fast, free publishing and iterate toward bigger platforms
- Budget 1-2 weeks for store setup and review before your target launch date
- Screenshots and trailers showing gameplay are the most important marketing assets
- Each platform has unique metadata, review, and compliance requirements
- Build wishlists and community before launch, not after
