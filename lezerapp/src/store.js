import { applyMiddleware, createStore } from 'redux';

import * as Redux from 'redux';
import thunk from 'redux-thunk';

import RootReducer from './reducers';

// Logger logs all states after actions
const logger = (store) => (next) => (action) => {
  console.log('ACTION:', action.type, action);
  const result = next(action);
  console.log('STATE AFTER ACTION:', action.type, store.getState());
  return result;
};

// Devtools REDUX extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

const store = createStore(RootReducer, composeEnhancers(
  applyMiddleware(thunk, logger),
));

export default store;
