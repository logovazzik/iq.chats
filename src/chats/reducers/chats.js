import {CHAT_UPDATE_ACTION, CHATS_UPDATE_ACTION} from '../actions/chats';

export const chatsReducer = (state = [], action) => {
    const {type, payload} = action;
    if (type === CHATS_UPDATE_ACTION) {
        return [...sortedChats(payload)];
    }
    if (type === CHAT_UPDATE_ACTION) {
        const chatIndex = state.findIndex((chat) => {
            return chat.id === payload.id
        });
        if (chatIndex > -1) {
            state.splice(chatIndex, 1, payload);
        } else {
            state.unshift(payload);
        }

        return [...sortedChats(state)];
    }

    return state;
};

const sortedChats = (payload) => {
    payload.sort((a, b) => {
        return b.lastPublishTimestamp - a.lastPublishTimestamp;
    });
    return payload;
};

export const getChats = (state) => {
    return state.chats || [];
};