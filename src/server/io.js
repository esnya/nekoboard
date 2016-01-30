import IO from 'socket.io';
import { getLogger } from 'log4js';
import { connected, disconnected } from '../actions/socket';
import { store } from '../stores/server';
import { server } from './server';

const logger = getLogger('[SOCKET]');

export const io = IO(server);

io.on('connection', (socket) => {
    logger.info('New connection', socket.id);

    store.dispatch(connected(socket));
    socket.on('disconnect', () => store.dispatch(disconnected(socket)));
    socket.on('action', (action) => {
        store.dispatch({
            ...action,
            broadcast: false,
            sync: false,
            socket,
        });
    });
});