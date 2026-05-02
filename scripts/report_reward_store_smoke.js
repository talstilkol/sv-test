#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "reward-store-smoke-v1";
const REPORT_DATE = new Date().toISOString().slice(0,10);

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function addCheck(checks, id, label, passed, detail) {
  checks.push({
    id,
    label,
    passed: Boolean(passed),
    status: passed ? "pass" : "fail",
    detail,
  });
}

function buildReport() {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");
  const checks = [];

  addCheck(
    checks,
    "store-dom-shell",
    "Store DOM shell exists",
    html.includes('id="open-reward-store"') &&
      html.includes('data-tab="reward-store"') &&
      html.includes('id="reward-store-view"') &&
      html.includes('id="reward-store-balance"') &&
      html.includes('id="reward-store-filters"') &&
      html.includes('id="reward-store-content"'),
    "The store tab, balance, filters and content mount must exist in the real page.",
  );
  addCheck(
    checks,
    "store-open-routing",
    "Store tab opens the real store view",
    app.includes('const rewardStoreView = document.getElementById("reward-store-view")') &&
      app.includes('const openRewardStoreBtn = document.getElementById("open-reward-store")') &&
      app.includes('openRewardStoreBtn?.addEventListener("click", openRewardStore)') &&
      app.includes("function openRewardStore()") &&
      app.includes('setPortalDecisionAid("reward-store")'),
    "The top tab must route into openRewardStore and the decision aid context.",
  );
  addCheck(
    checks,
    "desktop-layout",
    "Desktop store layout has bounded width and responsive card grid",
    css.includes(".reward-store-view") &&
      css.includes("max-width: 1280px") &&
      css.includes(".reward-store-head") &&
      css.includes("justify-content: space-between") &&
      css.includes(".store-grid") &&
      css.includes("grid-template-columns: repeat(auto-fill, minmax(230px, 1fr))"),
    "Desktop layout should keep the store readable with a bounded shell and card grid.",
  );
  addCheck(
    checks,
    "mobile-layout",
    "Mobile store layout avoids horizontal crowding",
    css.includes("@media (max-width: 900px)") &&
      css.includes(".reward-store-head,") &&
      css.includes("flex-direction: column") &&
      css.includes(".reward-store-filters") &&
      css.includes("overflow-x: auto") &&
      css.includes("white-space: nowrap"),
    "Mobile layout must stack the head area and make filters horizontally scrollable.",
  );
  addCheck(
    checks,
    "purchase-states",
    "Purchase states cover owned, locked, unaffordable and disabled economy",
    app.includes("const owned = !!purchases[item.id]") &&
      app.includes("const affordable = coins >= item.price") &&
      app.includes('store-card ${owned ? "owned" : ""} ${!owned && !affordable ? "locked" : ""}') &&
      app.includes("economyDisabled || owned || !affordable") &&
      app.includes("כלכלה מושהית") &&
      app.includes("חסרים ${item.price - coins}"),
    "Cards must expose all core purchase states without relying on placeholders.",
  );
  addCheck(
    checks,
    "filters-and-buy-actions",
    "Filters and buy actions are wired",
    app.includes('filters?.querySelectorAll("[data-store-filter]")') &&
      app.includes('root.querySelectorAll("[data-store-buy]")') &&
      app.includes("purchaseStoreItem(btn.dataset.storeBuy)") &&
      app.includes("renderRewardStore(result.message)"),
    "The smoke gate must see real filter and buy event wiring.",
  );
  addCheck(
    checks,
    "student-safety-copy",
    "Store safety copy is visible",
    app.includes("אי אפשר לקנות ציון") &&
      app.includes("לא קונים מאסטר") &&
      app.includes("המטבעות הם תגמולי למידה מקומיים בלבד") &&
      app.includes("אינם כסף אמיתי"),
    "Store copy must prevent grade-buying and real-money confusion.",
  );

  const failed = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Reward store desktop/mobile smoke",
    summary: {
      checks: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
      ready: failed.length === 0,
    },
    checks,
    blockers: failed.map((check) => ({
      id: check.id,
      label: check.label,
      detail: check.detail,
    })),
  };
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  }
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  buildReport,
  run,
};
