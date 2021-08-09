const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const app = express();

const UserRouter = require('../routes/user');
const StudyRouter = require('../routes/study');
const GuestbookRouter = require('../routes/guestbook');
const NoticeRouter = require('../routes/notice');
const PassportConfig = require('../passport');
const AuthRouter = require('../routes/auth');
require('dotenv').config();

PassportConfig(passport);
mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => {
    console.log('mongoDB connected ...')
})
.catch((err) => {
    console.error(err);
})

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    resave : false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie:{
        httpOnly:true,
        secret: false,
    }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/img', express.static('upload'));
app.use('/api/user', UserRouter);
app.use('/api/study', StudyRouter);
app.use('/api/guestbook', GuestbookRouter);
app.use('/api/notice', NoticeRouter);
app.use('/api/auth', AuthRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log('server connected ...');
})