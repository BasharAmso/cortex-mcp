---
id: SKL-0031
name: Launch Checklist
category: skills
tags: [launch, checklist, deployment, go-live, readiness]
capabilities: [launch-validation, analytics-check, legal-compliance-check, infrastructure-verification]
useWhen:
  - preparing for a product launch or go-live
  - verifying analytics, error tracking, and legal pages are in place
  - running a pre-launch checklist beyond CI/CD deployment
estimatedTokens: 600
relatedFragments: [SKL-0018, SKL-0030, SKL-0034]
dependencies: []
---

# Launch Checklist

Pre-launch validation covering everything deployment does not: analytics, error tracking, social meta, legal pages, email setup, DNS, SSL, and go-live readiness.

## The Checklist

### Analytics and Tracking
- [ ] Analytics installed and working in production
- [ ] Key events tracked (signup, purchase, core action)
- [ ] Cookie consent banner (if required by target market)

### Error Tracking
- [ ] Error monitoring installed (Sentry, LogRocket, etc.)
- [ ] Source maps uploaded for meaningful stack traces
- [ ] Alert notifications configured

### SEO and Social
- [ ] All pages have title and meta description
- [ ] Open Graph and Twitter Card meta tags
- [ ] Favicon and app icons (multiple sizes)
- [ ] robots.txt allows indexing
- [ ] sitemap.xml generated

### Legal
- [ ] Privacy Policy page exists and linked from footer
- [ ] Terms of Service (if user accounts exist)
- [ ] Cookie Policy (if using non-essential cookies)
- [ ] GDPR data deletion mechanism (if targeting EU)

### Email
- [ ] Transactional email configured (welcome, password reset)
- [ ] Sender domain authenticated (SPF, DKIM, DMARC)
- [ ] Unsubscribe mechanism in marketing emails

### Infrastructure
- [ ] SSL certificate valid and auto-renewing
- [ ] HTTPS redirect configured
- [ ] Custom domain configured and DNS propagated
- [ ] Database backups scheduled
- [ ] Environment variables set in production

### Security
- [ ] Default/test accounts removed
- [ ] Debug mode disabled in production
- [ ] API keys rotated from development values
- [ ] Rate limiting on authentication endpoints

### Performance
- [ ] Images optimized
- [ ] Compression enabled (Gzip/Brotli)
- [ ] Page loads under 3 seconds on 3G

### User Experience
- [ ] 404 page exists and is helpful
- [ ] Error pages do not expose stack traces
- [ ] Mobile experience tested
- [ ] Forms have validation and clear error messages

## Verdict

- **READY:** No critical failures
- **NOT READY:** Any critical item fails

Items marked N/A must include a reason.

## Key Rules

- Does not fix issues. Identifies gaps and recommends fixes.
- Legal items are guidance, not legal advice. Recommend professional review.
- Does not deploy. That is the Deployment skill's job.
