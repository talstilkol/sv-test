# Qwen Runtime Repair Improvement Plan

Current runnable score after materialization: **65/100**.

Why the score dropped from the earlier static estimate:
- Static guard passed the SV Library contract: 11/11.
- Materialization succeeded: 18 source files written.
- Frontend build failed because the generated project had no working Vite entry at first, and the Day 7 repair pointed to `src/main.js` while the project contains `src/main.jsx`.
- Backend smoke failed because `server/server.js` requires Express, but the backend has no `server/package.json` and no backend dependency install path.

## Goal

Move Qwen from “static contract pass” to “materialized project passes install/build/API smoke” in three consecutive simulations.

## New Training Loop

1. Require file-path fenced blocks for every source file.
2. Materialize the Markdown response into `output/qwen-coder-next/<run>/materialized-project`.
3. Run static guard with the simulation contract.
4. Run runtime evaluator with install/build/backend smoke.
5. Feed Day 7 only:
   - materialized file list,
   - failing command,
   - stderr/stdout,
   - exact affected path.
6. Reject repair answers that only give commands when a file is missing.
7. Re-materialize the repair response into the same generated output folder and rerun evaluator.

## New Failure Targets

- Frontend entry integrity: `client/index.html` must exist and point to the real `src/main.jsx` or `src/main.tsx`.
- Backend dependency integrity: backend/server folder must include its own `package.json` when it imports Express/Mongoose/CORS.
- Repair precision: Day 7 must output corrected files, not only prose or install commands.
- Verification honesty: no check may be marked passed unless the actual command output was supplied.

## Promotion Rule

Raise the model score above 90 only after:
- three full simulations pass static guard,
- three materialized builds pass,
- backend smoke starts and returns expected GET responses,
- Day 7 repair improves score instead of keeping it flat.
