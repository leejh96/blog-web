const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
    subject : String,
    img : {
        url : String,
    },
    text : {
        title : String,
    }

}, { timestamps : true})

module.exports = diarySchema