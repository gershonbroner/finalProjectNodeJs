const mongoose = require("mongoose");

module.exports = mongoose
  .connect("mongodb://localhost:27017/fatoryManagment")
  .then(() => {
    console.log("connect DB");
  });
