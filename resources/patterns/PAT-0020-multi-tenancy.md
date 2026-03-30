---
id: PAT-0020
name: Multi-tenancy
category: patterns
tags: [multi-tenancy, saas, tenant-isolation, row-level-security, schema-per-tenant, shared-database]
capabilities: [tenant-isolation, data-separation, tenant-routing, rls-design]
useWhen:
  - building a SaaS with multiple customers
  - isolating tenant data
  - choosing a multi-tenancy strategy
  - implementing row-level security
estimatedTokens: 550
relatedFragments: [PAT-0003, PAT-0004, PAT-0002, SKL-0006]
dependencies: []
synonyms: ["build a SaaS for multiple customers", "separate data for each customer", "row level security setup", "multi-tenant database design", "shared vs separate databases"]
lastUpdated: "2026-03-29"
difficulty: advanced
sourceUrl: ""
---

# Multi-tenancy

Serve multiple customers from one codebase while keeping their data isolated.

## Strategy Comparison

| Strategy | Isolation | Complexity | Cost | Best For |
|----------|-----------|------------|------|----------|
| **Shared DB + tenant column** | Low (app-enforced) | Low | Lowest | Most SaaS apps, startups |
| **Shared DB + RLS** | Medium (DB-enforced) | Medium | Low | Apps needing stronger guarantees |
| **Schema per tenant** | High | High | Medium | Regulated industries, custom schemas |
| **Database per tenant** | Highest | Highest | Highest | Enterprise, strict compliance |

**Recommendation:** Start with shared database + tenant column. Add RLS when you need defense in depth. Move to isolation only when regulations or contracts require it.

## Shared Database with Tenant Column

```sql
-- Every table includes tenant_id
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_projects_tenant ON projects(tenant_id);
```

```typescript
// Middleware sets tenant context
app.use((req, res, next) => {
  req.tenantId = extractTenantFromAuth(req);
  next();
});

// Every query includes tenant filter
async function getProjects(tenantId: string) {
  return db.projects.findMany({ where: { tenantId } });
}
```

## Row-Level Security (Postgres)

```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see their tenant's rows
CREATE POLICY tenant_isolation ON projects
  USING (tenant_id = current_setting('app.tenant_id')::uuid);

-- Set tenant context per request
SET app.tenant_id = 'tenant_abc123';
SELECT * FROM projects; -- Only returns tenant_abc123's projects
```

RLS is enforced at the database level. Even if your app code has a bug that omits the tenant filter, the wrong tenant's data won't leak.

## Tenant Resolution

| Method | Example | Best For |
|--------|---------|----------|
| **Subdomain** | `acme.yourapp.com` | B2B SaaS with custom branding |
| **Path prefix** | `yourapp.com/acme/dashboard` | Simpler DNS, shared cert |
| **Auth token claim** | JWT contains `tenantId` | API-first, mobile apps |
| **Header** | `X-Tenant-ID: acme` | Internal microservices |

## Migration Considerations

- Add `tenant_id` to every table from day one (retrofitting is painful)
- Index `tenant_id` on every table (queries always filter by it)
- Unique constraints must include `tenant_id` (email unique per tenant, not globally)
- Backups and data exports scoped to tenant

## Anti-Patterns

- Forgetting the tenant filter on a single query (data leak)
- Global unique constraints that should be tenant-scoped
- No tenant context in background jobs (jobs must carry tenant ID)
- Allowing tenants to see aggregate data from other tenants
- No automated test that verifies tenant isolation
