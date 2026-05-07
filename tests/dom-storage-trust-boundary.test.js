const trustBoundary = require("../scripts/report_dom_storage_trust_boundary.js");

describe("DOM/storage trust boundary report", () => {
  it("builds without regex syntax errors", () => {
    const report = trustBoundary.buildReport();

    expect(report.reportVersion).toBe("dom-storage-trust-boundary-audit-v1");
    expect(report.summary.storage.total).toBeGreaterThan(0);
    expect(report.storageSinks.every((row) => !row.type.endsWith(".access"))).toBe(true);
  });

  it("parses direct and bound storage calls deterministically", () => {
    expect(trustBoundary.parseStorageCall("localStorage.setItem(PROF_STORAGE_KEY, value);")).toEqual({
      storageType: "localStorage",
      method: "setItem",
      keyExpr: "PROF_STORAGE_KEY",
    });
    expect(trustBoundary.parseStorageCall("raw.getItem.call(sessionStorage, SESSION_KEY);")).toEqual({
      storageType: "sessionStorage",
      method: "getItem",
      keyExpr: "SESSION_KEY",
    });
    expect(trustBoundary.parseStorageCall("localStorage.clear();")).toEqual({
      storageType: "localStorage",
      method: "clear",
      keyExpr: "",
    });
  });
});
