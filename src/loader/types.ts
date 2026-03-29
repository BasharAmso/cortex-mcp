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
}

export interface Fragment extends FragmentFrontmatter {
  content: string;
  filePath: string;
}
