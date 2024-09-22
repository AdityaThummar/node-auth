const express = require("express");
const createError = require("http-errors");
const { SIGNUP_REGISTER_URL, SIGNIN_URL } = require("./endpoint.routes");
const UserModel = require("../model/user.model");
const { generateAccessToken } = require("../helper/tokenHelper");
const { registerUserSchema } = require("../validation");
const Router = express.Router();

Router.post(SIGNUP_REGISTER_URL, async (req, res, next) => {
  try {
    const validatedResponse = await registerUserSchema.validateAsync(req.body)
    const isExist = await UserModel.findOne({ email: validatedResponse?.email });
    if (isExist) {
      next(createError.Conflict("email is already registerd !!"));
      return;
    }
    const newUser = await UserModel.create(validatedResponse);
    const saved = await newUser.save();
    const access = await generateAccessToken(saved?.id)
    res.status(200).send({
      success: true,
      user: {
        email: validatedResponse?.email,
        id: saved?.id,
      },
      access
    });
  } catch (error) {
    console.log("🚀 ~ Router.post ~ error:", error)
    const joiError = error.isJoi
    const errorString = error.toString()
    next(joiError ? createError.BadRequest(errorString) : createError.InternalServerError(errorString))
  }
});

Router.post(SIGNIN_URL, async (req, res, next) => {
  try {
    const validatedResponse = await registerUserSchema.validateAsync(req.body)
    const isExist = await UserModel.findOne({ email: validatedResponse?.email });
    if (!isExist) {
      next(createError.NotFound("User not found !!"));
      return;
    }
    const access = await generateAccessToken(isExist?.id)
    res.status(200).send({
      success: true,
      user: {
        email: validatedResponse?.email,
        id: isExist?.id,
      },
      access
    });
  } catch (error) {
    console.log("🚀 ~ Router.post ~ error:", error)
    const joiError = error.isJoi
    const errorString = error.toString()
    next(joiError ? createError.BadRequest(errorString) : createError.InternalServerError(errorString))
  }
});

module.exports = Router;
