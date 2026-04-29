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
    expect(app).toContain('id: "challenge.debug-arena"');
    expect(app).toContain('id: "cosmetic.cyber-theme"');
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
    expect(app).toContain("reward-store-balance");
    expect(app).toContain("data-store-filter");
    expect(app).toContain("data-store-buy");
    expect(app).toContain("הרכישות שלי");
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
    expect(app).toContain("data-museum-store-item");
    expect(app).toContain("data-museum-store-link");
    expect(app).toContain("לא נועלים חומר חובה");
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
      ".store-purchases",
      ".museum-ticket-status",
      ".museum-experience-lock",
      ".museum-wing-card.locked-ticket",
    ].forEach((selector) => expect(css).toContain(selector));
  });
});
