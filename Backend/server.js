const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const dbConnect = require("./Database/db.js");
const route = require("./Routes/route.js");
const app = express();
app.use(express.json());
app.use(cors());   
app.use(cookieParser()); 
app.use("/echomind/api",route);
const PORT = process.env.PORT || 7072;
dbConnect();
app.get("/",(req,res) =>{
     res.send("Welcome to Echomind !");
});
app.listen(PORT,() =>{
    console.log(`server is listening at the port ${PORT}`);
});