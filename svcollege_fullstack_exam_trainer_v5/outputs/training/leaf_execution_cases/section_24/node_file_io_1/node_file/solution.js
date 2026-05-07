// file_package.js
const fs = require('fs').promises;
const path = require('path');

class FilePackage {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
    this._ensureFileExists();
  }

  async _ensureFileExists() {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, '', 'utf8');
    }
  }

  async appendContent(text) {
    await fs.appendFile(this.filePath, text, 'utf8');
  }

  async searchWord(word) {
    const content = await fs.readFile(this.filePath, 'utf8');
    return content.includes(word);
  }

  async rename(newName) {
    const newFilePath = path.resolve(newName);
    await fs.rename(this.filePath, newFilePath);
    this.filePath = newFilePath;
  }

  async copy(newName) {
    const newFilePath = path.resolve(newName);
    const content = await fs.readFile(this.filePath, 'utf8');
    await fs.writeFile(newFilePath, content, 'utf8');
    return newFilePath;
  }
}

module.exports = FilePackage;