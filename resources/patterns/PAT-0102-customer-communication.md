---
id: PAT-0102
name: Customer Communication Pattern
category: patterns
tags: [customer-communication, omnichannel, live-chat, messaging, canned-responses, conversation-routing]
capabilities: [omnichannel-messaging, conversation-management, response-automation, team-collaboration]
useWhen:
  - setting up unified customer communication across chat, email, and social media
  - building canned responses for frequently asked questions
  - implementing conversation routing to the right team member
  - managing customer conversations from multiple channels in one inbox
  - reducing response time without adding staff
estimatedTokens: 650
relatedFragments: [SKL-0195, SKL-0196, PAT-0103]
dependencies: []
synonyms: ["how do I manage customer messages from multiple channels", "what is the best way to set up live chat for my business", "how to create canned responses for common questions", "how do I route customer conversations to the right person", "how to reduce customer response time"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/chatwoot/chatwoot"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Pattern: Customer Communication Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0102 |
| **Name** | Customer Communication Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Small businesses lose customers not because of bad products but because messages go unanswered. Chatwoot's open-source platform centralizes conversations from "live chat on your website, email, Facebook, Instagram, Twitter, WhatsApp, Telegram, Line, SMS" into a single unified inbox. This omnichannel pattern means every customer message, regardless of where it originated, lands in one place for your team to handle.

### Omnichannel Inbox

The core pattern is channel aggregation. Instead of checking Facebook Messenger, then email, then WhatsApp, then your website chat widget separately, all conversations appear in one interface. Each conversation shows the channel it originated from, the customer's history across channels, and any custom attributes (like their order number or membership tier). Chatwoot's contact management ties interactions together so if a customer emails on Monday and chats on Wednesday, the agent sees both conversations on the same contact record.

### Conversation Routing

Not every team member should handle every type of question. Routing rules direct conversations to the right person:

- **Auto-assignment**: Round-robin distribution among available agents based on capacity management
- **Team-based routing**: Sales questions go to the sales team; support questions go to support
- **Label-based triage**: Incoming messages are tagged by topic (billing, shipping, returns) and routed accordingly
- **Escalation path**: If a conversation is unresolved after a set time, it escalates to a senior team member

Chatwoot supports agent capacity management to balance workload distribution, preventing one person from being overwhelmed while others sit idle.

### Canned Responses

Canned responses are pre-written answers for frequently asked questions. They are not chatbots; they are templates that agents select and personalize before sending. Effective canned responses cover:

- **Business hours and location**: "We are open Monday through Saturday, 9 AM to 6 PM at [address]."
- **Return policy**: "You can return items within 30 days with the original receipt. Here is how..."
- **Order status**: "I have pulled up your order. It is currently [status] and expected by [date]."
- **Pricing inquiries**: "Our [service] starts at [price]. Here is a link to our full pricing page..."

Build a library of 15-20 canned responses covering your most common questions. Review and update them monthly. The goal is consistency and speed, not robotic interactions. Agents should always personalize the greeting and closing.

### Business Hours and Auto-Responders

Set business hours in the system and configure auto-responders for after-hours messages. A good auto-responder acknowledges the message, sets expectations for response time, and offers self-service alternatives: "Thanks for reaching out. We have received your message and will respond within 4 business hours. In the meantime, you can check our FAQ at [link]." Chatwoot supports business hours configuration with automatic expectation management.

### Self-Service and AI Assistance

Before a message reaches a human, offer self-service options. Chatwoot's Captain AI agent can handle routine queries, reducing agent workload so staff focuses on complex issues. A help center portal provides searchable documentation for common questions. The escalation pattern: AI or self-service first, then human agent if unresolved. This reduces volume without frustrating customers who need human help, because the handoff to a human is always available.

### Proactive Communication

Do not wait for customers to report problems. Chatwoot supports campaigns for proactive customer engagement. Use these for: order delay notifications, service outage updates, seasonal promotions, or post-purchase check-ins. Proactive outreach reduces inbound support volume because customers who are informed do not need to ask.

## Key Takeaways

- Centralize all customer channels into a single inbox to prevent missed messages
- Route conversations by topic and team to ensure the right person responds
- Build a library of 15-20 canned responses for common questions and update them monthly
- Configure after-hours auto-responders that set expectations and offer self-service
- Use proactive communication for known issues to reduce inbound support volume
