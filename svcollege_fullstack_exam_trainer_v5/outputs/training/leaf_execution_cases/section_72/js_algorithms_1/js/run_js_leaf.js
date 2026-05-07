
const mod = require('./solution.js');
const checks = [];
try {
  checks.push({ name: 'exports solve', ok: typeof mod.solve === 'function' });
  if (typeof mod.solve === 'function') {
    
checks.push({ name: 'subsequence true', ok: mod.solve([1,2,3,4], [1,3,4]) === true });
checks.push({ name: 'subsequence true 2', ok: mod.solve([1,2,3,4], [2,4]) === true });
checks.push({ name: 'subsequence false missing', ok: mod.solve([1,2,3,4], [1,2,5]) === false });
checks.push({ name: 'subsequence false order', ok: mod.solve([1,2,3,4], [4,2]) === false });

  }
} catch (error) {
  checks.push({ name: 'js runtime', ok: false, error: String(error && error.stack ? error.stack : error) });
}
process.stdout.write(JSON.stringify({ checks }));
