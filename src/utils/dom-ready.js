export function afterDomReady(callback) {
  if (typeof callback !== "function") return;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }
  callback();
}
