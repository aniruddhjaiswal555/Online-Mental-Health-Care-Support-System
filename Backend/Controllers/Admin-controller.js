const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel = require("../Model/Admin-Model");
const TherapistModel = require("../Model/TherapistSchema");
const PatientModel = require("../Model/PatientModel");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
exports.AdminRegister = async(req,res) =>{
    try
    {
        const {username,password} = req.body;
        const hashedpassword = await bcrypt.hash(password,10);
        const AdminInfo = new AdminModel({username:username,
                                          password:hashedpassword
                                         });
        const saveData = await AdminInfo.save();
        const token = jwt.sign({username : username} , JWT_SECRET , {expiresIn : '1h'});
        res.cookie('token',token,{
            httpOnly : true ,
            secure : true ,
            sameSite : 'strict' ,
            maxAge : 3600000
          });
        if(saveData)
        {
            return res.status(201).json({
                message : "Admin registration successfull..." ,
                token : token
            });
        }      
        
    }
    catch(error)
    {
        return res.status(400).json({
            message : "Internal server error" ,
            error : error.message
        });
    }
};
exports.AdminLogin = async(req,res) =>{
    const {username,password} = req.body;
    try
    {
        if(!username || !password)
        {
            return res.status(404).json({
                   message : "All fields are required"
                });
        }
        const Admin = await AdminModel.findOne({username : username});
        if(!Admin)
        {
            return res.status(404).json({
                message : "Admin does not exist"
             });
        }
        const comparePassword = await bcrypt.compare(password,Admin.password);
        if(!comparePassword){
            return res.status(404).json({
                message : "Password does not match"
             });
        }
        const token = jwt.sign({username:username,id:Admin._id},JWT_SECRET,{expiresIn:'1h'});
        res.cookie('token',token,{
            httpOnly : true ,
            secure : true , 
            sameSite : 'strict' ,
            maxAge : 3600000
        });
        return res.status(201).json({
               message : "Admin logged in successfully",
               username : Admin.username ,
               token : token
         });
     }
    catch(error)
    {
        return res.status(404).json({
            message : "Login Failed" ,
            error : error.message
        });
    }
};
exports.countTherapist = async(req,res) =>{
   try
   {
      const totalTherapist = await TherapistModel.countDocuments();
      return res.status(201).json({
        success : true ,
        data : totalTherapist
      });
   }
   catch(error)
   {
    return res.status(500).json({
        success : false ,
        message : "Error in fetching therapist count" ,
        error : error.message
    });
   }
}
exports.countPatient = async(req,res) =>{
    try
    {
       const totalPatient = await PatientModel.countDocuments();
       return res.status(201).json({
         success : true ,
         data : totalPatient
       });
    }
    catch(error)
    {
     return res.status(500).json({
         success : false ,
         message : "Error in fetching patient count" ,
         error : error.message
     });
    }
 }