const mongoose = require("mongoose");
const URL = process.env.DB_URL;
mongoose
  .connect(URL)
  .then(() => console.log("connected to database..."))
  .catch(() => console.log("error", err));
