---
id: PAT-0025
name: Connection Pooling
category: patterns
tags: [connection-pooling, pgbouncer, serverless, database-connections, pool-sizing, supabase]
capabilities: [pool-configuration, connection-management, serverless-db-strategy, pool-sizing]
useWhen:
  - application is running out of database connections
  - deploying to serverless (Vercel, AWS Lambda) and hitting connection limits
  - deciding between PgBouncer and built-in ORM pooling
  - configuring connection pool size for production
estimatedTokens: 550
relatedFragments: [PAT-0004, PAT-0022, SKL-0008, SKL-0006]
dependencies: []
synonyms: ["too many database connections error", "how to set up pgbouncer", "serverless database connection problems", "how many connections should my pool have", "supabase connection pooling how to use"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Connection Pooling

Why connections are expensive, how pooling works, and how to size your pool.

## Why It Matters

Each PostgreSQL connection costs ~5-10MB of memory. A database with `max_connections = 100` is using 500MB-1GB just for connections. Without pooling, a serverless app can spawn hundreds of connections per minute, exhausting the database.

## Pooling Modes

| Mode | How It Works | Best For |
|------|-------------|----------|
| **Session** | One pool connection per client session | Long-lived app servers |
| **Transaction** | Connection returned to pool after each transaction | Most web apps, APIs |
| **Statement** | Connection returned after each SQL statement | Simple read-heavy queries |

**Default choice: Transaction mode.** It gives the best connection reuse for typical web applications.

## Pooling Options Compared

| Option | Where It Runs | Pros | Cons |
|--------|--------------|------|------|
| ORM built-in (Prisma, SQLAlchemy) | Application | Zero setup, per-app control | Each app instance has its own pool |
| PgBouncer | Sidecar or proxy | Shared pool across all apps, lightweight | Extra infrastructure to manage |
| Supabase Pooler (Supavisor) | Managed service | Zero setup, scales with Supabase | Supabase-only |
| Neon connection pooling | Managed service | Built into Neon, serverless-native | Neon-only |

## Pool Sizing Formula

```
pool_size = (number_of_cores * 2) + effective_spindle_count
```

For most cloud databases, simplify to:

```
pool_size = cpu_cores * 2 + 1
```

**Example:** 4-core database server = pool of 9 connections.

**Key insight:** A larger pool is NOT faster. Too many connections cause context switching and contention. A pool of 10 usually outperforms a pool of 100.

## Serverless Configuration

Serverless functions (Vercel, Lambda) create a new process per invocation. Without pooling, each invocation opens a new connection.

```
# Prisma with Supabase pooler (transaction mode)
DATABASE_URL="postgresql://user:pass@project.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Prisma with Neon serverless driver
DATABASE_URL="postgresql://user:pass@ep-cool-name.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

**Rules for serverless:**
1. Always use an external pooler (PgBouncer, Supabase Pooler, Neon)
2. Set the application pool size to 1 per function instance
3. Use transaction mode, not session mode
4. Set aggressive connection timeouts (5-10 seconds)

## Monitoring Checklist

```sql
-- Current connection count
SELECT count(*) FROM pg_stat_activity;

-- Connections by state
SELECT state, count(*)
FROM pg_stat_activity
GROUP BY state;

-- Connections approaching limit
SELECT max_conn, used, max_conn - used AS available
FROM (SELECT count(*) AS used FROM pg_stat_activity) t,
     (SELECT setting::int AS max_conn FROM pg_settings WHERE name = 'max_connections') m;
```

**Alert when connection usage exceeds 80% of max_connections.**
