(function () {
  "use strict";

  function questionId(section, questionIndex) {
    return String((section && section.id) || "section") + "::q" + String(questionIndex + 1);
  }

  function placementQuestions(path) {
    return ((path || {}).placementTest || {}).sections
      ? path.placementTest.sections.flatMap(function (section) {
        return (section.questions || []).map(function (question, index) {
          return {
            id: questionId(section, index),
            section: section,
            question: question,
          };
        });
      })
      : [];
  }

  function score(path, state) {
    var questions = placementQuestions(path);
    var answers = (state || {}).answers || {};
    return questions.filter(function (item) { return !!answers[item.id]; }).length;
  }

  function levelFor(path, value) {
    var levels = (((path || {}).placementTest || {}).levels || []);
    return levels.find(function (level) {
      return value >= Number(level.min || 0) && value <= Number(level.max || 0);
    }) || levels[0] || { id: "beginner", label: "Beginner", routeId: "start-from-zero", message: "להתחיל מהבסיס." };
  }

  function routeFor(path, routeId) {
    return ((path || {}).closedRoutes || []).find(function (route) { return route.id === routeId; }) || ((path || {}).closedRoutes || [])[0] || {};
  }

  function savedText(state) {
    if (!state || !state.savedAt) return "עדיין לא נשמר אבחון";
    var saved = Date.parse(state.savedAt);
    if (!saved) return "נשמר בפרופיל מקומי";
    var seconds = Math.max(0, Math.round((Date.now() - saved) / 1000));
    if (seconds < 10) return "נשמר עכשיו";
    if (seconds < 60) return "נשמר לפני " + seconds + " שניות";
    var minutes = Math.round(seconds / 60);
    return "נשמר לפני " + minutes + " דקות";
  }

  function runtimeSaveMode() {
    if (window.location && window.location.protocol === "file:") {
      return "שמירה מקומית בלבד - פתח דרך שרת כדי לקבל גיבוי profile";
    }
    if (navigator && navigator.onLine === false) {
      return "אופליין - נשמר מקומית ויסונכרן כששרת מקומי זמין";
    }
    return "שחזור מפרופיל מקומי + גיבוי שרת מקומי כשמריצים דרך npm run dev";
  }

  function primaryCommand(path, state) {
    var currentScore = score(path, state);
    var total = placementQuestions(path).length;
    var skipped = !!(state && state.skipPlacement);
    var level = levelFor(path, currentScore);
    var route = routeFor(path, skipped ? "track-100" : level.routeId);
    if (!skipped && currentScore === 0) {
      return {
        title: "הפעולה היחידה עכשיו: מבחן מיון",
        body: "סמן 20 יכולות. אחרי זה הפורטל יבחר לך מסלול סגור.",
        action: "scroll-exam100-placement",
        button: "התחל אבחון",
        gate: "לא מתחילים Project 70 לפני שיש רמה ומסלול.",
      };
    }
    if (!skipped && currentScore < total) {
      return {
        title: "הפעולה היחידה עכשיו: להשלים אבחון",
        body: "נשארו " + (total - currentScore) + " סימונים. בלי זה ההמלצה למסלול חלקית.",
        action: "scroll-exam100-placement",
        button: "המשך אבחון",
        gate: "מסלול מלא נפתח אחרי 20/20 או דילוג מודע.",
      };
    }
    return {
      title: "הפעולה היחידה עכשיו: " + (route.label || "המשך במסלול"),
      body: "השלב הבא נבחר לפי האבחון: " + ((route.steps || [])[0] || route.level || "מסלול מבחן"),
      action: route.nextAction || "scroll-hxm-basic-diagnostic",
      button: "המשך עכשיו",
      gate: route.gate || "עוברים רק אחרי Gate ברור.",
    };
  }

  window.Exam100PathCore = {
    questionId: questionId,
    placementQuestions: placementQuestions,
    score: score,
    levelFor: levelFor,
    routeFor: routeFor,
    savedText: savedText,
    runtimeSaveMode: runtimeSaveMode,
    primaryCommand: primaryCommand,
  };
})();
