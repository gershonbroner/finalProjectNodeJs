const cors = require("cors");
const express = require("express");
const loginService = require("./controllers/login");
require("./DB/connectdb");
const app = express();
const PORT = 3000;
app.use(cors());

app.use("/login", loginService);

app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});
