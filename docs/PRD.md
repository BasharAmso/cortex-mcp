# Product Requirements Document — Cortex MCP

## Overview

Cortex MCP is a knowledge delivery engine that ships with a built-in library of agents, skills, patterns, and examples — and serves them on-demand to any MCP-compatible AI tool. Instead of every project loading its own framework files into context (wasting 90%+ of the token budget), Cortex MCP is installed once and feeds the right knowledge to any project that needs it. It works with any MCP client (Claude Code, Cursor, Windsurf) and is designed to eventually serve any domain — not just software development.

## How It Works

Cortex MCP is installed once on your machine. It contains a growing library of knowledge:

```
Cortex MCP (installed once, contains the library)
  ├── resources/
  │   ├── agents/       (agent definitions — how to think and act)
  │   ├── skills/       (skill procedures — how to do specific tasks)
  │   ├── patterns/     (reusable patterns — proven approaches)
  │   └── examples/     (code examples — ready-to-use references)
  ├── AI-Memory/        (your personal lessons, patterns, failures)
  │   └── (read from your cross-project knowledge store)
  └── custom/           (additional directories you point it at)
         ↓ serves on-demand via MCP
   ┌─────────┬──────────┬──────────┐
Project A   Project B   Project C   (any repo, stays lightweight)
```

**Your project repos stay lightweight.** They keep only project-specific state (tasks, events, config). The heavy knowledge — agents, skills, patterns — lives inside Cortex MCP and gets delivered on-demand based on what the current task needs.

**The library grows over time.** You add agents, skills, and patterns to Cortex MCP's library. Every project you work on benefits immediately. This is the opposite of copy-pasting framework files into each repo.

## Problem Statement

AI tools waste most of their context window loading knowledge they don't need for the current task. A developer with dozens of agents and skills loads thousands of tokens of framework files every session, even when they only need one or two for the task at hand. There is no standard, tool-agnostic way to serve structured knowledge on-demand. Existing approaches are either locked to a single tool, locked to software development, or require loading everything upfront.

**How people solve it today:**
- Load all files into context (wasteful — 90%+ tokens unused)
- Manually manage what gets loaded (tedious, error-prone)
- Use tool-specific plugins (locked to one client)
- Copy framework files into every project (duplication, drift)
- Don't use structured knowledge at all (miss out on expertise)

**Evidence the problem is real:**
- Every AI coding session hits context limits
- Multiple projects have attempted to solve this (Context7 at 50K+ stars for library docs, others for dev knowledge, agent-skills-mcp for SKILL.md serving)
- The SKILL.md convention is gaining traction across Claude Code, Cursor, and Windsurf — proving demand for structured agent knowledge

## Vision

v1 ships with a built-in library of software development knowledge and serves it on-demand. But the architecture is domain-agnostic — it serves any structured markdown the same way. When paired with a future knowledge generator (Frame Brain), anyone in any profession gets AI expertise without writing a single agent file.

```
CURRENT STATE                    v1                               12-MONTH IDEAL
Every project loads its own      Install Cortex MCP once.          The default way people
framework files. Duplicated      It has the library. It serves     serve knowledge to AI tools.
across repos. Wastes tokens.     what each project needs.          Any domain. Any tool.
No sharing across projects.      One library, all projects.        Install and go.
```

## Goals

| Metric | Baseline | Target | Stretch | Timeframe |
|--------|----------|--------|---------|-----------|
| GitHub stars | 0 | 100+ | 1,000+ | First few months / first year |
| Token reduction | 0% (load everything) | 90%+ | 95%+ | v1 launch |
| Query latency | N/A | <15ms (index), <20ms (fuzzy) | <5ms (cache) | v1 launch |
| Setup time | N/A | <5 minutes to working | <2 minutes | v1 launch |
| MCP client compatibility | 0 | 3+ (Claude Code, Cursor, Windsurf) | Any MCP client | v1 launch |
| Built-in library size | 0 | 50+ fragments | 200+ fragments | v1 launch / v1.x |

## Target Users

**Primary:** Anyone using an MCP-compatible AI tool who wants their tool to be smarter.

- **Developers at any level** — install Cortex MCP, instantly get access to a library of agents and skills that make their AI tool better at coding tasks. No framework required.
- **AI Orchestrator System users** — the heaviest context consumers. Cortex MCP replaces loading all agents/skills from project files. Immediate, massive value.
- **Framework authors** — want to distribute their knowledge through MCP without building a server. Add fragments to Cortex MCP or point it at their own directory.

**Future (post-v1, enabled by Frame Brain):**
- Non-developers using AI tools for business (plumbing, restaurants, salons, engineering firms)
- Writers, researchers, and creatives using AI tools with structured workflows
- Anyone in any profession who benefits from domain-specific AI expertise

## MVP Scope (v1)

**Scope posture: HOLD SCOPE** — the engine and its initial library are right-sized. Build it bulletproof. Domain expansion is just content.

### Core Features

1. **Built-in knowledge library** — ships with a curated collection of agents, skills, patterns, and examples. Install Cortex MCP and your AI tool is immediately smarter. The library grows over time.
2. **On-demand delivery** — only serves the fragments relevant to the current task. Your AI tool asks for what it needs, gets exactly that, nothing more.
3. **Smart three-tier matching** — quick cache (~2ms), pre-built index lookup (~5-10ms), fuzzy fallback (~15-20ms). Ask for what you need in natural language, get the right result.
4. **Token efficient** — 90%+ reduction vs loading all files. Four output modes (index, minimal, catalog, full) for progressive loading. Token budgeting with greedy selection.
5. **Works with any MCP client** — standard MCP server over stdio. Not a plugin for any specific tool. Claude Code, Cursor, Windsurf — all work.
6. **Easy setup** — install, add to your MCP config, done. Under 5 minutes to working.
7. **AI-Memory integration** — read-only scan of your personal knowledge (lessons, patterns, failures from past projects). Results appear as "Related from your experience" alongside library results. Nobody else has this.
8. **Custom directories** — point it at additional directories of your own markdown knowledge. Serves them alongside the built-in library.

### Technical Features

- Fragment-based markdown resources with YAML frontmatter (tags, capabilities, useWhen, estimatedTokens)
- Pre-built index system (`npm run build-index`) — inverted keyword index, useWhen index, quick lookup cache
- MCP resources (static URIs + dynamic templates)
- MCP prompts as slash commands with argument substitution
- LRU caching with configurable TTL
- Hot reload in dev mode
- Fragment cross-references and dependencies
- Node.js, TypeScript, stdio transport
- Pure algorithmic matching — no AI/LLM calls, no API keys, no inference costs
- Zero cloud, zero network, zero cost

## NOT in Scope (v1)

| Excluded | Rationale |
|----------|-----------|
| Frame Brain integration | Frame Brain doesn't exist yet. Build the engine first, the generator second. |
| Domain content packs | Content for non-dev professions requires Frame Brain. Engine comes first. |
| Web UI dashboard | Nice to have for debugging, not essential for users. Add post-launch. |
| REGISTRY.md replacement | Requires deep AI Orchestrator System integration. Phase 2 feature. |
| Writing to AI-Memory | v1 is read-only. Writing adds complexity and risk. |
| Cloud or network features | Local-only by design. No accounts, no subscriptions, no data leaving the machine. |
| File modification | Read-only server. Never writes to the user's project files. |

## User Stories

1. **As a developer**, I want to install Cortex MCP once and have my AI tool immediately get access to a library of agents and skills so that every project I work on benefits without copying files around.

2. **As a Claude Code user**, I want to query for "error handling" and get back the most relevant skill fragment from the library so that I don't waste context on unrelated knowledge.

3. **As a Cursor user**, I want Cortex MCP to work without any Cursor-specific configuration so that I'm not locked into one tool.

4. **As a beginner**, I want to install Cortex MCP in under 5 minutes and see immediate results so that I don't give up before it's useful.

5. **As a power user with AI-Memory**, I want my past lessons and patterns to surface alongside library knowledge so that my AI tool benefits from my personal experience, not just generic expertise.

6. **As someone building my own agents**, I want to add my custom fragments to Cortex MCP's library (or point it at my own directory) so that my knowledge is served alongside the built-in library.

7. **As an AI Orchestrator System user**, I want Cortex MCP to serve my framework's agents and skills on-demand so that my project repos stay lightweight and my context window isn't wasted on knowledge I don't need right now.

## Risks and Assumptions

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Nobody finds it (discovery problem) | Fatal — great tool, zero users | Launch strategy: LinkedIn posts, Reddit (r/ClaudeAI, r/ChatGPTPro), GitHub trending, demo video |
| Setup friction kills adoption | High — people bounce before seeing value | Under 5-minute setup. Clear README. One command install. |
| Built-in library quality is poor | High — first impression matters | Curate carefully. Quality over quantity. Test each fragment. |
| No content for non-developers | Medium — audience stays narrow until Frame Brain | Acceptable for v1. Frame Brain is next. |
| MCP protocol evolves with breaking changes | Medium — requires maintenance | Use official MCP SDK. Track protocol changes. |
| Matching quality depends on frontmatter quality | Medium — garbage in, garbage out | Built-in library is well-structured. Authoring guide for custom fragments. |

### Assumptions

- MCP adoption continues growing across AI coding tools
- Fragment-based architecture scales to 1,000+ resources without performance degradation
- A curated library of 50-200 fragments provides enough value for developers to install and keep using
- The AI-Memory directory structure is stable enough to scan reliably

### Kill Rule

If 3 months after public launch: fewer than 20 GitHub stars AND zero community engagement (no issues, no forks, no mentions) → rethink positioning and distribution strategy. The tool may be fine; the story may need to change.

## Constraints

- **Developer:** Solo developer (Bashar)
- **Budget:** Zero. All tools and infrastructure are free (Node.js, npm, GitHub, GitHub Actions)
- **Timeline:** No hard deadline. Ship when it's ready and solid.
- **Technical:** MCP server development is new territory. MCP SDK and spec are the primary references.
- **Platform:** Node.js / TypeScript. stdio transport. Local-only.

## Open Questions

1. ~~What categories should the built-in library launch with?~~ **Resolved:** All four (agents, skills, patterns, examples).
2. ~~How many fragments should v1 ship with?~~ **Resolved:** Convert existing AI Orchestrator System agents (12) and skills (36) into fragments with frontmatter. That's ~48 fragments. Quality over quantity — 30 good fragments beats 300 mediocre ones. Library grows organically post-launch.
3. How should Cortex MCP handle markdown files without YAML frontmatter — skip them, or attempt best-effort keyword matching on content?
4. What's the right scoring weight for AI-Memory results relative to built-in library fragments?
5. Should MCP prompts (slash commands) be included in v1, or are resources + tools sufficient?
6. Should users be able to override or extend built-in fragments with their own versions?

## Post-v1 Roadmap

| Phase | What | Why |
|-------|------|-----|
| v1.x | Expand built-in library | More agents, skills, patterns, examples |
| v1.x | Web UI for testing and monitoring | Developer experience, debugging |
| v1.x | REGISTRY.md replacement | Live routing for AI Orchestrator users |
| v2 | Frame Brain | Generate domain knowledge for any profession |
| v2 | Domain content packs | Ready-made agents/skills for non-dev professions |
| v2+ | AI-Memory write support | Cortex MCP captures lessons during sessions |
