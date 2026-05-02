/**
 * Pocket State Tests — Pure data layer for the saved-concepts panel
 *
 * Verifies the extracted state logic from app.js's Pocket Concept Card
 * (lines 7445-7566) under WORLD1-B2.
 */

let pocketKey;
let parsePocketKey;
let loadPocket;
let savePocket;
let togglePocketKey;
let removePocketKey;
let isPocketed;
let resolvePocketEntry;
let createPocketStore;
let POCKET_STORAGE_KEY;

beforeAll(async () => {
  const mod = await import("../src/views/pocket-concept-card/pocket-state.js");
  pocketKey = mod.pocketKey;
  parsePocketKey = mod.parsePocketKey;
  loadPocket = mod.loadPocket;
  savePocket = mod.savePocket;
  togglePocketKey = mod.togglePocketKey;
  removePocketKey = mod.removePocketKey;
  isPocketed = mod.isPocketed;
  resolvePocketEntry = mod.resolvePocketEntry;
  createPocketStore = mod.createPocketStore;
  POCKET_STORAGE_KEY = mod.POCKET_STORAGE_KEY;
});

function fakeStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    clear: () => data.clear(),
  };
}

describe("Pocket key helpers", () => {
  it("pocketKey joins lessonId and conceptName with ::", () => {
    expect(pocketKey("lesson_11", "Array")).toBe("lesson_11::Array");
  });

  it("parsePocketKey splits valid keys", () => {
    expect(parsePocketKey("lesson_11::Array")).toEqual(["lesson_11", "Array"]);
  });

  it("parsePocketKey handles concept names containing ::", () => {
    // The separator is the FIRST occurrence — concept may contain :: itself
    expect(parsePocketKey("lesson_11::name::with::colons")).toEqual([
      "lesson_11",
      "name::with::colons",
    ]);
  });

  it("parsePocketKey returns null for malformed input", () => {
    expect(parsePocketKey("missing-separator")).toBeNull();
    expect(parsePocketKey(null)).toBeNull();
    expect(parsePocketKey(undefined)).toBeNull();
    expect(parsePocketKey(42)).toBeNull();
  });
});

describe("Pocket storage", () => {
  it("loadPocket returns [] when storage is empty", () => {
    expect(loadPocket(fakeStorage())).toEqual([]);
  });

  it("loadPocket returns parsed array", () => {
    const storage = fakeStorage({
      [POCKET_STORAGE_KEY]: JSON.stringify(["a::b", "c::d"]),
    });
    expect(loadPocket(storage)).toEqual(["a::b", "c::d"]);
  });

  it("loadPocket returns [] for invalid JSON", () => {
    const storage = fakeStorage({ [POCKET_STORAGE_KEY]: "not valid json" });
    expect(loadPocket(storage)).toEqual([]);
  });

  it("loadPocket filters non-strings from corrupt arrays", () => {
    const storage = fakeStorage({
      [POCKET_STORAGE_KEY]: JSON.stringify(["a::b", 42, null, "c::d"]),
    });
    expect(loadPocket(storage)).toEqual(["a::b", "c::d"]);
  });

  it("loadPocket returns [] when stored value is not an array", () => {
    const storage = fakeStorage({
      [POCKET_STORAGE_KEY]: JSON.stringify({ not: "array" }),
    });
    expect(loadPocket(storage)).toEqual([]);
  });

  it("savePocket writes JSON array to storage", () => {
    const storage = fakeStorage();
    expect(savePocket(["a::b"], storage)).toBe(true);
    expect(storage.getItem(POCKET_STORAGE_KEY)).toBe(JSON.stringify(["a::b"]));
  });

  it("savePocket rejects non-array input", () => {
    const storage = fakeStorage();
    expect(savePocket("not array", storage)).toBe(false);
  });

  it("savePocket strips non-strings before writing", () => {
    const storage = fakeStorage();
    savePocket(["a::b", 42, "c::d"], storage);
    expect(storage.getItem(POCKET_STORAGE_KEY)).toBe(
      JSON.stringify(["a::b", "c::d"])
    );
  });

  it("loadPocket/savePocket gracefully degrade without storage", () => {
    expect(loadPocket(null)).toEqual([]);
    expect(savePocket(["a::b"], null)).toBe(false);
  });
});

describe("Pocket pure operations", () => {
  it("togglePocketKey adds when missing", () => {
    expect(togglePocketKey([], "a::b")).toEqual(["a::b"]);
  });

  it("togglePocketKey removes when present", () => {
    expect(togglePocketKey(["a::b", "c::d"], "a::b")).toEqual(["c::d"]);
  });

  it("togglePocketKey is pure — does not mutate input", () => {
    const items = ["a::b"];
    togglePocketKey(items, "c::d");
    expect(items).toEqual(["a::b"]);
  });

  it("togglePocketKey ignores invalid keys", () => {
    const items = ["a::b"];
    expect(togglePocketKey(items, "")).toEqual(["a::b"]);
    expect(togglePocketKey(items, null)).toEqual(["a::b"]);
  });

  it("removePocketKey returns new array without the key", () => {
    expect(removePocketKey(["a::b", "c::d"], "a::b")).toEqual(["c::d"]);
  });

  it("removePocketKey is a no-op for missing keys", () => {
    expect(removePocketKey(["a::b"], "missing")).toEqual(["a::b"]);
  });

  it("isPocketed checks membership", () => {
    expect(isPocketed(["a::b"], "a::b")).toBe(true);
    expect(isPocketed(["a::b"], "c::d")).toBe(false);
    expect(isPocketed(null, "a::b")).toBe(false);
  });
});

describe("Pocket entry resolution", () => {
  const lessons = [
    {
      id: "lesson_11",
      title: "Lesson 11 — Arrays",
      concepts: [
        { conceptName: "Array", levels: ["grandma view", "child view"] },
        { conceptName: "filter", levels: ["..."] },
      ],
    },
    {
      id: "lesson_13",
      title: "Lesson 13 — DOM",
      concepts: [{ conceptName: "querySelector", levels: ["..."] }],
    },
  ];

  it("resolves valid keys to lesson + concept", () => {
    const result = resolvePocketEntry("lesson_11::Array", lessons);
    expect(result.lesson.id).toBe("lesson_11");
    expect(result.concept.conceptName).toBe("Array");
    expect(result.key).toBe("lesson_11::Array");
  });

  it("returns null for unknown lesson", () => {
    expect(resolvePocketEntry("missing::Array", lessons)).toBeNull();
  });

  it("returns null for unknown concept", () => {
    expect(resolvePocketEntry("lesson_11::missing", lessons)).toBeNull();
  });

  it("returns null for malformed key", () => {
    expect(resolvePocketEntry("malformed", lessons)).toBeNull();
  });

  it("returns null when lessons list is invalid", () => {
    expect(resolvePocketEntry("lesson_11::Array", null)).toBeNull();
    expect(resolvePocketEntry("lesson_11::Array", "not-array")).toBeNull();
  });
});

describe("createPocketStore — controller", () => {
  it("initializes from storage", () => {
    const storage = fakeStorage({
      [POCKET_STORAGE_KEY]: JSON.stringify(["a::b"]),
    });
    const store = createPocketStore({ storage });
    expect(store.list()).toEqual(["a::b"]);
  });

  it("add appends and persists", () => {
    const storage = fakeStorage();
    const store = createPocketStore({ storage });
    store.add("a::b");
    expect(store.list()).toEqual(["a::b"]);
    expect(JSON.parse(storage.getItem(POCKET_STORAGE_KEY))).toEqual(["a::b"]);
  });

  it("add is idempotent for duplicates", () => {
    const store = createPocketStore({ storage: fakeStorage() });
    store.add("a::b");
    store.add("a::b");
    expect(store.list()).toEqual(["a::b"]);
  });

  it("remove deletes and persists", () => {
    const storage = fakeStorage({
      [POCKET_STORAGE_KEY]: JSON.stringify(["a::b", "c::d"]),
    });
    const store = createPocketStore({ storage });
    store.remove("a::b");
    expect(store.list()).toEqual(["c::d"]);
  });

  it("remove is no-op for missing keys", () => {
    const store = createPocketStore({ storage: fakeStorage() });
    let calls = 0;
    store.subscribe(() => calls++);
    store.remove("missing");
    expect(calls).toBe(0);
  });

  it("toggle flips membership", () => {
    const store = createPocketStore({ storage: fakeStorage() });
    store.toggle("a::b");
    expect(store.has("a::b")).toBe(true);
    store.toggle("a::b");
    expect(store.has("a::b")).toBe(false);
  });

  it("clear empties everything", () => {
    const storage = fakeStorage({
      [POCKET_STORAGE_KEY]: JSON.stringify(["a::b", "c::d"]),
    });
    const store = createPocketStore({ storage });
    store.clear();
    expect(store.list()).toEqual([]);
  });

  it("subscribe fires on every change with snapshot", () => {
    const store = createPocketStore({ storage: fakeStorage() });
    const events = [];
    store.subscribe((items) => events.push(items));
    store.add("a::b");
    store.add("c::d");
    store.remove("a::b");
    expect(events).toEqual([["a::b"], ["a::b", "c::d"], ["c::d"]]);
  });

  it("subscribers get independent copies (not shared refs)", () => {
    const store = createPocketStore({ storage: fakeStorage() });
    let captured;
    store.subscribe((items) => (captured = items));
    store.add("a::b");
    captured.push("mutated");
    expect(store.list()).toEqual(["a::b"]); // not affected
  });

  it("unsubscribe stops notifications", () => {
    const store = createPocketStore({ storage: fakeStorage() });
    let calls = 0;
    const unsub = store.subscribe(() => calls++);
    store.add("a::b");
    unsub();
    store.add("c::d");
    expect(calls).toBe(1);
  });

  it("isolates subscriber errors", () => {
    const store = createPocketStore({ storage: fakeStorage() });
    let secondFired = false;
    const originalError = console.error;
    console.error = () => {};
    store.subscribe(() => {
      throw new Error("boom");
    });
    store.subscribe(() => (secondFired = true));
    store.add("a::b");
    console.error = originalError;
    expect(secondFired).toBe(true);
  });

  it("reload reads fresh from storage", () => {
    const storage = fakeStorage();
    const store = createPocketStore({ storage });
    expect(store.list()).toEqual([]);

    // External update (e.g., another tab)
    storage.setItem(POCKET_STORAGE_KEY, JSON.stringify(["x::y"]));
    store.reload();
    expect(store.list()).toEqual(["x::y"]);
  });
});
