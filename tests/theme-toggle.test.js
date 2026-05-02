/**
 * Theme Toggle View Tests
 *
 * Verifies the extracted theme toggle module behaves identically to the
 * legacy in-app.js code. First view module test under WORLD1-B2.
 */

let createThemeToggle;
let applyThemeToDocument;
let updateToggleButton;
let nextTheme;
let readPersistedTheme;
let persistTheme;
let THEME_STATES;
let THEME_ICONS;
let THEME_STORAGE_KEY;

beforeAll(async () => {
  const mod = await import("../src/views/theme-toggle/theme-toggle.js");
  createThemeToggle = mod.createThemeToggle;
  applyThemeToDocument = mod.applyThemeToDocument;
  updateToggleButton = mod.updateToggleButton;
  nextTheme = mod.nextTheme;
  readPersistedTheme = mod.readPersistedTheme;
  persistTheme = mod.persistTheme;
  THEME_STATES = mod.THEME_STATES;
  THEME_ICONS = mod.THEME_ICONS;
  THEME_STORAGE_KEY = mod.THEME_STORAGE_KEY;
});

function fakeStorage() {
  const data = new Map();
  return {
    data,
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    clear: () => data.clear(),
  };
}

function fakeDocRoot() {
  const classes = new Set();
  return {
    classList: {
      add: (c) => classes.add(c),
      remove: (...cs) => cs.forEach((c) => classes.delete(c)),
      contains: (c) => classes.has(c),
      _all: () => Array.from(classes),
    },
  };
}

function fakeButton() {
  const attributes = new Map();
  const span = { textContent: "" };
  let clickHandler = null;
  return {
    querySelector: (sel) => (sel === "span" ? span : null),
    setAttribute: (k, v) => attributes.set(k, v),
    getAttribute: (k) => attributes.get(k),
    addEventListener: (event, fn) => {
      if (event === "click") clickHandler = fn;
    },
    removeEventListener: (event, fn) => {
      if (event === "click" && clickHandler === fn) clickHandler = null;
    },
    _click: () => {
      if (clickHandler) clickHandler();
    },
    _span: span,
    _attributes: attributes,
  };
}

describe("Theme Toggle — constants", () => {
  it("exports the cycle order auto → light → dark", () => {
    expect(THEME_STATES).toEqual(["auto", "light", "dark"]);
  });

  it("provides icons for each state", () => {
    expect(THEME_ICONS.auto).toBe("🌗");
    expect(THEME_ICONS.light).toBe("☀️");
    expect(THEME_ICONS.dark).toBe("🌙");
  });

  it("uses stable storage key", () => {
    expect(THEME_STORAGE_KEY).toBe("lumenportal:theme:v1");
  });
});

describe("Theme Toggle — pure helpers", () => {
  it("applyThemeToDocument removes both classes for auto", () => {
    const root = fakeDocRoot();
    root.classList.add("theme-light");
    applyThemeToDocument("auto", root);
    expect(root.classList.contains("theme-light")).toBe(false);
    expect(root.classList.contains("theme-dark")).toBe(false);
  });

  it("applyThemeToDocument adds theme-light only for light", () => {
    const root = fakeDocRoot();
    applyThemeToDocument("light", root);
    expect(root.classList.contains("theme-light")).toBe(true);
    expect(root.classList.contains("theme-dark")).toBe(false);
  });

  it("applyThemeToDocument adds theme-dark only for dark", () => {
    const root = fakeDocRoot();
    applyThemeToDocument("dark", root);
    expect(root.classList.contains("theme-light")).toBe(false);
    expect(root.classList.contains("theme-dark")).toBe(true);
  });

  it("nextTheme cycles auto → light → dark → auto", () => {
    expect(nextTheme("auto")).toBe("light");
    expect(nextTheme("light")).toBe("dark");
    expect(nextTheme("dark")).toBe("auto");
  });

  it("updateToggleButton updates icon span and aria-label", () => {
    const btn = fakeButton();
    updateToggleButton(btn, "dark");
    expect(btn._span.textContent).toBe("🌙");
    expect(btn._attributes.get("aria-label")).toContain("כהה");
  });

  it("updateToggleButton handles null button safely", () => {
    expect(() => updateToggleButton(null, "dark")).not.toThrow();
  });
});

describe("Theme Toggle — persistence", () => {
  it("readPersistedTheme returns auto when storage empty", () => {
    const storage = fakeStorage();
    expect(readPersistedTheme(storage)).toBe("auto");
  });

  it("readPersistedTheme returns saved value", () => {
    const storage = fakeStorage();
    storage.setItem(THEME_STORAGE_KEY, "dark");
    expect(readPersistedTheme(storage)).toBe("dark");
  });

  it("readPersistedTheme rejects invalid values and falls back to auto", () => {
    const storage = fakeStorage();
    storage.setItem(THEME_STORAGE_KEY, "rainbow");
    expect(readPersistedTheme(storage)).toBe("auto");
  });

  it("persistTheme writes valid themes", () => {
    const storage = fakeStorage();
    expect(persistTheme("dark", storage)).toBe(true);
    expect(storage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("persistTheme rejects invalid themes", () => {
    const storage = fakeStorage();
    expect(persistTheme("rainbow", storage)).toBe(false);
    expect(storage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });
});

describe("Theme Toggle — controller", () => {
  it("initializes from storage on creation", () => {
    const storage = fakeStorage();
    storage.setItem(THEME_STORAGE_KEY, "light");
    const docRoot = fakeDocRoot();
    const ctrl = createThemeToggle({ storage, docRoot });
    expect(ctrl.getTheme()).toBe("light");
  });

  it("defaults to auto when no saved theme", () => {
    const ctrl = createThemeToggle({
      storage: fakeStorage(),
      docRoot: fakeDocRoot(),
    });
    expect(ctrl.getTheme()).toBe("auto");
  });

  it("setTheme applies, persists, and notifies", () => {
    const storage = fakeStorage();
    const docRoot = fakeDocRoot();
    const ctrl = createThemeToggle({ storage, docRoot });

    const events = [];
    ctrl.onChange((t) => events.push(t));

    ctrl.setTheme("dark");

    expect(ctrl.getTheme()).toBe("dark");
    expect(docRoot.classList.contains("theme-dark")).toBe(true);
    expect(storage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(events).toEqual(["dark"]);
  });

  it("setTheme is idempotent — same theme triggers no change", () => {
    const ctrl = createThemeToggle({
      storage: fakeStorage(),
      docRoot: fakeDocRoot(),
    });
    const events = [];
    ctrl.onChange((t) => events.push(t));
    ctrl.setTheme("auto"); // already auto
    expect(events).toEqual([]);
  });

  it("setTheme rejects invalid theme silently", () => {
    const ctrl = createThemeToggle({
      storage: fakeStorage(),
      docRoot: fakeDocRoot(),
    });
    ctrl.setTheme("rainbow");
    expect(ctrl.getTheme()).toBe("auto");
  });

  it("cycle progresses auto → light → dark → auto", () => {
    const ctrl = createThemeToggle({
      storage: fakeStorage(),
      docRoot: fakeDocRoot(),
    });
    expect(ctrl.getTheme()).toBe("auto");
    ctrl.cycle();
    expect(ctrl.getTheme()).toBe("light");
    ctrl.cycle();
    expect(ctrl.getTheme()).toBe("dark");
    ctrl.cycle();
    expect(ctrl.getTheme()).toBe("auto");
  });

  it("mount wires click handler on button and shows current theme", () => {
    const storage = fakeStorage();
    storage.setItem(THEME_STORAGE_KEY, "light");
    const docRoot = fakeDocRoot();
    const ctrl = createThemeToggle({ storage, docRoot });

    const btn = fakeButton();
    ctrl.mount(btn);

    expect(btn._span.textContent).toBe("☀️");
    expect(docRoot.classList.contains("theme-light")).toBe(true);

    btn._click();
    expect(ctrl.getTheme()).toBe("dark");
    expect(btn._span.textContent).toBe("🌙");
  });

  it("destroy removes click listener and clears state", () => {
    const ctrl = createThemeToggle({
      storage: fakeStorage(),
      docRoot: fakeDocRoot(),
    });
    const btn = fakeButton();
    ctrl.mount(btn);
    ctrl.destroy();
    btn._click();
    expect(ctrl.getTheme()).toBe("auto");
  });

  it("isolates onChange listener errors", () => {
    const ctrl = createThemeToggle({
      storage: fakeStorage(),
      docRoot: fakeDocRoot(),
    });
    let secondFired = false;
    const originalError = console.error;
    console.error = () => {};
    ctrl.onChange(() => {
      throw new Error("boom");
    });
    ctrl.onChange(() => (secondFired = true));
    ctrl.setTheme("dark");
    console.error = originalError;
    expect(secondFired).toBe(true);
  });

  it("works without storage (graceful degradation)", () => {
    const docRoot = fakeDocRoot();
    const ctrl = createThemeToggle({ storage: null, docRoot });
    expect(() => ctrl.setTheme("dark")).not.toThrow();
    expect(ctrl.getTheme()).toBe("dark");
  });
});
