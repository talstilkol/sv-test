#!/usr/bin/env node
"use strict";

// scripts/audit_prereq_graph.js
//
// Audit the cross-concept prerequisite graph:
//   1. Cycles — must be 0.
//   2. Orphans — concepts with NO prereqs and NOT a prereq of anything.
//      These are conceptually "level 0" entries OR forgotten standalones.
//   3. Unreachable concepts — concepts not transitively linked from any
//      "entry" (concept with no prereqs).
//   4. Cross-lesson dependencies — useful info; flag if a concept depends on
//      a concept in a "later" lesson (out-of-order learning).
//
// Output: PREREQ_GRAPH_AUDIT.json + .md

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { byFilename } = require("./lib/sort.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "PREREQ_GRAPH_AUDIT.json");
const MD_PATH = path.join(ROOT, "PREREQ_GRAPH_AUDIT.md");

function loadAll() {
  const sandbox = { window: {}, console };
  fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".js")).sort(byFilename).forEach(f => {
    vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, f), "utf8"), sandbox, { filename: f });
  });
  return sandbox;
}

function findCycle(adj) {
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = Object.create(null);
  const cycles = [];
  function dfs(u, path, pathSet) {
    if (pathSet.has(u)) {
      const idx = path.indexOf(u);
      cycles.push(path.slice(idx).concat([u]));
      return;
    }
    if (color[u] === BLACK) return;
    color[u] = GRAY;
    pathSet.add(u);
    path.push(u);
    for (const v of adj[u] || []) {
      if (cycles.length >= 5) break;
      dfs(v, path, pathSet);
    }
    path.pop();
    pathSet.delete(u);
    color[u] = BLACK;
  }
  for (const u of Object.keys(adj)) {
    if (!color[u] && cycles.length < 5) dfs(u, [], new Set());
  }
  return cycles;
}

function run() {
  const sandbox = loadAll();
  const adj = sandbox.CONCEPT_PREREQUISITES || {};
  const allKeys = new Set(Object.keys(adj));

  // 1. Cycles
  const cycles = findCycle(adj);

  // 2. Orphans = no prereqs AND not a prereq of anyone
  const isPrereqOf = new Set();
  Object.values(adj).forEach(deps => deps.forEach(d => isPrereqOf.add(d)));
  const orphans = [];
  for (const k of allKeys) {
    const hasPrereqs = (adj[k] || []).length > 0;
    const isPrereq = isPrereqOf.has(k);
    if (!hasPrereqs && !isPrereq) orphans.push(k);
  }

  // 3. Reachability: do BFS from "entry" nodes (no prereqs).
  const entries = [];
  for (const k of allKeys) {
    if ((adj[k] || []).length === 0) entries.push(k);
  }
  const reverseAdj = Object.create(null);
  Object.entries(adj).forEach(([from, deps]) => {
    deps.forEach(to => {
      if (!reverseAdj[to]) reverseAdj[to] = [];
      reverseAdj[to].push(from);
    });
  });
  const reached = new Set();
  const queue = [...entries];
  while (queue.length) {
    const u = queue.shift();
    if (reached.has(u)) continue;
    reached.add(u);
    (reverseAdj[u] || []).forEach(v => queue.push(v));
  }
  const unreachable = [...allKeys].filter(k => !reached.has(k));

  // 4. Cross-lesson dependencies — extract lesson order from concept keys.
  const lessonOrder = ["lesson_11","lesson_12","lesson_13","lesson_14","lesson_15","lesson_16","lesson_17","lesson_18","lesson_19","lesson_20","lesson_21","lesson_22","lesson_23","lesson_24","lesson_25","lesson_26","lesson_27","lesson_closures","lesson_html_css_foundations","lesson_tooling_git","lesson_sql_orm","lesson_auth_security","lesson_nextjs","lesson_nestjs","lesson_devops_deploy","lesson_ai_engineering","lesson_design_systems","ai_development","react_blueprint","workbook_taskmanager"];
  const lessonIdx = Object.fromEntries(lessonOrder.map((id, i) => [id, i]));
  function lessonOf(k) { return String(k).split("::")[0]; }
  const crossLessonForward = []; // concept depends on concept in a LATER lesson (bad)
  Object.entries(adj).forEach(([from, deps]) => {
    deps.forEach(to => {
      const fromIdx = lessonIdx[lessonOf(from)] ?? -1;
      const toIdx = lessonIdx[lessonOf(to)] ?? -1;
      if (fromIdx !== -1 && toIdx !== -1 && toIdx > fromIdx) {
        crossLessonForward.push({ from, to });
      }
    });
  });

  return {
    nodes: allKeys.size,
    edges: Object.values(adj).reduce((s, d) => s + d.length, 0),
    cycles: cycles.length,
    sampleCycles: cycles.slice(0, 3),
    entries: entries.length,
    orphans: orphans.length,
    sampleOrphans: orphans.slice(0, 10),
    unreachable: unreachable.length,
    sampleUnreachable: unreachable.slice(0, 10),
    crossLessonForward: crossLessonForward.length,
    sampleCrossLessonForward: crossLessonForward.slice(0, 10),
  };
}

function main() {
  const r = run();
  fs.writeFileSync(JSON_PATH, JSON.stringify(r, null, 2));

  const md = [
    "# Prerequisite Graph Audit",
    "",
    `_Generated: ${new Date().toISOString().slice(0, 10)}_`,
    "",
    "## Summary",
    `- Nodes: **${r.nodes}**`,
    `- Edges: **${r.edges}**`,
    `- Cycles: **${r.cycles}** ${r.cycles === 0 ? "✅" : "❌"}`,
    `- Entry nodes (no prereqs): **${r.entries}**`,
    `- Orphans (no prereqs + nobody depends on them): **${r.orphans}**`,
    `- Unreachable from any entry: **${r.unreachable}** ${r.unreachable === 0 ? "✅" : "⚠️"}`,
    `- Cross-lesson forward refs (concept depends on a LATER lesson): **${r.crossLessonForward}**`,
    "",
    r.sampleCycles.length ? "## Cycles\n\n" + r.sampleCycles.map(c => "- " + c.join(" → ")).join("\n") + "\n" : "",
    r.sampleOrphans.length ? "## Orphans (sample)\n\n" + r.sampleOrphans.map(o => `- \`${o}\``).join("\n") + "\n" : "",
    r.sampleCrossLessonForward.length ? "## Cross-lesson forward refs (sample)\n\nThese mean a concept depends on something taught LATER. Either re-order the curriculum or move the dependency.\n\n" + r.sampleCrossLessonForward.map(x => `- \`${x.from}\` → \`${x.to}\``).join("\n") + "\n" : "",
  ].filter(Boolean).join("\n");
  fs.writeFileSync(MD_PATH, md);

  console.log(JSON.stringify(r, null, 2));
}

if (require.main === module) main();
