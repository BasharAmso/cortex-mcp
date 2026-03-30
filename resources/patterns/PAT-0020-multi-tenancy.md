---
id: PAT-0020
name: Multi-tenancy
category: patterns
tags: [multi-tenancy, saas, tenant-isolation, row-level-security, schema-per-tenant, shared-database, rls, security]
capabilities: [tenant-isolation, data-separation, tenant-routing, rls-design]
useWhen:
  - building a SaaS application serving multiple customers
  - isolating tenant data in a shared database
  - choosing between shared-DB, schema-per-tenant, and DB-per-tenant
  - implementing row-level security in PostgreSQL
  - resolving tenant context from subdomains, paths, or tokens
estimatedTokens: 600
relatedFragments: [PAT-0003, PAT-0004, PAT-0002, SKL-0006]
dependencies: []
synonyms: ["build a SaaS for multiple customers", "separate data for each customer", "row level security setup", "multi-tenant database design", "shared vs separate databases for SaaS"]
lastUpdated: "2026-03-29"
difficulty: advanced
owner: builder
sourceUrl: "https://github.com/donnemartin/system-design-primer"
---

# Multi-tenancy

Serve multiple customers from one codebase while keeping their data isolated. System design decisions here impact scalability, security, and operational complexity.

## Strategy Comparison

| Strategy | Isolation | Complexity | Cost | Best For |
|----------|-----------|------------|------|----------|
| **Shared DB + tenant column** | Low (app-enforced) | Low | Lowest | Most SaaS apps, startups |
| **Shared DB + RLS** | Medium (DB-enforced) | Medium | Low | Apps needing stronger guarantees |
| **Schema per tenant** | High | High | Medium | Regulated industries, custom schemas |
| **Database per tenant** | Highest | Highest | Highest | Enterprise, strict compliance |

**Recommendation:** Start with shared database + tenant column. Add RLS for defense in depth. Move to higher isolation only when regulations or contracts require it.

## Implementation Steps

1. **Add `tenant_id` to every table from day one.** Retrofitting is painful and error-prone. Include it in your initial schema design.
2. **Index `tenant_id` on every table.** Queries always filter by it. Without indexes, full table scans on large datasets.
3. **Scope unique constraints to tenant.** Email uniqueness should be per-tenant, not global: `UNIQUE(tenant_id, email)`.
4. **Set tenant context in middleware.** Extract from auth token, subdomain, or header. Every downstream query uses it.
5. **Test isolation explicitly.** Write automated tests that verify Tenant A cannot access Tenant B's data.

## Row-Level Security (Postgres)

```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON projects
  USING (tenant_id = current_setting('app.tenant_id')::uuid);

-- Set per request
SET app.tenant_id = 'tenant_abc123';
SELECT * FROM projects; -- Only returns this tenant's data
```

RLS is enforced at the database level. Even buggy application code that omits the tenant filter cannot leak data.

## Tenant Resolution

| Method | Example | Best For |
|--------|---------|----------|
| **Subdomain** | `acme.yourapp.com` | B2B SaaS with custom branding |
| **Path prefix** | `yourapp.com/acme/dashboard` | Simpler DNS, shared cert |
| **Auth token claim** | JWT contains `tenantId` | API-first, mobile apps |
| **Header** | `X-Tenant-ID: acme` | Internal microservices |

## Anti-Patterns

- Forgetting the tenant filter on a single query (data leak)
- Global unique constraints that should be tenant-scoped
- No tenant context in background jobs (jobs must carry tenant ID)
- Allowing tenants to see aggregate data from other tenants
- No automated test that verifies tenant isolation
