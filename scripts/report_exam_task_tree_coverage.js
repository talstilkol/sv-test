const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "exam_tasks_tree.js");
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const summary = args.has("--summary");
const FORBIDDEN_NATIVE_RANDOM_TOKEN = ["Math", "random"].join(".");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function loadTree() {
  const context = { console };
  context.window = context;
  vm.runInNewContext(read(DATA_FILE), context, { filename: "data/exam_tasks_tree.js" });
  return context.SVCOLLEGE_EXAM_TASKS_TREE;
}

function rubricPoints(exercise) {
  return (exercise.scoreRubric || []).reduce((sum, item) => sum + Number(item.points || 0), 0);
}

function audit() {
  const source = read(DATA_FILE);
  const tree = loadTree();
  const failures = [];
  const warnings = [];
  const branches = Array.isArray(tree && tree.branches) ? tree.branches : [];
  const subbranches = branches.flatMap((branch) => branch.subbranches || []);
  const technicalTasks = subbranches.flatMap((sub) => sub.technicalTasks || []);
  const sectionExercises = Array.isArray(tree && tree.sectionExercises) ? tree.sectionExercises : [];
  const subbranchIds = new Set(subbranches.map((sub) => sub.id));
  const sectionIds = new Set(sectionExercises.map((exercise) => exercise.id));
  const sectionIdxs = new Set(sectionExercises.map((exercise) => exercise.idx));
  const dataBytes = Buffer.byteLength(source, "utf8");

  if (!tree) failures.push("SVCOLLEGE_EXAM_TASKS_TREE is missing.");
  if (tree.totalSections !== 73) failures.push("Expected totalSections=73.");
  if (branches.length !== 7) failures.push("Expected 7 branches.");
  if (subbranches.length !== 19) failures.push("Expected 19 subbranches.");
  if (technicalTasks.length < 18) failures.push("Expected at least 18 technical tasks.");
  if (sectionExercises.length !== 73) failures.push("Expected 73 sectionExercises.");
  if (sectionIds.size !== 73) failures.push("sectionExercises ids are not unique.");
  if (sectionIdxs.size !== 73) failures.push("sectionExercises idx values are not unique.");
  if (source.includes(FORBIDDEN_NATIVE_RANDOM_TOKEN)) failures.push("Forbidden native random token appears in the exam task tree data.");
  if (dataBytes > 1300000) warnings.push("data/exam_tasks_tree.js is above the 1.3MB internal margin.");

  sectionExercises.forEach((exercise) => {
    const label = exercise.id || `idx:${exercise.idx}`;
    const fileTree = exercise.projectFileTree || {};
    const hasFiles = Array.isArray(fileTree.files) && fileTree.files.length > 0;
    if (!exercise.sectionText || String(exercise.sectionText).length < 6) failures.push(`${label}: missing sectionText.`);
    if (!hasFiles) failures.push(`${label}: missing project file tree.`);
    if (!Array.isArray(exercise.technicalSubtasks) || exercise.technicalSubtasks.length < 1) failures.push(`${label}: missing technical subtasks.`);
    if (rubricPoints(exercise) !== 100) failures.push(`${label}: rubric does not sum to 100.`);
    if (exercise.rubricScale !== "internal-100-checklist-not-official-points") failures.push(`${label}: rubricScale policy missing.`);
    if (!Array.isArray(exercise.howToGet100) || exercise.howToGet100.length < 1) failures.push(`${label}: missing howToGet100.`);
    if (!Array.isArray(exercise.beyond100) || exercise.beyond100.length < 1) failures.push(`${label}: missing beyond100.`);
    if (!exercise.explanationLevels || String(exercise.explanationLevels.grandma || "").length < 30) failures.push(`${label}: missing grandma-level explanation.`);
    if (!exercise.explanationLevels || String(exercise.explanationLevels.professional || "").length < 30) failures.push(`${label}: missing professional-level explanation.`);
    if (!Array.isArray(exercise.sourceRefs) || !exercise.sourceRefs.join(" ").includes("exam_sections_task_breakdown")) failures.push(`${label}: missing sourceRefs.`);
    if (exercise.status === "manual_review") {
      if (exercise.autoScorable !== false) failures.push(`${label}: manual_review must not be autoScorable.`);
      return;
    }
    if (exercise.autoScorable !== true) failures.push(`${label}: ready section must be autoScorable.`);
    if (!Array.isArray(exercise.technicalTaskRefs) || exercise.technicalTaskRefs.length < 1) failures.push(`${label}: ready section missing technicalTaskRefs.`);
    (exercise.technicalTaskRefs || []).forEach((ref) => {
      if (!subbranchIds.has(ref.subbranchId)) failures.push(`${label}: unknown technical ref ${ref.subbranchId}.`);
      if (!/\.(jsx|js|md)$/.test(String(ref.targetFile || ""))) failures.push(`${label}: ref targetFile is not a code/doc file.`);
    });
  });
  technicalTasks.forEach((task) => {
    const label = task.id || "technical-task";
    if (!task.explanationLevels || String(task.explanationLevels.grandma || "").length < 30) failures.push(`${label}: missing grandma-level explanation.`);
    if (!task.explanationLevels || String(task.explanationLevels.professional || "").length < 30) failures.push(`${label}: missing professional-level explanation.`);
    if (!task.codeRecipe || String(task.codeRecipe.grandmaExplanation || "").length < 30) failures.push(`${label}: codeRecipe missing grandmaExplanation.`);
    if (!task.codeRecipe || String(task.codeRecipe.professionalExplanation || "").length < 30) failures.push(`${label}: codeRecipe missing professionalExplanation.`);
    if (!task.projectFileTree || !Array.isArray(task.projectFileTree.files) || !task.projectFileTree.files.length) failures.push(`${label}: missing technical task file tree.`);
    if (!Array.isArray(task.technicalSubtasks) || !task.technicalSubtasks.length) failures.push(`${label}: missing technical task subtasks.`);
  });

  const manualReview = sectionExercises.filter((exercise) => exercise.status === "manual_review");
  const readySections = sectionExercises.filter((exercise) => exercise.status === "ready");
  return {
    reportVersion: "exam-task-tree-coverage-v1",
    ready: failures.length === 0,
    dataBytes,
    totalSections: tree.totalSections,
    branches: branches.length,
    subbranches: subbranches.length,
    technicalTasks: technicalTasks.length,
    sectionExercises: sectionExercises.length,
    readySections: readySections.length,
    manualReviewSections: manualReview.length,
    withFileTree: sectionExercises.filter((exercise) => exercise.projectFileTree && exercise.projectFileTree.files && exercise.projectFileTree.files.length).length,
    withRubric100: sectionExercises.filter((exercise) => rubricPoints(exercise) === 100).length,
    withTechnicalSubtasks: sectionExercises.filter((exercise) => exercise.technicalSubtasks && exercise.technicalSubtasks.length).length,
    withGrandmaExplanation: sectionExercises.filter((exercise) => exercise.explanationLevels && String(exercise.explanationLevels.grandma || "").length >= 30).length,
    withProfessionalExplanation: sectionExercises.filter((exercise) => exercise.explanationLevels && String(exercise.explanationLevels.professional || "").length >= 30).length,
    technicalTasksWithGrandmaExplanation: technicalTasks.filter((task) => task.explanationLevels && String(task.explanationLevels.grandma || "").length >= 30).length,
    technicalTasksWithProfessionalExplanation: technicalTasks.filter((task) => task.explanationLevels && String(task.explanationLevels.professional || "").length >= 30).length,
    manualReviewIds: manualReview.map((exercise) => exercise.id),
    warnings,
    failures,
  };
}

const report = audit();
function printReport(report) {
  if (summary) {
    console.log(JSON.stringify({
      ready: report.ready,
      totalSections: report.totalSections,
      sectionExercises: report.sectionExercises,
      readySections: report.readySections,
      manualReviewSections: report.manualReviewSections,
      withFileTree: report.withFileTree,
      withRubric100: report.withRubric100,
      withTechnicalSubtasks: report.withTechnicalSubtasks,
      withGrandmaExplanation: report.withGrandmaExplanation,
      withProfessionalExplanation: report.withProfessionalExplanation,
      technicalTasksWithGrandmaExplanation: report.technicalTasksWithGrandmaExplanation,
      technicalTasksWithProfessionalExplanation: report.technicalTasksWithProfessionalExplanation,
      dataBytes: report.dataBytes,
      failures: report.failures.length,
      warnings: report.warnings.length,
    }, null, 2));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
}

if (require.main === module) {
  printReport(report);
  if (strict && !report.ready) {
    process.exitCode = 1;
  }
}

module.exports = { audit };
