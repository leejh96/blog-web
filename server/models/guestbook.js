const mongoose = require('mongoose');

const guestbookSchema = new mongoose.Schema({
    writer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    text : {
        type : String,
    },
}, {timestamps : true})

module.exports = guestbookSchema;