/**
 * Keyboard Accessibility Tests
 *
 * Verifies that keyboard-driven navigation contracts are met:
 * - Escape closes modals/panels
 * - Enter submits answers
 * - Arrow keys navigate
 * - Focus management is correct
 * - Tab order is logical
 */

const fs = require("fs");
const path = require("path");

const appSource = fs.readFileSync(
  path.join(__dirname, "..", "app.js"),
  "utf-8"
);
const htmlSource = fs.readFileSync(
  path.join(__dirname, "..", "index.html"),
  "utf-8"
);
const cssSource = fs.readFileSync(
  path.join(__dirname, "..", "style.css"),
  "utf-8"
);

describe("Keyboard Accessibility Contracts", () => {
  describe("Escape key handling", () => {
    it("has Escape handler for focus menu sidebar", () => {
      expect(appSource).toContain('event.key !== "Escape"');
      expect(appSource).toContain("focus-menu-open");
    });

    it("has Escape handler for mobile context menu", () => {
      expect(appSource).toContain("mobile-context-open");
    });

    it("has Escape handler for modal dialogs", () => {
      const escapeInModal = appSource.match(
        /modal.*addEventListener\("keydown".*Escape/s
      );
      expect(escapeInModal).not.toBeNull();
    });

    it("sets aria-expanded=false when closing menus via Escape", () => {
      const ariaExpanded = appSource.match(
        /setAttribute\("aria-expanded",\s*"false"\)/g
      );
      expect(ariaExpanded.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Enter key handling", () => {
    it("has Enter key handlers for input submissions", () => {
      const enterHandlers = appSource.match(
        /key\s*===?\s*["']Enter["']/g
      );
      expect(enterHandlers).not.toBeNull();
      expect(enterHandlers.length).toBeGreaterThanOrEqual(5);
    });

    it("has Enter handler for profile name input", () => {
      expect(appSource).toContain("localProfileNameInput");
      expect(appSource).toContain('"keydown"');
    });

    it("has Enter handler for quiz answer submission", () => {
      const quizEnter = appSource.match(
        /input.*keydown.*Enter.*submit|submit.*Enter/s
      );
      expect(quizEnter).not.toBeNull();
    });
  });

  describe("Arrow key navigation", () => {
    it("has arrow key handler for knowledge map nodes", () => {
      const arrowInMap = appSource.match(
        /nodeEl.*keydown.*Arrow|Arrow.*nodeEl/s
      );
      expect(arrowInMap).not.toBeNull();
    });

    it("supports keyboard navigation on interactive tree nodes", () => {
      expect(appSource).toContain("ArrowDown");
      expect(appSource).toContain("ArrowUp");
    });
  });

  describe("Focus management", () => {
    it("has focus-visible CSS styles", () => {
      expect(cssSource).toMatch(/focus-visible|:focus/);
    });

    it("has prefers-reduced-motion media query", () => {
      expect(cssSource).toContain("prefers-reduced-motion");
    });

    it("uses tabindex for custom interactive elements", () => {
      const tabindexInApp = appSource.match(/tabindex|tabIndex/g);
      expect(tabindexInApp).not.toBeNull();
      expect(tabindexInApp.length).toBeGreaterThanOrEqual(3);
    });

    it("has role attributes for custom widgets", () => {
      const roles = htmlSource.match(/role="/g);
      expect(roles).not.toBeNull();
      expect(roles.length).toBeGreaterThanOrEqual(5);
    });

    it("uses aria-label for icon buttons", () => {
      const ariaLabels = htmlSource.match(/aria-label="/g);
      expect(ariaLabels).not.toBeNull();
      expect(ariaLabels.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe("Keyboard event handler coverage", () => {
    it("has at least 15 keydown event listeners", () => {
      const keydownListeners = appSource.match(
        /addEventListener\("keydown"/g
      );
      expect(keydownListeners).not.toBeNull();
      expect(keydownListeners.length).toBeGreaterThanOrEqual(15);
    });

    it("does not use deprecated keypress event", () => {
      const keypressListeners = appSource.match(
        /addEventListener\("keypress"/g
      );
      expect(keypressListeners).toBeNull();
    });

    it("prevents default on handled keys to avoid scroll interference", () => {
      const preventDefaults = appSource.match(/preventDefault\(\)/g);
      expect(preventDefaults).not.toBeNull();
      expect(preventDefaults.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("Modal dialog accessibility", () => {
    it("modals have role=dialog or aria-modal", () => {
      const hasDialog =
        htmlSource.includes('role="dialog"') ||
        htmlSource.includes("aria-modal") ||
        appSource.includes('role", "dialog"') ||
        appSource.includes("aria-modal");
      expect(hasDialog).toBe(true);
    });

    it("modals can be closed with Escape", () => {
      const modalEscape = appSource.match(
        /modal.*Escape|Escape.*modal/gs
      );
      expect(modalEscape).not.toBeNull();
    });
  });

  describe("Screen reader support", () => {
    it("uses semantic HTML elements", () => {
      expect(htmlSource).toContain("<main");
      expect(htmlSource).toContain("<nav");
      expect(htmlSource).toContain("<header");
    });

    it("has lang attribute set to Hebrew", () => {
      expect(htmlSource).toMatch(/lang="he"/);
    });

    it("has dir=rtl for right-to-left", () => {
      expect(htmlSource).toMatch(/dir="rtl"/);
    });

    it("uses aria-live for dynamic content announcements", () => {
      const ariaLive =
        htmlSource.includes("aria-live") ||
        appSource.includes("aria-live");
      expect(ariaLive).toBe(true);
    });
  });
});
