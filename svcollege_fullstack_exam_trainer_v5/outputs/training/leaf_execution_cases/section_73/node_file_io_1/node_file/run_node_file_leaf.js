
const fs = require('fs');
const path = require('path');
const exported = require('./solution.js');
const FilePackage = exported && (exported.FilePackage || exported.default) ? (exported.FilePackage || exported.default) : exported;
const checks = [];
function isPromise(value) {
  return value && typeof value.then === 'function';
}
async function maybeAwait(value) {
  return isPromise(value) ? await value : value;
}
async function run() {
try {
  const filePath = path.join(__dirname, 'leaf_file.txt');
  const renamedPath = path.join(__dirname, 'renamed_leaf_file.txt');
  const copiedPath = path.join(__dirname, 'copied_leaf_file.txt');
  const renamedName = 'renamed_leaf_file.txt';
  const copiedName = 'copied_leaf_file.txt';
  const instance = new FilePackage(filePath);
  await new Promise((resolve) => setTimeout(resolve, 20));
  checks.push({ name: 'constructor creates file', ok: fs.existsSync(filePath) });
  if (typeof instance.appendContent === 'function') await maybeAwait(instance.appendContent('hello world'));
  checks.push({ name: 'append content', ok: fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8').includes('hello world') });
  const searchResult = typeof instance.searchWord === 'function' ? await maybeAwait(instance.searchWord('world')) : false;
  checks.push({ name: 'search word', ok: searchResult === true });
  let renameOk = false;
  if (typeof instance.rename === 'function') {
    try {
      await maybeAwait(instance.rename(renamedPath));
      renameOk = fs.existsSync(renamedPath);
    } catch (error) {
      if (fs.existsSync(filePath)) {
        await maybeAwait(instance.rename(renamedName));
        renameOk = fs.existsSync(renamedPath) || fs.existsSync(path.join(process.cwd(), renamedName));
      }
    }
  }
  checks.push({ name: 'rename file', ok: renameOk });
  let copyOk = false;
  if (typeof instance.copy === 'function') {
    try {
      await maybeAwait(instance.copy(copiedPath));
      copyOk = fs.existsSync(copiedPath) || fs.readdirSync(__dirname).some((name) => name.includes('copy'));
    } catch (error) {
      try {
        await maybeAwait(instance.copy(copiedName));
        copyOk = fs.existsSync(copiedPath) || fs.readdirSync(__dirname).some((name) => name.includes('copy')) || fs.readdirSync(process.cwd()).some((name) => name.includes('copy'));
      } catch (innerError) {
        copyOk = false;
      }
    }
  }
  checks.push({ name: 'copy file', ok: copyOk });
} catch (error) {
  checks.push({ name: 'node file runtime', ok: false, error: String(error && error.stack ? error.stack : error) });
}
process.stdout.write(JSON.stringify({ checks }));
}
run();
