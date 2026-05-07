const fs = require('fs');
const path = require('path');

class FilePackage {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
    // אם הקובץ לא קיים – נוצר אותו ריק
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '', 'utf8');
    }
  }

  // מוסיף טקסט לקובץ (בלי לדרוס את הקיים)
  appendContent(content) {
    fs.appendFileSync(this.filePath, content + '\n', 'utf8');
  }

  // מחפש מילה בקובץ – מחזירה true/false
  searchWord(word) {
    const content = fs.readFileSync(this.filePath, 'utf8');
    return content.includes(word);
  }

  // משנה את שם הקובץ
  rename(newName) {
    const newFilePath = path.join(path.dirname(this.filePath), newName);
    fs.renameSync(this.filePath, newFilePath);
    this.filePath = newFilePath;
  }

  // מעתיק את הקובץ לשם חדש ומחזיר את המחלקה של הקובץ החדש
  copy(newName) {
    const newFilePath = path.join(path.dirname(this.filePath), newName);
    fs.copyFileSync(this.filePath, newFilePath);
    return new FilePackage(newFilePath);
  }
}

module.exports = FilePackage;