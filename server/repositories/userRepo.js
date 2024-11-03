const UserModel = require("../models/userModel");
require("../DB/connectdb");

const finduser = (fullname) => {
  return UserModel.findOne({ FullName: fullname });
};

module.exports = { finduser };
