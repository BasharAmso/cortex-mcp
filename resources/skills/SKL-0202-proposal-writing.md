---
id: SKL-0202
name: Proposal Writing
category: skills
tags: [proposals, sales-documents, pricing-presentation, document-generation, proposal-templates, deal-closing]
capabilities: [proposal-creation, pricing-design, document-formatting, deal-documentation]
useWhen:
  - writing a sales proposal for a prospect
  - designing proposal templates for a sales team
  - presenting pricing options in a compelling format
  - building proposal generation tools
  - improving proposal-to-close conversion rates
estimatedTokens: 650
relatedFragments: [SKL-0201, SKL-0199, SKL-0203]
dependencies: []
synonyms: ["how to write a sales proposal", "how to present pricing", "best proposal format", "how to create proposal templates", "how to write a business proposal", "building a proposal generator"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/jgm/pandoc"
difficulty: beginner
owner: "cortex"
pillar: "sales"
---

# Skill: Proposal Writing

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0202 |
| **Name** | Proposal Writing |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

A sales proposal is a document that turns verbal agreement into a written commitment. Tools like Pandoc demonstrate the power of writing content in a simple format (Markdown) and converting it to any output (PDF, DOCX, HTML). This same philosophy applies to proposals: write the content once with clear structure, then generate polished output for any context.

### Proposal Structure

Every effective proposal follows this structure:

1. **Executive Summary (1 page):** Restate the client's problem, your proposed solution, and the expected outcome. This is the only page some stakeholders will read.
2. **Understanding of Needs:** Prove you listened. Mirror back their pain points, goals, and constraints using their own language.
3. **Proposed Solution:** Describe what you will deliver, broken into phases or modules. Be specific about scope and deliverables.
4. **Timeline:** Visual timeline with milestones. Show when they get value, not just when you finish work.
5. **Pricing:** Present options (see pricing section below). Always anchor with the recommended option.
6. **Social Proof:** Case studies, testimonials, or metrics from similar clients.
7. **Terms and Next Steps:** Clear call to action with a specific date. "Sign by March 15 to begin Phase 1 on April 1."

### Pricing Presentation

How you present pricing affects close rates more than the actual price:

- **Three-tier pricing** (Good/Better/Best) steers buyers toward the middle option (anchoring effect).
- **Lead with value, not cost.** Show ROI or time savings before the number.
- **Annual vs. monthly framing.** Present the option that makes the number more palatable for your deal size.
- **Bundle strategically.** Group features into packages rather than listing line items.

| Tier | Includes | Price | Best For |
|------|----------|-------|----------|
| Starter | Core features, email support | $X/mo | Small teams testing the solution |
| Professional | + integrations, priority support | $Y/mo | Growing teams (recommended) |
| Enterprise | + custom features, dedicated CSM | Custom | Organizations with complex needs |

### Document Generation Pipeline

Using Pandoc's approach, build a proposal pipeline:

1. **Template in Markdown:** Write reusable proposal sections as Markdown files with variable placeholders.
2. **Data injection:** Merge CRM data (company name, contact, deal details) into templates.
3. **Multi-format output:** Generate PDF for formal delivery, HTML for web viewing, DOCX for clients who need to redline.
4. **Version control:** Track proposal revisions in Git so you can see what changed between versions.

### Proposal Anti-Patterns

- **Generic proposals:** Copy-paste templates without customization signal laziness.
- **Feature dumps:** Listing every capability instead of focusing on what solves their problem.
- **Missing deadline:** Proposals without a response date stay in limbo forever.
- **Burying the price:** Making the prospect hunt for pricing erodes trust.

## Key Takeaways

- Structure every proposal around the client's problem, not your product's features.
- Use three-tier pricing to anchor buyers toward your recommended option.
- Include a clear deadline and next step; proposals without urgency die in inboxes.
- Build reusable templates with variable injection for consistency and speed.
- Lead with an executive summary that stands alone; it may be the only page decision-makers read.
