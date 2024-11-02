const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const usersService = require("../services/usersService");

router.get("/:userName/:email", async (req, res) => {
  const { userName, email } = req.params;

  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  const user = data.find(
    (user) => user.username === userName && user.email === email
  );

  if (user) {
    // check if user registered in db
    const userDB = await usersService.findUserRegister(user.name);
    // if yes create token and send to client
    if (userDB) {
      token = jwt.sign({ id: userDB._id }, process.env.SECRET_JWT);
      return res.json({ message: "log-in succesfuly", token: token });
    }
    return res.json("user not register");
  }
  return res.json("userName or email not exits");
});

module.exports = router;
