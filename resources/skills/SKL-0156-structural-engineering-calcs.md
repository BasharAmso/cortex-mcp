---
id: SKL-0156
name: Structural Engineering Calculations
category: skills
tags: [structural, engineering, load-analysis, beam, concrete, steel, eurocode, building-code, safety-factor, material-properties]
capabilities: [load-calculation, beam-analysis, concrete-design, steel-design, code-compliance, safety-factor-verification]
useWhen:
  - calculating loads on structural elements
  - analyzing beams for bending, shear, or deflection
  - designing reinforced concrete members
  - designing steel members and connections
  - checking structural calculations against building codes
  - selecting materials and verifying safety factors
estimatedTokens: 700
relatedFragments: [SKL-0155, PAT-0083]
dependencies: []
synonyms: ["how to calculate beam loads", "structural analysis for a building", "concrete design calculations", "steel beam sizing", "does this structure meet building code", "what safety factor do I need"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/Blueprints-org/blueprints"
difficulty: advanced
owner: "cortex"
pillar: "domain-specific"
---

# Structural Engineering Calculations

Perform structural analysis and design for buildings and infrastructure. All calculations must reference applicable codes and include explicit safety factors.

## Load Types and Combinations

| Load Type | Symbol | Examples |
|-----------|--------|----------|
| **Dead (permanent)** | G | Self-weight, finishes, fixed equipment |
| **Live (variable)** | Q | Occupants, furniture, storage, snow |
| **Wind** | W | Lateral pressure, uplift, suction |
| **Seismic** | E | Earthquake-induced forces |
| **Thermal** | T | Expansion/contraction from temperature change |

Standard load combination (Eurocode format):

```
ULS: 1.35*G + 1.5*Q + 1.5*0.6*W
SLS: 1.0*G + 1.0*Q + 1.0*0.5*W
```

ULS (Ultimate Limit State) checks strength. SLS (Serviceability Limit State) checks deflection, cracking, and vibration.

## Beam Analysis

For simply supported beams under uniform load (w):

| Property | Formula | Units |
|----------|---------|-------|
| Max bending moment | M = w*L^2 / 8 | kNm |
| Max shear force | V = w*L / 2 | kN |
| Max deflection | delta = 5*w*L^4 / (384*E*I) | mm |

Deflection limits: L/250 for total deflection, L/350 for live load only (typical Eurocode).

For cantilever beams: M = w*L^2 / 2, delta = w*L^4 / (8*E*I).

## Concrete Design (EN 1992)

Key design checks for reinforced concrete:

| Check | What | Governing Parameter |
|-------|------|-------------------|
| **Bending** | Tensile reinforcement area | As = M / (0.87 * fyk * z) |
| **Shear** | Concrete + stirrup resistance | VRd,c (no stirrups) vs VRd,s (with stirrups) |
| **Punching** | Slab around column | Critical perimeter at 2d from column face |
| **Cracking** | Crack width under service loads | w_max = 0.3mm (normal exposure) |
| **Cover** | Minimum concrete cover to rebar | Depends on exposure class (25-50mm typical) |
| **Anchorage** | Bar development length | Depends on bar diameter, bond, and confinement |

Common concrete grades: C20/25, C25/30, C30/37, C35/45. The notation is fck (cylinder) / fck,cube (cube) in MPa.

## Steel Design (EN 1993)

Key checks: cross-section classification (Class 1-4), bending resistance (Mc,Rd = Wpl * fy / gamma_M0), shear resistance, lateral-torsional buckling, and deflection limits (L/250 or L/360).

Common grades: S235, S275, S355 (yield strength in MPa). Profiles: HEA, HEB, IPE, CHS, RHS, UNP.

## Key Material Properties

| Material | Density (kN/m3) | Strength | E (GPa) |
|----------|----------------|----------|---------|
| Concrete | 25 | 20-50 MPa (compressive) | 30-35 |
| Structural steel | 78.5 | 235-460 MPa (yield) | 210 |
| Reinforcing steel | 78.5 | 400-600 MPa (yield) | 200 |

## Partial Safety Factors

Loads: gamma_G = 1.35 (permanent), gamma_Q = 1.50 (variable). Materials: gamma_C = 1.50 (concrete), gamma_S = 1.15 (rebar), gamma_M0 = 1.00 (steel sections).

## Common Pitfalls

- **Missing load cases** -- Check all combinations; the critical case is often not the obvious one
- **Ignoring second-order effects** -- Slender columns and frames need P-delta analysis
- **Wrong section class** -- A Class 4 steel section cannot develop full plastic moment; check first
- **Unit confusion** -- Mixing kN with N or mm with m produces errors of 1000x; always verify units
