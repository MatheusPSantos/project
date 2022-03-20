const { default: mongoose } = require("mongoose");
const Project = require("../models/Project");
const Task = require("../models/Tasks");

async function createTask({
  project,
  name,
  description,
  status,
  finishedAt
}) {
  try {
    return Project.find({ _id: project })
      .then(async results => {
        if (results.legth === 0) throw new Error("The project does not exists.");

        let project = results[0];

        let newTask = new Task();
        newTask.name = name;
        newTask.description = description ? description : null;
        newTask.status = status ? status : "todo";
        newTask.finishedAt = finishedAt ? finishedAt : null;

        project.tasks.push(newTask);

        return newTask
          .save()
          .then(
            project
              .save()
              .catch(error => new Error(error))
          )
          .catch(error => new Error(error));
      });

  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function listTasks({ project }) {
  try {
    return await Project
      .findById({ _id: project })
      .populate({
        path: "tasks"
      })
      .lean();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function updateTask({ name, description, status, finishedAt }) {
  try {

  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function deleteTask({ id }) {
  try {
    let project = await Project.findOne({ tasks: { $in: id } }).lean()
    let updatedTasks = project.tasks.filter(task => task.toString() !== (id));
    await Project.findOneAndUpdate({ tasks: { $in: id } }, {
      tasks: updatedTasks
    });

    return await Task.findOneAndDelete(id);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

module.exports = {
  createTask,
  deleteTask,
  updateTask,
  listTasks
};
