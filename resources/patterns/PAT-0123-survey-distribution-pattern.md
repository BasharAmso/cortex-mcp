---
id: PAT-0123
name: Survey Distribution Pattern
category: patterns
tags: [survey-distribution, response-rates, sampling, multi-channel-surveys, survey-design, data-collection]
capabilities: [distribution-planning, response-rate-optimization, sampling-strategy, channel-selection]
useWhen:
  - planning how to distribute a survey to maximize response rate
  - choosing between in-app, email, link, and social survey distribution
  - determining sample size and sampling strategy for market research
  - diagnosing why a survey has low response rates
  - designing a multi-channel survey distribution plan
estimatedTokens: 650
relatedFragments: [SKL-0235, SKL-0236, PAT-0121]
dependencies: []
synonyms: ["how to get more survey responses", "survey distribution strategy", "how many survey responses do I need", "best way to send surveys", "how to improve survey response rates", "survey sampling methods"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/formbricks/formbricks"
difficulty: beginner
owner: "cortex"
pillar: "market-research"
---

# Pattern: Survey Distribution Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0123 |
| **Name** | Survey Distribution Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

A well-designed survey with poor distribution produces no insight. Distribution strategy determines who responds, how many respond, and whether the results are trustworthy. The goal is sufficient responses from representative participants, not maximum responses from whoever happens to see it.

### Channel Selection

Each distribution channel has distinct characteristics. Match channel to research goal:

| Channel | Best For | Typical Response Rate | Strengths | Weaknesses |
|---------|----------|----------------------|-----------|------------|
| **In-app survey** | Active user feedback, feature reactions | 10-30% | Contextual, high relevance, real-time | Only reaches current users |
| **Email** | Existing customer research, NPS, churn analysis | 5-15% | Targeted, personal, trackable | Deliverability issues, fatigue |
| **Link (shared)** | Broad market research, prospect feedback | 1-5% | Wide reach, easy to share | Self-selection bias, low conversion |
| **Social media** | Community sentiment, brand perception | 0.5-3% | Viral potential, diverse respondents | Heavy self-selection, low completion |
| **Embedded (website)** | Visitor intent, landing page feedback | 5-20% | Captures non-users, contextual | Interrupts browsing, completion varies |

Tools like Formbricks support all these channels from a single platform: in-app surveys with user targeting, link surveys for external distribution, and website-embedded surveys for visitor feedback.

### Sample Size Planning

Before distributing, determine how many responses you need:

**For quantitative surveys (measuring proportions):**
- 95% confidence, 5% margin of error: ~385 responses (for large populations)
- 95% confidence, 10% margin of error: ~97 responses
- Per meaningful subgroup you want to analyze separately: minimum 30 responses

**For qualitative surveys (open-ended exploration):**
- Thematic saturation typically occurs at 15-30 responses
- Diminishing returns beyond 50 for open-text analysis

**Back-calculate your distribution volume:**
If you need 400 responses and expect a 10% response rate, distribute to 4,000 people minimum. Always over-distribute by 20-30% to account for incomplete responses.

### Response Rate Optimization

**Survey design factors:**
- Keep it under 5 minutes (completion rate drops 15-20% for every additional minute past 5).
- Show a progress bar (reduces abandonment by up to 10%).
- Mobile-optimize (40-60% of responses come from mobile devices).
- Front-load easy questions, place sensitive questions in the middle.

**Distribution factors:**
- **Timing matters.** B2B: Tuesday-Thursday, 10am-2pm local time. B2C: evenings and weekends perform better.
- **Personalize the invitation.** Use the recipient's name and explain why their specific input matters.
- **Send reminders.** One reminder 3-5 days after initial send typically captures 30-40% additional responses.
- **Offer appropriate incentives.** Small incentives (gift cards, charity donations) increase response rates without attracting mercenary respondents. Match incentive to audience: developers prefer no incentive over a $5 Amazon card; consumers respond to tangibles.

**Targeting factors:**
- Use behavioral targeting for in-app surveys: trigger after specific actions (completed onboarding, used feature X, visited pricing page) rather than showing to all users.
- Segment email lists by relevance: only send product feedback surveys to active users, not your entire mailing list.

### Avoiding Bias

| Bias Type | Cause | Mitigation |
|-----------|-------|------------|
| **Self-selection** | Only motivated people respond | Reminder sequences, incentives, mandatory sampling |
| **Non-response** | Certain segments ignore surveys | Compare respondent demographics to known population; weight results |
| **Social desirability** | People answer how they think they should | Anonymity assurance, indirect questions, behavioral questions over opinion questions |
| **Recency** | Recent experiences dominate recall | Specify time windows ("In the past 30 days...") |

### Common Pitfalls

- Distributing broadly without a sampling plan (quantity without representativeness is misleading).
- Sending surveys at the wrong time (Friday afternoon email surveys get the lowest response rates).
- No reminders (single-send campaigns leave 30-40% of potential responses on the table).
- Identical distribution for different research goals (in-app surveys for non-users, or link surveys for power-user behavior).

## Key Takeaways

- Match distribution channel to research goal: in-app for active users, email for customers, links for broad market
- Back-calculate distribution volume from required sample size and expected response rate
- Keep surveys under 5 minutes and send one reminder 3-5 days after initial distribution
- Use behavioral targeting for in-app surveys to reach users at the right moment
- Compare respondent demographics against your target population to detect and correct for non-response bias
