require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("crypto");
const User = require("../../src/models/User");

describe('Insert user', () => {

  beforeAll(async () => {
    await mongoose.connect(`${process.env.MONGO_URL}`, {
      dbName: "test",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await User.deleteMany();
  });

  it('should insert a user into collection', async () => {
    const User = require("../../src/models/User");

    let username = "john-doe" + Math.random();

    const mockUser = {
      username: username,
      email: username + "@email.test",
      password: crypto.randomUUID(),
      projects: []
    };

    const newUser = new User(mockUser);
    await newUser.save();

    const insertedUser = await User.findOne({ username: username }).lean();

    expect(insertedUser).toHaveProperty("username");
    expect(insertedUser).toHaveProperty("password");
    expect(insertedUser).toHaveProperty("projects");

  });
});