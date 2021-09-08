import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; //Middleware atrapa la "action" antes de llegar al "root-reducer"
// logger es un middleware que muestra la "action" en consola
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
