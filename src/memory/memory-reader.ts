import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, extname } from "node:path";

export interface MemoryEntry {
  title: string;
  content: string;
  folder: string;
  filePath: string;
}

const MEMORY_FOLDERS = ["lessons", "patterns", "failures", "decisions"];

/**
 * Scan the AI-Memory directory for entries matching the query keywords.
 * Returns matching entries as "Related from your experience" results.
 * Read-only — never writes to AI-Memory.
 */
export function scanAIMemory(
  aiMemoryPath: string,
  queryTokens: string[],
): MemoryEntry[] {
  if (!existsSync(aiMemoryPath)) {
    return [];
  }

  const entries: MemoryEntry[] = [];

  for (const folder of MEMORY_FOLDERS) {
    const folderPath = resolve(aiMemoryPath, folder);
    if (!existsSync(folderPath)) continue;

    try {
      const files = readdirSync(folderPath, { withFileTypes: true });

      for (const file of files) {
        if (!file.isFile() || extname(file.name) !== ".md") continue;

        const filePath = resolve(folderPath, file.name);
        const content = readFileSync(filePath, "utf-8");

        if (matchesQuery(content, file.name, queryTokens)) {
          entries.push({
            title: extractTitle(content, file.name),
            content: content.trim(),
            folder,
            filePath,
          });
        }
      }
    } catch {
      // Skip inaccessible folders silently
    }
  }

  return entries;
}

/**
 * Check if a memory entry matches any of the query tokens.
 * Simple keyword matching — no scoring, just relevance filtering.
 */
function matchesQuery(
  content: string,
  filename: string,
  queryTokens: string[],
): boolean {
  const lowerContent = content.toLowerCase();
  const lowerFilename = filename.toLowerCase();

  let hits = 0;
  for (const token of queryTokens) {
    if (lowerContent.includes(token) || lowerFilename.includes(token)) {
      hits++;
    }
  }

  // Require at least 2 token hits (or 1 if query has only 1 token)
  return hits >= Math.min(2, queryTokens.length);
}

/**
 * Extract a title from a markdown file.
 * Uses the first H1 heading, or falls back to the filename.
 */
function extractTitle(content: string, filename: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : filename.replace(/\.md$/, "");
}

/**
 * Format memory entries for inclusion in search results.
 */
export function formatMemoryResults(entries: MemoryEntry[]): string {
  if (entries.length === 0) return "";

  const lines = ["## Related from your experience\n"];

  for (const entry of entries) {
    lines.push(`### ${entry.title} (${entry.folder})`);
    // Truncate long entries to ~500 chars
    const preview =
      entry.content.length > 500
        ? entry.content.slice(0, 500) + "..."
        : entry.content;
    lines.push(preview);
    lines.push("");
  }

  return lines.join("\n");
}
