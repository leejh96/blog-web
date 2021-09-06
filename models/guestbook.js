const mongoose = require('mongoose');
const moment = require('moment');
const guestbookSchema = new mongoose.Schema({
    writer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    text : {
        type : String,
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss"),
    },
})

module.exports = guestbookSchema;