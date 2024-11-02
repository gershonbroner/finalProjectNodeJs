const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  FullName: String,
  NumOfActions: Number,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
