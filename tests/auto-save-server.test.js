/**
 * Auto-Save Server Persistence Tests
 *
 * Verifies the local Node server's profile persistence contract without
 * opening a TCP port. The sandbox may reject listen(), but the product route
 * logic still needs deterministic coverage.
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const { Readable } = require("stream");

const PROFILE_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "lumenportal-profile-test-"));
process.env.LUMEN_PROFILE_DIR = PROFILE_DIR;

const serverModule = require("../server.js");
const PROFILE_FILE = serverModule.profilePaths().file;

function makeReq(method, url, body) {
  const req = Readable.from(body ? [Buffer.from(body)] : []);
  req.method = method;
  req.url = url;
  req.headers = body ? { "content-type": "application/json" } : {};
  return req;
}

function callRoute(method, url, body) {
  return new Promise((resolve) => {
    const res = {
      statusCode: 200,
      headers: {},
      body: "",
      setHeader(name, value) {
        this.headers[String(name).toLowerCase()] = value;
      },
      writeHead(status, headers = {}) {
        this.statusCode = status;
        Object.entries(headers).forEach(([name, value]) => this.setHeader(name, value));
      },
      end(chunk = "") {
        this.body += chunk ? String(chunk) : "";
        resolve({
          status: this.statusCode,
          headers: this.headers,
          text: this.body,
          json: () => JSON.parse(this.body),
        });
      },
    };

    serverModule.handleRequest(makeReq(method, url, body), res);
  });
}

describe("auto-save server persistence", () => {
  afterEach(() => {
    if (fs.existsSync(PROFILE_FILE)) fs.unlinkSync(PROFILE_FILE);
    const tmp = PROFILE_FILE + ".tmp";
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  });

  afterAll(() => {
    fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
    delete process.env.LUMEN_PROFILE_DIR;
  });

  it("exposes /api/health through the exported request handler", async () => {
    const res = await callRoute("GET", "/api/health");

    expect(res.status).toBe(200);
    const data = res.json();
    expect(data.ok).toBe(true);
    expect(data.profileExists).toBe(false);
  });

  it("POST /api/profile persists data and GET reads it back", async () => {
    const payload = {
      version: 2,
      profile: { id: "test-user", name: "Test" },
      scores: { "lumenportal:scores:v1": JSON.stringify({ a: 1 }) },
      economy: { xp: 42 },
    };

    const post = await callRoute("POST", "/api/profile", JSON.stringify(payload));
    expect(post.status).toBe(200);
    expect(post.json().ok).toBe(true);

    const get = await callRoute("GET", "/api/profile");
    expect(get.status).toBe(200);
    const data = get.json();
    expect(data.profile?.id).toBe("test-user");
    expect(data.economy?.xp).toBe(42);
    expect(data.savedAt).toBeTruthy();
  });

  it("GET /api/profile returns { empty: true } when no file exists", async () => {
    const res = await callRoute("GET", "/api/profile");

    expect(res.status).toBe(200);
    const data = res.json();
    expect(data.empty).toBe(true);
  });

  it("uses atomic write (tmp file + rename)", async () => {
    await callRoute("POST", "/api/profile", JSON.stringify({ x: 1 }));

    expect(fs.existsSync(PROFILE_FILE + ".tmp")).toBe(false);
    expect(fs.existsSync(PROFILE_FILE)).toBe(true);
  });
});
