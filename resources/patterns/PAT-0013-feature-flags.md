---
id: PAT-0013
name: Feature Flags
category: patterns
tags: [feature-flags, feature-toggles, gradual-rollout, a-b-testing, canary, launchdarkly, prompt-engineering, experimentation]
capabilities: [feature-flag-design, gradual-rollout, ab-testing, kill-switch]
useWhen:
  - rolling out features gradually to a subset of users
  - implementing A/B tests or experiments
  - adding kill switches for external dependencies
  - managing feature flags across environments
  - routing between different model versions or prompts
estimatedTokens: 550
relatedFragments: [PAT-0010, PAT-0002, SKL-0006]
dependencies: []
synonyms: ["release features to some users first", "how to do A/B testing", "feature toggle setup", "turn features on and off without deploying", "gradual rollout strategy"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
pillar: "software-dev"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
---

# Feature Flags

Decouple deployment from release. Ship code to production without exposing it to all users. Feature flags are also essential for A/B testing prompts, model versions, and AI feature rollouts.

## Flag Types

| Type | Lifespan | Example |
|------|----------|---------|
| **Release toggle** | Days to weeks | New checkout flow for 10% of users |
| **Ops toggle** | Permanent | Circuit breaker for external service |
| **Experiment** | Weeks | A/B test on pricing page or prompt variant |
| **Permission** | Permanent | Premium features for paid users |

## Implementation Steps

1. **Name flags descriptively.** `enable-new-checkout` not `flag-42`. The name should explain what changes when the flag is on.
2. **Default to off in production.** Flags should be opt-in. A new flag should never accidentally expose unfinished work.
3. **Set a cleanup date at creation.** Every release toggle must have a removal deadline. Track flag debt like tech debt.
4. **Log flag evaluations.** Correlate user behavior with flag state for experiment analysis. Without logging, A/B tests produce no insights.
5. **Never nest flags.** If flag A depends on flag B, combine them into one flag or create explicit dependencies.

## Simple Implementation

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
```

## Service Comparison

| Service | Pricing | Best For |
|---------|---------|----------|
| **LaunchDarkly** | Paid (per seat) | Enterprise, complex targeting |
| **Flagsmith** | Free tier + paid | Open-source option, self-hostable |
| **Unleash** | Free tier + paid | Self-hosted, developer-friendly |
| **PostHog** | Free tier | Feature flags + analytics combined |
| **DIY (DB/config)** | Free | Simple on/off flags, small teams |

## Anti-Patterns

- Leaving old flags in code for months (flag debt)
- Using flags for permanent configuration (use config instead)
- Testing only the "on" path and forgetting the "off" path
- No audit trail of who changed a flag and when
- Running experiments without logging flag state per request
