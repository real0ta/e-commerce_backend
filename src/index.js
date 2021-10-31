const express = require("express");
require('./db/mongoose')
const app = express();
const port = 3000;

app.get("/registration", (req, res) => {
  res.send("registration!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
