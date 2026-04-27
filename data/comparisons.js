// data/comparisons.js — Side-by-Side Comparator (Sprint 2)
// X vs Y for commonly-confused concept pairs.
// Each entry: pairKey → { a, b, rows: [{ dim, a, b }], when }
// 6 pairs covering hard concepts.

var COMPARISONS = {
  "useState_vs_useReducer": {
    pairKey: "useState_vs_useReducer",
    relatedConcepts: ["lesson_22::useState", "lesson_22::setState"],
    a: { name: "useState", icon: "🪝", tagline: "state פשוט" },
    b: { name: "useReducer", icon: "🎛️", tagline: "state מורכב עם actions" },
    rows: [
      { dim: "מתי להשתמש", a: "1-3 שדות בודדים", b: "5+ שדות או logic מורכב" },
      { dim: "API", a: "[value, setValue]", b: "[state, dispatch]" },
      { dim: "עדכון", a: "setValue(newValue)", b: "dispatch({ type: 'X' })" },
      { dim: "ספיקות", a: "פשוט מאוד", b: "actions/reducer/types" },
      { dim: "Test", a: "test the component", b: "test reducer in isolation" },
      { dim: "DevTools", a: "React DevTools", b: "Redux-like time travel possible" },
    ],
    when: "useState למעט useReducer רק כשיש state machine ברור עם 3+ actions שונות.",
  },

  "useMemo_vs_useCallback": {
    pairKey: "useMemo_vs_useCallback",
    relatedConcepts: ["lesson_24::useMemo"],
    a: { name: "useMemo", icon: "🧠", tagline: "memoize ערך" },
    b: { name: "useCallback", icon: "🔁", tagline: "memoize פונקציה" },
    rows: [
      { dim: "מה memoize", a: "ערך שמחושב", b: "פונקציה (callback)" },
      { dim: "API", a: "useMemo(() => computed, deps)", b: "useCallback(fn, deps)" },
      { dim: "מתי", a: "חישוב יקר (filter/sort של מערך גדול)", b: "function שמועברת ל-child עם React.memo" },
      { dim: "שווה ל", a: "useMemo(() => fn, deps)", b: "useCallback(fn, deps) ≡ useMemo(() => fn, deps)" },
      { dim: "Anti-pattern", a: "memoize של חישוב זול", b: "useCallback בלי React.memo בילד" },
    ],
    when: "useMemo לערכים, useCallback לפונקציות. שניהם רק כשיש בעיית performance מדודה.",
  },

  "useEffect_vs_useLayoutEffect": {
    pairKey: "useEffect_vs_useLayoutEffect",
    relatedConcepts: ["lesson_24::useEffect"],
    a: { name: "useEffect", icon: "⚙️", tagline: "אחרי paint (default)" },
    b: { name: "useLayoutEffect", icon: "📐", tagline: "לפני paint (sync)" },
    rows: [
      { dim: "מתי רץ", a: "אחרי הרינדור והציור למסך", b: "אחרי DOM mutation, לפני paint" },
      { dim: "Block UI?", a: "לא — async-like", b: "כן — blocking. אם אטי = jank" },
      { dim: "Use case", a: "fetch, subscriptions, timers", b: "מדידת DOM (height/width), prevent flicker" },
      { dim: "SSR", a: "לא רץ ב-server", b: "אזהרה ב-server (אין DOM)" },
      { dim: "Default", a: "✅ ברוב המקרים", b: "רק כש-flicker visible" },
    ],
    when: "תמיד useEffect, אלא אם יש flicker שצריך למדוד DOM ולשנות לפני paint.",
  },

  "props_vs_state": {
    pairKey: "props_vs_state",
    relatedConcepts: ["lesson_22::props", "lesson_22::state"],
    a: { name: "props", icon: "📨", tagline: "מאב לבן" },
    b: { name: "state", icon: "📦", tagline: "פנימי לקומפוננטה" },
    rows: [
      { dim: "מקור", a: "קומפוננטת אב", b: "useState/useReducer בקומפוננטה" },
      { dim: "Mutability", a: "Read-only (לא לשנות!)", b: "Mutable דרך setter" },
      { dim: "טריגר re-render", a: "כשhab משנה ושולח חדשים", b: "כש-setState נקרא" },
      { dim: "כיוון זרימה", a: "אב → בן (מטה)", b: "בתוך אותה קומפוננטה" },
      { dim: "Testing", a: "pass mock props", b: "render + interact" },
    ],
    when: "props לתקשורת מאב, state לליבה פנימית. אם state ב-2 ילדים — להעלות ל-parent (lifting).",
  },

  "controlled_vs_uncontrolled": {
    pairKey: "controlled_vs_uncontrolled",
    relatedConcepts: ["lesson_28::controlled input"],
    a: { name: "Controlled", icon: "🎮", tagline: "React מנהל" },
    b: { name: "Uncontrolled", icon: "🤝", tagline: "DOM מנהל" },
    rows: [
      { dim: "value", a: "value={state}", b: "defaultValue + ref" },
      { dim: "onChange", a: "חובה, מעדכן state", b: "אופציונלי, ערך נשלף עם ref" },
      { dim: "Validation", a: "בכל קלדה", b: "ב-submit בלבד" },
      { dim: "Performance", a: "render בכל אות", b: "DOM-native, אפס re-renders" },
      { dim: "Best for", a: "validation, formatting, conditional UI", b: "טפסים פשוטים, file inputs" },
    ],
    when: "Controlled = standard ב-React. Uncontrolled רק לטפסי file/lekg גדולים שתפקודים בלי validation.",
  },

  "css_grid_vs_flexbox": {
    pairKey: "css_grid_vs_flexbox",
    relatedConcepts: ["lesson_04::CSS Grid", "lesson_04::flexbox"],
    a: { name: "Flexbox", icon: "📏", tagline: "1D layout" },
    b: { name: "CSS Grid", icon: "🔲", tagline: "2D layout" },
    rows: [
      { dim: "ממדים", a: "ציר אחד (row או column)", b: "שני ממדים (rows + columns)" },
      { dim: "תכן", a: "content-driven (גודל לפי תוכן)", b: "container-driven (גודל לפי grid)" },
      { dim: "Use case", a: "Navbar, button group, רשימה", b: "Page layout, dashboard, gallery" },
      { dim: "Properties", a: "flex-direction, justify-content, align-items", b: "grid-template-columns/rows, grid-area" },
      { dim: "אופטימלי", a: "אלמנטים בודדים בשורה/עמודה", b: "Layout דו-ממדי שלם" },
    ],
    when: "Grid לpage layout. Flex לרכיבים בתוכו. שילוב = הדרך הנפוצה.",
  },
};

// Browser bridge
if (typeof window !== "undefined") {
  window.COMPARISONS = COMPARISONS;
}
