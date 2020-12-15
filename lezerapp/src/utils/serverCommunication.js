import { store } from '../store';

const port = 3000;
const serverHostname = `${window.location.hostname}:${port}`;

let theSocket;

export function openWebSocket() {
  if (theSocket) {
    theSocket.onerror = null;
    theSocket.onopen = null;
    theSocket.onclose = null;
    theSocket.close();
  }
  const state = store.getState();
  const user = state.user.username;
  console.log('Opening socket for', `ws://${serverHostname}`);
  theSocket = new WebSocket(`ws://${serverHostname}`);

  theSocket.onopen = () => {
    theSocket.send(JSON.stringify({ type: 'OPEN CONNECTION', user }));
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
