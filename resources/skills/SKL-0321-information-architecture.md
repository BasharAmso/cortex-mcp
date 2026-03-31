---
id: SKL-0321
name: Information Architecture
category: skills
tags: [information-architecture, site-maps, card-sorting, navigation, taxonomy, content-organization]
capabilities: [site-map-creation, card-sorting-analysis, navigation-design, taxonomy-development, content-audit]
useWhen:
  - organizing content and features into a navigable structure
  - planning the navigation hierarchy for a new product
  - running card sorting exercises to understand user mental models
  - auditing and restructuring an existing site's content organization
  - creating a taxonomy or labeling system for a product
estimatedTokens: 650
relatedFragments: [SKL-0103, PAT-0166, SKL-0325, SKL-0023]
dependencies: []
synonyms: ["how to organize my app navigation", "what is information architecture", "how to do card sorting", "best way to structure site navigation", "how to create a site map", "how to organize content for users"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/outline/outline"
difficulty: intermediate
owner: "cortex"
pillar: "ux-design"
---

# Skill: Information Architecture

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0321 |
| **Name** | Information Architecture |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Information architecture (IA) is the structural design of shared information environments. It determines how users find, understand, and navigate content. Poor IA is the most common cause of "I can't find anything" complaints, regardless of how polished the visual design is.

### The Four Components of IA

1. **Organization systems**: How content is grouped (by topic, by task, by audience, chronologically)
2. **Labeling systems**: What words you use for categories, links, and headings
3. **Navigation systems**: How users move through the structure (menus, breadcrumbs, links)
4. **Search systems**: How users find content by querying (filters, facets, suggestions)

### Site Map Creation

A site map is the blueprint of your product's structure. Build one before building any UI:

```
Home
├── Dashboard
├── Projects
│   ├── Project List
│   ├── Project Detail
│   └── New Project
├── Team
│   ├── Members
│   └── Roles & Permissions
├── Settings
│   ├── Profile
│   ├── Billing
│   └── Notifications
└── Help
    ├── Docs
    └── Contact Support
```

Rules: keep depth under 3 levels for primary navigation. If users need more than 3 clicks to reach critical content, the IA needs rethinking.

### Card Sorting Methods

Card sorting reveals how users naturally group your content:

| Method | How It Works | When to Use |
|--------|-------------|-------------|
| **Open sort** | Users create their own categories | Discovery phase, no existing IA |
| **Closed sort** | Users sort cards into predefined categories | Validating a proposed structure |
| **Hybrid sort** | Predefined categories, but users can create new ones | Refining an existing IA |

Run with 15-30 participants for reliable patterns. Analyze using a similarity matrix to see which items are most frequently grouped together.

### Labeling Principles

Labels are the single biggest IA decision. Bad labels make good structures invisible:

- Use the language your users use, not internal jargon
- Test labels independently of the structure (tree testing)
- Be specific: "Account Settings" over "Settings", "Order History" over "History"
- Maintain parallel structure: if one label is a noun, all siblings should be nouns
- Limit top-level navigation to 5-7 items (cognitive load research supports this)

### Tree Testing

Tree testing validates your IA without any visual design influence. Present users with a text-only hierarchy and ask them to find specific items. Measure:

- **Success rate**: Did they find the right page?
- **Directness**: Did they navigate there without backtracking?
- **Time**: How long did it take?

A task success rate below 70% signals a structural problem in that branch.

## Key Takeaways

- Information architecture is invisible when done well; users only notice it when it fails
- Card sorting reveals user mental models; use open sorts for discovery, closed sorts for validation
- Keep navigation depth under 3 levels and top-level items between 5 and 7
- Test your labels separately from your structure using tree testing
- Site maps should be created before any visual design work begins
