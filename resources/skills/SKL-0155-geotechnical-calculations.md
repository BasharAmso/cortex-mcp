---
id: SKL-0155
name: Geotechnical Calculations
category: skills
tags: [geotechnical, soil, bearing-capacity, earth-pressure, slope-stability, settlement, foundation, civil-engineering]
capabilities: [soil-classification, bearing-capacity-analysis, earth-pressure-calculation, slope-stability-assessment, settlement-prediction, foundation-design]
useWhen:
  - classifying soil types from field or lab data
  - calculating bearing capacity for shallow or deep foundations
  - computing lateral earth pressure using Rankine or Coulomb methods
  - analyzing slope stability and factor of safety
  - estimating settlement under applied loads
  - designing foundations based on soil investigation results
estimatedTokens: 700
relatedFragments: [PAT-0083, SKL-0156]
dependencies: []
synonyms: ["how to classify soil for engineering", "calculate bearing capacity of soil", "earth pressure behind a wall", "will this slope fail", "how much will the ground settle", "foundation design from soil data"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/snakesonabrain/groundhog"
difficulty: advanced
owner: "cortex"
pillar: "domain-specific"
---

# Geotechnical Calculations

Perform engineering calculations for soil behavior, foundation design, and ground stability. Every calculation requires validated input parameters and explicit safety factors.

## Soil Classification

Two primary systems:

| System | Based On | Output |
|--------|----------|--------|
| **USCS** (Unified Soil Classification) | Grain size + plasticity | Symbol (e.g., CL, SP, GM) |
| **AASHTO** | Grain size + plasticity index | Group (A-1 through A-7) |

Key inputs: grain size distribution, Atterberg limits (LL, PL, PI), unit weight (16-22 kN/m3), and moisture content.

## Bearing Capacity

Terzaghi's equation for shallow foundations:

```
q_ult = c * Nc + q * Nq + 0.5 * gamma * B * Ngamma
```

| Term | Meaning |
|------|---------|
| c | Soil cohesion (kPa) |
| Nc, Nq, Ngamma | Bearing capacity factors (depend on friction angle phi) |
| q | Overburden pressure at foundation depth |
| B | Foundation width |
| gamma | Unit weight of soil |

**Allowable bearing capacity** = q_ult / Factor of Safety (typically FS = 2.5-3.0)

## Earth Pressure

Three conditions based on wall movement:

| Condition | Movement | Coefficient | Use Case |
|-----------|----------|-------------|----------|
| **At rest (K0)** | No movement | 1 - sin(phi) | Basement walls, rigid structures |
| **Active (Ka)** | Wall moves away | tan^2(45 - phi/2) | Retaining walls, free-standing |
| **Passive (Kp)** | Wall moves into soil | tan^2(45 + phi/2) | Anchor resistance, toe embedment |

**Rankine theory**: Assumes smooth wall, horizontal backfill. Simpler, conservative.
**Coulomb theory**: Accounts for wall friction (delta). More realistic, requires trial wedge.

## Slope Stability

| Method | Slip Surface | Complexity |
|--------|-------------|------------|
| **Infinite slope** | Planar, shallow | Simple closed-form |
| **Fellenius** | Circular | Ignores interslice forces |
| **Bishop's simplified** | Circular | Iterative, includes normal forces |
| **Spencer** | General | Full equilibrium, most accurate |

Minimum acceptable FS: 1.5 (permanent), 1.3 (temporary), 1.1 (seismic).

## Settlement Analysis

| Type | Cause | Timeline |
|------|-------|----------|
| **Immediate** | Elastic compression | During construction |
| **Consolidation** | Pore water drainage from clay | Months to years |
| **Secondary** | Creep of soil skeleton | Years to decades |

Consolidation is typically the largest component for clay soils. Use Terzaghi's 1D theory with compression index (Cc) from oedometer tests.

## Common Pitfalls

- **Unvalidated correlations** -- SPT/CPT correlations have regional bias; verify against local data
- **Ignoring water table** -- Effective stress changes dramatically below groundwater
- **Single boring extrapolation** -- Never design from one borehole; soil varies spatially
- **Missing safety factors** -- Always reduce ultimate values by appropriate FS before design use
