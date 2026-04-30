const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("reward store MVP", () => {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");

  it("adds a dedicated store tab and view", () => {
    expect(html).toContain('id="open-reward-store"');
    expect(html).toContain('data-tab="reward-store"');
    expect(html).toContain("🛒 חנות");
    expect(html).toContain('id="reward-store-view"');
    expect(html).toContain('id="reward-store-content"');
    expect(app).toContain('const rewardStoreView = document.getElementById("reward-store-view")');
    expect(app).toContain('const openRewardStoreBtn = document.getElementById("open-reward-store")');
    expect(app).toContain("openRewardStoreBtn?.addEventListener(\"click\", openRewardStore)");
  });

  it("defines a deterministic catalog for museum tickets and experiences", () => {
    expect(app).toContain("const STORE_CATEGORIES");
    expect(app).toContain("const REWARD_STORE_CATALOG");
    expect(app).toContain('id: "museum.languages"');
    expect(app).toContain('id: "museum.electricity"');
    expect(app).toContain('id: "museum.react"');
    expect(app).toContain('id: "museum.node"');
    expect(app).toContain('id: "museum.ai"');
    expect(app).toContain('id: "museum.debug"');
    expect(app).toContain('id: "challenge.debug-arena"');
    expect(app).toContain('id: "challenge.auth-boss"');
    expect(app).toContain('id: "challenge.react-state-boss"');
    expect(app).toContain('id: "challenge.api-boss"');
    expect(app).toContain('id: "challenge.db-boss"');
    expect(app).toContain('id: "challenge.code-cinema"');
    expect(app).toContain('id: "challenge.secret-labs"');
    expect(app).toContain('id: "cosmetic.cyber-theme"');
    expect(app).toContain('id: "cosmetic.exam-calm-theme"');
    expect(app).toContain('id: "cosmetic.accessible-outline"');
    expect(app).toContain("אי אפשר לקנות ציון");
    expect(app).toContain("לא קונים מאסטר");
  });

  it("persists purchases with coins and blocks insufficient balances", () => {
    expect(app).toContain('const STORE_PURCHASES_KEY = "lumenportal:storePurchases:v1"');
    expect(app).toContain("function getStorePurchases");
    expect(app).toContain("function purchaseStoreItem");
    expect(app).toContain("if (balance < item.price)");
    expect(app).toContain("localStorage.setItem(COINS_KEY, String(balance - item.price))");
    expect(app).toContain('source: "store-purchase"');
    expect(app).toContain("coins: -item.price");
  });

  it("renders filters, balance and purchase list without affecting grades", () => {
    expect(app).toContain("function renderRewardStore");
    expect(app).toContain("function renderThemeShopPanel");
    expect(app).toContain("function applyCosmeticTheme");
    expect(app).toContain('const COSMETIC_THEME_KEY = "lumenportal:cosmeticTheme:v1"');
    expect(app).toContain("data-theme-cosmetic");
    expect(app).toContain("reward-store-balance");
    expect(app).toContain("data-store-filter");
    expect(app).toContain("data-store-buy");
    expect(app).toContain("הרכישות שלי");
    expect(app).toContain("המטבעות הם תגמולי למידה מקומיים בלבד");
    expect(app).toContain("אינם כסף אמיתי ואין להם ערך כספי");
    expect(app).toContain("כלכלה מושהית");
    expect(app).toContain("setRewardStoreContextTree");
    expect(app).toContain("initialTabFromUrl === \"reward-store\"");
  });

  it("connects museum tickets to locked experience areas", () => {
    expect(app).toContain("function isMuseumTicketOpen");
    expect(app).toContain("function renderMuseumLockedExperience");
    expect(app).toContain("function openRewardStoreForItem");
    expect(app).toContain('storeItemId: "museum.languages"');
    expect(app).toContain('storeItemId: "museum.electricity"');
    expect(app).toContain('storeItemId: "museum.react"');
    expect(app).toContain('storeItemId: "museum.ai"');
    expect(app).toContain('storeItemId: "museum.debug"');
    expect(app).toContain("data-museum-store-item");
    expect(app).toContain("data-museum-store-link");
    expect(app).toContain("לא נועלים חומר חובה");
  });

  it("adds XP access gates for museum tabs and foundational learning path", () => {
    expect(app).toContain('const XP_ACCESS_UNLOCKS_KEY = "lumenportal:xpAccessUnlocks:v1"');
    expect(app).toContain("const PROGRAMMING_BASICS_ACCESS");
    expect(app).toContain("const MUSEUM_XP_ACCESS");
    expect(app).toContain("function xpAccessStatus");
    expect(app).toContain("function unlockXPAccess");
    expect(app).toContain("function museumAccessStatus");
    expect(app).toContain("function isMuseumWingOpen");
    expect(app).toContain("data-museum-wing-tab");
    expect(app).toContain("data-xp-unlock");
    expect(app).toContain("דמי כניסה");
    expect(app).toContain("מסלול יסוד סגור לפני חומר מתקדם");
    expect(app).toContain("ה-XP הוא שער צבירה ואינו מוחק רמה קיימת");
  });

  it("keeps locked museum access keyboard-readable and reduced-motion safe", () => {
    expect(app).toContain('role="tablist" aria-label="ניווט אגפי המוזיאון"');
    expect(app).toContain('role="tab"');
    expect(app).toContain('aria-selected="${wing.id === activeWing ? "true" : "false"}"');
    expect(app).toContain('aria-controls="${esc(wing.target || "programming-museum-access-gate")}"');
    expect(app).toContain('aria-disabled="${status.unlocked || !status.canUnlock ? "true" : "false"}"');
    expect(app).toContain('aria-label="${esc(`${actionLabel}: ${status.title}`)}"');
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("body.museum-reduced-motion .museum-wing-nav button");
    expect(css).toContain("body.museum-reduced-motion .xp-access-panel button");
  });

  it("includes store styling", () => {
    [
      ".reward-store-view",
      ".reward-store-head",
      ".reward-store-balance",
      ".store-filter.active",
      ".store-grid",
      ".store-card.owned",
      ".store-card.locked",
      ".theme-shop-panel",
      ".theme-shop-swatch.active",
      "html.cosmetic-accessible-outline",
      ".store-purchases",
      ".museum-ticket-status",
      ".museum-experience-lock",
      ".museum-wing-card.locked-ticket",
      ".museum-access-gate",
      ".xp-access-panel",
      ".xp-foundation-path-grid",
    ].forEach((selector) => expect(css).toContain(selector));
  });
});
