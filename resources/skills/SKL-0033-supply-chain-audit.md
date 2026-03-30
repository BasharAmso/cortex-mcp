---
id: SKL-0033
name: Supply Chain Audit
category: skills
tags: [security, dependencies, supply-chain, audit, OWASP, typosquatting, license-compliance, SCA]
capabilities: [dependency-health-assessment, typosquatting-detection, transitive-risk-analysis, maintainer-trust-evaluation, license-audit]
useWhen:
  - auditing dependency health beyond what npm audit or pip audit catches
  - assessing maintainer trust signals and bus factor for dependencies
  - checking for typosquatting risk or suspicious install scripts
  - evaluating transitive dependency exposure
  - reviewing license compliance across the dependency tree
estimatedTokens: 600
relatedFragments: [SKL-0034, SKL-0035, SKL-0003]
dependencies: []
synonyms: ["are my npm packages safe", "check if my dependencies are trustworthy", "audit my project libraries", "is this package sketchy", "scan for risky dependencies"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
difficulty: advanced
---

# Supply Chain Audit

Go beyond vulnerability scanners to assess the health and trustworthiness of your dependency supply chain. Known CVEs are only part of the picture. Informed by OWASP guidance on third-party component security and software composition analysis.

## OWASP Context

OWASP identifies "Vulnerable and Outdated Components" as a Top 10 web application security risk (A06:2021). This skill addresses the broader supply chain risk that vulnerability scanners miss: maintainer trust, typosquatting, license risk, and transitive dependency exposure.

## Procedure

### 1. Inventory Dependencies

Read all manifests (package.json, requirements.txt, go.mod, Cargo.toml, etc.) and lock files. Calculate:

| Metric | Threshold (Web App) | Threshold (API) | Threshold (Library) |
|--------|---------------------|-----------------|---------------------|
| Direct deps | Monitor at 50+ | Monitor at 30+ | Monitor at 20+ |
| Total (incl. transitive) | Warning at 200+ | Warning at 100+ | Warning at 50+ |
| Max nesting depth | Flag at 6+ levels | Flag at 5+ levels | Flag at 4+ levels |

### 2. Assess Dependency Health

For each direct dependency, evaluate across six trust signals:

| Signal | Healthy | Concerning | Risky |
|--------|---------|-----------|-------|
| Last publish | Under 6 months | 6-18 months | Over 18 months |
| Weekly downloads | 10,000+ | 1,000-10,000 | Under 1,000 |
| Maintainers | 3+ | 2 | 1 (bus factor risk) |
| Open issues ratio | Under 20% | 20-50% | Over 50% |
| License | MIT, Apache-2.0, BSD | LGPL, MPL | GPL, AGPL, None, Unknown |
| Repository | Active, public, CI passing | Archived | Missing, private, or no CI |

### 3. Check for Red Flags

| Red Flag | Risk | Detection |
|----------|------|-----------|
| Typosquatting | Malicious code execution | Names similar to popular packages (lodas, axois, reacr) |
| Install scripts | Arbitrary code at install time | preinstall/postinstall in package.json |
| Unpinned versions | Non-reproducible builds | Using `"*"`, `"latest"`, or wide ranges |
| No lock file | Supply chain drift | Missing package-lock.json, yarn.lock, or equivalent |
| Deprecated packages | No security patches | Marked deprecated by maintainers |
| Excessive permissions | Scope creep | Package requests network/filesystem access unexpectedly |

### 4. Evaluate Transitive Risk

Identify high-risk transitive dependencies:
- Packages with the most dependents in your tree (single points of failure)
- Abandoned packages deep in the tree (no one monitoring for CVEs)
- Known vulnerable transitive deps (cross-reference with advisory databases)

### 5. Generate Report

Structure: dependency count summary, health assessment table (sorted by risk), red flags with severity, transitive risk hotspots, license compliance summary, and prioritized recommendations (replace, pin, remove, or audit deeper).

## Key Rules

- Read-only analysis. Does not execute, install, or modify packages.
- Complements vulnerability scanners (npm audit, Snyk, Dependabot), does not replace them.
- Never recommends removing a dependency without suggesting an alternative or migration path.
- Health signals are indicators, not verdicts. Context matters.
- License findings are informational, not legal advice.
