/* eslint no-console: ["off", { allow: ["warn"] }] */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./routes/api');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', api);

// Error middlewares
require('./middlewares/error.middleware')(app);

app.listen(port, () => {
  mongoose.connect('mongodb://localhost:27017/reader', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});

module.exports = app;
