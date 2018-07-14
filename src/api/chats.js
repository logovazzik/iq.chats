import chatsService from '../chats/services/chats';
import {Server} from 'mock-socket';
import {CHAT_STATUS_TYPES, API_MESSAGE_SOCKET} from '../chats/constants';

class ChatsApi {
    constructor() {
        new Server(API_MESSAGE_SOCKET)
            .on('connection', (server) => {
                this.server = server;
            });
    }

    listenIncoming() {
        return new WebSocket(API_MESSAGE_SOCKET);
    }

    postMessage(message) {
        this.server.send(JSON.stringify(message));
        console.log('api/message', message, 'POST');
    }

    loadChats() {
        console.log('api/chats', 'GET');

        // start section for mocking
        chatsService.createMockUsers(1000);
        return Promise.resolve(chatsService.getMockChats())
        // end section for mocking

    }

    loadChat(id, recipient, sender) {
        // last two args only for mock
        console.log('api/chat/{id}', 'GET');

        // start section for mocking
        const chat = chatsService.getMockChat(id, recipient, sender);
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

    getUser() {
        console.log('api/user', 'GET');
        // start section for mocking
        return Promise.resolve(chatsService.getMockCurrentUser());
        // end section for mocking
    }
}

const api = new ChatsApi();
export default api;