---
id: PAT-0013
name: Feature Flags
category: patterns
tags: [feature-flags, feature-toggles, gradual-rollout, a-b-testing, canary, launchdarkly]
capabilities: [feature-flag-design, gradual-rollout, ab-testing, kill-switch]
useWhen:
  - rolling out features gradually
  - implementing A/B tests
  - adding kill switches
  - managing feature flags across environments
estimatedTokens: 500
relatedFragments: [PAT-0010, PAT-0002, SKL-0006]
dependencies: []
synonyms: ["release features to some users first", "how to do A/B testing", "feature toggle setup", "turn features on and off without deploying", "gradual rollout"]
lastUpdated: "2026-03-29"
difficulty: intermediate
sourceUrl: ""
---

# Feature Flags

Decouple deployment from release. Ship code to production without exposing it to all users.

## Flag Types

| Type | Lifespan | Example |
|------|----------|---------|
| **Release toggle** | Days to weeks | New checkout flow for 10% of users |
| **Ops toggle** | Permanent | Circuit breaker for external service |
| **Experiment** | Weeks | A/B test on pricing page |
| **Permission** | Permanent | Premium features for paid users |

## Implementation (Simple)

```typescript
type FeatureFlags = Record<string, boolean | ((user: User) => boolean)>;

const flags: FeatureFlags = {
  newDashboard: (user) => user.betaOptIn || user.id % 10 === 0, // 10% rollout
  maintenanceMode: false,
  premiumExport: (user) => user.plan === "pro",
};

function isEnabled(flag: keyof typeof flags, user?: User): boolean {
  const value = flags[flag];
  if (typeof value === "function") return user ? value(user) : false;
  return value;
}

// Usage
if (isEnabled("newDashboard", currentUser)) {
  renderNewDashboard();
} else {
  renderLegacyDashboard();
}
```

## Service Comparison

| Service | Pricing | Best For |
|---------|---------|----------|
| **LaunchDarkly** | Paid (per seat) | Enterprise, complex targeting |
| **Flagsmith** | Free tier + paid | Open-source option, self-hostable |
| **Unleash** | Free tier + paid | Self-hosted, developer-friendly |
| **PostHog** | Free tier | Feature flags + analytics combined |
| **DIY (DB/config)** | Free | Simple on/off flags, small teams |

## Best Practices

1. **Name flags descriptively** -- `enable-new-checkout` not `flag-42`
2. **Set a cleanup date** when creating each flag. Remove after full rollout.
3. **Default to off** in production. Flags should be opt-in.
4. **Log flag evaluations** so you can correlate behavior with flag state.
5. **Never nest flags** -- if flag A depends on flag B, combine them.

## Anti-Patterns

- Leaving old flags in code for months (flag debt)
- Using flags for permanent configuration (use config instead)
- Testing only the "on" path and forgetting the "off" path
- No audit trail of who changed a flag and when
