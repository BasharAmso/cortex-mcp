---
id: EX-0001
name: MCP Tool Registration Example
category: examples
tags: [mcp, tool, server, typescript, sdk, example]
capabilities: [mcp-tool-creation, server-setup, tool-registration]
useWhen:
  - creating an MCP server tool
  - registering tools with the MCP SDK
  - building an MCP server from scratch
estimatedTokens: 450
relatedFragments: [EX-0002]
dependencies: []
synonyms: ["how to create an mcp tool", "how to build an mcp server", "mcp tool registration example", "how to add a tool to mcp"]
sourceUrl: "https://github.com/modelcontextprotocol/servers"
lastUpdated: "2026-03-30"
difficulty: intermediate
owner: builder
---

# MCP Tool Registration Example

How to register a tool with the MCP SDK (TypeScript), following patterns from the official reference servers.

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

// Register a tool with typed parameters using Zod
// Pattern from modelcontextprotocol/servers reference implementations
server.tool(
  "search",
  "Search documents by query string",
  {
    query: z.string().describe("Search query"),
    limit: z.number().optional().default(10).describe("Max results"),
  },
  async (args) => {
    const results = await performSearch(args.query, args.limit);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  },
);

// Tools can return errors without throwing
server.tool("read_file", "Read a file with access control", {
  path: z.string().describe("File path to read"),
}, async (args) => {
  if (!isAllowedPath(args.path)) {
    return {
      isError: true,
      content: [{ type: "text", text: "Access denied: path outside allowed directories" }],
    };
  }
  const content = await readFile(args.path, "utf-8");
  return { content: [{ type: "text", text: content }] };
});

// Connect via stdio transport (standard for local MCP servers)
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Key Points

- **Description string** is the second argument to `server.tool()`, used by LLMs to decide when to call the tool
- **Zod schemas** auto-convert to JSON Schema for the MCP protocol
- Return `isError: true` in the content response for graceful tool-level errors
- Reference servers use `StdioServerTransport` for local process communication
- Always log to stderr since stdout is the MCP transport channel
- Implement access controls (like allowed paths) as the reference filesystem server does
