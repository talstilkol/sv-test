// Content Loader — Assembles all lesson data modules into window.LESSONS_DATA
(function () {
  const modules = [
    typeof LESSON_11 !== "undefined" ? LESSON_11 : null,
    typeof LESSON_12 !== "undefined" ? LESSON_12 : null,
    typeof LESSON_13 !== "undefined" ? LESSON_13 : null,
    typeof LESSON_15 !== "undefined" ? LESSON_15 : null,
    typeof LESSON_16 !== "undefined" ? LESSON_16 : null,
    typeof LESSON_17 !== "undefined" ? LESSON_17 : null,
    typeof LESSON_18 !== "undefined" ? LESSON_18 : null,
    typeof LESSON_19 !== "undefined" ? LESSON_19 : null,
    typeof LESSON_20 !== "undefined" ? LESSON_20 : null,
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

  // Merge concept enrichment (deepDive + analogies) into each concept where a
  // matching key exists. Performed once at load. Mutates the concept objects.
  const enrichment = typeof CONCEPT_ENRICHMENT !== "undefined" ? CONCEPT_ENRICHMENT : {};
  const extended = typeof EXTENDED_EXPLANATIONS !== "undefined" ? EXTENDED_EXPLANATIONS : {};
  // Sprint 1 — Creative Methods data (lazy-merged the same way)
  const antiPatterns = typeof ANTI_PATTERNS !== "undefined" ? ANTI_PATTERNS : {};
  const mnemonics = typeof MNEMONICS !== "undefined" ? MNEMONICS : {};
  let enrichedCount = 0;
  let extendedCount = 0;
  let antiPatternsCount = 0;
  let mnemonicsCount = 0;
  window.LESSONS_DATA.forEach((lesson) => {
    (lesson.concepts || []).forEach((c) => {
      const key = `${lesson.id}::${c.conceptName}`;
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
    });
  });

  // Initial bank — curated only (seeded loaded lazily on demand)
  const primary = typeof QUESTIONS_BANK !== "undefined" ? QUESTIONS_BANK : { mc: [], fill: [] };
  const traceList = typeof QUESTIONS_TRACE !== "undefined" ? QUESTIONS_TRACE : [];
  window.QUESTIONS_BANK = {
    mc: [...(primary.mc || [])],
    fill: [...(primary.fill || [])],
    trace: [...traceList],
  };
  window.QUICK_GUIDE = typeof QUICK_GUIDE !== "undefined" ? QUICK_GUIDE : { topics: [] };

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
    window.QUESTIONS_BANK.mc = [
      ...(primary.mc || []),
      ...(seeded.mc || []),
    ];
    window.QUESTIONS_BANK.fill = [
      ...(primary.fill || []),
      ...(seeded.fill || []),
    ];
    window.QUESTIONS_BANK._seededMerged = true;
  }

  const handMC = (primary.mc || []).length;
  const handFill = (primary.fill || []).length;
  console.log(
    `[LumenPortal] Loaded ${window.LESSONS_DATA.length} lessons · ` +
      `Bank (curated only — seeded lazy): ${handMC} MC + ${handFill} Fill · ` +
      `${traceList.length} Trace · ` +
      `${(window.QUICK_GUIDE.topics || []).length} guide topics · ` +
      `${enrichedCount} concepts enriched · ` +
      `${extendedCount} extended explanations · ` +
      `${antiPatternsCount} anti-patterns · ${mnemonicsCount} mnemonics.`,
  );
})();
