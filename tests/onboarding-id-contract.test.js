const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

describe("onboarding id contract", () => {
  it("uses the overlay onboarding contract (no legacy tour actions)", () => {
    const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const onboardingBoot = fs.readFileSync(
      path.join(ROOT, "src", "boot", "consent-onboarding.js"),
      "utf8",
    );

    expect(app).not.toContain("data-tour-action");
    expect(app).not.toContain("onboarding-tour");
    expect(onboardingBoot).toContain('querySelectorAll("[data-onboarding]")');

    expect(html).toContain('id="onboarding-overlay"');
    expect(html).toContain('data-onboarding="open-trainer"');
    expect(html).toContain('data-onboarding="open-study-mode"');
    expect(html).toContain('data-onboarding="open-mock-exam"');
  });
});
