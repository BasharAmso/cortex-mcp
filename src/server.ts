import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export async function startServer(): Promise<void> {
  const server = new McpServer({
    name: "cortex-mcp",
    version: "0.1.0",
  });

  // Resources, tools, and prompts will be registered here
  // as they are built in subsequent tasks.

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
