import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  CONTENT_ITEM_STATUSES,
  CONTENT_ITEM_TYPES,
  buildConceptTagAudit,
  buildConceptDensityTargetReport,
  buildContentFactoryDashboard,
  buildExamCriticalContentReport,
  buildHardQuestionTemplateCatalog,
  buildManualQuestionAuthoringQueue,
  buildQuestionDuplicateDetector,
  buildReviewerChecklistCatalog,
  buildVideoImportMap,
  classifyConceptFamily,
  buildReviewQueue,
  diffContentRevision,
  makeContentItemId,
  normalizeContentItem,
  summarizeContentStudio,
} from "../src/core/content-studio.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("content studio", () => {
  it("creates deterministic content IDs without random generation", () => {
    const input = {
      type: CONTENT_ITEM_TYPES.QUESTION,
      sourceId: "sv-js-arrays-mc-001",
      conceptKey: "lesson_11::Array",
      title: "Array access",
      explanation: "Array values are accessed by zero-based index.",
      sourceEvidence: [{ kind: "repository", title: "data/svcollege_questions_js_foundations.js", status: "reviewed" }],
    };

    expect(makeContentItemId(input)).toBe(makeContentItemId(input));
    expect(makeContentItemId(input)).toMatch(/^content-[a-z0-9]+$/);
  });

  it("normalizes item status, type and source evidence", () => {
    const item = normalizeContentItem({
      type: CONTENT_ITEM_TYPES.TECHNICAL_CLAIM,
      status: CONTENT_ITEM_STATUSES.VERIFIED,
      sourceId: "lesson_15::Promise",
      conceptKey: "lesson_15::Promise",
      claim: "Promise represents an eventual async result.",
      sourceEvidence: [{ kind: "course-source", title: "lesson_15", status: "reviewed" }],
    });

    expect(item).toMatchObject({
      type: "technical-claim",
      status: "verified",
      sourceId: "lesson_15::Promise",
      conceptKey: "lesson_15::Promise",
    });
    expect(item.sourceEvidence[0]).toMatchObject({
      kind: "course-source",
      title: "lesson_15",
      status: "reviewed",
    });
  });

  it("builds a deterministic review queue from QA warnings, learner mistakes and teacher feedback", () => {
    const queue = buildReviewQueue({
      qaWarnings: [
        {
          id: "sv-js-arrays-mc-001",
          kind: "mc",
          source: "QUESTION_QUALITY_REPORT",
          severity: "warning",
          code: "missing-explanation",
          message: "Explanation needs review.",
          conceptKey: "lesson_11::Array",
          priority: 1,
        },
      ],
      mistakeEvents: [
        {
          id: "evt-array-wrong",
          type: "answer",
          questionId: "sv-js-arrays-mc-001",
          correct: false,
          lessonId: "lesson_11",
          conceptKey: "lesson_11::Array",
          conceptName: "Array",
        },
        {
          id: "evt-array-stuck",
          type: "student_stuck",
          questionId: "sv-js-arrays-mc-002",
          feedbackCode: "blocked_prerequisite",
          lessonId: "lesson_11",
          conceptKey: "lesson_11::Array",
          conceptName: "Array",
        },
      ],
      teacherFeedback: [
        {
          id: "teacher-array-001",
          questionId: "sv-js-arrays-mc-003",
          conceptKey: "lesson_11::Array",
          message: "Clarify that index starts at 0.",
        },
      ],
    });

    expect(queue.map((item) => item.order)).toEqual([1, 2, 3, 4]);
    expect(queue[0].status).toBe("needs-fix");
    expect(queue[0].sourceEvidence.length).toBeGreaterThan(0);
    expect(queue.map((item) => item.id)).toEqual(buildReviewQueue({
      qaWarnings: [
        {
          id: "sv-js-arrays-mc-001",
          kind: "mc",
          source: "QUESTION_QUALITY_REPORT",
          severity: "warning",
          code: "missing-explanation",
          message: "Explanation needs review.",
          conceptKey: "lesson_11::Array",
          priority: 1,
        },
      ],
      mistakeEvents: [
        {
          id: "evt-array-wrong",
          type: "answer",
          questionId: "sv-js-arrays-mc-001",
          correct: false,
          lessonId: "lesson_11",
          conceptKey: "lesson_11::Array",
          conceptName: "Array",
        },
        {
          id: "evt-array-stuck",
          type: "student_stuck",
          questionId: "sv-js-arrays-mc-002",
          feedbackCode: "blocked_prerequisite",
          lessonId: "lesson_11",
          conceptKey: "lesson_11::Array",
          conceptName: "Array",
        },
      ],
      teacherFeedback: [
        {
          id: "teacher-array-001",
          questionId: "sv-js-arrays-mc-003",
          conceptKey: "lesson_11::Array",
          message: "Clarify that index starts at 0.",
        },
      ],
    }).map((item) => item.id));
  });

  it("summarizes release readiness and missing evidence", () => {
    const summary = summarizeContentStudio([
      {
        type: CONTENT_ITEM_TYPES.QUESTION,
        status: CONTENT_ITEM_STATUSES.VERIFIED,
        sourceId: "sv-js-arrays-mc-001",
        conceptKey: "lesson_11::Array",
      },
      {
        type: CONTENT_ITEM_TYPES.TECHNICAL_CLAIM,
        status: CONTENT_ITEM_STATUSES.VERIFIED,
        sourceId: "lesson_15::Promise",
        conceptKey: "lesson_15::Promise",
      },
    ]);

    expect(summary.total).toBe(2);
    expect(summary.verified).toBe(2);
    expect(summary.missingEvidence).toBe(1);
    expect(summary.readyForRelease).toBe(false);
  });

  it("returns field-level side-by-side revision diffs", () => {
    const diff = diffContentRevision(
      {
        type: CONTENT_ITEM_TYPES.EXPLANATION,
        status: CONTENT_ITEM_STATUSES.DRAFT,
        sourceId: "sv-js-arrays-mc-001",
        conceptKey: "lesson_11::Array",
        explanation: "Array stores values.",
      },
      {
        type: CONTENT_ITEM_TYPES.EXPLANATION,
        status: CONTENT_ITEM_STATUSES.REVIEWED,
        sourceId: "sv-js-arrays-mc-001",
        conceptKey: "lesson_11::Array",
        explanation: "Array stores ordered values and indexes start at 0.",
        reviewNotes: "Checked against lesson_11 concept text.",
      },
    );

    expect(diff.changed).toBe(true);
    expect(diff.changes.map((change) => change.field)).toEqual(["status", "explanation", "reviewNotes"]);
  });

  it("builds a deterministic content factory dashboard from real coverage inputs only", () => {
    const dashboard = buildContentFactoryDashboard({
      lessons: [
        {
          id: "lesson_11",
          title: "Arrays",
          concepts: [
            { conceptName: "Array", codeExample: "const items = [];" },
            { conceptName: "scope" },
          ],
        },
      ],
      questionsBank: {
        mc: [
          {
            id: "mc-array-hard",
            conceptKey: "lesson_11::Array",
            level: 6,
            options: ["a", "b", "c", "d"],
            optionFeedback: ["ok", "wrong", "wrong", "wrong"],
          },
          {
            id: "mc-scope-easy",
            conceptKey: "lesson_11::scope",
            level: 2,
            options: ["a", "b"],
          },
        ],
        fill: [{ id: "fill-array-hard", conceptKey: "lesson_11::Array", level: 6 }],
        trace: [{ id: "trace-array", conceptKey: "lesson_11::Array", level: 3 }],
        bug: [],
        build: [{ id: "build-array", conceptKey: "lesson_11::Array", level: 4 }],
      },
    });

    expect(buildContentFactoryDashboard({
      lessons: [
        {
          id: "lesson_11",
          title: "Arrays",
          concepts: [
            { conceptName: "Array", codeExample: "const items = [];" },
            { conceptName: "scope" },
          ],
        },
      ],
      questionsBank: {
        mc: [
          {
            id: "mc-array-hard",
            conceptKey: "lesson_11::Array",
            level: 6,
            options: ["a", "b", "c", "d"],
            optionFeedback: ["ok", "wrong", "wrong", "wrong"],
          },
          {
            id: "mc-scope-easy",
            conceptKey: "lesson_11::scope",
            level: 2,
            options: ["a", "b"],
          },
        ],
        fill: [{ id: "fill-array-hard", conceptKey: "lesson_11::Array", level: 6 }],
        trace: [{ id: "trace-array", conceptKey: "lesson_11::Array", level: 3 }],
        bug: [],
        build: [{ id: "build-array", conceptKey: "lesson_11::Array", level: 4 }],
      },
    })).toEqual(dashboard);
    expect(dashboard.policy).toContain("does not generate, backfill, or invent questions");
    expect(dashboard.summary.concepts).toBe(2);
    expect(dashboard.summary.missingBug).toBe(1);
    expect(dashboard.summary.missingHardMc).toBe(1);
    expect(dashboard.summary.missingHardFill).toBe(1);
    expect(dashboard.summary.missingDistractorFeedback).toBe(1);
    expect(dashboard.needsQueue.find((row) => row.key === "lesson_11::Array").missing).toContain("bug");
  });

  it("builds a deterministic manual authoring queue from real concept data without drafts", () => {
    const input = {
      lessons: [
        {
          id: "lesson_11",
          title: "Arrays",
          concepts: [
            {
              conceptName: "Array",
              oneLine: "Array stores ordered values.",
              codeExample: "const items = ['a'];",
              difficulty: 4,
            },
          ],
        },
      ],
      questionsBank: {
        mc: [{ id: "mc-array-easy", conceptKey: "lesson_11::Array", level: 2, options: ["a", "b"] }],
        fill: [],
        trace: [],
        bug: [],
        build: [],
      },
    };
    const queue = buildManualQuestionAuthoringQueue(input);

    expect(buildManualQuestionAuthoringQueue(input)).toEqual(queue);
    expect(queue.policy).toContain("never fabricates question text");
    expect(queue.summary.queuedTasks).toBe(6);
    expect(queue.summary.sourceConcepts).toBe(1);
    expect(queue.queue.map((item) => item.type)).toEqual([
      "hard-mc",
      "hard-fill",
      "trace",
      "bug",
      "build",
      "distractor-feedback",
    ]);
    expect(queue.queue[0]).toMatchObject({
      status: "queued-authoring",
      action: "author-hard-mc",
      conceptKey: "lesson_11::Array",
      templateFamily: "js-basics",
      reviewerChecklist: [
        "one-line-definition",
        "prerequisite-terms",
        "correct-answer",
        "distractor-quality",
        "memory-association",
      ],
      source: {
        lessonId: "lesson_11",
        conceptName: "Array",
        codeExample: "const items = ['a'];",
      },
    });
    expect(queue.queue[0]).not.toHaveProperty("question");
    expect(queue.queue[0]).not.toHaveProperty("answer");
    expect(queue.queue[0]).not.toHaveProperty("options");
  });

  it("provides hard-question template families as authoring checklists only", () => {
    const catalog = buildHardQuestionTemplateCatalog();

    expect(catalog.map((item) => item.id)).toEqual([
      "js-basics",
      "react-state",
      "api",
      "db",
      "auth",
      "next",
      "devops",
      "ai",
    ]);
    expect(classifyConceptFamily({ conceptKey: "lesson_22::useState", lessonTitle: "React State" })).toBe("react-state");
    expect(classifyConceptFamily({ conceptKey: "lesson_auth_security::JWT" })).toBe("auth");
    expect(catalog[0].policy).toContain("not a generated question");
    expect(catalog[0]).not.toHaveProperty("question");
    expect(catalog[0]).not.toHaveProperty("answer");
    expect(catalog[0]).not.toHaveProperty("options");
  });

  it("provides a reviewer checklist without inventing missing content", () => {
    const checklist = buildReviewerChecklistCatalog();

    expect(checklist.map((item) => item.id)).toEqual([
      "one-line-definition",
      "prerequisite-terms",
      "correct-answer",
      "distractor-quality",
      "memory-association",
    ]);
    expect(checklist[2].requirement).toContain("existing lesson/source data");
    expect(checklist[3].requirement).toContain("real misconception");
    expect(checklist[0].policy).toContain("does not invent");
    expect(checklist[0]).not.toHaveProperty("answer");
    expect(checklist[0]).not.toHaveProperty("options");
  });

  it("detects duplicate question IDs, identities and alias collisions without rewriting content", () => {
    const report = buildQuestionDuplicateDetector({
      conceptAliases: {
        "lesson_11::Function": "lesson_11::function",
      },
      questionsBank: {
        mc: [
          {
            id: "sv-js-function-mc-001",
            conceptKey: "lesson_11::Function",
            level: 6,
            question: "מה תפקידה של function ב-JavaScript?",
            options: ["להגדיר פעולה לשימוש חוזר", "ליצור CSS", "לשלוח HTTP", "להפעיל מסד נתונים"],
            correctIndex: 0,
          },
          {
            id: "shared-question-id",
            conceptKey: "lesson_11::Array",
            level: 2,
            question: "מהו אינדקס ראשון במערך?",
            options: ["0", "1"],
            correctIndex: 0,
          },
          {
            id: "sv-js-function-mc-002",
            conceptKey: "lesson_11::function",
            level: 6,
            question: "מה תפקידה של function ב-JavaScript?",
            options: ["לשלוח HTTP", "להפעיל מסד נתונים", "להגדיר פעולה לשימוש חוזר", "ליצור CSS"],
            correctIndex: 2,
          },
          {
            id: "shared-question-id",
            conceptKey: "lesson_11::Array",
            level: 2,
            question: "מה מחזיר arr.length?",
            options: ["מספר הפריטים", "הפריט האחרון"],
            correctIndex: 0,
          },
        ],
      },
    });

    expect(buildQuestionDuplicateDetector({
      conceptAliases: {
        "lesson_11::Function": "lesson_11::function",
      },
      questionsBank: {
        mc: [
          {
            id: "sv-js-function-mc-001",
            conceptKey: "lesson_11::Function",
            level: 6,
            question: "מה תפקידה של function ב-JavaScript?",
            options: ["להגדיר פעולה לשימוש חוזר", "ליצור CSS", "לשלוח HTTP", "להפעיל מסד נתונים"],
            correctIndex: 0,
          },
          {
            id: "shared-question-id",
            conceptKey: "lesson_11::Array",
            level: 2,
            question: "מהו אינדקס ראשון במערך?",
            options: ["0", "1"],
            correctIndex: 0,
          },
          {
            id: "sv-js-function-mc-002",
            conceptKey: "lesson_11::function",
            level: 6,
            question: "מה תפקידה של function ב-JavaScript?",
            options: ["לשלוח HTTP", "להפעיל מסד נתונים", "להגדיר פעולה לשימוש חוזר", "ליצור CSS"],
            correctIndex: 2,
          },
          {
            id: "shared-question-id",
            conceptKey: "lesson_11::Array",
            level: 2,
            question: "מה מחזיר arr.length?",
            options: ["מספר הפריטים", "הפריט האחרון"],
            correctIndex: 0,
          },
        ],
      },
    })).toEqual(report);
    expect(report.policy).toContain("never deletes, rewrites or invents");
    expect(report.summary.scannedQuestions).toBe(4);
    expect(report.summary.duplicateIds).toBe(1);
    expect(report.summary.duplicateIdentities).toBe(1);
    expect(report.summary.aliasCollisions).toBe(1);
    expect(report.issues.map((issue) => issue.type)).toContain("duplicate-id");
    expect(report.issues.map((issue) => issue.type)).toContain("duplicate-question-identity");
    expect(report.issues.map((issue) => issue.type)).toContain("alias-collision");
    expect(report).not.toHaveProperty("deleted");
    expect(report).not.toHaveProperty("rewrites");
  });

  it("audits concept tags, score buckets, aliases and orphan questions without mutating content", () => {
    const input = {
      lessons: [
        {
          id: "lesson_11",
          title: "Arrays, Functions, and Scope",
          concepts: [
            { conceptName: "Array" },
            { conceptName: "function" },
          ],
        },
      ],
      conceptAliases: {
        "lesson_11::Function": "lesson_11::function",
        "lesson_11::Ghost": "lesson_11::Missing",
      },
      questionsBank: {
        mc: [
          { id: "mc-array", conceptKey: "lesson_11::Array", question: "מהו מערך?" },
          { id: "mc-unknown", conceptKey: "lesson_11::Unknown", question: "מה חסר מיפוי?" },
        ],
      },
      scores: {
        "lesson_11::Function": { level: 3 },
        "lesson_11::function": { level: 4 },
        "lesson_11::GhostScore": { level: 2 },
      },
    };
    const report = buildConceptTagAudit(input);

    expect(buildConceptTagAudit(input)).toEqual(report);
    expect(report.policy).toContain("never renames, deletes or invents data");
    expect(report.summary.lessonConcepts).toBe(2);
    expect(report.summary.scannedQuestions).toBe(2);
    expect(report.summary.scannedScoreBuckets).toBe(3);
    expect(report.summary.duplicateScoreBuckets).toBe(1);
    expect(report.summary.unresolvedConceptKeys).toBe(2);
    expect(report.summary.orphanQuestions).toBe(1);
    expect(report.summary.brokenAliases).toBe(1);
    expect(report.duplicateScoreBuckets[0].conceptKeys).toEqual(["lesson_11::Function", "lesson_11::function"]);
    expect(report.orphanQuestions[0]).toMatchObject({
      type: "unresolved-question-concept",
      id: "mc-unknown",
      rawConceptKey: "lesson_11::Unknown",
    });
    expect(report.brokenAliases[0]).toMatchObject({
      type: "broken-alias",
      rawConceptKey: "lesson_11::Ghost",
    });
    expect(report).not.toHaveProperty("renamed");
    expect(report).not.toHaveProperty("deleted");
  });

  it("reports per-concept density targets from existing question coverage only", () => {
    const report = buildConceptDensityTargetReport({
      lessons: [
        {
          id: "lesson_11",
          title: "Arrays, Functions, and Scope",
          concepts: [
            { conceptName: "Array", codeExample: "const list = [];" },
            { conceptName: "scope" },
          ],
        },
      ],
      questionsBank: {
        mc: [
          {
            id: "mc-array-professor",
            conceptKey: "lesson_11::Array",
            level: 6,
            options: ["0", "1"],
            optionFeedback: ["Index starts at 0.", "Index 1 is the second item."],
          },
        ],
        fill: [{ id: "fill-array-professor", conceptKey: "lesson_11::Array", level: 6 }],
        trace: [],
        bug: [{ id: "bug-array", conceptKey: "lesson_11::Array", level: 4 }],
        build: [],
      },
    });

    expect(buildConceptDensityTargetReport({
      lessons: [
        {
          id: "lesson_11",
          title: "Arrays, Functions, and Scope",
          concepts: [
            { conceptName: "Array", codeExample: "const list = [];" },
            { conceptName: "scope" },
          ],
        },
      ],
      questionsBank: {
        mc: [
          {
            id: "mc-array-professor",
            conceptKey: "lesson_11::Array",
            level: 6,
            options: ["0", "1"],
            optionFeedback: ["Index starts at 0.", "Index 1 is the second item."],
          },
        ],
        fill: [{ id: "fill-array-professor", conceptKey: "lesson_11::Array", level: 6 }],
        trace: [],
        bug: [{ id: "bug-array", conceptKey: "lesson_11::Array", level: 4 }],
        build: [],
      },
    })).toEqual(report);
    expect(report.policy).toContain("no questions or proofs are fabricated");
    expect(report.summary.concepts).toBe(2);
    expect(report.summary.needsWork).toBe(2);
    expect(report.summary.hardMcDeficit).toBe(1);
    expect(report.summary.hardFillDeficit).toBe(1);
    expect(report.summary.traceDeficit).toBe(1);
    expect(report.summary.bugDeficit).toBe(0);
    expect(report.summary.buildDeficit).toBe(1);
    expect(report.needsQueue[0].deficitTotal).toBeGreaterThanOrEqual(report.needsQueue[1].deficitTotal);
    expect(report.rows.find((row) => row.key === "lesson_11::Array").deficits).toMatchObject({
      trace: 1,
      bug: 0,
      build: 1,
    });
  });

  it("maps existing NotebookLM clips and external videos by canonical concept tag", () => {
    const report = buildVideoImportMap({
      conceptAliases: {
        "lesson_22::Immutable State": "lesson_22::immutable",
      },
      conceptVideos: {
        "lesson_22::Immutable State": {
          title: "Immutable State — reference proof",
          objective: "Explain why React needs a new reference.",
          scenes: [{ title: "state old" }, { title: "state new" }],
          fallbackVideos: [
            {
              title: "React immutable state update",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=uedgForV5GM",
            },
          ],
        },
      },
      notebookClips: [
        {
          id: "notebooklm-react-state",
          conceptKey: "lesson_22::useState",
          title: "React State NotebookLM prompt",
          source: "MUSEUM_CONCEPT_CONNECTIONS",
          prompt: "Show click -> state -> render.",
        },
      ],
      externalVideos: [
        {
          id: "external-use-effect",
          conceptKey: "lesson_24::useEffect",
          title: "useEffect external reference",
          externalLinks: [
            {
              title: "useEffect mistakes",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=QQYeipc_cik",
            },
          ],
        },
      ],
    });

    expect(buildVideoImportMap({
      conceptAliases: {
        "lesson_22::Immutable State": "lesson_22::immutable",
      },
      conceptVideos: {
        "lesson_22::Immutable State": {
          title: "Immutable State — reference proof",
          objective: "Explain why React needs a new reference.",
          scenes: [{ title: "state old" }, { title: "state new" }],
          fallbackVideos: [
            {
              title: "React immutable state update",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=uedgForV5GM",
            },
          ],
        },
      },
      notebookClips: [
        {
          id: "notebooklm-react-state",
          conceptKey: "lesson_22::useState",
          title: "React State NotebookLM prompt",
          source: "MUSEUM_CONCEPT_CONNECTIONS",
          prompt: "Show click -> state -> render.",
        },
      ],
      externalVideos: [
        {
          id: "external-use-effect",
          conceptKey: "lesson_24::useEffect",
          title: "useEffect external reference",
          externalLinks: [
            {
              title: "useEffect mistakes",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=QQYeipc_cik",
            },
          ],
        },
      ],
    })).toEqual(report);
    expect(report.policy).toContain("no URLs, clips or video claims are invented");
    expect(report.summary.entries).toBe(3);
    expect(report.summary.mappedEntries).toBe(3);
    expect(report.summary.mappedConcepts).toBe(3);
    expect(report.summary.notebookClips).toBe(1);
    expect(report.summary.storyboardClips).toBe(1);
    expect(report.summary.externalLinks).toBe(2);
    expect(report.entries.find((entry) => entry.sourceType === "concept-video-storyboard").canonicalConceptKey)
      .toBe("lesson_22::immutable");
  });

  it("separates exam-critical content from enrichment-only assets", () => {
    const report = buildExamCriticalContentReport({
      examCriticalConceptKeys: ["lesson_11::Array", "lesson_22::useState"],
      lessons: [
        {
          id: "lesson_11",
          title: "Arrays, Functions, and Scope",
          concepts: [{ conceptName: "Array" }, { conceptName: "spread" }],
        },
        {
          id: "lesson_22",
          title: "React State",
          concepts: [{ conceptName: "useState" }],
        },
      ],
      questionsBank: {
        mc: [
          { id: "mc-array", conceptKey: "lesson_11::Array", level: 6, question: "מהו array?" },
          { id: "mc-spread", conceptKey: "lesson_11::spread", level: 3, question: "מה spread עושה?" },
        ],
      },
      conceptVideos: {
        "lesson_22::useState": { title: "useState storyboard", scenes: [{ title: "render" }] },
        "lesson_11::spread": { title: "spread enrichment", scenes: [{ title: "copy" }] },
      },
    });

    expect(buildExamCriticalContentReport({
      examCriticalConceptKeys: ["lesson_11::Array", "lesson_22::useState"],
      lessons: [
        {
          id: "lesson_11",
          title: "Arrays, Functions, and Scope",
          concepts: [{ conceptName: "Array" }, { conceptName: "spread" }],
        },
        {
          id: "lesson_22",
          title: "React State",
          concepts: [{ conceptName: "useState" }],
        },
      ],
      questionsBank: {
        mc: [
          { id: "mc-array", conceptKey: "lesson_11::Array", level: 6, question: "מהו array?" },
          { id: "mc-spread", conceptKey: "lesson_11::spread", level: 3, question: "מה spread עושה?" },
        ],
      },
      conceptVideos: {
        "lesson_22::useState": { title: "useState storyboard", scenes: [{ title: "render" }] },
        "lesson_11::spread": { title: "spread enrichment", scenes: [{ title: "copy" }] },
      },
    })).toEqual(report);
    expect(report.policy).toContain("does not hide required exam content behind XP");
    expect(report.summary.examCriticalConcepts).toBe(2);
    expect(report.summary.enrichmentOnlyConcepts).toBe(1);
    expect(report.summary.examCriticalQuestions).toBe(1);
    expect(report.summary.enrichmentOnlyQuestions).toBe(1);
    expect(report.summary.examCriticalVideos).toBe(1);
    expect(report.summary.enrichmentOnlyVideos).toBe(1);
    expect(report.rows.find((row) => row.key === "lesson_11::spread").category).toBe("enrichment-only");
  });

  it("wires the core module into runtime and the learning evidence UI", () => {
    const main = fs.readFileSync(path.join(ROOT, "src/main.js"), "utf8");
    const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
    const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");

    expect(main).toContain('import * as contentStudio from "./core/content-studio.js";');
    expect(main).toContain("contentStudio,");
    expect(app).toContain("function localContentStudioReport");
    expect(app).toContain("function buildPerLearnerQuestionReuseAudit");
    expect(app).toContain("function buildMasteryProofAudit");
    expect(app).toContain("function buildFalseConfidenceAudit");
    expect(app).toContain("function buildCrossTabEvidenceGraph");
    expect(app).toContain("function buildProofBasedMasteryMigrationPlan");
    expect(app).toContain("function buildExamCriticalProofPathBlocker");
    expect(app).toContain("function buildTeacherMentorAuditExport");
    expect(app).toContain("buildContentFactoryDashboard");
    expect(app).toContain("buildManualQuestionAuthoringQueue");
    expect(app).toContain("buildHardQuestionTemplateCatalog");
    expect(app).toContain("buildReviewerChecklistCatalog");
    expect(app).toContain("buildQuestionDuplicateDetector");
    expect(app).toContain("buildConceptTagAudit");
    expect(app).toContain("buildConceptDensityTargetReport");
    expect(app).toContain("buildVideoImportMap");
    expect(app).toContain("buildExamCriticalContentReport");
    expect(app).toContain("Manual authoring queue");
    expect(app).toContain("Hard-question template catalog");
    expect(app).toContain("Reviewer checklist");
    expect(app).toContain("Duplicate detector");
    expect(app).toContain("Concept-tag audit");
    expect(app).toContain("Per-learner question reuse audit");
    expect(app).toContain("exhaustedConcepts");
    expect(app).toContain("repeatedAttempts");
    expect(app).toContain("Mastery proof audit");
    expect(app).toContain("missingHardProof");
    expect(app).toContain("missingCodeProof");
    expect(app).toContain("False confidence audit");
    expect(app).toContain("highConfidenceWrong");
    expect(app).toContain("Cross-tab evidence graph");
    expect(app).toContain("crossTabConcepts");
    expect(app).toContain("Rollback-safe proof migration");
    expect(app).toContain("Exam-critical proof path blocker");
    expect(app).toContain("Teacher/mentor audit export");
    expect(app).toContain("Density targets");
    expect(app).toContain("Video import map");
    expect(app).toContain("Exam-critical vs enrichment");
    expect(app).toContain("Content factory dashboard");
    expect(app).toContain("le-content-studio");
    expect(css).toContain(".le-factory-panel");
    expect(css).toContain(".le-authoring-panel");
    expect(css).toContain(".le-template-panel");
    expect(css).toContain(".le-reviewer-checklist-panel");
    expect(css).toContain(".le-duplicate-panel");
    expect(css).toContain(".le-concept-tag-audit-panel");
    expect(css).toContain(".le-question-reuse-panel");
    expect(css).toContain(".le-mastery-proof-panel");
    expect(css).toContain(".le-false-confidence-panel");
    expect(css).toContain(".le-cross-tab-evidence-panel");
    expect(css).toContain(".le-proof-migration-panel");
    expect(css).toContain(".le-proof-blocker-panel");
    expect(css).toContain(".le-teacher-audit-export-panel");
    expect(css).toContain(".le-density-panel");
    expect(css).toContain(".le-video-import-panel");
    expect(css).toContain(".le-exam-critical-panel");
    expect(css).toContain(".le-content-studio");
  });
});
