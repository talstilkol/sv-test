const { test, expect } = require("@playwright/test");

const SIMPLE_ROUTE_STORAGE_KEY = "lumenportal:simpleClosedRouteStep:v1";

async function installClosedRouteStart(page) {
  await page.addInitScript(({ routeKey }) => {
    localStorage.setItem(routeKey, "0");
  }, { routeKey: SIMPLE_ROUTE_STORAGE_KEY });
}

async function openClosedExamRoute(page) {
  await page.goto("/");
  await page.waitForFunction(() => window.__lumenIIFEComplete === true, { timeout: 30000 });
  await page.evaluate((routeKey) => {
    document.getElementById("consent-accept")?.click();
    document.getElementById("onboarding-skip")?.click();
    localStorage.setItem(routeKey, "0");
  }, SIMPLE_ROUTE_STORAGE_KEY);
  await page.reload();
  await page.waitForFunction(() => window.__lumenIIFEComplete === true, { timeout: 30000 });
  await page.evaluate(() => {
    document.getElementById("consent-accept")?.click();
    document.getElementById("onboarding-skip")?.click();
  });
  await page.locator("#simple-route-next-btn").click();
  await expect(page.locator("#mock-exam-view")).toBeVisible({ timeout: 10000 });
}

test.describe("Exam task IDE portal", () => {
  test("renders a standalone IDE portal with separated question, file, explanation and code areas", async ({ page }) => {
    await installClosedRouteStart(page);
    await openClosedExamRoute(page);

    await expect(page.locator("#hxm-exam-task-ide-portal")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("[data-exam-portal-questions]")).toBeVisible();
    await expect(page.locator("[data-exam-portal-files]")).toBeVisible();
    await expect(page.locator("[data-exam-portal-explain]")).toBeVisible();
    await expect(page.locator("[data-exam-portal-code]")).toBeVisible();
    await expect(page.locator("[data-exam-portal-code-notes]")).toBeVisible();

    await expect(page.locator("[data-exam-question-page]")).toHaveCount(73);
    await expect(page.locator("[data-exam-question-page].manual_review")).toHaveCount(4);
    expect(await page.locator("[data-exam-topic-question]").count()).toBeGreaterThanOrEqual(73);

    await expect(page.locator("[data-exam-portal-questions] [data-exam-portal-file]")).toHaveCount(0);
    await expect(page.locator("[data-exam-portal-files] [data-exam-portal-task]")).toHaveCount(0);

    const initialCode = await page.locator("[data-exam-portal-code]").textContent();
    const initialNotes = await page.locator("[data-exam-portal-code-notes]").textContent();
    await page.locator("[data-exam-portal-task]").first().click();
    await expect(page.locator("[data-exam-portal-explain-title]")).toContainText("הסבר משימה");
    await expect.poll(async () => page.locator("[data-exam-portal-code]").textContent()).toBe(initialCode);
    await expect.poll(async () => page.locator("[data-exam-portal-code-notes]").textContent()).toBe(initialNotes);

    await page.locator("[data-exam-portal-file]").first().click();
    await expect(page.locator("[data-exam-portal-code-title]")).toContainText("קוד -");
    await expect(page.locator("[data-exam-portal-code-notes-title]")).toContainText("טבלת הערות קוד -");
    await expect(page.locator("[data-exam-portal-explain-title]")).toContainText("הסבר משימה");
    await expect(page.locator("[data-exam-portal-code] .hxm-exam-code-explain")).toHaveCount(0);
    await expect(page.locator("[data-exam-portal-code-notes] .hxm-exam-code-explain").first()).toBeVisible();
  });

  test("keeps manual review locked and marks missing targets without empty links", async ({ page }) => {
    await installClosedRouteStart(page);
    await openClosedExamRoute(page);

    const manualSectionId = await page.locator("[data-exam-question-page].manual_review").first().getAttribute("data-exam-question-page");
    await page.locator(`[data-exam-topic-question="${manualSectionId}"]`).first().evaluate((node) => {
      const details = node.closest("details");
      if (details) details.open = true;
    });
    await page.locator(`[data-exam-portal-question="${manualSectionId}"]`).first().click();
    await expect(page.locator("[data-exam-portal-explain]")).toContainText("manual_review");
    await expect(page.locator(`[data-exam-question-page="${manualSectionId}"] [data-hxm-plan-task]`)).toHaveCount(0);

    const emptyFileTargets = await page.locator("[data-exam-portal-file]").evaluateAll((buttons) =>
      buttons.filter((button) => !button.getAttribute("data-exam-portal-file") && !button.textContent.includes("unknown/unavailable")).length,
    );
    expect(emptyFileTargets).toBe(0);
  });
});
