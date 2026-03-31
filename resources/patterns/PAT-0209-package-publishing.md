---
id: PAT-0209
name: Package Publishing Pattern
category: patterns
tags: [npm, pip, cargo, publishing, versioning, ci-release]
capabilities: [package-publishing, semantic-versioning, ci-release-automation, registry-management]
useWhen:
  - publishing a package to npm, PyPI, crates.io, or similar registries
  - setting up automated releases from CI
  - choosing a versioning strategy for a library
  - managing changelogs and release notes
  - configuring package metadata and distribution
estimatedTokens: 650
relatedFragments: [PAT-0207, PAT-0010, SKL-0408, SKL-0409]
dependencies: []
synonyms: ["how to publish an npm package", "how to publish to PyPI", "semantic versioning guide", "automated releases from CI", "how to version a library", "how to publish a Rust crate"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/npm/cli"
difficulty: beginner
owner: "cortex"
pillar: "language"
---

# Package Publishing Pattern

Best practices for publishing, versioning, and releasing packages to language-specific registries.

## Registry Overview

| Ecosystem | Registry | Config File | Publish Command |
|-----------|----------|-------------|-----------------|
| **Node.js** | npm / GitHub Packages | `package.json` | `npm publish` |
| **Python** | PyPI | `pyproject.toml` | `twine upload` / `python -m build` |
| **Rust** | crates.io | `Cargo.toml` | `cargo publish` |
| **Ruby** | RubyGems | `*.gemspec` | `gem push` |
| **PHP** | Packagist | `composer.json` | Git tag (auto-indexed) |

## Semantic Versioning

Follow semver (`MAJOR.MINOR.PATCH`): bump MAJOR for breaking changes, MINOR for new features (backward compatible), PATCH for bug fixes. Use pre-release tags for beta releases (`1.2.0-beta.1`). Lock your public API surface before 1.0.0. After 1.0.0, every breaking change requires a major version bump.

## Pre-Publish Checklist

1. **Tests pass.** Run the full test suite, not just unit tests.
2. **Lint clean.** No warnings, no formatting issues.
3. **Changelog updated.** Document what changed, what was added, what was fixed.
4. **README accurate.** Installation instructions, basic usage, and API reference are current.
5. **License present.** Include a LICENSE file.
6. **`.npmignore` / `MANIFEST.in` configured.** Exclude tests, docs, and dev configs from the published package.
7. **Dry run.** `npm pack --dry-run` or equivalent to inspect what gets published.

## CI-Automated Releases

Automate publishing from CI to eliminate human error. The pattern: push a git tag (e.g., `v1.2.3`), CI detects the tag, runs tests, builds, and publishes. Store registry tokens as CI secrets. Use tools like `semantic-release` (Node.js), `twine` with GitHub Actions (Python), or `cargo-release` (Rust).

```yaml
# GitHub Actions example
on:
  push:
    tags: ['v*']
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Anti-Patterns

- Publishing without running tests first
- Using `latest` tag for experimental releases (use `next` or `beta` dist-tags)
- Forgetting to exclude source maps, test fixtures, or `.env` files
- Breaking changes in minor or patch versions
- Manual, ad-hoc publishing without CI automation
