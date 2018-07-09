import {createStore, applyMiddleware, combineReducers} from 'redux';

import {chatsReducer} from '../reducers/chats';
import {userReducer} from "../reducers/user";

export default combineReducers({
    chats: chatsReducer,
    user: userReducer
});
