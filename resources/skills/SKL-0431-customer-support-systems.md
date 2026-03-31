---
id: SKL-0431
name: Customer Support Systems
category: skills
tags: [customer-support, help-desk, knowledge-base, chatbot, sla-tracking, ticket-management]
capabilities: [support-system-design, knowledge-base-creation, chatbot-implementation, sla-management]
useWhen:
  - setting up customer support infrastructure for a product
  - choosing between help desk solutions
  - building a self-serve knowledge base
  - implementing chatbot or AI-assisted support
  - defining SLA targets and escalation paths
estimatedTokens: 650
relatedFragments: [SKL-0014, SKL-0426, SKL-0433, PAT-0219]
dependencies: []
synonyms: ["how to set up customer support", "how to build a help desk", "how to create a knowledge base", "how to implement a support chatbot", "what SLA targets should I set", "how to handle customer tickets"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/chatwoot/chatwoot"
difficulty: beginner
owner: "cortex"
pillar: "product-business"
---

# Skill: Customer Support Systems

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0431 |
| **Name** | Customer Support Systems |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Good support is a competitive advantage, especially for small teams. The goal is to resolve issues fast while reducing the volume of repetitive questions through self-serve resources.

### Support Channel Strategy

Start with fewer channels and do them well, rather than spreading thin across many.

| Channel | Best For | When to Add |
|---------|---------|-------------|
| **Email / ticket** | Async support, complex issues | Day 1 |
| **Knowledge base** | Self-serve answers to common questions | Day 1 |
| **In-app chat** | Real-time help, quick questions | After product-market fit |
| **Community forum** | Peer-to-peer help, feature requests | At scale |
| **Phone** | Enterprise, high-touch accounts | Enterprise tier only |

### Knowledge Base First

A good knowledge base deflects 30-50% of support volume. Structure it around user tasks, not product features.

**Good:** "How to export your data as CSV"
**Bad:** "Export API reference documentation"

Organize into categories that match user goals: Getting Started, Account Management, Billing, Troubleshooting. Include screenshots. Keep articles under 500 words. Update when features change.

### Ticket Management (Chatwoot Model)

Chatwoot demonstrates effective open-source help desk patterns:

1. **Unified inbox** — All channels (email, chat, social) flow into one queue
2. **Auto-assignment** — Route tickets by topic, language, or customer tier
3. **Canned responses** — Pre-written replies for frequent questions (not copy-paste; personalize the greeting)
4. **Labels and tags** — Categorize issues for reporting (bug, billing, feature request, how-to)
5. **SLA timers** — Visual countdown to first response and resolution deadlines

### SLA Targets by Tier

| Priority | First Response | Resolution | Example |
|----------|---------------|------------|---------|
| **Critical** | 1 hour | 4 hours | Cannot access account, data loss |
| **High** | 4 hours | 24 hours | Feature broken, payment failed |
| **Normal** | 24 hours | 3 business days | How-to question, minor bug |
| **Low** | 48 hours | 5 business days | Feature request, feedback |

### AI-Assisted Support

Before building a custom chatbot, consider simpler approaches:
- **Smart search** in your knowledge base (semantic, not just keyword)
- **Suggested articles** based on the user's message before they submit a ticket
- **Auto-categorization** of incoming tickets to speed routing
- **Draft responses** for agents to review and send (AI assists, human approves)

### Support Metrics to Track

| Metric | Target | Why It Matters |
|--------|--------|---------------|
| First response time | < 4 hours | Sets expectations |
| Resolution time | < 24 hours | Measures efficiency |
| CSAT score | > 85% | Measures quality |
| Ticket deflection | > 30% | Knowledge base effectiveness |
| Reopen rate | < 10% | First-contact resolution |

## Key Takeaways
- Start with email and a knowledge base before adding live chat
- Structure knowledge base articles around user tasks, not features
- Set SLA targets and track them from day one
- AI should assist agents, not replace human judgment for complex issues
- Track ticket deflection rate to measure self-serve effectiveness
