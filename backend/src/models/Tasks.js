const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    name: String,
    description: String,
    status: String,
    finishedAt: Date
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
