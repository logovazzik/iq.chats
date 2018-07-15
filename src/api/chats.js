import mockChatsService from '../services/chats.mocks'
import { CHAT_STATUS_TYPES } from '../chats/constants';

class ChatsApi {
  postMessage(message) {
    this.server.send(JSON.stringify(message));
    console.log('api/message', message, 'POST');
  }

  loadChats() {
    console.log('api/chats', 'GET');

    // start section for mocking
    mockChatsService.createMockUsers(1000);
    return Promise.resolve(mockChatsService.getMockChats())
    // end section for mocking

  }

  loadChat(id, recipient, sender) {
    // last two args only for mock
    console.log('api/chat/{id}', 'GET');

    // start section for mocking
    const chat = mockChatsService.getMockChat(id, recipient, sender);
    chat.unreadMessagesCount = 1;
    chat.messages[chat.messages.length - 1].sender = sender;
    chat.messages[chat.messages.length - 1].timestamp = new Date();
    chat.lastPublishTimestamp = chat.messages[chat.messages.length - 1].timestamp;
    return Promise.resolve(chat);
    // end section for mocking
  }

  markAsReadChat(id) {
    console.log('api/chat/{id}/status', {data: CHAT_STATUS_TYPES.Read}, 'PUT');
  }

}

const api = new ChatsApi();
export default api;