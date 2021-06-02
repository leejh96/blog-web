const express = require('express');
const mongoose = require('mongoose');
const app = express();

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

app.get( '/' , (req, res)=> {
    res.send('hello')
});


app.listen(process.env.PORT, (req, res) => {
    console.log('server connected ...');
})