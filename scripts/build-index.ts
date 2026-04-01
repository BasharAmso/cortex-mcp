/**
 * CLI script: npm run build-index
 *
 * Scans all configured directories, loads fragments, and builds
 * the three pre-built indexes (keyword, useWhen, quick-lookup).
 */
import { loadConfig } from "../src/config.js";
import { loadFragments } from "../src/loader/fragment-loader.js";
import { buildIndexes, writeIndexes } from "../src/indexing/index-builder.js";

const config = loadConfig();
const allDirs = [...config.directories, ...config.customDirectories];

console.log(`Scanning directories: ${allDirs.join(", ")}`);

const fragments = loadFragments(allDirs);
console.log(`Found ${fragments.length} fragments`);

if (fragments.length === 0) {
  console.log(
    "No fragments found. Add markdown files with YAML frontmatter to your resource directories.",
  );
  process.exit(0);
}

const indexData = buildIndexes(fragments);

const keywordCount = Object.keys(indexData.keywordIndex).length;
const useWhenCount = Object.keys(indexData.useWhenIndex).length;
const quickLookupCount = Object.keys(indexData.quickLookup).length;

writeIndexes(indexData, config.indexPath);

console.log(`Indexes built and saved to ${config.indexPath}/`);
console.log(`  keyword-index.json:   ${keywordCount} keywords`);
console.log(`  usewhen-index.json:   ${useWhenCount} keywords`);
console.log(`  quick-lookup.json:    ${quickLookupCount} entries`);
