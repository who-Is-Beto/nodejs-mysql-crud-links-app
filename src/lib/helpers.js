const bcrypt = require("bcryptjs");

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const finalPassword = await bcrypt.hash(password, salt);
  return finalPassword;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    await bcrypt.compare(password, savedPassword);
  } catch (err) {
    console.error(err);
  }
};

module.exports = helpers;
