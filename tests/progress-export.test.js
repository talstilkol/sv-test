const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("progress export/import economy coverage", () => {
  const app = read("app.js");

  it("exports active local profile progress with XP, coins, reward log and purchases", () => {
    expect(app).toContain("function collectProfileScopedEntries");
    expect(app).toContain("function collectEconomyExport");
    expect(app).toContain("function buildProgressSnapshot");
    expect(app).toContain("version: 2");
    expect(app).toContain("profile: {");
    expect(app).toContain("economy: collectEconomyExport()");
    expect(app).toContain("level100Readiness: buildLevel100ReadinessExport()");
    expect(app).toContain("answeredQuestions: {}");
    expect(app).toContain("weaknesses: {}");
    expect(app).toContain("rewardLog: readRewardLog()");
    expect(app).toContain("purchases: getStorePurchases()");
    expect(app).toContain("disabled: isEconomyDisabled()");
    expect(app).toContain('collectProfileScopedEntries(["lumenportal:scores:"])');
    expect(app).toContain('collectProfileScopedEntries(["lumenportal:prof:"])');
    expect(app).toContain("data.answeredQuestions = collectProfileScopedEntries([ANSWERED_QUESTIONS_KEY])");
    expect(app).toContain("data.weaknesses = collectProfileScopedEntries([MISTAKE_AGENT_KEY, CONFIDENCE_CALIBRATION_KEY, CONFUSION_BLOCKERS_KEY])");
    expect(app).toContain("masteryProof");
  });

  it("exports a level 100 readiness report without treating XP as mastery", () => {
    expect(app).toContain("function buildLevel100ReadinessExport");
    expect(app).toContain('reportVersion: "level-100-readiness-v1"');
    expect(app).toContain("studentLevel: level.level");
    expect(app).toContain("rawXPLevel: level.rawLevel");
    expect(app).toContain("xpOnlyBlockedAt99: level.rawLevel >= XP_MAX_LEVEL && level.level < XP_MAX_LEVEL");
    expect(app).toContain("ready: gate.passed");
    expect(app).toContain("proofCoverage: gate.proofCoverage");
    expect(app).toContain("releaseGate: gate.releaseGate");
    expect(app).toContain('id: "highest-challenge-proof"');
    expect(app).toContain('id: "code-proof"');
    expect(app).toContain('id: "no-open-weakness"');
    expect(app).toContain('id: "release-gates-green"');
  });

  it("imports economy state into the active local profile without negative balances", () => {
    expect(app).toContain("function importEconomyExport");
    expect(app).toContain("function applyProgressData");
    expect(app).toContain("Math.max(0, Number(value) || 0)");
    expect(app).toContain("[XP_KEY, economy.xp]");
    expect(app).toContain("[COINS_KEY, economy.coins]");
    expect(app).toContain("localStorage.setItem(key, String(safeValue))");
    expect(app).toContain("localStorage.setItem(REWARD_LOG_KEY, JSON.stringify(economy.rewardLog.slice(0, 80)))");
    expect(app).toContain("localStorage.setItem(STORE_PURCHASES_KEY, JSON.stringify(economy.purchases))");
    expect(app).toContain("setEconomyDisabled(economy.disabled === true)");
    expect(app).toContain("Object.entries(data.answeredQuestions || {}).forEach(([k, v]) => localStorage.setItem(k, v))");
    expect(app).toContain("Object.entries(data.weaknesses || {}).forEach(([k, v]) => localStorage.setItem(k, v))");
    expect(app).toContain("importEconomyExport(economy)");
  });

  it("wires Supabase progress sync without embedded credentials or demo payloads", () => {
    const html = read("index.html");
    expect(html).toContain('id="btn-sync-config"');
    expect(html).toContain('id="btn-sync-now"');
    expect(html).toContain('id="btn-sync-pull"');
    expect(html).toContain('id="btn-sync-push"');
    expect(html).toContain('id="progress-sync-status"');
    expect(html).toContain('id="teacher-class-name"');
    expect(html).toContain('id="btn-create-class"');
    expect(html).toContain('id="teacher-class-id"');
    expect(html).toContain('id="btn-load-class-students"');
    expect(html).toContain('id="teacher-student-csv"');
    expect(html).toContain('id="btn-import-class-students"');
    expect(html).toContain('id="btn-load-concept-heatmap"');
    expect(html).toContain('id="teacher-heatmap-body"');
    expect(html).toContain('id="btn-load-risk-alerts"');
    expect(html).toContain('id="teacher-risk-list"');
    expect(html).toContain('id="btn-create-assignment"');
    expect(html).toContain('id="teacher-assignment-list"');
    expect(html).toContain('id="community-concept-key"');
    expect(html).toContain('id="btn-create-concept-thread"');
    expect(html).toContain('id="btn-load-concept-threads"');
    expect(html).toContain('id="community-thread-list"');
    expect(html).toContain('id="btn-load-community-reputation"');
    expect(html).toContain('id="community-reputation-list"');
    expect(html).toContain('id="btn-load-moderation-reports"');
    expect(html).toContain('id="community-moderation-list"');
    expect(html).toContain('id="btn-submit-peer-solution"');
    expect(html).toContain('id="btn-claim-peer-review"');
    expect(html).toContain('id="btn-submit-peer-review"');
    expect(html).toContain('id="peer-review-match-id"');
    expect(html).toContain('id="btn-load-mentor-eligibility"');
    expect(html).toContain('id="btn-register-mentor"');
    expect(html).toContain('id="btn-request-mentor"');
    expect(html).toContain('id="btn-send-mentor-message"');
    expect(html).toContain('id="btn-rate-mentor"');
    expect(app).toContain('data-thread-vote="1"');
    expect(app).toContain('data-thread-vote="-1"');
    expect(app).toContain('data-thread-report');
    expect(app).toContain('data-thread-moderate="lock_thread"');
    expect(app).toContain("function runProgressSync");
    expect(app).toContain("function createTeacherClassFromForm");
    expect(app).toContain("function loadTeacherStudentsFromForm");
    expect(app).toContain("function importTeacherStudentsCsvFromForm");
    expect(app).toContain("function loadTeacherHeatmapFromForm");
    expect(app).toContain("function loadTeacherRiskAlertsFromForm");
    expect(app).toContain("function createTeacherAssignmentFromForm");
    expect(app).toContain("function loadTeacherAssignmentsFromForm");
    expect(app).toContain("function createCommunityThreadFromForm");
    expect(app).toContain("function loadCommunityThreadsFromForm");
    expect(app).toContain("function voteCommunityThread");
    expect(app).toContain("function loadCommunityReputationFromForm");
    expect(app).toContain("function reportCommunityThread");
    expect(app).toContain("function moderateCommunityThread");
    expect(app).toContain("function loadCommunityModerationReportsFromForm");
    expect(app).toContain("function submitPeerSolutionFromForm");
    expect(app).toContain("function claimPeerReviewFromForm");
    expect(app).toContain("function submitPeerReviewFromForm");
    expect(app).toContain('source: "peer-review"');
    expect(app).toContain("function loadMentorEligibilityFromForm");
    expect(app).toContain("function registerMentorAvailabilityFromForm");
    expect(app).toContain("function requestMentorMatchFromForm");
    expect(app).toContain("function sendMentorMessageFromForm");
    expect(app).toContain("function rateMentorMatchFromForm");
    expect(app).toContain("mentorRealtimeChannel");
    expect(app).toContain("normalizeSupabaseSyncConfig");
    expect(app).toContain("resolveLastWriteWins");
    expect(app).toContain("fetchRemoteProgress");
    expect(app).toContain("upsertRemoteProgress");
    expect(app).toContain("Sync חסום: חסרים Supabase URL, anon key או access token אמיתי.");
    expect(app).not.toContain(".supabase.co");
  });
});
