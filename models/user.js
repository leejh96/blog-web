const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        maxlength : 30,
    },
    password : {
        type : String,
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
        unique : true,
    },
    refreshToken : {
        type: String,
        default : '',
    },
    refreshTokenExp : {
        type : Number,
        default : 0
    },
    img : {
        type : String,
        default : '',
    },
    motto : {
        type : String,
        default : '',
    },
    provider : {
        type : String,
        default : 'local',
        required : true,
    },
    snsId :{
        type : String,
    }
    
}, { timestamps : true})

module.exports = userSchema