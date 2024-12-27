const mongoose = require("mongoose");
const PatientSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        match: /^[A-Za-z\s]+$/ 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/ 
    }
});
module.exports = mongoose.model("patient", PatientSchema);
