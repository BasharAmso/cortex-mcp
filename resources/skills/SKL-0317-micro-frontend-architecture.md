---
id: SKL-0317
name: Micro-Frontend Architecture
category: skills
tags: [micro-frontend, module-federation, independent-deployment, webpack, monorepo, shared-dependencies]
capabilities: [micro-frontend-design, module-federation-setup, shared-dependency-management, independent-deployment]
useWhen:
  - splitting a large frontend into independently deployable units
  - enabling multiple teams to work on different parts of the UI
  - implementing module federation with Webpack or Vite
  - deciding whether micro-frontends are appropriate for a project
  - managing shared dependencies across micro-frontends
estimatedTokens: 650
relatedFragments: [SKL-0310, SKL-0319, SKL-0308]
dependencies: []
synonyms: ["how to split a frontend into micro-frontends", "what is module federation", "how to independently deploy frontend features", "how to share dependencies across micro-frontends", "when should I use micro-frontends", "how to structure a micro-frontend project"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: advanced
owner: "cortex"
pillar: "frontend"
---

# Skill: Micro-Frontend Architecture

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0317 |
| **Name** | Micro-Frontend Architecture |
| **Category** | Skills |
| **Complexity** | Advanced |

## Core Concepts

Micro-frontends extend the microservices principle to the frontend: independently developed, tested, and deployed UI modules owned by different teams. This is an advanced pattern that solves organizational scaling problems, not technical ones.

### When Micro-Frontends Make Sense

| Situation | Micro-Frontends? |
|-----------|-----------------|
| 3+ teams contributing to one frontend | Yes, strong candidate |
| Different release cadences per feature area | Yes |
| Legacy app migration (strangler fig pattern) | Yes |
| Single team, greenfield project | No, use a monolith |
| Small app, fewer than 50 routes | No, overkill |
| Need pixel-perfect consistency | Harder with micro-frontends |

**The rule:** if you do not have an organizational scaling problem, you do not need micro-frontends. The architectural complexity is the cost; independent deployment is the benefit.

### Module Federation (Webpack 5)

Module Federation allows multiple Webpack builds to share modules at runtime:

```javascript
// Host (shell) webpack.config.js
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    dashboard: 'dashboard@https://dashboard.cdn.com/remoteEntry.js',
    settings: 'settings@https://settings.cdn.com/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
});

// Remote (dashboard) webpack.config.js
new ModuleFederationPlugin({
  name: 'dashboard',
  filename: 'remoteEntry.js',
  exposes: {
    './DashboardApp': './src/DashboardApp',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
});
```

### Integration Approaches

| Approach | How It Works | Trade-offs |
|----------|-------------|------------|
| **Module Federation** | Runtime JS loading, shared dependencies | Best DX, Webpack/Vite specific |
| **iframes** | Each micro-frontend in an iframe | Total isolation, poor UX (no shared styles, navigation) |
| **Web Components** | Custom elements with shadow DOM | Framework-agnostic, limited React interop |
| **Build-time composition** | npm packages assembled at build | No independent deployment (defeats the purpose) |
| **Server-side composition** | Fragments assembled by edge/server | Works with any framework, complex infrastructure |

Module Federation is the most practical approach for React-based micro-frontends.

### Shared Dependencies

The biggest challenge is managing shared libraries (React, design system, router):

1. **Mark shared deps as singletons** — React must load exactly once. Module Federation's `singleton: true` enforces this.
2. **Pin compatible version ranges** — all micro-frontends must agree on the major version of shared libraries.
3. **Design system as a shared package** — publish your component library as an npm package consumed by all micro-frontends.
4. **Minimize shared surface** — the more you share, the more coupling you introduce. Share React, the router, and the design system. Nothing else.

### Communication Between Micro-Frontends

Micro-frontends should be loosely coupled. Communication options:

| Method | Use Case |
|--------|----------|
| **URL/route params** | Navigation between micro-frontends |
| **Custom events** | Lightweight cross-module signals (`window.dispatchEvent`) |
| **Shared state store** | Global state needed by multiple modules (auth, user, theme) |
| **Props at boundaries** | Parent shell passes data to mounted micro-frontend |

Avoid direct imports between micro-frontends. If module A imports from module B, they are not independent.

### Deployment Model

Each micro-frontend deploys independently:

1. Build and publish to a CDN with a versioned `remoteEntry.js`.
2. The shell app loads remote entries at runtime.
3. No coordination needed between teams for deployment.
4. Rollback is as simple as pointing back to the previous `remoteEntry.js`.

### Testing Strategy

- **Unit/Integration:** Each micro-frontend has its own test suite.
- **Contract tests:** Verify that the exposed API (props, events) matches what the shell expects.
- **E2E:** Run against the composed application with all micro-frontends loaded. This is the most valuable and most expensive test.

## Anti-Patterns

- Adopting micro-frontends with a single team (all cost, no benefit)
- Sharing too many dependencies (creates tight coupling that defeats independence)
- Direct imports between micro-frontends (they are no longer independent)
- Inconsistent design systems across micro-frontends (users notice)
- No E2E tests for the composed application

## Key Takeaways

- Micro-frontends solve organizational scaling, not technical problems
- Module Federation is the most practical integration approach for React apps
- Share React and the design system as singletons; minimize everything else
- Each micro-frontend deploys independently to its own CDN path
- If you have one team, use a monolith; the complexity is not worth it
