import { exposeRuntimeInfo } from "./core/runtime.js";
import { installHTMLSanitizer } from "./core/sanitize.js";
import * as scoring from "./core/scoring.js";
import * as streak from "./core/streak.js";
import * as questionPrerequisites from "./core/question-prerequisites.js?v=question-prereq-v2";
import * as mistakeAgent from "./core/mistake-agent.js";
import * as learningEvidence from "./core/learning-evidence.js";
import * as contentStudio from "./core/content-studio.js";
import * as outcomeLoop from "./core/outcome-loop.js";
import * as bugAgent from "./core/bug-agent.js";
import * as progressSync from "./core/progress-sync.js";
import * as supportReport from "./core/support-report.js";
import * as teacherClasses from "./core/teacher-classes.js";
import * as teacherStudents from "./core/teacher-students.js";
import * as teacherHeatmap from "./core/teacher-heatmap.js";
import * as teacherRiskAlerts from "./core/teacher-risk-alerts.js";
import * as teacherAssignments from "./core/teacher-assignments.js";
import * as teacherBulkImport from "./core/teacher-bulk-import.js";
import * as communityDiscussions from "./core/community-discussions.js";
import * as communityVotes from "./core/community-votes.js";
import * as communityReputation from "./core/community-reputation.js";
import * as communityModeration from "./core/community-moderation.js";
import * as peerReview from "./core/peer-review.js";
import * as mentorMatching from "./core/mentor-matching.js";
import * as confidenceCalibration from "./core/confidence-calibration.js";
import * as confusionBlockers from "./core/confusion-blockers.js";
import * as conceptTags from "./core/concept-tags.js";
import * as contextTree from "./views/context-tree.js";
import * as themeToggle from "./views/theme-toggle/theme-toggle.js";
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
  contentStudio,
  outcomeLoop,
  bugAgent,
  progressSync,
  supportReport,
  teacherClasses,
  teacherStudents,
  teacherHeatmap,
  teacherRiskAlerts,
  teacherAssignments,
  teacherBulkImport,
  communityDiscussions,
  communityVotes,
  communityReputation,
  communityModeration,
  peerReview,
  mentorMatching,
  confidenceCalibration,
  confusionBlockers,
  conceptTags,
});
window.LUMEN_VIEWS = Object.freeze({
  contextTree,
  themeToggle,
});

afterDomReady(() => {
  document.documentElement.dataset.viteBootstrap = "ready";
  window.LUMEN_BOOTSTRAP_STATE = Object.freeze({
    legacyScripts: legacyScriptCount(),
    mountedViews: findMountedLegacyViews().length,
  });
});
