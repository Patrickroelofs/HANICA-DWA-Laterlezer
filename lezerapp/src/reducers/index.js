import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import loginSlice from '../app/components/login/LoginSlice';
import newTagSlice from '../app/components/newTag/NewTagSlice';
import tagListSlice from '../app/components/tagList/TagListSlice';

const reducers = combineReducers({
  user: loginSlice,
  tags: newTagSlice,
  tagList: tagListSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

// Logger logs all states after actions
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('ACTION:', action.type, action);
  const result = next(action);
  console.log('STATE AFTER ACTION:', action.type, store.getState());
  return result;
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [loggerMiddleware, ...getDefaultMiddleware({
    /**
     * Fixes serializable value error on action 'persist/REGISTER'
     * React doesnt allow non-serializable values, redux-persist needs them
     * see: https://github.com/rt2zz/redux-persist/issues/988
     */
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  })],
  devTools: true,
});

const persistor = persistStore(store);

export { store, persistor };
