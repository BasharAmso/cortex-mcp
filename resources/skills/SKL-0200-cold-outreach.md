---
id: SKL-0200
name: Cold Outreach
category: skills
tags: [cold-outreach, email-sequences, sales-emails, follow-up-cadence, personalization, outbound-sales]
capabilities: [email-sequence-design, outreach-personalization, follow-up-automation, cadence-planning]
useWhen:
  - designing cold email outreach campaigns
  - building email sequence automation tools
  - setting up follow-up cadence for outbound sales
  - personalizing outreach at scale
  - improving email open and reply rates
estimatedTokens: 650
relatedFragments: [SKL-0198, SKL-0199, PAT-0106, EX-0047]
dependencies: []
synonyms: ["how to write cold emails", "how to do cold outreach", "best cold email sequence", "how to follow up with prospects", "how to personalize sales emails", "building an outreach sequence"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/mautic/mautic"
difficulty: beginner
owner: "cortex"
pillar: "sales"
---

# Skill: Cold Outreach

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0200 |
| **Name** | Cold Outreach |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Cold outreach is the art of starting a conversation with someone who does not know you yet. Marketing automation platforms like Mautic enable this through email sequences, contact segmentation, and engagement tracking. The difference between spam and effective outreach is relevance, timing, and respect for the recipient's attention.

### Anatomy of a Cold Email

Every effective cold email has four components:

1. **Subject line:** Short (3-7 words), curiosity-driven, no clickbait. Personalization in the subject increases open rates by 20-30%.
2. **Opening line:** Reference something specific about the recipient (recent post, company news, mutual connection). Never start with "I" or your company name.
3. **Value proposition:** One sentence explaining what you can do for them, framed around their problem, not your product.
4. **Call to action:** A single, low-friction ask. "Worth a 15-minute call?" beats "Schedule a demo at your convenience."

### The Follow-Up Cadence

Most replies come from follow-ups, not the first email. A proven 5-touch cadence:

| Touch | Timing | Channel | Purpose |
|-------|--------|---------|---------|
| 1 | Day 0 | Email | Initial outreach |
| 2 | Day 3 | Email | Follow-up, add new angle |
| 3 | Day 7 | LinkedIn | Connect request with note |
| 4 | Day 12 | Email | Share relevant resource |
| 5 | Day 18 | Email | Breakup email ("closing the loop") |

The breakup email often gets the highest reply rate because it removes pressure.

### Personalization at Scale

True personalization goes beyond `{{firstName}}`. Effective personalization layers:

- **Company-level:** Reference their industry, recent funding, or product launch.
- **Role-level:** Speak to the specific challenges of their job title.
- **Individual-level:** Mention their content, conference talk, or career move.

Use segmentation in tools like Mautic to group contacts by attributes, then craft templates per segment rather than per individual.

### Automation Architecture

In Mautic's model, outreach automation works through:

1. **Segments:** Dynamic groups based on contact properties and behaviors.
2. **Campaigns:** Multi-step workflows with decision nodes (opened? clicked? replied?).
3. **Channels:** Email, SMS, web notifications, and social media touchpoints.
4. **Scoring integration:** Engagement with outreach feeds back into lead scores.

### Deliverability Essentials

Outreach that lands in spam is wasted effort:

- Warm up new sending domains gradually (start with 20 emails/day, scale over 2-3 weeks).
- Authenticate with SPF, DKIM, and DMARC.
- Keep bounce rate below 3% by verifying email addresses before sending.
- Monitor sender reputation scores and throttle if they drop.

## Key Takeaways

- Most replies come from follow-ups, not the first email; plan a 4-5 touch cadence.
- Personalize beyond first name; reference company context, role challenges, or individual activity.
- Keep emails short (under 120 words) with a single, low-friction call to action.
- Segment contacts and craft per-segment templates rather than one-size-fits-all blasts.
- Invest in deliverability (domain warmup, authentication, list hygiene) before scaling volume.
