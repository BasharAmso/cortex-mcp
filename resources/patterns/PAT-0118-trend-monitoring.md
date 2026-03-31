---
id: PAT-0118
name: Trend Monitoring Pattern
category: patterns
tags: [trend-monitoring, signal-detection, market-trends, data-aggregation, competitive-intelligence, early-warning]
capabilities: [data-source-aggregation, signal-detection, trend-scoring, early-warning-setup]
useWhen:
  - setting up a system to monitor market or industry trends
  - detecting early signals of competitive shifts
  - aggregating data from multiple sources into a trend report
  - deciding which trends are worth acting on versus noise
  - building a competitive intelligence dashboard
estimatedTokens: 650
relatedFragments: [SKL-0227, PAT-0117, PAT-0119]
dependencies: []
synonyms: ["how to monitor market trends", "how to detect industry changes early", "trend analysis framework", "competitive intelligence setup", "how to separate signal from noise", "market monitoring system"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/plausible/analytics"
difficulty: beginner
owner: "cortex"
pillar: "market-research"
---

# Pattern: Trend Monitoring Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0118 |
| **Name** | Trend Monitoring Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Trend monitoring is the discipline of detecting meaningful changes in your market before they become obvious. Plausible Analytics demonstrates core principles: privacy-focused tracking, real-time dashboards, goal/conversion monitoring, and automated reporting via email and Slack. Apply these same principles to market-level monitoring, not just website traffic.

### Data Source Aggregation

Set up a monitoring stack with three layers of data sources:

**Layer 1 — Quantitative Signals (Automated)**
- **Web analytics** — Traffic trends, referral sources, search keyword shifts. Plausible tracks UTM parameters and search console data to attribute traffic to campaigns and organic trends.
- **Product analytics** — Feature adoption rates, activation trends, usage pattern changes.
- **Market data** — Competitor pricing changes, job postings (hiring signals), funding rounds, app store rankings.
- **Search trends** — Google Trends for category terms, rising queries in your domain.

**Layer 2 — Qualitative Signals (Semi-Automated)**
- **Community monitoring** — Reddit, Hacker News, Twitter/X, industry Slack/Discord channels.
- **Review sites** — G2, Capterra, Product Hunt launches in your category.
- **Industry publications** — Newsletters, analyst reports, conference talk topics.

**Layer 3 — Direct Signals (Manual)**
- **Customer conversations** — Recurring requests, complaints about competitors, mentions of alternatives.
- **Sales call patterns** — New objections, shifting evaluation criteria, new competitors in deals.

### Signal Detection Framework

Not every change is a trend. Apply the SIR filter:

- **Strength** — Is the signal appearing across multiple independent sources? A single blog post is noise; the same theme in 5+ sources is a signal.
- **Impact** — If this trend materializes, does it affect your core market, adjacent market, or irrelevant market?
- **Rate of change** — Is the signal accelerating, stable, or fading? Plausible's real-time dashboard approach applies here: check velocity, not just magnitude.

Score each detected signal: SIR = (Strength: 1-5) x (Impact: 1-5) x (Rate: 1-5). Signals scoring 50+ warrant investigation. Signals scoring 75+ warrant strategic response.

### Trend Scoring and Response

| Score | Classification | Action |
|-------|---------------|--------|
| 1-24 | Noise | Log and ignore |
| 25-49 | Weak signal | Monitor monthly |
| 50-74 | Emerging trend | Investigate: assign someone to research for one week |
| 75-100 | Strong trend | Strategic response: bring to leadership, allocate resources |
| 100+ | Market shift | Urgent: reassess positioning and roadmap |

### Automated Reporting

Plausible sends weekly/monthly email summaries and spike notifications. Build the same cadence for market monitoring:
- **Weekly digest** — Top 3 signals detected, scored and classified.
- **Monthly deep-dive** — Trend trajectories, new entrants, competitive moves.
- **Spike alerts** — Immediate notification when a signal crosses the 75+ threshold (competitor launch, regulatory change, viral discussion about your category).

### Implementation Checklist

1. List your 5-10 most important data sources across all three layers.
2. Set up automated collection where possible (RSS feeds, Google Alerts, social monitoring tools).
3. Designate a weekly 30-minute review to score new signals using the SIR framework.
4. Maintain a trend log (spreadsheet or dashboard) with signal, score, date detected, and current status.

## Key Takeaways

- Aggregate data across three layers: quantitative (automated), qualitative (semi-automated), and direct (manual conversations).
- Use the SIR filter (Strength x Impact x Rate) to separate signals from noise with a numeric score.
- Signals scoring 50+ warrant investigation; 75+ warrant strategic response.
- Automate weekly digests and spike alerts. Trend monitoring fails when it depends on someone remembering to check.
- A trend log with dates and scores lets you track whether signals are strengthening or fading over time.
