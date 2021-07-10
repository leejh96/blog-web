const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const UserRouter = require('../routes/user');
const StudyRouter = require('../routes/study');
const GuestbookRouter = require('../routes/guestbook');
const NoticeRouter = require('../routes/notice');
const SideTabRouter = require('../routes/sidetab');
require('dotenv').config();

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


app.get('/', (req, res) => {
    res.send('Hi!');
})
app.use('/api/user', UserRouter);
app.use('/api/study', StudyRouter);
app.use('/api/guestbook', GuestbookRouter);
app.use('/api/notice', NoticeRouter);
app.use('/api/sidetab', SideTabRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log('server connected ...');
})