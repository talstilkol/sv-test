import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildSupportContext,
  buildSupportReport,
  validateSupportReport,
} from "../src/core/support-report.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("support report flow", () => {
  it("builds deterministic local support payloads with screenshot and context fields", () => {
    const input = {
      type: "bug",
      severity: "blocking",
      title: "Cannot open question bank",
      description: "The question bank button does not expand in lesson_11.",
      createdAt: "2026-04-29T18:00:00.000Z",
      context: buildSupportContext({
        route: "/?chrome-menu-check=4",
        activeTab: "lesson",
        lessonId: "lesson_11",
        lessonTitle: "Arrays, Functions, and Scope",
        conceptKey: "lesson_11::Array",
        conceptName: "Array",
        viewport: { width: 390, height: 844, devicePixelRatio: 3 },
        appVersion: "local-static",
        cacheVersion: "style.css?v=concept-sprint-v25",
        userAgent: "Vitest browser context",
      }),
      screenshot: {
        filename: "question-bank.png",
        mediaType: "image/png",
        dataUrl: "data:image/png;base64,aW1hZ2U=",
      },
    };

    const first = buildSupportReport(input);
    const second = buildSupportReport(input);

    expect(first.id).toBe(second.id);
    expect(first).toMatchObject({
      version: "support-report-v1",
      type: "bug",
      severity: "blocking",
      context: {
        activeTab: "lesson",
        conceptKey: "lesson_11::Array",
        viewport: { width: 390, height: 844, devicePixelRatio: 3 },
      },
      screenshot: {
        status: "attached",
        mediaType: "image/png",
        filename: "question-bank.png",
      },
      privacy: {
        piiRequired: false,
        localOnly: true,
      },
    });
    expect(validateSupportReport(first)).toEqual({ valid: true, issues: [] });
  });

  it("wires support report UI into the app chrome menu", () => {
    const index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
    const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");
    const main = fs.readFileSync(path.join(ROOT, "src/main.js"), "utf8");

    expect(index).toContain("support-report-btn");
    expect(index).toContain("support-report-screenshot");
    expect(app).toContain("currentSupportContext");
    expect(app).toContain("generateSupportReportPayload");
    expect(css).toContain(".support-report-modal");
    expect(main).toContain('import * as supportReport from "./core/support-report.js";');
  });
});
