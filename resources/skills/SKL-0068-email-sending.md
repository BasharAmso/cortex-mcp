---
id: SKL-0068
name: Email Sending
category: skills
tags: [email, transactional, resend, sendgrid, templates, spf, dkim, deliverability]
capabilities: [email-service-setup, template-design, deliverability-optimization, dns-configuration]
useWhen:
  - adding transactional emails like welcome messages or password resets
  - choosing an email service provider for a new project
  - improving email deliverability and avoiding spam filters
  - setting up email templates with dynamic content
estimatedTokens: 600
relatedFragments: [SKL-0006, SKL-0010, SKL-0066]
dependencies: []
synonyms: ["how do I send emails from my app", "my emails keep going to spam", "what is the best email API for a startup", "how to set up password reset emails", "how to add SPF and DKIM records"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Email Sending

Send reliable, deliverable emails from your application for transactional and product communication.

## Email Types

| Type | Examples | Timing | Priority |
|------|----------|--------|----------|
| Transactional | Password reset, receipt, verification | Immediate | Critical -- must arrive |
| Product | Welcome series, usage digest, trial expiry | Scheduled | Important -- delays OK |
| Marketing | Newsletter, promotion, announcement | Batched | Nice to have |

**Rule:** Transactional and marketing emails should use separate sending domains or subdomains to protect transactional deliverability.

## Provider Comparison

| Provider | Strengths | Free Tier | Best For |
|----------|-----------|-----------|----------|
| Resend | Modern DX, React Email templates | 3,000/month | Developer-first startups |
| SendGrid | Mature, high volume, marketing tools | 100/day | Apps needing marketing + transactional |
| Postmark | Best deliverability, fast delivery | 100/month | Transactional-only |
| AWS SES | Cheapest at scale ($0.10/1000) | 62,000/month (from EC2) | High volume, cost-sensitive |

**Recommendation:** Resend for new projects (simplest DX). Postmark if deliverability is mission-critical.

## Procedure

### 1. Set Up Resend

```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'MyApp <noreply@mail.myapp.com>',
  to: user.email,
  subject: 'Verify your email',
  html: renderTemplate('verify-email', { name: user.name, link: verifyUrl }),
});
```

### 2. Set Up DNS Records

These three DNS records are required for deliverability:

| Record | Purpose | Example |
|--------|---------|---------|
| SPF | Authorizes your provider to send on your behalf | `v=spf1 include:_spf.resend.com ~all` |
| DKIM | Cryptographic signature proving email is from you | CNAME records (provider-specific) |
| DMARC | Policy for handling failed SPF/DKIM checks | `v=DMARC1; p=quarantine; rua=mailto:dmarc@myapp.com` |

Set these up on a sending subdomain (e.g., `mail.myapp.com`) to isolate from your main domain reputation.

### 3. Template Strategy

- Use a base layout template with header, content area, footer
- Build templates in React Email or MJML (not raw HTML -- email HTML is painful)
- Always include a plain-text version
- Preview and test with Litmus or Email on Acid before going live

### 4. Deliverability Checklist

- Use a consistent "from" address (not a random subdomain)
- Include a physical mailing address in footer (CAN-SPAM)
- Add a one-click unsubscribe header for non-transactional emails
- Warm up new sending domains: start with 50-100/day, increase over 2-4 weeks
- Monitor bounce rate (keep below 2%) and spam complaint rate (below 0.1%)

### 5. Send Emails via Background Jobs

Never send emails synchronously in request handlers:

```typescript
// In your API handler:
await emailQueue.add('send-email', {
  template: 'welcome',
  to: user.email,
  data: { name: user.name },
});

// In your email worker:
worker.process(async (job) => {
  const html = renderTemplate(job.data.template, job.data.data);
  await resend.emails.send({ to: job.data.to, html, ... });
});
```

## Key Constraints

- Never send email synchronously in API request handlers
- Never hardcode email content -- use templates
- Always set up SPF, DKIM, and DMARC before sending production emails
- Use a subdomain for sending to protect your root domain reputation
- Log every email sent (recipient, template, status) for debugging delivery issues
