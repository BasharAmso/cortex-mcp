---
id: PAT-0182
name: Feature Flag Pattern
category: patterns
tags: [feature-flag, feature-toggle, rollout, a-b-test, kill-switch, gradual-release, posthog]
capabilities: [feature-flag-types, gradual-rollout, a-b-testing, kill-switch, flag-lifecycle]
useWhen:
  - releasing features gradually to a percentage of users
  - setting up A/B tests to compare feature variants
  - implementing kill switches for risky deployments
  - decoupling deployment from feature release
  - managing feature flags across environments
estimatedTokens: 650
relatedFragments: [PAT-0010, SKL-0012, PAT-0013, SKL-0015]
dependencies: []
synonyms: ["how to use feature flags", "gradual rollout implementation", "A/B testing feature flags", "kill switch for features", "feature toggle best practices", "PostHog feature flags"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: intermediate
owner: "cortex"
pillar: "app-polish"
---

# Feature Flag Pattern

Feature flags decouple deployment from release. You ship code to production behind a flag, then turn it on for specific users, percentages, or conditions. This eliminates "big bang" releases and lets you test, roll back, and experiment safely.

## Flag Types

| Type | Purpose | Lifetime | Example |
|------|---------|----------|---------|
| **Release** | Gate a new feature during rollout | Days to weeks | `new-dashboard` |
| **Experiment** | A/B test between variants | 2-4 weeks | `pricing-page-v2` |
| **Ops** | Kill switch for risky features | Permanent | `enable-ai-summarization` |
| **Permission** | Gate features by plan/role | Permanent | `enterprise-sso` |

## Basic Implementation

```jsx
// Flag evaluation function
function isFeatureEnabled(flagName, user, flags) {
  const flag = flags[flagName];
  if (!flag || !flag.enabled) return false;

  // Percentage rollout (consistent per user)
  if (flag.percentage !== undefined) {
    const hash = simpleHash(`${flagName}-${user.id}`) % 100;
    return hash < flag.percentage;
  }

  // User list
  if (flag.users?.includes(user.id)) return true;

  // Group/plan targeting
  if (flag.plans?.includes(user.plan)) return true;

  return flag.enabled === true; // Global on/off
}

// Consistent hash so the same user always gets the same result
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}
```

## React Integration

```jsx
const FeatureFlagContext = createContext({});

function FeatureFlagProvider({ children, flags, user }) {
  const isEnabled = useCallback(
    (flagName) => isFeatureEnabled(flagName, user, flags),
    [flags, user]
  );
  return (
    <FeatureFlagContext.Provider value={{ isEnabled }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

function useFeatureFlag(flagName) {
  const { isEnabled } = useContext(FeatureFlagContext);
  return isEnabled(flagName);
}

// Usage
function Dashboard() {
  const showNewCharts = useFeatureFlag('new-dashboard-charts');
  return showNewCharts ? <NewCharts /> : <LegacyCharts />;
}
```

## Gradual Rollout Strategy

```
Day 1:   0% → Internal team only (flag.users list)
Day 2:   5% → Early adopters / beta users
Day 3:  25% → Quarter of traffic
Day 5:  50% → Monitor metrics
Day 7: 100% → Full rollout
Day 14: Remove flag from code (cleanup)
```

Monitor at each step:
- Error rates (should not increase)
- Core metrics (conversion, engagement)
- Performance (page load, API latency)
- Support tickets (new complaints)

If any metric degrades, roll back to the previous percentage immediately.

## A/B Test Flag

```jsx
const pricingExperiment = {
  name: 'pricing-page-experiment',
  enabled: true,
  variants: [
    { key: 'control', weight: 50 },
    { key: 'annual-first', weight: 50 },
  ],
};

function getVariant(experiment, userId) {
  const hash = simpleHash(`${experiment.name}-${userId}`) % 100;
  let cumulative = 0;
  for (const variant of experiment.variants) {
    cumulative += variant.weight;
    if (hash < cumulative) return variant.key;
  }
  return experiment.variants[0].key;
}
```

## Flag Lifecycle and Cleanup

Stale flags create technical debt. Every flag should have an owner and expiration:

```json
{
  "new-dashboard": {
    "enabled": true,
    "percentage": 50,
    "owner": "team-product",
    "created": "2026-03-15",
    "expires": "2026-04-15",
    "description": "Redesigned dashboard with new chart components"
  }
}
```

Cleanup rules:
- Remove the flag from code within 2 weeks after 100% rollout
- Run a monthly audit for expired flags
- Never leave a flag in code after its experiment has concluded

## Kill Switch Pattern

```jsx
// Wrap risky features in a kill switch
function AIFeature() {
  const isEnabled = useFeatureFlag('enable-ai-summarization');

  if (!isEnabled) {
    return <p>This feature is temporarily unavailable.</p>;
  }

  return <AISummarizer />;
}
```

Kill switches should be evaluable without network calls (cached flag state) so they work even when the flag service is down.

## Key Takeaways

- Use percentage rollouts with consistent hashing so users don't flip between variants
- Every flag needs an owner, creation date, and expiration date
- Remove flags from code within 2 weeks of full rollout to prevent debt
- Kill switches must work even when the flag service is unreachable
- Monitor error rates, core metrics, and performance at each rollout step
