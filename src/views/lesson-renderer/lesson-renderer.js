(function () {
  "use strict";

  var DEFAULT_LESSON_COMPACT_MODE = "one-line";
  var LESSON_COMPACT_MODES = Object.freeze({
    full: Object.freeze({ label: "מלא", icon: "📚" }),
    "one-line": Object.freeze({ label: "שורה אחת", icon: "⚡" }),
    comparisons: Object.freeze({ label: "השוואות", icon: "⚖️" }),
  });

  function safeCompactMode(mode) {
    return LESSON_COMPACT_MODES[mode] ? mode : DEFAULT_LESSON_COMPACT_MODE;
  }

  function lessonConcepts(lesson) {
    return Array.isArray(lesson && lesson.concepts) ? lesson.concepts : [];
  }

  function resolveSelectedConcept(lesson, selectedConceptByLesson) {
    var concepts = lessonConcepts(lesson);
    if (!concepts.length) {
      return {
        concepts: concepts,
        selectedName: "",
        selectedConcept: null,
        selectedIndex: -1,
        isEmpty: true,
      };
    }
    var lessonId = lesson && lesson.id;
    var selectedName = lessonId && selectedConceptByLesson
      ? selectedConceptByLesson[lessonId]
      : "";
    if (!selectedName) selectedName = concepts[0].conceptName;
    var selectedConcept = concepts.find(function (concept) {
      return concept && concept.conceptName === selectedName;
    });
    if (!selectedConcept) {
      selectedConcept = concepts[0];
      selectedName = selectedConcept.conceptName;
    }
    return {
      concepts: concepts,
      selectedName: selectedName,
      selectedConcept: selectedConcept,
      selectedIndex: concepts.indexOf(selectedConcept),
      isEmpty: false,
    };
  }

  function createRenderState(options) {
    var lesson = options && options.lesson;
    var selected = resolveSelectedConcept(lesson, options && options.selectedConceptByLesson);
    return {
      lesson: lesson || null,
      concepts: selected.concepts,
      selectedName: selected.selectedName,
      selectedConcept: selected.selectedConcept,
      selectedIndex: selected.selectedIndex,
      compactMode: safeCompactMode(options && options.compactMode),
      isEmpty: selected.isEmpty,
    };
  }

  window.LumenLessonRenderer = Object.freeze({
    DEFAULT_LESSON_COMPACT_MODE: DEFAULT_LESSON_COMPACT_MODE,
    LESSON_COMPACT_MODES: LESSON_COMPACT_MODES,
    safeCompactMode: safeCompactMode,
    lessonConcepts: lessonConcepts,
    resolveSelectedConcept: resolveSelectedConcept,
    createRenderState: createRenderState,
  });
})();
