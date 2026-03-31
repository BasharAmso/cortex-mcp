---
id: PAT-0098
name: Notification Pipeline Pattern
category: patterns
tags: [notifications, multi-channel, sms, email, push, templating]
capabilities: [multi-channel-delivery, notification-templating, delivery-tracking, subscriber-preferences]
useWhen:
  - building a notification system that sends via email, SMS, and push
  - designing notification templates with channel-specific formatting
  - implementing subscriber notification preferences
  - batching or digesting multiple notifications into one message
  - tracking notification delivery status across channels
estimatedTokens: 650
relatedFragments: [SKL-0188, SKL-0186, PAT-0099]
dependencies: []
synonyms: ["how to send notifications to customers", "multi-channel notification system", "how to send SMS and email from my app", "notification template design", "how to let users control their notification preferences"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/novuhq/novu"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Pattern: Notification Pipeline

A notification pipeline routes messages through the right channel at the right time, respecting subscriber preferences. Novu's open-source notification infrastructure demonstrates a clean architecture for this.

## Pipeline Architecture

Every notification flows through five stages:

```
Trigger → Route → Render → Deliver → Track
```

1. **Trigger**: A business event fires (order placed, appointment reminder, review received). The trigger carries a payload: recipient ID, event type, and data (order details, appointment time).
2. **Route**: Determine which channels to use based on the event type and subscriber preferences. An order confirmation might go to email + SMS. A marketing update goes only to email if the user opted out of SMS.
3. **Render**: Apply the channel-specific template. The same "appointment reminder" event produces a full HTML email, a 160-character SMS, and a short push notification. Each template receives the same data payload.
4. **Deliver**: Send through the channel provider (SendGrid for email, Twilio for SMS, FCM for push). Handle provider failures with fallback: if SMS delivery fails, retry once, then fall back to email.
5. **Track**: Record delivery status (sent, delivered, opened, clicked, failed) per channel per notification.

## Channel Selection

Novu provides a single API for Inbox/In-App, Email, SMS, Push, and Chat (Slack, Discord, Teams). For small businesses, start with two channels: **email** (for detailed content like receipts and reports) and **SMS** (for time-sensitive alerts like appointment reminders and delivery updates). Add push notifications only after you have a mobile app. Each channel has different strengths:

| Channel | Best For | Typical Open Rate |
|---------|----------|-------------------|
| SMS | Urgent, time-sensitive | 95%+ |
| Email | Detailed content, records | 20-25% |
| Push | Re-engagement, updates | 5-15% |
| In-App | Active user context | Varies |

## Template Design

Novu includes a no-code block editor for email templates. Design templates with these principles: (1) one notification, one action (do not combine "your order shipped" with "leave a review"). (2) Put the key information in the first line (SMS) or subject line (email). (3) Include a clear call-to-action link. (4) Use variables from the event payload for personalization: `Hello {{firstName}}, your order #{{orderNumber}} has shipped.`

## Digest and Batching

Novu's digest engine combines multiple notifications into a single message. Instead of sending 5 separate "new review" emails, batch them into one daily digest: "You received 5 new reviews today." Configure digest windows per event type: real-time for order updates, hourly for chat messages, daily for review summaries. This prevents notification fatigue, which is the fastest way to get customers to unsubscribe.

## Subscriber Preferences

Novu provides an embeddable preferences component giving subscribers control over their notifications. Let customers choose per category (order updates: email + SMS, marketing: email only, reviews: off). Store preferences per subscriber and enforce them at the Route stage. Always keep transactional notifications (receipts, password resets) non-optional. Preference management is not a nice-to-have: it is a legal requirement under many jurisdictions and dramatically reduces unsubscribe rates.

## Key Takeaways

- Structure notifications as a five-stage pipeline: trigger, route, render, deliver, track
- Start with email and SMS; add push only when you have a mobile app
- Use digest/batching to prevent notification fatigue (batch reviews daily, send orders in real-time)
- Let subscribers control preferences per category but keep transactional messages mandatory
- Design each template for one action with the key information in the first line
