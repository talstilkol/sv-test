// Content Loader — Assembles all lesson data modules into window.LESSONS_DATA
(function () {
  const modules = [
    typeof LESSON_11 !== "undefined" ? LESSON_11 : null,
    typeof LESSON_12 !== "undefined" ? LESSON_12 : null,
    typeof LESSON_13 !== "undefined" ? LESSON_13 : null,
    typeof LESSON_HTML_CSS_FOUNDATIONS !== "undefined" ? LESSON_HTML_CSS_FOUNDATIONS : null,
    typeof LESSON_TOOLING_GIT !== "undefined" ? LESSON_TOOLING_GIT : null,
    typeof LESSON_15 !== "undefined" ? LESSON_15 : null,
    typeof LESSON_16 !== "undefined" ? LESSON_16 : null,
    typeof LESSON_17 !== "undefined" ? LESSON_17 : null,
    typeof LESSON_18 !== "undefined" ? LESSON_18 : null,
    typeof LESSON_19 !== "undefined" ? LESSON_19 : null,
    typeof LESSON_20 !== "undefined" ? LESSON_20 : null,
    typeof LESSON_SQL_ORM !== "undefined" ? LESSON_SQL_ORM : null,
    typeof LESSON_AUTH_SECURITY !== "undefined" ? LESSON_AUTH_SECURITY : null,
    typeof LESSON_NEXTJS !== "undefined" ? LESSON_NEXTJS : null,
    typeof LESSON_NESTJS !== "undefined" ? LESSON_NESTJS : null,
    typeof LESSON_DEVOPS_DEPLOY !== "undefined" ? LESSON_DEVOPS_DEPLOY : null,
    typeof LESSON_AI_ENGINEERING !== "undefined" ? LESSON_AI_ENGINEERING : null,
    typeof LESSON_DESIGN_SYSTEMS !== "undefined" ? LESSON_DESIGN_SYSTEMS : null,
    typeof LESSON_21 !== "undefined" ? LESSON_21 : null,
    typeof LESSON_22 !== "undefined" ? LESSON_22 : null,
    typeof LESSON_23 !== "undefined" ? LESSON_23 : null,
    typeof LESSON_24 !== "undefined" ? LESSON_24 : null,
    typeof LESSON_25 !== "undefined" ? LESSON_25 : null,
    typeof LESSON_26 !== "undefined" ? LESSON_26 : null,
    typeof LESSON_27 !== "undefined" ? LESSON_27 : null,
    typeof LESSON_CLOSURES !== "undefined" ? LESSON_CLOSURES : null,
    typeof WORKBOOK_TASKMANAGER !== "undefined" ? WORKBOOK_TASKMANAGER : null,
    typeof AI_DEVELOPMENT !== "undefined" ? AI_DEVELOPMENT : null,
    typeof REACT_BLUEPRINT !== "undefined" ? REACT_BLUEPRINT : null,
  ];

  window.LESSONS_DATA = modules.filter(Boolean);
  const lessonQuizKeys = typeof LESSON_QUIZ_KEYS !== "undefined" ? LESSON_QUIZ_KEYS : {};
  let lessonQuizKeyCount = 0;

  window.LESSONS_DATA.forEach((lesson) => {
    const mappings = lessonQuizKeys[lesson.id] || [];
    (lesson.quiz || []).forEach((question, index) => {
      const mappedKeys = Array.isArray(mappings[index]) ? mappings[index].filter(Boolean) : [];
      if (!mappedKeys.length) return;
      question.conceptKeys = mappedKeys;
      if (!question.conceptKey && mappedKeys.length === 1) {
        question.conceptKey = mappedKeys[0];
      }
      lessonQuizKeyCount++;
    });
  });

  // Merge concept enrichment (deepDive + analogies) into each concept where a
  // matching key exists. Performed once at load. Mutates the concept objects.
  const enrichment = typeof CONCEPT_ENRICHMENT !== "undefined" ? CONCEPT_ENRICHMENT : {};
  const extended = typeof EXTENDED_EXPLANATIONS !== "undefined" ? EXTENDED_EXPLANATIONS : {};
  // Sprint 1 — Creative Methods data (lazy-merged the same way)
  const antiPatterns = typeof ANTI_PATTERNS !== "undefined" ? ANTI_PATTERNS : {};
  const mnemonics = typeof MNEMONICS !== "undefined" ? MNEMONICS : {};
  // Sprint 2 — Creative Methods (war stories + comparisons)
  const warStories = typeof WAR_STORIES !== "undefined" ? WAR_STORIES : {};
  const comparisons = typeof COMPARISONS !== "undefined" ? COMPARISONS : {};
  const svcollegeQuestionBanks = [
    typeof SVCOLLEGE_SQL_ORM_QUESTIONS !== "undefined" ? SVCOLLEGE_SQL_ORM_QUESTIONS : null,
    typeof SVCOLLEGE_AUTH_QUESTIONS !== "undefined" ? SVCOLLEGE_AUTH_QUESTIONS : null,
    typeof SVCOLLEGE_NEXTJS_QUESTIONS !== "undefined" ? SVCOLLEGE_NEXTJS_QUESTIONS : null,
    typeof SVCOLLEGE_NESTJS_QUESTIONS !== "undefined" ? SVCOLLEGE_NESTJS_QUESTIONS : null,
    typeof SVCOLLEGE_DEVOPS_QUESTIONS !== "undefined" ? SVCOLLEGE_DEVOPS_QUESTIONS : null,
    typeof SVCOLLEGE_AI_ENGINEERING_QUESTIONS !== "undefined" ? SVCOLLEGE_AI_ENGINEERING_QUESTIONS : null,
    typeof SVCOLLEGE_DESIGN_SYSTEMS_QUESTIONS !== "undefined" ? SVCOLLEGE_DESIGN_SYSTEMS_QUESTIONS : null,
    typeof SVCOLLEGE_BRIDGE_QUESTIONS !== "undefined" ? SVCOLLEGE_BRIDGE_QUESTIONS : null,
  ].filter(Boolean);
  const svcollegeMC = svcollegeQuestionBanks.flatMap((bank) => bank.mc || []);
  const svcollegeFill = svcollegeQuestionBanks.flatMap((bank) => bank.fill || []);
  const svcollegeBugHunts = svcollegeQuestionBanks.flatMap((bank) => bank.bugHunt || []);
  const svcollegeTraces = [
    ...(typeof SVCOLLEGE_SQL_ORM_TRACES !== "undefined" ? SVCOLLEGE_SQL_ORM_TRACES : []),
    ...(typeof SVCOLLEGE_AUTH_TRACES !== "undefined" ? SVCOLLEGE_AUTH_TRACES : []),
    ...(typeof SVCOLLEGE_NEXTJS_TRACES !== "undefined" ? SVCOLLEGE_NEXTJS_TRACES : []),
    ...(typeof SVCOLLEGE_NESTJS_TRACES !== "undefined" ? SVCOLLEGE_NESTJS_TRACES : []),
    ...(typeof SVCOLLEGE_DEVOPS_TRACES !== "undefined" ? SVCOLLEGE_DEVOPS_TRACES : []),
    ...(typeof SVCOLLEGE_AI_ENGINEERING_TRACES !== "undefined" ? SVCOLLEGE_AI_ENGINEERING_TRACES : []),
    ...(typeof SVCOLLEGE_DESIGN_SYSTEMS_TRACES !== "undefined" ? SVCOLLEGE_DESIGN_SYSTEMS_TRACES : []),
    ...(typeof SVCOLLEGE_BRIDGE_TRACES !== "undefined" ? SVCOLLEGE_BRIDGE_TRACES : []),
  ];
  const svcollegeBuilds = [
    ...(typeof SVCOLLEGE_SQL_ORM_BUILDS !== "undefined" ? SVCOLLEGE_SQL_ORM_BUILDS : []),
    ...(typeof SVCOLLEGE_AUTH_BUILDS !== "undefined" ? SVCOLLEGE_AUTH_BUILDS : []),
    ...(typeof SVCOLLEGE_NEXTJS_BUILDS !== "undefined" ? SVCOLLEGE_NEXTJS_BUILDS : []),
    ...(typeof SVCOLLEGE_NESTJS_BUILDS !== "undefined" ? SVCOLLEGE_NESTJS_BUILDS : []),
    ...(typeof SVCOLLEGE_DEVOPS_BUILDS !== "undefined" ? SVCOLLEGE_DEVOPS_BUILDS : []),
    ...(typeof SVCOLLEGE_AI_ENGINEERING_BUILDS !== "undefined" ? SVCOLLEGE_AI_ENGINEERING_BUILDS : []),
    ...(typeof SVCOLLEGE_DESIGN_SYSTEMS_BUILDS !== "undefined" ? SVCOLLEGE_DESIGN_SYSTEMS_BUILDS : []),
    ...(typeof SVCOLLEGE_BRIDGE_BUILDS !== "undefined" ? SVCOLLEGE_BRIDGE_BUILDS : []),
  ];
  // P1.4.3 — Bug Hunt questions grouped by conceptKey
  const bugList = [
    ...(typeof QUESTIONS_BUG !== "undefined" ? QUESTIONS_BUG : []),
    ...svcollegeBugHunts,
  ];
  const bugsByKey = bugList.reduce((acc, b) => {
    if (!b.conceptKey) return acc;
    (acc[b.conceptKey] = acc[b.conceptKey] || []).push(b);
    return acc;
  }, {});
  // P1.4.4 — Mini Build questions grouped by conceptKey
  const buildList = [
    ...(typeof QUESTIONS_BUILD !== "undefined" ? QUESTIONS_BUILD : []),
    ...svcollegeBuilds,
  ];
  const buildsByKey = buildList.reduce((acc, b) => {
    if (!b.conceptKey) return acc;
    (acc[b.conceptKey] = acc[b.conceptKey] || []).push(b);
    return acc;
  }, {});
  // Sprint 2 §4.15.6 — Mental Model Animator (ANIMATIONS keyed by conceptKey)
  const animations = typeof ANIMATIONS !== "undefined" ? ANIMATIONS : {};
  // Sprint 3 §4.15.7 — What-If Simulator (WHAT_IF keyed by conceptKey)
  const whatIf = typeof WHAT_IF !== "undefined" ? WHAT_IF : {};
  // AUDIT-FIX Creative Methods — visual/diagnostic learning layers
  const conceptComics = typeof CONCEPT_COMICS !== "undefined" ? CONCEPT_COMICS : {};
  const stageZero = typeof STAGE_ZERO !== "undefined" ? STAGE_ZERO : {};
  const memoryPalaces = typeof MEMORY_PALACES !== "undefined" ? MEMORY_PALACES : {};
  const problemFirst = typeof PROBLEM_FIRST !== "undefined" ? PROBLEM_FIRST : {};
  const conceptVideos = typeof CONCEPT_VIDEOS !== "undefined" ? CONCEPT_VIDEOS : {};
  const conciseDefinitions = typeof CONCISE_CONCEPT_DEFINITIONS !== "undefined" ? CONCISE_CONCEPT_DEFINITIONS : {};
  const lowSignalExplanationRe = /רעיון שמופיע הרבה בפועל|מייצג קונספט שמופיע בסטנדרט|משמש בתוך מבני קוד אמיתיים|תאר\/תארי|חלק מהפרוטוקול|חוסכת הרבה זמן דיבוג|ניתוח המושג/;
  const normalizeDefinitionKey = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  const definitionForConcept = (conceptName) => {
    const key = normalizeDefinitionKey(conceptName);
    return conciseDefinitions[key] || conciseDefinitions[key.replace(/\s+/g, "")] || null;
  };
  const isLowSignalExplanation = (value) => lowSignalExplanationRe.test(String(value || ""));
  const isLowSignalGeneratedQuestion = (question) => {
    const text = [
      question && question.question,
      question && question.prompt,
      question && question.explanation,
      question && question.code,
      ...((question && question.options) || []),
    ].filter(Boolean).join(" ");
    return isLowSignalExplanation(text);
  };
  let enrichedCount = 0;
  let extendedCount = 0;
  let antiPatternsCount = 0;
  let mnemonicsCount = 0;
  let warStoriesCount = 0;
  let conceptComicsCount = 0;
  let stageZeroCount = 0;
  let memoryPalacesCount = 0;
  let problemFirstCount = 0;
  let conceptVideosCount = 0;
  let bugsCount = 0;
  window.LESSONS_DATA.forEach((lesson) => {
    (lesson.concepts || []).forEach((c) => {
      const key = `${lesson.id}::${c.conceptName}`;
      const concise = definitionForConcept(c.conceptName);
      if (concise) {
        c.conciseDefinition = concise.what;
        c.mustKnow = concise.need || "";
        c.levels = c.levels || {};
        if (!c.levels.grandma || isLowSignalExplanation(c.levels.grandma)) c.levels.grandma = concise.what;
        if (!c.levels.child || isLowSignalExplanation(c.levels.child)) c.levels.child = concise.what;
        if (!c.levels.student || isLowSignalExplanation(c.levels.student)) c.levels.student = concise.need || concise.what;
        if (c.codeExplanation && isLowSignalExplanation(c.codeExplanation)) {
          c.codeExplanation = concise.need || concise.what;
        }
      }
      if (enrichment[key]) {
        if (enrichment[key].deepDive) c.deepDive = enrichment[key].deepDive;
        if (enrichment[key].analogies) c.analogies = enrichment[key].analogies;
        if (enrichment[key].analogy && !c.analogy) c.analogy = enrichment[key].analogy;
        enrichedCount++;
      }
      if (extended[key] && extended[key].extendedTab) {
        c.extendedTab = extended[key].extendedTab;
        extendedCount++;
      }
      // Sprint 1: Anti-Patterns Gallery + Mnemonics Lab
      if (antiPatterns[key]) {
        c.antiPatterns = antiPatterns[key];
        antiPatternsCount++;
      }
      if (mnemonics[key]) {
        c.mnemonic = mnemonics[key];
        mnemonicsCount++;
      }
      // Sprint 2: War Stories (multi-incident library) + Comparisons (lookup)
      if (warStories[key]) {
        c.warStories = warStories[key];
        warStoriesCount++;
      }
      // Comparisons: find any pair where this concept is referenced
      const matchingComparisons = Object.values(comparisons).filter(
        (cmp) => Array.isArray(cmp.relatedConcepts) && cmp.relatedConcepts.includes(key),
      );
      if (matchingComparisons.length > 0) {
        c.comparisons = matchingComparisons;
      }
      // P1.4.3 — Bug Hunts (one or more per concept)
      if (bugsByKey[key] && bugsByKey[key].length > 0) {
        c.bugHunts = bugsByKey[key];
        bugsCount += bugsByKey[key].length;
      }
      // P1.4.4 — Mini Builds
      if (buildsByKey[key] && buildsByKey[key].length > 0) {
        c.miniBuilds = buildsByKey[key];
      }
      // Sprint 2 §4.15.6 — Mental Model Animator
      if (animations[key]) {
        c.animation = animations[key];
      }
      // Sprint 3 §4.15.7 — What-If Simulator
      if (whatIf[key]) {
        c.whatIf = whatIf[key];
      }
      if (conceptComics[key]) {
        c.conceptComic = conceptComics[key];
        conceptComicsCount++;
      }
      if (stageZero[key]) {
        c.stageZero = stageZero[key];
        stageZeroCount++;
      }
      if (memoryPalaces[key]) {
        c.memoryPalace = memoryPalaces[key];
        memoryPalacesCount++;
      }
      if (problemFirst[key]) {
        c.problemFirst = problemFirst[key];
        problemFirstCount++;
      }
      if (conceptVideos[key]) {
        c.conceptVideo = conceptVideos[key];
        conceptVideosCount++;
      }
    });
  });

  // Initial bank — curated only (seeded loaded lazily on demand)
  const primary = typeof QUESTIONS_BANK !== "undefined" ? QUESTIONS_BANK : { mc: [], fill: [] };
  const traceList = [
    ...(typeof QUESTIONS_TRACE !== "undefined" ? QUESTIONS_TRACE : []),
    ...svcollegeTraces,
  ];
  window.QUESTIONS_BANK = {
    mc: [...(primary.mc || []), ...svcollegeMC],
    fill: [...(primary.fill || []), ...svcollegeFill],
    trace: [...traceList],
    bug: [...bugList],
    build: [...buildList],
  };
  window.QUICK_GUIDE = typeof QUICK_GUIDE !== "undefined" ? QUICK_GUIDE : { topics: [] };
  if (
    typeof CODE_BLOCKS !== "undefined" &&
    Array.isArray(CODE_BLOCKS.blocks) &&
    typeof SVCOLLEGE_CODE_BLOCKS !== "undefined" &&
    Array.isArray(SVCOLLEGE_CODE_BLOCKS)
  ) {
    CODE_BLOCKS.blocks = [...CODE_BLOCKS.blocks, ...SVCOLLEGE_CODE_BLOCKS];
  }

  // Lazy loader for the heavy seeded bank (1.4MB).
  // Loaded on demand when user opens Trainer / Study Mode.
  // Idempotent — safe to call multiple times.
  let seededLoadPromise = null;
  window.ensureSeededBank = function ensureSeededBank() {
    if (seededLoadPromise) return seededLoadPromise;
    if (typeof window.QUESTIONS_BANK_SEEDED !== "undefined") {
      // Already loaded
      mergeSeededIntoBank();
      return Promise.resolve(window.QUESTIONS_BANK);
    }
    seededLoadPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "data/questions_bank_seeded.js";
      s.async = true;
      s.onload = () => {
        mergeSeededIntoBank();
        console.log(
          `[LumenPortal] 🪶 Lazy-loaded seeded bank — ` +
            `+${(window.QUESTIONS_BANK_SEEDED.mc || []).length} MC, ` +
            `+${(window.QUESTIONS_BANK_SEEDED.fill || []).length} Fill`,
        );
        resolve(window.QUESTIONS_BANK);
      };
      s.onerror = (e) => {
        console.error("[LumenPortal] Failed to load seeded bank:", e);
        reject(e);
      };
      document.head.appendChild(s);
    });
    return seededLoadPromise;
  };

  function mergeSeededIntoBank() {
    const seeded = window.QUESTIONS_BANK_SEEDED || { mc: [], fill: [] };
    // Avoid double-merge by checking marker
    if (window.QUESTIONS_BANK._seededMerged) return;
    const seededMC = (seeded.mc || []).filter((q) => !isLowSignalGeneratedQuestion(q));
    const seededFill = (seeded.fill || []).filter((q) => !isLowSignalGeneratedQuestion(q));
    window.QUESTIONS_BANK.mc = [
      ...(primary.mc || []),
      ...svcollegeMC,
      ...seededMC,
    ];
    window.QUESTIONS_BANK.fill = [
      ...(primary.fill || []),
      ...svcollegeFill,
      ...seededFill,
    ];
    window.QUESTIONS_BANK._seededMerged = true;
    window.QUESTIONS_BANK._seededFiltered = {
      mc: (seeded.mc || []).length - seededMC.length,
      fill: (seeded.fill || []).length - seededFill.length,
    };
  }

  const handMC = (primary.mc || []).length + svcollegeMC.length;
  const handFill = (primary.fill || []).length + svcollegeFill.length;
  console.log(
    `[LumenPortal] Loaded ${window.LESSONS_DATA.length} lessons · ` +
      `Bank (curated only — seeded lazy): ${handMC} MC + ${handFill} Fill · ` +
      `${traceList.length} Trace · ` +
      `${(window.QUICK_GUIDE.topics || []).length} guide topics · ` +
      `${enrichedCount} concepts enriched · ` +
      `${extendedCount} extended explanations · ` +
      `${antiPatternsCount} anti-patterns · ${mnemonicsCount} mnemonics · ` +
      `${conceptComicsCount} comics · ${stageZeroCount} stage-zero · ` +
      `${memoryPalacesCount} memory palaces · ${problemFirstCount} problem-first · ` +
      `${conceptVideosCount} concept clips · ${lessonQuizKeyCount} lesson quiz key maps.`,
  );
})();
