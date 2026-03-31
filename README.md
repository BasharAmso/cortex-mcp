# Cortex MCP

A knowledge delivery engine that ships with a built-in library of 694 agents, skills, patterns, and examples across 26 domains — and serves them on-demand to any MCP-compatible AI tool.

Instead of every project loading its own framework files into context (wasting 90%+ of the token budget), Cortex MCP is installed once and feeds the right knowledge to any project that needs it.

## Setup

Two steps. Copy-paste each line into your terminal.

**Step 1 — Install it:**

```bash
npm install -g cortex-mcp-server
```

> Don't have Node.js? Download it from [nodejs.org](https://nodejs.org) (pick the LTS version). Then come back and run the line above.

**Step 2 — Connect it to your AI tool:**

<details>
<summary><strong>Claude Code</strong> (one command)</summary>

```bash
claude mcp add -s user cortex -- cortex-mcp-server
```

Restart Claude Code. Done.
</details>

<details>
<summary><strong>Cursor</strong></summary>

1. Open Cursor
2. Go to **Settings** (gear icon) > **MCP**
3. Click **Add new MCP server**
4. Name: `cortex` | Command: `cortex-mcp-server`

Or paste this into `~/.cursor/mcp.json` if you prefer:

```json
{
  "mcpServers": {
    "cortex": {
      "command": "cortex-mcp-server"
    }
  }
}
```
</details>

<details>
<summary><strong>Windsurf</strong></summary>

1. Open Windsurf
2. Go to **Settings** > **MCP Servers**
3. Add a new server with command: `cortex-mcp-server`
</details>

**That's it.** Now just work normally. Your AI tool will pull knowledge from the library when it needs it. You can also ask directly:

- "Search for error handling patterns"
- "Find the authentication skill"
- "Show me how to set up Stripe payments"
- "What agents are available?"

## How It Works

```
Cortex MCP (installed once, contains the library)
  ├── resources/
  │   ├── agents/      10 agent definitions
  │   ├── skills/     155 skill procedures
  │   ├── patterns/    83 reusable patterns
  │   └── examples/    16 code examples
  └── custom/         (your own directories, optional)
         ↓ serves on-demand via MCP
   ┌─────────┬──────────┬──────────┐
Project A   Project B   Project C
```

Your project repos stay lightweight. The knowledge lives in Cortex MCP and gets delivered based on what the current task needs.

## What's in the Library

| Category | Count | Examples |
|----------|-------|---------|
| **Agents** | 10 | Builder, Reviewer, Architect, Product Manager, Designer, Fixer, Deployer |
| **Skills** | 444 | CRM, Lead Scoring, Market Sizing, LinkedIn Strategy, Salon Booking, Restaurant POS, Code Review, Debugging, Game Physics, Level Design, E-Commerce, IoT, Healthcare, Finance, Education |
| **Patterns** | 225 | Error Handling, API Design, Circuit Breaker, Saga, Cart State, Checkout Recovery, Appointment Booking, POS Architecture, CRM Data Model, Inventory Tracking, Achievement System |
| **Examples** | 16 | MCP Tool, React Component, REST API, PWA Setup, Push Notifications, Offline-First, Stripe Checkout, GitHub Actions |

Every fragment includes synonyms for natural language matching. Ask "how do I add logins" and it finds the authentication pattern. Ask "my app is slow" and it finds the performance skill. Ask "how do I grow on LinkedIn" and it finds the LinkedIn strategy skill.

### 26 Knowledge Pillars

| Pillar | Fragments | What's Covered |
|--------|-----------|---------------|
| **Software Dev** | 78 | Error handling, APIs, testing, security, DevOps, CI/CD |
| **Framework Core** | 31 | Agents, orchestration, quality review, deployment |
| **Frontend** | 30 | React, state management, testing, performance, i18n, security |
| **UX Design** | 30 | Usability testing, design systems, accessibility, prototyping |
| **Architecture** | 30 | API gateways, message queues, caching, serverless, GraphQL |
| **App Polish** | 30 | Loading states, animations, keyboard shortcuts, feature flags |
| **E-Commerce** | 30 | Product catalogs, checkout, shipping, subscriptions, fraud prevention |
| **Game Dev** | 30 | Physics, audio, level design, multiplayer, procedural generation |
| **Education** | 30 | Course platforms, flashcards, grading, adaptive learning, AI tutoring |
| **Coding Literacy** | 30 | Reading code, code review, debugging, understanding abstractions |
| **Business Automation** | 30 | Salon booking, POS systems, invoicing, scheduling, loyalty programs |
| **Sales** | 30 | CRM, lead scoring, pipeline management, cold outreach, forecasting |
| **Market Research** | 30 | Competitor analysis, market sizing, surveys, trend analysis |
| **Personal Brand** | 30 | LinkedIn, newsletters, podcasting, speaking, community building |
| **Product Business** | 30 | MVP strategy, pricing, A/B testing, metrics, churn prevention |
| **Content Creation** | 30 | Writing, copywriting, YouTube, newsletters, AI-assisted creation |
| **Platform** | 30 | SwiftUI, Compose, Flutter, Vue, Svelte, Angular, Next.js |
| **Health** | 15 | Telehealth, FHIR, mental health apps, wearables, medication tracking |
| **Finance** | 15 | Personal finance, banking APIs, portfolios, tax engines, billing |
| **Collaboration** | 15 | Wikis, project management, video conferencing, team chat |
| **Religious** | 15 | Prayer times, scripture readers, donations, devotionals, sermons |
| **IoT** | 15 | Edge computing, MQTT, dashboards, smart home, industrial IoT |
| **Developer Growth** | 15 | Technical writing, open source, career growth, interview prep |
| **Language** | 15 | Java, C#, Swift, Kotlin, PHP, Ruby, concurrency patterns |
| **Automation** | 15 | Web scraping, browser automation, data pipelines, chatbots |
| **Domain-Specific** | 15 | Legal tech, construction, agriculture, logistics, event management |

## Features

- **694 built-in fragments** across 26 domains — agents, skills, patterns, and code examples
- **Pillar filtering** — filter by domain (e.g., `game-dev`, `ecommerce`, `sales`, `coding-literacy`)
- **Synonym matching** — finds fragments even when you use informal language
- **Three-tier search** — quick cache (~2ms), pre-built index (~5-10ms), fuzzy fallback (~15-20ms)
- **Token budgeting** — respects context limits with four output modes
- **Zero-result recovery** — suggests alternatives when nothing matches exactly
- **Stack detection** — `detect_project` tool identifies your stack and suggests relevant searches
- **Works with any MCP client** — Claude Code, Cursor, Windsurf, and others
- **Zero cost** — no cloud, no API keys, runs locally

## MCP Tools

| Tool | Description |
|------|-------------|
| `search_knowledge` | Natural language search with mode, budget, and category filters |
| `get_fragment` | Retrieve a fragment by ID with dependency and related notes |
| `browse_library` | Browse all fragments or filter by category |
| `list_categories` | List categories and fragment counts |
| `detect_project` | Detect your project's stack and get suggested searches |

## Output Modes

| Mode | What you get | Use when |
|------|-------------|----------|
| `index` | IDs and names only | Quick overview |
| `minimal` | JSON metadata + URIs | Default — good balance |
| `catalog` | Full metadata, no content | Browsing before loading |
| `full` | Complete markdown content | Ready to use |

## Configuration (optional)

Create `cortex.config.json` in your project root if you want to customize:

```json
{
  "customDirectories": ["./my-knowledge"],
  "matching": {
    "maxResults": 10,
    "defaultMode": "minimal",
    "defaultBudget": 4000
  }
}
```

Defaults work out of the box. Most users don't need a config file.

## Writing Your Own Fragments

See [docs/FRAGMENT-AUTHORING-GUIDE.md](docs/FRAGMENT-AUTHORING-GUIDE.md) for the complete guide.

Quick version: create a markdown file with YAML frontmatter in any configured directory:

```yaml
---
id: SKL-CUSTOM-001
name: My Custom Skill
category: skills
tags: [my-tag, another-tag]
capabilities: [what-it-can-do]
useWhen:
  - when to use this skill
synonyms: ["informal way to ask for it", "another way to ask"]
estimatedTokens: 500
lastUpdated: "2026-03-29"
difficulty: intermediate
relatedFragments: []
dependencies: []
---

# My Custom Skill

Content here...
```

## Development

```bash
npm install         # Install dependencies
npm run dev         # Dev mode (hot reload)
npm run build       # Build
npm run build-index # Rebuild search indexes
npm test            # Run tests
npm run typecheck   # Type check
```

## Troubleshooting

**"command not found" after install?** Close and reopen your terminal. If it still doesn't work, try `npx cortex-mcp-server` instead.

**Not seeing results?** Restart your AI tool after adding the MCP config. Changes only take effect on restart.

**Wrong fragments returned?** Try broader search terms. Use `browse_library` to see everything available.

## About

Built by [Bashar Amso](https://github.com/BasharAmso). I got tired of loading the same framework files into every project and burning through my token budget before asking my first question. Cortex MCP fixes that.

Part of the [Bashi](https://github.com/BasharAmso/bashi) ecosystem.

## License

MIT
