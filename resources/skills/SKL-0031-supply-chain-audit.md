---
id: SKL-0031
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
relatedFragments: [SKL-0029, SKL-0030, SKL-0017]
dependencies: []
synonyms: ["are my npm packages safe", "check if my dependencies are trustworthy", "audit my project libraries", "is this package sketchy", "scan for risky dependencies"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
difficulty: advanced
owner: reviewer
---

# Skill: Supply Chain Audit

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0031 |
| **Version** | 1.0 |
| **Owner** | reviewer |
| **Inputs** | Dependency manifests, lock files, STATE.md |
| **Outputs** | Supply chain risk report, STATE.md updated |
| **Triggers** | `SUPPLY_CHAIN_AUDIT_REQUESTED` |

---

## Purpose

Go beyond `npm audit` and `pip audit` to assess the *health and trustworthiness* of your dependency supply chain. Known vulnerabilities are only part of the picture — abandoned packages, single-maintainer risks, typosquatting, and deep transitive dependencies are where real supply chain attacks happen.

> **See also:** For code-level vulnerabilities and OWASP checks, see SKL-0015 (Security Audit).

---

## Procedure

### Step 1 — Inventory Dependencies

Read all dependency manifests and lock files. Build a dependency inventory:

| Field | Source |
|-------|--------|
| Direct dependencies | package.json, requirements.txt, etc. |
| Dev dependencies | Separate from production deps |
| Transitive dependencies | Lock files |
| Total dependency count | Lock file line count |
| Dependency depth | Max nesting level in lock file |

Flag if total dependency count exceeds thresholds:
- **Web app:** >200 total deps = HIGH concern
- **API/backend:** >100 total deps = HIGH concern
- **Library:** >50 total deps = MEDIUM concern

### Step 2 — Assess Dependency Health

For each **direct** dependency, evaluate:

| Signal | Healthy | Concerning | Risky |
|--------|---------|-----------|-------|
| Last publish | <6 months | 6-18 months | >18 months |
| Weekly downloads | >10,000 | 1,000-10,000 | <1,000 |
| Maintainers | 3+ | 2 | 1 (bus factor) |
| Open issues ratio | <20% | 20-50% | >50% |
| License | MIT, Apache, BSD | LGPL, MPL | GPL, AGPL, None, Unknown |
| Repository | Active, public | Archived | Missing, private |

> Note: This assessment uses publicly available metadata. For packages where metadata is unavailable, flag as "Unable to assess" rather than scoring.

### Step 3 — Check for Red Flags

| Red Flag | Severity | What to look for |
|----------|----------|-----------------|
| Typosquatting risk | HIGH | Package names similar to popular packages (e.g., `lodahs` vs `lodash`) |
| Install scripts | HIGH | `preinstall`, `postinstall` scripts in package.json that execute arbitrary code |
| Excessive permissions | MEDIUM | Packages requesting filesystem, network, or OS access beyond their stated purpose |
| Unpinned versions | MEDIUM | `"*"` or `"latest"` in dependency versions |
| No lock file | HIGH | Missing lock file means builds are non-reproducible |
| Deprecated packages | MEDIUM | Dependencies marked as deprecated by their maintainers |
| Name squatting | LOW | Packages with very few downloads that claim generic names |

### Step 4 — Evaluate Transitive Risk

Identify the highest-risk transitive dependencies — packages you didn't choose but are exposed to:

- Which transitive deps have the most dependents in your tree? (single points of failure)
- Are any transitive deps abandoned (>2 years, no maintainer)?
- Do any transitive deps have known vulnerabilities?

### Step 5 — Generate Report

Structure:
1. **Dependency Summary** — Total count, direct vs transitive, depth
2. **Health Assessment** — Table of direct deps with health signals
3. **Red Flags** — Specific findings with severity
4. **Transitive Risks** — Highest-risk transitive dependencies
5. **Recommendations** — Prioritized action items (replace, pin, remove, audit)

### Step 6 — Update STATE.md

Record audit completion and top-level findings.

---

## Constraints

- Assessment is based on publicly available metadata and heuristics
- Does not execute or install packages — read-only analysis
- Does not replace `npm audit` / `pip audit` — complements them with health/trust signals
- Health signals are indicators, not verdicts — a low-download package may be perfectly fine for a niche use case
- Never recommends removing a dependency without suggesting an alternative or explaining the trade-off

---

## Primary Agent

reviewer

---

## Definition of Done

- [ ] All dependency manifests identified and read
- [ ] Direct dependency count and transitive depth calculated
- [ ] Health assessment completed for all direct dependencies
- [ ] Red flag checks completed
- [ ] Transitive risk evaluation completed
- [ ] Report generated with prioritized recommendations
- [ ] STATE.md updated
