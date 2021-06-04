const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const SignupRouter = require('../routes/signup');
const LoginRouter = require('../routes/login');
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
app.use('/api/signup', SignupRouter);
app.use('/api/login', LoginRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log('server connected ...');
})