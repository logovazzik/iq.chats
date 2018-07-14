import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import chatsReducer from './redux/modules/chats';
import userReducer from "./redux/modules/user";

const reducer = combineReducers({
    chats: chatsReducer,
    user: userReducer
});

export default createStore(reducer, applyMiddleware(thunk));