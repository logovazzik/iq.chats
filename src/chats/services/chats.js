import {CHAT_TYPES, CHATS_COLOR_FACTOR} from "../constants";

class Chats {
    getChatFirstOpponent(chat, user) {
        return chat.participants.find((participant) => {
            return participant.id !== user.id;
        });
    }

    getAbbreviation(chat, user) {
        if (chat.type === CHAT_TYPES.User2User) {
            const opponent = this.getChatFirstOpponent(chat, user);
            return opponent.firstName[0] + opponent.lastName[0];
        }
        // todo for group chats
    }

    getChatTitle(chat, user) {
        if (chat.type === CHAT_TYPES.User2User) {
            const opponent = this.getChatFirstOpponent(chat, user);
            return `${opponent.firstName} ${opponent.lastName}`;
        }
        return chat.title;
    }

    getChatColorNumber(chat, user) {
        if (chat.type === CHAT_TYPES.User2User) {
            const opponent = this.getChatFirstOpponent(chat, user);
            return opponent.firstName[0].charCodeAt(0) * CHATS_COLOR_FACTOR + opponent.lastName[0].charCodeAt(0) * CHATS_COLOR_FACTOR;
        }
        return chat.id;
    }


    markAsRead(chat) {
        let _chat = Object.assign({}, chat);
        if (_chat.messages.length > 0) {
            let _lastPublishTimestamp = chat.messages[_chat.messages.length - 1].timestamp;
            _chat.unreadMessagesCount = 0;
            _chat.lastReadTimestamp = _lastPublishTimestamp;
        }
        return _chat;
    }

    insertIntoChat(message, chats, user) {
        const chat = chats.find((chat) => {
            return chat.id === message.chatId;
        });
        if (chat) {
            let _chat = Object.assign({}, chat);
            _chat.messages = [...chat.messages, message];
            _chat.lastPublishTimestamp = message.timestamp;
            if (user.id === message.sender.id) {
                _chat.lastReadTimestamp = message.timestamp;
            } else {
                ++_chat.unreadMessagesCount;
            }
            return _chat;
        }

        return null;
    }
}

export default new Chats();