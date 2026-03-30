---
id: SKL-0033
name: Supply Chain Audit
category: skills
tags: [security, dependencies, supply-chain, audit]
capabilities: [dependency-health-assessment, typosquatting-detection, transitive-risk-analysis, maintainer-trust-evaluation]
useWhen:
  - auditing dependency health beyond what npm audit or pip audit catches
  - assessing maintainer trust signals and bus factor for dependencies
  - checking for typosquatting risk or suspicious install scripts
  - evaluating transitive dependency exposure
estimatedTokens: 600
relatedFragments: [SKL-0034, SKL-0035, SKL-0003]
dependencies: []
synonyms: ["are my npm packages safe", "check if my dependencies are trustworthy", "audit my project libraries", "is this package sketchy", "scan for risky dependencies"]
lastUpdated: "2026-03-29"
difficulty: advanced
---

# Supply Chain Audit

Go beyond vulnerability scanners to assess the health and trustworthiness of your dependency supply chain. Known CVEs are only part of the picture.

## Procedure

### 1. Inventory Dependencies

Read all manifests (package.json, requirements.txt, go.mod, etc.) and lock files. Calculate:

- Direct vs dev vs transitive dependency counts
- Maximum nesting depth
- Flag if total count exceeds thresholds (web app: >200, API: >100, library: >50)

### 2. Assess Dependency Health

For each direct dependency, evaluate:

| Signal | Healthy | Concerning | Risky |
|--------|---------|-----------|-------|
| Last publish | Under 6 months | 6-18 months | Over 18 months |
| Weekly downloads | 10,000+ | 1,000-10,000 | Under 1,000 |
| Maintainers | 3+ | 2 | 1 (bus factor) |
| Open issues ratio | Under 20% | 20-50% | Over 50% |
| License | MIT, Apache, BSD | LGPL, MPL | GPL, AGPL, None |
| Repository | Active, public | Archived | Missing or private |

### 3. Check for Red Flags

- **Typosquatting:** Names similar to popular packages
- **Install scripts:** preinstall/postinstall executing arbitrary code
- **Unpinned versions:** Using `"*"` or `"latest"`
- **No lock file:** Non-reproducible builds
- **Deprecated packages:** Marked deprecated by maintainers

### 4. Evaluate Transitive Risk

Identify high-risk transitive dependencies: packages with the most dependents in your tree (single points of failure), abandoned packages, and known vulnerabilities.

### 5. Generate Report

Structure: dependency summary, health assessment table, red flags with severity, transitive risks, and prioritized recommendations (replace, pin, remove, or audit).

## Key Rules

- Read-only analysis. Does not execute or install packages.
- Complements vulnerability scanners, does not replace them.
- Never recommends removing a dependency without suggesting an alternative.
- Health signals are indicators, not verdicts.
