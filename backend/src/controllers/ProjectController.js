const Project = require("../models/Project");

async function createProject({ name, tasks }) {
  try {
    const projectExists = await Project.findOne({ name: name }).lean();

    if (projectExists) throw new Error("A project with the same name already exists.");

    let newProject = new Project();
    newProject.name = name;
    newProject.tasks = tasks;

    return await newProject.save();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function listProjects() {
  try {
    return await Project.find().lean();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function deleteProject({ id }) {
  try {
    let deletedProject = await Project.findByIdAndRemove(id).lean();
    return deletedProject;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

module.exports = {
  createProject,
  listProjects,
  deleteProject
};