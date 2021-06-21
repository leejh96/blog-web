const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
    subject : {
        type: String,
        unique : true,
    },
    text : String
}, { timestamps : true})

module.exports = studySchema