const mongoose = require('mongoose');
const userSchema = require('./user');
const noticeSchema = require('./notice');

const User = mongoose.model('User', userSchema);
const Notice = mongoose.model('Notice', noticeSchema);
module.exports = { User, Notice };