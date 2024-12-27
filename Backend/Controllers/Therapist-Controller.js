/* eslint-disable no-undef */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();
const nodemailer = require("nodemailer");
const TherapistModel = require("../Model/TherapistSchema");
const JWT_SECRET = process.env.JWT_SECRET;
const transporter = nodemailer.createTransport({
  secure : true ,
  host : 'smtp.gmail.com' ,
  port : 465 ,
  auth : {
            user : process.env.EMAIL_USER ,
            pass : process.env.PASSWORD
         }
});
exports.TherapistRegister = async(req,res) =>{
      const {name,email,password,confirmPassword} = req.body;
      try
      {
        if(!name || !email || !password || !confirmPassword)
        {
            return res.status(400).json({
            message : "All fields are required"
          });
        }
        const findTherapist = await TherapistModel.findOne({email : email});
        if(findTherapist)
        {
           return res.status(400).json({
            message : "Therapist already registered with this email"
          });
        }
        if(password !== confirmPassword)
        {
          return res.status(400).json({
            message : "password and confirm password do not match"
          });
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const newTherapist = new TherapistModel({
               username : name ,
               email : email ,
               password : hashedpassword ,
               isVerified : false 
        });
        const saveData = await newTherapist.save();
        const token = jwt.sign({email},JWT_SECRET, { expiresIn: '1h' });
        if(saveData)
        {
            const mailOption = {
              from : process.env.EMAIL_USER ,
              to : email ,
              subject : "Welcome to Echomind !" ,
              text : `Hii ${name} \n
                      Thank You for registering with us . We are excited to have you onboard !\n
                      Best regards from team`
            };
            transporter.sendMail(mailOption,(error,info) =>{
               if(error)
               {
                console.log("Error in sending mail : ",error);
               }
               else
               {
                console.log("Mail sent successfully : ",info.response);
               }
            });
            res.cookie('token',token,{
              httpOnly : true ,
              secure : true ,
              sameSite : 'strict' ,
              maxAge : 3600000
            });
            return res.status(201).json({
              message : "Therapist registered successfully" ,
              token : token
            });
        }
      }
      catch(error)
      {
        return res.status(400).json({
          message : "Error in Therapist Registration",
          error : error.message
        });
      }
 };
 exports.Login = async(req,res) =>{
      const {email, password} = req.body;
      try
      {
         if(!email || !password)
         {
             return res.status(400).json({
                  message : "All fields are required"
             });
         }
         const therapist = await TherapistModel.findOne({email : email});
         const isMatch = await bcrypt.compare(password,therapist.password);
         if(!therapist || !isMatch)
         {
          return res.status(400).json({
            message : "Invalid log in credentials"
          });
         }
         const token = jwt.sign({email : email , id : therapist._id},JWT_SECRET, { expiresIn: '1h' });
         res.cookie('token',token,{
             httpOnly : true ,
             secure : true ,
             sameSite : 'strict' ,
             maxAge : 3600000
         });
         return res.status(200).json({
          message : "Login Successfull",
          token : token 
         });
      }
      catch(error)
      {
        return res.status(400).json({
           message : "Unable to log in" ,
           error : error.message
        });
      }
 };
exports.TherapistLogout = async(req,res) =>{
        try
        {
            res.clearCookie('token',{
               httpOnly : true , 
               secure : true , 
               sameSite : 'strict'
            });
            return res.status(201).json({
              message : "Log out successfully"
            });
        }
        catch(error)
        {
          return res.status(400).json({
            message : "Unable to log out " ,
            error : error.message
          });
        }
 };
 exports.getAllnames = async(req,res) => {
    try
    {
        const therapists = await TherapistModel.find({},"username");
        const usernames = therapists.map((i) => ({name : i.username}));
        return res.status(201).json(usernames);
    }
    catch(error)
    {
      return res.status(404).json({
        message : "Error in fetching names" , 
        error : error.message
      });
    }
 }