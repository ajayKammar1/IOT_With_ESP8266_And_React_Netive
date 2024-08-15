const express = require("express");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
require("./Database/Database");
const RegisterRoutes = require("./Routes/Register");
app.use("/api/", RegisterRoutes);
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
