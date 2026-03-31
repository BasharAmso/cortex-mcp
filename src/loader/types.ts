export interface FragmentFrontmatter {
  id: string;
  name: string;
  category: "agents" | "skills" | "patterns" | "examples";
  tags: string[];
  capabilities: string[];
  useWhen: string[];
  estimatedTokens: number;
  relatedFragments: string[];
  dependencies: string[];
  synonyms: string[];
  lastUpdated: string;
  sourceUrl: string;
  difficulty: string;
  owner: string;
  pillar: string;
}

export interface Fragment extends FragmentFrontmatter {
  content: string;
  filePath: string;
}
