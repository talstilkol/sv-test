const runtimeAudit = require("../scripts/audit_code_runtime.js");

describe("Code runtime audit", () => {
  it("classifies every current code example into an explicit runtime category", () => {
    const report = runtimeAudit.run();

    expect(report.total).toBeGreaterThan(0);
    expect(report.classified).toBe(report.total);
    expect(report.unclassified).toHaveLength(0);
    expect(report.fails).toEqual([]);
    expect(report.checked + report.contextSkips.length).toBe(report.classifications["runnable-js"]);
    expect(report.classifications["runnable-js"]).toBeGreaterThan(0);
    expect(report.classifications["browser-only"]).toBeGreaterThan(0);
    expect(report.classifications["pseudo-code"]).toBeGreaterThan(0);
    expect(report.classifications["expected-error"]).toBeGreaterThan(0);
    expect(report.classifications["shell-css-yaml-sql"]).toBeGreaterThan(0);
  });

  it("keeps intentional teaching failures out of runnable-js execution", () => {
    expect(runtimeAudit.classifyCode("throw new Error('bad input');").category).toBe("expected-error");
    expect(runtimeAudit.classifyCode("Promise.reject(new Error('offline'));").category).toBe("expected-error");
    expect(runtimeAudit.classifyCode("fetch('/api/books').then(r => r.json());").category).toBe("browser-only");
    expect(runtimeAudit.classifyCode("const total = [1, 2, 3].reduce((sum, n) => sum + n, 0);").category).toBe("runnable-js");
  });
});
