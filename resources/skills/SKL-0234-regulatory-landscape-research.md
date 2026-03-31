---
id: SKL-0234
name: Regulatory Landscape Research
category: skills
tags: [regulatory-research, compliance, legal-risk, market-entry, jurisdiction-analysis, regulatory-mapping]
capabilities: [compliance-mapping, regulatory-risk-assessment, jurisdiction-analysis, regulatory-monitoring]
useWhen:
  - entering a new market or geography with unknown regulatory requirements
  - assessing compliance risk before building a product feature
  - evaluating whether regulatory barriers make a market unattractive
  - preparing for due diligence or investor questions about regulatory risk
  - mapping compliance requirements across multiple jurisdictions
estimatedTokens: 650
relatedFragments: [SKL-0231, SKL-0235, PAT-0122]
dependencies: []
synonyms: ["what regulations apply to my product", "how to research compliance requirements", "regulatory risk assessment", "what legal requirements do I need to meet", "compliance mapping for new markets", "how to evaluate regulatory barriers"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/erpnext"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Skill: Regulatory Landscape Research

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0234 |
| **Name** | Regulatory Landscape Research |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Regulatory landscape research maps the legal and compliance requirements that constrain or enable your product in target markets. It is not legal advice but a structured approach to understanding what rules exist, how they affect your product, and how much effort compliance requires.

### The Compliance Mapping Process

1. **Identify regulatory domains.** Every product touches multiple regulatory areas. Common domains:

| Domain | Examples | Typical Products Affected |
|--------|----------|--------------------------|
| **Data Privacy** | GDPR, CCPA, LGPD, PIPL | Any product collecting user data |
| **Financial** | PCI-DSS, PSD2, SOX, AML/KYC | Payments, banking, fintech |
| **Healthcare** | HIPAA, FDA SaMD, MDR | Health data, medical devices |
| **Accessibility** | ADA, EAA, WCAG | Public-facing web/mobile apps |
| **Industry-Specific** | FCC, FAA, SEC | Telecom, aviation, securities |

2. **Map jurisdictions to requirements.** For each target market, document which regulations from each domain apply. Enterprise resource planning systems like ERPNext handle this by maintaining jurisdiction-specific tax rules, approval workflows, and audit trails per country. Your research should produce a similar mapping.

3. **Assess compliance effort.** For each requirement, evaluate:
   - **Technical effort:** What must be built (consent management, audit logs, data residency, encryption)?
   - **Operational effort:** What processes must exist (data protection officer, incident response, regular audits)?
   - **Ongoing cost:** Certification renewals, compliance monitoring, legal review.

4. **Rate regulatory risk.** Score each jurisdiction on a simple matrix:

| Risk Level | Characteristics | Strategy |
|------------|----------------|----------|
| **Low** | Clear rules, stable enforcement, self-certification | Build compliance into v1 |
| **Medium** | Complex rules, active enforcement, third-party audits required | Budget for compliance and legal counsel |
| **High** | Ambiguous rules, aggressive enforcement, licensing required | Validate market size justifies compliance investment |
| **Prohibitive** | Outright bans, impossible requirements for your stage | Defer or avoid this jurisdiction |

5. **Monitor for changes.** Regulations evolve. Set up monitoring through regulatory body newsletters, industry association updates, and legal news feeds. Review quarterly alongside your PEST analysis.

### Building a Regulatory Register

Maintain a living document that tracks:
- **Regulation name and jurisdiction**
- **Applicable product areas**
- **Key requirements (summarized)**
- **Current compliance status** (compliant, in progress, not started, not applicable)
- **Deadline or review date**
- **Owner** (who is responsible for maintaining compliance)

### Common Pitfalls

- Treating compliance as a one-time checkbox rather than ongoing obligation.
- Researching regulations without assessing the actual enforcement landscape (some regulations exist on paper but are rarely enforced for your segment).
- Assuming one jurisdiction's compliance covers others (GDPR compliance does not automatically satisfy CCPA).
- Delaying regulatory research until after building, creating expensive rework.

## Key Takeaways

- Map regulatory domains early; every product touches data privacy at minimum and usually 2-3 additional domains
- Score jurisdictions by compliance effort and enforcement risk to prioritize market entry decisions
- Maintain a living regulatory register with status, deadlines, and owners
- Compliance in one jurisdiction does not transfer to another; assess each independently
- Research regulations before building, not after, to avoid costly architectural rework
