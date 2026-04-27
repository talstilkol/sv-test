// Content Loader — Assembles all lesson data modules into window.LESSONS_DATA
(function () {
  const modules = [
    typeof LESSON_01 !== "undefined" ? LESSON_01 : null,  // HTML basics
    typeof LESSON_02 !== "undefined" ? LESSON_02 : null,  // CSS Intro (selectors, box, position)
    typeof LESSON_03 !== "undefined" ? LESSON_03 : null,  // CSS Responsive
    typeof LESSON_04 !== "undefined" ? LESSON_04 : null,  // CSS Grid + Flexbox
    typeof LESSON_05 !== "undefined" ? LESSON_05 : null,  // DOM + Events
    typeof LESSON_06 !== "undefined" ? LESSON_06 : null,  // ES6+ Advanced
    typeof LESSON_07 !== "undefined" ? LESSON_07 : null,  // Git + ESLint + Prettier
    typeof LESSON_08 !== "undefined" ? LESSON_08 : null,  // PostgreSQL + Drizzle/Prisma
    typeof LESSON_09 !== "undefined" ? LESSON_09 : null,  // Auth + JWT
    typeof LESSON_10 !== "undefined" ? LESSON_10 : null,  // Auth Providers (Supabase)
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
    typeof LESSON_28 !== "undefined" ? LESSON_28 : null,  // Forms (RHF + zod)
    typeof LESSON_29 !== "undefined" ? LESSON_29 : null,  // Vercel + Docker
    typeof LESSON_30 !== "undefined" ? LESSON_30 : null,  // Clean BE + Tests
    typeof LESSON_31 !== "undefined" ? LESSON_31 : null,  // Next.js (App Router)
    typeof LESSON_32 !== "undefined" ? LESSON_32 : null,  // Next.js Advanced (API/SEO)
    typeof LESSON_33 !== "undefined" ? LESSON_33 : null,  // shadcn/UI
    typeof LESSON_34 !== "undefined" ? LESSON_34 : null,  // Nest.js
    typeof LESSON_35 !== "undefined" ? LESSON_35 : null,  // Cursor + Windsurf
    typeof LESSON_36 !== "undefined" ? LESSON_36 : null,  // Bolt + AI helpers
    typeof LESSON_37 !== "undefined" ? LESSON_37 : null,  // AI Engineering
    typeof LESSON_38 !== "undefined" ? LESSON_38 : null,  // LangChain + RAG
    typeof LESSON_39 !== "undefined" ? LESSON_39 : null,  // Agents + Fine-tuning
    typeof WORKBOOK_TASKMANAGER !== "undefined" ? WORKBOOK_TASKMANAGER : null,
    typeof AI_DEVELOPMENT !== "undefined" ? AI_DEVELOPMENT : null,
    typeof REACT_BLUEPRINT !== "undefined" ? REACT_BLUEPRINT : null,
  ];

  window.LESSONS_DATA = modules.filter(Boolean);

  // Merge concept enrichment (deepDive + analogies) into each concept where a
  // matching key exists. Performed once at load. Mutates the concept objects.
  const enrichment = typeof CONCEPT_ENRICHMENT !== "undefined" ? CONCEPT_ENRICHMENT : {};
  const extended = typeof EXTENDED_EXPLANATIONS !== "undefined" ? EXTENDED_EXPLANATIONS : {};
  let enrichedCount = 0;
  let extendedCount = 0;
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
    });
  });

  // Merge hand-curated bank with auto-seeded bank (if exists)
  const primary = typeof QUESTIONS_BANK !== "undefined" ? QUESTIONS_BANK : { mc: [], fill: [] };
  const seeded = typeof QUESTIONS_BANK_SEEDED !== "undefined" ? QUESTIONS_BANK_SEEDED : { mc: [], fill: [] };
  const traceList = typeof QUESTIONS_TRACE !== "undefined" ? QUESTIONS_TRACE : [];
  window.QUESTIONS_BANK = {
    mc: [...(primary.mc || []), ...(seeded.mc || [])],
    fill: [...(primary.fill || []), ...(seeded.fill || [])],
    trace: [...traceList],
  };
  window.QUICK_GUIDE = typeof QUICK_GUIDE !== "undefined" ? QUICK_GUIDE : { topics: [] };

  const handMC = (primary.mc || []).length;
  const handFill = (primary.fill || []).length;
  const seedMC = (seeded.mc || []).length;
  const seedFill = (seeded.fill || []).length;
  console.log(
    `[LumenPortal] Loaded ${window.LESSONS_DATA.length} lessons · ` +
    `Bank: ${handMC + seedMC} MC (${handMC} curated + ${seedMC} seeded) · ` +
    `${handFill + seedFill} Fill (${handFill} curated + ${seedFill} seeded) · ` +
    `${traceList.length} Trace · ` +
    `${(window.QUICK_GUIDE.topics || []).length} guide topics · ` +
    `${enrichedCount} concepts enriched (deepDive + analogies) · ` +
    `${extendedCount} extended explanations.`
  );
})();
