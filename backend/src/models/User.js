const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    projects: Array
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
