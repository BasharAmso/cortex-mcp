#!/usr/bin/env python3
"""
Sync content from AI Orchestrator System framework SKILL.md files
to Cortex MCP fragment files. Keeps cortex frontmatter, replaces body.

Framework is the source of truth for the 35 core skills.
"""

import os
import re

FRAMEWORK_DIR = os.path.normpath("c:/Users/basha/Projects/AI-Orchestrator-System")
CORTEX_SKILLS_DIR = os.path.normpath("c:/Users/basha/Projects/cortex-mcp/resources/skills")

# Mapping: framework skill folder name -> cortex filename
SKILL_MAP = {
    # Built-in skills (.claude/skills/)
    "plan-from-idea": "SKL-0001-plan-from-idea.md",
    "quality-review": "SKL-0002-quality-review.md",
    "prd-to-tasks": "SKL-0003-prd-to-tasks.md",
    "prd-writing": "SKL-0004-prd-writing.md",
    "frontend-dev": "SKL-0005-frontend-dev.md",
    "backend-dev": "SKL-0006-backend-dev.md",
    "mobile-dev": "SKL-0007-mobile-dev.md",
    "database-admin": "SKL-0008-database-admin.md",
    "ai-feature": "SKL-0009-ai-feature.md",
    "api-integration": "SKL-0010-api-integration.md",
    "monetization": "SKL-0011-monetization.md",
    "analytics": "SKL-0012-analytics.md",
    "growth": "SKL-0013-growth.md",
    "customer-support": "SKL-0014-customer-support.md",
    "security-audit": "SKL-0015-security-audit.md",
    "code-review": "SKL-0016-code-review.md",
    "test-writing": "SKL-0017-test-writing.md",
    "uat-testing": "SKL-0018-uat-testing.md",
    "refactoring": "SKL-0019-refactoring.md",
    "bug-investigation": "SKL-0020-bug-investigation.md",
    "deployment": "SKL-0021-deployment.md",
    "mcp-config": "SKL-0022-mcp-config.md",
    "ux-design": "SKL-0023-ux-design.md",
    "documentation": "SKL-0024-documentation.md",
    "project-planning": "SKL-0025-project-planning.md",
    # SKL-0026 (Team Retro) — no cortex equivalent, skip
    "problem-stress-test": "SKL-0027-problem-stress-test.md",
    "gdd-writing": "SKL-0028-gdd-writing.md",
}

# Custom skills (custom-skills/)
CUSTOM_SKILL_MAP = {
    "insecure-defaults": "SKL-0029-insecure-defaults.md",
    "differential-security-review": "SKL-0030-diff-security-review.md",
    "supply-chain-audit": "SKL-0031-supply-chain-audit.md",
    "seo-audit": "SKL-0032-seo-audit.md",
    "copywriting": "SKL-0033-copywriting.md",
    "launch-checklist": "SKL-0034-launch-checklist.md",
    "competitor-analysis": "SKL-0035-competitor-analysis.md",
    "pitch-deck": "SKL-0036-pitch-deck.md",
}


def extract_body(content: str) -> str:
    """Extract content body after YAML frontmatter (after second ---)."""
    parts = content.split("---", 2)
    if len(parts) >= 3:
        return parts[2].lstrip("\n")
    return content


def extract_frontmatter(content: str) -> str:
    """Extract YAML frontmatter including --- delimiters."""
    parts = content.split("---", 2)
    if len(parts) >= 3:
        return "---" + parts[1] + "---"
    return ""


def sync_skill(framework_path: str, cortex_path: str, skill_name: str) -> bool:
    """Sync content from framework to cortex. Keep cortex frontmatter, replace body."""
    if not os.path.exists(framework_path):
        print(f"  SKIP: Framework file not found: {framework_path}")
        return False

    if not os.path.exists(cortex_path):
        print(f"  SKIP: Cortex file not found: {cortex_path}")
        return False

    with open(framework_path, "r", encoding="utf-8") as f:
        framework_content = f.read()

    with open(cortex_path, "r", encoding="utf-8") as f:
        cortex_content = f.read()

    framework_body = extract_body(framework_content)
    cortex_frontmatter = extract_frontmatter(cortex_content)

    if not cortex_frontmatter:
        print(f"  WARN: No frontmatter in {cortex_path}")
        return False

    # Combine cortex frontmatter + framework body
    new_content = cortex_frontmatter + "\n\n" + framework_body

    with open(cortex_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    return True


def main():
    print("=" * 60)
    print("Content Sync: Framework -> Cortex MCP")
    print("=" * 60)
    print()

    synced = 0
    skipped = 0

    # Built-in skills
    print("Built-in skills (.claude/skills/):")
    for folder, cortex_file in sorted(SKILL_MAP.items()):
        framework_path = os.path.join(FRAMEWORK_DIR, ".claude", "skills", folder, "SKILL.md")
        cortex_path = os.path.join(CORTEX_SKILLS_DIR, cortex_file)
        if sync_skill(framework_path, cortex_path, folder):
            print(f"  OK {folder} -> {cortex_file}")
            synced += 1
        else:
            skipped += 1

    # Custom skills
    print("\nCustom skills (custom-skills/):")
    for folder, cortex_file in sorted(CUSTOM_SKILL_MAP.items()):
        framework_path = os.path.join(FRAMEWORK_DIR, "custom-skills", folder, "SKILL.md")
        cortex_path = os.path.join(CORTEX_SKILLS_DIR, cortex_file)
        if sync_skill(framework_path, cortex_path, folder):
            print(f"  OK {folder} -> {cortex_file}")
            synced += 1
        else:
            skipped += 1

    print(f"\nSynced: {synced} | Skipped: {skipped}")
    print("Content sync complete.")


if __name__ == "__main__":
    main()
