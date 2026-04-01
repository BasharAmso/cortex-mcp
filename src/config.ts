import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import { parse } from "yaml";

// Resolve the package root (where resources/ lives), not process.cwd()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PACKAGE_ROOT = resolve(__dirname, "..");

export type OutputMode = "index" | "minimal" | "catalog" | "full";

export interface CortexConfig {
  directories: string[];
  customDirectories: string[];
  aiMemoryPath: string;
  cache: {
    maxSize: number;
    ttl: number;
  };
  matching: {
    fuzzyThreshold: number;
    maxResults: number;
    defaultMode: OutputMode;
    defaultBudget: number;
  };
  devMode: boolean;
  indexPath: string;
}

const DEFAULTS: CortexConfig = {
  directories: [resolve(PACKAGE_ROOT, "resources")],
  customDirectories: [],
  aiMemoryPath: process.env.AI_MEMORY_PATH ?? resolve(homedir(), "Projects", "AI-Memory"),
  cache: {
    maxSize: 100,
    ttl: 14_400_000, // 4 hours
  },
  matching: {
    fuzzyThreshold: 0.3,
    maxResults: 10,
    defaultMode: "minimal",
    defaultBudget: 4000,
  },
  devMode: false,
  indexPath: resolve(PACKAGE_ROOT, ".cortex"),
};

const CONFIG_FILENAME = "cortex.config.json";

/**
 * Load configuration from cortex.config.json in the given directory,
 * merging with defaults. Missing fields use defaults.
 */
export function loadConfig(baseDir?: string): CortexConfig {
  const dir = baseDir ?? process.cwd();
  const configPath = resolve(dir, CONFIG_FILENAME);

  if (!existsSync(configPath)) {
    return resolveDirectories(DEFAULTS, dir);
  }

  try {
    const raw = readFileSync(configPath, "utf-8");
    const userConfig = JSON.parse(raw) as Partial<CortexConfig>;
    const merged = deepMerge(DEFAULTS, userConfig);
    return resolveDirectories(merged, dir);
  } catch {
    // Bad config — use defaults with a warning
    console.error(`[cortex-mcp] Warning: could not parse ${configPath}, using defaults`);
    return resolveDirectories(DEFAULTS, dir);
  }
}

/**
 * Resolve relative directory paths to absolute paths.
 */
function resolveDirectories(config: CortexConfig, baseDir: string): CortexConfig {
  return {
    ...config,
    directories: config.directories.map((d) => resolve(baseDir, d)),
    customDirectories: config.customDirectories.map((d) => resolve(baseDir, d)),
    aiMemoryPath: config.aiMemoryPath.startsWith("~")
      ? resolve(homedir(), config.aiMemoryPath.slice(2))
      : resolve(baseDir, config.aiMemoryPath),
    indexPath: resolve(baseDir, config.indexPath),
  };
}

/**
 * Simple two-level deep merge. Nested objects are merged, not replaced.
 */
function deepMerge(defaults: CortexConfig, overrides: Partial<CortexConfig>): CortexConfig {
  return {
    directories: overrides.directories ?? defaults.directories,
    customDirectories: overrides.customDirectories ?? defaults.customDirectories,
    aiMemoryPath: overrides.aiMemoryPath ?? defaults.aiMemoryPath,
    cache: { ...defaults.cache, ...overrides.cache },
    matching: { ...defaults.matching, ...overrides.matching },
    devMode: overrides.devMode ?? defaults.devMode,
    indexPath: overrides.indexPath ?? defaults.indexPath,
  };
}
