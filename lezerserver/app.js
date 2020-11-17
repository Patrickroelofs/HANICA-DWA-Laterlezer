const api = require('./routing/api');

const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express()
const port = 3000

app.use(bodyParser.json());

app.use('/api', api)

app.listen(port, () => {
    mongoose.connect('mongodb://localhost:27017/reader', {useNewUrlParser: true}, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
})
