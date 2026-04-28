(function installEarlyHTMLSanitizer() {
  const win = window;
  const PATCH_FLAG = Symbol.for("lumenportal.htmlSanitizerInstalled");
  const BYPASS_FLAG = Symbol.for("lumenportal.htmlSanitizerBypass");
  const FORBIDDEN_TAGS = new Set(["base", "embed", "iframe", "link", "meta", "object", "script"]);
  const URL_ATTRS = new Set(["action", "formaction", "href", "src", "xlink:href"]);
  const FORBIDDEN_TAG_PATTERN = /<\/?(base|embed|iframe|link|meta|object|script)\b[^>]*>/gi;
  const FORBIDDEN_TAG_BLOCK_PATTERN =
    /<(base|embed|iframe|link|meta|object|script)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;

  function isDangerousUrl(value) {
    return String(value || "").trim().toLowerCase().startsWith("javascript:");
  }

  function fallbackSanitizeHTML(value) {
    const text = String(value ?? "");
    if (typeof win.DOMParser !== "function") return text;

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

  win.LUMEN_SANITIZE_HTML = win.LUMEN_SANITIZE_HTML || fallbackSanitizeHTML;

  const elementPrototype = win.Element && win.Element.prototype;
  if (!elementPrototype) {
    win.LUMEN_EARLY_SANITIZER_STATE = Object.freeze({ installed: false, reason: "missing-element" });
    return;
  }
  if (elementPrototype[PATCH_FLAG]) {
    win.LUMEN_EARLY_SANITIZER_STATE = Object.freeze({ installed: true, reason: "already-installed" });
    return;
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

  win.LUMEN_EARLY_SANITIZER_STATE = Object.freeze({
    installed: patchedInnerHTML || patchedInsertAdjacentHTML,
    innerHTML: patchedInnerHTML,
    insertAdjacentHTML: patchedInsertAdjacentHTML,
    engine: "fallback-early",
  });
})();
