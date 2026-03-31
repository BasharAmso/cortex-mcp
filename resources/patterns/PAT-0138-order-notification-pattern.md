---
id: PAT-0138
name: Order Notification Pattern
category: patterns
tags: [order-notifications, transactional-email, shipping-updates, multi-channel, ecommerce, novu]
capabilities: [order-notification-workflow, multi-channel-delivery, notification-templating, delivery-status-updates]
useWhen:
  - designing the order notification lifecycle for an ecommerce store
  - implementing multi-channel notifications (email, SMS, push)
  - building shipping and delivery update workflows
  - setting up post-delivery review request automation
  - reducing "where is my order" support tickets
estimatedTokens: 650
relatedFragments: [SKL-0266, SKL-0267, PAT-0139]
dependencies: []
synonyms: ["how to send order confirmation emails", "shipping update notification system", "ecommerce notification workflow", "how to reduce WISMO tickets", "order status notification design", "multi-channel order updates"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/novuhq/novu"
difficulty: beginner
owner: "cortex"
pillar: "ecommerce"
---

# Pattern: Order Notification Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0138 |
| **Name** | Order Notification Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Novu's architecture treats notifications as workflows triggered by events, with each workflow defining conditions and channels for delivery. A unified API manages all provider integrations (email, SMS, push, in-app) through a single interface, with a digest engine that can combine multiple notifications into one. For ecommerce, this maps perfectly to order lifecycle events where each state transition triggers a customer notification.

### Order Notification Timeline

Every order progresses through a predictable lifecycle. Each transition is a notification trigger:

| Order Event | Channel | Timing | Content |
|-------------|---------|--------|---------|
| **Order confirmed** | Email + SMS | Immediate | Order number, items, total, estimated delivery |
| **Payment captured** | Email | Immediate | Payment receipt, billing details |
| **Order shipped** | Email + SMS + Push | On shipment | Tracking number, carrier, tracking link |
| **Out for delivery** | Push + SMS | Carrier webhook | "Your order arrives today" |
| **Delivered** | Push + Email | Carrier webhook | Delivery confirmation, support link |
| **Review request** | Email | 5-7 days post-delivery | "How was your order?" with product review links |
| **Return initiated** | Email | On return request | Return instructions, label, expected timeline |
| **Refund processed** | Email | On refund | Refund amount, method, processing time |

### Workflow Design Pattern

Following Novu's workflow engine approach, each notification is a workflow with steps:

```
Trigger (order.shipped) →
  Digest (batch if multiple shipments within 1 hour) →
  Channel routing:
    Email (always) →
    SMS (if customer opted in) →
    Push (if app installed) →
  Fallback: if primary channel fails, try next
```

### Channel Selection Rules

Not every notification needs every channel. Match urgency to channel:

| Urgency | Channels | Examples |
|---------|----------|---------|
| **Critical** | Email + SMS | Order confirmed, refund processed |
| **Time-sensitive** | Push + SMS | Out for delivery, delivery attempt failed |
| **Informational** | Email only | Payment receipt, review request |
| **Promotional** | Email (with preference check) | Cross-sell, reorder reminder |

### Template Structure

Each notification template needs these elements:

- **Subject/title** — Clear, scannable (include order number: "Order #1234 has shipped")
- **Hero content** — The one thing the customer needs to know (tracking link, delivery date)
- **Order summary** — Product images, names, quantities (visual recognition is faster than text)
- **Action button** — Single primary CTA ("Track Your Order", "Leave a Review")
- **Support link** — Always include a way to get help without replying to the email

### Reducing WISMO (Where Is My Order)

"Where is my order?" accounts for 30-50% of ecommerce support tickets. Proactive notifications reduce this:

1. **Real-time tracking page** — Branded order status page the customer can check anytime
2. **Proactive updates** — Push notification on every carrier scan event (picked up, in transit, out for delivery)
3. **Delay alerts** — If estimated delivery date passes without delivery confirmation, send an alert before the customer contacts support
4. **Self-service** — Link to tracking page in every notification, not just the shipping email

### Subscriber Preferences

Novu provides an embeddable subscriber preferences component. For ecommerce:

- Let customers choose channels per notification type (email for receipts, push for delivery)
- Default all transactional notifications to ON (these are not marketing)
- Marketing notifications (review requests, cross-sells) must respect opt-in preferences
- Provide a preference center link in every email footer

### Event-Driven Implementation

```
Order Service → emits event → Notification Service → resolves workflow → delivers
```

Keep the order service clean: it emits events like `order.confirmed`, `order.shipped`, `order.delivered`. The notification service subscribes to these events and handles all channel routing, template rendering, and delivery. This separation means changing notification logic never requires touching order code.

## Key Takeaways

- Map every order state transition to a notification trigger with appropriate channels
- Use push and SMS for time-sensitive updates (delivery), email for informational (receipts)
- Proactively notify on delays before the customer contacts support to reduce WISMO tickets
- Separate notification logic from order logic through event-driven architecture
- Let customers control channel preferences for each notification type
