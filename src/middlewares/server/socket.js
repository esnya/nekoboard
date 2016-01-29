import { io } from '../../server/io';

export const socket = () => (next) => (action) => {
    const {
        broadcast,
        sync,
        ...nextAction,
    } = action;

    if (sync && nextAction.socket) {
        nextAction.socket.emit('action', {
            ...nextAction,
            socket: null,
        });
    } else if (broadcast && nextAction.id) {
        io.to(action.id).emit('action', {
            ...nextAction,
            socket: null,
        });
    }

    return next(action);
};