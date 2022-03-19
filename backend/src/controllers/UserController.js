const User = require("../models/User");
const { decrypt, encrypt } = require("../utils");

async function login(email, password) {
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User doesn't exist.");
    }

    if (!(await decrypt(password, user.password))) {
      throw new Error("Invalid authentication.");
    }

    return user;

  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

async function signup(email, password, username, projects) {
  try {
    const existsUser = await User.findOne({ email }).lean();
    if (existsUser) {
      throw new Error("User already registered.");
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.projects = projects;
    newUser.password = await encrypt(password);

    let userCreated = await newUser.save();

    console.log(userCreated);
    return userCreated;

  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

module.exports = {
  login,
  signup
};