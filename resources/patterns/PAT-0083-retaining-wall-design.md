---
id: PAT-0083
name: Retaining Wall Design
category: patterns
tags: [retaining-wall, civil-engineering, geotechnical, structural, gravity-wall, cantilever, segmental, drainage, safety-factor]
capabilities: [wall-type-selection, failure-mode-analysis, force-calculation, drainage-design, safety-factor-verification]
useWhen:
  - selecting a retaining wall type for a site
  - analyzing failure modes for a proposed wall design
  - calculating forces on a retaining structure
  - designing drainage systems behind retaining walls
  - verifying safety factors against building codes
  - generating engineering plans for wall construction
estimatedTokens: 650
relatedFragments: [SKL-0155, SKL-0156]
dependencies: []
synonyms: ["how to design a retaining wall", "what type of retaining wall do I need", "retaining wall failure analysis", "will my retaining wall tip over", "how thick should a retaining wall be", "drainage behind a retaining wall"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/otherjon/retaining-wall"
difficulty: advanced
owner: "cortex"
pillar: "domain-specific"
---

# Retaining Wall Design

Design retaining structures that resist lateral earth pressure safely. Every wall design must be checked against all failure modes with adequate safety factors.

## Wall Types

| Type | Height Range | Construction | Best For |
|------|-------------|-------------|----------|
| **Gravity** | Up to 3m | Mass concrete or stone, resists by self-weight | Small walls, aesthetic preference |
| **Cantilever** | 3-8m | Reinforced concrete, L or T shape | Medium walls, efficient material use |
| **Segmental block** | Up to 6m+ with geogrid | Interlocking blocks with geogrid reinforcement | DIY-friendly, residential landscaping |
| **Soldier pile** | 3-15m | Steel H-piles with lagging between | Temporary excavation support |
| **Anchored** | 5-20m+ | Any wall type plus tiebacks into stable soil | Deep excavations, high loads |

## Failure Modes

Every wall design must be checked against these modes:

| Failure Mode | What Happens | Resisting Force | Minimum FS |
|-------------|-------------|-----------------|------------|
| **Overturning** | Wall rotates about the toe | Weight of wall + soil above base | 2.0 |
| **Sliding** | Wall slides forward on base | Base friction + passive earth pressure | 1.5 |
| **Bearing capacity** | Foundation soil crushes | Soil bearing capacity under the base | 3.0 |
| **Global stability** | Entire slope fails | Shear strength along deep failure surface | 1.5 |
| **Structural** | Wall member cracks or breaks | Concrete/steel strength | Per code |
| **Geogrid pullout** | Reinforcement pulls from soil | Soil-geogrid interface friction | 1.5 |
| **Geogrid rupture** | Reinforcement tears | Tensile strength of geogrid | 1.5 |

## Force Calculations

Forces acting on a retaining wall:

**Driving**: Active earth pressure (Pa = 0.5 * Ka * gamma * H^2), surcharge loads, water pressure.

**Resisting**: Wall self-weight, soil above base heel, passive pressure at toe (use cautiously), geogrid anchorage.

## Drainage Design

Water is the most common cause of wall failure. Every wall needs: drainage aggregate (300mm gravel zone), filter fabric (geotextile between gravel and soil), weep holes (1.5-3m spacing), a collection drain (perforated pipe at base), and surface grading away from the wall. Always design for hydrostatic pressure even with drainage.

## Segmental Block Walls with Geogrid

For walls over 1m, geogrid reinforcement is typically required. Space geogrid every 2-3 block courses (400-600mm). Extend geogrid at least 0.7 times the wall height into retained soil. Compact backfill in 200-300mm lifts. Step each course back 10-15mm for batter.

## Common Pitfalls

- **Ignoring water** -- Saturated soil doubles the lateral pressure; always provide drainage
- **Undersized base** -- Base width should be 0.5-0.7 times the wall height for cantilever walls
- **No global stability check** -- A wall can pass all local checks but sit on an unstable slope
- **Building code variance** -- Required safety factors and permitted wall types vary by jurisdiction
