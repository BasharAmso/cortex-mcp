---
id: SKL-0327
name: Design System Governance
category: skills
tags: [design-system, governance, storybook, component-library, versioning, contribution-model]
capabilities: [contribution-workflow, versioning-strategy, adoption-tracking, documentation-standards, deprecation-management]
useWhen:
  - establishing a contribution model for a shared design system
  - versioning and releasing design system updates without breaking consumers
  - measuring and improving design system adoption across teams
  - documenting components for both designers and developers
  - deprecating components without disrupting existing usage
estimatedTokens: 650
relatedFragments: [SKL-0322, SKL-0049, SKL-0330, SKL-0005]
dependencies: []
synonyms: ["how to manage a shared design system", "design system contribution process", "how to version a component library", "how to get teams to adopt the design system", "how to deprecate a design system component", "design system governance model"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/storybookjs/storybook"
difficulty: advanced
owner: "cortex"
pillar: "ux-design"
---

# Skill: Design System Governance

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0327 |
| **Name** | Design System Governance |
| **Category** | Skills |
| **Complexity** | Advanced |

## Core Concepts

A design system without governance decays into a component dumping ground. Governance defines who can contribute, how changes are reviewed, how versions are released, and how adoption is measured. The goal is sustainable growth without bottlenecks.

### Contribution Model

Three governance models, from tight to open:

| Model | Who Contributes | Review Process | Best For |
|-------|----------------|---------------|----------|
| **Centralized** | Core design system team only | Internal team review | Small orgs, early-stage systems |
| **Federated** | Any team with DS team approval | PR review by DS maintainers | Mid-size orgs, growing systems |
| **Open** | Anyone following contribution guidelines | Automated checks + peer review | Large orgs, mature systems |

Most teams start centralized and move toward federated as the system matures. The federated model scales best: product teams contribute components they need, and the design system team reviews for consistency.

### Contribution Workflow

```
1. Proposal  → Issue describing the component need and use cases
2. Design    → Figma spec reviewed by design system team
3. Build     → Component built following coding standards
4. Document  → Storybook stories with all variants, props table, usage guidelines
5. Review    → Code review by DS maintainers (API, accessibility, visual)
6. Release   → Merged to main, published in next version
```

Every new component must include: all visual states (default, hover, active, focus, disabled, error), responsive behavior, accessibility attributes, and at least 3 usage examples in Storybook.

### Versioning Strategy

Use semantic versioning (semver) for the component library:

| Change Type | Version Bump | Example |
|------------|-------------|---------|
| Bug fix, visual tweak | Patch (1.0.x) | Fixed button focus ring color |
| New component, new prop | Minor (1.x.0) | Added Tooltip component |
| Breaking API change | Major (x.0.0) | Renamed Button `type` prop to `variant` |

Publish a changelog with every release. Automated tools like Changesets or semantic-release reduce manual work.

### Deprecation Process

Never remove components abruptly. Follow a deprecation lifecycle:

1. **Announce**: Mark the component as deprecated in docs and Storybook with the replacement path
2. **Warn**: Add a console warning in development mode with migration instructions
3. **Sunset period**: Give consumers 2 major versions (or a fixed timeline) to migrate
4. **Remove**: Delete the component only after confirming zero usage via adoption metrics

### Documentation Standards

Each component in Storybook should include:

- **Description**: What the component does and when to use it
- **Props table**: Auto-generated from TypeScript types
- **Variants**: Stories showing every meaningful state and combination
- **Do/Don't**: Visual examples of correct and incorrect usage
- **Accessibility notes**: ARIA attributes, keyboard behavior, screen reader expectations
- **Related components**: Links to alternatives (use Tabs instead of Accordion for X)

### Measuring Adoption

Track these metrics to understand design system health:

- **Coverage**: Percentage of product UI built with design system components
- **Version currency**: How many teams are on the latest version
- **Contribution rate**: Components contributed by product teams vs. DS team
- **Override rate**: How often teams override default styles (high overrides signal missing variants)
- **Time to adopt**: How quickly new components are used after release

## Key Takeaways

- Start with a centralized model and evolve toward federated as the system and team mature
- Every component needs complete documentation: all states, props, usage guidelines, and accessibility notes
- Use semantic versioning and changelogs so consumers can upgrade confidently
- Never remove components without a deprecation period and migration path
- Measure adoption through coverage, version currency, and override rates to guide priorities
