/**
 * Escape Utilities Tests — Security-critical
 *
 * These helpers protect against XSS injection. Tests must include
 * known XSS attack vectors to ensure the escapers neutralize them.
 */

let escapeHtml;
let escapeHtmlLegacy;
let escapeCss;
let escapeJsString;
let escapeUrl;
let stripHtmlTags;
let truncate;

beforeAll(async () => {
  const mod = await import("../src/utils/escape.js");
  escapeHtml = mod.escapeHtml;
  escapeHtmlLegacy = mod.escapeHtmlLegacy;
  escapeCss = mod.escapeCss;
  escapeJsString = mod.escapeJsString;
  escapeUrl = mod.escapeUrl;
  stripHtmlTags = mod.stripHtmlTags;
  truncate = mod.truncate;
});

describe("escapeHtml — XSS protection", () => {
  it("encodes ampersand", () => {
    expect(escapeHtml("a&b")).toBe("a&amp;b");
  });

  it("encodes less-than and greater-than", () => {
    expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
  });

  it("encodes double quotes", () => {
    expect(escapeHtml('say "hi"')).toBe("say &quot;hi&quot;");
  });

  it("encodes single quotes (stricter than legacy)", () => {
    expect(escapeHtml("it's")).toBe("it&#39;s");
  });

  it("neutralizes script tag injection", () => {
    const attack = '<script>alert("xss")</script>';
    const escaped = escapeHtml(attack);
    expect(escaped).not.toContain("<script");
    expect(escaped).toContain("&lt;script&gt;");
  });

  it("neutralizes event handler injection in attribute", () => {
    const attack = '" onload="alert(1)';
    const escaped = escapeHtml(attack);
    expect(escaped).not.toContain('"');
    expect(escaped).toContain("&quot;");
  });

  it("neutralizes single-quote attribute breakout", () => {
    const attack = "' onclick='alert(1)";
    const escaped = escapeHtml(attack);
    expect(escaped).not.toContain("'");
    expect(escaped).toContain("&#39;");
  });

  it("encodes ampersand BEFORE other entities (no double-encoding)", () => {
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });

  it("returns empty string for null", () => {
    expect(escapeHtml(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(escapeHtml(undefined)).toBe("");
  });

  it("converts numbers to strings", () => {
    expect(escapeHtml(42)).toBe("42");
  });

  it("preserves Hebrew text unchanged", () => {
    expect(escapeHtml("שלום עולם")).toBe("שלום עולם");
  });

  it("preserves emoji", () => {
    expect(escapeHtml("🔥 hot")).toBe("🔥 hot");
  });
});

describe("escapeHtmlLegacy — parity with app.js esc()", () => {
  it("encodes &, <, >, and double-quote (NOT single quote)", () => {
    expect(escapeHtmlLegacy("a&b<c>d\"e'f")).toBe("a&amp;b&lt;c&gt;d&quot;e'f");
  });

  it("returns empty for falsy values", () => {
    expect(escapeHtmlLegacy("")).toBe("");
    expect(escapeHtmlLegacy(0)).toBe("");
    expect(escapeHtmlLegacy(null)).toBe("");
    expect(escapeHtmlLegacy(undefined)).toBe("");
  });
});

describe("escapeCss — selector injection protection", () => {
  it("escapes double quotes", () => {
    expect(escapeCss('a"b')).toBe('a\\"b');
  });

  it("escapes single quotes", () => {
    expect(escapeCss("a'b")).toBe("a\\'b");
  });

  it("escapes backslashes", () => {
    expect(escapeCss("a\\b")).toBe("a\\\\b");
  });

  it("neutralizes selector breakout via quote", () => {
    const attack = '" or 1=1 OR "';
    const escaped = escapeCss(attack);
    expect(escaped).not.toMatch(/[^\\]"/);
  });

  it("preserves regular characters", () => {
    expect(escapeCss("normal-text")).toBe("normal-text");
    expect(escapeCss("with spaces")).toBe("with spaces");
  });

  it("converts non-strings", () => {
    expect(escapeCss(42)).toBe("42");
  });
});

describe("escapeJsString — safe JS literal injection", () => {
  it("wraps result in double quotes", () => {
    expect(escapeJsString("hello")).toBe('"hello"');
  });

  it("escapes embedded double quotes", () => {
    expect(escapeJsString('say "hi"')).toBe('"say \\"hi\\""');
  });

  it("escapes newlines", () => {
    expect(escapeJsString("a\nb")).toBe('"a\\nb"');
  });

  it("handles null/undefined as empty string", () => {
    expect(escapeJsString(null)).toBe('""');
    expect(escapeJsString(undefined)).toBe('""');
  });

  it("neutralizes script breakout via quote", () => {
    const attack = '"; alert(1); //';
    const escaped = escapeJsString(attack);
    // Must be valid JSON parseable as a string
    expect(JSON.parse(escaped)).toBe(attack);
  });
});

describe("escapeUrl — query string safety", () => {
  it("encodes spaces", () => {
    expect(escapeUrl("hello world")).toBe("hello%20world");
  });

  it("encodes special chars", () => {
    expect(escapeUrl("a&b=c")).toBe("a%26b%3Dc");
  });

  it("preserves alphanumerics and a few unreserved chars", () => {
    expect(escapeUrl("abc123")).toBe("abc123");
  });

  it("returns empty for null/undefined", () => {
    expect(escapeUrl(null)).toBe("");
    expect(escapeUrl(undefined)).toBe("");
  });

  it("handles Hebrew", () => {
    expect(escapeUrl("שלום")).toMatch(/^%[0-9A-F]/i);
  });
});

describe("stripHtmlTags", () => {
  it("removes simple tags", () => {
    expect(stripHtmlTags("<p>Hello</p>")).toBe("Hello");
  });

  it("removes self-closing tags", () => {
    expect(stripHtmlTags("a<br/>b")).toBe("ab");
  });

  it("removes tags with attributes", () => {
    expect(stripHtmlTags('<a href="#">link</a>')).toBe("link");
  });

  it("preserves entities (does not decode)", () => {
    expect(stripHtmlTags("a &amp; b")).toBe("a &amp; b");
  });

  it("returns empty for null/undefined", () => {
    expect(stripHtmlTags(null)).toBe("");
    expect(stripHtmlTags(undefined)).toBe("");
  });
});

describe("truncate", () => {
  it("returns string unchanged when under limit", () => {
    expect(truncate("short", 10)).toBe("short");
  });

  it("truncates and adds ellipsis when over limit", () => {
    expect(truncate("this is a long text", 10)).toBe("this is a…");
  });

  it("uses custom ellipsis", () => {
    expect(truncate("long text here", 8, "...")).toBe("long ...");
  });

  it("counts ellipsis length toward maxLength", () => {
    const result = truncate("abcdefghij", 5);
    expect(result.length).toBe(5);
  });

  it("handles empty/null", () => {
    expect(truncate("", 5)).toBe("");
    expect(truncate(null, 5)).toBe("");
  });

  it("handles maxLength shorter than ellipsis", () => {
    expect(truncate("abcdef", 2, "...")).toBe("ab");
  });
});
