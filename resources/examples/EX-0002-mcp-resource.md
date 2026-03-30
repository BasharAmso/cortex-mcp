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
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# MCP Resource Registration Example

How to register static and dynamic resources with the MCP SDK.

## Static Resource

```typescript
server.resource(
  "config",
  "myapp://config",
  { description: "Application configuration" },
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

server.resource(
  "user-profile",
  new ResourceTemplate("myapp://users/{userId}", { list: undefined }),
  { description: "User profile by ID" },
  async (uri, vars) => {
    const user = await getUser(String(vars.userId));
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(user, null, 2),
        },
      ],
    };
  },
);
```

## Key Points

- Static resources have a fixed URI string
- Dynamic resources use `ResourceTemplate` with `{variable}` placeholders
- Return `contents` array (can have multiple items)
- Set `mimeType` for proper client handling
