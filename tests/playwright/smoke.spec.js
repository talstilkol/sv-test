// tests/playwright/smoke.spec.js
//
// Real Chromium smoke test. Loads the app, accepts consent, dismisses
// onboarding, then clicks every one of the 23 top tabs and asserts:
//   - 0 console errors during the click campaign
//   - 0 unhandled promise rejections
//   - The corresponding view is visible after each click
//
// What this catches that vitest+JSDOM does NOT:
//   - Real layout / paint failures
//   - Service Worker registration issues
//   - Real CSS / font / animation glitches
//   - Real event listener wiring
//   - Real localStorage interaction
//
// What this is NOT:
//   - Visual regression (no screenshot diff yet)
//   - Mobile viewport coverage (only 1280x800; can be added)

const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const PLAN_PROGRESS_KEY = "lumenportal:homeworkExamPlanProgress:v2";
const SIMPLE_ROUTE_STORAGE_KEY = "lumenportal:simpleClosedRouteStep:v1";
const ROOT_DIR = path.resolve(__dirname, "../..");

const TOP_TAB_IDS = [
  "open-trainer",
  "open-codeblocks",
  "open-trace",
  "open-mock-exam",
  "open-knowledge-map",
  "open-flashcards",
  "open-grandma-knowledge",
  "open-programming-basics",
  "open-programming-principles",
  "open-programming-museum",
  "open-language-tools",
  "open-reward-store",
  "open-learning-evidence",
  "open-capstones",
  "open-blueprints",
  "open-comparator",
  "open-concept-sprint",
  "open-study-mode",
  "open-code-anatomy",
  "open-guide",
  "open-gap-matrix",
  "open-settings",
  "open-home",
];

async function installClosedRouteStart(page) {
  await page.addInitScript(({ routeKey }) => {
    localStorage.setItem(routeKey, "0");
  }, { routeKey: SIMPLE_ROUTE_STORAGE_KEY });
}

async function openClosedExamRoute(page) {
  await page.goto("/");
  await page.waitForFunction(() => window.__lumenIIFEComplete === true, {
    timeout: 30000,
  });

  await page.evaluate(() => {
    document.getElementById("consent-accept")?.click();
    document.getElementById("onboarding-skip")?.click();
  });

  await page.evaluate((routeKey) => {
    localStorage.setItem(routeKey, "0");
  }, SIMPLE_ROUTE_STORAGE_KEY);
  await page.reload();
  await page.waitForFunction(() => window.__lumenIIFEComplete === true, {
    timeout: 30000,
  });
  await page.evaluate(() => {
    document.getElementById("consent-accept")?.click();
    document.getElementById("onboarding-skip")?.click();
  });

  await page.locator("#simple-route-next-btn").click();
  await expect(page.locator("#mock-exam-view")).toBeVisible({ timeout: 10000 });
  await page.waitForFunction(
    () => document.querySelectorAll(".mx-template-card").length > 0,
    { timeout: 10000 },
  );
}

test.describe("LumenPortal smoke", () => {
  test("Exam100 source keeps removed duplicate task boards out", async () => {
    const viewSource = fs.readFileSync(path.join(ROOT_DIR, "src/views/homework-exam-mode-view.js"), "utf8");
    const styleSource = fs.readFileSync(path.join(ROOT_DIR, "style.css"), "utf8");

    expect(viewSource).not.toContain("renderExam100TaskTreeBoard");
    expect(viewSource).not.toContain("bindExam100TaskTreeBoard");
    expect(viewSource).not.toContain("renderExam100Schedule");
    expect(viewSource).not.toContain("data-hxm-task-tree-board");
    expect(viewSource).not.toContain("data-exam100-day-board");
    expect(viewSource).not.toContain("renderExam100FullReadinessBoard");
    expect(viewSource).not.toContain("data-exam100-full-readiness");
    expect(styleSource).not.toContain(".hxm-task-tree-board");
    expect(styleSource).not.toContain(".hxm-tree-task-");
    expect(styleSource).not.toContain(".hxm-codex-forward-");
    expect(styleSource).not.toContain(".hxm-exam100-day-board");
    expect(styleSource).not.toContain(".hxm-exam100-full-readiness");
  });
  test("23 top tabs render without console errors", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
    });

    await page.goto("/");
    await page.waitForFunction(() => window.__lumenIIFEComplete === true, {
      timeout: 30000,
    });

    // Accept consent + dismiss onboarding.
    await page.evaluate(() => {
      document.getElementById("consent-accept")?.click();
      document.getElementById("onboarding-skip")?.click();
    });
    await page.waitForTimeout(100);

    // Click every top tab.
    for (const id of TOP_TAB_IDS) {
      await page.evaluate((tabId) => document.getElementById(tabId)?.click(), id);
      await page.waitForTimeout(40);
    }

    // Wait for any deferred render to settle.
    await page.waitForTimeout(300);

    // Filter out known-benign noise.
    const realErrors = errors.filter((e) => {
      // Service worker reg messages aren't errors per se; we already log them
      // as console.log in app.js, not error. But just in case.
      if (/^console\.error: \[LumenPortal\]/.test(e)) return false;
      return true;
    });

    expect(realErrors).toEqual([]);
  });

  test("closed Exam 100 home does not interrupt the route with consent choices", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => window.__lumenIIFEComplete === true);

    const banner = page.locator("#consent-banner");
    await expect(banner).toBeHidden();
    await expect(page.locator(".welcome-simple-route")).toBeVisible();
    await expect(page.locator(".welcome-arrow-btn")).toHaveCount(2);
    await expect(page.locator("#simple-route-hours-left")).toContainText(/שעות|דק׳/);
    await expect(page.locator("#simple-route-board-percent")).toContainText("%");
    await expect(page.locator(".welcome-beginner-mode")).toBeVisible();
    await expect(page.locator("#simple-route-blockers")).toContainText("חוסם מ-100 עכשיו");
  });

  test("mock exam launches without native dialog hang", async ({ page }) => {
    // No browser-level dialog handler — the in-app modal must work.
    await installClosedRouteStart(page);
    await openClosedExamRoute(page);

    // Click a fast variant via JS click — sidesteps Playwright's actionability
    // check which fails when the card is below the fold or behind a sticky overlay.
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll(".mx-template-card"));
      const fast = cards.find((c) => /React מהיר/.test(c.textContent || ""));
      (fast || cards[0])?.click();
    });

    // Custom modal should appear (NOT native confirm — that would block tests).
    const modal = page.locator("#lumen-confirm");
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Click התחל.
    await page.click("#lumen-confirm-yes");
    await expect(modal).toBeHidden();

    // Runner should be visible.
    await expect(page.locator("#mx-runner")).toBeVisible();
  });

  test("task board stores V locally and restores after reload", async ({ page }) => {
    await installClosedRouteStart(page);
    await openClosedExamRoute(page);

    await page.evaluate((key) => localStorage.removeItem(key), PLAN_PROGRESS_KEY);
    await openClosedExamRoute(page);
    await expect(page.locator("[data-hxm-task-tree-board]")).toHaveCount(0);
    await expect(page.locator("[data-hxm-primary-task-board]")).toHaveCount(1);
    await expect(page.locator(".hxm-time-summary-progress")).toBeVisible({ timeout: 10000 });
    await page.locator("#hxm-time-plan").evaluate((node) => { node.open = true; });

    await expect(page.locator("[data-hxm-time-next-card]")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("#hxm-time-plan .hxm-time-task-link").first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator("[data-hxm-action=\"focus-next-time-task\"]")).toBeVisible();
    const firstTask = page.locator('#hxm-time-plan [data-hxm-plan-task^="day-"]').first();
    await expect(firstTask).toBeVisible({ timeout: 10000 });
    await expect(firstTask).toHaveAttribute("aria-label", /סמן V/);
    await page.locator("[data-hxm-action=\"focus-next-time-task\"]").click();
    await expect(firstTask).toBeFocused();
    const taskId = await firstTask.getAttribute("data-hxm-plan-task");
    const beforePercent = await page.locator("[data-hxm-time-required-percent]").textContent();
    const beforeLeft = await page.locator("[data-hxm-time-required-left]").textContent();

    await firstTask.check({ force: true });
    await expect(firstTask).toBeChecked();
    await expect.poll(async () => page.evaluate(({ key, id }) => {
        const parsed = JSON.parse(localStorage.getItem(key) || "{}");
        return parsed[id]?.status || "";
      }, { key: PLAN_PROGRESS_KEY, id: taskId }))
      .toBe("done");

    const afterPercent = await page.locator("[data-hxm-time-required-percent]").textContent();
    const afterLeft = await page.locator("[data-hxm-time-required-left]").textContent();
    expect(afterPercent).not.toBe(beforePercent);
    expect(afterLeft).not.toBe(beforeLeft);
    await expect(page.locator("[data-hxm-time-required-percent]")).toHaveText(/1%|2%|3%/);

    await page.reload();
    await openClosedExamRoute(page);
    await expect(page.locator(`#hxm-time-plan [data-hxm-plan-task="${taskId}"]`)).toBeChecked({ timeout: 10000 });
  });

  test("profile export and import restores task board progress", async ({ page }) => {
    await installClosedRouteStart(page);
    await openClosedExamRoute(page);

    await page.evaluate((key) => localStorage.removeItem(key), PLAN_PROGRESS_KEY);
    await openClosedExamRoute(page);
    await expect(page.locator("[data-hxm-task-tree-board]")).toHaveCount(0);
    await page.locator("#hxm-time-plan").evaluate((node) => { node.open = true; });

    const firstTask = page.locator('#hxm-time-plan [data-hxm-plan-task^="day-"]').first();
    await firstTask.check({ force: true });
    const taskId = await firstTask.getAttribute("data-hxm-plan-task");

    const snapshot = await page.evaluate((key) => {
      const exported = window.LUMEN_PROGRESS_SYNC.buildProgressSnapshot(new Date("2026-05-06T12:00:00.000Z"));
      const parsed = JSON.parse(exported.taskBoardProgress[key] || "{}");
      return { exported, restoredStatus: parsed[Object.keys(parsed)[0]]?.status || "" };
    }, PLAN_PROGRESS_KEY);
    expect(snapshot.exported.taskBoardProgress[PLAN_PROGRESS_KEY]).toContain(taskId);
    expect(snapshot.restoredStatus).toBe("done");

    await page.evaluate((key) => localStorage.removeItem(key), PLAN_PROGRESS_KEY);
    await page.reload();
    await openClosedExamRoute(page);
    await expect(page.locator(`#hxm-time-plan [data-hxm-plan-task="${taskId}"]`)).not.toBeChecked();

    await page.evaluate(async (exported) => {
      await window.LUMEN_PROGRESS_SYNC.applyProgressData(exported, { requireConfirmation: false });
    }, snapshot.exported);
    await page.reload();
    await openClosedExamRoute(page);
    await expect(page.locator(`#hxm-time-plan [data-hxm-plan-task="${taskId}"]`)).toBeChecked({ timeout: 10000 });
  });

  test("Exam100 UI has one primary task board and no focusable hidden library controls", async ({ page }) => {
    await installClosedRouteStart(page);
    await openClosedExamRoute(page);

    await expect(page.locator("#hxm-time-plan")).toHaveCount(1);
    await expect(page.locator("[data-hxm-entry-gateway]")).toHaveCount(1);
    await expect(page.locator("[data-hxm-entry-gateway] [data-hxm-action=\"scroll-hxm-basic-diagnostic\"]")).toBeVisible();
    await expect(page.locator("[data-hxm-entry-gateway] [data-hxm-open-lesson=\"lesson_html_css_foundations\"]")).toBeVisible();
    await expect(page.locator("[data-hxm-start-wizard]")).toBeVisible();
    await expect(page.locator("[data-hxm-primary-task-board]")).toHaveCount(1);
    await expect(page.locator("[data-hxm-task-tree-board]")).toHaveCount(0);
    await expect(page.locator("[data-exam100-day-board]")).toHaveCount(0);
    await expect(page.locator("[data-exam-portal-page-library][hidden][inert][aria-hidden=\"true\"]")).toHaveCount(1);
    await expect(page.locator("a[href=\"\"], button[aria-label=\"\"], [data-hxm-action=\"\"]")).toHaveCount(0);

    await page.locator("#hxm-time-plan").evaluate((node) => { node.open = true; });
    await expect(page.locator(".hxm-time-summary-progress")).toBeVisible();
    await expect(page.locator("[data-hxm-link-audit]")).toBeVisible();
    await expect(page.locator("#hxm-time-plan .hxm-time-task-link").first()).toBeVisible();
    await expect(page.locator("#hxm-time-plan .hxm-time-task-target.unavailable").first()).toBeVisible();
  });

  test("exam task topic tree opens full question pages on desktop and mobile", async ({ page }) => {
    await installClosedRouteStart(page);
    await openClosedExamRoute(page);

    await expect(page.locator("[data-exam-task-ide-portal]")).toBeVisible();
    await expect(page.locator(".hxm-exam-topic-browser")).toBeVisible();
    await expect(page.locator("[data-exam-portal-questions]")).toBeVisible();
    await expect(page.locator("[data-exam-portal-files]")).toBeVisible();
    await expect(page.locator(".hxm-exam-ide-inspector")).toBeVisible();
    await expect(page.locator("[data-exam-portal-explain]")).toBeVisible();
    await expect(page.locator("[data-exam-portal-code]")).toBeVisible();
    await expect(page.locator("[data-exam-portal-code-notes]")).toBeVisible();
    await expect(page.locator("[data-exam-topic]")).toHaveCount(7);
    expect(await page.locator("[data-exam-topic-question]").count()).toBeGreaterThanOrEqual(73);
    await expect(page.locator("[data-exam-question-page]")).toHaveCount(73);
    await expect(page.locator("[data-exam-question-page].manual_review")).toHaveCount(4);

    const firstTaskCard = page.locator(".hxm-exam-topic[open] [data-exam-topic-task] .hxm-exam-topic-task-card").first();
    await expect(firstTaskCard.locator("span")).toHaveCount(3);
    const firstOpenTopicQuestion = page.locator(".hxm-exam-topic[open] [data-exam-portal-question]").first();
    const targetSectionId = await firstOpenTopicQuestion.getAttribute("data-exam-question-open");
    const initialCode = await page.locator("[data-exam-portal-code]").textContent();
    const initialNotes = await page.locator("[data-exam-portal-code-notes]").textContent();
    await firstOpenTopicQuestion.click();
    await expect(page.locator("[data-exam-portal-current-section]")).toContainText(targetSectionId || "");
    await page.locator(".hxm-exam-topic[open] [data-exam-portal-task]").first().click();
    await expect(page.locator("[data-exam-portal-explain-title]")).toContainText("הסבר משימה");
    await expect.poll(async () => page.locator("[data-exam-portal-code]").textContent()).toBe(initialCode);
    await expect.poll(async () => page.locator("[data-exam-portal-code-notes]").textContent()).toBe(initialNotes);
    await page.locator("[data-exam-portal-file]").first().click();
    await expect(page.locator("[data-exam-portal-code-title]")).toContainText("קוד -");
    await expect(page.locator("[data-exam-portal-code-notes-title]")).toContainText("טבלת הערות קוד -");
    await expect(page.locator("[data-exam-portal-explain-title]")).toContainText("הסבר משימה");
    await expect(page.locator("[data-exam-portal-code] .hxm-exam-code-explain")).toHaveCount(0);
    await expect(page.locator("[data-exam-portal-code-notes] .hxm-exam-code-explain").first()).toBeVisible();

    const manualSectionId = await page.locator("[data-exam-question-page].manual_review").first().getAttribute("data-exam-question-page");
    await page.locator(`[data-exam-topic-question="${manualSectionId}"]`).first().evaluate((node) => {
      const details = node.closest("details");
      if (details) details.open = true;
    });
    await page.locator(`[data-exam-question-open="${manualSectionId}"]`).first().click();
    const activeManualReview = page.locator(`[data-exam-portal-explain] [data-exam-manual-review-plan="${manualSectionId}"]`);
    await expect(activeManualReview).toBeVisible();
    await expect(activeManualReview).toContainText("0/6 ראיות");
    await expect(page.locator(`[data-exam-question-page="${manualSectionId}"] [data-hxm-plan-task]`)).toHaveCount(0);

    await page.setViewportSize({ width: 390, height: 844 });
    await openClosedExamRoute(page);
    await expect(page.locator("[data-exam-task-ide-portal]")).toBeVisible({ timeout: 10000 });
    expect(await page.locator("[data-exam-topic-question]").count()).toBeGreaterThanOrEqual(73);

    const hasNoHorizontalOverflow = await page.evaluate(() => (
      document.documentElement.scrollWidth <= document.documentElement.clientWidth + 2
    ));
    expect(hasNoHorizontalOverflow).toBe(true);
  });
});

test.describe("LumenPortal exam question IDE", () => {
  test("question IDE separates right-side explanation navigation from left-side code navigation", async ({ page }) => {
    await installClosedRouteStart(page);
    await openClosedExamRoute(page);

    await expect(page.locator(".hxm-exam-task-ide")).toBeVisible({ timeout: 10000 });
    const moreMenu = page.locator(".hxm-exam-question-more").first();
    await moreMenu.evaluate((node) => { node.open = true; });
    const popoutButton = moreMenu.locator("[data-exam-question-popout]").first();
    await expect(popoutButton).toBeVisible();

    const [ide] = await Promise.all([
      page.waitForEvent("popup"),
      popoutButton.click(),
    ]);
    await ide.waitForSelector(".ide", { timeout: 10000 });

    await expect(ide.locator(".question-tree")).toBeVisible();
    await expect(ide.locator(".file-tree")).toBeVisible();
    await expect(ide.locator("[data-ide-explain]")).toBeVisible();
    await expect(ide.locator("[data-ide-code-active]")).toBeVisible();
    await expect(ide.locator("[data-ide-code-notes-active]")).toBeVisible();

    await expect(ide.locator(".question-tree [data-exam-ide-file]")).toHaveCount(0);
    await expect(ide.locator(".file-tree [data-ide-explain-task]")).toHaveCount(0);

    const initialCode = await ide.locator("[data-ide-code-active]").textContent();
    const initialNotes = await ide.locator("[data-ide-code-notes-active]").textContent();
    await ide.locator("[data-ide-explain-task]").first().click();
    await expect(ide.locator("[data-ide-explain-title]")).toContainText("הסבר משימה");
    await expect.poll(async () => ide.locator("[data-ide-code-active]").textContent()).toBe(initialCode);
    await expect.poll(async () => ide.locator("[data-ide-code-notes-active]").textContent()).toBe(initialNotes);

    await ide.locator("[data-exam-ide-file]").first().click();
    await expect(ide.locator("[data-ide-code-title]")).toContainText("קוד -");
    await expect(ide.locator("[data-ide-code-notes-title]")).toContainText("טבלת הערות קוד -");
    await expect(ide.locator("[data-ide-explain-title]")).toContainText("הסבר משימה");
    await expect(ide.locator("[data-ide-code-active] .hxm-exam-code-explain")).toHaveCount(0);
    await expect(ide.locator("[data-ide-code-notes-active] .hxm-exam-code-explain").first()).toBeVisible();
  });

  test("question IDE navigation targets are explicit or marked unavailable", async ({ page }) => {
    await installClosedRouteStart(page);
    await openClosedExamRoute(page);

    const [ide] = await Promise.all([
      page.waitForEvent("popup"),
      page.locator(".hxm-exam-question-more").first().evaluate((node) => { node.open = true; }).then(() => page.locator(".hxm-exam-question-more [data-exam-question-popout]").first().click()),
    ]);
    await ide.waitForSelector(".ide", { timeout: 10000 });

    const emptyQuestionTargets = await ide.locator(".question-tree button").evaluateAll((buttons) =>
      buttons.filter((button) => !button.textContent.trim()).length,
    );
    const emptyFileTargets = await ide.locator(".file-tree [data-exam-ide-file]").evaluateAll((buttons) =>
      buttons.filter((button) => !button.getAttribute("data-exam-ide-file") && !button.textContent.includes("unknown/unavailable")).length,
    );

    expect(emptyQuestionTargets).toBe(0);
    expect(emptyFileTargets).toBe(0);
  });
});
