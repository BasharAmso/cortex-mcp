---
id: SKL-0105
name: Information Architecture
category: skills
tags: [information-architecture, navigation, site-map, content-grouping, labeling, search, taxonomy, card-sorting]
capabilities: [site-map-design, navigation-hierarchy, content-organization, labeling-systems, search-pattern-design]
useWhen:
  - organizing content and features for a new application or website
  - designing navigation structures and menu hierarchies
  - running card sorts to understand how users group information
  - planning search and filtering systems for content-heavy products
estimatedTokens: 650
relatedFragments: [SKL-0023, SKL-0103, SKL-0106, SKL-0003]
dependencies: []
synonyms: ["how to organize my app navigation", "site map for my product", "how should I group my content", "menu structure best practices", "how users find things in my app", "taxonomy and labeling"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/18F/ux-guide"
difficulty: intermediate
owner: designer
pillar: "ux-design"
---

# Information Architecture

Information architecture determines how content is organized, labeled, and connected so users can find what they need and understand where they are. Poor IA is the root cause of most "I can't find it" complaints.

## Four Components of IA

| Component | Purpose | Example |
|-----------|---------|---------|
| **Organization** | How content is grouped and structured | Categories, sections, hierarchies |
| **Labeling** | What things are called | Menu items, page titles, button text |
| **Navigation** | How users move between content | Menus, breadcrumbs, links, tabs |
| **Search** | How users find specific content | Search bar, filters, faceted browsing |

## Site Map Design

A site map is the blueprint of your content hierarchy. Build it before designing screens.

1. **Inventory existing content**: List every page, feature, and content type
2. **Group by user mental model**: Organize based on how users think, not how your team is structured
3. **Limit depth to 3 levels**: If users need more than 3 clicks to reach content, the hierarchy is too deep
4. **Validate with card sorting**: Have real users group and label content to test your assumptions

### Card Sorting Methods

- **Open sort**: Participants create their own groups and labels. Use during discovery to learn user mental models.
- **Closed sort**: Participants sort content into predefined categories. Use to validate an existing structure.
- **Hybrid sort**: Predefined categories with the option to create new ones. Balances structure with discovery.

Minimum 15 participants for reliable card sort results. Analyze with similarity matrices to find consensus groupings.

## Navigation Patterns

| Pattern | Best For | Limit |
|---------|----------|-------|
| **Top nav** | Primary sections, 4-7 items | Fewer than 8 top-level items |
| **Side nav** | Deep hierarchies, admin tools, documentation | Works well beyond 7 items with collapsible sections |
| **Tab bar (mobile)** | Core app sections | 3-5 tabs maximum |
| **Breadcrumbs** | Deep hierarchies, e-commerce | Always show current location in the tree |
| **Contextual links** | Related content, "see also" | Place near relevant content, not buried in footers |

## Labeling Principles

- Use language your users use, not internal terminology. Validate labels with tree testing.
- Be specific: "Billing History" is better than "Account" when that is the destination
- Be consistent: If "Settings" appears in the nav, the page title should also say "Settings"
- Avoid jargon unless your audience expects it (developer docs vs consumer app)
- Front-load keywords: "Payment Methods" not "Manage Your Payment Methods"

## Search and Filtering

For content-heavy products (10+ pages or items), search is mandatory:

- **Search bar**: Visible on every page, not hidden behind an icon on desktop
- **Autocomplete**: Suggest results after 2-3 characters to guide users
- **Filters and facets**: Let users narrow results by category, date, status, or type
- **Empty states**: When search returns nothing, suggest alternatives or show popular content
- **Search analytics**: Track what users search for to identify content gaps and labeling failures

## Validation Methods

- **Tree testing**: Users find items in a text-only hierarchy (no visual design influence). Measures findability.
- **First-click testing**: Track where users click first for a given task. Correct first clicks predict task success 87% of the time.
- **Analytics review**: High bounce rates and short session times on content pages signal IA problems.
