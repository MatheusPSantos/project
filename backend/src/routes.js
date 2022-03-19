const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const Validator = require("validatorjs");
const { login, signup } = require("./controllers/UserController");

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

    let user = await login(req.query.email, req.query.password);

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

    let user = await signup(
      req.body.email,
      req.body.password,
      req.body.username,
      req.body.projects
    );

    res.status(200).json({ success: true, data: user });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/user", (req, res, next) => { });

router.post("/project", (req, res, next) => { });

router.get("/project", (req, res, next) => { });

router.post("/task", (req, res, next) => { });

router.get("/task", (req, res, next) => { });

module.exports = router;