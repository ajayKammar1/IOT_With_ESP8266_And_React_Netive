const Register = require("../Modules/Register");

const AddRegisterData = async (req, res) => {
  const data = req.body;
  // console.log(data)
  try {
    const NewData = new Register(data);
    const result = await NewData.save();
    res.send(result);
  } catch {
    console.log(err);
  }
};

const Logindata = async (req, res) => {
  const { email, password } = req.body;
  const checkuser = await Register.findOne({ email });
  if (checkuser) {
    console.log(checkuser);
    console.log(req.body);
    if (checkuser.password == password) {
      res.send({ user: checkuser, message: "login succesful" });
      // console.log(res)
    } else {
      res.send({ error: "Invalied credential ....!" });
    }
  } else {
    res.send({ error: "user is not found" });
  }
};

const GetAllRegisterData = async (req, res) => {
  const data = req.body;
  const result = await Register.find({});
  res.json(result);
};

const UpdateSingleRegisterData = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await Register.updateOne({ _id: id }, { $set: data });
  res.send(result);
};

const Getprofile = async (req, res) => {
  const _id = req.params.id;
  const result = await Register.findById(_id);
  !result && res.send({ error: "User Not found" });
  res.send({ User: result, message: "User Profile" });
};

const DeleteSingleRegisterData = async (req, res) => {
  const id = req.params.id;
  const result = await Register.deleteOne({ _id: id });
  !result && res.send({ error: "User Not found" });
  res.status(200).json(result);
};

module.exports = {
  AddRegisterData,
  GetAllRegisterData,
  UpdateSingleRegisterData,
  DeleteSingleRegisterData,
  Logindata,
  Getprofile,
};
