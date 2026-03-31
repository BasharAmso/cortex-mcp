---
id: SKL-0279
name: Certification & Credentialing
category: skills
tags: [certificates, badges, credentials, verification, portfolio, digital-credentials]
capabilities: [certificate-generation, badge-systems, credential-verification, portfolio-building]
useWhen:
  - issuing digital certificates upon course completion
  - building a badge or micro-credential system
  - implementing certificate verification for employers
  - creating student portfolios or achievement showcases
  - designing credentialing workflows for professional training
estimatedTokens: 650
relatedFragments: [SKL-0274, SKL-0276, PAT-0143]
dependencies: []
synonyms: ["how to issue digital certificates", "build a badge system", "verify course certificates", "create a credential verification page", "digital badges for learning", "student portfolio system"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: intermediate
owner: "cortex"
pillar: "education"
---

# Skill: Certification & Credentialing

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0279 |
| **Name** | Certification & Credentialing |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Certificates transform learning into proof. A well-designed credentialing system makes achievements verifiable, shareable, and meaningful to employers.

### Certificate Data Model

Store certificates as structured records, not just generated PDFs:

```
certificates: id, student_id, course_id, issued_at, verification_code,
              template_id, status (active/revoked), metadata (score, honors)
```

Generate the visual certificate (PDF or image) on demand from the record. This allows template updates without re-issuing, supports multiple output formats, and keeps the database as the source of truth.

### Verification System

Every certificate gets a unique verification URL: `yourplatform.com/verify/XXXX-XXXX`. The verification page displays: student name, course title, issuing organization, completion date, and certificate status (valid/revoked). This is the most important feature for employer trust. Make verification pages public, fast, and mobile-friendly. No login required to verify.

### Open Badges Standard

Follow the Open Badges 2.0 specification (IMS Global) for interoperability. An Open Badge is a JSON-LD object containing:

- **Issuer**: your platform identity and URL
- **Badge Class**: what the badge represents (course, skill, achievement)
- **Assertion**: who earned it, when, with evidence

Open Badges can be imported into LinkedIn, digital wallets, and other badge platforms. Adopting the standard means your credentials are portable, not locked to your platform.

### Badge Hierarchy

Design a multi-tier badge system:

| Tier | Awarded For | Example |
|------|-------------|---------|
| **Completion** | Finishing a course | "Completed: Intro to Python" |
| **Skill** | Demonstrating a specific competency | "Proficient: REST API Design" |
| **Achievement** | Exceptional performance | "Perfect Score: Data Structures" |
| **Pathway** | Completing a series of related courses | "Full Stack Developer Path" |

Pathway badges (earning multiple related badges) are more valuable than individual course badges. They signal depth, not just breadth.

### Portfolio and Showcase

Let students build a public portfolio page displaying all earned credentials. Include: badges with descriptions, certificate links, projects submitted during courses, and a skills summary auto-generated from badge metadata. Make portfolio URLs shareable (`yourplatform.com/portfolio/username`).

### Revocation

Support certificate revocation for cases of academic dishonesty or policy violations. Revoked certificates must show as "revoked" on the verification page, not simply disappear. Maintain an audit trail of revocation reasons and timestamps.

### Expiring Credentials

Some professional certifications require renewal. Support optional expiration dates on certificates. Notify holders before expiration and provide a renewal pathway (re-assessment, continuing education credits).

## Key Takeaways

- Store certificates as database records and render visuals on demand, not as static files
- Every certificate needs a public verification URL that works without login
- Follow the Open Badges 2.0 standard for portability across platforms
- Design badge tiers (completion, skill, achievement, pathway) to signal different levels of mastery
- Support revocation with audit trails and expiration with renewal pathways
