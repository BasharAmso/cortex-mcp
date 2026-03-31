---
id: SKL-0190
name: Multi-Location Management
category: skills
tags: [multi-location, franchise, centralized-reporting, branch-management, erp, inventory-sync]
capabilities: [multi-site-operations, centralized-reporting, inventory-synchronization, franchise-management]
useWhen:
  - managing operations across multiple business locations
  - setting up centralized reporting for a franchise or chain
  - synchronizing inventory across branches
  - standardizing processes across locations while allowing local flexibility
  - expanding from a single location to multiple sites
estimatedTokens: 650
relatedFragments: [SKL-0184, SKL-0187, SKL-0185]
dependencies: []
synonyms: ["how do I manage multiple store locations", "centralized reporting for my franchise", "inventory sync across locations", "expanding to a second location", "how to run a multi-site business"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/erpnext"
difficulty: intermediate
owner: "cortex"
pillar: "business-automation"
---

# Skill: Multi-Location Management

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0190 |
| **Name** | Multi-Location Management |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Multi-location management is the operational challenge of running multiple business sites as one coherent organization. ERPNext, a full-featured open-source ERP built on the Frappe Framework, demonstrates how to structure multi-company operations with centralized visibility and local autonomy.

### Data Architecture: Shared vs Local

The fundamental design decision is what to centralize versus what to localize. ERPNext supports multi-company configurations where each location can be a separate legal entity or a branch of one entity. Apply this pattern: **centralize** your product catalog, pricing rules, brand standards, and reporting. **Localize** inventory counts, staff schedules, local promotions, and location-specific settings (tax rates, operating hours). This gives headquarters visibility without micromanaging each site.

### Centralized Reporting

ERPNext provides consolidated financial and operational dashboards across entities. For multi-location businesses, build three reporting tiers: (1) **Executive dashboard** showing all-location revenue, costs, and KPIs side-by-side. (2) **Location comparison** ranking sites by performance metrics (revenue per employee, customer satisfaction, inventory turnover). (3) **Location detail** letting each manager see their own numbers in depth. The comparison view is the most valuable: it reveals which locations need attention and which have best practices worth spreading.

### Inventory Synchronization

ERPNext tracks inventory across locations with inter-warehouse transfer capabilities. For retail and restaurants: maintain a central catalog but track stock per location. Enable inter-location transfers for rebalancing (send excess stock from location A to location B). Set reorder points per location based on that location's sales velocity, not company-wide averages. For franchises, the franchisor may manage approved supplier lists while franchisees place their own orders.

### Standardized Operations

Create a playbook that every location follows: opening/closing procedures, service standards, pricing rules, and escalation paths. ERPNext's HR module manages personnel across branches, ensuring consistent policies. The balance is: standardize processes (how you greet customers, how you handle complaints) but allow local adaptation (seasonal menu items, community partnerships). Use role-based access control so location managers can modify their local settings but cannot change company-wide configurations.

### Franchise-Specific Considerations

If operating as a franchise: each franchisee is a separate company in the ERP with its own accounting, but the franchisor has read access to consolidated reports. Royalty calculations (percentage of revenue) can be automated from sales data. ERPNext's multi-company architecture with consolidated visibility maps directly to this model. Track franchise-specific metrics: compliance audit scores, brand standard adherence, and training completion rates.

### Scaling from One to Two

The hardest expansion is from one location to two. Before opening location two: document every process at location one (if it is not written down, it does not scale). Set up your centralized systems (ERP, POS, reporting) with multi-location support before you need it. Hire a location manager for the original site so you are free to focus on the new one. ERPNext's Docker-based deployment supports adding new company entities without infrastructure overhaul.

## Key Takeaways

- Centralize catalog, pricing, and reporting while localizing inventory, schedules, and promotions
- Build three reporting tiers: executive overview, location comparison, and location detail
- Set per-location reorder points based on local sales velocity, not company averages
- Document every process at your first location before expanding to a second
- Use role-based access so location managers have autonomy within defined boundaries
