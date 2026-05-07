
const fs = require('fs');
const path = require('path');
const FilePackage = require('./solution.js');
const checks = [];
try {
  const base = path.join(__dirname, 'case_file.txt');
  const renamed = path.join(__dirname, 'renamed_file.txt');
  const instance = new FilePackage(base);
  checks.push({ name: 'constructor creates file', ok: fs.existsSync(base) });
  if (typeof instance.appendContent === 'function') instance.appendContent('hello world');
  checks.push({ name: 'append writes content', ok: fs.readFileSync(base, 'utf8').includes('hello world') });
  checks.push({ name: 'searchWord true', ok: typeof instance.searchWord === 'function' && instance.searchWord('world') === true });
  if (typeof instance.rename === 'function') instance.rename(renamed);
  checks.push({ name: 'rename creates target', ok: fs.existsSync(renamed) });
  if (typeof instance.copy === 'function') instance.copy();
  const copyCandidates = fs.readdirSync(__dirname).filter((name) => name.includes('copy'));
  checks.push({ name: 'copy creates copy', ok: copyCandidates.length > 0 });
} catch (error) {
  checks.push({ name: 'node file runtime', ok: false, error: String(error && error.stack ? error.stack : error) });
}
process.stdout.write(JSON.stringify({ checks }));
