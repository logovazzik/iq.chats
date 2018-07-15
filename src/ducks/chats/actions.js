import {
    CHAT_UPDATE_ACTION,
    CHATS_LOAD_ACTION,
    CHATS_UPDATE_ACTION,
    MARK_AS_READ_ACTION,
    POST_MESSAGE_ACTION
} from './types';

export const chatsUpdateAction = (payload) => {
    return {
        type: CHATS_UPDATE_ACTION,
        payload
    };
};

export const chatUpdateAction = (payload) => {
    return {
        type: CHAT_UPDATE_ACTION,
        payload
    };
};

export const markAsReadAction = (payload) => {
    return {
        type: MARK_AS_READ_ACTION,
        payload
    };
};

export const chatsLoadAction = () => {
    return {
        type: CHATS_LOAD_ACTION
    }
};

export const postMessageAction = (payload) => {
    return {
        type: POST_MESSAGE_ACTION,
        payload
    };
};