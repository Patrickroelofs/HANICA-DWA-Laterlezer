/* eslint-disable no-undef */
const port = 3000;
const serverHostname = `localhost:${port}`;

let theSocket;

export function openWebSocket(userName) {
  if (theSocket) {
    theSocket.onerror = null;
    theSocket.onopen = null;
    theSocket.onclose = null;
    theSocket.close();
  }
  const user = userName;
  console.log('Opening socket for', `ws://${serverHostname}`);
  theSocket = new WebSocket(`ws://${serverHostname}`);

  theSocket.onopen = () => {
    theSocket.send(JSON.stringify({ type: 'NEW CONNECTION', user }));
  };

  theSocket.onmessage = async (messageEvent) => {
    const messageObj = JSON.parse(messageEvent.data);
    switch (messageObj.type) {
      default:
        break;
    }
    console.log(`Client Websocket Received: ${messageEvent.data}`);
  };
  theSocket.onclose = () => {
    console.log(`Closing socket ws://${serverHostname}`);
  };
  return theSocket;
}

export function getWebSocket() {
  if (theSocket) {
    return theSocket;
  }
  throw new Error('The websocket has not been opened yet.');
}

export function sendMessage(message) {
  const ws = getWebSocket();
  ws.send(JSON.stringify(message));
}

export function closeWebSocket() {
  const socket = getWebSocket();
  socket.close();
}
