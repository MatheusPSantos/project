const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    description: String,
    status: String,
    finishedAt: Date
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", taskSchema);
