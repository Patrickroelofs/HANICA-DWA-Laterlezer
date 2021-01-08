/* eslint no-console: ["off", { allow: ["warn"] }] */
/* eslint-disable no-param-reassign */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const logger = require('morgan');
const compression = require('compression');
const http = require('http');
const api = require('./routing/api');
const { open } = require('./websocket/ws');

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

const httpServer = http.createServer(app);
const webSocketServer = open();

httpServer.on('upgrade', (req, networkSocket, head) => {
  webSocketServer.handleUpgrade(req, networkSocket, head, (websocket) => {
    webSocketServer.emit('connection', websocket, req);
  });
});

if (process.env.NODE_ENV === 'test') {
  const listener = httpServer.listen(() => {
    console.info(`listening on port: ${listener.address().port}`);
  });
} else {
  httpServer.listen(port, () => {
    mongoose.connect('mongodb://localhost:27017/reader', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
      mongoose.set('debug', true);
      console.info(`App listening at http://localhost:${port}`);
    });
  });
}

module.exports = app;
