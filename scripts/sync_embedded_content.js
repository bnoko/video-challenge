#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHALLENGE_HTML = path.join(ROOT, "challenge.html");

const CONTENT_MAP = [
  { constName: "ARTICULATIONS", jsonPath: "data/articulation.json" },
  { constName: "PLOTS", jsonPath: "data/plots.json" },
  { constName: "SELF_KNOWLEDGE", jsonPath: "data/self_knowledge.json" },
  { constName: "INTERVIEW_QUESTIONS", jsonPath: "data/interview_questions.json" },
  { constName: "TOPICS", jsonPath: "data/topics.json" },
  { constName: "SCRIPT_WORK_PUBLIC_ORIGINAL_PASSAGES", jsonPath: "data/scriptwork/public/original_passages.json" },
  { constName: "SCRIPT_WORK_PUBLIC_ARTICULATION_PASSAGES", jsonPath: "data/scriptwork/public/articulation_passages.json" },
];

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildReplacement(constName, jsonPath, data) {
  return `// Synced from ${jsonPath} via scripts/sync_embedded_content.js\nconst ${constName} = ${JSON.stringify(data, null, 2)};`;
}

function syncEmbeddedContent({ checkOnly = false } = {}) {
  let html = fs.readFileSync(CHALLENGE_HTML, "utf8");
  const originalHtml = html;
  const results = [];

  for (const { constName, jsonPath } of CONTENT_MAP) {
    const absJsonPath = path.join(ROOT, jsonPath);
    const data = JSON.parse(fs.readFileSync(absJsonPath, "utf8"));
    const replacement = buildReplacement(constName, jsonPath, data);
    const pattern = new RegExp(
      `(?:\\/\\/ Synced from .*?\\n)?const ${escapeRegex(constName)} = \\[[\\s\\S]*?\\n\\];`
    );

    if (!pattern.test(html)) {
      throw new Error(`Could not find embedded array for ${constName} in challenge.html`);
    }

    html = html.replace(pattern, replacement);
    results.push({ constName, jsonPath, count: data.length });
  }

  const changed = html !== originalHtml;

  if (!checkOnly && changed) {
    fs.writeFileSync(CHALLENGE_HTML, html);
  }

  return { changed, results };
}

function main() {
  const checkOnly = process.argv.includes("--check");
  const { changed, results } = syncEmbeddedContent({ checkOnly });

  results.forEach(({ constName, jsonPath, count }) => {
    console.log(`${constName}: ${count} items <- ${jsonPath}`);
  });

  if (checkOnly) {
    if (changed) {
      console.error("\nchallenge.html is out of sync with data/*.json");
      process.exit(1);
    }
    console.log("\nchallenge.html is already in sync.");
    return;
  }

  console.log(changed
    ? "\nUpdated challenge.html from data/*.json"
    : "\nNo changes needed; challenge.html already matches data/*.json");
}

main();
