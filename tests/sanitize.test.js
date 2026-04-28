describe("HTML sanitizer", () => {
  let sanitizer;

  beforeAll(async () => {
    sanitizer = await import("../src/core/sanitize.js");
  });

  it("removes scripts and inline event handlers", () => {
    const html = sanitizer.sanitizeHTML('<img src="x" onerror="alert(1)"><script>alert(2)</script>');

    expect(html).toContain("<img");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("<script");
  });

  it("preserves UI attributes used by the app", () => {
    const html = sanitizer.sanitizeHTML(
      '<button class="x" data-action="save" aria-label="save" style="width:50%" title="Save">OK</button>',
    );

    expect(html).toContain('class="x"');
    expect(html).toContain('data-action="save"');
    expect(html).toContain('aria-label="save"');
    expect(html).toContain('style="width:50%"');
    expect(html).toContain('title="Save"');
  });

  it("preserves safe SVG used by learning visuals", () => {
    const html = sanitizer.sanitizeHTML(
      '<svg viewBox="0 0 10 10"><rect width="10" height="10"></rect><script>alert(1)</script></svg>',
    );

    expect(html).toContain("<svg");
    expect(html).toContain("<rect");
    expect(html).not.toContain("<script");
  });

  it("patches innerHTML and insertAdjacentHTML assignments", () => {
    const result = sanitizer.installHTMLSanitizer(window);
    expect(["already-installed", undefined]).toContain(result.reason);

    const div = document.createElement("div");
    div.innerHTML = '<button onclick="alert(1)" data-action="x">Run</button><script>alert(2)</script>';

    const button = div.querySelector("button");
    expect(button).toBeTruthy();
    expect(button.getAttribute("onclick")).toBeNull();
    expect(button.getAttribute("data-action")).toBe("x");
    expect(div.querySelector("script")).toBeNull();

    div.insertAdjacentHTML("beforeend", '<img src="x" onerror="alert(3)">');
    expect(div.querySelector("img").getAttribute("onerror")).toBeNull();
  });
});
