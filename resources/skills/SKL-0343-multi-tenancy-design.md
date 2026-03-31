---
id: SKL-0343
name: Multi-Tenancy Design
category: skills
tags: [multi-tenancy, tenant-isolation, shared-infrastructure, tenant-routing, data-separation, saas]
capabilities: [tenancy-model-design, tenant-isolation, data-partitioning, tenant-routing]
useWhen:
  - designing a SaaS application that serves multiple customers
  - choosing between shared and dedicated infrastructure per tenant
  - implementing tenant-level data isolation and security
  - routing requests to the correct tenant context
  - planning a multi-tenant database schema
estimatedTokens: 670
relatedFragments: [SKL-0335, SKL-0341, SKL-0331, SKL-0334]
dependencies: []
synonyms: ["how to build a multi-tenant application", "multi-tenant database design", "shared vs dedicated tenancy", "tenant isolation strategies", "SaaS architecture patterns", "how to route requests by tenant"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: advanced
owner: "cortex"
pillar: "architecture"
---

# Multi-Tenancy Design

Multi-tenancy serves multiple customers (tenants) from a single deployment of an application. Each tenant's data and configuration are isolated while sharing the underlying infrastructure. It is the foundation of SaaS economics.

## Tenancy Models

| Model | How It Works | Isolation | Cost | Best For |
|-------|-------------|-----------|------|----------|
| **Shared everything** | All tenants share one database, one schema, rows distinguished by tenant_id | Lowest | Lowest | Early-stage SaaS, small tenants |
| **Schema per tenant** | Each tenant gets a separate schema in the same database | Medium | Medium | Moderate isolation needs, manageable tenant count |
| **Database per tenant** | Each tenant gets a dedicated database instance | Highest | Highest | Enterprise customers, compliance requirements |
| **Hybrid** | Small tenants share; large/enterprise tenants get dedicated resources | Variable | Variable | Products serving both SMB and enterprise |

Start with shared-everything. It is the simplest to build and operate. Move high-value tenants to dedicated resources when they demand it or compliance requires it.

## Data Isolation

**Row-level isolation (shared database):** Every table includes a `tenant_id` column. Every query must filter by tenant_id. A missed filter leaks data across tenants.

**Enforcement strategies:**
- **Row-level security (RLS):** The database enforces tenant filtering automatically based on the session's tenant context. PostgreSQL supports this natively.
- **Application middleware:** Set the tenant context at the start of every request. ORM or query builder automatically appends the tenant filter.
- **Testing:** Write tests that deliberately omit tenant_id to verify the safety net catches it.

Never rely solely on the application layer. Defense in depth: application filter + database RLS + regular audit queries that scan for cross-tenant data leaks.

## Tenant Routing

The system must identify which tenant a request belongs to. Common approaches:

- **Subdomain:** `acme.yourapp.com` maps to tenant "acme". Clean, but requires wildcard DNS and TLS.
- **Path prefix:** `yourapp.com/acme/dashboard`. Simpler infrastructure but less clean URLs.
- **Header / token:** The JWT or API key contains the tenant ID. Best for APIs.
- **Custom domain:** Tenant provides their own domain (e.g., `app.acme.com`). Best user experience but most complex to manage (TLS provisioning per domain).

Resolve tenant identity as early as possible in the request lifecycle (middleware or API gateway) and propagate it through the entire call chain.

## Configuration and Customization

Tenants often need different configurations: feature flags, branding, limits, and integrations.

Store tenant configuration in a dedicated table or config service. Cache aggressively (tenant config changes infrequently). Apply configuration at the start of each request alongside tenant identity resolution.

**Feature flags per tenant** enable gradual rollouts, plan-based feature gating, and custom enterprise features without code branches.

## Noisy Neighbor Problem

One tenant's heavy usage can degrade performance for others sharing the same resources.

**Mitigation:**
- **Rate limiting per tenant** at the API gateway
- **Resource quotas** (database connections, storage, compute) per tenant
- **Queue isolation** for background jobs (separate queues or priority lanes per tenant tier)
- **Monitoring per tenant** to identify which tenant is consuming disproportionate resources
- **Auto-scaling** triggered by aggregate load, with per-tenant circuit breakers

## Operational Considerations

- **Migrations:** Schema changes must work for all tenants simultaneously (shared) or be rolled out tenant-by-tenant (dedicated). Plan for both.
- **Backups and restore:** Can you restore a single tenant's data without affecting others? Shared databases make this harder.
- **Onboarding:** Automate tenant provisioning (create schema, seed data, configure defaults) so it takes seconds, not hours.
- **Offboarding:** Have a clear process for data export, deletion, and resource cleanup when a tenant leaves.
- **Compliance:** Some industries require data residency (tenant data stored in a specific region). Factor this into your tenancy model early.
