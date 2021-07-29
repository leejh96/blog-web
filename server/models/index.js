const mongoose = require('mongoose');
const userSchema = require('./user');
const noticeSchema = require('./notice');
const guestbookSchema = require('./guestbook');
const studySchema = require('./study');

const User = mongoose.model('User', userSchema);
const Notice = mongoose.model('Notice', noticeSchema);
const Guestbook = mongoose.model('Guestbook', guestbookSchema);
const Study = mongoose.model('Study', studySchema);

module.exports = { User, Notice, Guestbook, Study };