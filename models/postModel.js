const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    username: { type: String, required: true },
    categories: { type: Array, required: false },
  },
  { timestamps: true }
);

module.exports = Post;
