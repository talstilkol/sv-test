
const mod = require('./solution.js');
const checks = [];
try {
  checks.push({ name: 'exports solve', ok: typeof mod.solve === 'function' });
  if (typeof mod.solve === 'function') {
    
const result = mod.solve([[1,1,2,4,1,1,7],[1,1,1,2,1,1,7],[7,7,1,1,1,1,1]]);
const byNum = new Map(result.map((row) => [row.num, row.count ?? row.counter]));
checks.push({ name: 'matrix count 1', ok: byNum.get(1) === 14 });
checks.push({ name: 'matrix count 2', ok: byNum.get(2) === 2 });
checks.push({ name: 'matrix count 4', ok: byNum.get(4) === 1 });
checks.push({ name: 'matrix count 7', ok: byNum.get(7) === 4 });
try { mod.solve([[1, 'x']]); checks.push({ name: 'throws on non-number', ok: false }); } catch (_) { checks.push({ name: 'throws on non-number', ok: true }); }

  }
} catch (error) {
  checks.push({ name: 'js runtime', ok: false, error: String(error && error.stack ? error.stack : error) });
}
process.stdout.write(JSON.stringify({ checks }));
