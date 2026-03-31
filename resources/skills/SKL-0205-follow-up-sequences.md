---
id: SKL-0205
name: Follow-Up Sequences
category: skills
tags: [follow-up, cadence, email-automation, lead-nurturing, timing, personalization]
capabilities: [sequence-design, cadence-optimization, multi-channel-follow-up, engagement-tracking]
useWhen:
  - designing an automated follow-up cadence for leads
  - deciding timing and frequency for sales outreach
  - personalizing follow-up messages at scale
  - building a nurture sequence for prospects who are not ready to buy
  - improving response rates on outbound campaigns
estimatedTokens: 650
relatedFragments: [PAT-0109, SKL-0206, PAT-0107]
dependencies: []
synonyms: ["how many follow-ups should I send", "what is a good follow-up cadence", "how to automate sales follow-up", "when to stop following up", "how to personalize outreach at scale", "best timing for follow-up emails"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/mautic/mautic"
difficulty: beginner
owner: "cortex"
pillar: "sales"
---

# Skill: Follow-Up Sequences

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0205 |
| **Name** | Follow-Up Sequences |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Most sales are lost not because the prospect said no, but because the seller stopped following up. A structured follow-up sequence removes guesswork and ensures no lead falls through the cracks.

### The Anatomy of a Sequence

A follow-up sequence is a series of pre-planned touchpoints spread across days or weeks. Each touchpoint has a specific purpose: remind, add value, create urgency, or offer an alternative. Marketing automation platforms like Mautic enable unlimited segmentation and automation to execute these sequences across multiple channels without manual effort.

### Timing and Cadence

The standard B2B follow-up cadence follows a decaying interval pattern:

| Touch | Timing | Purpose |
|-------|--------|---------|
| 1 | Day 0 | Initial outreach or proposal sent |
| 2 | Day 2-3 | Quick check-in, add a relevant insight |
| 3 | Day 7 | New angle or value-add (case study, resource) |
| 4 | Day 14 | Direct question about timeline or blockers |
| 5 | Day 21 | Final value touch before break |
| 6 | Day 30+ | Re-engagement with fresh context |

Adjust intervals based on deal size. Enterprise deals tolerate longer gaps; SMB deals need faster cadences.

### Personalization at Scale

Segment your contacts using data you already have: industry, company size, role, previous engagement. Mautic's approach of SQL-expression-based segmentation shows the power of granular targeting. Even simple personalization (mentioning their company name, referencing a specific pain point from your last conversation) lifts response rates significantly compared to generic templates.

### Multi-Channel Layering

Do not rely on email alone. Layer in phone calls, LinkedIn messages, and direct mail across your sequence. A typical pattern: email on Day 0, phone on Day 3, LinkedIn on Day 7, email on Day 14. Multi-channel sequences outperform single-channel by reaching prospects where they are most responsive.

### When to Stop

Set a clear exit rule. After 5-7 touches with no engagement, move the contact to a long-term nurture list with monthly or quarterly check-ins. Continuing to hammer unresponsive prospects damages your sender reputation and wastes selling time.

## Key Takeaways

- Structure follow-ups as a planned sequence, not ad-hoc reminders
- Use decaying intervals: frequent early, wider gaps later
- Personalize using segmentation data, not just mail-merge fields
- Layer multiple channels across the sequence for higher reach
- Define a clear stop rule to protect reputation and focus effort
