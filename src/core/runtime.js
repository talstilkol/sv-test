export const LUMEN_RUNTIME = Object.freeze({
  appName: "LumenPortal",
  bootstrap: "vite-static",
  legacyShell: true,
});

export function exposeRuntimeInfo(target = globalThis) {
  if (!target) return;
  target.LUMEN_BOOTSTRAP = Object.freeze({
    ...LUMEN_RUNTIME,
    ready: true,
  });
}
