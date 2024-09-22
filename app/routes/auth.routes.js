const express = require("express");
const createError = require("http-errors");
const { SIGNUP_REGISTER_URL, SIGNIN_URL } = require("./endpoint.routes");
const UserModel = require("../model/user.model");

const Router = express.Router();

Router.post(SIGNUP_REGISTER_URL, async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(
      createError.BadRequest("email and password is required to register !!")
    );
    return;
  }
  const isExist = await UserModel.findOne({ email });
  if (isExist) {
    next(createError.Conflict("email is already registerd !!"));
    return;
  }
  const newUser = await UserModel.create({
    email,
    password,
  });
  const saved = await newUser.save();
  res.status(200).send({
    success: true,
    user: {
      email,
      id: saved?.id,
    },
  });
});

Router.post(SIGNIN_URL, async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(createError.BadRequest("email and password is required to signin !!"));
    return;
  }
  const isExist = await UserModel.findOne({ email });
  if (!isExist) {
    next(createError.Unauthorized("User not found !!"));
    return;
  }
  res.status(200).send({
    success: true,
    user: {
      email,
      id: isExist?.id,
    },
  });
});

module.exports = Router;
