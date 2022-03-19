require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("../../src/models/Project");

describe('Insert project', () => {

  beforeAll(async () => {
    await mongoose.connect(`${process.env.MONGO_URL}`, {
      dbName: "test",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  });

  afterAll(async () => {
    await Project.deleteMany();
  });

  it('should insert a project into collection', async () => {

    const projectMock = {
      tasks: []
    };

    const newProject = new Project(projectMock);
    await newProject.save();

    const insertedProject = await Project.findOne();

    if (insertedProject) {
      expect(insertedProject).toHaveProperty("id");
      expect(insertedProject).toHaveProperty("tasks");
    } else {
      expect(insertedProject).toBe(null);
    }

  });

});