---
id: PAT-0115
name: Competitive Intelligence Pattern
category: patterns
tags: [competitive-intelligence, market-research, competitor-monitoring, feature-tracking, positioning-matrix, strategic-analysis]
capabilities: [competitor-monitoring, feature-change-tracking, positioning-analysis, competitive-alerting]
useWhen:
  - setting up ongoing competitor monitoring for a product team
  - tracking competitor feature releases and positioning changes
  - building a competitive positioning matrix
  - preparing for board meetings or investor updates with competitive context
  - responding to a competitor's new feature or pricing change
estimatedTokens: 650
relatedFragments: [SKL-0217, SKL-0221, PAT-0116]
dependencies: []
synonyms: ["how to monitor competitors", "competitive intelligence system", "track competitor changes", "positioning matrix template", "how to stay ahead of competitors", "competitor feature tracking"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Pattern: Competitive Intelligence Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0115 |
| **Name** | Competitive Intelligence Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Competitive intelligence (CI) is the ongoing practice of monitoring, analyzing, and acting on competitor activity. Unlike one-time competitor analysis, CI is a continuous process. PostHog exemplifies this by operating in a crowded analytics market (Mixpanel, Amplitude, Heap, Google Analytics) and differentiating through an all-in-one, open-source positioning that responds to competitor limitations rather than copying features.

### The CI Collection Loop

Set up a repeatable monthly cycle:

**Week 1 - Collect**
- Monitor competitor changelogs, blogs, and release notes.
- Track pricing page changes (use a tool like Visualping or manual screenshots).
- Review competitor mentions on social media, Hacker News, and Reddit.
- Check job postings for signals about strategic direction (hiring ML engineers = AI features coming).
- Monitor GitHub activity for open-source competitors (commit frequency, new repos, contributor growth).

**Week 2 - Analyze**
- Update the feature comparison matrix with new capabilities.
- Note positioning shifts in messaging or target audience.
- Assess whether changes affect your differentiation.

**Week 3 - Synthesize**
- Write a one-page competitive brief for the product team.
- Flag anything requiring a strategic response.

**Week 4 - Act**
- Discuss findings in product planning.
- Update positioning or roadmap if needed.
- Archive the monthly brief for trend tracking.

### Feature Tracking System

Maintain a living document that tracks competitor capabilities:

| Feature Area | Your Product | Competitor A | Competitor B | Gap/Advantage |
|-------------|-------------|-------------|-------------|---------------|
| Core analytics | Full | Full | Partial | Parity |
| Session replay | Full | None | Full | Advantage vs A |
| Feature flags | Full | None | None | Unique advantage |
| Self-hosting | Yes | No | No | Differentiation |
| Pricing model | Usage-based | Per-seat | Per-event | Different model |

Update monthly. Track the *direction* of change, not just the snapshot. Is Competitor A investing heavily in session replay? That signals they will close your advantage within 6-12 months.

### Positioning Matrix

Build a 2x2 matrix using the two dimensions your market cares about most. For analytics tools:
- **X-axis**: Ease of use (self-serve to requires-analyst)
- **Y-axis**: Breadth of features (point solution to all-in-one platform)

Plot all competitors. Your strategic goal is to occupy an area with high customer demand and low competitor density. PostHog positioned in the "all-in-one + developer-friendly" quadrant, differentiating from point solutions (Hotjar for replays, LaunchDarkly for flags) and enterprise platforms (Amplitude, Mixpanel).

### Intelligence Sources by Quality

| Source | Signal Quality | Update Frequency |
|--------|---------------|-----------------|
| Product changelog/release notes | High (confirmed) | Weekly-Monthly |
| Pricing page | High (confirmed) | Quarterly |
| Job postings | Medium (directional) | Monthly |
| Blog/thought leadership | Medium (aspirational) | Weekly |
| Social media/community | Low-Medium (noisy) | Daily |
| Customer win/loss interviews | High (validated) | Ongoing |
| G2/Capterra reviews | Medium (lagging) | Quarterly |

Prioritize confirmed sources (changelog, pricing) over noisy sources (social media). Customer win/loss interviews are the highest-value CI source because they reveal why decisions were made.

### Response Framework

When a competitor makes a significant move:
1. **Assess impact**: Does this affect our current customers, prospects, or positioning?
2. **Classify urgency**: Urgent (losing deals now), Important (will affect us in 3-6 months), or Low (no material impact).
3. **Choose response**: Accelerate roadmap item, adjust messaging, update sales collateral, or deliberately do nothing.
4. **Communicate**: Brief sales team within 48 hours if the change is affecting deal conversations.

## Key Takeaways

- CI is a monthly cycle, not a one-time analysis: collect, analyze, synthesize, act
- Track the direction of competitor investment, not just current feature snapshots
- Customer win/loss interviews are the highest-quality competitive intelligence source
- Build a 2x2 positioning matrix on the two dimensions your market values most
- Not every competitor move requires a response; classify urgency before reacting
