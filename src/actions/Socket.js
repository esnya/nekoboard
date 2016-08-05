import * as SOCKET from '../constants/actions/Socket';

export const connected = (socket) => ({
    type: SOCKET.CONNECTED,
    socket,
});
export const disconnected = (socket) => ({
    type: SOCKET.DISCONNECTED,
    socket,
});
export const error = (e) => ({
    type: SOCKET.ERROR,
    payload: e,
    meta: {
        error: true,
    },
});
