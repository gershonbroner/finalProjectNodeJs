const UserModel = require("../models/userModel");
require("../DB/connectdb");

const finduser = () => {
  return UserModel.find({});
};

module.exports = { finduser };
