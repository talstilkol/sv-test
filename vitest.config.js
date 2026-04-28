// Vitest configuration for LumenPortal core logic tests.
// Tests live in tests/. Each test imports from lib/ (rng, srs).
const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["tests/**/*.test.js"],
    coverage: {
      reporter: ["text", "html"],
      include: ["lib/**/*.js"],
    },
  },
});
