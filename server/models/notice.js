const mongoose = require('mongoose');
const moment = require('moment');

const noticeSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxlength : 30,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    text : {
        type : String,
    },
    like : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }],
    img : {
        type : String,
        default : '',
    },
    comment : [{
        type : mongoose.Schema.Types.ObjectId,
        default : [],
        ref : 'Comment',
    }],
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss"),
    },
    
})

module.exports = noticeSchema;