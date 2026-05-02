// Auto-pocket-on-failure logic verification.
// Mirrors the implementation in app.js (initPocket IIFE) to test it in isolation.

// Vitest globals (describe/it/expect/beforeEach) are available without import.

const POCKET_KEY = "lumenportal:pocket:v1";
const POCKET_AUTO_KEY = "lumenportal:pocket:autoAdded:v1";
const POCKET_DISMISSED_KEY = "lumenportal:pocket:dismissed:v1";
const POCKET_STREAK_KEY = "lumenportal:pocket:correctStreak:v1";
const POCKET_PROOF_THRESHOLD = 2;

function makeStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    clear: () => data.clear(),
  };
}

function makePocket(localStorage) {
  function load() {
    try { return JSON.parse(localStorage.getItem(POCKET_KEY) || "[]"); } catch (_) { return []; }
  }
  function save(arr) { localStorage.setItem(POCKET_KEY, JSON.stringify(arr)); }
  function loadStringSet(key) {
    try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); } catch (_) { return new Set(); }
  }
  function saveStringSet(key, set) { localStorage.setItem(key, JSON.stringify(Array.from(set))); }
  function loadStreaks() {
    try { return JSON.parse(localStorage.getItem(POCKET_STREAK_KEY) || "{}"); } catch (_) { return {}; }
  }
  function saveStreaks(map) { localStorage.setItem(POCKET_STREAK_KEY, JSON.stringify(map)); }

  function pocketToggle(key) {
    const items = load();
    const idx = items.indexOf(key);
    const auto = loadStringSet(POCKET_AUTO_KEY);
    const dismissed = loadStringSet(POCKET_DISMISSED_KEY);
    if (idx === -1) {
      items.push(key);
      dismissed.delete(key);
    } else {
      items.splice(idx, 1);
      dismissed.add(key);
      auto.delete(key);
    }
    save(items);
    saveStringSet(POCKET_AUTO_KEY, auto);
    saveStringSet(POCKET_DISMISSED_KEY, dismissed);
  }

  function pocketAutoSync(key, correct) {
    if (!key || typeof key !== "string") return;
    const items = load();
    const auto = loadStringSet(POCKET_AUTO_KEY);
    const dismissed = loadStringSet(POCKET_DISMISSED_KEY);
    const streaks = loadStreaks();
    if (!correct) {
      if (streaks[key]) delete streaks[key];
      if (!items.includes(key) && !dismissed.has(key)) {
        items.push(key);
        auto.add(key);
      }
    } else if (auto.has(key) && items.includes(key)) {
      streaks[key] = (streaks[key] || 0) + 1;
      if (streaks[key] >= POCKET_PROOF_THRESHOLD) {
        const i = items.indexOf(key);
        if (i !== -1) items.splice(i, 1);
        auto.delete(key);
        delete streaks[key];
      }
    }
    save(items);
    saveStringSet(POCKET_AUTO_KEY, auto);
    saveStringSet(POCKET_DISMISSED_KEY, dismissed);
    saveStreaks(streaks);
  }

  return { load, loadStringSet, loadStreaks, pocketToggle, pocketAutoSync };
}

describe("auto-pocket-on-failure", () => {
  let storage;
  let pocket;
  beforeEach(() => {
    storage = makeStorage();
    pocket = makePocket(storage);
  });

  it("adds a failed concept to the pocket and marks it as auto-added", () => {
    pocket.pocketAutoSync("lesson_19::closure", false);
    expect(pocket.load()).toEqual(["lesson_19::closure"]);
    expect(pocket.loadStringSet(POCKET_AUTO_KEY).has("lesson_19::closure")).toBe(true);
  });

  it("does not duplicate when failed twice in a row", () => {
    pocket.pocketAutoSync("lesson_19::closure", false);
    pocket.pocketAutoSync("lesson_19::closure", false);
    expect(pocket.load()).toEqual(["lesson_19::closure"]);
  });

  it("requires two consecutive correct answers to remove an auto-added concept", () => {
    pocket.pocketAutoSync("lesson_19::closure", false);
    pocket.pocketAutoSync("lesson_19::closure", true);
    expect(pocket.load()).toEqual(["lesson_19::closure"]); // still pocketed (1 correct, need 2)
    expect(pocket.loadStreaks()["lesson_19::closure"]).toBe(1);
    pocket.pocketAutoSync("lesson_19::closure", true);
    expect(pocket.load()).toEqual([]); // removed
    expect(pocket.loadStringSet(POCKET_AUTO_KEY).has("lesson_19::closure")).toBe(false);
    expect(pocket.loadStreaks()["lesson_19::closure"]).toBeUndefined();
  });

  it("resets the proof streak when the student fails again mid-streak", () => {
    pocket.pocketAutoSync("lesson_19::closure", false); // pocket
    pocket.pocketAutoSync("lesson_19::closure", true);  // streak 1
    pocket.pocketAutoSync("lesson_19::closure", false); // streak reset
    expect(pocket.load()).toEqual(["lesson_19::closure"]);
    expect(pocket.loadStreaks()["lesson_19::closure"]).toBeUndefined();
    pocket.pocketAutoSync("lesson_19::closure", true);
    expect(pocket.load()).toEqual(["lesson_19::closure"]); // not removed yet
  });

  it("does not auto-re-add a concept the user manually removed (dismissal)", () => {
    pocket.pocketAutoSync("lesson_19::closure", false); // pocket
    pocket.pocketToggle("lesson_19::closure");          // user removes manually
    expect(pocket.load()).toEqual([]);
    expect(pocket.loadStringSet(POCKET_DISMISSED_KEY).has("lesson_19::closure")).toBe(true);
    pocket.pocketAutoSync("lesson_19::closure", false); // fail again — should NOT re-add
    expect(pocket.load()).toEqual([]);
  });

  it("clears dismissal if the user manually adds the concept back", () => {
    pocket.pocketAutoSync("lesson_19::closure", false);
    pocket.pocketToggle("lesson_19::closure"); // dismiss
    pocket.pocketToggle("lesson_19::closure"); // manual add
    expect(pocket.load()).toEqual(["lesson_19::closure"]);
    expect(pocket.loadStringSet(POCKET_DISMISSED_KEY).has("lesson_19::closure")).toBe(false);
  });

  it("does not auto-remove a manually-pocketed concept on correct streak", () => {
    pocket.pocketToggle("lesson_19::closure"); // user manually pockets
    pocket.pocketAutoSync("lesson_19::closure", true);
    pocket.pocketAutoSync("lesson_19::closure", true);
    pocket.pocketAutoSync("lesson_19::closure", true);
    expect(pocket.load()).toEqual(["lesson_19::closure"]); // stays
  });
});
