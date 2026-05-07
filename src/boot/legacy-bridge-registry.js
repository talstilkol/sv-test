/** @typedef {import("../views/view-contracts").LegacyBridgeScriptContract} LegacyBridgeScriptContract */
/** @typedef {import("../views/view-contracts").MissingLegacyBridgeGlobal} MissingLegacyBridgeGlobal */

/** @type {readonly LegacyBridgeScriptContract[]} */
export const LEGACY_BRIDGE_SCRIPTS = Object.freeze([
  {
    path: "src/views/homework-exam-mode-view.js",
    globalName: "renderHomeworkExamModeView",
    owner: "exam100-homework-view",
  },
  {
    path: "src/views/lesson-renderer/lesson-renderer.js",
    globalName: "LumenLessonRenderer",
    owner: "lesson-renderer",
  },
  {
    path: "src/views/chrome-menu/chrome-menu.js",
    globalName: "LumenChromeMenu",
    owner: "chrome-menu",
  },
  {
    path: "src/views/settings-preferences/settings-preferences.js",
    globalName: "LumenSettingsPreferences",
    owner: "settings-preferences",
  },
  {
    path: "src/views/bug-agent/bug-agent-ui.js",
    globalName: "LumenBugAgentUI",
    owner: "bug-agent-ui",
  },
  {
    path: "src/views/question-panels/question-panels.js",
    globalName: "LumenQuestionPanels",
    owner: "question-panels",
  },
]);

export function legacyBridgeScriptCount() {
  return LEGACY_BRIDGE_SCRIPTS.length;
}

/** @returns {MissingLegacyBridgeGlobal[]} */
export function findMissingLegacyBridgeGlobals(runtime = globalThis) {
  return LEGACY_BRIDGE_SCRIPTS
    .filter((entry) => entry.globalName && !runtime[entry.globalName])
    .map((entry) => ({
      path: entry.path,
      globalName: entry.globalName,
      owner: entry.owner,
    }));
}
