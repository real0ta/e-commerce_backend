const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");

const app = express();
const port = 3000;

app.get("/registration", (req, res) => {
  res.send("registration!");
});

app.use("/users", userRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
