import config from 'config';
import { Server } from 'http';
import { getLogger } from 'log4js';
import { app } from './app';

export const server = Server(app);

server.listen(config.get('server'), () => {
    const {
        address,
        port,
    } = server.address();

    getLogger('[SERVER]').info(`Listening on ${address} ${port}`);
});