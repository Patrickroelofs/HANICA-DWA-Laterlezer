/* eslint no-console: ["off", { allow: ["warn"] }] */
/* eslint-disable no-param-reassign */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const logger = require('morgan');
const compression = require('compression');
const http = require('http');
const ws = require('ws');
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

const httpServer = http.createServer(app);
const webSocketServer = new ws.Server({
  noServer: true,
  path: '',
});

httpServer.on('upgrade', (req, networkSocket, head) => {
  webSocketServer.handleUpgrade(req, networkSocket, head, (websocket) => {
    webSocketServer.emit('connection', websocket, req);
  });
});

webSocketServer.on('connection', (websocket, req) => {
  console.log('CONNECTION CREATED');
  websocket.on('message', (msg) => {
    const msgObject = JSON.parse(msg);
    console.log(msgObject);

    switch (msgObject.type) {
      case 'NEW CONNECTION':
        websocket.userName = msgObject.user;
        break;
      case 'NEW ARTICLE':
        webSocketServer.clients.forEach((client) => {
          if (client.userName === websocket.userName) {
            client.send(JSON.stringify({ type: 'NEW ARTICLE' }));
          }
        });
        break;
      default:
        break;
    }
  });
});

httpServer.listen(port, () => {
  mongoose.connect('mongodb://localhost:27017/reader', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.info(`App listening at http://localhost:${port}`);
  });
});

module.exports = app;
