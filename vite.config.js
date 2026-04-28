// Vite bootstrap for the current static app.
// The app still loads legacy global scripts from index.html; this config
// introduces dev/build/preview without forcing a risky one-shot rewrite.
const path = require("node:path");
const fs = require("node:fs");
const { defineConfig } = require("vite");

function copyLegacyStaticPlugin() {
  const legacyDirs = ["data", "lib", "src"];
  const legacyFiles = [
    "app.js",
    "content-loader.js",
    "manifest.json",
    "museum.html",
    "service-worker.js",
    "style.css",
  ];

  return {
    name: "copy-legacy-static-assets",
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      legacyDirs.forEach((dir) => {
        const from = path.resolve(__dirname, dir);
        const to = path.join(outDir, dir);
        if (fs.existsSync(from)) {
          fs.rmSync(to, { recursive: true, force: true });
          fs.cpSync(from, to, { recursive: true });
        }
      });
      legacyFiles.forEach((file) => {
        const from = path.resolve(__dirname, file);
        const to = path.join(outDir, file);
        if (fs.existsSync(from)) {
          fs.copyFileSync(from, to);
        }
      });
    },
  };
}

function preserveLegacyScriptTagsPlugin() {
  const legacySrcAttr = "data-lumen-legacy-src";
  const scriptTagPattern = /<script\b([^>]*)\bsrc=(["'])([^"']+)\2([^>]*)><\/script>/g;

  function isModuleScript(attrs) {
    return /\btype\s*=\s*(["'])module\1/i.test(attrs);
  }

  function isExternalScript(src) {
    return /^(https?:)?\/\//i.test(src);
  }

  function protectLegacyScripts(html) {
    return html.replace(scriptTagPattern, (tag, beforeSrc, quote, src, afterSrc) => {
      const attrs = `${beforeSrc}${afterSrc}`;
      if (isModuleScript(attrs) || isExternalScript(src)) return tag;
      return `<script${beforeSrc} ${legacySrcAttr}=${quote}${src}${quote}${afterSrc}></script>`;
    });
  }

  function restoreLegacyScripts(html) {
    const protectedTagPattern = new RegExp(
      `<script\\b([^>]*)\\b${legacySrcAttr}=(["'])([^"']+)\\2([^>]*)><\\/script>`,
      "g"
    );
    return html.replace(protectedTagPattern, (tag, beforeSrc, quote, src, afterSrc) => {
      return `<script${beforeSrc} src=${quote}${src}${quote}${afterSrc}></script>`;
    });
  }

  return [
    {
      name: "lumen-protect-legacy-script-tags",
      apply: "build",
      transformIndexHtml: {
        order: "pre",
        handler: protectLegacyScripts,
      },
    },
    {
      name: "lumen-restore-legacy-script-tags",
      apply: "build",
      transformIndexHtml: {
        order: "post",
        handler: restoreLegacyScripts,
      },
    },
  ];
}

module.exports = defineConfig({
  root: ".",
  publicDir: false,
  plugins: [...preserveLegacyScriptTagsPlugin(), copyLegacyStaticPlugin()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: false,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
          if (id.includes(`${path.sep}src${path.sep}views${path.sep}`)) return "views";
          if (id.includes(`${path.sep}src${path.sep}core${path.sep}`)) return "core";
          if (id.includes(`${path.sep}src${path.sep}ui${path.sep}`)) return "ui";
          if (id.includes(`${path.sep}src${path.sep}utils${path.sep}`)) return "utils";
          return undefined;
        },
      },
    },
  },
});
