(function fileProtocolGuard() {
  "use strict";

  if (window.location.protocol !== "file:") return;

  document.documentElement.dataset.runtimeProtocol = "file";

  function showWarning() {
    const banner = document.getElementById("file-protocol-warning");
    if (!banner) return;
    banner.hidden = false;
    banner.setAttribute("data-runtime-warning", "file-protocol");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showWarning, { once: true });
  } else {
    showWarning();
  }
})();
