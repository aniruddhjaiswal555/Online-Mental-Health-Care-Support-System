const mongoose = require("mongoose");
const TherapistSchema = new mongoose.Schema({
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
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
});
module.exports = mongoose.model("therapist", TherapistSchema);
