const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Self-help', 'Therapy', 'Mindfulness'], required: true },
    url: { type: String, required: true }, 
    uploadedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Book', BookSchema);
