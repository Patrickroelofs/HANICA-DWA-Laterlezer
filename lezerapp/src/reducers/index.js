import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// Import all slices
import loginSlice from '../app/components/login/LoginSlice';

// Logger logs all states after actions
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('ACTION:', action.type, action);
  const result = next(action);
  console.log('STATE AFTER ACTION:', action.type, store.getState());
  return result;
};

const store = configureStore({
  reducer: combineReducers({
    user: loginSlice,
  }),
  middleware: [loggerMiddleware, ...getDefaultMiddleware()],
  devTools: true,
});

export default store;
