---
id: SKL-0292
name: Game Audio Design
category: skills
tags: [audio, sound-effects, music, spatial-audio, web-audio, volume-management]
capabilities: [sound-playback, music-management, spatial-audio-setup, audio-optimization]
useWhen:
  - adding sound effects and background music to a game
  - managing audio volume and muting across scenes
  - implementing spatial or positional audio for immersion
  - working around browser autoplay restrictions
  - optimizing audio loading and memory usage
estimatedTokens: 600
relatedFragments: [SKL-0296, SKL-0291, SKL-0294]
dependencies: []
synonyms: ["how to add sound to my game", "background music in web games", "spatial audio for games", "browser autoplay audio not working", "managing game volume and mute", "sound effects for player actions"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/photonstorm/phaser"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Skill: Game Audio Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0292 |
| **Name** | Game Audio Design |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Game audio has two layers: **sound effects** (short, event-driven) and **music** (long, looping, scene-driven). Most frameworks abstract the Web Audio API, but understanding its constraints is essential for web games.

### Loading and Playing Sounds

Preload audio assets in your loading scene. Use short formats (OGG preferred for compression, MP3 as fallback). Keep sound effects under 2 seconds and music as streaming tracks when possible.

```javascript
// Preload
this.load.audio('jump', ['sfx/jump.ogg', 'sfx/jump.mp3']);
this.load.audio('bgm', ['music/level1.ogg', 'music/level1.mp3']);

// Play sound effect (fire and forget)
this.sound.play('jump', { volume: 0.6 });

// Play background music (looping)
this.bgm = this.sound.add('bgm', { loop: true, volume: 0.3 });
this.bgm.play();
```

### Browser Autoplay Policy

Modern browsers block audio until the user interacts with the page (click, tap, keypress). Handle this by resuming the audio context on first interaction:

```javascript
this.sound.once('unlocked', () => {
  this.bgm.play();
});
```

Display a "Click to Start" screen so the first interaction is natural, not forced.

### Volume Management

Maintain separate volume channels: master, music, and SFX. Store preferences in localStorage so they persist across sessions.

```javascript
// Global volume control
this.sound.setVolume(0.8);       // master
this.bgm.setVolume(musicSlider); // music channel
```

Fade music in and out during scene transitions using tweens on the volume property to avoid jarring cuts.

### Spatial Audio

For games with positional awareness (top-down exploration, side-scrollers with depth), attenuate volume based on distance from the listener (camera or player). Phaser's `SpatialSoundConfig` supports `x`, `y`, and `refDistance`. For advanced 3D panning, use the Web Audio API's `PannerNode` directly.

### Audio Sprites

Bundle multiple short sound effects into a single audio file with a JSON marker map. This reduces HTTP requests and load time, especially on mobile.

### Performance Tips

- Limit simultaneous sound instances (cap at 3-4 of the same SFX)
- Decode audio during load, not on first play
- Use lower sample rates (22050 Hz) for simple SFX to save memory

## Key Takeaways

- Always provide multiple audio formats (OGG + MP3) for cross-browser support
- Handle browser autoplay by gating audio start on user interaction
- Separate volume into master, music, and SFX channels with persistent preferences
- Use audio sprites to batch small sound effects into one file
- Cap simultaneous instances of the same sound to prevent distortion and CPU spikes
