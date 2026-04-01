import { watch } from "chokidar";
import type { FSWatcher } from "chokidar";

export interface WatcherCallbacks {
  onFragmentChange: (path: string) => void;
}

/**
 * Start a file watcher for dev mode.
 * Watches fragment directories for changes and triggers reloading.
 */
export function startWatcher(directories: string[], callbacks: WatcherCallbacks): FSWatcher {
  const watcher = watch(
    directories.map((d) => `${d}/**/*.md`),
    {
      ignoreInitial: true,
      awaitWriteFinish: { stabilityThreshold: 300 },
    },
  );

  watcher.on("add", (path) => {
    console.error(`[cortex-mcp] Fragment added: ${path}`);
    callbacks.onFragmentChange(path);
  });

  watcher.on("change", (path) => {
    console.error(`[cortex-mcp] Fragment changed: ${path}`);
    callbacks.onFragmentChange(path);
  });

  watcher.on("unlink", (path) => {
    console.error(`[cortex-mcp] Fragment removed: ${path}`);
    callbacks.onFragmentChange(path);
  });

  console.error(`[cortex-mcp] Dev mode: watching ${directories.length} directories for changes`);

  return watcher;
}
