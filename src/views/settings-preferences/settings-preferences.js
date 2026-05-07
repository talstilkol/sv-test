(function () {
  "use strict";

  const root = typeof window !== "undefined" ? window : globalThis;

  const KEYS = Object.freeze({
    profiles: "lumenportal:profiles:v1",
    activeProfile: "lumenportal:activeProfile:v1",
    userId: "lumenportal:userId:v1",
    theme: "lumenportal:theme:v1",
    a11y: "lumenportal:a11y:v1",
    viewMode: "lumenportal:viewMode:v1",
    lessonCompactMode: "lumenportal:lessonCompactMode:v1",
    learningFocus: "lumenportal:learning-focus:v1",
    learningFocusTopCollapsed: "lumenportal:learning-focus-top-collapsed:v1",
    topChromeCollapsed: "lumenportal:top-chrome-collapsed:v1",
    rightSidebarCollapsed: "lumenportal:right-sidebar-collapsed:v1",
    bankVersion: "lumenportal:bankVersion:v1",
    supabaseUrl: "lumenportal:supabase:url:v1",
    supabaseAnonKey: "lumenportal:supabase:anon-key:v1",
    syncMeta: "lumenportal:sync:meta:v1",
  });

  const THEME_STATES = Object.freeze(["auto", "light", "dark"]);
  const THEME_ICONS = Object.freeze({ auto: "🌗", light: "☀️", dark: "🌙" });
  const LESSON_MODE_STATES = Object.freeze(["one-line", "full", "comparisons"]);
  const VIEW_MODE_KEYS = Object.freeze([
    "quiz",
    "code",
    "code-explanation",
    "explanation",
    "deep-dive",
    "extended",
    "extras",
    "anti-patterns",
    "bug-hunt",
    "war-stories",
    "mnemonic",
    "comparisons",
    "concept-comic",
    "concept-video",
    "stage-zero",
    "memory-palace",
    "problem-first",
    "actions",
  ]);
  const A11Y_KEYS = Object.freeze(["dyslexia-font", "reduce-motion", "high-contrast", "large-text"]);

  function storage() {
    try {
      return root.localStorage || null;
    } catch (_) {
      return null;
    }
  }

  function getString(key, fallback = "") {
    const store = storage();
    if (!store) return fallback;
    try {
      const value = store.getItem(key);
      return value === null ? fallback : value;
    } catch (_) {
      return fallback;
    }
  }

  function setString(key, value) {
    const store = storage();
    if (!store) return false;
    try {
      store.setItem(key, String(value));
      return true;
    } catch (_) {
      return false;
    }
  }

  function readJson(key, fallback) {
    const raw = getString(key, "");
    if (!raw) return fallback;
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    return setString(key, JSON.stringify(value));
  }

  function readToggle(key) {
    return getString(key, "0") === "1";
  }

  function writeToggle(key, enabled) {
    return setString(key, enabled ? "1" : "0");
  }

  function safeTheme(value, fallback = "auto") {
    return THEME_STATES.includes(value) ? value : fallback;
  }

  function nextTheme(current) {
    const safe = safeTheme(current);
    const index = THEME_STATES.indexOf(safe);
    return THEME_STATES[(index + 1) % THEME_STATES.length];
  }

  function safeLessonMode(value, fallback = "one-line") {
    return LESSON_MODE_STATES.includes(value) ? value : fallback;
  }

  function chromeToggleMap() {
    return {
      "learning-focus": KEYS.learningFocus,
      "top-chrome-collapsed": KEYS.topChromeCollapsed,
      "right-sidebar-collapsed": KEYS.rightSidebarCollapsed,
      "focus-top-collapsed": KEYS.learningFocusTopCollapsed,
    };
  }

  function profileGlobalKeys() {
    return [
      KEYS.profiles,
      KEYS.activeProfile,
      KEYS.theme,
      KEYS.a11y,
      KEYS.learningFocus,
      KEYS.bankVersion,
      KEYS.userId,
      KEYS.supabaseUrl,
      KEYS.supabaseAnonKey,
      KEYS.syncMeta,
    ];
  }

  root.LumenSettingsPreferences = {
    KEYS,
    THEME_STATES,
    THEME_ICONS,
    LESSON_MODE_STATES,
    VIEW_MODE_KEYS,
    A11Y_KEYS,
    getString,
    setString,
    readJson,
    writeJson,
    readToggle,
    writeToggle,
    safeTheme,
    nextTheme,
    safeLessonMode,
    chromeToggleMap,
    profileGlobalKeys,
  };
})();
