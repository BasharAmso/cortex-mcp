---
id: SKL-0031
name: Launch Checklist
category: skills
tags: [launch, checklist, deployment, go-live, readiness, indie, bootstrapping, pre-launch]
capabilities: [launch-validation, analytics-check, legal-compliance-check, infrastructure-verification, distribution-readiness]
useWhen:
  - preparing for a product launch or go-live
  - verifying analytics, error tracking, and legal pages are in place
  - running a pre-launch checklist beyond CI/CD deployment
  - planning distribution channels for launch day
  - validating monetization setup before accepting payments
estimatedTokens: 600
relatedFragments: [SKL-0018, SKL-0030, SKL-0034]
dependencies: []
synonyms: ["am I ready to launch", "what do I need before going live", "pre-launch checklist", "did I forget anything before release", "go live readiness check"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/mezod/awesome-indie"
difficulty: beginner
---

# Launch Checklist

Pre-launch validation covering everything deployment does not: analytics, error tracking, social meta, legal pages, email setup, DNS, SSL, monetization, and distribution readiness. Informed by indie hacker and bootstrapper best practices.

## The Checklist

### Analytics and Tracking
- [ ] Analytics installed and verified in production (not just dev)
- [ ] Key events tracked: signup, purchase/conversion, core action
- [ ] Cookie consent banner if required by target market (EU: GDPR, CA: CCPA)
- [ ] Funnel tracking from landing to conversion

### Error Tracking
- [ ] Error monitoring installed (Sentry, LogRocket, etc.)
- [ ] Source maps uploaded for meaningful stack traces
- [ ] Alert notifications configured (email or Slack)

### SEO and Social
- [ ] All pages have unique title and meta description
- [ ] Open Graph tags with og:image (1200x630px)
- [ ] Twitter Card meta tags
- [ ] Favicon and app icons (multiple sizes, including Apple touch icon)
- [ ] robots.txt allows indexing
- [ ] sitemap.xml generated and submitted

### Legal
- [ ] Privacy Policy page exists and linked from footer
- [ ] Terms of Service (if user accounts exist)
- [ ] Cookie Policy (if using non-essential cookies)
- [ ] GDPR data deletion mechanism (if targeting EU)
- [ ] Refund policy (if accepting payments)

### Email
- [ ] Transactional email configured and tested (welcome, password reset)
- [ ] Sender domain authenticated (SPF, DKIM, DMARC)
- [ ] Unsubscribe mechanism in marketing emails
- [ ] Reply-to address monitored by a human

### Monetization (If Applicable)
- [ ] Payment processing tested end-to-end in production mode
- [ ] Webhook handlers for payment events (subscription, refund, failure)
- [ ] Pricing page clearly shows what each tier includes
- [ ] Free tier limitations clearly communicated
- [ ] Invoice/receipt generation working

### Infrastructure
- [ ] SSL certificate valid and auto-renewing
- [ ] HTTPS redirect configured (no mixed content)
- [ ] Custom domain configured and DNS propagated
- [ ] Database backups scheduled and tested
- [ ] Environment variables set in production (no dev defaults leaking)

### Security
- [ ] Default/test accounts removed
- [ ] Debug mode disabled in production
- [ ] API keys rotated from development values
- [ ] Rate limiting on authentication endpoints

### Performance
- [ ] Images optimized (WebP/AVIF, under 200KB)
- [ ] Compression enabled (Gzip/Brotli)
- [ ] Page loads under 3 seconds on 3G

### User Experience
- [ ] 404 page exists and is helpful (not default server error)
- [ ] Error pages do not expose stack traces
- [ ] Mobile experience tested on real device
- [ ] Forms have validation and clear error messages
- [ ] Empty states guide users to their first action

### Distribution (Launch Day)
- [ ] Product Hunt submission prepared (if applicable)
- [ ] Social media announcement drafted
- [ ] Landing page live and conversion-tracked
- [ ] Launch email to waitlist/early users ready

## Verdict

- **READY:** No critical failures, all high-priority items pass
- **NOT READY:** Any critical item fails

Items marked N/A must include a reason.

## Key Rules

- Does not fix issues. Identifies gaps and recommends fixes.
- Legal items are guidance, not legal advice. Recommend professional review.
- Does not deploy. That is the Deployment skill's job.
- Launch without analytics is launching blind. Treat analytics as critical.
