const ws = require('ws');

let webSocketServer;

exports.open = () => {
  webSocketServer = new ws.Server({
    noServer: true,
    path: '',
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
  return webSocketServer;
};

exports.sendMessage = (name, msg) => {
  webSocketServer.clients.forEach((client) => {
    if (client.userName === name) {
      client.send(JSON.stringify(msg));
    }
  });
}
exports.getWebsocket = () => webSocketServer;
