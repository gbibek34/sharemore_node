const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = User;
