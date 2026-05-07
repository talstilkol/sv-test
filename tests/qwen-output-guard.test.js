const fs = require("fs");
const path = require("path");
const guard = require("../scripts/report_qwen_output_guard.js");

const ROOT = path.resolve(__dirname, "..");
const TMP = path.join("/private/tmp", "qwen-output-guard-fixture");
const CONTRACT = path.join(ROOT, "docs/qwen-coder-next-training/contracts/sv-library-contract.json");

function resetTmp() {
  fs.rmSync(TMP, { recursive: true, force: true });
  fs.mkdirSync(path.join(TMP, "backend"), { recursive: true });
  fs.mkdirSync(path.join(TMP, "frontend", "src"), { recursive: true });
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

function writePassingFixture() {
  resetTmp();
  write(
    path.join(TMP, "backend", "index.js"),
    `
      const express = require("express");
      const cors = require("cors");
      const mongoose = require("mongoose");
      const app = express();
      app.use(cors());
      app.use(express.json());
      mongoose.connect(process.env.MONGO_URI);
      app.get("/", (req, res) => res.status(200).json({ message: "ok" }));
      app.use("/api/books", router);
      router.get("/", listBooks);
      router.get("/:id", getBook);
      router.post("/", createBook);
      router.put("/:id", updateBook);
      router.delete("/:id", deleteBook);
      router.post("/borrow/:id", borrowBook);
      function validateBook(book) {
        const genres = ["Fiction", "Science", "History", "Biography"];
        const required = ["title", "author", "year", "genre", "isAvailable", "borrowedBy"];
        if (!required.every((field) => field in book)) return { status: 400 };
        if (!genres.includes(book.genre)) return { status: 400 };
        if (!book.id) return { status: 404 };
        return { status: 500 };
      }
    `,
  );
  write(
    path.join(TMP, "frontend", "src", "App.jsx"),
    `
      import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
      import { useEffect } from "react";
      const api = import.meta.env.VITE_API_URL;
      export function App() {
        return <BrowserRouter><Routes><Route path="/books" element={<div>{api}</div>} /></Routes></BrowserRouter>;
      }
      export function Edit() {
        const { id } = useParams();
        const navigate = useNavigate();
        useEffect(() => {}, [id]);
        return <button onClick={() => navigate("/books")}>Save</button>;
      }
    `,
  );
  write(
    path.join(TMP, "book-stats.js"),
    `
      function bookStats(books) {
        if (!Array.isArray(books)) throw new Error("Must be array");
        return {
          availableCount: 0,
          borrowedCount: 0,
          oldestYear: null,
          newestYear: null,
          mostCommonGenre: null,
        };
      }
    `,
  );
  write(
    path.join(TMP, "book-types.ts"),
    `
      interface Book { title: string; author: string; year: number; genre: string; isAvailable: boolean; borrowedBy: string; }
      function filterBooks(books: Book[], filters: Partial<Book>): Book[] { return books.filter(() => Boolean(filters)); }
    `,
  );
}

describe("qwen output guard", () => {
  afterEach(() => {
    fs.rmSync(TMP, { recursive: true, force: true });
  });

  it("passes a generated project that satisfies the SV Library contract", () => {
    writePassingFixture();
    const report = guard.buildReport({ target: TMP, contract: CONTRACT });

    expect(report.reportVersion).toBe("qwen-output-guard-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.summary.failed).toBe(0);
  });

  it("blocks native random API usage and fabricated-data markers", () => {
    resetTmp();
    const forbiddenRandom = ["Math", "random"].join(".");
    write(
      path.join(TMP, "bad.js"),
      `
        const id = ${forbiddenRandom}();
        const users = "demo data";
      `,
    );

    const report = guard.buildReport({ target: TMP });
    const failedIds = report.blockers.map((blocker) => blocker.id);

    expect(failedIds).toContain("no-native-random-api");
    expect(failedIds).toContain("no-placeholder-or-fabricated-data");
  });

  it("reports missing contract endpoints", () => {
    resetTmp();
    write(path.join(TMP, "backend", "index.js"), `const app = express(); app.get("/", handler);`);

    const report = guard.buildReport({ target: TMP, contract: CONTRACT });
    const endpointCheck = report.checks.find((check) => check.id === "contract-required-endpoints");

    expect(endpointCheck.passed).toBe(false);
    expect(endpointCheck.detail).toContain("GET /api/books");
  });

  it("writes JSON and Markdown reports next to the scanned output", () => {
    writePassingFixture();
    const report = guard.buildReport({ target: TMP, contract: CONTRACT });
    const written = guard.writeReport(report, TMP);

    expect(written.jsonPath).toContain("qwen-output-guard-report.json");
    expect(written.mdPath).toContain("qwen-output-guard-report.md");
    expect(fs.existsSync(path.join(TMP, "qwen-output-guard-report.json"))).toBe(true);
    expect(fs.readFileSync(path.join(TMP, "qwen-output-guard-report.md"), "utf8")).toContain(
      "Qwen Output Guard Report",
    );
  });
});
