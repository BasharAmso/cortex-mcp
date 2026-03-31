---
id: SKL-0195
name: Appointment Reminders
category: skills
tags: [reminders, notifications, sms, email, no-show-reduction, appointment-confirmation]
capabilities: [multi-channel-notifications, reminder-scheduling, confirmation-workflows, no-show-prevention]
useWhen:
  - setting up automated SMS and email appointment reminders
  - reducing no-show rates for a service business
  - building confirmation workflows where clients confirm or reschedule
  - choosing timing and channels for reminder messages
  - implementing a multi-step reminder sequence before appointments
estimatedTokens: 650
relatedFragments: [SKL-0193, PAT-0102, SKL-0191]
dependencies: []
synonyms: ["how do I send automated appointment reminders", "what is the best way to reduce no-shows", "how to set up SMS reminders for my business", "how do I build a confirmation workflow for appointments", "when should I send reminder messages before an appointment"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/novuhq/novu"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Skill: Appointment Reminders

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0195 |
| **Name** | Appointment Reminders |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Missed appointments cost service businesses 10-15% of potential revenue. Automated reminders are the most effective countermeasure. Novu's notification infrastructure demonstrates the pattern: a unified API sends messages across email, SMS (via 16+ providers including Twilio and Vonage), push notifications, and chat channels using a workflow engine that defines when, how, and through which channel each notification is delivered.

### Multi-Channel Reminder Strategy

Not every client checks the same channel. An effective reminder system uses multiple channels in sequence rather than relying on one. Novu's architecture separates the notification workflow from the delivery provider, meaning you define the logic once and the system routes to the appropriate channel. A practical multi-channel sequence:

- **7 days before**: Email with appointment details, calendar attachment, and reschedule link
- **48 hours before**: SMS with a confirmation request ("Reply Y to confirm or R to reschedule")
- **2 hours before**: Push notification or SMS with arrival instructions and parking details

The channel escalation pattern ensures the message reaches the client through at least one channel they actively monitor.

### Confirmation Workflows

A reminder that asks for confirmation is far more effective than a passive notification. The confirmation workflow:

1. **Send reminder** with a confirmation prompt (Y/N or a link)
2. **Wait for response** within a defined window (e.g., 24 hours)
3. **If confirmed**: Mark appointment as confirmed in the booking system
4. **If reschedule requested**: Send available time slots and process the change
5. **If no response**: Escalate to a second channel (e.g., phone call from staff) or send a follow-up SMS

Novu's workflow engine supports this conditional branching natively. The digest engine can also consolidate multiple upcoming appointments into a single summary message for clients with several bookings.

### Subscriber Preferences

Respect client communication preferences. Novu provides an embeddable preferences component that lets subscribers control which channels they receive notifications on. Some clients prefer SMS only; others want email. Store these preferences per client and honor them in your workflow. Forcing unwanted channels increases unsubscribe rates and damages the client relationship. The one exception: critical same-day reminders should go through the client's preferred channel regardless of general preferences.

### Message Content Best Practices

Reminder messages need four elements: **who** (your business name), **what** (the service booked), **when** (date, time, and timezone), and **action** (confirm, reschedule, or cancel link). Keep SMS under 160 characters to avoid multi-part message charges. Include a direct link for rescheduling rather than asking clients to call. Personalize with the client's first name. Avoid marketing content in reminder messages; mixing promotions with utility messages reduces open rates.

### Measuring Effectiveness

Track three metrics to evaluate your reminder system: **confirmation rate** (percentage of clients who actively confirm), **no-show rate** (target under 5%), and **reschedule rate** (clients who move rather than miss appointments). Compare these metrics before and after implementing reminders, and by channel to identify which touchpoints drive the most confirmations.

## Key Takeaways

- Use a multi-channel, multi-touchpoint sequence (email at 7 days, SMS at 48 hours, push at 2 hours)
- Build confirmation workflows with conditional branching for confirm, reschedule, and no-response paths
- Respect subscriber channel preferences but prioritize same-day reminders through the preferred channel
- Keep reminder content to four elements: who, what, when, and action
- Track confirmation rate, no-show rate, and reschedule rate to measure system effectiveness
