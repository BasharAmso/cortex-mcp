# Cortex MCP

A knowledge delivery engine that ships with a built-in library of agents, skills, patterns, and examples — and serves them on-demand to any MCP-compatible AI tool.

Instead of every project loading its own framework files into context (wasting 90%+ of the token budget), Cortex MCP is installed once and feeds the right knowledge to any project that needs it.

## How It Works

```
Cortex MCP (installed once, contains the library)
  ├── resources/
  │   ├── agents/       (agent definitions)
  │   ├── skills/       (skill procedures)
  │   ├── patterns/     (reusable patterns)
  │   └── examples/     (code examples)
  ├── AI-Memory/        (your personal lessons and patterns)
  └── custom/           (additional directories you configure)
         ↓ serves on-demand via MCP
   ┌─────────┬──────────┬──────────┐
Project A   Project B   Project C
```

Your project repos stay lightweight. The knowledge lives in Cortex MCP and gets delivered based on what the current task needs.

## Getting Started

### Before you begin

You need **Node.js 20 or newer** on your computer. If you're not sure, open a terminal and type `node --version`. If you see a number like `v20.x.x` or higher, you're good. If not, download it from [nodejs.org](https://nodejs.org).

### Step 1: Install Cortex MCP

Open your terminal (Command Prompt, PowerShell, or Mac Terminal) and run:

```bash
npm install -g cortex-mcp
```

This installs Cortex MCP on your computer. You only do this once. It's not tied to any project — it works across all of them.

### Step 2: Tell your AI tool about it

Cortex MCP works with Claude Code, Cursor, Windsurf, and other MCP-compatible tools. Pick the one you use and follow the steps below.

**If you use Claude Code:**

Open your settings file. You can find it at:
- **Windows:** `C:\Users\YourName\.claude\settings.json`
- **Mac:** `~/.claude/settings.json`

Add this inside the file (or add the `mcpServers` section if it doesn't exist):

```json
{
  "mcpServers": {
    "cortex": {
      "command": "cortex-mcp"
    }
  }
}
```

**If you use Cursor:**

Open (or create) the file `.cursor/mcp.json` in your home folder and add:

```json
{
  "mcpServers": {
    "cortex": {
      "command": "cortex-mcp"
    }
  }
}
```

**If you use Windsurf:**

Add `cortex-mcp` as an MCP server in your Windsurf settings. The command is just `cortex-mcp`.

### Step 3: Start using it

That's it. There's no Step 3 setup. Just open your AI tool and start working.

Cortex MCP runs quietly in the background. When your AI tool needs knowledge about how to build something, review code, write tests, or follow a pattern, it pulls the right information from the library automatically.

You can also ask it directly:

- "Search for error handling patterns"
- "Find the skill for writing tests"
- "What agents are available?"
- "Show me how to create an MCP tool"

### Troubleshooting

**"command not found" after install?** Close and reopen your terminal. If it still doesn't work, try `npx cortex-mcp` instead.

**Not seeing results?** Make sure you saved the settings file and restarted your AI tool. The MCP connection only picks up config changes on restart.

## Features

- **Built-in knowledge library** — ships with agents, skills, patterns, and examples
- **On-demand delivery** — only serves what's relevant to the current task
- **Three-tier matching** — quick cache (~2ms), pre-built index (~5-10ms), fuzzy fallback (~15-20ms)
- **Token efficient** — 90%+ reduction vs loading all files. Four output modes for progressive loading
- **Works with any MCP client** — Claude Code, Cursor, Windsurf, and any tool that supports MCP
- **AI-Memory integration** — surfaces your personal lessons and patterns alongside library results
- **Zero cost** — no cloud, no network, no API keys. Pure algorithmic matching

## Configuration

Create a `cortex.config.json` in your project root (optional — defaults work out of the box):

```json
{
  "directories": ["./resources"],
  "customDirectories": ["./my-knowledge"],
  "aiMemoryPath": "~/Projects/AI-Memory",
  "cache": {
    "maxSize": 100,
    "ttl": 14400000
  },
  "matching": {
    "fuzzyThreshold": 0.3,
    "maxResults": 10,
    "defaultMode": "minimal",
    "defaultBudget": 4000
  },
  "devMode": false
}
```

## MCP Tools

| Tool | Description |
|------|-------------|
| `search_knowledge` | Search the library with natural language. Supports mode, budget, and category filters. |
| `get_fragment` | Retrieve a specific fragment by ID |
| `list_categories` | List available categories and fragment counts |

## Output Modes

| Mode | What you get | Use when |
|------|-------------|----------|
| `index` | IDs and names only | Quick overview of what's available |
| `minimal` | JSON metadata + URIs | Default — good balance of info and tokens |
| `catalog` | Full metadata, no content | Browsing before loading full content |
| `full` | Complete markdown content | Ready to use the knowledge |

## Writing Fragments

Fragments are markdown files with YAML frontmatter:

```yaml
---
id: SKL-0001
name: Plan From Idea
category: skills
tags: [planning, idea, capture]
capabilities: [idea-intake, task-seeding]
useWhen:
  - user captures a new project idea
  - starting a project from scratch
estimatedTokens: 850
relatedFragments: [SKL-0004]
dependencies: []
---

# Plan From Idea

Your fragment content here...
```

## Development

```bash
# Install dependencies
npm install

# Run in dev mode (hot reload)
npm run dev

# Build
npm run build

# Run tests
npm test

# Build indexes
npm run build-index

# Type check
npm run typecheck
```

## Tech Stack

- **Runtime:** Node.js 20+, TypeScript
- **MCP SDK:** @modelcontextprotocol/sdk
- **Matching:** Fuse.js (fuzzy), custom scoring engine
- **Transport:** stdio (standard MCP)
- **Dependencies:** 3 runtime packages (MCP SDK, yaml, fuse.js)

## About

My name is Bashar Amso. I've spent my career in software development — not as a developer, but working alongside them. Managing projects, understanding systems, figuring out how to get things built and shipped.

When AI coding tools came along, they changed everything for me. Suddenly I could build things myself. Not just plan them or hand them off — actually build them. But I kept hitting the same wall. Every time I started a new project, I had to load all my framework files into context. My agents, my skills, my patterns — everything. And every time, it ate up most of my token budget before I even asked my first question.

I thought: why am I loading the entire library when I only need two or three things right now?

That's what Cortex MCP solves. Instead of dumping everything into context and hoping for the best, it serves only the knowledge that's relevant to what you're working on. You install it once, and every project you open gets access to the full library without the cost.

I built this on top of my experience creating the [AI Orchestrator System](https://github.com/BasharAmso/AI-Orchestrator-System) — a framework for structured AI development with agents, skills, and workflows. Cortex MCP is the delivery layer. The orchestrator tells you what to do. Cortex tells your AI tool how to do it.

If you're tired of running out of context or re-explaining the same patterns to your AI every session, this is for you. Beginner or senior dev — Cortex MCP is the playbook your AI tool has been missing.

## License

MIT
