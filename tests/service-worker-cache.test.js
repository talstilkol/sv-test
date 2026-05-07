const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("service worker cache freshness", () => {
  const sw = read("service-worker.js");
  const html = read("index.html");

  it("uses a fresh cache version for homework exam mode assets", () => {
    expect(sw).toMatch(/const CACHE_VERSION = "lumen-v2\.4\.[^"]+"/);
    expect(html).toContain("style.css?v=homework-exam-mode-v19");
    expect(html).toContain("app.js?v=homework-exam-mode-v6");
    expect(html).toContain('data-module-path="/src/main.js?v=core-bootstrap-v2"');
    expect(html).toContain("src/boot/file-protocol-guard.js?v=file-protocol-guard-v1");
    expect(html).toContain("src/boot/module-bootstrap-loader.js?v=module-bootstrap-loader-v1");
    expect(html).toContain("src/views/exam100-path-core.js?v=exam100-path-core-v1");
    expect(html).toContain("content-loader.js?v=content-validation-v1");
    expect(sw).toContain("/style.css?v=homework-exam-mode-v19");
    expect(sw).toContain("/app.js?v=homework-exam-mode-v6");
    expect(sw).toContain("/content-loader.js?v=content-validation-v1");
    expect(sw).toContain("/src/main.js?v=core-bootstrap-v2");
    expect(sw).toContain("/src/boot/file-protocol-guard.js?v=file-protocol-guard-v1");
    expect(sw).toContain("/src/boot/module-bootstrap-loader.js?v=module-bootstrap-loader-v1");
    expect(sw).toContain("/src/views/exam100-path-core.js?v=exam100-path-core-v1");
    expect(sw).toContain("/src/core/cluster-engine.js");
    expect(sw).toContain("/src/core/cluster-engine.js?v=cluster-engine-v1");
    expect(sw).toContain("/src/core/question-prerequisites.js?v=question-prereq-v2");
    expect(sw).toContain("/data/level100_release_gates.js?v=level100-gate-v1");
    expect(html).toContain("data/exam_tasks_tree.js?v=exam-tasks-tree-v1");
    expect(sw).toContain("/data/exam_tasks_tree.js?v=exam-tasks-tree-v1");
    expect(sw).toContain("/data/homework_exam_mode.js?v=homework-exam-mode-v6");
    expect(sw).toContain("/src/core/content-studio.js");
    expect(sw).toContain("/src/core/outcome-loop.js");
    expect(sw).toContain("/src/core/support-report.js");
    expect(sw).toContain("/src/core/progress-sync.js");
    expect(sw).toContain("/src/core/teacher-classes.js");
    expect(sw).toContain("/src/core/teacher-students.js");
    expect(sw).toContain("/src/core/teacher-heatmap.js");
    expect(sw).toContain("/src/core/teacher-risk-alerts.js");
    expect(sw).toContain("/src/core/teacher-assignments.js");
    expect(sw).toContain("/src/core/teacher-bulk-import.js");
    expect(sw).toContain("/src/core/community-discussions.js");
    expect(sw).toContain("/src/core/community-votes.js");
    expect(sw).toContain("/src/core/community-reputation.js");
    expect(sw).toContain("/src/core/community-moderation.js");
    expect(sw).toContain("/src/core/peer-review.js");
    expect(sw).toContain("/src/core/mentor-matching.js");
    expect(sw).not.toContain("/data/questions_bank_seeded.js");
    expect(sw).toContain("/src/views/homework-exam-mode-view.js?v=homework-exam-mode-view-v18");
    expect(sw).toContain("/data/war_stories.js");
    expect(sw).toContain("/data/comparisons.js");
    expect(sw).toContain("/data/exam_practice_extras.js?v=exam-practice-extras-v1");
    expect(sw).toContain("/data/prerequisites.js");
    expect(sw).toContain("/data/metaphors.js");
    expect(sw).toContain("/data/pathways.js");
    expect(sw).toContain("/data/scenarios.js");
    expect(sw).toContain("/data/counterfactuals.js");
    expect(sw).toContain("/data/pair_match.js");
    expect(sw).toContain("/data/bug_quests.js");
    expect(sw).toContain("/data/guided_builds.js?v=guided-builds-v1");
    expect(sw).toContain("/data/interview_prep.js?v=interview-prep-v1");
    expect(sw).toContain("/data/svcollege_traces_foundation_tooling_activity.js?v=foundation-tooling-activity-v1");
    expect(sw).toContain("/data/svcollege_traces_lesson15_activity.js?v=lesson15-activity-v1");
    expect(sw).toContain("/data/svcollege_traces_lesson16_activity.js?v=lesson16-activity-v1");
    expect(sw).toContain("/data/svcollege_traces_lesson17_activity.js?v=lesson17-activity-v1");
    expect(sw).toContain("/data/svcollege_traces_sql_orm.js?v=svcollege-sql-orm-v2");
    expect(sw).toContain("/data/svcollege_traces_auth.js?v=svcollege-auth-v2");
    expect(sw).toContain("/data/svcollege_traces_nextjs.js?v=svcollege-nextjs-v2");
    expect(sw).toContain("/src/core/concept-tags.js");
  });

  it("loads versioned JS/CSS through network-first reload before cached fallback", () => {
    expect(sw).toContain("function isVersionedCodeAsset");
    expect(sw).toContain('url.searchParams.has("v")');
    expect(sw).toContain("function networkFirstVersionedAsset");
    expect(sw).toContain('fetch(new Request(request, { cache: "reload" }))');
    expect(sw).toContain("event.respondWith(networkFirstVersionedAsset(request))");
  });
});
