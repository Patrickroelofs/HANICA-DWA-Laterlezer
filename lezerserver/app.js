/* eslint no-console: ["off", { allow: ["warn"] }] */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const logger = require('morgan');
const compression = require('compression');
const api = require('./routing/api');

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(cors({ origin: true, credentials: true }));
app.options('*', cors({ origin: true, credentials: true }));

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(compression());

app.use('/api', api);

// Error middlewares
require('./middlewares/error.middleware')(app);

app.listen(port, () => {
  mongoose.connect('mongodb://localhost:27017/reader', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.info(`App listening at http://localhost:${port}`);
  });
});

module.exports = app;
