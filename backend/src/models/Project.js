const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
