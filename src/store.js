import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';

import * as ducks from './ducks/chats';
import * as user from "./ducks/user";
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
    chats: ducks.reducer,
    user: user.reducer
});


export default createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);