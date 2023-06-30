import rootReducer from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';
// ==============================|| REDUX - MAIN STORE ||============================== //

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['airports', 'flights', 'user', 'bookings', 'manageBookingObj', 'seats']
};

const persistenceReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middleware = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean);

// const store = createStore(rootReducer);
// const persister = 'Free';
//
// export { store, persister };

export const store = configureStore({
  reducer: persistenceReducer,
  middleware: middleware
  // enhancers: composeEnhancers
});
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
