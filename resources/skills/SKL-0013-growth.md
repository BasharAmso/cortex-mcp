---
id: SKL-0013
name: Growth & Distribution
category: skills
tags: [growth, landing-page, seo, waitlist, referral, marketing, conversion, distribution, launch, indie-hacking]
capabilities: [landing-page-design, seo-setup, waitlist-building, referral-mechanics, social-sharing, launch-strategy]
useWhen:
  - building a landing page or marketing site
  - setting up SEO foundations (meta tags, sitemap, robots.txt)
  - implementing a waitlist or email capture flow
  - adding referral mechanics or social sharing features
  - planning a product launch or distribution strategy
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0012, SKL-0014]
dependencies: []
synonyms: ["build a landing page", "how do I get users", "set up a waitlist", "add referral system", "make my site show up on Google"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/btmills/awesome-growth-hacking"
difficulty: intermediate
---

# Growth & Distribution

Build growth infrastructure -- landing pages, SEO, referral mechanics, waitlists, social sharing. Growth is infrastructure that compounds, not a campaign. Grounded in growth hacking principles: rapid experimentation, data-driven decisions, and building distribution into the product itself.

## Growth Channel Selection

| Channel | Best for | Cost | Time to results |
|---------|----------|------|-----------------|
| SEO / Content | Products with search demand | Low | 3-6 months |
| Product Hunt / HN launch | Developer tools, SaaS | Free | Immediate spike |
| Referral program | Products with network effects | Low | 1-3 months |
| Email / waitlist | Pre-launch validation | Low | Weeks |
| Paid ads (Google, Meta) | Validated product, known CAC | High | Days |
| Community (Reddit, Discord) | Niche products | Free | 1-3 months |
| Partnerships / integrations | B2B, marketplace products | Medium | 1-6 months |

### Growth Experiment Process

1. **Hypothesis** -- "If we do X, metric Y will improve by Z%"
2. **Minimum viable test** -- smallest test that validates the hypothesis
3. **Measure** -- track the specific metric, not vanity numbers
4. **Decide** -- double down, iterate, or kill based on data
5. **Document** -- record what worked and what failed for future reference

## Procedure

### 1. Extract Value Proposition

From the PRD, identify: who (target user), what problem, what the product does, why now.

Formula: "[Product] helps [user] [do X] so they can [outcome], without [pain]."

### 2. Landing Page Structure

Build sections in this high-converting order:

1. **Hero** -- who + what + primary CTA (above fold)
2. **Problem** -- amplify the pain, make the reader feel understood
3. **Solution** -- how the product solves it (show, do not tell)
4. **Social proof** -- quotes, logos, numbers
5. **Features** -- 3 key capabilities with user benefits
6. **FAQ** -- top 5 objections answered
7. **Final CTA** -- same as hero

### 3. SEO Foundations

- SEO component on all public pages: title, description, OG tags, Twitter card, structured data
- `robots.txt` -- allow public pages, disallow /api/ and /dashboard/
- `sitemap.xml` -- auto-generated from pages
- Proper heading hierarchy (single H1, logical H2-H3 nesting)

### 4. Waitlist / Email Capture

- Validate email, check duplicates, generate referral code
- Send confirmation email with position and referral link
- Track `waitlist_joined` event
- Minimize form fields -- email first, everything else later

### 5. Referral Mechanics (If Required)

- Reward both referrer and referee (two-sided incentive)
- Trigger reward on activation (not signup) to prevent gaming
- Show referral count and progress toward reward

### 6. Launch Checklist

- [ ] Landing page live with SEO metadata
- [ ] Analytics instrumented for conversion funnel
- [ ] Email capture working and tested
- [ ] Social sharing with pre-populated text
- [ ] Submit to Product Hunt, Hacker News, or relevant communities

## Key Constraints

- Never write dishonest or misleading marketing copy
- Never use dark patterns (fake urgency, hidden costs, manipulative countdowns)
- Never block signup with excessive form fields
- Never ship a landing page without SEO metadata
- Always tie growth features to a measurable metric
