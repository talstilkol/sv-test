const fs = require('fs');
const path = require('path');

class FilePackage {
  constructor(filename) {
    this.filename = filename;
    // אם הקובץ לא קיים – נוצר קובץ ריק
    if (!fs.existsSync(filename)) {
      fs.writeFileSync(filename, '', 'utf8');
    }
  }

  appendContent(content) {
    fs.appendFileSync(this.filename, content, 'utf8');
  }

  searchWord(word) {
    const content = fs.readFileSync(this.filename, 'utf8');
    const words = content.split(/\s+/); // מפצל לפי רווחים (כולל שורות חדשות)
    return words.includes(word);
  }

  rename(newFilename) {
    fs.renameSync(this.filename, newFilename);
    this.filename = newFilename;
  }

  copy() {
    // שם הקובץ החדש: original.txt → original-copy.txt
    const ext = path.extname(this.filename); // .txt
    const base = path.basename(this.filename, ext); // original
    const dir = path.dirname(this.filename);
    const newFilename = path.join(dir, `${base}-copy${ext}`);
    fs.copyFileSync(this.filename, newFilename);
    return newFilename; // אפשר לחזיר את השם החדש אם נחוץ
  }
}

module.exports = { FilePackage };