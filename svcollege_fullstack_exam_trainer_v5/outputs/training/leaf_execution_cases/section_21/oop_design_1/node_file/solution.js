// file-package.js
class FilePackage {
  constructor(filename, content) {
    // שדות חובה
    if (!filename || typeof filename !== 'string') {
      throw new Error('filename is required and must be a string');
    }
    if (!content || typeof content !== 'string') {
      throw new Error('content is required and must be a string');
    }
    this.filename = filename;
    this.content = content;
  }

  appendContent(text) {
    if (typeof text !== 'string') {
      throw new Error('text must be a string');
    }
    this.content += text;
  }

  searchWord(word) {
    if (typeof word !== 'string') {
      throw new Error('word must be a string');
    }
    // חיפוש מילה מדויקת (case-sensitive), מפרידים לפי מפרידי מילים
    const words = this.content.split(/\s+/);
    return words.includes(word);
  }

  rename(newName) {
    if (typeof newName !== 'string' || !newName) {
      throw new Error('newName must be a non-empty string');
    }
    this.filename = newName;
  }

  copy() {
    return new FilePackage(this.filename, this.content);
  }
}

module.exports = FilePackage;