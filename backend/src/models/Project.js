const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: { type: String, unique: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
