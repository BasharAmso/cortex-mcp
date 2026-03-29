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

## Quick Start

### 1. Install

```bash
npm install -g cortex-mcp
```

### 2. Build the index

```bash
cortex-mcp-build-index
# or from the project directory:
npm run build-index
```

### 3. Add to your MCP config

**Claude Code** (`~/.claude/settings.json`):
```json
{
  "mcpServers": {
    "cortex": {
      "command": "cortex-mcp"
    }
  }
}
```

**Cursor** (`.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "cortex": {
      "command": "cortex-mcp"
    }
  }
}
```

**Windsurf** — add to your MCP server configuration with the command `cortex-mcp`.

### 4. Use it

Your AI tool now has access to the knowledge library. Ask it to search for what you need:

- "Search for error handling patterns"
- "Find the skill for writing tests"
- "What agents are available?"

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

## License

MIT
