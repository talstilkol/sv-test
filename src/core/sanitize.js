const PATCH_FLAG = Symbol.for("lumenportal.htmlSanitizerInstalled");
const BYPASS_FLAG = Symbol.for("lumenportal.htmlSanitizerBypass");
const FORBIDDEN_TAGS = new Set(["base", "embed", "iframe", "link", "meta", "object", "script"]);
const URL_ATTRS = new Set(["action", "formaction", "href", "src", "xlink:href"]);
const FORBIDDEN_TAG_PATTERN = /<\/?(base|embed|iframe|link|meta|object|script)\b[^>]*>/gi;
const FORBIDDEN_TAG_BLOCK_PATTERN =
  /<(base|embed|iframe|link|meta|object|script)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;

export const DEFAULT_SANITIZE_CONFIG = Object.freeze({
  ALLOW_ARIA_ATTR: true,
  ALLOW_DATA_ATTR: true,
  ADD_ATTR: [
    "aria-controls",
    "aria-expanded",
    "aria-label",
    "aria-live",
    "aria-modal",
    "aria-pressed",
    "aria-selected",
    "data-action",
    "data-a11y",
    "data-answer",
    "data-anim-concept",
    "data-bug-options",
    "data-cid",
    "data-concept",
    "data-confidence",
    "data-correct",
    "data-ctx-action",
    "data-kind",
    "data-lesson",
    "data-qid",
    "data-runner-output",
    "data-star",
    "data-video-concept",
    "data-vm",
    "data-wif-concept",
    "data-wif-idx",
    "role",
    "style",
    "title",
  ],
  FORBID_TAGS: ["base", "embed", "iframe", "link", "meta", "object", "script"],
  FORBID_ATTR: ["srcdoc"],
});

let cachedWindow = null;
let cachedPurifier = null;
let hookInstalled = false;

function resolveWindow(target = globalThis) {
  if (target && target.window && target.window.document) return target.window;
  if (target && target.document) return target;
  if (globalThis.window && globalThis.window.document) return globalThis.window;
  return null;
}

export function getPurifier(target = globalThis) {
  const win = resolveWindow(target);
  if (!win) return null;
  if (cachedPurifier && cachedWindow === win) return cachedPurifier;

  cachedWindow = win;
  cachedPurifier = win.DOMPurify && typeof win.DOMPurify.sanitize === "function" ? win.DOMPurify : null;
  hookInstalled = false;
  return cachedPurifier;
}

function installLinkSafetyHook(purifier) {
  if (!purifier || hookInstalled) return;
  purifier.addHook("afterSanitizeAttributes", (node) => {
    if (!node || String(node.nodeName || "").toLowerCase() !== "a") return;
    if (node.getAttribute("target") === "_blank") {
      node.setAttribute("rel", "noopener noreferrer");
    }
  });
  hookInstalled = true;
}

export function sanitizeHTML(value, target = globalThis, config = {}) {
  const win = resolveWindow(target);
  const purifier = getPurifier(win || target);
  const text = String(value ?? "");
  if (!purifier) return fallbackSanitizeHTML(text, target);
  installLinkSafetyHook(purifier);
  const previousBypass = win ? win[BYPASS_FLAG] : undefined;
  if (win) win[BYPASS_FLAG] = true;
  let sanitized = "";
  try {
    sanitized = purifier.sanitize(text, {
      ...DEFAULT_SANITIZE_CONFIG,
      ...config,
    });
  } finally {
    if (win) {
      if (previousBypass === undefined) {
        delete win[BYPASS_FLAG];
      } else {
        win[BYPASS_FLAG] = previousBypass;
      }
    }
  }
  if (sanitized || !text.trim()) return sanitized;
  return fallbackSanitizeHTML(text, target);
}

function isDangerousUrl(value) {
  return String(value || "").trim().toLowerCase().startsWith("javascript:");
}

export function fallbackSanitizeHTML(value, target = globalThis) {
  const win = resolveWindow(target);
  const text = String(value ?? "");
  if (!win || typeof win.DOMParser !== "function") return text;

  const parseSafeText = text.replace(FORBIDDEN_TAG_BLOCK_PATTERN, "").replace(FORBIDDEN_TAG_PATTERN, "");
  const doc = new win.DOMParser().parseFromString(parseSafeText, "text/html");
  doc.body.querySelectorAll("*").forEach((node) => {
    const tag = String(node.tagName || "").toLowerCase();
    if (FORBIDDEN_TAGS.has(tag)) {
      node.remove();
      return;
    }

    [...node.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      if (name.startsWith("on") || name === "srcdoc") {
        node.removeAttribute(attr.name);
        return;
      }
      if (URL_ATTRS.has(name) && isDangerousUrl(attr.value)) {
        node.removeAttribute(attr.name);
      }
    });

    if (tag === "a" && node.getAttribute("target") === "_blank") {
      node.setAttribute("rel", "noopener noreferrer");
    }
  });

  return doc.body.innerHTML;
}

function findDescriptor(proto, property) {
  let current = proto;
  while (current) {
    const descriptor = Object.getOwnPropertyDescriptor(current, property);
    if (descriptor) return { owner: current, descriptor };
    current = Object.getPrototypeOf(current);
  }
  return null;
}

export function installHTMLSanitizer(target = globalThis) {
  const win = resolveWindow(target);
  if (!win || !win.Element || !win.Element.prototype) {
    return Object.freeze({ installed: false, reason: "missing-window" });
  }

  Object.defineProperty(win, "LUMEN_SANITIZE_HTML", {
    configurable: true,
    writable: true,
    value: (value) => sanitizeHTML(value, win),
  });

  const elementPrototype = win.Element.prototype;
  if (elementPrototype[PATCH_FLAG]) {
    const earlyState = win.LUMEN_EARLY_SANITIZER_STATE || {};
    return Object.freeze({
      installed: true,
      reason: "already-installed",
      innerHTML: earlyState.innerHTML !== false,
      insertAdjacentHTML: earlyState.insertAdjacentHTML !== false,
      engine: getPurifier(win) ? "dompurify" : "fallback",
    });
  }

  const innerHTMLInfo = findDescriptor(elementPrototype, "innerHTML");
  const originalInsertAdjacentHTML = elementPrototype.insertAdjacentHTML;
  let patchedInnerHTML = false;
  let patchedInsertAdjacentHTML = false;

  if (innerHTMLInfo && innerHTMLInfo.descriptor && typeof innerHTMLInfo.descriptor.set === "function") {
    const { owner, descriptor } = innerHTMLInfo;
    Object.defineProperty(owner, "innerHTML", {
      ...descriptor,
      set(value) {
        if (win[BYPASS_FLAG]) return descriptor.set.call(this, value);
        return descriptor.set.call(this, win.LUMEN_SANITIZE_HTML(value));
      },
    });
    patchedInnerHTML = true;
  }

  if (typeof originalInsertAdjacentHTML === "function") {
    Object.defineProperty(elementPrototype, "insertAdjacentHTML", {
      configurable: true,
      writable: true,
      value(position, value) {
        if (win[BYPASS_FLAG]) return originalInsertAdjacentHTML.call(this, position, value);
        return originalInsertAdjacentHTML.call(this, position, win.LUMEN_SANITIZE_HTML(value));
      },
    });
    patchedInsertAdjacentHTML = true;
  }

  Object.defineProperty(elementPrototype, PATCH_FLAG, {
    configurable: false,
    enumerable: false,
    value: true,
  });

  return Object.freeze({
    installed: patchedInnerHTML || patchedInsertAdjacentHTML,
    innerHTML: patchedInnerHTML,
    insertAdjacentHTML: patchedInsertAdjacentHTML,
    engine: getPurifier(win) ? "dompurify" : "fallback",
  });
}
