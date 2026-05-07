const store = {
  "1": { _id: "1", title: "A", author: "John Doe", year: 2020, genre: "Fiction", isAvailable: true, borrowedBy: "" },
  "2": { _id: "2", title: "B", author: "Jane Doe", year: 2021, genre: "Science", isAvailable: false, borrowedBy: "Tal" }
};

class BookDoc {
  constructor(data) {
    Object.assign(this, data);
  }

  async save() {
    store[this._id] = { ...this };
    return { ...store[this._id] };
  }
}

module.exports = {
  async findById(id) {
    const row = store[id];
    return row ? new BookDoc({ ...row }) : null;
  },
  async find() {
    return Object.values(store).map((row) => ({ ...row }));
  }
};
