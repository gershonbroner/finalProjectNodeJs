const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const usersService = require("../services/usersService");

router.get("/:userName/:email", async (req, res) => {
  const { userName, email } = req.params;
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    const user = data.find(
      (user) => user.username === userName && user.email === email
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "Username or email does not exist" });
    }
    // check if user registered in db
    const userDB = await usersService.findUserRegister(user.name);
    if (!userDB) {
      return res.status(404).json({ message: "User not registered" });
    }
    // if yes create token and send to client
    token = jwt.sign(
      { id: userDB.id, fullName: userDB.FullName },
      process.env.SECRET_JWT,
      { expiresIn: "1h" }
    );
    return res
      .status(200)
      .json({ message: "log-in succesfuly", token, nameUser: userDB.FullName });
  } catch (err) {
    console.error("Error during login process:", error);
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
});

router.post("/sendtoken", (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.SECRET_JWT, (err, data) => {
    if (err) {
      res.status(500).json("Failed to authenticate token");
    }
    return res.json(data);
  });
});
module.exports = router;
