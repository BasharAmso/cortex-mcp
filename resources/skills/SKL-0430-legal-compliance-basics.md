---
id: SKL-0430
name: Legal & Compliance Basics
category: skills
tags: [legal, compliance, gdpr, privacy-policy, terms-of-service, cookies]
capabilities: [privacy-compliance, terms-drafting, cookie-consent, regulatory-awareness]
useWhen:
  - launching a product that collects user data
  - adding a privacy policy or terms of service
  - implementing cookie consent banners
  - preparing for GDPR, CCPA, or other data privacy regulations
  - handling user data deletion requests
estimatedTokens: 650
relatedFragments: [SKL-0423, PAT-0220, SKL-0015, SKL-0034]
dependencies: []
synonyms: ["do I need a privacy policy", "how to add terms of service", "GDPR compliance for startups", "how to handle cookie consent", "what legal pages does my app need", "how to handle data deletion requests"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "product-business"
---

# Skill: Legal & Compliance Basics

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0430 |
| **Name** | Legal & Compliance Basics |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Every product that collects user data needs basic legal coverage. You do not need a lawyer on day one, but you do need the essentials in place before launch. This is not legal advice; it is a practical checklist for getting started.

### Required Legal Pages

| Page | Purpose | When Required |
|------|---------|--------------|
| **Privacy Policy** | Explains what data you collect, why, and how | Always (required by app stores, GDPR, CCPA) |
| **Terms of Service** | Defines the rules of using your product | Always |
| **Cookie Policy** | Explains cookie usage and tracking | If you use cookies or analytics |
| **Acceptable Use Policy** | Defines prohibited behavior | If users create content or interact |

### Privacy Policy Essentials

Your privacy policy must clearly state:
1. **What data you collect** (email, name, usage analytics, payment info)
2. **Why you collect it** (to provide the service, improve the product, communicate)
3. **How you store and protect it** (encryption, access controls)
4. **Who you share it with** (analytics providers, payment processors)
5. **How users can delete their data** (email request or self-serve)
6. **How long you retain data** (and what happens when they leave)

### GDPR Quick Compliance (EU Users)

| Requirement | Implementation |
|------------|---------------|
| **Consent** | Opt-in (not pre-checked) for marketing and non-essential cookies |
| **Right to access** | Users can request a copy of their data |
| **Right to deletion** | Users can request complete data removal |
| **Data portability** | Users can export their data in a standard format |
| **Breach notification** | Notify authorities within 72 hours of a data breach |
| **Privacy by default** | Minimal data collection, strongest privacy settings by default |

### Cookie Consent Implementation

- Show a consent banner before setting non-essential cookies
- Provide granular options: necessary, analytics, marketing
- Remember the choice (ironically, using a cookie)
- Do not load tracking scripts until consent is given
- "Reject all" must be as easy as "Accept all"

### CCPA Quick Compliance (California Users)

- Add a "Do Not Sell My Personal Information" link
- Disclose data collection categories in the privacy policy
- Honor opt-out requests within 15 business days
- Applies to businesses with > $25M revenue, > 50K users, or > 50% revenue from data sales

### Practical Approach for Startups

1. Use a generator (Termly, iubenda, or Privacy Policy Generator) for the first draft
2. Customize it to accurately reflect your data practices
3. Link to legal pages from the footer and signup flow
4. Implement a data deletion endpoint or process
5. Review and update when you add new data collection or third-party services
6. Get a lawyer to review before scaling

## Key Takeaways
- Privacy policy and terms of service are required before launch, not optional
- GDPR requires opt-in consent, not opt-out
- Cookie consent must offer a real "reject" option, not just "accept"
- Build a data deletion process from the start (it is harder to add later)
- Use generators for v1, but get legal review before scaling
