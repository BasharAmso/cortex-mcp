export interface KeywordIndex {
  [keyword: string]: string[];
}

export interface UseWhenEntry {
  fragmentId: string;
  scenario: string;
}

export interface UseWhenIndex {
  [keyword: string]: UseWhenEntry[];
}

export interface QuickLookup {
  [query: string]: string[];
}

export interface IndexData {
  keywordIndex: KeywordIndex;
  useWhenIndex: UseWhenIndex;
  quickLookup: QuickLookup;
}
