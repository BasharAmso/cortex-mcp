---
id: SKL-0222
name: Industry Mapping
category: skills
tags: [industry-mapping, market-research, value-chain, stakeholder-analysis, market-structure, ecosystem-analysis]
capabilities: [value-chain-analysis, stakeholder-mapping, industry-structure-assessment, ecosystem-visualization]
useWhen:
  - understanding the structure of an industry before entering it
  - identifying where value is created and captured in a market
  - mapping stakeholders and their relationships
  - finding strategic positioning within an industry ecosystem
  - analyzing power dynamics between market participants
estimatedTokens: 650
relatedFragments: [SKL-0217, SKL-0218, PAT-0115]
dependencies: []
synonyms: ["how does this industry work", "value chain analysis", "who are the key players in this market", "industry ecosystem map", "market structure analysis", "stakeholder mapping"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Skill: Industry Mapping

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0222 |
| **Name** | Industry Mapping |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Industry mapping visualizes how a market is structured: who the participants are, how value flows between them, and where power concentrates. Metabase illustrates this well as it sits at a specific point in the data stack value chain, connecting databases to business users and competing differently depending on which layer of the stack you examine.

### Value Chain Analysis

A value chain maps the steps from raw input to end-user value. For software markets:

1. **Infrastructure layer**: Cloud providers, databases, hosting (AWS, GCP, PostgreSQL).
2. **Platform layer**: Frameworks, middleware, developer tools (Next.js, Prisma, Auth providers).
3. **Application layer**: End-user products built on the platform (Metabase, your product).
4. **Distribution layer**: How products reach users (app stores, marketplaces, direct sales).
5. **Services layer**: Implementation, consulting, training, support.

Map where your product sits and who captures value at each layer. Metabase occupies the application layer, transforming raw database queries into visual insights. Its value depends on the infrastructure layer (database quality) and competes at the distribution layer (open-source vs. cloud-hosted).

### Stakeholder Mapping

Identify all participants and their roles:

| Stakeholder Type | Role | Power Level |
|-----------------|------|-------------|
| **Buyers** | Purchase decision makers | High (choose solutions) |
| **Users** | Day-to-day product users | Medium (influence adoption) |
| **Integrators** | Connect products together | Medium (control workflows) |
| **Regulators** | Set rules and compliance requirements | High (define constraints) |
| **Complementors** | Products that increase your value | Low-Medium (create ecosystem) |
| **Substitutes** | Alternative approaches to the same need | Medium (set price ceilings) |

For each stakeholder, document: who they are, what they want, their influence on adoption, and your relationship strategy.

### Porter's Five Forces (Applied)

Apply Porter's framework as a structured industry health check:

- **Rivalry intensity**: How many competitors, how differentiated, how fast-growing? High rivalry compresses margins.
- **Buyer power**: Can customers easily switch? Are there few large buyers? High buyer power demands low pricing.
- **Supplier power**: Do you depend on a few key suppliers (cloud providers, data sources)? High supplier power squeezes your costs.
- **Threat of new entrants**: How hard is it to build a competing product? Open-source lowers barriers. Network effects raise them.
- **Threat of substitutes**: Can customers solve this problem a different way entirely? Spreadsheets are a substitute for BI tools.

### Industry Map Template

Create a visual map with:
1. **Center**: Your product's position in the value chain.
2. **Upstream**: Suppliers and dependencies you rely on.
3. **Downstream**: Distribution channels and end customers.
4. **Lateral**: Competitors at the same layer, complementors at adjacent layers.
5. **External forces**: Regulatory bodies, industry standards, technology shifts.

### Power Dynamics

The most strategic insight from industry mapping is understanding where power accumulates:
- **Data network effects**: Products that get better with more users (analytics platforms).
- **Switching costs**: Integration depth that makes migration expensive.
- **Standards control**: Who defines the API, format, or protocol others must follow.
- **Aggregation**: Platforms that sit between supply and demand (marketplaces).

Position your product to accumulate at least one source of structural power over time.

## Key Takeaways

- Map the full value chain from infrastructure to services before choosing your position
- Identify all stakeholder types and their influence on adoption decisions
- Use Porter's Five Forces as a structured health check for industry attractiveness
- The most strategic insight is where power accumulates: data effects, switching costs, standards
- Revisit industry maps when major shifts occur (new regulation, platform changes, M&A activity)
