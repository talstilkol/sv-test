const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    match: /^[A-Za-z\s]+$/, // English only (letters + spaces)
    validate: {
      validator: async function(v) {
        const count = await mongoose.models.Book.countDocuments({ _id: { $ne: this._id }, title: v });
        return count === 0;
      },
      message: props => `Title "${props.value}" already exists.`
    }
  },
  author: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        const words = v.trim().split(/\s+/);
        if (words.length < 2) return false;
        return words.every(word => /^[A-Z][a-z]+$/.test(word));
      },
      message: props => `Author must be at least two words, each starting with a capital letter.`
    }
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2025
  },
  genre: {
    type: String,
    required: true,
    enum: ['Fiction', 'Science', 'History', 'Biography']
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true
  },
  borrowedBy: {
    type: String,
    default: ''
  }
}, { timestamps: false });

module.exports = mongoose.model('Book', BookSchema);
