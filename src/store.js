import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import chatsReducer from './chats/store';

export default createStore(chatsReducer, applyMiddleware(thunk));