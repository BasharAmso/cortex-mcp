---
id: SKL-0196
name: Referral Programs
category: skills
tags: [referral, word-of-mouth, customer-acquisition, rewards, tracking, marketing-automation]
capabilities: [referral-tracking, reward-distribution, campaign-management, attribution-analysis]
useWhen:
  - building a refer-a-friend program for a small business
  - tracking which customers bring in new clients
  - designing reward structures that motivate referrals without eroding margins
  - automating referral reward distribution
  - measuring the ROI of referral programs versus paid acquisition
estimatedTokens: 650
relatedFragments: [PAT-0100, SKL-0191, PAT-0102]
dependencies: []
synonyms: ["how do I set up a referral program for my business", "what is the best way to track referral sources", "how to reward customers for referring friends", "how do I build a refer-a-friend system", "how to measure referral program effectiveness"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/mautic/mautic"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Skill: Referral Programs

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0196 |
| **Name** | Referral Programs |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Referral programs turn happy customers into a sales channel. They consistently deliver the lowest customer acquisition cost of any marketing method. Mautic's open-source marketing automation platform provides the infrastructure for tracking contacts, segmenting audiences, and running campaigns with "unlimited segmentation and automation" while maintaining full data ownership, which is critical for managing customer referral data responsibly.

### Referral Mechanics

A referral program needs three components: a unique referral identifier per customer, a tracking mechanism that connects new clients to their referrer, and a reward fulfillment process. The simplest implementation gives each existing customer a unique referral code or link. When a new customer signs up or makes a purchase using that code, the system attributes the acquisition to the referrer. Mautic's contact tracking and campaign automation handle this attribution chain, linking the new contact record to the referring contact's profile.

### Reward Structure Design

The reward structure determines whether your program drives action or gathers dust. Common models:

- **Two-sided rewards**: Both referrer and referee get something (most effective). Example: "Give $15, get $15" or "You both get a free session."
- **Tiered rewards**: Rewards increase with referral count. First referral earns a discount; fifth earns a free product. This gamifies the program and rewards your best advocates.
- **Points-based**: Each referral earns points redeemable from a reward catalog. Works well when combined with a loyalty program.

The critical constraint: your reward cost must stay below your customer acquisition cost from other channels. If paid ads cost $40 per customer, a $15 referral reward is a clear win.

### Tracking and Attribution

Accurate tracking prevents disputes and builds trust. Every referral event should log: the referrer's identity, the referee's identity, the date of referral, and the qualifying action (signup, first purchase, subscription). Mautic's campaign system and contact segmentation enable automated attribution. Create segments for "active referrers" and "referred customers" to analyze behavior differences. Referred customers typically have 25-30% higher lifetime value than other acquisition channels.

### Automated Campaign Flow

A referral campaign in Mautic follows this automation pattern:

1. **Trigger**: Customer completes their third purchase (proven satisfaction threshold)
2. **Invite**: Email with personal referral link and clear reward explanation
3. **Track**: Monitor link clicks and new signups attributed to that link
4. **Qualify**: When the referred friend completes the qualifying action, trigger reward processing
5. **Fulfill**: Automatically apply credit, send gift card, or notify staff to deliver physical reward
6. **Celebrate**: Send a thank-you message to the referrer acknowledging their contribution

### Avoiding Common Failures

Most referral programs fail for one of three reasons: the reward is not compelling enough, the referral process requires too many steps, or the program is invisible to customers. Make the referral link shareable in one tap. Display the program prominently in post-purchase emails, account dashboards, and receipts. Remind customers about the program quarterly, not just at launch.

## Key Takeaways

- Two-sided rewards (both referrer and referee benefit) consistently outperform one-sided models
- Keep referral reward cost below your paid acquisition cost per customer for positive ROI
- Automate the full cycle from invitation to reward fulfillment to reduce manual overhead
- Track attribution rigorously with unique referral codes linked to contact profiles
- Surface the program at natural touchpoints: post-purchase, receipts, and account pages
