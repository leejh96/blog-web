const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        maxlength : 30,
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
    },
    nick : {
        type : String,
        required : true,
    },
    role : {
        // 0 일반회원, 1,2는 생각중, 3 관리자
        type : Number,
        default : 0,
    },
    email : {
        type: String,
        trim: true,
        required : true,
        unique : true,
    },
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})

module.exports = userSchema