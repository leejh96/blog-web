const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const app = express();
const path = require('path');

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


app.use('/api/user', UserRouter);
app.use('/api/study', StudyRouter);
app.use('/api/guestbook', GuestbookRouter);
app.use('/api/notice', NoticeRouter);
app.use('/api/auth', AuthRouter);


app.use((err, req, res, next) => {
    console.log(err);
    return res
    .status(500)
    .json({
        error : err,
    })
})
//api들보다 위에 있다면 api를 가기전에 get을 실행하기 때문에 db를 가져올 수 없다 따라서 api들과 err처리 미들웨어 밑에 넣어준다.
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(('client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    })
}

const port = process.env.PORT || 8080;
app.listen(port, (req, res) => {
    console.log('server connected ...');
})