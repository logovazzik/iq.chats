import mockChatsService from '../services/chats.mocks'
import {CHAT_STATUS_TYPES} from '../chats/constants';

class ChatsApi {
    postMessage(message) {
        console.log('api/message', message, 'POST');
    }

    async loadChats() {
        console.log('api/chats', 'GET');

        // start section for mocking
        mockChatsService.createMockUsers(1000);
        return await (mockChatsService.getMockChats())
        // end section for mocking
    }

    async loadChat(id, recipient, sender) {
        // last two args only for mock
        console.log('api/chat/{id}', 'GET');

        const chat = mockChatsService.loadMockChat(id, recipient, sender);

        return await chat;
    }

    markAsReadChat(id) {
        console.log('api/chat/{id}/status', {data: CHAT_STATUS_TYPES.Read}, 'PUT');
    }

}

const api = new ChatsApi();
export default api;