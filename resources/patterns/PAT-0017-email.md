---
id: PAT-0017
name: Email Integration
category: patterns
tags: [email, transactional-email, sendgrid, resend, ses, smtp, email-templates, notifications]
capabilities: [email-sending, template-design, delivery-monitoring, notification-system]
useWhen:
  - sending emails from an app
  - choosing an email provider
  - building email templates
  - implementing transactional emails
  - setting up email notifications
estimatedTokens: 500
relatedFragments: [PAT-0014, PAT-0001, SKL-0010]
dependencies: []
synonyms: ["send emails from my app", "which email service should I use", "set up password reset emails", "email template design", "transactional email setup"]
lastUpdated: "2026-03-29"
difficulty: beginner
sourceUrl: ""
---

# Email Integration

Send reliable transactional emails without landing in spam.

## Provider Comparison

| Provider | Free Tier | Best For |
|----------|-----------|----------|
| **Resend** | 3K/month | Developer experience, React Email templates |
| **SendGrid** | 100/day | Established apps, marketing + transactional |
| **AWS SES** | 62K/month (from EC2) | High volume, cost-sensitive |
| **Postmark** | 100/month | Deliverability-focused transactional |
| **Mailgun** | 100/day (trial) | API-first, European data residency |

## Implementation (Resend)

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail(user: { email: string; name: string }) {
  await resend.emails.send({
    from: "App <hello@yourdomain.com>",
    to: user.email,
    subject: `Welcome, ${user.name}!`,
    html: renderTemplate("welcome", { name: user.name }),
  });
}
```

## Email Architecture

```
User Action -> API -> Job Queue -> Email Worker -> Provider -> Inbox
                         |
                         └── Retry on failure (3 attempts, exponential backoff)
```

Always send emails from a background job, not the request handler. This prevents slow or failed email delivery from blocking user actions.

## Deliverability Checklist

1. **Set up SPF, DKIM, and DMARC** DNS records for your sending domain
2. **Use a custom from address** on your domain (not gmail.com or provider default)
3. **Include an unsubscribe link** in marketing emails (required by law)
4. **Keep HTML simple** -- avoid heavy CSS, images-only layouts, or URL shorteners
5. **Monitor bounce rates** -- remove invalid addresses promptly
6. **Warm up new domains** -- start with low volume and increase gradually

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
