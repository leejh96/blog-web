const mongoose = require('mongoose');

const sideTabSchema = new mongoose.Schema({
    study : [{
        subject : {
            type : String,
            require : true,
        },
        link : {
            type : String,
            unique : true,
        }
    }],

    board : [{
        content : {
            type : String,
            require: true,
        },
        link : {
            type : String,
            unique : true,
        }
    }]

})


module.export = sideTabSchema;