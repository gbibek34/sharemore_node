const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = Category;
