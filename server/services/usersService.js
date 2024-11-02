const userRepo = require("../repositories/userRepo");

const findUserRegister = (fullName) => {
  return userRepo.finduser(fullName);
};
module.exports = { findUserRegister };
