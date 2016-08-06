import io from 'socket.io-client';
import { join } from '../actions/board';
import * as Socket from '../actions/socket';
import store from './store';

export const socket = io(location.origin, {
    query: { boardId: document.body.getAttribute('data-boardId') },
});

socket.on('connect', () => {
    store.dispatch(Socket.connected(socket));

    const boardId = document.body.getAttribute('data-boardId');

    store.dispatch(join(boardId));
});
socket.on('error', (e) => {
    store.dispatch(Socket.error(e));
});
socket.on('disconnect', () => {
    store.dispatch(Socket.disconnected(socket));
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
