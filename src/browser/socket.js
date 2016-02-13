import io from 'socket.io-client';
import { join } from '../actions/Board';
import { connected, disconnected } from '../actions/Socket';
import { store } from '../stores/browser';
import { getLogger } from './log';

const logger = getLogger('[SOCKET]');

export const socket = io(`http://${location.host}`, {
    query: { boardId: document.body.getAttribute('data-boardId') },
});

socket.on('connect', () => {
    logger.info('Connected', socket.id);

    store.dispatch(connected(socket));

    const boardId = document.body.getAttribute('data-boardId');

    store.dispatch(join(boardId));
});
socket.on('error', (e) => {
    logger.error('Error', e);
});
socket.on('disconnect', () => {
    logger.info('Disconnected');
    store.dispatch(disconnected(socket));
});
socket.on('action', (action) => {
    if (action.type) {
        store.dispatch({
            ...action,
            sync: false,
            broadcast: false,
        });
    }
});