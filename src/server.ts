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
    name: "cortex-mcp-server",
    version: "0.4.2",
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

  // Compute counts once for dynamic tool descriptions
  const uniquePillars = new Set(fragments.map((f) => f.pillar));

  server.tool(
    "search_knowledge",
    `Search ${fragments.length} knowledge fragments across ${uniquePillars.size} domains for validated patterns, skill procedures, and implementation examples. Use before writing code, designing architecture, or reviewing work to ground your approach in battle-tested practices.`,
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
      pillar: z
        .string()
        .optional()
        .describe("Filter to a specific pillar/domain (e.g., 'game-dev', 'ecommerce', 'architecture')"),
    },
    async (args) => {
      const mode: OutputMode = args.mode ?? config.matching.defaultMode;
      const budget = args.budget ?? config.matching.defaultBudget;

      let results = engine.search(
        args.query,
        args.category,
        config.matching.maxResults,
      );

      // Filter by pillar if specified
      if (args.pillar) {
        results = results.filter((r) => r.fragment.pillar === args.pillar);
      }

      // Zero-result recovery: if no results, try without category filter
      // and suggest broader terms
      if (results.length === 0 && args.category) {
        results = engine.search(args.query, undefined, config.matching.maxResults);
        if (results.length > 0) {
          const budgeted = selectWithinBudget(results, budget);
          const formatted = formatResults(budgeted, mode);
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify(
                  {
                    note: `No results in "${args.category}". Showing results from all categories instead.`,
                    ...formatted,
                  },
                  null,
                  2,
                ),
              },
            ],
          };
        }
      }

      if (results.length === 0) {
        // Suggest browsing categories when nothing matches
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
                  results: [],
                  suggestion:
                    "No fragments matched your query. Try broader terms, or use browse_library to explore by category.",
                  availableCategories: counts,
                },
                null,
                2,
              ),
            },
          ],
        };
      }

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
    "Retrieve the full content of a specific knowledge fragment by ID (e.g. SKL-0001, PAT-0042). Use after search_knowledge returns relevant results and you need the complete procedure, pattern, or example.",
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

      // Build dependency and related notes
      const notes: string[] = [];

      if (fragment.dependencies.length > 0) {
        const depNames = fragment.dependencies
          .map((depId) => {
            const dep = fragmentMap.get(depId);
            return dep ? `${depId} (${dep.name})` : depId;
          })
          .join(", ");
        notes.push(`**Prerequisites:** ${depNames}`);
      }

      if (fragment.relatedFragments.length > 0) {
        const relNames = fragment.relatedFragments
          .map((relId) => {
            const rel = fragmentMap.get(relId);
            return rel ? `${relId} (${rel.name})` : relId;
          })
          .join(", ");
        notes.push(`**Related:** ${relNames}`);
      }

      const noteBlock = notes.length > 0 ? `\n\n---\n${notes.join("\n")}` : "";

      return {
        content: [
          {
            type: "text" as const,
            text: `# ${fragment.name}\n\n${fragment.content}${noteBlock}`,
          },
        ],
      };
    },
  );

  server.tool(
    "browse_library",
    "List all available knowledge fragments, optionally filtered by category (skills, patterns, agents, examples) or domain pillar (e.g. game-dev, ecommerce). Use to discover what knowledge exists before searching.",
    {
      category: z
        .enum(["agents", "skills", "patterns", "examples", "all"])
        .optional()
        .describe("Category to browse, or 'all' for everything (default: all)"),
      pillar: z
        .string()
        .optional()
        .describe("Filter to a specific pillar/domain (e.g., 'game-dev', 'ecommerce', 'architecture')"),
    },
    async (args) => {
      const cat = args.category ?? "all";
      let filtered =
        cat === "all" ? fragments : fragments.filter((f) => f.category === cat);

      if (args.pillar) {
        filtered = filtered.filter((f) => f.pillar === args.pillar);
      }

      const listing = filtered.map((f) => ({
        id: f.id,
        name: f.name,
        category: f.category,
        pillar: f.pillar,
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

  server.tool(
    "detect_project",
    "Analyze a list of project root filenames to detect the tech stack and suggest relevant knowledge searches. Use at project start to auto-scope knowledge to the right domains.",
    {
      files: z
        .array(z.string())
        .describe(
          "List of filenames in the project root (e.g., package.json, requirements.txt, Cargo.toml)",
        ),
    },
    async (args) => {
      const files = args.files.map((f) => f.toLowerCase());

      const signals: string[] = [];
      const suggestedQueries: string[] = [];

      // Detect stack from project files
      if (files.includes("package.json")) {
        signals.push("Node.js / JavaScript");
        suggestedQueries.push("backend API", "testing strategy");
      }
      if (files.includes("tsconfig.json")) {
        signals.push("TypeScript");
      }
      if (
        files.includes("next.config.js") ||
        files.includes("next.config.ts") ||
        files.includes("next.config.mjs")
      ) {
        signals.push("Next.js");
        suggestedQueries.push("frontend development", "authentication", "deployment");
      }
      if (files.includes("requirements.txt") || files.includes("pyproject.toml")) {
        signals.push("Python");
        suggestedQueries.push("backend API", "testing strategy");
      }
      if (files.includes("cargo.toml")) {
        signals.push("Rust");
      }
      if (files.includes("go.mod")) {
        signals.push("Go");
      }
      if (files.includes("prisma") || files.some((f) => f.includes("prisma"))) {
        signals.push("Prisma ORM");
        suggestedQueries.push("database design", "database migration");
      }
      if (files.includes("docker-compose.yml") || files.includes("dockerfile")) {
        signals.push("Docker");
        suggestedQueries.push("deployment", "CI/CD");
      }
      if (files.includes(".github")) {
        signals.push("GitHub Actions");
        suggestedQueries.push("CI/CD pipeline");
      }
      if (files.includes("stripe") || files.some((f) => f.includes("stripe"))) {
        suggestedQueries.push("payments", "webhooks");
      }

      // Deduplicate suggestions
      const uniqueQueries = [...new Set(suggestedQueries)];

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                detectedStack: signals,
                suggestedSearches: uniqueQueries,
                tip: "Run search_knowledge with each suggested search to get relevant fragments for your stack.",
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  server.tool("list_categories", "Show all categories and domain pillars with fragment counts. Use to understand library coverage and available filtering options.", {}, async () => {
    const counts: Record<string, number> = {};
    const pillarCounts: Record<string, number> = {};
    for (const f of fragments) {
      counts[f.category] = (counts[f.category] ?? 0) + 1;
      pillarCounts[f.pillar] = (pillarCounts[f.pillar] ?? 0) + 1;
    }
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              totalFragments: fragments.length,
              categories: counts,
              pillars: pillarCounts,
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
