---
id: SKL-0229
name: Brand Perception Research
category: skills
tags: [brand-research, nps, sentiment-analysis, brand-tracking, customer-perception, brand-health]
capabilities: [nps-survey-design, brand-tracking-setup, sentiment-analysis-framework, perception-gap-identification]
useWhen:
  - measuring how customers perceive your brand versus competitors
  - setting up an NPS or brand tracking program
  - analyzing sentiment from reviews, support tickets, or social media
  - identifying gaps between intended brand positioning and actual perception
  - preparing a brand health report for stakeholders
estimatedTokens: 650
relatedFragments: [SKL-0224, SKL-0225, PAT-0119]
dependencies: []
synonyms: ["how to measure brand perception", "how to run an NPS survey", "brand tracking framework", "how to analyze customer sentiment", "what do customers think of my brand", "brand health metrics"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/formbricks/formbricks"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Skill: Brand Perception Research

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0229 |
| **Name** | Brand Perception Research |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Brand perception research measures the gap between how you intend to be seen and how customers actually see you. Formbricks demonstrates the tooling side of this: in-app surveys, targeted delivery, and multi-channel feedback collection. But the methodology matters more than the tool.

### The Three Measurement Pillars

**1. Net Promoter Score (NPS)**
The single question: "How likely are you to recommend [product] to a colleague?" (0-10 scale). Segment responses:
- **Promoters (9-10):** Loyal enthusiasts who drive referrals.
- **Passives (7-8):** Satisfied but vulnerable to competitor offers.
- **Detractors (0-6):** Unhappy users who can damage your brand.

NPS = % Promoters - % Detractors. The number itself matters less than the trend and the follow-up. Always pair the score question with an open-ended "Why did you give that score?" to capture the reasoning.

**Timing matters:** Formbricks enables triggering surveys based on user behavior. Trigger NPS after a value moment (completed a project, reached a milestone), not randomly. Post-value NPS scores are more reliable and actionable.

**2. Brand Attribute Tracking**
Define 5-7 attributes you want associated with your brand (e.g., "easy to use," "reliable," "innovative," "good value"). Survey customers quarterly:
- "Which of these words best describe [brand]?" (select all that apply)
- "Which of these words best describe [competitor]?"

Track the gap between your intended attributes and selected attributes over time. A persistent gap signals a positioning or product problem, not a marketing problem.

**3. Sentiment Analysis**
Mine unstructured feedback from support tickets, app store reviews, social media mentions, and community forums. Categorize sentiment by:
- **Topic** — What are they talking about? (pricing, UX, reliability, support)
- **Valence** — Positive, negative, or neutral?
- **Intensity** — Mild frustration vs. active churn risk?

Formbricks integrates with Slack, Notion, and Zapier, enabling automated routing of survey responses into analysis pipelines. Build a similar pipeline for all feedback channels.

### Designing the Research Program

1. **Baseline measurement.** Run NPS + brand attributes survey to establish starting scores.
2. **Continuous collection.** Embed in-app surveys at key touchpoints (post-onboarding, post-support interaction, post-purchase). Formbricks' targeting enables this without code changes.
3. **Quarterly deep-dive.** Combine NPS trends, attribute tracking, and sentiment analysis into a brand health report.
4. **Perception gap analysis.** Compare intended positioning (from SKL-0225) against actual attribute scores. Where gaps exceed 20 percentage points, investigate root causes.

### Common Pitfalls

- Survey fatigue: don't ask NPS every session. Once per quarter per user is sufficient.
- Ignoring passives: they represent your biggest conversion opportunity (to promoter) and risk (to detractor).
- Treating NPS as a KPI to optimize rather than a diagnostic to investigate.

## Key Takeaways

- NPS is a diagnostic tool, not a goal. The follow-up "why" question produces the actionable insights.
- Brand attribute tracking reveals perception gaps that NPS alone cannot detect.
- Trigger surveys after value moments, not at random intervals, for more reliable data.
- Mine unstructured feedback (support tickets, reviews) alongside structured surveys for a complete picture.
- Run perception gap analysis quarterly: compare intended positioning against actual customer perception.
