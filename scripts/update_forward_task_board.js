#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BOARD_PATH = path.join(ROOT, "FORWARD_TASK_BOARD.md");
const VALID_RESULTS = new Set(["V", "X", "WAIT"]);

function parseArgs(argv) {
  const options = {
    duration: "unknown/unavailable",
    note: "unknown/unavailable",
    dryRun: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    options[key] = argv[index + 1] || "";
    index += 1;
  }
  return options;
}

function escapeCell(value) {
  return String(value == null ? "" : value)
    .replace(/\r?\n/g, " ")
    .replace(/\|/g, "\\|")
    .trim() || "unknown/unavailable";
}

function nowText(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jerusalem",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute} IDT`;
}

function validate(options) {
  const failures = [];
  if (!options.task) failures.push("--task is required.");
  if (!options.command) failures.push("--command is required.");
  if (!options.result) failures.push("--result is required.");
  if (options.result && !VALID_RESULTS.has(options.result)) failures.push("--result must be V, X, or WAIT.");
  if (!fs.existsSync(BOARD_PATH)) failures.push("FORWARD_TASK_BOARD.md is missing.");
  return failures;
}

function updateBoard(board, options) {
  const time = options.time || nowText();
  const row = `| ${escapeCell(time)} | ${escapeCell(options.task)} | \`${escapeCell(options.command)}\` | ${escapeCell(options.duration)} | ${escapeCell(options.result)} | ${escapeCell(options.note)} |`;
  const updated = board.replace(/^עודכן: .+$/m, `עודכן: ${time}  `);
  const marker = "\n## סדר עבודה מומלץ";
  if (!updated.includes(marker)) {
    throw new Error("Could not find run-log insertion marker.");
  }
  return updated.replace(marker, `\n${row}${marker}`);
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const failures = validate(options);
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
    return null;
  }
  const current = fs.readFileSync(BOARD_PATH, "utf8");
  const next = updateBoard(current, options);
  if (options.dryRun) {
    process.stdout.write(next);
  } else {
    fs.writeFileSync(BOARD_PATH, next);
    console.log(JSON.stringify({
      ready: true,
      board: path.relative(ROOT, BOARD_PATH),
      task: options.task,
      result: options.result,
    }, null, 2));
  }
  return next;
}

if (require.main === module) {
  main();
}

module.exports = { escapeCell, nowText, parseArgs, updateBoard };
