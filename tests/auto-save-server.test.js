/**
 * Auto-Save Server Persistence Tests
 *
 * Verifies the local Node server's profile persistence contract:
 *   - GET  /api/profile reads from disk
 *   - POST /api/profile writes atomically
 *   - Restart preserves state
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const http = require("http");
const { spawn } = require("child_process");

const PROFILE_FILE = path.join(os.homedir(), ".lumenportal", "profile.json");
const PORT = 18999; // unique test port

function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const opts = {
      method: options.method || "GET",
      headers: options.headers || {},
    };
    const req = http.request(`http://localhost:${PORT}${url}`, opts, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () =>
        resolve({
          status: res.statusCode,
          json: () => JSON.parse(body),
          text: () => body,
        })
      );
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn("node", ["server.js"], {
      env: { ...process.env, PORT: String(PORT) },
      cwd: path.resolve(__dirname, ".."),
    });
    let ready = false;
    proc.stdout.on("data", (data) => {
      if (!ready && /Listening on/.test(String(data))) {
        ready = true;
        setTimeout(() => resolve(proc), 100);
      }
    });
    proc.on("error", reject);
    setTimeout(() => {
      if (!ready) reject(new Error("server never became ready"));
    }, 3000);
  });
}

function stopServer(proc) {
  return new Promise((resolve) => {
    proc.on("exit", () => resolve());
    proc.kill();
  });
}

describe("auto-save server persistence", () => {
  let backup = null;

  beforeAll(() => {
    // Backup any existing user profile
    if (fs.existsSync(PROFILE_FILE)) {
      backup = fs.readFileSync(PROFILE_FILE, "utf8");
    }
  });

  afterAll(() => {
    // Restore user profile
    if (backup !== null) {
      fs.writeFileSync(PROFILE_FILE, backup, "utf8");
    } else if (fs.existsSync(PROFILE_FILE)) {
      fs.unlinkSync(PROFILE_FILE);
    }
  });

  it("server starts on configurable PORT and exposes /api/health", async () => {
    const server = await startServer();
    try {
      const res = await fetch("/api/health");
      expect(res.status).toBe(200);
      const data = res.json();
      expect(data.ok).toBe(true);
    } finally {
      await stopServer(server);
    }
  });

  it("POST /api/profile persists data across restarts", async () => {
    // Clear existing profile to start fresh
    if (fs.existsSync(PROFILE_FILE)) fs.unlinkSync(PROFILE_FILE);

    const server1 = await startServer();
    try {
      const payload = {
        version: 2,
        profile: { id: "test-user", name: "Test" },
        scores: { "lumenportal:scores:v1": JSON.stringify({ a: 1 }) },
        economy: { xp: 42 },
      };
      const res1 = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      expect(res1.status).toBe(200);
      expect(res1.json().ok).toBe(true);
    } finally {
      await stopServer(server1);
    }

    // Restart and verify state still readable
    const server2 = await startServer();
    try {
      const res2 = await fetch("/api/profile");
      expect(res2.status).toBe(200);
      const data = res2.json();
      expect(data.profile?.id).toBe("test-user");
      expect(data.economy?.xp).toBe(42);
      expect(data.savedAt).toBeTruthy();
    } finally {
      await stopServer(server2);
    }
  });

  it("GET /api/profile returns { empty: true } when no file exists", async () => {
    if (fs.existsSync(PROFILE_FILE)) fs.unlinkSync(PROFILE_FILE);

    const server = await startServer();
    try {
      const res = await fetch("/api/profile");
      expect(res.status).toBe(200);
      const data = res.json();
      expect(data.empty).toBe(true);
    } finally {
      await stopServer(server);
    }
  });

  it("uses atomic write (tmp file + rename)", async () => {
    if (fs.existsSync(PROFILE_FILE)) fs.unlinkSync(PROFILE_FILE);

    const server = await startServer();
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x: 1 }),
      });
      // tmp file should not linger
      const tmp = PROFILE_FILE + ".tmp";
      expect(fs.existsSync(tmp)).toBe(false);
      expect(fs.existsSync(PROFILE_FILE)).toBe(true);
    } finally {
      await stopServer(server);
    }
  });
});
