const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.MONGODB_DBNAME,
}).then((res)=>{
    console.log("mongodbres",res)
}).catch((err)=>{
    console.log("errrrr",err)
}).finally(()=>{
    console.log("done mongo init")
});
