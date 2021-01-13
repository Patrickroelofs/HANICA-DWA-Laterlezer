/* eslint-disable no-console */
import { store } from '../store';
import { getArticles } from '../store/articleSlice';

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

  theSocket = new WebSocket(`ws://${serverHostname}`);

  theSocket.onopen = () => {
    theSocket.send(JSON.stringify({ type: 'NEW CONNECTION', user }));
  };

  theSocket.onmessage = async (messageEvent) => {
    const messageObj = JSON.parse(messageEvent.data);
    switch (messageObj.type) {
      case 'NEW ARTICLE':
        store.dispatch(getArticles(undefined, null));
        break;
      default:
        break;
    }
  };
  theSocket.onclose = () => {
    console.info(`Closing socket ws://${serverHostname}`);
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
  try {
    const ws = getWebSocket();
    ws.close();
  } catch (e) {
    console.error(e.message);
  }
}
