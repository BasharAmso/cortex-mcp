---
id: PAT-0205
name: Code Portfolio Pattern
category: patterns
tags: [portfolio, github-profile, readme, project-showcase, contributions, personal-branding]
capabilities: [github-profile-optimization, project-readme-writing, contribution-showcase, portfolio-curation]
useWhen:
  - building a developer portfolio to showcase skills
  - optimizing your GitHub profile for recruiters and collaborators
  - writing project READMEs that demonstrate competence
  - curating which projects to highlight and which to archive
  - preparing a portfolio for job applications or freelance work
estimatedTokens: 650
relatedFragments: [SKL-0401, SKL-0398, SKL-0399, SKL-0397]
dependencies: []
synonyms: ["how to build a developer portfolio", "optimize github profile", "write a good project README", "showcase coding projects", "developer personal branding", "portfolio for job search"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "developer-growth"
---

# Code Portfolio Pattern

A code portfolio is curated proof of competence. Unlike a resume that claims skills, a portfolio demonstrates them. The most effective portfolio is a well-maintained GitHub profile with 3-5 polished projects.

## GitHub Profile Optimization

Your GitHub profile is often the first thing technical reviewers see. Optimize the three-second impression:

### Profile README

Create a repository named after your username with a README.md. This displays on your profile page.

Include:
- **One-line intro**: What you do and what you are interested in (not a life story)
- **Current focus**: What you are working on or learning right now
- **Best projects**: Links to 3-5 pinned repositories with one-line descriptions
- **How to reach you**: Professional contact method

Exclude: GitHub stats widgets, visitor counters, excessive badges, emoji walls. These signal "spent time on profile decoration" not "builds real things."

### Pinned Repositories

Pin your 6 best repositories. Selection criteria:
1. **Demonstrates a real skill**: Not just tutorial follow-alongs
2. **Has a polished README**: Screenshots, clear purpose, setup instructions
3. **Shows recent activity**: A project last updated 2 years ago signals abandonment
4. **Variety of skills**: Mix of frontend, backend, tools, or different languages

## Project README Template

The README is the storefront of your project. A reviewer spends 30 seconds deciding if it is worth investigating further.

### Essential Sections

| Section | Purpose | Example |
|---------|---------|---------|
| **Title + one-line description** | What is this? | "TaskFlow: a minimal project management CLI for solo developers" |
| **Screenshot or demo GIF** | Visual proof it works | 3-second GIF showing the core interaction |
| **Problem statement** | Why does this exist? | "Existing tools are bloated for solo projects" |
| **Quick start** | Get running in < 2 minutes | `npm install -g taskflow && taskflow init` |
| **Key features** | 3-5 bullet points | What makes this worth using |
| **Tech stack** | Technologies used | Shows your skill range |

### What Recruiters Look For

Technical recruiters and hiring managers scanning GitHub portfolios report looking for:
1. **Code quality in recent commits**: Clean code, meaningful commit messages, logical structure
2. **README quality**: Clear communication signals professional maturity
3. **Problem-solving evidence**: Projects that solve real problems, not just replicate tutorials
4. **Collaboration signals**: PR reviews, issue discussions, contributions to other projects
5. **Consistency**: Regular activity pattern (weekly commits) over sporadic bursts

## Portfolio Curation Strategy

### The 3-5 Rule

Maintain 3-5 showcase projects. More than that dilutes attention. Archive or make private anything that does not meet your current quality bar.

### Project Selection Matrix

| Criterion | Weight | Question |
|-----------|--------|----------|
| **Relevance** | High | Does this match the roles I am targeting? |
| **Quality** | High | Am I proud of this code today? |
| **Uniqueness** | Medium | Does this show something my other projects do not? |
| **Completeness** | Medium | Is it deployed and usable, or just started? |
| **Recency** | Low | Was this built with current technologies? |

### Keeping Projects Fresh

Dead projects with no commits in 12+ months hurt more than they help. For each showcase project:
- Update dependencies quarterly (even if no feature work)
- Fix any broken deployment or CI badges
- Refresh the README if your writing has improved
- Archive rather than delete: move to private if it no longer represents your skill level

## Contribution Graph

The green squares on your profile are not a productivity metric, but they do tell a story. Consistent small contributions (a few commits per week) signal an active developer. Long gaps followed by bursts signal project sprints but raise questions about consistency.

Do not game the contribution graph with empty commits. Reviewers can click through to see what the commits actually contain.

## Key Takeaways

- Curate 3-5 polished projects rather than showing everything you have ever built
- The README is the storefront: title, screenshot, problem statement, and quick start are essential
- Recruiters look for code quality, clear communication, and real problem-solving, not tutorial clones
- Archive projects that no longer represent your skill level rather than leaving them visible
- Consistent activity signals an engaged developer; do not game the contribution graph
