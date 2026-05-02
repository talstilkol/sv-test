/**
 * State Store Tests — Reactive Proxy-based store
 *
 * Verifies the contract for the centralized state layer that will replace
 * 400+ scattered window.* globals in app.js as part of WORLD1-B1.
 */

let createStore, select;

beforeAll(async () => {
  const mod = await import("../src/state/store.js");
  createStore = mod.createStore;
  select = mod.select;
});

describe("createStore — basic reactivity", () => {
  it("creates a store with initial state", () => {
    const store = createStore({ count: 0 });
    expect(store.state.count).toBe(0);
  });

  it("notifies subscribers on mutation", () => {
    const store = createStore({ count: 0 });
    const calls = [];
    store.subscribe((snapshot, change) => {
      calls.push({ count: snapshot.count, path: change.path });
    });
    store.state.count = 5;
    expect(calls).toHaveLength(1);
    expect(calls[0].count).toBe(5);
    expect(calls[0].path).toEqual(["count"]);
  });

  it("does not notify when value is unchanged", () => {
    const store = createStore({ count: 0 });
    let calls = 0;
    store.subscribe(() => calls++);
    store.state.count = 0;
    expect(calls).toBe(0);
  });

  it("supports unsubscribe", () => {
    const store = createStore({ count: 0 });
    let calls = 0;
    const unsubscribe = store.subscribe(() => calls++);
    store.state.count = 1;
    unsubscribe();
    store.state.count = 2;
    expect(calls).toBe(1);
  });
});

describe("createStore — deep reactivity", () => {
  it("notifies on nested object mutations", () => {
    const store = createStore({ user: { name: "Tal", age: 25 } });
    const calls = [];
    store.subscribe((_, change) => calls.push(change.path));
    store.state.user.age = 26;
    expect(calls).toContainEqual(["user", "age"]);
  });

  it("notifies on array mutations", () => {
    const store = createStore({ items: [] });
    const calls = [];
    store.subscribe((_, change) => calls.push(change));
    store.state.items.push("apple");
    expect(calls.length).toBeGreaterThan(0);
  });

  it("notifies on property deletion", () => {
    const store = createStore({ user: { name: "Tal", temp: "value" } });
    const calls = [];
    store.subscribe((_, change) => calls.push(change));
    delete store.state.user.temp;
    expect(calls).toHaveLength(1);
    expect(calls[0].path).toEqual(["user", "temp"]);
    expect(calls[0].oldValue).toBe("value");
  });
});

describe("createStore — batch", () => {
  it("defers notifications until batch completes", () => {
    const store = createStore({ a: 0, b: 0 });
    let calls = 0;
    store.subscribe(() => calls++);

    store.batch((state) => {
      state.a = 1;
      state.b = 2;
    });

    expect(calls).toBe(1);
    expect(store.state.a).toBe(1);
    expect(store.state.b).toBe(2);
  });
});

describe("createStore — snapshots", () => {
  it("returns deep-cloned snapshots", () => {
    const store = createStore({ user: { name: "Tal" } });
    const snap = store.getSnapshot();
    snap.user.name = "Modified";
    expect(store.state.user.name).toBe("Tal");
  });

  it("tracks mutation history", () => {
    const store = createStore({ a: 0 });
    store.state.a = 1;
    store.state.a = 2;
    const history = store.getHistory();
    expect(history.length).toBe(2);
    expect(history[0].path).toEqual(["a"]);
  });
});

describe("createStore — reset", () => {
  it("replaces state and notifies", () => {
    const store = createStore({ a: 1, b: 2 });
    let called = false;
    store.subscribe(() => (called = true));
    store.reset({ x: 10 });
    expect(store.state.x).toBe(10);
    expect(store.state.a).toBeUndefined();
    expect(called).toBe(true);
  });
});

describe("createStore — onMutation hook", () => {
  it("fires onMutation for every change", () => {
    const events = [];
    const store = createStore(
      { count: 0 },
      { onMutation: (e) => events.push(e) }
    );
    store.state.count = 1;
    expect(events).toHaveLength(1);
    expect(events[0].newValue).toBe(1);
    expect(events[0].oldValue).toBe(0);
  });
});

describe("select helper", () => {
  it("traverses string paths", () => {
    const state = { a: { b: { c: 42 } } };
    expect(select(state, "a.b.c")).toBe(42);
  });

  it("traverses array paths", () => {
    const state = { a: { b: { c: 42 } } };
    expect(select(state, ["a", "b", "c"])).toBe(42);
  });

  it("returns undefined for missing paths safely", () => {
    const state = { a: {} };
    expect(select(state, "a.b.c")).toBeUndefined();
  });
});

describe("createStore — snapshot independence", () => {
  it("getSnapshot returns a deep clone (not a reference)", () => {
    const store = createStore({ user: { name: "Tal", tags: ["a", "b"] } });
    const snap = store.getSnapshot();
    snap.user.name = "Modified";
    snap.user.tags.push("c");
    expect(store.state.user.name).toBe("Tal");
    expect(store.state.user.tags).toHaveLength(2);
  });
});

describe("createStore — error handling", () => {
  it("isolates subscriber errors so other subscribers still fire", () => {
    const store = createStore({ count: 0 });
    let secondFired = false;
    const originalError = console.error;
    console.error = () => {}; // suppress for test
    store.subscribe(() => {
      throw new Error("boom");
    });
    store.subscribe(() => (secondFired = true));
    store.state.count = 1;
    console.error = originalError;
    expect(secondFired).toBe(true);
  });
});
