---
id: PAT-0114
name: Research Data Collection
category: patterns
tags: [data-collection, survey-distribution, research-methods, data-quality, market-research, response-management]
capabilities: [survey-distribution, response-collection, data-quality-validation, sample-management]
useWhen:
  - collecting primary research data through surveys or interviews
  - managing response quality and completion rates
  - distributing surveys across multiple channels
  - validating research data before analysis
  - building a research pipeline for ongoing data collection
estimatedTokens: 650
relatedFragments: [SKL-0220, SKL-0219, PAT-0115]
dependencies: []
synonyms: ["how to collect survey responses", "research data quality checks", "survey distribution strategy", "how to get enough survey responses", "data collection best practices", "managing research data"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/formbricks/formbricks"
difficulty: beginner
owner: "cortex"
pillar: "market-research"
---

# Pattern: Research Data Collection

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0114 |
| **Name** | Research Data Collection |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Research data collection is the operational process of distributing surveys, gathering responses, and ensuring data quality. Formbricks demonstrates the modern approach: multi-channel distribution (in-app, website, link, email), behavioral triggers for survey timing, and user segmentation for targeting. This pattern covers the practical workflow from distribution to clean data.

### Distribution Channel Selection

| Channel | Response Rate | Quality | Best For |
|---------|-------------|---------|----------|
| **In-app (behavioral trigger)** | 15-30% | High (contextual) | Active users, feature feedback |
| **In-app (on-page)** | 5-15% | Medium-High | Website visitors, page-specific questions |
| **Email (to customers)** | 10-20% | Medium | Satisfaction surveys, churned user research |
| **Email (to prospects)** | 2-5% | Medium | Market research, pre-launch validation |
| **Link (social/community)** | 1-3% | Variable | Broad market research, competitor user research |
| **Incentivized panel** | 40-60% | Low-Medium | Large sample needs, statistical research |

### Timing and Triggering

Formbricks uses behavioral triggers to show surveys at the right moment:
- **After key actions**: Survey appears after a user completes onboarding, uses a feature, or hits a milestone.
- **After time-in-app**: Wait until the user has enough context (e.g., 5 minutes of usage).
- **On exit intent**: Capture feedback when a user is about to leave.
- **Periodic cadence**: NPS or satisfaction surveys every 90 days, not more frequently.

Rule: Never interrupt a user mid-task. Trigger surveys during natural transition points.

### Data Quality Checks

Before analyzing responses, apply quality filters:

1. **Completion filter**: Exclude responses where less than 80% of questions were answered.
2. **Speed filter**: Remove responses completed in under 30% of the median time (likely bots or random clicking).
3. **Consistency check**: For surveys with reverse-coded items, flag respondents who gave identical ratings across all items.
4. **Open-text validation**: Check that open-ended responses contain actual content, not gibberish or single-character answers.
5. **Duplicate detection**: Remove duplicate submissions from the same user or IP.

### Sample Management

Track collection progress against targets:

```
Target: 200 responses from enterprise segment
Channel 1 (in-app): 80 sent, 18 completed (22.5% rate)
Channel 2 (email): 500 sent, 45 completed (9% rate)
Channel 3 (link): 1200 views, 12 completed (1% rate)
Total: 75/200 (37.5% of target)
Estimated sends needed: 1400 more across channels
```

Adjust distribution strategy when a channel underperforms. Add channels rather than over-surveying a single audience.

### Response Storage and Privacy

- Store raw responses in a structured format (JSON or database, not just spreadsheet).
- Separate personally identifiable information from response data.
- Include timestamps and channel source for every response.
- Apply data retention policies (delete raw data after analysis if not needed).
- Ensure GDPR/CCPA compliance: collect consent, provide deletion capability.

### Escalation Rules

- **Below 30% of target after 1 week**: Add a new distribution channel or increase incentives.
- **Response rate below 2% on any channel**: Review survey length, targeting, and subject line. Consider redesigning.
- **Data quality failures above 15%**: Investigate for bot traffic or panel quality issues.

## Key Takeaways

- Match distribution channel to context: in-app triggers produce the highest quality responses
- Never interrupt users mid-task; trigger surveys at natural transition points
- Apply quality filters before analysis: completion rate, speed, consistency, and duplicate checks
- Track collection progress against targets and adjust channels when underperforming
- Separate PII from response data and apply data retention policies
