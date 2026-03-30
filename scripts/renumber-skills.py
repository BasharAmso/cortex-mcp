#!/usr/bin/env python3
"""
Renumber Cortex MCP skill IDs to match the AI Orchestrator System framework REGISTRY.
Also adds 'owner' field to all fragment frontmatter.

Steps:
1. Rename core skill files to match framework IDs
2. Shift cortex-only skills to avoid ID collisions
3. Update id: field in frontmatter
4. Update relatedFragments references across ALL files
5. Add owner field to all fragments
"""

import os
import re
import shutil

RESOURCES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "resources")
SKILLS_DIR = os.path.join(RESOURCES_DIR, "skills")

# ─── MAPPING: Current Cortex ID → Framework Target ID ───
# Core skills (35 that have framework equivalents)
CORE_MAPPING = {
    "SKL-0001": "SKL-0004",  # prd-writing
    "SKL-0002": "SKL-0016",  # code-review
    "SKL-0003": "SKL-0017",  # test-writing
    "SKL-0004": "SKL-0015",  # security-audit
    # SKL-0005 through SKL-0014 stay the same
    "SKL-0015": "SKL-0002",  # quality-review
    "SKL-0016": "SKL-0019",  # refactoring
    "SKL-0017": "SKL-0020",  # bug-investigation
    "SKL-0018": "SKL-0021",  # deployment
    "SKL-0019": "SKL-0024",  # documentation
    "SKL-0020": "SKL-0023",  # ux-design
    "SKL-0021": "SKL-0025",  # project-planning
    "SKL-0022": "SKL-0018",  # uat-testing
    "SKL-0023": "SKL-0003",  # prd-to-tasks
    "SKL-0024": "SKL-0001",  # plan-from-idea
    "SKL-0025": "SKL-0027",  # problem-stress-test
    "SKL-0026": "SKL-0028",  # gdd-writing
    "SKL-0027": "SKL-0022",  # mcp-config
    "SKL-0028": "SKL-0035",  # competitor-analysis
    "SKL-0029": "SKL-0033",  # copywriting
    "SKL-0030": "SKL-0032",  # seo-audit
    "SKL-0031": "SKL-0034",  # launch-checklist
    "SKL-0032": "SKL-0036",  # pitch-deck
    "SKL-0033": "SKL-0031",  # supply-chain-audit
    "SKL-0034": "SKL-0029",  # insecure-defaults
    "SKL-0035": "SKL-0030",  # diff-security-review
}

# Cortex-only skills: shift by +1 (SKL-0036 → SKL-0037, etc.)
# Current range: SKL-0036 through SKL-0123 (88 skills)
for i in range(36, 124):
    old_id = f"SKL-{i:04d}"
    new_id = f"SKL-{i+1:04d}"
    CORE_MAPPING[old_id] = new_id

# Skills that don't change (SKL-0005 through SKL-0014)
# Not in CORE_MAPPING means identity mapping

# ─── OWNER MAPPING: Framework Target ID → Owner Agent ───
OWNER_MAP = {
    # Framework core skills
    "SKL-0001": "orchestrator",    # Plan From Idea
    "SKL-0002": "reviewer",        # Quality Review
    "SKL-0003": "orchestrator",    # PRD to Tasks
    "SKL-0004": "product-manager", # PRD Writing
    "SKL-0005": "builder",         # Frontend Dev
    "SKL-0006": "builder",         # Backend Dev
    "SKL-0007": "builder",         # Mobile Dev
    "SKL-0008": "builder",         # Database Admin
    "SKL-0009": "builder",         # AI Feature
    "SKL-0010": "builder",         # API Integration
    "SKL-0011": "builder",         # Monetization
    "SKL-0012": "builder",         # Analytics
    "SKL-0013": "builder",         # Growth
    "SKL-0014": "builder",         # Customer Support
    "SKL-0015": "reviewer",        # Security Audit
    "SKL-0016": "reviewer",        # Code Review
    "SKL-0017": "reviewer",        # Test Writing
    "SKL-0018": "reviewer",        # UAT Testing
    "SKL-0019": "fixer",           # Refactoring
    "SKL-0020": "fixer",           # Bug Investigation
    "SKL-0021": "deployer",        # Deployment
    "SKL-0022": "deployer",        # MCP Config
    "SKL-0023": "designer",        # UX Design
    "SKL-0024": "documenter",      # Documentation
    "SKL-0025": "project-manager", # Project Planning
    "SKL-0026": "orchestrator",    # Team Retro (not in cortex)
    "SKL-0027": "product-manager", # Problem Stress Test
    "SKL-0028": "product-manager", # GDD Writing
    "SKL-0029": "reviewer",        # Insecure Defaults
    "SKL-0030": "reviewer",        # Diff Security Review
    "SKL-0031": "reviewer",        # Supply Chain Audit
    "SKL-0032": "builder",         # SEO Audit
    "SKL-0033": "builder",         # Copywriting
    "SKL-0034": "builder",         # Launch Checklist
    "SKL-0035": "product-manager", # Competitor Analysis
    "SKL-0036": "product-manager", # Pitch Deck
    # Cortex-only skills (new IDs after shift)
    "SKL-0037": "product-manager", # deep-interview
    "SKL-0038": "explorer",        # evidence-investigation
    "SKL-0039": "project-manager", # consensus-planning
    "SKL-0040": "fixer",           # automated-fix-loop
    "SKL-0041": "reviewer",        # ai-slop-cleanup
    "SKL-0042": "reviewer",        # tdd-workflow
    "SKL-0043": "reviewer",        # visual-qa
    "SKL-0044": "deployer",        # release-management
    "SKL-0045": "builder",         # react-patterns
    "SKL-0046": "builder",         # css-architecture
    "SKL-0047": "builder",         # animations
    "SKL-0048": "builder",         # responsive-design
    "SKL-0049": "designer",        # design-systems
    "SKL-0050": "builder",         # component-composition
    "SKL-0051": "builder",         # forms
    "SKL-0052": "builder",         # state-management
    "SKL-0053": "builder",         # routing
    "SKL-0054": "builder",         # web-accessibility
    "SKL-0055": "designer",        # color-theory
    "SKL-0056": "designer",        # typography
    "SKL-0057": "designer",        # spacing-layout
    "SKL-0058": "designer",        # design-tokens
    "SKL-0059": "designer",        # ui-polish
    "SKL-0060": "designer",        # dark-mode
    "SKL-0061": "designer",        # icon-usage
    "SKL-0062": "designer",        # visual-hierarchy
    "SKL-0063": "builder",         # api-versioning
    "SKL-0064": "builder",         # queue-systems
    "SKL-0065": "builder",         # rate-limiting
    "SKL-0066": "builder",         # file-uploads
    "SKL-0067": "builder",         # background-jobs
    "SKL-0068": "builder",         # websockets
    "SKL-0069": "builder",         # email-sending
    "SKL-0070": "builder",         # search-implementation
    "SKL-0071": "builder",         # core-web-vitals
    "SKL-0072": "builder",         # bundle-optimization
    "SKL-0073": "builder",         # image-optimization
    "SKL-0074": "builder",         # lazy-loading
    "SKL-0075": "builder",         # skeleton-screens
    "SKL-0076": "builder",         # perceived-performance
    "SKL-0077": "deployer",        # docker-for-devs
    "SKL-0078": "deployer",        # deploy-previews
    "SKL-0079": "deployer",        # monitoring-basics
    "SKL-0080": "deployer",        # error-tracking
    "SKL-0081": "deployer",        # feature-flags
    "SKL-0082": "builder",         # hook-writing
    "SKL-0083": "builder",         # storytelling-frameworks
    "SKL-0084": "builder",         # copywriting-formulas
    "SKL-0085": "builder",         # editing-yourself
    "SKL-0086": "builder",         # voice-development
    "SKL-0087": "builder",         # headline-craft
    "SKL-0088": "builder",         # linkedin-strategy
    "SKL-0089": "builder",         # twitter-growth
    "SKL-0090": "builder",         # youtube-scripting
    "SKL-0091": "builder",         # newsletter-writing
    "SKL-0092": "builder",         # carousel-design
    "SKL-0093": "builder",         # thread-craft
    "SKL-0094": "builder",         # personal-branding
    "SKL-0095": "builder",         # niche-positioning
    "SKL-0096": "builder",         # community-building
    "SKL-0097": "builder",         # collaboration-cross-promo
    "SKL-0098": "builder",         # prompt-craft-writing
    "SKL-0099": "builder",         # ai-editing-workflow
    "SKL-0100": "builder",         # voice-preservation
    "SKL-0101": "builder",         # content-to-code
    "SKL-0102": "builder",         # research-to-post
    "SKL-0103": "designer",        # ux-research-methods
    "SKL-0104": "reviewer",        # usability-testing
    "SKL-0105": "designer",        # information-architecture
    "SKL-0106": "designer",        # wireframing
    "SKL-0107": "reviewer",        # accessibility-audit
    "SKL-0108": "builder",         # swiftui-patterns
    "SKL-0109": "builder",         # kotlin-compose
    "SKL-0110": "builder",         # flutter-patterns
    "SKL-0111": "builder",         # flutter-state
    "SKL-0112": "builder",         # angular-patterns
    "SKL-0113": "builder",         # tailwind-patterns
    "SKL-0114": "builder",         # vue-composition
    "SKL-0115": "builder",         # svelte-patterns
    "SKL-0116": "builder",         # onboarding-flows
    "SKL-0117": "builder",         # env-config
    "SKL-0118": "builder",         # state-management (mobile)
    "SKL-0119": "builder",         # performance (mobile)
    "SKL-0120": "reviewer",        # accessibility (mobile)
    "SKL-0121": "builder",         # error-handling (mobile)
    "SKL-0122": "builder",         # search (mobile)
    "SKL-0123": "builder",         # i18n
    "SKL-0124": "builder",         # realtime
}

# Agent owners (agents own themselves)
AGENT_OWNER_MAP = {
    "AGT-0001": "builder",
    "AGT-0002": "reviewer",
    "AGT-0003": "architecture-designer",
    "AGT-0004": "product-manager",
    "AGT-0005": "project-manager",
    "AGT-0006": "designer",
    "AGT-0007": "fixer",
    "AGT-0008": "deployer",
    "AGT-0009": "documenter",
    "AGT-0010": "explorer",
}

# Default owner for patterns and examples
DEFAULT_OWNER = "builder"


def get_new_id(old_id: str) -> str:
    """Get the new ID for a given old ID. Returns same ID if no mapping."""
    return CORE_MAPPING.get(old_id, old_id)


def get_owner(fragment_id: str) -> str:
    """Get the owner for a fragment ID (using new/target IDs)."""
    if fragment_id.startswith("AGT-"):
        return AGENT_OWNER_MAP.get(fragment_id, DEFAULT_OWNER)
    if fragment_id.startswith("SKL-"):
        return OWNER_MAP.get(fragment_id, DEFAULT_OWNER)
    return DEFAULT_OWNER


def single_pass_replace(text: str) -> str:
    """Replace all old IDs with new IDs in a single pass to avoid cascading."""
    # Build regex pattern matching any SKL-XXXX that needs changing
    pattern = re.compile(r"SKL-\d{4}")

    def replacer(match):
        old = match.group(0)
        return CORE_MAPPING.get(old, old)

    return pattern.sub(replacer, text)


def update_frontmatter(content: str, owner: str) -> str:
    """Update all SKL IDs via single-pass replace and add owner field."""
    # Step 1: Single-pass replacement of ALL SKL-XXXX references (id, relatedFragments, etc.)
    result = single_pass_replace(content)

    # Step 2: Add owner field if missing
    lines = result.split("\n")
    in_frontmatter = False
    frontmatter_end = -1
    has_owner = False
    difficulty_line_idx = -1
    id_line_idx = -1

    for i, line in enumerate(lines):
        if line.strip() == "---":
            if not in_frontmatter:
                in_frontmatter = True
                continue
            else:
                frontmatter_end = i
                break
        if in_frontmatter:
            if line.startswith("id:"):
                id_line_idx = i
            if line.startswith("owner:"):
                has_owner = True
            if line.startswith("difficulty:"):
                difficulty_line_idx = i

    if not has_owner and frontmatter_end > 0:
        insert_after = difficulty_line_idx if difficulty_line_idx >= 0 else id_line_idx
        if insert_after >= 0:
            lines.insert(insert_after + 1, f"owner: {owner}")

    return "\n".join(lines)


def rename_skill_files():
    """Rename skill files to match new IDs. Uses temp names to avoid collisions."""
    print("Step 1: Renaming skill files...")

    # Build file mapping: old_filename → new_filename
    file_mapping = {}
    for filename in os.listdir(SKILLS_DIR):
        if not filename.endswith(".md"):
            continue
        # Extract ID and slug from filename
        match = re.match(r"(SKL-\d{4})-(.*\.md)", filename)
        if not match:
            continue
        old_id = match.group(1)
        slug = match.group(2)
        new_id = get_new_id(old_id)
        if new_id != old_id:
            new_filename = f"{new_id}-{slug}"
            file_mapping[filename] = new_filename

    # Phase 1: Rename to temp names
    temp_mapping = {}
    for old_name, new_name in file_mapping.items():
        temp_name = f"TEMP-{old_name}"
        old_path = os.path.join(SKILLS_DIR, old_name)
        temp_path = os.path.join(SKILLS_DIR, temp_name)
        os.rename(old_path, temp_path)
        temp_mapping[temp_name] = new_name

    # Phase 2: Rename from temp to final
    for temp_name, new_name in temp_mapping.items():
        temp_path = os.path.join(SKILLS_DIR, temp_name)
        new_path = os.path.join(SKILLS_DIR, new_name)
        os.rename(temp_path, new_path)

    renamed = len(file_mapping)
    print(f"  Renamed {renamed} skill files")
    return renamed


def update_all_fragments():
    """Update frontmatter in all fragment files (skills, agents, patterns, examples)."""
    print("Step 2: Updating frontmatter in all fragments...")

    categories = ["skills", "agents", "patterns", "examples"]
    total_updated = 0

    for category in categories:
        cat_dir = os.path.join(RESOURCES_DIR, category)
        if not os.path.exists(cat_dir):
            continue
        for filename in sorted(os.listdir(cat_dir)):
            if not filename.endswith(".md"):
                continue
            filepath = os.path.join(cat_dir, filename)

            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            # Extract current ID from frontmatter
            id_match = re.search(r"^id:\s*(\S+)", content, re.MULTILINE)
            if not id_match:
                print(f"  WARNING: No id found in {filename}")
                continue

            old_id = id_match.group(1)
            new_id = get_new_id(old_id)
            owner = get_owner(new_id)

            updated = update_frontmatter(content, owner)

            if updated != content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(updated)
                total_updated += 1

    print(f"  Updated {total_updated} fragment files")
    return total_updated


def verify_results():
    """Verify the renumbering was successful."""
    print("\nStep 3: Verifying results...")

    # Check a few key mappings
    checks = [
        ("SKL-0001-plan-from-idea.md", "SKL-0001"),
        ("SKL-0004-prd-writing.md", "SKL-0004"),
        ("SKL-0016-code-review.md", "SKL-0016"),
        ("SKL-0017-test-writing.md", "SKL-0017"),
        ("SKL-0015-security-audit.md", "SKL-0015"),
        ("SKL-0002-quality-review.md", "SKL-0002"),
        ("SKL-0037-deep-interview.md", "SKL-0037"),
    ]

    errors = []
    for expected_file, expected_id in checks:
        filepath = os.path.join(SKILLS_DIR, expected_file)
        if not os.path.exists(filepath):
            errors.append(f"  MISSING: {expected_file}")
            continue
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        id_match = re.search(r"^id:\s*(\S+)", content, re.MULTILINE)
        if id_match and id_match.group(1) != expected_id:
            errors.append(f"  WRONG ID in {expected_file}: got {id_match.group(1)}, expected {expected_id}")

    # Check all files have owner field
    missing_owner = 0
    for category in ["skills", "agents", "patterns", "examples"]:
        cat_dir = os.path.join(RESOURCES_DIR, category)
        if not os.path.exists(cat_dir):
            continue
        for filename in os.listdir(cat_dir):
            if not filename.endswith(".md"):
                continue
            with open(os.path.join(cat_dir, filename), "r", encoding="utf-8") as f:
                content = f.read()
            if not re.search(r"^owner:", content, re.MULTILINE):
                missing_owner += 1

    if errors:
        print("ERRORS:")
        for e in errors:
            print(e)
    else:
        print("  Key file checks: PASSED")

    if missing_owner:
        print(f"  WARNING: {missing_owner} files missing owner field")
    else:
        print("  Owner field: ALL files have owner")

    # Count total files
    total = 0
    for category in ["skills", "agents", "patterns", "examples"]:
        cat_dir = os.path.join(RESOURCES_DIR, category)
        if os.path.exists(cat_dir):
            total += len([f for f in os.listdir(cat_dir) if f.endswith(".md")])
    print(f"  Total fragments: {total}")

    return len(errors) == 0 and missing_owner == 0


if __name__ == "__main__":
    print("=" * 60)
    print("Cortex MCP Skill Renumbering")
    print("Aligning with AI Orchestrator System REGISTRY")
    print("=" * 60)
    print()

    renamed = rename_skill_files()
    updated = update_all_fragments()
    success = verify_results()

    print()
    if success:
        print("SUCCESS: All skills renumbered and owner fields added.")
        print("Next: Run 'npm run build-index' to rebuild search indexes.")
    else:
        print("COMPLETED WITH WARNINGS: Review errors above.")
