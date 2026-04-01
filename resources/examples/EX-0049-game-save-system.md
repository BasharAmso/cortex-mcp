---
id: EX-0049
name: Game Save/Load System
category: examples
tags: [game-dev, save, load, serialization, versioning, auto-save, cloud-sync, typescript]
capabilities: [game-state-serialization, schema-versioning, auto-save, slot-management]
useWhen:
  - implementing a save/load system for a game
  - building versioned game saves with migration support
  - adding auto-save and multiple save slots to a game
estimatedTokens: 650
relatedFragments: [PAT-0152, SKL-0142, EX-0017]
dependencies: []
synonyms: ["game save system", "save file manager", "game state persistence", "save slot system", "game checkpoint system"]
sourceUrl: "https://github.com/photonstorm/phaser"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "game-dev"
---

# Game Save/Load System

Serializable game state with versioned saves, auto-save timer, and slot management.

## Implementation

```typescript
// --- Types ---
interface GameState {
  player: { x: number; y: number; health: number; level: number; inventory: string[] };
  world: { currentMap: string; unlockedAreas: string[]; npcsDefeated: string[] };
  progress: { quests: Record<string, 'active' | 'complete'>; playtimeSeconds: number };
}

interface SaveFile {
  version: number;
  slot: number;
  timestamp: string;
  checksum: string;
  state: GameState;
}

// --- Schema Migrations ---
type Migration = (state: Record<string, any>) => Record<string, any>;

const CURRENT_VERSION = 3;

const migrations: Record<number, Migration> = {
  // v1 -> v2: added inventory to player
  2: (state) => ({
    ...state,
    player: { ...state.player, inventory: state.player.inventory ?? [] },
  }),
  // v2 -> v3: added playtime tracking
  3: (state) => ({
    ...state,
    progress: { ...state.progress, playtimeSeconds: state.progress.playtimeSeconds ?? 0 },
  }),
};

function migrateState(state: Record<string, any>, fromVersion: number): GameState {
  let current = state;
  for (let v = fromVersion + 1; v <= CURRENT_VERSION; v++) {
    const migrate = migrations[v];
    if (migrate) current = migrate(current);
  }
  return current as GameState;
}

// --- Checksum ---
function computeChecksum(state: GameState): string {
  const json = JSON.stringify(state);
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    const char = json.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

// --- Save Manager ---
class SaveManager {
  private readonly storageKey = 'game_saves';
  private autoSaveTimer: ReturnType<typeof setInterval> | null = null;

  save(state: GameState, slot: number): SaveFile {
    const saveFile: SaveFile = {
      version: CURRENT_VERSION,
      slot,
      timestamp: new Date().toISOString(),
      checksum: computeChecksum(state),
      state: structuredClone(state),
    };

    const saves = this.getAllSaves();
    saves[slot] = saveFile;
    localStorage.setItem(this.storageKey, JSON.stringify(saves));
    return saveFile;
  }

  load(slot: number): GameState | null {
    const saves = this.getAllSaves();
    const saveFile = saves[slot];
    if (!saveFile) return null;

    // Verify integrity
    const expectedChecksum = computeChecksum(saveFile.state as GameState);
    if (saveFile.checksum !== expectedChecksum) {
      console.warn(`Save slot ${slot} corrupted: checksum mismatch`);
      return null;
    }

    // Migrate if needed
    if (saveFile.version < CURRENT_VERSION) {
      return migrateState(saveFile.state as Record<string, any>, saveFile.version);
    }

    return saveFile.state;
  }

  deleteSave(slot: number): void {
    const saves = this.getAllSaves();
    delete saves[slot];
    localStorage.setItem(this.storageKey, JSON.stringify(saves));
  }

  listSlots(): Array<{ slot: number; timestamp: string; level: number }> {
    const saves = this.getAllSaves();
    return Object.entries(saves)
      .filter(([, v]) => v !== undefined)
      .map(([slot, save]) => ({
        slot: Number(slot),
        timestamp: save.timestamp,
        level: save.state.player.level,
      }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // --- Auto-Save ---
  startAutoSave(getState: () => GameState, intervalMs = 60000, slot = 0): void {
    this.stopAutoSave();
    this.autoSaveTimer = setInterval(() => {
      this.save(getState(), slot);
      console.log(`Auto-saved to slot ${slot}`);
    }, intervalMs);
  }

  stopAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  private getAllSaves(): Record<number, SaveFile> {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : {};
  }
}
```

## Key Patterns

- **Schema versioning**: incremental migrations run in sequence from saved version to current
- **Checksum validation**: detects corrupted save files before loading
- **`structuredClone`**: deep-copies state on save to prevent reference leaks
- **Auto-save timer**: configurable interval writes to a dedicated slot without user action
- **Slot management**: list, save, load, and delete across multiple save slots
