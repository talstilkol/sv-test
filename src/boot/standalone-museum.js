// src/boot/standalone-museum.js
//
// Earliest possible boot script. Sets a class on <html> if the URL has
// ?standalone=museum or ?view=museum so the museum-only stylesheet can
// hide the SPA shell during render. Must run before paint.

(() => {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("standalone") === "museum" || params.get("view") === "museum") {
      document.documentElement.classList.add("standalone-museum-boot");
    }
  } catch (_) {}
})();
