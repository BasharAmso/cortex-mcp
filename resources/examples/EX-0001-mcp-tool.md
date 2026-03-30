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
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# MCP Tool Registration Example

How to register a tool with the MCP SDK (TypeScript).

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

// Register a tool with typed parameters
server.tool(
  "search",
  {
    query: z.string().describe("Search query"),
    limit: z.number().optional().default(10),
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

// Connect via stdio
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Key Points

- Use `z` (Zod) for parameter schemas — auto-converted to JSON Schema
- Return `content` array with typed content blocks
- Use `type: "text"` for most responses
- Connect via `StdioServerTransport` for local MCP servers
- Log to stderr (stdout is the MCP transport channel)
