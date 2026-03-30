---
id: PAT-0017
name: Email Integration
category: patterns
tags: [email, transactional-email, sendgrid, resend, ses, smtp, email-templates, notifications, deliverability]
capabilities: [email-sending, template-design, delivery-monitoring, notification-system]
useWhen:
  - sending transactional or notification emails from an app
  - choosing an email service provider for a new project
  - building and managing email templates
  - setting up password reset or verification emails
  - debugging email deliverability issues
estimatedTokens: 550
relatedFragments: [PAT-0014, PAT-0001, SKL-0010]
dependencies: []
synonyms: ["send emails from my app", "which email service should I use", "set up password reset emails", "email template design", "my emails go to spam"]
lastUpdated: "2026-03-29"
difficulty: beginner
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
---

# Email Integration

Send reliable transactional emails without landing in spam. Always delegate email delivery to a background job, never the request handler.

## Provider Comparison

| Provider | Free Tier | Best For |
|----------|-----------|----------|
| **Resend** | 3K/month | Developer experience, React Email templates |
| **SendGrid** | 100/day | Established apps, marketing + transactional |
| **AWS SES** | 62K/month (from EC2) | High volume, cost-sensitive |
| **Postmark** | 100/month | Deliverability-focused transactional |
| **Mailgun** | 100/day (trial) | API-first, European data residency |

## Architecture

```
User Action -> API -> Job Queue -> Email Worker -> Provider -> Inbox
                         |
                         +-- Retry on failure (3 attempts, exponential backoff)
```

Always send emails from a background job, not the request handler. This prevents slow or failed email delivery from blocking user actions. Node.js best practices emphasize delegating anything possible to dedicated services.

## Implementation Steps

1. **Set up DNS records first.** Configure SPF, DKIM, and DMARC on your sending domain before sending any email. Without these, emails land in spam.
2. **Use a custom from address.** Send from `hello@yourdomain.com`, not a provider default or gmail.com.
3. **Send via background queue.** Enqueue the email job and return 200 to the user immediately. The worker handles delivery and retries.
4. **Include unsubscribe links** in marketing emails (legally required by CAN-SPAM and GDPR).
5. **Monitor bounce rates.** Remove invalid addresses promptly. High bounce rates damage sender reputation.
6. **Warm up new domains.** Start with low volume and increase gradually over 2-4 weeks.

## Email Types

| Type | Example | Expectations |
|------|---------|-------------|
| **Transactional** | Password reset, order confirmation | Immediate delivery, high open rate |
| **Notification** | New comment, status update | Near-immediate, can batch |
| **Marketing** | Newsletter, promotions | Scheduled, requires opt-in + unsubscribe |

## Anti-Patterns

- Sending emails synchronously in the request handler
- No SPF/DKIM records (emails go to spam)
- Sending from a no-reply address with no alternative contact method
- Not tracking bounces and continuing to send to dead addresses
- Hardcoding email content instead of using templates
