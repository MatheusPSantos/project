require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("../../src/models/Tasks");

describe('Insert task', () => {

  beforeAll(async () => {
    await mongoose.connect(`${process.env.MONGO_URL}`, {
      dbName: "test",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  });

  afterAll(async () => {
    await Task.deleteMany();
  });

  it('should insert a task into collection', async () => {

    const taskMock = {
      description: "some task",
      status: "done",
      finishedAt: new Date()
    };

    const newTask = new Task(taskMock);
    await newTask.save();

    const insertedTask = await Task.findOne();

    if (insertedTask) {
      expect(insertedTask).toHaveProperty("description");
      expect(insertedTask).toHaveProperty("status");
      expect(insertedTask).toHaveProperty("createdAt");
      expect(insertedTask).toHaveProperty("finishedAt");
    } else {
      expect(insertedTask).toBe(null);
    }

  });

});