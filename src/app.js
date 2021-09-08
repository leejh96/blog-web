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
mongoose.connect(process.env.MONGO_URI, {
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
const option = {
    resave : false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie:{
        httpOnly:true,
        secret: false,
    }
}
if(process.env.NODE_ENV === 'production'){
    option.cookie.secret = true;
}
app.use(session(option));
app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(('client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    })
}

app.use('/api/img', express.static('upload'));
app.use('/api/user', UserRouter);
app.use('/api/study', StudyRouter);
app.use('/api/guestbook', GuestbookRouter);
app.use('/api/notice', NoticeRouter);
app.use('/api/auth', AuthRouter);


app.use((err, req, res, next) => {
    return res
    .json({
        error : err,
    })
})
const port = process.env.PORT || 8080;
app.listen(port, (req, res) => {
    console.log('server connected ...');
})