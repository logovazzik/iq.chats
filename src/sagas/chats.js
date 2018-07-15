import {call, put, select, takeEvery} from 'redux-saga/effects'

import {
    CHATS_LOAD_ACTION,
    chatsUpdateAction,
    chatUpdateAction,
    getChats,
    MARK_AS_READ_ACTION,
    NEW_CHAT_MESSAGE_ACTION,
    POST_MESSAGE_ACTION
} from "../ducks/chats";
import api from "../api/chats";
import chatsService from "../chats/services/chats";
import {getCurrentUser} from "../ducks/user";

function* _loadChats() {
    let chats = [];
    try {
        chats = yield call(() => api.loadChats());
    }
    finally {
        yield put(chatsUpdateAction(chats));
    }
}

function* _markAsRead(action) {
    const chat = action.payload;
    if (chat.unreadMessagesCount > 0) {
        api.markAsReadChat(chat.id);
        const _chat = chatsService.markAsRead(chat);
        yield put(chatUpdateAction(_chat))
    }
}

function* _postMessage(action) {
    const payload = action.payload;
    api.postMessage(payload);
}

function* _newMessage(action) {
    const message = action.payload;
    const chats = yield select(getChats);
    const currentUser = yield select(getCurrentUser);
    const chat = chatsService.insertIntoChat(message, chats, currentUser);
    if (chat) {
        yield put(chatUpdateAction(chat));
    } else {
        // need to pass sender and recipient, its only for creating mock.
        try {
            let _chat = yield call(() => api.loadChat(message.chatId, currentUser, message.sender));
            yield put(chatUpdateAction(_chat));
        } catch (err) {
            console.error('Error while fetching chat with id = ' + message.chatId, err);
        }
    }
}

export function* loadChats() {
    yield takeEvery(CHATS_LOAD_ACTION, _loadChats);
}

export function* markAsRead() {
    yield takeEvery(MARK_AS_READ_ACTION, _markAsRead);
}

export function* newMessage() {
    yield takeEvery(NEW_CHAT_MESSAGE_ACTION, _newMessage);
}

export function* postMessage() {
    yield takeEvery(POST_MESSAGE_ACTION, _postMessage);
}


