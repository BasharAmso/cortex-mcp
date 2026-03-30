# Cortex MCP

A knowledge delivery engine that ships with a built-in library of 83 agents, skills, patterns, and examples — and serves them on-demand to any MCP-compatible AI tool.

Instead of every project loading its own framework files into context (wasting 90%+ of the token budget), Cortex MCP is installed once and feeds the right knowledge to any project that needs it.

## Quick Start (60 seconds)

### 1. Install

```bash
npm install -g cortex-mcp-server
```

Requires Node.js 20+. Check with `node --version`.

### 2. Connect to your AI tool

**Claude Code** (recommended):

```bash
claude mcp add -s user cortex -- cortex-mcp-server
```

That's it. One command. Restart Claude Code and you're connected.

**Cursor:**

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "cortex": {
      "command": "cortex-mcp-server"
    }
  }
}
```

**Windsurf:**

Add `cortex-mcp-server` as an MCP server in your Windsurf settings. The command is just `cortex-mcp-server`.

### 3. Use it

Just work normally. Your AI tool will pull knowledge from the library when it needs it. You can also ask directly:

- "Search for error handling patterns"
- "Find the authentication skill"
- "Show me how to set up Stripe payments"
- "What agents are available?"

## How It Works

```
Cortex MCP (installed once, contains the library)
  ├── resources/
  │   ├── agents/     10 agent definitions
  │   ├── skills/     43 skill procedures
  │   ├── patterns/   21 reusable patterns
  │   └── examples/    9 code examples
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
| **Skills** | 43 | Code Review, Testing, Security Audit, Auth, Payments, Search, i18n, Performance |
| **Patterns** | 21 | Error Handling, API Design, Database, Caching, CI/CD, Webhooks, Multi-tenancy |
| **Examples** | 9 | MCP Tool, React Component, REST API, Stripe Checkout, Auth Flow, GitHub Actions |

Every fragment includes synonyms for natural language matching. Ask "how do I add logins" and it finds the authentication pattern. Ask "my app is slow" and it finds the performance skill.

## Features

- **83 built-in fragments** — agents, skills, patterns, and code examples
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
npm test            # Run tests (29 tests)
npm run typecheck   # Type check
```

## Troubleshooting

**"command not found" after install?** Close and reopen your terminal. If it still doesn't work, try `npx cortex-mcp-server` instead.

**Not seeing results?** Restart your AI tool after adding the MCP config. Changes only take effect on restart.

**Wrong fragments returned?** Try broader search terms. Use `browse_library` to see everything available.

## About

My name is Bashar Amso. I've spent my career in software development — not as a developer, but working alongside them. Managing projects, understanding systems, figuring out how to get things built and shipped.

When AI coding tools came along, they changed everything for me. Suddenly I could build things myself. But I kept hitting the same wall: every new project, I had to load all my framework files into context. My agents, my skills, my patterns — everything. And every time, it ate up most of my token budget before I even asked my first question.

I thought: why am I loading the entire library when I only need two or three things right now?

That's what Cortex MCP solves. Install it once, and every project gets access to the full library without the cost. Built on top of the [AI Orchestrator System](https://github.com/BasharAmso/AI-Orchestrator-System) — a framework for structured AI development with agents, skills, and workflows.

## License

MIT
