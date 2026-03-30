---
id: SKL-0077
name: Deploy Previews
category: skills
tags: [deploy-preview, vercel, netlify, pr-preview, staging, branch-deploy, ci-cd]
capabilities: [preview-deployment-setup, environment-variable-management, stakeholder-sharing, branch-protection-config]
useWhen:
  - setting up automatic preview deployments for pull requests
  - sharing a staging URL with a stakeholder for feedback
  - configuring environment variables per deployment context
  - protecting production branches while enabling preview workflows
estimatedTokens: 600
relatedFragments: [PAT-0010, SKL-0018, PAT-0007]
dependencies: []
synonyms: ["preview my PR", "get a staging URL", "show my client the changes", "set up deploy previews", "branch deploys"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Deploy Previews

Every pull request gets its own live URL. Stakeholders see real changes, not screenshots. Broken deploys get caught before they hit production.

## How It Works

```
Push to branch → PR opened → Preview built automatically → Unique URL generated
                                                          → URL posted as PR comment
```

No manual deploys. No "check my localhost." Every PR is reviewable by anyone with the link.

## Platform Setup

### Vercel

1. Connect your GitHub repo in the Vercel dashboard
2. Every push to a non-production branch automatically gets a preview
3. Preview URL format: `project-git-branch-name-team.vercel.app`
4. Production deploys only from your main branch

### Netlify

1. Connect repo via Netlify dashboard or `netlify link`
2. Enable deploy previews in Site settings > Build & deploy
3. Preview URL format: `deploy-preview-42--your-site.netlify.app`
4. Branch deploys available for specific branches beyond just PRs

## Environment Variables Per Context

Previews often need different config than production:

| Context | API URL | Auth | Analytics |
|---------|---------|------|-----------|
| Production | `api.myapp.com` | Real provider | Enabled |
| Preview | `api-staging.myapp.com` | Test provider | Disabled |
| Local | `localhost:3001` | Mock | Disabled |

**Vercel:** Set variables per environment (Production, Preview, Development) in project settings.

**Netlify:** Use deploy contexts in `netlify.toml`:

```toml
[context.production]
  environment = { API_URL = "https://api.myapp.com" }

[context.deploy-preview]
  environment = { API_URL = "https://api-staging.myapp.com" }
```

## Sharing with Stakeholders

- Preview URLs are public by default on most platforms
- Add a PR comment template that highlights the preview link
- For password-protected previews, use Vercel's Password Protection or Netlify's visitor access controls
- Include a "What to test" section in your PR description

## Branch Protection

Pair previews with branch protection for safety:

1. Require PR reviews before merging to main
2. Require status checks to pass (build must succeed)
3. Require preview deploy to succeed before merge is allowed
4. Disable direct pushes to main

## Key Rules

- Never put production secrets in preview environment variables
- Always use separate API keys/endpoints for preview vs production
- Keep preview builds fast. Slow previews kill the feedback loop.
- Clean up preview deployments. Most platforms auto-expire them.
- Add `.env.example` to document which variables each context needs
