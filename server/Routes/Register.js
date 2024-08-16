const express = require("express");
const Router = express.Router();

const {
  AddRegisterData,
  GetAllRegisterData,
  UpdateSingleRegisterData,
  DeleteSingleRegisterData,

  Logindata,
  Getprofile,
} = require("../Controls/Register");

Router.post("/register", AddRegisterData);
Router.post("/login", Logindata);
Router.get("/profile/:id", Getprofile);
Router.get("/", GetAllRegisterData);
Router.patch("/:id", UpdateSingleRegisterData);
Router.delete("/:id", DeleteSingleRegisterData);

module.exports = Router;
