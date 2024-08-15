const mongoose = require("mongoose")

mongoose
    .connect("mongodb://localhost:27017/FormsData")
    .then(() => console.log("connected to database..."))
    .catch(() => console.log("error", err))