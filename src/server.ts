import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { loadConfig, type OutputMode } from "./config.js";
import { loadFragments, buildFragmentMap } from "./loader/fragment-loader.js";
import { buildIndexes, loadIndexes } from "./indexing/index-builder.js";
import { createMatchingEngine } from "./matching/engine.js";
import { selectWithinBudget } from "./budgeting/token-budgeter.js";
import { formatResults } from "./budgeting/output-modes.js";

export async function startServer(): Promise<void> {
  const config = loadConfig();

  // Load fragments from all configured directories
  const allDirs = [...config.directories, ...config.customDirectories];
  const fragments = loadFragments(allDirs);
  const fragmentMap = buildFragmentMap(fragments);

  // Load pre-built indexes (or fall back to null)
  const indexData = loadIndexes(config.indexPath);
  if (!indexData) {
    console.error(
      "[cortex-mcp] No pre-built indexes found. Run `npm run build-index` for faster lookups.",
    );
  }

  // Create matching engine
  const engine = createMatchingEngine(fragments, fragmentMap, indexData, {
    cacheMaxSize: config.cache.maxSize,
    cacheTtl: config.cache.ttl,
    fuzzyThreshold: config.matching.fuzzyThreshold,
    maxResults: config.matching.maxResults,
  });

  const server = new McpServer({
    name: "cortex-mcp",
    version: "0.1.0",
  });

  // --- Resources ---

  // Static: full library index
  server.resource(
    "library-index",
    "cortex://library/index",
    { description: "Full index of all fragments" },
    async () => ({
      contents: [
        {
          uri: "cortex://library/index",
          mimeType: "application/json",
          text: JSON.stringify(
            fragments.map((f) => ({
              id: f.id,
              name: f.name,
              category: f.category,
              estimatedTokens: f.estimatedTokens,
            })),
            null,
            2,
          ),
        },
      ],
    }),
  );

  // Dynamic: fragments by category
  server.resource(
    "library-category",
    new ResourceTemplate("cortex://library/{category}", { list: undefined }),
    { description: "All fragments in a category" },
    async (uri, vars) => {
      const category = String(vars.category);
      const filtered = fragments.filter((f) => f.category === category);
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(
              filtered.map((f) => ({
                id: f.id,
                name: f.name,
                category: f.category,
                tags: f.tags,
                estimatedTokens: f.estimatedTokens,
              })),
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  // Dynamic: single fragment by ID
  server.resource(
    "fragment",
    new ResourceTemplate("cortex://fragment/{id}", { list: undefined }),
    { description: "Full content of a specific fragment by ID" },
    async (uri, vars) => {
      const id = String(vars.id);
      const fragment = fragmentMap.get(id);
      if (!fragment) {
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "text/plain",
              text: `Fragment not found: ${id}`,
            },
          ],
        };
      }
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/markdown",
            text: fragment.content,
          },
        ],
      };
    },
  );

  // --- Tools ---

  server.tool(
    "search_knowledge",
    {
      query: z.string().describe("Natural language search query"),
      mode: z
        .enum(["index", "minimal", "catalog", "full"])
        .optional()
        .describe("Output detail level (default: minimal)"),
      budget: z
        .number()
        .optional()
        .describe("Token budget limit (default: 4000)"),
      category: z
        .enum(["agents", "skills", "patterns", "examples"])
        .optional()
        .describe("Filter to a specific category"),
    },
    async (args) => {
      const mode: OutputMode = args.mode ?? config.matching.defaultMode;
      const budget = args.budget ?? config.matching.defaultBudget;

      const results = engine.search(
        args.query,
        args.category,
        config.matching.maxResults,
      );
      const budgeted = selectWithinBudget(results, budget);
      const formatted = formatResults(budgeted, mode);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(formatted, null, 2),
          },
        ],
      };
    },
  );

  server.tool(
    "get_fragment",
    {
      id: z.string().describe("Fragment ID (e.g., SKL-0001, AGT-0003)"),
    },
    async (args) => {
      const fragment = fragmentMap.get(args.id);
      if (!fragment) {
        return {
          content: [
            { type: "text" as const, text: `Fragment not found: ${args.id}` },
          ],
        };
      }
      return {
        content: [
          {
            type: "text" as const,
            text: `# ${fragment.name}\n\n${fragment.content}`,
          },
        ],
      };
    },
  );

  server.tool(
    "browse_library",
    {
      category: z
        .enum(["agents", "skills", "patterns", "examples", "all"])
        .optional()
        .describe("Category to browse, or 'all' for everything (default: all)"),
    },
    async (args) => {
      const cat = args.category ?? "all";
      const filtered =
        cat === "all" ? fragments : fragments.filter((f) => f.category === cat);

      const listing = filtered.map((f) => ({
        id: f.id,
        name: f.name,
        category: f.category,
        tags: f.tags,
        estimatedTokens: f.estimatedTokens,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              { total: listing.length, category: cat, fragments: listing },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  server.tool("list_categories", {}, async () => {
    const counts: Record<string, number> = {};
    for (const f of fragments) {
      counts[f.category] = (counts[f.category] ?? 0) + 1;
    }
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              totalFragments: fragments.length,
              categories: counts,
            },
            null,
            2,
          ),
        },
      ],
    };
  });

  // --- Prompts ---

  server.prompt(
    "find",
    { query: z.string().describe("Search query") },
    async (args) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Search the Cortex MCP knowledge library for: ${args.query}\n\nUse the search_knowledge tool with this query to find relevant fragments.`,
          },
        },
      ],
    }),
  );

  server.prompt(
    "explain",
    { topic: z.string().describe("Topic to explain") },
    async (args) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Find and explain the concept of "${args.topic}" using the Cortex MCP knowledge library.\n\nUse search_knowledge with mode "full" to get the complete content, then explain it clearly.`,
          },
        },
      ],
    }),
  );

  server.prompt(
    "related",
    { fragmentId: z.string().describe("Fragment ID to find related fragments for") },
    async (args) => {
      const fragment = fragmentMap.get(args.fragmentId);
      const related = fragment?.relatedFragments?.join(", ") ?? "none";
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Show fragments related to ${args.fragmentId} (${fragment?.name ?? "unknown"}).\n\nRelated IDs: ${related}\n\nUse get_fragment to retrieve each related fragment.`,
            },
          },
        ],
      };
    },
  );

  // --- Start ---

  console.error(
    `[cortex-mcp] Server starting — ${fragments.length} fragments loaded from ${allDirs.length} directories`,
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
