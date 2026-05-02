/**
 * Pocket Concept Card — State Layer
 *
 * Pure data logic for the "saved concepts" panel. Extracted from
 * app.js (lines 7445-7566) as part of WORLD1-B2.
 *
 * Concepts are stored as keys: "lessonId::conceptName".
 * The state layer is decoupled from DOM rendering, which lives in
 * pocket-view.js. This makes the logic testable without happy-dom.
 *
 * Storage contract:
 *   localStorage["lumenportal:pocket:v1"] = JSON.stringify(["l11::Array", ...])
 */

export const POCKET_STORAGE_KEY = "lumenportal:pocket:v1";
export const POCKET_KEY_SEPARATOR = "::";

/**
 * Build a pocket key from lessonId + conceptName.
 */
export function pocketKey(lessonId, conceptName) {
  return `${lessonId}${POCKET_KEY_SEPARATOR}${conceptName}`;
}

/**
 * Parse a pocket key into [lessonId, conceptName].
 * Returns null if malformed.
 */
export function parsePocketKey(key) {
  if (typeof key !== "string") return null;
  const idx = key.indexOf(POCKET_KEY_SEPARATOR);
  if (idx === -1) return null;
  return [
    key.slice(0, idx),
    key.slice(idx + POCKET_KEY_SEPARATOR.length),
  ];
}

/**
 * Load saved pocket items from storage.
 * Returns [] for missing/invalid data — never throws.
 */
export function loadPocket(storage = safeStorage()) {
  if (!storage) return [];
  try {
    const raw = storage.getItem(POCKET_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x === "string");
  } catch (_) {
    return [];
  }
}

/**
 * Persist pocket items to storage.
 * Returns true on success, false otherwise.
 */
export function savePocket(items, storage = safeStorage()) {
  if (!storage) return false;
  if (!Array.isArray(items)) return false;
  try {
    const cleaned = items.filter((x) => typeof x === "string");
    storage.setItem(POCKET_STORAGE_KEY, JSON.stringify(cleaned));
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Toggle membership of a key in the pocket. Returns the new array.
 * Pure function — does not mutate the input.
 */
export function togglePocketKey(items, key) {
  if (typeof key !== "string" || !key) return items.slice();
  const idx = items.indexOf(key);
  if (idx === -1) return items.concat([key]);
  return items.filter((x) => x !== key);
}

/**
 * Remove a key from the pocket. Returns the new array.
 */
export function removePocketKey(items, key) {
  return items.filter((x) => x !== key);
}

/**
 * Check whether a key is currently saved.
 */
export function isPocketed(items, key) {
  return Array.isArray(items) && items.includes(key);
}

/**
 * Resolve a pocket key against a lessons-data tree.
 * Returns { lesson, concept, key } or null if missing.
 *
 * @param {string} key
 * @param {Array} lessons - LESSONS_DATA shape
 */
export function resolvePocketEntry(key, lessons) {
  const parts = parsePocketKey(key);
  if (!parts) return null;
  const [lessonId, conceptName] = parts;
  if (!Array.isArray(lessons)) return null;
  const lesson = lessons.find((l) => l && l.id === lessonId);
  if (!lesson || !Array.isArray(lesson.concepts)) return null;
  const concept = lesson.concepts.find((c) => c && c.conceptName === conceptName);
  if (!concept) return null;
  return { lesson, concept, key };
}

/**
 * Build a controller around an in-memory copy of pocket state.
 * Backed by storage. Notifies subscribers on every mutation.
 */
export function createPocketStore(deps = {}) {
  const storage = deps.storage ?? safeStorage();
  let items = loadPocket(storage);
  const subscribers = new Set();

  function emit() {
    for (const fn of subscribers) {
      try {
        fn(items.slice());
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[pocket-store] subscriber threw:", err);
      }
    }
  }

  function set(next) {
    items = next.slice();
    savePocket(items, storage);
    emit();
  }

  return {
    list: () => items.slice(),
    has: (key) => isPocketed(items, key),
    add: (key) => {
      if (isPocketed(items, key)) return;
      set(items.concat([key]));
    },
    remove: (key) => {
      if (!isPocketed(items, key)) return;
      set(removePocketKey(items, key));
    },
    toggle: (key) => set(togglePocketKey(items, key)),
    clear: () => set([]),
    subscribe: (fn) => {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
    reload: () => {
      items = loadPocket(storage);
      emit();
    },
  };
}

function safeStorage() {
  try {
    return typeof localStorage !== "undefined" ? localStorage : null;
  } catch (_) {
    return null;
  }
}
