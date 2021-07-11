const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
    subject : {
        type: String,
        require : true,
        unique : true,
    },
    link : {
        type : String,
        unique : true,
    },
    text : {
        type : String,
        default : '',
    }
}, { timestamps : true})

module.exports = studySchema