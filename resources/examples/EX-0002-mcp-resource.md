---
id: EX-0002
name: MCP Resource Registration Example
category: examples
tags: [mcp, resource, server, typescript, sdk, template, example]
capabilities: [mcp-resource-creation, dynamic-resources, resource-templates]
useWhen:
  - creating MCP resources (static or dynamic)
  - using resource templates with variables
  - serving files or data as MCP resources
estimatedTokens: 400
relatedFragments: [EX-0001]
dependencies: []
synonyms: ["how to create an mcp resource", "how to serve data from mcp server", "mcp resource template example", "how to expose files through mcp"]
sourceUrl: "https://github.com/modelcontextprotocol/servers"
lastUpdated: "2026-03-30"
difficulty: intermediate
---

# MCP Resource Registration Example

How to register static and dynamic resources with the MCP SDK, following patterns from the official reference servers (filesystem, memory, git).

## Static Resource

```typescript
// Expose a fixed configuration resource
// Pattern: the memory server exposes its knowledge graph as a static resource
server.resource(
  "config",
  "myapp://config",
  { description: "Application configuration", mimeType: "application/json" },
  async () => ({
    contents: [
      {
        uri: "myapp://config",
        mimeType: "application/json",
        text: JSON.stringify(config, null, 2),
      },
    ],
  }),
);
```

## Dynamic Resource (Template)

```typescript
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

// Dynamic resource with URI template variable
// Pattern: the filesystem server exposes file contents by path
server.resource(
  "file-contents",
  new ResourceTemplate("file:///{path}", { list: undefined }),
  { description: "Read file contents by path" },
  async (uri, vars) => {
    const filePath = String(vars.path);

    // Access control: only serve files in allowed directories
    if (!isWithinAllowedDirs(filePath)) {
      throw new Error("Access denied");
    }

    const content = await readFile(filePath, "utf-8");
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: getMimeType(filePath),
          text: content,
        },
      ],
    };
  },
);
```

## Key Points

- Static resources have a fixed URI string; dynamic resources use `ResourceTemplate` with `{variable}` placeholders
- Return `contents` array (can have multiple items for composite resources)
- Set `mimeType` for proper client handling (`application/json`, `text/plain`, `text/markdown`)
- Reference servers implement access controls before serving file content
- The `list` option in `ResourceTemplate` controls whether the resource appears in resource listing
