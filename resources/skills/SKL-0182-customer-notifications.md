---
id: SKL-0182
name: Customer Notifications
category: skills
tags: [notifications, sms, email, reminders, marketing, small-business]
capabilities: [multi-channel-delivery, template-management, subscriber-preferences, scheduled-sending]
useWhen:
  - sending appointment reminders via SMS or email
  - building a notification system for a small business
  - designing customer communication workflows
  - managing notification preferences and opt-outs
  - automating marketing messages and promotions
estimatedTokens: 650
relatedFragments: [SKL-0177, SKL-0179, SKL-0183]
dependencies: []
synonyms: ["how do I send appointment reminders to customers", "how to set up SMS notifications for my business", "what is the best way to send email confirmations", "how do I let customers choose how they get notified", "how to automate customer messages", "how do I send promotional texts to my customers"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/novuhq/novu"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Skill: Customer Notifications

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0182 |
| **Name** | Customer Notifications |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Customer notifications keep your business in front of clients at the right moments — appointment reminders, order updates, promotions, and review requests. Novu's open-source notification infrastructure demonstrates the gold standard: a unified API across SMS, email, push, and in-app channels with subscriber preference management.

### Multi-Channel Architecture

Novu consolidates delivery across 14+ email providers (SendGrid, SES, Mailgun), 16+ SMS providers (Twilio, Vonage), push notifications (FCM, APNs), and chat (Slack, Discord). The pattern: define a **notification workflow** once, then deliver through the customer's preferred channel. For small businesses, start with SMS (highest open rate for appointments) and email (best for receipts and promotions).

### Notification Workflows

A workflow defines *what* triggers a notification, *what* content to send, and *which* channel to use. Examples for a salon: **Booking Confirmed** (immediate, SMS + email), **Appointment Reminder** (24 hours before, SMS), **Post-Visit Review Request** (2 days after, email), **Birthday Promotion** (annual, email). Each workflow is a reusable template triggered by a business event.

### Template Design

Keep messages short and actionable. SMS: under 160 characters with the key info (date, time, action link). Email: branded header, clear body, one CTA button. Novu provides a no-code block editor for email templates — useful for non-technical business owners. Use merge variables for personalization: `Hi {{firstName}}, your appointment with {{staffName}} is tomorrow at {{time}}.`

### Subscriber Preferences

Let customers control their notification experience. Novu's embeddable preference component lets subscribers choose: which channels (SMS, email, both), which types (transactional always on, marketing opt-in), and quiet hours (no messages before 9am). This respects customer boundaries and keeps you compliant with SMS regulations (TCPA, GDPR).

### Digest and Batching

If multiple events happen close together (customer books three appointments), don't send three separate messages. Novu's digest feature combines them into one: "You have 3 upcoming appointments this week." This prevents notification fatigue while keeping customers informed.

### Delivery Tracking

Log every notification sent: channel, timestamp, delivery status (sent, delivered, opened, failed). Failed deliveries should trigger a fallback — if SMS fails, retry via email. Track open rates on emails and click rates on links to understand which messages customers actually engage with.

## Key Takeaways

- SMS for time-sensitive (reminders, confirmations), email for detailed content (receipts, promotions)
- Build notification workflows as reusable templates triggered by business events
- Subscriber preferences and opt-out compliance are not optional — they are legal requirements
- Digest notifications to prevent fatigue when multiple events fire close together
- Track delivery and engagement to refine which messages actually work
