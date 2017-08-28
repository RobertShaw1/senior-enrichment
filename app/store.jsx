import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

const loggerMiddleware = createLogger();
const middleware = applyMiddleware(loggerMiddleware, thunkMiddleware)

export default createStore(rootReducer, middleware)
