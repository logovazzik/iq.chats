import {getCurrentUser} from '../reducers/user'
import {getChats} from '../reducers/chats'
import api from '../api/chats'
import chatsService from '../services/chats.service';

export const CHATS_UPDATE_ACTION = 'CHATS_LOADED_ACTION';
export const CHAT_UPDATE_ACTION = 'CHAT_LOADED_ACTION';


export const chatsUpdateAction = (payload) => (dispatch, getState) => {
    return dispatch({
        type: CHATS_UPDATE_ACTION,
        payload
    });
};
export const chatUpdateAction = (payload) => (dispatch, getState) => {
    return dispatch({
        type: CHAT_UPDATE_ACTION,
        payload
    })
};
export const postMessageAction = (message) => (dispatch, getState) => {
    return api.postMessage(message);
};

export const newMessageAction = (message) => (dispatch, getState) => {
    const state = getState();
    const chats = getChats(state);
    const currentUser = getCurrentUser(state);
    const chat = chatsService.insertIntoChat(message, chats, currentUser);
    if (chat) {
        return dispatch(chatUpdateAction(chat));
    }
    // need to pass sender and recipient, its only for creating mock.
    return api.loadChat(message.chatId, currentUser, message.sender).then((chat) => {
        return dispatch(chatUpdateAction(chat));
    }).catch((err) => {
        console.error('Error while fetching chat with id = ' + message.chatId, err);
    })
};
