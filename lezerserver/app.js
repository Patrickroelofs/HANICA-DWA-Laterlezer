/* eslint no-console: ["off", { allow: ["warn"] }] */

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const logger = require('morgan');
const compression = require('compression');
const http = require('http');
const ws = require('ws');
const api = require('./routing/api');

const app = express();
const httpServer = http.createServer(app);
const webSocketServer = new ws.Server({
  noServer: true,
  path: '',
});
const port = 3000;
app.use(logger('dev'));
app.use(cors({ origin: true, credentials: true }));
app.options('*', cors({ origin: true, credentials: true }));

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(compression());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use('/api', api);

// Error middlewares
require('./middlewares/error.middleware')(app);

httpServer.on('upgrade', (req, networkSocket, head) => {
  webSocketServer.handleUpgrade(req, networkSocket, head, (websocket) => {
    webSocketServer.emit('connection', websocket, req);
  });
});

webSocketServer.on('connection', (ws, req) => {
  console.log(`CONNECTION CREATED: ${req}`);
  console.log(req.session);
  ws.on('message', (msg) => {
    const msgObject = JSON.parse(msg);
    console.log(msgObject);
  });
});

httpServer.listen(port, () => {
  mongoose.connect('mongodb://localhost:27017/reader', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.info(`App listening at http://localhost:${port}`);
  });
});

module.exports = app;
