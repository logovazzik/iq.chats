import {Server} from 'mock-socket';

class MockSockets {
    servers = {};

    addServer(url) {
        const server = new Server(url);
        server.on('connection', (proxy) => {
            this.servers[server.url] = {proxy, server};
        });

    }

    removeServer(url) {
        const obj = this.servers[url];
        if (obj) {
            obj.proxy.close();
            obj.server.close();
            delete this.servers[url];
        }
    }

    send(message) {
        Object.keys(this.servers).forEach((key) => {
            this.servers[key].proxy.send(JSON.stringify(message));
        });
    }
}

export default new MockSockets();
