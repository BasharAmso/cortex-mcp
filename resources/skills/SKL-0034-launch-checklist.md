---
id: SKL-0034
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
relatedFragments: [SKL-0021, SKL-0032, SKL-0029]
dependencies: []
synonyms: ["am I ready to launch", "what do I need before going live", "pre-launch checklist", "did I forget anything before release", "go live readiness check", "things to check before going live", "launch day preparation list"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/mezod/awesome-indie"
difficulty: beginner
owner: builder
pillar: "product-business"
---

# Skill: Launch Checklist

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0034 |
| **Version** | 1.0 |
| **Owner** | builder |
| **Inputs** | Source files, PRD.md, STATE.md |
| **Outputs** | Launch readiness report, STATE.md updated |
| **Triggers** | `LAUNCH_CHECK_REQUESTED` |

---

## Purpose

SKL-0021 (Deployment) handles CI/CD, git, and pushing code. This skill handles everything else needed before going live — the checklist of things that are easy to forget but embarrassing to miss. Analytics, legal pages, error tracking, email deliverability, social sharing meta, and more.

---

## Procedure

### Step 1 — Run the Checklist

Check each item. Mark as PASS, FAIL, or N/A.

**Analytics & Tracking:**
- [ ] Analytics installed (Google Analytics, Plausible, PostHog, etc.)
- [ ] Key events tracked (signup, purchase, core action from PRD success metrics)
- [ ] Analytics working in production (not just dev)
- [ ] Cookie consent banner (if required by target market — EU, UK, CA)

**Error Tracking:**
- [ ] Error monitoring installed (Sentry, LogRocket, Bugsnag, etc.)
- [ ] Source maps uploaded for meaningful stack traces
- [ ] Alert notifications configured (email, Slack, etc.)

**SEO & Social:**
- [ ] All pages have `<title>` and `<meta description>`
- [ ] Open Graph meta tags (og:title, og:description, og:image)
- [ ] Twitter Card meta tags
- [ ] Favicon and app icons (multiple sizes)
- [ ] `robots.txt` allows indexing
- [ ] `sitemap.xml` generated

**Legal:**
- [ ] Privacy Policy page exists and is linked from footer
- [ ] Terms of Service page exists (if user accounts)
- [ ] Cookie Policy (if using cookies beyond essential)
- [ ] GDPR data deletion mechanism (if targeting EU)

**Email:**
- [ ] Transactional email configured (welcome, password reset, etc.)
- [ ] Email sender domain authenticated (SPF, DKIM, DMARC)
- [ ] Unsubscribe mechanism in marketing emails
- [ ] Email templates tested in major clients (Gmail, Outlook)

**Infrastructure:**
- [ ] SSL certificate valid and auto-renewing
- [ ] HTTPS redirect configured (HTTP → HTTPS)
- [ ] Custom domain configured and DNS propagated
- [ ] CDN configured for static assets (if applicable)
- [ ] Database backups scheduled
- [ ] Environment variables set in production (no `.env` file deployed)

**Security:**
- [ ] Default/test accounts removed
- [ ] Debug mode disabled in production
- [ ] API keys rotated from development values
- [ ] Rate limiting on authentication endpoints
- [ ] `security.txt` exists at `/.well-known/security.txt` with contact and disclosure policy
- [ ] Content Security Policy (CSP) header is set (not relying on browser defaults)

**Performance:**
- [ ] Images optimized (compressed, modern formats)
- [ ] Gzip/Brotli compression enabled
- [ ] Page loads in under 3 seconds on 3G

**User Experience:**
- [ ] 404 page exists and is helpful
- [ ] Error pages don't expose stack traces
- [ ] Mobile experience tested
- [ ] Forms have validation and clear error messages

### Step 2 — Generate Report

```markdown
# Launch Readiness Report

**Date:** YYYY-MM-DD
**Verdict:** READY / NOT READY (any CRITICAL fails = NOT READY)

## Summary
- Passed: X / Y
- Failed: X (N critical, M non-critical)
- N/A: X

## Failed Items
[list with severity and recommended fix for each]

## Passed Items
[list for confirmation]
```

### Step 3 — Update STATE.md

---

## Constraints

- Does not fix issues — provides the checklist and identifies gaps
- Items marked N/A must have a reason (e.g., "no user accounts" → Terms of Service is N/A)
- Does not deploy — that's SKL-0021's job
- Legal items are guidance, not legal advice — recommend professional review for compliance

---

## Primary Agent

builder

---

## Definition of Done

- [ ] All checklist categories evaluated
- [ ] Each item marked PASS, FAIL, or N/A (with reason)
- [ ] Failed items have specific fix recommendations
- [ ] Verdict issued (READY / NOT READY)
- [ ] STATE.md updated
