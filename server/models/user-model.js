// Third party modules
const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  ],
});

// Define User class per its Schema (Blueprint)
const User = mongoose.model("User", userSchema);

module.exports = User;
