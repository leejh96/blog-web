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
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        comment : {
            type : String,
            required : true
        },
        date : String
    }],
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss"),
    },
    
})

module.exports = noticeSchema;