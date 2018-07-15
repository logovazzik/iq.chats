import { getRandomInt} from "../utils";

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

class User {
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

class UsersMock {
  mockUsers;
  currentUser = this.getMockCurrentUser();

  getMockCurrentUser() {
    return this.currentUser ? this.currentUser : (this.currentUser = new User(0));
  }

  createMockUser(id) {
    return new User(id);
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

}

export default new UsersMock();