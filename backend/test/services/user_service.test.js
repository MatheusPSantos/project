require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("crypto");

describe('Insert user', () => {

  beforeAll(async () => {
    await mongoose.connect(`${process.env.MONGO_URL}`, {
      dbName: "test",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // afterAll(async () => {
  //   await connection.close();
  // });

  it('should insert a user into collection', async () => {
    const User = require("../../src/models/User");

    const mockUser = {
      username: "john-doe",
      password: crypto.randomUUID(),
      projects: [
        mongoose.Types.ObjectId,
      ]
    };

    const newUser = new User(mockUser);
    await newUser.save();

    const insertedUser = await User.findOne({ username: "john-doe" }).lean();

    expect(insertedUser).toHaveProperty("username");
    expect(insertedUser).toHaveProperty("password");
    expect(insertedUser).toHaveProperty("projects");

  });
});