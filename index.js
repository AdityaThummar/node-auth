const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.listen(port,(res)=>{
    console.log("app is listening on port "+port);
})

module.export = app;
