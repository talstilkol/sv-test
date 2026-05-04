// playwright.config.js
//
// Real Chromium smoke tests. Replaces (and complements) the JSDOM-based
// app-smoke.test.js which can only catch parse/TDZ errors. This catches
// runtime UI errors that need a real browser (event loop, layout, fetch,
// service worker, etc.).
//
// Run locally:
//   npm run smoke:browser
// Run in CI (added to .github/workflows/ci.yml):
//   npm run smoke:browser
//
// The test starts a static-file server on port 8765 (matches the dev server)
// and clicks every top tab, asserting no console errors.

const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/playwright",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  timeout: 60000,
  use: {
    baseURL: "http://localhost:8765",
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10000,
  },
  webServer: {
    command: "node server.js",
    port: 8765,
    timeout: 60000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        // Use the headless shell for speed in CI (full chromium for local).
        channel: undefined,
      },
    },
  ],
});
