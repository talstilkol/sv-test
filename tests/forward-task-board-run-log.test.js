const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const updater = require("../scripts/update_forward_task_board.js");

const ROOT = path.resolve(__dirname, "..");

describe("forward task board run log updater", () => {
  it("escapes markdown cells and inserts a deterministic V/X/WAIT row", () => {
    const board = [
      "# Board",
      "",
      "עודכן: 2026-05-06 10:00 IDT  ",
      "",
      "## יומן ריצות",
      "",
      "| זמן | משימה | פקודה / פעולה | משך | תוצאה | הערה |",
      "| --- | --- | --- | ---: | --- | --- |",
      "",
      "## סדר עבודה מומלץ",
      "",
    ].join("\n");
    const next = updater.updateBoard(board, {
      time: "2026-05-06 17:22 IDT",
      task: "FB-009",
      command: "npm test -- --run",
      duration: "1 שנ׳",
      result: "V",
      note: "a | b",
    });

    expect(next).toContain("עודכן: 2026-05-06 17:22 IDT  ");
    expect(next).toContain("| 2026-05-06 17:22 IDT | FB-009 | `npm test -- --run` | 1 שנ׳ | V | a \\| b |");
  });

  it("supports dry-run through the package script without editing the board", () => {
    const boardPath = path.join(ROOT, "FORWARD_TASK_BOARD.md");
    const before = fs.readFileSync(boardPath, "utf8");
    const result = spawnSync("npm", [
      "run",
      "task-board:run-log",
      "--",
      "--dry-run",
      "--time",
      "2026-05-06 17:22 IDT",
      "--task",
      "FB-009",
      "--command",
      "npm test -- --run",
      "--duration",
      "1 שנ׳",
      "--result",
      "V",
      "--note",
      "dry run",
    ], {
      cwd: ROOT,
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("| 2026-05-06 17:22 IDT | FB-009 | `npm test -- --run` | 1 שנ׳ | V | dry run |");
    expect(fs.readFileSync(boardPath, "utf8")).toBe(before);
  });
});
