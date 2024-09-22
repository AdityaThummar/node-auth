const express = require("express");
const { AUTH_ROOT_URL } = require("./endpoint.routes");
const AuthRoutes = require("./auth.routes");

const Router = express.Router();

Router.use(AUTH_ROOT_URL, AuthRoutes);

module.exports = Router;
