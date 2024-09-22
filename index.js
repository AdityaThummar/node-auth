const express = require("express");
const createError = require("http-errors");
require("dotenv").config();

require("./app/db/init");
const Router = require("./app/routes/entry.routes");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router);

app.use((req, res, next) => {
  next(createError.NotFound("Route not found"));
});

app.use((error, req, res, next) => {
  res.status(error.status).send({
    error,
    success: false,
  });
});

app.listen(port, (res) => {
  console.log("app is listening on port " + port);
});

module.export = app;
