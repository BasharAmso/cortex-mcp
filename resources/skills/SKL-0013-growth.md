---
id: SKL-0013
name: Growth & Distribution
category: skills
tags: [growth, landing-page, seo, waitlist, referral, marketing, conversion]
capabilities: [landing-page-design, seo-setup, waitlist-building, referral-mechanics, social-sharing]
useWhen:
  - building a landing page or marketing site
  - setting up SEO foundations (meta tags, sitemap, robots.txt)
  - implementing a waitlist or email capture flow
  - adding referral mechanics or social sharing features
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0012, SKL-0014]
dependencies: []
synonyms: ["build a landing page", "how do I get users", "set up a waitlist", "add referral system", "make my site show up on Google"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Growth & Distribution

Build growth infrastructure — landing pages, SEO, referral mechanics, waitlists, social sharing. Growth is infrastructure that compounds, not a campaign.

## Procedure

### 1. Extract Value Proposition

From the PRD, identify: who (target user), what problem, what the product does, why now.

Formula: "[Product] helps [user] [do X] so they can [outcome], without [pain]."

### 2. Landing Page Structure

Build sections in this high-converting order:

1. **Hero** — who + what + primary CTA (above fold)
2. **Problem** — amplify the pain, make the reader feel understood
3. **Solution** — how the product solves it (show, do not tell)
4. **Social proof** — quotes, logos, numbers
5. **Features** — 3 key capabilities with user benefits
6. **FAQ** — top 5 objections answered
7. **Final CTA** — same as hero

### 3. SEO Foundations

- SEO component on all public pages: title, description, OG tags, Twitter card, structured data
- `robots.txt` — allow public pages, disallow /api/ and /dashboard/
- `sitemap.xml` — auto-generated from pages
- Proper heading hierarchy (single H1, logical H2-H3 nesting)

### 4. Waitlist / Email Capture

- Validate email, check duplicates, generate referral code
- Send confirmation email with position and referral link
- Track `waitlist_joined` event
- Minimize form fields — email first, everything else later

### 5. Referral Mechanics (If Required)

- Reward both referrer and referee
- Trigger reward on activation (not signup) to prevent gaming
- Show referral count and progress toward reward

### 6. Social Sharing

- Native share sheet on mobile, clipboard fallback on web
- Direct links to major platforms (Twitter, LinkedIn, etc.)
- Pre-populated share text with value proposition

## Key Constraints

- Never write dishonest or misleading marketing copy
- Never use dark patterns (fake urgency, hidden costs, manipulative countdowns)
- Never block signup with excessive form fields
- Never ship a landing page without SEO metadata
- Always tie growth features to a measurable metric
