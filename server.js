#!/usr/bin/env node
/**
 * LumenPortal Local Server
 *
 * Serves static files + persists profile state to disk so that profile,
 * progress, XP, scores, and answered questions survive across server
 * restarts automatically.
 *
 * Endpoints:
 *   GET  /api/profile        → current saved profile JSON (or null)
 *   POST /api/profile        → write profile JSON to disk
 *   GET  /*                  → static file serving
 *
 * Profile file: ~/.lumenportal/profile.json (single-user, local only)
 */
"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = Number(process.env.PORT) || 8765;
const ROOT = __dirname;
const PROFILE_DIR = path.join(os.homedir(), ".lumenportal");
const PROFILE_FILE = path.join(PROFILE_DIR, "profile.json");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json",
};

function ensureProfileDir() {
  if (!fs.existsSync(PROFILE_DIR)) {
    fs.mkdirSync(PROFILE_DIR, { recursive: true });
  }
}

function readProfile() {
  try {
    if (!fs.existsSync(PROFILE_FILE)) return null;
    const txt = fs.readFileSync(PROFILE_FILE, "utf8");
    return JSON.parse(txt);
  } catch (err) {
    console.error("[lumen-server] read profile failed:", err.message);
    return null;
  }
}

function writeProfile(payload) {
  ensureProfileDir();
  // Atomic write: write to tmp, rename
  const tmp = PROFILE_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(payload, null, 2), "utf8");
  fs.renameSync(tmp, PROFILE_FILE);
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers,
  });
  res.end(body);
}

function sendJson(res, status, obj) {
  send(res, status, JSON.stringify(obj), {
    "Content-Type": "application/json; charset=utf-8",
  });
}

function safeJoin(root, target) {
  const decoded = decodeURIComponent(target.split("?")[0]);
  const cleaned = decoded.replace(/\\/g, "/").replace(/^\/+/, "");
  const resolved = path.resolve(root, cleaned || "index.html");
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function serveStatic(req, res) {
  let filePath = safeJoin(ROOT, req.url);
  if (!filePath) return send(res, 403, "Forbidden");

  fs.stat(filePath, (err, stat) => {
    if (err) {
      // Maybe directory or 404
      if (err.code === "ENOENT") return send(res, 404, "Not Found");
      return send(res, 500, "Server Error");
    }
    if (stat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || "application/octet-stream";
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") return send(res, 404, "Not Found");
        return send(res, 500, "Server Error");
      }
      res.writeHead(200, {
        "Content-Type": mime,
        "Cache-Control": "no-store",
      });
      res.end(data);
    });
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    const MAX = 10 * 1024 * 1024; // 10 MB
    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > MAX) {
        reject(new Error("body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS for local development
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return send(res, 204, "");
  }

  try {
    if (req.url.startsWith("/api/profile")) {
      if (req.method === "GET") {
        const profile = readProfile();
        return sendJson(res, 200, profile || { empty: true });
      }
      if (req.method === "POST") {
        const body = await readBody(req);
        const data = JSON.parse(body);
        writeProfile({ ...data, savedAt: new Date().toISOString() });
        return sendJson(res, 200, { ok: true, savedAt: new Date().toISOString() });
      }
      return send(res, 405, "Method Not Allowed");
    }

    if (req.url === "/api/health") {
      return sendJson(res, 200, { ok: true, profileExists: fs.existsSync(PROFILE_FILE) });
    }

    if (req.method === "GET") {
      return serveStatic(req, res);
    }

    return send(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[lumen-server] error:", err.message);
    return send(res, 500, "Server Error: " + err.message);
  }
});

server.listen(PORT, () => {
  ensureProfileDir();
  const profileExists = fs.existsSync(PROFILE_FILE);
  console.log("┌──────────────────────────────────────────────────────────");
  console.log("│ LumenPortal Server");
  console.log("│ Listening on http://localhost:" + PORT);
  console.log("│ Profile file: " + PROFILE_FILE);
  console.log("│ Profile exists: " + (profileExists ? "yes" : "no (fresh start)"));
  console.log("└──────────────────────────────────────────────────────────");
});
