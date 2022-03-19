const bcrypt = require("bcryptjs");

const encrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const decrypt = async (plainPass, hashword) => {
  return await bcrypt.compare(plainPass, hashword);
};

module.exports = { encrypt, decrypt };
