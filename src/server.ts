import express from 'express';

interface ServerConfig {
    backlog: number;
    port: number;
    address: string;
}

const defaultConfig: ServerConfig = {
    backlog: 20,
    port: 5000,
    address: '::0',
}

export function createServer(config: Partial<ServerConfig> = {}) {
    const activeConfig: ServerConfig = {
        ...defaultConfig,
        ...config,
    };

    const app = express();

    const start = () => {
        const server = app.listen({
            ...activeConfig,
        });
        return server.on('listening', () => {
            console.log(`Server ready on ${activeConfig.address}:${activeConfig.port}`);
        });
    }

    return { app, start };
}
