const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxlength : 30,
    },
    author : {
        type : String,
        required : true,
        minlength : 5,
    },
    text : {
        type : String,
    },
    like : {
        type : Number,
        default : 0,
    },
    img : {
        type : String
    },
    comment : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment',
    }]

    
}, {timestamps : true})

module.exports = noticeSchema;