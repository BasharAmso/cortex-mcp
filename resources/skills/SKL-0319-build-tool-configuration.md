---
id: SKL-0319
name: Build Tool Configuration
category: skills
tags: [build-tools, vite, webpack, turbopack, hmr, tree-shaking, bundling]
capabilities: [bundler-configuration, dev-server-setup, tree-shaking-optimization, hmr-configuration]
useWhen:
  - setting up a build tool for a new frontend project
  - configuring Vite, Webpack, or Turbopack
  - optimizing build times and bundle output
  - troubleshooting hot module replacement issues
  - understanding tree shaking and dead code elimination
estimatedTokens: 650
relatedFragments: [SKL-0308, SKL-0317, SKL-0310]
dependencies: []
synonyms: ["how to configure Vite", "how to set up Webpack", "how to speed up my build", "what is tree shaking", "how to fix hot reload not working", "vite vs webpack vs turbopack"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Skill: Build Tool Configuration

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0319 |
| **Name** | Build Tool Configuration |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Build tools transform your source code (TypeScript, JSX, CSS modules) into optimized bundles that browsers can execute. The build tool choice affects developer experience (startup speed, HMR latency) and production performance (bundle size, code splitting).

### Choosing a Build Tool (2026)

| Tool | Dev Server | Production Bundler | Best For |
|------|-----------|-------------------|----------|
| **Vite** | Native ESM, instant start | Rollup | New projects, most use cases |
| **Webpack 5** | Slower startup, proven ecosystem | Webpack | Existing projects, complex configs |
| **Turbopack** | Rust-based, fast | Turbopack | Next.js projects (built-in) |
| **Rspack** | Rust-based Webpack compat | Rspack | Drop-in Webpack replacement |

**Default choice: Vite.** It starts in milliseconds, HMR is near-instant, and configuration is minimal. Only use Webpack if you need Module Federation or have an existing Webpack config that works.

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' }, // import from '@/components/...'
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080', // proxy API requests in dev
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
});
```

### Hot Module Replacement (HMR)

HMR updates modules in the browser without a full page reload, preserving component state:

- **Vite HMR** — works out of the box for React (via the plugin), CSS, and JSON files.
- **If HMR breaks** — check for side effects in module scope. Top-level `addEventListener`, `setInterval`, or mutable global variables prevent clean HMR.
- **Force full reload** — add `// @refresh reset` at the top of a file to force a full refresh when that file changes.
- **CSS changes** — always HMR cleanly because stylesheets are replaceable without state loss.

### Tree Shaking

Tree shaking eliminates unused code from the final bundle. It works by analyzing ES module `import`/`export` statements:

**Requirements for tree shaking to work:**

1. **Use ES modules** — `import`/`export`, not `require`/`module.exports`.
2. **Set `sideEffects: false`** in `package.json` for libraries that are side-effect free.
3. **Avoid barrel files** that re-export everything — `import { Button } from './components'` may pull in every component if the bundler cannot prove the others are unused.
4. **Import specifically** — `import { debounce } from 'lodash-es'` instead of `import _ from 'lodash'`.

### Environment Variables

```typescript
// Vite: prefix with VITE_
// .env
VITE_API_URL=https://api.example.com

// Access in code
const apiUrl = import.meta.env.VITE_API_URL;
```

Never put secrets in frontend environment variables. They are embedded in the built JavaScript and visible to anyone who views the source.

### Build Optimization Checklist

- **Analyze the bundle** — run `npx vite-bundle-visualizer` or `webpack-bundle-analyzer` to find oversized modules.
- **Code split routes** — each route loads its own chunk via `React.lazy` or framework-provided dynamic imports.
- **Vendor chunking** — separate stable dependencies (React, UI library) into a dedicated chunk that caches independently.
- **Minification** — enabled by default in production builds (Terser or esbuild).
- **Compression** — configure your CDN or server to serve gzip or brotli-compressed assets.
- **Source maps** — generate for production but do not serve publicly (upload to error tracking services like Sentry).

### Common Configuration Patterns

**Path aliases** eliminate relative import hell:
```typescript
// Instead of: import { Button } from '../../../components/Button'
import { Button } from '@/components/Button';
```

**Proxy** avoids CORS issues during development by routing API requests through the dev server.

**Manual chunks** give you control over how code is split for optimal caching.

## Anti-Patterns

- Ejecting from Create React App to configure Webpack (migrate to Vite instead)
- Barrel files that re-export hundreds of modules (defeats tree shaking)
- Putting secrets in frontend environment variables
- Disabling source maps entirely (makes production debugging impossible)
- Not analyzing bundle size before shipping (hidden bloat from dependencies)

## Key Takeaways

- Vite is the default choice for new projects: instant dev server, minimal config, Rollup-powered builds
- Tree shaking requires ES modules and careful import patterns to work effectively
- Always analyze your bundle before shipping; hidden bloat is the most common performance issue
- Environment variables prefixed with `VITE_` are public; never put secrets in them
- HMR issues usually stem from side effects in module scope, not build tool bugs
