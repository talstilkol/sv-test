// src/boot/consent-onboarding.js
//
// Two-stage first-run flow:
//
//   1. Consent banner — gates whether localStorage may be used.
//      localStorage["lumen-consent"]:
//        - "accept"  → save progress permitted
//        - "decline" → in-memory only this session
//        - missing   → show banner
//
//   2. Onboarding overlay — shows only after consent=accept and
//      localStorage["lumen-onboarded"] is missing.
//
// Decline path:
//   window.__lumenConsentDeclined = true is set so the rest of app.js
//   can choose to keep state in memory only (future enhancement).

(() => {
  function showOnboarding() {
    try {
      if (localStorage.getItem("lumen-onboarded") === "1") return;
    } catch (_) { return; }
    const overlay = document.getElementById("onboarding-overlay");
    if (!overlay) return;
    overlay.removeAttribute("hidden");
    const dismiss = (target) => {
      try { localStorage.setItem("lumen-onboarded", "1"); } catch (_) {}
      overlay.setAttribute("hidden", "");
      if (target) {
        const btn = document.getElementById(target);
        if (btn) btn.click();
      }
    };
    overlay.querySelectorAll("[data-onboarding]").forEach((btn) => {
      btn.addEventListener("click", () => dismiss(btn.getAttribute("data-onboarding")));
    });
    document.getElementById("onboarding-skip")?.addEventListener("click", () => dismiss(null));
    overlay.addEventListener("keydown", (e) => { if (e.key === "Escape") dismiss(null); });
  }

  function showConsent() {
    let stored;
    try { stored = localStorage.getItem("lumen-consent"); } catch (_) { stored = "decline"; }
    if (stored === "accept") {
      showOnboarding();
      return;
    }
    if (stored === "decline") {
      window.__lumenConsentDeclined = true;
      return;
    }
    const banner = document.getElementById("consent-banner");
    if (!banner) {
      // Banner missing → fail-open (preserves existing UX).
      showOnboarding();
      return;
    }
    banner.removeAttribute("hidden");
    document.getElementById("consent-accept")?.addEventListener("click", () => {
      try { localStorage.setItem("lumen-consent", "accept"); } catch (_) {}
      banner.setAttribute("hidden", "");
      showOnboarding();
    });
    document.getElementById("consent-decline")?.addEventListener("click", () => {
      try { localStorage.setItem("lumen-consent", "decline"); } catch (_) {}
      banner.setAttribute("hidden", "");
      window.__lumenConsentDeclined = true;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showConsent);
  } else {
    showConsent();
  }
})();
