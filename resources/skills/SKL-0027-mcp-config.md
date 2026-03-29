---
id: SKL-0027
name: MCP Configuration
category: skills
tags: [mcp, tooling, integration, configuration]
capabilities: [mcp-server-setup, tool-connection, credential-management, transport-configuration]
useWhen:
  - connecting Claude Code to external tools via MCP servers
  - configuring .mcp.json for GitHub, Notion, Slack, or database access
  - setting up stdio or HTTP transport for MCP integrations
estimatedTokens: 550
relatedFragments: [SKL-0018, AGT-0001]
dependencies: []
---

# MCP Configuration

Configure Claude Code's `.mcp.json` to connect the project to external tools (GitHub, Notion, Slack, databases) via MCP servers. This is framework-level wiring, not application code.

## Transport Defaults

| Context | Transport |
|---------|-----------|
| Local npm/Docker server | stdio |
| Remote cloud API | HTTP |

Never use SSE transport (deprecated).

## Common Server Configurations

| Service | Package | Credentials |
|---------|---------|-------------|
| GitHub | `@github/github-mcp-server` | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| Notion (OAuth) | `https://mcp.notion.com/mcp` | OAuth browser flow |
| Slack | `zencoderai/slack-mcp-server` | `SLACK_BOT_TOKEN`, `SLACK_TEAM_ID` |
| PostgreSQL | `@modelcontextprotocol/server-postgres` | `POSTGRES_CONNECTION_STRING` |
| Supabase | `@modelcontextprotocol/server-supabase` | `SUPABASE_URL`, `SUPABASE_ANON_KEY` |
| Brave Search | `brave/brave-search-mcp-server` | `BRAVE_API_KEY` |

## Procedure

1. **Clarify what to connect:** Which services? What capabilities needed? Project or local scope?
2. **Read existing .mcp.json** and preserve all existing server entries.
3. **Build config block** using appropriate transport (stdio or HTTP).
4. **Write updated .mcp.json** merging new server with existing servers.
5. **Provide credential setup instructions** with export commands and links to obtain tokens.
6. **Verify connection** via `claude mcp list`.

## Common Errors

| Error | Fix |
|-------|-----|
| `Connection closed` / `MCP error -32000` on Windows | Change command to `"cmd"`, prefix args with `"/c", "npx"` |
| `spawn npx ENOENT` | Use absolute path or fix shell PATH |
| Server not in `claude mcp list` | Ensure .mcp.json is at project root |

## Key Rules

- Never store raw secrets in .mcp.json. Always use `${ENV_VAR}` expansion.
- Never overwrite existing servers without reading first.
- Never add servers the user has not requested.
