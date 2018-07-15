import {Server} from 'mock-socket';

class SocketsApi {
  openSocketConnection(url) {
    const server = new Server(url);
    return new WebSocket(url);
  }

  closeSocketConnection(connection) {
    connection.close();
  }
}

const api = new SocketsApi();
export default api;