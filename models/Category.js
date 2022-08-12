const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({

  category: {
    type: String,
    required: true,
  },
  catDescription: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("category", CategorySchema);
