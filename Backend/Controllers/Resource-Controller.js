/* eslint-disable no-undef */
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Book = require("../Model/BookModel");
const Vedio = require("../Model/VedioModel");
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME ,
    api_key : process.env.API_KEY ,
    api_secret : process.env.API_SECRET
});
const bookStorage = new CloudinaryStorage({
    cloudinary : cloudinary ,
    params : {
                 folder : "books-uploaded" ,
                 resource_type : "raw"
             }
});
exports.uploadBooks = multer({storage : bookStorage});
exports.addBooks = async(req,res) =>{
       try
       {
            const { title ,  description  , category } = req.body;
            const file = req.file;
            if(!title || !description || !category)
            {
                return res.status(400).json({
                    message : "All fields are mandatory"
                });
            }
            if(!file)
            {
                return res.status(400).json({
                    message : "No book is uploaded"
                });
            }
            const book = new Book({
                                      title : title ,
                                      description : description ,
                                      category : category ,
                                      url : file.path
                                  });
            const savedBook = await book.save();
            if(savedBook)
            {
                return res.status(201).json({
                    message : "Book uploaded successfully" ,
                    data : savedBook
                });
            }

       }
       catch(error)
       {
        return res.status(500).json({
            message : "Internal Server Error",
            error : error.message
        });
       }
};

const vedioStorage = new CloudinaryStorage({
    cloudinary : cloudinary ,
    params : {
                 folder : "Vedio-uploaded" ,
                 resource_type : "auto"
             }
});
exports.uploadVedios = multer({storage : vedioStorage});
exports.addVedios = async(req,res) =>{
       try
       {
            const { title ,  description  , category  ,resourceType , url } = req.body;
            const file = req.file;
            const Url = (resourceType === "vedio") ? file.path : url;
            if(!title || !description || !category)
            {
                return res.status(400).json({
                    message : "All fields are mandatory"
                });
            }
            if(resourceType === "vedio" && !file)
            {
                return res.status(400).json({
                    message : "No Vedio is uploaded"
                });
            }
            const vedio = new Vedio({
                                      title : title ,
                                      description : description ,
                                      category : category ,
                                      resourceType : resourceType ,
                                      url : Url
                                  });
            const saveVedio = await vedio.save();
            if(saveVedio)
            {
                return res.status(201).json({
                    message : "Vedio uploaded successfully" ,
                    data : vedio
                });
            }

       }
       catch(error)
       {
        return res.status(500).json({
            message : "Internal Server Error",
            error : error.message
        });
       }
};
