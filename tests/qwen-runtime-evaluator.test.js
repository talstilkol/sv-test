const fs = require("fs");
const path = require("path");
const evaluator = require("../scripts/evaluate_qwen_project.js");

const ROOT = path.resolve(__dirname, "..");
const TMP = path.join("/private/tmp", "qwen-runtime-evaluator-fixture");
const CONTRACT = path.join(ROOT, "docs/qwen-coder-next-training/contracts/sv-library-contract.json");

function resetTmp() {
  fs.rmSync(TMP, { recursive: true, force: true });
  fs.mkdirSync(TMP, { recursive: true });
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

function writeStaticPassProject() {
  resetTmp();
  write(
    path.join(TMP, "server", "server.js"),
    `
      const express = require("express");
      const cors = require("cors");
      const mongoose = require("mongoose");
      const app = express();
      const router = express.Router();
      app.use(cors());
      app.use(express.json());
      mongoose.connect(process.env.MONGO_URI);
      app.get("/", (req, res) => res.status(200).json({ message: "ok" }));
      app.use("/api/books", router);
      router.get("/", (req, res) => res.status(200).json([]));
      router.get("/:id", (req, res) => res.status(404).json({ message: "not found" }));
      router.post("/", (req, res) => res.status(400).json({ message: validateBook(req.body).message }));
      router.put("/:id", (req, res) => res.status(500).json({ message: validateBook(req.body).message }));
      router.delete("/:id", (req, res) => res.status(200).json({ deleted: true }));
      router.post("/borrow/:id", (req, res) => res.status(400).json({ message: "borrow requires availability" }));
      function validateBook(book) {
        const genres = ["Fiction", "Science", "History", "Biography"];
        const required = ["title", "author", "year", "genre", "isAvailable", "borrowedBy"];
        if (!book || !required.every((field) => field in book)) return { message: "missing field" };
        if (!genres.includes(book.genre)) return { message: "genre" };
        return { message: "ok" };
      }
      module.exports = app;
    `,
  );
  write(
    path.join(TMP, "frontend", "src", "App.jsx"),
    `
      import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
      import { useEffect } from "react";
      const apiBase = import.meta.env.VITE_API_URL;
      export function App() {
        return <BrowserRouter><Routes><Route path="/books" element={<BookList />} /></Routes></BrowserRouter>;
      }
      function BookList() {
        return <main>{apiBase}</main>;
      }
      export function BookEdit() {
        const { id } = useParams();
        const navigate = useNavigate();
        useEffect(() => {}, [id]);
        return <button onClick={() => navigate("/books")}>Save</button>;
      }
    `,
  );
  write(
    path.join(TMP, "utils", "bookStats.js"),
    `
      function bookStats(books) {
        if (!Array.isArray(books)) throw new Error("books must be an array");
        return {
          totalBooks: books.length,
          availableCount: books.filter((book) => book.isAvailable).length,
          borrowedCount: books.filter((book) => !book.isAvailable).length,
          oldestYear: books.length ? Math.min(...books.map((book) => book.year)) : null,
          newestYear: books.length ? Math.max(...books.map((book) => book.year)) : null,
          mostCommonGenre: null,
        };
      }
      module.exports = { bookStats };
    `,
  );
  write(
    path.join(TMP, "types", "book-types.ts"),
    `
      interface Book {
        title: string;
        author: string;
        year: number;
        genre: "Fiction" | "Science" | "History" | "Biography";
        isAvailable: boolean;
        borrowedBy: string;
      }
      function filterBooks(books: Book[], filters: Partial<Book>): Book[] {
        return books.filter((book) =>
          Object.entries(filters).every(([key, value]) => book[key as keyof Book] === value)
        );
      }
    `,
  );
}

describe("qwen runtime evaluator", () => {
  afterEach(() => {
    fs.rmSync(TMP, { recursive: true, force: true });
  });

  it("scores a materialized project with static contract and syntax checks", async () => {
    writeStaticPassProject();

    const report = await evaluator.evaluate({ target: TMP, contract: CONTRACT });
    const byId = new Map(report.checks.map((check) => [check.id, check]));

    expect(byId.get("target-files").passed).toBe(true);
    expect(byId.get("static-forbidden-scan").passed).toBe(true);
    expect(byId.get("contract-guard").passed).toBe(true);
    expect(byId.get("node-syntax").passed).toBe(true);
    expect(report.summary.score).toBeGreaterThanOrEqual(65);
  });

  it("reports forbidden code and contract drift", async () => {
    resetTmp();
    const forbidden = ["Math", "random"].join(".");
    write(
      path.join(TMP, "server", "server.js"),
      `
        const express = require("express");
        const app = express();
        app.get("/health", (req, res) => res.status(200).json({ id: ${forbidden}() }));
      `,
    );

    const report = await evaluator.evaluate({ target: TMP, contract: CONTRACT });
    const failedIds = report.blockers.map((blocker) => blocker.id);
    const contractCheck = report.checks.find((check) => check.id === "contract-guard");

    expect(failedIds).toContain("static-forbidden-scan");
    expect(failedIds).toContain("contract-guard");
    expect(JSON.stringify(contractCheck.evidence)).toContain("GET /health");
  });
});
