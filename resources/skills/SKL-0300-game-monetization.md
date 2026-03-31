---
id: SKL-0300
name: Game Monetization
category: skills
tags: [game-dev, monetization, in-app-purchases, ads, battle-pass, ethical-design]
capabilities: [monetization-strategy, iap-design, ad-integration, ethical-revenue-modeling]
useWhen:
  - choosing a monetization model for a game
  - implementing in-app purchases without alienating players
  - deciding between ads, IAP, or premium pricing
  - designing a battle pass or season pass system
  - ensuring monetization is ethical and non-exploitative
estimatedTokens: 700
relatedFragments: [SKL-0297, SKL-0299, SKL-0281]
dependencies: []
synonyms: ["how to make money from my game", "in app purchase best practices", "ads vs premium for mobile games", "how do battle passes work", "ethical monetization in games", "free to play revenue model"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicklockwood/iVersion"
difficulty: intermediate
owner: "cortex"
pillar: "game-dev"
---

# Skill: Game Monetization

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0300 |
| **Name** | Game Monetization |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Monetization determines whether a game sustains its creators. The choice between premium, free-to-play (F2P), and hybrid models shapes every design decision downstream. Get this wrong and you either alienate players or go broke.

### Revenue Models

| Model | How It Works | Best For | Risk |
|-------|-------------|----------|------|
| **Premium** | One-time purchase ($1-$60) | Story games, indie titles | Lower audience, high refund risk |
| **Free-to-play + IAP** | Free download, sell virtual goods | Mobile, live-service games | Pay-to-win perception |
| **Ad-supported** | Free, revenue from ad views | Casual/hyper-casual games | Player frustration, low RPM |
| **Battle Pass** | Seasonal paid progression track | Games with regular content updates | Content treadmill burnout |
| **Subscription** | Monthly fee for access/perks | MMOs, game bundles | Churn if value drops |

### In-App Purchase Design

The most successful IAP economies follow the **"pay for time or cosmetics, never for power"** principle. Players who pay should look different or progress faster, not win fights against non-payers.

1. **Starter packs** convert well: offer a one-time discounted bundle with useful items at $0.99-$4.99. This is often the highest-converting IAP because the perceived value is high and the commitment is low.
2. **Consumables vs permanents**: consumables (boosts, energy refills) drive repeat purchases. Permanents (skins, characters) drive one-time revenue but feel fairer to players.
3. **Price anchoring**: show a premium option ($49.99) next to the mid-tier ($9.99) to make the mid-tier feel reasonable. Always offer at least three price tiers.
4. **Remove friction from first purchase**: the hardest conversion is from $0 to $0.99. After that, subsequent purchases are 5-10x more likely.

### Ad Integration

Ads work in casual games but destroy immersion in narrative or competitive titles.

- **Rewarded video ads** are the most player-friendly format. Players choose to watch a 15-30 second ad in exchange for in-game currency, an extra life, or a reward multiplier. Completion rates exceed 80% when the reward feels meaningful.
- **Interstitial ads** (full-screen between levels) are tolerable at natural break points but never mid-gameplay.
- **Banner ads** yield the lowest RPM and eat screen space. Avoid on mobile games where every pixel matters.
- **Frequency cap**: no more than 1 interstitial per 3 minutes. For rewarded ads, let the player control frequency.

### Battle Pass Design

A battle pass creates recurring revenue through seasonal paid progression. The free track keeps non-payers engaged; the premium track ($5-$15) offers cosmetics and accelerators.

- **Ensure free track is generous.** If free players feel locked out, they churn instead of converting.
- **Completion should take 70-80% of the season.** Too easy and players stop playing early. Too hard and they feel cheated out of their purchase.
- **Never sell gameplay advantages** on the premium track. Cosmetics, emotes, and XP boosts are safe. Exclusive weapons or stat boosts are not.

### Ethical Guardrails

- Disclose drop rates for any randomized purchase (loot boxes). Many jurisdictions now require this legally.
- Never target minors with aggressive monetization. Implement spending caps and parental controls.
- Avoid artificial scarcity timers that pressure impulse purchases ("Only 2 hours left!").
- Provide a way to earn premium currency through gameplay, even if slowly.

## Key Takeaways

- Sell time savings and cosmetics, never power advantages
- Rewarded video ads are the most player-friendly ad format (80%+ completion)
- Starter packs at $0.99-$4.99 are the highest-converting first purchase
- Battle pass free tracks must be generous or non-payers churn entirely
- Disclose loot box drop rates and implement spending caps for minors
