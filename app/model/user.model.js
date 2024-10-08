const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const UserModel = mongoose.model("user", User);
module.exports = UserModel;
