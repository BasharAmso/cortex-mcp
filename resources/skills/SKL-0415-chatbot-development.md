---
id: SKL-0415
name: Chatbot Development
category: skills
tags: [chatbot, intent-recognition, dialogue-flow, nlp, conversational-ai, bot-design]
capabilities: [intent-classification, dialogue-management, nlp-integration, conversation-design]
useWhen:
  - building a customer service chatbot
  - designing conversational flows for a bot
  - integrating NLP for intent recognition
  - handling multi-turn conversations with context
  - connecting a chatbot to messaging platforms
estimatedTokens: 650
relatedFragments: [SKL-0414, SKL-0009, PAT-0210, PAT-0212]
dependencies: []
synonyms: ["how to build a chatbot", "conversational AI tutorial", "intent recognition guide", "dialogue flow design", "how to integrate NLP in a bot", "chatbot for customer service"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "automation"
---

# Skill: Chatbot Development

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0415 |
| **Name** | Chatbot Development |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Chatbots range from simple rule-based responders to sophisticated LLM-powered agents. The key to a good chatbot is not the AI model but the conversation design: clear intents, graceful fallbacks, and knowing when to hand off to a human.

### Architecture Approaches

| Approach | Complexity | Best For |
|----------|-----------|----------|
| **Rule-based** | Low | FAQ bots, simple workflows |
| **Intent + Entities** | Medium | Structured tasks (booking, ordering) |
| **LLM-powered** | High | Open-ended conversation, complex queries |
| **Hybrid** | Medium-High | Structured flows with LLM fallback |

Rule-based bots use keyword matching and decision trees. Intent-based bots classify user messages into intents (e.g., "book_flight", "check_status") and extract entities (dates, names). LLM-powered bots use models like GPT or Claude for natural conversation.

### Conversation Design

Design conversations before writing code. Map out the happy path and every deviation: ambiguous input, out-of-scope requests, errors, and escalation to humans. Use a state machine to track conversation state. Keep bot responses concise (under 3 sentences). Always provide a way to reach a human.

```
User: "I want to return my order"
Bot:  Intent: return_order
      → Ask for order number
      → Validate order exists
      → Check return eligibility
      → Initiate return OR explain why not
      → Confirm and provide tracking
```

### Intent Recognition

For intent-based bots, train a classifier on labeled examples. Each intent needs 20-50 training phrases. Include entity annotations (dates, product names, amounts). Use confidence thresholds: if the top intent scores below 0.7, ask for clarification rather than guessing. For LLM-powered bots, define intents in the system prompt and use function calling for structured actions.

### Context Management

Multi-turn conversations require context. Store session state (current intent, collected entities, conversation history) in memory or a database. Set session timeouts (5-15 minutes of inactivity). Clear context when the user starts a new topic. For LLM-based bots, manage conversation history length to stay within token limits.

### Platform Integration

Connect to Slack, Discord, WhatsApp, or web chat via platform SDKs or webhook APIs. Normalize incoming messages across platforms (text, images, buttons). Use platform-specific features (Slack blocks, WhatsApp templates) for richer interactions.

## Key Takeaways

- Design the conversation flow before building the bot
- Set confidence thresholds and ask for clarification when uncertain
- Always provide a path to a human agent for unresolved issues
- Manage session state with clear timeouts and context resets
- Start with rule-based or intent-based, add LLM complexity only when needed
