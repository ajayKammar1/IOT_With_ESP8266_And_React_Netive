const { mongoose, Schema } =require("mongoose");

const RegisterSchema = new Schema({
    name: { require : true, type: String},
    sirname: { require : true, type: String},
    email: { require : true, type: String},
    password: { require : true, type: Number}
});

module.exports = mongoose.model("Register", RegisterSchema )