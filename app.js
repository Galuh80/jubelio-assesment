const Hapi = require('@hapi/hapi');
require('dotenv').config();

class Server {
    
    constructor() {
        this.server = Hapi.server({
            host: process.env.APP_HOST,
            port: process.env.APP_PORT
        });
    }

    async start() {
        try {
            await this.server.start();
            console.log(`Server running on port ${process.env.APP_PORT}`);
        } catch (err) {
            console.error('Failed to start the server:', err);
            process.exit(1); 
        }
    }
}

const serverInstance = new Server();
serverInstance.start();
