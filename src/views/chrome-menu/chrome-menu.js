(function () {
  "use strict";

  const root = typeof window !== "undefined" ? window : globalThis;

  function showView(el, display = "block") {
    if (!el) return;
    el.hidden = false;
    el.style.display = display;
  }

  function hideView(el) {
    if (!el) return;
    el.style.display = "none";
    el.hidden = true;
  }

  function cleanSiteNavText(value = "") {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function isSiteViewVisible(el) {
    return !!el && !el.hidden && el.style.display !== "none";
  }

  function activeTopTabButton(doc = root.document) {
    if (!doc) return null;
    return Array.from(doc.querySelectorAll(".top-tab")).find((tab) => tab.classList.contains("active")) || null;
  }

  const EXAM_FOCUS_ALLOWED_TABS = new Set([
    "mock-exam",
    "trainer",
    "trace",
    "codeblocks",
    "gap-matrix",
    "learning-evidence",
    "capstones",
    "blueprints",
    "comparator",
    "study",
    "flashcards",
    "concept-sprint",
    "km",
    "settings",
    "home",
  ]);

  const EXAM_FOCUS_OUT_OF_SCOPE_REASONS = {
    "grandma-knowledge": "הסבר העשרה ארוך. בזמן הכנה למבחן עובדים במסלול 70/20/10 הסגור.",
    "programming-basics": "יסודות כלליים מדי. אם חסר בסיס, פתח Guide או Trainer מתוך מסלול המבחן.",
    "programming-principles": "עקרונות כלליים לא מדמים את משימת המבחן.",
    "programming-museum": "אגף העשרה היסטורי, לא תרגול מבחן.",
    "language-tools": "השוואת שפות וכלים אינה חלק ישיר ממבחן SVCollege הקרוב.",
    "reward-store": "חנות חוויות אינה חלק מהכנה ישירה למבחן.",
    guide: "מדריך מקוצר זמין בעץ המדריכים; התפריט העליון נשאר למסלול תרגול.",
    anatomy: "פירוק קוד כללי; Code Trace ו-Codeblocks הם המסלול הממוקד למבחן.",
  };

  function isExamFocusTabInScope(tabId) {
    return EXAM_FOCUS_ALLOWED_TABS.has(String(tabId || ""));
  }

  function siteStateKey(state) {
    if (!state) return "";
    return `${state.type || ""}:${state.id || ""}`;
  }

  root.LumenChromeMenu = {
    showView,
    hideView,
    cleanSiteNavText,
    isSiteViewVisible,
    activeTopTabButton,
    EXAM_FOCUS_ALLOWED_TABS,
    EXAM_FOCUS_OUT_OF_SCOPE_REASONS,
    isExamFocusTabInScope,
    siteStateKey,
  };
})();
