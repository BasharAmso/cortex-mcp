---
id: SKL-0080
name: Feature Flags
category: skills
tags: [feature-flags, feature-toggles, gradual-rollout, ab-testing, launchdarkly, kill-switch, release-management, canary, flagsmith]
capabilities: [flag-implementation, gradual-rollout, ab-test-setup, flag-lifecycle-management, kill-switch-config]
useWhen:
  - rolling out a new feature to a percentage of users first
  - needing an instant kill switch for a risky production feature
  - running an A/B test between two implementations
  - decoupling deploy from release so code ships without being visible
estimatedTokens: 650
relatedFragments: [PAT-0010, SKL-0018, SKL-0078, SKL-0013]
dependencies: []
synonyms: ["feature toggle", "how do I roll out gradually", "A/B test a feature", "kill switch for production", "ship dark feature", "turn off a feature without deploying"]
sourceUrl: "https://github.com/donnemartin/system-design-primer"
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Feature Flags

Decouple deployment from release. Ship code anytime, enable features when ready. Roll back without redeploying.

## The Progression

| Level | When | How |
|-------|------|-----|
| **Environment variable** | One flag, on/off for everyone | `ENABLE_NEW_CHECKOUT=true` |
| **Config file** | A few flags, no runtime changes | JSON file loaded at startup |
| **Database flags** | Runtime toggling, no redeploy | Admin UI flips flags in DB |
| **Flag service** | User targeting, percentage rollout, A/B | LaunchDarkly, Flagsmith, Unleash |

Most solo devs never need to go past level 2. Move to level 3-4 when you need per-user targeting.

## Simple Implementation

```javascript
// Level 1: Environment variable
const flags = {
  newCheckout: process.env.ENABLE_NEW_CHECKOUT === 'true',
  darkMode: process.env.ENABLE_DARK_MODE === 'true',
};

if (flags.newCheckout) {
  renderNewCheckout();
} else {
  renderLegacyCheckout();
}
```

## Gradual Rollouts

Roll out to a percentage of users to catch problems early:

```javascript
function isEnabled(flagName, userId) {
  const flag = flags[flagName];
  if (!flag.percentage) return flag.enabled;
  // Deterministic: same user always gets same result
  const hash = simpleHash(flagName + userId);
  return (hash % 100) < flag.percentage;
}
```

**Rollout schedule for risky features:**
1. 1% for 24 hours (catch crashes)
2. 10% for 48 hours (catch edge cases)
3. 50% for a week (catch performance issues)
4. 100% (general availability)

## A/B Testing

Feature flags enable A/B testing naturally:

```javascript
const variant = getVariant('pricing-page', userId);
analytics.track('pricing_page_view', { variant });

if (variant === 'variant-a') {
  renderNewPricing();
} else {
  renderCurrentPricing();
}
```

Measure conversion rates per variant. Run for 2+ weeks with enough traffic for statistical significance.

## Kill Switches

Every critical feature should have a kill switch that instantly disables it:

```javascript
if (!flags.paymentsEnabled) {
  return showMaintenancePage('Payments are temporarily unavailable.');
}
```

Kill switches must be instantly toggleable without a deploy, tested regularly in staging, and documented (what does disabling this affect?).

## Flag Cleanup

Dead flags are tech debt. Every flag lifecycle:

1. **Created** with an expiration date or target milestone
2. **Rolled out** to 100% and verified stable
3. **Removed** from code within 2 weeks of full rollout
4. **Cleaned up** from flag config/service

Track active flags. If you have more than 10 active flags as a solo dev, some need cleanup.

## Key Constraints

- Every flag needs an owner and a cleanup date
- Default to "off" for new features, "on" for kill switches
- Never nest flag checks (if flag A and flag B). Keep logic flat.
- Test both paths. A flag that has never been "off" is a ticking bomb.
- Log flag evaluations so you can debug "why did this user see X?"
