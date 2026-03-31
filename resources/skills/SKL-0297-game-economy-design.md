---
id: SKL-0297
name: Game Economy Design
category: skills
tags: [game-dev, economy, currency, balancing, sinks-faucets, monetization]
capabilities: [currency-system-design, inflation-control, economy-balancing, reward-pacing]
useWhen:
  - designing a virtual currency system for a game
  - balancing item pricing and reward rates
  - preventing inflation in a long-running game economy
  - creating resource sinks to maintain economic health
  - deciding between single vs dual currency models
estimatedTokens: 700
relatedFragments: [SKL-0300, SKL-0142, SKL-0281]
dependencies: []
synonyms: ["how to design game currency", "game economy balancing", "what are sinks and faucets in games", "how to price items in my game", "virtual economy inflation", "how do free to play economies work"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/godotengine/godot"
difficulty: intermediate
owner: "cortex"
pillar: "game-dev"
---

# Skill: Game Economy Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0297 |
| **Name** | Game Economy Design |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

A game economy is a closed system where players earn, spend, and trade resources. The fundamental model is **faucets and sinks**: faucets inject currency into the system (quest rewards, loot drops, daily bonuses), and sinks remove it (item purchases, repair costs, crafting fees). When faucets outpace sinks, inflation makes rewards feel meaningless. When sinks dominate, players feel punished.

### Currency Architecture

**Single currency** works for simple games. Most mid-complexity games use a **dual currency** model: a soft currency earned through play (gold, coins) and a hard currency purchased with real money (gems, crystals). The hard currency should buy convenience or cosmetics, never unbeatable power.

| Currency Type | Earned By | Spent On | Risk |
|---------------|-----------|----------|------|
| Soft (gold) | Gameplay, quests, time | Consumables, upgrades, crafting | Inflation if faucets unchecked |
| Hard (gems) | Real money, rare achievements | Cosmetics, time-skips, premium items | Pay-to-win perception if too powerful |

### Balancing Principles

1. **Map the flow.** Diagram every faucet and sink before implementation. Spreadsheet-model the expected currency per hour at each progression stage. If a player earns 100 gold/hour at level 5, meaningful purchases at that level should cost 200-500 gold.
2. **Anchor to time.** Price items relative to the time investment to earn them. A 30-minute grind item feels fair. A 30-hour grind item needs exceptional payoff or players quit.
3. **Introduce sinks at every tier.** Repair costs, consumable ammo, upgrade fees, cosmetic customization, and guild contributions all prevent currency stockpiling. Players hoarding currency means your sinks are too weak.
4. **Use diminishing returns.** Repeated farming of the same activity should yield less over time. Daily reward caps, diminishing XP from low-level enemies, and cooldown timers all regulate faucet flow.
5. **Monitor and tune live.** Track median player wealth at each progression stage. If median wealth diverges more than 30% from your model, adjust faucet or sink rates. Ship with server-side tuning knobs, not hardcoded values.

### Common Anti-Patterns

- **Uncapped faucets**: Unlimited gold from repeatable quests causes hyperinflation in multiplayer economies
- **Pay-to-win sinks**: Selling power directly for hard currency destroys competitive integrity
- **No late-game sinks**: Players who finish content hoard currency with nothing to spend on, making new content feel cheap
- **Fixed pricing with variable rewards**: If rewards scale but prices don't, mid-game items become trivial

## Key Takeaways

- Every faucet needs a corresponding sink; model the full flow before coding
- Anchor item prices to the time investment required to earn them
- Dual currency (soft + hard) separates free play from monetization cleanly
- Ship economy values as tunable server config, not hardcoded constants
- Monitor median player wealth per progression tier and adjust within 30% of targets
