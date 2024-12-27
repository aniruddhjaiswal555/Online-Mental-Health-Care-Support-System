const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const PatientModel = require("../Model/PatientModel");
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
exports.PatientRegister = async(req,res) =>{
      const {name,email,password,confirmPassword} = req.body;
      try
      {
        if(!name || !email || !password || !confirmPassword)
        {
            return res.status(400).json({
            message : "All fields are required"
          });
        }
        const findPatient = await PatientModel.findOne({email : email});
        if(findPatient)
        {
           return res.status(400).json({
            message : "Patient already registered with this email"
          });
        }
        if(password !== confirmPassword)
        {
          return res.status(400).json({
            message : "password and confirm password do not match"
          });
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const newPatient = new PatientModel({
               username : name ,
               email : email ,
               password : hashedpassword      
        });
        const saveData = await newPatient.save();
        const token = jwt.sign({email},JWT_SECRET, { expiresIn: '1h' });
        if(saveData)
        {
            const mailOption = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Welcome to Echomind - Your Mental Health Support System!",
                html: `
                  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; text-align: center;">
                      <h1 style="color: #4CAF50; margin-bottom: 10px;">Welcome, ${name}!</h1>
                      <p style="font-size: 18px; line-height: 1.5; margin-bottom: 20px;">
                        🎉 Thank you for registering with <strong>Echomind</strong>! We are thrilled to have you join our community dedicated to mental health and well-being.
                      </p>
                      <hr style="border: 1px solid #4CAF50; margin: 20px 0;"/>
                      <h2 style="color: #333;">What to Expect:</h2>
                      <ul style="list-style-type: none; padding: 0; text-align: left;">
                        <li style="padding: 5px 0;">🧠 Access to a wide range of mental health resources</li>
                        <li style="padding: 5px 0;">💬 Connect with licensed mental health professionals</li>
                        <li style="padding: 5px 0;">📅 Schedule your sessions at your convenience</li>
                      </ul>
                      <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
                        We are here to support you every step of the way. Remember, taking care of your mental health is a journey, and we're glad to be part of yours.
                      </p>
                      <p style="font-weight: bold; margin-top: 20px;">Best wishes,</p>
                      <p style="font-weight: bold;">The Echomind Team</p>
                      <img src="https://thumbs.dreamstime.com/b/mental-health-logo-vector-illustration-flat-two-heads-connected-flower-as-symbol-calmness-psychological-help-210193264.jpg" alt="Echomind Logo" style="width: 150px; margin-top: 20px;"/>
                    </div>
                  </div> `,
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
              message : "Patient registered successfully" ,
              token : token
            });
        }
      }
      catch(error)
      {
        return res.status(400).json({
          message : "Error in Patient Registration",
          error : error.message
        });
      }
 };
 exports.PatientLogin = async(req,res) =>{
      const {email, password} = req.body;
      try
      {
         if(!email || !password)
         {
             return res.status(400).json({
                  message : "All fields are required"
             });
         }
         const patient = await PatientModel.findOne({email : email});
         const isMatch = await bcrypt.compare(password,patient.password);
         if(!patient || !isMatch)
         {
          return res.status(400).json({
            message : "Invalid log in credentials"
          });
         }
         const token = jwt.sign({email : email , id : patient._id},JWT_SECRET, { expiresIn: '1h' });
         res.cookie('token',token,{
             httpOnly : true ,
             secure : true ,
             sameSite : 'strict' ,
             maxAge : 3600000 
         });
         return res.status(200).json({
          message : "Login Successfull",
          username : patient.username,
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
exports.PatientLogout = async(req,res) =>{
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
 exports.getAllpatient = async(req,res) => {
  try
  {
      const patients = await PatientModel.find({},"username");
      const usernames = patients.map((i) => ({name : i.username}));
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