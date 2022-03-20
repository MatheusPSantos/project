const Project = require("../models/Project");
const Task = require("../models/Tasks");

async function createTask({
  name,
  description,
  status,
  finishedAt
}) {
  try {
    let newTask = new Task();
    newTask.name = name;
    newTask.description = description;
    newTask.status = status;
    newTask.finishedAt = finishedAt;

    return await newTask.save();

  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function listTasks({ projectName }) {
  try {
    return await Project
      .findOne({ name: projectName })
      .populate({
        path: "tasks"
      })
      .lean();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function deleteTask({ id }) {
  try {
    return await Task.findOneAndDelete(id);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

module.exports = {
  createTask,
  deleteTask,
  listTasks,
};
