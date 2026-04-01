import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Regression test: every server.tool() call must include a description string.
 *
 * The MCP SDK exposes tool descriptions in tools/list responses.
 * Without descriptions, agents have no routing signals about WHEN to use each tool.
 * This test prevents regression back to description-less tools.
 */
describe("MCP tool descriptions", () => {
  const serverSource = readFileSync(resolve(import.meta.dirname, "../src/server.ts"), "utf-8");

  // Extract all server.tool( calls and their arguments
  // Pattern: server.tool(\n    "toolName",\n    <next-arg>
  const toolPattern = /server\.tool\(\s*\n?\s*"([^"]+)",\s*\n?\s*([`"{])/g;
  const tools: Array<{ name: string; hasDescription: boolean }> = [];

  let match;
  while ((match = toolPattern.exec(serverSource)) !== null) {
    const name = match[1];
    // If the second argument starts with ` or " it's a description string.
    // If it starts with { it's a schema object (no description).
    const secondArgStart = match[2];
    tools.push({
      name,
      hasDescription: secondArgStart === '"' || secondArgStart === "`",
    });
  }

  it("should find all 6 registered tools", () => {
    const toolNames = tools.map((t) => t.name).sort();
    expect(toolNames).toEqual([
      "browse_library",
      "detect_project",
      "get_fragment",
      "list_categories",
      "search_knowledge",
      "search_metrics",
    ]);
  });

  it("every tool should have a description string", () => {
    const missing = tools.filter((t) => !t.hasDescription).map((t) => t.name);
    expect(missing, `Tools missing descriptions: ${missing.join(", ")}`).toEqual([]);
  });
});
