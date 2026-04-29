import { exposeRuntimeInfo } from "./core/runtime.js";
import { installHTMLSanitizer } from "./core/sanitize.js";
import * as scoring from "./core/scoring.js";
import * as streak from "./core/streak.js";
import * as questionPrerequisites from "./core/question-prerequisites.js?v=question-prereq-v2";
import * as mistakeAgent from "./core/mistake-agent.js";
import * as learningEvidence from "./core/learning-evidence.js";
import * as outcomeLoop from "./core/outcome-loop.js";
import * as confidenceCalibration from "./core/confidence-calibration.js";
import * as confusionBlockers from "./core/confusion-blockers.js";
import * as conceptTags from "./core/concept-tags.js";
import * as contextTree from "./views/context-tree.js";
import { legacyScriptCount } from "./ui/legacy-script-registry.js";
import { findMountedLegacyViews } from "./views/legacy-views.js";
import { afterDomReady } from "./utils/dom-ready.js";

exposeRuntimeInfo(window);
const sanitizerState = installHTMLSanitizer(window);
window.LUMEN_SECURITY = Object.freeze({
  sanitizer: sanitizerState,
});
window.LUMEN_CORE = Object.freeze({
  scoring,
  streak,
  questionPrerequisites,
  mistakeAgent,
  learningEvidence,
  outcomeLoop,
  confidenceCalibration,
  confusionBlockers,
  conceptTags,
});
window.LUMEN_VIEWS = Object.freeze({
  contextTree,
});

afterDomReady(() => {
  document.documentElement.dataset.viteBootstrap = "ready";
  window.LUMEN_BOOTSTRAP_STATE = Object.freeze({
    legacyScripts: legacyScriptCount(),
    mountedViews: findMountedLegacyViews().length,
  });
});
