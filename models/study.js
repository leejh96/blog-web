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
}, { timestamps : true})

module.exports = studySchema