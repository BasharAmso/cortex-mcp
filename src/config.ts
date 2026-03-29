// Configuration loader — implemented in Task 2
export interface CortexConfig {
  directories: string[];
  customDirectories: string[];
  aiMemoryPath: string;
  cache: { maxSize: number; ttl: number };
  matching: {
    fuzzyThreshold: number;
    maxResults: number;
    defaultMode: string;
    defaultBudget: number;
  };
  devMode: boolean;
  indexPath: string;
}
