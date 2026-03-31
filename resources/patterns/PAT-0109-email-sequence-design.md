---
id: PAT-0109
name: Email Sequence Design
category: patterns
tags: [email-sequences, drip-campaigns, A/B-testing, engagement, segmentation, copywriting]
capabilities: [sequence-architecture, engagement-branching, template-design, performance-optimization]
useWhen:
  - designing a multi-step email drip campaign
  - A/B testing subject lines or email content
  - building engagement-based branching logic
  - optimizing email deliverability and open rates
  - creating templates for repeatable email sequences
estimatedTokens: 650
relatedFragments: [SKL-0205, PAT-0107, SKL-0207]
dependencies: []
synonyms: ["how to design a drip campaign", "email A/B testing best practices", "engagement-based email branching", "how to improve email open rates", "drip sequence template design", "email nurture campaign structure"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/knadh/listmonk"
difficulty: beginner
owner: "cortex"
pillar: "sales"
---

# Pattern: Email Sequence Design

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0109 |
| **Name** | Email Sequence Design |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

An email sequence is a series of pre-written messages sent automatically based on triggers, timing, or recipient behavior. Unlike one-off blasts, sequences build a narrative over time, moving recipients from awareness to action. Listmonk demonstrates the infrastructure side: multi-threaded delivery, SQL-based segmentation, and template engines. This pattern covers the design side.

### Sequence Architecture

Every effective sequence has three structural elements:

1. **Entry trigger** -- What enrolls someone: form submission, deal stage change, content download, trial signup
2. **Message cadence** -- Timing between emails, typically 2-4 days apart for sales sequences, 5-7 days for nurture
3. **Exit condition** -- What removes someone: reply received, meeting booked, unsubscribe, sequence completion

### The Five-Email Framework

A versatile structure that works for most sales and nurture sequences:

| Email | Timing | Purpose | Focus |
|-------|--------|---------|-------|
| 1 | Day 0 | Introduce and hook | Lead with their pain point, not your product |
| 2 | Day 3 | Add value | Share a relevant insight, case study, or resource |
| 3 | Day 7 | Social proof | Customer story or metric that matches their situation |
| 4 | Day 12 | Direct ask | Clear CTA: book a call, start a trial, reply with questions |
| 5 | Day 18 | Breakup | Acknowledge silence, leave the door open, suggest next step |

### Engagement-Based Branching

Static sequences treat every recipient the same. Smarter sequences adapt based on behavior:

- **Opened but did not click** -- Send a follow-up with a different CTA or simplified message
- **Clicked but did not convert** -- Send deeper content (demo video, detailed case study)
- **No opens after 2 emails** -- Switch subject line approach or channel (LinkedIn, phone)
- **Replied** -- Remove from automation, hand to a human immediately

Listmonk's SQL-based subscriber segmentation enables this kind of granular targeting: query engagement data to build dynamic segments that feed into the right branch.

### A/B Testing

Test one variable at a time for clean results:

| Variable | What to Test | Sample Size |
|----------|-------------|-------------|
| Subject line | Curiosity vs. direct, short vs. long | 100+ per variant |
| Send time | Morning vs. afternoon, weekday vs. weekend | 200+ per variant |
| CTA | Button vs. text link, specific vs. generic | 100+ per variant |
| Email length | Short (50 words) vs. medium (150 words) | 100+ per variant |

Run tests for at least 2-3 sends before drawing conclusions. Listmonk's campaign analytics with bounce tracking and link performance provide the data needed to evaluate results.

### Deliverability Hygiene

Great content means nothing if it lands in spam. Maintain deliverability with:
- Warm up new sending domains gradually (50 emails/day, increasing over 2-4 weeks)
- Clean your list monthly: remove hard bounces, suppress 90-day inactive contacts
- Use rate limiting (listmonk's sliding window controls) to avoid triggering ISP throttling
- Authenticate with SPF, DKIM, and DMARC on every sending domain

## Key Takeaways

- Structure every sequence with a clear entry trigger, message cadence, and exit condition
- Use the five-email framework as a starting template and customize per audience
- Branch sequences based on engagement signals rather than sending the same path to everyone
- A/B test one variable at a time with sufficient sample sizes before optimizing
- Maintain deliverability hygiene: domain warm-up, list cleaning, authentication, and rate limiting
