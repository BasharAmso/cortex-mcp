---
id: SKL-0027
name: MCP Configuration
category: skills
tags: [mcp, tooling, integration, configuration, model-context-protocol, sdk, server-setup]
capabilities: [mcp-server-setup, tool-connection, credential-management, transport-configuration, sdk-selection]
useWhen:
  - connecting Claude Code to external tools via MCP servers
  - configuring .mcp.json for GitHub, Notion, Slack, or database access
  - setting up stdio or HTTP transport for MCP integrations
  - choosing the right MCP SDK for a custom server implementation
  - debugging MCP connection failures
estimatedTokens: 550
relatedFragments: [SKL-0018, AGT-0001]
dependencies: []
synonyms: ["connect Claude to my tools", "set up MCP server", "hook up GitHub or Slack to Claude", "configure external tool access", "add a new tool integration"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/modelcontextprotocol/servers"
difficulty: advanced
---

# MCP Configuration

Configure Claude Code's `.mcp.json` to connect the project to external tools (GitHub, Notion, Slack, databases) via MCP servers. This is framework-level wiring, not application code. Based on the official MCP reference server implementations.

## MCP Architecture

MCP (Model Context Protocol) provides a standardized way for LLMs to access tools and data sources. The protocol has SDKs for multiple languages:

| SDK | Language | Use When |
|-----|----------|----------|
| `@modelcontextprotocol/sdk` | TypeScript | Most common, best for Node.js tools |
| `mcp` (PyPI) | Python | Data science tools, Python-native integrations |
| `modelcontextprotocol/go-sdk` | Go | High-performance, compiled servers |
| `modelcontextprotocol/rust-sdk` | Rust | Systems-level, embedded scenarios |

## Transport Defaults

| Context | Transport | Notes |
|---------|-----------|-------|
| Local npm/Docker server | stdio | Default for most reference servers |
| Remote cloud API | Streamable HTTP | Modern replacement for SSE |

Never use SSE transport (deprecated in favor of Streamable HTTP).

## Common Server Configurations

| Service | Package | Credentials |
|---------|---------|-------------|
| GitHub | `@github/github-mcp-server` | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| Notion (OAuth) | `https://mcp.notion.com/mcp` | OAuth browser flow |
| Slack | `zencoderai/slack-mcp-server` | `SLACK_BOT_TOKEN`, `SLACK_TEAM_ID` |
| PostgreSQL | `@modelcontextprotocol/server-postgres` | `POSTGRES_CONNECTION_STRING` |
| Filesystem | `@modelcontextprotocol/server-filesystem` | Directory path (sandboxed) |
| Brave Search | `brave/brave-search-mcp-server` | `BRAVE_API_KEY` |
| Puppeteer | `@modelcontextprotocol/server-puppeteer` | None (local browser) |

## Procedure

1. **Clarify what to connect:** Which services? What capabilities needed? Project-scoped or user-scoped?
2. **Read existing .mcp.json** and preserve all existing server entries.
3. **Build config block** using appropriate transport (stdio for local, HTTP for remote).
4. **Write updated .mcp.json** merging new server with existing servers.
5. **Provide credential setup instructions** with export commands and links to obtain tokens.
6. **Verify connection** via `claude mcp list`.

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Connection closed` / `MCP error -32000` on Windows | Node spawn issue | Change command to `"cmd"`, prefix args with `"/c", "npx"` |
| `spawn npx ENOENT` | npx not in PATH | Use absolute path to npx or fix shell PATH |
| Server not in `claude mcp list` | Config file location | Ensure .mcp.json is at project root |
| Timeout on first connection | Slow npm install | Add `--yes` flag to npx, or pre-install globally |

## Building Custom MCP Servers

When no existing server fits the need:

1. Choose SDK based on project language (TypeScript SDK is most mature)
2. Implement tool handlers with typed schemas
3. Use stdio transport for local development
4. Test with `claude mcp list` and manual tool invocation
5. Document available tools and required credentials

## Key Rules

- Never store raw secrets in .mcp.json. Always use `${ENV_VAR}` expansion.
- Never overwrite existing servers without reading first.
- Never add servers the user has not requested.
- Reference servers are educational examples, not production-ready solutions. Evaluate security for your use case.
