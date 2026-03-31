---
id: SKL-0341
name: Zero-Trust Security Architecture
category: skills
tags: [zero-trust, identity-verification, least-privilege, micro-segmentation, security, authentication]
capabilities: [zero-trust-design, identity-management, network-segmentation, access-policy-design]
useWhen:
  - designing security for a system that cannot rely on network perimeter trust
  - implementing identity verification for every service-to-service call
  - applying least-privilege access policies across an infrastructure
  - migrating from perimeter-based security to zero-trust
  - designing micro-segmentation for a cloud-native environment
estimatedTokens: 660
relatedFragments: [SKL-0333, SKL-0338, PAT-0175, SKL-0331]
dependencies: []
synonyms: ["what is zero trust security", "how to implement zero trust", "never trust always verify explained", "micro-segmentation for beginners", "least privilege access design", "zero trust vs perimeter security"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: advanced
owner: "cortex"
pillar: "architecture"
---

# Zero-Trust Security Architecture

Zero trust operates on a simple principle: never trust, always verify. No user, device, or service is trusted by default, even if it is inside the network perimeter. Every access request is authenticated, authorized, and encrypted regardless of origin.

## Core Principles

**Verify explicitly.** Every request must prove identity using strong authentication (tokens, certificates, multi-factor). Being on the internal network is not proof of trust.

**Least-privilege access.** Grant the minimum permissions needed to perform a specific task. No standing access. Temporary, scoped credentials that expire.

**Assume breach.** Design as if an attacker is already inside the network. Limit blast radius so compromising one component does not compromise everything.

## Identity as the New Perimeter

In zero trust, identity replaces the network perimeter as the primary security boundary.

**User identity:** Multi-factor authentication, single sign-on (SSO), conditional access policies based on device health, location, and risk signals.

**Service identity:** Every service has a cryptographic identity (mTLS certificates, SPIFFE IDs). Services authenticate to each other on every call, not just on first connection.

**Device identity:** Devices are registered and assessed for compliance (patched OS, encryption enabled, managed endpoint) before granting access.

## Micro-Segmentation

Instead of a flat internal network where any machine can reach any other, micro-segmentation creates fine-grained network zones with explicit allow rules.

| Approach | How It Works |
|----------|-------------|
| **Network policies (Kubernetes)** | Define which pods can communicate with which other pods. Default-deny everything, then allow specific paths. |
| **Service mesh (Istio, Linkerd)** | Enforce mTLS between services and apply authorization policies at the proxy layer. |
| **Cloud security groups** | Restrict traffic between VPC subnets and instances based on port, protocol, and source. |
| **Software-defined perimeter** | Create dynamic, identity-based perimeters that grant access to specific applications, not network segments. |

Start with default-deny network policies. Services that do not explicitly need to communicate should not be able to reach each other.

## Policy Engine

A centralized policy engine evaluates access requests against defined rules. Decisions consider identity, device posture, resource sensitivity, and context (time, location, behavior).

**Policy decision point (PDP):** Evaluates whether a request should be allowed based on policy rules.

**Policy enforcement point (PEP):** Intercepts requests and enforces the PDP's decision. Deployed as proxies, sidecars, or API gateways.

Use a policy-as-code framework (Open Policy Agent, Cedar) to version-control, test, and audit policies like application code.

## Implementation Steps

1. **Inventory assets** — catalog all users, services, devices, and data stores
2. **Map communication flows** — document which services talk to which services and why
3. **Establish identity** — implement strong authentication for users (SSO + MFA) and services (mTLS)
4. **Default-deny access** — block all traffic by default; create explicit allow rules for documented flows
5. **Encrypt everything** — TLS for all communication, at rest and in transit, no exceptions
6. **Monitor continuously** — log all access decisions, detect anomalies, alert on policy violations
7. **Iterate** — zero trust is a journey, not a one-time deployment. Start with the most sensitive systems.

## Common Pitfalls

- **Treating zero trust as a product.** It is an architecture, not something you buy.
- **Boiling the ocean.** Start with one high-value system and expand incrementally.
- **Ignoring user experience.** Excessive authentication prompts cause people to find workarounds. Use risk-based step-up authentication.
- **Forgetting east-west traffic.** Most breaches move laterally inside the network. Micro-segmentation addresses this.
