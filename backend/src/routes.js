const express = require("express");
const router = express.Router();
const Validator = require("validatorjs");

const { login, signup, update } = require("./controllers/UserController");
const { createProject, listProjects, deleteProject } = require("./controllers/ProjectController");
const { HandleValidationFails } = require("./utils");
const { deleteTask, listTasks, createTask, updateTask, getTask } = require("./controllers/TaskController");


router.get("/user", async (req, res) => {
  try {
    const validation = new Validator(req.query, {
      email: "required|string|min:3",
      password: "required|string|min:3"
    });

    HandleValidationFails(validation);

    let user = await login(req.query);

    res.status(200).json({ success: true, data: user });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/user", async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      email: "required|string|min:3",
      password: "required|string|min:3",
      username: "required|string|min:3",
      projects: "array"
    });

    HandleValidationFails(validation);

    let user = await signup(req.body);

    res.status(200).json({ success: true, data: user });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/user", async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      email: "string|min:3",
      password: "string|min:3",
      username: "string|min:3",
      projects: "array"
    });

    HandleValidationFails(validation);

    let user = await update(req.body);

    res.status(200).json({ success: true, data: user });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/project", async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      name: "required|string|min:3",
      tasks: "array"
    });

    HandleValidationFails(validation);

    let project = await createProject(req.body);
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/project", async (req, res) => {
  try {
    const projects = await listProjects();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/project/:name", async (req, res) => {
  try {
    const validation = new Validator(req.params, {
      name: "string|required|min:3"
    });

    HandleValidationFails(validation);

    let projectDeleted = await deleteProject(req.params);

    if (projectDeleted) res.status(200).json({ success: true, data: projectDeleted });
    else res.status(404).json({ success: false, message: "Can not find project to delete." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/task", async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      project: "required|string|min:10",
      name: "string|min:3",
      description: "string|min:3",
      status: "string|min:4|max:4",
      finishedAt: "string|min:10"
    });

    HandleValidationFails(validation);

    let newTask = await createTask(req.body);

    res.status(200).json({ success: true, data: newTask });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/tasks/:project", async (req, res) => {
  try {
    const validation = new Validator(req.params, {
      project: "required|string|min:10"
    });

    HandleValidationFails(validation);

    let tasks = await listTasks(req.params);
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/task/:id", async (req, res) => {
  try {
    const validation = new Validator(req.params, {
      id: "required|string|min:10"
    });

    HandleValidationFails(validation);

    let tasks = await getTask(req.params);
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/task", async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      id: "required|string|min:10",
      name: "required|string|min:3",
      description: "required|string|min:3",
      status: "required|string|min:3|max:5",
    });

    HandleValidationFails(validation);

    const updatedTask = await updateTask(req.body);
    if (deleteTask) res.status(200).json({ success: true, data: updatedTask });
    else res.status(404).json({ success: false, message: "Can not find Task to udpate." });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/task/:id", async (req, res) => {
  try {
    const validation = new Validator(req.params, {
      id: "required|string|min:10"
    });

    HandleValidationFails(validation);

    const deletedTask = await deleteTask(req.params);

    if (deleteTask) res.status(200).json({ success: true, data: deletedTask });
    else res.status(404).json({ success: false, message: "Can not find Task to delete." });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;