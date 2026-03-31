---
id: PAT-0202
name: OTA Firmware Update Pattern
category: patterns
tags: [ota, firmware-update, staged-rollout, rollback, integrity-verification, iot, update-management]
capabilities: [ota-pipeline-design, staged-rollout, rollback-strategy, firmware-integrity]
useWhen:
  - building over-the-air firmware update infrastructure for IoT devices
  - designing a staged rollout strategy for device firmware
  - implementing firmware integrity verification and rollback
  - planning update delivery for devices with intermittent connectivity
  - managing firmware versions across a heterogeneous device fleet
estimatedTokens: 650
relatedFragments: [SKL-0391, SKL-0395, PAT-0200, SKL-0149]
dependencies: []
synonyms: ["how to update IoT firmware remotely", "over the air update for devices", "firmware rollout strategy", "device update rollback", "OTA update architecture", "push firmware to IoT fleet"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/home-assistant/core"
difficulty: intermediate
owner: "cortex"
pillar: "iot"
---

# OTA Firmware Update Pattern

Over-the-air firmware updates are the only practical way to maintain and secure deployed IoT devices. A failed update can brick devices, so the process demands careful engineering.

## OTA Pipeline

```
Build → Sign → Stage → Distribute → Apply → Verify → Report
```

| Step | Action | Failure Mode |
|------|--------|-------------|
| **Build** | Compile firmware, run tests | Build fails: block release |
| **Sign** | Cryptographically sign the binary | Signing key compromise: rotate keys, re-sign |
| **Stage** | Upload to CDN or update server | Upload fails: retry with checksum verification |
| **Distribute** | Notify devices of available update | Device offline: queue notification, deliver on reconnect |
| **Apply** | Device downloads, verifies, installs | Download corrupt: retry. Verification fails: reject. |
| **Verify** | Device boots new firmware, runs self-test | Boot fails: automatic rollback to previous version |
| **Report** | Device reports new version to platform | Report lost: platform queries device on next contact |

## Integrity Verification

Every firmware image must be verified before installation:

1. **Checksum**: SHA-256 hash of the binary, compared against the manifest. Catches download corruption.
2. **Signature**: RSA or ECDSA signature verified against a public key embedded in the bootloader. Catches tampering and unauthorized images.
3. **Version check**: Monotonic version counter prevents rollback attacks. New firmware version must be strictly greater than current.

The verification chain must be rooted in hardware (secure boot) or a trusted bootloader partition that is never updated OTA.

## Staged Rollout Strategy

Never push firmware to all devices simultaneously:

| Phase | Target | Duration | Criteria to Advance |
|-------|--------|----------|-------------------|
| **Canary** | 1-5 devices (internal test) | 24-48 hours | Zero crashes, all health checks pass |
| **Early adopters** | 5% of fleet | 48-72 hours | Error rate below baseline, no regressions |
| **Gradual rollout** | 25% → 50% → 100% | 1-2 weeks | Each stage stable for 24h before expanding |
| **Emergency halt** | Pause all | Immediate | Any stage shows elevated error rate |

Home Assistant's update integration follows this principle by showing updates as available but requiring user confirmation. Critical security patches can be flagged as urgent.

## A/B Partition Layout

The safest OTA strategy uses dual partitions:

```
Flash Layout:
  [Bootloader] [Partition A (active)] [Partition B (inactive)] [Data]
```

1. Current firmware runs from Partition A
2. New firmware is written to Partition B while the device continues operating
3. Bootloader is updated to point to Partition B
4. Device reboots into new firmware
5. If new firmware fails self-test, bootloader automatically reverts to Partition A

This ensures the device always has a known-good firmware to fall back to. The data partition is never overwritten during updates, preserving configuration and credentials.

## Handling Constrained Devices

Devices with limited flash storage cannot afford dual partitions. Alternatives:
- **Delta updates**: Send only the binary diff between old and new firmware. Reduces download size by 70-90% but requires the device to have enough RAM to apply the patch.
- **Compressed updates**: LZMA or zstd compression reduces image size. Device decompresses during write.
- **Minimal bootloader recovery**: A tiny recovery partition (8-16KB) can download and flash the main partition if the primary firmware is corrupt.

## Key Takeaways

- Every firmware image must be cryptographically signed and verified before installation
- Use A/B partitions for automatic rollback when new firmware fails to boot
- Stage rollouts through canary, early adopter, and gradual phases with health checks between each
- Never allow version rollback via OTA: enforce monotonic version counters
- For constrained devices, use delta updates to reduce download size while maintaining integrity
