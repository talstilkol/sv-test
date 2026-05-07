
const fs = require('fs');
const path = require('path');
const FilePackage = require('./solution.js');
const checks = [];
try {
  const filePath = path.join(__dirname, 'leaf_file.txt');
  const renamedPath = path.join(__dirname, 'renamed_leaf_file.txt');
  const instance = new FilePackage(filePath);
  checks.push({ name: 'constructor creates file', ok: fs.existsSync(filePath) });
  if (typeof instance.appendContent === 'function') instance.appendContent('hello world');
  checks.push({ name: 'append content', ok: fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8').includes('hello world') });
  checks.push({ name: 'search word', ok: typeof instance.searchWord === 'function' && instance.searchWord('world') === true });
  if (typeof instance.rename === 'function') instance.rename(renamedPath);
  checks.push({ name: 'rename file', ok: fs.existsSync(renamedPath) });
  if (typeof instance.copy === 'function') instance.copy();
  checks.push({ name: 'copy file', ok: fs.readdirSync(__dirname).some((name) => name.includes('copy')) });
} catch (error) {
  checks.push({ name: 'node file runtime', ok: false, error: String(error && error.stack ? error.stack : error) });
}
process.stdout.write(JSON.stringify({ checks }));
