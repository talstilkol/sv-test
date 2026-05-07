(function moduleBootstrapLoader() {
  "use strict";

  const currentScript = document.currentScript;
  const moduleSrc = currentScript?.dataset?.modulePath || "/src/main.js?v=core-bootstrap-v2";
  function setBootstrapState(value) {
    if (document.documentElement?.dataset) {
      document.documentElement.dataset.viteBootstrap = value;
    } else if (document.documentElement?.setAttribute) {
      document.documentElement.setAttribute("data-vite-bootstrap", value);
    }
  }

  if (window.location.protocol === "file:") {
    setBootstrapState("file-disabled");
    window.LUMEN_BOOTSTRAP_STATE = Object.freeze({
      legacyScripts: "unknown/unavailable",
      mountedViews: "unknown/unavailable",
      moduleBootstrap: "disabled-file-protocol",
    });
    return;
  }

  const script = document.createElement("script");
  script.type = "module";
  script.src = moduleSrc;
  script.addEventListener("error", () => {
    setBootstrapState("module-error");
  });
  const target = document.head || document.documentElement;
  if (!target || typeof target.appendChild !== "function") {
    setBootstrapState("loader-unavailable");
    return;
  }
  target.appendChild(script);
})();
