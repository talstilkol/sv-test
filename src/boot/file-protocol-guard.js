(function fileProtocolGuard() {
  "use strict";

  if (window.location.protocol !== "file:") return;

  document.documentElement.dataset.runtimeProtocol = "file";

  function showWarning() {
    const banner = document.getElementById("file-protocol-warning");
    if (!banner) return;
    banner.hidden = false;
    banner.setAttribute("data-runtime-warning", "file-protocol");
    const command = banner.querySelector("[data-file-dev-command]")?.textContent || "npm run dev";
    const copyButton = banner.querySelector("[data-copy-dev-command]");
    if (copyButton && !copyButton.dataset.bound) {
      copyButton.dataset.bound = "true";
      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(command);
          copyButton.textContent = "הפקודה הועתקה";
        } catch (_) {
          copyButton.textContent = command;
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showWarning, { once: true });
  } else {
    showWarning();
  }
})();
