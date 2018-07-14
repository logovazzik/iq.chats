import { CHAT_TYPES, CHATS_COLOR_FACTOR } from "../constants";
import { getRandomInt } from '../../utils';

class User {
  id;
  firstName;
  lastName;

  constructor(id) {
    let firstNames = ['Владимир', 'Василий', 'Петр', 'Евгений', 'Дмитрий', 'Святослав', 'Георгий',
      'Сергей', 'Андрей', 'Александр', 'Иван', 'Максим', 'Анатолий', 'Павел'];
    let lastNames = ['Иванов', 'Петров', 'Сидоров', 'Максимов', 'Третьяков', 'Золотых', 'Смирнов', 'Черных'];
    this.id = id;
    this.firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
    this.lastName = `${lastNames[getRandomInt(0, lastNames.length - 1)]} userId: ${id}`;

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
    this.timestamp = Date.now() - ((Math.random() + 1) * 100000000);
    this.text = Array(Math.round(Math.random() + 1) * 10).fill('Lorem ipsum').join()
  }
}


class Chats {
  currentUser;
  mockUsers;

  constructor() {
    this.currentUser = this.getMockCurrentUser();
  }

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

  getMockCurrentUser() {
    return this.currentUser ? this.currentUser : (this.currentUser = new User(0));
  }

  getMessageFromUnknownUser(chats, currentUser) {
    let randomChatId;
    do {
      randomChatId = getRandomInt(2000, 100000000);
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

export default new Chats();