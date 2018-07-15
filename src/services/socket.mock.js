import {Server} from 'mock-socket';

class MockSockets {
    servers = [];
    addServer(url){
        new Server(url).on('connection', (server)=>{
            this.servers.push(server);
        });
    }
    send(message){
        this.servers.forEach((x)=>{
            x.send(JSON.stringify(message));
        });
    }
}

export default new MockSockets();
