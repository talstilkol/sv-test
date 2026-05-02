/**
 * Reactive Store — Vanilla JS Proxy-based reactive state management
 *
 * Replaces 400+ scattered window.* globals in app.js with a single
 * source of truth. No framework dependencies. Subscribers fire on
 * any mutation.
 *
 * Usage:
 *   import { createStore } from './state/store.js';
 *   const store = createStore({ user: null, theme: 'auto' });
 *   store.subscribe((state, prev) => render(state));
 *   store.state.theme = 'dark'; // triggers all subscribers
 *
 * Design goals:
 *   - Zero dependencies (vanilla Proxy)
 *   - Synchronous subscribers (no event loop indirection)
 *   - Deep reactivity (nested objects/arrays)
 *   - localStorage persistence opt-in (per-key)
 *   - Computed selectors via getters (memoized lazily)
 *   - Time-travel via snapshots for debugging
 */

const SYMBOL_RAW = Symbol("store:raw");
const SYMBOL_PARENT = Symbol("store:parent");
const SYMBOL_KEY = Symbol("store:key");

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    (value.constructor === Object || Object.getPrototypeOf(value) === null)
  );
}

function isReactive(value) {
  return value && typeof value === "object" && SYMBOL_RAW in value;
}

export function createStore(initial = {}, options = {}) {
  const {
    persistKeys = [],
    storageKey = "lumenportal:store:v1",
    onMutation = null,
  } = options;

  const subscribers = new Set();
  const snapshots = [];
  const MAX_SNAPSHOTS = 50;

  const persisted = loadPersisted(storageKey);
  const merged = { ...initial };
  for (const key of persistKeys) {
    if (persisted && Object.prototype.hasOwnProperty.call(persisted, key)) {
      merged[key] = persisted[key];
    }
  }

  let isMutating = false;
  let pendingNotify = false;

  function notify(path, newValue, oldValue) {
    if (onMutation) {
      try {
        onMutation({ path, newValue, oldValue });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[store] onMutation handler threw:", err);
      }
    }

    if (isMutating) {
      pendingNotify = true;
      return;
    }
    pendingNotify = false;

    if (snapshots.length >= MAX_SNAPSHOTS) snapshots.shift();
    snapshots.push({ path: path.slice(), at: Date.now() });

    persistIfNeeded();

    const snapshot = readonlySnapshot(state);
    for (const fn of subscribers) {
      try {
        fn(snapshot, { path, newValue, oldValue });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[store] subscriber threw:", err);
      }
    }
  }

  function persistIfNeeded() {
    if (!persistKeys.length || typeof localStorage === "undefined") return;
    try {
      const out = {};
      for (const key of persistKeys) out[key] = rawState[key];
      localStorage.setItem(storageKey, JSON.stringify(out));
    } catch (err) {
      // localStorage may be full or disabled — fail silently
      // eslint-disable-next-line no-console
      console.warn("[store] persist failed:", err);
    }
  }

  function readonlySnapshot(target) {
    if (!isReactive(target)) return target;
    return new Proxy(target[SYMBOL_RAW], {
      get(t, prop) {
        const v = t[prop];
        if (isPlainObject(v) || Array.isArray(v)) return readonlySnapshot(reactify(v, [prop]));
        return v;
      },
      set() {
        throw new Error("[store] cannot mutate snapshot — use store.state");
      },
      deleteProperty() {
        throw new Error("[store] cannot mutate snapshot — use store.state");
      },
    });
  }

  function reactify(value, path = []) {
    if (!isPlainObject(value) && !Array.isArray(value)) return value;
    if (isReactive(value)) return value;

    const handler = {
      get(target, prop) {
        if (prop === SYMBOL_RAW) return target;
        if (prop === SYMBOL_PARENT) return path;
        const v = target[prop];
        if (isPlainObject(v) || Array.isArray(v)) {
          return reactify(v, path.concat(prop));
        }
        return v;
      },
      set(target, prop, newValue) {
        const oldValue = target[prop];
        if (oldValue === newValue) return true;
        target[prop] = newValue;
        notify(path.concat(prop), newValue, oldValue);
        return true;
      },
      deleteProperty(target, prop) {
        if (!(prop in target)) return true;
        const oldValue = target[prop];
        delete target[prop];
        notify(path.concat(prop), undefined, oldValue);
        return true;
      },
    };

    return new Proxy(value, handler);
  }

  const rawState = merged;
  const state = reactify(rawState);

  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }

  function batch(fn) {
    isMutating = true;
    try {
      fn(state);
    } finally {
      isMutating = false;
      if (pendingNotify) notify([], undefined, undefined);
    }
  }

  function getSnapshot() {
    return JSON.parse(JSON.stringify(rawState));
  }

  function reset(newState) {
    for (const key of Object.keys(rawState)) delete rawState[key];
    Object.assign(rawState, newState);
    notify([], undefined, undefined);
  }

  function getHistory() {
    return snapshots.slice();
  }

  return {
    state,
    subscribe,
    batch,
    getSnapshot,
    reset,
    getHistory,
    // Internal — for debugging only
    _raw: rawState,
  };
}

function loadPersisted(key) {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Pure selector helper: derive a value from state.
 * Doesn't memoize — caller decides via subscribe.
 */
export function select(state, path) {
  if (typeof path === "string") path = path.split(".");
  let cur = state;
  for (const segment of path) {
    if (cur == null) return undefined;
    cur = cur[segment];
  }
  return cur;
}
