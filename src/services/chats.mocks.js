import {getRandomInt} from '../utils';
import usersMock from './users.mocks';
import {CHAT_TYPES} from "../chats/constants";

class Chat {
    id;
    messages;
    unreadMessagesCount;
    type;
    lastReadTimestamp;
    lastPublishTimestamp;
    participants;

    constructor(id, type, messages, participants) {
        this.id = id;
        this.type = type;
        this.messages = messages || [];
        this.participants = participants || [];
        this.unreadMessagesCount = 0;
        this.lastReadTimestamp = Date.now();
        this.lastPublishTimestamp = this.messages[this.messages.length - 1].timestamp;
    }
}

class Message {
    chatId;
    recipientId;
    sender;
    timestamp;
    text;

    constructor(chatId, recipientId, sender) {
        this.chatId = chatId;
        this.recipientId = recipientId;
        this.sender = sender;
        this.timestamp = Date.now() - ((Math.random() + 1) * 100000000);
        this.text = Array(Math.round(Math.random() + 1) * 10).fill('Lorem ipsum').join()
    }
}


class ChatsMock {
    mockUsers;

    getMessageFromUnknownUser(chats, currentUser) {
        let randomChatId;
        do {
            randomChatId = getRandomInt(2000, 100000000);
        }
        while (chats.find((c) => c.id === randomChatId) !== undefined);
        // user doesnt matter in this case.
        return this.getMockMessage(randomChatId, currentUser.id, usersMock.createMockUser(randomChatId))
    }

    getMockMessage(chatId, recipientId, sender) {
        return new Message(chatId, recipientId, sender);
    }


    createMockUsers(number) {
        this.mockUsers = usersMock.getMockUsers(number);
    }

    getMockChat(id, sender, recipient) {
        let messages = [];
        for (let i = 0; i < Math.round(Math.random() * 20) + 1; ++i) {
            messages.push(this.getMockMessage(id, recipient.id, sender));
        }
        for (let a = 0; a < Math.round(Math.random() * 20) + 1; ++a) {
            messages.push(this.getMockMessage(id, recipient.id, sender));
        }
        messages.sort((a, b) => {
            return a.timestamp - b.timestamp;
        });
        return new Chat(id, CHAT_TYPES.User2User, messages, [sender, recipient]);
    }

    getMockChats() {
        const chats = [];
        for (let i = 0; i < this.mockUsers.length; ++i) {
            chats.push(this.getMockChat(i, usersMock.currentUser, this.mockUsers[i]));
        }
        return chats;
    }

    getMessageFromUnknown(chats, user) {
        let message = this.getMessageFromUnknownUser(chats, user);
        message.timestamp = Date.now();
        return message;
    };

    getMessageFromTenLatest(chats, user) {
        const chat = chats.slice(0, 10)[getRandomInt(0, 9)];
        const sender = chat.participants.find((x) => x.id !== user.id);
        const message = this.getMockMessage(chat.id, user.id, sender);
        message.timestamp = Date.now();
        return message;
    };

    getMessageFromRandomUser(chats, user) {
        const chat = chats[getRandomInt(0, chats.length - 1)];
        const sender = chat.participants.find((x) => x.id !== user.id);
        const message = this.getMockMessage(chat.id, user.id, sender);
        message.timestamp = Date.now();
        return message;
    };

    loadMockChat(id, recipient, sender){
        let chat = this.getMockChat(id, recipient, sender);
        chat.unreadMessagesCount = 1;
        chat.messages[chat.messages.length - 1].sender = sender;
        chat.messages[chat.messages.length - 1].timestamp = Date.now();
        chat.lastPublishTimestamp = chat.messages[chat.messages.length - 1].timestamp;
        return chat;
    }

}

export default new ChatsMock();