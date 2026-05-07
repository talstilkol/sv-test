#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "qwen-materializer-v1";
const DEFAULT_RESPONSE = "output/qwen-coder-next/rerun-02/day-06/qwen-response.md";
const DEFAULT_OUTPUT_DIR = "output/qwen-coder-next/rerun-02/day-06/materialized-project";

const WRITABLE_EXTENSIONS = new Set([
  ".cjs",
  ".css",
  ".env",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx",
]);

function absolute(file) {
  return path.isAbsolute(file) ? file : path.join(ROOT, file);
}

function relative(file) {
  return path.relative(ROOT, file) || ".";
}

function read(file) {
  return fs.readFileSync(absolute(file), "utf8");
}

function write(file, text) {
  const full = absolute(file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, text, "utf8");
}

function normalizeCandidate(candidate) {
  if (!candidate) return null;
  const cleaned = candidate
    .trim()
    .replace(/^["'`]+|["'`]+$/g, "")
    .replace(/^\.\//, "");
  if (!cleaned || cleaned.includes("\0")) return null;
  if (path.isAbsolute(cleaned) || cleaned.split(/[\\/]+/).includes("..")) return null;
  if (cleaned.includes(" ")) return null;

  const ext = path.extname(cleaned);
  const base = path.basename(cleaned);
  if (!WRITABLE_EXTENSIONS.has(ext) && base !== ".env" && base !== "package.json") return null;
  return cleaned;
}

function pathFromFenceInfo(info) {
  const trimmed = String(info || "").trim();
  const tagged = trimmed.match(/(?:path|file|filename)=["']?([^"'\s]+)["']?/i);
  if (tagged) return normalizeCandidate(tagged[1]);
  const direct = trimmed.match(/(^|\s)([A-Za-z0-9._/-]+\.(?:cjs|css|env|html|js|json|jsx|mjs|ts|tsx))(\s|$)/);
  return direct ? normalizeCandidate(direct[2]) : null;
}

function pathFromContext(prefix) {
  const lines = prefix.split(/\r?\n/).slice(-8).reverse();
  for (const line of lines) {
    const inline = [...line.matchAll(/`([^`]+)`/g)].reverse();
    for (const match of inline) {
      const normalized = normalizeCandidate(match[1]);
      if (normalized) return normalized;
    }

    const plain = line.match(/(?:^|[\s:])([A-Za-z0-9._/-]+\.(?:cjs|css|env|html|js|json|jsx|mjs|ts|tsx))(?:\s|$)/);
    if (plain) {
      const normalized = normalizeCandidate(plain[1]);
      if (normalized) return normalized;
    }
  }
  return null;
}

function parseCodeBlocks(markdown) {
  const regex = /```([^\n`]*)\n([\s\S]*?)```/g;
  const blocks = [];
  let match;
  while ((match = regex.exec(markdown))) {
    const info = match[1] || "";
    const code = match[2].replace(/\s+$/g, "\n");
    const prefix = markdown.slice(0, match.index);
    const filePath = pathFromFenceInfo(info) || pathFromContext(prefix);
    blocks.push({
      info: info.trim(),
      filePath,
      code,
      startOffset: match.index,
    });
  }
  return blocks;
}

function materialize(options = {}) {
  const responsePath = options.response || DEFAULT_RESPONSE;
  const outputDir = options.output || DEFAULT_OUTPUT_DIR;
  const markdown = read(responsePath);
  const blocks = parseCodeBlocks(markdown);
  const written = [];
  const skipped = [];
  const seen = new Set();

  blocks.forEach((block, index) => {
    if (!block.filePath) {
      skipped.push({ index, info: block.info, reason: "no-file-path" });
      return;
    }
    const target = absolute(path.join(outputDir, block.filePath));
    const root = absolute(outputDir);
    if (!target.startsWith(root + path.sep) && target !== root) {
      skipped.push({ index, info: block.info, reason: "outside-output-root", filePath: block.filePath });
      return;
    }
    write(target, block.code);
    seen.add(block.filePath);
    written.push({ index, filePath: block.filePath, bytes: Buffer.byteLength(block.code, "utf8") });
  });

  const report = {
    reportVersion: REPORT_VERSION,
    response: relative(absolute(responsePath)),
    outputDir: relative(absolute(outputDir)),
    summary: {
      blocks: blocks.length,
      written: written.length,
      skipped: skipped.length,
      uniqueFiles: seen.size,
      ready: written.length > 0,
    },
    written,
    skipped,
  };

  write(path.join(outputDir, "qwen-materialization-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  write(path.join(outputDir, "qwen-materialization-report.md"), markdownReport(report));
  return report;
}

function markdownReport(report) {
  const lines = [
    "# Qwen Materialization Report",
    "",
    `- Response: \`${report.response}\``,
    `- Output: \`${report.outputDir}\``,
    `- Written files: ${report.summary.written}`,
    `- Skipped blocks: ${report.summary.skipped}`,
    "",
    "## Files",
    "",
    ...report.written.map((item) => `- \`${item.filePath}\` (${item.bytes} bytes)`),
  ];
  if (report.skipped.length) {
    lines.push("", "## Skipped", "");
    report.skipped.forEach((item) => {
      lines.push(`- block ${item.index}: ${item.reason}`);
    });
  }
  return `${lines.join("\n")}\n`;
}

function parseArgs(argv) {
  const options = { response: DEFAULT_RESPONSE, output: null, summary: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--response") {
      options.response = argv[index + 1];
      index += 1;
    } else if (arg === "--output") {
      options.output = argv[index + 1];
      index += 1;
    } else if (arg === "--summary") {
      options.summary = true;
    } else if (!arg.startsWith("--")) {
      options.response = arg;
    }
  }
  if (!options.output) {
    const sourceDir = path.dirname(options.response);
    options.output = path.join(sourceDir, "materialized-project");
  }
  return options;
}

function run(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const report = materialize(options);
  const payload = options.summary ? report.summary : report;
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  return report;
}

if (require.main === module) run();

module.exports = {
  materialize,
  normalizeCandidate,
  parseCodeBlocks,
  pathFromContext,
  pathFromFenceInfo,
  run,
};
