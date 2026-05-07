const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const TRAINING_ROOT = "svcollege_fullstack_exam_trainer_v5/outputs/training";

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function runFile(relativePath, context) {
  vm.runInNewContext(read(relativePath), context, { filename: relativePath });
}

describe("SVCollege exam task tree integration", () => {
  it("loads the generated 73-section tree before Homework Exam Mode", () => {
    const index = read("index.html");
    const treeIndex = index.indexOf("data/exam_tasks_tree.js?v=exam-tasks-tree-v1");
    const homeworkIndex = index.indexOf("data/homework_exam_mode.js?v=homework-exam-mode-v6");

    expect(treeIndex).toBeGreaterThan(-1);
    expect(homeworkIndex).toBeGreaterThan(-1);
    expect(treeIndex).toBeLessThan(homeworkIndex);
  });

  it("exposes the tree to the portal study plan without invented content", () => {
    const context = { console };
    context.window = context;
    runFile("data/questions_bank.js", context);
    runFile("data/questions_build.js", context);
    runFile("data/exam_tasks_tree.js", context);
    runFile("data/homework_exam_mode.js", context);

    const mode = context.HOMEWORK_EXAM_MODE;
    expect(mode.examTaskTree.totalSections).toBe(73);
    expect(mode.examTaskTree.branches).toHaveLength(7);
    expect(mode.examTaskTree.studyTasks).toHaveLength(7);
    expect(mode.examTaskTree.studyMinutes).toBe(335);
    expect(mode.examTaskTree.sectionExercises).toHaveLength(73);
    expect(mode.examTaskTree.sectionExerciseSummary.total).toBe(73);
    expect(mode.examTaskTree.sectionExerciseSummary.withFileTree).toBe(73);
    expect(mode.examTaskTree.sectionExerciseSummary.withRubric).toBe(73);
    const sectionIds = new Set(mode.examTaskTree.sectionExercises.map((exercise) => exercise.id));
    expect(sectionIds.size).toBe(73);
    mode.examTaskTree.sectionExercises.forEach((exercise) => {
      expect(exercise.sectionText.length).toBeGreaterThan(8);
      expect(exercise.projectFileTree.root).toBe("exam-project/");
      expect(exercise.projectFileTree.files.length).toBeGreaterThan(1);
      expect(exercise.explanationLevels.grandma).toContain("ברמת סבתא");
      expect(exercise.explanationLevels.professional).toContain("ברמה מקצועית");
      expect(exercise.technicalSubtasks.length).toBeGreaterThan(0);
      expect(exercise.howToGet100.length).toBeGreaterThan(0);
      expect(exercise.beyond100.length).toBeGreaterThan(0);
      expect(exercise.rubricScale).toBe("internal-100-checklist-not-official-points");
      expect(exercise.scoreRubric.reduce((sum, item) => sum + item.points, 0)).toBe(100);
      expect(exercise.sourceRefs.join(" ")).toContain("exam_sections_task_breakdown");
      if (exercise.autoScorable) {
        expect(exercise.technicalTaskRefs.length).toBeGreaterThan(0);
        expect(exercise.technicalTaskRefs[0].targetFile).toMatch(/\.(jsx|js|md)$/);
      } else {
        expect(exercise.status).toBe("manual_review");
      }
    });
    const subbranches = mode.examTaskTree.branches.flatMap((branch) => branch.subbranches || []);
    const scorableSubbranches = subbranches.filter((sub) => sub.id !== "manual_review");
    expect(scorableSubbranches).toHaveLength(18);
    scorableSubbranches.forEach((sub) => {
      expect(Array.isArray(sub.technicalTasks)).toBe(true);
      expect(sub.technicalTasks.length).toBeGreaterThan(0);
      sub.technicalTasks.forEach((task) => {
        expect(task.targetFile).toMatch(/\.(jsx|js|md)$/);
        expect(task.projectFileTree.root).toBe("exam-project/");
        expect(task.projectFileTree.targetFile).toBe(task.targetFile);
        expect(task.projectFileTree.files.length).toBeGreaterThan(1);
        expect(task.projectFileTree.files.map((file) => file.path)).toContain(task.targetFile);
        expect(task.explanationLevels.grandma).toContain("ברמת סבתא");
        expect(task.explanationLevels.professional).toContain("ברמה מקצועית");
        expect(task.technicalSubtasks.length).toBeGreaterThan(0);
        task.technicalSubtasks.forEach((step) => {
          expect(step.file).toBe(task.targetFile);
          expect(step.details).toContain(task.targetFile);
        });
        expect(task.conceptsToKnow.length).toBeGreaterThan(0);
        expect(task.codeRecipe.code.length).toBeGreaterThan(80);
        expect(task.codeRecipe.grandmaExplanation).toContain("ברמת סבתא");
        expect(task.codeRecipe.professionalExplanation).toContain("ברמה מקצועית");
        expect(task.codeRecipe.gate).toContain("edge case");
        expect(task.sourceRefs.join(" ")).toContain("exam_tasks_tree_detailed.json");
      });
    });
    const manualReview = subbranches.find((sub) => sub.id === "manual_review");
    expect(manualReview.technicalTasks).toEqual([]);
    expect(mode.masterPlan.remainingTimePlan.examTaskTreeStudy.minutes).toBe(335);
    expect(mode.masterPlan.remainingTimePlan.examTaskTreeStudy.includedInRequiredMinutes).toBe(false);
    expect(mode.masterPlan.remainingTimePlan.requiredMinutes).toBe(6485);
    expect(mode.masterPlan.remainingTimePlan.requiredLabel).toBe("108 שעות 5 דק׳");
    expect(mode.masterPlan.remainingTimePlan.mediaAssetPlan.videos).toHaveLength(114);
    expect(mode.masterPlan.remainingTimePlan.mediaAssetPlan.presentationImages).toHaveLength(40);
    expect(mode.masterPlan.remainingTimePlan.videoWatchMinutes).toBe(3420);
    expect(mode.masterPlan.remainingTimePlan.presentationImageMinutes).toBe(800);
    expect(mode.examTaskTree.assumptions.join(" ")).toContain("לא מוסיפים fake data");
    expect(mode.examTaskTree.assumptions.join(" ")).toContain("וידאו ללא תמלול");
  });

  it("renders the deep tree inside Exam100 without adding a top-level tab", () => {
    const index = read("index.html");
    const view = read("src/views/homework-exam-mode-view.js");
    const css = read("style.css");

    expect(index).not.toContain('data-tab="exam-task-tree"');
    expect(view).toContain("עץ תרגילי המבחן לפי נושאים");
    expect(view).toContain("data-exam-task-technical-task");
    expect(view).toContain("data-exam-section-exercise");
    expect(view).toContain("data-exam-topic");
    expect(view).toContain("data-exam-topic-question");
    expect(view).toContain("data-exam-question-toggle");
    expect(view).toContain("data-exam-question-open");
    expect(view).toContain("data-exam-question-page");
    expect(view).toContain("exam-question-subtask");
    expect(view).toContain("exam-technical-task");
    expect(view).toContain("hxm-exam-question-subtask-row");
    expect(view).toContain("data-exam-question-progress-count");
    expect(view).toContain("data-exam-topic-question-progress");
    expect(view).toContain("data-exam-topic-progress-count");
    expect(view).toContain("data-exam-topic-progress-percent");
    expect(view).toContain("data-exam-topic-progress-bar");
    expect(view).toContain("data-exam-topic-next");
    expect(view).toContain("data-exam-manual-review-plan");
    expect(view).toContain("תוכנית פתיחת manual_review");
    expect(view).toContain("0/6 ראיות");
    expect(view).toContain("docs/source-review.md");
    expect(view).toContain("updateExamQuestionTaskProgress");
    expect(view).toContain("updateExamTopicProgress");
    expect(view).toContain("renderExamTaskTreeSectionExercises");
    expect(view).toContain("פותחים נושא");
    expect(view).toContain("עמוד שאלה מלא");
    expect(view).toContain("ניקוד הסעיף ואיך לקבל 100");
    expect(view).toContain("משקל תרגול פנימי");
    expect(view).toContain("hxm-exam-question-code-card");
    expect(view).toContain("hxm-exam-ide-file-tree");
    expect(view).toContain("פירוק למשימות, ענפים ותתי־ענפים");
    expect(view).toContain("מושגים שחייבים לדעת");
    expect(view).toContain("ברמת סבתא");
    expect(view).toContain("ברמה מקצועית");
    expect(view).toContain("hxm-exam-question-task-score");
    expect(view).toContain("hxm-exam-section-levels");
    expect(css).toContain(".hxm-exam-task-code pre");
    expect(css).toContain(".hxm-exam-topic");
    expect(css).toContain(".hxm-exam-question-row");
    expect(css).toContain(".hxm-exam-question-page");
    expect(css).toContain(".hxm-exam-code-explain");
    expect(css).toContain(".hxm-exam-ide-file-tree");
    expect(css).toContain(".hxm-exam-task-subtask-grid");
    expect(css).toContain(".hxm-exam-question-subtasks");
    expect(css).toContain(".hxm-exam-question-code-card");
    expect(css).toContain(".hxm-exam-question-subtask-row");
    expect(css).toContain(".hxm-exam-question-progress-bar");
    expect(css).toContain(".hxm-exam-topic-progress");
    expect(css).toContain(".hxm-exam-manual-review-plan");
    expect(css).toContain(".hxm-exam-section-rubric");
    expect(css).toContain(".hxm-exam-section-code pre");
    expect(css).toContain(".hxm-exam-question-task-score");
    expect(css).toContain(".hxm-exam-section-levels");
  });

  it("ships the personal and machine training outputs for automation", () => {
    [
      `${TRAINING_ROOT}/SVCOLLEGE_MODEL_TRAINING_TREE_PERSONAL_HE.md`,
      `${TRAINING_ROOT}/SVCOLLEGE_MODEL_TRAINING_TREE_MACHINE.json`,
      `${TRAINING_ROOT}/SVCOLLEGE_MODEL_CAPABILITY_100_REPORT.md`,
      `${TRAINING_ROOT}/SVCOLLEGE_PORTAL_IMPORT_PROMPT.md`,
    ].forEach((file) => {
      expect(fs.existsSync(path.join(ROOT, file))).toBe(true);
    });

    const machine = JSON.parse(read(`${TRAINING_ROOT}/SVCOLLEGE_MODEL_TRAINING_TREE_MACHINE.json`));
    expect(machine.totalSections).toBe(73);
    expect(machine.branches).toHaveLength(7);
    expect(machine.studyTasks).toHaveLength(7);
    expect(machine.sectionExercises).toHaveLength(73);
    expect(machine.sectionExerciseSummary.withRubric).toBe(73);
    expect(machine.sectionExercises[0].taskIds).toContain("api_get_all");
    expect(machine.sectionExercises[0].technicalTaskRefs[0].subbranchId).toBe("api_get_all");
    expect(machine.sectionExercises[0].projectFileTree.files.map((file) => file.path)).toContain("server/routes/items.routes.js");
    expect(machine.sectionExercises[0].scoreRubric.reduce((sum, item) => sum + item.points, 0)).toBe(100);
    expect(machine.sectionExercises[0].explanationLevels.grandma).toContain("ברמת סבתא");
    expect(machine.sectionExercises[0].explanationLevels.professional).toContain("ברמה מקצועית");
    expect(machine.promotionPolicy.passScore).toBe(100);
    const firstTask = machine.branches[0].subbranches[0].technicalTasks[0];
    expect(firstTask.targetFile).toBe("src/components/ExamForm.jsx");
    expect(firstTask.projectFileTree.files.map((file) => file.path)).toContain("src/utils/validation.js");
    expect(firstTask.explanationLevels.grandma).toContain("ברמת סבתא");
    expect(firstTask.explanationLevels.professional).toContain("ברמה מקצועית");
  });
});
