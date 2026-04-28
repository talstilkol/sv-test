const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SKIP_DIRS = new Set([".git", ".playwright-cli", "dist", "node_modules"]);
const FORBIDDEN_RANDOM_CALL = new RegExp(["Math", "random"].join("\\."));

function collectSourceFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectSourceFiles(fullPath, out);
      continue;
    }
    if (entry.isFile() && (entry.name.endsWith(".js") || entry.name.endsWith(".ts"))) {
      out.push(fullPath);
    }
  }
  return out;
}

describe("deterministic codebase guard", () => {
  it("does not call native random in JavaScript or TypeScript files", () => {
    const offenders = collectSourceFiles(ROOT)
      .map((file) => ({
        file,
        lines: fs
          .readFileSync(file, "utf8")
          .split(/\r?\n/)
          .map((line, index) => ({ line, number: index + 1 }))
          .filter(({ line }) => FORBIDDEN_RANDOM_CALL.test(line)),
      }))
      .filter(({ lines }) => lines.length > 0);

    expect(offenders).toEqual([]);
  });
});
