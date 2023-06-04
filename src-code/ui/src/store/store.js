import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, compose, createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['airports', 'flights']
}

const persistenceReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middleware = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware
].filter(Boolean);

// const composeEnhancer = (process.env.NODE_ENV !== 'production'
//     && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const composeEnhancers = composeEnhancer(applyMiddleware(...middleware));

export const store = configureStore(
    {
        reducer: persistenceReducer,
        middleware: middleware,
        // enhancers: composeEnhancers
    }
);
sagaMiddleware.run(rootSaga);


export const persistor = persistStore(store);