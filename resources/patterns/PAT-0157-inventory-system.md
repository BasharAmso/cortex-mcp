---
id: PAT-0157
name: Inventory System Pattern
category: patterns
tags: [game-dev, inventory, item-management, drag-drop, equipment-slots, stacking]
capabilities: [inventory-design, item-data-modeling, slot-management, drag-drop-ui, equipment-system]
useWhen:
  - adding an inventory system to an RPG or survival game
  - designing item data structures with stacking and rarity
  - implementing drag-and-drop item management UI
  - building equipment slots for character gear
  - choosing between grid-based and list-based inventory layouts
estimatedTokens: 700
relatedFragments: [SKL-0142, SKL-0143, PAT-0066, PAT-0159]
dependencies: []
synonyms: ["how to build an inventory system for my game", "item management in games", "drag and drop inventory UI", "equipment slots and gear system", "how to handle item stacking", "RPG inventory design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/godotengine/godot"
difficulty: intermediate
owner: "cortex"
pillar: "game-dev"
---

# Pattern: Inventory System

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0157 |
| **Name** | Inventory System Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

An inventory system manages items the player collects, stores, uses, and equips. The data model must be separate from the UI so the same inventory logic works across grid views, list views, shops, and equipment screens.

### Architecture

```
Inventory System
├── Item Database (static definitions)
│   └── ItemDef { id, name, icon, maxStack, type, rarity, stats }
├── Inventory (runtime state)
│   └── Slot[] { itemId, quantity }
├── Equipment (specialized inventory)
│   └── SlotMap { head, chest, weapon, shield, ... }
├── Inventory UI (presentation)
│   └── Grid or List of SlotViews
└── Interaction Layer (drag-drop, use, discard)
```

### Item Data Model

Define items as data, not code. Each item type is a resource/record in a database, JSON file, or config:

```typescript
interface ItemDef {
  id: string;           // "sword_iron", "potion_health"
  name: string;         // Display name
  description: string;
  icon: string;         // Sprite key or path
  type: 'weapon' | 'armor' | 'consumable' | 'material' | 'quest';
  maxStack: number;     // 1 for equipment, 20-99 for consumables
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  stats?: { attack?: number; defense?: number; healing?: number };
  usable: boolean;
}
```

### Inventory Slot Model

The inventory is an array of slots. Each slot holds one item type with a quantity:

```typescript
interface InventorySlot {
  itemId: string | null; // null = empty slot
  quantity: number;
}

class Inventory {
  slots: InventorySlot[];
  maxSlots: number;

  addItem(itemId: string, amount: number): number {
    // 1. Find existing stack with space
    // 2. If no space, find empty slot
    // 3. Return leftover amount (0 = success, >0 = inventory full)
  }

  removeItem(itemId: string, amount: number): boolean { ... }
  getItemCount(itemId: string): number { ... }
  swap(fromIndex: number, toIndex: number): void { ... }
}
```

### Grid vs. List Layout

| Layout | Pros | Cons | Best For |
|--------|------|------|----------|
| **Grid** | Compact, spatial organization, familiar (Minecraft, Diablo) | Harder to show item details | RPGs, survival, loot-heavy games |
| **List** | Easy to read, room for stats | Takes more screen space | Mobile games, simple inventories |

### Equipment Slots

Equipment is a specialized inventory with named slots instead of numbered indices:

```typescript
class Equipment {
  slots: Record<EquipSlot, InventorySlot> = {
    head: { itemId: null, quantity: 1 },
    chest: { itemId: null, quantity: 1 },
    weapon: { itemId: null, quantity: 1 },
    shield: { itemId: null, quantity: 1 },
    boots: { itemId: null, quantity: 1 },
  };

  equip(slot: EquipSlot, itemId: string): string | null {
    const previous = this.slots[slot].itemId;
    this.slots[slot].itemId = itemId;
    return previous; // return unequipped item to inventory
  }
}
```

### Drag-and-Drop Implementation

1. **On drag start:** Record source slot index, show ghost sprite following cursor
2. **On drag over:** Highlight valid drop targets (inventory slots, equipment slots, trash)
3. **On drop:** If target is empty, move item. If target has same item, merge stacks. If target has different item, swap. If target is equipment slot, validate item type matches slot type.
4. **On drag cancel:** Return item to source slot

### Stacking Rules

- Items with `maxStack > 1` can share a slot up to the limit
- When adding items, fill existing partial stacks first, then use empty slots
- Splitting a stack: take half (round down) into the cursor, leave the rest
- Merging: combine two partial stacks up to maxStack, overflow stays in source

## Anti-Patterns

- Storing item definitions inside inventory slots (duplicates data; reference by ID instead)
- Coupling inventory logic to UI code (makes it impossible to reuse for shops, chests, NPC trade)
- Hardcoding slot count (use a configurable maxSlots, upgradeable at runtime)
- No overflow handling when inventory is full (items vanish silently)

## Key Takeaways

- Separate item definitions (static data) from inventory state (runtime slots)
- An inventory is just an array of slots; equipment is a named-slot map
- Fill existing partial stacks before using empty slots
- Keep inventory logic UI-agnostic so it works for player bags, chests, and shops
- Always handle the "inventory full" case explicitly
