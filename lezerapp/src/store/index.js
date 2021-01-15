import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import tag from './tagSlice';
import user from './userSlice';
import article from './articleSlice';

const reducers = combineReducers({ user, tag, article });

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware({
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
