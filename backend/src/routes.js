const express = require("express");
const router = express.Router();
const Validator = require("validatorjs");

const { login, signup, update } = require("./controllers/UserController");
const { createProject, listProjects } = require("./controllers/ProjectController");

router.get("/user", async (req, res) => {
  try {
    const validation = new Validator(req.query, {
      email: "required|string|min:3",
      password: "required|string|min:3"
    });

    if (validation.fails()) {
      const errors = validation.errors.all();
      throw new Error(errors[Object.keys(errors)[0]]);
    }

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

    if (validation.fails()) {
      const errors = validation.errors.all();
      throw new Error(errors[Object.keys(errors)[0]]);
    }

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

    if (validation.fails()) {
      const errors = validation.errors.all();
      throw new Error(errors[Object.keys(errors)[0]]);
    }

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

router.post("/task", (req, res) => {
  try {
    const validation = new Validator(req.body, {

    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/task", (req, res) => {
  try {
    const validation = new Validator(req.query, {

    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;