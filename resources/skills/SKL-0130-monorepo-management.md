---
id: SKL-0130
name: Monorepo Management
category: skills
tags: [monorepo, nx, turborepo, pnpm-workspaces, task-orchestration, build-caching, affected-detection, versioning]
capabilities: [monorepo-setup, build-optimization, dependency-management, workspace-orchestration]
useWhen:
  - setting up a monorepo for a multi-package project
  - choosing between Nx, Turborepo, and other build tools
  - optimizing CI/CD build times with caching and affected detection
  - managing shared dependencies across packages
  - deciding between monorepo and polyrepo
estimatedTokens: 700
relatedFragments: [PAT-0006, PAT-0010, SKL-0018]
dependencies: []
synonyms: ["how to set up a monorepo", "Nx vs Turborepo", "monorepo for beginners", "pnpm workspaces guide", "how to manage multiple packages", "monorepo build caching"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/korfuri/awesome-monorepo"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Monorepo Management

A monorepo stores multiple projects or packages in a single repository. The key challenge is keeping builds fast and dependencies consistent as the codebase grows.

## Tool Comparison

| Tool | Language Focus | Key Strength | Remote Cache |
|------|---------------|-------------|--------------|
| **Nx** | TypeScript/JS (multi-language support) | Task graph optimization, code generation, module boundaries | Yes (Nx Cloud) |
| **Turborepo** | TypeScript/JS | Simple setup, fast incremental builds | Yes (Vercel) |
| **Bazel** | Multi-language (Java, Go, C++, etc.) | Hermetic builds, massive scale (Google-scale) | Yes |
| **Pants** | Python, Go, Java | Cross-language support, fine-grained targets | Yes |
| **Rush** | TypeScript | Large-scale TS monorepos, deterministic installs | Via plugins |
| **Lerna** | JavaScript | Package publishing and versioning | Via Nx integration |

## Core Concepts

**Task Orchestration.** Build tools model dependencies between tasks as a directed graph. `build` in package A depends on `build` in package B if A imports B. The tool runs tasks in the correct order, parallelizing where possible.

**Caching.** Cache task outputs (build artifacts, test results) based on input hashes. If inputs have not changed, skip the task and restore from cache. Remote caching shares results across CI machines and developer laptops.

**Affected Detection.** Only run tasks for packages affected by the current change. If you modify `packages/auth`, only test and build `auth` and its dependents, not the entire repo.

## Workspace Setup (pnpm)

pnpm workspaces provide the package management layer. Define workspace packages in `pnpm-workspace.yaml`:
- Shared dependencies are hoisted to the root
- Per-package dependencies remain isolated
- `pnpm install` resolves the entire dependency graph efficiently
- Content-addressable storage deduplicates packages on disk

## Dependency Consistency

Use `syncpack` or workspace protocol (`workspace:*`) to ensure all packages use the same version of shared dependencies. Inconsistent versions cause subtle runtime bugs and bloated bundles.

## CI/CD Strategy

1. **Use affected commands**: only build/test what changed and its dependents
2. **Enable remote caching**: share build artifacts between CI runs and local development
3. **Parallelize tasks**: let the build tool manage task ordering and parallelism
4. **Cache the dependency install**: lock file hash as the cache key for `node_modules`

## Versioning Strategies

| Strategy | Description | Best For |
|----------|------------|----------|
| **Fixed/Locked** | All packages share one version number | Products shipped together |
| **Independent** | Each package versioned separately | Libraries with different release cadences |
| **Conventional Commits** | Automate version bumps from commit messages | Teams with consistent commit discipline |

## Code Ownership

Use `CODEOWNERS` files to assign teams to specific packages or directories. This enforces review requirements: changes to `packages/billing` require approval from the billing team, even in a shared repo.

## When to Use a Monorepo

Monorepos work well when teams share code, need atomic cross-package changes, or want unified CI/CD. They struggle when teams have no shared code, use different languages with incompatible tooling, or when the repo grows beyond the version control system's ability to handle it efficiently.
