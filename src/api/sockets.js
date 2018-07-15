import mockSockets from  '../services/socket.mock';

class SocketsApi {
    openSocketConnection(url) {
        mockSockets.addServer(url);
        return new WebSocket(url);
    }
    closeSocketConnection(socket){
        socket.close();
        mockSockets.removeServer(socket.url);
    }
}

const api = new SocketsApi();
export default api;