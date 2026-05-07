
const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const supertest = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/supertest@7.2.2/node_modules/supertest");
const router = require('./router.js');

async function run() {
  const app = express();
  app.use(express.json());
  app.use('/api/items', router);
  const checks = [];
  async function safe(name, fn) {
    try {
      checks.push({ name, ok: Boolean(await fn()) });
    } catch (error) {
      checks.push({ name, ok: false, error: String(error && error.message ? error.message : error) });
    }
  }
  
  
  await safe("POST create valid", async () => { const paths = ["/api/items", "/api/items/add", "/api/items/addnewcourse"]; const payloads = [{ id: 3, name: "New Item", subject: "Math", text: "hello", value: 42, salary: 42, grade: 90 }, { id: 4, name: "Another Item", subject: "Math", text: "hello", value: 42, salary: 42, grade: "A" }, { id: 5, code: "54321", name: "Green Box", inStock: true, value: 42, salary: 42, grade: "A" }]; for (const path of paths) { for (const payload of payloads) { const res = await supertest(app).post(path).send(payload); if ([200, 201].includes(res.status)) return true; } } return false; }); await safe("POST create invalid", async () => { const paths = ["/api/items", "/api/items/add", "/api/items/addnewcourse"]; for (const path of paths) { const res = await supertest(app).post(path).send({}); if ([400, 409, 422].includes(res.status)) return true; } return false; });
  
  
  process.stdout.write(JSON.stringify({ checks }));
}
run().catch((error) => process.stdout.write(JSON.stringify({ checks: [{ name: "api runtime", ok: false, error: String(error && error.stack ? error.stack : error) }] })));
