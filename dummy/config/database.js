const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("DB connection successfully done")})
    .catch((error)=>{
        console.log("error in DB connection");
        console.log(error);
        process.exit(1);
    })
};