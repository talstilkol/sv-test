/**
 * Theme Toggle View — Light / Dark / Auto cycle
 *
 * Extracted from app.js (lines 7403-7444) as part of WORLD1-B2:
 * Modularization Phase B. First view module demonstrating the
 * extraction pattern.
 *
 * Pattern:
 *   - Pure function: createThemeToggle(deps) returns { mount, applyTheme, getTheme }
 *   - Dependencies injected (storage, document) for testability
 *   - No window globals — works with state store or local state
 *   - Same DOM contract as legacy app.js code (data-attribute hooks)
 *
 * Usage:
 *   import { createThemeToggle } from './views/theme-toggle/theme-toggle.js';
 *   const toggle = createThemeToggle();
 *   toggle.mount(document.getElementById('theme-toggle'));
 */

export const THEME_STATES = ["auto", "light", "dark"];
export const THEME_ICONS = { auto: "🌗", light: "☀️", dark: "🌙" };
export const THEME_STORAGE_KEY = "lumenportal:theme:v1";

const ARIA_LABELS = {
  auto: "מצב תצוגה: אוטומטי (לחץ למעבר לבהיר)",
  light: "מצב תצוגה: בהיר (לחץ למעבר לכהה)",
  dark: "מצב תצוגה: כהה (לחץ למעבר לאוטומטי)",
};

/**
 * Apply theme to a document root.
 * Pure function - removes light/dark classes and adds the matching one.
 */
export function applyThemeToDocument(theme, docRoot = document.documentElement) {
  docRoot.classList.remove("theme-light", "theme-dark");
  if (theme === "light") docRoot.classList.add("theme-light");
  if (theme === "dark") docRoot.classList.add("theme-dark");
}

/**
 * Update toggle button UI to reflect current theme.
 * Pure function - mutates only the passed button element.
 */
export function updateToggleButton(button, theme) {
  if (!button) return;
  const span = button.querySelector("span");
  if (span) span.textContent = THEME_ICONS[theme] || THEME_ICONS.auto;
  button.setAttribute("aria-label", ARIA_LABELS[theme] || ARIA_LABELS.auto);
}

/**
 * Cycle to next theme in [auto → light → dark → auto] order.
 */
export function nextTheme(current) {
  const idx = THEME_STATES.indexOf(current);
  return THEME_STATES[(idx + 1) % THEME_STATES.length];
}

/**
 * Read persisted theme from storage. Returns "auto" if missing/invalid.
 */
export function readPersistedTheme(storage = safeStorage()) {
  try {
    const saved = storage?.getItem(THEME_STORAGE_KEY);
    if (saved && THEME_STATES.includes(saved)) return saved;
  } catch (_) {
    // storage may be disabled in some browsers
  }
  return "auto";
}

/**
 * Persist theme to storage. Returns true on success.
 */
export function persistTheme(theme, storage = safeStorage()) {
  if (!THEME_STATES.includes(theme)) return false;
  try {
    storage?.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch (_) {
    return false;
  }
}

function safeStorage() {
  try {
    return typeof localStorage !== "undefined" ? localStorage : null;
  } catch (_) {
    return null;
  }
}

/**
 * Factory for the theme toggle controller.
 *
 * @param {object} [deps]
 * @param {Storage} [deps.storage] - localStorage-compatible storage
 * @param {HTMLElement} [deps.docRoot] - document root for theme classes
 * @returns Controller with { mount, getTheme, setTheme, cycle, destroy }
 */
export function createThemeToggle(deps = {}) {
  const storage = deps.storage ?? safeStorage();
  const docRoot =
    deps.docRoot ??
    (typeof document !== "undefined" ? document.documentElement : null);

  let currentTheme = readPersistedTheme(storage);
  let button = null;
  let clickHandler = null;
  const listeners = new Set();

  function setTheme(theme) {
    if (!THEME_STATES.includes(theme)) return;
    if (theme === currentTheme) return;
    currentTheme = theme;
    if (docRoot) applyThemeToDocument(currentTheme, docRoot);
    updateToggleButton(button, currentTheme);
    persistTheme(currentTheme, storage);
    for (const fn of listeners) {
      try {
        fn(currentTheme);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[theme-toggle] listener threw:", err);
      }
    }
  }

  function cycle() {
    setTheme(nextTheme(currentTheme));
  }

  function mount(buttonElement) {
    if (!buttonElement) return;
    button = buttonElement;
    if (docRoot) applyThemeToDocument(currentTheme, docRoot);
    updateToggleButton(button, currentTheme);
    clickHandler = () => cycle();
    button.addEventListener("click", clickHandler);
  }

  function destroy() {
    if (button && clickHandler) {
      button.removeEventListener("click", clickHandler);
    }
    button = null;
    clickHandler = null;
    listeners.clear();
  }

  function onChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return {
    mount,
    destroy,
    cycle,
    setTheme,
    getTheme: () => currentTheme,
    onChange,
  };
}
