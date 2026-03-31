---
id: PAT-0066
name: Game State Machines
category: patterns
tags: [game-dev, state-machine, fsm, game-state, menu, pause, hierarchical-state, pushdown-automata]
capabilities: [game-flow-management, state-transitions, hierarchical-states, state-stack-management]
useWhen:
  - managing game-level states like menu, play, pause, game over
  - modeling character behavior states like idle, run, jump, attack
  - implementing hierarchical or nested state machines
  - using a state stack with push and pop for temporary states
  - replacing tangled boolean flags with clean state logic
estimatedTokens: 600
relatedFragments: [SKL-0142, PAT-0064, PAT-0065, SKL-0143]
dependencies: []
synonyms: ["game state management menu play pause", "how to handle pause and game over screens", "character state machine for games", "finite state machine game dev", "how to manage game flow between screens", "replacing boolean flags with states in games"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/munificent/game-programming-patterns"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Game State Machines

State machines replace tangled boolean flags with explicit states and controlled transitions. In games, they manage both high-level flow (menu, play, pause) and entity behavior (idle, run, jump, attack).

## Game-Level State Machine

```
         ┌──────────┐
         │  LOADING  │
         └─────┬─────┘
               ▼
         ┌──────────┐    Start
         │   MENU   │◄─────────────┐
         └─────┬─────┘              │
               ▼                    │
         ┌──────────┐         ┌─────┴─────┐
         │ PLAYING  │────────►│ GAME OVER │
         └─────┬─────┘  Lose  └───────────┘
               │ Esc
               ▼
         ┌──────────┐
         │  PAUSED  │
         └──────────┘
           Resume │
               ▼
           (back to PLAYING)
```

## Basic Implementation

```javascript
const State = { LOADING: 'loading', MENU: 'menu', PLAYING: 'playing', PAUSED: 'paused', GAME_OVER: 'gameover' };

const transitions = {
  loading:   { loaded: 'menu' },
  menu:      { start: 'playing' },
  playing:   { pause: 'paused', die: 'gameover' },
  paused:    { resume: 'playing', quit: 'menu' },
  gameover:  { restart: 'playing', quit: 'menu' }
};

function handleEvent(currentState, event) {
  const next = transitions[currentState]?.[event];
  if (!next) return currentState;  // invalid transition, ignore
  onExit(currentState);
  onEnter(next);
  return next;
}
```

Each state has `onEnter` (setup) and `onExit` (cleanup) hooks. Playing's `onEnter` starts the game loop. Paused's `onEnter` freezes physics and shows the pause overlay.

## Character State Machine

For entity behavior, states replace chains of `if (isJumping && !isDucking && hasWeapon)`:

| State | Enter | Update | Transitions |
|-------|-------|--------|------------|
| **Idle** | Play idle animation | Check input | Move input: Walking. Jump input: Jumping |
| **Walking** | Play walk animation | Apply velocity | No input: Idle. Jump: Jumping. Edge: Falling |
| **Jumping** | Apply jump impulse | Gravity | Land: Idle/Walking. Peak: Falling |
| **Falling** | Play fall animation | Gravity | Land: Idle/Walking |
| **Attacking** | Play attack animation, create hitbox | Timer | Animation done: previous state |

Each state encapsulates its own behavior. No state needs to know about the others.

## Hierarchical State Machines

When states share behavior, group them under a superstate:

```
OnGround (superstate)
├── Idle
├── Walking
└── Running
  (all share: handle jump input, handle damage)

InAir (superstate)
├── Jumping
└── Falling
  (all share: apply gravity, no ground friction)
```

Common behavior lives in the superstate. Substates only define what differs. This eliminates duplication without inheritance.

## Pushdown Automata (State Stack)

A stack of states enables temporary states that return to the previous state automatically:

```
Stack: [Playing]

Player pauses:
  push(Paused)
  Stack: [Playing, Paused]

Player resumes:
  pop()
  Stack: [Playing]  ← returns to exactly where they were

Player opens inventory while playing:
  push(Inventory)
  Stack: [Playing, Inventory]

Player opens a sub-menu from inventory:
  push(ItemDetail)
  Stack: [Playing, Inventory, ItemDetail]

Close: pop() → Inventory. Close again: pop() → Playing.
```

The stack remembers history. Each pop returns to the previous state without hardcoding "go back to playing." This is ideal for nested menus, dialogues, and cutscenes.

## When to Use Each Variant

| Variant | Best For |
|---------|----------|
| **Simple FSM** | Game flow (menu/play/pause), simple AI, character movement |
| **Hierarchical FSM** | Character with many states sharing behavior (ground vs air) |
| **Pushdown (stack)** | Nested menus, temporary overlays, dialogue systems |
| **Concurrent FSMs** | Independent concerns (movement state + equipment state + status effects) |

## Anti-Patterns

- Boolean flags instead of states (`isJumping && !isDucking && !isAttacking`)
- Missing `onExit` cleanup (audio keeps playing, timers keep running)
- Transitions that skip intermediate states (menu directly to game over)
- One massive switch statement instead of encapsulated state objects
- Not separating game-level states from entity-level states (different machines)
