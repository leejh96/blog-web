const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const UserRouter = require('../routes/user');

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

app.listen(process.env.PORT, (req, res) => {
    console.log('server connected ...');
})