export const CONNECTED = 'SOCKET/CONNECTED';
export const connected = (socket) => ({
    type: CONNECTED,
    socket,
});

export const DISCONNECTED = 'SOCKET/DISCONNECTED';
export const disconnected = (socket) => ({
    type: DISCONNECTED,
    socket,
});

export const ERROR = 'SOCKET/ERROR';
export const error = (e) => ({
    type: ERROR,
    payload: e,
    meta: {
        error: true,
    },
});
