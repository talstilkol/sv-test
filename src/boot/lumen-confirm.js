// src/boot/lumen-confirm.js
//
// Promise-based replacement for native window.confirm. Renders an in-app
// modal styled with the design system. Returns a Promise<boolean> that
// resolves true on confirm, false on cancel or Esc.
//
// USAGE:
//   const ok = await window.lumenConfirm("Reset all scores?", { primary: "Reset", secondary: "Keep" });
//   if (!ok) return;
//
// FALLBACK:
//   If the modal markup is missing for any reason (e.g. partial DOM), falls
//   back to native confirm() so the call site never blows up.

(() => {
  function lumenConfirm(message, opts = {}) {
    const dlg = document.getElementById("lumen-confirm");
    const titleEl = document.getElementById("lumen-confirm-title");
    const bodyEl = document.getElementById("lumen-confirm-body");
    const yesBtn = document.getElementById("lumen-confirm-yes");
    const noBtn = document.getElementById("lumen-confirm-no");
    if (!dlg || !titleEl || !bodyEl || !yesBtn || !noBtn) {
      return Promise.resolve(window.confirm(String(message || "")));
    }
    return new Promise((resolve) => {
      titleEl.textContent = opts.title || "לאשר?";
      bodyEl.textContent = String(message || "");
      yesBtn.textContent = opts.primary || "אישור";
      noBtn.textContent = opts.secondary || "ביטול";
      yesBtn.classList.toggle("lumen-confirm-btn-danger", Boolean(opts.danger));
      const cleanup = () => {
        dlg.setAttribute("hidden", "");
        yesBtn.removeEventListener("click", onYes);
        noBtn.removeEventListener("click", onNo);
        document.removeEventListener("keydown", onKey, true);
      };
      const onYes = () => { cleanup(); resolve(true); };
      const onNo = () => { cleanup(); resolve(false); };
      const onKey = (e) => {
        if (e.key === "Escape") { e.stopPropagation(); onNo(); }
        else if (e.key === "Enter" && document.activeElement !== noBtn) { onYes(); }
      };
      yesBtn.addEventListener("click", onYes);
      noBtn.addEventListener("click", onNo);
      document.addEventListener("keydown", onKey, true);
      dlg.removeAttribute("hidden");
      // Focus the safer option (cancel) so Enter on a destructive prompt
      // doesn't auto-confirm.
      if (opts.danger) noBtn.focus();
      else yesBtn.focus();
    });
  }

  if (typeof window !== "undefined") {
    window.lumenConfirm = lumenConfirm;
  }
})();
