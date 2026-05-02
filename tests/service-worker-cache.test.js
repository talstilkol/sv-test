const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("service worker cache freshness", () => {
  const sw = read("service-worker.js");
  const html = read("index.html");

  it("uses a fresh cache version for concept sprint assets", () => {
    expect(sw).toContain('const CACHE_VERSION = "lumen-v2.4.131-autosave"');
    expect(html).toContain("style.css?v=concept-sprint-v69");
    expect(html).toContain("app.js?v=concept-colors-v92");
    expect(html).toContain("/src/main.js?v=core-bootstrap-v2");
    expect(html).toContain("content-loader.js?v=content-validation-v1");
    expect(sw).toContain("/style.css?v=concept-sprint-v69");
    expect(sw).toContain("/app.js?v=concept-colors-v92");
    expect(sw).toContain("/content-loader.js?v=content-validation-v1");
    expect(sw).toContain("/src/main.js?v=core-bootstrap-v2");
    expect(sw).toContain("/src/core/question-prerequisites.js?v=question-prereq-v2");
    expect(sw).toContain("/data/level100_release_gates.js?v=level100-gate-v1");
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
    expect(sw).toContain("/data/war_stories.js");
    expect(sw).toContain("/data/comparisons.js");
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
