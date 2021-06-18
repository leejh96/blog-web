const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
    subject : String,
    text : String,
}, { timestamps : true})

module.exports = studySchema