---
id: SKL-0230
name: Market Entry Strategy
category: skills
tags: [go-to-market, market-entry, launch-strategy, channel-strategy, gtm-planning, expansion]
capabilities: [gtm-plan-creation, channel-strategy-design, launch-sequence-planning, market-entry-evaluation]
useWhen:
  - planning how to enter a new market or geography
  - designing a go-to-market strategy for a new product
  - choosing distribution channels for launch
  - sequencing a phased market entry
  - evaluating build vs. partner vs. acquire for market access
estimatedTokens: 650
relatedFragments: [SKL-0225, SKL-0227, PAT-0117]
dependencies: []
synonyms: ["how to enter a new market", "go-to-market strategy template", "how to plan a product launch", "channel strategy framework", "market entry planning", "how to sequence a GTM launch"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/erpnext"
difficulty: advanced
owner: "cortex"
pillar: "market-research"
---

# Skill: Market Entry Strategy

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0230 |
| **Name** | Market Entry Strategy |
| **Category** | Skills |
| **Complexity** | Advanced |

## Core Concepts

Market entry strategy answers three questions: where to play, how to win, and in what sequence. ERPNext demonstrates this through its own expansion approach: an open-source ERP that entered the enterprise market dominated by SAP and Oracle by targeting underserved small-to-mid businesses in emerging markets first, then expanding upward. Your entry strategy should be equally deliberate.

### The Entry Strategy Framework

**1. Market Selection (Where to Play)**
Score potential markets on four dimensions:
- **Size** — Total addressable market (TAM) and serviceable addressable market (SAM).
- **Growth** — Is the market expanding, stable, or contracting?
- **Accessibility** — Can you reach buyers through available channels? ERPNext leveraged open-source community distribution, bypassing expensive enterprise sales.
- **Fit** — Does your product solve a top-3 pain point for this market? Not a nice-to-have, but a must-have.

Rank markets by (Size x Growth x Accessibility x Fit). Enter the highest-scoring market first.

**2. Entry Mode (How to Win)**

| Mode | When to Use | Risk | Speed |
|------|------------|------|-------|
| **Direct** (self-built sales/marketing) | You have capital and the market rewards brand ownership | High | Slow |
| **Partnership** (resellers, integrators) | Market requires local expertise or trust | Medium | Medium |
| **Platform** (marketplace, ecosystem) | Buyers already shop in an established marketplace | Low | Fast |
| **Community** (open-source, freemium) | Product benefits from network effects and developer adoption | Low | Variable |

ERPNext uses community + managed cloud (Frappe Cloud) as a dual-channel approach: open-source builds trust and adoption, managed hosting captures revenue.

**3. Channel Strategy**
Map your channels to the buyer journey:
- **Awareness channels:** Content marketing, SEO, community, partnerships, events.
- **Evaluation channels:** Free tier, documentation, demos, case studies.
- **Conversion channels:** Self-serve signup, sales calls, partner referrals.
- **Expansion channels:** In-product upsells, customer success, marketplace.

For each channel, define: cost per acquisition, time to first customer, and scalability ceiling.

**4. Launch Sequencing**
Phase your entry to manage risk and learn fast:

- **Phase 1 — Beachhead (Months 1-3).** Enter one narrow segment. ERPNext started with Indian SMBs using manufacturing modules. Your beachhead should be the segment where you have the strongest product-market fit.
- **Phase 2 — Expand (Months 4-9).** Add adjacent segments or geographies. ERPNext expanded to education, healthcare, and non-profit verticals.
- **Phase 3 — Scale (Months 10+).** Invest in the channels that proved highest ROI. Add enterprise features, localization (ERPNext supports multi-currency, regional tax compliance), and partnerships.

### Decision Gate: Enter or Wait?

Before committing, pass these gates:
1. Can you articulate a differentiated position (SKL-0225) in this market?
2. Do Five Forces (SKL-0227) show the industry structure supports profitable entry?
3. Do you have a credible path to 100 paying customers in the beachhead segment?

If any answer is no, iterate on strategy before committing resources.

## Key Takeaways

- Enter the market where (Size x Growth x Accessibility x Product Fit) is highest. Do not default to the largest market.
- Choose an entry mode that matches your resources. Community/platform is lower risk; direct is higher control.
- Sequence the launch in phases: beachhead first, then expand, then scale. Each phase validates the next.
- Define cost per acquisition, time to first customer, and scalability ceiling for every channel before committing budget.
- Use a decision gate (positioning, industry structure, path to 100 customers) to avoid premature market entry.
