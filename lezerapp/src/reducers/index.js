import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// Logger logs all states after actions
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('ACTION:', action.type, action);
  const result = next(action);
  console.log('STATE AFTER ACTION:', action.type, store.getState());
  return result;
};

const initialState = {

};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [loggerMiddleware, ...getDefaultMiddleware()],
  devTools: true,
});

export default store;
