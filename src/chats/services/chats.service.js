import {CHAT_TYPES} from "../constants";

class User {
    id;

    constructor(id) {
        let names = ['Вова', 'Вася', 'Петя', 'Оля', 'Даша', 'Катя'];
        this.id = id;
        this.name = `${names[Math.round(Math.random() * (names.length - 1))]} ${id}`;
    }
}

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
        this.timestamp = Date.now() - ((Math.random() + 1) * 10000);
        this.text = Array(Math.round(Math.random() + 1) * 10).fill('Lorem ipsum').join()
    }
}


class ChatsService {
    currentUser;
    mockUsers;

    constructor() {
        this.currentUser = this.getMockCurrentUser();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    getDateObj(date) {
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            minutes: minutes,
            hours: date.getHours()
        }
    }

    isToday(date) {
        return new Date().getDate() === date.getDate();
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

    getMockCurrentUser() {
        return this.currentUser ? this.currentUser : (this.currentUser = new User(0));
    }

    getMessageFromUnknownUser(chats, currentUser) {
        let randomChatId;
        do {
            randomChatId = this.getRandomInt(2000, 10000000);
        }
        while (chats.find((c) => c.id === randomChatId) !== undefined);
        // user doesnt matter in this case.
        return this.getMockMessage(randomChatId, currentUser.id, new User(randomChatId))
    }

    getMockMessage(chatId, recipientId, sender) {
        return new Message(chatId, recipientId, sender);
    }

    getMockUsers(count) {
        const users = [];
        let id = 1;
        for (let i = id; i <= count; ++i) {
            users.push(new User(i));
        }
        return users;
    }

    createMockUsers(number) {
        this.mockUsers = this.getMockUsers(number);
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
            chats.push(this.getMockChat(i, this.currentUser, this.mockUsers[i]));
        }
        return chats;
    }
}

export default new ChatsService();