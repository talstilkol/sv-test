const fs = require('fs');
const path = require('path');

class FilePackage {
  constructor(filename) {
    if (typeof filename !== 'string' || filename.trim() === '') {
      throw new Error('Invalid filename: must be a non-empty string');
    }
    this._filename = filename;
    // Create file if it doesn't exist
    try {
      if (!fs.existsSync(filename)) {
        fs.writeFileSync(filename, '', 'utf8');
      }
    } catch (err) {
      throw new Error(`Failed to initialize file "${filename}": ${err.message}`);
    }
  }

  appendContent(content) {
    try {
      if (typeof content !== 'string') {
        throw new Error('Content must be a string');
      }
      fs.appendFileSync(this._filename, content, 'utf8');
    } catch (err) {
      throw new Error(`Failed to append content to "${this._filename}": ${err.message}`);
    }
  }

  searchWord(word) {
    try {
      if (typeof word !== 'string' || word.trim() === '') {
        throw new Error('Word must be a non-empty string');
      }
      const content = fs.readFileSync(this._filename, 'utf8');
      const words = content.split(/\s+/).filter(w => w.length > 0);
      return words.includes(word);
    } catch (err) {
      throw new Error(`Failed to search for word "${word}" in "${this._filename}": ${err.message}`);
    }
  }

  rename(newFilename) {
    try {
      if (typeof newFilename !== 'string' || newFilename.trim() === '') {
        throw new Error('New filename must be a non-empty string');
      }
      fs.renameSync(this._filename, newFilename);
      this._filename = newFilename;
    } catch (err) {
      throw new Error(`Failed to rename file from "${this._filename}" to "${newFilename}": ${err.message}`);
    }
  }

  copy() {
    try {
      const content = fs.readFileSync(this._filename, 'utf8');
      const newFilename = this._filename + '.copy';
      fs.writeFileSync(newFilename, content, 'utf8');
      return new FilePackage(newFilename);
    } catch (err) {
      throw new Error(`Failed to copy file "${this._filename}": ${err.message}`);
    }
  }
}

module.exports = FilePackage;