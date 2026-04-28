document.addEventListener("DOMContentLoaded", () => {
  const standaloneMuseumMode = (() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get("standalone") === "museum" || params.get("view") === "museum";
    } catch (_) {
      return false;
    }
  })();
  if (standaloneMuseumMode) document.body.classList.add("standalone-museum-mode");

  const lessonsNav = document.getElementById("lessons-nav");
  const welcomeScreen = document.getElementById("welcome-screen");
  const activeLessonContainer = document.getElementById("active-lesson");
  const currentLessonTitle = document.getElementById("current-lesson-title");
  const currentLessonDesc = document.getElementById("current-lesson-desc");
  const lessonBody = document.getElementById("lesson-body");
  const levelTabs = document.querySelectorAll(".level-tab");
  const searchInput = document.getElementById("search-input");
  const quizSection = document.getElementById("quiz-section");
  const quizBody = document.getElementById("quiz-body");
  const quizSubmitBtn = document.getElementById("quiz-submit");
  const quizResetBtn = document.getElementById("quiz-reset");
  const quizResults = document.getElementById("quiz-results");
  const quizScore = document.getElementById("quiz-score");
  const quizFeedback = document.getElementById("quiz-feedback");
  const mobileToggle = document.getElementById("mobile-toggle");
  const sidebar = document.getElementById("sidebar");
  const knowledgeMapView = document.getElementById("knowledge-map-view");
  const studyModeView = document.getElementById("study-mode-view");
  const trainerView = document.getElementById("trainer-view");
  const guideView = document.getElementById("guide-view");
  const grandmaKnowledgeView = document.getElementById("grandma-knowledge-view");
  const programmingBasicsView = document.getElementById("programming-basics-view");
  const programmingPrinciplesView = document.getElementById("programming-principles-view");
  const programmingMuseumView = document.getElementById("programming-museum-view");
  const learningEvidenceView = document.getElementById("learning-evidence-view");
  const capstonesView = document.getElementById("capstones-view");
  const blueprintsView = document.getElementById("blueprints-view");
  const flashcardsView = document.getElementById("flashcards-view");
  const openKnowledgeMapBtn = document.getElementById("open-knowledge-map");
  const openStudyModeBtn = document.getElementById("open-study-mode");
  const openTrainerBtn = document.getElementById("open-trainer");
  const openGuideBtn = document.getElementById("open-guide");
  const openGrandmaKnowledgeBtn = document.getElementById("open-grandma-knowledge");
  const openProgrammingBasicsBtn = document.getElementById("open-programming-basics");
  const openProgrammingPrinciplesBtn = document.getElementById("open-programming-principles");
  const openProgrammingMuseumBtn = document.getElementById("open-programming-museum");
  const openLearningEvidenceBtn = document.getElementById("open-learning-evidence");
  const openCapstonesBtn = document.getElementById("open-capstones");
  const openBlueprintsBtn = document.getElementById("open-blueprints");
  const openFlashcardsBtn = document.getElementById("open-flashcards");
  const codeblocksView = document.getElementById("codeblocks-view");
  const openCodeblocksBtn = document.getElementById("open-codeblocks");
  const traceView = document.getElementById("trace-view");
  const openTraceBtn = document.getElementById("open-trace");
  const contextTreePanel = document.getElementById("context-tree-panel");
  const contextTreeTitle = document.getElementById("context-tree-title");
  const contextTreeCount = document.getElementById("context-tree-count");
  const contextTreeSearch = document.getElementById("context-tree-search");
  const contextTreeBody = document.getElementById("context-tree-body");

  let currentLessonId = null;
  let currentLevel = "grandma";
  let quizCompleted = {};

  // =========== PROFICIENCY STORE (V/X knowledge map) ===========
  // proficiency[conceptKey] = "v" | "x" | undefined
  // conceptKey = `${lessonId}::${conceptName}`
  const PROF_STORAGE_KEY = "lumenportal:proficiency:v1";
  let proficiency = {};
  try {
    proficiency = JSON.parse(localStorage.getItem(PROF_STORAGE_KEY) || "{}");
  } catch (_) { proficiency = {}; }

  function saveProficiency() {
    try { localStorage.setItem(PROF_STORAGE_KEY, JSON.stringify(proficiency)); } catch (_) {}
  }

  function conceptKey(lessonId, conceptName) {
    return `${lessonId}::${conceptName}`;
  }

  function setProficiency(lessonId, conceptName, val) {
    const k = conceptKey(lessonId, conceptName);
    if (val == null) delete proficiency[k];
    else proficiency[k] = val;
    saveProficiency();
  }

  function getProficiency(lessonId, conceptName) {
    return proficiency[conceptKey(lessonId, conceptName)] || null;
  }

  function allConcepts() {
    const out = [];
    (window.LESSONS_DATA || []).forEach((l) => {
      (l.concepts || []).forEach((c) => {
        out.push({ lesson: l, concept: c });
      });
    });
    return out;
  }

  // =========== QUESTION BANK INDEX ===========
  // Counts questions per (lessonId, conceptName), separating curated vs seeded
  function bankCountsFor(lessonId, conceptName) {
    const bank = window.QUESTIONS_BANK || { mc: [], fill: [] };
    const key = conceptKey(lessonId, conceptName);
    const mcAll = (bank.mc || []).filter((q) => q.conceptKey === key);
    const fillAll = (bank.fill || []).filter((q) => q.conceptKey === key);
    const counts = {
      mc: mcAll.length,
      fill: fillAll.length,
      mcCurated: mcAll.filter((q) => !q._seeded).length,
      fillCurated: fillAll.filter((q) => !q._seeded).length,
    };
    counts.mcSeeded = counts.mc - counts.mcCurated;
    counts.fillSeeded = counts.fill - counts.fillCurated;
    return counts;
  }
  function bankByTopic(topicId) {
    const bank = window.QUESTIONS_BANK || { mc: [], fill: [] };
    return {
      mc: (bank.mc || []).filter((q) => q.topicId === topicId),
      fill: (bank.fill || []).filter((q) => q.topicId === topicId),
    };
  }
  function bankByConcept(lessonId, conceptName) {
    const bank = window.QUESTIONS_BANK || { mc: [], fill: [] };
    const key = conceptKey(lessonId, conceptName);
    return {
      mc: (bank.mc || []).filter((q) => q.conceptKey === key),
      fill: (bank.fill || []).filter((q) => q.conceptKey === key),
    };
  }
  // Find concept by key (used by guide to update levels for hand-crafted Qs)
  function findConceptByKey(key) {
    if (!key) return null;
    const [lessonId, ...rest] = key.split("::");
    const conceptName = rest.join("::");
    const lesson = (window.LESSONS_DATA || []).find((l) => l.id === lessonId);
    if (!lesson) return null;
    const concept = (lesson.concepts || []).find(
      (c) => c.conceptName === conceptName,
    );
    if (!concept) return null;
    return { lesson, concept };
  }

  function profCounts() {
    const concepts = allConcepts();
    let v = 0, x = 0;
    concepts.forEach(({ lesson, concept }) => {
      const p = getProficiency(lesson.id, concept.conceptName);
      if (p === "v") v++;
      else if (p === "x") x++;
    });
    return { total: concepts.length, v, x, pending: concepts.length - v - x };
  }

  // =========== GLOBAL CONTEXT TREE ===========
  // Right-side tree navigation that adapts to the active tab / lesson.
  let contextTreeSource = { key: "home", title: "עץ ניווט", sections: [] };
  let contextTreeQuery = "";
  const contextTreeActions = new Map();

  function contextTreeView() {
    return window.LUMEN_VIEWS && window.LUMEN_VIEWS.contextTree;
  }

  function contextNodeText(node) {
    const view = contextTreeView();
    if (view && typeof view.contextNodeText === "function") return view.contextNodeText(node);
    return [node.label, node.meta, node.level]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function countContextLeaves(nodes) {
    const view = contextTreeView();
    if (view && typeof view.countContextLeaves === "function") return view.countContextLeaves(nodes);
    return (nodes || []).reduce((sum, node) => {
      if (node.children && node.children.length) {
        return sum + countContextLeaves(node.children);
      }
      return sum + 1;
    }, 0);
  }

  function filterContextNodes(nodes, query) {
    const view = contextTreeView();
    if (view && typeof view.filterContextNodes === "function") return view.filterContextNodes(nodes, query);
    if (!query) return nodes || [];
    return (nodes || [])
      .map((node) => {
        const selfMatch = contextNodeText(node).includes(query);
        if (!node.children || !node.children.length) {
          return selfMatch ? node : null;
        }
        const children = selfMatch
          ? node.children
          : filterContextNodes(node.children, query);
        if (!children.length) return null;
        return { ...node, children, forceOpen: true };
      })
      .filter(Boolean);
  }

  function setContextTree(title, sections, options = {}) {
    const key = options.key || title || "context";
    if (contextTreeSource.key !== key) {
      contextTreeQuery = "";
      if (contextTreeSearch) contextTreeSearch.value = "";
    }
    contextTreeSource = {
      key,
      title: title || "עץ ניווט",
      sections: sections || [],
    };
    renderContextTree();
  }

  function renderContextTree() {
    if (!contextTreeBody) return;
    const query = (contextTreeQuery || "").toLowerCase().trim();
    const sections = filterContextNodes(contextTreeSource.sections, query);
    contextTreeActions.clear();

    if (contextTreePanel) {
      contextTreePanel.hidden = false;
    }
    if (contextTreeTitle) contextTreeTitle.textContent = contextTreeSource.title;
    if (contextTreeCount) {
      const count = countContextLeaves(sections);
      contextTreeCount.textContent = count ? `${count} פריטים` : "";
    }

    contextTreeBody.innerHTML = sections.length
      ? `<div class="ctx-tree-root">${sections.map((node, i) => renderContextNode(node, [i])).join("")}</div>`
      : `<div class="ctx-empty">אין ענפים תואמים.</div>`;

    contextTreeBody.querySelectorAll("[data-ctx-action]").forEach((el) => {
      el.addEventListener("click", () => {
        const action = contextTreeActions.get(el.getAttribute("data-ctx-action"));
        if (typeof action === "function") action();
      });
    });
  }

  function renderContextNode(node, path, depth = 0) {
    const children = node.children || [];
    if (children.length) {
      const open = node.forceOpen || node.open !== false ? "open" : "";
      const count = node.count ?? countContextLeaves(children);
      return `
        <details class="ctx-branch ctx-depth-${depth}" ${open}>
          <summary>
            <span class="ctx-label">${esc(node.label || "")}</span>
            ${count ? `<span class="ctx-count">${esc(count)}</span>` : ""}
          </summary>
          <div class="ctx-children">
            ${children.map((child, i) => renderContextNode(child, [...path, i], depth + 1)).join("")}
          </div>
        </details>`;
    }

    const view = contextTreeView();
    const actionId =
      view && typeof view.contextActionId === "function"
        ? view.contextActionId(path, node)
        : `ctx-${path.join("-")}-${String(node.id || node.label || "leaf").replace(/\s+/g, "_")}`;
    if (node.action) contextTreeActions.set(actionId, node.action);
    const cls = [
      "ctx-leaf",
      node.active ? "active" : "",
      node.stateClass || "",
    ]
      .filter(Boolean)
      .join(" ");
    return `
      <button class="${cls}" type="button" data-ctx-action="${esc(actionId)}" title="${esc(node.title || node.label || "")}">
        <span class="ctx-label">${esc(node.label || "")}</span>
        ${node.level ? `<span class="ctx-level">${esc(node.level)}</span>` : ""}
        ${node.meta ? `<span class="ctx-meta">${esc(node.meta)}</span>` : ""}
      </button>`;
  }

  contextTreeSearch?.addEventListener("input", (e) => {
    contextTreeQuery = e.target.value || "";
    renderContextTree();
  });

  function scoreStateClass(sc) {
    if (!sc) return "";
    if (sc.attempts > 0 && typeof isSrsDue === "function" && isSrsDue(sc)) return "is-due";
    if ((sc.level || 1) >= 7) return "is-mastered";
    if ((sc.level || 1) <= 2 || (sc.weakReports || 0) > 0) return "is-weak";
    return "";
  }

  function openLessonConcept(lessonId, conceptName) {
    selectedConceptByLesson[lessonId] = conceptName;
    openLesson(lessonId);
    setTimeout(() => {
      const card = document.querySelector(
        `.concept-card.adaptive[data-concept="${cssEscape(conceptName)}"]`,
      );
      card?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function conceptLeafNode(lesson, concept, activeName = "") {
    const sc = getScore(lesson.id, concept.conceptName);
    const bank = bankCountsFor(lesson.id, concept.conceptName);
    const totalBank = bank.mc + bank.fill;
    return {
      id: `${lesson.id}:${concept.conceptName}`,
      label: concept.conceptName,
      level: `${sc.level || 1}/7`,
      meta: totalBank ? `${totalBank} ש׳` : "",
      active: concept.conceptName === activeName,
      stateClass: scoreStateClass(sc),
      title: `${lesson.title} · ${concept.conceptName}`,
      action: () => openLessonConcept(lesson.id, concept.conceptName),
    };
  }

  function lessonConceptBuckets(lesson, activeName = "") {
    const buckets = [
      { id: "due", label: "חזרה מומלצת", items: [] },
      { id: "weak", label: "לחיזוק", items: [] },
      { id: "learning", label: "בלימוד", items: [] },
      { id: "mastered", label: "מאסטר", items: [] },
    ];
    (lesson.concepts || []).forEach((concept) => {
      const sc = getScore(lesson.id, concept.conceptName);
      const leaf = conceptLeafNode(lesson, concept, activeName);
      if (sc.attempts > 0 && isSrsDue(sc)) buckets[0].items.push(leaf);
      else if ((sc.level || 1) >= 7) buckets[3].items.push(leaf);
      else if ((sc.level || 1) <= 2 || (sc.weakReports || 0) > 0) buckets[1].items.push(leaf);
      else buckets[2].items.push(leaf);
    });
    return buckets
      .filter((bucket) => bucket.items.length)
      .map((bucket) => ({
        id: bucket.id,
        label: bucket.label,
        open: bucket.items.some((item) => item.active) || bucket.id !== "mastered",
        children: bucket.items,
      }));
  }

  function setLessonContextTree(lesson, activeConceptName = "") {
    setContextTree(
      "מושגי השיעור",
      [
        {
          id: lesson.id,
          label: lesson.title,
          open: true,
          children: lessonConceptBuckets(lesson, activeConceptName),
        },
      ],
      { key: `lesson:${lesson.id}` },
    );
  }

  function groupedLessonNodes() {
    const groups = {};
    (window.LESSONS_DATA || []).forEach((lesson) => {
      const tx = getTopicForLesson(lesson.id);
      const key = tx.topic;
      if (!groups[key]) groups[key] = { tx, lessons: [] };
      groups[key].lessons.push(lesson);
    });
    return Object.values(groups).map(({ tx, lessons }) => ({
      id: `topic:${tx.topic}`,
      label: `${tx.emoji} ${tx.topic}`,
      open: false,
      children: lessons.map((lesson) => ({
        id: lesson.id,
        label: lesson.title,
        meta: `${(lesson.concepts || []).length}`,
        action: () => openLesson(lesson.id),
      })),
    }));
  }

  function setHomeContextTree() {
    setContextTree(
      "עץ האתר",
      [
        {
          id: "tabs",
          label: "טאבים ראשיים",
          open: true,
          children: [
            { id: "home", label: "שיעורים", action: () => document.getElementById("open-home")?.click() },
            { id: "guide", label: "מדריך מקוצר", action: () => openGuide() },
            { id: "grandma", label: "ידע מורחב ברמת סבתא", action: () => openGrandmaKnowledge() },
            { id: "programming-basics", label: "אבני בסיס", action: () => openProgrammingBasics() },
            { id: "programming-principles", label: "עקרונות יסוד", action: () => openProgrammingPrinciples() },
            { id: "programming-museum", label: "מוזיאון שפות", action: () => openProgrammingMuseum() },
            { id: "knowledge-map", label: "מפת ידע", action: () => openKnowledgeMap() },
            { id: "study", label: "לימוד מותאם", action: () => openStudyMode() },
            { id: "trainer", label: "מאמן ידע", action: () => openTrainer() },
            { id: "flashcards", label: "כרטיסיות", action: () => openFlashcards() },
            { id: "exam", label: "מבחן מדומה", action: () => openMockExam() },
            { id: "codeblocks", label: "בלוקי קוד", action: () => openCodeblocks() },
            { id: "trace", label: "Code Trace", action: () => openTracePage() },
            { id: "anatomy", label: "פירוק קוד", action: () => openCodeAnatomy() },
            { id: "comparator", label: "השוואות", action: () => openComparator() },
            { id: "gap", label: "פערים", action: () => openGapMatrix() },
            { id: "learning-evidence", label: "ראיות למידה", action: () => openLearningEvidence() },
            { id: "capstones", label: "פרויקטים", action: () => openCapstones() },
            { id: "blueprints", label: "יישור קורסים", action: () => openBlueprints() },
          ],
        },
        {
          id: "lessons",
          label: "שיעורים לפי נושא",
          open: true,
          children: groupedLessonNodes(),
        },
      ],
      { key: "home" },
    );
  }

  const PROGRAMMING_BASICS_BLOCKS = [
    {
      id: "bool",
      icon: "🔘",
      name: "Boolean / bool",
      short: "ערך אמת או שקר: true או false.",
      builtFrom: "שאלה שיש לה רק שתי תשובות.",
      example: "const isLoggedIn = true;\nconst isEmpty = cart.length === 0;",
      confusion: "bool לא מחזיק טקסט ולא רשימה. הוא מחזיק החלטה אחת: כן/לא.",
    },
    {
      id: "if",
      icon: "🚦",
      name: "if",
      short: "שער החלטה: אם התנאי true, מריצים בלוק קוד.",
      builtFrom: "boolean + בלוק פקודות.",
      example: "if (isLoggedIn) {\n  showDashboard();\n} else {\n  showLogin();\n}",
      confusion: "if לא שומר מידע. הוא רק בוחר איזה קוד ירוץ עכשיו.",
    },
    {
      id: "variable",
      icon: "🏷️",
      name: "משתנה",
      short: "שם שמצביע לערך כדי שנוכל להשתמש בו שוב.",
      builtFrom: "שם + ערך.",
      example: "const studentName = \"Noa\";\nlet score = 0;\nscore = score + 10;",
      confusion: "המשתנה הוא התווית. הערך הוא מה שנמצא מאחורי התווית.",
    },
    {
      id: "array",
      icon: "🚃",
      name: "מערך",
      short: "משתנה שמחזיק סדרה מסודרת של ערכים.",
      builtFrom: "שם + סוגריים מרובעים + תאים לפי index.",
      example: "const scores = [82, 91, 76];\nconst firstScore = scores[0];",
      confusion: "מערך הוא מחסן מסודר. הוא לא עושה פעולה בעצמו.",
    },
    {
      id: "function",
      icon: "⚙️",
      name: "פונקציה",
      short: "קופסת פעולה: מקבלת קלט, מריצה צעדים, ומחזירה תוצאה.",
      builtFrom: "שם + פרמטרים + בלוק קוד + return.",
      example: "function addBonus(score) {\n  return score + 5;\n}",
      confusion: "פונקציה לא שומרת רשימה. היא מתארת פעולה שאפשר להפעיל שוב.",
    },
    {
      id: "comparison",
      icon: "⚖️",
      name: "השוואה",
      short: "בדיקה שמחזירה boolean.",
      builtFrom: "שני ערכים + אופרטור כמו ===, >, <.",
      example: "const passed = score >= 60;\nconst sameName = name === \"Noa\";",
      confusion: "השוואה היא לא if. היא רק מייצרת את ה-true/false שה-if משתמש בו.",
    },
  ];

  const PROGRAMMING_BUILD_RECIPES = [
    {
      id: "build-function",
      title: "איך בונים פונקציה מאבני בסיס",
      intro: "פונקציה היא לא קסם: שמים משתנים, תנאים, boolean ו-return בתוך קופסת פעולה.",
      steps: ["קלט נכנס דרך פרמטרים", "משתנים שומרים מצב ביניים", "if בוחר מסלול", "return מחזיר תשובה"],
      code: "function chooseBadge(score, mistakes) {\n  const passed = score >= 70;\n  const clean = mistakes === 0;\n\n  if (passed && clean) {\n    return \"gold\";\n  }\n\n  if (passed) {\n    return \"silver\";\n  }\n\n  return \"practice\";\n}",
    },
    {
      id: "build-array",
      title: "איך בונים מערך מאבני בסיס",
      intro: "מערך הוא דרך לארוז כמה ערכים תחת שם אחד, במקום ליצור משתנה נפרד לכל פריט.",
      steps: ["מתחילים מערכים בודדים", "נותנים שם לקבוצה", "שומרים סדר", "ניגשים לכל תא עם index"],
      code: "const firstTopic = \"bool\";\nconst secondTopic = \"if\";\nconst thirdTopic = \"array\";\n\nconst topics = [firstTopic, secondTopic, thirdTopic];\nconst nextTopic = topics[1];",
    },
    {
      id: "build-loop",
      title: "איך בונים פעולה על מערך",
      intro: "לוקחים מערך, מריצים פונקציה על כל תא, ושומרים תוצאה חדשה.",
      steps: ["מערך מחזיק נתונים", "פונקציה מגדירה פעולה", "לולאה מפעילה את הפעולה שוב ושוב", "if מסנן מקרים מיוחדים"],
      code: "const scores = [55, 80, 96];\n\nfunction toStatus(score) {\n  if (score >= 70) return \"pass\";\n  return \"practice\";\n}\n\nconst statuses = scores.map(toStatus);",
    },
    {
      id: "build-app",
      title: "איך מזה נבנית אפליקציה",
      intro: "אפליקציה היא הרבה החלטות קטנות שמחוברות: נתונים, פעולות, תנאים ותצוגה.",
      steps: ["state הוא משתנים שמייצגים מצב", "arrays מחזיקים רשימות", "functions מעדכנות או מחשבות", "if מחליט מה להציג"],
      code: "function TodoApp() {\n  const tasks = [\"learn bool\", \"write function\"];\n  const hasTasks = tasks.length > 0;\n\n  if (!hasTasks) return \"אין משימות\";\n  return tasks.map(task => `✓ ${task}`);\n}",
    },
  ];

  const PROGRAMMING_ZERO_STEPS = [
    { id: "zero", label: "0", text: "אין מידע ואין פעולה" },
    { id: "value", label: "ערך", text: "מספר, טקסט, true/false" },
    { id: "variable", label: "משתנה", text: "שם שמחזיק ערך" },
    { id: "expression", label: "ביטוי", text: "חישוב או השוואה שמחזירים ערך" },
    { id: "if", label: "if", text: "בחירת מסלול לפי boolean" },
    { id: "function", label: "פונקציה", text: "אריזת פעולה לשימוש חוזר" },
    { id: "array", label: "מערך", text: "אוסף ערכים מסודר" },
    { id: "object", label: "אובייקט", text: "אוסף שדות עם שמות" },
    { id: "module", label: "מודול", text: "כמה פונקציות ונתונים בקובץ" },
    { id: "app", label: "אפליקציה", text: "מודולים שמדברים עם משתמש" },
  ];

  const PROGRAMMING_ELECTRICITY_STEPS = [
    {
      id: "electric-charge",
      title: "מטען, מתח וזרם",
      label: "חשמל",
      layer: "פיזיקה",
      summary: "ברמה הפשוטה ללומד: במעגל יש הפרש מתח, זרם יכול לזרום, ורכיבים שולטים בזרימה. מחשב משתמש במצבים חשמליים יציבים כדי לסמן מידע.",
      builds: "מקור מתח + מוליכים + רכיבים",
      codeLink: "עוד אין קוד. יש רק מצב פיזי שאפשר למדוד.",
    },
    {
      id: "threshold",
      title: "סף מתח: נמוך או גבוה",
      label: "0/1 פיזי",
      layer: "אות",
      summary: "המחשב לא צריך אינסוף רמות מתח. הוא מחלק את העולם לשני טווחים: נמוך נחשב 0, גבוה נחשב 1.",
      builds: "מתח נמוך/גבוה → החלטה בינארית",
      codeLink: "זה הבסיס ל-boolean: שני מצבים במקום רצף אינסופי.",
    },
    {
      id: "transistor-switch",
      title: "טרנזיסטור כמתג",
      label: "מתג",
      layer: "חומרה",
      summary: "טרנזיסטור הוא רכיב שיכול לאפשר או לחסום זרימה. הרבה טרנזיסטורים יחד בונים מתגים חכמים.",
      builds: "אות כניסה → פתיחה/סגירה → אות יציאה",
      codeLink: "if בתוכנה הוא רעיון דומה: אם התנאי פתוח, עוברים במסלול אחד.",
    },
    {
      id: "bit",
      title: "ביט",
      label: "bit",
      layer: "מידע",
      summary: "ביט הוא לא החוט עצמו. ביט הוא המשמעות שאנחנו נותנים למצב החשמלי: 0 או 1.",
      builds: "סף מתח + יציבות → 0/1",
      codeLink: "true/false, on/off, yes/no הם פירושים שונים לביט.",
    },
    {
      id: "logic-gate-value",
      title: "שער לוגי",
      label: "AND OR NOT",
      layer: "לוגיקה",
      summary: "מחברים טרנזיסטורים כך שיקבלו ביטים ויחזירו ביט חדש. כך נוצרים AND, OR, NOT, XOR ועוד.",
      builds: "טרנזיסטורים → שערים → החלטות",
      codeLink: "&&, ||, ! ב-JavaScript הם שכבת תוכנה מעל שערים כאלה.",
    },
    {
      id: "adder",
      title: "חיבור בינארי",
      label: "+",
      layer: "חישוב",
      summary: "שערים לוגיים יכולים לבנות מחבר בינארי. מחבר קטן מחבר ביטים; הרבה מחברים יחד מחברים מספרים.",
      builds: "XOR/AND/OR → half adder → full adder",
      codeLink: "כשכותבים 2 + 3, המעבד מפעיל מעגלים שמחשבים ביטים.",
    },
    {
      id: "memory-cell",
      title: "תא זיכרון",
      label: "זוכר ביט",
      layer: "זיכרון",
      summary: "כדי שערך יישאר אחרי רגע אחד צריך רכיב ששומר מצב. flip-flop/register/RAM הם דרכים לשמור ביטים.",
      builds: "שערים עם משוב → מצב שנשמר",
      codeLink: "משתנה מרגיש כמו שם לערך, אבל מתחת יש ביטים שנשמרים בזיכרון.",
    },
    {
      id: "byte",
      title: "Byte ומילה",
      label: "8 ביטים",
      layer: "ייצוג",
      summary: "מקבצים ביטים. 8 ביטים נקראים byte. כמה bytes יחד יכולים לייצג מספר גדול, תו, כתובת או פקודה.",
      builds: "ביטים → byte → word",
      codeLink: "00000101 יכול להיות המספר 5. אותו רצף ביטים יכול לקבל משמעות אחרת לפי ההקשר.",
    },
    {
      id: "encoding",
      title: "קידוד",
      label: "משמעות",
      layer: "פירוש",
      summary: "קידוד הוא הסכם: איזה רצף ביטים אומר מה. בלי קידוד, הביטים הם רק מצבים; עם קידוד הם ערך.",
      builds: "רצף ביטים + כלל פירוש",
      codeLink: "65 יכול להיות מספר, או התו A בקידוד ASCII. הטיפוס והקידוד קובעים.",
    },
    {
      id: "value",
      title: "ערך",
      label: "value",
      layer: "שפת תכנות",
      summary: "ערך הוא משמעות יציבה שהתוכנה יכולה לעבוד איתה: מספר, טקסט, boolean, null, אובייקט. הוא בנוי מביטים + קידוד + טיפוס.",
      builds: "ביטים בזיכרון + טיפוס + כלל פירוש",
      codeLink: "const age = 12; הערך הוא 12; השם age רק מצביע אליו או מחזיק אותו לפי מודל השפה.",
    },
    {
      id: "variable-from-value",
      title: "משתנה",
      label: "שם לערך",
      layer: "שפה",
      summary: "משתנה מוסיף שם. השם עוזר לבני אדם ול-compiler/interpreter למצוא או לנהל ערך.",
      builds: "שם → binding → מקום בזיכרון/Reference",
      codeLink: "let score = 10; השם score מחובר לערך 10, ובהמשך אפשר לחבר אותו לערך אחר.",
    },
    {
      id: "abstractions",
      title: "אבני בסיס מעל ערכים",
      label: "מערך/פונקציה",
      layer: "מבנים",
      summary: "מערך הוא הרבה ערכים בסדר. אובייקט הוא ערכים עם שמות. פונקציה היא ערך מסוג מיוחד שמייצג קוד שאפשר להפעיל.",
      builds: "ערכים + כתובות + כללי שפה",
      codeLink: "const list = [1, 2, 3]; function add(a, b) { return a + b; }",
    },
  ];

  const PROGRAMMING_VALUE_EXAMPLES = [
    {
      value: "5",
      bits: "00000101",
      meaning: "מספר שלם קטן",
      note: "הביטים מייצגים סכום של חזקות 2: 4 + 1.",
    },
    {
      value: "true",
      bits: "1",
      meaning: "אמת / כן / מופעל",
      note: "בפועל ייצוג boolean משתנה לפי שפה ומנוע, אבל הרעיון הוא מצב אחד מתוך שניים.",
    },
    {
      value: "\"A\"",
      bits: "01000001",
      meaning: "תו לפי ASCII",
      note: "אותו מספר 65 יכול להיות תו אם מפרשים אותו כקידוד טקסט.",
    },
    {
      value: "[1, 2, 3]",
      bits: "רצף ערכים + כתובות",
      meaning: "מערך",
      note: "מערך הוא לא ביט אחד; זו תבנית שמארגנת כמה ערכים ומיקום שלהם.",
    },
  ];

  const PROGRAMMING_PRIMITIVE_DEEP_DIVE = [
    {
      id: "bit",
      term: "bit",
      plain: "היחידה הכי קטנה של מידע: 0 או 1. לא “bite”; המילה היא bit.",
      builtFrom: "מצב פיזי יציב שמפורש כנמוך/גבוה, כבוי/דולק, false/true.",
      computer: "החומרה לא “מבינה” 0 ו-1 כמו אדם; היא מגיבה למתח חשמלי לפי ספים קבועים.",
      code: "true, false, flags, permissions",
    },
    {
      id: "byte",
      term: "byte",
      plain: "קבוצה של 8 ביטים. עם 8 ביטים אפשר לייצג 256 צירופים שונים.",
      builtFrom: "8 bit-ים מסודרים יחד: למשל 01000001.",
      computer: "המעבד והזיכרון קוראים הרבה מידע ביחידות של bytes או מילים גדולות יותר.",
      code: "ASCII A = 01000001, Buffer, file bytes",
    },
    {
      id: "type",
      term: "type",
      plain: "הוראת פירוש: איך לקרוא את הביטים.",
      builtFrom: "אותם bits + כלל פירוש: מספר, טקסט, boolean, כתובת או פקודה.",
      computer: "המחשב מזיז bits; השפה/runtime מחליטים אם הביטים הם number, string או object.",
      code: "typeof value, TypeScript types, JSON schema",
    },
    {
      id: "value",
      term: "value",
      plain: "משמעות שהתוכנה יכולה לעבוד איתה: 7, \"שלום\", true, null, אובייקט או פונקציה.",
      builtFrom: "bits שנשמרו בזיכרון + type/context + כללי השפה.",
      computer: "המחשב לא יודע ש-7 הוא “גיל” או “ציון”. הוא יודע לבצע הוראות על ייצוג בינארי.",
      code: "const age = 7; הערך הוא 7",
    },
    {
      id: "key",
      term: "key",
      plain: "שם בתוך אובייקט שמאפשר למצוא value.",
      builtFrom: "string/symbol שמקושר לערך במבנה key-value.",
      computer: "המנוע מחזיק טבלה/מבנה פנימי שמתרגם key למיקום שבו הערך נמצא.",
      code: "user.name → key: name, value: \"Dana\"",
    },
    {
      id: "variable",
      term: "variable",
      plain: "שם בקוד שמחובר לערך.",
      builtFrom: "binding בין שם לבין value או reference, לפי מודל השפה.",
      computer: "השם נוח לבני אדם. בזמן ריצה המנוע עובד עם slots, כתובות, references ו-registers.",
      code: "let score = 10; score = 11;",
    },
    {
      id: "reference",
      term: "reference",
      plain: "הפניה למקום שבו ערך מורכב נמצא, במקום להחזיק את כל הערך בשם עצמו.",
      builtFrom: "כתובת/handle פנימי אל אובייקט, מערך או פונקציה.",
      computer: "שני משתנים יכולים להצביע לאותו אובייקט; שינוי דרך אחד נראה גם דרך השני.",
      code: "const a = []; const b = a;",
    },
    {
      id: "array",
      term: "array",
      plain: "אוסף ערכים לפי סדר, עם גישה לפי index.",
      builtFrom: "רשימת slots שמחזיקים values או references, ועוד length וכללי גישה.",
      computer: "ב-JS מערך הוא אובייקט מיוחד שמנוע JS מייעל כשמשתמשים בו בצורה צפויה.",
      code: "items[0], items.map(fn), items.length",
    },
    {
      id: "object",
      term: "object",
      plain: "אוסף שדות. כל שדה הוא key שמוביל ל-value.",
      builtFrom: "טבלת שמות, values/references, ולעיתים prototype.",
      computer: "המנוע מחפש key לפי מבנה פנימי. לכן shape יציב של object יכול להיות יעיל יותר.",
      code: "{ id: 1, title: \"JS\" }",
    },
    {
      id: "function",
      term: "function",
      plain: "ערך מיוחד שמייצג קוד שאפשר להפעיל.",
      builtFrom: "רצף הוראות + scope סגור + רשימת פרמטרים + נקודת חזרה.",
      computer: "כשקוראים לפונקציה, המנוע מכין call frame, מעביר קלט, מריץ הוראות ומחזיר פלט.",
      code: "function add(a, b) { return a + b; }",
    },
    {
      id: "expression",
      term: "expression",
      plain: "חתיכת קוד שמחזירה value.",
      builtFrom: "values, variables, operators ו-function calls.",
      computer: "המנוע מחשב את הביטוי לפי סדר קדימויות וכללי השפה עד שמתקבל value.",
      code: "score >= 70, price * 1.17, user.name",
    },
    {
      id: "instruction",
      term: "instruction",
      plain: "פקודה נמוכה שהמעבד יודע לבצע: טען, שמור, חבר, קפוץ.",
      builtFrom: "opcode + operands שמקודדים בביטים.",
      computer: "בסוף כל קוד גבוה חייב להפוך להוראות נמוכות שהמעבד או ה-VM יודעים לבצע.",
      code: "JS → bytecode/JIT → machine instructions",
    },
  ];

  const PROGRAMMING_COMPUTER_UNDERSTANDS_FLOW = [
    {
      id: "human-intent",
      title: "כוונה אנושית",
      text: "אנחנו רוצים פעולה: לחשב ציון, להציג תפריט, לשמור משתמש.",
      example: "“אם הציון מעל 70, הצג עבר.”",
    },
    {
      id: "source-code",
      title: "קוד מקור",
      text: "כותבים את הכוונה בתחביר ששפה יודעת לקרוא.",
      example: "if (score >= 70) showPassed();",
    },
    {
      id: "parser",
      title: "Parser",
      text: "המנוע קורא תווים ובודק שהם חוקיים לפי grammar של השפה.",
      example: "tokens → AST",
    },
    {
      id: "meaning",
      title: "משמעות לפי השפה",
      text: "השפה מחליטה מהו משתנה, מהו ביטוי, מהו scope ומה מותר להריץ.",
      example: "score הוא binding; >= מחזיר boolean",
    },
    {
      id: "runtime",
      title: "Runtime / Interpreter / Compiler",
      text: "הקוד מתורגם ל-bytecode, machine code או הוראות שמנוע השפה יודע להריץ.",
      example: "V8 מפרש, ממטב ולעיתים JIT-compiles",
    },
    {
      id: "cpu-memory",
      title: "CPU וזיכרון",
      text: "המעבד מזיז bits בין registers, memory ו-cache ומבצע הוראות.",
      example: "load, compare, jump, call",
    },
    {
      id: "output",
      title: "תוצאה",
      text: "התוצאה חוזרת למסך, קובץ, רשת, DB או זיכרון.",
      example: "DOM משתנה, response נשלח, value נשמר",
    },
  ];

  const PROGRAMMING_LANGUAGE_LAYER_EXAMPLES = [
    {
      title: "JavaScript בדפדפן",
      chain: "JS source → JS engine → bytecode/JIT → DOM/Web APIs → pixels",
      point: "המחשב לא מבין React או HTML ככוונה. הדפדפן והמנוע מתרגמים אותם לפעולות על DOM, layout וציור.",
    },
    {
      title: "Node.js",
      chain: "JS source → V8 → libuv/OS APIs → files/network/process",
      point: "כשכותבים fs או HTTP, Node מתווך בין JS לבין מערכת ההפעלה.",
    },
    {
      title: "TypeScript",
      chain: "TS source → type checker → JS output → JS engine",
      point: "TypeScript עוזר לפני הרצה. בזמן ריצה המחשב מקבל JavaScript, לא טיפוסים של TypeScript.",
    },
    {
      title: "C / Rust",
      chain: "source → compiler → machine code → CPU",
      point: "פחות שכבות runtime, יותר שליטה, אבל יותר אחריות על זיכרון וייצוג.",
    },
  ];

  const PROGRAMMING_PRODUCT_STACK_FLOW = [
    {
      id: "idea",
      title: "רעיון",
      layer: "Business",
      question: "איזו בעיה אמיתית פותרים ולמי?",
      output: "בעיה, קהל יעד, הצעת ערך, מדד הצלחה.",
    },
    {
      id: "ux",
      title: "חוויה",
      layer: "Product / UX",
      question: "איך המשתמש עובר מערך לפעולה?",
      output: "מסכים, flow, תוכן, empty/loading/error states.",
    },
    {
      id: "client",
      title: "Client",
      layer: "Frontend",
      question: "איך המסך מגיב ל-state ולפעולות?",
      output: "HTML/CSS/React, forms, routing, validation ראשוני.",
    },
    {
      id: "api",
      title: "API",
      layer: "Contract",
      question: "מה החוזה בין המסך לשרת?",
      output: "routes, request/response, status codes, JSON schema.",
    },
    {
      id: "server",
      title: "Server",
      layer: "Backend",
      question: "מי מאשר, מעבד ומפעיל לוגיקה?",
      output: "Node/Express, middleware, services, errors.",
    },
    {
      id: "data",
      title: "Data",
      layer: "Persistence",
      question: "מה נשמר, באיזה מבנה, ואיך מחפשים?",
      output: "MongoDB/Mongoose, models, queries, migrations/seed אמת.",
    },
    {
      id: "release",
      title: "Release",
      layer: "Market",
      question: "איך מוציאים, מודדים ומשפרים בלי לנחש?",
      output: "build, QA, analytics, support, rollout, roadmap.",
    },
  ];

  const PROGRAMMING_PRODUCT_LIFECYCLE = [
    {
      id: "before-dev",
      stage: "לפני הפיתוח",
      goal: "להוכיח שיש בעיה, קהל, ערך ותכולה קטנה שאפשר לבנות.",
      product: ["מחקר משתמשים", "הגדרת persona", "מסע משתמש", "MVP scope"],
      tech: ["בחירת stack", "data model ראשוני", "API contracts", "סיכוני אבטחה/פרטיות"],
      business: ["הצעת ערך", "מודל הכנסה", "מחיר/חבילות", "מדדי הצלחה"],
      deliverable: "מסמך one-pager, flow מסכים, backlog ראשון, Definition of Done.",
    },
    {
      id: "during-dev",
      stage: "בזמן הפיתוח",
      goal: "לבנות בחתיכות קטנות שמתחברות דרך חוזים ברורים ולא דרך ניחושים.",
      product: ["סדר עדיפויות", "בדיקת flow מול משתמש", "ניהול scope", "תוכן מסכים"],
      tech: ["Frontend", "Backend", "Database", "Tests / QA", "DevOps / build"],
      business: ["Landing copy", "onboarding", "תמחור ניסיוני", "תיעוד תמיכה"],
      deliverable: "גרסה עובדת בסבבים: מסך → API → data → בדיקה → feedback.",
    },
    {
      id: "pre-launch",
      stage: "אחרי הפיתוח ולפני יציאה לשוק",
      goal: "להפוך מוצר שעובד אצל המפתח למוצר שמחזיק משתמשים אמיתיים.",
      product: ["QA ידני", "accessibility", "onboarding", "copy סופי"],
      tech: ["build production", "security review", "logging", "backup", "performance"],
      business: ["חומרי השקה", "pricing page", "support playbook", "מדיניות שימוש"],
      deliverable: "Launch checklist, תרחישי rollback, dashboards, מדריך תמיכה.",
    },
    {
      id: "launch",
      stage: "בזמן ההוצאה לשוק",
      goal: "להוציא בצורה מבוקרת, למדוד התנהגות אמיתית ולתת מענה מהיר.",
      product: ["soft launch", "איסוף feedback", "תיקון onboarding", "מעקב activation"],
      tech: ["monitoring", "error triage", "hotfix path", "rollback", "capacity"],
      business: ["קמפיין", "sales/support", "קהילה", "מדידת conversion"],
      deliverable: "דוח השקה: adoption, errors, churn מוקדם, בקשות חוזרות.",
    },
    {
      id: "post-launch",
      stage: "אחרי ההוצאה לשוק",
      goal: "להחליף תחושות בנתונים: מה עובד, מה מיותר ומה צריך להשתנות.",
      product: ["roadmap", "A/B ניסויי תוכן", "שיפור retention", "מחקר שימוש בפועל"],
      tech: ["refactor ממוקד", "tech debt", "scaling", "observability", "quality gates"],
      business: ["unit economics", "support cost", "upsell", "partnerships", "positioning"],
      deliverable: "החלטה מחזורית: לשפר, לשדרג גרסה, להחליף חלק, או לסגור.",
    },
  ];

  const PROGRAMMING_PRODUCT_TEAM_SPLIT = [
    {
      role: "Product",
      owns: "בעיה, קהל, roadmap, scope",
      during: "מחליט מה נכנס לספרינט ומה מחכה.",
      handoff: "User stories, acceptance criteria, מדדי הצלחה.",
    },
    {
      role: "UX/UI",
      owns: "flow, מסכים, מצבים, נגישות",
      during: "מגדיר empty/loading/error ומוודא שהחוויה לא נשברת.",
      handoff: "Wireframes, design states, copy למסך.",
    },
    {
      role: "Frontend",
      owns: "React, state, forms, routing",
      during: "בונה מסכים לפי data contract ולא לפי ניחוש על DB.",
      handoff: "Components, validation, API calls, UI tests.",
    },
    {
      role: "Backend",
      owns: "API, auth, services, errors",
      during: "מגדיר endpoints ומבודד business logic מה-routing.",
      handoff: "Routes, middleware, error model, API docs.",
    },
    {
      role: "Data",
      owns: "models, queries, integrity",
      during: "מחליט מה נשמר ומה רק נגזר בזמן הצגה.",
      handoff: "Schemas, indexes, backup plan, data rules.",
    },
    {
      role: "QA / Delivery",
      owns: "בדיקות, build, release readiness",
      during: "בודק flows קצה לקצה ולא רק מסך בודד.",
      handoff: "Test plan, smoke tests, release checklist.",
    },
  ];

  const PROGRAMMING_PRODUCT_VERSION_DECISIONS = [
    {
      decision: "לשדרג גרסה",
      when: "הבעיה עדיין אותה בעיה, המשתמשים נשארים, אבל יש בקשות חוזרות, bottlenecks או צורך ביכולת חדשה.",
      signals: ["activation יציב", "retention לא נשבר", "אותן בקשות חוזרות", "tech debt מקומי"],
      action: "גרסת vNext עם scope ברור: לשפר flow, להוסיף יכולת, למדוד לפני/אחרי.",
    },
    {
      decision: "להחליף מודול",
      when: "חלק אחד במוצר מגביל את השאר: API איטי, data model עקום, UI לא ניתן לתחזוקה.",
      signals: ["באגים חוזרים באותו אזור", "פיתוח קטן דורש שינוי גדול", "performance לא משתפר נקודתית"],
      action: "מחליפים רק את החלק הבעייתי מאחורי contract יציב, לא כותבים הכול מחדש.",
    },
    {
      decision: "להחליף מוצר / כיוון",
      when: "הבעיה העסקית השתנתה, הקהל לא מאמץ, או העלות להחזיק את המוצר גבוהה מהערך שהוא מייצר.",
      signals: ["retention נמוך", "support cost גבוה", "אין willingness to pay", "הפתרון לא פותר כאב מרכזי"],
      action: "עוצרים פיתוח תכונות, חוזרים למחקר, ומשמרים רק ידע/רכיבים שעברו הוכחה.",
    },
    {
      decision: "לא לשדרג עדיין",
      when: "אין מספיק שימוש אמיתי או שהנתונים לא מראים בעיה ברורה.",
      signals: ["מעט משתמשים", "feedback סותר", "אין metric baseline", "הצוות לא יודע מה למדוד"],
      action: "מוסיפים מדידה, מראיינים משתמשים, ומחכים להוכחה לפני פיתוח גדול.",
    },
  ];

  let programmingBasicsTab = "foundations";
  const PROGRAMMING_BASICS_TABS = [
    { id: "foundations", label: "אבנים", icon: "🧱" },
    { id: "electricity", label: "חשמל→ערך", icon: "⚡" },
    { id: "efficiency", label: "יעילות", icon: "📈" },
    { id: "builds", label: "בונים קוד", icon: "🛠️" },
    { id: "menus", label: "תפריטים", icon: "🧭" },
    { id: "patents", label: "פטנטים", icon: "💡" },
    { id: "tech", label: "טכנולוגיות", icon: "⚙️" },
    { id: "languages", label: "שפות", icon: "🧬" },
    { id: "history", label: "היסטוריה", icon: "🕰️" },
    { id: "museum", label: "מוזיאון", icon: "🏛️" },
    { id: "react-anatomy", label: "React למה?", icon: "⚛️" },
  ];

  const PROGRAMMING_BUILD_EXAMPLES = [
    {
      group: "משתנה",
      items: [
        {
          title: "ערך קבוע עם const",
          code: "const maxRetries = 3;",
          efficiency: "גישה O(1), זיכרון O(1), שינוי אסור",
          recommend: "מומלץ כברירת מחדל כשאין שינוי.",
        },
        {
          title: "מצב משתנה עם let",
          code: "let score = 0;\nscore = score + 10;",
          efficiency: "גישה O(1), זיכרון O(1), שינוי מותר",
          recommend: "מומלץ רק כשבאמת צריך לעדכן ערך.",
        },
        {
          title: "משתנה נגזר מחישוב",
          code: "const passed = score >= 70;\nconst label = passed ? \"עבר\" : \"צריך תרגול\";",
          efficiency: "חישוב O(1), זיכרון O(1)",
          recommend: "מומלץ כדי לתת שם למשמעות, לא רק לתוצאה.",
        },
      ],
    },
    {
      group: "מערך",
      items: [
        {
          title: "מערך ליטרלי",
          code: "const lessons = [\"bool\", \"if\", \"array\"];",
          efficiency: "גישה לפי index היא O(1), מעבר מלא O(n), זיכרון O(n)",
          recommend: "מומלץ לרשימה קטנה/בינונית עם סדר חשוב.",
        },
        {
          title: "בניית מערך מאפס עם push",
          code: "const menu = [];\nmenu.push(\"home\");\nmenu.push(\"profile\");",
          efficiency: "push ממוצע O(1), מעבר מלא O(n)",
          recommend: "מומלץ כשבונים רשימה בהדרגה.",
        },
        {
          title: "מערך נגזר עם map",
          code: "const labels = lessons.map(name => name.toUpperCase());",
          efficiency: "O(n) זמן, O(n) זיכרון למערך חדש",
          recommend: "מומלץ כשצריך טרנספורמציה בלי לשנות מקור.",
        },
      ],
    },
    {
      group: "מחלקה",
      items: [
        {
          title: "Class פשוטה",
          code: "class Counter {\n  constructor() {\n    this.value = 0;\n  }\n\n  inc() {\n    this.value += 1;\n  }\n}",
          efficiency: "יצירת instance היא O(1), קריאת method היא O(1)",
          recommend: "מומלץ כשיש state + פעולות שחיות יחד.",
        },
        {
          title: "Factory במקום class",
          code: "function createCounter() {\n  let value = 0;\n  return {\n    inc: () => value += 1,\n    get: () => value,\n  };\n}",
          efficiency: "O(1), אבל יוצר פונקציות חדשות לכל instance",
          recommend: "מומלץ כשהסתרת state חשובה יותר מזיכרון מינימלי.",
        },
        {
          title: "אובייקט סטטי",
          code: "const counter = {\n  value: 0,\n  inc() {\n    this.value += 1;\n  },\n};",
          efficiency: "O(1), אין עלות יצירת instances רבים",
          recommend: "מומלץ כשצריך מופע אחד בלבד.",
        },
      ],
    },
    {
      group: "פונקציה",
      items: [
        {
          title: "פונקציה טהורה",
          code: "function addVat(price) {\n  return price * 1.17;\n}",
          efficiency: "O(1), בלי side effects, קל לבדיקה",
          recommend: "הכי מומלץ ללוגיקה עסקית.",
        },
        {
          title: "פונקציה שמקבלת מערך",
          code: "function average(nums) {\n  const sum = nums.reduce((a, n) => a + n, 0);\n  return sum / nums.length;\n}",
          efficiency: "O(n) זמן, O(1) זיכרון נוסף",
          recommend: "מומלץ כשצריך חישוב על רשימה.",
        },
        {
          title: "פונקציה שמחזירה פונקציה",
          code: "function minScore(limit) {\n  return score => score >= limit;\n}\n\nconst passed = minScore(70);",
          efficiency: "יצירה O(1), בדיקה O(1), זיכרון O(1)",
          recommend: "מומלץ כשאותו כלל מופעל בהרבה מקומות.",
        },
      ],
    },
  ];

  const PROGRAMMING_MENU_EXAMPLES = [
    {
      title: "תפריט פרימיטיבי מ-JSON",
      stack: "JSON + JavaScript",
      code: "const menu = [\n  { id: \"home\", label: \"בית\", href: \"/\" },\n  { id: \"learn\", label: \"לימוד\", href: \"/learn\" },\n  { id: \"profile\", label: \"פרופיל\", href: \"/me\" },\n];",
      efficiency: "קריאה לפי index O(1), חיפוש לפי id הוא O(n), זיכרון O(n)",
      recommend: "הכי מומלץ כבסיס. מידע קודם, UI אחר כך.",
    },
    {
      title: "תפריט Node.js בלי ספריות",
      stack: "Node.js CLI",
      code: "const readline = require(\"node:readline\");\nconst items = [\"home\", \"learn\", \"exit\"];\n\nitems.forEach((item, i) => console.log(`${i + 1}. ${item}`));\n\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\nrl.question(\"בחר מספר: \", answer => {\n  const index = Number(answer) - 1;\n  console.log(items[index] || \"בחירה לא קיימת\");\n  rl.close();\n});",
      efficiency: "הדפסה O(n), בחירה לפי index O(1), בלי bundle frontend",
      recommend: "מומלץ לכלי CLI פנימי או לימוד event loop.",
    },
    {
      title: "תפריט React מתוך JSON",
      stack: "React",
      code: "function Menu({ items }) {\n  return (\n    <nav>\n      {items.map(item => (\n        <a key={item.id} href={item.href}>{item.label}</a>\n      ))}\n    </nav>\n  );\n}",
      efficiency: "render הוא O(n), diff תלוי שינוי; key יציב מקטין עבודה מיותרת",
      recommend: "מומלץ כשיש UI אינטראקטיבי והרשימה משתנה.",
    },
    {
      title: "תפריט Next.js",
      stack: "Next App Router",
      code: "import Link from \"next/link\";\n\nconst items = [\n  { id: \"home\", label: \"בית\", href: \"/\" },\n  { id: \"learn\", label: \"לימוד\", href: \"/learn\" },\n];\n\nexport default function Menu() {\n  return items.map(item => (\n    <Link key={item.id} href={item.href}>{item.label}</Link>\n  ));\n}",
      efficiency: "render O(n), ניווט client-side יעיל אחרי טעינה, עלות framework גבוהה יותר מ-HTML",
      recommend: "מומלץ לאתר עם routing, SEO וטעינה לפי עמודים.",
    },
  ];

  const PROGRAMMING_PATENTS = [
    {
      title: "החלף שרשרת if ארוכה במילון פעולות",
      before: "if (type === \"save\") save();\nelse if (type === \"load\") load();\nelse if (type === \"delete\") remove();",
      after: "const actions = { save, load, delete: remove };\nactions[type]?.();",
      efficiency: "בחירת פעולה O(1) במקום מעבר תנאים O(n)",
      warning: "טוב כשיש הרבה אפשרויות. לשני תנאים, if פשוט יותר קריא.",
    },
    {
      title: "בנה UI מנתונים, לא מקוד משוכפל",
      before: "<a href=\"/a\">A</a>\n<a href=\"/b\">B</a>\n<a href=\"/c\">C</a>",
      after: "const links = [\"a\", \"b\", \"c\"];\nlinks.map(id => <a key={id} href={`/${id}`}>{id}</a>);",
      efficiency: "render O(n), תחזוקה O(1) להוספת פריט יחיד",
      warning: "אל תעשה abstraction כשיש רק פריט אחד.",
    },
    {
      title: "Memo ידני לפונקציה יקרה",
      before: "function fib(n) {\n  if (n < 2) return n;\n  return fib(n - 1) + fib(n - 2);\n}",
      after: "const cache = {};\nfunction fib(n) {\n  if (n in cache) return cache[n];\n  if (n < 2) return n;\n  cache[n] = fib(n - 1) + fib(n - 2);\n  return cache[n];\n}",
      efficiency: "נאיבי O(2^n), עם cache יורד ל-O(n) זמן ו-O(n) זיכרון",
      warning: "Cache טוב רק אם אותו קלט חוזר הרבה.",
    },
    {
      title: "Set במקום includes בלולאה",
      before: "selectedIds.includes(item.id)",
      after: "const selected = new Set(selectedIds);\nselected.has(item.id)",
      efficiency: "includes הוא O(n), Set.has ממוצע O(1)",
      warning: "משתלם כשהבדיקה חוזרת הרבה פעמים.",
    },
  ];

  const PROGRAMMING_LIBRARY_WARNINGS = [
    {
      name: "ייבוא lodash שלם בשביל פעולה אחת",
      issue: "עלות bundle ו-tree-shaking לא תמיד מצילים import לא מדויק.",
      alternative: "השתמש ב-native array/object או import נקודתי בלבד.",
      efficiency: "native map/filter/reduce: O(n), אפס תלות חיצונית",
    },
    {
      name: "Moment.js בשביל פורמט תאריך פשוט",
      issue: "ספרייה גדולה ומודל mutable; לא מוצדקת לפורמט קצר.",
      alternative: "Intl.DateTimeFormat המובנה בדפדפן/Node.",
      efficiency: "פורמט O(1) לקלט יחיד, אפס bundle נוסף בצד לקוח",
    },
    {
      name: "jQuery בתוך React בשביל toggle קטן",
      issue: "שתי מערכות DOM מתחרות: React state מול DOM mutation.",
      alternative: "state, boolean ו-className.",
      efficiency: "עדכון state מקומי; פחות קוד glue ופחות סיכוי לרגרסיה",
    },
    {
      name: "UI framework גדול בשביל תפריט אחד",
      issue: "הרבה CSS/JS עבור רכיב קטן.",
      alternative: "JSON + map + CSS מקומי.",
      efficiency: "render O(n), bundle מינימלי",
    },
  ];

  const PROGRAMMING_TECH_RANKING = [
    {
      name: "Vanilla JS",
      rank: "יעיל ביותר למשימה קטנה",
      builtFrom: "ערכים, פונקציות, objects, arrays, DOM APIs",
      can: "אינטראקציות מהירות, תפריטים, טפסים, UI קטן",
      cannot: "לא נותן routing/state architecture גדול בלי לבנות לבד",
      efficiency: "bundle מינימלי; runtime תלוי קוד שלך",
    },
    {
      name: "Node.js",
      rank: "יעיל ל-I/O ושרתים קלים",
      builtFrom: "V8 + event loop + libuv + APIs של מערכת הפעלה",
      can: "שרת HTTP, CLI, קבצים, API, realtime",
      cannot: "לא אידיאלי לחישוב CPU כבד בלולאה אחת בלי workers/native",
      efficiency: "I/O concurrency טוב; CPU single-thread דורש זהירות",
    },
    {
      name: "React",
      rank: "יעיל ל-UI מורכב, לא תמיד ל-UI קטן",
      builtFrom: "פונקציות JS, tree של components, state, diffing",
      can: "קומפוננטות, state מורכב, UI גדול",
      cannot: "לא מחליף ידע ב-DOM, CSS ו-data structures",
      efficiency: "render לפי שינוי state; memo/key נכונים משפרים מאוד",
    },
    {
      name: "Next.js",
      rank: "יעיל למוצר web מלא",
      builtFrom: "React + routing + server rendering + build pipeline",
      can: "SEO, routing, server/client split, full-stack app",
      cannot: "מוסיף שכבות ועלות כשצריך widget קטן בלבד",
      efficiency: "מצוין לעמודים וטעינה לפי route; overhead גבוה מ-React לבד",
    },
    {
      name: "UI Component Library",
      rank: "יעיל בזמן פיתוח, לא תמיד בביצועים",
      builtFrom: "React components + CSS + accessibility helpers",
      can: "להאיץ בניית מוצר עקבי",
      cannot: "להחליף הבנה של state, layout ו-bundle size",
      efficiency: "עלות bundle משתנה; מומלץ למדוד לפני ייבוא רחב",
    },
  ];

  const PROGRAMMING_LANGUAGES = [
    {
      name: "C",
      speed: "מהירה מאוד",
      builtFrom: "זיכרון, pointers, structs, functions, compiled machine code",
      can: "מערכות הפעלה, embedded, ספריות native",
      cannot: "לא נותנת memory safety אוטומטי",
      note: "מעט שכבות, שליטה גבוהה, אחריות גבוהה.",
    },
    {
      name: "C++",
      speed: "מהירה מאוד",
      builtFrom: "C + classes/templates/RAII/overloading",
      can: "מנועי משחק, realtime, מערכות ביצועים",
      cannot: "מורכבת; compile times וניהול abstraction דורשים משמעת",
      note: "Zero-cost abstractions כשהקוד נכתב טוב.",
    },
    {
      name: "C#",
      speed: "מהירה",
      builtFrom: "JIT/runtime, classes, generics, GC, async/await",
      can: "backend, desktop, Unity, enterprise",
      cannot: "פחות קרובה לחומרה מ-C/C++",
      note: "איזון טוב בין ביצועים לפרודוקטיביות.",
    },
    {
      name: "Java",
      speed: "מהירה",
      builtFrom: "JVM, bytecode, classes, GC, JIT",
      can: "backend גדול, Android, מערכות ארגוניות",
      cannot: "startup וזיכרון יכולים להיות כבדים למיקרו-כלים קטנים",
      note: "JIT חזק אחרי warmup.",
    },
    {
      name: "Python",
      speed: "איטית יחסית בלולאות Python טהורות",
      builtFrom: "interpreter, objects דינמיים, C extensions",
      can: "אוטומציה, data, AI, scripts, backend פשוט",
      cannot: "לא אידיאלית ל-CPU tight loops בלי NumPy/C/Rust extensions",
      note: "מהירה לפיתוח; ביצועים מגיעים מספריות native.",
    },
    {
      name: "JavaScript",
      speed: "בינונית עד מהירה עם JIT",
      builtFrom: "objects, functions, prototypes, event loop",
      can: "web UI, Node server, realtime, scripts",
      cannot: "לא מתאימה לכל חישוב כבד בלי workers/native/WebAssembly",
      note: "מהירה מספיק לרוב ה-web; דורשת שליטה ב-async.",
    },
    {
      name: "TypeScript",
      speed: "כמו JavaScript בזמן ריצה",
      builtFrom: "JavaScript + type checker בזמן build",
      can: "למנוע באגים לפני הרצה, לתחזק קוד גדול",
      cannot: "לא מוסיפה ביצועים runtime בעצמה",
      note: "הטיפוסים נעלמים אחרי קומפילציה ל-JS.",
    },
    {
      name: "Rust",
      speed: "מהירה מאוד",
      builtFrom: "compiled machine code, ownership, traits, enums",
      can: "מערכות בטוחות, CLI, WebAssembly, backend ביצועי",
      cannot: "עקומת לימוד חדה יותר למתחילים",
      note: "Memory safety בלי GC.",
    },
  ];

  const PROGRAMMING_HISTORY_NODES = [
    {
      id: "transistor",
      year: "1947",
      title: "הטרנזיסטור הראשון",
      subtitle: "Bell Labs",
      layer: "חומרה",
      summary: "טרנזיסטור הוא מתג חשמלי זעיר. הוא מאפשר לבנות שערים לוגיים במקום להסתמך על שפופרות ואקום גדולות וחמות.",
      built: "זרם חשמלי → מתג פתוח/סגור → 0/1",
      changed: "מכאן אפשר לבנות מיליוני מתגים קטנים, מהירים וזולים יותר.",
    },
    {
      id: "logic-gates",
      year: "1948-1950",
      title: "שערים לוגיים",
      subtitle: "AND / OR / NOT",
      layer: "לוגיקה",
      summary: "מחברים טרנזיסטורים לשערים שמבצעים פעולות על ביטים: וגם, או, לא.",
      built: "טרנזיסטורים → שערים → מעגלים",
      changed: "bool בתוכנה הוא בן דוד ישיר של שער לוגי בחומרה.",
    },
    {
      id: "machine-code",
      year: "1948-1951",
      title: "Machine Code",
      subtitle: "השפה שהמעבד מבין",
      layer: "קוד מכונה",
      summary: "הפקודות הראשונות היו מספרים בינאריים שהמעבד קרא ישירות. זו השפה המעשית הראשונה של מחשבים אלקטרוניים.",
      built: "ביטים → opcode → פעולה במעבד",
      changed: "יעיל מאוד למחשב, קשה מאוד לבני אדם.",
    },
    {
      id: "assembly",
      year: "1949-1951",
      title: "Assembly",
      subtitle: "שמות לפקודות מכונה",
      layer: "סמלים",
      summary: "Assembly נתנה שמות אנושיים לפקודות מכונה: ADD, MOV, JMP. assembler תרגם אותם למספרים.",
      built: "מילה קצרה → opcode בינארי",
      changed: "הקוד נהיה קריא יותר, אבל עדיין קשור למעבד מסוים.",
    },
    {
      id: "early-high-level",
      year: "1949-1957",
      title: "השפות הגבוהות הראשונות",
      subtitle: "Short Code, Autocode, FORTRAN",
      layer: "שפה גבוהה",
      summary: "Short Code ו-Autocode היו ניסיונות מוקדמים. FORTRAN ב-1957 הפכה לשפה גבוהה שימושית ונפוצה באמת.",
      built: "ביטויים מתמטיים → compiler → machine code",
      changed: "המתכנת התחיל לכתוב רעיון, לא רק פקודות למעבד.",
    },
    {
      id: "algol",
      year: "1958-1960",
      title: "ALGOL",
      subtitle: "בלוקים ותחביר מודרני",
      layer: "מבנה שפה",
      summary: "ALGOL חיזקה רעיונות כמו בלוקים, scope ותחביר מסודר שהשפיעו על C ושפות רבות אחריה.",
      built: "בלוקים → scope → פונקציות נקיות יותר",
      changed: "התכנות התחיל להיראות כמו מבנים שאנחנו מכירים היום.",
    },
    {
      id: "bcpl",
      year: "1967",
      title: "BCPL",
      subtitle: "שפה קטנה למערכות",
      layer: "אב קדמון של C",
      summary: "BCPL הייתה שפה פשוטה יחסית לתכנות מערכות. היא השפיעה על B, וממנה הגיעו רעיונות אל C.",
      built: "שפה מינימלית → compiler פשוט → קוד מערכות",
      changed: "הכיוון היה שפה קרובה לחומרה אבל נעימה יותר מ-Assembly.",
    },
    {
      id: "b-language",
      year: "1969",
      title: "B",
      subtitle: "Ken Thompson",
      layer: "בדרך ל-C",
      summary: "B נבנתה ב-Bell Labs בהשראת BCPL, כדי לכתוב כלי מערכת. היא הייתה קטנה, פשוטה, ועדיין לא טיפוסית כמו C.",
      built: "BCPL → B → סביבת Unix מוקדמת",
      changed: "היא הייתה חוליית מעבר קריטית בין BCPL ל-C.",
    },
    {
      id: "c-language",
      year: "1972",
      title: "C",
      subtitle: "Dennis Ritchie",
      layer: "שפת מערכות",
      summary: "C נולדה כדי לכתוב Unix בצורה ניידת יותר מ-Assembly. היא הוסיפה טיפוסים, structs ויכולת לעבוד קרוב לזיכרון.",
      built: "B + טיפוסים + pointers + structs + compiler",
      changed: "אפשר היה לכתוב מערכת הפעלה בשפה גבוהה יחסית, ולהעביר אותה למחשבים שונים.",
    },
    {
      id: "post-c",
      year: "1983-1995",
      title: "ההתפצלות אחרי C",
      subtitle: "C++, Python, Java, JavaScript",
      layer: "משפחות שפות",
      summary: "C++ הוסיף מחלקות וביצועים, Python העדיפה קריאות, Java הוסיפה VM ו-GC, JavaScript הביאה שפה דינמית לדפדפן.",
      built: "C ורעיונותיה → OOP / VM / scripting / web",
      changed: "כל שפה בחרה פשרה אחרת בין מהירות, בטיחות, ניידות ונוחות.",
    },
    {
      id: "modern",
      year: "2000-היום",
      title: "שפות מודרניות",
      subtitle: "C#, Rust, TypeScript ועוד",
      layer: "בטיחות וסקייל",
      summary: "C# חיזקה ecosystem מנוהל, Rust ניסתה לקבל ביצועי C עם בטיחות זיכרון, TypeScript הוסיף טיפוסים מעל JavaScript.",
      built: "ניסיון העבר → טיפוסים חזקים יותר → כלים טובים יותר",
      changed: "הכיוון המודרני הוא פחות באגים בלי לוותר לגמרי על ביצועים.",
    },
  ];

  const PROGRAMMING_HISTORY_BRANCHES = [
    {
      title: "מהי “השפה הראשונה”?",
      body: "אין תשובה אחת. האלגוריתם הראשון שמיוחס למתכנתת הוא של Ada Lovelace במאה ה-19. השפה המעשית הראשונה שמחשב אלקטרוני מבין היא קוד מכונה. השפות הגבוהות הראשונות הגיעו אחר כך, ו-FORTRAN הייתה הראשונה שהפכה לשימושית ונפוצה באמת.",
    },
    {
      title: "איך זה התפתח ל-C?",
      body: "הדרך המרכזית הייתה: טרנזיסטורים → שערים לוגיים → קוד מכונה → Assembly → שפות גבוהות מוקדמות → ALGOL/BCPL → B → C. C הצליחה כי היא הייתה מספיק קרובה לחומרה כדי לכתוב מערכת הפעלה, אבל מספיק גבוהה כדי להיות ניידת וקריאה יותר מ-Assembly.",
    },
    {
      title: "איך זה התפתח הלאה?",
      body: "אחרי C נוצרו משפחות: C++ לקוד ביצועי עם מחלקות, Java/C# ל-runtime מנוהל ו-GC, Python לסקריפטים וקריאות, JavaScript לדפדפן, Rust לבטיחות זיכרון, TypeScript לטיפוסים מעל JavaScript.",
    },
  ];

  const PROGRAMMING_LANGUAGE_MUSEUM_HALLS = [
    {
      id: "hardware",
      title: "אולם 1 — מחומר לחשמל",
      period: "1947-1951",
      thesis: "לפני שפה יש חומרה: מתגים חשמליים, ביטים, שערים לוגיים וזיכרון.",
      visit: "התחל כאן אם תלמיד לא מבין איך ערך יכול להיות “אמיתי” במחשב.",
      value: "הערך: להבין ש־0/1, bool ומשתנה הם ייצוגים של מצב פיזי שנשמר ונקרא.",
      tradeoff: "המחיר: שליטה מלאה כמעט לא נותנת שפה אנושית; צריך לבנות כל רעיון משכבות קטנות.",
      artifact: "מה לראות: ביט, שער לוגי, תא זיכרון וכתובת כבסיס לכל ערך בקוד.",
      courseLink: "חיבור לקורס: bool, if, משתנים, זיכרון, וההבדל בין ערך לבין שם.",
      subMuseums: [
        {
          title: "גלריית ביטים ושערים",
          focus: "איך שני מצבים פיזיים הופכים ל-bool ולתנאי בקוד.",
          evolvedTo: "שערים לוגיים, זיכרון, כתובות ותנאים שמפעילים מסלול בקוד.",
          experience: "הפעל מתג אמת/שקר ועקוב איך if בוחר בין שתי דרכים.",
        },
        {
          title: "מעבדת זיכרון וכתובות",
          focus: "איך ערך נשמר, נקרא ומקבל שם אנושי.",
          evolvedTo: "משתנים, arrays, references ו-state שמחזיקים מצב לאורך זמן.",
          experience: "בנה מפה קטנה: כתובת, ערך, שם משתנה, ואז בדוק מי קורא את הערך.",
        },
      ],
      exhibits: [
        {
          year: "1947",
          name: "טרנזיסטור",
          builtFrom: "חומר מוליך-למחצה + מתח חשמלי",
          breakthrough: "מתג קטן ומהיר שמייצג מצב פתוח/סגור.",
          connects: "bool הוא הפשטה תוכנתית של שני מצבים פיזיים.",
        },
        {
          year: "1948-1950",
          name: "שערים לוגיים",
          builtFrom: "טרנזיסטורים שמחוברים כ-AND / OR / NOT",
          breakthrough: "חיבור ביטים לפעולות לוגיות בסיסיות.",
          connects: "`if (condition)` נשען על אמת/שקר שנבנו מלוגיקה.",
        },
        {
          year: "1950s",
          name: "זיכרון וכתובות",
          builtFrom: "תאים ששומרים ביטים + כתובת לכל תא",
          breakthrough: "אפשר לשמור ערכים, לקרוא אותם ולהשתמש בהם שוב.",
          connects: "משתנה הוא שם אנושי למיקום/ערך בזיכרון.",
        },
      ],
    },
    {
      id: "machine",
      title: "אולם 2 — המכונה מדברת במספרים",
      period: "1948-1955",
      thesis: "קוד מכונה ו-Assembly הם הגשר הראשון בין ביטים לבין הוראות.",
      visit: "כאן מבינים למה שפה נולדה: לא כי המחשב צריך, אלא כי האדם צריך.",
      value: "הערך: לראות שכל שפה גבוהה מתורגמת בסוף לפעולות שהמעבד יודע לבצע.",
      tradeoff: "המחיר: קוד קרוב למעבד מהיר ומדויק, אבל קשה לקריאה, קשה לניידות וקשה לתחזוקה.",
      artifact: "מה לראות: opcode, register, memory, assembler ורצף פקודות עם כניסה ויציאה.",
      courseLink: "חיבור לקורס: function כרצף הוראות, return כיציאה, ו-compiler כמתרגם.",
      subMuseums: [
        {
          title: "אולם opcode ו-registers",
          focus: "איך פעולה אחת מתפרקת להוראות שהמעבד יודע לבצע.",
          evolvedTo: "Assembly, assembler, compiler ורצף ביצוע נמוך מתחת לכל שפה גבוהה.",
          experience: "תרגם פעולה כמו חיבור לשלבים: קרא ערך, חשב, שמור תוצאה.",
        },
        {
          title: "מעבדת פונקציה נמוכה",
          focus: "איך רצף הוראות מקבל כניסה, פעולה ויציאה.",
          evolvedTo: "function, return, call stack והרעיון של כתובת חזרה.",
          experience: "סמן על רצפה דמיונית: התחלה, הוראה ראשונה, קפיצה, חזרה וערך מוחזר.",
        },
      ],
      exhibits: [
        {
          year: "1948-1951",
          name: "Machine Code",
          builtFrom: "opcode בינארי + registers + memory",
          breakthrough: "המעבד מבצע פקודות שמקודדות כמספרים.",
          connects: "כל שפה גבוהה בסוף מתורגמת למשהו שהמכונה יכולה לבצע.",
        },
        {
          year: "1949-1951",
          name: "Assembly",
          builtFrom: "שמות כמו MOV / ADD / JMP מעל קוד מכונה",
          breakthrough: "בני אדם כתבו סמלים במקום לזכור מספרים בינאריים.",
          connects: "פונקציה היא רצף הוראות עם כניסה, יציאה ולעיתים כתובת חזרה.",
        },
        {
          year: "1950s",
          name: "Assembler",
          builtFrom: "טבלת סמלים + תרגום לשפת מכונה",
          breakthrough: "כלי תוכנה ראשון שמתרגם קוד נוח יותר לקוד נמוך.",
          connects: "ה-compiler המודרני הוא המשך גדול וחכם יותר של אותו רעיון.",
        },
      ],
    },
    {
      id: "early-high-level",
      title: "אולם 3 — השפות הגבוהות הראשונות",
      period: "1954-1960",
      thesis: "השפות הראשונות נתנו למתכנתים לכתוב רעיון מתמטי או עסקי במקום פקודות מעבד.",
      visit: "אולם זה מחבר בין expression, variable ו-function לבין שפה שלמה.",
      value: "הערך: לכתוב כוונה אנושית כמו נוסחה, רשימה או רשומה במקום לכתוב פקודות מעבד.",
      tradeoff: "המחיר: ה-compiler או ה-runtime מסתירים חלק מהעבודה ולכן צריך להבין מה מסתתר מתחת.",
      artifact: "מה לראות: ביטוי, רשימה, record, function ו-data shape כיחידות שפה.",
      courseLink: "חיבור לקורס: expressions, variables, arrays, functions, objects ו-JSON.",
      subMuseums: [
        {
          title: "גלריית ביטויים ונוסחאות",
          focus: "איך expression מתאר כוונה במקום לפרט הוראות מעבד.",
          evolvedTo: "variables, functions, compiler וכתיבה שמתחילה ממשמעות אנושית.",
          experience: "כתוב נוסחה אחת ושאל מה צריך לקרות כדי שהמחשב יחשב אותה.",
        },
        {
          title: "מוזיאון צורות נתונים",
          focus: "איך רשימה ורשומה הופכות לדרך לחשוב על מידע.",
          evolvedTo: "arrays, objects, records, files ו-JSON בקוד מודרני.",
          experience: "הפוך record קטן ל-object ואז ל-JSON, בלי לשנות את המשמעות.",
        },
      ],
      exhibits: [
        {
          year: "1957",
          name: "FORTRAN",
          builtFrom: "ביטויים מתמטיים + compiler",
          breakthrough: "מדענים ומהנדסים יכלו לכתוב נוסחאות בקוד קריא יותר.",
          connects: "הביטוי `price * 1.17` הוא צאצא של רעיון שפה מתמטית.",
        },
        {
          year: "1958",
          name: "Lisp",
          builtFrom: "רשימות, רקורסיה, פונקציות ו-symbols",
          breakthrough: "קוד ונתונים יכולים להיראות כמו אותו מבנה בסיסי.",
          connects: "מערך/רשימה ופונקציה יכולים לבנות שפה שלמה סביבם.",
        },
        {
          year: "1959",
          name: "COBOL",
          builtFrom: "Records, files ושפה דמוית אנגלית עסקית",
          breakthrough: "תוכנה הפכה לכלי לניהול בנקים, שכר ומלאי.",
          connects: "אובייקטים ו-JSON ממשיכים את רעיון הרשומה עם שמות ושדות.",
        },
      ],
    },
    {
      id: "structured",
      title: "אולם 4 — מבנה, בלוקים ו-scope",
      period: "1958-1970",
      thesis: "כאן נולדו הרעיונות שהופכים קוד ארוך למבנה קריא: בלוקים, scope ופונקציות.",
      visit: "היכנס לכאן לפני שאלות על closure, scope או variable shadowing.",
      value: "הערך: להפוך קוד ארוך לאזורים עם גבולות, שמות מקומיים וזרימה שאפשר לעקוב אחריה.",
      tradeoff: "המחיר: גבולות scope עוזרים לסדר, אבל יוצרים טעויות כמו shadowing או closure ישן.",
      artifact: "מה לראות: בלוק, scope, procedure, שושלת BCPL → B → C.",
      courseLink: "חיבור לקורס: scope, closure, variable shadowing, function boundaries ו-blocks ב-JS.",
      subMuseums: [
        {
          title: "אולם בלוקים ו-scope",
          focus: "איך גבול של בלוק קובע איפה שם משתנה חי ואיפה הוא נעלם.",
          evolvedTo: "blocks ב-JS, function boundaries, closures וטעויות shadowing.",
          experience: "צבע כל משתנה לפי הבלוק שבו הוא נולד ואז בדוק איפה מותר לקרוא אותו.",
        },
        {
          title: "מעבדת שושלת C",
          focus: "איך תחביר ורעיונות עוברים משפה לשפה בלי להתחיל מאפס.",
          evolvedTo: "BCPL, B, C ותחביר משפחת C שמופיע גם ב-JavaScript.",
          experience: "מצא בקוד JS סימנים של המשפחה: סוגריים מסולסלים, if וגבולות פונקציה.",
        },
      ],
      exhibits: [
        {
          year: "1958-1960",
          name: "ALGOL",
          builtFrom: "בלוקים, פרוצדורות ותחביר פורמלי",
          breakthrough: "השפה השפיעה על הצורה שבה C ושפות מודרניות נראות.",
          connects: "`{ ... }` ב-JS ממשיך רעיון של בלוק ו-scope.",
        },
        {
          year: "1967",
          name: "BCPL",
          builtFrom: "שפה קטנה למערכות + compiler פשוט יחסית",
          breakthrough: "צעד בדרך לשפה קרובה לחומרה אבל נוחה יותר מ-Assembly.",
          connects: "הקו BCPL → B → C מסביר למה JS ירשה הרבה תחביר ממשפחת C.",
        },
        {
          year: "1969",
          name: "B",
          builtFrom: "רעיונות מ-BCPL + סביבת Unix מוקדמת",
          breakthrough: "שפת מעבר קטנה לפני C.",
          connects: "היא מראה ששפות נבנות באבולוציה, לא בקפיצה אחת.",
        },
      ],
    },
    {
      id: "c-systems",
      title: "אולם 5 — C ושפות מערכות",
      period: "1972-היום",
      thesis: "C הראתה ששפה גבוהה יחסית יכולה עדיין לשלוט בזיכרון ובמערכת הפעלה.",
      visit: "זה האולם שמסביר למה מהירות דורשת פחות שכבות ויותר אחריות.",
      value: "הערך: לקבל ביצועים ושליטה בזיכרון בלי לכתוב הכול ב-Assembly.",
      tradeoff: "המחיר: פחות שכבות הגנה אומר יותר אחריות על זיכרון, כתובות ובאגים נמוכים.",
      artifact: "מה לראות: pointer, array רציף, struct, ownership ויחס בין נתון לכתובת.",
      courseLink: "חיבור לקורס: arrays, objects, references, mutation, immutability ו-performance.",
      subMuseums: [
        {
          title: "מעבדת כתובות ומערכים",
          focus: "איך array הוא גם מבנה נוח וגם רצף תאים בזיכרון.",
          evolvedTo: "references, memory layout, performance וחשיבה על נתון מול כתובת.",
          experience: "עקוב אחרי מערך כרצף תאים: אינדקס, ערך, כתובת ושינוי במקום.",
        },
        {
          title: "אולם בטיחות זיכרון",
          focus: "איך שליטה ידנית יוצרת כוח וגם אחריות.",
          evolvedTo: "C++, Rust, ownership ודיון על mutation מול immutability.",
          experience: "בכל שינוי שאל: מי מחזיק את הערך, מי משנה אותו, ומתי זה מסוכן.",
        },
      ],
      exhibits: [
        {
          year: "1972",
          name: "C",
          builtFrom: "B + טיפוסים + pointers + structs",
          breakthrough: "Unix יכלה להיכתב בשפה ניידת יותר מ-Assembly.",
          connects: "pointer הוא כתובת; array הוא רצף ערכים; struct הוא object נמוך.",
        },
        {
          year: "1983",
          name: "C++",
          builtFrom: "C + classes + templates + RAII",
          breakthrough: "OOP ואבסטרקציות בקוד ביצועי.",
          connects: "מחלקה היא תבנית לנתונים + פעולות, לא קסם.",
        },
        {
          year: "2010s",
          name: "Rust",
          builtFrom: "קוד native + ownership + borrow checker",
          breakthrough: "ניסיון לקבל ביצועי C עם בטיחות זיכרון גבוהה יותר.",
          connects: "היסטוריית הבאגים של C הולידה שפות בטוחות יותר.",
        },
      ],
    },
    {
      id: "objects-vm",
      title: "אולם 6 — אובייקטים, VM ו-GC",
      period: "1967-היום",
      thesis: "שפות אובייקטיביות ו-runtime מנוהל החליפו חלק מהשליטה הידנית בנוחות ובבטיחות.",
      visit: "כאן מסבירים למה Java/C# שונות מ-C/C++ למרות תחביר דומה.",
      value: "הערך: לארוז נתונים ופעולות ביחידות, ולתת ל-runtime לנהל חלק מהעומס.",
      tradeoff: "המחיר: VM, GC ו-JIT מוסיפים שכבת ביצוע שצריך להבין כשבודקים ביצועים.",
      artifact: "מה לראות: class, object, message, bytecode, VM, GC ו-JIT.",
      courseLink: "חיבור לקורס: classes, objects, state, lifecycle, references ו-runtime behavior.",
      subMuseums: [
        {
          title: "אולם אובייקטים חיים",
          focus: "איך נתונים ופעולות נאספים ליחידה עם גבולות והתנהגות.",
          evolvedTo: "classes, objects, components ויחידות stateful בממשקים מודרניים.",
          experience: "ארוז נתונים ופעולה בכרטיס אחד ואז בדוק מי רשאי לשנות אותו.",
        },
        {
          title: "מעבדת VM ו-GC",
          focus: "איך runtime מנוהל מוריד עומס מהמתכנת אבל מוסיף שכבה.",
          evolvedTo: "bytecode, VM, GC, JIT והבדל בין תחביר לבין התנהגות בזמן ריצה.",
          experience: "סמן מה הקוד שלך מנהל ומה ה-runtime מנהל עבורך.",
        },
      ],
      exhibits: [
        {
          year: "1967",
          name: "Simula",
          builtFrom: "מחלקות ואובייקטים לסימולציה",
          breakthrough: "הולדת רעיון class/object בשפה.",
          connects: "React component אינו class בהכרח, אבל הרעיון של יחידה עם state והתנהגות קרוב.",
        },
        {
          year: "1970s",
          name: "Smalltalk",
          builtFrom: "אובייקטים, הודעות וסביבת פיתוח חיה",
          breakthrough: "הכול אובייקט, והמערכת עצמה אינטראקטיבית.",
          connects: "UI מודרני למד הרבה מסביבות שבהן הקוד והמסך חיים יחד.",
        },
        {
          year: "1995-2000",
          name: "Java ו-C#",
          builtFrom: "bytecode/IL + VM + GC + JIT",
          breakthrough: "ניידות, ניהול זיכרון אוטומטי וכלים ארגוניים.",
          connects: "GC מוריד עומס מהמתכנת, אבל מוסיף runtime ושכבת ביצוע.",
        },
      ],
    },
    {
      id: "web",
      title: "אולם 7 — הדפדפן הופך למכונה",
      period: "1990-היום",
      thesis: "ה-web הפך מסמכים, DOM ו-JavaScript לפלטפורמת אפליקציות.",
      visit: "זה האולם שמחבר ישירות ל-React, Node, Next ו-TypeScript.",
      value: "הערך: אותה שפה ומודל אירועים בונים UI, שרת, כלי פיתוח וזרימות נתונים.",
      tradeoff: "המחיר: דינמיות, async ו-DOM חיים דורשים משמעת גבוהה סביב state ותופעות לוואי.",
      artifact: "מה לראות: DOM tree, event loop, JavaScript, Node.js ו-TypeScript.",
      courseLink: "חיבור לקורס: DOM, events, fetch, promises, async/await, Node ו-TypeScript.",
      subMuseums: [
        {
          title: "מוזיאון DOM ו-events",
          focus: "איך מסמך הופך לעץ חי שאפשר לקרוא, לשנות ולהפעיל.",
          evolvedTo: "React tree, state-driven UI וסנכרון בין state לבין DOM.",
          experience: "לחץ על כפתור דמיוני ועקוב: event, שינוי state, עדכון מסך.",
        },
        {
          title: "אולם JS בכל מקום",
          focus: "איך אותה שפה יצאה מהדפדפן והפכה לכלי מוצר מלא.",
          evolvedTo: "Node.js, TypeScript, fetch, promises, async/await וכלי build.",
          experience: "קח פונקציה אחת והעבר אותה מהדפדפן לשרת: מה נשאר ומה משתנה.",
        },
      ],
      exhibits: [
        {
          year: "1990s",
          name: "HTML + DOM",
          builtFrom: "מסמך, תגיות, עץ nodes ו-events",
          breakthrough: "הדף הפך למבנה שאפשר לקרוא ולשנות בקוד.",
          connects: "React בונה tree ומסנכרן אותו עם DOM אמיתי.",
        },
        {
          year: "1995",
          name: "JavaScript",
          builtFrom: "פונקציות, objects, prototypes ו-event loop",
          breakthrough: "שפה דינמית שרצה בתוך הדפדפן.",
          connects: "כל מה שלומדים כאן על array/function/object מופיע ישירות ב-JS.",
        },
        {
          year: "2009-2012",
          name: "Node.js ו-TypeScript",
          builtFrom: "V8/event loop בצד שרת + type checker מעל JS",
          breakthrough: "JS יצאה מהדפדפן; TypeScript הוסיף חוזים לקוד גדול.",
          connects: "אותה שפה יכולה לבנות UI, שרת, CLI וכלי build.",
        },
      ],
    },
    {
      id: "frameworks",
      title: "אולם 8 — Frameworks הם שפה על שפה",
      period: "2010-היום",
      thesis: "Framework לא מחליף שפה. הוא אוסף חוקים, תבניות וכלים מעל אבני הבסיס.",
      visit: "השתמש באולם הזה כדי להסביר למה React/Next דורשים הבנת JS.",
      value: "הערך: לבנות מוצר מהר יותר בעזרת קומפוננטות, routing, build tools וזרימת UI מסודרת.",
      tradeoff: "המחיר: Framework בלי JS בסיסי הופך לקסם; צריך לדעת מה הכלי מסתיר.",
      artifact: "מה לראות: component tree, state, diff, dev server, routing ו-data loading.",
      courseLink: "חיבור לקורס: React components, props, state, map, routing, Vite ו-Next.",
      subMuseums: [
        {
          title: "גלריית קומפוננטות",
          focus: "איך UI גדול מתפרק לפונקציות קטנות עם props ו-state.",
          evolvedTo: "React, component systems, state-driven screens וחשיבה על tree.",
          experience: "פרק מסך לשלושה רכיבים וכתוב איזה props כל אחד צריך לקבל.",
        },
        {
          title: "מעבדת build ו-routing",
          focus: "איך כלי פיתוח הופכים קבצי קוד למוצר שרץ בדפדפן ובשרת.",
          evolvedTo: "Vite, routing, server rendering, data loading ו-Next.js.",
          experience: "עקוב מנתיב URL אל component, משם ל-data loading, ואז למסך.",
        },
      ],
      exhibits: [
        {
          year: "2013",
          name: "React",
          builtFrom: "פונקציות JS + state + tree + diff",
          breakthrough: "UI כתלות של state, עם קומפוננטות קטנות.",
          connects: "Component הוא פונקציה שמחזירה תיאור UI.",
        },
        {
          year: "2016-היום",
          name: "Vite וכלי build מודרניים",
          builtFrom: "ES modules, dev server, bundling ו-transform",
          breakthrough: "פיתוח מהיר יותר וחבילות קטנות יותר כשמודדים נכון.",
          connects: "import/export הם אבני שפה שהפכו לארכיטקטורת build.",
        },
        {
          year: "2016-היום",
          name: "Next.js",
          builtFrom: "React + routing + server rendering + data loading",
          breakthrough: "מוצר web מלא סביב עמודים, שרת ולקוח.",
          connects: "תפריט Next עדיין מתחיל מ-array של פריטים ו-map.",
        },
      ],
    },
    {
      id: "future",
      title: "אולם 9 — בטיחות, WASM ו-AI",
      period: "2015-היום",
      thesis: "הדור החדש מנסה לשלב ביצועים, בטיחות, ניידות ועזרה חכמה בלי לאבד הבנה בסיסית.",
      visit: "סיים כאן כדי להראות למה אבני בסיס נשארות רלוונטיות גם עם AI.",
      value: "הערך: לשלב בטיחות, ביצועים ועזרת AI בלי לוותר על בדיקה והבנת בסיס.",
      tradeoff: "המחיר: כלים חכמים מקצרים זמן, אבל בלי חוזים ובדיקות הם עלולים להסתיר שגיאות.",
      artifact: "מה לראות: WASM, AI-assisted coding, DSLs, בדיקות וקוד שמסביר את עצמו.",
      courseLink: "חיבור לקורס: debugging, testing, code review, architecture והערכת תשובות AI.",
      subMuseums: [
        {
          title: "אולם WASM וביצועים",
          focus: "איך web חוזר לשאלות של bytecode, זיכרון ושפות native.",
          evolvedTo: "WebAssembly, Rust/C/C++ ב-web וחלוקת עבודה בין JS לקוד ביצועי.",
          experience: "בחר חלק במוצר ושאל: האם הוא צריך מהירות native או ש-JS מספיק ברור.",
        },
        {
          title: "מעבדת AI וקוד מבוקר",
          focus: "איך עזרת AI מחזקת מתכנת שמבין בסיס, בדיקות ו-debugging.",
          evolvedTo: "AI-assisted coding, code review, tests וכתיבה עם חוזים ברורים.",
          experience: "תן ל-AI רעיון ואז בדוק אותו דרך קריאת קוד, בדיקות והסבר סיבתי.",
        },
      ],
      exhibits: [
        {
          year: "2015-היום",
          name: "WebAssembly",
          builtFrom: "bytecode portable שרץ בדפדפן ובסביבות נוספות",
          breakthrough: "שפות כמו C/C++/Rust יכולות להגיע לביצועים גבוהים ב-web.",
          connects: "גם ב-web חוזרים לשאלות של זיכרון, טיפוסים וקומפילציה.",
        },
        {
          year: "2020s",
          name: "AI-assisted coding",
          builtFrom: "מודלי שפה + הקשר קוד + בדיקות",
          breakthrough: "ה-AI מאיץ כתיבה והסבר, אבל לא מבטל צורך בהבנה.",
          connects: "מי שמבין אבני בסיס יודע לבדוק שה-AI לא המציא פתרון שביר.",
        },
        {
          year: "המשך",
          name: "DSLs ושפות תחום",
          builtFrom: "תחביר קטן סביב בעיה אחת",
          breakthrough: "לפעמים בונים שפה קטנה במקום ספרייה גדולה.",
          connects: "JSON, regex, SQL ו-CSS הם תזכורת ששפה היא כלי לפתרון תחום.",
        },
      ],
    },
  ];

  const PROGRAMMING_LANGUAGE_LINEAGES = [
    {
      title: "שושלת קרובה לחומרה",
      path: ["טרנזיסטור", "קוד מכונה", "Assembly", "BCPL", "B", "C", "C++ / Rust"],
      lesson: "ככל שיורדים שכבה, מקבלים שליטה ומהירות; ככל שעולים, מקבלים קריאות ובטיחות.",
      today: "בחר C/Rust כששליטה בזיכרון וביצועים הם חלק מהבעיה, לא רק סקרנות.",
    },
    {
      title: "שושלת אובייקטים",
      path: ["Simula", "Smalltalk", "C++", "Java", "C#", "Component models"],
      lesson: "אובייקט הוא ניסיון לארוז נתונים ופעולות ביחידה אחת עם גבולות ברורים.",
      today: "בחר OOP כשיש ישויות מתמשכות עם state והתנהגות, לא רק פונקציה קצרה.",
    },
    {
      title: "שושלת ה-web",
      path: ["HTML", "DOM", "JavaScript", "Node.js", "TypeScript", "React", "Next.js"],
      lesson: "ה-web בנוי מעץ, אירועים ופונקציות שמגיבות לשינוי state.",
      today: "למד קודם JS data structures; אחר כך React נראה כמו שימוש מאורגן באותן אבנים.",
    },
    {
      title: "שושלת מדע ו-AI",
      path: ["FORTRAN", "Lisp", "Python", "NumPy", "PyTorch", "AI tools"],
      lesson: "שפות מצליחות כשהן מורידות חיכוך מתחום עבודה אמיתי.",
      today: "Python איטית בליבה שלה, אבל חזקה כי היא מפעילה ספריות native מהירות.",
    },
    {
      title: "שושלת נתונים ועסקים",
      path: ["COBOL", "Files", "SQL", "JSON", "APIs", "Data apps"],
      lesson: "רוב התוכנה בעולם היא העברת נתונים, אימות נתונים והצגת נתונים.",
      today: "לפני UI מרשים, תכנן מבנה נתונים פשוט, ברור וניתן לבדיקה.",
    },
  ];

  const PROGRAMMING_MUSEUM_GUIDED_ROUTES = [
    {
      id: "starter",
      title: "מסלול מתחילים",
      subtitle: "מהחומרה ועד שפה גבוהה, כדי להבין למה קוד בכלל עובד.",
      stops: ["hardware", "machine", "early-high-level", "structured"],
    },
    {
      id: "exam",
      title: "מסלול לפני מבחן",
      subtitle: "התחנות שמחזקות scope, זיכרון, DOM, React ופשרות ביצועים.",
      stops: ["structured", "c-systems", "web", "frameworks"],
    },
    {
      id: "fullstack",
      title: "מסלול React / Full-Stack",
      subtitle: "הדרך מה-data shape ועד UI, שרת, build tools ועזרת AI מבוקרת.",
      stops: ["early-high-level", "objects-vm", "web", "frameworks", "future"],
    },
  ];

  const PROGRAMMING_MUSEUM_VALUE_MAP = [
    {
      family: "קרוב לחומרה",
      halls: ["hardware", "machine", "c-systems"],
      tradeoff: "יותר מהירות ושליטה, יותר אחריות על זיכרון ופרטים נמוכים.",
      focus: "השתמש במשפחה הזו כדי להבין ביצועים, כתובות, מערכים ומחיר של שכבות.",
    },
    {
      family: "קריאות ומבנה",
      halls: ["early-high-level", "structured"],
      tradeoff: "יותר כוונה אנושית ומבנה, אבל צריך להבין מה ה-compiler מסתיר.",
      focus: "המשפחה הזו מחזקת expression, function, scope וגבולות של קוד.",
    },
    {
      family: "Runtime מנוהל",
      halls: ["objects-vm"],
      tradeoff: "יותר בטיחות ונוחות, פחות שליטה ישירה על זמן ריצה וזיכרון.",
      focus: "כאן מתחדדים class, object, GC, JIT וההבדל בין תחביר להתנהגות runtime.",
    },
    {
      family: "Web ו-Frameworks",
      halls: ["web", "frameworks"],
      tradeoff: "יותר מהירות פיתוח וחוויית מוצר, יותר תלות בכללים ובכלי build.",
      focus: "המשפחה הזו מחברת DOM, events, state, React, Node, Vite ו-Next.",
    },
    {
      family: "בטיחות וכלים חכמים",
      halls: ["future"],
      tradeoff: "יותר עזרה ובטיחות, אבל חובה לבדוק, להבין ולתחזק את התוצאה.",
      focus: "כאן מסכמים WASM, AI-assisted coding, DSLs והצורך ב-debugging ובדיקות.",
    },
  ];

  const FULL_STACK_MUSEUM_FLOW = [
    {
      title: "מסך",
      detail: "HTML, CSS, React",
      signal: "מה המשתמש רואה ועושה",
    },
    {
      title: "אירוע",
      detail: "DOM, state, handlers",
      signal: "מה השתנה בעקבות פעולה",
    },
    {
      title: "בקשה",
      detail: "fetch, HTTP, REST",
      signal: "איזה חוזה נשלח לשרת",
    },
    {
      title: "שרת",
      detail: "Node, Express, middleware",
      signal: "מי בודק, מעבד ומחזיר תשובה",
    },
    {
      title: "מידע",
      detail: "Database, MongoDB, Mongoose",
      signal: "מה נשמר אחרי הרענון הבא",
    },
    {
      title: "איכות",
      detail: "debugging, tests, review",
      signal: "איך יודעים שזה לא נשבר",
    },
  ];

  const MUSEUM_STACK_LAYER_PAGE_VERSION = "museum-connection-system-v1";

  const PROGRAMMING_STACK_LAYER_MUSEUMS = [
    {
      id: "electricity",
      title: "מוזיאון החשמל והמתגים",
      blockTitle: "חשמל",
      detail: "מתח, זרם, טרנזיסטור",
      accent: "#fbbf24",
      era: "analog",
      thesis: "כאן התלמיד רואה שהמחשב מתחיל מתופעה פיזית: מעבר או חסימה של אות. בלי השכבה הזו אין ביט, אין זיכרון ואין פקודה.",
      inventedBecause: "היה צריך דרך יציבה להפוך אנרגיה פיזית לסימן שאפשר לקרוא שוב ושוב באותה צורה.",
      solved: "במקום החלטה אנושית או פעולה מכנית איטית, המעגל נותן מעבר מהיר בין מצב נמוך למצב גבוה.",
      evolvedTo: "שערים לוגיים, ביטים, זיכרון, מעבדים וכל מה שמעליהם.",
      pathway: ["אנרגיה", "אות", "מתג", "שער לוגי", "ביט", "זיכרון"],
      rooms: [
        {
          id: "voltage-current",
          title: "אולם מתח וזרם",
          what: "מציג איך אות חשמלי יכול לייצג מצב שמחשב מסוגל לקרוא.",
          evolvedTo: "אותות יציבים שמאפשרים לבנות שערים לוגיים.",
          diagram: ["מקור אנרגיה", "אות", "סף החלטה"],
          categories: [
            { name: "קטגוריות", items: ["מתח", "זרם", "אות נמוך/גבוה"] },
            { name: "תתי קטגוריות", items: ["יציבות אות", "רעש", "גבול החלטה"] },
          ],
          experience: "חוויה ישנה-מעבדתית: לוח שחור, קווי נחושת וזוהר עדין שמראה מתי אות עובר.",
          video: {
            title: "איך חשמל הופך לסימן",
            prerequisite: "לדעת שהמחשב עובד עם שני מצבים עיקריים: 0 ו-1.",
            prompt: "צור סרטון מוזיאוני בעברית שמראה אות חשמלי עובר ממקור אנרגיה אל סף החלטה. הסבר איך מצב נמוך ומצב גבוה הופכים לסימן שהמחשב יכול לקרוא בלי להמציא תאריכים או עובדות היסטוריות.",
          },
        },
        {
          id: "transistor-switch",
          title: "אולם הטרנזיסטור כמתג",
          what: "מסביר למה מתג זעיר הוא רעיון יסודי: הוא מאפשר לשלוט באות באמצעות אות אחר.",
          evolvedTo: "מעגלים שמרכיבים שערים, זיכרון ויחידות חישוב.",
          diagram: ["אות בקרה", "פתיחה/חסימה", "פלט"],
          categories: [
            { name: "קטגוריות", items: ["מתג", "בקרה", "פלט"] },
            { name: "תתי קטגוריות", items: ["מצב פתוח", "מצב חסום", "שרשור מתגים"] },
          ],
          experience: "חוויה של חדר מכונות ותיק: כל לחיצה מדליקה מסלול ומראה איך החלטה קטנה מפעילה החלטה אחרת.",
          video: {
            title: "המתג שבונה מחשב",
            prerequisite: "להכיר את הרעיון של תנאי: אם קורה משהו, אז קורה משהו אחר.",
            prompt: "צור סרטון בעברית שבו טרנזיסטור מוצג כמתג נשלט. הראה אות בקרה, מעבר או חסימה של אות, והסבר למה זה פתר את הצורך לבנות החלטות מהירות בתוך מחשב.",
          },
        },
        {
          id: "logic-gates",
          title: "אולם שערים לוגיים",
          what: "מחבר בין מתגים לבין החלטות בסיסיות שהקוד משתמש בהן: וגם, או, לא.",
          evolvedTo: "יחידות חישוב, תנאים, פעולות בינאריות ומבני בקרה.",
          diagram: ["מתגים", "שער", "החלטה"],
          categories: [
            { name: "קטגוריות", items: ["AND", "OR", "NOT"] },
            { name: "תתי קטגוריות", items: ["קלטים", "פלט", "טבלת אמת"] },
          ],
          experience: "חוויה אינטראקטיבית: תלמיד משנה שני קלטים ורואה איך החלטה לוגית אחת משנה את כל המסלול.",
          video: {
            title: "שערים לוגיים בלי פחד",
            prerequisite: "להבין true/false או כן/לא.",
            prompt: "צור סרטון קצר בעברית שמסביר שערים לוגיים דרך דלתות ואורות: AND דורש שני קלטים, OR מספיק קלט אחד, NOT הופך מצב. קשר את זה לתנאים בקוד.",
          },
        },
      ],
    },
    {
      id: "bit-byte",
      title: "מוזיאון הביטים והבתים",
      blockTitle: "ביט / Byte",
      detail: "0/1, קבוצות ביטים",
      accent: "#34d399",
      era: "logic",
      thesis: "הביט הוא נקודת המעבר מהעולם הפיזי לעולם הסימנים. Byte וקבוצות ביטים מאפשרים לייצג מספרים, תווים ומידע מורכב יותר.",
      inventedBecause: "מחשב צריך יחידת מידע קטנה וברורה שאפשר לשמור, להעביר ולשלב.",
      solved: "במקום לעבוד עם אות בודד בלבד, קבוצות ביטים נותנות דרך לבנות ערכים שאפשר לפרש.",
      evolvedTo: "קידוד, זיכרון, קבצים, טיפוסים ומבני נתונים.",
      pathway: ["0/1", "Bit", "Byte", "ערך", "טיפוס", "מבנה נתונים"],
      rooms: [
        {
          id: "single-bit",
          title: "אולם הביט הבודד",
          what: "מראה איך מצב אחד יכול להפוך לתשובה: כן או לא, דולק או כבוי, אמת או שקר.",
          evolvedTo: "בוליאנים, flags ותנאים בקוד.",
          diagram: ["אות", "0/1", "החלטה"],
          categories: [
            { name: "קטגוריות", items: ["0", "1", "boolean"] },
            { name: "תתי קטגוריות", items: ["מצב", "סימון", "בדיקה"] },
          ],
          experience: "חוויה מינימליסטית: חדר חשוך עם שני מצבים בלבד, כדי להרגיש כמה כוח יש להחלטה אחת.",
          video: {
            title: "ביט אחד, החלטה אחת",
            prerequisite: "להכיר תנאי if ברמה בסיסית.",
            prompt: "צור סרטון בעברית שמסביר ביט כיחידת החלטה. הראה מעבר מאור כבוי/דולק אל 0/1, ואז חבר את זה ל-boolean ולתנאי if בקוד.",
          },
        },
        {
          id: "byte-encoding",
          title: "אולם Byte וקידוד",
          what: "מסביר למה מקבצים ביטים: כדי לקבל יותר אפשרויות ולייצג ערכים שאדם מבין.",
          evolvedTo: "תווים, מספרים, קבצים והעברת מידע.",
          diagram: ["ביטים", "קבוצה", "פירוש"],
          categories: [
            { name: "קטגוריות", items: ["Byte", "מספר", "תו"] },
            { name: "תתי קטגוריות", items: ["קידוד", "טווח ערכים", "פירוש לפי הקשר"] },
          ],
          experience: "חוויה של ארכיון: מדפים של קבוצות ביטים, וכל מדף מקבל משמעות אחרת לפי הפירוש.",
          video: {
            title: "למה צריך Byte",
            prerequisite: "להבין שביט אחד נותן שתי אפשרויות בלבד.",
            prompt: "צור סרטון מוזיאוני בעברית שמראה איך כמה ביטים יחד יכולים לייצג מספר או תו. הדגש שהמשמעות מגיעה מהקידוד ומההקשר.",
          },
        },
        {
          id: "value-type",
          title: "אולם ערך וטיפוס",
          what: "מחבר בין ביטים לבין הקורס: אותו מידע גולמי יכול להתנהג אחרת אם מתייחסים אליו כמספר, טקסט או אמת/שקר.",
          evolvedTo: "משתנים, מערכים, אובייקטים ובדיקות תקינות.",
          diagram: ["ביטים", "טיפוס", "פעולה מותרת"],
          categories: [
            { name: "קטגוריות", items: ["number", "string", "boolean"] },
            { name: "תתי קטגוריות", items: ["המרה", "השוואה", "שגיאת טיפוס"] },
          ],
          experience: "חוויה של שולחן מיון: אותו כרטיס מידע נכנס לקופסאות שונות ומקבל כללים שונים.",
          video: {
            title: "איך ביטים הופכים לטיפוסים",
            prerequisite: "להכיר משתנה וערך.",
            prompt: "צור סרטון בעברית שמסביר שטיפוס הוא חוזה על מה מותר לעשות עם ערך. הראה number, string ו-boolean, והסבר למה זה מונע בלבול בקוד.",
          },
        },
      ],
    },
    {
      id: "machine-code",
      title: "מוזיאון קוד המכונה",
      blockTitle: "קוד מכונה",
      detail: "opcode, register, memory",
      accent: "#22d3ee",
      era: "machine",
      thesis: "קוד מכונה הוא האזור שבו הוראות הופכות לפעולות ממשיות של המעבד: הזזת ערכים, חישוב, קפיצה וקריאה מזיכרון.",
      inventedBecause: "המעבד צריך הוראות מדויקות וקצרות שמגדירות מה לעשות בכל צעד.",
      solved: "במקום לתאר רצון אנושי, קוד מכונה נותן למעבד רצף פעולות חד-משמעי.",
      evolvedTo: "Assembly, compilers, runtimes וכלי debugging שמסתירים חלק מהפרטים.",
      pathway: ["opcode", "register", "memory", "instruction", "execution"],
      rooms: [
        {
          id: "opcode",
          title: "אולם opcode והוראה",
          what: "מציג פקודה כיחידה קטנה: מה הפעולה ומה הנתונים שהיא צריכה.",
          evolvedTo: "פקודות Assembly, compiler output והבנת ביצועים.",
          diagram: ["פקודה", "אופרנדים", "פעולה"],
          categories: [
            { name: "קטגוריות", items: ["opcode", "operand", "instruction"] },
            { name: "תתי קטגוריות", items: ["חישוב", "העברה", "קפיצה"] },
          ],
          experience: "חוויה של לוח פקודות ישן: כל כרטיס קצר, קשיח ומדויק.",
          video: {
            title: "מהי פקודת מכונה",
            prerequisite: "להכיר פעולה פשוטה כמו חיבור או השמה.",
            prompt: "צור סרטון בעברית שמראה הוראה קצרה של מעבד: opcode אומר מה עושים, אופרנדים אומרים עם מה עובדים. קשר את זה לשורה בקוד גבוה שמתורגמת להרבה צעדים קטנים.",
          },
        },
        {
          id: "register-memory",
          title: "אולם רגיסטר וזיכרון",
          what: "מסביר למה המעבד עובד עם מקומות מהירים קטנים ועם זיכרון רחב יותר.",
          evolvedTo: "ניהול זיכרון, משתנים, stack/heap והבנת מערכים.",
          diagram: ["רגיסטר", "כתובת", "זיכרון"],
          categories: [
            { name: "קטגוריות", items: ["register", "address", "memory"] },
            { name: "תתי קטגוריות", items: ["קריאה", "כתיבה", "גישה לפי כתובת"] },
          ],
          experience: "חוויה של מחסן ורכבת: הרגיסטר הוא תחנה מהירה, הזיכרון הוא מדפים גדולים יותר.",
          video: {
            title: "איפה הערך נמצא",
            prerequisite: "להכיר משתנה ומערך.",
            prompt: "צור סרטון מוזיאוני בעברית שמסביר רגיסטר וזיכרון דרך תחנה ומחסן. הראה קריאה, כתיבה וכתובת, ואז קשר את זה למשתנה ולמערך בקוד.",
          },
        },
        {
          id: "execution-loop",
          title: "אולם לולאת הביצוע",
          what: "מראה שקוד רץ כשרשרת צעדים: להביא הוראה, לפענח, לבצע, להמשיך.",
          evolvedTo: "debugger, stepping, breakpoints והבנת stack trace.",
          diagram: ["fetch", "decode", "execute"],
          categories: [
            { name: "קטגוריות", items: ["שליפה", "פענוח", "ביצוע"] },
            { name: "תתי קטגוריות", items: ["סדר", "קפיצה", "מעקב"] },
          ],
          experience: "חוויה של מסוע תעשייתי: כל תחנה עושה דבר אחד, והקוד מתקדם צעד אחרי צעד.",
          video: {
            title: "איך מעבד מריץ רצף",
            prerequisite: "להכיר סדר פעולות ולולאה.",
            prompt: "צור סרטון בעברית שמציג fetch, decode, execute כמסוע. הסבר למה debugger שמתקדם שורה-שורה עוזר להבין את שרשרת הביצוע.",
          },
        },
      ],
    },
    {
      id: "language",
      title: "מוזיאון השפה",
      blockTitle: "שפה",
      detail: "syntax, compiler, runtime",
      accent: "#a78bfa",
      era: "language",
      thesis: "שפה היא שכבת תרגום שמאפשרת לאדם לתאר כוונה, והכלים מתרגמים אותה לצעדים שמחשב מסוגל לבצע.",
      inventedBecause: "כתיבה ישירה של הוראות נמוכות קשה מדי ללמידה, תחזוקה ושיתוף בין אנשים.",
      solved: "שפה נותנת מילים, מבנה וכללים שמאפשרים לחשוב על בעיה במקום על כל צעד מכונה.",
      evolvedTo: "טיפוסים, מודולים, runtimes, frameworks וכלי בדיקה.",
      pathway: ["תחביר", "מבנה", "תרגום", "runtime", "ספריות"],
      rooms: [
        {
          id: "syntax-parser",
          title: "אולם תחביר וניתוח",
          what: "מסביר למה למחשב חשוב מבנה מדויק: סוגריים, שמות, סדר ומילות מפתח.",
          evolvedTo: "שגיאות syntax, parsers וכלי lint.",
          diagram: ["טקסט", "כללים", "מבנה קוד"],
          categories: [
            { name: "קטגוריות", items: ["syntax", "statement", "expression"] },
            { name: "תתי קטגוריות", items: ["סוגריים", "שם", "סדר"] },
          ],
          experience: "חוויה של ספרייה עתיקה: כל משפט חייב להיות מסודר כדי שהמתרגם יבין אותו.",
          video: {
            title: "למה syntax כל כך קפדן",
            prerequisite: "להכיר שורת קוד, סוגריים ושם משתנה.",
            prompt: "צור סרטון בעברית שמראה קוד כמשפט עם דקדוק. הסבר למה פסיק, סוגר או שם לא נכון יכולים לעצור את התרגום.",
          },
        },
        {
          id: "compiler-runtime",
          title: "אולם compiler ו-runtime",
          what: "מראה את ההבדל בין תרגום הקוד לבין הסביבה שמריצה אותו בפועל.",
          evolvedTo: "Node.js, browser runtime, build tools וכלי debugging.",
          diagram: ["קוד", "תרגום", "הרצה"],
          categories: [
            { name: "קטגוריות", items: ["compiler", "interpreter", "runtime"] },
            { name: "תתי קטגוריות", items: ["בדיקת קוד", "ביצוע", "שגיאת runtime"] },
          ],
          experience: "חוויה של תא תרגום: צד אחד קורא כוונה אנושית, צד שני מפעיל מכונה.",
          video: {
            title: "מי מתרגם ומי מריץ",
            prerequisite: "להבין שקוד צריך לעבור תהליך לפני או בזמן הרצה.",
            prompt: "צור סרטון מוזיאוני בעברית שמבדיל בין compiler, interpreter ו-runtime. קשר את זה לדפדפן ול-Node.js בלי להוסיף תאריכים.",
          },
        },
        {
          id: "abstractions",
          title: "אולם הפשטות: פונקציה, scope וטיפוס",
          what: "מחבר את השפה לקורס: פונקציות, scope וטיפוסים מקטינים עומס ומונעים טעויות.",
          evolvedTo: "מודולים, קומפוננטות, hooks וארכיטקטורת קוד.",
          diagram: ["רעיון", "שם", "חוזה"],
          categories: [
            { name: "קטגוריות", items: ["function", "scope", "type"] },
            { name: "תתי קטגוריות", items: ["קלט/פלט", "גבולות", "שימוש חוזר"] },
          ],
          experience: "חוויה של סטודיו מודרני: קוביות קוד מסודרות שמתחברות בלי לחשוף את כל החיווט.",
          video: {
            title: "הפשטה שמורידה עומס",
            prerequisite: "להכיר פונקציה ומשתנה.",
            prompt: "צור סרטון בעברית שמסביר איך function, scope ו-type עוזרים לאדם לחשוב ביחידות גדולות יותר. הראה מה הם מסתירים ומה המחיר: צריך להבין את הכללים.",
          },
        },
      ],
    },
    {
      id: "framework",
      title: "מוזיאון ה-Frameworks",
      blockTitle: "Framework",
      detail: "React, Node, Next",
      accent: "#fb7185",
      era: "framework",
      thesis: "Framework הוא שכבה שמוסיפה כללי עבודה. הוא לא מחליף שפה, אלא מארגן אותה סביב דפוס מוכר לבניית מוצר.",
      inventedBecause: "כשהאפליקציות גדלו, צוותים היו צריכים מבנה קבוע למסכים, נתיבים, state וכלי build.",
      solved: "במקום שכל צוות ימציא מחדש סדר עבודה, framework נותן תבניות, מוסכמות וחיבור בין חלקים.",
      evolvedTo: "קומפוננטות, routing, dev servers, build pipelines ואפליקציות Full-Stack.",
      pathway: ["ספרייה", "כללים", "קומפוננטה", "route", "build", "מוצר"],
      rooms: [
        {
          id: "rules-vs-library",
          title: "אולם ספרייה מול Framework",
          what: "מסביר את הפשרה: ספרייה נותנת כלי, framework נותן דרך עבודה.",
          evolvedTo: "מבני פרויקט, conventions וצוותים שעובדים באותו סגנון.",
          diagram: ["כלי", "כללים", "פרויקט"],
          categories: [
            { name: "קטגוריות", items: ["library", "framework", "convention"] },
            { name: "תתי קטגוריות", items: ["בחירה חופשית", "מבנה מחייב", "תחזוקה"] },
          ],
          experience: "חוויה של עיר עתידנית: הכל מואר ומסודר, אבל צריך לנסוע לפי הכבישים של העיר.",
          video: {
            title: "למה Framework נותן כללים",
            prerequisite: "להכיר פונקציה, מודול וייבוא קוד.",
            prompt: "צור סרטון בעברית שמסביר את ההבדל בין library ל-framework. הדגש ש-framework פותר סדר ותחזוקה, אבל מוסיף כללים שצריך ללמוד.",
          },
        },
        {
          id: "components-routes",
          title: "אולם קומפוננטות ונתיבים",
          what: "מראה איך UI גדול מתפרק למסכים, קומפוננטות ונתיבי ניווט.",
          evolvedTo: "React components, routing, layouts ומערכות עמודים.",
          diagram: ["מסך", "קומפוננטה", "נתיב"],
          categories: [
            { name: "קטגוריות", items: ["component", "props", "route"] },
            { name: "תתי קטגוריות", items: ["state", "layout", "navigation"] },
          ],
          experience: "חוויה של מפה דיגיטלית: כל חדר הוא route, וכל מוצג הוא קומפוננטה שמקבלת נתונים.",
          video: {
            title: "איך React מסדר מסך",
            prerequisite: "להכיר HTML, function ו-object.",
            prompt: "צור סרטון מוזיאוני בעברית שמראה מסך מתפרק לקומפוננטות. הסבר props, state ו-route דרך מוזיאון שבו כל חדר הוא עמוד.",
          },
        },
        {
          id: "build-runtime-tools",
          title: "אולם כלי Build ו-runtime מודרני",
          what: "מסביר למה פרויקט מודרני צריך dev server, bundling, בדיקות והרצה עקבית.",
          evolvedTo: "Vite, Next.js, pipelines ואוטומציה לפני שחרור.",
          diagram: ["קוד מקור", "build", "הרצה"],
          categories: [
            { name: "קטגוריות", items: ["dev server", "bundle", "deploy"] },
            { name: "תתי קטגוריות", items: ["hot reload", "assets", "environment"] },
          ],
          experience: "חוויה עתידנית: מסוע אור שמקבל קוד מקור ומוציא מוצר מוכן לבדיקה.",
          video: {
            title: "מה קורה בין קוד למסך",
            prerequisite: "להכיר קבצים, import והרצת npm script.",
            prompt: "צור סרטון בעברית שמסביר dev server, build ו-deploy כשלבים בין קוד מקור למוצר שרץ. הדגש מה כל שלב פותר למפתח.",
          },
        },
      ],
    },
    {
      id: "application",
      title: "מוזיאון האפליקציה",
      blockTitle: "אפליקציה",
      detail: "מסך, נתונים, פעולה",
      accent: "#f472b6",
      era: "product",
      thesis: "אפליקציה היא המקום שבו כל השכבות פוגשות משתמש אמיתי: מסך, פעולה, נתונים, שגיאות, מדידה ושיפור.",
      inventedBecause: "משתמש צריך לבצע פעולה בעולם האמיתי בלי להבין חשמל, ביטים, קוד מכונה או frameworks.",
      solved: "האפליקציה אורזת את כל השכבות לחוויה אחת שאפשר להשתמש בה, לבדוק, לשחרר ולשפר.",
      evolvedTo: "מוצרי Full-Stack, dashboards, שירותים עסקיים, גרסאות ומערכות מדידה.",
      pathway: ["צורך", "מסך", "פעולה", "API", "מידע", "שיפור"],
      rooms: [
        {
          id: "screen-data-action",
          title: "אולם מסך-נתונים-פעולה",
          what: "מראה שכל מוצר טוב בנוי סביב שאלה פשוטה: מה המשתמש רואה, מה הוא עושה, ומה משתנה.",
          evolvedTo: "flows, forms, dashboards וניהול state.",
          diagram: ["מסך", "פעולה", "תוצאה"],
          categories: [
            { name: "קטגוריות", items: ["UI", "state", "feedback"] },
            { name: "תתי קטגוריות", items: ["טופס", "כפתור", "הודעת שגיאה"] },
          ],
          experience: "חוויה מוצרית: תלמיד לוחץ על פעולה ורואה איזה מידע זז בכל השכבות.",
          video: {
            title: "הפעולה שמפעילה מוצר",
            prerequisite: "להכיר כפתור, event ו-state.",
            prompt: "צור סרטון בעברית שמראה משתמש לוחץ על כפתור, UI מגיב, state משתנה והמערכת מציגה תוצאה. הסבר למה אפליקציה היא חיבור בין מסך, נתונים ופעולה.",
          },
        },
        {
          id: "client-server-data",
          title: "אולם Client-Server-Data",
          what: "מסביר איך פעולה במסך הופכת לבקשת API, עיבוד בשרת ושמירה במסד נתונים.",
          evolvedTo: "ארכיטקטורת Full-Stack, הרשאות, ולידציה ושכבות שירות.",
          diagram: ["Client", "API", "Server", "Database"],
          categories: [
            { name: "קטגוריות", items: ["fetch", "route", "database"] },
            { name: "תתי קטגוריות", items: ["validation", "status", "response"] },
          ],
          experience: "חוויה של מרכז שליטה: קו אחד עובר מהמסך לשרת, למסד הנתונים וחזרה.",
          video: {
            title: "איך פעולה מגיעה למסד נתונים",
            prerequisite: "להכיר fetch, HTTP ו-object.",
            prompt: "צור סרטון מוזיאוני בעברית שמראה בקשה מהלקוח לשרת ולמסד נתונים. הסבר מה כל שכבה עושה ומה היא פותרת בדרך.",
          },
        },
        {
          id: "release-feedback",
          title: "אולם שחרור, מדידה ושדרוג",
          what: "מחבר את המוזיאון לעסק: אחרי הפיתוח צריך לבדוק, לשחרר, למדוד ולשדרג לפי בעיות אמיתיות.",
          evolvedTo: "גרסאות מוצר, תיקוני באגים, שיפור UX והחלטה מתי לבנות מחדש.",
          diagram: ["בדיקה", "שחרור", "מדידה", "שדרוג"],
          categories: [
            { name: "קטגוריות", items: ["QA", "release", "analytics"] },
            { name: "תתי קטגוריות", items: ["bug", "feedback", "version"] },
          ],
          experience: "חוויה של חדר מצב עסקי: לוח מדדים מראה מתי לתקן, מתי לשדרג ומתי להחליף חלק במוצר.",
          video: {
            title: "מה קורה אחרי שהקוד עובד",
            prerequisite: "להכיר בדיקה, bug וגרסה.",
            prompt: "צור סרטון בעברית שמסביר את שלבי אחרי הפיתוח: QA, שחרור, מדידה, feedback ושדרוג גרסה. הדגש שמוצר לא נגמר כשהקוד רץ.",
          },
        },
      ],
    },
  ];

  const MUSEUM_CONCEPT_CONNECTIONS = [
    {
      id: "boolean-decision",
      title: "Boolean והחלטה",
      stackLayer: "bit-byte",
      relatedLayers: ["electricity", "language"],
      layer: "ביט / Byte",
      builtFrom: ["אות יציב", "0/1", "true/false"],
      leadsTo: ["if", "validation", "feature flags", "state"],
      hides: "החלטה חשמלית נמוכה שנראית בקוד כמו מילה אנושית: true או false.",
      solves: "מאפשר לכתוב תנאי ברור במקום לחשוב על שערים לוגיים בכל פעולה.",
      breaksWhen: "מערבבים אמת/שקר עם טקסט, מספר או ערך חסר בלי לבדוק מה באמת התקבל.",
      whereInCourse: ["תנאים", "השוואות", "validation", "שאלות מאמן על if"],
      whereInCode: ["if (isReady)", "return user.active === true", "disabled={!isValid}"],
      question: "איזה ערך באמת נכנס לתנאי: boolean, string, number או undefined?",
      video: {
        prerequisite: "לדעת מה זה if ומה ההבדל בין true/false לבין טקסט.",
        prompt: "צור סרטון בעברית שמראה איך החלטה חשמלית הופכת ל-boolean בקוד, ואז ל-if, validation ו-state. הדגש איפה תלמידים מתבלבלים בין ערך אמת לבין טקסט שנראה אמת.",
      },
    },
    {
      id: "value-type",
      title: "ערך וטיפוס",
      stackLayer: "bit-byte",
      relatedLayers: ["language"],
      layer: "ביט / Byte",
      builtFrom: ["Byte", "קידוד", "פירוש לפי הקשר"],
      leadsTo: ["variable", "array", "object", "JSON"],
      hides: "אותם ביטים יכולים לקבל משמעות שונה לפי טיפוס והקשר.",
      solves: "נותן לקוד כללים: מה מותר לחבר, להשוות, להציג או לשלוח.",
      breaksWhen: "מספר מגיע כ-string, אובייקט מגיע כ-null, או מערך נבדק כאילו הוא ערך יחיד.",
      whereInCourse: ["משתנים", "מערכים", "אובייקטים", "JSON"],
      whereInCode: ["Number(input.value)", "Array.isArray(items)", "typeof user.name"],
      question: "איזה טיפוס יש לערך לפני שמפעילים עליו פעולה?",
      video: {
        prerequisite: "להכיר משתנה, string, number ו-object.",
        prompt: "צור סרטון מוזיאוני בעברית שמסביר איך ערך גולמי מקבל טיפוס, למה הטיפוס קובע אילו פעולות מותרות, ואיך זה מתחבר ל-JSON ו-API.",
      },
    },
    {
      id: "memory-reference",
      title: "זיכרון, כתובת ורפרנס",
      stackLayer: "machine-code",
      relatedLayers: ["language", "application"],
      layer: "קוד מכונה",
      builtFrom: ["register", "address", "memory"],
      leadsTo: ["array index", "object reference", "immutability", "state update"],
      hides: "הקוד מדבר על שמות, אבל המחשב שומר ערכים ומצביעים במקומות בזיכרון.",
      solves: "מאפשר לשמור מידע, לגשת אליו שוב, ולהעביר מבנים גדולים בלי להעתיק הכול כל הזמן.",
      breaksWhen: "משנים object קיים במקום ליצור עותק, או מניחים ששני משתנים הם שתי ישויות נפרדות.",
      whereInCourse: ["מערכים", "אובייקטים", "immutability", "React state"],
      whereInCode: ["const next = {...user}", "items[index]", "state.todos.push(...)"],
      question: "האם הקוד שינה ערך חדש או את אותו reference?",
      video: {
        prerequisite: "להכיר object, array והשמה למשתנה.",
        prompt: "צור סרטון בעברית שמראה איך שם משתנה מסתיר כתובת או reference בזיכרון. קשר את זה ל-object, array ולמה React דורש עדכון immutable.",
      },
    },
    {
      id: "function-contract",
      title: "Function כחוזה",
      stackLayer: "language",
      relatedLayers: ["framework", "application"],
      layer: "שפה",
      builtFrom: ["שם", "קלט", "פלט", "scope"],
      leadsTo: ["callback", "handler", "middleware", "component"],
      hides: "רצף פעולות פנימי מאחורי שם אחד שאפשר להשתמש בו שוב.",
      solves: "מוריד עומס: במקום לזכור כל צעד, עובדים עם חוזה של קלט ופלט.",
      breaksWhen: "הפונקציה תלויה במצב חיצוני לא ברור, מחזירה טיפוס לא צפוי או משנה state בסתר.",
      whereInCourse: ["פונקציות", "callbacks", "closures", "handlers"],
      whereInCode: ["function total(items)", "onClick={handleSave}", "app.use(validateUser)"],
      question: "מה הפונקציה מבטיחה לקבל ומה היא מבטיחה להחזיר?",
      video: {
        prerequisite: "להכיר parameter, argument ו-return.",
        prompt: "צור סרטון בעברית שמסביר function כחוזה: קלט, עבודה פנימית, פלט ותופעות לוואי. חבר את זה ל-handler ב-React ול-middleware בשרת.",
      },
    },
    {
      id: "scope-closure",
      title: "Scope ו-Closure",
      stackLayer: "language",
      relatedLayers: ["framework"],
      layer: "שפה",
      builtFrom: ["שם משתנה", "בלוק", "function"],
      leadsTo: ["handler", "async callback", "React hooks"],
      hides: "החוקים שמחליטים איזה שם זמין באיזה מקום בזמן שהקוד רץ.",
      solves: "מונע התנגשות בין שמות ומאפשר לפונקציה לזכור הקשר שבו נוצרה.",
      breaksWhen: "callback משתמש בערך ישן, משתנה מוגדר במקום לא נכון או state נקרא לפני עדכון.",
      whereInCourse: ["Scope", "Closure", "Async", "React hooks"],
      whereInCode: ["function outer() { return () => count; }", "useEffect(() => {...}, [id])"],
      question: "מאיזה scope הערך נקרא, והאם הוא עדיין הערך הנכון?",
      video: {
        prerequisite: "להכיר function ומשתנה מקומי.",
        prompt: "צור סרטון בעברית שמראה scope כחדרים ו-closure כזיכרון של חדר קודם. הדגש למה זה חשוב ל-event handlers ול-async.",
      },
    },
    {
      id: "react-state",
      title: "React State",
      stackLayer: "framework",
      relatedLayers: ["language", "application"],
      layer: "Framework",
      builtFrom: ["variable", "event", "immutability", "render"],
      leadsTo: ["component flow", "form state", "server data", "UX feedback"],
      hides: "עדכוני DOM ידניים: React מחשב איך המסך צריך להיראות לפי state.",
      solves: "מחבר פעולה של משתמש למסך שמתעדכן בצורה צפויה.",
      breaksWhen: "שומרים אותו מידע פעמיים, משנים object ישן, או מצפים ש-setState יעדכן מיד באותה שורה.",
      whereInCourse: ["React בסיסי", "useState", "immutability", "forms"],
      whereInCode: ["const [todos, setTodos] = useState([])", "setUser({...user, name})"],
      question: "מה מקור האמת של המסך: state מקומי, props או מידע מהשרת?",
      video: {
        prerequisite: "להכיר component, event ו-object.",
        prompt: "צור סרטון מוזיאוני בעברית שמראה click משנה state, state גורם ל-render, ו-React מעדכן DOM. הדגש את המחיר: צריך לשמור מקור אמת אחד.",
      },
    },
    {
      id: "api-contract",
      title: "API כחוזה",
      stackLayer: "application",
      relatedLayers: ["framework"],
      layer: "אפליקציה",
      builtFrom: ["HTTP", "route", "method", "JSON"],
      leadsTo: ["Express route", "validation", "database query", "frontend state"],
      hides: "הלקוח לא יודע איך השרת עובד; הוא יודע רק איזה חוזה לשלוח ומה לצפות לקבל.",
      solves: "מאפשר למסך ולשרת להתפתח עם גבול ברור ביניהם.",
      breaksWhen: "ה-client שולח shape אחר, השרת מחזיר status לא ברור או validation חסר.",
      whereInCourse: ["fetch", "HTTP", "Express", "REST API"],
      whereInCode: ["fetch('/api/tasks')", "app.post('/api/users')", "res.status(400).json(...)"],
      question: "מה ה-method, הנתיב, ה-body, ה-status וה-response shape?",
      video: {
        prerequisite: "להכיר object, JSON ו-fetch.",
        prompt: "צור סרטון בעברית שמסביר API כחוזה בין Client ו-Server: method, URL, body, status ו-JSON. הראה איך חוזה לא ברור יוצר באגים.",
      },
    },
    {
      id: "database-persistence",
      title: "Database והתמדה",
      stackLayer: "application",
      relatedLayers: ["bit-byte", "machine-code"],
      layer: "אפליקציה",
      builtFrom: ["data shape", "schema", "query", "storage"],
      leadsTo: ["user accounts", "dashboards", "reports", "product analytics"],
      hides: "הפרטים של שמירה, חיפוש ושליפה כך שהמוצר לא יאבד מידע ברענון.",
      solves: "נותן זיכרון ארוך טווח למוצר, מעבר לזיכרון זמני בדפדפן או בשרת.",
      breaksWhen: "אין schema ברור, אין validation לפני שמירה, או שה-UI מניח שהשמירה הצליחה לפני תשובת השרת.",
      whereInCourse: ["MongoDB", "Mongoose", "CRUD", "server data"],
      whereInCode: ["Task.find()", "await user.save()", "schema.required"],
      question: "איזה מידע חייב להישמר, איזה מידע זמני, ואיפה מקור האמת?",
      video: {
        prerequisite: "להכיר object, API ו-async/await.",
        prompt: "צור סרטון בעברית שמסביר Database כזיכרון ארוך טווח של מוצר. קשר בין schema, validation, CRUD ותגובה חזרה ל-UI.",
      },
    },
    {
      id: "validation-chain",
      title: "Validation בכל השכבות",
      stackLayer: "application",
      relatedLayers: ["language", "framework"],
      layer: "אפליקציה",
      builtFrom: ["type", "condition", "contract", "schema"],
      leadsTo: ["form errors", "API safety", "DB integrity", "security"],
      hides: "אותה בדיקה מופיעה בכמה מקומות, אבל כל מקום מגן על גבול אחר.",
      solves: "מונע מידע שבור, משפר UX ומקטין סיכון שהשרת או המסד יקבלו קלט לא תקין.",
      breaksWhen: "בודקים רק בצד לקוח, סומכים על UI, או מחזירים שגיאה בלי הודעה שהמשתמש מבין.",
      whereInCourse: ["forms", "Express middleware", "Mongoose schema", "errors"],
      whereInCode: ["if (!email.includes('@'))", "return res.status(400)", "required: true"],
      question: "באיזו שכבה הבדיקה חייבת לקרות: UI, API, Server או DB?",
      video: {
        prerequisite: "להכיר form, condition, API ו-schema.",
        prompt: "צור סרטון בעברית שמראה validation כשרשרת הגנה: client, server, database ו-UX. הסבר למה בדיקה אחת בלבד לא מספיקה.",
      },
    },
  ];

  const MUSEUM_ACTION_XRAY_FLOW = [
    {
      layerId: "electricity",
      title: "חשמל",
      visible: "אין עדיין מסך; יש אות שעובר או נחסם.",
      code: "הקוד עוד לא קיים בשכבה הזו.",
      machine: "מתגים ושערים מאפשרים החלטה פיזית.",
      breaksWhen: "אות לא יציב גורם להחלטה לא אמינה.",
    },
    {
      layerId: "bit-byte",
      title: "Boolean",
      visible: "התלמיד רואה true/false או מצב פעיל/כבוי.",
      code: "if (isValid) { ... }",
      machine: "קבוצת ביטים מקבלת פירוש של ערך.",
      breaksWhen: "הערך נראה אמת אבל הטיפוס לא boolean.",
    },
    {
      layerId: "language",
      title: "JavaScript",
      visible: "קליק מפעיל פונקציה.",
      code: "button.addEventListener('click', handleSave)",
      machine: "runtime מריץ handler לפי event loop.",
      breaksWhen: "scope או async מחזירים ערך ישן.",
    },
    {
      layerId: "framework",
      title: "React",
      visible: "המסך מתעדכן אחרי שינוי state.",
      code: "setForm({...form, name})",
      machine: "React מחשב render חדש ומעדכן DOM.",
      breaksWhen: "state כפול או mutation מונעים render צפוי.",
    },
    {
      layerId: "application",
      title: "API ושרת",
      visible: "המשתמש רואה loading, success או error.",
      code: "await fetch('/api/users', { method: 'POST' })",
      machine: "HTTP מעביר חוזה לשרת, והשרת מחזיר status ו-JSON.",
      breaksWhen: "body לא מתאים לחוזה או שאין טיפול בשגיאה.",
    },
    {
      layerId: "application",
      title: "Database ומוצר",
      visible: "המידע נשאר גם אחרי רענון.",
      code: "await User.create(payload)",
      machine: "השרת שומר document ומחזיר תוצאה למדידה ושיפור.",
      breaksWhen: "אין schema, אין validation או אין מדידה אחרי השקה.",
    },
  ];

  const MUSEUM_DATA_JOURNEY_FLOW = [
    { layerId: "application", title: "User Input", detail: "המשתמש מזין טקסט, בחירה או פעולה." },
    { layerId: "framework", title: "UI State", detail: "המסך שומר מצב זמני כדי להגיב מהר." },
    { layerId: "language", title: "Validation", detail: "תנאים וטיפוסים בודקים שהמידע תקין." },
    { layerId: "application", title: "JSON + HTTP", detail: "המידע נארז כחוזה ונשלח לשרת." },
    { layerId: "application", title: "Server", detail: "השרת בודק הרשאה, חוקים ושגיאות." },
    { layerId: "application", title: "Database", detail: "מידע שצריך לשרוד נשמר במקור אמת." },
    { layerId: "framework", title: "Render", detail: "התשובה חוזרת למסך ומעדכנת את המשתמש." },
    { layerId: "application", title: "Analytics", detail: "אחרי השקה מודדים שימוש, שגיאות ושיפור." },
  ];

  const MUSEUM_BOUNDARY_MAP = [
    {
      title: "Client / Server",
      boundary: "מה רץ אצל המשתמש ומה רץ בסביבה נשלטת.",
      contract: "HTTP method, URL, body, status, JSON.",
      breaksWhen: "סומכים על בדיקות Client בלבד או שולחים shape לא מתועד.",
    },
    {
      title: "State / Database",
      boundary: "מה זמני במסך ומה נשמר כמקור אמת.",
      contract: "state מקומי מול schema ושמירה.",
      breaksWhen: "משתמשים ב-state כאילו הוא שמירה קבועה.",
    },
    {
      title: "Component / Page",
      boundary: "מה יחידה קטנה מציגה ומה מסך שלם מארגן.",
      contract: "props, events, layout ונתיב.",
      breaksWhen: "קומפוננטה יודעת יותר מדי על כל האפליקציה.",
    },
    {
      title: "Route / Endpoint",
      boundary: "ניווט במסך מול פעולה על שרת.",
      contract: "URL בדפדפן מול API שמחזיר נתונים.",
      breaksWhen: "מבלבלים בין עמוד למקור נתונים.",
    },
  ];

  const MUSEUM_DECISION_GUIDES = [
    {
      decision: "Array או Object",
      chooseA: "Array כשיש רשימה וסדר או פעולות map/filter.",
      chooseB: "Object כשיש ישות עם מאפיינים ושמות שדות.",
      upgradeSignal: "כשמחפשים הרבה לפי id, שקול מבנה keyed או DB query.",
    },
    {
      decision: "localStorage או Database",
      chooseA: "localStorage למידע מקומי לא קריטי בדפדפן אחד.",
      chooseB: "Database למידע משותף, מתמשך, מאובטח או עסקי.",
      upgradeSignal: "כשצריך משתמשים, סנכרון, הרשאות או שחזור מידע.",
    },
    {
      decision: "State או Server Data",
      chooseA: "State למה שקורה עכשיו במסך.",
      chooseB: "Server data למה שמגיע ממקור אמת חיצוני.",
      upgradeSignal: "כשכמה מסכים צריכים אותו מידע או צריך refresh אמין.",
    },
    {
      decision: "פונקציה או Module",
      chooseA: "פונקציה לפעולה קטנה עם חוזה ברור.",
      chooseB: "Module כשכמה פונקציות משרתות אחריות אחת.",
      upgradeSignal: "כשקובץ גדל, שמות מתחילים להתנגש או קשה לבדוק.",
    },
  ];

  const MUSEUM_ERROR_LAYER_MAP = [
    { error: "Unexpected token", layerId: "language", layer: "שפה", diagnosis: "Syntax לא חוקי או מבנה קוד שבור.", action: "בדוק סוגריים, פסיקים ומילות מפתח." },
    { error: "Cannot read properties of undefined", layerId: "language", layer: "Runtime", diagnosis: "הקוד רץ, אבל הערך לא קיים בזמן הגישה.", action: "בדוק data shape, loading ו-optional state." },
    { error: "State לא מתעדכן", layerId: "framework", layer: "Framework", diagnosis: "מקור אמת כפול, mutation או ציפייה לעדכון מיידי.", action: "צור עותק חדש ובדוק מי הבעלים של state." },
    { error: "404", layerId: "application", layer: "API", diagnosis: "הנתיב או method לא תואמים לחוזה.", action: "בדוק route, endpoint וכתובת fetch." },
    { error: "400", layerId: "application", layer: "Validation", diagnosis: "השרת דחה body לא תקין או חסר.", action: "בדוק schema, body ו-message למשתמש." },
    { error: "מידע נעלם אחרי רענון", layerId: "application", layer: "Database", diagnosis: "המידע נשמר רק בזיכרון זמני.", action: "העבר מקור אמת לשרת/DB או הגדר שמירה מקומית במפורש." },
  ];

  const MUSEUM_PORTAL_CONNECTIONS = [
    { area: "אבני בסיס", connection: "לכל אבן מוצגים נבנה מ, מוביל אל, טעות נפוצה ושכבת מוזיאון.", layer: "foundation" },
    { area: "שיעורים", connection: "בראש שיעור מוצג איפה הוא יושב במפה ומה צריך לדעת לפניו.", layer: "lesson" },
    { area: "בלוקי קוד", connection: "כל שורה יכולה לקבל תגית: syntax, runtime, DOM, API או DB.", layer: "code" },
    { area: "מאמן ידע", connection: "טעות שולחת לאולם שמסביר את שורש הטעות ולא רק לתשובה.", layer: "trainer" },
    { area: "מפת ידע", connection: "אפשר לסנן לפי שכבה: בסיס, שפה, runtime, framework, מוצר.", layer: "map" },
    { area: "Full-Stack", connection: "כל תחום מחובר לתפקיד בצוות, לשלב מוצר ולחוזה טכני.", layer: "fullstack" },
    { area: "שאלונים", connection: "אחרי פתרון מוצגת שכבת הידע שנבדקה והשאלה הבאה לחיזוק.", layer: "quiz" },
    { area: "סרטונים", connection: "כל סרטון מקבל ידע מקדים, מטרת צפייה ושאלת בדיקה.", layer: "video" },
  ];

  const MUSEUM_VIDEO_STUDIO_TRACKS = [
    {
      title: "מסלול פעולה אחת בכל השכבות",
      prerequisite: "להכיר כפתור, function, state ו-fetch.",
      prompt: "צור סרטון בעברית שעוקב אחרי לחיצה על כפתור מה-UI דרך React state, fetch, API, Server, Database וחזרה למסך. בכל תחנה הסבר מה נבנה ממה ומה עלול להישבר.",
      checkQuestion: "באיזו שכבה הטעות אם השרת החזיר 400?",
    },
    {
      title: "מסלול מידע מחליף צורה",
      prerequisite: "להכיר input, object, JSON ו-response.",
      prompt: "צור סרטון מוזיאוני בעברית שמראה נתון אחד עובר מ-input ל-state, ל-validation, ל-JSON, לשרת, למסד נתונים וחזרה ל-render.",
      checkQuestion: "מתי המידע זמני ומתי הוא מקור אמת?",
    },
    {
      title: "מסלול טעויות לפי שכבה",
      prerequisite: "להכיר syntax error, runtime error ו-HTTP status.",
      prompt: "צור סרטון בעברית שמציג שגיאות נפוצות לפי שכבה: syntax, runtime, React state, API, validation ו-database. לכל שגיאה תן סימן זיהוי ודרך בדיקה.",
      checkQuestion: "איזה סימן מבדיל בין bug ב-UI לבין bug ב-API?",
    },
    {
      title: "מסלול חוזים",
      prerequisite: "להכיר function, props, API body ו-schema.",
      prompt: "צור סרטון בעברית שמסביר שכל Full-Stack בנוי מחוזים: function input/output, component props, API contract, DB schema ו-validation rules.",
      checkQuestion: "מה החוזה שנשבר אם client שולח field בשם אחר?",
    },
  ];

  const MUSEUM_STUDENT_PASSPORT = [
    { stamp: "שורש", task: "הסבר במילים שלך מה השכבה מסתירה מהאדם.", proof: "משפט אחד של נבנה מ ומוביל אל." },
    { stamp: "קוד", task: "מצא שורת קוד שמייצגת את המושג.", proof: "ציין האם זו syntax, runtime, DOM, API או DB." },
    { stamp: "באג", task: "בחר טעות נפוצה ואבחן את השכבה שלה.", proof: "כתוב מה נשבר ומה בודקים קודם." },
    { stamp: "מוצר", task: "חבר את המושג לפעולת משתמש אמיתית.", proof: "הסבר איך זה משפיע על UX, שמירה או מדידה." },
  ];

  const MUSEUM_TEAM_RESPONSIBILITIES = [
    { role: "Product", does: "מגדיר בעיה, משתמש, KPI וגרסה.", owns: "למה בונים ומה נחשב הצלחה." },
    { role: "UX/UI", does: "מגדיר flow, wireframe, states ושגיאות משתמש.", owns: "מה המשתמש רואה ומבין." },
    { role: "Frontend", does: "בונה component, state, validation ו-fetch.", owns: "החוזה בין פעולה למסך." },
    { role: "Backend", does: "בונה routes, services, validation והרשאות.", owns: "חוזה API ולוגיקה." },
    { role: "Database", does: "מגדיר schema, indexes ושמירת מידע.", owns: "מקור אמת והתמדה." },
    { role: "QA/DevOps", does: "בודק flows, שגיאות, build, deploy ומדידה.", owns: "אמינות לפני ואחרי השקה." },
  ];

  const FULL_STACK_MUSEUM_HALLS = [
    {
      id: "interface",
      layer: "Client",
      title: "אולם 1 — ממשק ומבנה דף",
      summary: "הקומה הראשונה של Full-Stack היא מסך קריא: מבנה, היררכיה, סגנון ותגובה למסכים שונים.",
      evolvedFrom: "מסמכי web סטטיים, תגיות, טקסט וקישורים.",
      evolvedTo: "UI מבוסס קומפוננטות, עיצוב responsive ומסכים שנבנים מנתונים.",
      inventedBecause: "היה צריך דרך אחידה לתאר מידע בדפדפן כך שאדם ומכונה יבינו את אותו מסמך.",
      solved: "במקום שכל אפליקציה תמציא פורמט משלה למסך, הדפדפן קיבל מבנה קריא שאפשר לעצב ולנווט.",
      artifacts: ["HTML", "CSS", "layout", "responsive"],
      experience: "החוויה באולם: מסך מתפרק לשכבות. קודם מבנה, אחר כך עיצוב, ורק אז אינטראקציה.",
      video: {
        title: "איך דף הופך לממשק",
        prerequisite: "להכיר תגית, טקסט, כפתור וקישור.",
        prompt: "צור סרטון מוזיאוני בעברית שמראה דף ריק הופך לממשק Full-Stack: HTML נותן מבנה, CSS נותן היררכיה ו-responsive, והמשתמש רואה מסך שמוכן לקבל פעולה.",
      },
    },
    {
      id: "browser-runtime",
      layer: "Browser",
      title: "אולם 2 — JavaScript, DOM ואירועים",
      summary: "כאן הדף מפסיק להיות מסמך בלבד ומתחיל להגיב לפעולות: קליק, input, שינוי state ועדכון מסך.",
      evolvedFrom: "דף שנקרא בדפדפן ומציג תוכן.",
      evolvedTo: "אפליקציה אינטראקטיבית עם event handlers, DOM חי ו-state.",
      inventedBecause: "הדפדפן היה צריך שפה שתוכל להגיב למשתמש בלי לבנות תוכנה נפרדת לכל מערכת.",
      solved: "במקום לרענן הכול או להישאר עם מסמך פסיבי, הקוד יכול לשנות חלקים במסך בזמן פעולה.",
      artifacts: ["JavaScript", "DOM", "events", "state"],
      experience: "החוויה באולם: לוח בקרה חי. לחיצה אחת מדליקה שרשרת: event → handler → state → DOM.",
      video: {
        title: "הקליק שמזיז את כל המערכת",
        prerequisite: "להכיר function, object, condition ו-array ברמה בסיסית.",
        prompt: "צור סרטון קצר בעברית שבו קליק על כפתור מפעיל event, קורא לפונקציה, משנה state, ואז מעדכן DOM. הדגש למה JavaScript פתר את בעיית הדף הפסיבי.",
      },
    },
    {
      id: "async-network",
      layer: "Network",
      title: "אולם 3 — Async, Promise ו-Fetch",
      summary: "אפליקציה מודרנית צריכה לדבר עם שרת בלי להקפיא את המסך ובלי לאבד את זרימת המשתמש.",
      evolvedFrom: "פעולות מקומיות בדפדפן וטעינת דפים שלמים.",
      evolvedTo: "בקשות fetch, promises, async/await וטעינת נתונים מתוך UI פעיל.",
      inventedBecause: "המשתמש לא אמור לחכות למסך קפוא בזמן שהרשת עונה.",
      solved: "הקוד יכול לבקש נתונים, להמשיך לעבוד, ואז לטפל בתשובה או בשגיאה כשהיא חוזרת.",
      artifacts: ["Promise", "async/await", "fetch", "error state"],
      experience: "החוויה באולם: מנהרת זמן. בקשה יוצאת, UI נשאר חי, ואז התשובה חוזרת למסך.",
      video: {
        title: "הבקשה שלא מקפיאה את המסך",
        prerequisite: "להכיר callback, function ו-try/catch ברמה בסיסית.",
        prompt: "צור סרטון מוזיאוני בעברית שממחיש fetch כשליח שיוצא לשרת. הראה loading, success ו-error, והסבר למה async נולד כדי לא לעצור את חוויית המשתמש.",
      },
    },
    {
      id: "node-server",
      layer: "Server",
      title: "אולם 4 — Node.js, npm ומודולים",
      summary: "אותה שפת JavaScript עוברת מהדפדפן אל השרת וכלי הפיתוח, ומקבלת מודולים וחבילות.",
      evolvedFrom: "JavaScript שרץ בתוך דפדפן.",
      evolvedTo: "שרתים, CLI, dev server, build tools וחבילות npm.",
      inventedBecause: "צוותים רצו להשתמש באותה שפה גם בצד השרת וגם בכלי העבודה סביב המוצר.",
      solved: "פחות מעבר בין שפות, יותר שיתוף קוד, וניהול תלות דרך מודולים במקום קבצים מנותקים.",
      artifacts: ["Node.js", "npm", "modules", "file system"],
      experience: "החוויה באולם: חדר מכונות. import אחד מחבר קוד לקובץ, חבילה או שרת.",
      video: {
        title: "כש-JavaScript יוצאת מהדפדפן",
        prerequisite: "להכיר import/export, פונקציות וקבצים.",
        prompt: "צור סרטון בעברית שמציג את Node.js כחדר מכונות של Full-Stack: JavaScript רצה מחוץ לדפדפן, npm מחבר חבילות, ומודולים הופכים קוד גדול למסודר.",
      },
    },
    {
      id: "api-contract",
      layer: "API",
      title: "אולם 5 — HTTP, Express ו-REST API",
      summary: "הלקוח והשרת צריכים חוזה ברור: נתיב, שיטה, גוף בקשה, סטטוס ותשובת JSON.",
      evolvedFrom: "דפדפן שמבקש דפים וקבצים.",
      evolvedTo: "REST endpoints, routes, controllers, middleware ותגובות JSON.",
      inventedBecause: "היה צריך גבול ברור בין מה שהלקוח מבקש לבין מה שהשרת רשאי לעשות.",
      solved: "במקום חיבור מבולגן בין UI למסד נתונים, נוצר חוזה בדיק: request נכנס, response יוצא.",
      artifacts: ["HTTP", "Express", "route", "JSON"],
      experience: "החוויה באולם: שער ביקורת. כל בקשה עוברת בנתיב, בדיקה, פעולה ותשובה.",
      video: {
        title: "החוזה בין המסך לשרת",
        prerequisite: "להכיר URL, object, JSON ו-function.",
        prompt: "צור סרטון בעברית שמראה request נכנס ל-Express route, עובר middleware, מגיע לפעולה, וחוזר כ-JSON. הדגש למה REST פתר את בעיית החיבור הלא-מסודר בין client ל-server.",
      },
    },
    {
      id: "data-persistence",
      layer: "Data",
      title: "אולם 6 — Database, MongoDB ו-Mongoose",
      summary: "אפליקציה אמיתית צריכה לזכור מידע אחרי refresh, אחרי סגירת דפדפן ואחרי פעולה של משתמש אחר.",
      evolvedFrom: "נתונים בזיכרון, קבצים ו-local state.",
      evolvedTo: "מסד נתונים, collections, documents, schema, queries ו-models.",
      inventedBecause: "מידע עסקי ולימודי צריך להישמר, להישלף ולהיות עקבי בין פעולות.",
      solved: "במקום state זמני שנעלם, יש שכבת persistence עם שאילתות, אימות מבנה וגבול ברור לנתונים.",
      artifacts: ["MongoDB", "collection", "document", "Mongoose model"],
      experience: "החוויה באולם: כספת נתונים. כל פעולה נשאלת: מה נשמר, איפה, באיזה מבנה, ומי קורא.",
      video: {
        title: "למה state זמני לא מספיק",
        prerequisite: "להכיר object, array ו-JSON.",
        prompt: "צור סרטון מוזיאוני בעברית שבו state במסך נעלם אחרי refresh, ואז Database שומר document. הסבר למה MongoDB/Mongoose פותרים persistence, schema ו-query במערכת Full-Stack.",
      },
    },
    {
      id: "react-product",
      layer: "Product UI",
      title: "אולם 7 — React, Components ו-State",
      summary: "כשמסך גדול מתעדכן מהר, קל ללכת לאיבוד. React מסדר UI כעץ רכיבים שתלוי ב-state.",
      evolvedFrom: "שינוי ידני של DOM ועמודים שמנהלים הרבה מצבים במקביל.",
      evolvedTo: "components, props, hooks, state-driven UI ו-routing.",
      inventedBecause: "ממשקים גדולים היו צריכים דרך צפויה לחבר data, UI ופעולות משתמש.",
      solved: "במקום לערוך DOM ידנית בכל שינוי, מתארים איך המסך צריך להיראות לפי state.",
      artifacts: ["component", "props", "useState", "render"],
      experience: "החוויה באולם: קיר רכיבים. שינוי state אחד שולח גל מסודר בעץ UI.",
      video: {
        title: "UI כתלות של state",
        prerequisite: "להכיר function, object, array ו-map.",
        prompt: "צור סרטון בעברית שמציג React כמוזיאון רכיבים: props נכנסים, state משתנה, render מצייר מסך מחדש. הסבר למה זה פתר כאוס של DOM ידני.",
      },
    },
    {
      id: "quality-delivery",
      layer: "Quality",
      title: "אולם 8 — Debugging, Tests ו-AI Review",
      summary: "Full-Stack לא נגמר כשהמסך עובד. צריך לדעת למה הוא עובד, מה יישבר, ואיך בודקים שינוי.",
      evolvedFrom: "בדיקה ידנית ותחושת ביטחון מקומית.",
      evolvedTo: "בדיקות, build, code review, observability ועבודה מבוקרת עם AI.",
      inventedBecause: "מערכות עם client, server ו-data נשברות בכמה שכבות בו זמנית.",
      solved: "במקום לסמוך על זיכרון או תחושה, יוצרים מנגנוני אימות שחוזרים על עצמם.",
      artifacts: ["debugging", "tests", "build", "code review"],
      experience: "החוויה באולם: חדר חקירה. כל bug מקבל שכבה, סימפטום, סיבה ובדיקה שמונעת חזרה.",
      video: {
        title: "איך יודעים שהמערכת באמת עובדת",
        prerequisite: "להכיר קריאת שגיאות, console וזרימת client/server בסיסית.",
        prompt: "צור סרטון בעברית שמראה bug במערכת Full-Stack, מפרק אותו למסך, API, server ו-data, ואז מוסיף test ו-code review. הדגש למה AI עוזר רק כשבודקים אותו.",
      },
    },
  ];

  const FULL_STACK_ERA_LABELS = {
    legacy: "ותיק",
    bridge: "גשר",
    modern: "מודרני",
    future: "עתידני",
  };

  const FULL_STACK_DOMAIN_EXHIBITIONS = {
    interface: {
      era: "legacy",
      profession: "Frontend Foundations",
      does: "בונה את מה שהמשתמש רואה: מבנה, משמעות, סידור ותגובה למסכים שונים.",
      rooms: [
        {
          id: "semantic-html",
          era: "legacy",
          title: "חדר HTML סמנטי",
          what: "מתאר מה יש במסך לפני שמחליטים איך הוא נראה.",
          diagram: ["תוכן", "תגית", "משמעות", "מסך"],
          categories: [
            { name: "מבנה", items: ["header / main / section", "button / link / input", "כותרות ופסקאות"] },
            { name: "נגישות", items: ["label לשדה", "סדר focus", "טקסט חלופי"] },
          ],
          experience: "חדר בסגנון ארכיון: התלמיד מקבל דף גולמי ומסמן מה כל חלק אמור להיות.",
          video: {
            title: "למה HTML הוא שלד ולא עיצוב",
            prerequisite: "להכיר תגית, טקסט, כפתור וקישור.",
            prompt: "צור סרטון בעברית בסגנון מוזיאון ישן שמראה דף טקסט הופך למבנה HTML סמנטי. הסבר מה עושה כל תגית ולמה זה פתר את בעיית המסמך הלא-מסודר.",
          },
        },
        {
          id: "css-layout",
          era: "legacy",
          title: "חדר CSS ו-Layout",
          what: "מחליט איך המבנה נראה, נושם ומתאים למסכים.",
          diagram: ["selector", "box", "flex/grid", "responsive"],
          categories: [
            { name: "סגנון", items: ["color", "spacing", "typography"] },
            { name: "פריסה", items: ["box model", "flex", "grid"] },
          ],
          experience: "שולחן שרטוט ישן: משנים מרווחים ועמודות ורואים איך אותו HTML מקבל אופי אחר.",
          video: {
            title: "איך CSS הופך שלד לממשק",
            prerequisite: "להכיר class, selector ו-box.",
            prompt: "צור סרטון בעברית שמראה HTML פשוט מקבל CSS: צבע, ריווח, flex/grid ו-responsive. הדגש ש-CSS פתר את בעיית ההפרדה בין תוכן לעיצוב.",
          },
        },
        {
          id: "screen-composition",
          era: "modern",
          title: "חדר קומפוזיציית מסך",
          what: "מחבר מבנה, עיצוב ונתונים למסך שאפשר לסרוק ולעבוד איתו.",
          diagram: ["data", "section", "state", "screen"],
          categories: [
            { name: "חלקי מסך", items: ["toolbar", "card", "form"] },
            { name: "התאמה", items: ["mobile", "desktop", "empty state"] },
          ],
          experience: "מסך מוצר חי: מחליפים מצב ריק, טעינה ותוכן מלא בלי לשבור layout.",
          video: {
            title: "איך בונים מסך מוצר",
            prerequisite: "להכיר HTML, CSS ו-state בסיסי.",
            prompt: "צור סרטון עברי שמראה איך מסך Full-Stack מורכב מאזורים: toolbar, form, list ו-empty state. הדגש איך קומפוזיציה פתרה מסכים עמוסים ומבולגנים.",
          },
        },
      ],
    },
    "browser-runtime": {
      era: "bridge",
      profession: "Browser Runtime",
      does: "מחבר בין פעולה של משתמש לבין קוד שרץ בדפדפן ומשנה את המסך.",
      rooms: [
        {
          id: "js-language",
          era: "bridge",
          title: "חדר JavaScript כשפה",
          what: "נותן לדף יכולת לחשב, להחליט ולבנות נתונים.",
          diagram: ["value", "function", "object", "flow"],
          categories: [
            { name: "אבני שפה", items: ["variables", "functions", "objects"] },
            { name: "זרימה", items: ["if", "loop", "return"] },
          ],
          experience: "קונסולת מעבדה: כל פעולה קטנה מראה איך ערך עובר דרך פונקציה.",
          video: {
            title: "למה דף היה צריך שפה",
            prerequisite: "להכיר משתנה, תנאי ופונקציה.",
            prompt: "צור סרטון בעברית שמסביר למה JavaScript נדרשה בדפדפן: חישוב, תנאים, פונקציות ושינוי מסך. הדגש שהיא פתרה את בעיית הדף הפסיבי.",
          },
        },
        {
          id: "dom-events",
          era: "legacy",
          title: "חדר DOM ואירועים",
          what: "הופך את המסמך לעץ שאפשר למצוא, לקרוא ולשנות.",
          diagram: ["node", "event", "handler", "update"],
          categories: [
            { name: "DOM", items: ["tree", "node", "query"] },
            { name: "Events", items: ["click", "input", "submit"] },
          ],
          experience: "מרכזייה ישנה: קליק עובר דרך חוטים עד שהוא מגיע ל-handler.",
          video: {
            title: "הקליק שמפעיל את העץ",
            prerequisite: "להכיר עץ DOM ופונקציה.",
            prompt: "צור סרטון בעברית בסגנון מכני-ישן שמראה DOM כעץ ואירוע ככבל שמפעיל handler. הסבר מה זה פתר לעומת דף שלא מגיב.",
          },
        },
        {
          id: "state-discipline",
          era: "future",
          title: "חדר משמעת State",
          what: "מונע מסך שמציג מצב אחד בזמן שהקוד חושב מצב אחר.",
          diagram: ["event", "state", "render", "sync"],
          categories: [
            { name: "מצבי UI", items: ["loading", "error", "success"] },
            { name: "גבולות", items: ["single source", "derived state", "side effects"] },
          ],
          experience: "חדר עתידני עם לוח מצב: כל שינוי state מאיר רק את החלקים שצריכים להשתנות.",
          video: {
            title: "למה state צריך משמעת",
            prerequisite: "להכיר event ו-render.",
            prompt: "צור סרטון עתידני בעברית שמראה UI עם loading, error ו-success. הסבר למה state מסודר פתר מסכים שסותרים את עצמם.",
          },
        },
      ],
    },
    "async-network": {
      era: "modern",
      profession: "Network & Async",
      does: "מנהל בקשות לשרת בלי להקפיא את המשתמש ובלי לאבד שגיאות.",
      rooms: [
        {
          id: "promise-timeline",
          era: "modern",
          title: "חדר Promise Timeline",
          what: "מתאר פעולה שתסתיים בעתיד: הצלחה או כישלון.",
          diagram: ["pending", "fulfilled", "rejected", "handled"],
          categories: [
            { name: "מצבי Promise", items: ["pending", "resolved", "rejected"] },
            { name: "טיפול", items: ["then", "catch", "finally"] },
          ],
          experience: "מנהרת זמן: בקשה יוצאת, שעון פועם, ואז נפתח שער הצלחה או שגיאה.",
          video: {
            title: "איך Promise מסדר עתיד",
            prerequisite: "להכיר פונקציה ו-callback.",
            prompt: "צור סרטון בעברית שמראה Promise כציר זמן עם pending, success ו-error. הסבר שהוא פתר את בעיית פעולה שמסתיימת אחרי שהקוד כבר המשיך.",
          },
        },
        {
          id: "fetch-contract",
          era: "modern",
          title: "חדר Fetch ו-HTTP",
          what: "שולח בקשה ברורה ומחזיר תשובה שאפשר לפרש.",
          diagram: ["URL", "method", "headers", "JSON"],
          categories: [
            { name: "בקשה", items: ["URL", "method", "body"] },
            { name: "תשובה", items: ["status", "JSON", "error"] },
          ],
          experience: "תחנת שליחים: כל חבילה חייבת כתובת, שיטה ותוכן ברור.",
          video: {
            title: "מה באמת יוצא ב-fetch",
            prerequisite: "להכיר URL ו-object.",
            prompt: "צור סרטון בעברית שמראה fetch כשליח HTTP: URL, method, body, status ו-JSON. הדגש שזה פתר תקשורת לא-ברורה בין client ל-server.",
          },
        },
        {
          id: "resilient-ui",
          era: "future",
          title: "חדר UI עמיד לרשת",
          what: "מתכנן את המסך גם כשהרשת איטית, נכשלת או מחזירה נתון חסר.",
          diagram: ["loading", "retry", "fallback", "recover"],
          categories: [
            { name: "מצבים", items: ["skeleton", "retry", "offline note"] },
            { name: "אמינות", items: ["timeout", "validation", "clear error"] },
          ],
          experience: "חללית תקשורת: כל תקלה מקבלת מסלול התאוששות במקום מסך מת.",
          video: {
            title: "איך UI שורד רשת לא יציבה",
            prerequisite: "להכיר fetch ו-error state.",
            prompt: "צור סרטון עתידני בעברית שמראה מסך עם loading, retry ו-fallback. הסבר למה UI עמיד פתר חוויית משתמש שנשברת בגלל רשת.",
          },
        },
      ],
    },
    "node-server": {
      era: "modern",
      profession: "Backend Runtime",
      does: "מריץ JavaScript מחוץ לדפדפן ומפעיל קבצים, חבילות, שרתים וכלי פיתוח.",
      rooms: [
        {
          id: "runtime-engine",
          era: "modern",
          title: "חדר Node Runtime",
          what: "נותן לקוד JS לעבוד בסביבת שרת וכלי מערכת.",
          diagram: ["JS", "runtime", "file", "process"],
          categories: [
            { name: "Runtime", items: ["event loop", "process", "environment"] },
            { name: "מערכת", items: ["file system", "path", "CLI"] },
          ],
          experience: "חדר מכונות: כל קובץ הופך לחלק ממנוע שרץ מחוץ לדפדפן.",
          video: {
            title: "מה Node עושה במקצוע",
            prerequisite: "להכיר JavaScript וקבצים.",
            prompt: "צור סרטון בעברית שמראה Node.js כ-runtime לשרת ולכלי פיתוח. הסבר שהוא פתר את הצורך להריץ JavaScript מחוץ לדפדפן.",
          },
        },
        {
          id: "npm-modules",
          era: "modern",
          title: "חדר npm ומודולים",
          what: "מחלק קוד לקבצים וחבילות שאפשר לחבר ולתחזק.",
          diagram: ["module", "package", "version", "import"],
          categories: [
            { name: "מודולים", items: ["export", "import", "dependency"] },
            { name: "חבילות", items: ["package.json", "scripts", "versions"] },
          ],
          experience: "ספריית חלקים: בוחרים חבילה, מבינים חוזה, ומחברים אותה לקוד.",
          video: {
            title: "למה npm חשוב למפתח Full-Stack",
            prerequisite: "להכיר import/export.",
            prompt: "צור סרטון בעברית שמציג npm כספריית חבילות ומודולים. הסבר מה זה פתר לעומת העתקת קבצים ידנית וחוסר סדר בתלויות.",
          },
        },
        {
          id: "tooling-pipeline",
          era: "future",
          title: "חדר Tooling Pipeline",
          what: "מחבר dev server, build, lint ובדיקות לזרימת עבודה אחת.",
          diagram: ["dev", "build", "test", "ship"],
          categories: [
            { name: "פיתוח", items: ["dev server", "hot reload", "env"] },
            { name: "שחרור", items: ["build", "audit", "verification"] },
          ],
          experience: "מסוע עתידני: שינוי קוד עובר דרך תחנות עד שהוא מוכן להרצה.",
          video: {
            title: "מה עושה כלי build סביב הקוד",
            prerequisite: "להכיר npm scripts ו-dev server.",
            prompt: "צור סרטון עתידני בעברית שמראה קוד עובר dev, build, test ו-ship. הסבר למה tooling פתר פרויקטים שהפכו גדולים מדי להרצה ידנית.",
          },
        },
      ],
    },
    "api-contract": {
      era: "bridge",
      profession: "API Engineering",
      does: "מגדיר חוזה בין client ל-server: מה מבקשים, מי מאשר, ומה חוזר.",
      rooms: [
        {
          id: "http-basics",
          era: "legacy",
          title: "חדר HTTP הקלאסי",
          what: "נותן שפה בסיסית לבקשות ותשובות ברשת.",
          diagram: ["method", "path", "status", "body"],
          categories: [
            { name: "בקשה", items: ["GET", "POST", "headers"] },
            { name: "תשובה", items: ["status", "content type", "body"] },
          ],
          experience: "דלפק דואר ותיק: כל בקשה מקבלת חותמת, כתובת ותשובה.",
          video: {
            title: "למה HTTP הוא חוזה",
            prerequisite: "להכיר URL וטופס.",
            prompt: "צור סרטון בעברית בסגנון ארכיון שמראה HTTP כבקשה ותשובה: method, path, status ו-body. הסבר מה זה פתר בתקשורת web.",
          },
        },
        {
          id: "express-routes",
          era: "modern",
          title: "חדר Express Routes",
          what: "מחבר נתיב בקשה לפונקציה שמטפלת בה.",
          diagram: ["route", "handler", "service", "response"],
          categories: [
            { name: "Routing", items: ["path params", "query", "handler"] },
            { name: "Response", items: ["JSON", "status code", "error"] },
          ],
          experience: "לוח ניתוב: כל URL מאיר מסלול אחר עד לתשובת JSON.",
          video: {
            title: "איך Express הופך URL לפעולה",
            prerequisite: "להכיר function ו-object.",
            prompt: "צור סרטון בעברית שמראה Express route מקבל request, קורא handler ומחזיר JSON. הסבר שזה פתר חיבור לא-מסודר בין endpoint לקוד.",
          },
        },
        {
          id: "middleware-gates",
          era: "future",
          title: "חדר Middleware ושערי הגנה",
          what: "בודק בקשות לפני שהן מגיעות ללוגיקה המרכזית.",
          diagram: ["request", "validate", "authorize", "next"],
          categories: [
            { name: "בדיקות", items: ["validation", "auth", "rate limit"] },
            { name: "זרימה", items: ["next", "error handler", "logging"] },
          ],
          experience: "שער עתידני: בקשה עוברת סורק לפני כניסה לאולם השרת.",
          video: {
            title: "למה middleware הוא שער",
            prerequisite: "להכיר Express route ו-request.",
            prompt: "צור סרטון עתידני בעברית שמראה middleware כשרשרת שערים: validation, auth, logging ו-error handler. הסבר מה זה פתר באפליקציה גדולה.",
          },
        },
      ],
    },
    "data-persistence": {
      era: "modern",
      profession: "Data & Persistence",
      does: "שומר מידע, מחפש אותו, מוודא מבנה ומחזיר אותו לשכבות האחרות.",
      rooms: [
        {
          id: "document-store",
          era: "modern",
          title: "חדר Documents ו-Collections",
          what: "שומר נתונים כ-documents שאפשר למצוא ולעדכן.",
          diagram: ["collection", "document", "field", "query"],
          categories: [
            { name: "מבנה", items: ["collection", "document", "field"] },
            { name: "פעולות", items: ["find", "create", "update"] },
          ],
          experience: "כספת מודרנית: כל document נכנס למגירה עם שדות שאפשר לחפש.",
          video: {
            title: "איך document נשמר ונמצא",
            prerequisite: "להכיר object ו-array.",
            prompt: "צור סרטון בעברית שמראה collection של documents, query ועדכון. הסבר למה database פתר state שנעלם אחרי refresh.",
          },
        },
        {
          id: "mongoose-model",
          era: "modern",
          title: "חדר Mongoose Model",
          what: "נותן לקוד שכבת model שמגדירה איך מסמך אמור להיראות.",
          diagram: ["schema", "model", "validate", "save"],
          categories: [
            { name: "Model", items: ["schema", "required", "default"] },
            { name: "קוד", items: ["create", "findById", "save"] },
          ],
          experience: "מעבדת תבניות: מסמך לא נכנס עד שהוא מתאים לצורה שהוגדרה.",
          video: {
            title: "למה צריך Model מעל Database",
            prerequisite: "להכיר object ו-validation.",
            prompt: "צור סרטון בעברית שמראה schema, model, validation ושמירה. הסבר איך Mongoose פתר קוד שמדבר עם מסד נתונים בלי חוזה ברור.",
          },
        },
        {
          id: "data-lifecycle",
          era: "future",
          title: "חדר מחזור חיים של מידע",
          what: "מתכנן מה קורה לנתון מרגע כניסה ועד הצגה חוזרת.",
          diagram: ["input", "validate", "store", "render"],
          categories: [
            { name: "אמינות", items: ["sanitize", "validate", "audit"] },
            { name: "שימוש", items: ["cache", "populate", "projection"] },
          ],
          experience: "מרכז בקרה עתידני: כל נתון מקבל מסלול, בעלות ונקודת בדיקה.",
          video: {
            title: "המסע של נתון במערכת",
            prerequisite: "להכיר form, API ו-database.",
            prompt: "צור סרטון עתידני בעברית שמראה נתון נכנס מטופס, עובר validation, נשמר במסד וחוזר ל-UI. הסבר למה lifecycle פתר נתונים לא עקביים.",
          },
        },
      ],
    },
    "react-product": {
      era: "future",
      profession: "React Product UI",
      does: "בונה ממשק מוצר כעץ רכיבים שמגיב ל-state ולנתונים.",
      rooms: [
        {
          id: "component-gallery",
          era: "modern",
          title: "גלריית Components",
          what: "מפרקת מסך גדול ליחידות קטנות עם אחריות ברורה.",
          diagram: ["page", "component", "props", "children"],
          categories: [
            { name: "יחידות", items: ["page", "panel", "button"] },
            { name: "חוזה", items: ["props", "children", "events"] },
          ],
          experience: "קיר קומפוננטות: כל רכיב מקבל תפקיד, קלט וגבולות.",
          video: {
            title: "איך רכיב חושב",
            prerequisite: "להכיר function ו-props.",
            prompt: "צור סרטון בעברית שמציג component כפונקציה שמקבלת props ומחזירה UI. הסבר למה זה פתר מסכים גדולים שקשה לתחזק.",
          },
        },
        {
          id: "hooks-state",
          era: "future",
          title: "חדר Hooks ו-State",
          what: "מנהל מצב מקומי ותופעות לוואי בתוך רכיבים.",
          diagram: ["useState", "event", "render", "effect"],
          categories: [
            { name: "State", items: ["useState", "derived state", "immutable update"] },
            { name: "Effects", items: ["useEffect", "cleanup", "dependency"] },
          ],
          experience: "קפסולת זמן עתידנית: כל שינוי state מפעיל render מדויק.",
          video: {
            title: "למה Hooks שינו את כתיבת React",
            prerequisite: "להכיר component ו-state.",
            prompt: "צור סרטון עתידני בעברית שמראה useState, render ו-useEffect. הסבר איך Hooks פתרו ניהול state ולוגיקת lifecycle ברכיבים.",
          },
        },
        {
          id: "routing-data-ui",
          era: "future",
          title: "חדר Routing ו-Data UI",
          what: "מחבר URL, נתונים ומסך לאותו מסלול מוצר.",
          diagram: ["route", "params", "load", "screen"],
          categories: [
            { name: "Navigation", items: ["route", "params", "link"] },
            { name: "Data UI", items: ["list", "details", "empty state"] },
          ],
          experience: "מפת עיר דיגיטלית: כל URL פותח רחוב, נתון ותצוגה אחרת.",
          video: {
            title: "איך URL הופך למסך React",
            prerequisite: "להכיר components ו-fetch.",
            prompt: "צור סרטון עתידני בעברית שמראה route עם params, טעינת נתונים והצגת list/details. הסבר מה routing פתר במוצר גדול.",
          },
        },
      ],
    },
    "quality-delivery": {
      era: "future",
      profession: "Quality & Delivery",
      does: "מוכיח שהמערכת עובדת, מסביר למה היא נשברה, ומקטין חזרה של באגים.",
      rooms: [
        {
          id: "debugging-lab",
          era: "legacy",
          title: "מעבדת Debugging",
          what: "מוצאת באיזה שכבה התקלה התחילה ומה הסיבה.",
          diagram: ["symptom", "trace", "cause", "fix"],
          categories: [
            { name: "כלים", items: ["console", "breakpoint", "network tab"] },
            { name: "שיטה", items: ["reproduce", "isolate", "verify"] },
          ],
          experience: "חדר חקירה ישן: מתחילים מסימפטום ומחפשים ראיה במקום לנחש.",
          video: {
            title: "איך חוקרים באג Full-Stack",
            prerequisite: "להכיר console ו-network tab.",
            prompt: "צור סרטון בעברית בסגנון חדר חקירה שמראה באג עובר מ-UI ל-API ל-database. הסבר למה debugging שיטתי פתר ניחושים.",
          },
        },
        {
          id: "test-station",
          era: "modern",
          title: "תחנת Tests",
          what: "שומרת התנהגות חשובה כך ששינוי עתידי לא ישבור אותה בשקט.",
          diagram: ["case", "input", "expect", "regression"],
          categories: [
            { name: "סוגים", items: ["unit", "integration", "smoke"] },
            { name: "איכות", items: ["deterministic", "assertion", "coverage"] },
          ],
          experience: "מסילת בדיקות: כל שינוי עובר שערים לפני שהוא מתקבל.",
          video: {
            title: "למה בדיקה היא זיכרון של המערכת",
            prerequisite: "להכיר function ותוצאה צפויה.",
            prompt: "צור סרטון בעברית שמראה test עם input ו-expect, ואז שינוי קוד שנכשל בבדיקה. הסבר איך tests פתרו regressions.",
          },
        },
        {
          id: "ai-review-control",
          era: "future",
          title: "חדר AI Review מבוקר",
          what: "משתמש ב-AI כדי להאיץ הבנה, אבל מכריח בדיקה, מקור והסבר.",
          diagram: ["suggest", "inspect", "test", "review"],
          categories: [
            { name: "AI שימושי", items: ["explain", "draft", "trace"] },
            { name: "בקרה", items: ["tests", "code review", "no fake data"] },
          ],
          experience: "תא פיקוח עתידני: AI מציע, המפתח מאמת, והבדיקות קובעות.",
          video: {
            title: "איך עובדים עם AI בלי לאבד שליטה",
            prerequisite: "להכיר debugging, tests ו-code review.",
            prompt: "צור סרטון עתידני בעברית שמראה AI מציע שינוי, המפתח קורא קוד, מריץ בדיקות ומבצע review. הדגש למה AI פתר מהירות, אבל לא מחליף אחריות.",
          },
        },
      ],
    },
  };

  const PROGRAMMING_HISTORY_EXTENSION_IDEAS = [
    {
      title: "מעבד, זיכרון ו-compiler כתחנת מעבדה",
      work: "להוסיף הדמיה שבה ביטים הופכים ל-opcode, opcode לפעולה, ופעולה לערך משתנה.",
      value: "סוגר את הפער בין חשמל לבין קוד JS.",
    },
    {
      title: "אותו תפריט ב-8 שפות",
      work: "להראות תפריט קטן ב-C, Java, Python, JS, TS, React, Node ו-Next, עם אותה data shape.",
      value: "מראה שהתבנית חשובה יותר מהתחביר.",
    },
    {
      title: "מפת משפחות שפות מלאה",
      work: "להוסיף graph אינטראקטיבי: מי הושפעה ממי, ומה כל שפה פתרה.",
      value: "עוזר לתלמיד להבין למה שפות שונות קיימות במקביל.",
    },
    {
      title: "מעבדת compiler/interpreter/JIT",
      work: "תרשים חי של parse → AST → bytecode/machine code → runtime.",
      value: "מסביר למה C מהירה, למה JS משתפרת אחרי JIT, ולמה Python מרוויחה מ-C extensions.",
    },
    {
      title: "כרטיסי “איזו בעיה השפה פתרה?”",
      work: "לכל שפה: הבעיה המקורית, הפשרה, המחיר, והיכן היא עדיין רלוונטית.",
      value: "מונע דירוג שטחי של שפות לפי “טובה/גרועה”.",
    },
    {
      title: "מקורות ותאריכים מאומתים",
      work: "לכל תחנה היסטורית להוסיף מקור קצר, בלי תאריכים מומצאים ובלי סיפורים לא מאומתים.",
      value: "שומר על אמינות לימודית ומונע הפיכת היסטוריה למיתולוגיה.",
    },
  ];

  const PROGRAMMING_REACT_BUILD_PATH = [
    {
      id: "ui-problem",
      label: "בעיה",
      title: "UI משתנה כל הזמן",
      text: "משתמש לוחץ, מידע נטען, שגיאה מופיעה, רשימה מתעדכנת. קשה לסנכרן DOM ידנית בלי לשכוח מצב.",
    },
    {
      id: "component",
      label: "יחידה",
      title: "Component",
      text: "מפרקים מסך לחלקים קטנים: כפתור, כרטיס, תפריט, עמוד.",
    },
    {
      id: "data-in",
      label: "קלט",
      title: "Props",
      text: "הורה מעביר לילד נתונים. כמו פרמטרים לפונקציה.",
    },
    {
      id: "local-memory",
      label: "זיכרון",
      title: "State",
      text: "החלק זוכר מצב מקומי: פתוח/סגור, נבחר, נטען, שגיאה.",
    },
    {
      id: "render",
      label: "ציור",
      title: "Render",
      text: "React מריץ פונקציות ומקבל תיאור של UI, לא משנה DOM ישירות בכל שורה.",
    },
    {
      id: "sync",
      label: "סנכרון",
      title: "Reconciliation",
      text: "React משווה תיאור חדש לישן ומחליט מה באמת צריך להשתנות במסך.",
    },
    {
      id: "escape",
      label: "חוץ",
      title: "Effects",
      text: "כשצריך לדבר עם העולם החיצוני: רשת, timer, DOM API או subscription.",
    },
  ];

  const PROGRAMMING_REACT_CONCEPTS = [
    {
      id: "component",
      name: "Component",
      simple: "פונקציה שמחזירה תיאור של חתיכת מסך.",
      why: "נבנה כדי לפרק UI גדול לחלקים קטנים שאפשר להבין, לבדוק ולהרכיב מחדש.",
      replaced: "החליף קוד DOM ידני, תבניות HTML מפוזרות, ו-jQuery plugins שהחזיקו state פנימי קשה למעקב.",
      efficiency: "קריאת component היא O(1) ביחס לפונקציה עצמה, אבל render של subtree תלוי בגודל העץ. פיצול נכון מקטין עבודה מיותרת.",
      could: "אפשר לבנות אחרת עם Web Components, template strings, server templates או Vanilla DOM.",
      better: "עדיף component קטן, טהור ככל האפשר, שמקבל props ברורים ולא מסתיר יותר מדי state.",
      analogy: "כמו לגו: כל חלק קטן, אבל החיבור שלהם בונה מסך שלם.",
    },
    {
      id: "jsx",
      name: "JSX",
      simple: "תחביר שנראה כמו HTML בתוך JavaScript, ומתקמפל לקריאות פונקציה.",
      why: "נבנה כדי לתאר UI ליד הלוגיקה שמחליטה מה להציג.",
      replaced: "החליף `React.createElement(...)` ידני, string templates ארוכים, והפרדה מלאכותית מדי בין markup ללוגיקה.",
      efficiency: "ההמרה נעשית בזמן build. אין parser של JSX בזמן הריצה בדפדפן.",
      could: "אפשר בלי JSX בעזרת createElement, hyperscript, template literals או תבניות של framework אחר.",
      better: "JSX טוב כשהוא נשאר תיאור מסך. חישובים כבדים, סינון גדול או mapping מורכב עדיף להכין לפני ה-return.",
      analogy: "כמו לשרטט תפריט על דף, אבל הדף הוא קוד שיכול להשתמש במשתנים.",
    },
    {
      id: "props",
      name: "Props",
      simple: "קלט שהורה מעביר ל-component, כמו פרמטר לפונקציה.",
      why: "נבנו כדי להעביר מידע בצורה גלויה במקום שהילד יחפש נתונים לבד.",
      replaced: "החליפו global variables, DOM data attributes, וקריאה ידנית מהמסך כדי להבין מה להציג.",
      efficiency: "העברת props היא זולה, אבל אובייקטים/פונקציות חדשים בכל render יכולים לגרום לילדים להתעדכן שוב.",
      could: "אפשר להעביר מידע דרך Context, store חיצוני, URL או data attributes, אבל זה מגדיל coupling.",
      better: "העבר props קטנים וברורים. אל תעביר object ענק אם הילד צריך רק `title` ו-`count`.",
      analogy: "כמו טופס הזמנה: הילד לא מנחש, הוא מקבל בדיוק מה צריך להכין.",
    },
    {
      id: "state",
      name: "State / useState",
      simple: "זיכרון מקומי שגורם למסך להצטייר מחדש כשהוא משתנה.",
      why: "נבנה כדי שמידע שמשתנה יוביל אוטומטית ל-UI מעודכן.",
      replaced: "החליף שינוי DOM ידני כמו `element.textContent = ...` בכל מקום שבו state משתנה.",
      efficiency: "עדכון state גורם ל-render של component והילדים הרלוונטיים. batching מצמצם עבודות כפולות.",
      could: "אפשר לבנות עם משתנה רגיל ו-DOM ידני, reducer, state machine או store חיצוני.",
      better: "שמור רק state אמיתי. ערך שאפשר לחשב מ-props/state קיים צריך להיות derived, לא עוד state כפול.",
      analogy: "כמו לוח תוצאות: משנים מספר אחד, וכל מי שמסתכל על הלוח רואה עדכון.",
    },
    {
      id: "reconciliation",
      name: "Virtual Tree / Reconciliation",
      simple: "React יוצר תיאור עץ חדש ומשווה אותו לקודם כדי לדעת מה לשנות ב-DOM.",
      why: "נבנה כדי לא לכתוב ביד את כל פעולות הסנכרון בין data לבין DOM.",
      replaced: "החליף הרבה קוד jQuery שמוסיף, מוחק ומעדכן nodes ידנית.",
      efficiency: "ה-diff הוא בקירוב O(n) לפי מבנה העץ, עם הנחות על type ו-key. keys יציבים ברשימות קריטיים לביצועים ונכונות.",
      could: "אפשר direct DOM, fine-grained reactivity כמו Solid, compile-time updates כמו Svelte, או full server render.",
      better: "פצל רשימות, השתמש ב-key יציב, ואל תערבב type של component באותו מקום בלי סיבה.",
      analogy: "כמו להשוות רשימת קניות חדשה לישנה ולקנות רק מה שהשתנה.",
    },
    {
      id: "hooks",
      name: "Hooks",
      simple: "דרך לחבר state, effects ולוגיקה חוזרת לתוך function component.",
      why: "נבנו כדי להשתמש בלוגיקה stateful בלי class components ובלי עטיפות מסובכות.",
      replaced: "החליפו class lifecycle, mixins, higher-order components ו-render props בהרבה מקרים.",
      efficiency: "Hook עצמו הוא קריאה מסודרת לפי סדר קבוע. הבעיה אינה ה-hook, אלא dependencies לא נכונות או state רחב מדי.",
      could: "אפשר classes, stores, signals או functions חיצוניות טהורות כשאין state React.",
      better: "Custom hook צריך להיות קטן ולספר סיפור אחד: `useUser`, `useDebouncedValue`, `useLocalStorage`.",
      analogy: "כמו שקע בקיר: component רגיל מקבל יכולת נוספת בלי להפוך למכונה אחרת.",
    },
    {
      id: "effect",
      name: "useEffect",
      simple: "מקום לסנכרן את React עם משהו מחוץ ל-render.",
      why: "נבנה כדי להפריד בין ציור UI לבין פעולות צד: fetch, timer, subscription, DOM API.",
      replaced: "החליף `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` ב-class components.",
      efficiency: "effect רץ אחרי render לפי dependencies. dependency לא נכון יוצר ריצות מיותרות או stale data.",
      could: "אפשר event handler, server loader, query library, useSyncExternalStore או חישוב רגיל בזמן render.",
      better: "אל תשתמש ב-effect כדי לחשב data שניתן לחשב מיד. effect מיועד לעולם החיצוני.",
      analogy: "כמו שליח שיוצא מהבית רק כשצריך לדבר עם מישהו בחוץ.",
    },
    {
      id: "context",
      name: "Context",
      simple: "צינור שמעביר ערך להרבה components בלי להעביר props דרך כל שכבה.",
      why: "נבנה כדי לפתור prop drilling כשהרבה שכבות ביניים לא צריכות את המידע בעצמן.",
      replaced: "החליף global singleton לא מסודר והעברת props ידנית דרך שרשרת ארוכה.",
      efficiency: "כל consumer של context עשוי להתעדכן כשה-value משתנה. value גדול מדי או משתנה כל render יקר.",
      could: "אפשר composition, props רגילים, store חיצוני, URL state או server data.",
      better: "פצל contexts לפי קצב שינוי: theme בנפרד, auth בנפרד, settings בנפרד.",
      analogy: "כמו מערכת כריזה בבניין: טוב להודעה כללית, רע לשיחה פרטית עם אדם אחד.",
    },
    {
      id: "memo",
      name: "memo / useMemo / useCallback",
      simple: "Cache קטן שנועד למנוע חישוב או render חוזר כשלא צריך.",
      why: "נבנה כדי להפחית עבודה חוזרת בקוד יקר או ב-props שמשנים identity.",
      replaced: "החליף caches ידניים, flags, והשוואות מפוזרות בקוד.",
      efficiency: "יש עלות להשוואה ולשמירת cache. memo לא חינמי; הוא משתלם רק כשמונע עבודה יקרה יותר.",
      could: "אפשר בלי memo, עם selector טוב, פיצול component, store granular או compiler עתידי.",
      better: "מדוד קודם. לעיתים פיצול state או הסרת render מיותרת טובים יותר מ-memo.",
      analogy: "כמו לשמור תשובה של תרגיל קשה. אין טעם לשמור תשובה של 1+1.",
    },
    {
      id: "router",
      name: "Router",
      simple: "מפה בין URL לבין המסך שצריך להציג.",
      why: "נבנה כדי שאפליקציית client תרגיש כמו אתר עם כתובות, back/forward וקישורים.",
      replaced: "החליף ניווט ידני עם hash, תנאים גדולים, או טעינה מלאה מהשרת לכל מעבר.",
      efficiency: "Route split ו-lazy loading מאפשרים לטעון רק אזור נדרש. Router לא טוב הופך כל ניווט ל-render רחב.",
      could: "אפשר multi-page app רגיל, Next file routing, server routing או state machine פנימית.",
      better: "Routes צריכים להיות לפי workflow אמיתי, לא לפי כל component קטן.",
      analogy: "כמו מפה בקניון: כתובת אומרת לאן ללכת ומה להציג.",
    },
  ];

  const PROGRAMMING_REACT_ALTERNATIVES = [
    {
      name: "Vanilla DOM",
      when: "רכיב קטן, widget פשוט, או אתר סטטי עם מעט אינטראקציה.",
      efficiency: "אפס framework bundle; DOM updates ידניים. יעיל מאוד כשמספר המצבים קטן.",
      cost: "ככל שה-state גדל, הסנכרון הידני נהיה שביר.",
    },
    {
      name: "Web Components",
      when: "רכיבים עצמאיים שרוצים להריץ בכמה frameworks.",
      efficiency: "Native browser APIs; Shadow DOM מוסיף בידוד אבל דורש תכנון styling/events.",
      cost: "פחות ergonomic מ-React בהרבה workflows, במיוחד state/data flow.",
    },
    {
      name: "Svelte / compile-time UI",
      when: "רוצים פחות runtime והרבה עבודה בזמן build.",
      efficiency: "ה-compiler מייצר DOM updates ממוקדים; פחות runtime כללי.",
      cost: "מודל שונה, ecosystem אחר, וחלק מהקסם קורה בזמן קומפילציה.",
    },
    {
      name: "Solid / fine-grained signals",
      when: "UI אינטראקטיבי עם עדכונים נקודתיים מאוד.",
      efficiency: "עדכונים ברמת signal במקום render של subtree שלם.",
      cost: "דורש מודל חשיבה אחר; פחות נפוץ בשוק React המקומי.",
    },
    {
      name: "Server-rendered pages",
      when: "אתר תוכן, טפסים פשוטים, SEO, או מעט state בצד לקוח.",
      efficiency: "פחות JavaScript בצד לקוח; זמן אינטראקטיביות טוב אם שומרים על פשטות.",
      cost: "אינטראקציות עשירות דורשות שכבת client נוספת.",
    },
  ];

  const PROGRAMMING_REACT_BETTER_PATTERNS = [
    {
      title: "State הכי קרוב למי שמשתמש בו",
      rule: "אל תעלה state ל-root אם רק כרטיס אחד צריך אותו.",
      benefit: "פחות render רחב, פחות props מיותרים, פחות coupling.",
    },
    {
      title: "חשב derived data בזמן render",
      rule: "אם `fullName` נבנה מ-`firstName + lastName`, אל תשמור אותו ב-state נפרד.",
      benefit: "פחות באגים של סנכרון ופחות effects מלאכותיים.",
    },
    {
      title: "keys יציבים ברשימות",
      rule: "השתמש ב-id אמיתי. אל תשתמש ב-index אם הרשימה יכולה להשתנות.",
      benefit: "React שומר identity נכון ומונע בלבול בין items.",
    },
    {
      title: "Context קטן ומפוצל",
      rule: "ערך שמשתנה כל שנייה לא צריך לשבת באותו context עם theme שכמעט לא משתנה.",
      benefit: "פחות consumers מתעדכנים ללא צורך.",
    },
    {
      title: "Effect רק לעולם החיצוני",
      rule: "סינון, מיון וחישוב label הם render logic, לא effect.",
      benefit: "פחות loops, פחות dependencies שבירות, קוד קל יותר לבדיקה.",
    },
    {
      title: "מדוד לפני memo",
      rule: "memo/useMemo/useCallback נכנסים אחרי שיש render יקר או identity problem אמיתי.",
      benefit: "פחות קוד מבלבל, פחות cache שלא מחזיר השקעה.",
    },
  ];

  const PROGRAMMING_EFFICIENCY_AXES = [
    {
      id: "time",
      title: "זמן ריצה",
      plain: "כמה פעולות הקוד עושה כשהקלט גדל.",
      question: "אם יש 10 פריטים ואז 10,000, האם הקוד עדיין הגיוני?",
    },
    {
      id: "memory",
      title: "זיכרון",
      plain: "כמה ערכים, אובייקטים, arrays ו-caches נשמרים בזמן העבודה.",
      question: "האם יצרתי עותק ענק רק כדי לשנות שדה אחד?",
    },
    {
      id: "network",
      title: "רשת ו-I/O",
      plain: "בקשות HTTP, קבצים, DB וכל דבר שמחכה לעולם החיצוני.",
      question: "האם אני מחכה ל-20 בקשות במקום לבקש פעם אחת נכון?",
    },
    {
      id: "render",
      title: "Render ו-DOM",
      plain: "כמה חלקים במסך צריכים להיבנות או להתעדכן.",
      question: "האם שינוי קטן גורם לעץ UI גדול להצטייר מחדש?",
    },
    {
      id: "bundle",
      title: "Bundle וטעינה",
      plain: "כמה JavaScript/CSS המשתמש צריך להוריד לפני שהמסך שימושי.",
      question: "האם ייבאתי ספרייה שלמה בשביל פעולה אחת?",
    },
    {
      id: "maintainability",
      title: "תחזוקה",
      plain: "כמה קל להבין, לבדוק ולשנות את הקוד בלי לשבור משהו אחר.",
      question: "האם האופטימיזציה הפכה קוד פשוט לחידה?",
    },
  ];

  const PROGRAMMING_BIG_O_SCALE = [
    {
      id: "o1",
      notation: "O(1)",
      name: "קבוע",
      simple: "הפעולה לוקחת בערך אותו מספר צעדים, בלי קשר לגודל הרשימה.",
      example: "arr[0], obj.userId, set.has(id)",
      warning: "O(1) לא תמיד מהיר במספר מוחלט; הוא רק לא גדל עם n.",
    },
    {
      id: "ologn",
      notation: "O(log n)",
      name: "חיפוש מצמצם",
      simple: "בכל צעד חותכים את הבעיה לחלק קטן יותר.",
      example: "binary search ברשימה ממוינת",
      warning: "דורש מבנה מתאים, למשל נתונים ממוינים.",
    },
    {
      id: "on",
      notation: "O(n)",
      name: "מעבר מלא",
      simple: "עוברים על כל פריט פעם אחת.",
      example: "map, filter, reduce, find במקרה גרוע",
      warning: "מעבר אחד סביר. הרבה מעברים על אותה רשימה כבר מצטברים.",
    },
    {
      id: "onlogn",
      notation: "O(n log n)",
      name: "מיון יעיל",
      simple: "העלות הנפוצה של מיון כללי טוב.",
      example: "sort לרשימה בינונית/גדולה",
      warning: "אל תמיין בכל render אם אפשר למיין פעם אחת או לשמור תוצאה.",
    },
    {
      id: "on2",
      notation: "O(n²)",
      name: "לולאה בתוך לולאה",
      simple: "כל פריט נבדק מול הרבה פריטים אחרים.",
      example: "items.map(a => items.find(b => b.id === a.parentId))",
      warning: "זה נראה תמים ב-20 פריטים ומתפוצץ ב-20,000.",
    },
  ];

  const PROGRAMMING_EFFICIENCY_CORE_CONCEPTS = [
    {
      id: "data-structure",
      name: "מבנה נתונים",
      simple: "הצורה שבה שומרים מידע: Array, Object, Map, Set, Queue.",
      why: "בחירת המבנה קובעת אם חיפוש יהיה O(n) או O(1), ואם הקוד יהיה קריא.",
      mustKnow: "Array טוב לסדר; Object/Map טובים לגישה לפי key; Set טוב לשאלה “האם קיים?”.",
      next: "נדרש ל-map/filter/reduce, React lists, routing, cache, DB results.",
    },
    {
      id: "identity",
      name: "Identity מול Equality",
      simple: "שני אובייקטים יכולים להיראות אותו דבר אבל להיות שני מופעים שונים בזיכרון.",
      why: "React, memo, dependencies ו-Set/Map תלויים בזה.",
      mustKnow: "`{} === {}` הוא false, כי אלו שתי כתובות שונות.",
      next: "קריטי ל-useEffect dependencies, memo, keys ו-state immutable.",
    },
    {
      id: "reference",
      name: "Reference ו-Mutation",
      simple: "אובייקט/מערך נשמרים כ-reference. שינוי פנימי יכול להשפיע על מי שמחזיק אותו.",
      why: "הרבה באגים ב-React מגיעים משינוי state במקום יצירת עותק.",
      mustKnow: "ב-React לא משנים state ישן ישירות; יוצרים ערך חדש שמייצג שינוי.",
      next: "נדרש ל-useState, reducers, forms, arrays, objects ו-debugging.",
    },
    {
      id: "derived",
      name: "Derived Data",
      simple: "מידע שאפשר לחשב מנתונים קיימים במקום לשמור אותו בנפרד.",
      why: "State כפול יוצר סתירות: אחד התעדכן והשני נשכח.",
      mustKnow: "אם `count = items.length`, לרוב לא צריך לשמור `count` ב-state.",
      next: "נדרש ל-React state, selectors, filters, totals ו-dashboard data.",
    },
    {
      id: "side-effect",
      name: "Side Effect",
      simple: "פעולה שמשפיעה על משהו מחוץ לחישוב: fetch, timer, DOM, localStorage, log.",
      why: "צריך להפריד בין חישוב טהור לבין פעולה בעולם החיצוני.",
      mustKnow: "פונקציה טהורה מחזירה פלט לפי קלט. effect מדבר עם העולם.",
      next: "נדרש ל-useEffect, async/await, Node APIs, storage ו-testing.",
    },
    {
      id: "event-loop",
      name: "Event Loop ו-Async",
      simple: "JavaScript לא מחכה לכל דבר; הוא מתזמן callbacks/promises וחוזר אליהם כשיש תוצאה.",
      why: "בלי זה קשה להבין fetch, timers, Node וטעינות מידע.",
      mustKnow: "async לא אומר מהר יותר. הוא אומר לא לחסום את thread בזמן שמחכים.",
      next: "נדרש ל-Promise, fetch, Express, DB calls ו-loading states.",
    },
    {
      id: "render-cost",
      name: "עלות Render",
      simple: "כל ציור מחדש של UI דורש חישוב, השוואה ולעיתים DOM updates.",
      why: "ב-React שינוי state קטן יכול לגרום להרבה components לרוץ שוב.",
      mustKnow: "Render אינו DOM update בהכרח, אבל הוא עדיין עבודה.",
      next: "נדרש ל-components, memo, context, lists ו-performance debugging.",
    },
    {
      id: "network-cost",
      name: "עלות רשת",
      simple: "בקשה לשרת יקרה בהרבה מחישוב מקומי קטן.",
      why: "UI טוב צריך לחשוב על latency, payload, cache, retry ו-error states.",
      mustKnow: "100ms ברשת מורגשים יותר ממיקרו-אופטימיזציה בלולאה קטנה.",
      next: "נדרש ל-Fetch, REST API, Node, DB, pagination ו-loading UX.",
    },
    {
      id: "bundle-cost",
      name: "Bundle Cost",
      simple: "כל ספרייה שמייבאים יכולה להגדיל את זמן ההורדה, parse וההרצה.",
      why: "ספרייה טובה במקום הלא נכון יכולה להפוך מסך פשוט לכבד.",
      mustKnow: "לפני import בדוק אם API מובנה פותר את זה.",
      next: "נדרש ל-Vite, React, Next, lazy loading ו-production build.",
    },
    {
      id: "cache",
      name: "Cache ו-Memoization",
      simple: "שומרים תוצאה כדי לא לחשב שוב.",
      why: "Cache עוזר כשאותו קלט חוזר וחישוב יקר. הוא מזיק כששומרים יותר מדי או שוכחים invalidation.",
      mustKnow: "Cache הוא עסקה: פחות זמן, יותר זיכרון ויותר מורכבות.",
      next: "נדרש ל-useMemo, server cache, DB cache, fetch cache ו-SRS.",
    },
    {
      id: "measurement",
      name: "מדידה לפני אופטימיזציה",
      simple: "לא מנחשים איפה איטי. מודדים.",
      why: "האינטואיציה מטעה: לפעמים הבעיה היא רשת או render, לא הלולאה.",
      mustKnow: "השתמש ב-DevTools, console.time, Lighthouse, React Profiler או לוגים ממוקדים.",
      next: "נדרש לכל debugging מתקדם ולשיפור ביצועים אמיתי.",
    },
    {
      id: "readability",
      name: "יעילות תחזוקה",
      simple: "קוד שאפשר להבין מהר הוא חלק מביצועים של צוות.",
      why: "אופטימיזציה שמקשה על תיקון באגים יכולה להיות הפסד.",
      mustKnow: "הקוד הפשוט מנצח עד שיש מדידה שמוכיחה אחרת.",
      next: "נדרש לפרויקטים, code review, tests ועבודת צוות.",
    },
  ];

  const PROGRAMMING_NEXT_CHAPTER_PREREQS = [
    {
      id: "arrays",
      chapter: "מערכים ופונקציות",
      must: "O(n), callback, reference, pure function, reduce/map/filter.",
      ifMissing: "התלמיד יזכור syntax אבל לא יבין למה פעולה אחת עוברת על כל הרשימה.",
      readiness: "האם אתה יודע להסביר מתי `find` עוצר ומתי `filter` ממשיך עד הסוף?",
    },
    {
      id: "dom",
      chapter: "Objects, DOM ו-Storage",
      must: "object identity, mutation, DOM node, event, localStorage side effect.",
      ifMissing: "יהיה בלבול בין data לבין מה שמוצג במסך.",
      readiness: "האם אתה יודע להסביר למה שינוי object לא תמיד מעדכן UI?",
    },
    {
      id: "async",
      chapter: "Async, Promise ו-Fetch",
      must: "event loop, latency, Promise state, error path, side effect.",
      ifMissing: "fetch ייתפס כפקודה רגילה במקום בקשה שמגיעה בעתיד.",
      readiness: "האם אתה יודע מה מוצג למסך בזמן שמחכים לתשובת שרת?",
    },
    {
      id: "node",
      chapter: "Node.js ו-Express",
      must: "I/O, request/response, middleware order, CPU vs waiting, error handling.",
      ifMissing: "התלמיד יכתוב route שעובד, אבל לא יבין bottleneck או middleware שנדרס.",
      readiness: "האם אתה יודע להסביר למה DB call הוא async ולמה לא לחסום request?",
    },
    {
      id: "react",
      chapter: "React",
      must: "identity, immutable state, render cost, derived data, keys, side effects.",
      ifMissing: "יופיעו infinite loops, stale data, רשימות קופצות ו-state כפול.",
      readiness: "האם אתה יודע להסביר למה `setState` צריך ערך חדש ולא שינוי פנימי?",
    },
    {
      id: "router",
      chapter: "Router ו-Context",
      must: "tree, scope, shared state, provider value identity, lazy route.",
      ifMissing: "Context יהפוך למחסן כללי שגורם לרנדרים רחבים.",
      readiness: "האם אתה יודע מתי props עדיפים על Context?",
    },
    {
      id: "db",
      chapter: "Database ו-MongoDB",
      must: "index, query cost, pagination, network payload, schema shape.",
      ifMissing: "התלמיד יביא יותר מדי נתונים או יחפש בלי אינדקס.",
      readiness: "האם אתה יודע למה לא שולפים 10,000 רשומות כדי להציג 20?",
    },
    {
      id: "typescript",
      chapter: "TypeScript",
      must: "compile-time vs runtime, shape, contract, narrowing, unknown.",
      ifMissing: "טיפוסים ייתפסו כהגנה בזמן ריצה במקום ככלי שמונע טעויות לפני הרצה.",
      readiness: "האם אתה יודע להסביר למה TypeScript לא בודק JSON אמיתי בלי validation?",
    },
  ];

  const PROGRAMMING_EFFICIENCY_DECISION_RULES = [
    "התחל בקוד פשוט וברור; אופטימיזציה באה אחרי שמבינים את הבעיה.",
    "בחר מבנה נתונים לפי השאלה: סדר, חיפוש לפי key, ייחודיות, תור או מחסנית.",
    "אם יש לולאה בתוך לולאה, שאל אם Map/Object יכול להפוך חיפוש ל-O(1).",
    "אל תשמור state שאפשר לחשב מנתונים קיימים.",
    "ברשת ו-DB, צמצם payload, השתמש ב-pagination ואל תחזור על אותה בקשה בלי צורך.",
    "ב-React, צמצם את אזור ה-state לפני שאתה מוסיף memo.",
    "ייבא ספרייה רק אם היא חוסכת מורכבות אמיתית ולא רק שורת קוד.",
    "מדוד את צוואר הבקבוק: CPU, memory, network, render, bundle או תחזוקה.",
  ];

  const PROGRAMMING_PRINCIPLES = [
    {
      id: "determinism",
      name: "דטרמיניסטיות",
      simple: "אותו קלט, אותה תוצאה, בכל הרצה.",
      why: "בלי דטרמיניסטיות קשה לבדוק, לשחזר באגים, להשוות תוצאות או לבנות מערכת אמינה.",
      must: "כל פעולה חשובה צריכה להיות צפויה או לפחות לתעד בבירור את מקור השינוי שלה.",
      example: "calculateTotal([10, 20]) תמיד מחזירה 30.",
    },
    {
      id: "input-output",
      name: "קלט ופלט",
      simple: "כל פעולה מקבלת משהו, עושה כלל ברור, ומחזירה משהו.",
      why: "זה הופך קוד למכונה קטנה שאפשר לבדוק לבד.",
      must: "לפני כתיבת פונקציה, שאל: מה נכנס, מה יוצא, ומה אסור לה לעשות.",
      example: "formatPrice(12) → \"₪12\".",
    },
    {
      id: "pure-functions",
      name: "פונקציות טהורות",
      simple: "פונקציה שלא משנה את העולם, אלא רק מחזירה פלט לפי קלט.",
      why: "קל לבדוק, קל להבין, קל לשלב ב-map/filter/reduce וברכיבי React.",
      must: "חישובים עסקיים, formatting וסינון צריכים להיות טהורים כשאפשר.",
      example: "isPassing(score) מחזירה boolean ולא משנה state.",
    },
    {
      id: "state",
      name: "State",
      simple: "המידע שמשתנה לאורך זמן במערכת.",
      why: "רוב הבאגים באפליקציות הם state לא מסונכרן, state כפול, או state במקום הלא נכון.",
      must: "שמור state מינימלי, ברור וקרוב למי שמשתמש בו.",
      example: "isOpen, selectedId, currentUser.",
    },
    {
      id: "immutability",
      name: "Immutability",
      simple: "במקום לשנות ערך קיים, יוצרים ערך חדש שמייצג את השינוי.",
      why: "React, time travel, בדיקות והשוואות מסתמכים על שינוי ברור של reference.",
      must: "ב-state מורכב, העדף spread/map/filter על שינוי פנימי ישיר.",
      example: "nextItems = items.filter(item => item.id !== removedId).",
    },
    {
      id: "contracts",
      name: "Contracts",
      simple: "הסכם ברור: מה פונקציה או מודול מבטיחים לקבל ולהחזיר.",
      why: "Contracts מונעים בלבול בין חלקי מערכת ומקטינים באגים בגבולות.",
      must: "שם, פרמטרים, return, error cases וטיפוסים צריכים להיות ברורים.",
      example: "createUser(input) מחזירה { ok, user, error }.",
    },
    {
      id: "validation",
      name: "Validation",
      simple: "בדיקה שקלט באמת מתאים למה שהקוד מצפה לקבל.",
      why: "משתמשים, שרתים ו-JSON חיצוני לא תמיד שולחים מידע תקין.",
      must: "בדוק גבולות מערכת: forms, API input, localStorage, URL params.",
      example: "email חייב להכיל @, price חייב להיות מספר חיובי.",
    },
    {
      id: "errors",
      name: "Error Handling",
      simple: "מה עושים כשמשהו לא עובד.",
      why: "מערכת טובה לא מניחה שהכול מצליח: רשת נופלת, קובץ חסר, קלט שגוי.",
      must: "לכל פעולה חשובה צריך success path ו-failure path.",
      example: "try/catch סביב fetch + הודעה למשתמש.",
    },
    {
      id: "edge-cases",
      name: "Edge Cases",
      simple: "המקרים הקטנים ששוברים קוד שנראה עובד.",
      why: "ריק, null, כפילויות, עברית/RTL, מספרים שליליים וקלט ארוך הם מקור באגים קבוע.",
      must: "בדוק empty, one item, many items, invalid input ו-duplicate input.",
      example: "מה קורה אם הרשימה ריקה?",
    },
    {
      id: "idempotency",
      name: "Idempotency",
      simple: "אפשר להריץ פעולה שוב, והתוצאה הסופית לא משתנה מעבר לפעם הראשונה.",
      why: "קריטי ל-API, שמירה, retry, סנכרון ופעולות משתמש כפולות.",
      must: "פעולות שמירה/ניקוי/נרמול צריכות להיות בטוחות להרצה חוזרת כשאפשר.",
      example: "normalizeTags(normalizeTags(tags)) נותן אותה תוצאה.",
    },
    {
      id: "composition",
      name: "Composition",
      simple: "בונים דבר גדול מחלקים קטנים וברורים.",
      why: "פונקציות, components ו-modules נשארים ניתנים לבדיקה ושימוש חוזר.",
      must: "העדף כמה פונקציות קטנות עם שמות טובים על פונקציה אחת שעושה הכול.",
      example: "validate → normalize → save → render.",
    },
    {
      id: "abstraction",
      name: "Abstraction",
      simple: "מסתירים פרטים לא חשובים מאחורי שם או API פשוט.",
      why: "בלי abstraction הקוד חוזר על עצמו; עם abstraction מוקדם מדי הקוד נהיה מעורפל.",
      must: "בנה abstraction רק כשהיא מסירה כפילות או מסבירה רעיון אמיתי.",
      example: "formatUserName(user) במקום לשכפל חיבור שם בכל מקום.",
    },
    {
      id: "separation",
      name: "Separation of Concerns",
      simple: "כל חלק אחראי לדבר אחד ברור.",
      why: "כשה-UI, ה-data, ה-validation וה-network מעורבבים, כל שינוי יקר ומסוכן.",
      must: "הפרד חישוב, תצוגה, גישה לשרת, ולידציה וניהול state.",
      example: "api.js מביא מידע; component מציג אותו.",
    },
    {
      id: "cohesion-coupling",
      name: "Cohesion ו-Coupling",
      simple: "Cohesion: חלקים קשורים חיים יחד. Coupling: תלות בין חלקים.",
      why: "קוד טוב הוא cohesive אבל לא tightly coupled.",
      must: "שים יחד דברים שמשתנים יחד; צמצם ידע של מודול על פרטים פנימיים של מודול אחר.",
      example: "CartSummary לא צריך לדעת איך API שומר הזמנה.",
    },
    {
      id: "naming",
      name: "Naming",
      simple: "שם טוב הוא תיעוד קצר.",
      why: "רוב הזמן קוראים קוד, לא כותבים. שם עמום מכריח לפתוח את כל המימוש.",
      must: "שם צריך להגיד מה הדבר מייצג, לא רק איזה טיפוס הוא.",
      example: "isPaymentPending טוב יותר מ-flag.",
    },
    {
      id: "data-modeling",
      name: "Data Modeling",
      simple: "החלטה איך מידע נראה במערכת.",
      why: "מבנה נתונים טוב מקל על UI, API, DB ובדיקות.",
      must: "בחר id יציב, שמות עקביים, יחסים ברורים וערכים חסרים מוגדרים.",
      example: "{ id, title, status, createdAt }.",
    },
    {
      id: "testing",
      name: "Testing",
      simple: "בדיקות מוכיחות שהתנהגות נשארת נכונה אחרי שינוי.",
      why: "בדיקות הן רשת ביטחון, במיוחד כשמוסיפים פיצ'רים או מתקנים באגים.",
      must: "בדוק פונקציות טהורות, edge cases, טעויות, וזרימות משתמש חשובות.",
      example: "expect(calculateTotal(items)).toBe(30).",
    },
    {
      id: "observability",
      name: "Observability",
      simple: "יכולת להבין מה קרה במערכת אחרי שהיא רצה.",
      why: "בלי logs, מדדים ושגיאות ברורות, באג בפרודקשן הופך לניחוש.",
      must: "כתוב הודעות שגיאה מועילות, מדוד זמני פעולה, ותעד אירועים חשובים.",
      example: "log עם action, conceptId, result, duration.",
    },
    {
      id: "security",
      name: "Security בסיסי",
      simple: "לא סומכים על קלט ולא מציגים תוכן מסוכן כמו שהוא.",
      why: "XSS, injection, secrets בצד לקוח והרשאות שגויות הם באגים חמורים.",
      must: "Sanitize output, validate input, אל תשים סודות ב-frontend.",
      example: "טקסט משתמש מוצג דרך escaping/sanitization.",
    },
    {
      id: "accessibility",
      name: "Accessibility",
      simple: "קוד UI שאנשים שונים וטכנולוגיות עזר יכולים להשתמש בו.",
      why: "כפתור בלי שם, contrast חלש או focus שבור הם באגים אמיתיים.",
      must: "ARIA כשצריך, HTML סמנטי, keyboard, focus, contrast ו-RTL.",
      example: "button עם aria-label כאשר יש רק אייקון.",
    },
    {
      id: "async-control",
      name: "שליטה ב-Async",
      simple: "ניהול פעולות שמסתיימות בעתיד.",
      why: "טעינה כפולה, race condition, stale result ו-loading נתקע הם באגים נפוצים.",
      must: "נהל loading/error/success, ביטול, retry וסדר תוצאות.",
      example: "בקשה ישנה לא דורסת תוצאה של בקשה חדשה.",
    },
    {
      id: "performance-budget",
      name: "Performance Budget",
      simple: "גבול מוסכם לכמה כבד מותר לפיצ'ר להיות.",
      why: "בלי תקציב, כל import קטן מצטבר לאפליקציה איטית.",
      must: "בדוק bundle, render, network, DB ו-memory לפני שמכריזים Done.",
      example: "לא מייבאים ספרייה גדולה בשביל פונקציה אחת פשוטה.",
    },
  ];

  const PROGRAMMING_DETERMINISTIC_EXAMPLES = [
    {
      id: "pure-total",
      title: "חישוב סכום טהור",
      principle: "דטרמיניסטיות + פונקציה טהורה",
      code: "function total(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}\n\ntotal([{ price: 10 }, { price: 20 }]); // 30",
      why: "אותו array עם אותם prices תמיד מחזיר 30. אין תלות בזמן, רשת או state חיצוני.",
    },
    {
      id: "content-id",
      title: "id יציב מתוכן",
      principle: "דטרמיניזם במקום ערך אקראי",
      code: "function hashId(text) {\n  let hash = 0;\n  for (const ch of text) {\n    hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;\n  }\n  return `id-${Math.abs(hash).toString(36)}`;\n}\n\nhashId(\"Array\"); // אותה תוצאה בכל הרצה",
      why: "אותו טקסט יוצר אותו id. זה מתאים ל-tests, cache, anchors ונתונים שנבנים מקלט קבוע.",
    },
    {
      id: "stable-sort",
      title: "סדר יציב לתצוגה",
      principle: "Predictability",
      code: "function sortByTitle(items) {\n  return [...items].sort((a, b) => a.title.localeCompare(b.title, \"he\"));\n}",
      why: "לא משנים את המערך המקורי, והתוצאה תלויה רק בכותרות.",
    },
    {
      id: "state-reducer",
      title: "מעבר state צפוי",
      principle: "State machine קטן",
      code: "function reducer(state, action) {\n  if (action.type === \"open\") return { ...state, open: true };\n  if (action.type === \"close\") return { ...state, open: false };\n  return state;\n}",
      why: "כל action מגדיר מעבר ברור. קל לבדוק מה יקרה לכל מצב.",
    },
    {
      id: "validation-result",
      title: "Validation שמחזיר תוצאה ולא זורק הפתעות",
      principle: "Contracts + errors",
      code: "function validateEmail(email) {\n  if (!email.includes(\"@\")) return { ok: false, error: \"missing-at\" };\n  return { ok: true, value: email.trim().toLowerCase() };\n}",
      why: "הפונקציה מסבירה מה קרה. caller לא צריך לנחש אם יש שגיאה.",
    },
    {
      id: "idempotent-tags",
      title: "פעולה Idempotent",
      principle: "הרצה חוזרת בטוחה",
      code: "function normalizeTags(tags) {\n  return [...new Set(tags.map(tag => tag.trim().toLowerCase()))].sort();\n}",
      why: "אם מריצים שוב על אותה תוצאה, היא נשארת זהה. זה חשוב ל-retry וסנכרון.",
    },
  ];

  const PROGRAMMING_PRINCIPLES_CHECKLIST = [
    "האם הפונקציה מקבלת קלט ברור ומחזירה פלט ברור?",
    "האם אותה פעולה על אותו קלט תחזיר אותה תוצאה?",
    "האם state נשמר במקום אחד ולא כפול?",
    "האם יש טיפול ב-empty, null, duplicate וקלט לא חוקי?",
    "האם יש הפרדה בין חישוב טהור לבין side effects?",
    "האם השמות מסבירים את הכוונה ולא רק את הטיפוס?",
    "האם אפשר לבדוק את החלק הזה בלי לפתוח את כל האפליקציה?",
    "האם יש דרך להבין מה קרה כשהפעולה נכשלת?",
  ];

  function scrollBasicsSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function slugifyId(value) {
    let hash = 0;
    String(value || "").split("").forEach((ch) => {
      hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
    });
    return `id-${Math.abs(hash).toString(36)}`;
  }

  function setProgrammingBasicsContextTree() {
    setContextTree(
      "אבני בסיס",
      [
        {
          id: "pb-tabs",
          label: "תתי טאבים",
          open: true,
          children: PROGRAMMING_BASICS_TABS.map((tab) => ({
            id: tab.id,
            label: `${tab.icon} ${tab.label}`,
            active: programmingBasicsTab === tab.id,
            action: () => {
              programmingBasicsTab = tab.id;
              renderProgrammingBasics();
              setProgrammingBasicsContextTree();
            },
          })),
        },
        {
          id: "pb-current",
          label: "במסך הנוכחי",
          open: true,
          children:
            programmingBasicsTab === "foundations"
              ? [
                  ...PROGRAMMING_BASICS_BLOCKS.map((block) => ({
                    id: block.id,
                    label: `${block.icon} ${block.name}`,
                    action: () => scrollBasicsSection(`pb-block-${block.id}`),
                  })),
                  {
                    id: "fullstack-product-blueprint",
                    label: "תרשים Full-Stack למוצר",
                    action: () => scrollBasicsSection("pb-fullstack-product-blueprint"),
                    children: [
                      ...PROGRAMMING_PRODUCT_LIFECYCLE.map((phase) => ({
                        id: phase.id,
                        label: phase.stage,
                        action: () => scrollBasicsSection(`pb-product-phase-${phase.id}`),
                      })),
                      {
                        id: "product-version-decisions",
                        label: "שדרוג או החלפה",
                        action: () => scrollBasicsSection("pb-product-version-decisions"),
                      },
                    ],
                  },
                ]
              : programmingBasicsTab === "electricity"
                ? [
                    {
                      id: "electric-flow",
                      label: "תרשים חשמל → ערך",
                      action: () => scrollBasicsSection("pb-electricity-flow"),
                    },
	                    {
	                      id: "value-examples",
	                      label: "דוגמאות ערכים",
	                      action: () => scrollBasicsSection("pb-value-examples"),
	                    },
	                    {
	                      id: "what-is-value",
	                      label: "מהו ערך",
	                      action: () => scrollBasicsSection("pb-what-is-value"),
	                    },
	                    {
	                      id: "primitive-dictionary",
	                      label: "מילון אבני בסיס",
	                      action: () => scrollBasicsSection("pb-primitive-dictionary"),
	                    },
	                    {
	                      id: "primitive-terms",
	                      label: "מושגי bit/value/code",
	                      children: PROGRAMMING_PRIMITIVE_DEEP_DIVE.map((item) => ({
	                        id: `term-${item.id}`,
	                        label: item.term,
	                        action: () => scrollBasicsSection(`pb-term-${item.id}`),
	                      })),
	                    },
	                    {
	                      id: "computer-understands",
	                      label: "איך המחשב מבין",
	                      action: () => scrollBasicsSection("pb-computer-understands"),
	                    },
	                    {
	                      id: "language-layers",
	                      label: "שכבות תרגום",
	                      action: () => scrollBasicsSection("pb-language-layers"),
	                    },
	                    ...PROGRAMMING_ELECTRICITY_STEPS.map((item) => ({
	                      id: item.id,
	                      label: `${item.label} — ${item.title}`,
	                      action: () => scrollBasicsSection(`pb-electric-${item.id}`),
	                    })),
	                  ]
	              : programmingBasicsTab === "efficiency"
	                ? [
	                    {
	                      id: "eff-overview",
	                      label: "מהי יעילות",
	                      action: () => scrollBasicsSection("pb-eff-overview"),
	                    },
	                    {
	                      id: "eff-big-o",
	                      label: "סולם Big-O",
	                      action: () => scrollBasicsSection("pb-eff-big-o"),
	                    },
	                    {
	                      id: "eff-next",
	                      label: "מוכנות לפרקים הבאים",
	                      action: () => scrollBasicsSection("pb-eff-next"),
	                    },
	                    {
	                      id: "eff-rules",
	                      label: "כללי החלטה",
	                      action: () => scrollBasicsSection("pb-eff-rules"),
	                    },
	                    ...PROGRAMMING_EFFICIENCY_CORE_CONCEPTS.map((item) => ({
	                      id: item.id,
	                      label: item.name,
	                      action: () => scrollBasicsSection(`pb-eff-${item.id}`),
	                    })),
	                  ]
	              : programmingBasicsTab === "builds"
	                ? [
                    ...PROGRAMMING_BUILD_EXAMPLES.map((group) => ({
                      id: group.group,
                      label: group.group,
                      children: group.items.map((item) => ({
                        id: item.title,
                        label: item.title,
                        action: () => scrollBasicsSection(`pb-build-${slugifyId(group.group)}-${slugifyId(item.title)}`),
                      })),
                    })),
                    {
                      id: "pb-recipes",
                      label: "מתכונים יצירתיים",
                      children: PROGRAMMING_BUILD_RECIPES.map((recipe) => ({
                        id: recipe.id,
                        label: recipe.title,
                        action: () => scrollBasicsSection(`pb-recipe-${recipe.id}`),
                      })),
                    },
                  ]
                : programmingBasicsTab === "menus"
                  ? PROGRAMMING_MENU_EXAMPLES.map((item) => ({
                      id: item.title,
                      label: item.title,
                      action: () => scrollBasicsSection(`pb-menu-${slugifyId(item.title)}`),
                    }))
                  : programmingBasicsTab === "patents"
                    ? PROGRAMMING_PATENTS.map((item) => ({
                        id: item.title,
                        label: item.title,
                        action: () => scrollBasicsSection(`pb-patent-${slugifyId(item.title)}`),
                      }))
                    : programmingBasicsTab === "tech"
                      ? PROGRAMMING_TECH_RANKING.map((item) => ({
                          id: item.name,
                          label: item.name,
                          action: () => scrollBasicsSection(`pb-tech-${slugifyId(item.name)}`),
                        }))
                      : programmingBasicsTab === "languages"
                        ? PROGRAMMING_LANGUAGES.map((item) => ({
                            id: item.name,
                            label: item.name,
                            action: () => scrollBasicsSection(`pb-lang-${slugifyId(item.name)}`),
                          }))
                        : programmingBasicsTab === "history"
                          ? [
                              {
                                id: "history-explain",
                                label: "מהי השפה הראשונה?",
                                action: () => scrollBasicsSection("pb-history-explain"),
                              },
                              ...PROGRAMMING_HISTORY_NODES.map((item) => ({
                                id: item.id,
                                label: `${item.year} — ${item.title}`,
                                action: () => scrollBasicsSection(`pb-history-${item.id}`),
                              })),
                            ]
                          : programmingBasicsTab === "museum"
                            ? [
                                {
                                  id: "museum-overview",
                                  label: "שער המוזיאון",
                                  action: () => scrollBasicsSection("pb-museum-overview"),
                                },
                                {
                                  id: "museum-lineages",
                                  label: "שושלות רעיונות",
                                  action: () => scrollBasicsSection("pb-museum-lineages"),
                                },
                                {
                                  id: "museum-extensions",
                                  label: "הצעות הרחבה",
                                  action: () => scrollBasicsSection("pb-museum-extensions"),
                                },
                                ...PROGRAMMING_LANGUAGE_MUSEUM_HALLS.map((item) => ({
                                  id: item.id,
                                  label: `${item.period} — ${item.title}`,
                                  action: () => scrollBasicsSection(`pb-museum-${item.id}`),
                                })),
                              ]
                            : [
                                {
                                  id: "react-overview",
                                  label: "למה React נבנה?",
                                  action: () => scrollBasicsSection("pb-react-overview"),
                                },
                                {
                                  id: "react-build-path",
                                  label: "מפת בנייה",
                                  action: () => scrollBasicsSection("pb-react-build-path"),
                                },
                                {
                                  id: "react-alternatives",
                                  label: "חלופות",
                                  action: () => scrollBasicsSection("pb-react-alternatives"),
                                },
                                {
                                  id: "react-better",
                                  label: "בונים טוב יותר",
                                  action: () => scrollBasicsSection("pb-react-better"),
                                },
                                ...PROGRAMMING_REACT_CONCEPTS.map((item) => ({
                                  id: item.id,
                                  label: item.name,
                                  action: () => scrollBasicsSection(`pb-react-${item.id}`),
                                })),
                              ],
        },
      ],
      { key: "programming-basics" },
    );
  }

  function setProgrammingPrinciplesContextTree() {
    setContextTree(
      "עקרונות יסוד",
      [
        {
          id: "principles-overview",
          label: "סקירה",
          open: true,
          children: [
            {
              id: "principles-determinism",
              label: "דטרמיניסטיות",
              action: () => scrollBasicsSection("principles-determinism"),
            },
            {
              id: "principles-examples",
              label: "דוגמאות דטרמיניסטיות",
              action: () => scrollBasicsSection("principles-examples"),
            },
            {
              id: "principles-checklist",
              label: "Checklist",
              action: () => scrollBasicsSection("principles-checklist"),
            },
          ],
        },
        {
          id: "principles-terms",
          label: "מושגים הכרחיים",
          open: true,
          children: PROGRAMMING_PRINCIPLES.map((item) => ({
            id: item.id,
            label: item.name,
            action: () => scrollBasicsSection(`principle-${item.id}`),
          })),
        },
      ],
      { key: "programming-principles" },
    );
  }

  function setProgrammingMuseumContextTree() {
    const stackLayerId = getMuseumStackLayerId();
    const stackLayerMuseum = PROGRAMMING_STACK_LAYER_MUSEUMS.find((layer) => layer.id === stackLayerId);
    if (stackLayerMuseum) {
      setContextTree(
        stackLayerMuseum.title,
        [
          {
            id: "stack-layer-overview",
            label: "מבוא השכבה",
            open: true,
            children: [
              {
                id: "stack-layer-gate",
                label: "שער המוזיאון",
                action: () => scrollBasicsSection("stack-layer-museum-gate"),
              },
            {
              id: "stack-layer-pathway",
              label: "תרשים התפתחות",
              action: () => scrollBasicsSection("stack-layer-pathway-section"),
            },
            {
              id: "stack-layer-connection-system",
              label: "מערכת קשרים",
              action: () => scrollBasicsSection("stack-layer-connection-system"),
            },
          ],
        },
          {
            id: "stack-layer-rooms",
            label: "אולמות תצוגה",
            open: true,
            children: stackLayerMuseum.rooms.map((room, idx) => ({
              id: `${stackLayerMuseum.id}-${room.id}`,
              label: `${idx + 1}. ${room.title}`,
              meta: "חדר תצוגה",
              action: () => scrollBasicsSection(`stack-layer-room-${room.id}`),
            })),
          },
          {
            id: "stack-layer-siblings",
            label: "מוזיאוני בלוקים",
            open: true,
            children: PROGRAMMING_STACK_LAYER_MUSEUMS.map((layer) => ({
              id: `stack-layer-link-${layer.id}`,
              label: layer.blockTitle,
              meta: layer.id === stackLayerMuseum.id ? "נוכחי" : "פתח",
              action: () => {
                window.location.href = `/?standalone=museum&stackLayer=${encodeURIComponent(layer.id)}&v=${encodeURIComponent(MUSEUM_STACK_LAYER_PAGE_VERSION)}`;
              },
            })),
          },
        ],
        { key: `programming-museum-${stackLayerMuseum.id}` },
      );
      return;
    }

    setContextTree(
      "מוזיאון שפות התכנות",
      [
        {
          id: "museum-experience",
          label: "חוויית ביקור",
          open: true,
          children: [
            {
              id: "museum-gate",
              label: "שער הכניסה",
              action: () => scrollBasicsSection("programming-museum-gate"),
            },
            {
              id: "museum-stack",
              label: "תרשים שכבות",
              action: () => scrollBasicsSection("programming-museum-stack"),
            },
            {
              id: "museum-timeline",
              label: "ציר זמן חי",
              action: () => scrollBasicsSection("programming-museum-timeline"),
            },
            {
              id: "museum-guided-routes",
              label: "מסלולי ביקור",
              action: () => scrollBasicsSection("programming-museum-guided-routes"),
            },
            {
              id: "museum-connection-system",
              label: "מערכת קשרים",
              action: () => scrollBasicsSection("programming-museum-connection-system"),
            },
            {
              id: "fullstack-museum-wing",
              label: "מוזיאון Full-Stack",
              action: () => scrollBasicsSection("fullstack-museum-wing"),
            },
            {
              id: "museum-value-map",
              label: "מפת ערך",
              action: () => scrollBasicsSection("programming-museum-value-map"),
            },
            {
              id: "museum-lineages",
              label: "שושלות רעיונות",
              action: () => scrollBasicsSection("programming-museum-lineages"),
            },
            {
              id: "museum-quests",
              label: "משימות ביקור",
              action: () => scrollBasicsSection("programming-museum-quests"),
            },
          ],
        },
        {
          id: "museum-halls",
          label: "אולמות המוזיאון",
          open: true,
          children: PROGRAMMING_LANGUAGE_MUSEUM_HALLS.map((hall, idx) => ({
            id: hall.id,
            label: `${idx + 1}. ${hall.title}`,
            meta: hall.period,
            action: () => scrollBasicsSection(`programming-museum-hall-${hall.id}`),
            children: [
              ...(hall.subMuseums || []).map((subMuseum, subIdx) => ({
                id: `${hall.id}-sub-museum-${subIdx + 1}`,
                label: subMuseum.title,
                meta: "תת מוזיאון",
                action: () => scrollBasicsSection(`programming-museum-hall-${hall.id}`),
              })),
              ...(hall.exhibits || []).map((exhibit) => ({
                id: `${hall.id}-${slugifyId(exhibit.name)}`,
                label: exhibit.name,
                meta: exhibit.year,
                action: () => scrollBasicsSection(`programming-museum-hall-${hall.id}`),
              })),
            ],
          })),
        },
        {
          id: "fullstack-museum-halls",
          label: "אולמות Full-Stack",
          open: true,
          children: FULL_STACK_MUSEUM_HALLS.map((hall, idx) => ({
            id: `fullstack-${hall.id}`,
            label: `${idx + 1}. ${hall.title}`,
            meta: hall.layer,
            action: () => scrollBasicsSection(`fullstack-museum-hall-${hall.id}`),
            children: [
              {
                id: `fullstack-${hall.id}-why`,
                label: "למה הומצא ומה פתר",
                meta: "הסבר",
                action: () => scrollBasicsSection(`fullstack-museum-hall-${hall.id}`),
              },
              ...((FULL_STACK_DOMAIN_EXHIBITIONS[hall.id]?.rooms || []).map((room) => ({
                id: `fullstack-${hall.id}-${room.id}`,
                label: room.title,
                meta: FULL_STACK_ERA_LABELS[room.era] || "תצוגה",
                action: () => scrollBasicsSection(`fullstack-room-${hall.id}-${room.id}`),
              }))),
            ],
          })),
        },
      ],
      { key: "programming-museum" },
    );
  }

  function setLearningEvidenceContextTree() {
    setContextTree(
      "ראיות למידה",
      [
        {
          id: "learning-evidence-overview",
          label: "מדדים מרכזיים",
          open: true,
          children: [
            {
              id: "le-kpis",
              label: "KPI מקומי",
              action: () => scrollBasicsSection("le-kpis"),
            },
            {
              id: "le-funnels",
              label: "Funnels לפי מושג",
              action: () => scrollBasicsSection("le-funnels"),
            },
            {
              id: "le-days",
              label: "פעילות לפי ימים",
              action: () => scrollBasicsSection("le-days"),
            },
            {
              id: "le-policy",
              label: "פרטיות ומדיניות",
              action: () => scrollBasicsSection("le-policy"),
            },
          ],
        },
      ],
      { key: "learning-evidence" },
    );
  }

  function setKnowledgeMapContextTree() {
    setContextTree(
      "מפת ידע",
      groupedLessonNodes().map((topic) => ({
        ...topic,
        children: topic.children.map((lessonNode) => {
          const lesson = (window.LESSONS_DATA || []).find((l) => l.id === lessonNode.id);
          return {
            ...lessonNode,
            children: (lesson?.concepts || []).map((concept) =>
              conceptLeafNode(lesson, concept),
            ),
          };
        }),
      })),
      { key: "knowledge-map" },
    );
  }

  function setGuideContextTree() {
    const guide = window.QUICK_GUIDE || { topics: [] };
    setContextTree(
      "מדריך מקוצר",
      [
        {
          id: "guide-topics",
          label: "נושאי המדריך",
          open: true,
          children: (guide.topics || []).map((topic) => {
            const counts = bankByTopic(topic.id);
            return {
              id: topic.id,
              label: `${topic.number}. ${topic.title}`,
              meta: `${(topic.blocks || []).length} קטעים`,
              level: `${(counts.mc || []).length + (counts.fill || []).length} ש׳`,
              active: !!guideOpenStates[topic.id],
              action: () => {
                guideOpenStates[topic.id] = true;
                renderGuide();
                setTimeout(() => {
                  document
                    .querySelector(`.guide-topic[data-topic="${cssEscape(topic.id)}"]`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 60);
              },
            };
          }),
        },
      ],
      { key: "guide" },
    );
  }

  function setGrandmaContextTree(tree) {
    setContextTree(
      "מאגר מושגים",
      (tree || []).map((topic) => ({
        id: topic.id,
        label: topic.title,
        open: !!grandmaKnowledgeOpenStates[topic.id],
        children: (topic.subtopics || []).map((subtopic) => ({
          id: subtopic.id,
          label: subtopic.title,
          open: !!grandmaKnowledgeOpenStates[subtopic.id],
          children: (subtopic.sections || []).map((section) => ({
            id: section.id,
            label: section.title,
            open: !!grandmaKnowledgeOpenStates[section.id],
            children: (section.terms || []).map((term) => ({
              id: `term:${term.number}`,
              label: `${term.treeNumber || term.number}. ${term.term}`,
              active: String(term.number) === grandmaKnowledgeSelectedTerm,
              action: () => {
                grandmaKnowledgeOpenStates[topic.id] = true;
                grandmaKnowledgeOpenStates[subtopic.id] = true;
                grandmaKnowledgeOpenStates[section.id] = true;
                grandmaKnowledgeSelectedTerm = String(term.number);
                renderGrandmaKnowledge();
              },
            })),
          })),
        })),
      })),
      { key: "grandma-knowledge" },
    );
  }

  function setStudyContextTree() {
    setContextTree(
      "לימוד מותאם",
      [
        {
          id: "study-queue",
          label: "תור החולשות",
          open: true,
          children: (studyQueue || []).map((item, index) => ({
            id: `study:${item.lesson.id}:${item.concept.conceptName}:${index}`,
            label: item.concept.conceptName,
            meta: item.lesson.title.replace(/^שיעור\s*/, ""),
            active: index === studyIndex,
            action: () => {
              studyIndex = index;
              renderStudyCard();
            },
          })),
        },
      ],
      { key: "study" },
    );
  }

  function setTrainerContextTree() {
    const weakFirst = (window.LESSONS_DATA || []).map((lesson) => ({
      id: `tr:${lesson.id}`,
      label: lesson.title,
      open: false,
      children: (lesson.concepts || [])
        .slice()
        .sort((a, b) => getScore(lesson.id, a.conceptName).level - getScore(lesson.id, b.conceptName).level)
        .slice(0, 8)
        .map((concept) => conceptLeafNode(lesson, concept)),
    }));
    setContextTree(
      "מאמן ידע",
      [
        {
          id: "trainer-mode",
          label: "מצב אימון",
          open: true,
          children: [
            {
              id: "adaptive",
              label: "מעורב אדפטיבי",
              active: trainerMode === "adaptive",
              action: () => {
                trainerMode = "adaptive";
                nextQuestion();
              },
            },
            {
              id: "weak",
              label: "רק חלשים",
              active: trainerMode === "weak",
              action: () => {
                trainerMode = "weak";
                nextQuestion();
              },
            },
          ],
        },
        { id: "weak-first", label: "מושגים חלשים לפי שיעור", open: false, children: weakFirst },
      ],
      { key: "trainer" },
    );
  }

  function setFlashcardsContextTree() {
    setContextTree(
      "כרטיסיות",
      [
        {
          id: "fc-filters",
          label: "סינון",
          open: true,
          children: [
            ["due", "לחזרה היום"],
            ["weak", "חלשים"],
            ["new", "חדשים"],
            ["mastered", "מאסטר"],
            ["all", "הכל"],
          ].map(([value, label]) => ({
            id: `fc-filter:${value}`,
            label,
            active: flashcardsFilter === value,
            action: () => {
              flashcardsFilter = value;
              const el = document.getElementById("fc-filter");
              if (el) el.value = value;
              refreshFlashcards();
            },
          })),
        },
        {
          id: "fc-levels",
          label: "רמת הסבר",
          open: false,
          children: Object.entries(FLASHCARD_LEVEL_LABELS).map(([value, label]) => ({
            id: `fc-level:${value}`,
            label,
            active: flashcardsLevel === value,
            action: () => {
              flashcardsLevel = value;
              const el = document.getElementById("fc-level");
              if (el) el.value = value;
              refreshFlashcards();
            },
          })),
        },
        {
          id: "fc-queue",
          label: "התור הנוכחי",
          open: false,
          children: (flashcardQueue || []).slice(0, 80).map((item, index) => ({
            id: `fc:${item.key}:${index}`,
            label: item.concept.conceptName,
            meta: item.lesson.title.replace(/^שיעור\s*/, ""),
            level: `${item.level}/7`,
            active: index === flashcardIndex,
            stateClass: item.weak ? "is-weak" : item.due ? "is-due" : "",
            action: () => {
              flashcardIndex = index;
              flashcardsRevealed = false;
              saveFlashcardsSession();
              renderFlashcards();
            },
          })),
        },
      ],
      { key: "flashcards" },
    );
  }

  function setCodeAnatomyContextTree(catalog = getAnatomyCatalog()) {
    const byTopic = {};
    (catalog || []).forEach(({ lesson, concept }) => {
      const tx = getTopicForLesson(lesson.id);
      if (!byTopic[tx.topic]) byTopic[tx.topic] = { tx, lessons: {} };
      if (!byTopic[tx.topic].lessons[lesson.id]) {
        byTopic[tx.topic].lessons[lesson.id] = { lesson, concepts: [] };
      }
      byTopic[tx.topic].lessons[lesson.id].concepts.push(concept);
    });
    setContextTree(
      "פירוק קוד",
      Object.values(byTopic).map(({ tx, lessons }) => ({
        id: `an-topic:${tx.topic}`,
        label: `${tx.emoji} ${tx.topic}`,
        open: true,
        children: Object.values(lessons).map(({ lesson, concepts }) => ({
          id: `an-lesson:${lesson.id}`,
          label: lesson.title,
          open: anatomyState.lessonId === lesson.id,
          children: concepts.map((concept) => ({
            id: `an:${lesson.id}:${concept.conceptName}`,
            label: concept.conceptName,
            meta: `${concept.extendedTab.codeBreakdowns.length} קטעים`,
            active: anatomyState.conceptName === concept.conceptName && anatomyState.lessonId === lesson.id,
            action: () => {
              anatomyState.lessonId = lesson.id;
              anatomyState.conceptName = concept.conceptName;
              anatomyState.topic = "";
              const lessonSel = document.getElementById("anatomy-lesson-filter");
              const topicSel = document.getElementById("anatomy-topic-filter");
              const conceptSel = document.getElementById("anatomy-concept-filter");
              if (lessonSel) lessonSel.value = lesson.id;
              if (topicSel) topicSel.value = "";
              if (conceptSel) conceptSel.value = concept.conceptName;
              renderCodeAnatomyPage();
              setTimeout(() => {
                document
                  .querySelector(`.anatomy-concept-block[data-anatomy-concept="${cssEscape(concept.conceptName)}"]`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 60);
            },
          })),
        })),
      })),
      { key: "code-anatomy" },
    );
  }

  function setCodeblocksContextTree() {
    const blocks = (window.CODE_BLOCKS && window.CODE_BLOCKS.blocks) || [];
    const byLesson = {};
    blocks.forEach((block) => {
      if (!byLesson[block.lessonId]) byLesson[block.lessonId] = {};
      if (!byLesson[block.lessonId][block.conceptName]) byLesson[block.lessonId][block.conceptName] = [];
      byLesson[block.lessonId][block.conceptName].push(block);
    });
    setContextTree(
      "בלוקי קוד",
      Object.entries(byLesson).map(([lessonId, concepts]) => {
        const lesson = (window.LESSONS_DATA || []).find((l) => l.id === lessonId);
        return {
          id: `cb-lesson:${lessonId}`,
          label: lesson?.title || lessonId,
          open: cbLessonFilter === lessonId,
          children: Object.entries(concepts).map(([conceptName, list]) => ({
            id: `cb-concept:${lessonId}:${conceptName}`,
            label: conceptName,
            open: false,
            children: list.map((block) => ({
              id: `cb:${block.id}`,
              label: block.title,
              meta: `${(block.questions || []).length} ש׳`,
              active: !!cbOpenStates[block.id],
              action: () => {
                cbLessonFilter = "all";
                cbOpenStates = { [block.id]: true };
                const sel = document.getElementById("cb-filter-lesson");
                if (sel) sel.value = "all";
                renderCodeblocks();
                setTimeout(() => {
                  document
                    .querySelector(`.cb-block[data-block="${cssEscape(block.id)}"]`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 60);
              },
            })),
          })),
        };
      }),
      { key: "codeblocks" },
    );
  }

  function setTraceContextTree() {
    const traces = filteredTraces();
    const byLesson = {};
    traces.forEach((trace) => {
      const [lessonId, conceptName] = (trace.conceptKey || "").split("::");
      if (!byLesson[lessonId]) byLesson[lessonId] = {};
      if (!byLesson[lessonId][conceptName]) byLesson[lessonId][conceptName] = [];
      byLesson[lessonId][conceptName].push(trace);
    });
    setContextTree(
      "Code Trace",
      Object.entries(byLesson).map(([lessonId, concepts]) => {
        const lesson = (window.LESSONS_DATA || []).find((l) => l.id === lessonId);
        return {
          id: `trace-lesson:${lessonId}`,
          label: lesson?.title || lessonId,
          open: traceFilterLesson === lessonId,
          children: Object.entries(concepts).map(([conceptName, list]) => ({
            id: `trace-concept:${lessonId}:${conceptName}`,
            label: conceptName || "ללא מושג",
            children: list.map((trace) => ({
              id: `trace:${trace.id}`,
              label: trace.title || trace.id,
              level: `רמה ${trace.level || "?"}`,
              action: () => startTraceSession(trace),
            })),
          })),
        };
      }),
      { key: "trace" },
    );
  }

  function setMockExamContextTree() {
    setContextTree(
      "מבחן מדומה",
      [
        {
          id: "exam-templates",
          label: "תבניות מבחן",
          open: true,
          children: EXAM_TEMPLATES.map((tpl) => ({
            id: `exam:${tpl.id}`,
            label: tpl.name,
            meta: `${tpl.durationMin} דק׳`,
            action: () => {
              document
                .querySelector(`.mx-template-card[data-tid="${cssEscape(tpl.id)}"]`)
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            },
          })),
        },
        {
          id: "exam-history",
          label: "היסטוריה",
          open: false,
          children: loadExamHistory().slice(0, 12).map((record, index) => ({
            id: `exam-history:${index}`,
            label: record.templateName || "מבחן",
            meta: `${record.score || 0}%`,
          })),
        },
      ],
      { key: "mock-exam" },
    );
  }

  function setComparatorContextTree() {
    const all = typeof COMPARISONS !== "undefined" ? Object.values(COMPARISONS) : [];
    setContextTree(
      "השוואות",
      [
        {
          id: "comparisons",
          label: "זוגות להשוואה",
          open: true,
          children: all.map((cmp) => ({
            id: `cmp:${cmp.pairKey}`,
            label: `${cmp.a?.name || ""} vs ${cmp.b?.name || ""}`,
            meta: `${(cmp.rows || []).length}`,
            action: () => {
              const el = document.querySelector(`.cmp-card[data-cmp="${cssEscape(cmp.pairKey)}"]`);
              el?.setAttribute("open", "");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            },
          })),
        },
      ],
      { key: "comparator" },
    );
  }

  function setGapMatrixContextTree() {
    setContextTree(
      "מטריצת פערים",
      [
        {
          id: "gap-filters",
          label: "סינון",
          open: true,
          children: [
            ["all", "הכל"],
            ["gap", "אדום"],
            ["learning", "צהוב"],
            ["strong", "ירוק"],
            ["untouched", "לא נגעת 7 ימים"],
            ["always-wrong", "טעויות חוזרות"],
          ].map(([value, label]) => ({
            id: `gm:${value}`,
            label,
            active: gmFilter === value,
            action: () => {
              gmFilter = value;
              document.querySelectorAll(".gm-filter-btn").forEach((btn) => {
                btn.classList.toggle("active", btn.dataset.filter === value);
              });
              renderGapMatrix();
            },
          })),
        },
        {
          id: "gap-lessons",
          label: "מושגים לפי נושא",
          open: false,
          children: groupedLessonNodes().map((topic) => ({
            ...topic,
            children: topic.children.map((lessonNode) => {
              const lesson = (window.LESSONS_DATA || []).find((l) => l.id === lessonNode.id);
              return {
                ...lessonNode,
                children: (lesson?.concepts || []).map((concept) => conceptLeafNode(lesson, concept)),
              };
            }),
          })),
        },
      ],
      { key: "gap-matrix" },
    );
  }

  // =========== P1.3 — PWA: Register Service Worker ===========
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("service-worker.js", { scope: "/" })
        .then((reg) => {
          console.log("[LumenPortal] 🛡️ SW registered:", reg.scope);
        })
        .catch((err) => {
          console.warn("[LumenPortal] SW registration failed:", err);
        });
    });
  }

  // =========== MOBILE MENU ===========
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      mobileToggle.setAttribute(
        "aria-expanded",
        sidebar.classList.contains("open") ? "true" : "false",
      );
    });
  }

  // =========== P1.2.4 — Theme Toggle (Light / Dark / Auto) ===========
  const THEME_KEY = "lumenportal:theme:v1";
  const themeToggle = document.getElementById("theme-toggle");
  const themeStates = ["auto", "light", "dark"]; // cycle order
  const themeIcons = { auto: "🌗", light: "☀️", dark: "🌙" };

  function applyTheme(theme) {
    document.documentElement.classList.remove("theme-light", "theme-dark");
    if (theme === "light") document.documentElement.classList.add("theme-light");
    if (theme === "dark") document.documentElement.classList.add("theme-dark");
    if (themeToggle) {
      themeToggle.querySelector("span").textContent = themeIcons[theme] || "🌗";
      themeToggle.setAttribute(
        "aria-label",
        theme === "auto"
          ? "מצב תצוגה: אוטומטי (לחץ למעבר לבהיר)"
          : theme === "light"
            ? "מצב תצוגה: בהיר (לחץ למעבר לכהה)"
            : "מצב תצוגה: כהה (לחץ למעבר לאוטומטי)",
      );
    }
  }

  // Init from localStorage or auto
  let currentTheme = "auto";
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved && themeStates.includes(saved)) currentTheme = saved;
  } catch (_) {}
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const idx = themeStates.indexOf(currentTheme);
      currentTheme = themeStates[(idx + 1) % themeStates.length];
      try {
        localStorage.setItem(THEME_KEY, currentTheme);
      } catch (_) {}
      applyTheme(currentTheme);
    });
  }

  // =========== Pocket Concept Card — saved concepts panel ===========
  (function initPocket() {
    const POCKET_KEY = "lumenportal:pocket:v1";
    const fab = document.getElementById("pocket-fab");
    const panel = document.getElementById("pocket-panel");
    const closeBtn = document.getElementById("pocket-close");
    const list = document.getElementById("pocket-list");
    const empty = document.getElementById("pocket-empty");
    const countEl = document.getElementById("pocket-count");
    if (!fab || !panel) return;

    function load() {
      try { return JSON.parse(localStorage.getItem(POCKET_KEY) || "[]"); } catch (_) { return []; }
    }
    function save(arr) {
      try { localStorage.setItem(POCKET_KEY, JSON.stringify(arr)); } catch (_) {}
    }
    function refresh() {
      const items = load();
      countEl.textContent = items.length;
      countEl.style.display = items.length ? "flex" : "none";
      if (items.length === 0) {
        empty.style.display = "block";
        list.innerHTML = "";
      } else {
        empty.style.display = "none";
        list.innerHTML = items.map((entry) => {
          const [lessonId, conceptName] = entry.split("::");
          const lesson = (window.LESSONS_DATA || []).find((l) => l.id === lessonId);
          const concept = lesson?.concepts.find((c) => c.conceptName === conceptName);
          if (!concept) return "";
          const explainer = (concept.levels?.[0] || concept.levels?.[1] || "").slice(0, 140);
          return `
            <div class="pocket-card">
              <div class="pocket-card-head">
                <span class="pocket-card-name">${esc(conceptName)}</span>
                <span class="pocket-card-lesson">${esc(lesson.title)}</span>
                <button class="pocket-remove" data-pocket-remove="${esc(entry)}" aria-label="הסר מהכיס">✕</button>
              </div>
              <div class="pocket-card-body">${esc(explainer)}${explainer.length === 140 ? "..." : ""}</div>
              <button class="pocket-goto" data-pocket-goto="${esc(entry)}">🔍 פתח מושג</button>
            </div>`;
        }).join("");
        // Wire removal
        list.querySelectorAll("[data-pocket-remove]").forEach((b) => {
          b.addEventListener("click", (e) => {
            e.stopPropagation();
            const key = b.dataset.pocketRemove;
            const next = load().filter((x) => x !== key);
            save(next);
            refresh();
            // Update mark on any visible button
            document.querySelectorAll(`[data-pocket-key="${cssEscape(key)}"]`).forEach((bt) => bt.classList.remove("is-pocketed"));
          });
        });
        list.querySelectorAll("[data-pocket-goto]").forEach((b) => {
          b.addEventListener("click", () => {
            const key = b.dataset.pocketGoto;
            const [lessonId, conceptName] = key.split("::");
            if (typeof openLesson === "function") openLesson(lessonId);
            // Mark which concept to scroll to
            selectedConceptByLesson[lessonId] = conceptName;
            setTimeout(() => {
              const el = document.querySelector(`.concept-card[data-concept="${cssEscape(conceptName)}"]`);
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 300);
            panel.setAttribute("hidden", "");
            fab.setAttribute("aria-expanded", "false");
          });
        });
      }
      // Mark active pocket buttons across the page
      document.querySelectorAll("[data-pocket-key]").forEach((b) => {
        const key = b.dataset.pocketKey;
        b.classList.toggle("is-pocketed", load().includes(key));
      });
    }

    fab.addEventListener("click", () => {
      const open = panel.hasAttribute("hidden");
      if (open) {
        panel.removeAttribute("hidden");
        fab.setAttribute("aria-expanded", "true");
        refresh();
      } else {
        panel.setAttribute("hidden", "");
        fab.setAttribute("aria-expanded", "false");
      }
    });
    closeBtn?.addEventListener("click", () => {
      panel.setAttribute("hidden", "");
      fab.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hasAttribute("hidden")) {
        const modal = panel.querySelector(".modal-overlay:not([hidden])");
        if (modal) {
          modal.setAttribute("hidden", "");
          return;
        }
        panel.setAttribute("hidden", "");
        fab.setAttribute("aria-expanded", "false");
      }
    });

    // Expose API for action handler
    window.pocketToggle = function (key) {
      const items = load();
      const idx = items.indexOf(key);
      if (idx === -1) items.push(key);
      else items.splice(idx, 1);
      save(items);
      refresh();
    };
    window.pocketIsHidden = function (hidden) {
      // Allow Mock Exam to hide the FAB during exam
      fab.style.display = hidden ? "none" : "";
    };

    // Initial render
    refresh();
  })();

  // =========== P1.5.0 — View Mode (visibility toggles + concept jumper) ===========
  (function initViewMode() {
    const VM_KEY = "lumenportal:viewMode:v1";
    const fab = document.getElementById("view-mode-fab");
    const panel = document.getElementById("view-mode-panel");
    const closeBtn = document.getElementById("vm-close");
    const jumper = document.getElementById("vm-concept-jumper");
    if (!fab || !panel) return;

    // All toggle keys
    const TOGGLES = [
      "quiz", "code", "code-explanation", "explanation", "deep-dive",
      "extended", "extras", "anti-patterns", "bug-hunt", "war-stories",
      "mnemonic", "comparisons", "concept-comic", "stage-zero",
      "concept-video", "memory-palace", "problem-first", "actions",
    ];

    // Presets — array of toggles to KEEP visible (others hidden)
    const PRESETS = {
      "all": TOGGLES,
      "concepts-only": ["explanation", "code", "code-explanation", "deep-dive", "extras", "extended", "mnemonic", "concept-comic", "concept-video", "memory-palace"],
      "quiz-only": ["quiz", "actions"],
      "exam-prep": ["explanation", "mnemonic", "comparisons", "anti-patterns", "concept-video", "stage-zero", "problem-first"],
      "bug-hunt-only": ["bug-hunt", "stage-zero", "code"],
    };

    // Load saved state — default everything visible
    let state = Object.fromEntries(TOGGLES.map((k) => [k, true]));
    try {
      const saved = JSON.parse(localStorage.getItem(VM_KEY) || "null");
      if (saved && typeof saved === "object") {
        TOGGLES.forEach((k) => {
          if (typeof saved[k] === "boolean") state[k] = saved[k];
        });
      }
    } catch (_) {}

    function applyState() {
      TOGGLES.forEach((k) => {
        document.body.classList.toggle(`view-hide-${k}`, !state[k]);
        const btn = panel.querySelector(`.vm-toggle[data-vm="${k}"]`);
        if (btn) btn.setAttribute("aria-pressed", state[k] ? "true" : "false");
      });
      try { localStorage.setItem(VM_KEY, JSON.stringify(state)); } catch (_) {}
    }

    function applyPreset(preset) {
      const keep = new Set(PRESETS[preset] || TOGGLES);
      TOGGLES.forEach((k) => { state[k] = keep.has(k); });
      applyState();
      panel.querySelectorAll(".vm-preset").forEach((b) => {
        b.classList.toggle("vm-preset-active", b.dataset.preset === preset);
      });
    }

    // Wire toggles
    panel.querySelectorAll(".vm-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.vm;
        state[k] = !state[k];
        applyState();
        // Clear preset highlight when manually toggling
        panel.querySelectorAll(".vm-preset").forEach((b) => b.classList.remove("vm-preset-active"));
      });
    });

    // Wire presets
    panel.querySelectorAll(".vm-preset").forEach((btn) => {
      btn.addEventListener("click", () => applyPreset(btn.dataset.preset));
    });

    // Wire concept jumper
    jumper?.addEventListener("change", (e) => {
      const target = e.target.value;
      if (!target) return;
      const el = document.querySelector(`[data-concept="${cssEscape(target)}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("concept-flash");
        setTimeout(() => el.classList.remove("concept-flash"), 1200);
      }
      e.target.value = ""; // reset
    });

    // FAB toggle
    fab.addEventListener("click", () => {
      const open = panel.hasAttribute("hidden");
      if (open) {
        panel.removeAttribute("hidden");
        fab.setAttribute("aria-expanded", "true");
        rebuildJumper();
      } else {
        panel.setAttribute("hidden", "");
        fab.setAttribute("aria-expanded", "false");
      }
    });
    closeBtn?.addEventListener("click", () => {
      panel.setAttribute("hidden", "");
      fab.setAttribute("aria-expanded", "false");
    });
    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hasAttribute("hidden")) {
        panel.setAttribute("hidden", "");
        fab.setAttribute("aria-expanded", "false");
      }
    });

    // Concept jumper — populated from currently visible concept cards
    function rebuildJumper() {
      if (!jumper) return;
      jumper.innerHTML = '<option value="">בחר מושג...</option>';
      const cards = document.querySelectorAll(".concept-card[data-concept]");
      const seen = new Set();
      cards.forEach((card) => {
        const name = card.dataset.concept;
        if (!name || seen.has(name)) return;
        seen.add(name);
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        jumper.appendChild(opt);
      });
      if (seen.size === 0) {
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = "(אין מושגים בתצוגה הנוכחית)";
        opt.disabled = true;
        jumper.appendChild(opt);
      }
    }

    applyState();

    // ----- A11y toggles -----
    const A11Y_KEY = "lumenportal:a11y:v1";
    const A11Y_TOGGLES = ["dyslexia-font", "reduce-motion", "high-contrast", "large-text"];
    let a11yState = Object.fromEntries(A11Y_TOGGLES.map((k) => [k, false]));
    try {
      const saved = JSON.parse(localStorage.getItem(A11Y_KEY) || "null");
      if (saved && typeof saved === "object") {
        A11Y_TOGGLES.forEach((k) => { if (typeof saved[k] === "boolean") a11yState[k] = saved[k]; });
      }
    } catch (_) {}
    function applyA11y() {
      A11Y_TOGGLES.forEach((k) => {
        document.body.classList.toggle(`a11y-${k}`, a11yState[k]);
        const btn = panel.querySelector(`.vm-a11y-toggle[data-a11y="${k}"]`);
        if (btn) btn.setAttribute("aria-pressed", a11yState[k] ? "true" : "false");
      });
      try { localStorage.setItem(A11Y_KEY, JSON.stringify(a11yState)); } catch (_) {}
    }
    panel.querySelectorAll(".vm-a11y-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.a11y;
        a11yState[k] = !a11yState[k];
        applyA11y();
      });
    });
    applyA11y();

    // ----- Glossary modal -----
    const glossaryModal = document.getElementById("glossary-modal");
    const glossaryList = document.getElementById("glossary-list");
    const glossarySearchEl = document.getElementById("glossary-search");
    function openGlossary() {
      if (!glossaryModal) return;
      glossaryModal.removeAttribute("hidden");
      panel.setAttribute("hidden", "");
      fab.setAttribute("aria-expanded", "false");
      renderGlossary("");
      glossarySearchEl?.focus();
    }
    function renderGlossary(q) {
      if (!glossaryList) return;
      const G = window.GLOSSARY || {};
      const ql = q.trim().toLowerCase();
      const entries = Object.entries(G).filter(([term, info]) => {
        if (!ql) return true;
        const blob = `${term} ${info.he || ""} ${info.short || ""} ${info.long || ""}`.toLowerCase();
        return blob.includes(ql);
      });
      if (entries.length === 0) {
        glossaryList.innerHTML = '<div class="glossary-empty">🔍 לא נמצא מונח. נסה מילה אחרת.</div>';
        return;
      }
      glossaryList.innerHTML = entries
        .map(([term, info]) => {
          const cat = info.category || "";
          const example = info.example ? `<pre class="glossary-example"><code>${esc(info.example)}</code></pre>` : "";
          return `
            <details class="glossary-entry" data-cat="${esc(cat)}">
              <summary>
                <span class="glossary-term">${esc(term)}</span>
                ${info.he ? `<span class="glossary-he">${esc(info.he)}</span>` : ""}
                ${cat ? `<span class="glossary-cat">${esc(cat)}</span>` : ""}
              </summary>
              <div class="glossary-body">
                ${info.short ? `<div class="glossary-short">${esc(info.short)}</div>` : ""}
                ${info.long ? `<div class="glossary-long">${esc(info.long)}</div>` : ""}
                ${example}
              </div>
            </details>`;
        })
        .join("");
    }
    glossarySearchEl?.addEventListener("input", (e) => renderGlossary(e.target.value));
    document.getElementById("glossary-close")?.addEventListener("click", () => glossaryModal?.setAttribute("hidden", ""));
    glossaryModal?.addEventListener("click", (e) => { if (e.target === glossaryModal) glossaryModal.setAttribute("hidden", ""); });
    document.getElementById("vm-open-glossary")?.addEventListener("click", openGlossary);

    // ----- Daily Reflection -----
    const REFLECT_KEY = "lumenportal:reflections:v1";
    const reflectModal = document.getElementById("reflection-modal");
    const reflectConfRange = document.getElementById("reflect-confidence");
    const reflectConfOut = document.getElementById("reflect-confidence-out");
    function loadReflections() { try { return JSON.parse(localStorage.getItem(REFLECT_KEY) || "[]"); } catch (_) { return []; } }
    function saveReflectionRecord(rec) {
      const arr = loadReflections();
      arr.unshift(rec);
      arr.length = Math.min(arr.length, 30);
      try { localStorage.setItem(REFLECT_KEY, JSON.stringify(arr)); } catch (_) {}
    }
    function openReflection() {
      if (!reflectModal) return;
      reflectModal.removeAttribute("hidden");
      panel.setAttribute("hidden", "");
      fab.setAttribute("aria-expanded", "false");
      renderReflectionHistory();
    }
    function renderReflectionHistory() {
      const list = loadReflections();
      const cont = document.getElementById("reflect-history");
      if (!cont) return;
      if (list.length === 0) { cont.innerHTML = '<div class="reflect-history-empty">אין רפלקציות עדיין.</div>'; return; }
      cont.innerHTML = '<h4>📊 היסטוריה (10 אחרונות)</h4>' + list.slice(0, 10).map((r) => {
        const d = new Date(r.date);
        return `<div class="reflect-row">
          <div class="reflect-row-meta">${d.getDate()}/${d.getMonth()+1} · ביטחון ${r.confidence}%</div>
          ${r.learned ? `<div class="reflect-row-text"><strong>למד:</strong> ${esc(r.learned)}</div>` : ""}
          ${r.stuck ? `<div class="reflect-row-text"><strong>קשה:</strong> ${esc(r.stuck)}</div>` : ""}
        </div>`;
      }).join("");
    }
    reflectConfRange?.addEventListener("input", () => { if (reflectConfOut) reflectConfOut.textContent = reflectConfRange.value + "%"; });
    document.getElementById("reflect-save")?.addEventListener("click", () => {
      const learned = document.getElementById("reflect-learned")?.value.trim() || "";
      const stuck = document.getElementById("reflect-stuck")?.value.trim() || "";
      const confidence = parseInt(reflectConfRange?.value || "50", 10);
      if (!learned && !stuck) { alert("מלא לפחות שדה אחד."); return; }
      saveReflectionRecord({ date: new Date().toISOString(), learned, stuck, confidence });
      document.getElementById("reflect-learned").value = "";
      document.getElementById("reflect-stuck").value = "";
      renderReflectionHistory();
      alert("✅ נשמר!");
    });
    document.getElementById("reflection-close")?.addEventListener("click", () => reflectModal?.setAttribute("hidden", ""));
    reflectModal?.addEventListener("click", (e) => { if (e.target === reflectModal) reflectModal.setAttribute("hidden", ""); });
    document.getElementById("vm-open-reflection")?.addEventListener("click", openReflection);

    // ----- 🔀 Reverse Q&A — given definition, pick concept name -----
    const reverseModal = document.getElementById("reverse-modal");
    const reverseBody = document.getElementById("reverse-body");
    function shuffleArr(arr) {
      return window.RNG.shuffle(arr);
    }
    function pickReverseQuestion() {
      const lessons = window.LESSONS_DATA || [];
      const allConcepts = [];
      // levels is an OBJECT keyed by audience (grandma/child/soldier/student/junior/professor)
      const levelKeys = ["soldier", "student", "junior", "child", "grandma", "professor"];
      function pickDefinition(c) {
        if (!c.levels) return "";
        if (Array.isArray(c.levels)) return c.levels[2] || c.levels[0] || "";
        // Object form: prefer mid-level definition (soldier/student)
        for (const k of levelKeys) {
          if (c.levels[k]) return c.levels[k];
        }
        return "";
      }
      lessons.forEach((L) => (L.concepts || []).forEach((c) => {
        if (pickDefinition(c)) allConcepts.push({ lesson: L, concept: c });
      }));
      if (allConcepts.length < 4) return null;
      const target = window.RNG.pick(allConcepts);
      const sameLesson = allConcepts.filter((p) => p.lesson.id === target.lesson.id && p.concept.conceptName !== target.concept.conceptName);
      const otherLesson = allConcepts.filter((p) => p.concept.conceptName !== target.concept.conceptName);
      let distractorPool = sameLesson.length >= 3 ? sameLesson : otherLesson;
      const distractors = shuffleArr(distractorPool).slice(0, 3);
      const optionsConcepts = shuffleArr([target, ...distractors]);
      const correctIdx = optionsConcepts.findIndex((p) => p.concept.conceptName === target.concept.conceptName);
      const definition = pickDefinition(target.concept);
      return { target, options: optionsConcepts, correctIdx, definition };
    }
    function renderReverseQuestion() {
      const q = pickReverseQuestion();
      if (!q || !reverseBody) {
        if (reverseBody) reverseBody.innerHTML = '<div class="rev-empty">אין מספיק מושגים. ודא שהמודולים נטענו.</div>';
        return;
      }
      reverseBody.innerHTML = `
        <div class="rev-intro">קרא את ההסבר. לאיזה מושג הוא מתייחס?</div>
        <div class="rev-definition">${esc(q.definition)}</div>
        <div class="rev-options">
          ${q.options.map((p, i) => `
            <button class="rev-option" data-rev-idx="${i}">${esc(p.concept.conceptName)} <span class="rev-lesson">(${esc(p.lesson.title)})</span></button>
          `).join("")}
        </div>
        <div class="rev-feedback" id="rev-feedback" hidden></div>
        <div class="rev-actions" hidden id="rev-actions">
          <button class="km-btn-mini primary" id="rev-next">▶ שאלה חדשה</button>
        </div>`;
      reverseBody.querySelectorAll(".rev-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.revIdx, 10);
          const correct = idx === q.correctIdx;
          reverseBody.querySelectorAll(".rev-option").forEach((b, i) => {
            b.disabled = true;
            if (i === q.correctIdx) b.classList.add("rev-correct");
            else if (i === idx && !correct) b.classList.add("rev-wrong");
          });
          const fb = document.getElementById("rev-feedback");
          fb.hidden = false;
          fb.className = "rev-feedback " + (correct ? "rev-fb-correct" : "rev-fb-wrong");
          fb.innerHTML = correct
            ? `✅ נכון! המושג <strong>${esc(q.target.concept.conceptName)}</strong> מתואר באחת מ-7 הרמות שלו.`
            : `❌ לא מדויק. ההגדרה היא של <strong>${esc(q.target.concept.conceptName)}</strong> (${esc(q.target.lesson.title)}).`;
          document.getElementById("rev-actions").hidden = false;
          document.getElementById("rev-next")?.addEventListener("click", renderReverseQuestion);
        });
      });
    }
    document.getElementById("vm-open-reverse")?.addEventListener("click", () => {
      reverseModal?.removeAttribute("hidden");
      renderReverseQuestion();
    });
    document.getElementById("reverse-close")?.addEventListener("click", () => reverseModal?.setAttribute("hidden", ""));
    reverseModal?.addEventListener("click", (e) => { if (e.target === reverseModal) reverseModal.setAttribute("hidden", ""); });

    // ----- "⏰ מכונת זמן" — review timeline from real local progress -----
    const timeMachineModal = document.getElementById("time-machine-modal");
    const timeMachineBody = document.getElementById("time-machine-body");

    function loadTimeMachineReflections() {
      try {
        return JSON.parse(localStorage.getItem("lumenportal:reflections:v1") || "[]");
      } catch (_) {
        return [];
      }
    }

    function formatTimeMachineDate(value) {
      const date = new Date(value);
      if (!Number.isFinite(date.getTime())) return "תאריך לא זמין";
      return date.toLocaleString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    function timeMachineScoreGrade(score) {
      if (score >= 90) return "A";
      if (score >= 80) return "B";
      if (score >= 70) return "C";
      if (score >= 60) return "D";
      return "F";
    }

    function collectTimeMachineEntries() {
      const entries = [];
      loadExamHistory().forEach((record) => {
        entries.push({
          date: record.date,
          type: "exam",
          icon: "📝",
          title: record.templateName || "מבחן מדומה",
          meta: `${record.score}% · ציון ${timeMachineScoreGrade(record.score || 0)}`,
          detail: `${record.totalRight || 0}/${record.totalQs || 0} נכונות${record.autoTimeout ? " · הזמן נגמר" : ""}`,
        });
      });

      loadTimeMachineReflections().forEach((record) => {
        const text = record.text || record.learned || record.stuck || "";
        const confidence = typeof record.confidence === "number"
          ? `ביטחון ${record.confidence}%`
          : typeof record.rating === "number"
            ? `דירוג ${record.rating}/5`
            : "רפלקציה";
        entries.push({
          date: record.date,
          type: "reflection",
          icon: "📅",
          title: "רפלקציה",
          meta: confidence,
          detail: text || "נשמרה רפלקציה ללא טקסט זמין",
        });
      });

      loadLessonWrapUps().forEach((record) => {
        entries.push({
          date: record.date,
          type: "wrap",
          icon: "⏱️",
          title: record.lessonTitle || "סיכום שיעור",
          meta: `${record.scorePct || 0}% · ציון ${record.grade || timeMachineScoreGrade(record.scorePct || 0)}`,
          detail: `ביטחון ${record.confidencePct || 0}% · פער כיול ${record.calibrationGap || 0}% · ${record.correct || 0}/${record.total || 0} נכונות`,
        });
      });

      Object.entries(scores || {}).forEach(([key, sc]) => {
        if (!sc || !(sc.attempts > 0)) return;
        const reviewedAt = sc.srsState?.lastReviewed;
        if (!reviewedAt) return;
        const ref = findConceptByKey(key);
        const title = ref ? ref.concept.conceptName : key;
        const lessonTitle = ref ? ref.lesson.title : "";
        const isMastered = (sc.level || 1) >= 7;
        const isWeak = (sc.weakReports || 0) > 0;
        entries.push({
          date: reviewedAt,
          type: isMastered ? "mastered" : isWeak ? "weak" : "review",
          icon: isMastered ? "🏆" : isWeak ? "🆘" : "🔁",
          title,
          meta: `${lessonTitle}${lessonTitle ? " · " : ""}רמה ${sc.level || 1}/7`,
          detail: `${sc.correct || 0}/${sc.attempts || 0} תשובות נכונות${isWeak ? ` · ${sc.weakReports} דיווחי חולשה` : ""}`,
          conceptKey: ref ? key : "",
        });
      });

      return entries
        .filter((entry) => Number.isFinite(new Date(entry.date).getTime()))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    function renderTimeMachine() {
      if (!timeMachineBody) return;
      const exams = loadExamHistory();
      const reflections = loadTimeMachineReflections();
      const wrapUps = loadLessonWrapUps();
      const scored = Object.values(scores || {}).filter((sc) => sc && sc.attempts > 0);
      const mastered = scored.filter((sc) => (sc.level || 1) >= 7).length;
      const weak = scored.filter((sc) => (sc.weakReports || 0) > 0).length;
      const due = scored.filter((sc) => isSrsDue(sc)).length;
      const bestExam = exams.length ? Math.max(...exams.map((r) => r.score || 0)) : null;
      const entries = collectTimeMachineEntries();

      const timeline = entries.length
        ? entries.slice(0, 30).map((entry) => `
          <div class="tm-entry tm-${esc(entry.type)}">
            <div class="tm-entry-icon">${esc(entry.icon)}</div>
            <div class="tm-entry-body">
              <div class="tm-entry-head">
                <strong>${esc(entry.title)}</strong>
                <span>${esc(formatTimeMachineDate(entry.date))}</span>
              </div>
              <div class="tm-entry-meta">${esc(entry.meta || "")}</div>
              <div class="tm-entry-detail">${esc(entry.detail || "")}</div>
              ${
                entry.conceptKey
                  ? `<button class="tm-link" data-tm-concept="${esc(entry.conceptKey)}">פתח מושג</button>`
                  : ""
              }
            </div>
          </div>`)
          .join("")
        : `<div class="tm-empty">אין עדיין אירועים לציר הזמן. התחל בכרטיסיות, מבחן מדומה או רפלקציה כדי לבנות היסטוריה אמיתית.</div>`;

      timeMachineBody.innerHTML = `
        <div class="tm-summary">
          <div><span>${exams.length}</span><small>מבחנים</small></div>
          <div><span>${bestExam == null ? "—" : bestExam + "%"}</span><small>ציון שיא</small></div>
          <div><span>${reflections.length}</span><small>רפלקציות</small></div>
          <div><span>${wrapUps.length}</span><small>סיכומי שיעור</small></div>
          <div><span>${mastered}</span><small>מאסטר</small></div>
          <div><span>${weak}</span><small>חולשות</small></div>
          <div><span>${due}</span><small>חזרות היום</small></div>
        </div>
        <div class="tm-actions">
          <button class="km-btn-mini" id="tm-open-flashcards">🃏 כרטיסיות</button>
          <button class="km-btn-mini" id="tm-open-map">🗺️ מפת ידע</button>
          <button class="km-btn-mini" id="tm-open-exam">📝 מבחן מדומה</button>
        </div>
        <div class="tm-timeline">${timeline}</div>`;

      timeMachineBody.querySelectorAll("[data-tm-concept]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const ref = findConceptByKey(btn.dataset.tmConcept);
          if (!ref) return;
          timeMachineModal?.setAttribute("hidden", "");
          panel.setAttribute("hidden", "");
          fab.setAttribute("aria-expanded", "false");
          openLesson(ref.lesson.id);
          setTimeout(() => {
            document
              .querySelector(`.concept-card[data-concept="${cssEscape(ref.concept.conceptName)}"]`)
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 250);
        });
      });
      document.getElementById("tm-open-flashcards")?.addEventListener("click", () => {
        timeMachineModal?.setAttribute("hidden", "");
        panel.setAttribute("hidden", "");
        fab.setAttribute("aria-expanded", "false");
        openFlashcards();
      });
      document.getElementById("tm-open-map")?.addEventListener("click", () => {
        timeMachineModal?.setAttribute("hidden", "");
        panel.setAttribute("hidden", "");
        fab.setAttribute("aria-expanded", "false");
        openKnowledgeMap();
      });
      document.getElementById("tm-open-exam")?.addEventListener("click", () => {
        timeMachineModal?.setAttribute("hidden", "");
        panel.setAttribute("hidden", "");
        fab.setAttribute("aria-expanded", "false");
        openMockExam();
      });
    }

    document.getElementById("vm-open-history")?.addEventListener("click", () => {
      timeMachineModal?.removeAttribute("hidden");
      renderTimeMachine();
    });
    document.getElementById("time-machine-close")?.addEventListener("click", () => timeMachineModal?.setAttribute("hidden", ""));
    timeMachineModal?.addEventListener("click", (e) => { if (e.target === timeMachineModal) timeMachineModal.setAttribute("hidden", ""); });

    // Expose for outside callers (when lesson changes, refresh jumper)
    window.viewModeRefreshJumper = rebuildJumper;
  })();

  // =========== INIT SIDEBAR ===========
  function initSidebar() {
    if (!window.LESSONS_DATA) return;
    lessonsNav.innerHTML = "";

    window.LESSONS_DATA.forEach((lesson, index) => {
      const btn = document.createElement("button");
      btn.className = "lesson-nav-btn";
      if (quizCompleted[lesson.id]) btn.classList.add("completed");
      btn.innerHTML = `<span class="num">${index + 1}</span><span class="lesson-label">${lesson.title}</span>`;
      btn.dataset.id = lesson.id;
      btn.dataset.searchText = (
        lesson.title +
        " " +
        lesson.description +
        " " +
        (lesson.concepts || []).map((c) => c.conceptName).join(" ")
      ).toLowerCase();

      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".lesson-nav-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        openLesson(lesson.id);
        sidebar.classList.remove("open");
      });

      lessonsNav.appendChild(btn);
    });

    // Update welcome stats
    const statLessons = document.getElementById("stat-lessons");
    const statConcepts = document.getElementById("stat-concepts");
    const statBank = document.getElementById("stat-bank");
    if (statLessons) statLessons.textContent = window.LESSONS_DATA.length;
    if (statConcepts) {
      const total = window.LESSONS_DATA.reduce(
        (sum, l) => sum + (l.concepts ? l.concepts.length : 0),
        0,
      );
      statConcepts.textContent = total;
    }
    if (statBank) {
      const bank = window.QUESTIONS_BANK || { mc: [], fill: [] };
      statBank.textContent = (bank.mc || []).length + (bank.fill || []).length;
    }

    // Onboarding tour visibility — hide if dismissed previously
    const tour = document.querySelector(".onboarding-tour");
    if (tour && localStorage.getItem("ob_tour_dismissed") === "1") {
      tour.style.display = "none";
    }

    updateProgress();
  }

  // =========== ONBOARDING TOUR ===========
  document.addEventListener("click", (e) => {
    const action = e.target?.dataset?.tourAction;
    if (!action) return;
    e.preventDefault();
    switch (action) {
      case "open-guide":
        document.getElementById("open-guide-btn")?.click();
        break;
      case "open-trainer":
        document.getElementById("open-trainer-btn")?.click();
        break;
      case "open-study":
        document.getElementById("open-study-btn")?.click();
        break;
      case "open-map":
        document.getElementById("open-map-btn")?.click();
        break;
      case "dismiss-tour":
        localStorage.setItem("ob_tour_dismissed", "1");
        const tourEl = document.querySelector(".onboarding-tour");
        if (tourEl) {
          tourEl.style.transition = "opacity 0.4s, transform 0.4s";
          tourEl.style.opacity = "0";
          tourEl.style.transform = "translateY(-12px)";
          setTimeout(() => {
            tourEl.style.display = "none";
            tourEl.style.opacity = "";
            tourEl.style.transform = "";
          }, 400);
        }
        break;
    }
  });

  // =========== SEARCH ===========
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      document.querySelectorAll(".lesson-nav-btn").forEach((btn) => {
        const text = btn.dataset.searchText || "";
        btn.style.display = !query || text.includes(query) ? "flex" : "none";
      });
    });
  }

  // =========== LEVEL TABS ===========
  levelTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      levelTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentLevel = tab.dataset.level;
      if (currentLessonId) renderContent();
    });
  });

  // =========== VIEW SWITCHING ===========
  function hideAllViews() {
    welcomeScreen.style.display = "none";
    activeLessonContainer.style.display = "none";
    if (knowledgeMapView) knowledgeMapView.style.display = "none";
    if (studyModeView) studyModeView.style.display = "none";
    if (trainerView) trainerView.style.display = "none";
    if (guideView) guideView.style.display = "none";
    if (grandmaKnowledgeView) grandmaKnowledgeView.style.display = "none";
    if (programmingBasicsView) programmingBasicsView.style.display = "none";
    if (programmingPrinciplesView) programmingPrinciplesView.style.display = "none";
    if (programmingMuseumView) programmingMuseumView.style.display = "none";
    if (learningEvidenceView) learningEvidenceView.style.display = "none";
    if (capstonesView) capstonesView.style.display = "none";
    if (blueprintsView) blueprintsView.style.display = "none";
    if (flashcardsView) flashcardsView.style.display = "none";
    const _anatomyView = document.getElementById("code-anatomy-view");
    if (_anatomyView) _anatomyView.style.display = "none";
    if (codeblocksView) codeblocksView.style.display = "none";
    if (traceView) traceView.style.display = "none";
    const _mxView = document.getElementById("mock-exam-view");
    if (_mxView) _mxView.style.display = "none";
    const _cmpView = document.getElementById("comparator-view");
    if (_cmpView) _cmpView.style.display = "none";
    const _gmView = document.getElementById("gap-matrix-view");
    if (_gmView) _gmView.style.display = "none";
    document
      .querySelectorAll(".top-tab")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".lesson-nav-btn")
      .forEach((b) => b.classList.remove("active"));
  }

  // Wire the "🏠 שיעורים" tab to bring user back to welcome / lessons home
  document.getElementById("open-home")?.addEventListener("click", () => {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "ברוכים הבאים לפורטל המומחים";
    currentLessonDesc.textContent =
      "בחרו שיעור מהתפריט כדי להתחיל ללמוד. כל מושג מוסבר ב-6 רמות שונות — מסבתא ועד פרופסור!";
    welcomeScreen.style.display = "flex";
    document.getElementById("open-home")?.classList.add("active");
    setHomeContextTree();
    scrollToTop();
    sidebar.classList.remove("open");
  });

  function scrollToTop() {
    const c = document.getElementById("content-container");
    const reset = () => {
      if (c) {
        c.scrollTop = 0;
        if (typeof c.scrollTo === "function") c.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
      if (document.scrollingElement && typeof document.scrollingElement.scrollTo === "function") {
        document.scrollingElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };
    reset();
    requestAnimationFrame(reset);
  }

  // =========== OPEN LESSON ===========
  function openLesson(lessonId) {
    currentLessonId = lessonId;
    const lesson = window.LESSONS_DATA.find((l) => l.id === lessonId);
    if (!lesson) return;

    hideAllViews();
    currentLessonTitle.textContent = lesson.title;
    currentLessonDesc.textContent = lesson.description;
    activeLessonContainer.style.display = "block";

    lessonBody.style.animation = "none";
    lessonBody.offsetHeight;
    lessonBody.style.animation = "fadeIn 0.4s ease";

    renderContent();
    renderQuiz();
    recordLearningEvidence("view", {
      source: "lesson",
      lessonId: lesson.id,
      topic: getTopicForLesson(lesson.id).topic,
      subtopic: getTopicForLesson(lesson.id).subtopic,
    });
    scrollToTop();
    if (typeof window.viewModeRefreshJumper === "function") window.viewModeRefreshJumper();
  }

  // =========== OPEN KNOWLEDGE MAP ===========
  function openKnowledgeMap() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🗺️ מפת ידע אישית";
    currentLessonDesc.textContent =
      "סמן V/X לכל מושג. בלחיצה על שם המושג תועבר לשיעור הרלוונטי.";
    knowledgeMapView.style.display = "block";
    openKnowledgeMapBtn?.classList.add("active");
    renderKnowledgeMap();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  // =========== OPEN STUDY MODE ===========
  function openStudyMode() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🎯 לימוד מותאם";
    currentLessonDesc.textContent =
      "המערכת תלמד אותך את החומר במושגים שסימנת כחלשים (X).";
    studyModeView.style.display = "block";
    openStudyModeBtn?.classList.add("active");
    // Lazy-load seeded bank (Study Mode also benefits)
    if (typeof window.ensureSeededBank === "function") {
      window.ensureSeededBank().then(() => startStudySession());
    } else {
      startStudySession();
    }
    scrollToTop();
    sidebar.classList.remove("open");
  }

  // =========== KNOWLEDGE MAP RENDER ===========
  let kmFilter = "all";
  let kmQuery = "";

  // P1.5.0 — Topic taxonomy (lesson → topic group + sub-topic) for KM topic view
  const TOPIC_TAXONOMY = {
    "lesson_11":            { topic: "JavaScript Foundations",  emoji: "🟦", subtopic: "Arrays, Functions, Scope" },
    "lesson_12":            { topic: "JavaScript Foundations",  emoji: "🟦", subtopic: "Array Methods (map/filter/reduce)" },
    "lesson_13":            { topic: "JavaScript + DOM",        emoji: "🟪", subtopic: "Objects, DOM, Classes" },
    "lesson_15":            { topic: "JavaScript Advanced",     emoji: "🧠", subtopic: "Errors, Closures, Async" },
    "lesson_16":            { topic: "Backend (Node.js)",       emoji: "🟫", subtopic: "Node.js, npm, Modules" },
    "lesson_17":            { topic: "Backend (Express/REST)",  emoji: "🟫", subtopic: "HTTP, REST API" },
    "lesson_18":            { topic: "Backend (Express/REST)",  emoji: "🟫", subtopic: "Forms, Validation, Storage" },
    "lesson_19":            { topic: "JavaScript Foundations",  emoji: "🟦", subtopic: "חזרה וסיכום JS" },
    "lesson_20":            { topic: "Database (Mongo)",        emoji: "🟧", subtopic: "MongoDB, Mongoose" },
    "lesson_21":            { topic: "React Basics",            emoji: "⚛️", subtopic: "Components, JSX, Props" },
    "lesson_22":            { topic: "React State",             emoji: "⚛️", subtopic: "useState, Immutable State" },
    "lesson_23":            { topic: "React Routing + Context", emoji: "⚛️", subtopic: "Router, Context API" },
    "lesson_24":            { topic: "React Hooks",             emoji: "🪝", subtopic: "useEffect, useMemo, useRef" },
    "lesson_25":            { topic: "React Styling",           emoji: "🎨", subtopic: "Tailwind CSS + Project" },
    "lesson_26":            { topic: "TypeScript",              emoji: "🔷", subtopic: "Basics + Types" },
    "lesson_27":            { topic: "TypeScript",              emoji: "🔷", subtopic: "Advanced (Union, Narrowing)" },
    "lesson_closures":      { topic: "JavaScript Advanced",     emoji: "🧠", subtopic: "Closures (deep dive)" },
    "workbook_taskmanager": { topic: "JavaScript Practice",     emoji: "📝", subtopic: "Task Manager Workbook" },
    "ai_development":       { topic: "AI Development",          emoji: "🤖", subtopic: "Practical AI Coding" },
    "react_blueprint":      { topic: "React Architecture",      emoji: "⚛️", subtopic: "Patterns + Best Practices" },
  };
  function getTopicForLesson(lessonId) {
    return TOPIC_TAXONOMY[lessonId] || { topic: "אחר", emoji: "📂", subtopic: "" };
  }

  let kmGroupBy = "topic"; // "topic" | "lesson"
  const KM_GRAPH_FOCUS_KEY = "lumenportal:kmGraphFocus:v1";
  let kmGraphFocus = "";
  const GRAPH_CONCEPT_ALIASES = {
    "lesson_11::Variable": "lesson_11::let",
    "lesson_11::Function": "lesson_11::function",
    "lesson_11::Scope": "lesson_11::scope",
    "lesson_13::Class": "lesson_13::class",
    "lesson_15::async/await": "lesson_15::Asynchronous",
    "lesson_15::try/catch": "lesson_15::try",
    "lesson_12::reduce": "lesson_11::reduce",
    "lesson_22::Immutable State": "lesson_22::immutable",
    "lesson_23::React Router": "lesson_23::Router",
  };

  function splitGraphConceptKey(key) {
    const [lessonId, ...rest] = String(key || "").split("::");
    return { lessonId, conceptName: rest.join("::") };
  }

  function findConceptByKeyLoose(key) {
    const exact = findConceptByKey(key);
    if (exact) return exact;
    const aliasKey = GRAPH_CONCEPT_ALIASES[key];
    if (aliasKey && aliasKey !== key) return findConceptByKeyLoose(aliasKey);
    const { lessonId, conceptName } = splitGraphConceptKey(key);
    const lesson = (window.LESSONS_DATA || []).find((l) => l.id === lessonId);
    if (!lesson || !conceptName) return null;
    const target = conceptName.toLowerCase();
    const concept = (lesson.concepts || []).find(
      (c) => String(c.conceptName || "").toLowerCase() === target,
    );
    return concept ? { lesson, concept } : null;
  }

  function graphNodeLabel(key) {
    const ref = findConceptByKeyLoose(key);
    if (ref) return ref.concept.conceptName;
    return splitGraphConceptKey(key).conceptName || key;
  }

  function graphNodeState(key) {
    const ref = findConceptByKeyLoose(key);
    if (!ref) return "missing";
    const sc = getScore(ref.lesson.id, ref.concept.conceptName);
    if (sc.attempts > 0 && isSrsDue(sc)) return "due";
    return getMasteryState(sc);
  }

  function graphStateLabel(state) {
    return {
      new: "חדש",
      learning: "בלימוד",
      review: "חזרה",
      "at-risk": "בסיכון",
      mastered: "מאסטר",
      due: "חזרה",
      missing: "לא נמצא",
    }[state] || state;
  }

  function compactGraphLabel(label) {
    const clean = String(label || "");
    return clean.length > 18 ? `${clean.slice(0, 17)}...` : clean;
  }

  function buildKnowledgeGraph() {
    const prereqs = window.CONCEPT_PREREQUISITES || {};
    const nodes = new Map();
    const edges = [];

    function ensureNode(key) {
      if (!key || nodes.has(key)) return;
      const ref = findConceptByKeyLoose(key);
      const topic = ref ? getTopicForLesson(ref.lesson.id) : { topic: "לא ממופה", emoji: "?" };
      nodes.set(key, {
        key,
        label: graphNodeLabel(key),
        lessonTitle: ref?.lesson?.title || splitGraphConceptKey(key).lessonId,
        topic,
        state: graphNodeState(key),
        ref,
      });
    }

    Object.entries(prereqs).forEach(([target, deps]) => {
      ensureNode(target);
      (deps || []).forEach((dep) => {
        ensureNode(dep);
        edges.push({ from: dep, to: target });
      });
    });

    return { nodes, edges, prereqs };
  }

  function graphRelatedKeys(focusKey, graph) {
    if (!focusKey || !graph.nodes.has(focusKey)) return null;
    const related = new Set([focusKey]);
    const reverse = {};
    graph.edges.forEach((edge) => {
      if (!reverse[edge.from]) reverse[edge.from] = [];
      reverse[edge.from].push(edge.to);
    });

    function addAncestors(key) {
      (graph.prereqs[key] || []).forEach((dep) => {
        if (related.has(dep)) return;
        related.add(dep);
        addAncestors(dep);
      });
    }
    function addDescendants(key) {
      (reverse[key] || []).forEach((next) => {
        if (related.has(next)) return;
        related.add(next);
        addDescendants(next);
      });
    }

    addAncestors(focusKey);
    addDescendants(focusKey);
    return related;
  }

  function renderKnowledgeGraph() {
    const canvas = document.getElementById("km-graph-canvas");
    const summary = document.getElementById("km-graph-summary");
    const focusSelect = document.getElementById("km-graph-focus");
    if (!canvas) return;

    const graph = buildKnowledgeGraph();
    if (focusSelect) {
      const options = Array.from(graph.nodes.values())
        .sort((a, b) => {
          if (a.topic.topic !== b.topic.topic) return a.topic.topic.localeCompare(b.topic.topic);
          return a.label.localeCompare(b.label);
        })
        .map((node) => `<option value="${esc(node.key)}">${esc(node.topic.emoji)} ${esc(node.label)}</option>`)
        .join("");
      focusSelect.innerHTML = `<option value="">כל הגרף</option>${options}`;
      focusSelect.value = graph.nodes.has(kmGraphFocus) ? kmGraphFocus : "";
    }

    const related = graphRelatedKeys(kmGraphFocus, graph);
    const visibleNodeKeys = related || new Set(graph.nodes.keys());
    const visibleEdges = graph.edges.filter(
      (edge) => visibleNodeKeys.has(edge.from) && visibleNodeKeys.has(edge.to),
    );
    const visibleNodes = Array.from(visibleNodeKeys)
      .map((key) => graph.nodes.get(key))
      .filter(Boolean);

    if (visibleNodes.length === 0) {
      canvas.innerHTML = `<div class="km-graph-empty">אין נתוני prerequisite זמינים להצגה.</div>`;
      if (summary) summary.textContent = "";
      return;
    }

    const levels = new Map();
    visibleNodes.forEach((node) => levels.set(node.key, 0));
    for (let pass = 0; pass < visibleNodes.length; pass++) {
      visibleEdges.forEach((edge) => {
        const fromLevel = levels.get(edge.from) || 0;
        const toLevel = levels.get(edge.to) || 0;
        levels.set(edge.to, Math.max(toLevel, fromLevel + 1));
      });
    }

    const groups = {};
    visibleNodes.forEach((node) => {
      const level = levels.get(node.key) || 0;
      if (!groups[level]) groups[level] = [];
      groups[level].push(node);
    });
    Object.values(groups).forEach((group) => {
      group.sort((a, b) => {
        if (a.topic.topic !== b.topic.topic) return a.topic.topic.localeCompare(b.topic.topic);
        return a.label.localeCompare(b.label);
      });
    });

    const levelNums = Object.keys(groups).map(Number).sort((a, b) => a - b);
    const maxRows = Math.max(...Object.values(groups).map((group) => group.length));
    const width = Math.max(920, levelNums.length * 190 + 120);
    const height = Math.max(360, maxRows * 76 + 90);
    const nodeW = 136;
    const nodeH = 50;
    const positioned = new Map();

    levelNums.forEach((level, levelIndex) => {
      const group = groups[level];
      const x = levelNums.length === 1
        ? width / 2
        : 70 + levelIndex * ((width - 140) / (levelNums.length - 1));
      const gap = height / (group.length + 1);
      group.forEach((node, rowIndex) => {
        positioned.set(node.key, {
          ...node,
          x,
          y: Math.round(gap * (rowIndex + 1)),
        });
      });
    });

    const edgeSvg = visibleEdges
      .map((edge) => {
        const from = positioned.get(edge.from);
        const to = positioned.get(edge.to);
        if (!from || !to) return "";
        const startX = from.x + nodeW / 2;
        const endX = to.x - nodeW / 2;
        const mid = Math.max(24, Math.abs(endX - startX) / 2);
        return `<path class="km-graph-edge" d="M ${startX} ${from.y} C ${startX + mid} ${from.y}, ${endX - mid} ${to.y}, ${endX} ${to.y}" marker-end="url(#km-arrow)" />`;
      })
      .join("");

    const nodeSvg = Array.from(positioned.values())
      .map((node) => {
        const missing = node.state === "missing";
        const label = compactGraphLabel(node.label);
        const stateLabel = graphStateLabel(node.state);
        return `
          <g class="km-graph-node km-graph-${esc(node.state)} ${node.key === kmGraphFocus ? "is-focused" : ""}" data-graph-key="${esc(node.key)}" role="button" tabindex="0" aria-label="${esc(node.label)} — ${esc(stateLabel)}">
            <rect x="${node.x - nodeW / 2}" y="${node.y - nodeH / 2}" width="${nodeW}" height="${nodeH}" rx="8"></rect>
            <text class="km-graph-node-label" x="${node.x}" y="${node.y - 4}" text-anchor="middle">${esc(label)}</text>
            <text class="km-graph-node-meta" x="${node.x}" y="${node.y + 14}" text-anchor="middle">${missing ? "לא נמצא בבנק" : esc(stateLabel)}</text>
          </g>`;
      })
      .join("");

    const missingCount = visibleNodes.filter((node) => node.state === "missing").length;
    const dueCount = visibleNodes.filter((node) => node.state === "due").length;
    if (summary) {
      const focusText = related ? ` · פוקוס: ${graphNodeLabel(kmGraphFocus)}` : "";
      summary.textContent = `${visibleNodes.length} מושגים · ${visibleEdges.length} קשרים${missingCount ? ` · ${missingCount} לא נמצאו בבנק` : ""}${dueCount ? ` · ${dueCount} לחזרה` : ""}${focusText}`;
    }

    canvas.innerHTML = `
      <svg class="km-graph-svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="km-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 8 3 L 0 6 Z" class="km-graph-arrow"></path>
          </marker>
        </defs>
        ${edgeSvg}
        ${nodeSvg}
      </svg>`;

    canvas.querySelectorAll("[data-graph-key]").forEach((nodeEl) => {
      const openNode = () => {
        const key = nodeEl.getAttribute("data-graph-key");
        const ref = findConceptByKeyLoose(key);
        if (!ref) {
          kmGraphFocus = key;
          try { localStorage.setItem(KM_GRAPH_FOCUS_KEY, kmGraphFocus); } catch (_) {}
          renderKnowledgeGraph();
          return;
        }
        openLesson(ref.lesson.id);
        setTimeout(() => {
          document
            .querySelector(`.concept-card[data-concept="${cssEscape(ref.concept.conceptName)}"]`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 250);
      };
      nodeEl.addEventListener("click", openNode);
      nodeEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openNode();
        }
      });
    });
  }

  function renderKnowledgeMap() {
    const container = document.getElementById("km-lessons-container");
    if (!container || !window.LESSONS_DATA) return;

    // Update top stats — combines per-concept LEVEL (1..7) and mastery state.
    let masterCount = 0, weakCnt = 0, partialCnt = 0, pendingCnt = 0;
    let atRiskCnt = 0, dueCnt = 0;
    let levelSum = 0;
    allConcepts().forEach(({ lesson, concept }) => {
      const sc = getScore(lesson.id, concept.conceptName);
      levelSum += sc.level;
      if (sc.level >= 7) masterCount++;
      else if (sc.attempts === 0 && sc.level === 1) pendingCnt++;
      else if (sc.level <= 2) weakCnt++;
      else partialCnt++;
      if (getMasteryState(sc) === "at-risk") atRiskCnt++;
      if (sc.attempts > 0 && isSrsDue(sc)) dueCnt++;
    });
    const totalConcepts = masterCount + weakCnt + partialCnt + pendingCnt;
    const avgLvl = totalConcepts ? levelSum / totalConcepts : 1;
    document.getElementById("km-total").textContent = totalConcepts;
    document.getElementById("km-known").textContent = masterCount;
    document.getElementById("km-unknown").textContent = weakCnt;
    document.getElementById("km-pending").textContent = pendingCnt;
    const masteryPct = totalConcepts
      ? Math.round(((avgLvl - 1) / 6) * 100)
      : 0;
    document.getElementById("km-mastery-fill").style.width = masteryPct + "%";
    const dueSummary = dueCnt > 0 ? ` · 🔁 ${dueCnt} לחזרה` : "";
    const riskSummary = atRiskCnt > 0 ? ` · ⚠️ ${atRiskCnt} בסיכון` : "";
    document.getElementById("km-mastery-text").textContent =
      `רמת שליטה: ${masteryPct}% · רמה ממוצעת ${avgLvl.toFixed(2)}/7 (${masterCount} 🏆 · ${partialCnt} בתהליך · ${weakCnt} חלשים · ${pendingCnt} לא נבחנו)${riskSummary}${dueSummary}`;

    // Build groups
    const q = kmQuery.toLowerCase().trim();
    const MASTERY_LABEL = {
      new: "🆕 חדש",
      learning: "📘 בלימוד",
      review: "📗 בחזרה",
      "at-risk": "⚠️ בסיכון",
      mastered: "🏆 מאסטר",
    };
    // Build per-lesson HTML, then optionally re-group into topics
    const lessonBlocks = window.LESSONS_DATA
      .map((lesson) => {
        const concepts = (lesson.concepts || []).filter((c) => {
          const sc = getScore(lesson.id, c.conceptName);
          // Track A — A5: filter by mastery state (5 buckets) instead of raw level.
          // Legacy values are aliased to mastery states so the existing dropdown
          // entries keep working:
          //   known   → mastered
          //   unknown → learning ∪ at-risk
          //   pending → new
          // New additive values (injected at boot): learning, review,
          // at-risk, mastered, new, due.
          const state = getMasteryState(sc);
          switch (kmFilter) {
            case "all": break;
            case "known":
            case "mastered":
              if (state !== "mastered") return false;
              break;
            case "unknown":
              if (!(state === "learning" || state === "at-risk")) return false;
              break;
            case "pending":
            case "new":
              if (state !== "new") return false;
              break;
            case "learning":
            case "review":
            case "at-risk":
              if (state !== kmFilter) return false;
              break;
            case "due":
              if (!(sc.attempts > 0 && isSrsDue(sc))) return false;
              break;
            default: break;
          }
          if (q && !c.conceptName.toLowerCase().includes(q)) return false;
          return true;
        });
        if (concepts.length === 0) return "";

        const lessonScores = (lesson.concepts || []).map((c) =>
          getScore(lesson.id, c.conceptName),
        );
        const lessonMaster = lessonScores.filter((s) => s.level >= 7).length;
        const lessonWeak = lessonScores.filter((s) => s.level <= 2).length;
        const lessonTotal = (lesson.concepts || []).length;
        const lessonAvg = lessonTotal
          ? lessonScores.reduce((s, e) => s + e.level, 0) / lessonTotal
          : 1;
        const lessonPct = Math.round(((lessonAvg - 1) / 6) * 100);

        const rows = concepts
          .map((c) => {
            const sc = getScore(lesson.id, c.conceptName);
            const lvl = LEVEL_INFO[sc.level];
            const state = getMasteryState(sc);
            const due = isSrsDue(sc) && state !== "new";
            const rowCls = [
              sc.level >= 7 ? "is-known" : sc.level <= 2 ? "is-unknown" : "",
              due ? "is-due" : "",
            ]
              .filter(Boolean)
              .join(" ");
            const stages =
              sc.level < 7
                ? `<span class="km-stages" title="שלבים שנדרשים לקידום">${sc.passedMC ? "🅰️✅" : "🅰️◯"}${needsCodeFill(c) ? (sc.passedFill ? " ✍️✅" : " ✍️◯") : ""}</span>`
                : "";
            const bank = bankCountsFor(lesson.id, c.conceptName);
            const bankBadges = `
              <span class="km-bank-counters" title="מספר השאלות במאגר עבור המושג">
                <span class="km-bank-counter ${bank.mc > 0 ? "has" : ""}">🅰️ ${bank.mc}</span>
                <span class="km-bank-counter ${bank.fill > 0 ? "has" : ""}">✍️ ${bank.fill}</span>
              </span>`;
            const masteryBadge = `<span class="km-mastery-badge km-mastery-${state}" title="מצב שליטה">${MASTERY_LABEL[state] || state}</span>`;
            const dueBadge = due
              ? `<span class="km-due-badge" title="חזרה לפי SRS — הגיע מועד">🔁 חזרה מומלצת</span>`
              : "";
            return `
              <div class="km-concept-row ${rowCls}" data-lesson="${esc(lesson.id)}" data-concept="${esc(c.conceptName)}">
                <div class="km-concept-name" title="פתח את המושג בשיעור">${esc(c.conceptName)}</div>
                ${masteryBadge}
                ${dueBadge}
                ${bankBadges}
                ${stages}
                <span class="km-status km-level ${lvl.cssClass}" title="רמה נעולה — מתעדכנת על ידי המאמן 🔒">${lvl.icon} ${sc.level}/7 ${esc(lvl.label)}</span>
              </div>`;
          })
          .join("");

        const inner = `
          <div class="km-lesson-group" data-lesson-block="${esc(lesson.id)}">
            <div class="km-lesson-header">
              <h4>${esc(lesson.title)}</h4>
              <div class="km-lesson-meta">
                <span class="pill v">🏆 ${lessonMaster}</span>
                <span class="pill x">⚠️ ${lessonWeak}</span>
                <span class="pill">${lessonMaster}/${lessonTotal}</span>
                <div class="km-lesson-mini-bar"><div class="km-lesson-mini-fill" style="width:${lessonPct}%"></div></div>
              </div>
            </div>
            <div class="km-concepts-grid">${rows}</div>
          </div>`;
        return {
          lessonId: lesson.id,
          html: inner,
          stats: { lessonMaster, lessonWeak, lessonTotal, lessonAvg },
        };
      })
      .filter((b) => b && b.html);

    let html = "";
    if (kmGroupBy === "topic") {
      // Group lesson blocks by topic, compute aggregated topic stats
      const topicGroups = {};
      lessonBlocks.forEach((b) => {
        const tx = getTopicForLesson(b.lessonId);
        const key = tx.topic;
        if (!topicGroups[key]) {
          topicGroups[key] = { meta: tx, blocks: [], total: 0, master: 0, weak: 0, levelSum: 0 };
        }
        topicGroups[key].blocks.push(b);
        topicGroups[key].total += b.stats.lessonTotal;
        topicGroups[key].master += b.stats.lessonMaster;
        topicGroups[key].weak += b.stats.lessonWeak;
        topicGroups[key].levelSum += b.stats.lessonAvg * b.stats.lessonTotal;
      });
      // Render topics in a stable, intuitive order — weakest first when grouping by topic
      const ordered = Object.entries(topicGroups).sort((a, b) => {
        const avgA = a[1].total ? a[1].levelSum / a[1].total : 1;
        const avgB = b[1].total ? b[1].levelSum / b[1].total : 1;
        return avgA - avgB; // weakest topic first
      });
      html = ordered
        .map(([topicName, g]) => {
          const avg = g.total ? g.levelSum / g.total : 1;
          const pct = Math.round(((avg - 1) / 6) * 100);
          const grade =
            pct >= 80 ? { letter: "A", cls: "topic-grade-a" } :
            pct >= 60 ? { letter: "B", cls: "topic-grade-b" } :
            pct >= 40 ? { letter: "C", cls: "topic-grade-c" } :
            pct >= 20 ? { letter: "D", cls: "topic-grade-d" } :
                        { letter: "F", cls: "topic-grade-f" };
          return `
            <details class="km-topic-group" open>
              <summary class="km-topic-summary">
                <span class="km-topic-name">${g.meta.emoji} ${esc(topicName)}</span>
                <span class="km-topic-grade ${grade.cls}" title="ציון מצרפי לנושא">${grade.letter}</span>
                <span class="km-topic-pct">${pct}%</span>
                <span class="km-topic-counters">
                  <span class="pill v" title="מאסטר (רמה 7)">🏆 ${g.master}</span>
                  <span class="pill x" title="חלשים (רמה 1-2)">⚠️ ${g.weak}</span>
                  <span class="pill" title="סך מושגים בנושא">${g.master}/${g.total}</span>
                </span>
                <span class="km-topic-bar"><span class="km-topic-bar-fill" style="width:${pct}%"></span></span>
              </summary>
              <div class="km-topic-body">
                ${g.blocks.map((b) => b.html).join("")}
              </div>
            </details>`;
        })
        .join("");
    } else {
      // Group by lesson — original behavior
      html = lessonBlocks.map((b) => b.html).join("");
    }

    container.innerHTML =
      html ||
      `<div class="study-empty"><div class="big-icon">🔍</div><p>לא נמצאו מושגים שתואמים לסינון.</p></div>`;

    // Concept-name click → open lesson (toggle handlers removed; statuses are locked)
    container.querySelectorAll(".km-concept-row").forEach((row) => {
      const lessonId = row.dataset.lesson;
      const conceptName = row.dataset.concept;

      row.querySelector(".km-concept-name")?.addEventListener("click", () => {
        openLesson(lessonId);
        // Scroll to concept after a short delay
        setTimeout(() => {
          const cards = document.querySelectorAll(".concept-card h4");
          for (const h of cards) {
            if (h.textContent.trim() === conceptName) {
              h.closest(".concept-card").scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              h.closest(".concept-card").style.outline =
                "2px solid var(--accent)";
              setTimeout(() => {
                h.closest(".concept-card").style.outline = "";
              }, 2200);
              break;
            }
          }
        }, 250);
      });
    });
    renderKnowledgeGraph();
    setKnowledgeMapContextTree();
  }

  // KM toolbar wiring
  document.getElementById("km-search")?.addEventListener("input", (e) => {
    kmQuery = e.target.value;
    renderKnowledgeMap();
  });
  document.getElementById("km-filter")?.addEventListener("change", (e) => {
    kmFilter = e.target.value;
    renderKnowledgeMap();
  });
  // Init kmGroupBy from localStorage + listen
  try {
    const savedGB = localStorage.getItem("lumenportal:kmGroupBy:v1");
    if (savedGB === "topic" || savedGB === "lesson") kmGroupBy = savedGB;
  } catch (_) {}
  const kmGroupBySel = document.getElementById("km-groupby");
  if (kmGroupBySel) kmGroupBySel.value = kmGroupBy;
  kmGroupBySel?.addEventListener("change", (e) => {
    kmGroupBy = e.target.value === "lesson" ? "lesson" : "topic";
    try { localStorage.setItem("lumenportal:kmGroupBy:v1", kmGroupBy); } catch (_) {}
    renderKnowledgeMap();
  });
  try {
    const savedGraphFocus = localStorage.getItem(KM_GRAPH_FOCUS_KEY);
    if (savedGraphFocus) kmGraphFocus = savedGraphFocus;
  } catch (_) {}
  document.getElementById("km-graph-focus")?.addEventListener("change", (e) => {
    kmGraphFocus = e.target.value || "";
    try { localStorage.setItem(KM_GRAPH_FOCUS_KEY, kmGraphFocus); } catch (_) {}
    renderKnowledgeGraph();
  });
  document.getElementById("km-graph-reset")?.addEventListener("click", () => {
    kmGraphFocus = "";
    try { localStorage.setItem(KM_GRAPH_FOCUS_KEY, ""); } catch (_) {}
    renderKnowledgeGraph();
  });
  document.getElementById("km-go-trainer")?.addEventListener("click", () => {
    openTrainer();
  });
  document.getElementById("km-reset")?.addEventListener("click", () => {
    if (!confirm("איפוס מלא של מפת הידע: ימחק את כל הציונים והסטטוסים. להמשיך?"))
      return;
    proficiency = {};
    scores = {};
    saveProficiency();
    saveScores();
    renderKnowledgeMap();
  });

  // =========== STUDY MODE ENGINE ===========
  let studyQueue = [];
  let studyIndex = 0;
  let studyLevel = "junior";

  function startStudySession() {
    // Build queue: all concepts marked X (with simple shuffle for variety)
    studyQueue = allConcepts().filter(
      ({ lesson, concept }) =>
        getProficiency(lesson.id, concept.conceptName) === "x",
    );
    // Shuffle (seeded PRNG via lib/rng.js)
    studyQueue = window.RNG.shuffle(studyQueue);
    studyIndex = 0;
    renderStudyCard();
  }

  function renderStudyCard() {
    const container = document.getElementById("study-card-container");
    const subtitle = document.getElementById("study-subtitle");
    const progressText = document.getElementById("study-progress-text");
    const progressFill = document.getElementById("study-progress-fill");

    if (!container) return;
    setStudyContextTree();

    if (studyQueue.length === 0) {
      const counts = profCounts();
      subtitle.textContent =
        counts.x === 0
          ? "מצוין! לא סימנת אף מושג כחלש."
          : "אין מושגים פעילים — סיימת את כל החולשות!";
      progressText.textContent = "0 / 0";
      progressFill.style.width = "0%";
      container.innerHTML = `
        <div class="study-empty">
          <div class="big-icon">${counts.x === 0 ? "🌟" : "🏁"}</div>
          <h3 style="color: var(--text-bright); margin-bottom:0.5rem;">
            ${counts.x === 0 ? "אין מושגים שסימנת כחלשים" : "סיימת את כל המושגים החלשים!"}
          </h3>
          <p>פתח את <strong>מפת הידע</strong> וסמן את המושגים שאתה מרגיש חלש בהם ב-X — והמערכת תבנה לך תוכנית לימוד אישית.</p>
          <button class="study-btn primary" id="study-go-map" style="margin-top:1.5rem;">🗺️ פתח מפת ידע</button>
        </div>`;
      document
        .getElementById("study-go-map")
        ?.addEventListener("click", openKnowledgeMap);
      return;
    }

    // End of queue
    if (studyIndex >= studyQueue.length) {
      progressText.textContent = `${studyQueue.length} / ${studyQueue.length}`;
      progressFill.style.width = "100%";
      subtitle.textContent = "סיבוב הושלם 💪";
      container.innerHTML = `
        <div class="study-empty">
          <div class="big-icon">🎉</div>
          <h3 style="color: var(--text-bright); margin-bottom:0.5rem;">סיימת סיבוב לימוד!</h3>
          <p>עברת על ${studyQueue.length} מושגים. אם נשארו לך מושגים מסומנים כ-X — לחץ למטה לסיבוב נוסף.</p>
          <div class="study-actions" style="justify-content:center;">
            <button class="study-btn primary" id="study-restart">🔄 התחל סיבוב חדש</button>
            <button class="study-btn open-lesson" id="study-back-map">🗺️ חזרה למפת ידע</button>
          </div>
        </div>`;
      document
        .getElementById("study-restart")
        ?.addEventListener("click", startStudySession);
      document
        .getElementById("study-back-map")
        ?.addEventListener("click", openKnowledgeMap);
      return;
    }

    const { lesson, concept } = studyQueue[studyIndex];
    const total = studyQueue.length;
    progressText.textContent = `${studyIndex + 1} / ${total}`;
    progressFill.style.width = `${((studyIndex) / total) * 100}%`;
    subtitle.textContent = `מושג ${studyIndex + 1} מתוך ${total} — סמן "השתפרתי" כשאתה מרגיש שהבנת.`;

    const levels = [
      { key: "grandma", label: "👵 סבתא" },
      { key: "child", label: "🧒 ילד" },
      { key: "soldier", label: "🪖 חייל" },
      { key: "student", label: "🎓 סטודנט" },
      { key: "junior", label: "💻 ג'וניור" },
      { key: "professor", label: "🔬 פרופ׳" },
    ];

    const explanationText =
      (concept.levels && concept.levels[studyLevel]) ||
      (concept.levels && concept.levels.junior) ||
      "";

    container.innerHTML = `
      <div class="study-card">
        <div class="lesson-context">📚 ${esc(lesson.title)}</div>
        <h3>${esc(concept.conceptName)}</h3>
        <div class="study-levels-mini">
          ${levels
            .map(
              (l) =>
                `<button data-level="${l.key}" class="${l.key === studyLevel ? "active" : ""}">${l.label}</button>`,
            )
            .join("")}
        </div>
        <div class="study-explanation">${esc(explanationText)}</div>
        ${(() => {
          // Show analogy for the currently-selected explanation level
          const lvIdx = LEVEL_KEYS.indexOf(studyLevel);
          return lvIdx >= 0 ? renderAnalogyForLevel(concept, lvIdx) : "";
        })()}
        ${
          concept.codeExample
            ? `
        <div class="code-box">
          <div class="code-toolbar">
            <button class="code-tool-btn" data-study-action="toggle-comments" title="הוסף הערות בעברית לכל שורה">💬 הערות בעברית</button>
          </div>
          <pre data-code-original="${esc(concept.codeExample)}"><code>${esc(concept.codeExample)}</code></pre>
          ${concept.codeExplanation ? `<div class="code-explanation"><strong>💡 פינת הקוד:</strong> ${esc(concept.codeExplanation)}</div>` : ""}
        </div>`
            : ""
        }
        ${renderDeepDivePanel(concept)}
        ${renderExtendedExplanationPanel(concept)}
        <div class="study-actions">
          <button class="study-btn primary" id="study-mastered">✅ הבנתי — סמן כבקיא ועבור הלאה</button>
          <button class="study-btn still-weak" id="study-still-weak">↻ עדיין חלש — חזור על זה אחר כך</button>
          <button class="study-btn skip" id="study-skip">⏭️ דלג</button>
          <button class="study-btn open-lesson" id="study-open-lesson">📖 פתח את השיעור המלא</button>
        </div>
      </div>`;

    container.querySelectorAll(".study-levels-mini button").forEach((b) => {
      b.addEventListener("click", () => {
        studyLevel = b.dataset.level;
        renderStudyCard();
      });
    });

    // Hebrew comments toggle in study card
    container.querySelector('[data-study-action="toggle-comments"]')?.addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const pre = container.querySelector(".code-box pre");
      if (!pre) return;
      const code = pre.querySelector("code");
      const original = pre.dataset.codeOriginal || "";
      if (btn.classList.contains("active")) {
        code.textContent = original;
        btn.classList.remove("active");
        btn.textContent = "💬 הערות בעברית";
      } else {
        code.textContent = annotateCodeHebrew(original);
        btn.classList.add("active");
        btn.textContent = "🔙 הסר הערות";
      }
    });

    document.getElementById("study-mastered")?.addEventListener("click", () => {
      setProficiency(lesson.id, concept.conceptName, "v");
      studyIndex++;
      renderStudyCard();
    });
    document.getElementById("study-still-weak")?.addEventListener("click", () => {
      // Push to end of queue, keep marked X
      studyQueue.push(studyQueue[studyIndex]);
      studyIndex++;
      renderStudyCard();
    });
    document.getElementById("study-skip")?.addEventListener("click", () => {
      studyIndex++;
      renderStudyCard();
    });
    document.getElementById("study-open-lesson")?.addEventListener("click", () => {
      openLesson(lesson.id);
      setTimeout(() => {
        const cards = document.querySelectorAll(".concept-card h4");
        for (const h of cards) {
          if (h.textContent.trim() === concept.conceptName) {
            h.closest(".concept-card").scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            break;
          }
        }
      }, 250);
    });
  }

  // =========== TRAINER ENGINE (Level 1-7 per concept) ===========
  // Level 1 = no answer yet (default)
  // Level 2 = passed grandma   | Level 3 = passed child    | Level 4 = passed soldier
  // Level 5 = passed student   | Level 6 = passed junior   | Level 7 = passed professor (mastered)
  // To advance one level: must pass BOTH the multiple-choice AND the code-fill at the CURRENT level.
  const SCORE_STORAGE_KEY = "lumenportal:scores:v1";
  const MISTAKE_AGENT_KEY = "lumenportal:mistakeAgent:v1";
  const CONFIDENCE_CALIBRATION_KEY = "lumenportal:conceptConfidence:v1";
  const CONFUSION_BLOCKERS_KEY = "lumenportal:confusionBlockers:v1";
  // scores[conceptKey] = { level, passedMC, passedFill, attempts, correct }
  let scores = {};
  try {
    scores = JSON.parse(localStorage.getItem(SCORE_STORAGE_KEY) || "{}");
  } catch (_) { scores = {}; }
  let mistakeAgentState = {};
  try {
    mistakeAgentState = JSON.parse(localStorage.getItem(MISTAKE_AGENT_KEY) || "{}");
  } catch (_) { mistakeAgentState = {}; }
  let confidenceCalibrationState = {};
  try {
    confidenceCalibrationState = JSON.parse(localStorage.getItem(CONFIDENCE_CALIBRATION_KEY) || "{}");
  } catch (_) { confidenceCalibrationState = {}; }
  let confusionBlockerState = {};
  try {
    confusionBlockerState = JSON.parse(localStorage.getItem(CONFUSION_BLOCKERS_KEY) || "{}");
  } catch (_) { confusionBlockerState = {}; }
  const pendingTeachBackPrompts = new Map();
  const pendingConfusionRecords = new Map();

  function saveScores() {
    try { localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores)); } catch (_) {}
  }

  // Migrate older v1 records (which used {score, attempts, correct})
  (function migrateScores() {
    let touched = false;
    Object.keys(scores).forEach((k) => {
      const s = scores[k];
      if (s && s.level === undefined) {
        const oldScore = s.score || 0;
        let lvl;
        if (oldScore >= 3) lvl = 7;
        else if (oldScore > 0) lvl = Math.min(6, 1 + oldScore);
        else lvl = 1;
        scores[k] = {
          level: lvl,
          passedMC: false,
          passedFill: false,
          attempts: s.attempts || 0,
          correct: s.correct || 0,
        };
        touched = true;
      }
    });
    if (touched) saveScores();
  })();

  // Level → concept-explanation key mapping (matches lesson.concepts[i].levels keys)
  const LEVEL_KEYS = [null, "grandma", "child", "soldier", "student", "junior", "professor"];
  const LEVEL_INFO = {
    1: { icon: "👵", label: "סבתא", cssClass: "lvl-1" },
    2: { icon: "🧒", label: "כיתה א'", cssClass: "lvl-2" },
    3: { icon: "🪖", label: "חייל", cssClass: "lvl-3" },
    4: { icon: "🎓", label: "סטודנט", cssClass: "lvl-4" },
    5: { icon: "💻", label: "ג'וניור", cssClass: "lvl-5" },
    6: { icon: "🔬", label: "פרופ׳", cssClass: "lvl-6" },
    7: { icon: "🏆", label: "מאסטר", cssClass: "lvl-7" },
  };

  function getScore(lessonId, conceptName) {
    const k = conceptKey(lessonId, conceptName);
    return (
      scores[k] || {
        level: 1,
        passedMC: false,
        passedFill: false,
        attempts: 0,
        correct: 0,
        markedKnown: false,
        weakReports: 0,
        correctRunCount: 0,
      }
    );
  }

  function defaultSrsState() {
    if (window.SRS && typeof window.SRS.createState === "function") {
      return window.SRS.createState();
    }
    // Conservative fallback if lib/srs.js failed to load.
    return {
      stability: 1.0,
      difficulty: 0.3,
      reps: 0,
      lapses: 0,
      due: Date.now(),
      lastReviewed: null,
    };
  }

  function ensureScore(lessonId, conceptName) {
    const k = conceptKey(lessonId, conceptName);
    if (!scores[k]) {
      scores[k] = {
        level: 1, passedMC: false, passedFill: false, attempts: 0, correct: 0,
        markedKnown: false, weakReports: 0, correctRunCount: 0,
        srsState: defaultSrsState(),
      };
    } else {
      // Lazy migration — fill new fields on existing records
      if (scores[k].markedKnown === undefined) scores[k].markedKnown = false;
      if (scores[k].weakReports === undefined) scores[k].weakReports = 0;
      if (scores[k].correctRunCount === undefined) scores[k].correctRunCount = 0;
      if (!scores[k].srsState || typeof scores[k].srsState !== "object") {
        scores[k].srsState = defaultSrsState();
      }
    }
    return scores[k];
  }

  // One-time migration pass: every score that pre-existed before SRS landed
  // gets a default srsState so weightFor / KM badge logic can rely on it.
  (function migrateSrsState() {
    let touched = false;
    Object.keys(scores).forEach((k) => {
      const s = scores[k];
      if (!s) return;
      if (!s.srsState || typeof s.srsState !== "object") {
        s.srsState = defaultSrsState();
        touched = true;
      } else if (
        typeof s.srsState.ease === "number" &&
        typeof s.srsState.stability === "undefined"
      ) {
        // Migrate SM-2 → FSRS-4
        const old = s.srsState;
        s.srsState = {
          stability: Math.max(1, old.interval || 1),
          difficulty: 0.3,
          reps: old.repetitions || 0,
          lapses: old.lapses || 0,
          due: old.due || Date.now(),
          lastReviewed: old.lastReviewed || null,
        };
        touched = true;
      }
    });
    if (touched) saveScores();
  })();

  // Mastery states (Track A — A5). Five buckets used by the Knowledge Map
  // filter and by the per-concept badge.
  //   new       — never attempted
  //   learning  — still in early levels (≤3)
  //   review    — progressing (4–6)
  //   at-risk   — high level but SRS overdue → forgetting
  //   mastered  — reached level 7
  function scoringCore() {
    return window.LUMEN_CORE && window.LUMEN_CORE.scoring;
  }

  function getMasteryState(sc) {
    const core = scoringCore();
    if (core && typeof core.getMasteryState === "function") return core.getMasteryState(sc);
    if (!sc || sc.attempts === 0) return "new";
    if (sc.level >= 7) return "mastered";
    const due = sc.srsState && sc.srsState.due;
    if (typeof due === "number" && due <= Date.now() && sc.level >= 6) {
      return "at-risk";
    }
    if (sc.level <= 3) return "learning";
    return "review";
  }

  function isSrsDue(sc) {
    const core = scoringCore();
    if (core && typeof core.isSrsDue === "function") return core.isSrsDue(sc);
    if (!sc || !sc.srsState || typeof sc.srsState.due !== "number") return false;
    return sc.srsState.due <= Date.now();
  }

  // === Difficulty-aware helpers ===
  // Each concept may declare `difficulty: 1..10`. Defaults to 5 (medium).
  function getDifficulty(concept) {
    const core = scoringCore();
    if (core && typeof core.getDifficulty === "function") return core.getDifficulty(concept);
    const d = concept && concept.difficulty;
    if (typeof d === "number" && d >= 1 && d <= 10) return d;
    return 5;
  }

  // How many consecutive correct answers are needed before the user may mark V (mark-as-known).
  // Difficulty 1-2 → 1 correct. 3-4 → 2. 5-6 → 3. 7 → 5. 8+ → never (must master via 7 levels).
  function correctNeededForV(difficulty) {
    const core = scoringCore();
    if (core && typeof core.correctNeededForV === "function") return core.correctNeededForV(difficulty);
    if (difficulty >= 8) return Infinity;
    if (difficulty <= 2) return 1;
    if (difficulty <= 4) return 2;
    if (difficulty <= 6) return 3;
    return 5; // difficulty 7
  }

  function canMarkV(lessonId, conceptName, concept) {
    const sc = getScore(lessonId, conceptName);
    const core = scoringCore();
    if (core && typeof core.canMarkV === "function") return core.canMarkV(sc, concept);
    if (sc.markedKnown) return false;
    if (sc.level >= 7) return false; // already mastered, no need
    const need = correctNeededForV(getDifficulty(concept));
    if (!isFinite(need)) return false; // hard concepts cannot be V'd
    return sc.correctRunCount >= need;
  }

  function markAsKnown(lessonId, conceptName) {
    const sc = ensureScore(lessonId, conceptName);
    sc.markedKnown = true;
    sc.level = 7; // mastered via shortcut
    saveScores();
  }

  function reportWeak(lessonId, conceptName) {
    const sc = ensureScore(lessonId, conceptName);
    const ref = findConceptByKeyLoose(conceptKey(lessonId, conceptName));
    recordWeakSignal(lessonId, conceptName, {
      concept: ref?.concept || null,
      question: { question: "דיווח ידני: המושג חלש כרגע" },
      kind: "manual",
      mode: "manual-report",
      score: sc,
      touchScore: true,
      saveScoreState: false,
    });
    saveScores();
  }

  function mistakeAgentCore() {
    return window.LUMEN_CORE && window.LUMEN_CORE.mistakeAgent;
  }

  function defaultMistakeAgentState() {
    const core = mistakeAgentCore();
    if (core && typeof core.emptyMistakeAgentState === "function") {
      return core.emptyMistakeAgentState();
    }
    return { version: 2, concepts: {}, topics: {}, misconceptions: {}, log: [] };
  }

  function saveMistakeAgentState() {
    try {
      localStorage.setItem(MISTAKE_AGENT_KEY, JSON.stringify(mistakeAgentState));
    } catch (_) {}
  }

  function saveConfidenceCalibrationState() {
    try {
      localStorage.setItem(CONFIDENCE_CALIBRATION_KEY, JSON.stringify(confidenceCalibrationState));
    } catch (_) {}
  }

  function saveConfusionBlockerState() {
    try {
      localStorage.setItem(CONFUSION_BLOCKERS_KEY, JSON.stringify(confusionBlockerState));
    } catch (_) {}
  }

  function ensureMistakeAgentState() {
    if (!mistakeAgentState || typeof mistakeAgentState !== "object") {
      mistakeAgentState = defaultMistakeAgentState();
    }
    if (!mistakeAgentState.concepts || typeof mistakeAgentState.concepts !== "object") {
      mistakeAgentState.concepts = {};
    }
    if (!mistakeAgentState.topics || typeof mistakeAgentState.topics !== "object") {
      mistakeAgentState.topics = {};
    }
    if (!mistakeAgentState.misconceptions || typeof mistakeAgentState.misconceptions !== "object") {
      mistakeAgentState.misconceptions = {};
    }
    if (!Array.isArray(mistakeAgentState.teachBacks)) mistakeAgentState.teachBacks = [];
    if (!Array.isArray(mistakeAgentState.retestQueue)) mistakeAgentState.retestQueue = [];
    if (!Array.isArray(mistakeAgentState.log)) mistakeAgentState.log = [];
    return mistakeAgentState;
  }

  function confidenceCalibrationCore() {
    return window.LUMEN_CORE && window.LUMEN_CORE.confidenceCalibration;
  }

  function confusionBlockersCore() {
    return window.LUMEN_CORE && window.LUMEN_CORE.confusionBlockers;
  }

  function ensureConfidenceCalibrationState() {
    const core = confidenceCalibrationCore();
    if (!confidenceCalibrationState || typeof confidenceCalibrationState !== "object") {
      confidenceCalibrationState = core && typeof core.emptyConfidenceCalibrationState === "function"
        ? core.emptyConfidenceCalibrationState()
        : { version: 1, concepts: {}, log: [] };
    }
    if (!confidenceCalibrationState.concepts || typeof confidenceCalibrationState.concepts !== "object") {
      confidenceCalibrationState.concepts = {};
    }
    if (!Array.isArray(confidenceCalibrationState.log)) confidenceCalibrationState.log = [];
    return confidenceCalibrationState;
  }

  function ensureConfusionBlockerState() {
    const core = confusionBlockersCore();
    if (!confusionBlockerState || typeof confusionBlockerState !== "object") {
      confusionBlockerState = core && typeof core.emptyConfusionBlockerState === "function"
        ? core.emptyConfusionBlockerState()
        : { version: 1, blockers: [] };
    }
    if (!Array.isArray(confusionBlockerState.blockers)) confusionBlockerState.blockers = [];
    return confusionBlockerState;
  }

  function primaryConceptKeyForQuestion({ lesson = null, concept = null, question = {} } = {}) {
    if (Array.isArray(question.conceptKeys) && question.conceptKeys[0]) {
      return question.conceptKeys[0];
    }
    if (question.conceptKey) return question.conceptKey;
    if (lesson && concept) return conceptKey(lesson.id, concept.conceptName);

    const prereqCore = window.LUMEN_CORE && window.LUMEN_CORE.questionPrerequisites;
    if (prereqCore && typeof prereqCore.inferQuestionConceptKeys === "function") {
      const keys = prereqCore.inferQuestionConceptKeys({
        question,
        lessons: window.LESSONS_DATA || [],
        glossary: window.GLOSSARY || {},
        limit: 1,
      });
      return keys[0] || "";
    }
    return "";
  }

  function applyWeakSignalToScore(sc, concept) {
    sc.weakReports = (sc.weakReports || 0) + 1;
    sc.correctRunCount = 0;
    try {
      if (window.SRS && typeof window.SRS.update === "function") {
        const diff = concept ? getDifficulty(concept) : 5;
        window.SRS.update(sc.srsState, false, diff);
      }
    } catch (_) {}
  }

  function buildMistakeRecord({ lessonId, conceptName, concept, question, kind, selectedIdx, answer, mode }) {
    const core = mistakeAgentCore();
    const key = conceptKey(lessonId, conceptName);
    const topicMeta = getTopicForLesson(lessonId);
    if (core && typeof core.makeMistakeRecord === "function") {
      return core.makeMistakeRecord({
        conceptKey: key,
        topicMeta,
        concept: concept || {},
        question: question || {},
        kind,
        selectedIdx,
        answer,
        mode,
      });
    }

    const correctIdx =
      Number.isInteger(question?.correctIndex)
        ? question.correctIndex
        : Number.isInteger(question?.correct)
          ? question.correct
          : null;
    const selectedAnswer =
      kind === "fill"
        ? String(answer || "")
        : Number.isInteger(selectedIdx)
          ? String((question?.options || [])[selectedIdx] || "")
          : "";
    const correctAnswer =
      kind === "fill"
        ? String(question?.answer || "")
        : correctIdx == null
          ? ""
          : String((question?.options || [])[correctIdx] || "");
    return {
      conceptKey: key,
      lessonId,
      conceptName,
      topic: topicMeta.topic,
      subtopic: topicMeta.subtopic,
      topicEmoji: topicMeta.emoji,
      kind,
      mode,
      questionId: question?.id || "",
      questionText: question?.question || question?.title || question?.prompt || "",
      selectedAnswer,
      correctAnswer,
      explanation: question?.explanation || "",
      association:
        (typeof concept?.analogy === "string" && concept.analogy) ||
        (concept?.levels && concept.levels.grandma) ||
        "",
      timestamp: Date.now(),
    };
  }

  function recordWeakSignal(lessonId, conceptName, {
    concept = null,
    question = {},
    kind = "mc",
    selectedIdx = null,
    answer = "",
    mode = "question",
    score = null,
    touchScore = true,
    saveScoreState = true,
  } = {}) {
    if (!lessonId || !conceptName) return null;
    const ref = concept ? { lesson: { id: lessonId }, concept } : findConceptByKeyLoose(conceptKey(lessonId, conceptName));
    const realConcept = concept || ref?.concept || null;
    const sc = score || ensureScore(lessonId, conceptName);

    if (touchScore) {
      applyWeakSignalToScore(sc, realConcept);
      if (saveScoreState) saveScores();
    }

    const record = buildMistakeRecord({
      lessonId,
      conceptName,
      concept: realConcept,
      question,
      kind,
      selectedIdx,
      answer,
      mode,
    });

    ensureMistakeAgentState();
    const core = mistakeAgentCore();
    if (core && typeof core.updateMistakeState === "function") {
      mistakeAgentState = core.updateMistakeState(mistakeAgentState, record, { maxLog: 80 });
    } else {
      const c = mistakeAgentState.concepts[record.conceptKey] || {
        conceptKey: record.conceptKey,
        lessonId,
        conceptName,
        topic: record.topic,
        subtopic: record.subtopic,
        count: 0,
      };
      c.count = (c.count || 0) + 1;
      c.lastSeen = record.timestamp;
      mistakeAgentState.concepts[record.conceptKey] = c;
      const t = mistakeAgentState.topics[record.topic] || { topic: record.topic, count: 0, concepts: {} };
      t.count = (t.count || 0) + 1;
      t.concepts[record.conceptKey] = (t.concepts[record.conceptKey] || 0) + 1;
      t.lastSeen = record.timestamp;
      mistakeAgentState.topics[record.topic] = t;
      mistakeAgentState.log.unshift(record);
      mistakeAgentState.log = mistakeAgentState.log.slice(0, 80);
    }
    if (core && typeof core.teachBackPromptForRecord === "function") {
      const prompt = core.teachBackPromptForRecord(mistakeAgentState, record, { threshold: 2 });
      if (prompt) record.teachBack = prompt;
    }
    const retests = scheduleAdaptiveRetestsForRecord(record);
    const prerequisiteRewind = schedulePrerequisiteRewindForRecord(record);
    const queuedItems = [
      ...(prerequisiteRewind ? [prerequisiteRewind] : []),
      ...retests,
    ];
    if (prerequisiteRewind) {
      record.prerequisiteRewind = {
        id: prerequisiteRewind.id,
        conceptKey: prerequisiteRewind.conceptKey,
        lessonId: prerequisiteRewind.lessonId,
        conceptName: prerequisiteRewind.conceptName,
        label: prerequisiteRewind.label,
        reason: prerequisiteRewind.reason,
        masteryPct: prerequisiteRewind.masteryPct,
      };
    }
    if (queuedItems.length) {
      record.retestQueued = queuedItems.map((item) => ({
        id: item.id,
        stage: item.stage,
        label: item.label,
        dueAt: item.dueAt,
      }));
    }
    saveMistakeAgentState();
    return record;
  }

  function recordWrongQuestionByConceptKey(conceptKeyStr, { question = {}, kind = "mc", selectedIdx = null, answer = "", mode = "question" } = {}) {
    const ref = findConceptByKeyLoose(conceptKeyStr);
    if (!ref) return null;
    return recordWeakSignal(ref.lesson.id, ref.concept.conceptName, {
      concept: ref.concept,
      question,
      kind,
      selectedIdx,
      answer,
      mode,
    });
  }

  function recordWrongQuestionByInference({ question = {}, lesson = null, concept = null, kind = "mc", selectedIdx = null, answer = "", mode = "question" } = {}) {
    const key = primaryConceptKeyForQuestion({ lesson, concept, question });
    if (!key) return null;
    return recordWrongQuestionByConceptKey(key, { question, kind, selectedIdx, answer, mode });
  }

  function renderMistakeAgentFeedback(record) {
    if (!record) return "";
    const selectedLine = record.selectedAnswer
      ? `<div><strong>מה בחרת:</strong> ${esc(record.selectedAnswer)}</div>`
      : "";
    const correctLine = record.correctAnswer
      ? `<div><strong>התשובה הנכונה:</strong> ${esc(record.correctAnswer)}</div>`
      : "";
    const explanationLine = record.explanation
      ? `<div><strong>למה:</strong> ${esc(record.explanation)}</div>`
      : "";
    const associationLine = record.association
      ? `<div class="mistake-agent-association"><strong>אסוציאציה קלה:</strong> ${esc(record.association)}</div>`
      : `<div class="mistake-agent-association muted"><strong>אסוציאציה קלה:</strong> אין עדיין דימוי שמור למושג הזה. פתח את דרישות הקדם בצד וקרא את רמת סבתא.</div>`;
    const misconception = record.misconception || null;
    const misconceptionLine = misconception
      ? `<div class="mistake-agent-misconception">
          <div class="mistake-agent-misconception-title">שורש הטעות המשוער: <strong>${esc(misconception.label)}</strong></div>
          <div><strong>למה זה קרה:</strong> ${esc(misconception.rootCause)}</div>
          <div><strong>איך מתקנים:</strong> ${esc(misconception.repair)}</div>
          <div><strong>תרגיל קצר:</strong> ${esc(misconception.microDrill)}</div>
          <div><strong>דימוי:</strong> ${esc(misconception.association)}</div>
        </div>`
      : "";
    const teachBack = record.teachBack || null;
    if (teachBack && teachBack.id) pendingTeachBackPrompts.set(teachBack.id, teachBack);
    const teachBackLine = teachBack
      ? `<div class="mistake-agent-teachback" data-teachback-panel="${esc(teachBack.id)}">
          <label for="teachback-${esc(teachBack.id)}">🗣️ Teach-back — ${esc(teachBack.prompt)}</label>
          <textarea id="teachback-${esc(teachBack.id)}" data-teachback-input="${esc(teachBack.id)}" rows="3" maxlength="700" placeholder="כתוב כאן הסבר קצר במילים שלך..."></textarea>
          <div class="mistake-agent-teachback-actions">
            <button type="button" class="km-btn-mini" data-teachback-save="${esc(teachBack.id)}">שמור הסבר</button>
            <span data-teachback-status="${esc(teachBack.id)}"></span>
          </div>
        </div>`
      : "";
    const rewind = record.prerequisiteRewind || null;
    const rewindLine = rewind
      ? `<div class="mistake-agent-rewind">
          <strong>↩️ חזרה לדרישת קדם:</strong>
          <span>${esc(rewind.conceptName)}</span>
          <small>${esc(rewind.reason || "המושג הזה חלש מדי בשביל השאלה הנוכחית.")}</small>
        </div>`
      : "";
    const confusionId = pendingConfusionId(record);
    pendingConfusionRecords.set(confusionId, record);
    const stillConfusedLine = `
      <div class="mistake-agent-still-confused">
        <button type="button" class="km-btn-mini" data-still-confused="${esc(confusionId)}">
          אני עדיין לא מבין — פתח לי מסלול פשוט יותר
        </button>
        <span>הבחירה תישמר כ-blocker ותפתח הסבר ברמת סבתא${rewind ? " או מושג קדם מתאים" : ""}.</span>
      </div>`;
    const retestLine = Array.isArray(record.retestQueued) && record.retestQueued.length
      ? `<div class="mistake-agent-retest">
          <strong>🔁 תור תיקון נוצר:</strong>
          ${record.retestQueued.map((item) => `<span>${esc(item.label || item.stage)}</span>`).join("")}
        </div>`
      : "";

    return `
      <div class="mistake-agent-panel" role="status" aria-live="polite">
        <div class="mistake-agent-head">
          <span>🧭 סוכן חולשות</span>
          <span class="mistake-agent-chip">${esc(record.topic)}${record.subtopic ? ` / ${esc(record.subtopic)}` : ""}</span>
        </div>
        <div class="mistake-agent-added">נוסף לרשימת החולשות: <strong>${esc(record.conceptName)}</strong></div>
        ${selectedLine}
        ${correctLine}
        ${explanationLine}
        ${misconceptionLine}
        ${teachBackLine}
        ${rewindLine}
        ${stillConfusedLine}
        ${retestLine}
        ${associationLine}
      </div>`;
  }

  function saveTeachBackResponse(button) {
    const id = button?.dataset?.teachbackSave || "";
    const prompt = pendingTeachBackPrompts.get(id);
    const input = document.querySelector(`textarea[data-teachback-input="${cssEscape(id)}"]`);
    const status = document.querySelector(`[data-teachback-status="${cssEscape(id)}"]`);
    const response = String(input?.value || "").trim();
    const minChars = prompt?.minChars || 18;
    if (!prompt || !input) return;
    if (response.length < minChars) {
      if (status) status.textContent = `כתוב לפחות ${minChars} תווים כדי שזה ייחשב הסבר.`;
      return;
    }

    ensureMistakeAgentState();
    const core = mistakeAgentCore();
    if (core && typeof core.appendTeachBackResponse === "function") {
      mistakeAgentState = core.appendTeachBackResponse(mistakeAgentState, prompt, response, {
        timestamp: Date.now(),
        maxEntries: 80,
      });
    } else {
      mistakeAgentState.teachBacks.unshift({
        id,
        conceptKey: prompt.conceptKey,
        conceptName: prompt.conceptName,
        misconceptionId: prompt.misconceptionId,
        misconceptionLabel: prompt.misconceptionLabel,
        response,
        timestamp: Date.now(),
      });
      mistakeAgentState.teachBacks = mistakeAgentState.teachBacks.slice(0, 80);
    }
    saveMistakeAgentState();
    recordLearningEvidence("review", {
      source: "teach-back",
      lessonId: prompt.lessonId,
      conceptKey: prompt.conceptKey,
      conceptName: prompt.conceptName,
      topic: prompt.topic,
      kind: "teach-back",
    });
    input.disabled = true;
    button.disabled = true;
    if (status) status.textContent = "נשמר. עכשיו נסה לזהות את הדפוס בשאלה הבאה.";
  }

  function scheduleAdaptiveRetestsForRecord(record) {
    const core = mistakeAgentCore();
    if (!record || !core || typeof core.scheduleAdaptiveRetests !== "function") return [];
    const before = ensureMistakeAgentState().retestQueue.length;
    mistakeAgentState = core.scheduleAdaptiveRetests(mistakeAgentState, record, {
      timestamp: record.timestamp || Date.now(),
      maxQueue: 80,
    });
    saveMistakeAgentState();
    return mistakeAgentState.retestQueue.slice(before);
  }

  function prerequisiteRewindId(record, targetKey) {
    const raw = [
      "prerequisite_rewind",
      record?.conceptKey || "",
      targetKey || "",
      record?.questionId || "",
      record?.misconception?.id || "conceptGap",
    ].join("|");
    return `prw-${slugifyId(raw).replace(/^id-/, "")}`;
  }

  function schedulePrerequisiteRewindForRecord(record) {
    if (!record || !record.conceptKey) return null;
    const sourceRef = findConceptByKeyLoose(record.conceptKey);
    if (!sourceRef) return null;
    const sourceScore = getScore(sourceRef.lesson.id, sourceRef.concept.conceptName);
    const sourceLevel = Math.max(1, Number(sourceScore?.level) || 1);
    if (sourceLevel < 3) return null;

    const chain = getFullPrerequisiteChain(record.conceptKey);
    if (!chain.length) return null;

    const prereqKeys = [];
    const statsByKey = {};
    chain.forEach((item) => {
      const ref = prerequisiteRef(item.key);
      if (!ref) return;
      const key = ref.key;
      const sc = prereqScoreForKey(key);
      prereqKeys.push(key);
      statsByKey[key] = {
        relation: item.relation === "direct" ? "direct" : "base",
        level: Math.max(1, Number(sc?.level) || 1),
        masteryPct: masteryPercent(sc),
        attempts: Math.max(0, Number(sc?.attempts) || 0),
      };
    });
    if (!prereqKeys.length) return null;

    const core = questionPrereqCore();
    const chosen = core && typeof core.choosePrerequisiteRewind === "function"
      ? core.choosePrerequisiteRewind({ prereqKeys, statsByKey, thresholdPct: 65 })
      : prereqKeys
        .map((key) => ({ key, ...(statsByKey[key] || {}) }))
        .filter((item) => (Number(item.masteryPct) || 0) < 65 || (Number(item.level) || 1) <= 2)
        .sort((a, b) => {
          if ((a.masteryPct || 0) !== (b.masteryPct || 0)) return (a.masteryPct || 0) - (b.masteryPct || 0);
          if ((a.level || 1) !== (b.level || 1)) return (a.level || 1) - (b.level || 1);
          return String(a.key).localeCompare(String(b.key));
        })[0] || null;
    if (!chosen || !chosen.key) return null;

    const targetRef = prerequisiteRef(chosen.key);
    if (!targetRef) return null;
    const timestamp = record.timestamp || Date.now();
    const targetTopic = getTopicForLesson(targetRef.lesson.id);
    const item = {
      id: prerequisiteRewindId(record, targetRef.key),
      stage: "prerequisite_rewind",
      label: "חזרה לדרישת קדם",
      purpose: "לחזק בסיס חלש לפני שחוזרים לשאלה המתקדמת.",
      status: "pending",
      conceptKey: targetRef.key,
      lessonId: targetRef.lesson.id,
      conceptName: targetRef.concept.conceptName,
      topic: targetTopic.topic,
      subtopic: targetTopic.subtopic,
      questionId: record.questionId || "",
      sourceConceptKey: record.conceptKey,
      sourceConceptName: record.conceptName,
      sourceQuestionId: record.questionId || "",
      reason:
        `נכשלת ב-${record.conceptName}; דרישת הקדם החלשה ביותר כרגע היא ` +
        `${targetRef.concept.conceptName} (${chosen.masteryPct}/100).`,
      masteryPct: chosen.masteryPct,
      masteryLevel: chosen.level,
      relation: chosen.relation || statsByKey[targetRef.key]?.relation || "base",
      createdAt: timestamp,
      dueAt: timestamp,
      attempts: 0,
    };

    ensureMistakeAgentState();
    const existingIdx = mistakeAgentState.retestQueue.findIndex((queued) =>
      queued &&
      queued.id === item.id &&
      queued.status !== "done"
    );
    if (existingIdx >= 0) {
      const existing = mistakeAgentState.retestQueue[existingIdx];
      mistakeAgentState.retestQueue[existingIdx] = {
        ...existing,
        ...item,
        attempts: existing.attempts || 0,
        createdAt: existing.createdAt || item.createdAt,
        dueAt: Math.min(existing.dueAt || item.dueAt, item.dueAt),
      };
    } else {
      mistakeAgentState.retestQueue.push(item);
    }
    mistakeAgentState.retestQueue = mistakeAgentState.retestQueue
      .sort((a, b) => (a.dueAt || 0) - (b.dueAt || 0) || String(a.id).localeCompare(String(b.id)))
      .slice(0, 80);
    saveMistakeAgentState();
    return existingIdx >= 0 ? mistakeAgentState.retestQueue[existingIdx] : item;
  }

  function dueAdaptiveRetestItem() {
    const core = mistakeAgentCore();
    if (!core || typeof core.dueAdaptiveRetests !== "function") return null;
    ensureMistakeAgentState();
    const due = core.dueAdaptiveRetests(mistakeAgentState, { now: Date.now(), limit: 1 });
    return due[0] || null;
  }

  function recordAdaptiveRetestOutcome(item, correct) {
    const core = mistakeAgentCore();
    if (!item || !core || typeof core.recordRetestOutcome !== "function") return;
    ensureMistakeAgentState();
    mistakeAgentState = core.recordRetestOutcome(mistakeAgentState, item.id, correct, {
      timestamp: Date.now(),
    });
    saveMistakeAgentState();
    recordLearningEvidence("review", {
      source: `adaptive-retest:${item.stage || "unknown"}`,
      lessonId: item.lessonId,
      conceptKey: item.conceptKey,
      conceptName: item.conceptName,
      topic: item.topic,
      kind: "adaptive-retest",
      correct: Boolean(correct),
    });
  }

  // Concept needs a code-fill stage only if it has a codeExample
  function needsCodeFill(concept) {
    const core = scoringCore();
    if (core && typeof core.needsCodeFill === "function") return core.needsCodeFill(concept);
    return !!concept.codeExample;
  }

  // Returns "mc" or "fill" — which question type the concept needs at its current level
  function nextNeedFor(concept, sc) {
    const core = scoringCore();
    if (core && typeof core.nextNeedFor === "function") return core.nextNeedFor(concept, sc);
    if (sc.level >= 7) return null;
    if (!sc.passedMC) return "mc";
    if (needsCodeFill(concept) && !sc.passedFill) return "fill";
    return null; // ready to advance — handled in applyAnswer
  }

  // Apply a correct/wrong answer for the given kind ("mc" | "fill") at the concept's current level.
  // Returns { advanced: bool, newLevel: int } so UI can celebrate.
  function applyAnswer(lessonId, conceptName, concept, kind, correct, meta = {}) {
    const sc = ensureScore(lessonId, conceptName);
    const levelBefore = sc.level || 1;
    sc.attempts++;
    let mistakeRecord = null;
    if (correct) {
      sc.correct++;
      sc.correctRunCount = (sc.correctRunCount || 0) + 1;
    } else {
      mistakeRecord = recordWeakSignal(lessonId, conceptName, {
        concept,
        question: meta.question || {},
        kind: meta.actualKind || kind,
        selectedIdx: meta.selectedIdx,
        answer: meta.answer || "",
        mode: meta.mode || "question",
        score: sc,
        touchScore: true,
        saveScoreState: false,
      });
    }
    const confidenceCalibration = recordConceptConfidenceCalibration(lessonId, conceptName, concept, {
      confidence: meta.confidence ?? null,
      correct,
      kind: meta.actualKind || kind,
      question: meta.question || {},
    });

    const emitAnswerEvidence = (result) => {
      const calibration = result?.confidenceCalibration || null;
      const calibrationEntry = calibration?.entry || null;
      const evidencePayload = {
        ...conceptEvidencePayload(lessonId, conceptName, concept),
        source: meta.mode || "question",
        kind: meta.actualKind || kind,
        questionId: meta.question?.id || "",
        correct: !!correct,
        masteryBefore: levelBefore,
        masteryAfter: sc.level || levelBefore,
        advanced: !!(result && result.advanced),
        confidence: calibrationEntry?.confidence ?? null,
        confidencePct: calibrationEntry?.confidencePct ?? null,
        calibrationBucket: calibrationEntry?.bucket || "",
        calibrationGap: calibrationEntry?.gap ?? null,
      };
      recordLearningEvidence("answer", evidencePayload);
      if (mistakeRecord) {
        recordLearningEvidence("wrong_answer_aid", {
          ...evidencePayload,
          source: `${evidencePayload.source}:mistake-agent`,
          correct: false,
        });
      }
      if ((sc.level || levelBefore) !== levelBefore) {
        recordLearningEvidence("mastery_change", {
          ...evidencePayload,
          source: `${evidencePayload.source}:mastery`,
        });
      }
    };

    if (sc.level >= 7) {
      // Already mastered — keep stats only
      saveScores();
      const result = { advanced: false, newLevel: 7, mistake: mistakeRecord, confidenceCalibration };
      if (meta.retestItem) recordAdaptiveRetestOutcome(meta.retestItem, correct);
      emitAnswerEvidence(result);
      return result;
    }

    if (correct) {
      if (kind === "mc") sc.passedMC = true;
      else if (kind === "fill") sc.passedFill = true;

      // Advance if both stages cleared (or only MC if no codeExample)
      const fillReq = needsCodeFill(concept);
      if (sc.passedMC && (!fillReq || sc.passedFill)) {
        sc.level = Math.min(7, sc.level + 1);
        sc.passedMC = false;
        sc.passedFill = false;
        saveScores();
        tickStudyStreak();
        awardXP(35);
        checkAchievements({ lessonId, conceptName, correct: true, advanced: true, sc });
        const result = { advanced: true, newLevel: sc.level, confidenceCalibration };
        if (meta.retestItem) recordAdaptiveRetestOutcome(meta.retestItem, correct);
        emitAnswerEvidence(result);
        return result;
      }
    }
    // Wrong answers don't demote level or remove existing passes — they only deny progress.
    saveScores();
    const result = { advanced: false, newLevel: sc.level, mistake: mistakeRecord, confidenceCalibration };
    // W12 hooks — streak + XP + achievements
    tickStudyStreak();
    if (correct) awardXP(10);
    if (result.advanced) awardXP(25);
    checkAchievements({ lessonId, conceptName, correct, advanced: result.advanced, sc });
    if (typeof window.reportMisconception === "function") window.reportMisconception(lessonId, conceptName, correct);
    if (meta.retestItem) recordAdaptiveRetestOutcome(meta.retestItem, correct);
    emitAnswerEvidence(result);
    return result;
  }

  // Trainer state
  let trainerMode = "adaptive"; // "adaptive" | "weak" | "mixed"
  let trainerCurrent = null; // { lesson, concept, question }
  let trainerStats = { asked: 0, correct: 0, wrong: 0 };
  let trainerLastAnswered = false;
  let trainerConfidence = null;
  // Code-trace per-question state: tracks progress through steps[].
  let traceState = null; // { stepIdx, attempts, hintShown }

  // Normalize an answer for forgiving comparison (trim, lowercase, collapse whitespace).
  function normalizeAnswer(s) {
    return String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
  }
  function isTraceAnswerCorrect(userInput, step) {
    const u = normalizeAnswer(userInput);
    if (!u) return false;
    const correct = [step.answer, ...(step.acceptable || [])]
      .filter(Boolean)
      .map(normalizeAnswer);
    return correct.includes(u);
  }

  // Pick a curated trace question for a concept, if any exist.
  function pickTraceForConcept(conceptKey) {
    const pool = (window.QUESTIONS_BANK && window.QUESTIONS_BANK.trace) || [];
    const candidates = pool.filter((t) => t.conceptKey === conceptKey);
    if (!candidates.length) return null;
    return candidates[window.RNG.int(candidates.length)];
  }

  // Concepts that have an explanation (junior or student)
  function trainableConcepts() {
    return allConcepts().filter(({ concept }) => {
      const lv = concept.levels || {};
      return !!(lv.junior || lv.student || lv.professor || lv.grandma);
    });
  }

  function bestExplanation(concept) {
    const lv = concept.levels || {};
    return lv.junior || lv.student || lv.professor || lv.soldier || lv.child || lv.grandma || "";
  }

  function compactTextForTooltip(text, limit = 150) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (clean.length <= limit) return clean;
    return `${clean.slice(0, limit - 3).trim()}...`;
  }

  function prerequisiteRef(prereqKey) {
    const ref = findConceptByKeyLoose(prereqKey);
    if (!ref) return null;
    return {
      lesson: ref.lesson,
      concept: ref.concept,
      key: conceptKey(ref.lesson.id, ref.concept.conceptName),
      originalKey: prereqKey,
    };
  }

  function masteryPercent(sc) {
    const core = scoringCore();
    if (core && typeof core.masteryPercent === "function") return core.masteryPercent(sc);
    const level = Math.max(1, Math.min(7, Number(sc?.level) || 1));
    if (sc?.markedKnown || level >= 7) return 100;

    const attempts = Math.max(0, Number(sc?.attempts) || 0);
    const correct = Math.max(0, Number(sc?.correct) || 0);
    const accuracy = attempts > 0 ? Math.min(1, correct / attempts) : 0;
    const quizBonus = (sc?.passedMC ? 3 : 0) + (sc?.passedFill ? 3 : 0);
    const streakBonus = Math.min(5, Math.max(0, Number(sc?.correctRunCount) || 0)) * 2;
    const levelPart = ((level - 1) / 6) * 84;
    const percent = Math.round(levelPart + accuracy * 10 + quizBonus + streakBonus);

    return Math.max(1, Math.min(99, percent || 1));
  }

  function prereqScoreForKey(prereqKey) {
    const ref = prerequisiteRef(prereqKey);
    if (ref) return getScore(ref.lesson.id, ref.concept.conceptName);
    return null;
  }

  function canonicalPrerequisiteKey(prereqKey) {
    const ref = prerequisiteRef(prereqKey);
    return ref ? ref.key : null;
  }

  function conceptStudyOrderMap() {
    const order = new Map();
    (window.LESSONS_DATA || []).forEach((lesson, lessonIndex) => {
      (lesson.concepts || []).forEach((concept, conceptIndex) => {
        order.set(conceptKey(lesson.id, concept.conceptName), lessonIndex * 1000 + conceptIndex);
      });
    });
    return order;
  }

  function sortPrerequisiteKeysByStudyOrder(keys) {
    const order = conceptStudyOrderMap();
    return Array.from(keys).sort((a, b) => {
      const ca = canonicalPrerequisiteKey(a) || a;
      const cb = canonicalPrerequisiteKey(b) || b;
      const oa = order.has(ca) ? order.get(ca) : Number.MAX_SAFE_INTEGER;
      const ob = order.has(cb) ? order.get(cb) : Number.MAX_SAFE_INTEGER;
      if (oa !== ob) return oa - ob;
      return String(ca).localeCompare(String(cb));
    });
  }

  function directPrerequisiteKeysForConceptKey(key) {
    const prereqMap = (typeof CONCEPT_PREREQUISITES !== "undefined") ? CONCEPT_PREREQUISITES : {};
    const keys = new Set();
    const addDeps = (deps) => {
      (deps || []).forEach((depKey) => {
        keys.add(canonicalPrerequisiteKey(depKey) || depKey);
      });
    };

    addDeps(prereqMap[key]);
    Object.keys(prereqMap).forEach((candidateKey) => {
      const ref = prerequisiteRef(candidateKey);
      if (!ref) return;
      if (ref.key === key) {
        addDeps(prereqMap[candidateKey]);
      }
    });
    return sortPrerequisiteKeysByStudyOrder(keys);
  }

  function getFullPrerequisiteChain(key) {
    const rootKey = canonicalPrerequisiteKey(key) || key;
    const directKeys = new Set(directPrerequisiteKeysForConceptKey(rootKey));
    const seen = new Set();
    const visiting = new Set();

    function visit(currentKey) {
      if (visiting.has(currentKey)) return;
      visiting.add(currentKey);
      directPrerequisiteKeysForConceptKey(currentKey).forEach((depKey) => {
        const canonicalDep = canonicalPrerequisiteKey(depKey);
        if (!canonicalDep || canonicalDep === rootKey) return;
        if (!seen.has(canonicalDep)) {
          seen.add(canonicalDep);
        }
        visit(canonicalDep);
      });
      visiting.delete(currentKey);
    }

    visit(rootKey);
    return sortPrerequisiteKeysByStudyOrder(seen).map((depKey) => ({
      key: depKey,
      relation: directKeys.has(depKey) ? "direct" : "base",
    }));
  }

  function renderPrerequisiteChip(prereqKey, relation = "direct") {
    const ref = prerequisiteRef(prereqKey);
    const fallback = splitGraphConceptKey(prereqKey);
    const lessonId = ref?.lesson?.id || fallback.lessonId || "";
    const conceptName = ref?.concept?.conceptName || fallback.conceptName || prereqKey;
    const lessonTitle = ref?.lesson?.title || lessonId || "שיעור לא זמין";
    const sc = ref ? getScore(ref.lesson.id, ref.concept.conceptName) : null;
    const percent = ref ? masteryPercent(sc) : null;
    const isMastered = percent === 100;
    const explanation = ref
      ? compactTextForTooltip(ref.concept.levels?.grandma || bestExplanation(ref.concept))
      : "המושג מוגדר כתלות, אבל לא נמצא כרטיס שיעור תואם.";
    const scoreText = ref ? `${percent}` : "לא זמין";
    const scoreLabel = ref ? `רמת בקיאות ${percent} מתוך 100` : "רמת בקיאות לא זמינה";
    const tooltip = `${conceptName}: ${explanation} נלמד ב: ${lessonTitle}. רמת בקיאות: ${ref ? `${percent}/100` : "לא זמינה"}.`;
    const navAttrs = ref
      ? `data-prereq-lesson="${esc(lessonId)}" data-prereq-concept="${esc(conceptName)}"`
      : `disabled aria-disabled="true"`;
    const relationClass = relation === "direct" ? "direct" : "base";
    const relationLabel = relation === "direct" ? "ישיר" : "בסיס";

    return `
      <button type="button" class="prereq-chip ${relationClass} ${isMastered ? "mastered" : ""} ${ref ? "" : "unresolved"}"
        ${navAttrs}
        title="${esc(tooltip)}"
        data-tooltip="${esc(tooltip)}">
        <span class="prereq-name">${esc(conceptName)}</span>
        <span class="prereq-lesson">${esc(lessonTitle)}</span>
        <span class="prereq-relation ${relationClass}">${esc(relationLabel)}</span>
        <span class="prereq-score" aria-label="${esc(scoreLabel)}">
          ${isMastered ? `<span class="prereq-check" aria-hidden="true">✓</span>` : ""}
          <span>${esc(scoreText)}</span>
        </span>
      </button>`;
  }

  function questionPrereqCore() {
    return window.LUMEN_CORE && window.LUMEN_CORE.questionPrerequisites;
  }

  function recordConceptConfidenceCalibration(lessonId, conceptName, concept, {
    confidence = null,
    correct = false,
    kind = "mc",
    question = {},
  } = {}) {
    if (confidence == null) return null;
    const core = confidenceCalibrationCore();
    if (!core || typeof core.updateConfidenceCalibrationState !== "function") return null;
    const topicMeta = getTopicForLesson(lessonId);
    const result = core.updateConfidenceCalibrationState(
      ensureConfidenceCalibrationState(),
      {
        conceptKey: conceptKey(lessonId, conceptName),
        lessonId,
        conceptName,
        topic: topicMeta.topic,
        subtopic: topicMeta.subtopic,
        confidence,
        correct,
        kind,
        questionId: question?.id || "",
        timestamp: Date.now(),
      },
    );
    confidenceCalibrationState = result.state;
    saveConfidenceCalibrationState();
    if (!result.entry) return null;
    return {
      ...result,
      message:
        typeof core.calibrationMessage === "function"
          ? core.calibrationMessage(result.entry.bucket)
      : "",
    };
  }

  function pendingConfusionId(record) {
    return `still-${slugifyId([
      record?.conceptKey || "",
      record?.questionId || "",
      record?.misconception?.id || "conceptGap",
      record?.timestamp || "",
    ].join("|")).replace(/^id-/, "")}`;
  }

  function setGrandmaLevelForSimplerPath() {
    currentLevel = "grandma";
    levelTabs.forEach((tab) => {
      const active = tab.dataset.level === "grandma";
      tab.classList.toggle("active", active);
    });
  }

  function appendConfusionBlocker(record) {
    const core = confusionBlockersCore();
    ensureConfusionBlockerState();
    if (core && typeof core.appendConfusionBlocker === "function") {
      const result = core.appendConfusionBlocker(confusionBlockerState, record, {
        timestamp: Date.now(),
        maxEntries: 100,
      });
      confusionBlockerState = result.state;
      saveConfusionBlockerState();
      return result.blocker;
    }

    const target = record.prerequisiteRewind || {
      lessonId: record.lessonId,
      conceptName: record.conceptName,
      conceptKey: record.conceptKey,
    };
    const blocker = {
      id: `cb-${slugifyId([record.conceptKey, record.questionId, target.conceptKey].join("|")).replace(/^id-/, "")}`,
      status: "open",
      createdAt: Date.now(),
      sourceConceptKey: record.conceptKey,
      sourceLessonId: record.lessonId,
      sourceConceptName: record.conceptName,
      targetLessonId: target.lessonId,
      targetConceptName: target.conceptName,
      targetConceptKey: target.conceptKey,
      topic: record.topic,
      subtopic: record.subtopic,
      questionId: record.questionId,
      misconceptionId: record.misconception?.id || "conceptGap",
      misconceptionLabel: record.misconception?.label || "פער מושגי",
    };
    confusionBlockerState.blockers = [
      blocker,
      ...confusionBlockerState.blockers.filter((item) => item && item.id !== blocker.id),
    ].slice(0, 100);
    saveConfusionBlockerState();
    return blocker;
  }

  function handleStillConfused(button) {
    const id = button?.dataset?.stillConfused || "";
    const record = pendingConfusionRecords.get(id);
    if (!record) return;
    const blocker = appendConfusionBlocker(record);
    if (!blocker) return;

    recordLearningEvidence("review", {
      source: "still-confused",
      lessonId: blocker.targetLessonId || record.lessonId,
      conceptKey: blocker.targetConceptKey || record.conceptKey,
      conceptName: blocker.targetConceptName || record.conceptName,
      topic: record.topic,
      subtopic: record.subtopic,
      kind: "escape-hatch",
      correct: false,
    });

    button.textContent = "נרשם. פותח הסבר פשוט...";
    button.disabled = true;
    setGrandmaLevelForSimplerPath();
    openLessonConcept(blocker.targetLessonId || record.lessonId, blocker.targetConceptName || record.conceptName);
  }

  function wireQuestionPrerequisiteNavigation(root = document) {
    root.querySelectorAll("[data-q-prereq-lesson][data-q-prereq-concept]").forEach((btn) => {
      if (btn.dataset.boundQPrereqNav === "1") return;
      btn.dataset.boundQPrereqNav = "1";
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        openLessonConcept(btn.dataset.qPrereqLesson, btn.dataset.qPrereqConcept);
      });
    });
  }

  function fallbackQuestionConceptKeys(question, lesson, concept, questionIndex) {
    if (Array.isArray(question?.conceptKeys) && question.conceptKeys.length) return question.conceptKeys;
    if (question?.conceptKey) return [question.conceptKey];
    if (lesson && concept) return [conceptKey(lesson.id, concept.conceptName)];
    if (lesson && Number.isInteger(questionIndex) && lesson.concepts?.[questionIndex]) {
      return [conceptKey(lesson.id, lesson.concepts[questionIndex].conceptName)];
    }
    return [];
  }

  function inferQuestionConceptKeys(question, lesson, concept, questionIndex, limit = 5) {
    const core = questionPrereqCore();
    if (core && typeof core.inferQuestionConceptKeys === "function") {
      return core.inferQuestionConceptKeys({
        question,
        lesson,
        concept,
        lessons: window.LESSONS_DATA || [],
        glossary: window.GLOSSARY || {},
        questionIndex,
        limit,
      });
    }
    return fallbackQuestionConceptKeys(question, lesson, concept, questionIndex).slice(0, limit);
  }

  function inferQuestionGlossaryTerms(question, limit = 6) {
    const core = questionPrereqCore();
    if (!core || typeof core.inferGlossaryTerms !== "function") return [];
    return core.inferGlossaryTerms({
      question,
      glossary: window.GLOSSARY || {},
      limit,
    });
  }

  function uniqueQuestionKeys(keys) {
    const core = questionPrereqCore();
    if (core && typeof core.uniqueStable === "function") return core.uniqueStable(keys);
    const seen = new Set();
    return (keys || []).filter((key) => {
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function renderQuestionConceptAid(key, relation, focusSet) {
    const ref = prerequisiteRef(key);
    const fallback = splitGraphConceptKey(key);
    const conceptName = ref?.concept?.conceptName || fallback.conceptName || key;
    const lessonTitle = ref?.lesson?.title || fallback.lessonId || "שיעור לא זמין";
    const simple = ref?.concept?.levels?.grandma || "";
    const technical = ref?.concept?.levels?.student || bestExplanation(ref?.concept || {});
    const sc = ref ? getScore(ref.lesson.id, ref.concept.conceptName) : null;
    const pct = ref ? masteryPercent(sc) : null;
    const relationLabel = focusSet.has(key)
      ? "מושג בשאלה"
      : relation === "direct"
        ? "דרישת קדם ישירה"
        : "בסיס עקיף";
    const navAttrs = ref
      ? `data-q-prereq-lesson="${esc(ref.lesson.id)}" data-q-prereq-concept="${esc(ref.concept.conceptName)}"`
      : `disabled aria-disabled="true"`;

    return `
      <article class="q-prereq-item ${focusSet.has(key) ? "focus" : esc(relation || "base")}">
        <button type="button" class="q-prereq-title" ${navAttrs}>
          <span>${esc(conceptName)}</span>
          <small>${esc(relationLabel)}${pct !== null ? ` · ${pct}/100` : ""}</small>
        </button>
        <div class="q-prereq-lesson">${esc(lessonTitle)}</div>
        ${simple ? `<p><strong>בשפה פשוטה:</strong> ${esc(simple)}</p>` : ""}
        ${technical ? `<p><strong>מה צריך לדעת:</strong> ${esc(technical)}</p>` : ""}
      </article>`;
  }

  function renderQuestionPrereqPanel({ question, lesson, concept = null, questionIndex = null, mode = "quiz" }) {
    const focusKeys = uniqueQuestionKeys(
      inferQuestionConceptKeys(question, lesson, concept, questionIndex, 5)
        .map((key) => canonicalPrerequisiteKey(key) || key),
    );
    const focusSet = new Set(focusKeys);
    const prereqPairs = [];
    focusKeys.slice(0, 3).forEach((key) => {
      getFullPrerequisiteChain(key).forEach((item) => {
        prereqPairs.push(item);
      });
    });

    const relationByKey = new Map();
    prereqPairs.forEach((item) => {
      if (!relationByKey.has(item.key)) relationByKey.set(item.key, item.relation);
    });
    focusKeys.forEach((key) => relationByKey.set(key, "focus"));

    const orderedKeys = uniqueQuestionKeys([
      ...focusKeys,
      ...prereqPairs.filter((item) => item.relation === "direct").map((item) => item.key),
      ...prereqPairs.filter((item) => item.relation !== "direct").map((item) => item.key),
    ]).slice(0, mode === "mock" ? 6 : 8);
    const terms = inferQuestionGlossaryTerms(question, mode === "mock" ? 4 : 6);

    if (!orderedKeys.length && !terms.length) {
      return `
        <aside class="q-prereq-panel compact">
          <div class="q-prereq-head">
            <strong>דרישות קדם לשאלה</strong>
            <span>לא נמצאה מפת תלות</span>
          </div>
          <p class="q-prereq-empty">השאלה לא מחוברת עדיין למושג ממופה. כדאי להוסיף conceptKey כדי להציג עזרה מדויקת.</p>
        </aside>`;
    }

    const conceptHTML = orderedKeys
      .map((key) => renderQuestionConceptAid(key, relationByKey.get(key), focusSet))
      .join("");
    const termsHTML = terms.length
      ? `<div class="q-prereq-terms">
          <div class="q-prereq-subtitle">מונחים שמופיעים בשאלה</div>
          ${terms.map(({ term, entry }) => `
            <div class="q-term-row">
              <span class="q-term-name">${esc(term)}${entry?.he ? ` · ${esc(entry.he)}` : ""}</span>
              <span>${esc(entry?.short || entry?.long || "מונח מהמילון.")}</span>
            </div>`).join("")}
        </div>`
      : "";

    return `
      <aside class="q-prereq-panel ${esc(mode)}" aria-label="דרישות קדם לשאלה">
        <div class="q-prereq-head">
          <strong>דרישות קדם לשאלה</strong>
          <span>${orderedKeys.length} מושגים · ${terms.length} מונחים</span>
        </div>
        <div class="q-prereq-note">אם לא למדת מושג כאן, קרא את ההסבר הקצר לפני בחירת תשובה.</div>
        <div class="q-prereq-list">${conceptHTML}</div>
        ${termsHTML}
      </aside>`;
  }

  // =========== HEBREW CODE ANNOTATOR ===========
  // Mapping: detect common JS / React / Node / Mongo patterns and produce a
  // short Hebrew explanation appended as a comment at the END of the line.
  // The annotator is intentionally conservative: only patterns we KNOW are added.
  const HEB_PATTERNS = [
    // --- React Hooks ---
    { re: /\buseState\s*\(/, hint: "useState — Hook לניהול state פנימי בקומפוננטה" },
    { re: /\buseEffect\s*\(/, hint: "useEffect — מריץ קוד אחרי רינדור (תופעות לוואי)" },
    { re: /\buseRef\s*\(/, hint: "useRef — שומר ערך שלא גורם לרינדור מחדש כשמשתנה" },
    { re: /\buseMemo\s*\(/, hint: "useMemo — מטמון לערך שמחושב יקר" },
    { re: /\buseCallback\s*\(/, hint: "useCallback — מטמון לפונקציה (שומר זהות בין רינדורים)" },
    { re: /\buseContext\s*\(/, hint: "useContext — קורא ערך מ-Context Provider בעץ הקומפוננטות" },
    { re: /\buseReducer\s*\(/, hint: "useReducer — חלופה ל-useState לניהול state מורכב עם פעולות" },
    { re: /\buseParams\s*\(/, hint: "useParams — שולף פרמטרים דינמיים מה-URL (Router)" },
    { re: /\buseNavigate\s*\(/, hint: "useNavigate — מאפשר ניווט פרוגרמטי בין מסכים" },
    { re: /\bcreateContext\s*\(/, hint: "createContext — יוצר ערוץ נתונים ש-Provider יזרים אליו" },

    // --- React core ---
    { re: /<\w+(\s|\/|>)/, hint: "JSX — תחביר שמשלב HTML בתוך JS, מתורגם ל-React.createElement" },
    { re: /\bclassName\s*=/, hint: "className — תחליף ל-class ב-JSX (כי class שמורה ב-JS)" },
    { re: /\bprops\b/, hint: "props — נתונים שעוברים מהקומפוננטה האב לבן" },
    { re: /<[A-Z]\w+\.Provider/, hint: "Provider — עוטף את העץ ומספק ערך לכל הצאצאים" },
    { re: /\bReact\.memo\s*\(/, hint: "React.memo — ממנע רינדור מחדש אם ה-props לא השתנו" },

    // --- Array methods ---
    { re: /\.map\s*\(/, hint: "map — יוצר מערך חדש בעקבות טרנספורמציה לכל איבר" },
    { re: /\.filter\s*\(/, hint: "filter — מערך חדש רק עם איברים שעוברים תנאי" },
    { re: /\.reduce\s*\(/, hint: "reduce — מצמצם מערך לערך בודד (סכום, אובייקט וכו')" },
    { re: /\.forEach\s*\(/, hint: "forEach — מבצע פעולה לכל איבר (לא מחזיר ערך)" },
    { re: /\.find\s*\(/, hint: "find — מחזיר את האיבר הראשון שעובר תנאי, או undefined" },
    { re: /\.some\s*\(/, hint: "some — true אם לפחות איבר אחד עובר תנאי" },
    { re: /\.every\s*\(/, hint: "every — true רק אם כל האיברים עוברים תנאי" },
    { re: /\.includes\s*\(/, hint: "includes — בודק אם ערך קיים במערך/מחרוזת" },
    { re: /\.push\s*\(/, hint: "push — מוסיף איבר בסוף המערך (משנה את המערך המקורי!)" },
    { re: /\.pop\s*\(/, hint: "pop — מסיר ומחזיר את האיבר האחרון" },
    { re: /\.shift\s*\(/, hint: "shift — מסיר ומחזיר את האיבר הראשון" },
    { re: /\.unshift\s*\(/, hint: "unshift — מוסיף איבר בתחילת המערך" },
    { re: /\.splice\s*\(/, hint: "splice — מוסיף/מסיר איברים באמצע המערך (משנה אותו!)" },
    { re: /\.slice\s*\(/, hint: "slice — מחזיר חלק מהמערך כעותק חדש (לא משנה את המקור)" },
    { re: /\.sort\s*\(/, hint: "sort — ממיין את המערך במקום (כברירת מחדל לפי אלפבית!)" },
    { re: /\.concat\s*\(/, hint: "concat — מאחד מערכים למערך חדש" },
    { re: /\.join\s*\(/, hint: "join — הופך מערך למחרוזת עם מפריד" },
    { re: /\.split\s*\(/, hint: "split — הופך מחרוזת למערך לפי מפריד" },

    // --- Async / Promise / Fetch ---
    { re: /\basync\s+function|\basync\s*\(/, hint: "async — מסמן פונקציה אסינכרונית, מחזירה Promise" },
    { re: /\bawait\b/, hint: "await — מחכה לפתרון של Promise בלי לחסום את הדפדפן" },
    { re: /\bnew\s+Promise\s*\(/, hint: "Promise — אובייקט שמייצג ערך עתידי (pending/fulfilled/rejected)" },
    { re: /\.then\s*\(/, hint: "then — רושם callback להפעלה כשה-Promise נפתר בהצלחה" },
    { re: /\.catch\s*\(/, hint: "catch — תופס שגיאה מ-Promise שנדחה" },
    { re: /\.finally\s*\(/, hint: "finally — רץ תמיד, גם אם הצליח וגם אם נכשל" },
    { re: /\bfetch\s*\(/, hint: "fetch — שולח בקשת HTTP, מחזיר Promise של Response" },
    { re: /\bres\.json\s*\(/, hint: "res.json() — מפענח גוף-תגובה כ-JSON" },
    { re: /\.resolve\s*\(/, hint: "resolve — פותר Promise בהצלחה עם ערך" },
    { re: /\.reject\s*\(/, hint: "reject — דוחה Promise עם שגיאה" },

    // --- Variables / declarations ---
    { re: /^\s*const\s+\w+\s*=/, hint: "const — קבוע (לא ניתן להציב ערך חדש למשתנה)" },
    { re: /^\s*let\s+\w+\s*=/, hint: "let — משתנה שניתן להציב לו ערך חדש (block-scoped)" },
    { re: /^\s*var\s+\w+\s*=/, hint: "var — הצהרת משתנה ישנה (function-scoped, עדיף let/const)" },
    { re: /=>\s*[{(]/, hint: "Arrow function — פונקציה קצרה, ללא binding משלה ל-this" },
    { re: /\bfunction\s+\w+\s*\(/, hint: "function — הצהרת פונקציה רגילה (hoisted, עם this משלה)" },
    { re: /\bclass\s+\w+/, hint: "class — סוכר תחבירי על prototype, מבנה לאובייקטים" },
    { re: /\bextends\s+\w+/, hint: "extends — ירושה: המחלקה הזו יורשת ממחלקה אחרת" },
    { re: /\bsuper\s*\(/, hint: "super — קורא ל-constructor של מחלקת-העל" },
    { re: /\bnew\s+\w+\s*\(/, hint: "new — יוצר מופע חדש של מחלקה (קורא ל-constructor)" },

    // --- Spread / destructuring ---
    { re: /\.\.\.\w+/, hint: "spread — פורש איברים של מערך/אובייקט (חיוני ל-immutability)" },
    { re: /\bconst\s*\{\s*\w+/, hint: "destructuring — שולף מאפיינים מאובייקט למשתנים נפרדים" },
    { re: /\bconst\s*\[\s*\w+/, hint: "destructuring — שולף איברי מערך למשתנים נפרדים" },

    // --- Modules ---
    { re: /^\s*import\s+/, hint: "import — מייבא קוד ממודול אחר" },
    { re: /^\s*export\s+default/, hint: "export default — ייצוא ראשי של המודול (אחד למודול)" },
    { re: /^\s*export\s+/, hint: "export — ייצוא בעל-שם (אפשר כמה במודול)" },
    { re: /\brequire\s*\(/, hint: "require — ייבוא בסגנון CommonJS (Node.js)" },
    { re: /\bmodule\.exports\s*=/, hint: "module.exports — מייצא ערך מהמודול (CommonJS)" },

    // --- Express / Server ---
    { re: /\bexpress\s*\(\s*\)/, hint: "express() — יוצר אפליקציית Express" },
    { re: /\bapp\.get\s*\(/, hint: "GET endpoint — קריאת מידע (Read)" },
    { re: /\bapp\.post\s*\(/, hint: "POST endpoint — יצירת משאב חדש (Create)" },
    { re: /\bapp\.put\s*\(/, hint: "PUT endpoint — עדכון מלא של משאב (Update)" },
    { re: /\bapp\.delete\s*\(/, hint: "DELETE endpoint — מחיקת משאב (Delete)" },
    { re: /\bapp\.use\s*\(/, hint: "use() — רישום middleware שרץ לכל בקשה" },
    { re: /\bres\.send\s*\(/, hint: "res.send — שולח תגובה ללקוח" },
    { re: /\bres\.json\s*\(/, hint: "res.json — שולח JSON ללקוח" },
    { re: /\bres\.status\s*\(/, hint: "res.status — מגדיר HTTP status code (200/201/404/500...)" },
    { re: /\breq\.body\b/, hint: "req.body — גוף הבקשה (JSON שנשלח מהלקוח)" },
    { re: /\breq\.params\b/, hint: "req.params — פרמטרים דינמיים מה-URL (כמו :id)" },
    { re: /\breq\.query\b/, hint: "req.query — פרמטרי query string (?key=val)" },
    { re: /\bnext\s*\(\s*\)/, hint: "next() — מעביר את הבקשה ל-middleware הבא" },

    // --- Mongoose / DB ---
    { re: /\bmongoose\.Schema\b|new\s+mongoose\.Schema/, hint: "Schema — מגדיר את מבנה המסמך ב-Mongo" },
    { re: /\bmongoose\.model\b/, hint: "model — יוצר מודל מ-Schema, ממנו עושים פעולות DB" },
    { re: /\bmongoose\.connect\b/, hint: "connect — מתחבר ל-MongoDB (ב-startup של השרת)" },
    { re: /\.find\s*\(\s*\{/, hint: "find — שולף מסמכים לפי תנאי (מחזיר מערך)" },
    { re: /\.findOne\s*\(/, hint: "findOne — שולף מסמך אחד שתואם, או null" },
    { re: /\.findById\s*\(/, hint: "findById — שולף מסמך לפי _id" },
    { re: /\.create\s*\(/, hint: "create — יוצר ושומר מסמך חדש" },
    { re: /\.save\s*\(\s*\)/, hint: "save — שומר את המסמך ל-DB (insert/update)" },

    // --- DOM ---
    { re: /\bdocument\.getElementById\b/, hint: "getElementById — שולף אלמנט לפי id (ראשון בלבד)" },
    { re: /\bdocument\.querySelector\b/, hint: "querySelector — שולף אלמנט לפי CSS selector (הראשון)" },
    { re: /\bdocument\.querySelectorAll\b/, hint: "querySelectorAll — מחזיר NodeList של כל ההתאמות" },
    { re: /\bdocument\.createElement\b/, hint: "createElement — יוצר אלמנט HTML חדש בזיכרון" },
    { re: /\baddEventListener\b/, hint: "addEventListener — מאזין לאירוע (click/input/submit...)" },
    { re: /\.appendChild\b/, hint: "appendChild — מוסיף אלמנט-בן ל-DOM" },
    { re: /\.innerHTML\s*=/, hint: "innerHTML — מחליף את כל ה-HTML הפנימי (זהירות מ-XSS!)" },
    { re: /\.textContent\s*=/, hint: "textContent — מחליף את הטקסט הפנימי (בטוח מ-XSS)" },
    { re: /\.classList\.add|\.classList\.remove|\.classList\.toggle/, hint: "classList — שולט במחלקות CSS של האלמנט" },
    { re: /\blocalStorage\.setItem\b/, hint: "localStorage — שומר נתונים לאחסון מתמשך בדפדפן" },
    { re: /\blocalStorage\.getItem\b/, hint: "localStorage.getItem — קורא מאחסון מתמשך (מחרוזת או null)" },
    { re: /\bJSON\.stringify\b/, hint: "JSON.stringify — הופך ערך JS למחרוזת JSON (לאחסון/שליחה)" },
    { re: /\bJSON\.parse\b/, hint: "JSON.parse — הופך מחרוזת JSON חזרה לערך JS" },

    // --- Errors / Control flow ---
    { re: /^\s*try\s*\{/, hint: "try — מנסה להריץ קוד שעלול לזרוק שגיאה" },
    { re: /\bcatch\s*\(/, hint: "catch — תופס שגיאה ומאפשר טיפול ידידותי" },
    { re: /^\s*finally\s*\{/, hint: "finally — רץ תמיד (גם אחרי throw/return)" },
    { re: /^\s*throw\s+/, hint: "throw — זורק שגיאה (מפסיק את הביצוע עד try/catch)" },
    { re: /^\s*if\s*\(/, hint: "if — תנאי: מריץ את הבלוק רק אם הביטוי אמיתי" },
    { re: /^\s*else\b/, hint: "else — מבוצע אם ה-if לא התקיים" },
    { re: /^\s*for\s*\(/, hint: "for — לולאה (אתחול; תנאי; קידום)" },
    { re: /^\s*while\s*\(/, hint: "while — לולאה כל עוד התנאי אמיתי" },
    { re: /^\s*return\s+/, hint: "return — מחזיר ערך מהפונקציה ויוצא ממנה" },

    // --- TypeScript ---
    { re: /:\s*string\b/, hint: ": string — טיפוס מחרוזת (TypeScript)" },
    { re: /:\s*number\b/, hint: ": number — טיפוס מספר (TypeScript)" },
    { re: /:\s*boolean\b/, hint: ": boolean — טיפוס בוליאני (TypeScript)" },
    { re: /:\s*\w+\[\]/, hint: "[] — טיפוס מערך של (TypeScript)" },
    { re: /^\s*interface\s+\w+/, hint: "interface — חתימה של אובייקט/מחלקה (TypeScript)" },
    { re: /^\s*type\s+\w+\s*=/, hint: "type — alias לטיפוס (TypeScript)" },
    { re: /\?\s*:/, hint: "? — שדה אופציונלי (TypeScript)" },

    // --- Console ---
    { re: /\bconsole\.log\b/, hint: "console.log — הדפסה לקונסול (לדיבוג)" },
    { re: /\bconsole\.error\b/, hint: "console.error — הדפסת שגיאה (אדומה בקונסול)" },
  ];

  // Apply Hebrew comments line-by-line. Returns the original code with `// הערה`
  // appended at the end of each line that matches a known pattern.
  function annotateCodeHebrew(code) {
    if (!code) return "";
    const lines = code.split("\n");
    return lines
      .map((line) => {
        // Skip if line already has a comment, is empty, or is just braces
        if (!line.trim() || /^\s*\/\//.test(line) || /^\s*[{}();,]+\s*$/.test(line))
          return line;
        // Don't double-comment if user's line already has // comment
        if (/\s\/\/\s/.test(line)) return line;
        for (const p of HEB_PATTERNS) {
          if (p.re.test(line)) {
            // Pad to align comment columns nicely
            const padded = line.length < 50 ? line + " ".repeat(Math.max(1, 50 - line.length)) : line + "  ";
            return `${padded} // ${p.hint}`;
          }
        }
        return line;
      })
      .join("\n");
  }

  function shortName(s) {
    return (s || "").trim().replace(/\s+/g, " ");
  }

  // Weight per concept — lower current level = higher weight (concept needs more practice).
  // Difficulty and weakReports also boost the weight: harder concepts and user-flagged
  // weak ones surface more often.
  function weightFor(lessonId, conceptName) {
    const sc = getScore(lessonId, conceptName);
    if (sc.level >= 7) return 0.15; // mastered — almost never re-asked
    // Base: level 1 -> 8, level 6 -> 3
    let w = Math.max(1.5, 9 - sc.level);
    if (sc.attempts === 0) w *= 1.3; // never tried — slight boost
    // If concept already passed MC at current level but not fill, slightly boost it so the user finishes the level
    if (sc.passedMC || sc.passedFill) w *= 1.4;

    // Difficulty boost: harder concepts surface ~25% more per difficulty point above 5.
    const concept = findConceptByKey(conceptKey(lessonId, conceptName))?.concept;
    if (concept) {
      const diff = getDifficulty(concept);
      if (diff > 5) w *= 1 + (diff - 5) * 0.15; // diff 10 → ×1.75
    }

    // Weak-report boost: each report doubles the weight (capped at ×4).
    if (sc.weakReports > 0) {
      w *= Math.min(4, 1 + sc.weakReports);
    }

    // SRS due boost: concepts whose next review is due/overdue get a ×3 boost
    // so the trainer brings them back into rotation (Track A — A4).
    if (isSrsDue(sc)) {
      w *= 3;
    }

    return Math.max(0.2, w);
  }

  function pickWeightedConcept() {
    const pool = trainableConcepts();
    if (pool.length === 0) return null;

    let filtered = pool;
    if (trainerMode === "weak") {
      filtered = pool.filter(({ lesson, concept }) => {
        const sc = getScore(lesson.id, concept.conceptName);
        return sc.level <= 3; // grandma/child/soldier — still considered weak
      });
      if (filtered.length === 0) filtered = pool;
    }

    const weights = filtered.map(({ lesson, concept }) =>
      weightFor(lesson.id, concept.conceptName),
    );
    const total = weights.reduce((a, b) => a + b, 0);
    let r = window.RNG.next() * total;
    for (let i = 0; i < filtered.length; i++) {
      r -= weights[i];
      if (r <= 0) return filtered[i];
    }
    return filtered[filtered.length - 1];
  }

  // ---- Code Fill: pick a meaningful blank in concept.codeExample
  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Common JS/React keywords/methods worth blanking out
  const FILL_PRIORITY = new Set([
    "useState", "useEffect", "useRef", "useMemo", "useCallback", "useContext",
    "useReducer", "createContext", "Provider", "memo", "forwardRef",
    "map", "filter", "reduce", "forEach", "find", "some", "every", "includes",
    "push", "pop", "shift", "unshift", "splice", "slice", "concat", "sort",
    "async", "await", "Promise", "then", "catch", "finally", "resolve", "reject",
    "fetch", "json", "addEventListener", "querySelector", "createElement",
    "const", "let", "var", "return", "function", "class", "extends", "super",
    "import", "export", "default", "from", "as",
    "true", "false", "null", "undefined",
    "this", "new", "delete", "typeof", "instanceof",
    "props", "state", "children", "key", "ref",
  ]);

  function makeCodeFill(concept) {
    const code = concept.codeExample;
    if (!code || code.length < 8) return null;

    const name = (concept.conceptName || "").trim();
    if (!name) return null;

    // 1) Try to find the concept name (or a single-word part of it) in the code
    const words = name.split(/[\s\-_]+/).filter((w) => w.length >= 3);
    for (const w of words) {
      const re = new RegExp(`\\b(${escapeRegex(w)})\\b`, "i");
      const m = code.match(re);
      if (m) {
        const answer = m[0];
        if (answer.length < 2 || answer.length > 24) continue;
        const blanked = code.replace(re, "____");
        return { answer, blanked };
      }
    }

    // 2) Try priority keyword/method tokens
    const tokens = code.match(/[A-Za-z_$][A-Za-z0-9_$]+/g) || [];
    const priorityHits = tokens.filter((t) => FILL_PRIORITY.has(t));
    if (priorityHits.length > 0) {
      const chosen = priorityHits[window.RNG.int(priorityHits.length)];
      const idx = code.indexOf(chosen);
      if (idx !== -1) {
        const blanked =
          code.substring(0, idx) + "____" + code.substring(idx + chosen.length);
        return { answer: chosen, blanked };
      }
    }

    // 3) Fallback: pick a "distinctive" identifier (length ≥ 4, not a number/bracket)
    const skip = new Set([
      "console", "log", "document", "window", "true", "false", "null",
      "undefined", "if", "else", "for", "while",
    ]);
    const candidates = tokens.filter(
      (t) => !skip.has(t) && t.length >= 4 && t.length <= 18,
    );
    if (candidates.length === 0) return null;
    const chosen = candidates[window.RNG.int(candidates.length)];
    const idx = code.indexOf(chosen);
    if (idx === -1) return null;
    const blanked =
      code.substring(0, idx) + "____" + code.substring(idx + chosen.length);
    return { answer: chosen, blanked };
  }

  // Question generation: returns either a multiple-choice (kind="mc") or code-fill (kind="fill")
  // question depending on the concept's CURRENT level and which stage it has not yet passed.
  // The MC's correct answer uses the explanation of the concept's current level.
  function buildQuestion(lessonItem) {
    const { lesson, concept } = lessonItem;
    const sc = getScore(lesson.id, concept.conceptName);
    const need = nextNeedFor(concept, sc);
    if (!need) return null; // mastered

    // Helpers
    const pool = trainableConcepts().filter(
      (x) => x.concept.conceptName !== concept.conceptName,
    );

    function shuffle(arr) {
      return window.RNG.shuffle(arr);
    }

    // --- Code Trace (curated, multi-step) — preferred occasionally for the MC stage ---
    // We only offer trace as an alternative to MC, never instead of fill.
    // Triggered when: need === "mc", level >= 3, and a curated trace exists for this concept.
    if (need === "mc" && sc.level >= 3 && window.RNG.next() < 0.45) {
      const conceptKey = `${lesson.id}::${concept.conceptName}`;
      const trace = pickTraceForConcept(conceptKey);
      if (trace) {
        return {
          kind: "trace",
          level: sc.level,
          trace, // full trace question object: { id, code, steps[], explanation }
        };
      }
    }

    // --- Code-fill stage ---
    if (need === "fill") {
      const fill = makeCodeFill(concept);
      if (fill) {
        return {
          kind: "fill",
          level: sc.level,
          question: `השלם את הטוקן החסר בקוד של המושג "${concept.conceptName}":`,
          codeBlock: fill.blanked,
          answer: fill.answer,
          hint: `אורך התשובה: ${fill.answer.length} תווים. אות ראשונה: "${fill.answer[0]}".`,
          explanation: `התשובה הנכונה: ${fill.answer}. ${concept.codeExplanation || ""}`.trim(),
        };
      }
      // If we couldn't generate a fill (no codeExample / weird code), fall through to MC.
    }

    // --- Multiple-choice stage at current level ---
    const levelKey = LEVEL_KEYS[sc.level] || "junior";
    const conceptLevels = concept.levels || {};
    const correctExpl = conceptLevels[levelKey] || bestExplanation(concept);
    const levelLabel = LEVEL_INFO[sc.level].label;

    // Distractors: explanations from OTHER concepts at the SAME level (so wording matches difficulty).
    // Falls back to bestExplanation if some concepts lack that level.
    function distractorAt(otherConcept) {
      const lv = otherConcept.levels || {};
      return lv[levelKey] || bestExplanation(otherConcept);
    }

    function pickDistractors(n, accessor) {
      const arr = window.RNG.shuffle(pool);
      const seen = new Set([accessor(concept)]);
      const out = [];
      for (const item of arr) {
        const v = accessor(item.concept);
        if (!v || seen.has(v)) continue;
        seen.add(v);
        out.push(v);
        if (out.length >= n) break;
      }
      return out;
    }

    // Pick one of two MC sub-types: "describe" (concept → explanation) or "name-match" (explanation → concept)
    const subType = window.RNG.next() < 0.5 ? "describe" : "name-match";

    if (subType === "describe") {
      const distractors = pickDistractors(3, distractorAt);
      const opts = shuffle([correctExpl, ...distractors]);
      return {
        kind: "mc",
        level: sc.level,
        question: `איזה מהמשפטים הבאים מתאר נכון את "${concept.conceptName}" — ברמת ${LEVEL_INFO[sc.level].icon} ${levelLabel}?`,
        options: opts,
        correctIndex: opts.indexOf(correctExpl),
        explanation: `הגדרה ברמת ${levelLabel}: ${correctExpl}`,
      };
    }

    // name-match: show the level-specific explanation, ask for the concept name
    const distractors = pickDistractors(3, (c) => c.conceptName);
    const opts = shuffle([concept.conceptName, ...distractors]);
    return {
      kind: "mc",
      level: sc.level,
      question: `איזה מושג מתאים להסבר הבא (ברמת ${LEVEL_INFO[sc.level].icon} ${levelLabel})?\n\n"${correctExpl}"`,
      options: opts,
      correctIndex: opts.indexOf(concept.conceptName),
      explanation: `המושג: ${concept.conceptName}.`,
    };
  }

  function nextQuestion() {
    trainerLastAnswered = false;
    trainerConfidence = null;
    const dueRetest = dueAdaptiveRetestItem();
    if (dueRetest) {
      const ref = findConceptByKeyLoose(dueRetest.conceptKey);
      if (ref) {
        const retestQuestion = buildQuestion({ lesson: ref.lesson, concept: ref.concept });
        if (retestQuestion) {
          trainerCurrent = {
            lesson: ref.lesson,
            concept: ref.concept,
            question: retestQuestion,
            retestItem: dueRetest,
          };
          renderTrainerCard();
          return;
        }
      }
      recordAdaptiveRetestOutcome(dueRetest, true);
    }

    // Try up to 8 times to find a non-mastered concept (since mastered ones return null question)
    let picked = null, q = null;
    for (let i = 0; i < 8; i++) {
      picked = pickWeightedConcept();
      if (!picked) break;
      q = buildQuestion(picked);
      if (q) break;
    }
    if (!picked || !q) {
      trainerCurrent = null;
      renderTrainerCard();
      return;
    }
    trainerCurrent = { lesson: picked.lesson, concept: picked.concept, question: q };
    renderTrainerCard();
  }

  function masteredCount() {
    let m = 0;
    trainableConcepts().forEach(({ lesson, concept }) => {
      if (getScore(lesson.id, concept.conceptName).level >= 7) m++;
    });
    return m;
  }

  function weakCount() {
    let w = 0;
    trainableConcepts().forEach(({ lesson, concept }) => {
      const sc = getScore(lesson.id, concept.conceptName);
      if (sc.level <= 2) w++; // level 1 (סבתא) or 2 (כיתה א')
    });
    return w;
  }

  // Average level across all trainable concepts (1..7) — for the global mastery bar
  function avgLevel() {
    const all = trainableConcepts();
    if (all.length === 0) return 1;
    const sum = all.reduce(
      (s, { lesson, concept }) => s + getScore(lesson.id, concept.conceptName).level,
      0,
    );
    return sum / all.length;
  }

  function updateTrainerDashboard() {
    const acc = trainerStats.asked
      ? Math.round((trainerStats.correct / trainerStats.asked) * 100)
      : 0;
    document.getElementById("t-asked").textContent = trainerStats.asked;
    document.getElementById("t-correct").textContent = trainerStats.correct;
    document.getElementById("t-wrong").textContent = trainerStats.wrong;
    document.getElementById("t-accuracy").textContent = acc + "%";
    document.getElementById("t-mastered").textContent = masteredCount();
    document.getElementById("t-weak").textContent = weakCount();

    const total = trainableConcepts().length || 1;
    const avg = avgLevel();
    // Global mastery scaled by (level - 1) / 6 so level 1 -> 0% and level 7 -> 100%
    const pct = Math.round(((avg - 1) / 6) * 100);
    document.getElementById("t-mastery-fill").style.width = pct + "%";
    document.getElementById("t-mastery-text").textContent =
      `שליטה כללית: ${pct}% · רמה ממוצעת ${avg.toFixed(2)} מתוך 7 · ${masteredCount()}/${total} ברמת מאסטר 🏆`;
  }

  function renderTrainerConfidenceControls() {
    const labels = {
      1: "מנחש",
      2: "חלש",
      3: "בינוני",
      4: "די בטוח",
      5: "בטוח מאוד",
    };
    return `
      <div class="tq-confidence" role="group" aria-label="כיול ביטחון לפני תשובה">
        <div class="tq-confidence-head">
          <strong>כמה אתה בטוח לפני התשובה?</strong>
          <span id="tq-confidence-hint">בחר 1-5 כדי לכייל את התחושה מול התוצאה.</span>
        </div>
        <div class="tq-confidence-scale">
          ${[1, 2, 3, 4, 5].map((value) => `
            <button type="button"
              class="tq-confidence-btn ${trainerConfidence === value ? "active" : ""}"
              data-trainer-confidence="${value}"
              aria-pressed="${trainerConfidence === value ? "true" : "false"}">
              <span>${value}</span>
              <small>${esc(labels[value])}</small>
            </button>`).join("")}
        </div>
      </div>`;
  }

  function wireTrainerConfidenceControls(root = document) {
    root.querySelectorAll("[data-trainer-confidence]").forEach((btn) => {
      btn.addEventListener("click", () => {
        trainerConfidence = parseInt(btn.dataset.trainerConfidence || "0", 10) || null;
        root.querySelectorAll("[data-trainer-confidence]").forEach((other) => {
          const active = other === btn;
          other.classList.toggle("active", active);
          other.setAttribute("aria-pressed", active ? "true" : "false");
        });
        const hint = root.querySelector("#tq-confidence-hint");
        if (hint) {
          hint.textContent = "נשמר. עכשיו ענה על השאלה.";
          hint.classList.remove("needs-choice");
        }
      });
    });
  }

  function requireTrainerConfidence() {
    if (trainerConfidence != null) return true;
    const hint = document.getElementById("tq-confidence-hint");
    if (hint) {
      hint.textContent = "בחר רמת ביטחון לפני התשובה כדי שנוכל לכייל אותך לפי מושג.";
      hint.classList.add("needs-choice");
    }
    return false;
  }

  function renderConfidenceCalibrationFeedback(calibration) {
    const entry = calibration?.entry || null;
    const stats = calibration?.stats || null;
    if (!entry || !stats) return "";
    const bucketLabel = {
      calibrated: "מכויל",
      overconfident: "בטוח מדי",
      underconfident: "זהיר מדי",
    }[entry.bucket] || "לא ידוע";
    return `
      <div class="tq-confidence-feedback ${esc(entry.bucket)}">
        <strong>🎚️ כיול ביטחון: ${esc(bucketLabel)}</strong>
        <span>${esc(calibration.message || "")}</span>
        <small>במושג הזה: דיוק ${stats.accuracyPct}% · ביטחון ממוצע ${stats.avgConfidencePct}% · פער ${stats.calibrationGap > 0 ? "+" : ""}${stats.calibrationGap}%.</small>
      </div>`;
  }

  function renderTrainerCard() {
    const card = document.getElementById("trainer-quiz-card");
    if (!card) return;
    updateTrainerDashboard();

    if (!trainerCurrent) {
      card.innerHTML = `
        <div class="tq-empty">
          <div class="big-icon">🤔</div>
          <h3 style="color: var(--text-bright); margin-bottom:0.5rem;">לא נמצאו מושגים זמינים לאימון</h3>
          <p>ודא שהשיעורים נטענו או החלף ל"מצב מעורב".</p>
        </div>`;
      return;
    }

    const { lesson, concept, question } = trainerCurrent;
    const sc = getScore(lesson.id, concept.conceptName);
    const lvl = LEVEL_INFO[sc.level];

    // Code Trace has its own render path — multi-step UI, separate flow.
    if (question.kind === "trace") {
      renderTraceQuestion(card, lesson, concept, question, sc, lvl);
      return;
    }

    const stageBadge = `${question.kind === "fill" ? "✍️ השלמת קוד" : "🅰️ שאלה אמריקנית"}`;
    const progressBadge = `שלבים ברמה ${sc.level}: ${sc.passedMC ? "🅰️✅" : "🅰️◯"} ${needsCodeFill(concept) ? (sc.passedFill ? "✍️✅" : "✍️◯") : ""}`.trim();
    const retestBanner = trainerCurrent.retestItem
      ? `<div class="adaptive-retest-banner">
          <strong>🔁 ${esc(trainerCurrent.retestItem.label || "שאלת תיקון")}</strong>
          <span>${esc(trainerCurrent.retestItem.purpose || "בדיקה חוזרת של שורש הטעות.")}</span>
        </div>`
      : "";

    // Render the code block — for code-fill we replace ____ with a styled placeholder
    let codeHTML = "";
    if (question.codeBlock) {
      const safe = esc(question.codeBlock);
      const replaced =
        question.kind === "fill"
          ? safe.replace(/____/g, '<span class="tq-code-blank">____</span>')
          : safe;
      codeHTML = `<div class="tq-code"><pre><code>${replaced}</code></pre></div>`;
    }

    // Body — branch by type
    const bodyHTML =
      question.kind === "fill"
        ? `
          <div class="tq-fill-hint">${esc(question.hint || "")}</div>
          <input type="text" class="tq-fill-input" id="tq-fill-input"
            placeholder="הקלד את הטוקן החסר ולחץ Enter..." autocomplete="off" spellcheck="false" dir="ltr" />
          <div class="tq-actions">
            <button class="tq-btn primary" id="tq-fill-submit">✅ בדוק תשובה</button>
            <button class="tq-btn secondary" id="tq-skip-fill">⏭️ דלג</button>
          </div>`
        : `
          <div class="tq-options">
            ${question.options
              .map(
                (opt, i) =>
                  `<button class="tq-option" data-i="${i}">${esc(opt)}</button>`,
              )
              .join("")}
          </div>`;

    card.innerHTML = `
      <div class="tq-context">
        <span><span class="tq-lesson">${esc(lesson.title)}</span> · <strong>${esc(concept.conceptName)}</strong></span>
        <span class="tq-level-pill ${lvl.cssClass}" title="הרמה הנוכחית של המושג">רמה ${sc.level}/7 · ${lvl.icon} ${esc(lvl.label)}</span>
      </div>
      <div class="tq-stage-row">
        <span class="tq-stage-badge">${stageBadge}</span>
        <span class="tq-progress-badge">${progressBadge}</span>
      </div>
      ${retestBanner}
      ${renderTrainerConfidenceControls()}
      <div class="question-learning-layout trainer">
        <div class="question-answer-area">
          <div class="tq-question">${esc(question.question).replace(/\n/g, "<br>")}</div>
          ${codeHTML}
          ${bodyHTML}
        </div>
        ${renderQuestionPrereqPanel({ question, lesson, concept, mode: "trainer" })}
      </div>
      <div id="tq-feedback-slot"></div>
      <div class="tq-actions" id="tq-actions" style="display:none">
        <button class="tq-btn primary" id="tq-next">➡️ שאלה הבאה</button>
        <button class="tq-btn secondary" id="tq-open-lesson">📖 פתח את השיעור</button>
        <button class="tq-btn secondary" id="tq-skip">⏭️ דלג בלי לענות</button>
      </div>`;
    wireQuestionPrerequisiteNavigation(card);
    wireTrainerConfidenceControls(card);

    if (question.kind === "fill" || question.type === "code-fill") {
      const input = document.getElementById("tq-fill-input");
      input?.focus();
      input?.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
          onFillAnswer(input.value);
        }
      });
      document
        .getElementById("tq-fill-submit")
        ?.addEventListener("click", () => onFillAnswer(input.value));
      document
        .getElementById("tq-skip-fill")
        ?.addEventListener("click", () => nextQuestion());
    } else {
      card.querySelectorAll(".tq-option").forEach((btn) => {
        btn.addEventListener("click", () =>
          onAnswer(parseInt(btn.dataset.i, 10)),
        );
      });
    }

    document.getElementById("tq-skip")?.addEventListener("click", () => {
      nextQuestion();
    });
  }

  // ============================================================================
  // Code Trace renderer — multi-step UI with line highlighting + hint + progress
  // ============================================================================
  function renderTraceQuestion(card, lesson, concept, question, sc, lvl) {
    // Reset trace state for a new trace question
    if (!traceState || traceState.traceId !== question.trace.id) {
      traceState = {
        traceId: question.trace.id,
        stepIdx: 0,
        attempts: 0,
        hintShown: false,
        wrongOnAnyStep: false,
      };
    }
    const t = question.trace;
    const totalSteps = t.steps.length;
    const stepIdx = traceState.stepIdx;
    const completed = stepIdx >= totalSteps;
    const step = completed ? null : t.steps[stepIdx];

    const codeLines = String(t.code || "").split("\n");
    const lineToHighlight = step && step.line ? step.line : -1;
    const codeHTML = codeLines
      .map((line, i) => {
        const num = i + 1;
        const isHighlighted = num === lineToHighlight;
        return `<div class="trace-line${isHighlighted ? " trace-line-active" : ""}" data-line="${num}">
          <span class="trace-line-num">${num}</span>
          <span class="trace-line-code">${esc(line) || "&nbsp;"}</span>
        </div>`;
      })
      .join("");

    const progressPct = Math.round((stepIdx / totalSteps) * 100);
    const progressHTML = `
      <div class="trace-progress-row">
        <span class="trace-progress-label">שלב ${Math.min(stepIdx + 1, totalSteps)} מתוך ${totalSteps}</span>
        <div class="trace-progress-track"><div class="trace-progress-fill" style="width:${progressPct}%"></div></div>
      </div>`;

    const titleHTML = t.title
      ? `<div class="trace-title">🔍 ${esc(t.title)}</div>`
      : "";
    const supportQuestion = {
      ...t,
      question: t.title || "Code Trace",
      code: t.code || "",
      conceptKey: t.conceptKey || conceptKey(lesson.id, concept.conceptName),
      options: (t.steps || []).map((s) => `${s.prompt || ""} ${s.hint || ""}`),
      explanation: t.explanation || "",
    };

    let bodyHTML = "";
    if (!completed) {
      bodyHTML = `
        <div class="trace-step">
          <div class="trace-prompt">${esc(step.prompt).replace(/\n/g, "<br>")}</div>
          <input type="text" class="trace-input" id="trace-input"
            placeholder="הקלד את התשובה ולחץ Enter..." autocomplete="off" spellcheck="false" dir="ltr" />
          <div class="trace-actions">
            <button class="tq-btn primary" id="trace-submit">✅ בדוק</button>
            <button class="tq-btn secondary" id="trace-hint">💡 רמז</button>
            <button class="tq-btn secondary" id="trace-skip">⏭️ דלג בשלב</button>
          </div>
          <div class="trace-hint" id="trace-hint-slot" style="display:none"></div>
          <div class="trace-feedback" id="trace-feedback-slot"></div>
        </div>`;
    } else {
      // All steps completed — show explanation + score this trace as MC pass
      bodyHTML = `
        <div class="trace-complete">
          <div class="trace-complete-headline">🎉 השלמת את כל השלבים!</div>
          <div class="trace-explanation"><strong>סיכום:</strong> ${esc(t.explanation || "")}</div>
        </div>`;
    }

    card.innerHTML = `
      <div class="tq-context">
        <span><span class="tq-lesson">${esc(lesson.title)}</span> · <strong>${esc(concept.conceptName)}</strong></span>
        <span class="tq-level-pill ${lvl.cssClass}" title="הרמה הנוכחית של המושג">רמה ${sc.level}/7 · ${lvl.icon} ${esc(lvl.label)}</span>
      </div>
      <div class="tq-stage-row">
        <span class="tq-stage-badge">🔍 מעקב קוד (Code Trace)</span>
        <span class="tq-progress-badge">${sc.passedMC ? "🅰️✅" : "🅰️◯"} ${needsCodeFill(concept) ? (sc.passedFill ? "✍️✅" : "✍️◯") : ""}</span>
      </div>
      ${trainerCurrent?.retestItem ? `<div class="adaptive-retest-banner">
        <strong>🔁 ${esc(trainerCurrent.retestItem.label || "שאלת תיקון")}</strong>
        <span>${esc(trainerCurrent.retestItem.purpose || "בדיקה חוזרת של שורש הטעות.")}</span>
      </div>` : ""}
      ${renderTrainerConfidenceControls()}
      <div class="question-learning-layout trainer trace">
        <div class="question-answer-area">
          ${titleHTML}
          ${progressHTML}
          <div class="trace-code-block"><pre>${codeHTML}</pre></div>
          ${bodyHTML}
        </div>
        ${renderQuestionPrereqPanel({ question: supportQuestion, lesson, concept, mode: "trainer" })}
      </div>
      <div id="tq-feedback-slot"></div>
      <div class="tq-actions" id="tq-actions" style="display:none">
        <button class="tq-btn primary" id="tq-next">➡️ שאלה הבאה</button>
        <button class="tq-btn secondary" id="tq-open-lesson">📖 פתח את השיעור</button>
        <button class="tq-btn secondary" id="tq-skip">⏭️ דלג</button>
      </div>`;
    wireQuestionPrerequisiteNavigation(card);
    wireTrainerConfidenceControls(card);

    if (!completed) {
      const input = document.getElementById("trace-input");
      input?.focus();
      input?.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
          onTraceSubmit(input.value);
        }
      });
      document.getElementById("trace-submit")?.addEventListener("click", () => {
        onTraceSubmit(document.getElementById("trace-input").value);
      });
      document.getElementById("trace-hint")?.addEventListener("click", () => {
        traceState.hintShown = true;
        const slot = document.getElementById("trace-hint-slot");
        if (slot) {
          slot.style.display = "block";
          slot.innerHTML = `<strong>💡 רמז:</strong> ${esc(step.hint || "אין רמז זמין.")}`;
        }
      });
      document.getElementById("trace-skip")?.addEventListener("click", () => {
        // Reveal answer for this step and advance without credit
        traceState.wrongOnAnyStep = true;
        traceState.stepIdx++;
        traceState.hintShown = false;
        traceState.attempts = 0;
        renderTraceQuestion(card, lesson, concept, question, sc, lvl);
      });
    } else {
      // Auto-trigger MC stage scoring + show next-question controls
      finalizeTraceQuestion(concept);
    }

    document.getElementById("tq-skip")?.addEventListener("click", () => {
      traceState = null;
      nextQuestion();
    });
  }

  function onTraceSubmit(rawInput) {
    if (!trainerCurrent || trainerCurrent.question.kind !== "trace") return;
    const t = trainerCurrent.question.trace;
    const step = t.steps[traceState.stepIdx];
    if (!step) return;
    const fbSlot = document.getElementById("trace-feedback-slot");
    traceState.attempts++;
    if (isTraceAnswerCorrect(rawInput, step)) {
      if (fbSlot) {
        fbSlot.innerHTML = `<div class="trace-fb-correct">✅ נכון! התשובה: <code>${esc(step.answer)}</code></div>`;
      }
      // Advance after a short delay so user reads the feedback
      setTimeout(() => {
        traceState.stepIdx++;
        traceState.hintShown = false;
        traceState.attempts = 0;
        const card = document.getElementById("trainer-quiz-card");
        if (card) renderTraceQuestion(card, trainerCurrent.lesson, trainerCurrent.concept, trainerCurrent.question, getScore(trainerCurrent.lesson.id, trainerCurrent.concept.conceptName), LEVEL_INFO[getScore(trainerCurrent.lesson.id, trainerCurrent.concept.conceptName).level]);
      }, 700);
    } else {
      traceState.wrongOnAnyStep = true;
      if (fbSlot) {
        const showAnswer = traceState.attempts >= 2;
        fbSlot.innerHTML = `<div class="trace-fb-wrong">❌ לא מדויק. ${showAnswer ? `התשובה: <code>${esc(step.answer)}</code> — נסה שלב הבא.` : "נסה שוב או לחץ '💡 רמז'."}</div>`;
        if (showAnswer) {
          // After 2 wrong attempts, auto-advance with no credit
          setTimeout(() => {
            traceState.stepIdx++;
            traceState.hintShown = false;
            traceState.attempts = 0;
            const card = document.getElementById("trainer-quiz-card");
            if (card) renderTraceQuestion(card, trainerCurrent.lesson, trainerCurrent.concept, trainerCurrent.question, getScore(trainerCurrent.lesson.id, trainerCurrent.concept.conceptName), LEVEL_INFO[getScore(trainerCurrent.lesson.id, trainerCurrent.concept.conceptName).level]);
          }, 1400);
        }
      }
    }
  }

  function finalizeTraceQuestion(concept) {
    if (trainerLastAnswered) return;
    trainerLastAnswered = true;
    const correct = !traceState.wrongOnAnyStep;
    const levelBefore = getScore(trainerCurrent.lesson.id, concept.conceptName).level;
    // Treat trace as MC stage — pass-through to existing scoring
    const result = applyAnswer(trainerCurrent.lesson.id, concept.conceptName, concept, "mc", correct, {
      question: trainerCurrent.question?.trace || trainerCurrent.question || {},
      actualKind: "trace",
      mode: "trace",
      retestItem: trainerCurrent.retestItem || null,
      confidence: trainerConfidence,
    });
    if (correct) trainerStats.correct++; else trainerStats.wrong++;
    trainerStats.asked++;
    const fbSlot = document.getElementById("tq-feedback-slot");
    if (fbSlot) {
      const verdict = correct ? "✅ עברת את ה-Code Trace בלי טעויות!" : "📝 השלמת את ה-Trace, אך עם טעויות בדרך.";
      fbSlot.innerHTML = `<div class="tq-feedback ${correct ? "ok" : "warn"}">
        <strong>${verdict}</strong>
        ${result.advanced ? `<div>⬆️ קודמת לרמה ${result.newLevel}!</div>` : ""}
        ${!correct ? renderMistakeAgentFeedback(result.mistake) : ""}
      </div>`;
    }
    const actions = document.getElementById("tq-actions");
    if (actions) actions.style.display = "flex";
    document.getElementById("tq-next")?.addEventListener("click", () => {
      traceState = null;
      nextQuestion();
    });
    document.getElementById("tq-open-lesson")?.addEventListener("click", () => {
      openLesson(trainerCurrent.lesson.id);
    });
    updateTrainerHeader();
  }

  // Build a unified post-answer feedback message based on the level/advance result
  function buildAnswerFeedback(correct, kind, levelBefore, result, concept, question, selectedIdx) {
    const sc = getScore(trainerCurrent.lesson.id, concept.conceptName);
    const verdict = correct ? "✅ נכון!" : "❌ לא מדויק";
    const slotLabel = kind === "mc" ? "🅰️ שאלה אמריקנית" : "✍️ השלמת קוד";

    // P1.5.2 — Per-Distractor Feedback: prefer specific feedback over generic explanation
    let distractorFeedback = "";
    if (kind === "mc" && !correct && typeof selectedIdx === "number") {
      const fbMap = typeof OPTION_FEEDBACK !== "undefined" ? OPTION_FEEDBACK : (window.OPTION_FEEDBACK || {});
      const fbArr = (question.optionFeedback) || (question.id && fbMap[question.id]);
      if (Array.isArray(fbArr) && fbArr[selectedIdx]) {
        distractorFeedback = fbArr[selectedIdx];
      }
    }

    let progressLine = "";
    if (correct) {
      if (result.advanced) {
        const newLvl = LEVEL_INFO[result.newLevel];
        const isMaster = result.newLevel === 7;
        progressLine = isMaster
          ? `🏆🎉 <strong>הגעת לרמה 7 — מאסטר!</strong> שלטת בכל 6 הרמות של <strong>${esc(concept.conceptName)}</strong>.`
          : `⬆️ <strong>קודמת מרמה ${levelBefore} לרמה ${result.newLevel} — ${newLvl.icon} ${newLvl.label}!</strong> השלמת את שני השלבים.`;
      } else {
        const sb = sc.passedMC ? "🅰️✅" : "🅰️◯";
        const fb = needsCodeFill(concept) ? (sc.passedFill ? " ✍️✅" : " ✍️◯") : "";
        progressLine = `נקודה נצברה ב-${slotLabel}. השלבים ברמה ${sc.level}: ${sb}${fb}. עוד שלב אחד וקודמת רמה!`;
      }
    } else {
      progressLine = `הרמה לא יורדת. נסה שוב — נדרשות תשובה אמריקנית נכונה ${needsCodeFill(concept) ? "וגם השלמת קוד נכונה" : ""} כדי לעלות מרמה ${sc.level}.`;
    }

    const wrongAns =
      !correct && kind === "fill"
        ? ` — התשובה הנכונה: <code>${esc(question.answer || "")}</code>`
        : "";

    // If we have specific distractor feedback, show it FIRST (more actionable than generic explanation)
    const explanationBlock = distractorFeedback
      ? `<div class="tq-distractor-feedback">${esc(distractorFeedback)}</div>
         <div class="tq-explanation-secondary">📚 הסבר כללי: ${esc(question.explanation || "")}</div>`
      : `<div>${esc(question.explanation || "")}</div>`;
    const mistakeAgentBlock = !correct ? renderMistakeAgentFeedback(result.mistake) : "";
    const confidenceBlock = renderConfidenceCalibrationFeedback(result.confidenceCalibration);

    return `
      <div class="tq-feedback ${correct ? "correct" : "wrong"}">
        <div class="verdict">${verdict}${wrongAns}<span class="delta">${correct ? "+1" : "0"}</span></div>
        ${explanationBlock}
        <div style="margin-top:0.5rem; font-size:0.92rem; color: var(--text-main);">
          ${progressLine}
        </div>
        ${confidenceBlock}
        ${mistakeAgentBlock}
      </div>`;
  }

  function attachPostAnswerActions(lesson, concept) {
    document.getElementById("tq-actions").style.display = "flex";
    document.getElementById("tq-next")?.addEventListener("click", nextQuestion);
    document.getElementById("tq-open-lesson")?.addEventListener("click", () => {
      openLesson(lesson.id);
      setTimeout(() => {
        const cards = document.querySelectorAll(".concept-card h4");
        for (const h of cards) {
          if (h.textContent.trim() === concept.conceptName) {
            h.closest(".concept-card").scrollIntoView({ behavior: "smooth", block: "center" });
            break;
          }
        }
      }, 250);
    });
  }

  function onFillAnswer(rawInput) {
    if (!trainerCurrent || trainerLastAnswered) return;
    const userAns = (rawInput || "").trim();
    if (!userAns) return;
    if (!requireTrainerConfidence()) return;
    trainerLastAnswered = true;

    const { lesson, concept, question } = trainerCurrent;
    const correct =
      userAns.toLowerCase() === (question.answer || "").toLowerCase();

    const levelBefore = getScore(lesson.id, concept.conceptName).level;
    const result = applyAnswer(lesson.id, concept.conceptName, concept, "fill", correct, {
      question,
      answer: userAns,
      mode: "trainer",
      retestItem: trainerCurrent.retestItem || null,
      confidence: trainerConfidence,
    });
    trainerStats.asked++;
    if (correct) trainerStats.correct++; else trainerStats.wrong++;

    const input = document.getElementById("tq-fill-input");
    if (input) {
      input.classList.add(correct ? "correct" : "wrong");
      input.disabled = true;
    }
    document.querySelectorAll("#tq-fill-submit, #tq-skip-fill").forEach((b) => {
      b.style.display = "none";
    });

    document.getElementById("tq-feedback-slot").innerHTML = buildAnswerFeedback(
      correct, "fill", levelBefore, result, concept, question,
    );
    attachPostAnswerActions(lesson, concept);

    updateTrainerDashboard();
    if (document.getElementById("trainer-report").style.display !== "none") {
      renderTrainerReport();
    }
  }

  function onAnswer(selectedIdx) {
    if (!trainerCurrent || trainerLastAnswered) return;
    if (!requireTrainerConfidence()) return;
    trainerLastAnswered = true;

    const { lesson, concept, question } = trainerCurrent;
    const correct = selectedIdx === question.correctIndex;

    const levelBefore = getScore(lesson.id, concept.conceptName).level;
    const result = applyAnswer(lesson.id, concept.conceptName, concept, "mc", correct, {
      question,
      selectedIdx,
      mode: "trainer",
      retestItem: trainerCurrent.retestItem || null,
      confidence: trainerConfidence,
    });
    trainerStats.asked++;
    if (correct) trainerStats.correct++; else trainerStats.wrong++;

    const card = document.getElementById("trainer-quiz-card");
    card.querySelectorAll(".tq-option").forEach((btn) => {
      btn.classList.add("disabled");
      const i = parseInt(btn.dataset.i, 10);
      if (i === question.correctIndex) btn.classList.add("correct");
      else if (i === selectedIdx) btn.classList.add("wrong");
    });

    document.getElementById("tq-feedback-slot").innerHTML = buildAnswerFeedback(
      correct, "mc", levelBefore, result, concept, question, selectedIdx,
    );
    attachPostAnswerActions(lesson, concept);

    updateTrainerDashboard();
    if (document.getElementById("trainer-report").style.display !== "none") {
      renderTrainerReport();
    }
  }

  // Bank coverage summary — counts how many concepts have 0 hand-crafted MC/Fill questions
  function renderBankCoverage() {
    const all = allConcepts();
    if (all.length === 0) return "";

    let zeroMC = 0, zeroFill = 0, zeroBoth = 0;
    let totalNeedingFill = 0;
    const missingByLesson = {};

    all.forEach(({ lesson, concept }) => {
      const counts = bankCountsFor(lesson.id, concept.conceptName);
      const needFill = !!concept.codeExample;
      if (needFill) totalNeedingFill++;
      const isMissing =
        counts.mc < 3 || (needFill && counts.fill < 2);
      if (counts.mc === 0) zeroMC++;
      if (needFill && counts.fill === 0) zeroFill++;
      if (counts.mc === 0 && needFill && counts.fill === 0) zeroBoth++;
      if (isMissing) {
        missingByLesson[lesson.title] = missingByLesson[lesson.title] || [];
        missingByLesson[lesson.title].push({
          name: concept.conceptName,
          mc: counts.mc,
          fill: counts.fill,
          needFill,
        });
      }
    });

    const allMC = (window.QUESTIONS_BANK && window.QUESTIONS_BANK.mc) || [];
    const allFill = (window.QUESTIONS_BANK && window.QUESTIONS_BANK.fill) || [];
    const curatedMC = allMC.filter((q) => !q._seeded).length;
    const seededMC_total = allMC.length - curatedMC;
    const curatedFill = allFill.filter((q) => !q._seeded).length;
    const seededFill_total = allFill.length - curatedFill;
    const totalQuestions = allMC.length + allFill.length;

    const targetMC = all.length * 3;
    const targetFill = totalNeedingFill * 2;
    const haveMC = allMC.length;
    const haveFill = allFill.length;
    const mcPct = Math.round((haveMC / targetMC) * 100) || 0;
    const fillPct = Math.round((haveFill / targetFill) * 100) || 0;

    const missingHTML = Object.keys(missingByLesson)
      .map((lessonTitle) => {
        const items = missingByLesson[lessonTitle];
        return `
          <div class="bc-lesson">
            <div class="bc-lesson-head">${esc(lessonTitle)} <span class="bc-count">${items.length} מושגים חסרים</span></div>
            <div class="bc-items">
              ${items
                .map(
                  (it) => `
                <div class="bc-item">
                  <span class="bc-name">${esc(it.name)}</span>
                  <span class="bc-counter ${it.mc === 0 ? "zero" : it.mc < 3 ? "partial" : "ok"}">🅰️ ${it.mc}/3</span>
                  ${
                    it.needFill
                      ? `<span class="bc-counter ${it.fill === 0 ? "zero" : it.fill < 2 ? "partial" : "ok"}">✍️ ${it.fill}/2</span>`
                      : `<span class="bc-counter na">— ללא קוד</span>`
                  }
                </div>`,
                )
                .join("")}
            </div>
          </div>`;
      })
      .join("");

    return `
      <div class="bank-coverage glass-panel">
        <h3>📊 כיסוי מאגר השאלות</h3>
        <div class="bc-summary">
          <div class="bc-stat"><span class="n">${totalQuestions}</span><span>סה"כ שאלות במאגר</span></div>
          <div class="bc-stat"><span class="n">${haveMC}/${targetMC}</span><span>🅰️ MC (${mcPct}%)</span></div>
          <div class="bc-stat"><span class="n">${haveFill}/${targetFill}</span><span>✍️ Fill (${fillPct}%)</span></div>
          <div class="bc-stat"><span class="n">${curatedMC + curatedFill}</span><span>✋ ידני curated</span></div>
          <div class="bc-stat"><span class="n">${seededMC_total + seededFill_total}</span><span>🤖 seed אוטומטי</span></div>
          <div class="bc-stat"><span class="n">${zeroBoth}</span><span>בלי שום שאלה</span></div>
        </div>
        <div class="bc-mc-bar">
          <div class="bc-bar"><div class="bc-bar-fill mc" style="width:${mcPct}%"></div></div>
          <div class="bc-bar"><div class="bc-bar-fill fill" style="width:${fillPct}%"></div></div>
        </div>
        <details class="bc-details">
          <summary>📂 הצג רשימה מלאה של מושגים שעדיין דורשים שאלות (${Object.values(missingByLesson).reduce((s, a) => s + a.length, 0)})</summary>
          <div class="bc-list">${missingHTML}</div>
        </details>
      </div>`;
  }

  function renderTrainerReport() {
    const body = document.getElementById("trainer-report-body");
    if (!body || !window.LESSONS_DATA) return;

    const coverageHTML = renderBankCoverage();

    const html = window.LESSONS_DATA
      .map((lesson) => {
        const concepts = lesson.concepts || [];
        if (concepts.length === 0) return "";

        const enriched = concepts.map((c) => {
          const sc = getScore(lesson.id, c.conceptName);
          return { c, sc };
        });

        // Sort: lowest level first (weakest concepts surface at top)
        enriched.sort((a, b) => a.sc.level - b.sc.level);

        const lessonAttempts = enriched.reduce((s, e) => s + e.sc.attempts, 0);
        const lessonMastered = enriched.filter((e) => e.sc.level >= 7).length;
        const lessonAvgLevel =
          enriched.reduce((s, e) => s + e.sc.level, 0) / enriched.length;
        const lessonPct = Math.round(((lessonAvgLevel - 1) / 6) * 100);

        const rows = enriched
          .map(({ c, sc }) => {
            const lvl = LEVEL_INFO[sc.level];
            const masteredCls = sc.level >= 7 ? "mastered" : "";
            const cls =
              sc.level >= 6 ? "pos" : sc.level >= 3 ? "zero" : "neg";
            const levelPct = Math.round(((sc.level - 1) / 6) * 100);
            const stagesNote = sc.level < 7
              ? `<span class="tr-stages">${sc.passedMC ? "🅰️✅" : "🅰️◯"}${needsCodeFill(c) ? (sc.passedFill ? " ✍️✅" : " ✍️◯") : ""}</span>`
              : "";
            return `
              <div class="tr-concept ${cls} ${masteredCls}" title="רמה ${sc.level}/7 · ${esc(lvl.label)}">
                <span class="tr-name">${esc(c.conceptName)}${sc.level >= 7 ? " 🏆" : ""}</span>
                <span class="tr-attempts">${sc.correct}/${sc.attempts}</span>
                ${stagesNote}
                <div class="tr-bar"><div style="width:${levelPct}%"></div></div>
                <span class="tr-score tr-level-pill ${lvl.cssClass}">${lvl.icon} ${sc.level}/7</span>
              </div>`;
          })
          .join("");

        return `
          <div class="tr-lesson">
            <div class="tr-lesson-head">
              <span>${esc(lesson.title)}</span>
              <span class="tr-pct">${lessonMastered}/${concepts.length} מאסטר 🏆 · רמה ממוצעת ${lessonAvgLevel.toFixed(2)}/7 (${lessonPct}%) · ${lessonAttempts} ניסיונות</span>
            </div>
            <div class="tr-concepts">${rows}</div>
          </div>`;
      })
      .join("");

    body.innerHTML = coverageHTML + html;
    setTrainerContextTree();
  }

  function openTrainer() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🧠 מאמן הידע";
    currentLessonDesc.textContent =
      "המערכת מציגה שאלות אדפטיביות. כל תשובה מעדכנת את הציון של המושג ואת רמת השליטה הכללית.";
    trainerView.style.display = "block";
    openTrainerBtn?.classList.add("active");
    trainerStats = { asked: 0, correct: 0, wrong: 0 };
    // Lazy-load the seeded bank (1.4MB) on first Trainer open.
    if (typeof window.ensureSeededBank === "function") {
      window.ensureSeededBank().then(() => {
        nextQuestion();
        renderTrainerReport();
      });
    } else {
      nextQuestion();
      renderTrainerReport();
    }
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function renderProgrammingBasics() {
    const container = document.getElementById("programming-basics-content");
    if (!container) return;

    const tabsHTML = `
      <div class="pb-subtabs" role="tablist" aria-label="תתי טאבים באבני בסיס">
        ${PROGRAMMING_BASICS_TABS.map((tab) => `
          <button class="pb-subtab ${programmingBasicsTab === tab.id ? "active" : ""}"
                  type="button"
                  role="tab"
                  aria-selected="${programmingBasicsTab === tab.id ? "true" : "false"}"
                  data-pb-tab="${esc(tab.id)}">
            <span>${esc(tab.icon)}</span>${esc(tab.label)}
          </button>
        `).join("")}
      </div>`;

    const metricNote = `
      <div class="pb-metric-note">
        <strong>איך לקרוא “יעילות מדויקת”:</strong>
        המסך מדרג לפי Big-O, זיכרון, עלות bundle/שכבות, ותחזוקה. מספרי ms/kB משתנים לפי מכשיר ו-build, לכן לא מוצגים כמספרים מומצאים.
      </div>`;

    function renderEfficiency(item) {
      return `
        <div class="pb-efficiency">
          <div><strong>יעילות:</strong> ${esc(item.efficiency || "")}</div>
          <div><strong>המלצה:</strong> ${esc(item.recommend || item.alternative || item.rank || "")}</div>
        </div>`;
    }

    function renderElectricity() {
      const flowHTML = PROGRAMMING_ELECTRICITY_STEPS.map((step, idx) => `
        <button class="pb-electric-node"
                type="button"
                data-electric-target="${esc(step.id)}"
                aria-label="${esc(`${idx + 1}. ${step.title}`)}">
          <span class="pb-electric-index">${idx + 1}</span>
          <strong>${esc(step.label)}</strong>
          <small>${esc(step.layer)}</small>
        </button>
      `).join(`<span class="pb-electric-arrow">←</span>`);

      return `
        <section class="pb-section" id="pb-electricity-flow">
          <div class="pb-section-head">
            <span class="pb-kicker">01</span>
            <h2>איך בנו ערך מחשמל?</h2>
            <p>ערך בתוכנה לא מתחיל בתוכנה. הוא מתחיל במצב פיזי יציב שאפשר לפרש כ־0 או 1.</p>
          </div>
          <div class="pb-electric-note">
            <strong>הפשטה חשובה:</strong>
            בפועל מעבדים מודרניים מורכבים מאוד, אבל רעיון הליבה נשאר אותו דבר: חשמל יוצר ביטים, ביטים נשמרים בזיכרון, וקידוד נותן להם משמעות.
          </div>
          <div class="pb-electric-flow" role="img" aria-label="תרשים מחשמל לערך בתוכנה">
            ${flowHTML}
          </div>
        </section>

	        <section class="pb-section" id="pb-value-examples">
	          <div class="pb-section-head">
	            <span class="pb-kicker">02</span>
	            <h2>אותם ביטים, משמעויות שונות</h2>
	            <p>הביטים הם חומר הגלם. הטיפוס והקידוד אומרים למחשב איך לפרש אותם.</p>
          </div>
          <div class="pb-value-grid">
            ${PROGRAMMING_VALUE_EXAMPLES.map((item) => `
              <article class="pb-value-card">
                <div class="pb-value">${esc(item.value)}</div>
                <pre class="pb-code"><code>${esc(item.bits)}</code></pre>
                <dl class="pb-mini-dl">
                  <div><dt>פירוש</dt><dd>${esc(item.meaning)}</dd></div>
                  <div><dt>לזכור</dt><dd>${esc(item.note)}</dd></div>
                </dl>
              </article>
            `).join("")}
	          </div>
	        </section>

	        <section class="pb-section" id="pb-what-is-value">
	          <div class="pb-section-head">
	            <span class="pb-kicker">03</span>
	            <h2>מהו ערך, ואיך נבנה ערך?</h2>
	            <p>ערך הוא לא “מילה בקוד”. ערך הוא פירוש מוסכם של ביטים: הביטים נשמרים בזיכרון, הטיפוס אומר איך לקרוא אותם, וההקשר אומר מה עושים איתם.</p>
	          </div>
	          <div class="pb-understand-grid">
	            <article class="pb-understand-card">
	              <h3>1. מצב פיזי</h3>
	              <p>יש מתח חשמלי נמוך או גבוה. החומרה מפרשת את זה כ-0 או 1.</p>
	            </article>
	            <article class="pb-understand-card">
	              <h3>2. ביטים בזיכרון</h3>
	              <p>הרבה 0/1 נשמרים בתאים. 8 ביטים הם byte; הרבה bytes יכולים לייצג כמעט כל דבר.</p>
	            </article>
	            <article class="pb-understand-card">
	              <h3>3. קידוד וטיפוס</h3>
	              <p>01000001 יכול להיות המספר 65, התו A, חלק מכתובת או חלק מפקודה. הטיפוס והקידוד קובעים.</p>
	            </article>
	            <article class="pb-understand-card">
	              <h3>4. ערך בקוד</h3>
	              <p>כשהשפה נותנת לביטים משמעות שאפשר לעבוד איתה, נולד value: מספר, string, boolean, object או function.</p>
	            </article>
	          </div>
	          <div class="pb-understand-rule">
	            <strong>משפט מפתח:</strong>
	            המחשב לא “מבין” משמעות כמו אדם. הוא מבצע הוראות מדויקות על ייצוגים. המשמעות נוצרת מהכללים שאנחנו והשפה נותנים לביטים.
	          </div>
	        </section>

	        <section class="pb-section">
	          <div class="pb-section-head">
	            <span class="pb-kicker">04</span>
	            <h2>הסולם המלא: מחשמל לאבני בסיס</h2>
	          </div>
	          <div class="pb-electric-detail-list">
            ${PROGRAMMING_ELECTRICITY_STEPS.map((item) => `
              <article class="pb-electric-detail" id="pb-electric-${esc(item.id)}">
                <div class="pb-electric-label">${esc(item.label)}</div>
                <div>
                  <div class="pb-card-topline"><span>${esc(item.layer)}</span></div>
                  <h3>${esc(item.title)}</h3>
                  <p>${esc(item.summary)}</p>
                  <dl class="pb-mini-dl">
                    <div><dt>נבנה מ</dt><dd>${esc(item.builds)}</dd></div>
                    <div><dt>קשר לקוד</dt><dd>${esc(item.codeLink)}</dd></div>
                  </dl>
                </div>
              </article>
            `).join("")}
          </div>
	        </section>

	        <section class="pb-section" id="pb-primitive-dictionary">
	          <div class="pb-section-head">
	            <span class="pb-kicker">05</span>
	            <h2>מילון אבני בסיס: bit, byte, key, value, variable, array, function</h2>
	            <p>אלו המילים שחייבים לדעת לפני שממשיכים לשאלות קשות. כל אחת היא שכבת הפשטה מעל ביטים.</p>
	          </div>
	          <div class="pb-term-grid">
	            ${PROGRAMMING_PRIMITIVE_DEEP_DIVE.map((item) => `
	              <article class="pb-term-card" id="pb-term-${esc(item.id)}">
	                <h3>${esc(item.term)}</h3>
	                <p>${esc(item.plain)}</p>
	                <dl class="pb-mini-dl">
	                  <div><dt>נבנה מ</dt><dd>${esc(item.builtFrom)}</dd></div>
	                  <div><dt>איך המחשב רואה את זה</dt><dd>${esc(item.computer)}</dd></div>
	                  <div><dt>איפה זה בקוד</dt><dd>${esc(item.code)}</dd></div>
	                </dl>
	              </article>
	            `).join("")}
	          </div>
	        </section>

	        <section class="pb-section" id="pb-computer-understands">
	          <div class="pb-section-head">
	            <span class="pb-kicker">06</span>
	            <h2>איך מדברים עם המחשב?</h2>
	            <p>אנחנו לא באמת מדברים עם המעבד בעברית או באנגלית. אנחנו כותבים קוד בשפה פורמלית, וכל שכבה מתרגמת אותו לשפה נמוכה יותר.</p>
	          </div>
	          <div class="pb-computer-flow">
	            ${PROGRAMMING_COMPUTER_UNDERSTANDS_FLOW.map((step, idx) => `
	              <article class="pb-computer-step">
	                <span>${idx + 1}</span>
	                <h3>${esc(step.title)}</h3>
	                <p>${esc(step.text)}</p>
	                <code>${esc(step.example)}</code>
	              </article>
	            `).join("")}
	          </div>
	        </section>

	        <section class="pb-section" id="pb-language-layers">
	          <div class="pb-section-head">
	            <span class="pb-kicker">07</span>
	            <h2>איך המחשב מצליח להבין “כל דבר”?</h2>
	            <p>הוא לא מבין כל דבר בעצמו. כלים שונים מתרגמים סוגי קוד שונים לאותה משפחה של פעולות נמוכות: להזיז ביטים, להשוות, לקפוץ, לקרוא זיכרון, לכתוב פלט.</p>
	          </div>
	          <div class="pb-language-layer-grid">
	            ${PROGRAMMING_LANGUAGE_LAYER_EXAMPLES.map((item) => `
	              <article class="pb-language-layer-card">
	                <h3>${esc(item.title)}</h3>
	                <pre class="pb-code"><code>${esc(item.chain)}</code></pre>
	                <p>${esc(item.point)}</p>
	              </article>
	            `).join("")}
	          </div>
	          <div class="pb-understand-rule">
	            <strong>השורה התחתונה:</strong>
	            כל עולם התוכנה הוא שרשרת תרגום. ככל שעולים למעלה, הקוד נוח יותר לאדם. ככל שיורדים למטה, הוא קרוב יותר למה שהחומרה מבצעת.
	          </div>
	        </section>`;
	    }

    function renderEfficiencyFoundations() {
      return `
        <section class="pb-section" id="pb-eff-overview">
          <div class="pb-section-head">
            <span class="pb-kicker">01</span>
            <h2>יעילות - מה חייבים להבין לפני הפרקים הבאים</h2>
            <p>יעילות אינה רק “הקוד רץ מהר”. היא שילוב של זמן ריצה, זיכרון, רשת, render, bundle ותחזוקה. תלמיד שמבין את השכבות האלו מבין מהר יותר React, Node, APIs ו-TypeScript.</p>
          </div>
          <div class="pb-eff-axis-grid">
            ${PROGRAMMING_EFFICIENCY_AXES.map((axis) => `
              <article class="pb-eff-axis">
                <h3>${esc(axis.title)}</h3>
                <p>${esc(axis.plain)}</p>
                <strong>${esc(axis.question)}</strong>
              </article>
            `).join("")}
          </div>
          <div class="pb-eff-principle">
            <strong>כלל יסוד:</strong>
            קודם מבינים מה גדל: מספר פריטים, עומק עץ UI, גודל payload, מספר בקשות, או כמות state. רק אחר כך מחליטים מה לשפר.
          </div>
        </section>

        <section class="pb-section" id="pb-eff-big-o">
          <div class="pb-section-head">
            <span class="pb-kicker">02</span>
            <h2>סולם Big-O בפשטות</h2>
            <p>Big-O לא מודד מילישניות. הוא עונה על שאלה אחת: איך מספר הפעולות גדל כשהקלט גדל.</p>
          </div>
          <div class="pb-eff-scale">
            ${PROGRAMMING_BIG_O_SCALE.map((item) => `
              <article class="pb-eff-scale-card">
                <span>${esc(item.notation)}</span>
                <h3>${esc(item.name)}</h3>
                <p>${esc(item.simple)}</p>
                <dl class="pb-mini-dl">
                  <div><dt>דוגמה</dt><dd>${esc(item.example)}</dd></div>
                  <div><dt>זהירות</dt><dd>${esc(item.warning)}</dd></div>
                </dl>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="pb-section">
          <div class="pb-section-head">
            <span class="pb-kicker">03</span>
            <h2>מושגי חובה</h2>
            <p>אלו המושגים שצריך לשלוט בהם לפני שממשיכים ל-async, React, Node, DB ו-TypeScript.</p>
          </div>
          <div class="pb-eff-concepts">
            ${PROGRAMMING_EFFICIENCY_CORE_CONCEPTS.map((item) => `
              <article class="pb-eff-concept" id="pb-eff-${esc(item.id)}">
                <h3>${esc(item.name)}</h3>
                <p>${esc(item.simple)}</p>
                <dl class="pb-mini-dl">
                  <div><dt>למה זה חשוב</dt><dd>${esc(item.why)}</dd></div>
                  <div><dt>חייבים לדעת</dt><dd>${esc(item.mustKnow)}</dd></div>
                  <div><dt>איפה זה חוזר</dt><dd>${esc(item.next)}</dd></div>
                </dl>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="pb-section" id="pb-eff-next">
          <div class="pb-section-head">
            <span class="pb-kicker">04</span>
            <h2>מפת מוכנות לפרקים הבאים</h2>
            <p>לפני כל פרק מתקדם, בדוק אם המושגים האלו כבר ברורים. אם לא, השאלה בפרק הבא תרגיש קשה מדי.</p>
          </div>
          <div class="pb-eff-next-grid">
            ${PROGRAMMING_NEXT_CHAPTER_PREREQS.map((item) => `
              <article class="pb-eff-next-card">
                <h3>${esc(item.chapter)}</h3>
                <dl class="pb-mini-dl">
                  <div><dt>חייב לדעת</dt><dd>${esc(item.must)}</dd></div>
                  <div><dt>אם חסר</dt><dd>${esc(item.ifMissing)}</dd></div>
                  <div><dt>בדיקת מוכנות</dt><dd>${esc(item.readiness)}</dd></div>
                </dl>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="pb-section" id="pb-eff-rules">
          <div class="pb-section-head">
            <span class="pb-kicker">05</span>
            <h2>כללי החלטה לקוד יעיל</h2>
            <p>אלו כללי עבודה שמונעים אופטימיזציות מיותרות ומכוונים לצוואר הבקבוק האמיתי.</p>
          </div>
          <ol class="pb-eff-rule-list">
            ${PROGRAMMING_EFFICIENCY_DECISION_RULES.map((rule) => `<li>${esc(rule)}</li>`).join("")}
          </ol>
        </section>`;
    }

    function renderFoundations() {
      const blocksHTML = PROGRAMMING_BASICS_BLOCKS.map((block) => `
        <article class="pb-block" id="pb-block-${esc(block.id)}">
          <div class="pb-block-icon">${esc(block.icon)}</div>
          <div>
            <h3>${esc(block.name)}</h3>
            <p>${esc(block.short)}</p>
            <dl class="pb-mini-dl">
              <div><dt>ממה זה בנוי</dt><dd>${esc(block.builtFrom)}</dd></div>
              <div><dt>לא להתבלבל</dt><dd>${esc(block.confusion)}</dd></div>
            </dl>
            <pre class="pb-code"><code>${esc(block.example)}</code></pre>
          </div>
        </article>
      `).join("");

      const diagramHTML = PROGRAMMING_ZERO_STEPS.map((step, idx) => `
        <button class="pb-diagram-node" data-pb-target="${esc(step.id)}" type="button">
          <span class="pb-diagram-index">${idx}</span>
          <strong>${esc(step.label)}</strong>
          <small>${esc(step.text)}</small>
        </button>
      `).join(`<span class="pb-diagram-arrow">←</span>`);

      const productFlowHTML = PROGRAMMING_PRODUCT_STACK_FLOW.map((step, idx) => `
        <article class="pb-product-flow-node">
          <span>${String(idx + 1).padStart(2, "0")}</span>
          <strong>${esc(step.title)}</strong>
          <small>${esc(step.layer)}</small>
          <p>${esc(step.question)}</p>
          <em>${esc(step.output)}</em>
        </article>
      `).join(`<b class="pb-product-arrow">←</b>`);

      return `
        <section class="pb-section" id="pb-foundations">
          <div class="pb-section-head">
            <span class="pb-kicker">01</span>
            <h2>האבנים עצמן</h2>
            <p>כל אבן קטנה. הכוח מגיע מהשילוב ביניהן.</p>
          </div>
          <div class="pb-block-grid">${blocksHTML}</div>
        </section>

        <section class="pb-section pb-compare-section" id="pb-array-vs-function">
          <div class="pb-section-head">
            <span class="pb-kicker">02</span>
            <h2>מה ההבדל בין פונקציה למערך?</h2>
          </div>
          <div class="pb-compare-grid">
            <div class="pb-compare-col">
              <h3>🚃 מערך</h3>
              <p>מחזיק כמה ערכים לפי סדר. משתמשים בו כשצריך לזכור רשימה.</p>
              <pre class="pb-code"><code>${esc("const prices = [20, 35, 10];\nconst first = prices[0];")}</code></pre>
            </div>
            <div class="pb-compare-col">
              <h3>⚙️ פונקציה</h3>
              <p>מבצעת פעולה. משתמשים בה כשצריך לחשב, לבדוק או לשנות משהו שוב ושוב.</p>
              <pre class="pb-code"><code>${esc("function total(prices) {\n  return prices.reduce((sum, price) => sum + price, 0);\n}")}</code></pre>
            </div>
          </div>
          <div class="pb-rule-strip">
            <strong>כלל זיכרון:</strong>
            מערך הוא <span>מחסן</span>. פונקציה היא <span>מכונה</span>. מחסן שומר דברים; מכונה עושה משהו עם הדברים.
          </div>
        </section>

        <section class="pb-section" id="pb-bool-vs-if">
          <div class="pb-section-head">
            <span class="pb-kicker">03</span>
            <h2>bool מול if</h2>
          </div>
          <div class="pb-two-col">
            <div>
              <h3>🔘 bool הוא תשובה</h3>
              <p><code>true</code> או <code>false</code>. לדוגמה: “העגלה ריקה?”</p>
            </div>
            <div>
              <h3>🚦 if הוא שוטר תנועה</h3>
              <p>הוא מסתכל על ה־bool ומחליט לאיזה כיוון הקוד ממשיך.</p>
            </div>
          </div>
          <pre class="pb-code"><code>${esc("const cartIsEmpty = cart.length === 0;\n\nif (cartIsEmpty) {\n  showEmptyState();\n} else {\n  showCheckoutButton();\n}")}</code></pre>
        </section>

        <section class="pb-section" id="pb-zero-diagram">
          <div class="pb-section-head">
            <span class="pb-kicker">04</span>
            <h2>תרשים: איך נבנה כל דבר בתכנות מ־0</h2>
            <p>התרשים הולך מהדבר הכי קטן עד אפליקציה שלמה.</p>
          </div>
          <div class="pb-diagram" role="img" aria-label="תרשים בניית מושגי תכנות מ-0 עד אפליקציה">
            ${diagramHTML}
          </div>
          <div class="pb-zero-note">
            <strong>הנקודה החשובה:</strong>
            אין קפיצה מ־0 ל־React. קודם מבינים ערכים, שמות, תנאים, פונקציות ואוספים. React פשוט משתמש באותן אבנים כדי לבנות UI.
          </div>
        </section>

        <section class="pb-section pb-product-blueprint" id="pb-fullstack-product-blueprint">
          <div class="pb-section-head">
            <span class="pb-kicker">05</span>
            <h2>תרשים Full-Stack מלא: מרעיון למוצר בשוק</h2>
            <p>המוצר לא נבנה רק מקוד. הוא נבנה מהבעיה, מהלקוח, מהמסכים, מהשרת, מהנתונים, מהשקה ומלמידה אחרי שימוש אמיתי.</p>
          </div>
          <div class="pb-product-stage" role="img" aria-label="תרשים Full-Stack מרעיון להשקה">
            ${productFlowHTML}
          </div>
          <div class="pb-product-note">
            <strong>כלל עבודה:</strong>
            לא מתחילים מ־database או React. מתחילים מהבעיה והמדד, ואז מתכננים את הזרימה: משתמש → מסך → API → שרת → נתונים → מדידה → שיפור.
          </div>

          <div class="pb-section-head spaced">
            <span class="pb-kicker">06</span>
            <h2>מחזור חיים עסקי וטכנולוגי</h2>
            <p>בכל שלב יש עבודה מוצרית, טכנית ועסקית. אם אחת מהן חסרה, המוצר עלול לעבוד בקוד אבל להיכשל אצל משתמשים.</p>
          </div>
          <div class="pb-product-phase-grid">
            ${PROGRAMMING_PRODUCT_LIFECYCLE.map((phase, idx) => `
              <article class="pb-product-phase" id="pb-product-phase-${esc(phase.id)}">
                <div class="pb-product-phase-head">
                  <span>${String(idx + 1).padStart(2, "0")}</span>
                  <h3>${esc(phase.stage)}</h3>
                </div>
                <p>${esc(phase.goal)}</p>
                <div class="pb-product-lanes">
                  <div>
                    <h4>Product</h4>
                    <ul>${phase.product.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
                  </div>
                  <div>
                    <h4>Tech</h4>
                    <ul>${phase.tech.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
                  </div>
                  <div>
                    <h4>Business</h4>
                    <ul>${phase.business.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
                  </div>
                </div>
                <strong>${esc(phase.deliverable)}</strong>
              </article>
            `).join("")}
          </div>

          <div class="pb-section-head spaced">
            <span class="pb-kicker">07</span>
            <h2>איך מתחלקת העבודה בזמן הפיתוח</h2>
            <p>פיתוח מוצר עובד טוב כשהגבולות ברורים: מי מחזיק בעיה, מי מחזיק flow, מי מחזיק client, מי מחזיק server, מי מחזיק data ומי מאשר release.</p>
          </div>
          <div class="pb-product-team-grid">
            ${PROGRAMMING_PRODUCT_TEAM_SPLIT.map((role) => `
              <article class="pb-product-team-card">
                <h3>${esc(role.role)}</h3>
                <dl class="pb-mini-dl">
                  <div><dt>אחראי על</dt><dd>${esc(role.owns)}</dd></div>
                  <div><dt>בזמן פיתוח</dt><dd>${esc(role.during)}</dd></div>
                  <div><dt>מסירה לצוות</dt><dd>${esc(role.handoff)}</dd></div>
                </dl>
              </article>
            `).join("")}
          </div>

          <div class="pb-section-head spaced" id="pb-product-version-decisions">
            <span class="pb-kicker">08</span>
            <h2>מתי לשדרג גרסה, להחליף חלק או להחליף מוצר</h2>
            <p>שדרוג טוב מגיע מנתונים. החלפה טובה מגיעה כשהבעיה, הקהל או העלות מוכיחים שהפתרון הנוכחי כבר לא מתאים.</p>
          </div>
          <div class="pb-product-decision-grid">
            ${PROGRAMMING_PRODUCT_VERSION_DECISIONS.map((item) => `
              <article class="pb-product-decision">
                <h3>${esc(item.decision)}</h3>
                <p>${esc(item.when)}</p>
                <div class="pb-product-signal-list">
                  ${item.signals.map((signal) => `<span>${esc(signal)}</span>`).join("")}
                </div>
                <strong>${esc(item.action)}</strong>
              </article>
            `).join("")}
          </div>
        </section>`;
    }

    function renderBuilds() {
      return `
        <section class="pb-section">
          <div class="pb-section-head">
            <span class="pb-kicker">01</span>
            <h2>דרכים שונות לבנות משתנה, מערך, מחלקה ופונקציה</h2>
            <p>לכל דוגמה יש יעילות והמלצה. ההמלצה אינה “הכי מתקדם”, אלא הכי נכון למשימה.</p>
          </div>
          <div class="pb-build-groups">
            ${PROGRAMMING_BUILD_EXAMPLES.map((group) => `
              <div class="pb-build-group">
                <h3>${esc(group.group)}</h3>
                <div class="pb-example-grid">
                  ${group.items.map((item) => `
                    <article class="pb-example-card" id="pb-build-${slugifyId(group.group)}-${slugifyId(item.title)}">
                      <h4>${esc(item.title)}</h4>
                      <pre class="pb-code"><code>${esc(item.code)}</code></pre>
                      ${renderEfficiency(item)}
                    </article>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
          <div class="pb-section-head spaced">
            <span class="pb-kicker">02</span>
            <h2>מתכונים יצירתיים מאבני הבסיס</h2>
            <p>אותן אבנים קטנות יכולות להפוך לכלי עבודה: מסנן, מכונת חישוב, תור עבודה או זרימת אפליקציה.</p>
          </div>
          <div class="pb-recipe-list">
            ${PROGRAMMING_BUILD_RECIPES.map((recipe) => `
              <article class="pb-recipe" id="pb-recipe-${esc(recipe.id)}">
                <div>
                  <h3>${esc(recipe.title)}</h3>
                  <p>${esc(recipe.intro)}</p>
                </div>
                <ol class="pb-steps">
                  ${recipe.steps.map((step) => `<li>${esc(step)}</li>`).join("")}
                </ol>
                <pre class="pb-code"><code>${esc(recipe.code)}</code></pre>
              </article>
            `).join("")}
          </div>
        </section>`;
    }

    function renderMenus() {
      return `
        <section class="pb-section">
          <div class="pb-section-head">
            <span class="pb-kicker">01</span>
            <h2>איך בונים תפריט מאבני בסיס</h2>
            <p>הטריק: התפריט הוא קודם נתונים, ורק אחר כך UI. JSON/Array הוא השלד; Node/React/Next הם דרכי הצגה.</p>
          </div>
          <div class="pb-example-grid wide">
            ${PROGRAMMING_MENU_EXAMPLES.map((item) => `
              <article class="pb-example-card" id="pb-menu-${slugifyId(item.title)}">
                <div class="pb-card-topline"><span>${esc(item.stack)}</span></div>
                <h3>${esc(item.title)}</h3>
                <pre class="pb-code"><code>${esc(item.code)}</code></pre>
                ${renderEfficiency(item)}
              </article>
            `).join("")}
          </div>
        </section>`;
    }

    function renderPatents() {
      return `
        <section class="pb-section">
          <div class="pb-section-head">
            <span class="pb-kicker">01</span>
            <h2>פטנטים לבניית קוד יעיל בלי לייבא ספריות</h2>
            <p>לפני שמייבאים ספרייה: בדוק אם מערך, אובייקט, Set, Map, פונקציה טהורה או JSON פותרים את זה.</p>
          </div>
          <div class="pb-patent-list">
            ${PROGRAMMING_PATENTS.map((item) => `
              <article class="pb-patent" id="pb-patent-${slugifyId(item.title)}">
                <h3>${esc(item.title)}</h3>
                <div class="pb-before-after">
                  <div><strong>לפני</strong><pre class="pb-code"><code>${esc(item.before)}</code></pre></div>
                  <div><strong>אחרי</strong><pre class="pb-code"><code>${esc(item.after)}</code></pre></div>
                </div>
                <div class="pb-efficiency"><strong>יעילות:</strong> ${esc(item.efficiency)}</div>
                <div class="pb-warning"><strong>מתי לא:</strong> ${esc(item.warning)}</div>
              </article>
            `).join("")}
          </div>

          <div class="pb-section-head spaced">
            <span class="pb-kicker">02</span>
            <h2>ספריות שעלולות להיות לא יעילות כשמשתמשים בהן לא נכון</h2>
            <p>הבעיה אינה שהספרייה “גרועה”; הבעיה היא להשתמש בכלי כבד בשביל פעולה קטנה.</p>
          </div>
          <div class="pb-example-grid">
            ${PROGRAMMING_LIBRARY_WARNINGS.map((item) => `
              <article class="pb-example-card">
                <h4>${esc(item.name)}</h4>
                <p>${esc(item.issue)}</p>
                <div class="pb-efficiency">
                  <div><strong>חלופה:</strong> ${esc(item.alternative)}</div>
                  <div><strong>יעילות:</strong> ${esc(item.efficiency)}</div>
                </div>
              </article>
            `).join("")}
          </div>
        </section>`;
    }

    function renderTech() {
      return `
        <section class="pb-section">
          <div class="pb-section-head">
            <span class="pb-kicker">01</span>
            <h2>דירוג טכנולוגיות לפי יעילות שימושית</h2>
            <p>הדירוג הוא לפי התאמה למשימה, לא לפי “מי הכי נוצצת”.</p>
          </div>
          <div class="pb-ranking">
            ${PROGRAMMING_TECH_RANKING.map((item, idx) => `
              <article class="pb-rank-card" id="pb-tech-${slugifyId(item.name)}">
                <span class="pb-rank-num">${idx + 1}</span>
                <h3>${esc(item.name)}</h3>
                <div class="pb-rank-label">${esc(item.rank)}</div>
                <dl class="pb-mini-dl">
                  <div><dt>נבנה מ</dt><dd>${esc(item.builtFrom)}</dd></div>
                  <div><dt>יכול</dt><dd>${esc(item.can)}</dd></div>
                  <div><dt>לא יכול / לא כדאי</dt><dd>${esc(item.cannot)}</dd></div>
                  <div><dt>יעילות</dt><dd>${esc(item.efficiency)}</dd></div>
                </dl>
              </article>
            `).join("")}
          </div>
        </section>`;
    }

    function renderLanguages() {
      return `
        <section class="pb-section">
          <div class="pb-section-head">
            <span class="pb-kicker">01</span>
            <h2>איך בנו שפות תכנות ומה משפיע על המהירות שלהן</h2>
            <p>המהירות תלויה בכמה שכבות יש בין הקוד שלך למכונה: קומפילציה, VM, JIT, interpreter, GC וטיפוסים.</p>
          </div>
          <div class="pb-language-grid">
            ${PROGRAMMING_LANGUAGES.map((item) => `
              <article class="pb-language-card" id="pb-lang-${slugifyId(item.name)}">
                <h3>${esc(item.name)}</h3>
                <div class="pb-speed">${esc(item.speed)}</div>
                <dl class="pb-mini-dl">
                  <div><dt>אבני בניין</dt><dd>${esc(item.builtFrom)}</dd></div>
                  <div><dt>יכולה</dt><dd>${esc(item.can)}</dd></div>
                  <div><dt>לא יכולה / פחות מתאימה</dt><dd>${esc(item.cannot)}</dd></div>
                  <div><dt>לזכור</dt><dd>${esc(item.note)}</dd></div>
                </dl>
              </article>
            `).join("")}
          </div>
        </section>`;
    }

    function renderHistory() {
      const timelineHTML = PROGRAMMING_HISTORY_NODES.map((item, idx) => `
        <button class="pb-history-node"
                type="button"
                data-history-target="${esc(item.id)}"
                aria-label="${esc(`${item.year} ${item.title}`)}">
          <span class="pb-history-index">${idx + 1}</span>
          <strong>${esc(item.year)}</strong>
          <span>${esc(item.title)}</span>
          <small>${esc(item.layer)}</small>
        </button>
      `).join(`<span class="pb-history-arrow">←</span>`);

      return `
        <section class="pb-section" id="pb-history-explain">
          <div class="pb-section-head">
            <span class="pb-kicker">01</span>
            <h2>מה הייתה שפת התוכנה הראשונה?</h2>
            <p>התשובה תלויה למה קוראים “שפה”. לכן מציגים לתלמיד ארבע שכבות במקום תשובה חד-ממדית.</p>
          </div>
          <div class="pb-history-answers">
            <article>
              <strong>אלגוריתם ראשון</strong>
              <p>Ada Lovelace תיארה במאה ה-19 אלגוריתם למכונה של Babbage. זה לפני מחשבים אלקטרוניים.</p>
            </article>
            <article>
              <strong>שפה שהמחשב מבין</strong>
              <p>קוד מכונה: רצף ביטים שהמעבד מפענח ישירות לפעולות.</p>
            </article>
            <article>
              <strong>שפה אנושית נמוכה</strong>
              <p>Assembly: שמות קצרים לפקודות מכונה, מתורגמים על ידי assembler.</p>
            </article>
            <article>
              <strong>שפה גבוהה שימושית</strong>
              <p>FORTRAN ב-1957 הייתה נקודת פריצה: מתכנתים כתבו ביטויים ורעיונות, וה-compiler תרגם.</p>
            </article>
          </div>
        </section>

        <section class="pb-section" id="pb-history-diagram">
          <div class="pb-section-head">
            <span class="pb-kicker">02</span>
            <h2>תרשים היסטורי: מהטרנזיסטור עד שפות מודרניות</h2>
            <p>לחץ על כל תחנה כדי לקפוץ להסבר שלה. המסלול המרכזי שמוביל ל-C מודגש דרך BCPL ו-B.</p>
          </div>
          <div class="pb-history-flow" role="img" aria-label="ציר זמן מהטרנזיסטור הראשון עד C ושפות מודרניות">
            ${timelineHTML}
          </div>
        </section>

        <section class="pb-section">
          <div class="pb-section-head">
            <span class="pb-kicker">03</span>
            <h2>איך כל שכבה בנתה את הבאה?</h2>
          </div>
          <div class="pb-history-branch-grid">
            ${PROGRAMMING_HISTORY_BRANCHES.map((item) => `
              <article class="pb-history-branch">
                <h3>${esc(item.title)}</h3>
                <p>${esc(item.body)}</p>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="pb-section">
          <div class="pb-section-head">
            <span class="pb-kicker">04</span>
            <h2>תחנות בציר הזמן</h2>
          </div>
          <div class="pb-history-detail-list">
            ${PROGRAMMING_HISTORY_NODES.map((item) => `
              <article class="pb-history-detail" id="pb-history-${esc(item.id)}">
                <div class="pb-history-year">${esc(item.year)}</div>
                <div>
                  <div class="pb-card-topline"><span>${esc(item.layer)}</span></div>
                  <h3>${esc(item.title)}</h3>
                  <p class="pb-history-subtitle">${esc(item.subtitle)}</p>
                  <p>${esc(item.summary)}</p>
                  <dl class="pb-mini-dl">
                    <div><dt>נבנה מ</dt><dd>${esc(item.built)}</dd></div>
                    <div><dt>מה השתנה</dt><dd>${esc(item.changed)}</dd></div>
                  </dl>
                </div>
              </article>
            `).join("")}
          </div>
        </section>`;
    }

    function renderLanguageMuseum() {
      const hallNavHTML = PROGRAMMING_LANGUAGE_MUSEUM_HALLS.map((hall, idx) => `
        <button class="pb-museum-hall-button"
                type="button"
                data-museum-target="${esc(hall.id)}"
                aria-label="${esc(`${idx + 1}. ${hall.title}`)}">
          <span>${idx + 1}</span>
          <strong>${esc(hall.title)}</strong>
          <small>${esc(hall.period)}</small>
        </button>
      `).join("");

      return `
        <section class="pb-section" id="pb-museum-overview">
          <div class="pb-section-head">
            <span class="pb-kicker">01</span>
            <h2>מוזיאון היסטורי לשפות התכנות</h2>
            <p>המוזיאון מחבר את כל הסיפור: חשמל, ביטים, קוד מכונה, שפות, frameworks, ומה תלמיד צריך להבין כדי לא לפחד מטכנולוגיה חדשה.</p>
          </div>
          <div class="pb-museum-gate">
            <div>
              <strong>רעיון מוביל:</strong>
              כל שפת תכנות היא תשובה לבעיה היסטורית. אם מבינים את הבעיה, מבינים למה השפה נראית כך, למה היא מהירה או איטית, ומתי כדאי להשתמש בה.
            </div>
            <div>
              <strong>מסלול מומלץ:</strong>
              התחל באולם 1, המשך לפי הסדר, ובכל אולם שאל: “איזו שכבה זה מסתיר ממני, ואיזו שליטה זה נותן לי?”
            </div>
          </div>
          <div class="pb-museum-hall-nav" role="list" aria-label="אולמות המוזיאון">
            ${hallNavHTML}
          </div>
        </section>

        <section class="pb-section">
          <div class="pb-section-head">
            <span class="pb-kicker">02</span>
            <h2>אולמות המוזיאון</h2>
            <p>כל אולם מציג תקופה, בעיה, פריצת דרך, והחיבור הישיר לאבני הבסיס של התכנות.</p>
          </div>
          <div class="pb-museum-halls">
            ${PROGRAMMING_LANGUAGE_MUSEUM_HALLS.map((hall) => `
              <article class="pb-museum-hall" id="pb-museum-${esc(hall.id)}">
                <div class="pb-museum-hall-head">
                  <div>
                    <span class="pb-museum-period">${esc(hall.period)}</span>
                    <h3>${esc(hall.title)}</h3>
                    <p>${esc(hall.thesis)}</p>
                  </div>
                  <aside>${esc(hall.visit)}</aside>
                </div>
                <div class="pb-museum-exhibit-list">
                  ${hall.exhibits.map((exhibit) => `
                    <div class="pb-museum-exhibit">
                      <div class="pb-museum-year">${esc(exhibit.year)}</div>
                      <div>
                        <h4>${esc(exhibit.name)}</h4>
                        <dl class="pb-mini-dl">
                          <div><dt>נבנה מ</dt><dd>${esc(exhibit.builtFrom)}</dd></div>
                          <div><dt>פריצת דרך</dt><dd>${esc(exhibit.breakthrough)}</dd></div>
                          <div><dt>חיבור לקוד</dt><dd>${esc(exhibit.connects)}</dd></div>
                        </dl>
                      </div>
                    </div>
                  `).join("")}
                </div>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="pb-section" id="pb-museum-lineages">
          <div class="pb-section-head">
            <span class="pb-kicker">03</span>
            <h2>שושלות רעיונות</h2>
            <p>שפה לא נולדת לבד. היא יורשת רעיונות, משנה פשרות, ומשאירה סימנים בשפות הבאות.</p>
          </div>
          <div class="pb-museum-lineages">
            ${PROGRAMMING_LANGUAGE_LINEAGES.map((lineage) => `
              <article class="pb-museum-lineage">
                <h3>${esc(lineage.title)}</h3>
                <div class="pb-museum-path" aria-label="${esc(lineage.title)}">
                  ${lineage.path.map((step) => `<span>${esc(step)}</span>`).join("<b>←</b>")}
                </div>
                <dl class="pb-mini-dl">
                  <div><dt>מה לומדים</dt><dd>${esc(lineage.lesson)}</dd></div>
                  <div><dt>איך להשתמש היום</dt><dd>${esc(lineage.today)}</dd></div>
                </dl>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="pb-section" id="pb-museum-extensions">
          <div class="pb-section-head">
            <span class="pb-kicker">04</span>
            <h2>הצעות הרחבה להשלמת הידע ההיסטורי</h2>
            <p>אלו שכבות ההמשך שכדאי להוסיף כדי שהמוזיאון יהפוך למסלול ידע מלא ולא רק ציר זמן יפה.</p>
          </div>
          <div class="pb-museum-extensions">
            ${PROGRAMMING_HISTORY_EXTENSION_IDEAS.map((idea, idx) => `
              <article class="pb-museum-extension">
                <span>${idx + 1}</span>
                <div>
                  <h3>${esc(idea.title)}</h3>
                  <p>${esc(idea.work)}</p>
                  <strong>${esc(idea.value)}</strong>
                </div>
              </article>
            `).join("")}
          </div>
          <div class="pb-museum-source-rule">
            <strong>כלל אמינות למוזיאון:</strong>
            אין להוסיף תחנה היסטורית בלי מקור ותאריך מאומתים. אם התאריך שנוי במחלוקת, מציינים טווח ולא מספר מדויק.
          </div>
        </section>`;
    }

    function renderReactAnatomy() {
      const pathHTML = PROGRAMMING_REACT_BUILD_PATH.map((step, idx) => `
        <button class="pb-react-path-node"
                type="button"
                data-react-target="${esc(step.id)}"
                aria-label="${esc(`${idx + 1}. ${step.title}`)}">
          <span>${idx + 1}</span>
          <strong>${esc(step.label)}</strong>
          <small>${esc(step.title)}</small>
        </button>
      `).join(`<b class="pb-react-arrow">←</b>`);

      return `
        <section class="pb-section" id="pb-react-overview">
          <div class="pb-section-head">
            <span class="pb-kicker">01</span>
            <h2>React — למה בכלל בנו אותו?</h2>
            <p>React נולד כדי לפתור בעיה פשוטה וקשה: כשהנתונים משתנים, איך מעדכנים מסך גדול בלי להפוך את הקוד לרשימת תיקוני DOM ידניים?</p>
          </div>
          <div class="pb-react-summary">
            <article>
              <strong>מה React אומר?</strong>
              <p>תאר את המסך לפי state. כש-state משתנה, React ידאג לחשב מה צריך להשתנות.</p>
            </article>
            <article>
              <strong>את מי הוא החליף?</strong>
              <p>בעיקר קוד jQuery/DOM ידני, תבניות מפוזרות, class components בחלק מהשימושים, וסנכרון ידני בין data למסך.</p>
            </article>
            <article>
              <strong>מה המחיר?</strong>
              <p>runtime, render cycle, כללי hooks, וחשיבה נכונה על state. React חוסך כאוס, אבל לא חוסך הבנה.</p>
            </article>
          </div>
        </section>

        <section class="pb-section" id="pb-react-build-path">
          <div class="pb-section-head">
            <span class="pb-kicker">02</span>
            <h2>מפת בנייה: איך React בנוי מאבני בסיס</h2>
            <p>לחץ על תחנה כדי לקפוץ למושג. כל התחנות הן הרחבה של משתנים, מערכים, פונקציות, אובייקטים ותנאים.</p>
          </div>
          <div class="pb-react-path" role="img" aria-label="תרשים בניית React מאבני בסיס">
            ${pathHTML}
          </div>
          <div class="pb-react-path-details">
            ${PROGRAMMING_REACT_BUILD_PATH.map((step) => `
              <article id="pb-react-path-${esc(step.id)}">
                <h3>${esc(step.title)}</h3>
                <p>${esc(step.text)}</p>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="pb-section">
          <div class="pb-section-head">
            <span class="pb-kicker">03</span>
            <h2>מושגי React בפשטות</h2>
            <p>לכל מושג: מה זה, למה בנו אותו, מה הוא החליף, יעילות, חלופה, והדרך הטובה יותר להשתמש בו.</p>
          </div>
          <div class="pb-react-concepts">
            ${PROGRAMMING_REACT_CONCEPTS.map((item) => `
              <article class="pb-react-concept" id="pb-react-${esc(item.id)}">
                <div class="pb-react-concept-head">
                  <span>⚛️</span>
                  <div>
                    <h3>${esc(item.name)}</h3>
                    <p>${esc(item.simple)}</p>
                  </div>
                </div>
                <dl class="pb-react-grid">
                  <div><dt>למה נבנה</dt><dd>${esc(item.why)}</dd></div>
                  <div><dt>את מי החליף</dt><dd>${esc(item.replaced)}</dd></div>
                  <div><dt>יעילות</dt><dd>${esc(item.efficiency)}</dd></div>
                  <div><dt>אפשר אחרת?</dt><dd>${esc(item.could)}</dd></div>
                  <div><dt>אפשר טוב יותר?</dt><dd>${esc(item.better)}</dd></div>
                  <div><dt>אסוציאציה פשוטה</dt><dd>${esc(item.analogy)}</dd></div>
                </dl>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="pb-section" id="pb-react-alternatives">
          <div class="pb-section-head">
            <span class="pb-kicker">04</span>
            <h2>האם היה ניתן לבנות את זה אחרת?</h2>
            <p>כן. React הוא פשרה טובה להרבה מוצרי UI, אבל לא הפתרון היחיד ולא תמיד הפתרון הכי קטן.</p>
          </div>
          <div class="pb-react-alt-grid">
            ${PROGRAMMING_REACT_ALTERNATIVES.map((item) => `
              <article class="pb-react-alt">
                <h3>${esc(item.name)}</h3>
                <dl class="pb-mini-dl">
                  <div><dt>מתי מתאים</dt><dd>${esc(item.when)}</dd></div>
                  <div><dt>יעילות</dt><dd>${esc(item.efficiency)}</dd></div>
                  <div><dt>מחיר</dt><dd>${esc(item.cost)}</dd></div>
                </dl>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="pb-section" id="pb-react-better">
          <div class="pb-section-head">
            <span class="pb-kicker">05</span>
            <h2>איך לבנות React בצורה טובה יותר</h2>
            <p>הפטנטים כאן מחזירים את React לאבני בסיס: פחות state מיותר, פחות effects, פחות עבודה רחבה.</p>
          </div>
          <div class="pb-react-patterns">
            ${PROGRAMMING_REACT_BETTER_PATTERNS.map((item, idx) => `
              <article class="pb-react-pattern">
                <span>${idx + 1}</span>
                <div>
                  <h3>${esc(item.title)}</h3>
                  <p>${esc(item.rule)}</p>
                  <strong>${esc(item.benefit)}</strong>
                </div>
              </article>
            `).join("")}
          </div>
        </section>`;
    }

    const activeContent =
      programmingBasicsTab === "electricity" ? renderElectricity()
        : programmingBasicsTab === "efficiency" ? renderEfficiencyFoundations()
          : programmingBasicsTab === "builds" ? renderBuilds()
            : programmingBasicsTab === "menus" ? renderMenus()
              : programmingBasicsTab === "patents" ? renderPatents()
                : programmingBasicsTab === "tech" ? renderTech()
                  : programmingBasicsTab === "languages" ? renderLanguages()
                    : programmingBasicsTab === "history" ? renderHistory()
                      : programmingBasicsTab === "museum" ? renderLanguageMuseum()
                        : programmingBasicsTab === "react-anatomy" ? renderReactAnatomy()
                          : renderFoundations();

    container.innerHTML = `${tabsHTML}${metricNote}<div class="pb-tab-panel">${activeContent}</div>`;

    container.querySelectorAll("[data-pb-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.pbTarget;
        const targetId = id === "zero" || id === "value" || id === "expression" || id === "object" || id === "module" || id === "app"
          ? "pb-zero-diagram"
          : `pb-block-${id}`;
        scrollBasicsSection(targetId);
      });
    });
    container.querySelectorAll("[data-pb-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        programmingBasicsTab = btn.dataset.pbTab || "foundations";
        renderProgrammingBasics();
        setProgrammingBasicsContextTree();
        scrollBasicsSection("programming-basics-content");
      });
    });
    container.querySelectorAll("[data-history-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        scrollBasicsSection(`pb-history-${btn.dataset.historyTarget}`);
      });
    });
    container.querySelectorAll("[data-electric-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        scrollBasicsSection(`pb-electric-${btn.dataset.electricTarget}`);
      });
    });
    container.querySelectorAll("[data-museum-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        scrollBasicsSection(`pb-museum-${btn.dataset.museumTarget}`);
      });
    });
    container.querySelectorAll("[data-react-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        scrollBasicsSection(`pb-react-path-${btn.dataset.reactTarget}`);
      });
    });
  }

  function renderProgrammingPrinciples() {
    const container = document.getElementById("programming-principles-content");
    if (!container) return;

    container.innerHTML = `
      <section class="pb-section" id="principles-determinism">
        <div class="pb-section-head">
          <span class="pb-kicker">01</span>
          <h2>דטרמיניסטיות: אותו קלט → אותה תוצאה</h2>
          <p>תוכנה טובה היא תוכנה שאפשר לנבא, לבדוק ולשחזר. דטרמיניסטיות לא אומרת שאין זמן, רשת או משתמשים; היא אומרת שמבודדים אותם במקום ברור ולא מערבבים אותם בכל חישוב.</p>
        </div>
        <div class="principles-hero-grid">
          <article>
            <h3>למה זה הכרחי?</h3>
            <p>אם פעולה מחזירה פעם אחת תוצאה א' ופעם אחרת תוצאה ב' בלי סיבה גלויה, אי אפשר לכתוב test אמין ואי אפשר לשחזר bug.</p>
          </article>
          <article>
            <h3>איך חושבים על זה?</h3>
            <p>הפרד בין חישוב טהור לבין מקורות משתנים: שעה, רשת, localStorage, DOM, קלט משתמש ו-state.</p>
          </article>
          <article>
            <h3>איפה זה חוזר?</h3>
            <p>React render, reducers, validation, cache keys, routing, tests, build scripts ושאלות במאמן הידע.</p>
          </article>
        </div>
      </section>

      <section class="pb-section" id="principles-examples">
        <div class="pb-section-head">
          <span class="pb-kicker">02</span>
          <h2>דוגמאות דטרמיניסטיות</h2>
          <p>כל דוגמה בנויה כך שאפשר להריץ שוב ולקבל אותה התנהגות עבור אותו קלט.</p>
        </div>
        <div class="principle-example-grid">
          ${PROGRAMMING_DETERMINISTIC_EXAMPLES.map((item) => `
            <article class="principle-example" id="principle-example-${esc(item.id)}">
              <div class="pb-card-topline"><span>${esc(item.principle)}</span></div>
              <h3>${esc(item.title)}</h3>
              <pre class="pb-code"><code>${esc(item.code)}</code></pre>
              <p>${esc(item.why)}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="pb-section">
        <div class="pb-section-head">
          <span class="pb-kicker">03</span>
          <h2>המושגים שחייבים לדעת כדי לתכנת טוב</h2>
          <p>אלו לא “מילים יפות”. כל אחד מהמושגים האלה מונע סוג נפוץ של באגים ומקל על כתיבת קוד שאפשר לתחזק.</p>
        </div>
        <div class="principle-grid">
          ${PROGRAMMING_PRINCIPLES.map((item) => `
            <article class="principle-card" id="principle-${esc(item.id)}">
              <h3>${esc(item.name)}</h3>
              <p>${esc(item.simple)}</p>
              <dl class="pb-mini-dl">
                <div><dt>למה הכרחי</dt><dd>${esc(item.why)}</dd></div>
                <div><dt>חייבים לזכור</dt><dd>${esc(item.must)}</dd></div>
                <div><dt>דוגמה</dt><dd>${esc(item.example)}</dd></div>
              </dl>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="pb-section" id="principles-checklist">
        <div class="pb-section-head">
          <span class="pb-kicker">04</span>
          <h2>Checklist לפני שממשיכים לפרק הבא</h2>
          <p>אם התשובה לרוב הסעיפים היא “לא”, כדאי לעצור ולחזק את העיקרון לפני שמעמיסים עוד syntax.</p>
        </div>
        <ol class="principle-checklist">
          ${PROGRAMMING_PRINCIPLES_CHECKLIST.map((item) => `<li>${esc(item)}</li>`).join("")}
        </ol>
      </section>`;
  }

  function compactMuseumList(items, separator = ", ") {
    return (items || []).filter(Boolean).join(separator);
  }

  function compactMuseumPath(items) {
    return compactMuseumList(items, " ← ");
  }

  function museumCategoryLines(categories) {
    return (categories || []).map((category) => {
      const items = compactMuseumList(category.items);
      return items ? `${category.name}: ${items}` : category.name;
    }).filter(Boolean);
  }

  function makeMuseumVideoEntry(config) {
    const duration = config.duration || (config.kind === "track" ? "4-5 דקות" : "2-3 דקות");
    const style = config.style || "הסבר ויזואלי לימודי בעברית";
    const background = (config.background || []).filter(Boolean);
    const script = [
      {
        title: "פתיחה",
        text: `פתח בשאלה או בבעיה שהסרטון פותר: ${config.problem || config.goal}`,
      },
      {
        title: "תצוגת מוזיאון",
        text: `הצג את האולם כמרחב ויזואלי: ${config.visual || config.group}. השתמש בתרשים ${config.diagram || "פשוט וברור"} כדי להראות את המעבר בין החלקים.`,
      },
      {
        title: "הסבר שכבות",
        text: `הסבר מה נבנה ממה ומה התלמיד צריך להבין: ${config.solution || config.goal}`,
      },
      {
        title: "חיבור לקוד ולקורס",
        text: `חבר את הרעיון לקורס ולקוד: ${config.course || "הראה איפה המושג חוזר בשיעורים, בתרגול ובשאלות."}`,
      },
      {
        title: "סגירה",
        text: `סיים במשפט זכירה ובבדיקת הבנה: ${config.check || "מה הבעיה, מה הפתרון, ומה נשבר אם לא מבינים את השכבה."}`,
      },
    ];

    return {
      ...config,
      duration,
      style,
      background,
      script,
      notebookChoices: [
        "פתח מחברת NotebookLM ייעודית לסרטון או השתמש במחברת המוזיאון.",
        "הוסף למחברת רק את חומר הרקע, הידע המקדים, הסקריפט והפרומפט של הסרטון הזה.",
        "בחר יצירת Video Overview / וידאו מתוך אזור Studio או האפשרות המקבילה בממשק.",
        "שפה: עברית.",
        `אורך מומלץ: ${duration}.`,
        `סגנון: ${style}.`,
        "הדגש תמיד: בעיה, פתרון, איך זה נראה בקוד, ומה לזכור למבחן.",
        "השתמש בפרומפט הייעודי כהנחיית Custom Instructions.",
      ],
    };
  }

  function getMuseumVideoEntries(activeLayerId = "") {
    const entries = [];

    PROGRAMMING_STACK_LAYER_MUSEUMS.forEach((layer) => {
      layer.rooms.forEach((room) => {
        entries.push(makeMuseumVideoEntry({
          id: `stack-${layer.id}-${room.id}`,
          kind: "room",
          area: "מוזיאוני שכבות המחשב",
          group: layer.title,
          sourceTitle: room.title,
          layerId: layer.id,
          title: room.video.title,
          goal: `להבין ${room.what} ולהראות איך זה מוביל אל ${room.evolvedTo}`,
          problem: layer.inventedBecause,
          solution: layer.solved,
          visual: room.experience,
          diagram: compactMuseumPath(room.diagram),
          course: `לאן זה מתחבר: ${room.evolvedTo}`,
          check: "איזה חלק בשכבה מסתיר פרטים נמוכים יותר ומה המחיר של ההסתרה?",
          prerequisite: room.video.prerequisite,
          prompt: room.video.prompt,
          style: room.experience,
          background: [
            `אזור: ${layer.title}`,
            `תזה: ${layer.thesis}`,
            `למה השכבה נוצרה: ${layer.inventedBecause}`,
            `מה היא פתרה: ${layer.solved}`,
            `לאן היא התפתחה: ${layer.evolvedTo}`,
            `מסלול התפתחות: ${compactMuseumPath(layer.pathway)}`,
            `אולם: ${room.title}`,
            `מה רואים בו: ${room.what}`,
            `לאן האולם התפתח: ${room.evolvedTo}`,
            `תרשים: ${compactMuseumPath(room.diagram)}`,
            ...museumCategoryLines(room.categories),
            `חוויה מתאימה: ${room.experience}`,
          ],
        }));
      });
    });

    MUSEUM_CONCEPT_CONNECTIONS.forEach((card) => {
      entries.push(makeMuseumVideoEntry({
        id: `concept-${card.id}`,
        kind: "concept",
        area: "מערכת קשרי המושגים",
        group: card.layer,
        sourceTitle: card.title,
        layerId: card.stackLayer,
        relatedLayers: card.relatedLayers || [],
        title: card.title,
        goal: `לחבר את ${card.title} בין השכבות, הקורס והקוד.`,
        problem: card.breaksWhen,
        solution: card.solves,
        visual: `מפת קשר: ${compactMuseumPath(card.builtFrom)} ← ${compactMuseumPath(card.leadsTo)}`,
        diagram: compactMuseumPath([...(card.builtFrom || []), ...(card.leadsTo || [])]),
        course: `איפה בפורטל: ${compactMuseumList(card.whereInCourse)}. איפה בקוד: ${compactMuseumList(card.whereInCode)}`,
        check: card.question,
        prerequisite: card.video.prerequisite,
        prompt: card.video.prompt,
        background: [
          `מושג: ${card.title}`,
          `שכבה: ${card.layer}`,
          `נבנה מ: ${compactMuseumList(card.builtFrom)}`,
          `מוביל אל: ${compactMuseumList(card.leadsTo)}`,
          `מה הוא מסתיר: ${card.hides}`,
          `מה הוא פותר: ${card.solves}`,
          `נשבר כאשר: ${card.breaksWhen}`,
          `איפה בקורס: ${compactMuseumList(card.whereInCourse)}`,
          `איפה בקוד: ${compactMuseumList(card.whereInCode)}`,
          `שאלת בדיקה: ${card.question}`,
        ],
      }));
    });

    MUSEUM_VIDEO_STUDIO_TRACKS.forEach((track, idx) => {
      entries.push(makeMuseumVideoEntry({
        id: `track-${idx + 1}-${slugifyId(track.title)}`,
        kind: "track",
        area: "מסלולי וידאו כלליים",
        group: "Video Studio",
        sourceTitle: `מסלול ${idx + 1}`,
        title: track.title,
        goal: "להציג מסלול מסכם שמחבר כמה שכבות סביב פעולה, מידע, טעות או חוזה.",
        problem: "תלמידים רואים מושגים נפרדים ולא תמיד מבינים איך הם מתחברים למערכת אחת.",
        solution: track.prompt,
        visual: "מסלול מוזיאוני שעובר תחנה אחרי תחנה ומראה מה קורה בכל שכבה.",
        diagram: "פעולה → שכבה → חוזה → שגיאה אפשרית → בדיקת הבנה",
        course: "מתאים לפתיחה או סיכום של ביקור מודרך במוזיאון.",
        check: track.checkQuestion,
        prerequisite: track.prerequisite,
        prompt: track.prompt,
        duration: "4-5 דקות",
        style: "מסלול מוזיאוני מסכם עם תרשים זרימה ברור",
        background: [
          `שם המסלול: ${track.title}`,
          `ידע מקדים: ${track.prerequisite}`,
          `מטרת המסלול: לחבר מושגים שנלמדים בנפרד למהלך אחד של מערכת.`,
          `מה להראות: ${track.prompt}`,
          `שאלת בדיקה: ${track.checkQuestion}`,
          "הסרטון צריך להראות שכבות, גבולות, שגיאות וחוזים בלי להוסיף עובדות היסטוריות חדשות.",
        ],
      }));
    });

    FULL_STACK_MUSEUM_HALLS.forEach((hall) => {
      const domain = FULL_STACK_DOMAIN_EXHIBITIONS[hall.id] || { profession: hall.layer, does: hall.summary, rooms: [] };
      entries.push(makeMuseumVideoEntry({
        id: `fullstack-hall-${hall.id}`,
        kind: "fullstack-hall",
        area: "מוזיאון Full Stack הראשי",
        group: hall.layer,
        sourceTitle: hall.title,
        title: hall.video.title,
        goal: `להסביר מה עושים ב-${hall.layer}, למה התחום נוצר ומה הוא פתר במוצר Full-Stack.`,
        problem: hall.inventedBecause,
        solution: hall.solved,
        visual: hall.experience,
        diagram: compactMuseumPath(hall.artifacts),
        course: `${domain.profession}: ${domain.does}`,
        check: "מה האחריות של התחום הזה בשרשרת Full-Stack?",
        prerequisite: hall.video.prerequisite,
        prompt: hall.video.prompt,
        style: hall.experience,
        background: [
          `אולם: ${hall.title}`,
          `שכבה מקצועית: ${hall.layer}`,
          `תקציר: ${hall.summary}`,
          `התפתח מ: ${hall.evolvedFrom}`,
          `התפתח אל: ${hall.evolvedTo}`,
          `למה הומצא: ${hall.inventedBecause}`,
          `מה פתר: ${hall.solved}`,
          `מוצגים: ${compactMuseumList(hall.artifacts)}`,
          `חוויה: ${hall.experience}`,
          `תחום מקצועי: ${domain.profession}`,
          `מה עושים בו: ${domain.does}`,
        ],
      }));

      (domain.rooms || []).forEach((room) => {
        entries.push(makeMuseumVideoEntry({
          id: `fullstack-room-${hall.id}-${room.id}`,
          kind: "fullstack-room",
          area: "תתי-מוזיאונים לכל תחום Full Stack",
          group: `${hall.layer} · ${domain.profession}`,
          sourceTitle: room.title,
          title: room.video.title,
          goal: `להסביר את ${room.title} בתוך תחום ${domain.profession}: ${room.what}`,
          problem: hall.inventedBecause,
          solution: hall.solved,
          visual: room.experience,
          diagram: compactMuseumPath(room.diagram),
          course: `קטגוריות: ${museumCategoryLines(room.categories).join(" | ")}`,
          check: "איזו אחריות החדר הזה לוקח בתוך מוצר Full-Stack?",
          prerequisite: room.video.prerequisite,
          prompt: room.video.prompt,
          style: room.experience,
          background: [
            `אולם אב: ${hall.title}`,
            `תחום מקצועי: ${domain.profession}`,
            `מה עושים בתחום: ${domain.does}`,
            `חדר: ${room.title}`,
            `מה רואים בו: ${room.what}`,
            `עיצוב תקופתי: ${FULL_STACK_ERA_LABELS[room.era] || room.era}`,
            `תרשים: ${compactMuseumPath(room.diagram)}`,
            ...museumCategoryLines(room.categories),
            `חוויה: ${room.experience}`,
            `למה התחום נוצר: ${hall.inventedBecause}`,
            `מה התחום פתר: ${hall.solved}`,
          ],
        }));
      });
    });

    if (!activeLayerId) return entries;
    return entries.filter((entry) => (
      entry.layerId === activeLayerId ||
      (entry.relatedLayers || []).includes(activeLayerId) ||
      entry.kind === "track"
    ));
  }

  function renderMuseumVideoOpenButton(videoId, label = "פתח חומר מלא ל-NotebookLM") {
    return `
      <button class="museum-video-open-button" type="button" data-museum-video="${esc(videoId)}">
        ${esc(label)}
      </button>`;
  }

  function renderMuseumVideoStudioHub(entries, options = {}) {
    const id = options.id || "programming-museum-video-studio";
    const number = options.number || "05";
    const title = options.title || "מסמך NotebookLM חי לכל סרטוני המוזיאון";
    const intro = options.intro || "כל סרטון נפתח בחלון מלא עם חומר רקע, ידע מקדים, סקריפט, פרומפט והוראות בחירה ב-NotebookLM.";
    const grouped = entries.reduce((acc, entry) => {
      if (!acc.has(entry.area)) acc.set(entry.area, []);
      acc.get(entry.area).push(entry);
      return acc;
    }, new Map());

    return `
      <section class="museum-section museum-video-studio-hub" id="${esc(id)}">
        <div class="museum-section-head">
          <span>${esc(number)}</span>
          <div>
            <h3>${esc(title)}</h3>
            <p>${esc(intro)}</p>
          </div>
        </div>
        <div class="museum-video-studio-summary">
          <article>
            <strong>${esc(entries.length)}</strong>
            <span>סרטונים זמינים</span>
          </article>
          <article>
            <strong>${esc(grouped.size)}</strong>
            <span>אזורים במוזיאון</span>
          </article>
          <article>
            <strong>7</strong>
            <span>חלקים בכל חלון</span>
          </article>
        </div>
        <div class="museum-video-area-grid">
          ${Array.from(grouped.entries()).map(([area, areaEntries]) => `
            <article class="museum-video-area-card">
              <div class="museum-video-area-head">
                <span>${esc(areaEntries.length)}</span>
                <h4>${esc(area)}</h4>
              </div>
              <div class="museum-video-index-list">
                ${areaEntries.map((entry) => `
                  <button class="museum-video-index-button" type="button" data-museum-video="${esc(entry.id)}">
                    <span>${esc(entry.group)}</span>
                    <strong>${esc(entry.title)}</strong>
                    <small>${esc(entry.sourceTitle)}</small>
                  </button>
                `).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      </section>`;
  }

  function renderMuseumVideoModalShell() {
    return `
      <div class="museum-video-modal" id="museum-video-modal" role="dialog" aria-modal="true" aria-labelledby="museum-video-modal-title" hidden>
        <div class="museum-video-modal-backdrop" data-museum-video-close></div>
        <article class="museum-video-modal-card" tabindex="-1">
          <header class="museum-video-modal-head">
            <div>
              <span id="museum-video-modal-subtitle">NotebookLM</span>
              <h3 id="museum-video-modal-title">חומר לסרטון</h3>
            </div>
            <button class="museum-video-modal-close" type="button" data-museum-video-close aria-label="סגור חלון סרטון">סגור</button>
          </header>
          <div class="museum-video-modal-body" id="museum-video-modal-body"></div>
        </article>
      </div>`;
  }

  function renderMuseumVideoDocument(entry) {
    return `
      <div class="museum-video-document">
        <div class="museum-video-doc-hero">
          <span>${esc(entry.area)}</span>
          <h4>${esc(entry.title)}</h4>
          <p>${esc(entry.goal)}</p>
        </div>
        <section>
          <h5>1. חומר רקע מלא לסרטון</h5>
          <ul>
            ${entry.background.map((line) => `<li>${esc(line)}</li>`).join("")}
          </ul>
        </section>
        <section>
          <h5>2. ידע מקדים להוסיף למחברת</h5>
          <p>${esc(entry.prerequisite)}</p>
        </section>
        <section>
          <h5>3. סקריפט לסרטון</h5>
          <ol>
            ${entry.script.map((scene) => `
              <li>
                <strong>${esc(scene.title)}</strong>
                <p>${esc(scene.text)}</p>
              </li>
            `).join("")}
          </ol>
        </section>
        <section>
          <h5>4. פרומפט ל-NotebookLM</h5>
          <pre><code>${esc(entry.prompt)}</code></pre>
        </section>
        <section>
          <h5>5. במה לבחור ב-NotebookLM</h5>
          <ul>
            ${entry.notebookChoices.map((choice) => `<li>${esc(choice)}</li>`).join("")}
          </ul>
        </section>
        <section>
          <h5>6. בדיקת איכות לפני יצירת הסרטון</h5>
          <ul>
            <li>הסרטון נשען רק על חומר המוזיאון ולא מוסיף עובדות או תאריכים חדשים.</li>
            <li>יש בעיה ברורה, פתרון ברור, חיבור לקוד ושאלת סיכום.</li>
            <li>הקריינות בעברית, קצרה, ויזואלית ומתאימה לתלמידי Full-Stack.</li>
          </ul>
        </section>
      </div>`;
  }

  function bindMuseumVideoStudio(container, entries) {
    const modal = container.querySelector("#museum-video-modal");
    const body = container.querySelector("#museum-video-modal-body");
    const title = container.querySelector("#museum-video-modal-title");
    const subtitle = container.querySelector("#museum-video-modal-subtitle");
    const card = container.querySelector(".museum-video-modal-card");
    if (!modal || !body || !title || !subtitle || !card) return;

    const entryById = new Map(entries.map((entry) => [entry.id, entry]));
    let returnFocus = null;

    const closeModal = () => {
      modal.hidden = true;
      document.body.classList.remove("museum-video-modal-open");
      if (returnFocus && typeof returnFocus.focus === "function") {
        try { returnFocus.focus({ preventScroll: true }); } catch (_) {}
      }
      returnFocus = null;
    };

    const openModal = (videoId) => {
      const entry = entryById.get(videoId);
      if (!entry) return;
      returnFocus = document.activeElement;
      title.textContent = entry.title;
      subtitle.textContent = `${entry.area} · ${entry.group}`;
      body.innerHTML = renderMuseumVideoDocument(entry);
      modal.hidden = false;
      document.body.classList.add("museum-video-modal-open");
      card.focus({ preventScroll: true });
    };

    container.querySelectorAll("[data-museum-video]").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.dataset.museumVideo));
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest("[data-museum-video-close]")) closeModal();
    });

    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
  }

  function getMuseumStackLayerId() {
    try {
      return new URLSearchParams(window.location.search).get("stackLayer") || "";
    } catch (_) {
      return "";
    }
  }

  function getMuseumStackLayerPageHref(layerId) {
    return `museum.html?stackLayer=${encodeURIComponent(layerId)}&v=${encodeURIComponent(MUSEUM_STACK_LAYER_PAGE_VERSION)}`;
  }

  function renderMuseumStackSvg() {
    const layers = PROGRAMMING_STACK_LAYER_MUSEUMS.map((layer) => ({
      id: layer.id,
      title: layer.blockTitle,
      pageTitle: layer.title,
      detail: layer.detail,
      accent: layer.accent,
    }));

    return `
      <svg class="museum-stack-svg" viewBox="0 0 980 420" role="img" aria-label="תרשים שכבות: מחשמל לאפליקציה">
        <defs>
          <linearGradient id="museumStackRail" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#fbbf24"/>
            <stop offset="45%" stop-color="#22d3ee"/>
            <stop offset="100%" stop-color="#f472b6"/>
          </linearGradient>
        </defs>
        <rect x="28" y="34" width="924" height="336" rx="26" fill="rgba(2,6,23,0.62)" stroke="rgba(255,255,255,0.14)"/>
        <path d="M118 204 H862" stroke="url(#museumStackRail)" stroke-width="8" stroke-linecap="round"/>
        ${layers.map((layer, idx) => {
          const x = 118 + idx * 148;
          const y = idx % 2 === 0 ? 122 : 286;
          const connectorY = idx % 2 === 0 ? 196 : 212;
          return `
            <a class="museum-stack-link" href="${esc(getMuseumStackLayerPageHref(layer.id))}" target="_blank" rel="noopener noreferrer" aria-label="פתח את ${esc(layer.pageTitle)} בדף נפרד">
            <title>${esc(layer.pageTitle)} - פתיחה בדף מוזיאון נפרד</title>
            <g>
              <line x1="${x}" y1="${connectorY}" x2="${x}" y2="${y}" stroke="${layer.accent}" stroke-width="3" stroke-dasharray="7 7"/>
              <circle cx="${x}" cy="204" r="18" fill="#0b1020" stroke="${layer.accent}" stroke-width="4"/>
              <rect x="${x - 72}" y="${y - 38}" width="144" height="76" rx="16" fill="rgba(15,23,42,0.9)" stroke="${layer.accent}"/>
              <text x="${x}" y="${y - 8}" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="900">${esc(layer.title)}</text>
              <text x="${x}" y="${y + 20}" text-anchor="middle" fill="#cbd5e1" font-size="14">${esc(layer.detail)}</text>
            </g>
            </a>`;
        }).join("")}
        <text x="490" y="394" text-anchor="middle" fill="#f8fafc" font-size="21" font-weight="900">
          כל בלוק הוא מוזיאון נפרד: לחיצה פותחת עמוד שמסביר למה השכבה נוצרה ולאן היא התפתחה.
        </text>
      </svg>`;
  }

  function renderMuseumChipList(items, className = "museum-system-pills") {
    return `
      <div class="${esc(className)}">
        ${(items || []).map((item) => `<span>${esc(item)}</span>`).join("")}
      </div>`;
  }

  function renderMuseumFlowTrack(title, intro, steps) {
    return `
      <article class="museum-system-flow-card">
        <div class="museum-system-card-head">
          <span>flow</span>
          <h4>${esc(title)}</h4>
        </div>
        <p>${esc(intro)}</p>
        <div class="museum-system-flow">
          ${steps.map((step, idx) => `
            <div class="museum-system-flow-step" data-layer="${esc(step.layerId || "")}">
              <b>${String(idx + 1).padStart(2, "0")}</b>
              <strong>${esc(step.title)}</strong>
              <small>${esc(step.visible || step.detail || "")}</small>
              ${step.code ? `<code>${esc(step.code)}</code>` : ""}
              ${step.machine ? `<em>${esc(step.machine)}</em>` : ""}
              ${step.breaksWhen ? `<span>${esc(step.breaksWhen)}</span>` : ""}
            </div>
          `).join("<i>←</i>")}
        </div>
      </article>`;
  }

  function renderMuseumConnectionCards(cards) {
    return `
      <div class="museum-system-card-grid">
        ${cards.map((card) => `
          <article class="museum-system-concept-card" id="museum-connection-${esc(card.id)}" data-layer="${esc(card.stackLayer)}">
            <div class="museum-system-card-head">
              <span>${esc(card.layer)}</span>
              <h4>${esc(card.title)}</h4>
            </div>
            <dl class="museum-system-dl">
              <div>
                <dt>נבנה מ</dt>
                <dd>${renderMuseumChipList(card.builtFrom)}</dd>
              </div>
              <div>
                <dt>מוביל אל</dt>
                <dd>${renderMuseumChipList(card.leadsTo)}</dd>
              </div>
              <div>
                <dt>מסתיר</dt>
                <dd>${esc(card.hides)}</dd>
              </div>
              <div>
                <dt>פותר</dt>
                <dd>${esc(card.solves)}</dd>
              </div>
              <div>
                <dt>נשבר כאשר</dt>
                <dd>${esc(card.breaksWhen)}</dd>
              </div>
            </dl>
            <div class="museum-system-course-links">
              <strong>איפה בפורטל</strong>
              ${renderMuseumChipList(card.whereInCourse)}
            </div>
            <div class="museum-system-code-links">
              <strong>איפה בקוד</strong>
              ${(card.whereInCode || []).map((line) => `<code>${esc(line)}</code>`).join("")}
            </div>
            <div class="museum-system-check">
              <span>שאלת בדיקה</span>
              <p>${esc(card.question)}</p>
            </div>
            <div class="museum-system-video-mini">
              <span>NotebookLM</span>
              <p><strong>ידע מקדים:</strong> ${esc(card.video.prerequisite)}</p>
              <p><strong>Prompt:</strong> ${esc(card.video.prompt)}</p>
              ${renderMuseumVideoOpenButton(`concept-${card.id}`, "פתח חלון סרטון מלא")}
            </div>
          </article>
        `).join("")}
      </div>`;
  }

  function renderMuseumConnectionHub(activeLayer = null) {
    const layerId = activeLayer?.id || "";
    const isLayerPage = Boolean(activeLayer);
    const layerTitle = activeLayer?.blockTitle || "";
    const relatedConcepts = isLayerPage
      ? MUSEUM_CONCEPT_CONNECTIONS.filter((card) => (
          card.stackLayer === layerId || (card.relatedLayers || []).includes(layerId)
        ))
      : MUSEUM_CONCEPT_CONNECTIONS;
    const relatedActionFlow = isLayerPage
      ? MUSEUM_ACTION_XRAY_FLOW.filter((step) => step.layerId === layerId)
      : MUSEUM_ACTION_XRAY_FLOW;
    const relatedDataFlow = isLayerPage
      ? MUSEUM_DATA_JOURNEY_FLOW.filter((step) => step.layerId === layerId)
      : MUSEUM_DATA_JOURNEY_FLOW;
    const relatedErrors = isLayerPage
      ? MUSEUM_ERROR_LAYER_MAP.filter((item) => item.layerId === layerId)
      : MUSEUM_ERROR_LAYER_MAP;
    const sectionId = isLayerPage ? "stack-layer-connection-system" : "programming-museum-connection-system";
    const sectionNumber = isLayerPage ? "04" : "04";

    return `
      <section class="museum-section museum-system-hub" id="${sectionId}">
        <div class="museum-section-head">
          <span>${sectionNumber}</span>
          <div>
            <h3>${isLayerPage ? `מערכת הקשרים של ${esc(layerTitle)}` : "מערכת הקשרים המרכזית של כל הפורטל"}</h3>
            <p>
              ${isLayerPage
                ? "כאן הבלוק מתחבר למושגים, טעויות, קוד, שאלות וסרטונים כדי שלא יישאר כתצוגה מבודדת."
                : "השכבה הזו מחברת מוזיאון, שיעורים, בלוקי קוד, מאמן ידע, שאלונים וסרטונים למפה אחת של נבנה מ, מוביל אל, פותר ונשבר כאשר."}
            </p>
          </div>
        </div>

        <div class="museum-system-summary">
          <article>
            <strong>${esc(relatedConcepts.length)}</strong>
            <span>כרטיסי קשר</span>
          </article>
          <article>
            <strong>${esc(relatedErrors.length)}</strong>
            <span>אבחוני טעויות</span>
          </article>
          <article>
            <strong>${esc(MUSEUM_DECISION_GUIDES.length)}</strong>
            <span>החלטות טכנולוגיות</span>
          </article>
          <article>
            <strong>${esc(MUSEUM_VIDEO_STUDIO_TRACKS.length)}</strong>
            <span>מסלולי סרטון</span>
          </article>
        </div>

        <div class="museum-system-flow-grid">
          ${renderMuseumFlowTrack(
            isLayerPage ? `X-Ray פעולה בתוך ${layerTitle}` : "X-Ray: לחיצה על כפתור בכל השכבות",
            "אותה פעולה נפתחת לרמות: מה המשתמש רואה, מה הקוד עושה, מה המחשב עושה, ואיפה זה נשבר.",
            relatedActionFlow.length ? relatedActionFlow : MUSEUM_ACTION_XRAY_FLOW,
          )}
          ${renderMuseumFlowTrack(
            isLayerPage ? `מסע מידע דרך ${layerTitle}` : "מסע מידע: input עד analytics",
            "נתון אחד מחליף צורה לאורך המוצר: state, validation, JSON, server, database, render ומדידה.",
            relatedDataFlow.length ? relatedDataFlow : MUSEUM_DATA_JOURNEY_FLOW,
          )}
        </div>

        <div class="museum-system-subhead">
          <h4>כרטיס קשר אחיד לכל מושג</h4>
          <p>כל כרטיס עונה על אותן שאלות: נבנה מ, מוביל אל, מה מסתיר, מה פותר, איפה בקורס, איפה בקוד ומה השאלה שמוודאת הבנה.</p>
        </div>
        ${renderMuseumConnectionCards(relatedConcepts)}

        <div class="museum-system-panels">
          <article class="museum-system-panel">
            <div class="museum-system-card-head">
              <span>errors</span>
              <h4>טעויות שמגלות שכבה</h4>
            </div>
            <div class="museum-system-error-list">
              ${(relatedErrors.length ? relatedErrors : MUSEUM_ERROR_LAYER_MAP).map((item) => `
                <div>
                  <code>${esc(item.error)}</code>
                  <strong>${esc(item.layer)}</strong>
                  <p>${esc(item.diagnosis)}</p>
                  <small>${esc(item.action)}</small>
                </div>
              `).join("")}
            </div>
          </article>

          <article class="museum-system-panel">
            <div class="museum-system-card-head">
              <span>contracts</span>
              <h4>גבולות וחוזים</h4>
            </div>
            <div class="museum-system-boundary-grid">
              ${MUSEUM_BOUNDARY_MAP.map((item) => `
                <div>
                  <strong>${esc(item.title)}</strong>
                  <p>${esc(item.boundary)}</p>
                  <em>${esc(item.contract)}</em>
                  <small>${esc(item.breaksWhen)}</small>
                </div>
              `).join("")}
            </div>
          </article>
        </div>

        <div class="museum-system-panels">
          <article class="museum-system-panel">
            <div class="museum-system-card-head">
              <span>decisions</span>
              <h4>חדר החלטות טכנולוגיות</h4>
            </div>
            <div class="museum-system-decision-grid">
              ${MUSEUM_DECISION_GUIDES.map((item) => `
                <div>
                  <strong>${esc(item.decision)}</strong>
                  <p>${esc(item.chooseA)}</p>
                  <p>${esc(item.chooseB)}</p>
                  <small>${esc(item.upgradeSignal)}</small>
                </div>
              `).join("")}
            </div>
          </article>

          <article class="museum-system-panel">
            <div class="museum-system-card-head">
              <span>portal</span>
              <h4>איך כל חלק בפורטל מתחבר</h4>
            </div>
            <div class="museum-system-portal-grid">
              ${MUSEUM_PORTAL_CONNECTIONS.map((item) => `
                <div>
                  <strong>${esc(item.area)}</strong>
                  <p>${esc(item.connection)}</p>
                </div>
              `).join("")}
            </div>
          </article>
        </div>

        <div class="museum-system-panels">
          <article class="museum-system-panel">
            <div class="museum-system-card-head">
              <span>video</span>
              <h4>NotebookLM Video Studio</h4>
            </div>
            <div class="museum-system-video-grid">
              ${MUSEUM_VIDEO_STUDIO_TRACKS.map((track, trackIdx) => `
                <div>
                  <strong>${esc(track.title)}</strong>
                  <p><span>ידע מקדים:</span> ${esc(track.prerequisite)}</p>
                  <p><span>Prompt:</span> ${esc(track.prompt)}</p>
                  <small>${esc(track.checkQuestion)}</small>
                  ${renderMuseumVideoOpenButton(`track-${trackIdx + 1}-${slugifyId(track.title)}`, "פתח חלון מסלול מלא")}
                </div>
              `).join("")}
            </div>
          </article>

          <article class="museum-system-panel">
            <div class="museum-system-card-head">
              <span>passport</span>
              <h4>דרכון תלמיד ותפקידי צוות</h4>
            </div>
            <div class="museum-system-passport-grid">
              ${MUSEUM_STUDENT_PASSPORT.map((item) => `
                <div>
                  <strong>${esc(item.stamp)}</strong>
                  <p>${esc(item.task)}</p>
                  <small>${esc(item.proof)}</small>
                </div>
              `).join("")}
            </div>
            <div class="museum-system-team-strip">
              ${MUSEUM_TEAM_RESPONSIBILITIES.map((item) => `
                <span title="${esc(item.owns)}">${esc(item.role)}</span>
              `).join("")}
            </div>
          </article>
        </div>
      </section>`;
  }

  function renderStackLayerMuseum(layer) {
    const layerIndex = PROGRAMMING_STACK_LAYER_MUSEUMS.findIndex((item) => item.id === layer.id);
    const categoryCount = layer.rooms.reduce((sum, room) => sum + (room.categories || []).length, 0);
    const subCategoryCount = layer.rooms.reduce(
      (sum, room) => sum + (room.categories || []).reduce((innerSum, category) => innerSum + (category.items || []).length, 0),
      0,
    );
    const stats = [
      { value: layer.rooms.length, label: "אולמות תצוגה" },
      { value: categoryCount, label: "קטגוריות" },
      { value: subCategoryCount, label: "תתי קטגוריות" },
      { value: layer.rooms.length, label: "סרטונים" },
    ];
    const siblingLinks = PROGRAMMING_STACK_LAYER_MUSEUMS.map((item) => `
      <a class="${item.id === layer.id ? "active" : ""}" href="/?standalone=museum&stackLayer=${esc(item.id)}&v=${esc(MUSEUM_STACK_LAYER_PAGE_VERSION)}">
        ${esc(item.blockTitle)}
      </a>
    `).join("");

    return `
      <section class="stack-layer-museum stack-layer-era-${esc(layer.era)}" id="stack-layer-museum-gate" style="--stack-accent: ${esc(layer.accent)};">
        <div class="stack-layer-hero">
          <div class="stack-layer-hero-copy">
            <span class="museum-kicker">מוזיאון שכבה ${String(layerIndex + 1).padStart(2, "0")} · ${esc(layer.detail)}</span>
            <h2>${esc(layer.title)}</h2>
            <p>${esc(layer.thesis)}</p>
            <div class="museum-stat-strip stack-layer-stat-strip" aria-label="נתוני מוזיאון השכבה">
              ${stats.map((stat) => `
                <div class="museum-stat">
                  <strong>${esc(stat.value)}</strong>
                  <span>${esc(stat.label)}</span>
                </div>
              `).join("")}
            </div>
            <div class="museum-actions">
              <a class="museum-primary-action stack-layer-action" href="/?standalone=museum&v=${esc(MUSEUM_STACK_LAYER_PAGE_VERSION)}">חזרה למוזיאון הראשי</a>
              ${layer.rooms.map((room) => `
                <button class="museum-secondary-action" type="button" data-stack-layer-room="${esc(room.id)}">${esc(room.title)}</button>
              `).join("")}
            </div>
          </div>
          <div class="stack-layer-display" aria-hidden="true">
            <div class="stack-layer-orbit"></div>
            <strong>${esc(layer.blockTitle)}</strong>
            <span>${esc(layer.detail)}</span>
          </div>
        </div>

        <div class="stack-layer-why-grid">
          <article>
            <span>למה נוצרה השכבה</span>
            <p>${esc(layer.inventedBecause)}</p>
          </article>
          <article>
            <span>מה היא פתרה</span>
            <p>${esc(layer.solved)}</p>
          </article>
          <article>
            <span>לאן היא התפתחה</span>
            <p>${esc(layer.evolvedTo)}</p>
          </article>
        </div>

        <section class="museum-section stack-layer-section" id="stack-layer-pathway-section">
          <div class="museum-section-head">
            <span>01</span>
            <div>
              <h3>תרשים התפתחות השכבה</h3>
              <p>המסלול מראה איך בלוק אחד בתרשים הגדול נהיה בסיס לשכבה שמעליו.</p>
            </div>
          </div>
          <div class="stack-layer-pathway" aria-label="תרשים התפתחות">
            ${layer.pathway.map((step, idx) => `
              <span>
                <b>${String(idx + 1).padStart(2, "0")}</b>
                ${esc(step)}
              </span>
            `).join("<i>←</i>")}
          </div>
        </section>

        <section class="museum-section stack-layer-section" id="stack-layer-rooms-section">
          <div class="museum-section-head">
            <span>02</span>
            <div>
              <h3>אולמות התצוגה של ${esc(layer.blockTitle)}</h3>
              <p>כל אולם מסביר מה עושים בתחום, לאן הוא התפתח, ומה כדאי להכניס ל-NotebookLM כסרטון.</p>
            </div>
          </div>
          <div class="stack-layer-room-grid">
            ${layer.rooms.map((room, roomIdx) => `
              <article class="stack-layer-room-card" id="stack-layer-room-${esc(room.id)}">
                <div class="stack-layer-room-top">
                  <span>${String(roomIdx + 1).padStart(2, "0")}</span>
                  <strong>${esc(room.title)}</strong>
                </div>
                <p class="stack-layer-room-what">${esc(room.what)}</p>
                <div class="stack-layer-room-evolution">
                  <span>לאן התפתח</span>
                  <p>${esc(room.evolvedTo)}</p>
                </div>
                <div class="stack-layer-room-flow" aria-label="תרשים חדר">
                  ${(room.diagram || []).map((step) => `<span>${esc(step)}</span>`).join("<b>←</b>")}
                </div>
                <div class="stack-layer-category-grid">
                  ${(room.categories || []).map((category) => `
                    <div>
                      <h4>${esc(category.name)}</h4>
                      <ul>
                        ${(category.items || []).map((item) => `<li>${esc(item)}</li>`).join("")}
                      </ul>
                    </div>
                  `).join("")}
                </div>
                <p class="stack-layer-experience">${esc(room.experience)}</p>
                <div class="stack-layer-video-card">
                  <div class="stack-layer-video-screen" aria-hidden="true">
                    <span>▶</span>
                    <strong>${esc(room.video.title)}</strong>
                  </div>
                  <dl>
                    <div>
                      <dt>ידע מקדים לסרטון</dt>
                      <dd>${esc(room.video.prerequisite)}</dd>
                    </div>
                    <div>
                      <dt>Prompt לסרטון</dt>
                      <dd>${esc(room.video.prompt)}</dd>
                    </div>
                  </dl>
                  ${renderMuseumVideoOpenButton(`stack-${layer.id}-${room.id}`)}
                </div>
              </article>
            `).join("")}
          </div>
        </section>

        ${renderMuseumConnectionHub(layer)}

        ${renderMuseumVideoStudioHub(getMuseumVideoEntries(layer.id), {
          id: "stack-layer-video-studio",
          number: "05",
          title: `מסמך NotebookLM חי של ${layer.title}`,
          intro: "כל הסרטונים הרלוונטיים לשכבה הזו נפתחים בחלון מלא עם חומר רקע, סקריפט, פרומפט והוראות בחירה.",
        })}

        <section class="museum-section stack-layer-section">
          <div class="museum-section-head">
            <span>06</span>
            <div>
              <h3>מעבר בין מוזיאוני הבלוקים</h3>
              <p>אפשר לעבור לכל בלוק אחר בלי לחזור לתפריטי הפורטל.</p>
            </div>
          </div>
          <nav class="stack-layer-sibling-nav" aria-label="מוזיאוני שכבות נוספים">
            ${siblingLinks}
          </nav>
        </section>
        ${renderMuseumVideoModalShell()}
      </section>`;
  }

  function renderMuseumTimelineSvg() {
    const nodes = PROGRAMMING_HISTORY_NODES;
    return `
      <svg class="museum-timeline-svg" viewBox="0 0 1080 420" role="img" aria-label="ציר זמן היסטורי לשפות תכנות">
        <defs>
          <linearGradient id="museumTimelineRail" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#f59e0b"/>
            <stop offset="35%" stop-color="#22d3ee"/>
            <stop offset="70%" stop-color="#a78bfa"/>
            <stop offset="100%" stop-color="#34d399"/>
          </linearGradient>
        </defs>
        <rect x="24" y="42" width="1032" height="320" rx="30" fill="rgba(3,7,18,0.72)" stroke="rgba(255,255,255,0.12)"/>
        <path d="M84 206 C196 122, 278 286, 386 206 S596 126, 708 206 S920 286, 996 206"
              fill="none" stroke="url(#museumTimelineRail)" stroke-width="8" stroke-linecap="round"/>
        ${nodes.map((item, idx) => {
          const x = 84 + idx * 91;
          const y = idx % 2 === 0 ? 142 : 270;
          const railY = 206;
          const accent = idx % 3 === 0 ? "#fbbf24" : idx % 3 === 1 ? "#22d3ee" : "#a78bfa";
          return `
            <g>
              <line x1="${x}" y1="${railY}" x2="${x}" y2="${y}" stroke="${accent}" stroke-width="2.5" stroke-dasharray="6 7"/>
              <circle cx="${x}" cy="${railY}" r="14" fill="#0f172a" stroke="${accent}" stroke-width="4"/>
              <rect x="${x - 52}" y="${y - 44}" width="104" height="88" rx="14" fill="rgba(15,23,42,0.92)" stroke="${accent}"/>
              <text x="${x}" y="${y - 17}" text-anchor="middle" fill="#fde68a" font-size="13" font-weight="900">${esc(item.year)}</text>
              <text x="${x}" y="${y + 5}" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="900">${esc(item.layer)}</text>
              <text x="${x}" y="${y + 26}" text-anchor="middle" fill="#cbd5e1" font-size="12">${esc(item.title)}</text>
            </g>`;
        }).join("")}
      </svg>`;
  }

  function renderFullStackMuseumSvg() {
    return `
      <svg class="fullstack-map-svg" viewBox="0 0 1080 430" role="img" aria-label="מפת זרימה של מוזיאון Full-Stack">
        <defs>
          <linearGradient id="fullStackMuseumRail" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#fbbf24"/>
            <stop offset="32%" stop-color="#22d3ee"/>
            <stop offset="66%" stop-color="#34d399"/>
            <stop offset="100%" stop-color="#fb7185"/>
          </linearGradient>
        </defs>
        <rect x="24" y="34" width="1032" height="352" rx="28" fill="rgba(2,6,23,0.78)" stroke="rgba(255,255,255,0.12)"/>
        <path class="fullstack-map-rail" d="M92 214 H988" stroke="url(#fullStackMuseumRail)" stroke-width="10" stroke-linecap="round"/>
        ${FULL_STACK_MUSEUM_FLOW.map((step, idx) => {
          const x = 92 + idx * 179.2;
          const y = idx % 2 === 0 ? 126 : 302;
          const accent = ["#fbbf24", "#22d3ee", "#34d399", "#fb7185", "#a3e635", "#f472b6"][idx];
          return `
            <g class="fullstack-map-node">
              <line x1="${x}" y1="214" x2="${x}" y2="${y}" stroke="${accent}" stroke-width="3" stroke-dasharray="7 8"/>
              <circle cx="${x}" cy="214" r="18" fill="#020617" stroke="${accent}" stroke-width="5"/>
              <rect x="${x - 75}" y="${y - 48}" width="150" height="96" rx="16" fill="rgba(15,23,42,0.94)" stroke="${accent}"/>
              <text x="${x}" y="${y - 19}" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="900">${esc(step.title)}</text>
              <text x="${x}" y="${y + 7}" text-anchor="middle" fill="#fde68a" font-size="13" font-weight="800">${esc(step.detail)}</text>
              <text x="${x}" y="${y + 29}" text-anchor="middle" fill="#cbd5e1" font-size="12">${esc(step.signal)}</text>
            </g>`;
        }).join("")}
        <text x="540" y="410" text-anchor="middle" fill="#f8fafc" font-size="20" font-weight="900">
          Full-Stack הוא לא רשימת כלים: זו שרשרת חוזים בין מסך, אירוע, בקשה, שרת, מידע ואיכות.
        </text>
      </svg>`;
  }

  function renderMuseumHallIllustration(hall, idx) {
    const palette = [
      { main: "#fbbf24", second: "#22d3ee", dim: "rgba(251,191,36,0.18)" },
      { main: "#34d399", second: "#a78bfa", dim: "rgba(52,211,153,0.18)" },
      { main: "#22d3ee", second: "#fb7185", dim: "rgba(34,211,238,0.18)" },
      { main: "#a78bfa", second: "#f472b6", dim: "rgba(167,139,250,0.18)" },
    ][idx % 4];
    const title = esc(hall.title.replace(/^אולם \d+ —\s*/, ""));

    if (hall.id === "hardware") {
      return `
        <svg class="museum-art-svg" viewBox="0 0 360 220" aria-hidden="true">
          <rect x="28" y="34" width="304" height="152" rx="22" fill="${palette.dim}" stroke="${palette.main}"/>
          <path d="M72 110 H148 M212 110 H288 M180 64 V156" stroke="${palette.second}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="180" cy="110" r="38" fill="#020617" stroke="${palette.main}" stroke-width="8"/>
          <path d="M160 128 L180 82 L202 128" fill="none" stroke="#f8fafc" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="180" y="204" text-anchor="middle" fill="#f8fafc" font-size="18" font-weight="900">${title}</text>
        </svg>`;
    }

    if (hall.id === "machine") {
      return `
        <svg class="museum-art-svg" viewBox="0 0 360 220" aria-hidden="true">
          <rect x="48" y="42" width="264" height="136" rx="18" fill="#020617" stroke="${palette.main}" stroke-width="4"/>
          <rect x="70" y="64" width="220" height="58" rx="10" fill="rgba(15,23,42,0.92)" stroke="${palette.second}"/>
          <text x="180" y="101" text-anchor="middle" fill="#bbf7d0" font-size="23" font-family="monospace">MOV ADD JMP</text>
          <g fill="${palette.main}">
            <circle cx="94" cy="148" r="7"/><circle cx="124" cy="148" r="7"/><circle cx="154" cy="148" r="7"/>
            <circle cx="206" cy="148" r="7"/><circle cx="236" cy="148" r="7"/><circle cx="266" cy="148" r="7"/>
          </g>
          <text x="180" y="204" text-anchor="middle" fill="#f8fafc" font-size="18" font-weight="900">${title}</text>
        </svg>`;
    }

    if (hall.id === "web" || hall.id === "frameworks") {
      return `
        <svg class="museum-art-svg" viewBox="0 0 360 220" aria-hidden="true">
          <rect x="46" y="38" width="268" height="148" rx="18" fill="#020617" stroke="${palette.main}" stroke-width="4"/>
          <rect x="66" y="58" width="228" height="28" rx="8" fill="rgba(148,163,184,0.12)" stroke="rgba(255,255,255,0.12)"/>
          <circle cx="180" cy="118" r="22" fill="${palette.dim}" stroke="${palette.second}" stroke-width="4"/>
          <circle cx="118" cy="152" r="16" fill="${palette.dim}" stroke="${palette.main}" stroke-width="4"/>
          <circle cx="242" cy="152" r="16" fill="${palette.dim}" stroke="${palette.main}" stroke-width="4"/>
          <path d="M180 140 V152 M166 132 L118 152 M194 132 L242 152" stroke="#e2e8f0" stroke-width="3"/>
          <text x="180" y="123" text-anchor="middle" fill="#f8fafc" font-size="15" font-weight="900">state</text>
          <text x="180" y="204" text-anchor="middle" fill="#f8fafc" font-size="18" font-weight="900">${title}</text>
        </svg>`;
    }

    if (hall.id === "c-systems") {
      return `
        <svg class="museum-art-svg" viewBox="0 0 360 220" aria-hidden="true">
          <rect x="38" y="40" width="284" height="142" rx="20" fill="#020617" stroke="${palette.main}" stroke-width="4"/>
          ${[0, 1, 2, 3].map((row) => [0, 1, 2, 3, 4].map((col) => `
            <rect x="${82 + col * 42}" y="${65 + row * 24}" width="28" height="16" rx="4"
                  fill="${(row + col) % 2 === 0 ? palette.dim : "rgba(148,163,184,0.12)"}"
                  stroke="${(row + col) % 2 === 0 ? palette.second : "rgba(255,255,255,0.16)"}"/>
          `).join("")).join("")}
          <path d="M82 164 H280" stroke="${palette.second}" stroke-width="5" stroke-linecap="round"/>
          <text x="180" y="204" text-anchor="middle" fill="#f8fafc" font-size="18" font-weight="900">${title}</text>
        </svg>`;
    }

    return `
      <svg class="museum-art-svg" viewBox="0 0 360 220" aria-hidden="true">
        <rect x="42" y="38" width="276" height="146" rx="24" fill="${palette.dim}" stroke="${palette.main}" stroke-width="4"/>
        <path d="M88 144 C112 74, 162 74, 180 116 C198 74, 248 74, 272 144" fill="none" stroke="${palette.second}" stroke-width="8" stroke-linecap="round"/>
        <rect x="120" y="82" width="120" height="72" rx="16" fill="#020617" stroke="${palette.main}" stroke-width="5"/>
        <text x="180" y="127" text-anchor="middle" fill="#f8fafc" font-size="24" font-weight="900">{ }</text>
        <text x="180" y="204" text-anchor="middle" fill="#f8fafc" font-size="18" font-weight="900">${title}</text>
      </svg>`;
  }

  function renderProgrammingMuseum() {
    const container = document.getElementById("programming-museum-content");
    if (!container) return;

    const stackLayerId = getMuseumStackLayerId();
    const stackLayerMuseum = PROGRAMMING_STACK_LAYER_MUSEUMS.find((layer) => layer.id === stackLayerId);
    const museumVideoEntries = getMuseumVideoEntries();
    if (stackLayerMuseum) {
      container.innerHTML = renderStackLayerMuseum(stackLayerMuseum);
      container.querySelectorAll("[data-stack-layer-room]").forEach((btn) => {
        btn.addEventListener("click", () => {
          scrollBasicsSection(`stack-layer-room-${btn.dataset.stackLayerRoom}`);
        });
      });
      bindMuseumVideoStudio(container, museumVideoEntries);
      return;
    }

    const hallNav = PROGRAMMING_LANGUAGE_MUSEUM_HALLS.map((hall, idx) => `
      <button class="museum-ticket" type="button" data-programming-museum-target="${esc(hall.id)}">
        <span>${String(idx + 1).padStart(2, "0")}</span>
        <strong>${esc(hall.title.replace(/^אולם \d+ —\s*/, ""))}</strong>
        <small>${esc(hall.period)}</small>
      </button>
    `).join("");

    const museumQuests = [
      {
        title: "מצא את המחיר של כל שכבה",
        text: "בכל אולם כתוב מה קיבלנו ומה איבדנו: מהירות, שליטה, בטיחות, נוחות או קיצור זמן פיתוח.",
      },
      {
        title: "עקוב אחרי רעיון אחד",
        text: "בחר רעיון כמו function, object או runtime ועקוב איך הוא משנה צורה לאורך האולמות.",
      },
      {
        title: "חבר לשאלה במאמן",
        text: "לפני שאלה קשה, חזור לאולם שמסביר את שכבת הידע הדרושה וכתוב במילים שלך מה המחשב באמת עושה.",
      },
    ];

    const hallById = new Map(PROGRAMMING_LANGUAGE_MUSEUM_HALLS.map((hall) => [hall.id, hall]));
    const shortHallTitle = (hall) => (hall?.title || "").replace(/^אולם \d+ —\s*/, "");
    const getFullStackDomain = (hall) => (
      FULL_STACK_DOMAIN_EXHIBITIONS[hall.id] || {
        era: "modern",
        profession: hall.layer,
        does: hall.summary,
        rooms: [],
      }
    );
    const exhibitCount = PROGRAMMING_LANGUAGE_MUSEUM_HALLS.reduce(
      (sum, hall) => sum + (hall.exhibits || []).length,
      0,
    );
    const fullStackArtifactCount = FULL_STACK_MUSEUM_HALLS.reduce(
      (sum, hall) => sum + (hall.artifacts || []).length,
      0,
    );
    const fullStackRoomCount = FULL_STACK_MUSEUM_HALLS.reduce(
      (sum, hall) => sum + getFullStackDomain(hall).rooms.length,
      0,
    );
    const fullStackCategoryCount = FULL_STACK_MUSEUM_HALLS.reduce(
      (sum, hall) => sum + getFullStackDomain(hall).rooms.reduce(
        (roomSum, room) => roomSum + (room.categories || []).length,
        0,
      ),
      0,
    );
    const fullStackVideoCount = FULL_STACK_MUSEUM_HALLS.length + fullStackRoomCount;
    const museumStats = [
      { value: PROGRAMMING_LANGUAGE_MUSEUM_HALLS.length + FULL_STACK_MUSEUM_HALLS.length, label: "אולמות" },
      { value: exhibitCount + fullStackArtifactCount, label: "מוצגים" },
      { value: museumVideoEntries.length, label: "סרטוני NotebookLM" },
      { value: MUSEUM_CONCEPT_CONNECTIONS.length, label: "כרטיסי קשר" },
      { value: PROGRAMMING_LANGUAGE_LINEAGES.length, label: "שושלות" },
    ];
    const fullStackMuseumStats = [
      { value: FULL_STACK_MUSEUM_HALLS.length, label: "אולמות Full-Stack" },
      { value: fullStackRoomCount, label: "חדרי תצוגה" },
      { value: fullStackCategoryCount, label: "קטגוריות" },
      { value: fullStackVideoCount, label: "סרטונים" },
    ];

    container.innerHTML = `
      <section class="museum-stage" id="programming-museum-gate">
        <div class="museum-stage-lines" aria-hidden="true"></div>
        <div class="museum-hero">
          <div class="museum-hero-copy">
            <span class="museum-kicker">חוויה עצמאית · היסטוריה · Full-Stack · מחשב אמיתי</span>
            <h2>מוזיאון שפות התכנות ו-Full-Stack</h2>
            <p>
              מסע מהטרנזיסטור ועד React, Node, API, Database ו-AI. לא רשימת תאריכים,
              אלא מוזיאון שמראה למה כל שכבה נולדה, מה היא פתרה, ומה חייבים להבין כדי לכתוב מוצר טוב.
            </p>
            <div class="museum-stat-strip" aria-label="נתוני המוזיאון">
              ${museumStats.map((stat) => `
                <div class="museum-stat">
                  <strong>${esc(stat.value)}</strong>
                  <span>${esc(stat.label)}</span>
                </div>
              `).join("")}
            </div>
            <div class="museum-actions">
              <button class="museum-primary-action" type="button" data-programming-museum-scroll="fullstack-museum-wing">כניסה למוזיאון Full-Stack</button>
              <button class="museum-secondary-action" type="button" data-programming-museum-scroll="programming-museum-halls">אולמות שפות התכנות</button>
              <button class="museum-secondary-action" type="button" data-programming-museum-scroll="programming-museum-stack">ראה איך הכול נבנה</button>
              <button class="museum-secondary-action" type="button" data-programming-museum-scroll="programming-museum-connection-system">מערכת הקשרים</button>
            </div>
          </div>
          <div class="museum-hero-installation" aria-hidden="true">
            <div class="museum-column"></div>
            <div class="museum-core">
              <span>0</span>
              <span>1</span>
              <strong>compiler</strong>
            </div>
            <div class="museum-column"></div>
          </div>
        </div>
        <div class="museum-ticket-row" role="list" aria-label="כרטיסי אולמות המוזיאון">
          ${hallNav}
        </div>
      </section>

      <section class="museum-section museum-stack-section" id="programming-museum-stack">
        <div class="museum-section-head">
          <span>01</span>
          <div>
            <h3>תרשים שכבות: איך מחשב הופך חשמל לאפליקציה</h3>
            <p>התלמיד רואה שכל מילה בקוד היא תרגום של שכבות: ביטים, כתובות, פקודות, runtime וכלי UI. לחיצה על כל בלוק פותחת מוזיאון נפרד בדף חדש.</p>
          </div>
        </div>
        <div class="museum-svg-panel">${renderMuseumStackSvg()}</div>
      </section>

      <section class="museum-section" id="programming-museum-timeline">
        <div class="museum-section-head">
          <span>02</span>
          <div>
            <h3>ציר זמן חי: מהטרנזיסטור ועד TypeScript</h3>
            <p>הציר מדגיש שהתקדמות בתכנות היא סדרה של שכבות שנבנו כדי להקל על בני אדם בלי לשבור את המכונה.</p>
          </div>
        </div>
        <div class="museum-svg-panel">${renderMuseumTimelineSvg()}</div>
      </section>

      <section class="museum-section" id="programming-museum-guided-routes">
        <div class="museum-section-head">
          <span>03</span>
          <div>
            <h3>מצב ביקור מודרך</h3>
            <p>שלושה מסלולים קבועים עוזרים להיכנס למוזיאון לפי מטרה: בסיס, מבחן או בניית Full-Stack.</p>
          </div>
        </div>
        <div class="museum-route-grid">
          ${PROGRAMMING_MUSEUM_GUIDED_ROUTES.map((route, idx) => {
            const stops = route.stops.map((id) => hallById.get(id)).filter(Boolean);
            const firstStop = stops[0];
            return `
              <article class="museum-route-card">
                <span>${String(idx + 1).padStart(2, "0")}</span>
                <div>
                  <h3>${esc(route.title)}</h3>
                  <p>${esc(route.subtitle)}</p>
                  <div class="museum-route-path">
                    ${stops.map((hall) => `
                      <button type="button" data-programming-museum-target="${esc(hall.id)}">${esc(shortHallTitle(hall))}</button>
                    `).join("<b>←</b>")}
                  </div>
                  ${firstStop ? `<button class="museum-route-start" type="button" data-programming-museum-target="${esc(firstStop.id)}">התחל כאן</button>` : ""}
                </div>
              </article>`;
          }).join("")}
        </div>
      </section>

      ${renderMuseumConnectionHub()}

      ${renderMuseumVideoStudioHub(museumVideoEntries, {
        id: "programming-museum-video-studio",
        number: "05",
        title: "מסמך NotebookLM חי לכל סרטוני המוזיאון",
        intro: "כל 63 הסרטונים נפתחים בחלון מלא בתוך דף המוזיאון: חומר רקע, ידע מקדים, סקריפט, פרומפט והוראות בחירה ב-NotebookLM.",
      })}

      <section class="museum-section fullstack-museum-wing" id="fullstack-museum-wing">
        <div class="museum-section-head">
          <span>06</span>
          <div>
            <h3>מוזיאון Full-Stack: ממסך חי למערכת שעובדת באמת</h3>
            <p>אגף ייחודי שמראה למה כל שכבה נולדה, מה היא פתרה, ולאן היא התפתחה בתוך מוצר אמיתי.</p>
          </div>
        </div>
        <div class="fullstack-museum-hero">
          <div>
            <span class="fullstack-kicker">Client · Network · Server · Data · Quality</span>
            <h3>שרשרת אחת, הרבה שכבות</h3>
            <p>
              Full-Stack לא מתחיל ב-React ולא נגמר במסד נתונים. הוא מתחיל בפעולה של משתמש,
              עובר דרך חוזה HTTP, מגיע לשרת, נשמר כמידע, וחוזר למסך בצורה שאפשר לבדוק.
            </p>
            <div class="fullstack-stat-grid">
              ${fullStackMuseumStats.map((stat) => `
                <div>
                  <strong>${esc(stat.value)}</strong>
                  <span>${esc(stat.label)}</span>
                </div>
              `).join("")}
            </div>
            <div class="museum-actions">
              <button class="museum-primary-action" type="button" data-programming-museum-scroll="fullstack-museum-halls">כניסה לאולמות Full-Stack</button>
              <button class="museum-secondary-action" type="button" data-programming-museum-scroll="programming-museum-halls">השווה למוזיאון השפות</button>
            </div>
          </div>
          <div class="fullstack-map-panel">${renderFullStackMuseumSvg()}</div>
        </div>
        <div class="fullstack-hall-grid" id="fullstack-museum-halls">
          ${FULL_STACK_MUSEUM_HALLS.map((hall, idx) => {
            const domain = getFullStackDomain(hall);
            return `
            <article class="fullstack-hall-card fullstack-era-${esc(domain.era)}" id="fullstack-museum-hall-${esc(hall.id)}" data-era="${esc(domain.era)}">
              <div class="fullstack-hall-top">
                <span>${String(idx + 1).padStart(2, "0")}</span>
                <strong>${esc(hall.layer)}</strong>
                <em>${esc(FULL_STACK_ERA_LABELS[domain.era] || "תחום")}</em>
              </div>
              <h3>${esc(hall.title)}</h3>
              <p class="fullstack-summary">${esc(hall.summary)}</p>
              <div class="fullstack-domain-banner">
                <span>${esc(domain.profession)}</span>
                <p>${esc(domain.does)}</p>
              </div>
              <div class="fullstack-evolution-strip">
                <div>
                  <span>התפתח מ</span>
                  <strong>${esc(hall.evolvedFrom)}</strong>
                </div>
                <div>
                  <span>לאן התפתח</span>
                  <strong>${esc(hall.evolvedTo)}</strong>
                </div>
              </div>
              <div class="fullstack-room-museum">
                <div class="fullstack-room-head">
                  <span>אולמות תצוגה פנימיים</span>
                  <strong>${esc(domain.rooms.length)} חדרים בתחום</strong>
                </div>
                <div class="fullstack-room-grid">
                  ${domain.rooms.map((room, roomIdx) => `
                    <article class="fullstack-room-card fullstack-era-${esc(room.era)}" id="fullstack-room-${esc(hall.id)}-${esc(room.id)}" data-era="${esc(room.era)}">
                      <div class="fullstack-room-top">
                        <span>${String(roomIdx + 1).padStart(2, "0")}</span>
                        <strong>${esc(FULL_STACK_ERA_LABELS[room.era] || "תצוגה")}</strong>
                      </div>
                      <h4>${esc(room.title)}</h4>
                      <p class="fullstack-room-what">${esc(room.what)}</p>
                      <div class="fullstack-room-diagram" aria-label="תרשים זרימת החדר">
                        ${(room.diagram || []).map((step) => `<span>${esc(step)}</span>`).join("<b>←</b>")}
                      </div>
                      <div class="fullstack-room-category-grid">
                        ${(room.categories || []).map((category) => `
                          <div>
                            <h5>${esc(category.name)}</h5>
                            <ul>
                              ${(category.items || []).map((item) => `<li>${esc(item)}</li>`).join("")}
                            </ul>
                          </div>
                        `).join("")}
                      </div>
                      <p class="fullstack-room-experience">${esc(room.experience)}</p>
                      <div class="fullstack-room-video">
                        <div class="fullstack-room-video-screen" aria-hidden="true">
                          <span>▶</span>
                          <strong>${esc(room.video.title)}</strong>
                        </div>
                        <dl>
                          <div>
                            <dt>ידע מקדים</dt>
                            <dd>${esc(room.video.prerequisite)}</dd>
                          </div>
                          <div>
                            <dt>Prompt לסרטון</dt>
                            <dd>${esc(room.video.prompt)}</dd>
                          </div>
                        </dl>
                        ${renderMuseumVideoOpenButton(`fullstack-room-${hall.id}-${room.id}`)}
                      </div>
                    </article>
                  `).join("")}
                </div>
              </div>
              <div class="fullstack-why-grid">
                <div>
                  <span>למה הומצא</span>
                  <p>${esc(hall.inventedBecause)}</p>
                </div>
                <div>
                  <span>מה פתר</span>
                  <p>${esc(hall.solved)}</p>
                </div>
              </div>
              <div class="fullstack-artifacts" aria-label="מוצגי האולם">
                ${(hall.artifacts || []).map((artifact) => `<span>${esc(artifact)}</span>`).join("")}
              </div>
              <p class="fullstack-experience">${esc(hall.experience)}</p>
              <div class="fullstack-video-card">
                <div class="fullstack-video-screen" aria-hidden="true">
                  <span>▶</span>
                  <strong>${esc(hall.video.title)}</strong>
                </div>
                <dl>
                  <div>
                    <dt>ידע מקדים לסרטון</dt>
                    <dd>${esc(hall.video.prerequisite)}</dd>
                  </div>
                  <div>
                    <dt>Prompt לסרטון</dt>
                    <dd>${esc(hall.video.prompt)}</dd>
                  </div>
                </dl>
                ${renderMuseumVideoOpenButton(`fullstack-hall-${hall.id}`)}
              </div>
            </article>
          `;
          }).join("")}
        </div>
      </section>

      <section class="museum-section" id="programming-museum-halls">
        <div class="museum-section-head">
          <span>07</span>
          <div>
            <h3>אולמות המוזיאון</h3>
            <p>כל אולם הוא תחנת למידה: פריצת דרך, אבני בניין, והחיבור לשאלות שהתלמיד יפגוש בפורטל.</p>
          </div>
        </div>
        <div class="museum-hall-grid">
          ${PROGRAMMING_LANGUAGE_MUSEUM_HALLS.map((hall, idx) => `
            <article class="museum-hall-card" id="programming-museum-hall-${esc(hall.id)}">
              <div class="museum-art-frame">${renderMuseumHallIllustration(hall, idx)}</div>
              <div class="museum-hall-copy">
                <div class="museum-hall-meta">
                  <span>${String(idx + 1).padStart(2, "0")}</span>
                  <strong>${esc(hall.period)}</strong>
                </div>
                <h3>${esc(hall.title)}</h3>
                <p class="museum-thesis">${esc(hall.thesis)}</p>
                <p class="museum-visit">${esc(hall.visit)}</p>
                <div class="museum-hall-insights">
                  <div><span>ערך</span><strong>${esc(hall.value)}</strong></div>
                  <div><span>מחיר</span><strong>${esc(hall.tradeoff)}</strong></div>
                  <div><span>מוצג</span><strong>${esc(hall.artifact)}</strong></div>
                  <div><span>לקורס</span><strong>${esc(hall.courseLink)}</strong></div>
                </div>
                <div class="museum-submuseum-panel">
                  <div class="museum-submuseum-head">
                    <span>תתי מוזיאונים</span>
                    <strong>${esc(shortHallTitle(hall))}</strong>
                  </div>
                  <div class="museum-submuseum-grid">
                    ${(hall.subMuseums || []).map((subMuseum, subIdx) => `
                      <article class="museum-submuseum-card">
                        <span>${String(subIdx + 1).padStart(2, "0")}</span>
                        <div>
                          <h4>${esc(subMuseum.title)}</h4>
                          <p>${esc(subMuseum.focus)}</p>
                          <dl>
                            <div>
                              <dt>לאן התפתח</dt>
                              <dd>${esc(subMuseum.evolvedTo)}</dd>
                            </div>
                            <div>
                              <dt>חוויה מתאימה</dt>
                              <dd>${esc(subMuseum.experience)}</dd>
                            </div>
                          </dl>
                        </div>
                      </article>
                    `).join("")}
                  </div>
                </div>
                <div class="museum-exhibit-table">
                  ${hall.exhibits.map((exhibit) => `
                    <div class="museum-exhibit-row">
                      <time>${esc(exhibit.year)}</time>
                      <div>
                        <h4>${esc(exhibit.name)}</h4>
                        <p><strong>נבנה מ:</strong> ${esc(exhibit.builtFrom)}</p>
                        <p><strong>פריצת דרך:</strong> ${esc(exhibit.breakthrough)}</p>
                        <p><strong>חיבור לקוד:</strong> ${esc(exhibit.connects)}</p>
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="museum-section" id="programming-museum-value-map">
        <div class="museum-section-head">
          <span>08</span>
          <div>
            <h3>מפת ערך: מה כל משפחת שפות קונה ומה היא עולה</h3>
            <p>המפה מחברת אולמות לפשרה המרכזית שלהם: שליטה, קריאות, בטיחות, ניידות או מהירות פיתוח.</p>
          </div>
        </div>
        <div class="museum-value-grid">
          ${PROGRAMMING_MUSEUM_VALUE_MAP.map((item) => `
            <article class="museum-value-card">
              <h3>${esc(item.family)}</h3>
              <div class="museum-value-halls">
                ${item.halls.map((id) => hallById.get(id)).filter(Boolean).map((hall) => `
                  <button type="button" data-programming-museum-target="${esc(hall.id)}">${esc(shortHallTitle(hall))}</button>
                `).join("")}
              </div>
              <p>${esc(item.tradeoff)}</p>
              <strong>${esc(item.focus)}</strong>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="museum-section" id="programming-museum-lineages">
        <div class="museum-section-head">
          <span>09</span>
          <div>
            <h3>שושלות רעיונות</h3>
            <p>אותו רעיון עובר בין שפות, מחליף שם, ומשנה פשרה. זה החיבור שמונע לימוד מנותק של טכנולוגיות.</p>
          </div>
        </div>
        <div class="museum-lineage-grid">
          ${PROGRAMMING_LANGUAGE_LINEAGES.map((lineage) => `
            <article class="museum-lineage-card">
              <h3>${esc(lineage.title)}</h3>
              <div class="museum-lineage-path">${lineage.path.map((step) => `<span>${esc(step)}</span>`).join("<b>←</b>")}</div>
              <p>${esc(lineage.lesson)}</p>
              <strong>${esc(lineage.today)}</strong>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="museum-section" id="programming-museum-quests">
        <div class="museum-section-head">
          <span>10</span>
          <div>
            <h3>משימות ביקור לתלמיד</h3>
            <p>החוויה לא נועדה רק לצפייה. היא מכוונת את התלמיד לחבר היסטוריה, יעילות וקוד בפועל.</p>
          </div>
        </div>
        <div class="museum-quest-grid">
          ${museumQuests.map((quest, idx) => `
            <article class="museum-quest">
              <span>${idx + 1}</span>
              <div>
                <h3>${esc(quest.title)}</h3>
                <p>${esc(quest.text)}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </section>

      ${renderMuseumVideoModalShell()}`;

    container.querySelectorAll("[data-programming-museum-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        scrollBasicsSection(`programming-museum-hall-${btn.dataset.programmingMuseumTarget}`);
      });
    });

    container.querySelectorAll("[data-programming-museum-scroll]").forEach((btn) => {
      btn.addEventListener("click", () => {
        scrollBasicsSection(btn.dataset.programmingMuseumScroll);
      });
    });
  }

  function openProgrammingBasics() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🧱 אבני הבסיס של התכנות";
    currentLessonDesc.textContent =
      "הבסיס שממנו נבנים תנאים, מערכים, פונקציות, קומפוננטות ואפליקציות. קודם מבינים את האבנים, ואז את המבנים.";
    if (programmingBasicsView) programmingBasicsView.style.display = "block";
    openProgrammingBasicsBtn?.classList.add("active");
    renderProgrammingBasics();
    setProgrammingBasicsContextTree();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function openProgrammingPrinciples() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🧭 עקרונות היסוד של תכנות טוב";
    currentLessonDesc.textContent =
      "דטרמיניסטיות, קלט/פלט, state, בדיקות, חוזים, שגיאות, security, accessibility ושאר העקרונות שהופכים syntax לקוד אמין.";
    if (programmingPrinciplesView) programmingPrinciplesView.style.display = "block";
    openProgrammingPrinciplesBtn?.classList.add("active");
    renderProgrammingPrinciples();
    setProgrammingPrinciplesContextTree();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function openProgrammingMuseum() {
    hideAllViews();
    currentLessonId = null;
    const stackLayerId = getMuseumStackLayerId();
    const stackLayerMuseum = PROGRAMMING_STACK_LAYER_MUSEUMS.find((layer) => layer.id === stackLayerId);
    currentLessonTitle.textContent = stackLayerMuseum ? `🏛️ ${stackLayerMuseum.title}` : "🏛️ מוזיאון שפות התכנות";
    currentLessonDesc.textContent = stackLayerMuseum
      ? `מוזיאון נפרד לבלוק ${stackLayerMuseum.blockTitle}: למה השכבה נוצרה, מה היא פתרה ולאן היא התפתחה.`
      : "מסע חזותי מהחשמל והטרנזיסטור ועד שפות, runtimes ו-frameworks. המטרה: להבין למה הטכנולוגיות נבנו ומה המחיר של כל שכבה.";
    if (programmingMuseumView) programmingMuseumView.style.display = "block";
    openProgrammingMuseumBtn?.classList.add("active");
    renderProgrammingMuseum();
    setProgrammingMuseumContextTree();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  const LEARNING_EVIDENCE_KEY = "lumenportal:learningEvidence:v1";
  const LEARNING_EVIDENCE_INSTALL_KEY = "lumenportal:learningEvidenceInstall:v1";
  let learningEvidenceState = null;

  function learningEvidenceCore() {
    return window.LUMEN_CORE && window.LUMEN_CORE.learningEvidence
      ? window.LUMEN_CORE.learningEvidence
      : null;
  }

  function getLearningEvidenceInstallKey(timestamp = Date.now()) {
    const core = learningEvidenceCore();
    if (!core) return "";
    try {
      const stored = JSON.parse(localStorage.getItem(LEARNING_EVIDENCE_INSTALL_KEY) || "null");
      if (stored && stored.installKey) return stored.installKey;
    } catch (_) {}

    const firstSeen = new Date(timestamp).toISOString();
    const installKey = core.makeInstallKey({
      firstSeen,
      origin: window.location && window.location.origin ? window.location.origin : "local",
    });
    try {
      localStorage.setItem(LEARNING_EVIDENCE_INSTALL_KEY, JSON.stringify({ firstSeen, installKey }));
    } catch (_) {}
    return installKey;
  }

  function loadLearningEvidenceState() {
    const core = learningEvidenceCore();
    if (!core) return { version: 1, installKey: "", events: [] };
    if (learningEvidenceState) return learningEvidenceState;
    try {
      const parsed = JSON.parse(localStorage.getItem(LEARNING_EVIDENCE_KEY) || "null");
      learningEvidenceState = parsed && typeof parsed === "object"
        ? {
            ...core.emptyLearningEvidenceState(),
            ...parsed,
            events: Array.isArray(parsed.events) ? parsed.events : [],
          }
        : core.emptyLearningEvidenceState();
    } catch (_) {
      learningEvidenceState = core.emptyLearningEvidenceState();
    }
    return learningEvidenceState;
  }

  function saveLearningEvidenceState() {
    try { localStorage.setItem(LEARNING_EVIDENCE_KEY, JSON.stringify(learningEvidenceState || { events: [] })); } catch (_) {}
  }

  function conceptEvidencePayload(lessonId, conceptName, concept = {}) {
    const meta = getTopicForLesson(lessonId);
    return {
      lessonId,
      conceptName: conceptName || concept.conceptName || "",
      conceptKey: lessonId && (conceptName || concept.conceptName)
        ? `${lessonId}::${conceptName || concept.conceptName}`
        : "",
      topic: meta.topic,
      subtopic: meta.subtopic,
    };
  }

  function recordLearningEvidence(type, payload = {}) {
    const core = learningEvidenceCore();
    if (!core) return null;
    const timestamp = payload.timestamp || Date.now();
    const state = loadLearningEvidenceState();
    const installKey = state.installKey || getLearningEvidenceInstallKey(timestamp);
    const normalized = core.normalizeLearningEvent({
      ...payload,
      type,
      timestamp,
      sessionId: core.makeSessionId({ installKey, timestamp }),
    });
    learningEvidenceState = core.appendLearningEvent(
      { ...state, installKey },
      normalized,
      { maxEvents: 1200 },
    );
    saveLearningEvidenceState();
    return normalized;
  }

  function renderLearningEvidence() {
    const container = document.getElementById("learning-evidence-content");
    const core = learningEvidenceCore();
    if (!container || !core) return;
    const state = loadLearningEvidenceState();
    const summary = core.summarizeLearningEvidence(state, { now: Date.now(), topN: 10 });
    const statCards = [
      { label: "אירועים", value: summary.totalEvents, hint: "כל פעולת למידה שנרשמה מקומית" },
      { label: "תשובות", value: summary.answers, hint: `${summary.correct} נכונות · ${summary.wrong} שגויות` },
      { label: "דיוק", value: `${summary.accuracyPct}%`, hint: "נכון מתוך כל התשובות שנרשמו" },
      { label: "תיקוני טעות", value: summary.remediations, hint: "הסבר/אסוציאציה אחרי טעות" },
      { label: "חזרות", value: summary.reviews + summary.flashcards, hint: "כרטיסיות וחזרות SRS" },
      { label: "ימי פעילות", value: summary.activeDays, hint: `${summary.last7Days} אירועים ב-7 ימים` },
    ];

    const funnelsHtml = summary.conceptFunnels.length
      ? summary.conceptFunnels.map((item) => {
          const accuracy = item.answers ? Math.round((item.correct / item.answers) * 100) : 0;
          const lastSeen = item.lastSeen ? new Date(item.lastSeen).toLocaleString("he-IL") : "לא ידוע";
          return `
            <article class="le-funnel-row">
              <div>
                <h3>${esc(item.conceptName)}</h3>
                <p>${esc(item.topic || "ללא נושא")} · ${esc(item.lessonId || "")} · נראה לאחרונה: ${esc(lastSeen)}</p>
              </div>
              <div class="le-funnel-metrics">
                <span>👁️ ${item.views}</span>
                <span>✍️ ${item.answers}</span>
                <span>✅ ${item.correct}</span>
                <span>❌ ${item.wrong}</span>
                <span>🩹 ${item.remediations}</span>
                <span>🔁 ${item.reviews}</span>
              </div>
              <div class="le-funnel-bar" aria-label="דיוק ${accuracy}%">
                <i style="width:${Math.max(2, accuracy)}%"></i>
              </div>
            </article>`;
        }).join("")
      : `<div class="le-empty">עדיין אין funnel לפי מושג. ענה על שאלה או דרג כרטיסייה כדי להתחיל לצבור ראיות.</div>`;

    const maxDay = Math.max(1, ...summary.days.map((item) => item.count));
    const daysHtml = summary.days.length
      ? summary.days.slice(-14).map((item) => `
          <div class="le-day-row">
            <span>${esc(item.day)}</span>
            <div class="le-day-bar"><i style="width:${Math.max(3, Math.round((item.count / maxDay) * 100))}%"></i></div>
            <strong>${item.count}</strong>
          </div>
        `).join("")
      : `<div class="le-empty">אין עדיין היסטוריית ימים.</div>`;

    container.innerHTML = `
      <section class="le-section" id="le-kpis">
        <div class="le-grid">
          ${statCards.map((card) => `
            <article class="le-card">
              <span>${esc(card.label)}</span>
              <strong>${esc(card.value)}</strong>
              <p>${esc(card.hint)}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="le-section" id="le-funnels">
        <div class="le-section-head">
          <h2>Funnels לפי מושג</h2>
          <p>כאן רואים איפה התלמיד רק צפה, איפה ענה, איפה טעה, ואיפה קיבל תיקון.</p>
        </div>
        <div class="le-funnel-list">${funnelsHtml}</div>
      </section>

      <section class="le-section" id="le-days">
        <div class="le-section-head">
          <h2>פעילות לפי ימים</h2>
          <p>ספירת אירועי למידה מקומית. זה בסיס ל-D1/D7/D30 בלי לשלוח מידע החוצה.</p>
        </div>
        <div class="le-day-list">${daysHtml}</div>
      </section>

      <section class="le-section le-policy" id="le-policy">
        <h2>מדיניות פרטיות מקומית</h2>
        <p>
          ראיות הלמידה נשמרות ב-localStorage בלבד. לא נשמר טקסט חופשי של תשובות, לא שם תלמיד,
          ולא מידע מזהה. מזהה ההתקנה נוצר מ-hash דטרמיניסטי של זמן ההתקנה וה-origin המקומי, ללא randomness.
        </p>
      </section>`;
  }

  function downloadLearningEvidenceFile(filename, body, type) {
    const blob = new Blob([body], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 0);
  }

  function learningEvidenceExportDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function learningEvidenceAppVersion() {
    return (window.QUESTIONS_BANK && window.QUESTIONS_BANK._version)
      || (window.CONTENT_LOADER_STATUS && window.CONTENT_LOADER_STATUS.version)
      || "local-static";
  }

  function exportLearningEvidenceJson() {
    const core = learningEvidenceCore();
    if (!core || !core.anonymizedLearningEvidenceExport) {
      alert("מודול ראיות הלמידה עדיין לא נטען.");
      return;
    }
    const data = core.anonymizedLearningEvidenceExport(loadLearningEvidenceState(), {
      now: Date.now(),
      appVersion: learningEvidenceAppVersion(),
    });
    downloadLearningEvidenceFile(
      `lumen-learning-evidence-${learningEvidenceExportDate()}.json`,
      JSON.stringify(data, null, 2),
      "application/json;charset=utf-8",
    );
  }

  function exportLearningEvidenceReport() {
    const core = learningEvidenceCore();
    if (!core || !core.buildLearningEvidenceMarkdownReport) {
      alert("מודול הדוחות עדיין לא נטען.");
      return;
    }
    const report = core.buildLearningEvidenceMarkdownReport(loadLearningEvidenceState(), {
      now: Date.now(),
      title: "LumenPortal Learning Evidence Weekly Report",
      topN: 12,
    });
    downloadLearningEvidenceFile(
      `lumen-learning-evidence-report-${learningEvidenceExportDate()}.md`,
      report,
      "text/markdown;charset=utf-8",
    );
  }

  function openLearningEvidence() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "📈 ראיות למידה";
    currentLessonDesc.textContent =
      "מדדי למידה מקומיים שמראים אם התלמיד באמת מתקדם: תשובות, טעויות, remediation, חזרות ו-funnels לפי מושג.";
    if (learningEvidenceView) learningEvidenceView.style.display = "block";
    openLearningEvidenceBtn?.classList.add("active");
    recordLearningEvidence("view", { source: "learning-evidence" });
    renderLearningEvidence();
    setLearningEvidenceContextTree();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function capstoneProjects() {
    return Array.isArray(window.CAPSTONE_PROJECTS) ? window.CAPSTONE_PROJECTS : [];
  }

  function renderCapstoneList(items, ordered = false) {
    const tag = ordered ? "ol" : "ul";
    const list = (items || []).map((item) => `<li>${esc(item)}</li>`).join("");
    return `<${tag} class="capstone-list">${list}</${tag}>`;
  }

  function renderCapstonePills(items, className = "capstone-pill") {
    return (items || []).map((item) => `<span class="${className}">${esc(item)}</span>`).join("");
  }

  function renderCapstoneConceptLinks(project) {
    const links = (project.conceptKeys || []).map((key) => {
      const ref = findConceptByKeyLoose(key);
      if (!ref) {
        return `<span class="capstone-concept missing">${esc(splitGraphConceptKey(key).conceptName || key)}</span>`;
      }
      return `
        <button type="button" class="capstone-concept" data-capstone-concept="${esc(key)}">
          <strong>${esc(ref.concept.conceptName)}</strong>
          <small>${esc(ref.lesson.title)}</small>
        </button>
      `;
    }).join("");
    return links || `<span class="capstone-empty">אין עדיין קישורי מושגים.</span>`;
  }

  function renderCapstones() {
    const container = document.getElementById("capstones-container");
    const stats = document.getElementById("capstones-header-stats");
    const projects = capstoneProjects();
    if (!container) return;

    const rubricItems = projects.reduce(
      (sum, project) =>
        sum +
        (project.requirements || []).length +
        (project.edgeCases || []).length +
        (project.tests || []).length +
        (project.reviewChecklist || []).length,
      0,
    );
    const conceptLinks = projects.reduce((sum, project) => sum + (project.conceptKeys || []).length, 0);

    if (stats) {
      stats.innerHTML = `
        <span><strong>${projects.length}</strong> פרויקטים</span>
        <span><strong>${rubricItems}</strong> סעיפי rubric</span>
        <span><strong>${conceptLinks}</strong> קישורי מושגים</span>
      `;
    }

    if (!projects.length) {
      container.innerHTML = `<div class="capstone-empty glass-panel">לא נמצאו פרויקטי capstone.</div>`;
      return;
    }

    container.innerHTML = projects.map((project, index) => `
      <article class="capstone-card glass-panel" id="capstone-${esc(project.id)}">
        <div class="capstone-card-head">
          <div>
            <span class="capstone-index">${String(index + 1).padStart(2, "0")}</span>
            <h3>${esc(project.title)}</h3>
            <p>${esc(project.subtitle)}</p>
          </div>
          <span class="capstone-level">${esc(project.level)}</span>
        </div>

        <p class="capstone-goal" id="capstone-${esc(project.id)}-goal">${esc(project.goal)}</p>

        <div class="capstone-stack" aria-label="טכנולוגיות">${renderCapstonePills(project.stack || [])}</div>

        <section class="capstone-concept-links" id="capstone-${esc(project.id)}-concepts">
          <h4>מושגים שכדאי לפתוח לפני שמתחילים</h4>
          <div>${renderCapstoneConceptLinks(project)}</div>
        </section>

        <div class="capstone-grid">
          <section id="capstone-${esc(project.id)}-milestones">
            <h4>אבני דרך</h4>
            ${renderCapstoneList(project.milestones, true)}
          </section>
          <section id="capstone-${esc(project.id)}-requirements">
            <h4>דרישות חובה</h4>
            ${renderCapstoneList(project.requirements)}
          </section>
          <section id="capstone-${esc(project.id)}-edge-cases">
            <h4>מקרי קצה</h4>
            ${renderCapstoneList(project.edgeCases)}
          </section>
          <section id="capstone-${esc(project.id)}-tests">
            <h4>בדיקות</h4>
            ${renderCapstoneList(project.tests)}
          </section>
          <section class="wide" id="capstone-${esc(project.id)}-review">
            <h4>Code Review Checklist</h4>
            ${renderCapstoneList(project.reviewChecklist)}
          </section>
        </div>

        <div class="capstone-footer" id="capstone-${esc(project.id)}-deliverables">
          <div>
            <strong>Deliverables</strong>
            <div class="capstone-stack">${renderCapstonePills(project.deliverables || [], "capstone-pill muted")}</div>
          </div>
          <div>
            <strong>הרחבה אחרי MVP</strong>
            <p>${esc(project.extension)}</p>
          </div>
        </div>
      </article>
    `).join("");

    container.querySelectorAll("[data-capstone-concept]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-capstone-concept");
        const ref = findConceptByKeyLoose(key);
        if (ref) openLessonConcept(ref.lesson.id, ref.concept.conceptName);
      });
    });
  }

  function setCapstonesContextTree() {
    setContextTree(
      "פרויקטי גמר",
      capstoneProjects().map((project) => ({
        id: project.id,
        label: project.title,
        meta: project.level,
        open: false,
        action: () => scrollBasicsSection(`capstone-${project.id}`),
        children: [
          {
            id: `${project.id}-concepts`,
            label: "מושגים מקדימים",
            meta: `${(project.conceptKeys || []).length}`,
            action: () => scrollBasicsSection(`capstone-${project.id}-concepts`),
          },
          {
            id: `${project.id}-milestones`,
            label: "אבני דרך",
            meta: `${(project.milestones || []).length}`,
            action: () => scrollBasicsSection(`capstone-${project.id}-milestones`),
          },
          {
            id: `${project.id}-requirements`,
            label: "דרישות",
            meta: `${(project.requirements || []).length}`,
            action: () => scrollBasicsSection(`capstone-${project.id}-requirements`),
          },
          {
            id: `${project.id}-edge-cases`,
            label: "מקרי קצה",
            meta: `${(project.edgeCases || []).length}`,
            action: () => scrollBasicsSection(`capstone-${project.id}-edge-cases`),
          },
          {
            id: `${project.id}-tests`,
            label: "בדיקות",
            meta: `${(project.tests || []).length}`,
            action: () => scrollBasicsSection(`capstone-${project.id}-tests`),
          },
          {
            id: `${project.id}-review`,
            label: "Code Review",
            meta: `${(project.reviewChecklist || []).length}`,
            action: () => scrollBasicsSection(`capstone-${project.id}-review`),
          },
        ],
      })),
      { key: "capstones" },
    );
  }

  function openCapstones() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🏗️ פרויקטי גמר";
    currentLessonDesc.textContent =
      "מסלול פרויקטים שמחבר מושגים לדרישות מוצר, מקרי קצה, בדיקות ו-code review אמיתי.";
    if (capstonesView) capstonesView.style.display = "block";
    openCapstonesBtn?.classList.add("active");
    recordLearningEvidence("view", { source: "capstones" });
    renderCapstones();
    setCapstonesContextTree();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function courseBlueprints() {
    return Array.isArray(window.COURSE_BLUEPRINTS) ? window.COURSE_BLUEPRINTS : [];
  }

  function blueprintStatusLabel(status) {
    if (status === "covered") return "מכוסה";
    if (status === "partial") return "חלקי";
    if (status === "gap") return "פער";
    return "לא ידוע";
  }

  function renderBlueprintLessonLinks(module) {
    const buttons = (module.lessonIds || []).map((lessonId) => {
      const lesson = (window.LESSONS_DATA || []).find((item) => item.id === lessonId);
      if (!lesson) return `<span class="blueprint-link missing">${esc(lessonId)}</span>`;
      return `
        <button type="button" class="blueprint-link" data-blueprint-lesson="${esc(lesson.id)}">
          ${esc(lesson.title)}
        </button>
      `;
    }).join("");
    return buttons || `<span class="blueprint-empty">אין שיעור מלא בפורטל עדיין.</span>`;
  }

  function renderBlueprintConceptLinks(module) {
    const links = (module.conceptKeys || []).map((key) => {
      const ref = findConceptByKeyLoose(key);
      if (!ref) return `<span class="blueprint-concept missing">${esc(splitGraphConceptKey(key).conceptName || key)}</span>`;
      return `
        <button type="button" class="blueprint-concept" data-blueprint-concept="${esc(key)}">
          ${esc(ref.concept.conceptName)}
        </button>
      `;
    }).join("");
    return links || `<span class="blueprint-empty">מיפוי ברמת שיעור בלבד.</span>`;
  }

  function renderBlueprintSources(blueprint) {
    return (blueprint.sources || []).map((source) => `
      <a class="blueprint-source" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">
        ${esc(source.label)}
        <small>${esc(source.retrieved)}</small>
      </a>
    `).join("");
  }

  function renderBlueprints() {
    const container = document.getElementById("blueprints-container");
    const stats = document.getElementById("blueprints-header-stats");
    const blueprints = courseBlueprints();
    if (!container) return;

    const moduleCount = blueprints.reduce((sum, blueprint) => sum + (blueprint.modules || []).length, 0);
    const gapCount = blueprints.reduce(
      (sum, blueprint) => sum + (blueprint.modules || []).filter((module) => module.status === "gap").length,
      0,
    );
    const sourceCount = blueprints.reduce((sum, blueprint) => sum + (blueprint.sources || []).length, 0);

    if (stats) {
      stats.innerHTML = `
        <span><strong>${blueprints.length}</strong> מסלולים</span>
        <span><strong>${moduleCount}</strong> מודולים</span>
        <span><strong>${gapCount}</strong> פערים</span>
        <span><strong>${sourceCount}</strong> מקורות</span>
      `;
    }

    if (!blueprints.length) {
      container.innerHTML = `<div class="blueprint-empty glass-panel">לא נמצאו blueprints.</div>`;
      return;
    }

    container.innerHTML = blueprints.map((blueprint) => {
      const covered = (blueprint.modules || []).filter((module) => module.status === "covered").length;
      const total = (blueprint.modules || []).length || 1;
      const coverage = Math.round((covered / total) * 100);
      return `
        <article class="blueprint-card glass-panel" id="blueprint-${esc(blueprint.id)}">
          <div class="blueprint-card-head">
            <div>
              <span class="blueprint-provider">${esc(blueprint.provider)}</span>
              <h3>${esc(blueprint.title)}</h3>
              <p>${esc(blueprint.audience)}</p>
            </div>
            <div class="blueprint-score">
              <strong>${coverage}%</strong>
              <span>כיסוי מלא</span>
            </div>
          </div>

          <div class="blueprint-sources" id="blueprint-${esc(blueprint.id)}-sources">
            ${renderBlueprintSources(blueprint)}
          </div>

          <div class="blueprint-modules">
            ${(blueprint.modules || []).map((module, index) => `
              <section class="blueprint-module ${esc(module.status)}" id="blueprint-${esc(blueprint.id)}-module-${index + 1}">
                <div class="blueprint-module-head">
                  <h4>${esc(module.title)}</h4>
                  <span class="blueprint-status">${blueprintStatusLabel(module.status)}</span>
                </div>
                <p>${esc(module.examFocus)}</p>
                <div class="blueprint-links" aria-label="שיעורים בפורטל">
                  ${renderBlueprintLessonLinks(module)}
                </div>
                <div class="blueprint-concepts" aria-label="מושגים מרכזיים">
                  ${renderBlueprintConceptLinks(module)}
                </div>
              </section>
            `).join("")}
          </div>

          <div class="blueprint-bottom">
            <section>
              <h4>פרויקטים מתאימים</h4>
              <div class="blueprint-pills">
                ${(blueprint.capstoneLinks || []).map((capstoneId) => {
                  const capstone = capstoneProjects().find((item) => item.id === capstoneId);
                  const label = capstone?.title || capstoneId;
                  return `<span>${esc(label)}</span>`;
                }).join("")}
              </div>
            </section>
            <section>
              <h4>מבחנים לתרגול</h4>
              <div class="blueprint-pills">${(blueprint.mockExamTags || []).map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
            </section>
            <section class="wide">
              <h4>מה חסר לסגירה מלאה</h4>
              <ul>${(blueprint.recommendedNext || []).map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
            </section>
          </div>
        </article>
      `;
    }).join("");

    container.querySelectorAll("[data-blueprint-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => openLesson(btn.getAttribute("data-blueprint-lesson")));
    });
    container.querySelectorAll("[data-blueprint-concept]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-blueprint-concept");
        const ref = findConceptByKeyLoose(key);
        if (ref) openLessonConcept(ref.lesson.id, ref.concept.conceptName);
      });
    });
  }

  function setBlueprintsContextTree() {
    setContextTree(
      "יישור קורסים",
      courseBlueprints().map((blueprint) => ({
        id: blueprint.id,
        label: blueprint.provider,
        meta: `${(blueprint.modules || []).length}`,
        open: false,
        action: () => scrollBasicsSection(`blueprint-${blueprint.id}`),
        children: [
          {
            id: `${blueprint.id}-sources`,
            label: "מקורות",
            meta: `${(blueprint.sources || []).length}`,
            action: () => scrollBasicsSection(`blueprint-${blueprint.id}-sources`),
          },
          ...(blueprint.modules || []).map((module, index) => ({
            id: `${blueprint.id}-module-${index + 1}`,
            label: module.title,
            meta: blueprintStatusLabel(module.status),
            action: () => scrollBasicsSection(`blueprint-${blueprint.id}-module-${index + 1}`),
          })),
        ],
      })),
      { key: "blueprints" },
    );
  }

  function openBlueprints() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🧾 יישור קורסים ומבחנים";
    currentLessonDesc.textContent =
      "מיפוי לפי מקורות ציבוריים וארכיטיפ bootcamp: מה מכוסה בפורטל, מה חלקי, ומה צריך להשלים לפני מבחן או פרויקט.";
    if (blueprintsView) blueprintsView.style.display = "block";
    openBlueprintsBtn?.classList.add("active");
    recordLearningEvidence("view", { source: "course-blueprints" });
    renderBlueprints();
    setBlueprintsContextTree();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  // Trainer toolbar
  document.getElementById("t-toggle-report")?.addEventListener("click", () => {
    const r = document.getElementById("trainer-report");
    if (r.style.display === "none") {
      r.style.display = "block";
      renderTrainerReport();
    } else {
      r.style.display = "none";
    }
  });
  document.getElementById("t-focus-weak")?.addEventListener("click", (e) => {
    trainerMode = "weak";
    e.target.classList.add("active");
    document.getElementById("t-mode-mixed")?.classList.remove("active");
    nextQuestion();
  });
  document.getElementById("t-mode-mixed")?.addEventListener("click", (e) => {
    trainerMode = "adaptive";
    e.target.classList.add("active");
    document.getElementById("t-focus-weak")?.classList.remove("active");
    nextQuestion();
  });
  document.getElementById("t-reset-scores")?.addEventListener("click", () => {
    if (!confirm("לאפס את כל הציונים? סימוני V/X של מפת הידע לא ייפגעו."))
      return;
    scores = {};
    saveScores();
    trainerStats = { asked: 0, correct: 0, wrong: 0 };
    nextQuestion();
    renderTrainerReport();
  });
  document.getElementById("t-export-csv")?.addEventListener("click", () => {
    exportProgressCSV();
  });

  // =========== CSV EXPORT ===========
  function csvEscape(v) {
    const s = String(v ?? "");
    if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }
  function exportProgressCSV() {
    const all = allConcepts();
    const rows = [
      [
        "lesson_id",
        "lesson_title",
        "concept_name",
        "level",
        "level_label",
        "passed_mc",
        "passed_fill",
        "attempts",
        "correct",
        "wrong",
        "accuracy_pct",
        "timestamp_iso",
      ],
    ];
    const now = new Date().toISOString();
    all.forEach(({ lesson, concept }) => {
      const sc = getScore(lesson.id, concept.conceptName);
      const lvl = LEVEL_INFO[sc.level];
      const wrong = (sc.attempts || 0) - (sc.correct || 0);
      const acc = sc.attempts > 0
        ? Math.round((sc.correct / sc.attempts) * 100)
        : 0;
      rows.push([
        lesson.id,
        lesson.title,
        concept.conceptName,
        sc.level,
        (lvl.icon + " " + lvl.label).trim(),
        sc.passedMC ? 1 : 0,
        sc.passedFill ? 1 : 0,
        sc.attempts || 0,
        sc.correct || 0,
        wrong,
        acc,
        now,
      ]);
    });

    // Add summary row
    const totals = all.reduce(
      (acc, { lesson, concept }) => {
        const sc = getScore(lesson.id, concept.conceptName);
        acc.lvl += sc.level;
        acc.attempts += sc.attempts || 0;
        acc.correct += sc.correct || 0;
        if (sc.level >= 7) acc.masters++;
        return acc;
      },
      { lvl: 0, attempts: 0, correct: 0, masters: 0 },
    );
    const avgLevel = (totals.lvl / Math.max(1, all.length)).toFixed(2);
    rows.push([]);
    rows.push([
      "SUMMARY",
      "",
      `סה"כ ${all.length} מושגים · ${totals.masters} מאסטרים 🏆`,
      `avg=${avgLevel}`,
      "",
      "",
      "",
      totals.attempts,
      totals.correct,
      totals.attempts - totals.correct,
      totals.attempts > 0 ? Math.round((totals.correct / totals.attempts) * 100) : 0,
      now,
    ]);

    const csv = "\uFEFF" + rows.map((r) => r.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const fname = `lumen_progress_${new Date().toISOString().slice(0, 10)}.csv`;
    a.href = url;
    a.download = fname;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 0);
  }

  // =========== QUICK GUIDE ENGINE ===========
  let guideOpenStates = {}; // topicId -> true/false
  let guideQuery = "";
  let grandmaKnowledgeOpenStates = {}; // sectionId -> true/false
  let grandmaKnowledgeQuery = "";
  let grandmaKnowledgeSelectedTerm = null;
  let grandmaKnowledgeSelectedBranch = null;
  let grandmaKnowledgeViewMode = "atlas";
  const GRANDMA_KNOWLEDGE_TREE = [
    {
      title: "יסודות תוכנה ומדעי המחשב",
      subtopics: [
        { title: "כתיבת קוד בסיסית", sections: ["programming-foundations"] },
        { title: "מבני נתונים וחשיבה אלגוריתמית", sections: ["data-structures-logic"] },
        { title: "ארכיטקטורת מערכות", sections: ["system-architecture"] },
        { title: "מקביליות, ביצועים וניהול זמן ריצה", sections: ["parallel-programming-performance"] },
        { title: "טעויות, חריגים והתאוששות", sections: ["error-exception-handling"] },
      ],
    },
    {
      title: "ווב, רשת ורנדרינג",
      subtopics: [
        { title: "מבנה אפליקציות ווב", sections: ["web-frontend-backend-network"] },
        { title: "רנדרינג בפרונטאנד מודרני", sections: ["frontend-rendering-modern-web"] },
        { title: "קודי סטטוס HTTP", sections: ["http-status-codes"] },
        { title: "ביצועי רשת וזמינות", sections: ["network-web-performance"] },
      ],
    },
    {
      title: "נתונים, מסדי נתונים ו-BI",
      subtopics: [
        { title: "מסדי נתונים תפעוליים", sections: ["databases-data"] },
        { title: "Data Engineering וניתוח נתונים", sections: ["data-bi-engineering"] },
      ],
    },
    {
      title: "עבודה מקצועית, תהליכים ושחרור",
      subtopics: [
        { title: "Git, גרסאות ושיתוף פעולה", sections: ["teamwork-git-versions"] },
        { title: "ספריות, פריימוורקים וקוד פתוח", sections: ["libraries-frameworks-open-source"] },
        { title: "תהליכי פיתוח ובדיקות", sections: ["development-processes-agile", "software-testing"] },
        { title: "תשתיות, DevOps וסקיילינג", sections: ["infrastructure-devops-cloud", "devops-release-scaling"] },
      ],
    },
    {
      title: "אבטחה וזהות",
      subtopics: [
        { title: "זיהוי, הרשאות והגנת מידע", sections: ["security-identity"] },
      ],
    },
    {
      title: "AI, מודלים ומודלי שפה",
      subtopics: [
        { title: "AI, מודלים ו-RAG", sections: ["ai-models-rag"] },
        { title: "מושגי LLM מתקדמים", sections: ["ai-llm-extra"] },
        { title: "חיזוק AI ודאטה ברמת סבתא", sections: ["ai-data-grandma-reinforcement"] },
      ],
    },
    {
      title: "Full Stack — מפת המקצוע",
      subtopics: [
        {
          title: "תמונה כללית ותפקידים",
          sections: ["fullstack-overview-short", "fullstack-vs-roles"],
        },
        {
          title: "עבודה יומיומית וזרימת פיצ'ר",
          sections: ["fullstack-daily-flow", "fullstack-feature-flow"],
        },
        {
          title: "טכנולוגיות וכישורים",
          sections: ["fullstack-common-stacks", "fullstack-skill-map"],
        },
      ],
    },
    {
      title: "מילון תוכנה רחב — רמת סבתא",
      subtopics: [
        {
          title: "יסודות וקוד",
          sections: [
            "broad-software-programming-basics",
            "broad-dev-tools-runtime",
            "broad-oop-code-structure",
          ],
        },
        {
          title: "Web, Frontend ו-Backend",
          sections: [
            "broad-web-communication",
            "broad-frontend-ui",
            "broad-backend-server",
          ],
        },
        {
          title: "דאטה, ענן ואבטחה",
          sections: [
            "broad-databases-data",
            "broad-cloud-devops",
            "broad-security",
            "broad-data-ai",
          ],
        },
        {
          title: "איכות, צוות, ארכיטקטורה וביצועים",
          sections: [
            "broad-testing-quality",
            "broad-git-team-versions",
            "broad-architecture-principles",
            "broad-performance-efficiency",
          ],
        },
        {
          title: "מוצר, שפת מפתחים וסדר לימוד",
          sections: [
            "broad-product-business",
            "broad-dev-daily-language",
            "broad-learning-order-summary",
          ],
        },
      ],
    },
    {
      title: "הרחבה חלק ב׳ — תוכנה בעולם האמיתי",
      subtopics: [
        {
          title: "מערכת, חומרה ורשת",
          sections: [
            "broad-part2-os-files-runtime",
            "broad-part2-hardware-memory",
            "broad-part2-networks",
            "broad-part2-http-api",
          ],
        },
        {
          title: "נתונים, Backend ו-Frontend מעשי",
          sections: [
            "broad-part2-db-advanced",
            "broad-part2-backend-messaging",
            "broad-part2-frontend-practical",
          ],
        },
        {
          title: "ענן, אבטחה ובדיקות",
          sections: [
            "broad-part2-cloud-devops-advanced",
            "broad-part2-security-identity",
            "broad-part2-testing-advanced",
          ],
        },
        {
          title: "ארכיטקטורה, AI, מובייל ו-SaaS",
          sections: [
            "broad-part2-architecture-patterns",
            "broad-part2-ai-modern",
            "broad-part2-mobile",
            "broad-part2-saas-business",
          ],
        },
        {
          title: "צוות, יום-יום וסיכום",
          sections: [
            "broad-part2-team-culture",
            "broad-part2-daily-small-terms",
            "broad-part2-priority-summary",
          ],
        },
      ],
    },
    {
      title: "הרחבה חלק ג׳ — מערכות אמיתיות",
      subtopics: [
        {
          title: "שפות, אלגוריתמים ורשתות",
          sections: [
            "broad-part3-languages-types",
            "broad-part3-data-structures-algorithms",
            "broad-part3-network-protocols",
          ],
        },
        {
          title: "אמינות, Kubernetes ואבטחה",
          sections: [
            "broad-part3-distributed-reliability",
            "broad-part3-kubernetes-advanced",
            "broad-part3-security-privacy",
          ],
        },
        {
          title: "חיפוש, אנליטיקה, מובייל ו-AI",
          sections: [
            "broad-part3-search-seo",
            "broad-part3-analytics-experiments",
            "broad-part3-mobile-desktop",
            "broad-part3-mlops",
          ],
        },
        {
          title: "פורמטים, תיעוד, שפות ו-UX",
          sections: [
            "broad-part3-files-media-formats",
            "broad-part3-docs-knowledge",
            "broad-part3-languages-ecosystem",
            "broad-part3-product-ux",
          ],
        },
        {
          title: "עבודה אמיתית וסיכום",
          sections: [
            "broad-part3-real-work",
            "broad-part3-learning-summary",
          ],
        },
      ],
    },
    {
      title: "הרחבה חלק ד׳ — תוכנה מקצועית מקצה לקצה",
      subtopics: [
        {
          title: "הרצה, דיבוג, ניטור ומערכת הפעלה",
          sections: [
            "broad-part4-compilers-runtime",
            "broad-part4-debugging-profiling",
            "broad-part4-monitoring-incidents",
            "broad-part4-os-deep",
          ],
        },
        {
          title: "דאטה, מדדים, אבטחה וזהויות",
          sections: [
            "broad-part4-data-engineering",
            "broad-part4-statistics-metrics",
            "broad-part4-appsec-operations",
            "broad-part4-identity-auth-deep",
            "broad-part4-privacy-compliance",
          ],
        },
        {
          title: "קוד פתוח, ענן, שחרור ואינטגרציות",
          sections: [
            "broad-part4-open-source-licenses",
            "broad-part4-cloud-finops",
            "broad-part4-build-release-supply-chain",
            "broad-part4-integrations-automation",
          ],
        },
        {
          title: "מכשירים, משחקים, איכות קוד וקריירה",
          sections: [
            "broad-part4-embedded-iot",
            "broad-part4-graphics-games-media",
            "broad-part4-code-quality-maintenance",
            "broad-part4-learning-career",
            "broad-part4-summary",
          ],
        },
      ],
    },
    {
      title: "הרחבה חלק ה׳ — מערכות מתקדמות, פלטפורמות ואסטרטגיה",
      subtopics: [
        {
          title: "Web Platform, נגישות, DB ו-API",
          sections: [
            "broad-part5-browser-web-platform",
            "broad-part5-accessibility-ux-advanced",
            "broad-part5-db-indexes-performance",
            "broad-part5-api-advanced-contracts",
          ],
        },
        {
          title: "ענן, DevSecOps, AI ודאטה",
          sections: [
            "broad-part5-cloud-network-security",
            "broad-part5-devsecops-supply-chain",
            "broad-part5-ai-llmops-agents",
            "broad-part5-data-governance-lakehouse",
          ],
        },
        {
          title: "Web3, תשלומים, Enterprise ואימייל",
          sections: [
            "broad-part5-blockchain-web3",
            "broad-part5-payments-fintech",
            "broad-part5-enterprise-it",
            "broad-part5-email-messaging",
          ],
        },
        {
          title: "No-Code, אסטרטגיה וחשיבה הנדסית",
          sections: [
            "broad-part5-low-code-no-code",
            "broad-part5-product-technical-strategy",
            "broad-part5-engineering-philosophy",
            "broad-part5-summary",
          ],
        },
      ],
    },
    {
      title: "הרחבה חלק ו׳ — עומק מעשי, מדידה ותפעול",
      subtopics: [
        {
          title: "סגנונות תכנות, מסדי נתונים ו-cache",
          sections: [
            "broad-part6-programming-paradigms",
            "broad-part6-nosql-redis-db-types",
            "broad-part6-redis-cache-queues",
          ],
        },
        {
          title: "Observability, בדיקות, אבטחה ו-AI מדיד",
          sections: [
            "broad-part6-observability-tools",
            "broad-part6-advanced-testing-quality",
            "broad-part6-code-security-vulnerabilities",
            "broad-part6-ai-measurable-quality",
          ],
        },
        {
          title: "המלצות, טיפוסים, מובייל ותשלומים",
          sections: [
            "broad-part6-recommendation-search-personalization",
            "broad-part6-types-languages-tools-deep",
            "broad-part6-mobile-performance-distribution",
            "broad-part6-payments-subscriptions-depth",
          ],
        },
        {
          title: "אחסון, Linux, API ו-Frontend מתקדם",
          sections: [
            "broad-part6-files-storage-backups",
            "broad-part6-linux-daily-commands",
            "broad-part6-api-webhooks-layers",
            "broad-part6-frontend-advanced-performance-state",
          ],
        },
        {
          title: "Cloud Native, BI, פרטיות וכלי פיתוח",
          sections: [
            "broad-part6-cloud-native-serverless-managed",
            "broad-part6-bi-dashboard-business",
            "broad-part6-privacy-personal-data-security",
            "broad-part6-developer-tools-workspaces",
          ],
        },
        {
          title: "קוד יומיומי, רשת, קריירה וסיכום",
          sections: [
            "broad-part6-daily-code-terms",
            "broad-part6-network-security-depth",
            "broad-part6-career-team-judgment",
            "broad-part6-summary",
          ],
        },
      ],
    },
    {
      title: "הרחבה חלק ז׳ — מערכות רציניות ותקלות אמיתיות",
      subtopics: [
        {
          title: "Backend, API, מסדי נתונים ודאטה",
          sections: [
            "broad-part7-backend-system-patterns",
            "broad-part7-api-design-lifecycle",
            "broad-part7-database-design-performance-incidents",
            "broad-part7-data-architecture-sync",
          ],
        },
        {
          title: "אבטחה, AI וחיפוש",
          sections: [
            "broad-part7-advanced-security-secrets-identities",
            "broad-part7-ai-products-safety-evaluation",
            "broad-part7-search-knowledge-systems",
            "broad-part7-ai-security-governance",
          ],
        },
        {
          title: "Frontend, מובייל, ענן ופינטק",
          sections: [
            "broad-part7-frontend-ui-architecture",
            "broad-part7-mobile-real-world-ux",
            "broad-part7-cloud-infra-availability-cost",
            "broad-part7-financial-systems-accounting",
          ],
        },
        {
          title: "מוצר, תחזוקה, סביבות ותשתיות",
          sections: [
            "broad-part7-technical-product-management",
            "broad-part7-clean-code-maintenance",
            "broad-part7-dev-infra-environments",
            "broad-part7-real-world-network-protocols",
          ],
        },
        {
          title: "אנליטיקה, רגולציה, תפעול, חומרה וצוותים",
          sections: [
            "broad-part7-analytics-experiments-users",
            "broad-part7-regulation-privacy-responsibility",
            "broad-part7-operations-support-customer-service",
            "broad-part7-hardware-low-level-performance",
            "broad-part7-team-language-daily",
            "broad-part7-summary",
          ],
        },
      ],
    },
    {
      title: "מילוני מקור והרחבות",
      subtopics: [
        {
          title: "SPDLoad — מילון תוכנה ברמת סבתא",
          sections: [
            "spdload-programming-basics",
            "spdload-data-structures-algorithms",
            "spdload-architecture-design",
            "spdload-development-process",
            "spdload-cloud-infrastructure",
            "spdload-security",
            "spdload-ai-ml",
            "spdload-web-network",
            "spdload-testing",
          ],
        },
      ],
    },
  ];

  function openGuide() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "📖 מדריך מקוצר";
    currentLessonDesc.textContent =
      "סקירה מהירה של 22 הנושאים החשובים, עם שאלות תרגול ושאלות השלמת קוד מקושרות למפת הידע.";
    guideView.style.display = "block";
    openGuideBtn?.classList.add("active");

    const guide = window.QUICK_GUIDE || { topics: [] };
    document.getElementById("guide-subtitle").textContent =
      (guide.intro && guide.intro.subtitle) ||
      "הסדר ההגיוני: JavaScript בסיסי → DOM → אסינכרוניות → Node/Express → MongoDB → React → Hooks → Router → TypeScript → React+TS.";
    renderGuide();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function renderBlock(b) {
    if (!b) return "";
    if (b.type === "p") return `<div class="guide-block p">${esc(b.text)}</div>`;
    if (b.type === "code")
      return `<div class="guide-code"><pre><code>${esc(b.code)}</code></pre></div>`;
    if (b.type === "table") {
      const head = (b.header || []).map((h) => `<th>${esc(h)}</th>`).join("");
      const rows = (b.rows || [])
        .map(
          (r) =>
            `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`,
        )
        .join("");
      return `<div class="guide-table-wrap"><table class="guide-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    return "";
  }

  function openGrandmaKnowledge() {
    hideAllViews();
    currentLessonId = null;
    const knowledge = window.GRANDMA_KNOWLEDGE || { intro: {}, sections: [] };
    currentLessonTitle.textContent = "👵 אטלס ידע מורחב — ברמת סבתא";
    currentLessonDesc.textContent =
      "טאב נפרד מהקורס: אטלס מסודר של תחומים, עץ ניווט עמוק, והמחשות קצרות למושגים כלליים בתוכנה, ווב, דאטה, DevOps ו-AI.";
    document.getElementById("grandma-knowledge-title").textContent =
      "👵 אטלס ידע מורחב — " + (knowledge.intro?.title || "ידע מורחב ברמת סבתא");
    document.getElementById("grandma-knowledge-subtitle").textContent =
      "התחל מכרטיסי התחומים, או פתח את העץ לעומק: לחיצה על שם ענף פותחת הסבר; החץ שלידו רק מרחיב תתי-ענפים ומושגים.";
    grandmaKnowledgeSelectedTerm = null;
    grandmaKnowledgeSelectedBranch = null;
    grandmaKnowledgeViewMode = "atlas";
    if (!Object.keys(grandmaKnowledgeOpenStates).length) {
      grandmaKnowledgeOpenStates["topic-0"] = true;
      grandmaKnowledgeOpenStates["subtopic-0-0"] = true;
      grandmaKnowledgeOpenStates["section-programming-foundations"] = true;
    }
    grandmaKnowledgeView.style.display = "block";
    openGrandmaKnowledgeBtn?.classList.add("active");
    renderGrandmaKnowledge();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function renderGrandmaSource(source) {
    if (!source || !source.url) return "";
    return `<a class="grandma-source-link" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.name || "מקור")}</a>`;
  }

  function grandmaTermMatches(term, query) {
    if (!query) return true;
    const hay = [
      term.term,
      term.grandma,
      term.technical,
      term.expanded,
      term.source?.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(query);
  }

  function sectionTitleMatches(section, query) {
    if (!query) return true;
    return [section.title, section.description, section.id]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(query);
  }

  function sectionByIdMap(knowledge) {
    const map = {};
    (knowledge.sections || []).forEach((section) => {
      map[section.id] = section;
    });
    return map;
  }

  function allGrandmaTerms(knowledge) {
    return (knowledge.sections || []).flatMap((section) =>
      (section.terms || []).map((term) => ({ section, term })),
    );
  }

  function grandmaVisibleTerms(tree) {
    return (tree || []).flatMap((topic) =>
      (topic.subtopics || []).flatMap((subtopic) =>
        (subtopic.sections || []).flatMap((section) => section.terms || []),
      ),
    );
  }

  function grandmaBranchTerms(branch) {
    if (!branch) return [];
    if (branch.terms) return branch.terms;
    if (branch.sections) return branch.sections.flatMap((section) => grandmaBranchTerms(section));
    if (branch.subtopics) return branch.subtopics.flatMap((subtopic) => grandmaBranchTerms(subtopic));
    return [];
  }

  function grandmaBranchSections(branch) {
    if (!branch) return [];
    if (branch.type === "section") return [branch];
    if (branch.sections) return branch.sections;
    if (branch.subtopics) return branch.subtopics.flatMap((subtopic) => grandmaBranchSections(subtopic));
    return [];
  }

  function grandmaVisualFor(subject) {
    if (window.GRANDMA_VISUALS && typeof window.GRANDMA_VISUALS.render === "function") {
      return window.GRANDMA_VISUALS.render(subject || {});
    }
    return "";
  }

  function highlightGrandmaMatch(text, query) {
    const raw = String(text || "");
    const needle = String(query || "").trim().toLowerCase();
    if (!needle) return esc(raw);
    const lower = raw.toLowerCase();
    let cursor = 0;
    let output = "";
    while (cursor < raw.length) {
      const index = lower.indexOf(needle, cursor);
      if (index === -1) {
        output += esc(raw.slice(cursor));
        break;
      }
      output += esc(raw.slice(cursor, index));
      output += `<mark class="grandma-match">${esc(raw.slice(index, index + needle.length))}</mark>`;
      cursor = index + needle.length;
    }
    return output;
  }

  function findGrandmaBranchTrail(tree, branchId) {
    if (!branchId) return [];
    for (const topic of tree || []) {
      if (topic.id === branchId) return [topic];
      for (const subtopic of topic.subtopics || []) {
        if (subtopic.id === branchId) return [topic, subtopic];
        for (const section of subtopic.sections || []) {
          if (section.id === branchId) return [topic, subtopic, section];
        }
      }
    }
    return [];
  }

  function findGrandmaTermContext(tree, termNumber) {
    if (!termNumber) return null;
    for (const topic of tree || []) {
      for (const subtopic of topic.subtopics || []) {
        for (const section of subtopic.sections || []) {
          const terms = section.terms || [];
          const index = terms.findIndex((term) => String(term.number) === String(termNumber));
          if (index !== -1) {
            return {
              topic,
              subtopic,
              section,
              term: terms[index],
              index,
              previous: terms[index - 1] || null,
              next: terms[index + 1] || null,
              siblings: terms.filter((term) => String(term.number) !== String(termNumber)).slice(0, 6),
            };
          }
        }
      }
    }
    return null;
  }

  function grandmaBranchSubtitle(branch) {
    if (!branch) return "";
    const sections = grandmaBranchSections(branch);
    if (branch.type === "topic") {
      return `${(branch.subtopics || []).length} תתי-נושאים · ${sections.length} קבוצות · ${countGrandmaBranchTerms(branch)} מושגים`;
    }
    if (branch.type === "subtopic") {
      return `${sections.length} קבוצות · ${countGrandmaBranchTerms(branch)} מושגים`;
    }
    return `${countGrandmaBranchTerms(branch)} מושגים בקבוצה`;
  }

  function renderGrandmaBreadcrumb(items) {
    const crumbs = (items || []).filter(Boolean);
    if (!crumbs.length) return "";
    return `
      <nav class="grandma-breadcrumb" aria-label="מיקום באטלס">
        ${crumbs
          .map((item, index) => {
            const isLast = index === crumbs.length - 1;
            const content = `
              <span class="crumb-number">${esc(item.number || "")}</span>
              <span>${esc(item.title || item.term || "")}</span>`;
            return isLast || !item.id
              ? `<span class="grandma-crumb current">${content}</span>`
              : `<button class="grandma-crumb" type="button" data-branch="${esc(item.id)}">${content}</button>`;
          })
          .join(`<span class="grandma-crumb-sep">›</span>`)}
      </nav>`;
  }

  function renderGrandmaMiniTerms(terms, query, limit = 8) {
    const shown = (terms || []).slice(0, limit);
    if (!shown.length) return "";
    return `
      <div class="grandma-mini-term-list">
        ${shown
          .map((term) => `
            <button class="grandma-mini-term" type="button" data-term="${term.number}">
              <span>${esc(term.treeNumber || term.number)}</span>
              <strong>${highlightGrandmaMatch(term.term, query)}</strong>
            </button>`)
          .join("")}
      </div>`;
  }

  function firstVisibleTerm(tree) {
    for (const topic of tree) {
      for (const subtopic of topic.subtopics) {
        for (const section of subtopic.sections) {
          if (section.terms[0]) return section.terms[0];
        }
      }
    }
    return null;
  }

  function buildGrandmaTree(knowledge, query) {
    const sectionsById = sectionByIdMap(knowledge);
    const used = new Set();
    const topics = [];

    GRANDMA_KNOWLEDGE_TREE.forEach((topicDef, topicIndex) => {
      const topicNode = {
        id: `topic-${topicIndex}`,
        type: "topic",
        title: topicDef.title,
        number: String(topicIndex + 1),
        subtopics: [],
      };

      (topicDef.subtopics || []).forEach((subDef, subIndex) => {
        const subNode = {
          id: `subtopic-${topicIndex}-${subIndex}`,
          type: "subtopic",
          title: subDef.title,
          number: `${topicNode.number}.${subIndex + 1}`,
          sections: [],
        };

        (subDef.sections || []).forEach((sectionId, sectionIndex) => {
          const section = sectionsById[sectionId];
          if (!section) return;
          used.add(sectionId);
          const sectionMatches = sectionTitleMatches(section, query);
          const terms = (section.terms || [])
            .map((term, termIndex) => ({ term, termIndex }))
            .filter(({ term }) => sectionMatches || grandmaTermMatches(term, query))
            .map(({ term, termIndex }) => ({
              ...term,
              treeNumber: `${subNode.number}.${sectionIndex + 1}.${termIndex + 1}`,
              sectionId,
              sectionTitle: section.title,
            }));
          if (!terms.length) return;
          subNode.sections.push({
            id: `section-${section.id}`,
            type: "section",
            sectionId,
            title: section.title,
            description: section.description,
            icon: section.icon,
            number: `${subNode.number}.${sectionIndex + 1}`,
            terms,
          });
        });

        if (subNode.sections.length) topicNode.subtopics.push(subNode);
      });

      if (topicNode.subtopics.length) topics.push(topicNode);
    });

    const uncategorized = (knowledge.sections || []).filter((section) => !used.has(section.id));
    if (uncategorized.length) {
      const topicNumber = String(topics.length + 1);
      const topicNode = {
        id: "topic-uncategorized",
        type: "topic",
        title: "מושגים שטרם סווגו",
        number: topicNumber,
        subtopics: [
          {
            id: "subtopic-uncategorized",
            type: "subtopic",
            title: "אחר",
            number: `${topicNumber}.1`,
            sections: [],
          },
        ],
      };
      uncategorized.forEach((section, index) => {
        const sectionMatches = sectionTitleMatches(section, query);
        const terms = (section.terms || [])
          .map((term, termIndex) => ({ term, termIndex }))
          .filter(({ term }) => sectionMatches || grandmaTermMatches(term, query))
          .map(({ term, termIndex }) => ({
            ...term,
            treeNumber: `${topicNumber}.1.${index + 1}.${termIndex + 1}`,
            sectionId: section.id,
            sectionTitle: section.title,
          }));
        if (terms.length) {
          topicNode.subtopics[0].sections.push({
            id: `section-${section.id}`,
            type: "section",
            sectionId: section.id,
            title: section.title,
            description: section.description,
            icon: section.icon,
            number: `${topicNumber}.1.${index + 1}`,
            terms,
          });
        }
      });
      if (topicNode.subtopics[0].sections.length) topics.push(topicNode);
    }

    return topics;
  }

  function countGrandmaBranchTerms(branch) {
    if (!branch) return 0;
    if (branch.terms) return branch.terms.length;
    if (branch.sections) return branch.sections.reduce((sum, section) => sum + countGrandmaBranchTerms(section), 0);
    if (branch.subtopics) return branch.subtopics.reduce((sum, subtopic) => sum + countGrandmaBranchTerms(subtopic), 0);
    return 0;
  }

  function findGrandmaBranchById(tree, branchId) {
    if (!branchId) return null;
    for (const topic of tree) {
      if (topic.id === branchId) return topic;
      for (const subtopic of topic.subtopics) {
        if (subtopic.id === branchId) return subtopic;
        for (const section of subtopic.sections) {
          if (section.id === branchId) return section;
        }
      }
    }
    return null;
  }

  function firstGrandmaBranch(tree) {
    return tree[0] || null;
  }

  function grandmaBranchPath(branch) {
    if (!branch) return "";
    if (branch.type === "topic") return branch.number;
    if (branch.type === "subtopic") return branch.number;
    if (branch.type === "section") return branch.number;
    return branch.number || "";
  }

  function describeGrandmaBranch(branch) {
    if (!branch) return "";
    const termCount = countGrandmaBranchTerms(branch);
    if (branch.type === "topic") {
      const names = (branch.subtopics || []).map((subtopic) => subtopic.title).slice(0, 5).join(", ");
      return `הענף הזה מרכז ${termCount} מושגים ומסדר אותם לפי תחומי משנה. הוא נותן תמונת על קצרה לפני שנכנסים לתת-נושאים ולמושגים עצמם${names ? `: ${names}.` : "."}`;
    }
    if (branch.type === "subtopic") {
      const names = (branch.sections || []).map((section) => section.title.replace(/^הרחבה חלק [^:]+:\s*/, "")).slice(0, 5).join(", ");
      return `תת-הענף הזה כולל ${termCount} מושגים בכמה קבוצות קרובות. המטרה שלו היא לחבר בין המושגים תחת רעיון עבודה אחד${names ? `: ${names}.` : "."}`;
    }
    if (branch.type === "section") {
      return branch.description || `החלק הזה כולל ${termCount} מושגים קשורים ומציג לכל אחד הסבר פשוט ומשמעות טכנית קצרה.`;
    }
    return "";
  }

  function explainGrandmaBranchImportance(branch) {
    if (!branch) return "";
    if (branch.type === "topic") {
      return "כשלומדים תחום גדול, קל ללכת לאיבוד בפרטים. הדף הזה נותן קודם מפה: אילו תתי-נושאים קיימים, כמה מושגים יש בכל חלק, ולאן כדאי להיכנס כדי להבין את התמונה הגדולה.";
    }
    if (branch.type === "subtopic") {
      return "תת-הנושא מחבר כמה קבוצות קרובות תחת רעיון אחד. כך אפשר להבין לא רק מושג בודד, אלא גם איך מושגים שכנים עובדים יחד במערכת אמיתית.";
    }
    return "קבוצה קטנה היא המקום שבו עוברים ממפה כללית ללמידה נקודתית: כל מושג מקבל הסבר פשוט, משמעות טכנית, וקישור להקשר שלו בעץ.";
  }

  function renderGrandmaAtlas(tree, query, totalTerms) {
    const visibleTerms = grandmaVisibleTerms(tree);
    const totalTopics = (tree || []).length;
    const atlasCards = (tree || [])
      .map((topic) => {
        const count = countGrandmaBranchTerms(topic);
        const subtopics = (topic.subtopics || []).slice(0, 4);
        return `
          <button class="grandma-atlas-card" type="button" data-branch="${esc(topic.id)}">
            ${grandmaVisualFor({
              title: topic.title,
              description: describeGrandmaBranch(topic),
              count,
            })}
            <span class="grandma-atlas-card-kicker">תחום ${esc(topic.number)}</span>
            <strong>${highlightGrandmaMatch(topic.title, query)}</strong>
            <p>${esc(describeGrandmaBranch(topic))}</p>
            <div class="grandma-atlas-card-meta">
              <span>${count} מושגים</span>
              <span>${(topic.subtopics || []).length} תתי-נושאים</span>
            </div>
            <div class="grandma-atlas-subtopics">
              ${subtopics.map((subtopic) => `<span>${highlightGrandmaMatch(subtopic.title, query)}</span>`).join("")}
            </div>
          </button>`;
      })
      .join("");

    return `
      <article class="grandma-atlas-detail">
        <section class="grandma-atlas-hero">
          <div>
            <span class="grandma-detail-path">אטלס ראשי</span>
            <h3>מפת התחומים של ידע מורחב ברמת סבתא</h3>
            <p>
              במקום להתחיל מרשימה ארוכה, מתחילים ממפה: כל כרטיס הוא תחום מרכזי,
              ובתוכו תתי-נושאים וקבוצות מושגים. העץ נשאר בצד למי שרוצה לרדת לעומק.
            </p>
            <div class="grandma-atlas-metrics">
              <span>${visibleTerms.length} מושגים מוצגים</span>
              <span>${totalTerms} מושגים במאגר</span>
              <span>${totalTopics} תחומים ראשיים</span>
            </div>
          </div>
          ${grandmaVisualFor({
            title: "אטלס ידע מורחב",
            description: "תוכנה, ווב, דאטה, ענן, אבטחה, AI ותהליכי עבודה",
            count: totalTerms,
          })}
        </section>
        <section class="grandma-atlas-grid" aria-label="תחומים באטלס">
          ${atlasCards || `<p class="grandma-branch-empty">אין תחומים להצגה.</p>`}
        </section>
      </article>`;
  }

  function renderGrandmaSearchDetail(tree, query, totalTerms) {
    const visibleTerms = grandmaVisibleTerms(tree);
    const groups = (tree || []).map((topic) => ({
      topic,
      count: countGrandmaBranchTerms(topic),
      terms: grandmaBranchTerms(topic).slice(0, 5),
    }));
    const groupCards = groups.length
      ? groups
          .map(({ topic, count, terms }) => `
            <button class="grandma-search-group" type="button" data-branch="${esc(topic.id)}">
              <strong>${highlightGrandmaMatch(topic.title, query)}</strong>
              <span>${count} תוצאות בתחום</span>
              ${renderGrandmaMiniTerms(terms, query, 4)}
            </button>`)
          .join("")
      : `<p class="grandma-branch-empty">לא נמצאו תחומים שתואמים לחיפוש.</p>`;

    return `
      <article class="grandma-atlas-detail">
        <section class="grandma-search-hero">
          <span class="grandma-detail-path">חיפוש באטלס</span>
          <h3>תוצאות עבור “${esc(query)}”</h3>
          <p>${visibleTerms.length} מתוך ${totalTerms} מושגים נמצאו. התוצאות מקובצות לפי תחום כדי שיהיה קל להבין איפה המושג חי בעץ.</p>
        </section>
        <section class="grandma-search-groups">${groupCards}</section>
      </article>`;
  }

  function renderGrandmaBranchDetail(branch, tree, query) {
    if (!branch) {
      return `
        <div class="grandma-detail-empty">
          <div class="big-icon">🌳</div>
          <h3>בחר ענף מהעץ או חזור לאטלס</h3>
          <p>לחיצה על שם ענף פותחת כאן תקציר. לחיצה על החץ שלידו רק מרחיבה את העץ.</p>
        </div>`;
    }

    const trail = findGrandmaBranchTrail(tree, branch.id);
    const totalTerms = countGrandmaBranchTerms(branch);
    const visual = grandmaVisualFor({
      title: branch.title,
      description: `${branch.description || ""} ${describeGrandmaBranch(branch)}`,
      count: totalTerms,
    });
    let childTitle = "מה יש בתוך הענף";
    let childItems = [];
    if (branch.type === "topic") {
      childTitle = "תתי-הנושאים בענף";
      childItems = (branch.subtopics || []).map((subtopic) => ({
        id: subtopic.id,
        title: subtopic.title,
        count: countGrandmaBranchTerms(subtopic),
        text: describeGrandmaBranch(subtopic),
      }));
    } else if (branch.type === "subtopic") {
      childTitle = "הקבוצות בתוך תת-הענף";
      childItems = (branch.sections || []).map((section) => ({
        id: section.id,
        title: `${section.icon || "📚"} ${section.title}`,
        count: countGrandmaBranchTerms(section),
        text: describeGrandmaBranch(section),
      }));
    } else if (branch.type === "section") {
      const shownTerms = (branch.terms || []).slice(0, 40);
      childTitle = `המושגים בקבוצה${shownTerms.length < (branch.terms || []).length ? ` — מוצגים ${shownTerms.length} ראשונים` : ""}`;
      childItems = shownTerms.map((term) => ({
        id: String(term.number),
        title: `${term.treeNumber}. ${term.term}`,
        count: null,
        text: `${term.grandma} המשמעות הטכנית: ${term.technical}`,
        termNumber: term.number,
      }));
    }

    const childCards = childItems.length
      ? childItems.map((item) => `
          <button class="grandma-branch-card ${item.termNumber ? "is-term" : ""}" ${item.termNumber ? `data-term="${item.termNumber}"` : `data-branch="${esc(item.id)}"`}>
            <strong>${esc(item.title)}</strong>
            ${item.count == null ? "" : `<span>${item.count} מושגים</span>`}
            <p>${esc(item.text)}</p>
          </button>`)
        .join("")
      : `<p class="grandma-branch-empty">אין פריטים להצגה בענף הזה.</p>`;

    return `
      <article class="grandma-term-detail grandma-branch-detail">
        ${renderGrandmaBreadcrumb(trail)}
        <section class="grandma-detail-hero">
          <div>
            <div class="grandma-detail-path">${esc(grandmaBranchPath(branch))} · ענף בעץ</div>
            <h3>${highlightGrandmaMatch(branch.title, query)}</h3>
            <p class="grandma-detail-subtitle">${esc(grandmaBranchSubtitle(branch))}</p>
          </div>
          ${visual}
        </section>
        <div class="grandma-detail-grid">
          <section>
            <h4>הסבר קצר</h4>
            <p>${esc(describeGrandmaBranch(branch))}</p>
          </section>
          <section>
            <h4>למה זה חשוב</h4>
            <p>${esc(explainGrandmaBranchImportance(branch))}</p>
          </section>
        </div>
        <div class="grandma-branch-children">
          <h4>${esc(childTitle)}</h4>
          <div class="grandma-branch-card-grid">${childCards}</div>
        </div>
      </article>`;
  }

  function renderGrandmaTermDetail(term, context, query) {
    if (!term) {
      return `
        <div class="grandma-detail-empty">
          <div class="big-icon">🌳</div>
          <h3>בחר מושג מהעץ</h3>
          <p>התוכן המלא מופיע רק אחרי בחירת מושג, כדי לא להציף את כל המאגר בבת אחת.</p>
        </div>`;
    }
    const source = renderGrandmaSource(term.source);
    const trail = context ? [context.topic, context.subtopic, context.section] : [];
    const related = [
      context?.previous ? { label: "הקודם בקבוצה", term: context.previous } : null,
      context?.next ? { label: "הבא בקבוצה", term: context.next } : null,
      ...(context?.siblings || []).slice(0, 4).map((sibling) => ({ label: "קשור באותה קבוצה", term: sibling })),
    ].filter(Boolean);
    return `
      <article class="grandma-term-detail">
        ${renderGrandmaBreadcrumb(trail)}
        <section class="grandma-detail-hero">
          <div>
            <div class="grandma-detail-path">${esc(term.treeNumber || "")} · ${esc(term.sectionTitle || "")}</div>
            <h3>${highlightGrandmaMatch(term.term, query)}</h3>
            <p class="grandma-detail-subtitle">מושג מתוך “${esc(term.sectionTitle || "")}”</p>
          </div>
          ${grandmaVisualFor({
            title: term.term,
            term: term.term,
            sectionTitle: term.sectionTitle,
            description: `${term.grandma || ""} ${term.technical || ""}`,
            number: term.number,
          })}
        </section>
        <div class="grandma-detail-grid">
          <section>
            <h4>הסבר בגובה העיניים</h4>
            <p>${highlightGrandmaMatch(term.grandma, query)}</p>
          </section>
          <section>
            <h4>משמעות טכנית קצרה</h4>
            <p>${highlightGrandmaMatch(term.technical, query)}</p>
          </section>
          <section class="wide">
            <h4>הרחבה להמשך הבנה</h4>
            <p>${highlightGrandmaMatch(term.expanded, query)}</p>
          </section>
        </div>
        ${
          related.length
            ? `<div class="grandma-related">
                <h4>מושגים קרובים באותו הקשר</h4>
                <div class="grandma-related-list">
                  ${related
                    .map(({ label, term: relatedTerm }) => `
                      <button class="grandma-related-chip" type="button" data-term="${relatedTerm.number}">
                        <span>${esc(label)}</span>
                        <strong>${esc(relatedTerm.term)}</strong>
                      </button>`)
                    .join("")}
                </div>
              </div>`
            : ""
        }
        <div class="grandma-detail-meta">
          <span>מספור מקורי במאגר: ${term.number}</span>
          ${source ? `<span>מקור: ${source}</span>` : ""}
        </div>
      </article>`;
  }

  function renderGrandmaTree(tree, query) {
    const forceOpen = !!query;
    const renderBranchRow = (node, open, count = null) => `
      <div class="grandma-tree-row grandma-tree-branch ${grandmaKnowledgeSelectedBranch === node.id ? "active" : ""}">
        <button class="grandma-tree-arrow" type="button" data-node="${esc(node.id)}" aria-label="${open ? "כווץ" : "הרחב"} ${esc(node.title)}" aria-expanded="${open ? "true" : "false"}">
          <span aria-hidden="true">◀</span>
        </button>
        <button class="grandma-tree-title" type="button" data-branch="${esc(node.id)}">
          <span class="tree-number">${esc(node.number)}</span>
          <span class="tree-label">${esc(node.icon ? `${node.icon} ` : "")}${highlightGrandmaMatch(node.title, query)}</span>
        </button>
        ${count == null ? "<span></span>" : `<span class="tree-count">${count}</span>`}
      </div>`;

    return tree
      .map((topic) => {
        const topicOpen = forceOpen || !!grandmaKnowledgeOpenStates[topic.id];
        const subtopicsHTML = topic.subtopics
          .map((subtopic) => {
            const subOpen = forceOpen || !!grandmaKnowledgeOpenStates[subtopic.id];
            const sectionsHTML = subtopic.sections
              .map((section) => {
                const sectionOpen = forceOpen || !!grandmaKnowledgeOpenStates[section.id];
                const termsHTML = section.terms
                  .map((term) => `
                    <button class="grandma-tree-row grandma-tree-term ${grandmaKnowledgeSelectedTerm === String(term.number) ? "active" : ""}" data-term="${term.number}">
                      <span class="tree-number">${esc(term.treeNumber)}</span>
                      <span class="tree-label">${highlightGrandmaMatch(term.term, query)}</span>
                    </button>`)
                  .join("");
                return `
                  <div class="grandma-tree-node level-3 ${sectionOpen ? "open" : ""}">
                    ${renderBranchRow(section, sectionOpen, section.terms.length)}
                    <div class="grandma-tree-children">${termsHTML}</div>
                  </div>`;
              })
              .join("");
            return `
              <div class="grandma-tree-node level-2 ${subOpen ? "open" : ""}">
                ${renderBranchRow(subtopic, subOpen)}
                <div class="grandma-tree-children">${sectionsHTML}</div>
              </div>`;
          })
          .join("");
        return `
          <div class="grandma-tree-node level-1 ${topicOpen ? "open" : ""}">
            ${renderBranchRow(topic, topicOpen)}
            <div class="grandma-tree-children">${subtopicsHTML}</div>
          </div>`;
      })
      .join("");
  }

  function renderGrandmaKnowledge() {
    const container = document.getElementById("grandma-knowledge-container");
    if (!container) return;
    const knowledge = window.GRANDMA_KNOWLEDGE || { sections: [] };
    const query = (grandmaKnowledgeQuery || "").toLowerCase().trim();
    const tree = buildGrandmaTree(knowledge, query);
    const visibleTerms = grandmaVisibleTerms(tree);
    const totalTerms = allGrandmaTerms(knowledge).length;

    const selectedTermStillVisible =
      grandmaKnowledgeSelectedTerm &&
      visibleTerms.some((term) => String(term.number) === grandmaKnowledgeSelectedTerm);
    const selectedBranchStillVisible =
      grandmaKnowledgeSelectedBranch &&
      !!findGrandmaBranchById(tree, grandmaKnowledgeSelectedBranch);

    if (selectedTermStillVisible) {
      grandmaKnowledgeSelectedBranch = null;
      grandmaKnowledgeViewMode = "term";
    } else if (selectedBranchStillVisible) {
      grandmaKnowledgeSelectedTerm = null;
      if (grandmaKnowledgeViewMode !== "atlas") grandmaKnowledgeViewMode = "branch";
    } else {
      grandmaKnowledgeViewMode = query ? "search" : "atlas";
      grandmaKnowledgeSelectedBranch = null;
      grandmaKnowledgeSelectedTerm = null;
    }

    const selectedTerm = visibleTerms.find((term) => String(term.number) === grandmaKnowledgeSelectedTerm) || null;
    const selectedTermContext = selectedTerm ? findGrandmaTermContext(tree, grandmaKnowledgeSelectedTerm) : null;
    const selectedBranch = selectedTerm ? null : findGrandmaBranchById(tree, grandmaKnowledgeSelectedBranch);
    const detailHTML = selectedTerm
      ? renderGrandmaTermDetail(selectedTerm, selectedTermContext, query)
      : selectedBranch
        ? renderGrandmaBranchDetail(selectedBranch, tree, query)
        : query
          ? renderGrandmaSearchDetail(tree, query, totalTerms)
          : renderGrandmaAtlas(tree, query, totalTerms);
    setGrandmaContextTree(tree);

    container.innerHTML = tree.length
      ? `
        <div class="grandma-tree-layout">
          <aside class="grandma-tree-panel" aria-label="תוכן עניינים היררכי">
            <div class="grandma-tree-panel-head">
              <button class="grandma-atlas-return" type="button" data-grandma-atlas>
                <span>🗺️</span>
                <strong>חזרה לאטלס הראשי</strong>
              </button>
              <span>לחיצה על שם ענף פותחת הסבר. החץ מרחיב את העץ.</span>
            </div>
            <div class="grandma-tree">${renderGrandmaTree(tree, query)}</div>
          </aside>
          <section class="grandma-detail-panel" aria-live="polite">
            ${detailHTML}
          </section>
        </div>`
      : `<div class="tq-empty"><div class="big-icon">🔍</div><p>לא נמצאו ענפים שתואמים לחיפוש.</p></div>`;

    const stats = document.getElementById("grandma-knowledge-stats");
    if (stats) {
      stats.innerHTML = `
        <span>${visibleTerms.length} / ${totalTerms} מושגים בעץ</span>
        <span>${tree.length} נושאי-על מוצגים</span>
        <span>בחירה נוכחית: ${selectedTerm ? esc(selectedTerm.treeNumber) : selectedBranch ? esc(selectedBranch.number) : query ? "חיפוש" : "אטלס"}</span>
      `;
    }

    container.querySelectorAll("[data-grandma-atlas]").forEach((btn) => {
      btn.addEventListener("click", () => {
        grandmaKnowledgeViewMode = query ? "search" : "atlas";
        grandmaKnowledgeSelectedBranch = null;
        grandmaKnowledgeSelectedTerm = null;
        renderGrandmaKnowledge();
      });
    });
    container.querySelectorAll(".grandma-tree-arrow").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nodeId = btn.dataset.node;
        grandmaKnowledgeOpenStates[nodeId] = !grandmaKnowledgeOpenStates[nodeId];
        renderGrandmaKnowledge();
      });
    });
    container.querySelectorAll(".grandma-tree-title, .grandma-branch-card[data-branch], .grandma-atlas-card[data-branch], .grandma-search-group[data-branch], .grandma-crumb[data-branch]").forEach((btn) => {
      btn.addEventListener("click", () => {
        grandmaKnowledgeSelectedBranch = btn.dataset.branch;
        grandmaKnowledgeSelectedTerm = null;
        grandmaKnowledgeViewMode = "branch";
        renderGrandmaKnowledge();
      });
    });
    container.querySelectorAll(".grandma-tree-term, .grandma-branch-card[data-term], .grandma-mini-term[data-term], .grandma-related-chip[data-term]").forEach((btn) => {
      btn.addEventListener("click", () => {
        grandmaKnowledgeSelectedTerm = btn.dataset.term;
        grandmaKnowledgeSelectedBranch = null;
        grandmaKnowledgeViewMode = "term";
        renderGrandmaKnowledge();
      });
    });
  }

  function renderGuide() {
    const container = document.getElementById("guide-topics-container");
    if (!container) return;
    const guide = window.QUICK_GUIDE || { topics: [] };
    const q = (guideQuery || "").toLowerCase().trim();

    container.innerHTML = guide.topics
      .filter((t) => {
        if (!q) return true;
        const hay = (t.title + " " + (t.blocks || []).map((b) => (b.text || b.code || "")).join(" ")).toLowerCase();
        return hay.includes(q);
      })
      .map((topic) => {
        const counts = bankByTopic(topic.id);
        const isOpen = !!guideOpenStates[topic.id];
        const blocksHTML = (topic.blocks || []).map(renderBlock).join("");

        // Build the embedded quizzes
        const mcHTML = counts.mc.length
          ? counts.mc
              .map((q, i) => {
                const qid = `q_${topic.id}_mc_${i}`;
                const lvl = LEVEL_INFO[q.level] || LEVEL_INFO[3];
                const ref = q.conceptKey ? findConceptByKeyLoose(q.conceptKey) : null;
                return `
                  <div class="guide-q-card" data-qid="${qid}" data-correct="${q.correctIndex}" data-concept="${esc(q.conceptKey || "")}" data-kind="mc">
                    <div class="guide-q-meta">
                      <span>שאלה ${i + 1}</span>
                      <span class="lvl-pill ${lvl.cssClass}">${lvl.icon} רמה ${q.level}</span>
                    </div>
                    <div class="guide-q-text">${esc(q.question)}</div>
                    ${renderQuestionPrereqPanel({ question: q, lesson: ref?.lesson || null, concept: ref?.concept || null, mode: "guide" })}
                    <div class="guide-q-options">
                      ${q.options
                        .map(
                          (opt, oi) =>
                            `<button class="guide-q-option" data-i="${oi}">${esc(opt)}</button>`,
                        )
                        .join("")}
                    </div>
                    <div class="guide-q-feedback" data-explanation="${esc(q.explanation || "")}"></div>
                  </div>`;
              })
              .join("")
          : `<p style="color:var(--text-muted);font-size:0.9rem;">אין עדיין שאלות אמריקניות לנושא זה במאגר. השתמש במאמן הידע לאימון אדפטיבי.</p>`;

        const fillHTML = counts.fill.length
          ? counts.fill
              .map((q, i) => {
                const qid = `q_${topic.id}_fill_${i}`;
                const lvl = LEVEL_INFO[q.level] || LEVEL_INFO[3];
                const ref = q.conceptKey ? findConceptByKeyLoose(q.conceptKey) : null;
                return `
                  <div class="guide-q-card" data-qid="${qid}" data-answer="${esc(q.answer)}" data-concept="${esc(q.conceptKey || "")}" data-kind="fill">
                    <div class="guide-q-meta">
                      <span>קטע ${i + 1} · ${esc(q.hint || "")}</span>
                      <span class="lvl-pill ${lvl.cssClass}">${lvl.icon} רמה ${q.level}</span>
                    </div>
                    <div class="guide-code"><pre><code>${esc(q.code)}</code></pre></div>
                    ${renderQuestionPrereqPanel({ question: q, lesson: ref?.lesson || null, concept: ref?.concept || null, mode: "guide" })}
                    <div class="guide-q-fill-row">
                      <input type="text" class="guide-q-fill-input" placeholder="הקלד את הטוקן החסר..." dir="ltr" autocomplete="off" spellcheck="false" />
                      <button class="guide-q-fill-submit">✅ בדוק</button>
                    </div>
                    <div class="guide-q-feedback" data-explanation="${esc(q.explanation || "")}"></div>
                  </div>`;
              })
              .join("")
          : `<p style="color:var(--text-muted);font-size:0.9rem;">אין עדיין קטעי קוד להשלמה לנושא זה במאגר.</p>`;

        return `
          <div class="guide-topic ${isOpen ? "is-open" : ""}" data-topic="${esc(topic.id)}">
            <div class="guide-topic-head">
              <div class="guide-topic-title">
                <span class="guide-topic-num">${topic.number}</span>
                <span class="icon-big">${topic.icon || "📚"}</span>
                <h3>${esc(topic.title)}</h3>
              </div>
              <div class="guide-topic-meta">
                <span class="pill-mini mc">🅰️ ${counts.mc.length}</span>
                <span class="pill-mini fill">✍️ ${counts.fill.length}</span>
                <span class="chev">◀</span>
              </div>
            </div>
            <div class="guide-topic-body">
              ${blocksHTML}
              <div class="guide-quiz-section">
                <h4>🅰️ שאלות אמריקניות (${counts.mc.length})</h4>
                ${mcHTML}
              </div>
              <div class="guide-quiz-section">
                <h4>✍️ קטעי קוד להשלמה (${counts.fill.length})</h4>
                ${fillHTML}
              </div>
            </div>
          </div>`;
      })
      .join("") ||
      `<div class="tq-empty"><div class="big-icon">🔍</div><p>לא נמצאו נושאים שתואמים לחיפוש.</p></div>`;
    wireQuestionPrerequisiteNavigation(container);

    // Click to expand/collapse
    container.querySelectorAll(".guide-topic").forEach((topicEl) => {
      const tid = topicEl.dataset.topic;
      topicEl.querySelector(".guide-topic-head")?.addEventListener("click", () => {
        guideOpenStates[tid] = !guideOpenStates[tid];
        topicEl.classList.toggle("is-open", guideOpenStates[tid]);
      });

      // MC click handlers
      topicEl.querySelectorAll(".guide-q-card[data-kind='mc']").forEach((card) => {
        const correct = parseInt(card.dataset.correct, 10);
        const conceptKeyStr = card.dataset.concept;
        card.querySelectorAll(".guide-q-option").forEach((btn) => {
          btn.addEventListener("click", () => {
            if (card.classList.contains("answered")) return;
            const sel = parseInt(btn.dataset.i, 10);
            const isCorrect = sel === correct;
            card.classList.add("answered");
            card.classList.add(isCorrect ? "correct" : "wrong");
            card.querySelectorAll(".guide-q-option").forEach((o) => {
              o.classList.add("disabled");
              const i = parseInt(o.dataset.i, 10);
              if (i === correct) o.classList.add("correct");
              else if (i === sel) o.classList.add("wrong");
            });
            applyGuideAnswer(conceptKeyStr, "mc", isCorrect, card, {
              question: questionFromGuideCard(card, "mc"),
              selectedIdx: sel,
              mode: "guide",
            });
          });
        });
      });

      // Fill click handlers
      topicEl.querySelectorAll(".guide-q-card[data-kind='fill']").forEach((card) => {
        const expected = (card.dataset.answer || "").trim();
        const conceptKeyStr = card.dataset.concept;
        const input = card.querySelector(".guide-q-fill-input");
        const submitBtn = card.querySelector(".guide-q-fill-submit");

        function submit() {
          if (card.classList.contains("answered")) return;
          const userAns = (input.value || "").trim();
          if (!userAns) return;
          const isCorrect =
            userAns.toLowerCase() === expected.toLowerCase();
          card.classList.add("answered");
          card.classList.add(isCorrect ? "correct" : "wrong");
          input.classList.add(isCorrect ? "correct" : "wrong");
          input.disabled = true;
          submitBtn.disabled = true;
          applyGuideAnswer(conceptKeyStr, "fill", isCorrect, card, {
            question: questionFromGuideCard(card, "fill"),
            answer: userAns,
            mode: "guide",
          });
        }

        submitBtn?.addEventListener("click", submit);
        input?.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            submit();
          }
        });
      });
    });
    setGuideContextTree();
  }

  function questionFromGuideCard(cardEl, kind) {
    const fb = cardEl.querySelector(".guide-q-feedback");
    const options = Array.from(cardEl.querySelectorAll(".guide-q-option")).map((btn) =>
      (btn.textContent || "").trim(),
    );
    return {
      conceptKey: cardEl.dataset.concept || "",
      question:
        (cardEl.querySelector(".guide-q-text")?.textContent || "").trim() ||
        (cardEl.querySelector(".guide-code")?.textContent || "").trim(),
      code: (cardEl.querySelector(".guide-code")?.textContent || "").trim(),
      options,
      correctIndex: kind === "mc" ? parseInt(cardEl.dataset.correct || "-1", 10) : undefined,
      answer: kind === "fill" ? cardEl.dataset.answer || "" : "",
      explanation: fb?.dataset.explanation || "",
    };
  }

  // Apply an answer from the guide — bumps the linked concept's level (if any)
  // and renders a feedback line into the card.
  function applyGuideAnswer(conceptKeyStr, kind, isCorrect, cardEl, meta = {}) {
    const fb = cardEl.querySelector(".guide-q-feedback");
    const baseExpl = fb?.dataset.explanation || "";
    let levelMsg = "";
    let beforeLvl = null;
    let afterResult = null;

    if (conceptKeyStr) {
      const ref = findConceptByKey(conceptKeyStr);
      if (ref) {
        beforeLvl = getScore(ref.lesson.id, ref.concept.conceptName).level;
        afterResult = applyAnswer(
          ref.lesson.id,
          ref.concept.conceptName,
          ref.concept,
          kind,
          isCorrect,
          {
            question: meta.question || questionFromGuideCard(cardEl, kind),
            selectedIdx: meta.selectedIdx,
            answer: meta.answer || "",
            mode: meta.mode || "guide",
          },
        );
        if (isCorrect) {
          if (afterResult.advanced) {
            const nl = LEVEL_INFO[afterResult.newLevel];
            levelMsg = afterResult.newLevel === 7
              ? `🏆 הגעת לרמת מאסטר ב-${esc(ref.concept.conceptName)}!`
              : `⬆️ ${esc(ref.concept.conceptName)} עלה מרמה ${beforeLvl} לרמה ${afterResult.newLevel} (${nl.icon} ${nl.label}).`;
          } else {
            levelMsg = `נקודה ל-${esc(ref.concept.conceptName)}. עוד שלב וקודמת רמה.`;
          }
        } else {
          levelMsg = `${esc(ref.concept.conceptName)} נשאר ברמה ${beforeLvl}. נסה שוב במאמן הידע.`;
        }
      }
    }

    if (fb) {
      fb.innerHTML = `
        <div><strong>${isCorrect ? "✅ נכון!" : "❌ לא מדויק."}</strong> ${esc(baseExpl)}</div>
        ${levelMsg ? `<div style="margin-top:0.4rem;">${levelMsg}</div>` : ""}
        ${!isCorrect ? renderMistakeAgentFeedback(afterResult?.mistake) : ""}
      `;
    }

    // Refresh KM stats if open
    if (knowledgeMapView && knowledgeMapView.style.display === "block") {
      renderKnowledgeMap();
    }
  }

  // =========== SRS FLASHCARDS ===========
  const FLASHCARDS_SESSION_KEY = "lumenportal:flashcards:v1";
  const FLASHCARDS_STATS_KEY = "lumenportal:flashcardsStats:v1";
  const FLASHCARD_LEVEL_FALLBACKS =
    window.FLASHCARD_CONFIG?.levelFallbacks || [
      "student",
      "junior",
      "soldier",
      "child",
      "grandma",
      "professor",
    ];
  const FLASHCARD_LEVEL_LABELS = {
    grandma: "סבתא",
    child: "ילד",
    soldier: "חייל",
    student: "סטודנט",
    junior: "ג׳וניור",
    professor: "פרופסור",
  };

  let flashcardQueue = [];
  let flashcardIndex = 0;
  let flashcardsReviewed = 0;
  let flashcardsRevealed = false;
  let flashcardsFilter = "due";
  let flashcardsQuery = "";
  let flashcardsLevel = "student";
  let flashcardsMixCounter = 0;

  function loadFlashcardsSession() {
    try {
      return JSON.parse(localStorage.getItem(FLASHCARDS_SESSION_KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  function saveFlashcardsSession() {
    try {
      localStorage.setItem(
        FLASHCARDS_SESSION_KEY,
        JSON.stringify({
          filter: flashcardsFilter,
          level: flashcardsLevel,
          query: flashcardsQuery,
          reviewed: flashcardsReviewed,
          index: flashcardIndex,
          mixCounter: flashcardsMixCounter,
        }),
      );
    } catch (_) {}
  }

  function recordFlashcardReview(rating) {
    try {
      const stats = JSON.parse(
        localStorage.getItem(FLASHCARDS_STATS_KEY) ||
          '{"total":0,"again":0,"hard":0,"good":0,"easy":0}',
      );
      stats.total = (stats.total || 0) + 1;
      if (rating && Object.prototype.hasOwnProperty.call(stats, rating)) {
        stats[rating] = (stats[rating] || 0) + 1;
      }
      stats.lastReviewed = new Date().toISOString();
      localStorage.setItem(FLASHCARDS_STATS_KEY, JSON.stringify(stats));
    } catch (_) {}
  }

  function flashcardExplanationFor(concept, preferredLevel) {
    const levels = concept.levels || {};
    const ordered = [
      preferredLevel,
      ...FLASHCARD_LEVEL_FALLBACKS.filter((level) => level !== preferredLevel),
    ];
    for (const level of ordered) {
      if (levels[level]) return { level, text: levels[level] };
    }
    return { level: "", text: "" };
  }

  function flashcardConceptText(item) {
    return [
      item.concept.conceptName,
      item.lesson.title,
      item.lesson.description,
      item.explanation,
      item.concept.illustration,
      item.concept.codeExample,
      item.concept.codeExplanation,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function isFlashcardWeak(sc) {
    const attempts = sc.attempts || 0;
    const accuracy = attempts > 0 ? (sc.correct || 0) / attempts : 0;
    return (
      (sc.level || 1) <= 2 ||
      (sc.weakReports || 0) > 0 ||
      (attempts >= 3 && accuracy < 0.55)
    );
  }

  function buildFlashcardItems() {
    const query = (flashcardsQuery || "").toLowerCase().trim();
    const items = allConcepts()
      .map(({ lesson, concept }) => {
        const explanation = flashcardExplanationFor(concept, flashcardsLevel);
        if (!explanation.text) return null;
        const key = conceptKey(lesson.id, concept.conceptName);
        const sc = getScore(lesson.id, concept.conceptName);
        const attempts = sc.attempts || 0;
        const due = attempts === 0 || isSrsDue(sc);
        const weak = isFlashcardWeak(sc);
        const item = {
          key,
          lesson,
          concept,
          explanation: explanation.text,
          explanationLevel: explanation.level,
          difficulty: getDifficulty(concept),
          attempts,
          due,
          weak,
          level: sc.level || 1,
        };
        if (query && !flashcardConceptText(item).includes(query)) return null;
        if (flashcardsFilter === "due" && !due) return null;
        if (flashcardsFilter === "weak" && !weak) return null;
        if (flashcardsFilter === "new" && attempts > 0) return null;
        if (flashcardsFilter === "mastered" && item.level < 7) return null;
        return item;
      })
      .filter(Boolean);

    const sorted = items.sort((a, b) => {
      if (a.due !== b.due) return a.due ? -1 : 1;
      if (a.weak !== b.weak) return a.weak ? -1 : 1;
      if (a.level !== b.level) return a.level - b.level;
      if (a.difficulty !== b.difficulty) return b.difficulty - a.difficulty;
      if (a.lesson.id !== b.lesson.id) return a.lesson.id.localeCompare(b.lesson.id);
      return a.concept.conceptName.localeCompare(b.concept.conceptName);
    });

    if (flashcardsMixCounter > 0 && window.RNG?.create) {
      const seed = window.RNG.seedFromString(
        `flashcards:${flashcardsFilter}:${flashcardsQuery}:${flashcardsLevel}:${flashcardsMixCounter}`,
      );
      return window.RNG.create(seed).shuffle(sorted);
    }
    return sorted;
  }

  function flashcardCounts() {
    return allConcepts().reduce(
      (acc, { lesson, concept }) => {
        const explanation = flashcardExplanationFor(concept, flashcardsLevel);
        if (!explanation.text) return acc;
        const sc = getScore(lesson.id, concept.conceptName);
        const attempts = sc.attempts || 0;
        if (attempts === 0 || isSrsDue(sc)) acc.due++;
        if (isFlashcardWeak(sc)) acc.weak++;
        if ((sc.level || 1) >= 7) acc.mastered++;
        acc.total++;
        return acc;
      },
      { total: 0, due: 0, weak: 0, mastered: 0 },
    );
  }

  function dueLabelFor(item) {
    if (item.attempts === 0) return "חדש";
    const sc = getScore(item.lesson.id, item.concept.conceptName);
    if (isSrsDue(sc)) return "חזרה היום";
    if (window.SRS?.daysUntilDue) {
      const days = window.SRS.daysUntilDue(sc.srsState);
      if (days <= 1) return "מחר";
      return `עוד ${days} ימים`;
    }
    return "מתוזמן";
  }

  function refreshFlashcards(options = {}) {
    const keepIndex = options.keepIndex === true;
    flashcardQueue = buildFlashcardItems();
    if (!keepIndex) flashcardIndex = 0;
    if (flashcardIndex >= flashcardQueue.length) {
      flashcardIndex = flashcardQueue.length;
    }
    flashcardsRevealed = false;
    saveFlashcardsSession();
    renderFlashcards();
  }

  function openFlashcards(options = {}) {
    const saved = loadFlashcardsSession();
    flashcardsFilter = options.filter || saved.filter || flashcardsFilter;
    flashcardsLevel = options.level || saved.level || flashcardsLevel;
    flashcardsQuery = typeof options.query === "string" ? options.query : (saved.query || "");
    flashcardsReviewed = Number.isInteger(saved.reviewed) ? saved.reviewed : 0;
    flashcardIndex = Number.isInteger(saved.index) ? saved.index : 0;
    flashcardsMixCounter = Number.isInteger(saved.mixCounter) ? saved.mixCounter : 0;
    if (options.filter || options.level || typeof options.query === "string") {
      flashcardIndex = 0;
    }

    const filterEl = document.getElementById("fc-filter");
    const levelEl = document.getElementById("fc-level");
    const searchEl = document.getElementById("fc-search");
    if (filterEl) filterEl.value = flashcardsFilter;
    if (levelEl) levelEl.value = flashcardsLevel;
    if (searchEl) searchEl.value = flashcardsQuery;

    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🃏 כרטיסיות חזרה";
    currentLessonDesc.textContent =
      "תרגול קצר עם חשיפה עצמית ודירוג Again / Hard / Good / Easy, מחובר ישירות ל-SRS ולמפת הידע.";
    flashcardsView.style.display = "block";
    openFlashcardsBtn?.classList.add("active");
    flashcardQueue = buildFlashcardItems();
    if (flashcardIndex >= flashcardQueue.length) flashcardIndex = 0;
    renderFlashcards();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function renderFlashcards() {
    const shell = document.getElementById("fc-card-shell");
    if (!shell) return;
    setFlashcardsContextTree();
    const counts = flashcardCounts();
    const totalEl = document.getElementById("fc-total");
    const dueEl = document.getElementById("fc-due");
    const weakEl = document.getElementById("fc-weak");
    const reviewedEl = document.getElementById("fc-reviewed");
    const progressText = document.getElementById("fc-progress-text");
    const progressFill = document.getElementById("fc-progress-fill");
    if (totalEl) totalEl.textContent = String(flashcardQueue.length);
    if (dueEl) dueEl.textContent = String(counts.due);
    if (weakEl) weakEl.textContent = String(counts.weak);
    if (reviewedEl) reviewedEl.textContent = String(flashcardsReviewed);

    const completed = flashcardQueue.length > 0 && flashcardIndex >= flashcardQueue.length;
    const currentNumber = completed
      ? flashcardQueue.length
      : Math.min(flashcardIndex + 1, flashcardQueue.length);
    const pct = flashcardQueue.length
      ? Math.round((currentNumber / flashcardQueue.length) * 100)
      : 0;
    if (progressText) progressText.textContent = `${currentNumber} / ${flashcardQueue.length}`;
    if (progressFill) progressFill.style.width = `${pct}%`;

    if (!flashcardQueue.length) {
      shell.innerHTML = `
        <div class="fc-empty">
          <div class="big-icon">🃏</div>
          <h3>אין כרטיסים בסינון הנוכחי</h3>
          <p>שנה סינון או חיפוש כדי לראות מושגים קיימים מתוך חומרי השיעור.</p>
          <button class="km-btn-mini" id="fc-show-all-empty">📚 הצג הכל</button>
        </div>`;
      document.getElementById("fc-show-all-empty")?.addEventListener("click", () => {
        flashcardsFilter = "all";
        flashcardsQuery = "";
        const filterEl = document.getElementById("fc-filter");
        const searchEl = document.getElementById("fc-search");
        if (filterEl) filterEl.value = flashcardsFilter;
        if (searchEl) searchEl.value = flashcardsQuery;
        refreshFlashcards();
      });
      return;
    }

    if (completed) {
      shell.innerHTML = `
        <div class="fc-complete">
          <div class="big-icon">✅</div>
          <h3>הסשן הושלם</h3>
          <p>נסקרו ${flashcardsReviewed} כרטיסים. אפשר להתחיל שוב עם אותו סינון או לעבור למפת הידע כדי לראות את השינוי ברמות.</p>
          <div class="fc-complete-actions">
            <button class="km-btn-mini" id="fc-restart-complete">↺ התחל שוב</button>
            <button class="km-btn-mini" id="fc-open-km-complete">🗺️ פתח מפת ידע</button>
          </div>
        </div>`;
      document.getElementById("fc-restart-complete")?.addEventListener("click", () => {
        flashcardIndex = 0;
        flashcardsRevealed = false;
        saveFlashcardsSession();
        renderFlashcards();
      });
      document.getElementById("fc-open-km-complete")?.addEventListener("click", openKnowledgeMap);
      return;
    }

    const item = flashcardQueue[flashcardIndex];
    const sc = getScore(item.lesson.id, item.concept.conceptName);
    const levelInfo = LEVEL_INFO[sc.level || 1] || LEVEL_INFO[1];
    const levelLabel = FLASHCARD_LEVEL_LABELS[item.explanationLevel] || "הסבר";
    const hasCode = !!item.concept.codeExample;
    shell.innerHTML = `
      <div class="fc-card ${flashcardsRevealed ? "is-revealed" : ""}">
        <div class="fc-card-meta">
          <span>${esc(item.lesson.title)}</span>
          <span class="lvl-pill ${levelInfo.cssClass}">${levelInfo.icon} רמה ${sc.level || 1}</span>
          <span>קושי ${item.difficulty}/10</span>
          <span class="${item.due ? "fc-pill-due" : ""}">${esc(dueLabelFor(item))}</span>
          ${item.weak ? `<span class="fc-pill-weak">חולשה</span>` : ""}
        </div>
        <div class="fc-card-front">
          <div class="fc-front-kicker">מה המשמעות של המושג?</div>
          <h3>${esc(item.concept.conceptName)}</h3>
          <p>${esc(item.lesson.description || "")}</p>
        </div>
        <div class="fc-card-back" ${flashcardsRevealed ? "" : 'aria-hidden="true"'}>
          <div class="fc-back-label">${esc(levelLabel)}</div>
          <p>${esc(item.explanation)}</p>
          ${
            item.concept.illustration
              ? `<div class="fc-illustration">${esc(item.concept.illustration)}</div>`
              : ""
          }
          ${
            hasCode
              ? `<pre class="fc-code" dir="ltr"><code>${esc(item.concept.codeExample)}</code></pre>`
              : ""
          }
          ${
            item.concept.codeExplanation
              ? `<div class="fc-code-note">${esc(item.concept.codeExplanation)}</div>`
              : ""
          }
        </div>
        <div class="fc-actions">
          ${
            flashcardsRevealed
              ? `
                <button class="fc-rate again" data-fc-rate="again">↺ Again</button>
                <button class="fc-rate hard" data-fc-rate="hard">קשה</button>
                <button class="fc-rate good" data-fc-rate="good">טוב</button>
                <button class="fc-rate easy" data-fc-rate="easy">קל</button>
              `
              : `<button class="fc-reveal-btn" id="fc-reveal">הצג תשובה</button>`
          }
          <button class="km-btn-mini" id="fc-open-lesson">פתח בשיעור</button>
        </div>
      </div>`;

    document.getElementById("fc-reveal")?.addEventListener("click", () => {
      flashcardsRevealed = true;
      renderFlashcards();
    });
    shell.querySelectorAll("[data-fc-rate]").forEach((btn) => {
      btn.addEventListener("click", () => rateFlashcard(btn.dataset.fcRate));
    });
    document.getElementById("fc-open-lesson")?.addEventListener("click", () => {
      openLesson(item.lesson.id);
      setTimeout(() => {
        const cards = document.querySelectorAll(".concept-card h4");
        for (const h of cards) {
          if (h.textContent.trim() === item.concept.conceptName) {
            h.closest(".concept-card")?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            break;
          }
        }
      }, 250);
    });
  }

  function rateFlashcard(rating) {
    const item = flashcardQueue[flashcardIndex];
    if (!item) return;
    const sc = ensureScore(item.lesson.id, item.concept.conceptName);
    const beforeLevel = sc.level || 1;
    const correct = rating !== "again";
    sc.attempts = (sc.attempts || 0) + 1;
    if (correct) {
      sc.correct = (sc.correct || 0) + 1;
      sc.correctRunCount = (sc.correctRunCount || 0) + 1;
    } else {
      sc.correctRunCount = 0;
      sc.weakReports = (sc.weakReports || 0) + 1;
      sc.passedMC = false;
      sc.passedFill = false;
    }

    let advanced = false;
    if (rating === "good" || rating === "easy") {
      const step = rating === "easy" && item.difficulty <= 4 ? 2 : 1;
      sc.level = Math.min(7, (sc.level || 1) + step);
      advanced = sc.level > beforeLevel;
      sc.passedMC = false;
      sc.passedFill = false;
    }

    try {
      if (window.SRS?.update) {
        window.SRS.update(sc.srsState, correct, item.difficulty);
        const dayMs = window.SRS.DAY_MS || 86400000;
        const now = Date.now();
        if (rating === "hard") {
          sc.srsState.due = Math.min(sc.srsState.due, now + dayMs);
        } else if (rating === "easy") {
          const easyDays = item.difficulty <= 4 ? 10 : 5;
          sc.srsState.due = Math.max(sc.srsState.due, now + easyDays * dayMs);
        }
      }
    } catch (_) {}

    flashcardsReviewed++;
    recordFlashcardReview(rating);
    recordLearningEvidence("flashcard_review", {
      ...conceptEvidencePayload(item.lesson.id, item.concept.conceptName, item.concept),
      source: "flashcards",
      kind: "srs",
      rating,
      correct,
      masteryBefore: beforeLevel,
      masteryAfter: sc.level || beforeLevel,
      advanced,
    });
    flashcardIndex++;
    flashcardsRevealed = false;
    tickStudyStreak();
    awardXP(rating === "again" ? 2 : rating === "hard" ? 6 : rating === "good" ? 12 : 18);
    checkAchievements({
      lessonId: item.lesson.id,
      conceptName: item.concept.conceptName,
      correct,
      advanced,
      sc,
    });
    saveScores();
    updateProgress();
    saveFlashcardsSession();
    renderFlashcards();
  }

  document.getElementById("fc-search")?.addEventListener("input", (e) => {
    flashcardsQuery = e.target.value;
    refreshFlashcards();
  });
  document.getElementById("fc-filter")?.addEventListener("change", (e) => {
    flashcardsFilter = e.target.value;
    refreshFlashcards();
  });
  document.getElementById("fc-level")?.addEventListener("change", (e) => {
    flashcardsLevel = e.target.value;
    refreshFlashcards();
  });
  document.getElementById("fc-mix-order")?.addEventListener("click", () => {
    flashcardsMixCounter++;
    refreshFlashcards();
  });
  document.getElementById("fc-reset-session")?.addEventListener("click", () => {
    flashcardsReviewed = 0;
    flashcardIndex = 0;
    flashcardsRevealed = false;
    refreshFlashcards();
  });

  // Toolbar wiring (guide)
  document.getElementById("guide-search")?.addEventListener("input", (e) => {
    guideQuery = e.target.value;
    renderGuide();
  });
  document.getElementById("guide-expand-all")?.addEventListener("click", () => {
    (window.QUICK_GUIDE?.topics || []).forEach((t) => {
      guideOpenStates[t.id] = true;
    });
    renderGuide();
  });
  document.getElementById("guide-collapse-all")?.addEventListener("click", () => {
    guideOpenStates = {};
    renderGuide();
  });
  document.getElementById("grandma-knowledge-search")?.addEventListener("input", (e) => {
    grandmaKnowledgeQuery = e.target.value;
    grandmaKnowledgeSelectedTerm = null;
    grandmaKnowledgeSelectedBranch = null;
    grandmaKnowledgeViewMode = grandmaKnowledgeQuery.trim() ? "search" : "atlas";
    renderGrandmaKnowledge();
  });
  document.getElementById("grandma-knowledge-expand-all")?.addEventListener("click", () => {
    const tree = buildGrandmaTree(window.GRANDMA_KNOWLEDGE || { sections: [] }, "");
    tree.forEach((topic) => {
      grandmaKnowledgeOpenStates[topic.id] = true;
      topic.subtopics.forEach((subtopic) => {
        grandmaKnowledgeOpenStates[subtopic.id] = true;
        subtopic.sections.forEach((section) => {
          grandmaKnowledgeOpenStates[section.id] = true;
        });
      });
    });
    renderGrandmaKnowledge();
  });
  document.getElementById("grandma-knowledge-collapse-all")?.addEventListener("click", () => {
    grandmaKnowledgeOpenStates = {};
    renderGrandmaKnowledge();
  });

  // Wire sidebar quick-action buttons
  openKnowledgeMapBtn?.addEventListener("click", openKnowledgeMap);
  openStudyModeBtn?.addEventListener("click", openStudyMode);
  openTrainerBtn?.addEventListener("click", openTrainer);
  openGuideBtn?.addEventListener("click", openGuide);
  openGrandmaKnowledgeBtn?.addEventListener("click", openGrandmaKnowledge);
  openProgrammingBasicsBtn?.addEventListener("click", openProgrammingBasics);
  openProgrammingPrinciplesBtn?.addEventListener("click", openProgrammingPrinciples);
  openProgrammingMuseumBtn?.addEventListener("click", openProgrammingMuseum);
  openLearningEvidenceBtn?.addEventListener("click", openLearningEvidence);
  openCapstonesBtn?.addEventListener("click", openCapstones);
  openBlueprintsBtn?.addEventListener("click", openBlueprints);
  document.getElementById("le-refresh")?.addEventListener("click", renderLearningEvidence);
  document.getElementById("le-export-json")?.addEventListener("click", exportLearningEvidenceJson);
  document.getElementById("le-report-md")?.addEventListener("click", exportLearningEvidenceReport);
  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-teachback-save]");
    if (btn) saveTeachBackResponse(btn);
    const confusedBtn = ev.target.closest("[data-still-confused]");
    if (confusedBtn) handleStillConfused(confusedBtn);
  });
  openFlashcardsBtn?.addEventListener("click", openFlashcards);
  document.getElementById("open-code-anatomy")?.addEventListener("click", openCodeAnatomy);
  openCodeblocksBtn?.addEventListener("click", openCodeblocks);
  openTraceBtn?.addEventListener("click", openTracePage);

  // Global Print-to-PDF — works on every view. Sets a body class to mark
  // which view is "active" (so @media print can isolate it), triggers
  // the browser's native print dialog (user picks "Save as PDF"), then
  // restores state.
  document.getElementById("global-print-btn")?.addEventListener("click", () => {
    const activeBtn = document.querySelector(".top-tab.active");
    const tab = activeBtn?.dataset?.tab || "home";
    const html = document.documentElement;
    const body = document.body;
    body.dataset.printingView = tab;
    body.classList.add("is-printing");
    // Expand all collapsible sections so content isn't hidden in print
    document.querySelectorAll(".guide-topic").forEach((t) => t.classList.add("is-open"));
    document.querySelectorAll(".cb-block").forEach((b) => b.classList.add("is-open"));
    setTimeout(() => {
      window.print();
      // Restore after print dialog closes
      setTimeout(() => {
        body.classList.remove("is-printing");
        delete body.dataset.printingView;
      }, 500);
    }, 100);
  });

  // =========== P1.5.1 — Mock Exam Mode ===========
  const MX_HISTORY_KEY = "lumenportal:examHistory:v1";
  const EXAM_TEMPLATES = [
    {
      id: "react_full",
      name: "⚛️ React מלא",
      desc: "30 שאלות מ-lessons 21-27 (45 דקות)",
      durationMin: 45,
      distribution: { mc: 18, fill: 7, trace: 4, bug: 1 },
      filter: (k) => /^lesson_(2[1-7]|closures)::/.test(k),
    },
    {
      id: "react_quick",
      name: "⚡ React מהיר",
      desc: "15 שאלות (20 דקות)",
      durationMin: 20,
      distribution: { mc: 10, fill: 4, trace: 1, bug: 0 },
      filter: (k) => /^lesson_(2[1-7])::/.test(k),
    },
    {
      id: "js_foundations",
      name: "🟦 JavaScript Foundations",
      desc: "20 שאלות מ-lessons 11,12,13,15,19 (30 דקות)",
      durationMin: 30,
      distribution: { mc: 14, fill: 5, trace: 1, bug: 0 },
      filter: (k) => /^(lesson_(1[1-3]|15|19)|workbook_taskmanager)::/.test(k),
    },
    {
      id: "all_full",
      name: "🌐 הכל - מבחן מלא",
      desc: "40 שאלות (60 דקות)",
      durationMin: 60,
      distribution: { mc: 24, fill: 10, trace: 4, bug: 2 },
      filter: () => true,
    },
    {
      id: "practice_short",
      name: "🥕 תרגול קצר",
      desc: "10 שאלות (15 דקות)",
      durationMin: 15,
      distribution: { mc: 7, fill: 2, trace: 1, bug: 0 },
      filter: () => true,
    },
  ];

  const mxState = {
    template: null,
    questions: [],   // [{id, kind, q}] uniform format
    answers: {},     // qid → answer
    currentIdx: 0,
    startTime: 0,
    deadline: 0,
    timerId: null,
  };

  function loadExamHistory() {
    try {
      return JSON.parse(localStorage.getItem(MX_HISTORY_KEY) || "[]");
    } catch (_) {
      return [];
    }
  }
  function saveExamToHistory(record) {
    const list = loadExamHistory();
    list.unshift(record);
    // Keep last 30
    list.length = Math.min(list.length, 30);
    try { localStorage.setItem(MX_HISTORY_KEY, JSON.stringify(list)); } catch (_) {}
    recordLearningEvidence("exam_attempt", {
      source: "mock-exam",
      score: record.score || 0,
      durationSec: record.durationSec || 0,
      correct: (record.score || 0) >= 70,
    });
  }

  function composeMockExam(template) {
    // Use deterministic RNG (seeded by Date.now() + template id)
    const seed = (window.RNG && window.RNG.seedFromString)
      ? window.RNG.seedFromString(template.id + ":" + Date.now())
      : Date.now() & 0x7fffffff;
    const rng = window.RNG.create(seed);

    const sourceMC = (window.QUESTIONS_BANK?.mc || []).filter((q) => template.filter(q.conceptKey || ""));
    const sourceFill = (window.QUESTIONS_BANK?.fill || []).filter((q) => template.filter(q.conceptKey || ""));
    const sourceTrace = (window.QUESTIONS_BANK?.trace || []).filter((q) => template.filter(q.conceptKey || ""));
    const sourceBug = (window.QUESTIONS_BANK?.bug || []).filter((q) => template.filter(q.conceptKey || ""));

    function sample(arr, n) {
      if (!arr || !arr.length) return [];
      const shuffled = rng.shuffle(arr);
      return shuffled.slice(0, Math.min(n, shuffled.length));
    }

    const picked = [
      ...sample(sourceMC, template.distribution.mc).map((q) => ({ kind: "mc", q })),
      ...sample(sourceFill, template.distribution.fill).map((q) => ({ kind: "fill", q })),
      ...sample(sourceTrace, template.distribution.trace).map((q) => ({ kind: "trace", q })),
      ...sample(sourceBug, template.distribution.bug).map((q) => ({ kind: "bug", q })),
    ];

    return rng.shuffle(picked);
  }

  function startMockExam(template) {
    const questions = composeMockExam(template);
    if (!questions.length) {
      alert("לא נמצאו שאלות לתבנית זו. ייתכן שהמאגר עדיין ריק.");
      return;
    }
    // Lazy-load seeded bank if needed
    if (window.ensureSeededBank) window.ensureSeededBank();

    mxState.template = template;
    mxState.questions = questions;
    mxState.answers = {};
    mxState.currentIdx = 0;
    mxState.startTime = Date.now();
    mxState.deadline = Date.now() + template.durationMin * 60 * 1000;

    document.getElementById("mx-settings").style.display = "none";
    document.getElementById("mx-result").style.display = "none";
    document.getElementById("mx-runner").style.display = "block";

    // Hide Pocket FAB during exam (no cheating with saved concepts)
    if (typeof window.pocketIsHidden === "function") window.pocketIsHidden(true);

    renderMxQuestion();
    startMxTimer();
  }

  function startMxTimer() {
    stopMxTimer();
    mxState.timerId = setInterval(() => {
      const remaining = mxState.deadline - Date.now();
      const elTimer = document.getElementById("mx-timer");
      if (!elTimer) return;
      if (remaining <= 0) {
        elTimer.textContent = "⏱️ 00:00";
        stopMxTimer();
        submitMockExam(true);
        return;
      }
      const min = Math.floor(remaining / 60000);
      const sec = Math.floor((remaining % 60000) / 1000);
      elTimer.textContent = `⏱️ ${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
      elTimer.classList.toggle("mx-timer-warn", min < 5);
    }, 500);
  }
  function stopMxTimer() {
    if (mxState.timerId) {
      clearInterval(mxState.timerId);
      mxState.timerId = null;
    }
  }

  function renderMxQuestion() {
    const idx = mxState.currentIdx;
    const total = mxState.questions.length;
    const item = mxState.questions[idx];
    if (!item) return;
    const { kind, q } = item;
    const qid = `${kind}:${q.id}`;
    document.getElementById("mx-progress").innerHTML =
      `שאלה ${idx + 1} / ${total} <span class="mx-progress-kind">${
        kind === "mc" ? "📝 רב-ברירה" :
        kind === "fill" ? "✍️ השלם" :
        kind === "trace" ? "🔬 חיזוי פלט" :
        "🐛 ציד באג"
      }</span>`;

    let body = "";
    const userAns = mxState.answers[qid];

    if (kind === "mc") {
      body = `
        <div class="mx-q-text">${esc(q.question || "")}</div>
        <div class="mx-q-options">
          ${(q.options || []).map((opt, i) => `
            <label class="mx-q-option ${userAns === i ? 'is-selected' : ''}">
              <input type="radio" name="mx-mc" value="${i}" ${userAns === i ? "checked" : ""} />
              <span>${esc(opt)}</span>
            </label>`).join("")}
        </div>`;
    } else if (kind === "fill") {
      body = `
        <div class="mx-q-text">השלם את החסר ב-____ — נסה להקליד את התשובה הנכונה</div>
        <pre class="mx-q-code"><code>${esc(q.code || "")}</code></pre>
        <input class="mx-q-fill" id="mx-q-fill-input" type="text" value="${esc(userAns || "")}" placeholder="התשובה שלך כאן..." dir="ltr" />`;
    } else if (kind === "trace") {
      const code = q.code || "";
      const stepsDone = userAns?.steps?.length || 0;
      body = `
        <div class="mx-q-text">${esc(q.title || "חיזוי פלט")} — ${(q.steps || []).length} שלבים</div>
        <pre class="mx-q-code"><code>${esc(code)}</code></pre>
        ${(q.steps || []).map((s, i) => `
          <div class="mx-q-trace-step">
            <div class="mx-q-trace-prompt">שלב ${i+1} (שורה ${s.line}): ${esc(s.prompt)}</div>
            <input class="mx-q-fill" data-step="${i}" type="text" value="${esc((userAns?.steps||[])[i] || "")}" placeholder="תשובה לשלב ${i+1}" dir="ltr" />
          </div>`).join("")}`;
    } else if (kind === "bug") {
      body = `
        <div class="mx-q-text">${esc(q.title || "מצא את הבאג")}${q.hint ? ` — ${esc(q.hint)}` : ""}</div>
        <pre class="mx-q-code"><code>${esc(q.brokenCode || "")}</code></pre>
        <div class="mx-q-options">
          ${(q.options || []).map((opt, i) => `
            <label class="mx-q-option ${userAns === i ? 'is-selected' : ''}">
              <input type="radio" name="mx-bug" value="${i}" ${userAns === i ? "checked" : ""} />
              <span>${esc(opt)}</span>
            </label>`).join("")}
        </div>`;
    }

    const container = document.getElementById("mx-question");
    const supportRef = q.conceptKey ? findConceptByKeyLoose(q.conceptKey) : null;
    container.innerHTML = `
      <div class="question-learning-layout mock">
        <div class="question-answer-area">${body}</div>
        ${renderQuestionPrereqPanel({
          question: q,
          lesson: supportRef?.lesson || null,
          concept: supportRef?.concept || null,
          mode: "mock",
        })}
      </div>`;
    wireQuestionPrerequisiteNavigation(container);

    // Wire input handlers
    if (kind === "mc") {
      container.querySelectorAll('input[name="mx-mc"]').forEach((r) => {
        r.addEventListener("change", (e) => {
          mxState.answers[qid] = parseInt(e.target.value, 10);
          rebuildMxNav();
        });
      });
    } else if (kind === "bug") {
      container.querySelectorAll('input[name="mx-bug"]').forEach((r) => {
        r.addEventListener("change", (e) => {
          mxState.answers[qid] = parseInt(e.target.value, 10);
          rebuildMxNav();
        });
      });
    } else if (kind === "fill") {
      container.querySelector("#mx-q-fill-input")?.addEventListener("input", (e) => {
        mxState.answers[qid] = e.target.value;
        rebuildMxNav();
      });
    } else if (kind === "trace") {
      container.querySelectorAll(".mx-q-fill[data-step]").forEach((inp) => {
        inp.addEventListener("input", (e) => {
          const stepIdx = parseInt(e.target.dataset.step, 10);
          if (!mxState.answers[qid]) mxState.answers[qid] = { steps: [] };
          mxState.answers[qid].steps[stepIdx] = e.target.value;
          rebuildMxNav();
        });
      });
    }

    rebuildMxNav();
  }

  function rebuildMxNav() {
    const nav = document.getElementById("mx-question-nav");
    if (!nav) return;
    nav.innerHTML = mxState.questions
      .map((item, i) => {
        const qid = `${item.kind}:${item.q.id}`;
        const ans = mxState.answers[qid];
        const isAnswered = ans !== undefined && ans !== "" && (typeof ans !== "object" || (ans.steps && ans.steps.some((s) => s)));
        const isCurrent = i === mxState.currentIdx;
        return `<button class="mx-nav-btn ${isAnswered ? "is-answered" : ""} ${isCurrent ? "is-current" : ""}" data-idx="${i}" aria-label="עבור לשאלה ${i+1}">${i+1}</button>`;
      })
      .join("");
    nav.querySelectorAll(".mx-nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        mxState.currentIdx = parseInt(btn.dataset.idx, 10);
        renderMxQuestion();
      });
    });
  }

  function gotoNextMxQuestion() {
    if (mxState.currentIdx < mxState.questions.length - 1) {
      mxState.currentIdx++;
      renderMxQuestion();
    }
  }
  function gotoPrevMxQuestion() {
    if (mxState.currentIdx > 0) {
      mxState.currentIdx--;
      renderMxQuestion();
    }
  }

  function submitMockExam(autoTimeout) {
    if (!autoTimeout && !confirm(`להגיש את המבחן? ענית על ${countMxAnswered()}/${mxState.questions.length} שאלות.`))
      return;

    stopMxTimer();
    // Restore Pocket FAB after exam
    if (typeof window.pocketIsHidden === "function") window.pocketIsHidden(false);
    // Score the exam
    const breakdown = { mc: { right: 0, total: 0 }, fill: { right: 0, total: 0 }, trace: { right: 0, total: 0 }, bug: { right: 0, total: 0 } };
    const wrongConcepts = new Set();
    const wrongRecords = new Map();

    mxState.questions.forEach((item) => {
      const { kind, q } = item;
      const qid = `${kind}:${q.id}`;
      const ans = mxState.answers[qid];
      breakdown[kind].total++;
      let correct = false;

      if (kind === "mc") {
        correct = ans === q.correctIndex;
      } else if (kind === "bug") {
        correct = ans === q.correctIndex;
      } else if (kind === "fill") {
        const norm = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
        correct = norm(ans) === norm(q.answer);
      } else if (kind === "trace") {
        // All steps must be correct
        if (ans && ans.steps) {
          const norm = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
          correct = (q.steps || []).every((s, i) => {
            const userVal = norm(ans.steps[i]);
            if (norm(s.answer) === userVal) return true;
            return Array.isArray(s.acceptable) && s.acceptable.some((a) => norm(a) === userVal);
          });
        }
      }
      if (correct) {
        breakdown[kind].right++;
      } else {
        const key = primaryConceptKeyForQuestion({ question: q });
        if (key) {
          wrongConcepts.add(key);
          const mistakeRecord = recordWrongQuestionByConceptKey(key, {
            question: q,
            kind,
            selectedIdx: (kind === "mc" || kind === "bug") && Number.isInteger(ans) ? ans : null,
            answer: kind === "trace" ? ans : String(ans || ""),
            mode: "mock-exam",
          });
          if (mistakeRecord && !wrongRecords.has(key)) wrongRecords.set(key, mistakeRecord);
        }
      }
    });

    const totalRight = Object.values(breakdown).reduce((s, b) => s + b.right, 0);
    const totalQs = Object.values(breakdown).reduce((s, b) => s + b.total, 0);
    const score = totalQs ? Math.round((totalRight / totalQs) * 100) : 0;
    const durationSec = Math.round((Date.now() - mxState.startTime) / 1000);

    // Save to history
    const record = {
      templateId: mxState.template.id,
      templateName: mxState.template.name,
      date: new Date().toISOString(),
      score, totalRight, totalQs,
      breakdown,
      durationSec,
      autoTimeout: !!autoTimeout,
    };
    saveExamToHistory(record);

    renderMxResult(record, [...wrongConcepts], [...wrongRecords.values()]);
  }

  function countMxAnswered() {
    return mxState.questions.filter((item) => {
      const ans = mxState.answers[`${item.kind}:${item.q.id}`];
      return ans !== undefined && ans !== "" && (typeof ans !== "object" || (ans.steps && ans.steps.some((s) => s)));
    }).length;
  }

  function renderMxResult(record, wrongConcepts, wrongRecords = []) {
    document.getElementById("mx-runner").style.display = "none";
    const result = document.getElementById("mx-result");
    result.style.display = "block";

    const grade = record.score >= 90 ? "A" : record.score >= 80 ? "B" : record.score >= 70 ? "C" : record.score >= 60 ? "D" : "F";
    const gradeCls = "topic-grade-" + grade.toLowerCase();
    const min = Math.floor(record.durationSec / 60);
    const sec = record.durationSec % 60;

    const breakdownHtml = Object.entries(record.breakdown)
      .filter(([, b]) => b.total > 0)
      .map(([k, b]) => {
        const label = k === "mc" ? "📝 רב-ברירה" : k === "fill" ? "✍️ השלמה" : k === "trace" ? "🔬 חיזוי פלט" : "🐛 ציד באג";
        const pct = Math.round((b.right / b.total) * 100);
        return `<div class="mx-result-row"><span>${label}</span><span class="mx-result-row-score">${b.right}/${b.total} (${pct}%)</span></div>`;
      }).join("");

    const weakHtml = wrongConcepts.length
      ? `<div class="mx-result-weak">
           <h4>📚 מושגים לחיזוק — נוספו אוטומטית לחולשות</h4>
           <ul>${
             wrongConcepts.slice(0, 12).map((k) => {
               const rec = wrongRecords.find((item) => item.conceptKey === k);
               const ref = findConceptByKeyLoose(k);
               const topic = rec?.topic || (ref ? getTopicForLesson(ref.lesson.id).topic : "");
               const name = rec?.conceptName || ref?.concept?.conceptName || k;
               return `<li><strong>${esc(name)}</strong>${topic ? `<span>${esc(topic)}</span>` : ""}</li>`;
             }).join("")
           }</ul>
           ${
             wrongRecords[0]
               ? `<div class="mx-result-agent-note">${renderMistakeAgentFeedback(wrongRecords[0])}</div>`
               : ""
           }
         </div>`
      : `<div class="mx-result-weak"><p>🏆 מצוין — כל השאלות נכונות!</p></div>`;

    result.innerHTML = `
      <div class="mx-result-head">
        <div class="mx-result-grade ${gradeCls}">${grade}</div>
        <div class="mx-result-title">
          <h2>${record.templateName} — ${record.score}%</h2>
          <p>${record.totalRight} מתוך ${record.totalQs} שאלות נכונות${record.autoTimeout ? " · ⏱️ הזמן נגמר" : ""} · משך: ${min}:${String(sec).padStart(2, "0")}</p>
        </div>
      </div>
      <div class="mx-result-breakdown">
        <h4>פירוק לפי סוג שאלה</h4>
        ${breakdownHtml}
      </div>
      ${weakHtml}
      <div class="mx-result-actions">
        <button class="km-btn-mini primary" id="mx-result-new">📝 מבחן חדש</button>
        <button class="km-btn-mini" id="mx-result-trainer">🧠 לאימון במאמן</button>
      </div>`;

    document.getElementById("mx-result-new")?.addEventListener("click", openMockExam);
    document.getElementById("mx-result-trainer")?.addEventListener("click", () => {
      if (typeof openTrainer === "function") openTrainer();
    });
  }

  function renderExamSettings() {
    const container = document.getElementById("mx-templates");
    if (!container) return;
    setMockExamContextTree();
    container.innerHTML = EXAM_TEMPLATES
      .map((t) => `
        <button class="mx-template-card" data-tid="${t.id}">
          <div class="mx-template-name">${esc(t.name)}</div>
          <div class="mx-template-desc">${esc(t.desc)}</div>
          <div class="mx-template-dist">📝 ${t.distribution.mc} · ✍️ ${t.distribution.fill} · 🔬 ${t.distribution.trace} · 🐛 ${t.distribution.bug}</div>
        </button>`)
      .join("");
    container.querySelectorAll(".mx-template-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tpl = EXAM_TEMPLATES.find((t) => t.id === btn.dataset.tid);
        if (tpl && confirm(`להתחיל את "${tpl.name}"?\n${tpl.desc}\n\nאזהרה: יש טיימר. אין רמזים. אין AI.`)) {
          startMockExam(tpl);
        }
      });
    });
    renderExamHistory();
  }

  function renderExamHistory() {
    const container = document.getElementById("mx-history");
    if (!container) return;
    const list = loadExamHistory();
    if (!list.length) {
      container.innerHTML = '<p class="mx-history-empty">אין עדיין מבחנים בהיסטוריה. עשה מבחן ראשון!</p>';
      return;
    }
    container.innerHTML = list.slice(0, 10)
      .map((r) => {
        const grade = r.score >= 90 ? "A" : r.score >= 80 ? "B" : r.score >= 70 ? "C" : r.score >= 60 ? "D" : "F";
        const gradeCls = "topic-grade-" + grade.toLowerCase();
        const date = new Date(r.date);
        const dateStr = `${date.getDate()}/${date.getMonth() + 1} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
        return `<div class="mx-history-row">
          <span class="mx-history-grade ${gradeCls}">${grade}</span>
          <span class="mx-history-name">${esc(r.templateName)}</span>
          <span class="mx-history-score">${r.score}%</span>
          <span class="mx-history-meta">${r.totalRight}/${r.totalQs}${r.autoTimeout ? " · ⏱️" : ""}</span>
          <span class="mx-history-date">${dateStr}</span>
        </div>`;
      })
      .join("");
  }

  function openMockExam() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "📝 מבחן מדומה";
    currentLessonDesc.textContent = "בחר תבנית. הטיימר מתחיל ברגע שלוחצים. בסוף — ציון + פירוק.";
    const view = document.getElementById("mock-exam-view");
    if (!view) return;
    view.style.display = "block";
    document.getElementById("mx-runner").style.display = "none";
    document.getElementById("mx-result").style.display = "none";
    document.getElementById("mx-settings").style.display = "block";
    document.getElementById("open-mock-exam")?.classList.add("active");
    renderExamSettings();
    if (window.ensureSeededBank) window.ensureSeededBank();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  // Wire mock exam controls (idempotent — safe even if not in DOM)
  document.getElementById("open-mock-exam")?.addEventListener("click", openMockExam);
  document.getElementById("mx-quit")?.addEventListener("click", () => {
    if (confirm("לעצור את המבחן? ההתקדמות לא תישמר.")) {
      stopMxTimer();
      openMockExam();
    }
  });
  document.getElementById("mx-prev")?.addEventListener("click", gotoPrevMxQuestion);
  document.getElementById("mx-next")?.addEventListener("click", gotoNextMxQuestion);
  document.getElementById("mx-skip")?.addEventListener("click", gotoNextMxQuestion);
  document.getElementById("mx-submit")?.addEventListener("click", () => submitMockExam(false));

  // =========== Side-by-Side Comparator View ===========
  let cmpSearch = "";
  function openComparator() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "⚖️ השוואות זוגות";
    currentLessonDesc.textContent = "טבלאות השוואה לזוגות מושגים שמתבלבלים. בחר זוג כדי לראות פירוט.";
    const view = document.getElementById("comparator-view");
    if (!view) return;
    view.style.display = "block";
    document.getElementById("open-comparator")?.classList.add("active");
    renderComparator();
    scrollToTop();
    sidebar.classList.remove("open");
  }
  function renderComparator() {
    const container = document.getElementById("cmp-list");
    if (!container) return;
    setComparatorContextTree();
    const all = typeof COMPARISONS !== "undefined" ? Object.values(COMPARISONS) : [];
    const q = cmpSearch.trim().toLowerCase();
    const filtered = all.filter((c) => {
      if (!q) return true;
      const blob = JSON.stringify(c).toLowerCase();
      return blob.includes(q);
    });
    if (!filtered.length) {
      container.innerHTML = '<div class="cmp-empty">🔍 לא נמצאו תוצאות.</div>';
      return;
    }
    container.innerHTML = filtered
      .map((cmp) => {
        const rows = (cmp.rows || [])
          .map((r) => `
            <tr>
              <td class="cmp-dim">${esc(r.dim || "")}</td>
              <td class="cmp-a">${esc(r.a || "")}</td>
              <td class="cmp-b">${esc(r.b || "")}</td>
            </tr>`)
          .join("");
        return `
          <details class="cmp-card" data-cmp="${esc(cmp.pairKey)}">
            <summary class="cmp-summary">
              <span class="cmp-sum-icons">${esc(cmp.a?.icon || "")} <strong>${esc(cmp.a?.name || "")}</strong> &nbsp;vs&nbsp; ${esc(cmp.b?.icon || "")} <strong>${esc(cmp.b?.name || "")}</strong></span>
              <span class="cmp-sum-tags">${cmp.a?.tagline ? `<span class="cmp-tag">${esc(cmp.a.tagline)}</span>` : ""} ${cmp.b?.tagline ? `<span class="cmp-tag">${esc(cmp.b.tagline)}</span>` : ""}</span>
            </summary>
            <div class="cmp-body">
              <table class="cmp-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>${esc(cmp.a?.icon || "")} ${esc(cmp.a?.name || "")}</th>
                    <th>${esc(cmp.b?.icon || "")} ${esc(cmp.b?.name || "")}</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
              ${cmp.when ? `<div class="cmp-when"><strong>📌 מתי להשתמש:</strong> ${esc(cmp.when)}</div>` : ""}
            </div>
          </details>`;
      })
      .join("");
  }
  document.getElementById("open-comparator")?.addEventListener("click", openComparator);

  // =========== P2.2 — GAP MATRIX ===========
  let gmFilter = "all";

  function openGapMatrix() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "📊 מטריצת פערים";
    currentLessonDesc.textContent = "ניתוח מצב שליטה לפי נושא — מה צריך לחזק?";
    const view = document.getElementById("gap-matrix-view");
    if (!view) return;
    view.style.display = "block";
    document.getElementById("open-gap-matrix")?.classList.add("active");
    renderGapMatrix();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function renderGapMatrix() {
    const container = document.getElementById("gm-matrix-container");
    if (!container || !window.LESSONS_DATA) return;
    setGapMatrixContextTree();

    const DAY_MS = 86_400_000;
    const now = Date.now();

    // Aggregate per topic
    const topicMap = {};
    window.LESSONS_DATA.forEach((lesson) => {
      const tax = getTopicForLesson(lesson.id);
      if (!topicMap[tax.topic]) {
        topicMap[tax.topic] = { emoji: tax.emoji, topic: tax.topic, concepts: [] };
      }
      (lesson.concepts || []).forEach((c) => {
        const sc = getScore(lesson.id, c.conceptName);
        topicMap[tax.topic].concepts.push({
          lesson: lesson.id,
          name: c.conceptName,
          level: sc.level,
          attempts: sc.attempts,
          correct: sc.correct,
          weakReports: sc.weakReports || 0,
          srsState: sc.srsState,
        });
      });
    });

    // Compute stats per topic
    const rows = Object.values(topicMap).map((t) => {
      const total = t.concepts.length;
      const mastered = t.concepts.filter((c) => c.level >= 7).length;
      const learning = t.concepts.filter((c) => c.attempts > 0 && c.level < 7).length;
      const notStarted = t.concepts.filter((c) => c.attempts === 0).length;
      const pctMastered = total ? (mastered / total) * 100 : 0;
      const pctLearning = total ? (learning / total) * 100 : 0;
      const pctNew = total ? (notStarted / total) * 100 : 0;
      const untouched7d = t.concepts.filter((c) => {
        if (!c.srsState || !c.srsState.lastReviewed) return true;
        return now - c.srsState.lastReviewed > 7 * DAY_MS;
      }).length;
      const alwaysWrong = t.concepts.filter(
        (c) => c.attempts > 3 && c.correct / c.attempts < 0.5
      ).length;
      return { ...t, total, mastered, learning, notStarted, pctMastered, pctLearning, pctNew, untouched7d, alwaysWrong };
    });

    // Determine category per row
    function rowCategory(r) {
      if (r.pctMastered >= 70) return "strong";
      if (r.learning > 0 || r.mastered > 0) return "learning";
      return "gap";
    }

    // Filter
    const filtered = rows.filter((r) => {
      if (gmFilter === "all") return true;
      if (gmFilter === "gap") return rowCategory(r) === "gap";
      if (gmFilter === "learning") return rowCategory(r) === "learning";
      if (gmFilter === "strong") return rowCategory(r) === "strong";
      if (gmFilter === "untouched") return r.untouched7d > r.total * 0.4;
      if (gmFilter === "always-wrong") return r.alwaysWrong > 0;
      return true;
    });

    // Sort: gap first, then learning, then strong
    const order = { gap: 0, learning: 1, strong: 2 };
    filtered.sort((a, b) => order[rowCategory(a)] - order[rowCategory(b)]);

    if (!filtered.length) {
      container.innerHTML = '<div class="gm-empty">אין נושאים להציג בסינון זה.</div>';
      return;
    }

    container.innerHTML = filtered
      .map((r) => {
        const cat = rowCategory(r);
        const catIcon = cat === "strong" ? "✅" : cat === "learning" ? "🟡" : "🔴";
        const bars = `
          <div class="gm-bars">
            <div class="gm-bar gm-bar-mastered" style="width:${r.pctMastered.toFixed(1)}%" title="שולט: ${r.mastered}"></div>
            <div class="gm-bar gm-bar-learning" style="width:${r.pctLearning.toFixed(1)}%" title="לומד: ${r.learning}"></div>
            <div class="gm-bar gm-bar-new" style="width:${r.pctNew.toFixed(1)}%" title="טרם התחיל: ${r.notStarted}"></div>
          </div>`;
        const smartTags = [
          r.untouched7d > 0 ? `<span class="gm-tag">⏳ ${r.untouched7d} לא נגעת 7 ימים</span>` : "",
          r.alwaysWrong > 0 ? `<span class="gm-tag gm-tag-warn">🎯 ${r.alwaysWrong} תמיד טועה</span>` : "",
        ].join("");
        return `
          <details class="gm-row gm-cat-${cat}">
            <summary>
              <span class="gm-cat-icon">${catIcon}</span>
              <span class="gm-topic-emoji">${r.emoji}</span>
              <span class="gm-topic-name">${esc(r.topic)}</span>
              <span class="gm-stats">${r.mastered}/${r.total} שולט</span>
              ${bars}
              <div class="gm-smart-tags">${smartTags}</div>
            </summary>
            <div class="gm-concept-list">
              ${r.concepts
                .sort((a, b) => a.level - b.level)
                .map((c) => {
                  const lvlClass = c.level >= 7 ? "gm-lvl-mastered" : c.level >= 4 ? "gm-lvl-mid" : "gm-lvl-low";
                  const due = c.srsState && c.srsState.due < now ? "🔁" : "";
                  return `<span class="gm-concept-chip ${lvlClass}" title="רמה ${c.level}/7">${due}${esc(c.name)}</span>`;
                })
                .join("")}
            </div>
          </details>`;
      })
      .join("");
  }

  document.getElementById("open-gap-matrix")?.addEventListener("click", openGapMatrix);
  document.getElementById("gap-matrix-view")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".gm-filter-btn");
    if (!btn) return;
    gmFilter = btn.dataset.filter || "all";
    document.querySelectorAll(".gm-filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderGapMatrix();
  });
  // ===== W8 — Pair-Match Game =====
  const PAIR_MATCH_STORE = "lumenportal:pair_match:v1";
  let pmScores = (() => { try { return JSON.parse(localStorage.getItem(PAIR_MATCH_STORE) || "{}"); } catch { return {}; } })();
  let pmCurrentGame = null;
  let pmMatched = new Set(); // matched term indices

  function openPairMatch() {
    const panel = document.getElementById("pair-match-panel");
    if (!panel) return;
    panel.style.display = panel.style.display === "none" ? "" : "none";
    if (panel.style.display !== "none") renderPairMatchGameSelect();
  }

  function renderPairMatchGameSelect() {
    const sel = document.getElementById("pm-game-select");
    if (!sel || typeof PAIR_MATCH_GAMES === "undefined") return;
    const title = document.getElementById("pm-title");
    if (title) title.textContent = "🎯 בחר משחק";
    sel.innerHTML = PAIR_MATCH_GAMES.map((g) => {
      const done = pmScores[g.id]?.completed ? " ✅" : "";
      return `<button class="pm-game-btn" data-game="${g.id}">${g.title}${done}</button>`;
    }).join("");
    document.getElementById("pm-board").innerHTML = "";
    document.getElementById("pm-status").textContent = "";
  }

  function startPairMatchGame(gameId) {
    const game = (typeof PAIR_MATCH_GAMES !== "undefined") && PAIR_MATCH_GAMES.find((g) => g.id === gameId);
    if (!game) return;
    pmCurrentGame = game;
    pmMatched = new Set();
    const title = document.getElementById("pm-title");
    if (title) title.textContent = `🎯 ${game.title}`;
    document.getElementById("pm-game-select").innerHTML = "";
    renderPairMatchBoard(game);
  }

  function renderPairMatchBoard(game) {
    const board = document.getElementById("pm-board");
    if (!board) return;
    // Shuffle definitions
    const pairRng = window.RNG.create(window.RNG.seedFromString(`pair-match:${game.id}`));
    const defs = pairRng.shuffle(game.pairs);
    board.innerHTML = `
      <div class="pm-col pm-col-terms">
        <div class="pm-col-head">מושג</div>
        ${game.pairs.map((p, i) => `<div class="pm-term" data-idx="${i}" draggable="true">${esc(p.term)}</div>`).join("")}
      </div>
      <div class="pm-col pm-col-defs">
        <div class="pm-col-head">הגדרה</div>
        ${defs.map((p, i) => {
          const origIdx = game.pairs.findIndex((op) => op.term === p.term);
          return `<div class="pm-def" data-orig="${origIdx}" data-slot="${i}">${esc(p.definition)}</div>`;
        }).join("")}
      </div>`;
    wirePairMatchDragDrop();
    document.getElementById("pm-status").textContent = `התאם ${game.pairs.length} זוגות`;
  }

  function wirePairMatchDragDrop() {
    let draggingIdx = null;
    document.querySelectorAll(".pm-term").forEach((el) => {
      el.addEventListener("dragstart", () => { draggingIdx = parseInt(el.dataset.idx, 10); el.classList.add("dragging"); });
      el.addEventListener("dragend", () => { el.classList.remove("dragging"); draggingIdx = null; });
      el.addEventListener("click", () => handlePairMatchTap(el));
    });
    document.querySelectorAll(".pm-def").forEach((el) => {
      el.addEventListener("dragover", (e) => { e.preventDefault(); el.classList.add("drag-over"); });
      el.addEventListener("dragleave", () => el.classList.remove("drag-over"));
      el.addEventListener("drop", (e) => {
        e.preventDefault();
        el.classList.remove("drag-over");
        if (draggingIdx !== null) checkPairMatch(draggingIdx, parseInt(el.dataset.orig, 10), el);
      });
      el.addEventListener("click", () => handlePairMatchTapDef(el));
    });
  }

  let pmTappedTermIdx = null;
  function handlePairMatchTap(termEl) {
    if (pmMatched.has(parseInt(termEl.dataset.idx, 10))) return;
    document.querySelectorAll(".pm-term.selected").forEach((e) => e.classList.remove("selected"));
    pmTappedTermIdx = parseInt(termEl.dataset.idx, 10);
    termEl.classList.add("selected");
  }
  function handlePairMatchTapDef(defEl) {
    if (pmTappedTermIdx === null) return;
    const origIdx = parseInt(defEl.dataset.orig, 10);
    checkPairMatch(pmTappedTermIdx, origIdx, defEl);
    pmTappedTermIdx = null;
    document.querySelectorAll(".pm-term.selected").forEach((e) => e.classList.remove("selected"));
  }

  function checkPairMatch(termIdx, defOrigIdx, defEl) {
    if (pmMatched.has(termIdx)) return;
    const correct = termIdx === defOrigIdx;
    const termEl = document.querySelector(`.pm-term[data-idx="${termIdx}"]`);
    if (correct) {
      pmMatched.add(termIdx);
      termEl?.classList.add("pm-matched");
      defEl.classList.add("pm-matched");
      if (pmMatched.size === pmCurrentGame.pairs.length) {
        document.getElementById("pm-status").textContent = "🎉 כל הזוגות הותאמו! מעולה!";
        if (!pmScores[pmCurrentGame.id]) pmScores[pmCurrentGame.id] = {};
        pmScores[pmCurrentGame.id].completed = true;
        try { localStorage.setItem(PAIR_MATCH_STORE, JSON.stringify(pmScores)); } catch {}
      }
    } else {
      termEl?.classList.add("pm-wrong");
      defEl.classList.add("pm-wrong");
      setTimeout(() => { termEl?.classList.remove("pm-wrong"); defEl.classList.remove("pm-wrong"); }, 600);
    }
  }

  document.getElementById("t-open-pair-match")?.addEventListener("click", openPairMatch);
  document.getElementById("pm-close")?.addEventListener("click", () => {
    const panel = document.getElementById("pair-match-panel");
    if (panel) panel.style.display = "none";
  });
  document.getElementById("pm-game-select")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".pm-game-btn");
    if (btn) startPairMatchGame(btn.dataset.game);
  });
  // ===== end Pair-Match =====

  // ===== W8 — Bug Hunt Quests =====
  const BQ_STORE = "lumenportal:bug_quests:v1";
  let bqScores = (() => { try { return JSON.parse(localStorage.getItem(BQ_STORE) || "{}"); } catch { return {}; } })();
  let bqCurrentQuest = null;
  let bqBugIdx = 0;
  let bqAnswered = false;

  function openBugQuests() {
    const overlay = document.getElementById("bug-quest-overlay");
    if (!overlay) return;
    overlay.style.display = "";
    renderBugQuestList();
  }

  function renderBugQuestList() {
    const body = document.getElementById("bq-body");
    const title = document.getElementById("bq-title");
    const prog = document.getElementById("bq-progress");
    if (!body) return;
    if (title) title.textContent = "🕵️ בחר קווסט";
    if (prog) prog.textContent = "";
    if (typeof BUG_QUESTS === "undefined") { body.innerHTML = "<p>טוען...</p>"; return; }
    body.innerHTML = `<div class="bq-quest-list">` +
      BUG_QUESTS.map((q) => {
        const done = bqScores[q.id]?.completed;
        return `<div class="bq-quest-card ${done ? 'bq-completed' : ''}" data-bq-id="${q.id}">
          <div class="bq-quest-title">${q.title}${done ? " ✅" : ""}</div>
          <div class="bq-quest-chapter">📖 ${esc(q.chapter)}</div>
          <div class="bq-quest-narrative">${esc(q.narrative)}</div>
          <button class="bq-start-btn" data-bq-id="${q.id}">▶ התחל</button>
        </div>`;
      }).join("") + `</div>`;
  }

  function startBugQuest(questId) {
    const quest = (typeof BUG_QUESTS !== "undefined") && BUG_QUESTS.find((q) => q.id === questId);
    if (!quest) return;
    bqCurrentQuest = quest;
    bqBugIdx = 0;
    bqAnswered = false;
    showBugQuestBug();
  }

  function showBugQuestBug() {
    const quest = bqCurrentQuest;
    if (!quest) return;
    const bug = quest.bugs[bqBugIdx];
    if (!bug) { showBugQuestComplete(); return; }
    const title = document.getElementById("bq-title");
    const prog = document.getElementById("bq-progress");
    const body = document.getElementById("bq-body");
    if (title) title.textContent = quest.title;
    if (prog) prog.textContent = `באג ${bqBugIdx + 1} מתוך ${quest.bugs.length}`;
    bqAnswered = false;
    body.innerHTML = `
      <div class="bq-bug-card">
        <pre class="bq-code"><code>${esc(bug.code)}</code></pre>
        <p class="bq-question">${esc(bug.question)}</p>
        <div class="bq-options">
          ${bug.options.map((opt, i) => `<button class="bq-opt" data-opt="${i}">${esc(opt)}</button>`).join("")}
        </div>
        <div class="bq-explanation" id="bq-explanation" style="display:none">${esc(bug.explanation)}</div>
        <button class="bq-next-btn" id="bq-next" style="display:none">המשך ←</button>
      </div>`;
  }

  function showBugQuestComplete() {
    const quest = bqCurrentQuest;
    if (!quest) return;
    if (!bqScores[quest.id]) bqScores[quest.id] = {};
    bqScores[quest.id].completed = true;
    try { localStorage.setItem(BQ_STORE, JSON.stringify(bqScores)); } catch {}
    const body = document.getElementById("bq-body");
    const prog = document.getElementById("bq-progress");
    if (prog) prog.textContent = "";
    if (body) body.innerHTML = `
      <div class="bq-complete">
        <div class="bq-complete-icon">🎉</div>
        <h4>הקווסט הושלם!</h4>
        <p>תיקנת את כל ${quest.bugs.length} הבאגים ב"${quest.title}".</p>
        <button class="bq-back-btn">← חזור לרשימה</button>
      </div>`;
  }

  document.getElementById("t-open-bug-quests")?.addEventListener("click", openBugQuests);
  document.getElementById("bq-close")?.addEventListener("click", () => {
    const overlay = document.getElementById("bug-quest-overlay");
    if (overlay) overlay.style.display = "none";
  });
  document.getElementById("bq-body")?.addEventListener("click", (e) => {
    const startBtn = e.target.closest(".bq-start-btn");
    if (startBtn) { startBugQuest(startBtn.dataset.bqId); return; }

    const backBtn = e.target.closest(".bq-back-btn");
    if (backBtn) { renderBugQuestList(); return; }

    const nextBtn = e.target.closest("#bq-next");
    if (nextBtn) { bqBugIdx++; showBugQuestBug(); return; }

    const optBtn = e.target.closest(".bq-opt");
    if (optBtn && !bqAnswered) {
      bqAnswered = true;
      const chosen = parseInt(optBtn.dataset.opt, 10);
      const bug = bqCurrentQuest?.bugs[bqBugIdx];
      if (!bug) return;
      const correct = chosen === bug.correct;
      const bugQuestion = {
        id: bug.id || "",
        question: bug.question || "",
        code: bug.code || "",
        options: bug.options || [],
        correctIndex: bug.correct,
        explanation: bug.explanation || "",
      };
      const mistakeRecord = correct
        ? null
        : recordWrongQuestionByInference({
            question: bugQuestion,
            kind: "bug",
            selectedIdx: chosen,
            mode: "bug-quest",
          });
      document.querySelectorAll(".bq-opt").forEach((b, i) => {
        b.disabled = true;
        if (i === bug.correct) b.classList.add("bq-opt-correct");
        else if (i === chosen && !correct) b.classList.add("bq-opt-wrong");
      });
      const expEl = document.getElementById("bq-explanation");
      if (expEl) {
        expEl.innerHTML = `${esc(bug.explanation || "")}${!correct ? renderMistakeAgentFeedback(mistakeRecord) : ""}`;
        expEl.style.display = "";
      }
      const nextEl = document.getElementById("bq-next");
      if (nextEl) nextEl.style.display = "";
    }
  });
  // ===== end Bug Quests =====

  document.getElementById("cmp-search")?.addEventListener("input", (e) => {
    cmpSearch = e.target.value;
    renderComparator();
  });
  document.getElementById("cmp-expand-all")?.addEventListener("click", () => {
    document.querySelectorAll("#cmp-list details").forEach((d) => d.setAttribute("open", ""));
  });
  document.getElementById("cmp-collapse-all")?.addEventListener("click", () => {
    document.querySelectorAll("#cmp-list details").forEach((d) => d.removeAttribute("open"));
  });

  // =========== OPEN CODE ANATOMY (read-only token-by-token breakdown page) ===========
  function openCodeAnatomy() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "📐 פירוק קוד";
    currentLessonDesc.textContent = "הסברים קצרים על תפקיד כל רכיב בקטעי קוד מהשיעורים.";
    const view = document.getElementById("code-anatomy-view");
    if (!view) return;
    view.style.display = "block";
    document.getElementById("open-code-anatomy")?.classList.add("active");
    renderCodeAnatomyPage();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  // P1.5.0c — Code Anatomy filter state
  const anatomyState = {
    search: "",
    lessonId: "",
    topic: "",
    conceptName: "",
    initialized: false,
  };

  // Build flat catalog of all available {lesson, concept, breakdowns} once
  function getAnatomyCatalog() {
    const out = [];
    (window.LESSONS_DATA || []).forEach((lesson) => {
      (lesson.concepts || []).forEach((c) => {
        if (
          c.extendedTab &&
          Array.isArray(c.extendedTab.codeBreakdowns) &&
          c.extendedTab.codeBreakdowns.length
        ) {
          out.push({ lesson, concept: c });
        }
      });
    });
    return out;
  }

  function initAnatomyToolbar() {
    if (anatomyState.initialized) return;
    anatomyState.initialized = true;
    const catalog = getAnatomyCatalog();

    // Populate lesson dropdown — only lessons that HAVE code anatomy
    const lessonSel = document.getElementById("anatomy-lesson-filter");
    const seenL = new Set();
    catalog.forEach(({ lesson }) => {
      if (seenL.has(lesson.id)) return;
      seenL.add(lesson.id);
      const opt = document.createElement("option");
      opt.value = lesson.id;
      opt.textContent = lesson.title;
      lessonSel?.appendChild(opt);
    });

    // Populate topic dropdown
    const topicSel = document.getElementById("anatomy-topic-filter");
    const topicsSeen = new Set();
    catalog.forEach(({ lesson }) => {
      const tx = getTopicForLesson(lesson.id);
      if (topicsSeen.has(tx.topic)) return;
      topicsSeen.add(tx.topic);
      const opt = document.createElement("option");
      opt.value = tx.topic;
      opt.textContent = `${tx.emoji} ${tx.topic}`;
      topicSel?.appendChild(opt);
    });

    function rebuildConceptDropdown() {
      const conceptSel = document.getElementById("anatomy-concept-filter");
      if (!conceptSel) return;
      const cur = conceptSel.value;
      conceptSel.innerHTML = '<option value="">🎯 כל המושגים</option>';
      const seen = new Set();
      catalog.forEach(({ lesson, concept }) => {
        if (anatomyState.lessonId && lesson.id !== anatomyState.lessonId) return;
        if (anatomyState.topic) {
          const tx = getTopicForLesson(lesson.id);
          if (tx.topic !== anatomyState.topic) return;
        }
        if (seen.has(concept.conceptName)) return;
        seen.add(concept.conceptName);
        const opt = document.createElement("option");
        opt.value = concept.conceptName;
        opt.textContent = concept.conceptName;
        conceptSel.appendChild(opt);
      });
      // Preserve current selection if still valid
      if (cur && seen.has(cur)) conceptSel.value = cur;
    }
    rebuildConceptDropdown();

    // Wire filters
    lessonSel?.addEventListener("change", (e) => {
      anatomyState.lessonId = e.target.value;
      rebuildConceptDropdown();
      renderCodeAnatomyPage();
    });
    topicSel?.addEventListener("change", (e) => {
      anatomyState.topic = e.target.value;
      rebuildConceptDropdown();
      renderCodeAnatomyPage();
    });
    document
      .getElementById("anatomy-concept-filter")
      ?.addEventListener("change", (e) => {
        anatomyState.conceptName = e.target.value;
        renderCodeAnatomyPage();
      });
    document
      .getElementById("anatomy-search")
      ?.addEventListener("input", (e) => {
        anatomyState.search = e.target.value;
        renderCodeAnatomyPage();
      });
    document
      .getElementById("anatomy-expand-all")
      ?.addEventListener("click", () => {
        document
          .querySelectorAll("#code-anatomy-content details")
          .forEach((d) => d.setAttribute("open", ""));
      });
    document
      .getElementById("anatomy-collapse-all")
      ?.addEventListener("click", () => {
        document
          .querySelectorAll("#code-anatomy-content details")
          .forEach((d) => d.removeAttribute("open"));
      });
  }

  function renderCodeAnatomyPage() {
    initAnatomyToolbar();
    const container = document.getElementById("code-anatomy-content");
    if (!container) return;
    const catalog = getAnatomyCatalog();
    setCodeAnatomyContextTree(catalog);
    if (!catalog.length) {
      container.innerHTML =
        '<div class="anatomy-empty">אין עדיין פירוקי קוד. הם יתווספו בהדרגה לשיעורים 21–27.</div>';
      return;
    }
    // Apply filters
    const q = anatomyState.search.trim().toLowerCase();
    const filtered = catalog.filter(({ lesson, concept }) => {
      if (anatomyState.lessonId && lesson.id !== anatomyState.lessonId) return false;
      if (anatomyState.topic) {
        const tx = getTopicForLesson(lesson.id);
        if (tx.topic !== anatomyState.topic) return false;
      }
      if (anatomyState.conceptName && concept.conceptName !== anatomyState.conceptName) return false;
      if (q) {
        const blob = (
          concept.conceptName +
          " " +
          (concept.extendedTab.codeBreakdowns || [])
            .map((b) => (b.code || "") + " " + (b.summary || ""))
            .join(" ")
        ).toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });

    // Update stats line
    const codeBlockCount = filtered.reduce(
      (n, { concept }) => n + concept.extendedTab.codeBreakdowns.length,
      0,
    );
    const lessonCount = new Set(filtered.map((x) => x.lesson.id)).size;
    const stats = document.getElementById("anatomy-stats");
    if (stats) {
      stats.textContent = filtered.length
        ? `📊 ${lessonCount} שיעורים · ${filtered.length} מושגים · ${codeBlockCount} קטעי קוד`
        : "🔍 לא נמצאו תוצאות לסינון";
    }

    if (!filtered.length) {
      container.innerHTML =
        '<div class="anatomy-empty">🔍 לא נמצא דבר. נסה לשנות את הסינון.</div>';
      return;
    }

    // Group by lesson, render each as <details> for lazy expand
    const byLesson = {};
    filtered.forEach(({ lesson, concept }) => {
      if (!byLesson[lesson.id]) byLesson[lesson.id] = { lesson, concepts: [] };
      byLesson[lesson.id].concepts.push(concept);
    });
    // If only ONE filtered result, auto-expand by default
    const autoOpen = filtered.length <= 3;

    container.innerHTML = Object.values(byLesson)
      .map(({ lesson, concepts }) => {
        const tx = getTopicForLesson(lesson.id);
        const innerConcepts = concepts
          .map(
            (c) => `
              <details class="anatomy-concept-block" data-anatomy-concept="${esc(c.conceptName)}" ${autoOpen || anatomyState.conceptName === c.conceptName ? "open" : ""}>
                <summary class="anatomy-concept-summary">
                  <span class="anatomy-concept-name">${esc(c.conceptName)}</span>
                  <span class="anatomy-concept-count">${c.extendedTab.codeBreakdowns.length} קטעים</span>
                </summary>
                <div class="anatomy-concept-body">
                  ${c.extendedTab.codeBreakdowns.map(renderCodeAnatomyBlock).join("")}
                </div>
              </details>`,
          )
          .join("");
        return `
        <details class="anatomy-lesson-block" data-anatomy-lesson="${esc(lesson.id)}" ${autoOpen ? "open" : ""}>
          <summary class="anatomy-lesson-summary">
            <span class="anatomy-lesson-topic">${tx.emoji} ${esc(tx.topic)}</span>
            <h3>${esc(lesson.title)}</h3>
            <span class="anatomy-lesson-count">${concepts.length} מושגים</span>
          </summary>
          <div class="anatomy-lesson-body">${innerConcepts}</div>
        </details>`;
      })
      .join("");
  }

  function renderCodeAnatomyBlock(br) {
    const code = String(br.code || "");
    const parts = Array.isArray(br.parts) ? br.parts : [];
    const partsRows = parts
      .map(
        (p) => `
        <div class="code-anatomy-row">
          <span class="code-anatomy-piece">${esc(p.piece || p.token || "")}</span>
          <span class="code-anatomy-role">${esc(p.role || "")}</span>
        </div>`,
      )
      .join("");
    return `
      <div class="code-anatomy">
        <pre class="code-anatomy-code"><code>${esc(code)}</code></pre>
        ${parts.length ? `<div class="code-anatomy-parts">${partsRows}</div>` : ""}
        ${br.summary ? `<div class="code-anatomy-summary">${esc(br.summary)}</div>` : ""}
      </div>`;
  }

  // =========== CODE BLOCKS (interactive line-by-line code with MC questions) ===========
  // Per-block UI state: which questions answered (correct/wrong), which blocks open.
  // Score updates flow through applyAnswer() — same as guide/trainer.
  const CB_STATE_KEY = "lumenportal:codeblock_state:v1";
  let cbState = {};
  try {
    cbState = JSON.parse(localStorage.getItem(CB_STATE_KEY) || "{}");
  } catch (_) { cbState = {}; }
  function saveCbState() {
    try { localStorage.setItem(CB_STATE_KEY, JSON.stringify(cbState)); } catch (_) {}
  }
  function recordCbAnswer(blockId, qId, isCorrect) {
    if (!cbState[blockId]) cbState[blockId] = { answers: {} };
    cbState[blockId].answers[qId] = isCorrect ? "correct" : "wrong";
    saveCbState();
  }

  let cbOpenStates = {}; // blockId -> bool
  let cbQuery = "";
  let cbLessonFilter = "all";
  let cbDifficultyFilter = "all";

  const CB_DIFF_INFO = {
    1: { label: "בסיסי", icon: "🟢", cssClass: "cb-diff-1" },
    2: { label: "בינוני", icon: "🟡", cssClass: "cb-diff-2" },
    3: { label: "מתקדם", icon: "🔴", cssClass: "cb-diff-3" },
  };

  function openCodeblocks() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "💻 למד בלוקי קוד";
    currentLessonDesc.textContent =
      "בלוקי קוד עם הסבר לכל שורה + שאלות שמעלות את הניקוד שלך לכל מושג.";
    if (codeblocksView) codeblocksView.style.display = "block";
    openCodeblocksBtn?.classList.add("active");
    populateCbLessonFilter();
    updateCbStats();
    renderCodeblocks();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  // ============================================================================
  // Code Trace top-level page — list all curated traces, filter, and play
  // ============================================================================
  let traceFilterLesson = "all";
  let traceFilterLevel = "all";
  let activeTraceSession = null; // { trace, lesson, concept } when playing

  function openTracePage() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🔬 Code Trace";
    currentLessonDesc.textContent =
      "תרגל חיזוי פלט שורה אחר שורה. כל סשן מועלה את הניקוד למושג המקושר.";
    if (traceView) traceView.style.display = "block";
    openTraceBtn?.classList.add("active");
    activeTraceSession = null;
    populateTraceFilters();
    renderTraceList();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function populateTraceFilters() {
    const sel = document.getElementById("trace-filter-lesson");
    if (!sel || sel.options.length > 1) {
      // Already populated; just rewire change handlers below
    } else {
      // First time — fill lesson options
      const lessons = (window.LESSONS_DATA || []).filter((l) =>
        ((window.QUESTIONS_BANK && window.QUESTIONS_BANK.trace) || []).some(
          (t) => t.conceptKey && t.conceptKey.startsWith(`${l.id}::`),
        ),
      );
      lessons.forEach((l) => {
        const opt = document.createElement("option");
        opt.value = l.id;
        opt.textContent = l.title;
        sel.appendChild(opt);
      });
    }
    // Always re-attach handlers (idempotent)
    sel?.addEventListener("change", () => {
      traceFilterLesson = sel.value;
      renderTraceList();
    });
    document.getElementById("trace-filter-level")?.addEventListener("change", (ev) => {
      traceFilterLevel = ev.target.value;
      renderTraceList();
    });
    document.getElementById("trace-random")?.addEventListener("click", () => {
      const all = filteredTraces();
      if (!all.length) return;
      const t = all[window.RNG.int(all.length)];
      startTraceSession(t);
    });
  }

  function filteredTraces() {
    const all = (window.QUESTIONS_BANK && window.QUESTIONS_BANK.trace) || [];
    return all.filter((t) => {
      if (traceFilterLesson !== "all") {
        if (!t.conceptKey || !t.conceptKey.startsWith(`${traceFilterLesson}::`)) {
          return false;
        }
      }
      if (traceFilterLevel !== "all") {
        const min = parseInt(traceFilterLevel, 10);
        const max = min + 1;
        if (typeof t.level !== "number" || t.level < min || t.level > max) {
          return false;
        }
      }
      return true;
    });
  }

  function renderTraceList() {
    const listEl = document.getElementById("trace-list");
    const playerEl = document.getElementById("trace-player");
    if (!listEl) return;
    setTraceContextTree();
    if (activeTraceSession) {
      listEl.style.display = "none";
      if (playerEl) playerEl.style.display = "block";
      renderTraceSession();
      return;
    }
    listEl.style.display = "block";
    if (playerEl) playerEl.style.display = "none";
    const traces = filteredTraces();
    if (!traces.length) {
      listEl.innerHTML = `<div class="anatomy-empty">אין traces זמינים בסינון הנוכחי.</div>`;
      return;
    }
    listEl.innerHTML = traces
      .map((t) => {
        const concept = (t.conceptKey || "").split("::")[1] || "";
        const lvl = LEVEL_INFO[t.level] || { icon: "❓", label: "לא מוגדר" };
        return `
          <div class="trace-card" data-trace-id="${esc(t.id)}">
            <div class="trace-card-row">
              <strong>${esc(t.title || t.id)}</strong>
              <span class="tq-level-pill ${lvl.cssClass || ""}">רמה ${t.level || "?"} · ${lvl.icon} ${esc(lvl.label)}</span>
            </div>
            <div class="trace-card-meta">${esc(concept)} · ${t.steps.length} שלבים</div>
          </div>`;
      })
      .join("");
    listEl.querySelectorAll(".trace-card").forEach((el) => {
      el.addEventListener("click", () => {
        const tid = el.dataset.traceId;
        const t = traces.find((x) => x.id === tid);
        if (t) startTraceSession(t);
      });
    });
  }

  function startTraceSession(trace) {
    // Find the lesson + concept that match this trace's conceptKey
    const [lessonId, conceptName] = (trace.conceptKey || "").split("::");
    const lesson = (window.LESSONS_DATA || []).find((l) => l.id === lessonId);
    const concept = lesson?.concepts?.find((c) => c.conceptName === conceptName);
    if (!lesson || !concept) {
      console.warn("[trace] missing lesson/concept for", trace.conceptKey);
      return;
    }
    // Reuse the trainer trace flow by setting trainerCurrent
    trainerCurrent = {
      lesson,
      concept,
      question: { kind: "trace", level: trace.level || 3, trace },
    };
    trainerLastAnswered = false;
    traceState = null;
    activeTraceSession = { trace, lesson, concept };
    renderTraceList();
  }

  function renderTraceSession() {
    const playerEl = document.getElementById("trace-player");
    if (!playerEl || !activeTraceSession) return;
    // Build a fake "trainer-quiz-card" inside the player + a back button
    playerEl.innerHTML = `
      <div class="trace-player-toolbar">
        <button class="km-btn-mini" id="trace-back-to-list">⬅️ חזרה לרשימה</button>
      </div>
      <div id="trainer-quiz-card" class="tq-card"></div>`;
    document.getElementById("trace-back-to-list")?.addEventListener("click", () => {
      activeTraceSession = null;
      trainerCurrent = null;
      traceState = null;
      renderTraceList();
    });
    // Render via the existing trainer-card pipeline
    renderTrainerCard();
  }

  function updateCbStats() {
    const blocks = (window.CODE_BLOCKS && window.CODE_BLOCKS.blocks) || [];
    const total = blocks.length;
    let completed = 0;
    let totalQs = 0;
    let correctQs = 0;
    let masterCount = 0;
    blocks.forEach((b) => {
      const prog = blockProgress(b);
      totalQs += prog.total;
      correctQs += prog.correct;
      if (prog.total > 0 && prog.answered === prog.total) completed++;
      const sc = getScore(b.lessonId, b.conceptName);
      if (sc.level >= 7) masterCount++;
    });
    const progressPct =
      totalQs > 0 ? Math.round((correctQs / totalQs) * 100) : 0;
    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    set("cb-stat-total", total);
    set("cb-stat-completed", completed);
    set("cb-stat-correct", correctQs);
    set("cb-stat-mastered", masterCount);
    set("cb-stat-progress", progressPct + "%");
  }

  function populateCbLessonFilter() {
    const sel = document.getElementById("cb-filter-lesson");
    if (!sel) return;
    const blocks = (window.CODE_BLOCKS && window.CODE_BLOCKS.blocks) || [];
    const lessonIds = [...new Set(blocks.map((b) => b.lessonId))];
    const lessonsByID = Object.fromEntries(
      (window.LESSONS_DATA || []).map((l) => [l.id, l]),
    );
    const currentValue = sel.value || "all";
    sel.innerHTML =
      `<option value="all">כל השיעורים</option>` +
      lessonIds
        .map((id) => {
          const l = lessonsByID[id];
          const title = l ? l.title : id;
          return `<option value="${esc(id)}">${esc(title)}</option>`;
        })
        .join("");
    sel.value = currentValue;
  }

  function blockProgress(block) {
    const st = cbState[block.id]?.answers || {};
    const total = (block.questions || []).length;
    const answered = (block.questions || []).filter((q) => st[q.id]).length;
    const correct = (block.questions || []).filter(
      (q) => st[q.id] === "correct",
    ).length;
    return { total, answered, correct };
  }

  function getBlockImportance(block) {
    if (block.importance) return Math.min(4, Math.max(1, block.importance));
    const map = window.CB_IMPORTANCE || {};
    return map[block.conceptName] || 2;
  }

  function getBlockImportantNote(block) {
    if (block.importantNote) return block.importantNote;
    const map = window.CB_IMPORTANT_NOTES || {};
    return map[block.conceptName] || "";
  }

  // Wrap occurrences of `term` (literal, case-sensitive) inside an HTML-escaped
  // text with <span class="cb-highlight cb-imp-{N}">. Uses esc() per segment to
  // avoid double-escaping. Returns ready-to-insert HTML.
  function highlightTermInText(text, term, importance) {
    if (!text) return "";
    if (!term || !term.trim()) return esc(text);
    // Build a literal regex (escape special chars in the term)
    const reTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(reTerm, "g");
    const parts = [];
    let lastIdx = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > lastIdx) parts.push(esc(text.slice(lastIdx, m.index)));
      parts.push(
        `<span class="cb-highlight cb-imp-${importance}" title="מושג מרכזי: ${esc(term)}">${esc(m[0])}</span>`,
      );
      lastIdx = m.index + m[0].length;
      if (m.index === re.lastIndex) re.lastIndex++; // safety
    }
    if (lastIdx < text.length) parts.push(esc(text.slice(lastIdx)));
    return parts.join("");
  }

  function renderConceptCallout(block) {
    const imp = getBlockImportance(block);
    const note = getBlockImportantNote(block);
    const sameConceptCount = ((window.CODE_BLOCKS?.blocks) || []).filter(
      (b) => b.conceptName === block.conceptName,
    ).length;
    const stars = "★".repeat(imp) + "☆".repeat(4 - imp);
    const impLabels = {
      1: "שולי",
      2: "רגיל",
      3: "חשוב מאוד",
      4: "🔥 קריטי / יסוד יסודות",
    };
    return `
      <div class="cb-concept-callout cb-imp-bg-${imp}">
        <div class="cb-cc-head">
          <span class="cb-cc-icon">📌</span>
          <span class="cb-cc-name cb-highlight cb-imp-${imp}">${esc(block.conceptName)}</span>
          <span class="cb-cc-stars" title="דרגת חשיבות ${imp}/4">${stars}</span>
          <span class="cb-cc-grade cb-imp-grade-${imp}">${esc(impLabels[imp])}</span>
        </div>
        ${note ? `<div class="cb-cc-note">💡 ${esc(note)}</div>` : ""}
        <div class="cb-cc-actions">
          <button class="cb-cc-link" data-action="open-lesson"
                  data-lesson="${esc(block.lessonId)}"
                  data-concept="${esc(block.conceptName)}">
            📖 הסבר מעמיק בשיעור
          </button>
          ${sameConceptCount > 1
            ? `<button class="cb-cc-link" data-action="filter-concept"
                       data-concept="${esc(block.conceptName)}">
                 💻 בלוקי קוד נוספים על ${esc(block.conceptName)} (${sameConceptCount - 1})
               </button>`
            : ""}
        </div>
      </div>`;
  }

  // Build a map of {targetLine: [{q, idx, status}]} for click-to-jump indicators
  function buildLineQuestionMap(block) {
    const map = {};
    const answers = cbState[block.id]?.answers || {};
    (block.questions || []).forEach((q, idx) => {
      if (!q.targetLine) return;
      if (!map[q.targetLine]) map[q.targetLine] = [];
      map[q.targetLine].push({
        q,
        idx,
        status: answers[q.id] || "pending", // 'pending' | 'correct' | 'wrong'
      });
    });
    return map;
  }

  function renderBlockNav(block, filteredList) {
    const blocks = filteredList || (window.CODE_BLOCKS?.blocks || []);
    const idx = blocks.findIndex((b) => b.id === block.id);
    const prev = idx > 0 ? blocks[idx - 1] : null;
    const next = idx < blocks.length - 1 ? blocks[idx + 1] : null;
    return `
      <div class="cb-block-nav">
        <button class="cb-nav-btn cb-nav-prev" data-target="${prev ? esc(prev.id) : ""}" ${prev ? "" : "disabled"} title="${prev ? `מעבר ל: ${esc(prev.title)}` : "אין קודם"}">
          ▶ ${prev ? `הקודם: ${esc(prev.title.substring(0, 26))}${prev.title.length > 26 ? "…" : ""}` : "אין קודם"}
        </button>
        <span class="cb-nav-pos">${idx + 1} / ${blocks.length}</span>
        <button class="cb-nav-btn cb-nav-next" data-target="${next ? esc(next.id) : ""}" ${next ? "" : "disabled"} title="${next ? `מעבר ל: ${esc(next.title)}` : "אין הבא"}">
          ${next ? `הבא: ${esc(next.title.substring(0, 26))}${next.title.length > 26 ? "…" : ""}` : "אין הבא"} ◀
        </button>
      </div>`;
  }

  function renderAnnotatedCode(block) {
    const lines = (block.code || "").split("\n");
    const comments = block.lineComments || {};
    const term = block.conceptName;
    const imp = getBlockImportance(block);
    const lineQs = buildLineQuestionMap(block);
    return `
      <div class="cb-code-wrap">
        <button class="cb-copy-code-btn" data-block="${esc(block.id)}" title="העתק את הקוד ללוח">📋 העתק קוד</button>
      <div class="cb-code-with-lines">
        ${lines
          .map((line, i) => {
            const n = i + 1;
            const comment = comments[n] || "";
            const codeHTML = line
              ? highlightTermInText(line, term, imp)
              : "&nbsp;";
            const commentHTML = comment
              ? highlightTermInText(comment, term, imp)
              : "";
            const questions = lineQs[n] || [];
            const indicatorsHTML = questions
              .map((qi) => {
                const icon =
                  qi.status === "correct"
                    ? "✅"
                    : qi.status === "wrong"
                      ? "❌"
                      : "❓";
                return `<button class="cb-line-q-indicator cb-line-q-${qi.status}"
                                 data-qid="${esc(qi.q.id)}"
                                 title="שאלה ${qi.idx + 1} — ${qi.status === "correct" ? "נענתה נכון" : qi.status === "wrong" ? "נענתה שגוי" : "טרם נענתה"} (לחץ למעבר)">${icon}</button>`;
              })
              .join("");
            return `
              <div class="cb-line ${questions.length ? "cb-line-has-q" : ""}">
                <span class="cb-line-num">${n}</span>
                <code class="cb-line-code">${codeHTML}</code>
                ${indicatorsHTML ? `<span class="cb-line-indicators">${indicatorsHTML}</span>` : ""}
                ${commentHTML ? `<span class="cb-line-comment">// ${commentHTML}</span>` : ""}
              </div>`;
          })
          .join("")}
      </div>
      </div>`;
  }

  function renderCbQuestion(block, q, idx) {
    const lineCount = (block.code || "").split("\n").length;
    if (q.targetLine && q.targetLine > lineCount) {
      return `<div class="guide-q-card"><div class="guide-q-text">⚠️ שאלה מצביעה על שורה ${q.targetLine} שלא קיימת.</div></div>`;
    }
    const prevAns = cbState[block.id]?.answers?.[q.id];
    const answered = !!prevAns;
    const lineLabel =
      q.targetLine != null ? `שורה ${q.targetLine}` : `שאלה ${idx + 1}`;
    const optionsHTML = (q.options || [])
      .map((opt, oi) => {
        let cls = "guide-q-option";
        if (answered) {
          cls += " disabled";
          if (oi === q.correctIndex) cls += " correct";
        }
        return `<button class="${cls}" data-i="${oi}">${esc(opt)}</button>`;
      })
      .join("");
    const cardCls =
      "guide-q-card cb-q-card" +
      (answered ? ` answered ${prevAns === "correct" ? "correct" : "wrong"}` : "");
    return `
      <div class="${cardCls}"
           data-block="${esc(block.id)}"
           data-qid="${esc(q.id)}"
           data-correct="${q.correctIndex}">
        <div class="guide-q-meta">
          <span>📍 ${esc(lineLabel)} · שאלה ${idx + 1}</span>
          ${answered ? `<span class="lvl-pill ${prevAns === "correct" ? "lvl-master" : "lvl-grandma"}">${prevAns === "correct" ? "✓ נענתה נכון" : "✗ ענית לא נכון"}</span>` : ""}
        </div>
        <div class="guide-q-text">${esc(q.question)}</div>
        <div class="guide-q-options">${optionsHTML}</div>
        <div class="guide-q-feedback" data-explanation="${esc(q.explanation || "")}">
          ${answered ? `<div><strong>${prevAns === "correct" ? "✅ נכון!" : "❌ לא מדויק."}</strong> ${esc(q.explanation || "")}</div>` : ""}
        </div>
      </div>`;
  }

  function renderCodeblocks() {
    const container = document.getElementById("cb-blocks-container");
    if (!container) return;
    const blocks = (window.CODE_BLOCKS && window.CODE_BLOCKS.blocks) || [];
    setCodeblocksContextTree();
    const lessonsByID = Object.fromEntries(
      (window.LESSONS_DATA || []).map((l) => [l.id, l]),
    );
    const q = (cbQuery || "").toLowerCase().trim();

    const filtered = blocks.filter((b) => {
      if (cbLessonFilter !== "all" && b.lessonId !== cbLessonFilter) return false;
      if (cbDifficultyFilter !== "all" && String(b.difficulty) !== cbDifficultyFilter)
        return false;
      if (q) {
        const hay = (
          b.title +
          " " +
          (b.intro || "") +
          " " +
          b.conceptName +
          " " +
          (b.code || "")
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (!filtered.length) {
      container.innerHTML = `<div class="tq-empty"><div class="big-icon">🔍</div><p>לא נמצאו בלוקים תואמים.</p></div>`;
      return;
    }

    container.innerHTML = filtered
      .map((block) => {
        const isOpen = !!cbOpenStates[block.id];
        const prog = blockProgress(block);
        const completed = prog.total > 0 && prog.answered === prog.total;
        const allCorrect = completed && prog.correct === prog.total;
        const lessonTitle = lessonsByID[block.lessonId]?.title || block.lessonId;
        const diff = CB_DIFF_INFO[block.difficulty] || CB_DIFF_INFO[1];
        const sc = getScore(block.lessonId, block.conceptName);
        const lvl = LEVEL_INFO[sc.level] || LEVEL_INFO[1];

        const questionsHTML = (block.questions || [])
          .map((qq, i) => renderCbQuestion(block, qq, i))
          .join("");

        return `
          <div class="cb-block ${isOpen ? "is-open" : ""} ${completed ? "completed" : ""} ${allCorrect ? "all-correct" : ""}"
               data-block="${esc(block.id)}">
            <div class="cb-block-head">
              <div class="cb-block-title">
                <span class="icon-big">${block.icon || "💻"}</span>
                <h3>${esc(block.title)}</h3>
              </div>
              <div class="cb-block-meta">
                <span class="pill-mini cb-pill-lesson">${esc(lessonTitle)}</span>
                <span class="pill-mini cb-pill-concept">📌 ${esc(block.conceptName)}</span>
                <span class="pill-mini ${diff.cssClass}">${diff.icon} ${diff.label}</span>
                <span class="lvl-pill ${lvl.cssClass}">${lvl.icon} רמה ${sc.level}</span>
                <span class="pill-mini cb-pill-prog">${completed ? (allCorrect ? "🏆" : "✓") : "📊"} ${prog.answered}/${prog.total}</span>
                <button class="cb-tool-btn cb-toggle-comments" title="הסתר/הצג הערות (מצב מבחן)">👁️</button>
                <button class="cb-tool-btn cb-reset-btn" title="אפס תשובות לבלוק זה">🔄</button>
                <button class="cb-tool-btn cb-pdf-btn" title="ייצא PDF צבעוני של בלוק זה">📄</button>
                <span class="chev">◀</span>
              </div>
            </div>
            <div class="cb-block-body">
              ${renderConceptCallout(block)}
              ${block.intro ? `<div class="cb-block-intro">${esc(block.intro)}</div>` : ""}
              ${renderAnnotatedCode(block)}
              <div class="cb-questions-section">
                <h4>❓ שאלות לבדיקת הבנה</h4>
                ${questionsHTML}
              </div>
              ${renderBlockNav(block, filtered)}
            </div>
          </div>`;
      })
      .join("");

    // Wire interactions
    container.querySelectorAll(".cb-block").forEach((blockEl) => {
      const blockId = blockEl.dataset.block;
      const block = filtered.find((b) => b.id === blockId);
      if (!block) return;

      blockEl.querySelector(".cb-block-head")?.addEventListener("click", () => {
        cbOpenStates[blockId] = !cbOpenStates[blockId];
        blockEl.classList.toggle("is-open", cbOpenStates[blockId]);
      });

      // Wire concept-callout actions
      blockEl.querySelectorAll(".cb-cc-link").forEach((btn) => {
        btn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          const action = btn.dataset.action;
          if (action === "open-lesson") {
            const lessonId = btn.dataset.lesson;
            const conceptName = btn.dataset.concept;
            selectedConceptByLesson[lessonId] = conceptName;
            openLesson(lessonId);
          } else if (action === "filter-concept") {
            const conceptName = btn.dataset.concept;
            cbQuery = conceptName;
            const search = document.getElementById("cb-search");
            if (search) search.value = conceptName;
            renderCodeblocks();
            scrollToTop();
          }
        });
      });

      // PDF export
      blockEl.querySelector(".cb-pdf-btn")?.addEventListener("click", (ev) => {
        ev.stopPropagation();
        exportBlockToPdf(block);
      });

      // Toggle line comments visibility (test/learning mode)
      blockEl.querySelector(".cb-toggle-comments")?.addEventListener(
        "click",
        (ev) => {
          ev.stopPropagation();
          const hidden = blockEl.classList.toggle("cb-comments-hidden");
          ev.currentTarget.textContent = hidden ? "🙈" : "👁️";
          ev.currentTarget.title = hidden
            ? "הצג הערות"
            : "הסתר/הצג הערות (מצב מבחן)";
          // Auto-open the block if it was closed
          if (!cbOpenStates[blockId]) {
            cbOpenStates[blockId] = true;
            blockEl.classList.add("is-open");
          }
        },
      );

      // Copy code button
      blockEl.querySelector(".cb-copy-code-btn")?.addEventListener("click", async (ev) => {
        ev.stopPropagation();
        const btn = ev.currentTarget;
        try {
          await navigator.clipboard.writeText(block.code || "");
          btn.textContent = "✓ הועתק!";
          btn.classList.add("cb-copied");
          setTimeout(() => {
            btn.textContent = "📋 העתק קוד";
            btn.classList.remove("cb-copied");
          }, 1600);
        } catch (e) {
          btn.textContent = "❌ העתקה נכשלה";
          setTimeout(() => { btn.textContent = "📋 העתק קוד"; }, 1600);
        }
      });

      // Block navigation (prev/next)
      blockEl.querySelectorAll(".cb-nav-btn").forEach((navBtn) => {
        navBtn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          if (navBtn.disabled) return;
          const targetId = navBtn.dataset.target;
          if (!targetId) return;
          // Close current, open target
          cbOpenStates[block.id] = false;
          cbOpenStates[targetId] = true;
          renderCodeblocks();
          const targetEl = document.querySelector(`.cb-block[data-block="${targetId}"]`);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            targetEl.classList.add("cb-flash");
            setTimeout(() => targetEl.classList.remove("cb-flash"), 1400);
          }
        });
      });

      // Click indicator next to a code line — scroll to that question + flash it
      blockEl.querySelectorAll(".cb-line-q-indicator").forEach((ind) => {
        ind.addEventListener("click", (ev) => {
          ev.stopPropagation();
          const qid = ind.dataset.qid;
          const target = blockEl.querySelector(`.cb-q-card[data-qid="${qid}"]`);
          if (!target) return;
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.classList.add("cb-flash");
          setTimeout(() => target.classList.remove("cb-flash"), 1400);
        });
      });

      // Reset block answers
      blockEl.querySelector(".cb-reset-btn")?.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (
          !confirm(
            `לאפס את התשובות של "${block.title}"?\n\nהמצב של הניקוד הכללי לא ישתנה — רק הסימון של איזה שאלות נענו בבלוק זה.`,
          )
        )
          return;
        if (cbState[block.id]) {
          delete cbState[block.id];
          saveCbState();
        }
        renderCodeblocks();
        // Re-open the block after re-render
        const reopened = document.querySelector(
          `.cb-block[data-block="${block.id}"]`,
        );
        if (reopened) {
          cbOpenStates[block.id] = true;
          reopened.classList.add("is-open");
        }
      });

      blockEl.querySelectorAll(".cb-q-card").forEach((card) => {
        if (card.classList.contains("answered")) return;
        const correct = parseInt(card.dataset.correct, 10);
        const qId = card.dataset.qid;
        const question = block.questions.find((q) => q.id === qId);
        card.querySelectorAll(".guide-q-option").forEach((btn) => {
          btn.addEventListener("click", () => {
            if (card.classList.contains("answered")) return;
            const sel = parseInt(btn.dataset.i, 10);
            const isCorrect = sel === correct;
            card.classList.add("answered");
            card.classList.add(isCorrect ? "correct" : "wrong");
            card.querySelectorAll(".guide-q-option").forEach((o) => {
              o.classList.add("disabled");
              const i = parseInt(o.dataset.i, 10);
              if (i === correct) o.classList.add("correct");
              else if (i === sel) o.classList.add("wrong");
            });
            applyCodeblockAnswer(block, question, isCorrect, card, sel);
          });
        });
      });
    });
  }

  function applyCodeblockAnswer(block, question, isCorrect, cardEl, selectedIdx = null) {
    const fb = cardEl.querySelector(".guide-q-feedback");
    const baseExpl = fb?.dataset.explanation || "";
    let levelMsg = "";
    let afterResult = null;

    const ref = findConceptByKey(`${block.lessonId}::${block.conceptName}`);
    if (ref) {
      const beforeLvl = getScore(ref.lesson.id, ref.concept.conceptName).level;
      afterResult = applyAnswer(
        ref.lesson.id,
        ref.concept.conceptName,
        ref.concept,
        question.kind || "mc",
        isCorrect,
        {
          question: {
            ...question,
            conceptKey: conceptKey(ref.lesson.id, ref.concept.conceptName),
          },
          selectedIdx,
          mode: "codeblock",
        },
      );
      if (isCorrect) {
        if (afterResult.advanced) {
          const nl = LEVEL_INFO[afterResult.newLevel];
          levelMsg =
            afterResult.newLevel === 7
              ? `🏆 הגעת לרמת מאסטר ב-${esc(ref.concept.conceptName)}!`
              : `⬆️ ${esc(ref.concept.conceptName)} עלה מרמה ${beforeLvl} לרמה ${afterResult.newLevel} (${nl.icon} ${nl.label}).`;
        } else {
          levelMsg = `נקודה ל-${esc(ref.concept.conceptName)}. המשך לאמן במאמן הידע כדי להעלות רמה.`;
        }
      } else {
        levelMsg = `${esc(ref.concept.conceptName)} נשאר ברמה ${beforeLvl}. נסה שוב במאמן הידע.`;
      }
    } else {
      levelMsg = `⚠️ המושג "${esc(block.conceptName)}" לא נמצא בנתוני השיעור — הניקוד לא נרשם.`;
    }

    if (fb) {
      fb.innerHTML = `
        <div><strong>${isCorrect ? "✅ נכון!" : "❌ לא מדויק."}</strong> ${esc(baseExpl)}</div>
        ${levelMsg ? `<div style="margin-top:0.4rem;">${levelMsg}</div>` : ""}
        ${!isCorrect ? renderMistakeAgentFeedback(afterResult?.mistake) : ""}
      `;
    }

    recordCbAnswer(block.id, question.id, isCorrect);
    updateCbBlockHeader(block);
    maybeShowBlockCompletion(block);
    updateCbStats();
    // Update line indicators in place — change icon for the answered question
    const blockEl = document.querySelector(
      `.cb-block[data-block="${block.id}"]`,
    );
    const ind = blockEl?.querySelector(
      `.cb-line-q-indicator[data-qid="${question.id}"]`,
    );
    if (ind) {
      ind.textContent = isCorrect ? "✅" : "❌";
      ind.classList.remove("cb-line-q-pending");
      ind.classList.add(`cb-line-q-${isCorrect ? "correct" : "wrong"}`);
    }

    if (knowledgeMapView && knowledgeMapView.style.display === "block") {
      renderKnowledgeMap();
    }
  }

  function updateCbBlockHeader(block) {
    const blockEl = document.querySelector(
      `.cb-block[data-block="${block.id}"]`,
    );
    if (!blockEl) return;
    const prog = blockProgress(block);
    const completed = prog.total > 0 && prog.answered === prog.total;
    const allCorrect = completed && prog.correct === prog.total;
    blockEl.classList.toggle("completed", completed);
    blockEl.classList.toggle("all-correct", allCorrect);
    const progPill = blockEl.querySelector(".cb-pill-prog");
    if (progPill) {
      progPill.textContent = `${completed ? (allCorrect ? "🏆" : "✓") : "📊"} ${prog.answered}/${prog.total}`;
    }
    // Refresh level pill (in case level advanced)
    const sc = getScore(block.lessonId, block.conceptName);
    const lvl = LEVEL_INFO[sc.level] || LEVEL_INFO[1];
    const lvlPill = blockEl.querySelector(".cb-block-meta .lvl-pill");
    if (lvlPill) {
      lvlPill.className = `lvl-pill ${lvl.cssClass}`;
      lvlPill.textContent = `${lvl.icon} רמה ${sc.level}`;
    }
  }

  function maybeShowBlockCompletion(block) {
    const blockEl = document.querySelector(
      `.cb-block[data-block="${block.id}"]`,
    );
    if (!blockEl) return;
    const prog = blockProgress(block);
    const completed = prog.total > 0 && prog.answered === prog.total;
    if (!completed) return;
    if (blockEl.querySelector(".cb-completion-banner")) return; // already shown

    const allCorrect = prog.correct === prog.total;
    const ref = findConceptByKey(`${block.lessonId}::${block.conceptName}`);
    const sc = ref ? getScore(ref.lesson.id, ref.concept.conceptName) : null;
    const canMarkKnownNow = ref
      ? canMarkV(ref.lesson.id, ref.concept.conceptName, ref.concept)
      : false;

    const banner = document.createElement("div");
    banner.className = `cb-completion-banner ${allCorrect ? "all-correct" : "partial"}`;
    banner.innerHTML = allCorrect
      ? `<div class="cb-cb-icon">🎉</div>
         <div class="cb-cb-text">
           <strong>סיימת את הבלוק במלואו — ${esc(prog.correct)}/${esc(prog.total)} נכונות!</strong>
           <span>צבירה למושג <em>${esc(block.conceptName)}</em>${sc ? ` · רמה ${sc.level}` : ""}.</span>
         </div>
         ${canMarkKnownNow ? `<button class="cb-mark-known-btn" data-block="${esc(block.id)}">✓ סמן כידוע</button>` : ""}`
      : `<div class="cb-cb-icon">📍</div>
         <div class="cb-cb-text">
           <strong>סיימת את הבלוק (${esc(prog.correct)}/${esc(prog.total)} נכונות).</strong>
           <span>אפשר לחזור על הקוד ולנסות שוב במאמן הידע לחיזוק.</span>
         </div>`;
    const body = blockEl.querySelector(".cb-block-body");
    if (body) body.appendChild(banner);

    const markBtn = banner.querySelector(".cb-mark-known-btn");
    if (markBtn && ref) {
      markBtn.addEventListener("click", () => {
        markAsKnown(ref.lesson.id, ref.concept.conceptName);
        markBtn.disabled = true;
        markBtn.textContent = "✓ סומן כידוע";
        updateCbBlockHeader(block);
        if (knowledgeMapView && knowledgeMapView.style.display === "block") {
          renderKnowledgeMap();
        }
      });
    }
  }

  // Toolbar wiring
  let _cbSearchTO = null;
  document.getElementById("cb-search")?.addEventListener("input", (e) => {
    clearTimeout(_cbSearchTO);
    _cbSearchTO = setTimeout(() => {
      cbQuery = e.target.value;
      renderCodeblocks();
    }, 200);
  });
  document.getElementById("cb-filter-lesson")?.addEventListener("change", (e) => {
    cbLessonFilter = e.target.value;
    renderCodeblocks();
  });
  document
    .getElementById("cb-filter-difficulty")
    ?.addEventListener("change", (e) => {
      cbDifficultyFilter = e.target.value;
      renderCodeblocks();
    });
  document.getElementById("cb-expand-all")?.addEventListener("click", () => {
    (window.CODE_BLOCKS?.blocks || []).forEach((b) => {
      cbOpenStates[b.id] = true;
    });
    renderCodeblocks();
  });
  document.getElementById("cb-collapse-all")?.addEventListener("click", () => {
    cbOpenStates = {};
    renderCodeblocks();
  });
  // Keyboard shortcuts (only when codeblocks view is active)
  document.addEventListener("keydown", (ev) => {
    if (!codeblocksView || codeblocksView.style.display !== "block") return;
    // Don't intercept while typing in inputs / textareas
    const t = ev.target;
    const inField =
      t &&
      (t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA" ||
        t.isContentEditable);
    if (inField && ev.key !== "Escape") return;
    // Modifier-only events should pass through to browser/native shortcuts
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;

    const key = ev.key;
    if (key === "j" || key === "ArrowDown") {
      ev.preventDefault();
      cbJumpRelative(+1);
    } else if (key === "k" || key === "ArrowUp") {
      ev.preventDefault();
      cbJumpRelative(-1);
    } else if (key === "e") {
      ev.preventDefault();
      document.getElementById("cb-expand-all")?.click();
    } else if (key === "c") {
      ev.preventDefault();
      document.getElementById("cb-collapse-all")?.click();
    } else if (key === "r") {
      ev.preventDefault();
      document.getElementById("cb-random-block")?.click();
    } else if (key === "p") {
      ev.preventDefault();
      document.getElementById("cb-export-pdf")?.click();
    } else if (key === "/") {
      ev.preventDefault();
      document.getElementById("cb-search")?.focus();
    } else if (key === "?" || (ev.shiftKey && key === "/")) {
      ev.preventDefault();
      toggleCbKeysHelp(true);
    } else if (key === "Escape") {
      // Close help modal or clear search
      if (document.getElementById("cb-keys-modal")?.classList.contains("open")) {
        toggleCbKeysHelp(false);
        return;
      }
      const search = document.getElementById("cb-search");
      if (search && search.value) {
        search.value = "";
        cbQuery = "";
        renderCodeblocks();
      }
    }
  });

  // Move open-state to next/prev block in the currently filtered list
  function cbJumpRelative(delta) {
    const renderedIds = Array.from(
      document.querySelectorAll(".cb-block"),
    ).map((el) => el.dataset.block);
    if (!renderedIds.length) return;
    const openId = Object.keys(cbOpenStates).find((k) => cbOpenStates[k]);
    let idx = openId ? renderedIds.indexOf(openId) : -1;
    if (idx === -1) idx = delta > 0 ? -1 : renderedIds.length;
    const newIdx = Math.min(
      renderedIds.length - 1,
      Math.max(0, idx + delta),
    );
    const targetId = renderedIds[newIdx];
    cbOpenStates = { [targetId]: true };
    renderCodeblocks();
    setTimeout(() => {
      const el = document.querySelector(`.cb-block[data-block="${targetId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("cb-flash");
        setTimeout(() => el.classList.remove("cb-flash"), 1400);
      }
    }, 50);
  }

  function toggleCbKeysHelp(force) {
    let modal = document.getElementById("cb-keys-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "cb-keys-modal";
      modal.className = "cb-keys-modal";
      modal.innerHTML = `
        <div class="cb-keys-card">
          <div class="cb-keys-head">
            <h3>⌨️ קיצורי מקלדת — בלוקי קוד</h3>
            <button class="cb-keys-close" aria-label="סגור">✕</button>
          </div>
          <table class="cb-keys-table">
            <tr><td><kbd>J</kbd> / <kbd>↓</kbd></td><td>בלוק הבא</td></tr>
            <tr><td><kbd>K</kbd> / <kbd>↑</kbd></td><td>בלוק הקודם</td></tr>
            <tr><td><kbd>E</kbd></td><td>פתח את כל הבלוקים</td></tr>
            <tr><td><kbd>C</kbd></td><td>כווץ את כל הבלוקים</td></tr>
            <tr><td><kbd>R</kbd></td><td>בלוק אקראי</td></tr>
            <tr><td><kbd>P</kbd></td><td>ייצוא PDF צבעוני</td></tr>
            <tr><td><kbd>/</kbd></td><td>מיקוד שדה החיפוש</td></tr>
            <tr><td><kbd>Esc</kbd></td><td>נקה חיפוש / סגור עזרה</td></tr>
            <tr><td><kbd>?</kbd></td><td>הצג את העזרה הזו</td></tr>
          </table>
        </div>`;
      document.body.appendChild(modal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("cb-keys-close")) {
          toggleCbKeysHelp(false);
        }
      });
    }
    const shouldOpen = force === undefined ? !modal.classList.contains("open") : force;
    modal.classList.toggle("open", shouldOpen);
  }

  document.getElementById("cb-keys-help")?.addEventListener("click", () =>
    toggleCbKeysHelp(true),
  );

  document.getElementById("cb-random-block")?.addEventListener("click", () => {
    const blocks = (window.CODE_BLOCKS && window.CODE_BLOCKS.blocks) || [];
    if (!blocks.length) return;
    // Reset filters so all blocks are eligible
    cbQuery = "";
    cbLessonFilter = "all";
    cbDifficultyFilter = "all";
    const search = document.getElementById("cb-search");
    if (search) search.value = "";
    document.getElementById("cb-filter-lesson").value = "all";
    document.getElementById("cb-filter-difficulty").value = "all";
    // Pick a random block, prefer ones with incomplete progress
    const incomplete = blocks.filter((b) => {
      const p = blockProgress(b);
      return p.answered < p.total;
    });
    const pool = incomplete.length ? incomplete : blocks;
    const pick = pool[window.RNG.int(pool.length)];
    cbOpenStates = { [pick.id]: true };
    renderCodeblocks();
    setTimeout(() => {
      const el = document.querySelector(`.cb-block[data-block="${pick.id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("cb-flash");
        setTimeout(() => el.classList.remove("cb-flash"), 1400);
      }
    }, 50);
  });
  document.getElementById("cb-export-pdf")?.addEventListener("click", () => {
    const blocks = (window.CODE_BLOCKS && window.CODE_BLOCKS.blocks) || [];
    const q = (cbQuery || "").toLowerCase().trim();
    const filtered = blocks.filter((b) => {
      if (cbLessonFilter !== "all" && b.lessonId !== cbLessonFilter) return false;
      if (
        cbDifficultyFilter !== "all" &&
        String(b.difficulty) !== cbDifficultyFilter
      )
        return false;
      if (q) {
        const hay = (
          b.title +
          " " +
          (b.intro || "") +
          " " +
          b.conceptName +
          " " +
          (b.code || "")
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (!filtered.length) {
      alert("אין בלוקים להציג. נסה לאפס את הפילטרים.");
      return;
    }
    exportBlocksToPdf(filtered);
  });

  // ============ PDF EXPORT ============
  // Opens a new window with print-friendly HTML for one or more blocks,
  // applies inline color CSS, and triggers print(). User chooses
  // "Save as PDF" in the browser's print dialog.
  function exportBlockToPdf(block) {
    exportBlocksToPdf([block]);
  }

  function exportBlocksToPdf(blocks) {
    const lessonsByID = Object.fromEntries(
      (window.LESSONS_DATA || []).map((l) => [l.id, l]),
    );
    const cssEsc = (s) => esc(s);

    const blockHTML = blocks
      .map((block, idx) => {
        const lessonTitle = lessonsByID[block.lessonId]?.title || block.lessonId;
        const imp = getBlockImportance(block);
        const note = getBlockImportantNote(block);
        const stars = "★".repeat(imp) + "☆".repeat(4 - imp);
        const impLabels = {
          1: "שולי",
          2: "רגיל",
          3: "חשוב מאוד",
          4: "🔥 קריטי / יסוד יסודות",
        };
        const term = block.conceptName;
        const lines = (block.code || "").split("\n");
        const comments = block.lineComments || {};
        const linesHTML = lines
          .map((line, i) => {
            const n = i + 1;
            const c = comments[n] || "";
            const codeHTML = line ? highlightTermInText(line, term, imp) : "&nbsp;";
            const cHTML = c ? highlightTermInText(c, term, imp) : "";
            return `
              <div class="pdf-line">
                <span class="pdf-num">${n}</span>
                <code class="pdf-code">${codeHTML}</code>
                ${cHTML ? `<span class="pdf-comment">// ${cHTML}</span>` : ""}
              </div>`;
          })
          .join("");
        const questionsHTML = (block.questions || [])
          .map((q, qi) => {
            const correctIdx = q.correctIndex;
            const optsHTML = (q.options || [])
              .map(
                (opt, oi) =>
                  `<div class="pdf-opt ${oi === correctIdx ? "pdf-correct" : ""}">${oi === correctIdx ? "✓" : "○"} ${cssEsc(opt)}</div>`,
              )
              .join("");
            return `
              <div class="pdf-q">
                <div class="pdf-q-meta">📍 שורה ${q.targetLine || "?"} · שאלה ${qi + 1}</div>
                <div class="pdf-q-text">${cssEsc(q.question)}</div>
                <div class="pdf-q-opts">${optsHTML}</div>
                ${q.explanation ? `<div class="pdf-q-expl"><strong>הסבר:</strong> ${cssEsc(q.explanation)}</div>` : ""}
              </div>`;
          })
          .join("");
        return `
          <section class="pdf-block ${idx > 0 ? "pdf-page-break" : ""}">
            <header class="pdf-header">
              <div class="pdf-title-row">
                <span class="pdf-icon">${cssEsc(block.icon || "💻")}</span>
                <h1>${cssEsc(block.title)}</h1>
              </div>
              <div class="pdf-meta-row">
                <span class="pdf-pill pdf-pill-lesson">${cssEsc(lessonTitle)}</span>
                <span class="pdf-pill pdf-pill-concept">📌 ${cssEsc(block.conceptName)}</span>
                <span class="pdf-pill pdf-pill-imp pdf-imp-${imp}">${stars} ${cssEsc(impLabels[imp])}</span>
              </div>
            </header>
            ${note ? `<div class="pdf-callout pdf-imp-bg-${imp}">💡 ${cssEsc(note)}</div>` : ""}
            ${block.intro ? `<p class="pdf-intro">${cssEsc(block.intro)}</p>` : ""}
            <div class="pdf-code-block">${linesHTML}</div>
            ${questionsHTML ? `<div class="pdf-questions"><h2>❓ שאלות לבדיקת הבנה</h2>${questionsHTML}</div>` : ""}
            <footer class="pdf-footer">LumenPortal · בלוק ${idx + 1}/${blocks.length}</footer>
          </section>`;
      })
      .join("");

    const pdfStyles = `
      @page { size: A4; margin: 14mm; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; direction: rtl; font-family: Heebo, Arial, sans-serif; color: #1f2937; background: #fff; }
      .pdf-block { padding: 0; max-width: 100%; }
      .pdf-page-break { page-break-before: always; break-before: page; }
      .pdf-header { border-bottom: 3px solid #6366f1; padding-bottom: 8px; margin-bottom: 12px; }
      .pdf-title-row { display: flex; align-items: center; gap: 10px; }
      .pdf-icon { font-size: 28px; }
      .pdf-header h1 { font-size: 22px; margin: 0; color: #4338ca; }
      .pdf-meta-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
      .pdf-pill { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 12px; border: 1px solid #c7d2fe; background: #eef2ff; color: #4338ca; }
      .pdf-pill-concept { background: #ecfeff; color: #0e7490; border-color: #67e8f9; }
      .pdf-pill-imp { background: #fef3c7; color: #92400e; border-color: #fbbf24; }
      .pdf-imp-1 { background: #f3f4f6; color: #6b7280; border-color: #d1d5db; }
      .pdf-imp-2 { background: #dbeafe; color: #1e40af; border-color: #93c5fd; }
      .pdf-imp-3 { background: #fef3c7; color: #92400e; border-color: #fbbf24; }
      .pdf-imp-4 { background: #fce7f3; color: #9f1239; border-color: #fb7185; }
      .pdf-callout { padding: 10px 14px; margin: 10px 0 14px; border-radius: 6px; font-size: 13px; line-height: 1.55; }
      .pdf-imp-bg-1 { background: #f9fafb; border-right: 4px solid #9ca3af; }
      .pdf-imp-bg-2 { background: #eff6ff; border-right: 4px solid #3b82f6; }
      .pdf-imp-bg-3 { background: #fffbeb; border-right: 4px solid #f59e0b; }
      .pdf-imp-bg-4 { background: #fff1f2; border-right: 4px solid #f43f5e; }
      .pdf-intro { font-size: 12.5px; line-height: 1.6; color: #4b5563; margin: 8px 0 12px; }
      .pdf-code-block { background: #0f172a; color: #e0f2fe; padding: 14px 12px; border-radius: 8px; margin: 12px 0; border-right: 4px solid #6366f1; direction: ltr; font-family: "Fira Code", Menlo, Consolas, monospace; font-size: 11.5px; line-height: 1.65; }
      .pdf-line { display: grid; grid-template-columns: 28px 1fr; gap: 8px; padding: 1px 0; align-items: start; }
      .pdf-line + .pdf-line { border-top: 1px dashed rgba(255,255,255,0.05); }
      .pdf-num { color: #94a3b8; font-size: 10px; text-align: right; padding-top: 2px; user-select: none; }
      .pdf-code { color: #a5d6ff; white-space: pre-wrap; word-break: break-word; }
      .pdf-comment { grid-column: 2; color: #cbd5e1; font-style: italic; font-family: Heebo, Arial, sans-serif; font-size: 11px; direction: rtl; text-align: right; opacity: 0.92; padding-top: 2px; }
      .cb-highlight { display: inline-block; padding: 1px 5px; border-radius: 4px; font-weight: 700; }
      .cb-imp-1 { background: rgba(156,163,175,0.18); color: #cbd5e1; font-size: 0.95em; }
      .cb-imp-2 { background: rgba(59,130,246,0.22); color: #bfdbfe; font-size: 1em; }
      .cb-imp-3 { background: rgba(245,158,11,0.25); color: #fbbf24; font-size: 1.08em; box-shadow: 0 0 0 1px rgba(245,158,11,0.5); }
      .cb-imp-4 { background: linear-gradient(135deg, rgba(244,63,94,0.35), rgba(168,85,247,0.35)); color: #fff; font-size: 1.18em; box-shadow: 0 0 0 1px rgba(244,63,94,0.7); text-shadow: 0 0 6px rgba(244,63,94,0.6); }
      .pdf-comment .cb-imp-4, .pdf-comment .cb-imp-3, .pdf-comment .cb-imp-2, .pdf-comment .cb-imp-1 { color: #1e3a8a; background: #fef3c7; }
      .pdf-questions { margin-top: 14px; }
      .pdf-questions h2 { font-size: 15px; color: #b91c1c; margin: 12px 0 8px; }
      .pdf-q { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px 12px; margin-bottom: 8px; page-break-inside: avoid; break-inside: avoid; }
      .pdf-q-meta { font-size: 10.5px; color: #6b7280; margin-bottom: 4px; }
      .pdf-q-text { font-weight: 700; color: #111827; margin-bottom: 6px; font-size: 12.5px; }
      .pdf-q-opts { display: flex; flex-direction: column; gap: 3px; margin-bottom: 6px; }
      .pdf-opt { font-size: 11.5px; padding: 4px 8px; border-radius: 4px; border: 1px solid #e5e7eb; }
      .pdf-correct { background: #dcfce7; border-color: #86efac; color: #14532d; font-weight: 700; }
      .pdf-q-expl { font-size: 11px; color: #4b5563; padding: 6px 8px; background: #f9fafb; border-right: 3px solid #6366f1; border-radius: 4px; }
      .pdf-footer { font-size: 10px; color: #9ca3af; text-align: center; margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e7eb; }
      @media print {
        body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      }
    `;

    const pdfDocHTML = `<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>LumenPortal — בלוקי קוד (${blocks.length})</title>
    <style>${pdfStyles}</style>
  </head>
  <body>
    ${blockHTML}
    <script>
      window.addEventListener('load', () => { setTimeout(() => window.print(), 300); });
    <\/script>
  </body>
</html>`;

    const w = window.open("", "_blank");
    if (!w) {
      alert(
        "החלון נחסם. אפשר Pop-ups לדומיין הזה או לחץ Ctrl+P אחרי שתיפתח חלונית.",
      );
      return;
    }
    w.document.open();
    w.document.write(pdfDocHTML);
    w.document.close();
  }

  // =========== RENDER CONTENT (adaptive — per-concept level) ===========
  // Per-concept "view level" overrides — let the user temporarily lower the displayed level
  // without affecting the score-driven actual level. Map: conceptKey -> level (1..6) or null.
  let conceptViewOverride = {};
  // Which concept is currently focused in the lesson view (per lesson). Map: lessonId -> conceptName
  let selectedConceptByLesson = {};

  function renderContent() {
    const lesson = window.LESSONS_DATA.find((l) => l.id === currentLessonId);
    if (!lesson) return;

    const concepts = lesson.concepts || [];
    if (concepts.length === 0) {
      lessonBody.innerHTML = `
        <h3>${esc(lesson.title)}</h3>
        <div class="concept-card"><p>אין מושגים זמינים בשיעור זה.</p></div>`;
      return;
    }

    // Resolve selected concept (default = first if not set)
    let selected =
      selectedConceptByLesson[lesson.id] || concepts[0].conceptName;
    let selectedConcept = concepts.find((c) => c.conceptName === selected);
    if (!selectedConcept) {
      selectedConcept = concepts[0];
      selectedConceptByLesson[lesson.id] = selectedConcept.conceptName;
    }

    setLessonContextTree(lesson, selectedConcept.conceptName);

    lessonBody.innerHTML = `
      <h3>${esc(lesson.title)}</h3>
      ${
        lesson.videoScript
          ? `
      <div class="concept-card" style="border-right: 3px solid var(--warning);">
        <h4 style="color: var(--warning);">🎬 תסריט סרטון לימודי</h4>
        <p class="concept-explanation"><strong>[פתיח]</strong> ${esc(lesson.videoScript.hook)}</p>
        <p class="concept-explanation"><strong>[תוכן]</strong> ${esc(lesson.videoScript.body)}</p>
        <p class="concept-explanation" style="margin-bottom:0;"><strong>[סיום]</strong> ${esc(lesson.videoScript.outro)}</p>
      </div>`
          : ""
      }
      <div class="concepts-list" id="concepts-list">
        ${renderConceptCard(lesson, selectedConcept, concepts.indexOf(selectedConcept))}
      </div>
    `;

    // Wire per-concept controls (simplify / illustration / etc.)
    wireConceptCardHandlers(lesson);

    // Auto-render inline quiz under the selected concept
    const card = document.querySelector(".concept-card.adaptive");
    if (card) {
      autoRenderConceptQuiz(card, lesson, selectedConcept);
    }
  }

  // Render BOTH MC and Fill stages always-visible inside the active concept card
  function autoRenderConceptQuiz(card, lesson, concept) {
    const slot = card.querySelector(".concept-quiz-slot");
    if (!slot) return;
    const sc = getScore(lesson.id, concept.conceptName);
    const fill = concept.codeExample ? makeCodeFill(concept) : null;

    // Master state — show only a "refresh" button
    if (sc.level >= 7) {
      slot.innerHTML = `
        <div class="concept-mastered-banner">
          🏆 הגעת לרמת מאסטר במושג זה — שלטת בכל 6 הרמות.
          <button class="concept-btn quiz" data-action="quiz-refresh">🔁 התחל סבב חידוש</button>
        </div>`;
      slot.querySelector('[data-action="quiz-refresh"]')?.addEventListener("click", () => {
        startConceptInlineQuiz(card, lesson, concept, "mc");
      });
      return;
    }

    const mcStageHTML = sc.passedMC
      ? `<div class="concept-stage-done">🅰️ ✅ עברת את שלב השאלה האמריקנית ברמה זו.</div>`
      : `<div class="concept-stage" data-stage="mc"><div class="concept-stage-head">🅰️ שלב 1 — שאלה אמריקנית</div><div class="concept-stage-body" id="cs-mc-body"></div></div>`;

    const needFill = !!fill;
    const fillStageHTML = !needFill
      ? `<div class="concept-stage-done muted">✍️ אין דוגמת קוד למושג — קידום על שלב MC בלבד.</div>`
      : sc.passedFill
        ? `<div class="concept-stage-done">✍️ ✅ עברת את שלב השלמת הקוד ברמה זו.</div>`
        : `<div class="concept-stage" data-stage="fill"><div class="concept-stage-head">✍️ שלב 2 — השלמת קוד</div><div class="concept-stage-body" id="cs-fill-body"></div></div>`;

    slot.innerHTML = `
      <div class="concept-stages">
        ${mcStageHTML}
        ${fillStageHTML}
      </div>`;

    // Render MC if not yet passed
    if (!sc.passedMC) {
      const q = pickMCQuestionForConcept(lesson, concept);
      const body = document.getElementById("cs-mc-body");
      if (q && body) {
        body.innerHTML = `
          <div class="question-learning-layout inline">
            <div class="question-answer-area">
              <div class="ciq-question">${esc(q.question).replace(/\n/g, "<br>")}</div>
              ${q.codeBlock ? `<div class="code-box"><pre><code>${esc(q.codeBlock)}</code></pre></div>` : ""}
              <div class="ciq-options">
                ${q.options
                  .map(
                    (opt, i) =>
                      `<button class="ciq-option" data-i="${i}">${esc(opt)}</button>`,
                  )
                  .join("")}
              </div>
            </div>
            ${renderQuestionPrereqPanel({ question: q, lesson, concept, mode: "inline" })}
          </div>
          <div class="ciq-feedback"></div>`;
        wireQuestionPrerequisiteNavigation(body);
        body.querySelectorAll(".ciq-option").forEach((btn) => {
          btn.addEventListener("click", () => {
            const sel = parseInt(btn.dataset.i, 10);
            const correct = sel === q.correctIndex;
            body.querySelectorAll(".ciq-option").forEach((o) => {
              o.classList.add("disabled");
              const i = parseInt(o.dataset.i, 10);
              if (i === q.correctIndex) o.classList.add("correct");
              else if (i === sel) o.classList.add("wrong");
            });
            handleConceptQuizAnswer(card, lesson, concept, "mc", correct, q);
          });
        });
      } else if (body) {
        body.innerHTML = `<div class="ciq-fb">לא נמצאה שאלה במאגר עבור מושג זה. ניתן להוסיף ב-<code>data/questions_bank.js</code>.</div>`;
      }
    }

    // Render Fill if not yet passed (and exists)
    if (needFill && !sc.passedFill) {
      const body = document.getElementById("cs-fill-body");
      if (body) {
        body.innerHTML = `
          <div class="question-learning-layout inline">
            <div class="question-answer-area">
              <div class="ciq-hint">${esc(`אורך התשובה: ${fill.answer.length} תווים. אות ראשונה: "${fill.answer[0]}".`)}</div>
              <div class="code-box"><pre><code>${esc(fill.blanked).replace(/____/g, '<span class="tq-code-blank">____</span>')}</code></pre></div>
              <div class="ciq-fill-row">
                <input type="text" class="ciq-fill-input" placeholder="הקלד את הטוקן החסר..." dir="ltr" autocomplete="off" spellcheck="false" />
                <button class="ciq-submit primary">✅ בדוק</button>
              </div>
            </div>
            ${renderQuestionPrereqPanel({
              question: {
                question: `השלם את הטוקן החסר בקוד של ${concept.conceptName}`,
                code: fill.blanked,
                conceptKey: conceptKey(lesson.id, concept.conceptName),
              },
              lesson,
              concept,
              mode: "inline",
            })}
          </div>
          <div class="ciq-feedback"></div>`;
        wireQuestionPrerequisiteNavigation(body);

        const input = body.querySelector(".ciq-fill-input");
        const submitBtn = body.querySelector(".ciq-submit");
        const submit = () => {
          const userAns = (input.value || "").trim();
          if (!userAns) return;
          const correct =
            userAns.toLowerCase() === (fill.answer || "").toLowerCase();
          input.disabled = true;
          submitBtn.disabled = true;
          input.classList.add(correct ? "correct" : "wrong");
          handleConceptQuizAnswer(card, lesson, concept, "fill", correct, {
            answer: fill.answer,
          });
        };
        submitBtn.addEventListener("click", submit);
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        });
      }
    }
  }

  function renderConceptCard(lesson, concept, idx) {
    const k = conceptKey(lesson.id, concept.conceptName);
    const sc = getScore(lesson.id, concept.conceptName);
    const actualLevel = sc.level;
    const overrideLevel = conceptViewOverride[k];
    // If level 7 (master) — display professor explanation. Else display user's current level.
    const displayLevelIdx =
      overrideLevel ||
      (actualLevel >= 7 ? 6 : Math.min(6, Math.max(1, actualLevel)));
    const displayKey = LEVEL_KEYS[displayLevelIdx] || "junior";
    const explanation =
      (concept.levels && concept.levels[displayKey]) ||
      bestExplanation(concept) ||
      "אין הסבר זמין למושג זה.";

    const pathways = (typeof CONCEPT_PATHWAYS !== "undefined") ? CONCEPT_PATHWAYS[k] : null;
    const pathwayText = pathways ? pathways[currentPathway] : null;

    const lvlInfo = LEVEL_INFO[displayLevelIdx];
    const realLvlInfo = LEVEL_INFO[actualLevel];
    const isOverride = !!overrideLevel && overrideLevel !== actualLevel;
    const canSimplify = displayLevelIdx > 1;
    const hasIllustration = !!concept.illustration;

    const overrideBadge = isOverride
      ? `<span class="concept-override-pill" title="הצגה זמנית של רמה ${displayLevelIdx} במקום הרמה האישית שלך">👁️ צופה ברמה ${displayLevelIdx}</span>`
      : "";

    // === Difficulty + V-button + Report-Weak meta ===
    const diff = getDifficulty(concept);
    const diffClass =
      diff <= 3 ? "diff-easy" : diff <= 6 ? "diff-medium" : diff <= 8 ? "diff-hard" : "diff-extreme";
    const diffLabel =
      diff <= 3 ? "קל" : diff <= 6 ? "בינוני" : diff <= 8 ? "קשה" : "מאוד קשה";
    const diffPill = `<span class="diff-pill ${diffClass}" title="ניקוד קושי 1–10. מסמן כמה הסברים, שאלות ותרגילים נדרשים לשליטה.">🌡️ קושי ${diff}/10 · ${diffLabel}</span>`;

    const need = correctNeededForV(diff);
    const canV = canMarkV(lesson.id, concept.conceptName, concept);
    const showVProgress = isFinite(need) && actualLevel < 7 && !sc.markedKnown;
    const vProgressBadge = showVProgress
      ? `<span class="v-progress" title="כמה תשובות נכונות נדרשות עד שתוכל לסמן ✓">✓ התקדמות: ${Math.min(sc.correctRunCount || 0, need)}/${need}</span>`
      : "";

    const masteredBadge = sc.markedKnown
      ? `<span class="v-mastered" title="סימנת בעצמך ✓ — הוסר ממאמן">✓ סימנתי כידוע</span>`
      : "";

    const weakBadge = sc.weakReports > 0
      ? `<span class="weak-badge" title="${sc.weakReports} דיווחי חולשה — המאמן יציג את המושג הזה לעיתים תכופות יותר">🆘 חלש ×${sc.weakReports}</span>`
      : "";

    const srsDueBadge =
      sc.srsState && isSrsDue(sc) && sc.srsState.reps > 0
        ? `<span class="srs-due-badge" title="מנגנון החזרה המרווחת מציע לחזור על מושג זה כעת">🔁 חזרה מומלצת</span>`
        : "";

    // W14 — Prerequisite warning
    const prereqWarning = (() => {
      if (typeof CONCEPT_PREREQUISITES === "undefined") return "";
      const prereqChain = getFullPrerequisiteChain(k);
      if (!prereqChain.length) return "";
      const allMastered = prereqChain.every((item) => {
        const score = prereqScoreForKey(item.key);
        return !!score && masteryPercent(score) === 100;
      });
      const chips = prereqChain.map((item) => renderPrerequisiteChip(item.key, item.relation)).join("");
      return `
        <div class="prereq-warning ${allMastered ? "all-mastered" : ""}">
          <div class="prereq-warning-head">
            <span aria-hidden="true">${allMastered ? "✓" : "⚠️"}</span>
            <strong>מומלץ ללמוד קודם:</strong>
            ${allMastered ? `<span class="prereq-warning-status">כל מושגי הבסיס בציון 100</span>` : ""}
          </div>
          <div class="prereq-list">${chips}</div>
        </div>`;
    })();

    // W14 — Suggested next
    const suggestedNext = (() => {
      if (actualLevel < 7) return "";
      if (typeof CONCEPT_SUGGESTED_NEXT === "undefined") return "";
      const nexts = CONCEPT_SUGGESTED_NEXT[k] || [];
      if (!nexts.length) return "";
      const items = nexts.map((nk) => {
        const [nLesson, ...nParts] = nk.split("::");
        const nConcept = nParts.join("::");
        const nSc = getScore(nLesson, nConcept);
        return `<span class="suggested-chip" title="רמה ${nSc.level}/7">${esc(nConcept)}</span>`;
      }).join("");
      return `<div class="suggested-next"><strong>➡️ המשך לבדוק:</strong> ${items}</div>`;
    })();

    return `
      <div class="concept-card adaptive" data-cid="${idx}" data-concept="${esc(concept.conceptName)}">
        ${prereqWarning}
        <div class="concept-card-head">
          <h4>${esc(concept.conceptName)}</h4>
          <div class="concept-level-row">
            ${diffPill}
            ${weakBadge}
            ${srsDueBadge}
            ${masteredBadge}
            ${vProgressBadge}
            ${overrideBadge}
            <span class="tq-level-pill ${realLvlInfo.cssClass}" title="הרמה האישית שלך במושג">${realLvlInfo.icon} רמה ${actualLevel}/7</span>
          </div>
        </div>

        <div class="concept-display-meta">
          מוצג ברמת <strong>${lvlInfo.icon} ${esc(lvlInfo.label)}</strong>${
            actualLevel >= 7
              ? " · 🏆 הגעת לרמת מאסטר!"
              : ""
          }
        </div>

        ${pathways ? `
        <div class="pathway-toggle" role="group" aria-label="בחר רמת הסבר">
          <button class="pathway-btn${currentPathway === 'grandma' ? ' active' : ''}" data-action="set-pathway" data-pathway="grandma" title="הסבר פשוט — כמו לסבתא">👵</button>
          <button class="pathway-btn${currentPathway === 'parent' ? ' active' : ''}" data-action="set-pathway" data-pathway="parent" title="הסבר לאדם לא טכני">🧑‍🏫</button>
          <button class="pathway-btn${currentPathway === 'technical' ? ' active' : ''}" data-action="set-pathway" data-pathway="technical" title="הסבר טכני מלא">👨‍💻</button>
        </div>` : ""}

        <p class="concept-explanation"${pathwayText ? ' style="display:none"' : ""}>${esc(explanation)}</p>
        ${pathwayText ? `<p class="pathway-explanation">${esc(pathwayText)}</p>` : '<p class="pathway-explanation" style="display:none"></p>'}

        ${
          hasIllustration
            ? `<div class="concept-illustration" style="display:none;"><pre>${esc(concept.illustration)}</pre></div>`
            : ""
        }

        ${renderAnalogyForLevel(concept, displayLevelIdx)}

        ${
          concept.codeExample
            ? `
        <div class="code-box">
          <div class="code-toolbar">
            <button class="code-tool-btn" data-action="toggle-comments" data-card-cid="${idx}" title="הוסף הערות בעברית לכל שורה">💬 הערות בעברית</button>
            <button class="code-tool-btn run-btn" data-action="run-code" data-card-cid="${idx}" aria-label="הרץ את הקוד בסביבה מבודדת" title="הרץ את הקוד בסביבה מבודדת — תראה את ה-console.log">🚀 הרץ</button>
          </div>
          <pre data-code-original="${esc(concept.codeExample)}"><code>${esc(concept.codeExample)}</code></pre>
          <div class="code-runner-output" data-runner-output="${idx}" style="display:none;"></div>
          ${
            concept.codeExplanation
              ? `<div class="code-explanation"><strong>💡 פינת הקוד:</strong> ${esc(concept.codeExplanation)}</div>`
              : ""
          }
        </div>`
            : ""
        }

        ${renderDeepDivePanel(concept)}
        ${renderExtendedExplanationPanel(concept)}
        ${renderExtrasPanel(concept, sc, diff)}
        ${renderMnemonicPanel(concept)}
        ${renderAntiPatternsPanel(concept)}
        ${renderAnimatorPanel(concept)}
        ${renderWhatIfPanel(concept)}
        ${renderConceptComicPanel(concept)}
        ${renderConceptVideoPanel(concept)}
        ${renderStageZeroPanel(concept)}
        ${renderMemoryPalacePanel(concept)}
        ${renderProblemFirstPanel(concept)}
        ${renderBugHuntPanel(concept)}
        ${renderMiniBuildPanel(concept)}
        ${renderWarStoriesPanel(concept)}
        ${renderComparisonsPanel(concept)}
        ${renderMetaphorCarousel(k)}
        ${renderScenariosPanel(k)}
        ${renderCounterfactualPanel(k)}
        ${renderAudioModeButton(concept, explanation)}

        <div class="concept-actions">
          ${
            canSimplify
              ? `<button class="concept-btn simplify" data-action="simplify">🤔 לא ברור — רמה פשוטה יותר</button>`
              : ""
          }
          ${
            hasIllustration
              ? `<button class="concept-btn illustrate" data-action="toggle-illustration">🖼️ הצג תרשים</button>`
              : ""
          }
          ${
            canV
              ? `<button class="concept-btn mark-v" data-action="mark-v" aria-label="סמן את המושג ${esc(concept.conceptName)} כידוע" title="המושג הזה ברור לי — סמן כידוע ועבור הלאה">✓ ברור לי — סמן כידוע</button>`
              : ""
          }
          ${
            actualLevel < 7 && !sc.markedKnown
              ? `<button class="concept-btn report-weak" data-action="report-weak" aria-label="דווח שאני חלש במושג ${esc(concept.conceptName)}" title="המאמן יציג את המושג לעיתים תכופות יותר ויפתח עוד הסברים, שאלות ודוגמאות קוד">🆘 אני חלש בזה — תן לי עוד</button>`
              : ""
          }
          <button class="concept-btn pocket-add" data-action="pocket-toggle" data-pocket-key="${esc(lesson.id + "::" + concept.conceptName)}" aria-label="שמור את המושג ${esc(concept.conceptName)} לכיס" title="שמור לכיס לחזרה מהירה — הכפתור הצף 📌 בפינה שמאלית עליונה">📌 שמור לכיס</button>
          <button class="concept-btn eli5" data-action="eli5" aria-label="הסבר את ${esc(concept.conceptName)} כמו שמסבירים לילד בן 5" title="ELI5 — Explain Like I'm 5 — תצוגה ברמת סבתא+אנלוגיות בלבד">🧒 כמו לבן 5</button>
          ${
            isOverride
              ? `<button class="concept-btn ghost" data-action="reset-view">👁️ חזור לרמה האישית</button>`
              : ""
          }
        </div>

        ${suggestedNext}
        <div class="concept-quiz-slot"></div>
      </div>
    `;
  }

  // === Extras panel: extra explanations, code snippets, pitfalls, and practice questions ===
  // Shows when ANY of:
  //   - difficulty >= 7 (always visible — hard concepts get extra material by default)
  //   - user reported weak (weakReports > 0)
  //   - user got 2+ wrong answers and current correctRunCount is low
  // Content sources: concept.extras + concept_enrichment commonMistakes.
  function renderExtrasPanel(concept, sc, diff) {
    const ext = concept.extras || {};
    const cm = (concept.deepDive && concept.deepDive.commonMistakes) ||
               (concept.commonMistakes) || [];
    const hasExtras =
      (ext.moreExamples && ext.moreExamples.length) ||
      (ext.pitfalls && ext.pitfalls.length) ||
      (ext.practiceQuestions && ext.practiceQuestions.length) ||
      (cm && cm.length);

    if (!hasExtras) return "";

    const stuckOnWrong = sc.attempts > 0 && (sc.correct / sc.attempts) < 0.5 && sc.attempts >= 3;
    const shouldOpen = diff >= 7 || sc.weakReports > 0 || stuckOnWrong;

    const examples = (ext.moreExamples || [])
      .map((ex, i) => `
        <div class="extras-example">
          <div class="extras-ex-head">דוגמה ${i + 1}</div>
          <pre><code>${esc(ex.code || "")}</code></pre>
          ${ex.explanation ? `<div class="extras-ex-expl">${esc(ex.explanation)}</div>` : ""}
        </div>`).join("");

    const pitfalls = (ext.pitfalls || [])
      .map((p, i) => `
        <div class="extras-pitfall">
          <div class="extras-pf-head">⚠️ טעות ${i + 1}: ${esc(p.mistake || "")}</div>
          ${p.why ? `<div><strong>למה זה שגוי:</strong> ${esc(p.why)}</div>` : ""}
          ${p.fix ? `<div><strong>תיקון:</strong> <code>${esc(p.fix)}</code></div>` : ""}
        </div>`).join("");

    const cmList = (cm || [])
      .map((p, i) => `
        <div class="extras-pitfall">
          <div class="extras-pf-head">⚠️ ${esc(p.mistake || "")}</div>
          ${p.why ? `<div><strong>למה:</strong> ${esc(p.why)}</div>` : ""}
          ${p.fix ? `<div><strong>תיקון:</strong> ${esc(p.fix)}</div>` : ""}
        </div>`).join("");

    const practice = (ext.practiceQuestions || [])
      .map((q, i) => `
        <div class="extras-practice">
          <div class="extras-pq-head">❓ תרגול נוסף ${i + 1}</div>
          <div class="extras-pq-text">${esc(q.question || "")}</div>
          <details><summary>הצג תשובה</summary>
            <div class="extras-pq-answer">${esc(q.answer || "")}</div>
          </details>
        </div>`).join("");

    return `
      <details class="extras-panel" ${shouldOpen ? "open" : ""}>
        <summary>🆘 עוד הסברים, דוגמאות ושאלות (${diff >= 7 ? "מומלץ למושג קשה" : "תרגול נוסף"})</summary>
        <div class="extras-body">
          ${examples ? `<div class="extras-section"><h5>📚 דוגמאות קוד נוספות</h5>${examples}</div>` : ""}
          ${(pitfalls || cmList) ? `<div class="extras-section"><h5>⚠️ טעויות נפוצות</h5>${pitfalls}${cmList}</div>` : ""}
          ${practice ? `<div class="extras-section"><h5>❓ שאלות תרגול נוספות</h5>${practice}</div>` : ""}
        </div>
      </details>`;
  }

  // P2.S1.2 — Mnemonic Panel (Hebrew acronym + rhyme + visual hook)
  function renderMnemonicPanel(concept) {
    const m = concept.mnemonic;
    if (!m) return "";
    return `
      <details class="mnemonic-panel">
        <summary>🧠 לזכירה — ${esc(m.acronym || "")} ${m.visualHook || ""}</summary>
        <div class="mnemonic-body">
          ${m.expansion ? `<div class="mnemonic-expansion"><strong>הרחבה:</strong> ${esc(m.expansion)}</div>` : ""}
          ${m.rhyme ? `<pre class="mnemonic-rhyme">${esc(m.rhyme)}</pre>` : ""}
          ${m.why ? `<div class="mnemonic-why">${esc(m.why)}</div>` : ""}
        </div>
      </details>`;
  }

  // P2.S1.1 — Anti-Patterns Gallery (bad code → damage → good code)
  function renderAntiPatternsPanel(concept) {
    const aps = concept.antiPatterns;
    if (!Array.isArray(aps) || aps.length === 0) return "";
    const items = aps
      .map((ap, i) => {
        const sevClass = ap.severity === "P0" ? "ap-sev-p0" : "ap-sev-p1";
        return `
        <div class="anti-pattern-card ${sevClass}">
          <div class="ap-head">
            <span class="ap-num">#${i + 1}</span>
            <span class="ap-title">${esc(ap.title || "")}</span>
            ${ap.severity ? `<span class="ap-sev">${esc(ap.severity)}</span>` : ""}
          </div>
          <div class="ap-bad">
            <div class="ap-label-bad">❌ פגום</div>
            <pre><code>${esc(ap.bad?.code || "")}</code></pre>
          </div>
          ${ap.damage ? `<div class="ap-damage"><strong>נזק:</strong> ${esc(ap.damage)}</div>` : ""}
          <div class="ap-good">
            <div class="ap-label-good">✅ תקין</div>
            <pre><code>${esc(ap.good?.code || "")}</code></pre>
          </div>
          ${
            Array.isArray(ap.diff) && ap.diff.length
              ? `<div class="ap-diff"><strong>השינוי:</strong> ${ap.diff.map((d) => `<code>${esc(d)}</code>`).join(", ")}</div>`
              : ""
          }
        </div>`;
      })
      .join("");
    return `
      <details class="anti-patterns-panel">
        <summary>🔁 דפוסי-נגד (${aps.length} מקרים)</summary>
        <div class="ap-body">${items}</div>
      </details>`;
  }

  // P1.4.3 — Bug Hunt panel (broken code → identify → fix)
  function renderBugHuntPanel(concept) {
    const bugs = concept.bugHunts;
    if (!Array.isArray(bugs) || bugs.length === 0) return "";
    const items = bugs
      .map((b, i) => {
        const optionsHtml = (b.options || [])
          .map(
            (opt, oi) =>
              `<button class="bug-option" data-action="bug-answer" data-bug-id="${esc(b.id)}" data-bug-idx="${oi}">${esc(opt)}</button>`,
          )
          .join("");
        return `
        <div class="bug-hunt-card" data-bug-card="${esc(b.id)}">
          <div class="bh-head">
            <span class="bh-num">🐛 #${i + 1}</span>
            <span class="bh-title">${esc(b.title || "")}</span>
            ${typeof b.level === "number" ? `<span class="bh-level">רמה ${b.level}</span>` : ""}
          </div>
          <div class="bh-broken">
            <div class="bh-label-bad">❌ קוד שבור</div>
            <pre><code>${esc(b.brokenCode || "")}</code></pre>
            ${typeof b.bugLine === "number" ? `<div class="bh-hint-line">💡 רמז: הבאג בשורה ${b.bugLine}</div>` : ""}
          </div>
          ${b.hint ? `<div class="bh-hint">🔎 ${esc(b.hint)}</div>` : ""}
          <div class="bh-options" data-bug-options="${esc(b.id)}">
            <div class="bh-options-prompt">מה הבעיה?</div>
            ${optionsHtml}
          </div>
          <div class="bh-result" data-bug-result="${esc(b.id)}" hidden>
            <div class="bh-fix">
              <div class="bh-label-good">✅ פתרון</div>
              <pre><code>${esc(b.fix || "")}</code></pre>
            </div>
            ${b.explanation ? `<div class="bh-explanation"><strong>📚 הסבר:</strong> ${esc(b.explanation)}</div>` : ""}
          </div>
        </div>`;
      })
      .join("");
    return `
      <details class="bug-hunt-panel">
        <summary>🐛 ציד באגים (${bugs.length} מקרים)</summary>
        <div class="bh-body">${items}</div>
      </details>`;
  }

  // Sprint 2 §4.15.6 — Mental Model Animator panel
  function renderAnimatorPanel(concept) {
    const anim = concept.animation;
    if (!anim || !Array.isArray(anim.frames) || anim.frames.length === 0) return "";
    const frames = anim.frames;
    const f0 = frames[0];
    return `
      <details class="animator-panel" data-anim-concept="${esc(concept.conceptName)}">
        <summary>🎬 הדמיה חיה (${frames.length} פריימים)</summary>
        <div class="anim-body">
          <div class="anim-title">${esc(anim.title || "")}</div>
          ${anim.intro ? `<div class="anim-intro">${esc(anim.intro)}</div>` : ""}
          <div class="anim-stage" data-anim-stage="${esc(concept.conceptName)}">
            <div class="anim-frame-num">פריים 1 / ${frames.length}</div>
            <div class="anim-frame-phase">${esc(f0.phase || "")}</div>
            <div class="anim-frame-grid">
              <div class="anim-cell"><span class="anim-cell-label">📦 State</span><pre class="anim-cell-content anim-state">${esc(String(f0.state || ""))}</pre></div>
              <div class="anim-cell"><span class="anim-cell-label">🖥️ DOM</span><pre class="anim-cell-content anim-dom">${esc(String(f0.dom || ""))}</pre></div>
              <div class="anim-cell"><span class="anim-cell-label">📤 Console</span><pre class="anim-cell-content anim-log">${esc(String(f0.log || ""))}</pre></div>
            </div>
            <div class="anim-frame-note">${esc(f0.note || "")}</div>
          </div>
          <div class="anim-controls">
            <button class="km-btn-mini" data-action="anim-prev" data-anim-concept="${esc(concept.conceptName)}">▶ הקודם</button>
            <button class="km-btn-mini" data-action="anim-auto" data-anim-concept="${esc(concept.conceptName)}">⏯ הפעל אוטו</button>
            <button class="km-btn-mini primary" data-action="anim-next" data-anim-concept="${esc(concept.conceptName)}">הבא ◀</button>
            <button class="km-btn-mini" data-action="anim-reset" data-anim-concept="${esc(concept.conceptName)}">🔄 איפוס</button>
          </div>
        </div>
      </details>`;
  }

  // Sprint 3 §4.15.7 — What-If Simulator panel
  function renderWhatIfPanel(concept) {
    const wif = concept.whatIf;
    if (!wif || !wif.knob || !Array.isArray(wif.knob.options) || wif.knob.options.length === 0) return "";
    const opts = wif.knob.options;
    const opt0 = opts[0];
    const code0 = (wif.codeTemplate || "").replace(/\{\{knob\}\}/g, opt0.insert || "");
    return `
      <details class="whatif-panel" data-wif-concept="${esc(concept.conceptName)}">
        <summary>❓ מה אם...? (${opts.length} תרחישים)</summary>
        <div class="wif-body">
          <div class="wif-title">${esc(wif.title || "")}</div>
          ${wif.intro ? `<div class="wif-intro">${esc(wif.intro)}</div>` : ""}
          <div class="wif-knob-label">${esc(wif.knob.name || "תרחיש")}:</div>
          <div class="wif-knob-buttons">
            ${opts.map((o, i) => `
              <button class="wif-knob-btn ${i === 0 ? 'is-active' : ''}" data-action="wif-pick" data-wif-concept="${esc(concept.conceptName)}" data-wif-idx="${i}">${esc(o.label)}</button>
            `).join("")}
          </div>
          <pre class="wif-code" data-wif-code="${esc(concept.conceptName)}"><code>${esc(code0)}</code></pre>
          <div class="wif-outcome" data-wif-outcome="${esc(concept.conceptName)}">${esc(opt0.outcome || "")}</div>
        </div>
      </details>`;
  }

  // AUDIT-FIX-8 — Concept Comic (visual storytelling)
  function renderConceptComicPanel(concept) {
    const comic = concept.conceptComic;
    if (!comic || !Array.isArray(comic.panels) || comic.panels.length === 0) return "";
    const panels = comic.panels
      .map((panel, i) => {
        const visual = Array.isArray(panel.visual)
          ? panel.visual.map((v) => `<span>${esc(v)}</span>`).join("<b>←</b>")
          : "";
        return `
          <article class="comic-frame">
            <div class="comic-frame-head">
              <span class="comic-frame-num">${i + 1}</span>
              <strong>${esc(panel.scene || "")}</strong>
            </div>
            <div class="comic-visual">${visual}</div>
            <p>${esc(panel.caption || "")}</p>
            ${panel.code ? `<pre><code>${esc(panel.code)}</code></pre>` : ""}
          </article>`;
      })
      .join("");
    return `
      <details class="concept-comic-panel">
        <summary>🎞️ קומיקס מושג — ${esc(comic.title || concept.conceptName)}</summary>
        <div class="comic-strip">${panels}</div>
      </details>`;
  }

  // AUDIT-FIX-13 — Animated Concept Clip (offline SVG/HTML player)
  function videoMotionClass(motion) {
    const normalized = String(motion || "flow").toLowerCase().replace(/[^a-z0-9-]/g, "");
    return normalized || "flow";
  }

  function renderConceptVideoPanel(concept) {
    const clip = concept.conceptVideo;
    if (!clip || !Array.isArray(clip.scenes) || clip.scenes.length === 0) return "";
    const scenes = clip.scenes;
    const scene = scenes[0];
    const visual = scene.visual || {};
    const dots = scenes
      .map((s, i) => `
        <button class="concept-video-dot${i === 0 ? " active" : ""}"
                data-action="video-jump"
                data-video-concept="${esc(concept.conceptName)}"
                data-video-idx="${i}"
                aria-label="עבור לסצנה ${i + 1}: ${esc(s.title || "")}"></button>`)
      .join("");
    const fallbackLinks = (Array.isArray(clip.fallbackVideos) ? clip.fallbackVideos : [])
      .map((video) => `
        <a class="concept-video-link" href="${esc(video.url || "")}" target="_blank" rel="noopener noreferrer">
          <span>${esc(video.title || "וידאו חיצוני")}</span>
          ${video.source ? `<small>${esc(video.source)}</small>` : ""}
        </a>`)
      .join("");
    return `
      <details class="concept-video-panel" data-video-concept="${esc(concept.conceptName)}">
        <summary>🎥 קליפ מושג — ${esc(clip.title || concept.conceptName)}</summary>
        <div class="concept-video-body">
          <div class="concept-video-head">
            <div>
              <strong>${esc(clip.title || concept.conceptName)}</strong>
              ${clip.objective ? `<p>${esc(clip.objective)}</p>` : ""}
            </div>
            <span class="concept-video-duration">${clip.durationSec ? `${esc(String(clip.durationSec))} שנ׳` : `${scenes.length} סצנות`}</span>
          </div>
          <div class="concept-video-progress" aria-hidden="true">
            <span class="concept-video-progress-fill" style="width:${Math.round((1 / scenes.length) * 100)}%"></span>
          </div>
          <div class="concept-video-stage video-motion-${videoMotionClass(scene.motion)}" data-video-stage="${esc(concept.conceptName)}">
            <div class="video-node video-node-a">${esc(visual.source || "")}</div>
            <div class="video-link" aria-hidden="true"></div>
            <div class="video-node video-node-b">${esc(visual.process || "")}</div>
            <div class="video-link" aria-hidden="true"></div>
            <div class="video-node video-node-c">${esc(visual.target || "")}</div>
          </div>
          <div class="concept-video-scene-card">
            <div class="concept-video-scene-meta">
              <span class="concept-video-counter">סצנה 1 / ${scenes.length}</span>
              <span class="concept-video-time">${esc(scene.time || "00:00")}</span>
            </div>
            <h5 class="concept-video-scene-title">${esc(scene.title || "")}</h5>
            <p class="concept-video-narration">${esc(scene.narration || "")}</p>
            ${scene.code ? `<pre class="concept-video-code"><code>${esc(scene.code)}</code></pre>` : ""}
            ${scene.checkpoint ? `<div class="concept-video-checkpoint">${esc(scene.checkpoint)}</div>` : ""}
          </div>
          <div class="concept-video-controls">
            <button class="km-btn-mini" data-action="video-prev" data-video-concept="${esc(concept.conceptName)}">▶ הקודם</button>
            <button class="km-btn-mini" data-action="video-play" data-video-concept="${esc(concept.conceptName)}">⏯ הפעל קליפ</button>
            <button class="km-btn-mini primary" data-action="video-next" data-video-concept="${esc(concept.conceptName)}">הבא ◀</button>
            <button class="km-btn-mini" data-action="video-reset" data-video-concept="${esc(concept.conceptName)}">🔄 איפוס</button>
          </div>
          <div class="concept-video-dots">${dots}</div>
          ${fallbackLinks ? `
            <div class="concept-video-fallback">
              <strong>קישורי וידאו זמניים עד להעלאת קליפ מקורי</strong>
              <div class="concept-video-links">${fallbackLinks}</div>
            </div>` : ""}
        </div>
      </details>`;
  }

  // AUDIT-FIX-9 — Stage-Zero broken-first-then-fix
  function renderStageZeroPanel(concept) {
    const stage = concept.stageZero;
    if (!stage) return "";
    const steps = (stage.repairSteps || [])
      .map((step, i) => `<li><span>${i + 1}</span>${esc(step)}</li>`)
      .join("");
    return `
      <details class="stage-zero-panel">
        <summary>🧯 שבור ואז תקן — ${esc(stage.title || concept.conceptName)}</summary>
        <div class="stage-zero-body">
          <div class="stage-zero-grid">
            <section class="stage-code broken">
              <h5>קוד שבור</h5>
              <pre><code>${esc(stage.brokenCode || "")}</code></pre>
            </section>
            <section class="stage-code fixed">
              <h5>קוד מתוקן</h5>
              <pre><code>${esc(stage.fixedCode || "")}</code></pre>
            </section>
          </div>
          ${stage.symptom ? `<p class="stage-symptom"><strong>סימפטום:</strong> ${esc(stage.symptom)}</p>` : ""}
          ${stage.rootCause ? `<p class="stage-root"><strong>שורש התקלה:</strong> ${esc(stage.rootCause)}</p>` : ""}
          ${steps ? `<ol class="stage-steps">${steps}</ol>` : ""}
          ${stage.checkpoint ? `<div class="stage-checkpoint">${esc(stage.checkpoint)}</div>` : ""}
        </div>
      </details>`;
  }

  // AUDIT-FIX-11 — Concept-as-Place memory palace
  function renderMemoryPalacePanel(concept) {
    const palace = concept.memoryPalace;
    if (!palace || !Array.isArray(palace.spots) || palace.spots.length === 0) return "";
    const route = (palace.route || []).map((item) => `<span>${esc(item)}</span>`).join("<b>←</b>");
    const lines = palace.spots
      .slice(1)
      .map((spot, i) => {
        const prev = palace.spots[i];
        return `<line x1="${prev.x}" y1="${prev.y}" x2="${spot.x}" y2="${spot.y}" />`;
      })
      .join("");
    const spots = palace.spots
      .map((spot, i) => `
        <g class="memory-spot">
          <circle cx="${spot.x}" cy="${spot.y}" r="6"></circle>
          <text x="${spot.x}" y="${spot.y - 9}" text-anchor="middle">${i + 1}</text>
        </g>`)
      .join("");
    const cards = palace.spots
      .map((spot, i) => `
        <div class="memory-spot-card">
          <strong>${i + 1}. ${esc(spot.label || "")}</strong>
          <p>${esc(spot.note || "")}</p>
        </div>`)
      .join("");
    return `
      <details class="memory-palace-panel">
        <summary>🏛️ ארמון זיכרון — ${esc(palace.title || concept.conceptName)}</summary>
        <div class="memory-body">
          ${palace.room ? `<p class="memory-room">${esc(palace.room)}</p>` : ""}
          <div class="memory-route">${route}</div>
          <svg class="memory-map" viewBox="0 0 100 100" role="img" aria-label="${esc(palace.title || "ארמון זיכרון")}">
            <rect x="8" y="10" width="84" height="78" rx="8"></rect>
            <path d="M 8 48 H 92 M 50 10 V 88"></path>
            <g class="memory-lines">${lines}</g>
            ${spots}
          </svg>
          <div class="memory-cards">${cards}</div>
        </div>
      </details>`;
  }

  // AUDIT-FIX-12 — Problem-First Discovery
  function renderProblemFirstPanel(concept) {
    const problem = concept.problemFirst;
    if (!problem) return "";
    const chips = (problem.clues || []).map((clue) => `<span>${esc(clue)}</span>`).join("");
    const steps = (problem.discoveryPath || [])
      .map((step, i) => `<li><span>${i + 1}</span>${esc(step)}</li>`)
      .join("");
    return `
      <details class="problem-first-panel">
        <summary>🧩 בעיה קודם — ${esc(problem.title || concept.conceptName)}</summary>
        <div class="problem-first-body">
          <p class="problem-user">${esc(problem.userProblem || "")}</p>
          ${chips ? `<div class="problem-clues">${chips}</div>` : ""}
          ${steps ? `<ol class="problem-steps">${steps}</ol>` : ""}
          ${problem.conceptLink ? `<div class="problem-link"><strong>חיבור למושג:</strong> ${esc(problem.conceptLink)}</div>` : ""}
          ${problem.successSignal ? `<div class="problem-success">${esc(problem.successSignal)}</div>` : ""}
        </div>
      </details>`;
  }

  // Learning Pathway state (grandma / parent / technical)
  const PATHWAY_KEY = "lumenportal:pathway:v1";
  let currentPathway = localStorage.getItem(PATHWAY_KEY) || "parent";
  function setPathway(p) {
    currentPathway = p;
    try { localStorage.setItem(PATHWAY_KEY, p); } catch {}
    document.querySelectorAll(".concept-card.adaptive").forEach((card) => {
      const pRow = card.querySelector(".pathway-toggle");
      if (pRow) pRow.querySelectorAll("[data-pathway]").forEach((b) => b.classList.toggle("active", b.dataset.pathway === p));
      const concName = card.dataset.concept;
      const lesson = window.LESSONS_DATA?.find((l) => l.id === currentLessonId);
      if (!lesson || !concName) return;
      const concept = (lesson.concepts || []).find((c) => c.conceptName === concName);
      if (!concept) return;
      const k = conceptKey(lesson.id, concName);
      const pathways = (typeof CONCEPT_PATHWAYS !== "undefined") ? CONCEPT_PATHWAYS[k] : null;
      const pathBox = card.querySelector(".pathway-explanation");
      const stdBox = card.querySelector(".concept-explanation");
      if (pathways && pathways[p]) {
        if (pathBox) { pathBox.textContent = pathways[p]; pathBox.style.display = ""; }
        if (stdBox) stdBox.style.display = "none";
      } else {
        if (pathBox) pathBox.style.display = "none";
        if (stdBox) stdBox.style.display = "";
      }
    });
  }

  // Metaphor carousel runtime state (per-concept key → current index 0-based)
  const METAPHOR_STORE_KEY = "lumenportal:metaphors:v1";
  const metaphorIdxMap = (() => {
    try { return JSON.parse(localStorage.getItem(METAPHOR_STORE_KEY) || "{}"); }
    catch { return {}; }
  })();
  function saveMetaphorIdx() {
    try { localStorage.setItem(METAPHOR_STORE_KEY, JSON.stringify(metaphorIdxMap)); } catch {}
  }

  function renderMetaphorCarousel(conceptKey) {
    const metaphors = (typeof CONCEPT_METAPHORS !== "undefined" && CONCEPT_METAPHORS[conceptKey]) || [];
    if (!metaphors.length) return "";
    const idx = Math.min(metaphorIdxMap[conceptKey] || 0, metaphors.length - 1);
    const m = metaphors[idx];
    return `
      <details class="metaphor-panel">
        <summary>🔮 מטאפורות (${metaphors.length})</summary>
        <div class="metaphor-carousel" data-metaphor-key="${esc(conceptKey)}">
          <div class="metaphor-card">
            <div class="metaphor-title">${esc(m.title || "")}</div>
            <div class="metaphor-body">${esc(m.body || "")}</div>
            <div class="metaphor-source">📦 ${esc(m.source || "")}</div>
          </div>
          <div class="metaphor-nav">
            <button class="metaphor-btn" data-action="metaphor-prev" ${idx === 0 ? "disabled" : ""} aria-label="מטאפורה קודמת">‹</button>
            <span class="metaphor-counter">${idx + 1} / ${metaphors.length}</span>
            <button class="metaphor-btn" data-action="metaphor-next" ${idx >= metaphors.length - 1 ? "disabled" : ""} aria-label="מטאפורה הבאה">›</button>
          </div>
        </div>
      </details>`;
  }

  function updateMetaphorCarousel(conceptKey, delta) {
    const metaphors = (typeof CONCEPT_METAPHORS !== "undefined" && CONCEPT_METAPHORS[conceptKey]) || [];
    if (!metaphors.length) return;
    const cur = metaphorIdxMap[conceptKey] || 0;
    const next = Math.max(0, Math.min(metaphors.length - 1, cur + delta));
    metaphorIdxMap[conceptKey] = next;
    saveMetaphorIdx();
    const carousel = document.querySelector(`.metaphor-carousel[data-metaphor-key="${CSS.escape(conceptKey)}"]`);
    if (!carousel) return;
    const m = metaphors[next];
    carousel.querySelector(".metaphor-title").textContent = m.title || "";
    carousel.querySelector(".metaphor-body").textContent = m.body || "";
    carousel.querySelector(".metaphor-source").textContent = `📦 ${m.source || ""}`;
    carousel.querySelector(".metaphor-counter").textContent = `${next + 1} / ${metaphors.length}`;
    carousel.querySelector('[data-action="metaphor-prev"]').disabled = next === 0;
    carousel.querySelector('[data-action="metaphor-next"]').disabled = next >= metaphors.length - 1;
  }

  // Animator runtime state (per-concept). Map of conceptName → {idx, autoTimer}
  const animState = new Map();

  function showAnimatorFrame(concept, idx) {
    const frames = concept.animation?.frames || [];
    if (!frames.length) return;
    if (idx < 0) idx = 0;
    if (idx >= frames.length) idx = frames.length - 1;
    const f = frames[idx];
    const stageQuery = `[data-anim-stage="${cssEscape(concept.conceptName)}"]`;
    const stage = document.querySelector(stageQuery);
    if (!stage) return;
    stage.querySelector(".anim-frame-num").textContent = `פריים ${idx + 1} / ${frames.length}`;
    stage.querySelector(".anim-frame-phase").textContent = f.phase || "";
    stage.querySelector(".anim-state").textContent = String(f.state || "");
    stage.querySelector(".anim-dom").textContent = String(f.dom || "");
    stage.querySelector(".anim-log").textContent = String(f.log || "");
    stage.querySelector(".anim-frame-note").textContent = f.note || "";
    if (!animState.has(concept.conceptName)) animState.set(concept.conceptName, { idx: 0, autoTimer: null });
    animState.get(concept.conceptName).idx = idx;
  }

  function stopAnimAuto(conceptName) {
    const s = animState.get(conceptName);
    if (s?.autoTimer) {
      clearInterval(s.autoTimer);
      s.autoTimer = null;
    }
  }

  // Concept clip runtime state (per-concept). Map of conceptName → {idx, autoTimer}
  const conceptVideoState = new Map();

  function ensureConceptVideoState(conceptName) {
    if (!conceptVideoState.has(conceptName)) {
      conceptVideoState.set(conceptName, { idx: 0, autoTimer: null });
    }
    return conceptVideoState.get(conceptName);
  }

  function stopConceptVideoAuto(conceptName) {
    const s = conceptVideoState.get(conceptName);
    if (s?.autoTimer) {
      clearInterval(s.autoTimer);
      s.autoTimer = null;
    }
    setConceptVideoPlayLabel(conceptName, false);
  }

  function setConceptVideoPlayLabel(conceptName, isPlaying) {
    document
      .querySelectorAll(`[data-action="video-play"][data-video-concept="${cssEscape(conceptName)}"]`)
      .forEach((b) => {
        b.textContent = isPlaying ? "⏸ עצור" : "⏯ הפעל קליפ";
      });
  }

  function showConceptVideoScene(concept, idx) {
    const scenes = concept.conceptVideo?.scenes || [];
    if (!scenes.length) return;
    if (idx < 0) idx = 0;
    if (idx >= scenes.length) idx = scenes.length - 1;
    const scene = scenes[idx];
    const visual = scene.visual || {};
    const panel = document.querySelector(
      `.concept-video-panel[data-video-concept="${cssEscape(concept.conceptName)}"]`,
    );
    if (!panel) return;
    const stage = panel.querySelector(".concept-video-stage");
    if (stage) {
      stage.className = `concept-video-stage video-motion-${videoMotionClass(scene.motion)}`;
      const source = stage.querySelector(".video-node-a");
      const process = stage.querySelector(".video-node-b");
      const target = stage.querySelector(".video-node-c");
      if (source) source.textContent = visual.source || "";
      if (process) process.textContent = visual.process || "";
      if (target) target.textContent = visual.target || "";
    }
    const counter = panel.querySelector(".concept-video-counter");
    const time = panel.querySelector(".concept-video-time");
    const title = panel.querySelector(".concept-video-scene-title");
    const narration = panel.querySelector(".concept-video-narration");
    const code = panel.querySelector(".concept-video-code code");
    const checkpoint = panel.querySelector(".concept-video-checkpoint");
    const progress = panel.querySelector(".concept-video-progress-fill");
    if (counter) counter.textContent = `סצנה ${idx + 1} / ${scenes.length}`;
    if (time) time.textContent = scene.time || "00:00";
    if (title) title.textContent = scene.title || "";
    if (narration) narration.textContent = scene.narration || "";
    if (code) code.textContent = scene.code || "";
    if (checkpoint) checkpoint.textContent = scene.checkpoint || "";
    if (progress) progress.style.width = `${Math.round(((idx + 1) / scenes.length) * 100)}%`;
    panel.querySelectorAll(".concept-video-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === idx);
    });
    ensureConceptVideoState(concept.conceptName).idx = idx;
  }

  // P1.4.4 — Mini Build panel (write code → regex tests)
  function renderMiniBuildPanel(concept) {
    const builds = concept.miniBuilds;
    if (!Array.isArray(builds) || builds.length === 0) return "";
    const items = builds
      .map((b, i) => {
        return `
        <div class="mini-build-card" data-build-card="${esc(b.id)}">
          <div class="mb-head">
            <span class="mb-num">🛠️ #${i + 1}</span>
            <span class="mb-title">${esc(b.title || "")}</span>
            ${typeof b.level === "number" ? `<span class="mb-level">רמה ${b.level}</span>` : ""}
          </div>
          <div class="mb-prompt">${esc(b.prompt || "")}</div>
          <textarea class="mb-editor" data-mb-id="${esc(b.id)}" spellcheck="false" dir="ltr" rows="8">${esc(b.starter || "")}</textarea>
          <div class="mb-actions">
            <button class="km-btn-mini primary" data-action="mb-check" data-mb-id="${esc(b.id)}">🚀 בדוק</button>
            <button class="km-btn-mini" data-action="mb-reset" data-mb-id="${esc(b.id)}">🔄 איפוס</button>
            <button class="km-btn-mini" data-action="mb-show-ref" data-mb-id="${esc(b.id)}">👀 הצג פתרון</button>
            ${b.hint ? `<button class="km-btn-mini" data-action="mb-show-hint" data-mb-id="${esc(b.id)}">💡 רמז</button>` : ""}
          </div>
          <div class="mb-tests" data-mb-tests="${esc(b.id)}" hidden>
            ${(b.tests || []).map((t, ti) => `
              <div class="mb-test" data-mb-test-idx="${ti}">
                <span class="mb-test-mark">⏳</span>
                <span class="mb-test-desc">${esc(t.description || t.regex)}</span>
              </div>
            `).join("")}
          </div>
          <div class="mb-hint-box" data-mb-hint="${esc(b.id)}" hidden>
            ${b.hint ? `<strong>💡 רמז:</strong> ${esc(b.hint)}` : ""}
          </div>
          <div class="mb-ref-box" data-mb-ref="${esc(b.id)}" hidden>
            <div class="mb-ref-label">✅ פתרון לדוגמה</div>
            <pre><code>${esc(b.reference || "")}</code></pre>
            ${b.explanation ? `<div class="mb-explanation"><strong>📚 הסבר:</strong> ${esc(b.explanation)}</div>` : ""}
          </div>
        </div>`;
      })
      .join("");
    return `
      <details class="mini-build-panel">
        <summary>🛠️ בנה את זה (${builds.length} תרגילים)</summary>
        <div class="mb-body">${items}</div>
      </details>`;
  }

  // P2.S2.1 — War Stories Library (real production incidents)
  function renderWarStoriesPanel(concept) {
    const stories = concept.warStories;
    if (!Array.isArray(stories) || stories.length === 0) return "";
    const items = stories
      .map((s, i) => {
        const sevClass =
          s.severity === "P0" ? "ws-sev-p0" : s.severity === "P1" ? "ws-sev-p1" : "ws-sev-p2";
        return `
        <div class="war-story-card ${sevClass}">
          <div class="ws-head">
            <span class="ws-num">📍 #${i + 1}</span>
            <span class="ws-title">${esc(s.title || "")}</span>
            ${s.severity ? `<span class="ws-sev">${esc(s.severity)}</span>` : ""}
            ${s.hours ? `<span class="ws-hours" title="זמן שהושקע בדיבוג">⏱️ ${esc(s.hours)}</span>` : ""}
          </div>
          ${s.context ? `<div class="ws-row"><strong>הקונטקסט:</strong> ${esc(s.context)}</div>` : ""}
          ${s.bug ? `<div class="ws-row ws-bug"><strong>הבאג:</strong> <code>${esc(s.bug)}</code></div>` : ""}
          ${s.diagnosis ? `<div class="ws-row"><strong>אבחנה:</strong> ${esc(s.diagnosis)}</div>` : ""}
          ${s.fix ? `<div class="ws-row ws-fix"><strong>תיקון:</strong> <code>${esc(s.fix)}</code></div>` : ""}
          ${s.lesson ? `<div class="ws-row ws-lesson"><strong>📚 לקח:</strong> ${esc(s.lesson)}</div>` : ""}
        </div>`;
      })
      .join("");
    return `
      <details class="war-stories-panel">
        <summary>📚 סיפורי שטח — ${stories.length} מקרים אמיתיים מייצור</summary>
        <div class="ws-body">${items}</div>
      </details>`;
  }

  // P2.S2.2 — Side-by-Side Comparator (X vs Y)
  function renderComparisonsPanel(concept) {
    const cmps = concept.comparisons;
    if (!Array.isArray(cmps) || cmps.length === 0) return "";
    const items = cmps
      .map((cmp) => {
        const rows = (cmp.rows || [])
          .map(
            (r) => `
          <tr>
            <td class="cmp-dim">${esc(r.dim || "")}</td>
            <td class="cmp-cell-a">${esc(r.a || "")}</td>
            <td class="cmp-cell-b">${esc(r.b || "")}</td>
          </tr>`,
          )
          .join("");
        return `
        <div class="comparison-card">
          <div class="cmp-head">
            <div class="cmp-side cmp-side-a">
              <span class="cmp-icon">${esc(cmp.a?.icon || "")}</span>
              <span class="cmp-name">${esc(cmp.a?.name || "A")}</span>
              ${cmp.a?.tagline ? `<span class="cmp-tag">${esc(cmp.a.tagline)}</span>` : ""}
            </div>
            <div class="cmp-vs">VS</div>
            <div class="cmp-side cmp-side-b">
              <span class="cmp-icon">${esc(cmp.b?.icon || "")}</span>
              <span class="cmp-name">${esc(cmp.b?.name || "B")}</span>
              ${cmp.b?.tagline ? `<span class="cmp-tag">${esc(cmp.b.tagline)}</span>` : ""}
            </div>
          </div>
          <table class="cmp-table">
            <thead>
              <tr>
                <th class="cmp-dim-head">ממד</th>
                <th>${esc(cmp.a?.name || "A")}</th>
                <th>${esc(cmp.b?.name || "B")}</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          ${cmp.when ? `<div class="cmp-when"><strong>💡 מתי:</strong> ${esc(cmp.when)}</div>` : ""}
        </div>`;
      })
      .join("");
    return `
      <details class="comparisons-panel">
        <summary>⚖️ השוואה — ${cmps.length === 1 ? cmps[0].a.name + " vs " + cmps[0].b.name : cmps.length + " השוואות"}</summary>
        <div class="cmp-body">${items}</div>
      </details>`;
  }

  // W11 — Themed Scenarios panel
  const SCENARIO_LABELS = { kitchen: "🍳 מטבח", shop: "🛍️ חנות", classroom: "🏫 כיתה", sports: "⚽ ספורט", travel: "✈️ נסיעה" };
  const SCENARIO_KEY = "lumenportal:scenario:v1";
  let currentScenario = (() => { try { return localStorage.getItem(SCENARIO_KEY) || "kitchen"; } catch { return "kitchen"; } })();

  function renderScenariosPanel(conceptKey) {
    const scenarios = (typeof CONCEPT_SCENARIOS !== "undefined") ? CONCEPT_SCENARIOS[conceptKey] : null;
    if (!scenarios) return "";
    const text = scenarios[currentScenario] || "";
    return `
      <details class="scenarios-panel">
        <summary>🌍 תרחישים מהחיים</summary>
        <div class="scenario-container" data-scenario-key="${esc(conceptKey)}">
          <div class="scenario-tabs">
            ${Object.keys(SCENARIO_LABELS).map((k) =>
              `<button class="scenario-tab${k === currentScenario ? ' active' : ''}" data-action="set-scenario" data-scenario="${k}">${SCENARIO_LABELS[k]}</button>`
            ).join("")}
          </div>
          <p class="scenario-text" data-scenario-text="${esc(conceptKey)}">${esc(text)}</p>
        </div>
      </details>`;
  }

  function updateScenarioDisplay(scenario) {
    currentScenario = scenario;
    try { localStorage.setItem(SCENARIO_KEY, scenario); } catch {}
    document.querySelectorAll(".scenario-container").forEach((el) => {
      const cKey = el.dataset.scenarioKey;
      const scenarios = (typeof CONCEPT_SCENARIOS !== "undefined") ? CONCEPT_SCENARIOS[cKey] : null;
      if (!scenarios) return;
      const textEl = el.querySelector("[data-scenario-text]");
      if (textEl) textEl.textContent = scenarios[scenario] || "";
      el.querySelectorAll(".scenario-tab").forEach((b) => b.classList.toggle("active", b.dataset.scenario === scenario));
    });
  }

  // W11 — Counterfactual panel ("מה היה בלי?")
  function renderCounterfactualPanel(conceptKey) {
    const cf = (typeof CONCEPT_COUNTERFACTUALS !== "undefined") ? CONCEPT_COUNTERFACTUALS[conceptKey] : null;
    if (!cf) return "";
    return `
      <details class="counterfactual-panel">
        <summary>🤔 מה היה בלי זה?</summary>
        <div class="cf-body">
          <p class="cf-without">${esc(cf.without || "")}</p>
          ${cf.problem ? `<div class="cf-code-row">
            <div class="cf-code-block"><div class="cf-label">❌ בלי</div><pre><code>${esc(cf.problem)}</code></pre></div>
            <div class="cf-code-block"><div class="cf-label">✅ עם</div><pre><code>${esc(cf.solution || "")}</code></pre></div>
          </div>` : ""}
          ${cf.why ? `<p class="cf-why"><strong>💡 למה:</strong> ${esc(cf.why)}</p>` : ""}
        </div>
      </details>`;
  }

  // P2.S2.3 — Audio Mode (Web Speech API TTS)
  function renderAudioModeButton(concept, levelText) {
    if (typeof window === "undefined" || typeof window.speechSynthesis === "undefined") return "";
    if (!levelText || levelText.length < 10) return "";
    return `
      <button class="audio-mode-btn" data-action="audio-read" data-text="${esc(levelText)}"
              aria-label="הקרא את ההסבר בקול" title="הקרא בקול (Web Speech)">
        🎤 הקרא בקול
      </button>`;
  }

  // Renders an "analogy from daily life" callout for the level being displayed.
  // Looks up concept.analogies[levelKey] (e.g. concept.analogies.grandma).
  // If the curated analogy is missing, returns empty string.
  function renderAnalogyForLevel(concept, levelIdx) {
    const lvKey = LEVEL_KEYS[levelIdx];
    if (!lvKey) return "";
    const analogy =
      (concept.analogies && concept.analogies[lvKey]) ||
      (concept.analogy && typeof concept.analogy === "string" ? concept.analogy : "");
    if (!analogy) return "";
    return `<div class="concept-analogy" title="אסוציאציה מחיי היום-יום">
      <span class="ca-label">🌍 כמו בחיים:</span>
      <span class="ca-text">${esc(analogy)}</span>
    </div>`;
  }

  // Renders the "📚 הסבר מורחב" expandable panel for exam prep.
  // Pulls from concept.extendedTab = { simpleGrandma, simpleExplanation,
  // thinkingMethod (string|string[]), purpose, codeSnippets[], codeBreakdowns[] }.
  // Returns "" when no curated content exists, so card looks unchanged.
  function renderExtendedExplanationPanel(concept) {
    const ext = concept.extendedTab;
    if (!ext) return "";
    const snippets = (ext.codeSnippets || [])
      .map(
        (s) => `
        <div class="ext-snippet">
          <div class="ext-snippet-title">${esc(s.title || "")}</div>
          <pre class="ext-snippet-code"><code>${esc(s.code || "")}</code></pre>
          ${s.explanation ? `<div class="ext-snippet-explanation">${esc(s.explanation)}</div>` : ""}
        </div>`,
      )
      .join("");
    const thinkingList = Array.isArray(ext.thinkingMethod)
      ? `<ol class="ext-thinking">${ext.thinkingMethod.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`
      : ext.thinkingMethod
        ? `<p>${esc(ext.thinkingMethod)}</p>`
        : "";
    const breakdowns = Array.isArray(ext.codeBreakdowns)
      ? ext.codeBreakdowns.map(renderCodeAnatomyBlock).join("")
      : "";
    return `<details class="extended-panel">
      <summary>📚 הסבר מורחב — לכיתה, לקריאה, ולמבחן</summary>
      <div class="ext-body">
        ${ext.simpleGrandma ? `<div class="ext-section ext-grandma"><h5>👵 דימוי פשוט לסבתא</h5><p>${esc(ext.simpleGrandma)}</p></div>` : ""}
        ${ext.simpleExplanation ? `<div class="ext-section ext-simple"><h5>💡 הסבר פשוט וברור</h5><p>${esc(ext.simpleExplanation)}</p></div>` : ""}
        ${thinkingList ? `<div class="ext-section ext-thinking-section"><h5>🧭 דרך חשיבה קבועה</h5>${thinkingList}</div>` : ""}
        ${ext.purpose ? `<div class="ext-section ext-purpose"><h5>🎯 מה המטרה?</h5><p>${esc(ext.purpose)}</p></div>` : ""}
        ${breakdowns ? `<div class="ext-section ext-anatomy-section"><h5>📐 פירוק קוד — תפקיד כל רכיב</h5>${breakdowns}</div>` : ""}
        ${snippets ? `<div class="ext-section ext-snippets-section"><h5>📦 דוגמאות קוד נוספות</h5>${snippets}</div>` : ""}
      </div>
    </details>`;
  }

  // Renders the "💡 למה זה קיים?" expandable panel.
  // Pulls from concept.deepDive = { purpose, problem, withoutIt, useWhen }.
  // Falls back to a generic prompt if no curated content exists.
  function renderDeepDivePanel(concept) {
    const dd = concept.deepDive || {};
    const hasContent = !!(dd.purpose || dd.problem || dd.withoutIt || dd.useWhen);
    if (!hasContent) {
      return `<details class="deep-dive empty">
        <summary>💡 למה זה קיים? <span class="dd-status">— הסבר עומק יתווסף בקרוב</span></summary>
        <div class="dd-body">
          <p class="dd-fallback">למידע מורחב על המושג, ראה את ההסבר ברמה גבוהה יותר (סטודנט / ג'וניור / פרופ׳).</p>
        </div>
      </details>`;
    }
    return `<details class="deep-dive">
      <summary>💡 למה זה קיים? — הבן את הלוגיקה והצורך</summary>
      <div class="dd-body">
        ${dd.purpose ? `<div class="dd-row"><strong>🎯 המטרה:</strong> ${esc(dd.purpose)}</div>` : ""}
        ${dd.problem ? `<div class="dd-row"><strong>🤔 הבעיה שזה פותר:</strong> ${esc(dd.problem)}</div>` : ""}
        ${dd.withoutIt ? `<div class="dd-row"><strong>❌ מה היה בלעדיו:</strong> ${esc(dd.withoutIt)}</div>` : ""}
        ${dd.useWhen ? `<div class="dd-row"><strong>✅ מתי משתמשים:</strong> ${esc(dd.useWhen)}</div>` : ""}
      </div>
    </details>`;
  }

  // P1.1.2 — Per-card refresh helper.
  // Replaces only the targeted concept-card in DOM instead of full renderContent().
  // Falls back to full re-render if the card isn't currently visible.
  function refreshConceptCard(conceptName) {
    const lesson = (window.LESSONS_DATA || []).find(
      (l) => l.id === currentLessonId,
    );
    if (!lesson) {
      renderContent();
      return;
    }
    const concept = (lesson.concepts || []).find(
      (c) => c.conceptName === conceptName,
    );
    if (!concept) {
      renderContent();
      return;
    }
    const idx = (lesson.concepts || []).indexOf(concept);
    const oldCard = document.querySelector(
      `.concept-card.adaptive[data-concept="${cssEscape(conceptName)}"]`,
    );
    if (!oldCard) {
      renderContent();
      return;
    }
    const tmp = document.createElement("div");
    tmp.innerHTML = renderConceptCard(lesson, concept, idx);
    const newCard = tmp.firstElementChild;
    if (!newCard) {
      renderContent();
      return;
    }
    oldCard.replaceWith(newCard);
    // Re-wire handlers only on this card by re-using existing wireConceptCardHandlers
    // (it queries all .concept-card.adaptive but new cards are idempotent: each
    // listener was just bound to this freshly inserted card).
    wireConceptCardHandlers(lesson);
    setLessonContextTree(lesson, conceptName);
  }

  function wireConceptCardHandlers(lesson) {
    document.querySelectorAll(".concept-card.adaptive").forEach((card) => {
      const conceptName = card.dataset.concept;
      const concept = (lesson.concepts || []).find(
        (c) => c.conceptName === conceptName,
      );
      if (!concept) return;
      const k = conceptKey(lesson.id, conceptName);

      card.querySelectorAll(".prereq-chip[data-prereq-lesson][data-prereq-concept]").forEach((btn) => {
        if (btn.dataset.boundPrereqNav === "1") return;
        btn.dataset.boundPrereqNav = "1";
        btn.addEventListener("click", (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          openLessonConcept(btn.dataset.prereqLesson, btn.dataset.prereqConcept);
        });
      });

      card.querySelectorAll("[data-action]").forEach((btn) => {
        btn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          const action = btn.dataset.action;
          if (action === "simplify") {
            const cur =
              conceptViewOverride[k] ||
              Math.min(6, Math.max(1, getScore(lesson.id, conceptName).level));
            const next = Math.max(1, cur - 1);
            conceptViewOverride[k] = next;
            refreshConceptCard(conceptName); // P1.1.2 — per-card refresh
          } else if (action === "reset-view") {
            delete conceptViewOverride[k];
            refreshConceptCard(conceptName); // P1.1.2
          } else if (action === "toggle-illustration") {
            const ill = card.querySelector(".concept-illustration");
            if (ill) ill.style.display = ill.style.display === "none" ? "block" : "none";
          } else if (action === "toggle-comments") {
            const pre = card.querySelector(".code-box pre");
            if (!pre) return;
            const code = pre.querySelector("code");
            const original = pre.dataset.codeOriginal || "";
            const isAnnotated = btn.classList.contains("active");
            if (isAnnotated) {
              code.textContent = original;
              btn.classList.remove("active");
              btn.textContent = "💬 הערות בעברית";
            } else {
              code.textContent = annotateCodeHebrew(original);
              btn.classList.add("active");
              btn.textContent = "🔙 הסר הערות";
            }
          } else if (action === "run-code") {
            // P1.4.1 — execute codeExample in a sandboxed iframe and show output.
            const pre = card.querySelector(".code-box pre");
            const out = card.querySelector(`[data-runner-output="${btn.dataset.cardCid}"]`);
            if (!pre || !out || typeof window.CodeRunner !== "function") return;
            const code = pre.dataset.codeOriginal || pre.textContent || "";
            btn.disabled = true;
            btn.textContent = "⏳ רץ...";
            out.style.display = "block";
            out.innerHTML = '<div class="runner-status">⏳ מריץ...</div>';
            const runner = new window.CodeRunner(out);
            runner
              .run(code)
              .then((result) => {
                btn.disabled = false;
                btn.textContent = "🚀 הרץ שוב";
                const lines = [];
                if (result.logs && result.logs.length) {
                  lines.push(
                    '<div class="runner-section"><strong>📤 פלט (console):</strong></div>',
                  );
                  result.logs.forEach((log) => {
                    lines.push(
                      `<div class="runner-log runner-log-${log.level}">${esc(log.text)}</div>`,
                    );
                  });
                } else {
                  lines.push(
                    '<div class="runner-status">✓ הרץ ללא פלט (אין console.log)</div>',
                  );
                }
                if (result.errors && result.errors.length) {
                  lines.push(
                    '<div class="runner-section"><strong>❌ שגיאות:</strong></div>',
                  );
                  result.errors.forEach((err) => {
                    lines.push(
                      `<div class="runner-error">${esc(err.message)}${err.line ? ` (line ${err.line})` : ""}</div>`,
                    );
                  });
                }
                out.innerHTML = lines.join("");
              })
              .catch((err) => {
                btn.disabled = false;
                btn.textContent = "🚀 הרץ שוב";
                out.innerHTML = `<div class="runner-error">שגיאה: ${esc(err.message || err)}</div>`;
              });
          } else if (action === "bug-answer") {
            // P1.4.3 — user picked an option in the Bug Hunt
            const bugId = btn.dataset.bugId;
            const pickedIdx = parseInt(btn.dataset.bugIdx, 10);
            const card = btn.closest(".bug-hunt-card");
            if (!card) return;
            const bugList = concept.bugHunts || [];
            const bug = bugList.find((b) => b.id === bugId);
            if (!bug) return;
            const optionsBox = card.querySelector(`[data-bug-options="${cssEscape(bugId)}"]`);
            const resultBox = card.querySelector(`[data-bug-result="${cssEscape(bugId)}"]`);
            const isCorrect = pickedIdx === bug.correctIndex;
            // Mark all options as disabled, highlight correct + chosen
            if (optionsBox) {
              optionsBox.querySelectorAll(".bug-option").forEach((b, i) => {
                b.disabled = true;
                if (i === bug.correctIndex) b.classList.add("bug-option-correct");
                if (i === pickedIdx && !isCorrect) b.classList.add("bug-option-wrong");
              });
            }
            if (resultBox) resultBox.hidden = false;
            // Per-distractor feedback for wrong choices: subtle status tag
            if (!isCorrect) {
              const tag = document.createElement("div");
              tag.className = "bh-status bh-status-wrong";
              tag.textContent = "❌ לא בדיוק. ראה את ההסבר למטה.";
              optionsBox?.appendChild(tag);
            } else {
              const tag = document.createElement("div");
              tag.className = "bh-status bh-status-correct";
              tag.textContent = "✅ נכון!";
              optionsBox?.appendChild(tag);
            }
          } else if (action === "eli5") {
            // ELI5 — show the simplest explanation (grandma) inline.
            // levels can be an object {grandma,child,...} or array.
            const expEl = card.querySelector(".concept-explanation");
            const eli5Box = card.querySelector(".eli5-overlay");
            let grandma = "";
            if (concept.levels) {
              if (Array.isArray(concept.levels)) grandma = concept.levels[0] || "";
              else grandma = concept.levels.grandma || concept.levels.child || "";
            }
            let analogy = "";
            if (concept.analogies) {
              if (Array.isArray(concept.analogies)) analogy = concept.analogies[0] || "";
              else analogy = concept.analogies.grandma || concept.analogies.child || "";
            }
            if (!analogy && concept.analogy) analogy = concept.analogy;
            if (eli5Box) {
              // Toggle off
              eli5Box.remove();
              btn.textContent = "🧒 כמו לבן 5";
            } else if (expEl) {
              const overlay = document.createElement("div");
              overlay.className = "eli5-overlay";
              overlay.innerHTML = `
                <div class="eli5-head">🧒 כמו שמסבירים לילד בן 5:</div>
                <div class="eli5-body">${esc(grandma || "אין הסבר ברמת סבתא למושג זה.")}</div>
                ${analogy ? `<div class="eli5-analogy"><strong>🌍 אנלוגיה:</strong> ${esc(typeof analogy === "string" ? analogy : (analogy.text || ""))}</div>` : ""}`;
              expEl.parentNode.insertBefore(overlay, expEl.nextSibling);
              btn.textContent = "✕ הסתר ELI5";
            }
          } else if (action === "pocket-toggle") {
            // Pocket Concept Card: toggle save
            const key = btn.dataset.pocketKey;
            if (key && typeof window.pocketToggle === "function") {
              window.pocketToggle(key);
              btn.textContent = btn.classList.contains("is-pocketed")
                ? "📌 שמור לכיס"
                : "✅ נשמר לכיס";
              setTimeout(() => { if (btn.classList.contains("is-pocketed")) btn.textContent = "📌 בכיס — לחץ להסיר"; else btn.textContent = "📌 שמור לכיס"; }, 1200);
            }
          } else if (action === "set-scenario") {
            updateScenarioDisplay(btn.dataset.scenario);
          } else if (action === "set-pathway") {
            setPathway(btn.dataset.pathway);
          } else if (action === "metaphor-prev") {
            updateMetaphorCarousel(k, -1);
          } else if (action === "metaphor-next") {
            updateMetaphorCarousel(k, 1);
          } else if (action === "wif-pick") {
            // Sprint 3 — What-If Simulator: switch knob option
            const wif = concept.whatIf;
            if (!wif) return;
            const idx = parseInt(btn.dataset.wifIdx, 10);
            const opt = wif.knob.options[idx];
            if (!opt) return;
            const cn = concept.conceptName;
            const codeEl = document.querySelector(`[data-wif-code="${cssEscape(cn)}"] code`);
            const outEl = document.querySelector(`[data-wif-outcome="${cssEscape(cn)}"]`);
            if (codeEl) codeEl.textContent = (wif.codeTemplate || "").replace(/\{\{knob\}\}/g, opt.insert || "");
            if (outEl) outEl.textContent = opt.outcome || "";
            // Toggle active state on knob buttons
            btn.parentElement?.querySelectorAll(".wif-knob-btn").forEach((b) => b.classList.toggle("is-active", b === btn));
          } else if (action === "anim-next" || action === "anim-prev" || action === "anim-auto" || action === "anim-reset") {
            // Sprint 2 — Mental Model Animator controls
            if (!concept.animation) return;
            const total = concept.animation.frames.length;
            const cn = concept.conceptName;
            if (!animState.has(cn)) animState.set(cn, { idx: 0, autoTimer: null });
            const s = animState.get(cn);
            if (action === "anim-next") {
              stopAnimAuto(cn);
              showAnimatorFrame(concept, Math.min(s.idx + 1, total - 1));
            } else if (action === "anim-prev") {
              stopAnimAuto(cn);
              showAnimatorFrame(concept, Math.max(s.idx - 1, 0));
            } else if (action === "anim-reset") {
              stopAnimAuto(cn);
              showAnimatorFrame(concept, 0);
            } else if (action === "anim-auto") {
              if (s.autoTimer) {
                stopAnimAuto(cn);
                btn.textContent = "⏯ הפעל אוטו";
              } else {
                btn.textContent = "⏸ עצור";
                s.autoTimer = setInterval(() => {
                  if (s.idx >= total - 1) {
                    stopAnimAuto(cn);
                    btn.textContent = "⏯ הפעל אוטו";
                    return;
                  }
                  showAnimatorFrame(concept, s.idx + 1);
                }, 2500);
              }
            }
          } else if (action === "video-next" || action === "video-prev" || action === "video-play" || action === "video-reset" || action === "video-jump") {
            // AUDIT-FIX-13 — Animated Concept Clip controls
            if (!concept.conceptVideo) return;
            const scenes = concept.conceptVideo.scenes || [];
            if (!scenes.length) return;
            const cn = concept.conceptName;
            const s = ensureConceptVideoState(cn);
            if (action === "video-next") {
              stopConceptVideoAuto(cn);
              showConceptVideoScene(concept, Math.min(s.idx + 1, scenes.length - 1));
            } else if (action === "video-prev") {
              stopConceptVideoAuto(cn);
              showConceptVideoScene(concept, Math.max(s.idx - 1, 0));
            } else if (action === "video-reset") {
              stopConceptVideoAuto(cn);
              showConceptVideoScene(concept, 0);
            } else if (action === "video-jump") {
              stopConceptVideoAuto(cn);
              const nextIdx = parseInt(btn.dataset.videoIdx, 10);
              showConceptVideoScene(concept, Number.isFinite(nextIdx) ? nextIdx : 0);
            } else if (action === "video-play") {
              if (s.autoTimer) {
                stopConceptVideoAuto(cn);
              } else {
                setConceptVideoPlayLabel(cn, true);
                s.autoTimer = setInterval(() => {
                  if (s.idx >= scenes.length - 1) {
                    stopConceptVideoAuto(cn);
                    return;
                  }
                  showConceptVideoScene(concept, s.idx + 1);
                }, 1800);
              }
            }
          } else if (action === "mb-check" || action === "mb-reset" || action === "mb-show-ref" || action === "mb-show-hint") {
            // P1.4.4 — Mini Build actions
            const buildId = btn.dataset.mbId;
            const list = concept.miniBuilds || [];
            const build = list.find((b) => b.id === buildId);
            if (!build) return;
            const cardEl = btn.closest(".mini-build-card");
            const editor = cardEl?.querySelector(`textarea[data-mb-id="${cssEscape(buildId)}"]`);
            const testsBox = cardEl?.querySelector(`[data-mb-tests="${cssEscape(buildId)}"]`);
            const refBox = cardEl?.querySelector(`[data-mb-ref="${cssEscape(buildId)}"]`);
            const hintBox = cardEl?.querySelector(`[data-mb-hint="${cssEscape(buildId)}"]`);
            if (!editor) return;

            if (action === "mb-reset") {
              editor.value = build.starter || "";
              if (testsBox) testsBox.hidden = true;
              if (refBox) refBox.hidden = true;
              return;
            }
            if (action === "mb-show-ref") {
              if (refBox) refBox.hidden = !refBox.hidden;
              return;
            }
            if (action === "mb-show-hint") {
              if (hintBox) hintBox.hidden = !hintBox.hidden;
              return;
            }
            // action === "mb-check"
            const code = editor.value || "";
            if (testsBox) testsBox.hidden = false;
            let allPass = true;
            (build.tests || []).forEach((t, i) => {
              const testEl = testsBox?.querySelector(`[data-mb-test-idx="${i}"]`);
              if (!testEl) return;
              let pass = false;
              try {
                const re = new RegExp(t.regex, t.flags || "");
                const matched = re.test(code);
                pass = t.mustNotMatch ? !matched : matched;
              } catch (_) { pass = false; }
              testEl.querySelector(".mb-test-mark").textContent = pass ? "✅" : "❌";
              testEl.classList.toggle("mb-test-pass", pass);
              testEl.classList.toggle("mb-test-fail", !pass);
              if (!pass) allPass = false;
            });
            // Status banner
            let banner = cardEl.querySelector(".mb-status");
            if (!banner) {
              banner = document.createElement("div");
              banner.className = "mb-status";
              testsBox.parentNode.insertBefore(banner, testsBox);
            }
            const total = (build.tests || []).length;
            const passed = (build.tests || []).filter((t, i) => testsBox.querySelector(`[data-mb-test-idx="${i}"].mb-test-pass`)).length;
            banner.classList.toggle("mb-status-pass", allPass);
            banner.classList.toggle("mb-status-fail", !allPass);
            banner.textContent = allPass
              ? `🏆 כל ${total} ה-tests עברו! פתרון מצוין.`
              : `📊 עברו ${passed} מתוך ${total} tests. תקן את השאר ולחץ "בדוק" שוב.`;
            // If all pass, auto-show explanation
            if (allPass && refBox) refBox.hidden = false;
          } else if (action === "mark-v") {
            // Confirm shortcut, then mark and re-render
            if (confirm(`לסמן את "${concept.conceptName}" כמושג ידוע? המאמן לא יציג אותו יותר.`)) {
              markAsKnown(lesson.id, concept.conceptName);
              refreshConceptCard(concept.conceptName); // P1.1.2 — per-card
            }
          } else if (action === "report-weak") {
            reportWeak(lesson.id, concept.conceptName);
            // Open the extras panel automatically + per-card refresh to show new badge/extras
            refreshConceptCard(concept.conceptName); // P1.1.2
            setTimeout(() => {
              const newCard = document.querySelector(
                `.concept-card.adaptive[data-concept="${cssEscape(concept.conceptName)}"]`
              );
              const ext = newCard?.querySelector(".extras-panel");
              if (ext) {
                ext.setAttribute("open", "");
                ext.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 100);
          } else if (action === "quiz") {
            startConceptInlineQuiz(card, lesson, concept);
          } else if (action === "audio-read") {
            // P2.S2.3 — Speak the explanation in Hebrew via Web Speech API
            const text = btn.dataset.text || "";
            if (!text || typeof window.speechSynthesis === "undefined") return;
            // Cancel any current speech first
            window.speechSynthesis.cancel();
            const utter = new window.SpeechSynthesisUtterance(text);
            utter.lang = "he-IL";
            utter.rate = 0.95;
            utter.pitch = 1.0;
            // Try to pick a Hebrew voice if available
            const voices = window.speechSynthesis.getVoices();
            const heVoice = voices.find((v) => v.lang && v.lang.startsWith("he"));
            if (heVoice) utter.voice = heVoice;
            const wasReading = btn.classList.contains("audio-reading");
            if (wasReading) {
              btn.classList.remove("audio-reading");
              btn.textContent = "🎤 הקרא בקול";
              return;
            }
            btn.classList.add("audio-reading");
            btn.textContent = "⏹️ עצור";
            utter.onend = () => {
              btn.classList.remove("audio-reading");
              btn.textContent = "🎤 הקרא בקול";
            };
            utter.onerror = () => {
              btn.classList.remove("audio-reading");
              btn.textContent = "🎤 הקרא בקול";
            };
            window.speechSynthesis.speak(utter);
          }
        });
      });
    });
  }

  // ========= Inline mini-quiz inside the lesson concept card =========
  // Flow: pick an MC question (from bank if exists, else auto-generate).
  // If correct → applyAnswer mc=true; if concept needs fill, follow up with one fill question.
  // Pass both → level advances; render refreshes to show new level.
  function startConceptInlineQuiz(card, lesson, concept, stage) {
    const sc = getScore(lesson.id, concept.conceptName);
    if (!stage) {
      // Auto-detect: if user passed MC at this level but not Fill, jump to fill
      if (sc.level < 7 && sc.passedMC && needsCodeFill(concept) && !sc.passedFill) {
        stage = "fill";
      } else {
        stage = "mc";
      }
    }
    const slot = card.querySelector(".concept-quiz-slot");
    if (!slot) return;

    if (stage === "mc") {
      const q = pickMCQuestionForConcept(lesson, concept);
      if (!q) {
        slot.innerHTML = `<div class="concept-quiz-empty">לא נמצאה שאלה זמינה למושג זה.</div>`;
        return;
      }
      slot.innerHTML = `
        <div class="concept-inline-quiz" data-stage="mc">
          <div class="ciq-head">🅰️ שאלה אמריקנית</div>
          <div class="question-learning-layout inline">
            <div class="question-answer-area">
              <div class="ciq-question">${esc(q.question).replace(/\n/g, "<br>")}</div>
              ${q.codeBlock ? `<div class="code-box"><pre><code>${esc(q.codeBlock)}</code></pre></div>` : ""}
              <div class="ciq-options">
                ${q.options
                  .map(
                    (opt, i) =>
                      `<button class="ciq-option" data-i="${i}">${esc(opt)}</button>`,
                  )
                  .join("")}
              </div>
            </div>
            ${renderQuestionPrereqPanel({ question: q, lesson, concept, mode: "inline" })}
          </div>
          <div class="ciq-feedback"></div>
        </div>`;
      wireQuestionPrerequisiteNavigation(slot);

      slot.querySelectorAll(".ciq-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          const sel = parseInt(btn.dataset.i, 10);
          const correct = sel === q.correctIndex;
          slot.querySelectorAll(".ciq-option").forEach((o) => {
            o.classList.add("disabled");
            const i = parseInt(o.dataset.i, 10);
            if (i === q.correctIndex) o.classList.add("correct");
            else if (i === sel) o.classList.add("wrong");
          });
          handleConceptQuizAnswer(card, lesson, concept, "mc", correct, q, {
            selectedIdx: sel,
            mode: "inline",
          });
        });
      });
    } else if (stage === "fill") {
      const fill = makeCodeFill(concept);
      if (!fill) {
        // No code-fill possible; mark as advanced via mc only
        const result = applyAnswer(lesson.id, concept.conceptName, concept, "fill", true);
        slot.innerHTML = renderQuizResultBlock(true, "fill", result, "אין דוגמת קוד למושג זה — קודמת אוטומטית.");
        renderContent();
        return;
      }
      slot.innerHTML = `
        <div class="concept-inline-quiz" data-stage="fill">
          <div class="ciq-head">✍️ עכשיו השלם את הקוד</div>
          <div class="question-learning-layout inline">
            <div class="question-answer-area">
              <div class="ciq-hint">${esc(`אורך התשובה: ${fill.answer.length} תווים. אות ראשונה: "${fill.answer[0]}".`)}</div>
              <div class="code-box"><pre><code>${esc(fill.blanked).replace(/____/g, '<span class="tq-code-blank">____</span>')}</code></pre></div>
              <div class="ciq-fill-row">
                <input type="text" class="ciq-fill-input" placeholder="הקלד את הטוקן החסר..." dir="ltr" autocomplete="off" spellcheck="false" />
                <button class="ciq-submit primary">✅ בדוק</button>
              </div>
            </div>
            ${renderQuestionPrereqPanel({
              question: {
                question: `השלם את הטוקן החסר בקוד של ${concept.conceptName}`,
                code: fill.blanked,
                conceptKey: conceptKey(lesson.id, concept.conceptName),
              },
              lesson,
              concept,
              mode: "inline",
            })}
          </div>
          <div class="ciq-feedback"></div>
        </div>`;
      wireQuestionPrerequisiteNavigation(slot);

      const input = slot.querySelector(".ciq-fill-input");
      const submitBtn = slot.querySelector(".ciq-submit");
      const submit = () => {
        const userAns = (input.value || "").trim();
        if (!userAns) return;
        const correct =
          userAns.toLowerCase() === (fill.answer || "").toLowerCase();
        input.disabled = true;
        submitBtn.disabled = true;
        input.classList.add(correct ? "correct" : "wrong");
        handleConceptQuizAnswer(card, lesson, concept, "fill", correct, {
          answer: fill.answer,
          question: `השלם את הטוקן החסר בקוד של ${concept.conceptName}`,
          code: fill.blanked,
          conceptKey: conceptKey(lesson.id, concept.conceptName),
        }, {
          answer: userAns,
          mode: "inline",
        });
      };
      submitBtn.addEventListener("click", submit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          submit();
        }
      });
      input.focus();
    }
  }

  function pickMCQuestionForConcept(lesson, concept) {
    const sc = getScore(lesson.id, concept.conceptName);
    const bank = bankByConcept(lesson.id, concept.conceptName);
    if (bank.mc.length > 0) {
      // Preference order:
      // 1. Curated, same level
      // 2. Curated, any level
      // 3. Seeded, same level
      // 4. Any seeded
      const curatedSame = bank.mc.filter((q) => !q._seeded && q.level === sc.level);
      if (curatedSame.length) return curatedSame[window.RNG.int(curatedSame.length)];
      const curatedAny = bank.mc.filter((q) => !q._seeded);
      if (curatedAny.length) return curatedAny[window.RNG.int(curatedAny.length)];
      const seededSame = bank.mc.filter((q) => q.level === sc.level);
      if (seededSame.length) return seededSame[window.RNG.int(seededSame.length)];
      return bank.mc[window.RNG.int(bank.mc.length)];
    }
    const auto = buildQuestion({ lesson, concept });
    if (auto && auto.kind === "mc") return auto;
    return null;
  }

  function handleConceptQuizAnswer(card, lesson, concept, kind, correct, qInfo, meta = {}) {
    const levelBefore = getScore(lesson.id, concept.conceptName).level;
    const questionForFeedback = {
      ...(qInfo || {}),
      conceptKey: (qInfo && qInfo.conceptKey) || conceptKey(lesson.id, concept.conceptName),
      question: (qInfo && (qInfo.question || qInfo.prompt || qInfo.title)) || `שאלה על ${concept.conceptName}`,
    };
    const result = applyAnswer(
      lesson.id,
      concept.conceptName,
      concept,
      kind,
      correct,
      {
        question: questionForFeedback,
        selectedIdx: meta.selectedIdx,
        answer: meta.answer || "",
        mode: meta.mode || "inline",
      },
    );

    // Build feedback message
    let msg = "";
    if (correct) {
      if (result.advanced) {
        const nl = LEVEL_INFO[result.newLevel];
        msg =
          result.newLevel === 7
            ? `🏆 כל הכבוד! הגעת לרמת מאסטר במושג זה!`
            : `⬆️ עלית מרמה ${levelBefore} לרמה ${result.newLevel} (${nl.icon} ${nl.label})!`;
      } else if (kind === "mc") {
        msg = needsCodeFill(concept)
          ? `נכון! ✅ עכשיו השלם את הקוד למטה כדי לקדם רמה.`
          : `נקודה ל-MC. בקרוב קודמת רמה.`;
      } else {
        msg = `נקודה להשלמת קוד. ענה גם על השאלה האמריקנית כדי לקדם רמה.`;
      }
    } else {
      const wrongHint =
        kind === "fill" && qInfo && qInfo.answer
          ? ` התשובה הנכונה: <code>${esc(qInfo.answer)}</code>.`
          : "";
      msg = `הרמה לא יורדת — נסה רמה פשוטה יותר או נסה שוב.${wrongHint}`;
    }

    // Inject feedback into the relevant body's .ciq-feedback div
    const bodyId = kind === "mc" ? "cs-mc-body" : "cs-fill-body";
    const body = document.getElementById(bodyId);
    const fb = body?.querySelector(".ciq-feedback");
    if (fb) {
      fb.innerHTML = `
        <div class="ciq-fb ${correct ? "correct" : "wrong"}">
          <strong>${correct ? "✅ נכון!" : "❌ לא מדויק."}</strong> ${msg}
          ${!correct ? renderMistakeAgentFeedback(result.mistake) : ""}
        </div>
        ${
          !correct
            ? `<div class="ciq-actions">
                 <button class="concept-btn simplify" data-action="simplify-after-wrong">🤔 הצג רמה פשוטה יותר</button>
                 <button class="concept-btn ghost" data-action="retry">🔁 נסה שוב</button>
               </div>`
            : ""
        }`;

      // Wire post-wrong actions
      fb.querySelector('[data-action="simplify-after-wrong"]')?.addEventListener(
        "click",
        () => {
          const k = conceptKey(lesson.id, concept.conceptName);
          const cur =
            conceptViewOverride[k] ||
            Math.min(6, Math.max(1, getScore(lesson.id, concept.conceptName).level));
          conceptViewOverride[k] = Math.max(1, cur - 1);
          renderContent();
        },
      );
      fb.querySelector('[data-action="retry"]')?.addEventListener("click", () => {
        // Re-render the auto-quiz so a fresh question loads
        autoRenderConceptQuiz(card, lesson, concept);
      });
    }

    // Auto-progression: refresh after a short pause
    if (result.advanced) {
      setTimeout(() => renderContent(), 1100); // re-render whole lesson menu (level changed)
    } else if (correct) {
      // MC passed but Fill remains (or vice versa) — refresh stages so "✅ done" shows
      setTimeout(() => autoRenderConceptQuiz(card, lesson, concept), 1000);
    }
  }

  function renderQuizResultBlock(correct, kind, result, msg) {
    return `<div class="ciq-fb ${correct ? "correct" : "wrong"}">
      <strong>${correct ? "✅" : "❌"}</strong> ${msg}
    </div>`;
  }

  function cssEscape(s) {
    return String(s).replace(/(["'\\])/g, "\\$1");
  }

  // =========== QUIZ ENGINE ===========
  function renderQuiz() {
    const lesson = window.LESSONS_DATA.find((l) => l.id === currentLessonId);
    if (!lesson || !lesson.quiz || lesson.quiz.length === 0) {
      quizSection.style.display = "none";
      return;
    }

    quizSection.style.display = "block";
    quizSubmitBtn.style.display = "inline-flex";
    quizResetBtn.style.display = "none";
    quizResults.style.display = "none";

    quizBody.innerHTML = lesson.quiz
      .map(
        (q, qIndex) => `
      <div class="quiz-question" data-index="${qIndex}" data-correct="${q.correct}">
        <div class="question-learning-layout">
          <div class="question-answer-area">
            <div class="quiz-question-text"><span class="q-num">שאלה ${qIndex + 1}:</span> ${esc(q.question)}</div>
            <div class="quiz-options">
              ${q.options
                .map(
                  (opt, oIndex) => `
                <label class="quiz-option" data-option="${oIndex}">
                  <input type="radio" name="q${qIndex}" value="${oIndex}" />
                  <span>${esc(opt)}</span>
                </label>
              `,
                )
                .join("")}
            </div>
            <div class="quiz-explanation-text">💡 ${esc(q.explanation || "")}</div>
          </div>
          ${renderQuestionPrereqPanel({ question: q, lesson, questionIndex: qIndex, mode: "quiz" })}
        </div>
      </div>
    `,
      )
      .join("");
    wireQuestionPrerequisiteNavigation(quizBody);

    // Option click handler
    quizBody.querySelectorAll(".quiz-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        const radio = opt.querySelector('input[type="radio"]');
        radio.checked = true;
        opt
          .closest(".quiz-options")
          .querySelectorAll(".quiz-option")
          .forEach((o) => o.classList.remove("selected"));
        opt.classList.add("selected");
      });
    });
  }

  // Quiz Submit
  quizSubmitBtn.addEventListener("click", () => {
    const questions = quizBody.querySelectorAll(".quiz-question");
    const lesson = window.LESSONS_DATA.find((l) => l.id === currentLessonId);
    let correct = 0;
    let total = questions.length;
    const wrongAnswers = [];

    const allAnswered = Array.from(questions).every((qEl) =>
      qEl.querySelector('input[type="radio"]:checked'),
    );

    if (!allAnswered) {
      alert("אנא ענו על כל השאלות לפני הבדיקה!");
      return;
    }

    questions.forEach((qEl, qIndex) => {
      const selected = qEl.querySelector('input[type="radio"]:checked');
      const quizItem = lesson?.quiz?.[qIndex];

      const correctIndex = parseInt(qEl.dataset.correct);
      const selectedIndex = parseInt(selected.value);

      qEl.classList.add("answered");

      if (selectedIndex === correctIndex) {
        correct++;
        qEl.classList.add("correct");
        qEl
          .querySelector(`.quiz-option[data-option="${selectedIndex}"]`)
          .classList.add("correct-answer");
      } else {
        qEl.classList.add("wrong");
        qEl
          .querySelector(`.quiz-option[data-option="${selectedIndex}"]`)
          .classList.add("wrong-answer");
        qEl
          .querySelector(`.quiz-option[data-option="${correctIndex}"]`)
          .classList.add("correct-answer");
        wrongAnswers.push({
          index: qIndex + 1,
          question: quizItem?.question || qEl.querySelector(".quiz-question-text")?.textContent || "",
          selectedAnswer: quizItem?.options?.[selectedIndex] || selected.value,
          correctAnswer: quizItem?.options?.[correctIndex] || "",
          explanation: quizItem?.explanation || "",
        });
      }

      // Disable further clicks
      qEl.querySelectorAll("input").forEach((r) => (r.disabled = true));
      qEl
        .querySelectorAll(".quiz-option")
        .forEach((o) => (o.style.cursor = "default"));
    });

    const pct = Math.round((correct / total) * 100);
    quizScore.textContent = `${correct} / ${total} — ${pct}%`;

    if (pct === 100) {
      quizScore.className = "quiz-score perfect";
      quizFeedback.textContent = "🏆 מושלם! ענית נכון על כל השאלות! ציון 100!";
    } else if (pct >= 70) {
      quizScore.className = "quiz-score good";
      quizFeedback.textContent =
        "👏 עבודה טובה! עברו על ההסברים של השאלות שפספסתם.";
    } else {
      quizScore.className = "quiz-score needs-work";
      quizFeedback.textContent =
        "💪 לא נורא! חזרו על החומר ונסו שוב. ההצלחה בדרך!";
    }

    quizResults.style.display = "block";
    quizSubmitBtn.style.display = "none";
    quizResetBtn.style.display = "inline-flex";

    // Mark completed
    if (pct === 100 && currentLessonId) {
      quizCompleted[currentLessonId] = true;
      const btn = document.querySelector(
        `.lesson-nav-btn[data-id="${currentLessonId}"]`,
      );
      if (btn) btn.classList.add("completed");
      updateProgress();
    }

    window.setTimeout(() => {
      openLessonWrapUp({
        lesson,
        correct,
        total,
        pct,
        wrongAnswers,
      });
    }, 450);
  });

  // Quiz Reset
  quizResetBtn.addEventListener("click", () => {
    renderQuiz();
  });

  // =========== LESSON WRAP-UP ===========
  const LESSON_WRAP_KEY = "lumenportal:lessonWrapups:v1";
  let lessonWrapPayload = null;
  let lessonWrapStartedAt = 0;
  let lessonWrapTimerId = null;
  let lessonWrapConfidence = null;

  function loadLessonWrapUps() {
    try {
      return JSON.parse(localStorage.getItem(LESSON_WRAP_KEY) || "[]");
    } catch (_) {
      return [];
    }
  }

  function saveLessonWrapUpRecord(record) {
    const arr = loadLessonWrapUps();
    arr.unshift(record);
    if (arr.length > 100) arr.length = 100;
    try { localStorage.setItem(LESSON_WRAP_KEY, JSON.stringify(arr)); } catch (_) {}
  }

  function lessonWrapGrade(pct) {
    if (pct >= 90) return "A";
    if (pct >= 80) return "B";
    if (pct >= 70) return "C";
    if (pct >= 60) return "D";
    return "F";
  }

  function lessonWeakConcepts(lesson) {
    if (!lesson) return [];
    return (lesson.concepts || [])
      .map((concept) => {
        const sc = getScore(lesson.id, concept.conceptName);
        const attempts = sc.attempts || 0;
        const accuracy = attempts > 0
          ? Math.round(((sc.correct || 0) / attempts) * 100)
          : null;
        const weakReports = sc.weakReports || 0;
        const hasSignal = attempts > 0 || weakReports > 0;
        const weak =
          weakReports > 0 ||
          (attempts >= 2 && accuracy < 60) ||
          (attempts > 0 && (sc.level || 1) <= 2);
        if (!hasSignal || !weak) return null;
        return {
          name: concept.conceptName,
          level: sc.level || 1,
          attempts,
          accuracy,
          weakReports,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.weakReports !== b.weakReports) return b.weakReports - a.weakReports;
        if ((a.accuracy ?? 101) !== (b.accuracy ?? 101)) {
          return (a.accuracy ?? 101) - (b.accuracy ?? 101);
        }
        if (a.level !== b.level) return a.level - b.level;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 5);
  }

  function renderLessonWrapBody(payload) {
    const body = document.getElementById("lesson-wrap-body");
    const meta = document.getElementById("lesson-wrap-meta");
    if (!body || !payload) return;

    if (meta) {
      meta.textContent = `${payload.lesson?.title || "שיעור"} · ${payload.correct}/${payload.total} נכונות`;
    }

    const weakConcepts = lessonWeakConcepts(payload.lesson);
    const wrongList = payload.wrongAnswers.length
      ? `<ul class="lw-list">${payload.wrongAnswers.map((item) => `
          <li>
            <strong>שאלה ${item.index}:</strong> ${esc(item.question)}
            <br />התשובה הנכונה: ${esc(item.correctAnswer)}
          </li>`).join("")}</ul>`
      : `<p class="lw-empty">לא היו טעויות בבוחן. שמור לעצמך מה עבד טוב כדי לשחזר את זה בהמשך.</p>`;

    const weakList = weakConcepts.length
      ? `<ul class="lw-list">${weakConcepts.map((item) => `
          <li>
            <strong>${esc(item.name)}</strong> · רמה ${item.level}/7${item.accuracy == null ? "" : ` · דיוק ${item.accuracy}%`}${item.weakReports ? ` · ${item.weakReports} דיווחי חולשה` : ""}
          </li>`).join("")}</ul>`
      : `<p class="lw-empty">אין כרגע מושגים חלשים מסומנים בשיעור הזה לפי ה-progress המקומי.</p>`;

    body.innerHTML = `
      <div class="lw-score-grid">
        <div class="lw-stat"><span>ציון בוחן</span><strong>${payload.pct}%</strong></div>
        <div class="lw-stat"><span>דרגה</span><strong>${lessonWrapGrade(payload.pct)}</strong></div>
        <div class="lw-stat"><span>טעויות</span><strong>${payload.wrongAnswers.length}</strong></div>
      </div>
      <div class="lw-section">
        <h4>שאלות לחיזוק</h4>
        ${wrongList}
      </div>
      <div class="lw-section">
        <h4>מושגים חלשים לפי התקדמות קיימת</h4>
        ${weakList}
      </div>`;
  }

  function updateLessonWrapTimer() {
    const timer = document.getElementById("lesson-wrap-timer");
    const fill = document.getElementById("lesson-wrap-timer-fill");
    const elapsed = lessonWrapStartedAt ? Math.floor((Date.now() - lessonWrapStartedAt) / 1000) : 0;
    const remaining = Math.max(0, 60 - elapsed);
    if (timer) timer.textContent = String(remaining);
    if (fill) fill.style.width = `${Math.max(0, Math.round((remaining / 60) * 100))}%`;
    if (remaining === 0 && lessonWrapTimerId) {
      window.clearInterval(lessonWrapTimerId);
      lessonWrapTimerId = null;
    }
  }

  function updateLessonWrapCalibration() {
    const out = document.getElementById("lesson-wrap-calibration");
    if (!out || !lessonWrapPayload) return;
    if (lessonWrapConfidence == null) {
      out.textContent = "בחר מספר כדי לשמור כיול ביטחון מול הציון.";
      return;
    }
    const confidencePct = lessonWrapConfidence * 20;
    const gap = confidencePct - lessonWrapPayload.pct;
    const label =
      Math.abs(gap) <= 10
        ? "כיול קרוב"
        : gap > 10
          ? "הערכת את עצמך גבוה מהתוצאה"
          : "הערכת את עצמך נמוך מהתוצאה";
    out.textContent = `${label}: ביטחון ${confidencePct}% מול ציון ${lessonWrapPayload.pct}%.`;
  }

  function closeLessonWrapUp() {
    const overlay = document.getElementById("lesson-wrap-overlay");
    if (overlay) overlay.style.display = "none";
    if (lessonWrapTimerId) {
      window.clearInterval(lessonWrapTimerId);
      lessonWrapTimerId = null;
    }
    lessonWrapPayload = null;
    lessonWrapStartedAt = 0;
    lessonWrapConfidence = null;
  }

  function openLessonWrapUp(payload) {
    const overlay = document.getElementById("lesson-wrap-overlay");
    if (!overlay || !payload?.lesson) return;
    lessonWrapPayload = payload;
    lessonWrapStartedAt = Date.now();
    lessonWrapConfidence = null;
    const noteEl = document.getElementById("lesson-wrap-note");
    if (noteEl) noteEl.value = "";
    document.querySelectorAll(".lw-confidence-btn").forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });
    renderLessonWrapBody(payload);
    updateLessonWrapCalibration();
    updateLessonWrapTimer();
    if (lessonWrapTimerId) window.clearInterval(lessonWrapTimerId);
    lessonWrapTimerId = window.setInterval(updateLessonWrapTimer, 1000);
    overlay.style.display = "";
  }

  function saveCurrentLessonWrapUp(nextAction = "") {
    if (!lessonWrapPayload) return;
    if (lessonWrapConfidence == null) {
      alert("בחר רמת ביטחון 1-5 כדי לשמור כיול.");
      return;
    }

    const weakConcepts = lessonWeakConcepts(lessonWrapPayload.lesson);
    const elapsedSeconds = lessonWrapStartedAt
      ? Math.max(0, Math.round((Date.now() - lessonWrapStartedAt) / 1000))
      : 0;
    const note = document.getElementById("lesson-wrap-note")?.value.trim() || "";
    const confidencePct = lessonWrapConfidence * 20;
    const record = {
      date: new Date().toISOString(),
      lessonId: lessonWrapPayload.lesson.id,
      lessonTitle: lessonWrapPayload.lesson.title,
      scorePct: lessonWrapPayload.pct,
      correct: lessonWrapPayload.correct,
      total: lessonWrapPayload.total,
      grade: lessonWrapGrade(lessonWrapPayload.pct),
      confidence: lessonWrapConfidence,
      confidencePct,
      calibrationGap: confidencePct - lessonWrapPayload.pct,
      elapsedSeconds,
      note,
      wrongAnswers: lessonWrapPayload.wrongAnswers.map((item) => ({
        index: item.index,
        question: item.question,
        selectedAnswer: item.selectedAnswer,
        correctAnswer: item.correctAnswer,
      })),
      weakConcepts,
    };

    saveLessonWrapUpRecord(record);
    recordLearningEvidence("lesson_wrap", {
      source: "lesson-wrap",
      lessonId: record.lessonId,
      topic: getTopicForLesson(record.lessonId).topic,
      subtopic: getTopicForLesson(record.lessonId).subtopic,
      score: record.scorePct,
      durationSec: record.elapsedSeconds,
      rating: String(record.confidence),
      correct: record.scorePct >= 70,
    });
    awardXP(10);
    tickStudyStreak();
    showAchievementToast({ title: "⏱️ סיכום שיעור", desc: "+10 XP על סיכום וכיול ביטחון" });
    closeLessonWrapUp();

    if (nextAction === "flashcards") {
      openFlashcards({ filter: "weak", query: "" });
    } else if (nextAction === "map") {
      openKnowledgeMap();
    }
  }

  document.getElementById("lesson-wrap-close")?.addEventListener("click", closeLessonWrapUp);
  document.getElementById("lesson-wrap-overlay")?.addEventListener("click", (e) => {
    if (e.target?.id === "lesson-wrap-overlay") closeLessonWrapUp();
  });
  document.addEventListener("keydown", (e) => {
    const overlay = document.getElementById("lesson-wrap-overlay");
    if (e.key === "Escape" && overlay && overlay.style.display !== "none") {
      closeLessonWrapUp();
    }
  });
  document.querySelectorAll(".lw-confidence-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      lessonWrapConfidence = parseInt(btn.dataset.confidence || "0", 10) || null;
      document.querySelectorAll(".lw-confidence-btn").forEach((other) => {
        const active = other === btn;
        other.classList.toggle("active", active);
        other.setAttribute("aria-pressed", active ? "true" : "false");
      });
      updateLessonWrapCalibration();
    });
  });
  document.getElementById("lesson-wrap-save")?.addEventListener("click", () => saveCurrentLessonWrapUp());
  document.getElementById("lesson-wrap-flashcards")?.addEventListener("click", () => saveCurrentLessonWrapUp("flashcards"));
  document.getElementById("lesson-wrap-map")?.addEventListener("click", () => saveCurrentLessonWrapUp("map"));

  // =========== PROGRESS (level-based) ===========
  function updateProgress() {
    if (!window.LESSONS_DATA) return;
    const all = allConcepts();
    if (all.length === 0) return;

    let totalLevel = 0;
    let masters = 0;
    all.forEach(({ lesson, concept }) => {
      const sc = getScore(lesson.id, concept.conceptName);
      totalLevel += sc.level;
      if (sc.level >= 7) masters++;
    });
    const avgLevel = totalLevel / all.length;
    // Map [1, 7] → [0%, 100%]
    const pct = Math.max(0, Math.min(100, Math.round(((avgLevel - 1) / 6) * 100)));

    const progressBar = document.getElementById("global-progress");
    const progressText = document.getElementById("progress-text");
    if (progressBar) progressBar.style.width = pct + "%";
    if (progressText) {
      progressText.textContent =
        `${masters}/${all.length} מאסטר 🏆 · רמה ממוצעת ${avgLevel.toFixed(1)}/7 (${pct}%)`;
    }
  }

  // Hook progress update + SRS scheduling to score changes — wrap the original
  // applyAnswer so any call site (trainer, guide, lesson inline quiz) refreshes
  // the global progress bar AND advances the SRS interval/ease for the concept.
  const _origApplyAnswer = applyAnswer;
  applyAnswer = function (lessonId, conceptName, concept, kind, correct, meta = {}) {
    const r = _origApplyAnswer(lessonId, conceptName, concept, kind, correct, meta);
    try { updateProgress(); } catch (_) {}
    try {
      if (window.SRS && typeof window.SRS.update === "function") {
        const sc = ensureScore(lessonId, conceptName);
        window.SRS.update(sc.srsState, !!correct, getDifficulty(concept));
        saveScores();
      }
    } catch (_) {}
    return r;
  };

  // =========== UTILITIES ===========
  function esc(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // =========== BANK VERSIONING (Track A — A2) ===========
  // The bank declares its version + lastUpdate + changelog at the top of
  // data/questions_bank.js (preserved as window.QUESTIONS_BANK_VERSION etc.
  // because content-loader.js reshapes window.QUESTIONS_BANK).
  // Behaviour:
  //   1. Always console.log the active version on boot.
  //   2. If the user has a stored version that no longer matches AND they
  //      have any saved scores/proficiency, offer to refresh local progress.
  (function bankVersionCheck() {
    const version =
      (typeof window.QUESTIONS_BANK_VERSION === "string" && window.QUESTIONS_BANK_VERSION) ||
      (window.QUESTIONS_BANK && window.QUESTIONS_BANK._version) ||
      "unknown";
    const lastUpdate =
      (typeof window.QUESTIONS_BANK_LAST_UPDATE === "string" && window.QUESTIONS_BANK_LAST_UPDATE) ||
      (window.QUESTIONS_BANK && window.QUESTIONS_BANK._lastUpdate) ||
      "";
    console.log(
      `[LumenPortal] Bank v${version}` + (lastUpdate ? ` (${lastUpdate})` : ""),
    );

    const VERSION_KEY = "lumenportal:bankVersion:v1";
    let stored = null;
    try { stored = localStorage.getItem(VERSION_KEY); } catch (_) {}

    if (stored && stored !== version) {
      const hasProgress =
        Object.keys(scores).length > 0 || Object.keys(proficiency).length > 0;
      if (hasProgress) {
        const ok = confirm(
          `🔄 מאגר השאלות עודכן מגרסה ${stored} → ${version}.\n` +
            `האם לרענן את ההתקדמות המקומית? (זה יאפס טבלת ציונים ו-SRS)`,
        );
        if (ok) {
          scores = {};
          proficiency = {};
          saveScores();
          saveProficiency();
        }
      }
    }

    try { localStorage.setItem(VERSION_KEY, version); } catch (_) {}
  })();

  // =========== MASTERY STATES CSS (Track A — A5) ===========
  // Append a small style block (gray / blue / yellow / orange / green) so the
  // Knowledge Map can show the 5 buckets without touching style.css.
  (function injectMasteryStyles() {
    if (document.getElementById("track-a-mastery-styles")) return;
    const css = `
      .km-mastery-badge { display:inline-block; padding:2px 8px; border-radius:999px; font-size:0.78em; font-weight:700; margin-right:6px; }
      .km-mastery-new      { background:#e0e0e0; color:#444; }
      .km-mastery-learning { background:#cfe3ff; color:#0b3a82; }
      .km-mastery-review   { background:#fff3b5; color:#7a5b00; }
      .km-mastery-at-risk  { background:#ffd8a8; color:#7a3d00; }
      .km-mastery-mastered { background:#c8f5d0; color:#0e5a25; }
      .km-due-badge { display:inline-block; padding:2px 6px; border-radius:6px; background:#ffd8a8; color:#7a3d00; font-size:0.78em; font-weight:700; margin-right:6px; }
      .km-concept-row.is-due { box-shadow: inset 3px 0 0 0 #ff8c1a; }
    `;
    const style = document.createElement("style");
    style.id = "track-a-mastery-styles";
    style.textContent = css;
    document.head.appendChild(style);
  })();

  // Track A — A5: extend the existing #km-filter dropdown with mastery-state
  // options. Done programmatically so we don't touch index.html (Track D's
  // territory). Idempotent — guards against double-injection on reload.
  (function injectMasteryFilterOptions() {
    const sel = document.getElementById("km-filter");
    if (!sel || sel.dataset.trackAExtended === "1") return;
    const extra = [
      { value: "learning", label: "📘 בלימוד" },
      { value: "review", label: "📗 בחזרה" },
      { value: "at-risk", label: "⚠️ בסיכון" },
      { value: "due", label: "🔁 הגיע מועד חזרה" },
    ];
    extra.forEach((o) => {
      const opt = document.createElement("option");
      opt.value = o.value;
      opt.textContent = o.label;
      sel.appendChild(opt);
    });
    sel.dataset.trackAExtended = "1";
  })();

  // ===== W12 — Streaks, XP, Achievements, Reflection =====

  // --- Streak tracking ---
  const STREAK_KEY = "lumenportal:streak:v1";
  function getStreak() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STREAK_KEY) || '{"count":0,"lastDate":""}');
      const streakCore = window.LUMEN_CORE && window.LUMEN_CORE.streak;
      if (streakCore && typeof streakCore.normalizeStreak === "function") {
        return streakCore.normalizeStreak(parsed);
      }
      return {
        count: parsed.count || 0,
        lastDate: parsed.lastDate || "",
        freezeMonth: parsed.freezeMonth || "",
        lastFreezeDate: parsed.lastFreezeDate || "",
        lastFreezeCoveredDate: parsed.lastFreezeCoveredDate || "",
      };
    }
    catch { return { count: 0, lastDate: "", freezeMonth: "", lastFreezeDate: "", lastFreezeCoveredDate: "" }; }
  }
  function saveStreak(s) { try { localStorage.setItem(STREAK_KEY, JSON.stringify(s)); } catch {} }
  function tickStudyStreak() {
    const s = getStreak();
    const streakCore = window.LUMEN_CORE && window.LUMEN_CORE.streak;
    const next =
      streakCore && typeof streakCore.advanceStreak === "function"
        ? streakCore.advanceStreak(s)
        : (() => {
            const today = new Date().toISOString().slice(0, 10);
            if (s.lastDate === today) return { ...s, changed: false, usedFreeze: false };
            const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
            return {
              ...s,
              count: (s.lastDate === yesterday) ? s.count + 1 : 1,
              lastDate: today,
              changed: true,
              usedFreeze: false,
            };
          })();
    if (!next.changed) return;
    saveStreak(next);
    updateStreakWidget();
    if (next.usedFreeze) {
      showAchievementToast({
        title: "🧊 רצף נשמר",
        desc: `פספוס ${next.lastFreezeCoveredDate} כוסה. נשארת פעם אחת לחודש הבא.`,
      });
    }
  }
  function updateStreakWidget() {
    const s = getStreak();
    const el = document.getElementById("streak-widget");
    if (el) {
      const streakCore = window.LUMEN_CORE && window.LUMEN_CORE.streak;
      const freezeAvailable =
        streakCore && typeof streakCore.freezeAvailable === "function"
          ? streakCore.freezeAvailable(s)
          : false;
      el.textContent = `🔥 ${s.count}${s.count > 0 ? ` · 🧊 ${freezeAvailable ? "1/1" : "0/1"}` : ""}`;
      el.title = `רצף לימוד: ${s.count} ימים ברציפות · הקפאת רצף חודשית: ${freezeAvailable ? "זמינה" : "נוצלה"}`;
      el.classList.toggle("freeze-used", s.count > 0 && !freezeAvailable);
      el.style.display = s.count > 0 ? "" : "none";
    }
  }

  // --- XP ---
  const XP_KEY = "lumenportal:xp:v1";
  function getXP() { try { return parseInt(localStorage.getItem(XP_KEY) || "0", 10); } catch { return 0; } }
  function awardXP(amount) {
    const newXP = getXP() + amount;
    try { localStorage.setItem(XP_KEY, String(newXP)); } catch {}
    updateXPWidget(newXP);
  }
  function updateXPWidget(xp) {
    const el = document.getElementById("xp-widget");
    if (el) el.textContent = `⭐ ${xp} XP`;
  }

  // --- Achievements ---
  const ACH_KEY = "lumenportal:achievements:v1";
  const ACHIEVEMENTS = [
    { id: "first_answer",   title: "🎯 ראשית הדרך",   desc: "ענית על שאלה ראשונה",       check: (d) => d.sc.attempts >= 1 },
    { id: "ten_correct",    title: "🔟 עשרה נכונות",   desc: "ענית נכון 10 פעמים",        check: (d, all) => all.totalCorrect >= 10 },
    { id: "fifty_correct",  title: "5️⃣0️⃣ חמישים נכונות", desc: "ענית נכון 50 פעמים",      check: (d, all) => all.totalCorrect >= 50 },
    { id: "first_level",    title: "📈 עלייה בדרגה",   desc: "עלית רמה לראשונה",          check: (d) => d.advanced },
    { id: "level_5",        title: "🎓 מומחה",          desc: "הגעת לרמה 5 במושג כלשהו",   check: (d) => d.sc.level >= 5 },
    { id: "mastered",       title: "🏆 מאסטר",          desc: "שלטת במושג לחלוטין (רמה 7)", check: (d) => d.sc.level >= 7 },
    { id: "streak_3",       title: "🔥 שלושה ימים",     desc: "למדת 3 ימים ברציפות",       check: () => getStreak().count >= 3 },
    { id: "streak_7",       title: "🔥🔥 שבוע שלם",    desc: "למדת 7 ימים ברציפות",       check: () => getStreak().count >= 7 },
    { id: "streak_30",      title: "🔥🔥🔥 חודש מלא",  desc: "למדת 30 ימים ברציפות",      check: () => getStreak().count >= 30 },
    { id: "xp_100",         title: "⭐ 100 XP",          desc: "הרווחת 100 נקודות ניסיון",   check: () => getXP() >= 100 },
    { id: "xp_500",         title: "⭐⭐ 500 XP",        desc: "הרווחת 500 נקודות ניסיון",  check: () => getXP() >= 500 },
    { id: "xp_1000",        title: "⭐⭐⭐ 1000 XP",    desc: "הרווחת 1000 נקודות ניסיון", check: () => getXP() >= 1000 },
    { id: "bug_hunter",     title: "🐛 ציד באגים",      desc: "השלמת קווסט ראשון",         check: () => Object.values((() => { try { return JSON.parse(localStorage.getItem("lumenportal:bug_quests:v1") || "{}"); } catch { return {}; } })()).some((v) => v.completed) },
    { id: "pair_master",    title: "🎯 מאסטר התאמות",   desc: "השלמת משחק התאמות ראשון",   check: () => Object.values((() => { try { return JSON.parse(localStorage.getItem("lumenportal:pair_match:v1") || "{}"); } catch { return {}; } })()).some((v) => v.completed) },
    { id: "speed_5",        title: "⚡ מהיר",           desc: "ענית נכון 5 פעמים בשורה",   check: (d) => (d.sc.correctRunCount || 0) >= 5 },
    { id: "polyglot",       title: "🌍 רב-תרבותי",     desc: "למדת 3 שיעורים שונים",      check: (d, all) => all.lessonsStudied >= 3 },
    { id: "dedicated",      title: "💪 מסור",           desc: "ענית על 100 שאלות",         check: (d, all) => all.totalAttempts >= 100 },
    { id: "perfectionist",  title: "✨ פרפקציוניסט",    desc: "השגת דיוק 90%+ (מינ׳ 20 שאלות)", check: (d, all) => all.totalAttempts >= 20 && all.totalCorrect / all.totalAttempts >= 0.9 },
    { id: "reviews_25",     title: "🔁 25 חזרות",       desc: "צברת 25 ניסיונות למידה",    check: (d, all) => all.totalAttempts >= 25 },
    { id: "reviews_250",    title: "🔁 250 חזרות",      desc: "צברת 250 ניסיונות למידה",   check: (d, all) => all.totalAttempts >= 250 },
    { id: "first_flashcard", title: "🃏 כרטיס ראשון",   desc: "דירגת כרטיסיית SRS ראשונה", check: (d, all) => all.flashcardsReviewed >= 1 },
    { id: "flashcards_10",  title: "🃏 עשר כרטיסיות",   desc: "דירגת 10 כרטיסיות SRS",     check: (d, all) => all.flashcardsReviewed >= 10 },
    { id: "first_exam",     title: "📝 מבחן ראשון",     desc: "השלמת מבחן מדומה ראשון",    check: (d, all) => all.examCount >= 1 },
    { id: "exam_b",         title: "📈 ציון B",          desc: "השגת 80%+ במבחן מדומה",      check: (d, all) => all.bestExamScore >= 80 },
    { id: "reflection_first", title: "📅 רפלקציה ראשונה", desc: "כתבת רפלקציה ראשונה",     check: (d, all) => all.reflectionCount >= 1 },
    { id: "reflection_5",   title: "📅 חמש רפלקציות",    desc: "כתבת 5 רפלקציות",           check: (d, all) => all.reflectionCount >= 5 },
    { id: "weak_spotter",   title: "🆘 מזהה חולשה",      desc: "סימנת לפחות מושג אחד כחלש", check: (d, all) => all.weakConcepts >= 1 },
    { id: "comeback",       title: "↩️ קאמבק",           desc: "ענית נכון על מושג שסומן חלש", check: (d) => d.correct && (d.sc.weakReports || 0) > 0 },
    { id: "three_mastered", title: "🏆 שלישיית מאסטר",   desc: "הגעת למאסטר ב-3 מושגים",    check: (d, all) => all.masteredConcepts >= 3 },
    { id: "ten_mastered",   title: "🏆 עשר שליטות",      desc: "הגעת למאסטר ב-10 מושגים",   check: (d, all) => all.masteredConcepts >= 10 },
  ];

  function getUnlockedAchievements() {
    try { return JSON.parse(localStorage.getItem(ACH_KEY) || "[]"); }
    catch { return []; }
  }
  function saveUnlockedAchievements(arr) {
    try { localStorage.setItem(ACH_KEY, JSON.stringify(arr)); } catch {}
  }

  function getGlobalStats() {
    let totalCorrect = 0, totalAttempts = 0, masteredConcepts = 0, weakConcepts = 0, dueConcepts = 0;
    const lessons = new Set();
    Object.entries(scores || {}).forEach(([key, sc]) => {
      if (!sc) return;
      totalCorrect += sc.correct || 0;
      totalAttempts += sc.attempts || 0;
      if (sc.attempts > 0) lessons.add(key.split("::")[0]);
      if ((sc.level || 1) >= 7) masteredConcepts++;
      if ((sc.weakReports || 0) > 0) weakConcepts++;
      if (sc.attempts > 0 && isSrsDue(sc)) dueConcepts++;
    });
    let examHistory = [];
    let reflections = [];
    let flashcardStats = {};
    try { examHistory = JSON.parse(localStorage.getItem("lumenportal:examHistory:v1") || "[]"); } catch {}
    try { reflections = JSON.parse(localStorage.getItem("lumenportal:reflections:v1") || "[]"); } catch {}
    try { flashcardStats = JSON.parse(localStorage.getItem(FLASHCARDS_STATS_KEY) || "{}"); } catch {}
    const bestExamScore = examHistory.reduce(
      (best, record) => Math.max(best, record.score || 0),
      0,
    );
    return {
      totalCorrect,
      totalAttempts,
      lessonsStudied: lessons.size,
      masteredConcepts,
      weakConcepts,
      dueConcepts,
      examCount: examHistory.length,
      bestExamScore,
      reflectionCount: reflections.length,
      flashcardsReviewed: flashcardStats.total || 0,
    };
  }

  function checkAchievements(data) {
    const unlocked = new Set(getUnlockedAchievements());
    const all = getGlobalStats();
    const newly = [];
    ACHIEVEMENTS.forEach((ach) => {
      if (unlocked.has(ach.id)) return;
      try {
        if (ach.check(data, all)) { unlocked.add(ach.id); newly.push(ach); }
      } catch {}
    });
    if (newly.length) {
      saveUnlockedAchievements([...unlocked]);
      newly.forEach((ach) => showAchievementToast(ach));
    }
  }

  function showAchievementToast(ach) {
    const toast = document.createElement("div");
    toast.className = "achievement-toast";
    toast.innerHTML = `<div class="ach-toast-title">${ach.title}</div><div class="ach-toast-desc">${esc(ach.desc)}</div>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("visible"));
    setTimeout(() => { toast.classList.remove("visible"); setTimeout(() => toast.remove(), 400); }, 3500);
  }

  function openAchievementsPanel() {
    const overlay = document.getElementById("achievements-overlay");
    if (!overlay) return;
    const unlocked = new Set(getUnlockedAchievements());
    const body = document.getElementById("achievements-body");
    if (body) {
      body.innerHTML = ACHIEVEMENTS.map((ach) => {
        const done = unlocked.has(ach.id);
        return `<div class="ach-card ${done ? 'ach-unlocked' : 'ach-locked'}">
          <div class="ach-icon">${done ? ach.title.split(" ")[0] : "🔒"}</div>
          <div class="ach-info">
            <div class="ach-name">${done ? ach.title : "???"}</div>
            <div class="ach-desc">${done ? esc(ach.desc) : "הישג לא נחשף"}</div>
          </div>
        </div>`;
      }).join("");
    }
    overlay.style.display = "";
  }

  document.getElementById("open-achievements")?.addEventListener("click", openAchievementsPanel);
  document.getElementById("ach-close")?.addEventListener("click", () => {
    const el = document.getElementById("achievements-overlay");
    if (el) el.style.display = "none";
  });

  // --- Daily Reflection Modal ---
  const REFLECTION_KEY = "lumenportal:reflections:v1";
  function getReflections() { try { return JSON.parse(localStorage.getItem(REFLECTION_KEY) || "[]"); } catch { return []; } }
  function saveReflection(text, rating) {
    const arr = getReflections();
    arr.unshift({ date: new Date().toISOString(), text, rating });
    if (arr.length > 52) arr.length = 52; // keep ~1 year
    try { localStorage.setItem(REFLECTION_KEY, JSON.stringify(arr)); } catch {}
  }

  function openReflectionModal() {
    const overlay = document.getElementById("reflection-overlay");
    if (!overlay) return;
    const today = new Date().toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long" });
    const titleEl = document.getElementById("reflection-date");
    if (titleEl) titleEl.textContent = today;
    const histEl = document.getElementById("reflection-history");
    if (histEl) {
      const arr = getReflections().slice(0, 5);
      histEl.innerHTML = arr.length
        ? arr.map((r) => `<div class="refl-hist-item"><span class="refl-hist-date">${new Date(r.date).toLocaleDateString("he-IL")}</span> ${"⭐".repeat(r.rating || 0)} <span class="refl-hist-text">${esc(r.text)}</span></div>`).join("")
        : "<p class='refl-empty'>אין רשומות קודמות עדיין.</p>";
    }
    overlay.style.display = "";
  }

  document.getElementById("btn-open-reflection")?.addEventListener("click", openReflectionModal);
  document.getElementById("reflection-close")?.addEventListener("click", () => {
    const el = document.getElementById("reflection-overlay");
    if (el) el.style.display = "none";
  });
  document.getElementById("reflection-save")?.addEventListener("click", () => {
    const text = document.getElementById("reflection-text")?.value?.trim();
    const rating = parseInt(document.querySelector(".refl-star.active")?.dataset.star || "3", 10);
    if (!text) return;
    saveReflection(text, rating);
    awardXP(15);
    document.getElementById("reflection-overlay").style.display = "none";
    document.getElementById("reflection-text").value = "";
    document.querySelectorAll(".refl-star").forEach((s) => s.classList.remove("active"));
    showAchievementToast({ title: "📝 רפלקציה!", desc: "+15 XP על כתיבת רפלקציה" });
  });
  document.getElementById("reflection-overlay")?.addEventListener("click", (e) => {
    const star = e.target.closest(".refl-star");
    if (star) {
      const val = parseInt(star.dataset.star, 10);
      document.querySelectorAll(".refl-star").forEach((s) => s.classList.toggle("active", parseInt(s.dataset.star, 10) <= val));
    }
  });

  // Bootstrap W12 widgets on page load
  updateStreakWidget();
  updateXPWidget(getXP());

  // ===== end W12 =====

  // ===== W9 — AI Tutor =====
  const AI_USAGE_KEY = "lumenportal:ai_usage:v1";
  const AI_DAILY_LIMIT = 20;
  let aiCurrentMode = "coach";

  function getAIUsage() {
    try {
      const stored = JSON.parse(localStorage.getItem(AI_USAGE_KEY) || "{}");
      const today = new Date().toISOString().slice(0, 10);
      if (stored.date !== today) return { date: today, count: 0 };
      return stored;
    } catch { return { date: new Date().toISOString().slice(0, 10), count: 0 }; }
  }
  function incrementAIUsage() {
    const u = getAIUsage();
    u.count++;
    try { localStorage.setItem(AI_USAGE_KEY, JSON.stringify(u)); } catch {}
    return u;
  }

  function openAITutor(prefillMsg) {
    const modal = document.getElementById("ai-tutor-modal");
    if (!modal) return;
    modal.classList.remove("hidden");
    updateAIUsageDisplay();
    const concName = (() => {
      const card = document.querySelector(".concept-card.adaptive");
      return card?.dataset.concept || "";
    })();
    const ctxBar = document.getElementById("ai-context-bar");
    if (ctxBar) ctxBar.textContent = concName ? `📌 הקשר: ${concName}` : "";
    if (prefillMsg) {
      const inp = document.getElementById("ai-input");
      if (inp) inp.value = prefillMsg;
    }
    document.getElementById("ai-input")?.focus();
  }

  function updateAIUsageDisplay() {
    const el = document.getElementById("ai-usage-display");
    if (!el) return;
    const u = getAIUsage();
    const left = Math.max(0, AI_DAILY_LIMIT - u.count);
    el.textContent = `${left} שאלות נותרו היום`;
  }

  const AI_DEMO_RESPONSES = {
    coach: [
      "כשאתה נתקע, נסה לפרק את הבעיה לחלקים קטנים. מה הדבר הראשון שאתה לא מבין?",
      "מעולה ששאלת! הבעיה הנפוצה עם מושג זה היא שמבלבלים בין ___ ל-___. נסה לכתוב דוגמה פשוטה.",
      "בוא נפרק את זה. קודם בדוק אם אתה מבין את ה-basics: האם תוכל להסביר לי בשפה שלך מה המושג הזה עושה?",
    ],
    explain: [
      "המושג הנוכחי עובד בצורה הבאה: תחשוב עליו כמו ___. כל פעם ש___ קורה, ___ מגיב.",
      "הסבר קצר: המושג הזה קיים כדי לפתור את הבעיה של ___. ללא זה, היית צריך לכתוב ___ בכל פעם.",
      "יש 3 נקודות מפתח להבנה: 1) מה זה עושה. 2) מתי להשתמש. 3) מה לא לבלבל עמו.",
    ],
    check: [
      "שאלה לבדיקה: האם תוכל לכתוב דוגמה קוד פשוטה שמשתמשת במושג זה? שתף אותי ואני אבדוק.",
      "בדיקה קצרה: מה ההבדל בין המושג הנוכחי לאלטרנטיבה הנפוצה? עניית נכון = הבנת!",
      "לפני שנמשיך — בדוק את עצמך: האם תוכל להסביר מושג זה לחבר שלא מכיר תכנות?",
    ],
  };

  function getAIDemoResponse(mode, conceptName) {
    const pool = AI_DEMO_RESPONSES[mode] || AI_DEMO_RESPONSES.coach;
    const usage = getAIUsage();
    const rng = window.RNG.create(
      window.RNG.seedFromString(`ai-demo:${mode}:${conceptName || "general"}:${usage.date}:${usage.count}`),
    );
    const r = rng.pick(pool);
    return conceptName ? r.replace(/מושג זה|המושג הנוכחי|מושג הנוכחי/g, conceptName) : r;
  }

  async function sendAIMessage() {
    const input = document.getElementById("ai-input");
    const responseEl = document.getElementById("ai-response");
    if (!input || !responseEl) return;
    const msg = input.value.trim();
    if (!msg) return;
    const u = getAIUsage();
    if (u.count >= AI_DAILY_LIMIT) {
      responseEl.innerHTML = `<div class="ai-msg ai-msg-system">הגעת למכסה היומית (${AI_DAILY_LIMIT} שאלות). חזור מחר!</div>`;
      return;
    }
    const concName = document.querySelector(".concept-card.adaptive")?.dataset.concept || "";
    responseEl.innerHTML += `<div class="ai-msg ai-msg-user">${esc(msg)}</div>`;
    input.value = "";
    incrementAIUsage();
    updateAIUsageDisplay();

    const thinkingEl = document.createElement("div");
    thinkingEl.className = "ai-msg ai-msg-thinking";
    thinkingEl.textContent = "מחשב...";
    responseEl.appendChild(thinkingEl);
    responseEl.scrollTop = responseEl.scrollHeight;

    // Real API call (if configured) or demo fallback
    let reply = "";
    try {
      const apiResp = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, mode: aiCurrentMode, concept: concName }),
        signal: AbortSignal.timeout(8000),
      });
      if (apiResp.ok) {
        const data = await apiResp.json();
        reply = data.reply || getAIDemoResponse(aiCurrentMode, concName);
      } else {
        reply = getAIDemoResponse(aiCurrentMode, concName);
      }
    } catch {
      reply = getAIDemoResponse(aiCurrentMode, concName);
    }

    thinkingEl.remove();
    const replyEl = document.createElement("div");
    replyEl.className = "ai-msg ai-msg-bot";
    replyEl.textContent = reply;
    responseEl.appendChild(replyEl);
    responseEl.scrollTop = responseEl.scrollHeight;
  }

  // Misconception detector: 3 consecutive wrong answers on same concept
  window._aiWrongStreak = window._aiWrongStreak || {};
  function checkMisconception(lessonId, conceptName, correct) {
    const k = `${lessonId}::${conceptName}`;
    if (!correct) {
      window._aiWrongStreak[k] = (window._aiWrongStreak[k] || 0) + 1;
      if (window._aiWrongStreak[k] >= 3) {
        window._aiWrongStreak[k] = 0;
        setTimeout(() => openAITutor(`נתקעתי במושג "${conceptName}" — תעזור לי להבין?`), 500);
      }
    } else {
      window._aiWrongStreak[k] = 0;
    }
  }
  window.reportMisconception = checkMisconception;

  document.getElementById("ai-tutor-fab")?.addEventListener("click", () => openAITutor());
  document.getElementById("ai-tutor-close")?.addEventListener("click", () => {
    document.getElementById("ai-tutor-modal")?.classList.add("hidden");
  });
  document.getElementById("ai-send")?.addEventListener("click", sendAIMessage);
  document.getElementById("ai-input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendAIMessage(); }
  });
  document.querySelectorAll(".ai-mode-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      aiCurrentMode = btn.dataset.mode;
      document.querySelectorAll(".ai-mode-tab").forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
    });
  });
  // ===== end AI Tutor =====

  // ===== W10 — Export/Import Progress =====
  function exportProgress() {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      scores: {},
      proficiency: {},
    };
    // Collect all lumenportal:scores entries
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      if (k.startsWith("lumenportal:scores:")) data.scores[k] = localStorage.getItem(k);
      if (k.startsWith("lumenportal:prof:")) data.proficiency[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lumenportal-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importProgress(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.version || (!data.scores && !data.proficiency)) throw new Error("invalid format");
        const confirmed = confirm(
          `ייבוא ${Object.keys(data.scores || {}).length} שיעורים ו-${Object.keys(data.proficiency || {}).length} רמות ידע?\n` +
          "פעולה זו תדרוס נתונים קיימים בדפדפן זה."
        );
        if (!confirmed) return;
        Object.entries(data.scores || {}).forEach(([k, v]) => localStorage.setItem(k, v));
        Object.entries(data.proficiency || {}).forEach(([k, v]) => localStorage.setItem(k, v));
        alert("הייבוא הצליח! רענן את הדף כדי לראות את הנתונים.");
      } catch (err) {
        alert("שגיאה בקובץ — ודא שזה קובץ JSON תקין שיוצא מ-LumenPortal.");
      }
    };
    reader.readAsText(file);
  }

  // Wire export/import buttons (added to settings/profile area)
  document.getElementById("btn-export-progress")?.addEventListener("click", exportProgress);
  document.getElementById("btn-import-progress")?.addEventListener("click", () => {
    const picker = document.createElement("input");
    picker.type = "file";
    picker.accept = ".json";
    picker.onchange = (e) => { if (e.target.files[0]) importProgress(e.target.files[0]); };
    picker.click();
  });
  // ===== end Export/Import =====

  // =========== BOOT ===========
  setTimeout(() => {
    if (standaloneMuseumMode) {
      openProgrammingMuseum();
      document.body.classList.add("standalone-museum-ready");
      return;
    }
    initSidebar();
    // Mark Home tab as active on first load
    document.getElementById("open-home")?.classList.add("active");
    setHomeContextTree();
  }, 150);
});
