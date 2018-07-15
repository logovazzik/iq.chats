import {Server} from 'mock-socket';
import { API_SOCKET_URL } from "../chats/constants";

class ServerMock  {
  constructor(){
    new Server(API_SOCKET_URL).on('connection', (connection)=>{
      this.chatsServerConnection = connection;
    });
  }

  sendChatsMessage(message) {
    this.chatsServerConnection.send(message);
  }

}

export default new ServerMock();