const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.URL)
  .then(() => console.log("connected"))
  .catch((er) => console.log(`error: ${er} `));
