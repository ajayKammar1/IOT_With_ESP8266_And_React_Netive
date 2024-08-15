const express = require("express");
const Router = express.Router();

const {
  AddRegisterData,
  GetAllRegisterData,
  UpdateSingleRegisterData,
  DeleteSingleRegisterData,
  DeleteAllRegisterData,
  Logindata,
  Getprofile,
} = require("../Controls/Register");

Router.post("/register", AddRegisterData);
Router.post("/login", Logindata);
Router.get("/profile/:id", Getprofile);
Router.get("/", GetAllRegisterData);
Router.patch("/:id", UpdateSingleRegisterData);
Router.delete("/:id", DeleteSingleRegisterData);
Router.delete("/", DeleteAllRegisterData);

module.exports = Router;
