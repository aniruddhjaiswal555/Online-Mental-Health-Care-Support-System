/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = async() =>{
   const URL = process.env.URL;
   try{
      const conn = await mongoose.connect(URL,{
       
      });
      console.log("database connection successfull")
   }
   catch(error)
   {
          console.log(`Error : ${error.message}`);
          process.exit(1);
   }
};
module.exports = dbConnect;