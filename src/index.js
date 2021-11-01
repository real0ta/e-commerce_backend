const express = require("express");
const userRouter = require("./routers/user");
const bodyParser = require("body-parser");
require("./db/mongoose");

const app = express();
const port = 3000;
app.get("/registration", (req, res) => {
  res.send("registration!");
});

app.use(bodyParser.json());
app.use("/users", userRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
