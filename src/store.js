import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import * as ducks from './ducks/chats';
import * as user from "./ducks/user";

const reducer = combineReducers({
    chats: ducks.reducer,
    user: user.reducer
});

export default createStore(reducer, applyMiddleware(thunk));