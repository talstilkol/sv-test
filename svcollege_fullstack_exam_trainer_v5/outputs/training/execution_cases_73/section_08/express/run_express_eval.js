
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
      const ok = await fn();
      checks.push({ name, ok: Boolean(ok) });
    } catch (error) {
      checks.push({ name, ok: false, error: String(error && error.message ? error.message : error) });
    }
  }

  
  await safe("POST filter", async () => { const res = await supertest(app).post("/api/items/filter").send({ value: 50, max_salary: 50, threshold: 50 }); return res.status < 500 && Array.isArray(res.body); });
  
  
  
  

  process.stdout.write(JSON.stringify({ checks }));
}

run().catch((error) => {
  process.stdout.write(JSON.stringify({
    checks: [{ name: "router runtime", ok: false, error: String(error && error.stack ? error.stack : error) }]
  }));
});
