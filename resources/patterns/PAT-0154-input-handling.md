---
id: PAT-0154
name: Input Handling Pattern
category: patterns
tags: [input, keyboard, gamepad, touch, input-mapping, rebinding]
capabilities: [multi-device-input, input-action-mapping, key-rebinding, touch-controls]
useWhen:
  - handling keyboard, mouse, and gamepad input in a game
  - creating an input mapping layer for rebindable controls
  - adding touch controls for mobile games
  - supporting multiple input devices simultaneously
  - implementing input buffering for fighting or action games
estimatedTokens: 620
relatedFragments: [SKL-0291, SKL-0294, PAT-0152]
dependencies: []
synonyms: ["how to handle game input", "keyboard and gamepad controls", "rebindable key bindings", "touch controls for mobile game", "input mapping for games", "supporting controller and keyboard"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/photonstorm/phaser"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Pattern: Input Handling

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0154 |
| **Name** | Input Handling Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Good input handling abstracts physical devices (keyboard, gamepad, touch) into logical actions. Game code should never check for specific keys directly. Instead, it checks for actions like "jump" or "move_left" that can be mapped to any device.

### The Action Map Pattern

Define actions and bind them to physical inputs through a mapping layer:

```javascript
const inputMap = {
  jump:       { keyboard: 'SPACE', gamepad: 'A' },
  move_left:  { keyboard: 'LEFT',  gamepad: 'LEFT_STICK_LEFT' },
  move_right: { keyboard: 'RIGHT', gamepad: 'LEFT_STICK_RIGHT' },
  attack:     { keyboard: 'X',     gamepad: 'X' },
  pause:      { keyboard: 'ESC',   gamepad: 'START' }
};

// Game code uses actions, not keys
if (input.isActionPressed('jump')) {
  player.jump();
}
```

This pattern enables rebinding, multi-device support, and accessibility with zero changes to game logic.

### Input States

Track three states per action:

| State | Meaning | Use Case |
|-------|---------|----------|
| **Just Pressed** | Became active this frame | Jump, attack, menu select |
| **Held** | Active for multiple frames | Move, charge attack, sprint |
| **Just Released** | Released this frame | Release charged attack, stop sprinting |

Most frameworks provide these natively. In Phaser:

```javascript
const cursors = this.input.keyboard.createCursorKeys();
if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
  player.jump();  // fires once per press
}
if (cursors.left.isDown) {
  player.moveLeft();  // fires every frame while held
}
```

### Input Buffering

In action and fighting games, buffer inputs for a short window (100-200ms) so that actions queued slightly before they become valid still execute. For example, pressing jump just before landing should trigger a jump on the next grounded frame.

```javascript
let jumpBufferTimer = 0;

function update(delta) {
  if (input.isActionJustPressed('jump')) {
    jumpBufferTimer = 150; // ms
  }
  jumpBufferTimer = Math.max(0, jumpBufferTimer - delta);

  if (player.isGrounded && jumpBufferTimer > 0) {
    player.jump();
    jumpBufferTimer = 0;
  }
}
```

This makes controls feel responsive rather than demanding frame-perfect timing.

### Touch Controls

For mobile, provide on-screen virtual controls:

- **Virtual joystick** - A draggable circle for movement. Place bottom-left for right-handed players.
- **Action buttons** - Large tap targets (minimum 48x48 CSS pixels) on the right side.
- **Gesture zones** - Swipe regions for dodge, inventory, or camera control.

Make touch controls semi-transparent and allow players to reposition them. Always support both touch and physical controls simultaneously for tablet users with gamepads.

### Gamepad Support

Detect gamepad connection dynamically:

```javascript
this.input.gamepad.once('connected', (pad) => {
  console.log(`Gamepad connected: ${pad.id}`);
});
```

Handle analog sticks with a dead zone (0.15-0.25) to prevent drift when the stick is at rest. Normalize stick values to -1 to 1 after applying the dead zone.

### Key Rebinding

Store bindings in a user preferences file (localStorage for web, config file for desktop). The settings menu reads the current map, lets the player press a new key, and writes the updated binding. Prevent duplicate bindings by checking for conflicts and warning the player.

## Key Takeaways

- Always use an action map layer between physical inputs and game logic
- Track three input states (just pressed, held, just released) for correct behavior
- Buffer inputs for 100-200ms in action games to forgive imprecise timing
- Place mobile touch controls with large tap targets and allow repositioning
- Apply dead zones (0.15-0.25) to analog sticks and store rebindings in user preferences
